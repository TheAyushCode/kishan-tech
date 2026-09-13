require('dotenv').config();
const express = require('express');
const mysql = require('mysql2');
const bcrypt = require('bcryptjs');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// ==========================================
// 1. MySQL / TiDB Connection Pool
// ==========================================
const dbConfig = {
    host: process.env.DB_HOST || 'localhost',
    user: process.env.DB_USER || 'root',
    password: process.env.DB_PASSWORD || '',
    database: process.env.DB_NAME || 'test',
    port: parseInt(process.env.DB_PORT, 10) || 3306,
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0,
    enableKeepAlive: true,
    keepAliveInitialDelay: 10000
};

if (process.env.DB_HOST && process.env.DB_HOST !== 'localhost' && process.env.DB_HOST !== '127.0.0.1') {
    dbConfig.ssl = { rejectUnauthorized: false };
}

const db = mysql.createPool(dbConfig);

// Create Required Tables Automatically
db.getConnection((err, connection) => {
    if (err) {
        console.error('❌ Database connection failed:', err.message);
    } else {
        console.log('✅ Connected to MySQL / TiDB Database Successfully!');

        // Custom Crops Table for Public Sharing
        const createCropsTable = `
        CREATE TABLE IF NOT EXISTS custom_crops (
            id INT AUTO_INCREMENT PRIMARY KEY,
            name VARCHAR(255) NOT NULL,
            hindi VARCHAR(255),
            wiki VARCHAR(255),
            season VARCHAR(50) NOT NULL,
            rain VARCHAR(100),
            soil VARCHAR(100),
            img TEXT,
            region VARCHAR(255),
            \`desc\` TEXT,
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        )`;

        // Permanent User Favorites Table
        const createFavsTable = `
        CREATE TABLE IF NOT EXISTS user_favorites (
            id INT AUTO_INCREMENT PRIMARY KEY,
            user_email VARCHAR(255) NOT NULL,
            crop_name VARCHAR(255) NOT NULL,
            season VARCHAR(50) NOT NULL,
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
            UNIQUE KEY unique_user_fav (user_email, crop_name)
        )`;

        connection.query(createCropsTable, (err1) => {
            if (err1) console.error('❌ Error creating custom_crops table:', err1.message);
            else console.log('✅ custom_crops table ready');
        });

        connection.query(createFavsTable, (err2) => {
            if (err2) console.error('❌ Error creating user_favorites table:', err2.message);
            else console.log('✅ user_favorites table ready');
        });

        connection.release();
    }
});

// ==========================================
// 2. AUTHENTICATION APIS
// ==========================================
app.post('/api/register', async (req, res) => {
    const { name, email, password } = req.body;
    if (!name || !email || !password) {
        return res.status(400).json({ success: false, message: 'All fields are required.' });
    }

    try {
        const checkQuery = 'SELECT email FROM users WHERE email = ?';
        db.query(checkQuery, [email], async (err, results) => {
            if (err) {
                console.error('❌ SELECT QUERY ERROR:', err.sqlMessage || err.message);
                return res.status(500).json({ success: false, message: 'Database query error.' });
            }
            if (results.length > 0) {
                return res.status(400).json({ success: false, message: 'Email is already registered!' });
            }

            const hashedPassword = await bcrypt.hash(password, 10);
            const insertQuery = 'INSERT INTO users (name, email, password) VALUES (?, ?, ?)';
            db.query(insertQuery, [name, email, hashedPassword], (err) => {
                if (err) {
                    console.error('❌ INSERT QUERY ERROR:', err.sqlMessage || err.message);
                    return res.status(500).json({ success: false, message: 'Failed to register user.' });
                }
                return res.status(200).json({ success: true, message: 'Account created successfully!' });
            });
        });
    } catch (error) {
        console.error('❌ SERVER ERROR:', error);
        res.status(500).json({ success: false, message: 'Internal server error.' });
    }
});

app.post('/api/login', (req, res) => {
    const { email, password } = req.body;
    if (!email || !password) {
        return res.status(400).json({ success: false, message: 'Email and password are required.' });
    }

    const selectQuery = 'SELECT * FROM users WHERE email = ?';
    db.query(selectQuery, [email], async (err, results) => {
        if (err) {
            return res.status(500).json({ success: false, message: 'Database error on login.' });
        }
        if (results.length === 0) {
            return res.status(400).json({ success: false, message: 'User not found. Please register first.' });
        }

        const user = results[0];
        const isMatch = await bcrypt.compare(password, user.password);
        if (isMatch) {
            return res.status(200).json({ 
                success: true, 
                message: 'Login successful!',
                user: { name: user.name, email: user.email }
            });
        } else {
            return res.status(400).json({ success: false, message: 'Incorrect password.' });
        }
    });
});

// ==========================================
// 3. PUBLIC CROPS APIS (PUBLIC TO ALL USERS)
// ==========================================

// Get all custom crops (Visible to all users)
app.get('/api/crops', (req, res) => {
    const query = 'SELECT * FROM custom_crops ORDER BY id DESC';
    db.query(query, (err, results) => {
        if (err) {
            console.error('❌ FETCH CROPS ERROR:', err.message);
            return res.status(500).json({ success: false, message: 'Failed to load crops.' });
        }
        res.status(200).json({ success: true, crops: results });
    });
});

// Add new crop (Admin)
app.post('/api/crops', (req, res) => {
    const { name, hindi, wiki, season, rain, soil, img, region, desc } = req.body;
    if (!name || !season || !desc) {
        return res.status(400).json({ success: false, message: 'Crop name, season and description are required.' });
    }

    const query = 'INSERT INTO custom_crops (name, hindi, wiki, season, rain, soil, img, region, `desc`) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)';
    db.query(query, [name, hindi, wiki, season, rain, soil, img, region, desc], (err, result) => {
        if (err) {
            console.error('❌ ADD CROP ERROR:', err.message);
            return res.status(500).json({ success: false, message: 'Failed to add crop to database.' });
        }
        res.status(200).json({ success: true, message: 'Crop added successfully!', cropId: result.insertId });
    });
});

// Update crop details (Admin Edit)
app.put('/api/crops/:id', (req, res) => {
    const { id } = req.params;
    const { name, hindi, wiki, season, rain, soil, img, region, desc } = req.body;

    const query = 'UPDATE custom_crops SET name = ?, hindi = ?, wiki = ?, season = ?, rain = ?, soil = ?, img = ?, region = ?, `desc` = ? WHERE id = ?';
    db.query(query, [name, hindi, wiki, season, rain, soil, img, region, desc, id], (err, result) => {
        if (err) {
            console.error('❌ UPDATE CROP ERROR:', err.message);
            return res.status(500).json({ success: false, message: 'Failed to update crop.' });
        }
        res.status(200).json({ success: true, message: 'Crop updated successfully!' });
    });
});

// Delete crop (Admin Delete)
app.delete('/api/crops/:id', (req, res) => {
    const { id } = req.params;
    const query = 'DELETE FROM custom_crops WHERE id = ?';
    db.query(query, [id], (err) => {
        if (err) {
            console.error('❌ DELETE CROP ERROR:', err.message);
            return res.status(500).json({ success: false, message: 'Failed to delete crop.' });
        }
        res.status(200).json({ success: true, message: 'Crop deleted successfully!' });
    });
});

// ==========================================
// 4. PERMANENT USER FAVORITES APIS
// ==========================================

// Get user's favorites
app.get('/api/favorites', (req, res) => {
    const { email } = req.query;
    if (!email) return res.status(400).json({ success: false, message: 'User email is required.' });

    const query = 'SELECT crop_name as name, season FROM user_favorites WHERE user_email = ? ORDER BY id DESC';
    db.query(query, [email], (err, results) => {
        if (err) {
            console.error('❌ FETCH FAVS ERROR:', err.message);
            return res.status(500).json({ success: false, message: 'Failed to fetch favorites.' });
        }
        res.status(200).json({ success: true, favorites: results });
    });
});

// Toggle favorite (Add if not exists, delete if exists)
app.post('/api/favorites/toggle', (req, res) => {
    const { email, cropName, season } = req.body;
    if (!email || !cropName || !season) {
        return res.status(400).json({ success: false, message: 'Email, cropName, and season are required.' });
    }

    const checkQuery = 'SELECT id FROM user_favorites WHERE user_email = ? AND crop_name = ?';
    db.query(checkQuery, [email, cropName], (err, results) => {
        if (err) return res.status(500).json({ success: false, message: 'Database error checking favorites.' });

        if (results.length > 0) {
            // Remove Favorite
            const deleteQuery = 'DELETE FROM user_favorites WHERE user_email = ? AND crop_name = ?';
            db.query(deleteQuery, [email, cropName], (delErr) => {
                if (delErr) return res.status(500).json({ success: false, message: 'Failed to remove favorite.' });
                return res.status(200).json({ success: true, isFavorite: false, message: 'Removed from favorites' });
            });
        } else {
            // Add Favorite
            const insertQuery = 'INSERT INTO user_favorites (user_email, crop_name, season) VALUES (?, ?, ?)';
            db.query(insertQuery, [email, cropName, season], (insErr) => {
                if (insErr) return res.status(500).json({ success: false, message: 'Failed to add favorite.' });
                return res.status(200).json({ success: true, isFavorite: true, message: 'Added to favorites' });
            });
        }
    });
});

// ==========================================
// 5. Server Start
// ==========================================
app.listen(PORT, () => {
    console.log(`🚀 Server running on port ${PORT}`);
});