/* ============================================================
   KISHAN - TECH — Application Logic
   Integrated with Live TiDB Backend (Public Crops & Permanent Favs)
   ============================================================ */

const API_BASE_URL = 'https://kishan-tech.onrender.com/api';

const SEASON_META = {
  summer: {
    label: "Summer",
    icon: "☀️",
    tagline: "Hot & Sunny Season",
    desc: "Warm-season crops grown during the hot Indian summer (Feb–Jun). These heat-loving fruits and vegetables thrive in bright sunshine and well-drained soils.",
    bg: "assets/images/summer-bg.png",
    month: "February – June",
  },
  winter: {
    label: "Winter",
    icon: "❄️",
    tagline: "Cool Rabi Season",
    desc: "Cool-season (rabi) crops sown in winter (Oct–Mar) and harvested in spring. Cereals, oilseeds, pulses, spices and vegetables that love the chill.",
    bg: "assets/images/winter-bg.png",
    month: "October – March",
  },
  rain: {
    label: "Rain",
    icon: "🌧️",
    tagline: "Monsoon Kharif Season",
    desc: "Kharif crops sown with the southwest monsoon (Jun–Oct) and reliant on rainfall. Rice, millets, pulses, oilseeds, fibres and plantation crops flourish.",
    bg: "assets/images/rain-bg.png",
    month: "June – October",
  },
};

const STATE_COORDINATES = {
  "punjab": { top: "24%", left: "30%", name: "Punjab" },
  "haryana": { top: "28%", left: "33%", name: "Haryana" },
  "uttar pradesh": { top: "35%", left: "48%", name: "Uttar Pradesh" },
  "up": { top: "35%", left: "48%", name: "Uttar Pradesh" },
  "bihar": { top: "38%", left: "64%", name: "Bihar" },
  "west bengal": { top: "46%", left: "70%", name: "West Bengal" },
  "bengal": { top: "46%", left: "70%", name: "West Bengal" },
  "rajasthan": { top: "34%", left: "24%", name: "Rajasthan" },
  "gujarat": { top: "46%", left: "20%", name: "Gujarat" },
  "madhya pradesh": { top: "46%", left: "42%", name: "Madhya Pradesh" },
  "mp": { top: "46%", left: "42%", name: "Madhya Pradesh" },
  "maharashtra": { top: "58%", left: "33%", name: "Maharashtra" },
  "karnataka": { top: "74%", left: "33%", name: "Karnataka" },
  "andhra pradesh": { top: "68%", left: "45%", name: "Andhra Pradesh" },
  "andhra": { top: "68%", left: "45%", name: "Andhra Pradesh" },
  "tamil nadu": { top: "82%", left: "42%", name: "Tamil Nadu" },
  "kerala": { top: "84%", left: "35%", name: "Kerala" },
  "odisha": { top: "52%", left: "62%", name: "Odisha" },
  "assam": { top: "36%", left: "84%", name: "Assam" }
};

// ================= ALL 28 STATES & 8 UNION TERRITORIES =================
const STATE_AGRICULTURE_DATA = {
  andhra_pradesh: {
    name: "Andhra Pradesh (आंध्र प्रदेश)",
    deptHelpline: "1800-425-3030 / 1551",
    desc: "Department of Agriculture, Govt. of Andhra Pradesh (Rythu Bharosa Kendra)",
    districts: [
      "Alluri Sitharama Raju", "Anakapalli", "Ananthapuramu", "Annamayya", "Bapatla", 
      "Chittoor", "Dr. B.R. Ambedkar Konaseema", "East Godavari", "Eluru", "Guntur", 
      "Kakinada", "Krishna", "Kurnool", "Nandyal", "NTR", "Palnadu", "Parvathipuram Manyam", 
      "Prakasam", "Srikakulam", "Sri Potti Sriramulu Nellore", "Sri Sathya Sai", "Tirupati", 
      "Visakhapatnam", "Vizianagaram", "West Godavari", "YSR Kadapa"
    ]
  },
  arunachal_pradesh: {
    name: "Arunachal Pradesh (अरुणाचल प्रदेश)",
    deptHelpline: "0360-2244252 / 1551",
    desc: "Department of Agriculture, Govt. of Arunachal Pradesh",
    districts: [
      "Anjaw", "Changlang", "Dibang Valley", "East Kameng", "East Siang", "Kamle", 
      "Kra Daadi", "Kurung Kumey", "Lepa Rada", "Lohit", "Longding", "Lower Dibang Valley", 
      "Lower Siang", "Lower Subansiri", "Namsai", "Pakke Kessang", "Papum Pare", "Shi Yomi", 
      "Siang", "Tawang", "Tirap", "Upper Siang", "Upper Subansiri", "West Kameng", "West Siang", "Bichom"
    ]
  },
  assam: {
    name: "Assam (असम)",
    deptHelpline: "1800-345-3522 / 1551",
    desc: "Directorate of Agriculture, Govt. of Assam",
    districts: [
      "Baksa", "Barpeta", "Biswanath", "Bongaigaon", "Cachar", "Charaideo", "Chirang", 
      "Darrang", "Dhemaji", "Dhubri", "Dibrugarh", "Dima Hasao", "Goalpara", "Golaghat", 
      "Hailakandi", "Hojai", "Jorhat", "Kamrup", "Kamrup Metropolitan", "Karbi Anglong", 
      "Karimganj", "Kokrajhar", "Lakhimpur", "Majuli", "Morigaon", "Nagaon", "Nalbari", 
      "Sivasagar", "Sonitpur", "South Salmara-Mankachar", "Tinsukia", "Udalguri", 
      "West Karbi Anglong", "Bajali", "Tamulpur"
    ]
  },
  bihar: {
    name: "Bihar (बिहार)",
    deptHelpline: "1800-345-6455 / 1551",
    desc: "कृषि विभाग, बिहार सरकार (डीजल व बीज अनुदान, DBT पोर्टल)",
    districts: [
      "Araria", "Arwal", "Aurangabad", "Banka", "Begusarai", "Bhagalpur", "Bhojpur (Ara)", 
      "Buxar", "Darbhanga", "East Champaran (Motihari)", "Gaya", "Gopalganj", "Jamui", 
      "Jehanabad", "Kaimur (Bhabua)", "Katihar", "Khagaria", "Kishanganj", "Lakhisarai", 
      "Madhepura", "Madhubani", "Munger", "Muzaffarpur", "Nalanda (Bihar Sharif)", "Nawada", 
      "Patna", "Purnia", "Rohtas (Sasaram)", "Saharsa", "Samastipur", "Saran (Chhapra)", 
      "Sheikhpura", "Sheohar", "Sitamarhi", "Siwan", "Supaul", "Vaishali (Hajipur)", "West Champaran (Bettiah)"
    ]
  },
  chhattisgarh: {
    name: "Chhattisgarh (छत्तीसगढ़)",
    deptHelpline: "0771-2443831 / 1551",
    desc: "कृषि विकास एवं किसान कल्याण विभाग, छत्तीसगढ़ शासन",
    districts: [
      "Balod", "Baloda Bazar-Bhatapara", "Balrampur-Ramanujganj", "Bastar", "Bemetara", 
      "Bijapur", "Bilaspur", "Dantewada", "Dhamtari", "Durg", "Gariaband", "Gaurela-Pendra-Marwahi", 
      "Janjgir-Champa", "Jashpur", "Kabirdham (Kawardha)", "Kanker", "Kondagaon", "Korba", 
      "Koriya", "Mahasamund", "Manendragarh-Chirmiri-Bharatpur", "Mohla-Manpur-Ambagarh Chowki", 
      "Mungeli", "Narayanpur", "Raigarh", "Raipur", "Rajnandgaon", "Sakti", "Sarangarh-Bilaigarh", 
      "Sukma", "Surajpur", "Surguja", "Khairagarh-Chhuikhadan-Gandai"
    ]
  },
  goa: {
    name: "Goa (गोवा)",
    deptHelpline: "0832-2224461 / 1551",
    desc: "Directorate of Agriculture, Govt. of Goa",
    districts: ["North Goa", "South Goa"]
  },
  gujarat: {
    name: "Gujarat (गुजरात)",
    deptHelpline: "1800-233-0264 / 1551",
    desc: "Directorate of Agriculture, Govt. of Gujarat (i-Khedut Portal)",
    districts: [
      "Ahmedabad", "Amreli", "Anand", "Aravalli", "Banaskantha", "Bharuch", "Bhavnagar", 
      "Botad", "Chhota Udaipur", "Dahod", "Dang", "Devbhumi Dwarka", "Gandhinagar", 
      "Gir Somnath", "Jamnagar", "Junagadh", "Kutch", "Kheda", "Mahisagar", "Mehsana", 
      "Morbi", "Narmada", "Navsari", "Panchmahal", "Patan", "Porbandar", "Rajkot", 
      "Sabarkantha", "Surat", "Surendranagar", "Tapi", "Vadodara", "Valsad"
    ]
  },
  haryana: {
    name: "Haryana (हरियाणा)",
    deptHelpline: "1800-180-2117 / 1551",
    desc: "कृषि तथा किसान कल्याण विभाग, हरियाणा (मेरी फसल मेरा ब्योरा)",
    districts: [
      "Ambala", "Bhiwani", "Charkhi Dadri", "Faridabad", "Fatehabad", "Gurugram", 
      "Hisar", "Jhajjar", "Jind", "Kaithal", "Karnal", "Kurukshetra", "Mahendragarh", 
      "Nuh", "Palwal", "Panchkula", "Panipat", "Rewari", "Rohtak", "Sirsa", "Sonipat", "Yamunanagar"
    ]
  },
  himachal_pradesh: {
    name: "Himachal Pradesh (हिमाचल प्रदेश)",
    deptHelpline: "0177-2830174 / 1551",
    desc: "Department of Agriculture, Govt. of Himachal Pradesh",
    districts: [
      "Bilaspur", "Chamba", "Hamirpur", "Kangra", "Kinnaur", "Kullu", 
      "Lahaul and Spiti", "Mandi", "Shimla", "Sirmaur", "Solan", "Una"
    ]
  },
  jharkhand: {
    name: "Jharkhand (झारखंड)",
    deptHelpline: "0651-2490578 / 1551",
    desc: "कृषि, पशुपालन एवं सहकारिता विभाग, झारखंड सरकार",
    districts: [
      "Bokaro", "Chatra", "Deoghar", "Dhanbad", "Dumka", "East Singhbhum (Jamshedpur)", 
      "Garhwa", "Giridih", "Godda", "Gumla", "Hazaribagh", "Jamtara", "Khunti", "Koderma", 
      "Latehar", "Lohardaga", "Pakur", "Palamu", "Ramgarh", "Ranchi", "Sahibganj", 
      "Seraikela Kharsawan", "Simdega", "West Singhbhum"
    ]
  },
  karnataka: {
    name: "Karnataka (कर्नाटक)",
    deptHelpline: "1800-425-3553 / 1551",
    desc: "Department of Agriculture, Govt. of Karnataka (Raitha Siri)",
    districts: [
      "Bagalkote", "Ballari", "Belagavi", "Bengaluru Rural", "Bengaluru Urban", "Bidar", 
      "Chamarajanagara", "Chikkaballapura", "Chikkamagaluru", "Chitradurga", "Dakshina Kannada", 
      "Davanagere", "Dharwad", "Gadag", "Hassan", "Haveri", "Kalaburagi", "Kodagu", 
      "Kolar", "Koppal", "Mandya", "Mysuru", "Raichur", "Ramanagara", "Shivamogga", 
      "Tumakuru", "Udupi", "Uttara Kannada", "Vijayanagara", "Vijayapura", "Yadgir"
    ]
  },
  kerala: {
    name: "Kerala (केरल)",
    deptHelpline: "1800-425-1661 / 1551",
    desc: "Department of Agriculture Development and Farmers' Welfare, Kerala",
    districts: [
      "Alappuzha", "Ernakulam", "Idukki", "Kannur", "Kasaragod", "Kollam", "Kottayam", 
      "Kozhikode", "Malappuram", "Palakkad", "Pathanamthitta", "Thiruvananthapuram", "Thrissur", "Wayanad"
    ]
  },
  madhya_pradesh: {
    name: "Madhya Pradesh (मध्य प्रदेश)",
    deptHelpline: "0755-2558823 / 1551",
    desc: "किसान कल्याण एवं कृषि विकास विभाग, मध्य प्रदेश शासन",
    districts: [
      "Agar Malwa", "Alirajpur", "Anuppur", "Ashoknagar", "Balaghat", "Barwani", "Betul", 
      "Bhind", "Bhopal", "Burhanpur", "Chhatarpur", "Chhindwara", "Damoh", "Datia", "Dewas", 
      "Dhar", "Dindori", "Guna", "Gwalior", "Harda", "Hoshangabad (Narmadapuram)", "Indore", 
      "Jabalpur", "Jhabua", "Katni", "Khandwa", "Khargone", "Maihar", "Mandla", "Mandsaur", 
      "Mauganj", "Morena", "Narsinghpur", "Neemuch", "Niwari", "Panna", "Pandhurna", "Raisen", 
      "Rajgarh", "Ratlam", "Rewa", "Sagar", "Satna", "Sehore", "Seoni", "Shahdol", "Shajapur", 
      "Sheopur", "Shivpuri", "Sidhi", "Singrauli", "Tikamgarh", "Ujjain", "Umaria", "Vidisha"
    ]
  },
  maharashtra: {
    name: "Maharashtra (महाराष्ट्र)",
    deptHelpline: "1800-233-4000 / 1551",
    desc: "कृषी विभाग, महाराष्ट्र शासन (महाडीबीटी शेतकरी योजना)",
    districts: [
      "Ahmednagar", "Akola", "Amravati", "Chhatrapati Sambhajinagar (Aurangabad)", "Beed", 
      "Bhandara", "Buldhana", "Chandrapur", "Dhule", "Gadchiroli", "Gondia", "Hingoli", 
      "Jalgaon", "Jalna", "Kolhapur", "Latur", "Mumbai City", "Mumbai Suburban", "Nagpur", 
      "Nanded", "Nandurbar", "Nashik", "Dharashiv (Osmanabad)", "Palghar", "Parbhani", "Pune", 
      "Raigad", "Ratnagiri", "Sangli", "Satara", "Sindhudurg", "Solapur", "Thane", "Wardha", "Washim", "Yavatmal"
    ]
  },
  manipur: {
    name: "Manipur (मणिपुर)",
    deptHelpline: "0385-2414436 / 1551",
    desc: "Department of Agriculture, Govt. of Manipur",
    districts: [
      "Bishnupur", "Chandel", "Churachandpur", "Imphal East", "Imphal West", "Jiribam", 
      "Kakching", "Kamjong", "Kangpokpi", "Noney", "Pherzawl", "Senapati", "Tamenglong", "Tengnoupal", "Thoubal", "Ukhrul"
    ]
  },
  meghalaya: {
    name: "Meghalaya (मेघालय)",
    deptHelpline: "0364-2223847 / 1551",
    desc: "Directorate of Agriculture, Govt. of Meghalaya",
    districts: [
      "Eastern West Khasi Hills", "East Garo Hills", "East Jaintia Hills", "East Khasi Hills", 
      "North Garo Hills", "Ri-Bhoi", "South Garo Hills", "South West Garo Hills", 
      "South West Khasi Hills", "West Garo Hills", "West Jaintia Hills", "West Khasi Hills"
    ]
  },
  mizoram: {
    name: "Mizoram (मिजोरम)",
    deptHelpline: "0389-2322437 / 1551",
    desc: "Directorate of Agriculture, Govt. of Mizoram",
    districts: [
      "Aizawl", "Champhai", "Hnahthial", "Khawzawl", "Kolasib", "Lawngtlai", 
      "Lunglei", "Mamit", "Saitual", "Serchhip", "Siaha"
    ]
  },
  nagaland: {
    name: "Nagaland (नागालैंड)",
    deptHelpline: "0370-2270081 / 1551",
    desc: "Directorate of Agriculture, Govt. of Nagaland",
    districts: [
      "Chümoukedima", "Dimapur", "Kiphire", "Kohima", "Longleng", "Mokokchung", 
      "Mon", "Niuland", "Noklak", "Peren", "Phek", "Shamator", "Tseminyü", "Tuensang", "Wokha", "Zünheboto"
    ]
  },
  odisha: {
    name: "Odisha (ओडिशा)",
    deptHelpline: "1800-180-1551 / 0674-2395532",
    desc: "Department of Agriculture & Farmers' Empowerment, Odisha (KALIA Scheme)",
    districts: [
      "Angul", "Balangir", "Balasore", "Bargarh", "Bhadrak", "Boudh", "Cuttack", "Deogarh", 
      "Dhenkanal", "Gajapati", "Ganjam", "Jagatsinghpur", "Jajpur", "Jharsuguda", "Kalahandi", 
      "Kandhamal", "Kendrapara", "Kendujhar (Keonjhar)", "Khordha", "Koraput", "Malkangiri", 
      "Mayurbhanj", "Nabarangpur", "Nayagarh", "Nuapada", "Puri", "Rayagada", "Sambalpur", "Subarnapur (Sonepur)", "Sundargarh"
    ]
  },
  punjab: {
    name: "Punjab (पंजाब)",
    deptHelpline: "0161-2401960 / 1551",
    desc: "Department of Agriculture & Farmers Welfare, Punjab (PAU Ludhiana)",
    districts: [
      "Amritsar", "Barnala", "Bathinda", "Faridkot", "Fatehgarh Sahib", "Fazilka", 
      "Ferozepur", "Gurdaspur", "Hoshiarpur", "Jalandhar", "Kapurthala", "Ludhiana", 
      "Malerkotla", "Mansa", "Moga", "Muktsar", "Pathankot", "Patiala", "Rupnagar", 
      "Sahibzada Ajit Singh Nagar (Mohali)", "Shaheed Bhagat Singh Nagar (Nawanshahr)", "Sangrur", "Tarn Taran"
    ]
  },
  rajasthan: {
    name: "Rajasthan (राजस्थान)",
    deptHelpline: "1800-180-1551 / 0141-2227365",
    desc: "कृषि विभाग, राजस्थान सरकार (राज किसान साथी पोर्टल)",
    districts: [
      "Ajmer", "Alwar", "Anupgarh", "Balotra", "Banswara", "Baran", "Barmer", "Bharatpur", 
      "Bhilwara", "Bikaner", "Bundi", "Chittorgarh", "Churu", "Dausa", "Deeg", "Didwana-Kuchaman", 
      "Dholpur", "Dudu", "Dungarpur", "Ganganagar", "Gangapur City", "Hanumangarh", "Jaipur Urban", 
      "Jaipur Rural", "Jaisalmer", "Jalore", "Jhalawar", "Jhunjhunu", "Jodhpur Urban", "Jodhpur Rural", 
      "Karauli", "Kekri", "Khairthal-Tijara", "Kota", "Kotputli-Behror", "Nagaur", "Neem Ka Thana", 
      "Pali", "Phalodi", "Pratapgarh", "Rajsamand", "Salumbar", "Sanchore", "Sawai Madhopur", 
      "Shahpura", "Sikar", "Sirohi", "Tonk", "Udaipur", "Beawar"
    ]
  },
  sikkim: {
    name: "Sikkim (सिक्किम)",
    deptHelpline: "03592-281140 / 1551",
    desc: "Agriculture Department, Govt. of Sikkim (100% Organic State Mission)",
    districts: ["Gangtok", "Gyalshing", "Pakyong", "Namchi", "Mangan", "Soreng"]
  },
  tamil_nadu: {
    name: "Tamil Nadu (तमिलनाडु)",
    deptHelpline: "1800-425-4444 / 1551",
    desc: "Agriculture Department, Govt. of Tamil Nadu (Uzhavan App)",
    districts: [
      "Ariyalur", "Chengalpattu", "Chennai", "Coimbatore", "Cuddalore", "Dharmapuri", 
      "Dindigul", "Erode", "Kallakurichi", "Kanchipuram", "Kanyakumari", "Karur", 
      "Krishnagiri", "Madurai", "Mayiladuthurai", "Nagapattinam", "Namakkal", "Nilgiris", 
      "Perambalur", "Pudukkottai", "Ramanathapuram", "Ranipet", "Salem", "Sivaganga", 
      "Tenkasi", "Thanjavur", "Theni", "Thoothukudi", "Tiruchirappalli", "Tirunelveli", 
      "Tirupathur", "Tiruppur", "Tiruvallur", "Tiruvannamalai", "Tiruvarur", "Vellore", "Viluppuram", "Virudhunagar"
    ]
  },
  telangana: {
    name: "Telangana (तेलंगाना)",
    deptHelpline: "1800-599-4455 / 1551",
    desc: "Department of Agriculture, Govt. of Telangana (Rythu Bandhu Portal)",
    districts: [
      "Adilabad", "Bhadradri Kothagudem", "Hyderabad", "Jagtial", "Jangaon", "Jayashankar Bhupalpally", 
      "Jogulamba Gadwal", "Kamareddy", "Karimnagar", "Khammam", "Kumuram Bheem Asifabad", 
      "Mahabubabad", "Mahabubnagar", "Mancherial", "Medak", "Medchal-Malkajgiri", "Mulugu", 
      "Nagarkurnool", "Nalgonda", "Narayanpet", "Nirmal", "Nizamabad", "Peddapalli", 
      "Rajanna Sircilla", "Ranga Reddy", "Sangareddy", "Siddipet", "Suryapet", "Vikarabad", 
      "Wanaparthy", "Warangal", "Hanamkonda", "Yadadri Bhuvanagiri"
    ]
  },
  tripura: {
    name: "Tripura (त्रिपुरा)",
    deptHelpline: "0381-2323723 / 1551",
    desc: "Department of Agriculture & Farmers Welfare, Tripura",
    districts: ["Dhalai", "Gomati", "Khowai", "North Tripura", "Sepahijala", "South Tripura", "Unakoti", "West Tripura"]
  },
  uttar_pradesh: {
    name: "Uttar Pradesh (उत्तर प्रदेश)",
    deptHelpline: "1800-180-1551 / 0522-2204555",
    desc: "कृषि विभाग, उत्तर प्रदेश सरकार (पारदर्शी किसान सेवा पोर्टल)",
    districts: [
      "Agra", "Aligarh", "Ambedkar Nagar", "Amethi", "Amroha", "Auraiya", "Ayodhya", 
      "Azamgarh", "Baghpat", "Bahraich", "Ballia", "Balrampur", "Banda", "Barabanki", 
      "Bareilly", "Basti", "Bhadohi", "Bijnor", "Budaun", "Bulandshahr", "Chandauli", 
      "Chitrakoot", "Deoria", "Etah", "Etawah", "Farrukhabad", "Fatehpur", "Firozabad", 
      "Gautam Buddha Nagar (Noida)", "Ghaziabad", "Ghazipur", "Gonda", "Gorakhpur", 
      "Hamirpur", "Hapur", "Hardoi", "Hathras", "Jalaun", "Jaunpur", "Jhansi", "Kannauj", 
      "Kanpur Dehat", "Kanpur Nagar", "Kasganj", "Kaushambi", "Kheri (Lakhimpur)", "Kushinagar", 
      "Lalitpur", "Lucknow", "Maharajganj", "Mahoba", "Mainpuri", "Mathura", "Mau", "Meerut", 
      "Mirzapur", "Moradabad", "Muzaffarnagar", "Pilibhit", "Pratapgarh", "Prayagraj", 
      "Raebareli", "Rampur", "Saharanpur", "Sambhal", "Sant Kabir Nagar", "Shahjahanpur", 
      "Shamli", "Shravasti", "Siddharthnagar", "Sitapur", "Sonbhadra", "Sultanpur", "Unnao", "Varanasi"
    ]
  },
  uttarakhand: {
    name: "Uttarakhand (उत्तराखंड)",
    deptHelpline: "0135-2712240 / 1551",
    desc: "Agriculture Department, Govt. of Uttarakhand",
    districts: [
      "Almora", "Bageshwar", "Chamoli", "Champawat", "Dehradun", "Haridwar", 
      "Nainital", "Pauri Garhwal", "Pithoragarh", "Rudraprayag", "Tehri Garhwal", "Udham Singh Nagar", "Uttarkashi"
    ]
  },
  west_bengal: {
    name: "West Bengal (पश्चिम बंगाल)",
    deptHelpline: "1800-103-6000 / 1551",
    desc: "Department of Agriculture, Govt. of West Bengal (Krishak Bandhu)",
    districts: [
      "Alipurduar", "Bankura", "Birbhum", "Cooch Behar", "Dakshin Dinajpur", "Darjeeling", 
      "Hooghly", "Howrah", "Jalpaiguri", "Jhargram", "Kalimpong", "Kolkata", "Maldah", 
      "Murshidabad", "Nadia", "North 24 Parganas", "Paschim Bardhaman", "Paschim Medinipur", 
      "Purba Bardhaman", "Purba Medinipur", "Purulia", "South 24 Parganas", "Uttar Dinajpur"
    ]
  },
  andaman_nicobar: {
    name: "Andaman and Nicobar Islands (अंडमान और निकोबार द्वीप समूह)",
    deptHelpline: "03192-232144 / 1551",
    desc: "Directorate of Agriculture, Andaman & Nicobar Administration",
    districts: ["Nicobar", "North and Middle Andaman", "South Andaman"]
  },
  chandigarh: {
    name: "Chandigarh (चंडीगढ़)",
    deptHelpline: "0172-2740045 / 1551",
    desc: "Department of Agriculture, Chandigarh Administration",
    districts: ["Chandigarh"]
  },
  dadra_nagar_haveli_daman_diu: {
    name: "Dadra & Nagar Haveli and Daman & Diu (दादरा व नगर हवेली और दमन व दीव)",
    deptHelpline: "0260-2230856 / 1551",
    desc: "Department of Agriculture, UT Administration of DNH & DD",
    districts: ["Dadra and Nagar Haveli", "Daman", "Diu"]
  },
  delhi: {
    name: "Delhi / NCT (दिल्ली)",
    deptHelpline: "011-23860525 / 1551",
    desc: "Development Department, Agriculture Branch, Govt. of NCT of Delhi",
    districts: [
      "Central Delhi", "East Delhi", "New Delhi", "North Delhi", "North East Delhi", 
      "North West Delhi", "Shahdara", "South Delhi", "South East Delhi", "South West Delhi", "West Delhi"
    ]
  },
  jammu_kashmir: {
    name: "Jammu and Kashmir (जम्मू और कश्मीर)",
    deptHelpline: "0191-2505201 (Jammu) / 0194-2310675 (Kashmir) / 1551",
    desc: "Department of Agriculture Production & Farmers Welfare, J&K",
    districts: [
      "Anantnag", "Bandipora", "Baramulla", "Budgam", "Doda", "Ganderbal", "Jammu", 
      "Kathua", "Kishtwar", "Kulgam", "Kupwara", "Poonch", "Pulwama", "Rajouri", 
      "Ramban", "Reasi", "Samba", "Shopian", "Srinagar", "Udhampur"
    ]
  },
  ladakh: {
    name: "Ladakh (लद्दाख)",
    deptHelpline: "01982-252012 / 1551",
    desc: "Agriculture Department, UT Administration of Ladakh",
    districts: ["Leh", "Kargil"]
  },
  lakshadweep: {
    name: "Lakshadweep (लक्षद्वीप)",
    deptHelpline: "04896-262276 / 1551",
    desc: "Department of Agriculture, UT of Lakshadweep",
    districts: ["Lakshadweep"]
  },
  puducherry: {
    name: "Puducherry (पुदुचेरी)",
    deptHelpline: "0413-2222240 / 1551",
    desc: "Department of Agriculture and Farmers Welfare, Govt. of Puducherry",
    districts: ["Karaikal", "Mahe", "Puducherry", "Yanam"]
  }
};

const FESTIVALS = [
  { icon: "🪁", name: "Makar Sankranti / Pongal / Lohri / Magh Bihu", month: "January", season: "winter", desc: "Celebrated across India under many names, this marks the end of winter and the start of the harvest season." },
  { icon: "💐", name: "Basant Panchami / Saraswati Puja", month: "January–February", season: "winter", desc: "Welcoming the arrival of spring, Basant Panchami marks the blooming of mustard fields into golden yellow." },
  { icon: "🌾", name: "Baisakhi / Vaisakhi", month: "April", season: "rain", desc: "The most important harvest festival of Punjab, Baisakhi celebrates the rabi harvest — especially wheat." },
  { icon: "🎊", name: "Rongali Bihu (Bohag Bihu)", month: "April", season: "rain", desc: "The Assamese New Year and spring harvest festival, Rongali Bihu marks the beginning of the agricultural season." },
  { icon: "🌸", name: "Baisakhi / Vishu / Poila Baisakh / Puthandu", month: "April", season: "summer", desc: "The New Year harvest festival across Kerala (Vishu), Bengal (Poila Baisakh) and Tamil Nadu (Puthandu)." },
  { icon: "🎭", name: "Onam", month: "August–September", season: "rain", desc: "Kerala's grand harvest festival, Onam celebrates the homecoming of the legendary King Mahabali." },
  { icon: "🎋", name: "Nabanna / Nuakhai", month: "August–September", season: "rain", desc: "Nabanna in Bengal and Nuakhai in Odisha celebrate the new rice harvest of the monsoon season." },
  { icon: "🌾", name: "Hareli / Karam", month: "August", season: "rain", desc: "Celebrated in Chhattisgarh and parts of central India, Hareli marks the beginning of the agricultural season." },
  { icon: "🦚", name: "Pongal (Thai Pongal)", month: "January", season: "winter", desc: "The four-day Tamil harvest festival dedicated to the Sun God and cattle." },
  { icon: "🌟", name: "Gudi Padwa / Ugadi", month: "March–April", season: "summer", desc: "The New Year festival of Maharashtra (Gudi Padwa) and Karnataka, Andhra Pradesh and Telangana (Ugadi)." },
];

let CROPS = null;
let currentSeason = null;
let currentCrop = null;
let currentView = "welcome";

let serverCustomCrops = [];
let userFavoritesList = [];
let editingCropServerId = null;

const $ = (sel, root = document) => root.querySelector(sel);
const el = (tag, cls, html) => {
  const n = document.createElement(tag);
  if (cls) n.className = cls;
  if (html != null) n.innerHTML = html;
  return n;
};

function getCurrentUserEmail() {
  const profile = localStorage.getItem('userProfile');
  if (profile) {
    try { return JSON.parse(profile).email || ''; } catch (e) { return ''; }
  }
  return '';
}

/* ============================================================
   1. LIVE SERVER CROPS INTEGRATION
   ============================================================ */
async function fetchAndMergeServerCrops() {
  try {
    const res = await fetch(`${API_BASE_URL}/crops`);
    const data = await res.json();
    if (data.success && Array.isArray(data.crops)) {
      serverCustomCrops = data.crops;

      CROPS = JSON.parse(JSON.stringify(CROP_DATA));

      serverCustomCrops.forEach(crop => {
        if (CROPS[crop.season] && !CROPS[crop.season].some(c => c.name === crop.name)) {
          CROPS[crop.season].unshift(crop);
        }
      });

      if ($("#stat-crops")) {
        $("#stat-crops").textContent = Object.values(CROPS).reduce((a, b) => a + b.length, 0);
      }
      renderSeasons();
    }
  } catch (err) {
    console.error('Server crops could not be fetched, falling back to local dataset.', err);
  }
}

/* ============================================================
   2. FAVORITES MANAGEMENT
   ============================================================ */
async function fetchUserFavorites() {
  const email = getCurrentUserEmail();
  if (!email) return;

  try {
    const res = await fetch(`${API_BASE_URL}/favorites?email=${encodeURIComponent(email)}`);
    const data = await res.json();
    if (data.success && Array.isArray(data.favorites)) {
      userFavoritesList = data.favorites;
      localStorage.setItem('userFavorites', JSON.stringify(userFavoritesList));
    }
  } catch (err) {
    const cached = localStorage.getItem('userFavorites');
    userFavoritesList = cached ? JSON.parse(cached) : [];
  }
}

function isFavorite(cropName) {
  return userFavoritesList.some(f => f.name === cropName);
}

async function toggleFavorite(cropName, seasonKey, event) {
  if (event) event.stopPropagation();
  const email = getCurrentUserEmail();

  if (!email) {
    alert('Please log in to save crops to favorites.');
    return;
  }

  const existsIndex = userFavoritesList.findIndex(f => f.name === cropName);
  if (existsIndex > -1) {
    userFavoritesList.splice(existsIndex, 1);
  } else {
    userFavoritesList.push({ name: cropName, season: seasonKey });
  }
  localStorage.setItem('userFavorites', JSON.stringify(userFavoritesList));

  if (currentView === 'favorites-view') renderFavorites();
  else if (currentView === 'crops-view' && currentSeason) renderCropCards(currentSeason, $("#crop-search") ? $("#crop-search").value.trim().toLowerCase() : "");
  else if (currentView === 'recommend-view') {
    const form = $("#recommenderForm");
    if (form) form.dispatchEvent(new Event('submit'));
  }

  try {
    await fetch(`${API_BASE_URL}/favorites/toggle`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, cropName, season: seasonKey })
    });
  } catch (err) {
    console.error('Server sync error for favorite:', err);
  }
}

function renderFavorites() {
  const grid = $("#favorites-grid");
  if (!grid) return;

  grid.innerHTML = "";

  if (userFavoritesList.length === 0) {
    grid.innerHTML = `<div style="grid-column: 1/-1; text-align:center; padding: 50px 20px; color:#5d716a;">
      <h3>💔 No Favorite Crops Saved Yet</h3>
      <p style="margin-top: 8px;">Explore crops and click the Heart (❤️) icon on any card to save it permanently!</p>
    </div>`;
    return;
  }

  userFavoritesList.forEach((fav) => {
    const seasonCrops = CROPS[fav.season] || [];
    const crop = seasonCrops.find(c => c.name === fav.name);
    if (!crop) return;

    const card = el("div", "crop-card");
    card.onclick = () => goCropDetail(fav.season, crop.name);
    card.innerHTML = `
      <div class="thumb" style="position:relative;">
        <img src="${crop.img}" alt="${escapeHtml(crop.name)}" loading="lazy"
             onerror="this.src='data:image/svg+xml;utf8,<svg xmlns=\\'http://www.w3.org/2000/svg\\' width=\\'400\\' height=\\'300\\'><rect width=\\'100%25\\' height=\\'100%25\\' fill=\\'%23eef3f0\\'/><text x=\\'50%25\\' y=\\'50%25\\' font-family=\\'sans-serif\\' font-size=\\'22\\' fill=\\'%235a8a72\\' text-anchor=\\'middle\\' dy=\\'.35em\\'>${encodeURIComponent(crop.name)}</text></svg>'">
        <button onclick="toggleFavorite('${escapeHtml(crop.name)}', '${fav.season}', event)" 
                title="Remove from favorites"
                style="position:absolute; top:10px; right:10px; background:rgba(0,0,0,0.6); color:#ff4757; border:none; border-radius:50%; width:36px; height:36px; font-size:1.2rem; cursor:pointer; display:grid; place-items:center;">
          ❤️
        </button>
      </div>
      <div class="body">
        <div class="name">${escapeHtml(crop.name)}</div>
        <div class="hindi-name">${escapeHtml(crop.hindi || "")}</div>
        <div class="sci">${escapeHtml(crop.wiki)}</div>
        <div class="tags">
          <span class="tag rain">🌧️ ${escapeHtml(crop.rain)}</span>
          <span class="tag soil">🪴 ${shortSoil(crop.soil)}</span>
        </div>
        <div class="crop-desc">${escapeHtml(crop.desc)}</div>
        <div class="more">View details →</div>
      </div>`;
    grid.appendChild(card);
  });
}

/* ============================================================
   3. ADMIN DASHBOARD SYSTEM
   ============================================================ */
function renderAdminCustomCrops() {
  const tbody = document.getElementById('adminCustomCropsTable');
  if (!tbody) return;

  tbody.innerHTML = '';

  if (serverCustomCrops.length === 0) {
    tbody.innerHTML = `<tr><td colspan="4" style="text-align:center; padding: 20px; color:#888;">No custom crops added by admin yet.</td></tr>`;
    return;
  }

  serverCustomCrops.forEach((crop) => {
    const tr = document.createElement('tr');
    tr.style.borderBottom = '1px solid #eef3f0';
    tr.innerHTML = `
      <td style="padding: 10px 14px; font-weight: 600; color: #173a30;">${escapeHtml(crop.name)} (${escapeHtml(crop.hindi || '')})</td>
      <td style="padding: 10px 14px; text-transform: capitalize;">${escapeHtml(crop.season)}</td>
      <td style="padding: 10px 14px; color: #555;">${escapeHtml(crop.soil || 'Loamy')}</td>
      <td style="padding: 10px 14px; text-align: right; white-space: nowrap;">
        <button onclick="startEditCrop(${crop.id})" style="padding: 6px 12px; background: #2e8b57; color: white; border: none; border-radius: 6px; cursor: pointer; font-weight: 600; margin-right: 6px;">✏️ Edit</button>
        <button onclick="deleteCustomCrop(${crop.id}, '${escapeHtml(crop.name)}')" style="padding: 6px 12px; background: #ff4757; color: white; border: none; border-radius: 6px; cursor: pointer; font-weight: 600;">🗑️ Delete</button>
      </td>
    `;
    tbody.appendChild(tr);
  });
}

function startEditCrop(cropId) {
  const crop = serverCustomCrops.find(c => c.id === cropId);
  if (!crop) return;

  editingCropServerId = cropId;

  document.getElementById('adminCropName').value = crop.name || '';
  document.getElementById('adminCropHindi').value = crop.hindi || '';
  document.getElementById('adminCropWiki').value = crop.wiki || '';
  document.getElementById('adminCropSeason').value = crop.season || 'summer';
  document.getElementById('adminCropRain').value = crop.rain || '';
  document.getElementById('adminCropSoil').value = crop.soil || 'Alluvial soil';
  document.getElementById('adminCropImg').value = crop.img || '';
  document.getElementById('adminCropRegion').value = crop.region || '';
  document.getElementById('adminCropDesc').value = crop.desc || '';

  const heading = document.getElementById('adminFormHeading');
  const submitBtn = document.getElementById('adminSubmitBtn');
  const cancelBtn = document.getElementById('adminCancelEditBtn');

  if (heading) heading.textContent = `✏️ Edit Crop: ${crop.name}`;
  if (submitBtn) submitBtn.textContent = '💾 Update Crop (Save for Public)';
  if (cancelBtn) cancelBtn.style.display = 'inline-block';

  document.getElementById('addCropForm').scrollIntoView({ behavior: 'smooth' });
}

function resetAdminForm() {
  editingCropServerId = null;
  const form = document.getElementById('addCropForm');
  if (form) form.reset();

  const heading = document.getElementById('adminFormHeading');
  const submitBtn = document.getElementById('adminSubmitBtn');
  const cancelBtn = document.getElementById('adminCancelEditBtn');

  if (heading) heading.textContent = '➕ Add New Crop (नयी फसल जोड़ें)';
  if (submitBtn) submitBtn.textContent = '🚀 Add Crop to System';
  if (cancelBtn) cancelBtn.style.display = 'none';
}

async function deleteCustomCrop(cropId, cropName) {
  if (!confirm(`Are you sure you want to delete "${cropName}" for everyone?`)) return;

  try {
    const res = await fetch(`${API_BASE_URL}/crops/${cropId}`, { method: 'DELETE' });
    const data = await res.json();
    if (data.success) {
      await fetchAndMergeServerCrops();
      if (editingCropServerId === cropId) resetAdminForm();
      renderAdminCustomCrops();
      alert('Crop deleted successfully.');
    } else {
      alert('Failed: ' + data.message);
    }
  } catch (err) {
    alert('Server communication error.');
  }
}

function initAdminPanel() {
  const form = document.getElementById('addCropForm');
  const cancelBtn = document.getElementById('adminCancelEditBtn');
  if (!form) return;

  if (cancelBtn) cancelBtn.onclick = () => resetAdminForm();

  form.onsubmit = async (e) => {
    e.preventDefault();

    const cropPayload = {
      name: document.getElementById('adminCropName').value.trim(),
      hindi: document.getElementById('adminCropHindi').value.trim(),
      wiki: document.getElementById('adminCropWiki').value.trim() || document.getElementById('adminCropName').value.trim(),
      season: document.getElementById('adminCropSeason').value,
      rain: document.getElementById('adminCropRain').value.trim() || '50-100 cm',
      soil: document.getElementById('adminCropSoil').value.trim() || 'Loamy soil',
      img: document.getElementById('adminCropImg').value.trim() || 'assets/images/summer-bg.png',
      region: document.getElementById('adminCropRegion').value.trim() || 'Across India',
      desc: document.getElementById('adminCropDesc').value.trim()
    };

    const submitBtn = document.getElementById('adminSubmitBtn');
    submitBtn.disabled = true;
    submitBtn.textContent = 'Saving to Server...';

    try {
      if (editingCropServerId !== null) {
        const res = await fetch(`${API_BASE_URL}/crops/${editingCropServerId}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(cropPayload)
        });
        const data = await res.json();
        if (data.success) {
          alert(`✅ "${cropPayload.name}" updated successfully for all users!`);
          await fetchAndMergeServerCrops();
          resetAdminForm();
        } else {
          alert('Update failed: ' + data.message);
        }
      } else {
        const res = await fetch(`${API_BASE_URL}/crops`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(cropPayload)
        });
        const data = await res.json();
        if (data.success) {
          alert(`🎉 "${cropPayload.name}" added live! Everyone can view it now.`);
          await fetchAndMergeServerCrops();
          resetAdminForm();
        } else {
          alert('Add failed: ' + data.message);
        }
      }
    } catch (err) {
      alert('Network error connecting to backend.');
    } finally {
      submitBtn.disabled = false;
      renderAdminCustomCrops();
    }
  };
}

/* ============================================================
   4. NAVIGATION & VIEWS
   ============================================================ */
const VIEW_HISTORY = [];
const NAV_TAB_OF_VIEW = {
  "welcome-view": "welcome",
  "kisan-help-view": "kisan-help",
  "recommend-view": "recommend",
  "favorites-view": "favorites",
  "admin-view": "admin",
  "calculator-view": "calculator",
  "season-view": "season",
  "agri-view": "agri",
  "india-map-view": "india-map",
};

function highlightNavTab(tabKey) {
  document.querySelectorAll(".nav-link").forEach(b => {
    b.classList.toggle("active", b.dataset.nav === tabKey);
  });
}

function currentDescriptor() {
  return { view: currentView, season: currentSeason, crop: currentCrop ? currentCrop.name : null };
}

function showView(id, opts = {}) {
  document.querySelectorAll(".view").forEach(v => v.classList.remove("active"));
  const v = document.getElementById(id);
  if (v) v.classList.add("active");
  currentView = id;
  if (!opts.keepScroll) {
    window.scrollTo({ top: 0, behavior: id === "welcome-view" ? "auto" : "smooth" });
  }
  updateCrumb();
  highlightNavTab(NAV_TAB_OF_VIEW[id] || "welcome");
}

function navigate(id) {
  VIEW_HISTORY.push(currentDescriptor());
  showView(id);
  history.pushState({ view: id }, "", location.pathname + location.search);
}

window.addEventListener("popstate", () => {
  const prev = VIEW_HISTORY.pop();
  if (!prev) {
    showView("welcome-view");
    history.pushState({ view: "welcome-view" }, "", location.pathname + location.search);
    return;
  }
  if (prev.view === "crop-detail-view" && prev.season && prev.crop) {
    currentSeason = prev.season;
    const crop = CROPS[prev.season].find(c => c.name === prev.crop);
    if (crop) { currentCrop = crop; renderCropDetail(prev.season, crop); }
    showView("crop-detail-view", { keepScroll: true });
  } else if (prev.view === "crops-view" && prev.season) {
    currentSeason = prev.season; currentCrop = null;
    renderCropsList(prev.season);
    showView("crops-view", { keepScroll: true });
  } else {
    currentSeason = prev.season; currentCrop = null;
    showView(prev.view, { keepScroll: true });
  }
});

function goWelcome() { navigate("welcome-view"); currentSeason = null; currentCrop = null; }
function goKisanHelp() { navigate("kisan-help-view"); currentSeason = null; currentCrop = null; }
function goRecommend() { navigate("recommend-view"); currentSeason = null; currentCrop = null; }
function goFavorites() { renderFavorites(); navigate("favorites-view"); currentSeason = null; currentCrop = null; }
function goAdmin() {
  const pass = prompt("Enter Admin Password (Default: admin123):");
  if (pass === "admin123") {
    renderAdminCustomCrops();
    navigate("admin-view");
    currentSeason = null;
    currentCrop = null;
  } else if (pass !== null) {
    alert("❌ Incorrect Password!");
  }
}
function goCalculator() { navigate("calculator-view"); currentSeason = null; currentCrop = null; }
function goSeasons() { navigate("season-view"); currentSeason = null; currentCrop = null; }
function goIndiaMap() { initInteractiveMap(); navigate("india-map-view"); currentSeason = null; currentCrop = null; }
function goAgri() { navigate("agri-view"); currentSeason = null; currentCrop = null; }
function goCrops(season) {
  currentSeason = season;
  renderCropsList(season);
  navigate("crops-view");
}
function goCropDetail(season, name) {
  const crop = CROPS[season].find(c => c.name === name);
  if (!crop) return;
  currentSeason = season; currentCrop = crop;
  renderCropDetail(season, crop);
  navigate("crop-detail-view");
}

function updateCrumb() {
  const c = $("#crumb-current");
  if (!c) return;
  let trail = "";
  if (currentCrop) trail = currentCrop.name;
  else if (currentSeason) trail = SEASON_META[currentSeason].label + " Crops";
  else {
    const labels = {
      "kisan-help-view": "Kisan Help & Schemes",
      "recommend-view": "Smart Finder",
      "favorites-view": "Favorites",
      "admin-view": "Admin Dashboard",
      "calculator-view": "Fertilizer Calculator",
      "season-view": "Seasons",
      "india-map-view": "India Crop Map",
      "agri-view": "Agriculture & Festivals",
      "crops-view": "Crops",
      "crop-detail-view": "Crop Detail",
    };
    trail = labels[currentView] || "Home";
  }
  c.textContent = trail;
}

/* ============================================================
   5. KISAN HELP SECTION (UPDATED FOR DYNAMIC SELECTION)
   ============================================================ */
function initKisanHelpSection() {
  const stateSelect = document.getElementById("stateSelect");
  const districtSelect = document.getElementById("districtKvkSelect");
  const resultBox = document.getElementById("districtResultBox");
  const stateCardBadge = document.getElementById("stateCardBadge");
  const stateCardTitle = document.getElementById("stateCardTitle");
  const stateCardDesc = document.getElementById("stateCardDesc");
  const stateCardNumber = document.getElementById("stateCardNumber");
  const stateCardTelLink = document.getElementById("stateCardTelLink");

  if (!stateSelect || !districtSelect || !resultBox) return;

  // 1. Populate All 28 States & 8 UTs in State Dropdown
  stateSelect.innerHTML = '<option value="">-- राज्य / केंद्र शासित प्रदेश चुनें (Select State/UT) --</option>';
  Object.keys(STATE_AGRICULTURE_DATA).forEach((key) => {
    const opt = document.createElement("option");
    opt.value = key;
    opt.textContent = STATE_AGRICULTURE_DATA[key].name;
    stateSelect.appendChild(opt);
  });

  // 2. Populate Districts corresponding to selected State
  function populateDistricts(stateKey) {
    districtSelect.innerHTML = '<option value="">-- जिला चुनें (Select District) --</option>';

    if (!stateKey || !STATE_AGRICULTURE_DATA[stateKey]) {
      resultBox.innerHTML = "राज्य व जिले का चयन करने पर संपर्क विवरण यहाँ प्रदर्शित होगा।";
      return;
    }

    const stateData = STATE_AGRICULTURE_DATA[stateKey];

    if (stateCardTitle) stateCardTitle.textContent = `${stateData.name} Helpline`;
    if (stateCardBadge) stateCardBadge.textContent = `🏛️ ${stateData.name}`;
    if (stateCardDesc) stateCardDesc.textContent = stateData.desc;
    if (stateCardNumber) stateCardNumber.textContent = stateData.deptHelpline;
    if (stateCardTelLink) stateCardTelLink.href = `tel:${stateData.deptHelpline.split('/')[0].trim()}`;

    stateData.districts.forEach((distName) => {
      const opt = document.createElement("option");
      opt.value = distName;
      opt.textContent = distName;
      districtSelect.appendChild(opt);
    });

    resultBox.innerHTML = `<strong>${escapeHtml(stateData.name)}</strong> ke kul <strong>${stateData.districts.length} जिले</strong> uplabdh hain. Kripya apna zila chunein.`;
  }

  // Bind change & input events
  stateSelect.onchange = function() {
    populateDistricts(this.value);
  };

  districtSelect.onchange = function() {
    const stateKey = stateSelect.value;
    const distName = this.value;

    if (!stateKey || !distName || !STATE_AGRICULTURE_DATA[stateKey]) {
      resultBox.innerHTML = "चयनित जिले का विवरण यहाँ प्रदर्शित होगा।";
      return;
    }

    const stateData = STATE_AGRICULTURE_DATA[stateKey];
    resultBox.innerHTML = `
      <div style="font-weight: 700; color: #173a30; font-size: 1rem; margin-bottom: 5px;">
        📍 Selected: ${escapeHtml(distName)} (${escapeHtml(stateData.name)})
      </div>
      <div style="margin-bottom: 4px; color: #2e8b57; font-weight: 600;">
        🏢 <strong>KVK / District Agriculture Office:</strong> Krishi Vigyan Kendra (KVK), ${escapeHtml(distName)}
      </div>
      <div style="margin-bottom: 4px;">
        📞 <strong>Helpline / Phone:</strong> 
        <a href="tel:1551" style="color: #2e8b57; font-weight: 700; text-decoration: underline;">1551</a> / 
        <a href="tel:${stateData.deptHelpline.split('/')[0].trim()}" style="color: #2e8b57; font-weight: 700; text-decoration: underline;">${escapeHtml(stateData.deptHelpline)}</a>
      </div>
      <div style="font-size: 0.85rem; color: #555;">
        ℹ️ <em>${escapeHtml(stateData.desc)}</em>
      </div>
    `;
  };

  // Initial load with Bihar
  stateSelect.value = "bihar";
  populateDistricts("bihar");
}

function initInteractiveMap() {
  const cropBar = document.getElementById("map-crop-bar");
  if (!cropBar || !CROPS) return;
  cropBar.innerHTML = "";
  const allCrops = [];
  Object.keys(CROPS).forEach(season => {
    CROPS[season].forEach(crop => {
      if (!allCrops.some(c => c.name === crop.name)) allCrops.push({ ...crop, seasonKey: season });
    });
  });

  allCrops.forEach((crop, idx) => {
    const btn = document.createElement("button");
    btn.className = `map-crop-btn ${idx === 0 ? "active" : ""}`;
    btn.innerHTML = `<img src="${crop.img}" alt="${escapeHtml(crop.name)}" onerror="this.style.display='none'"><span>${escapeHtml(crop.name)}</span>`;
    btn.onclick = () => {
      document.querySelectorAll(".map-crop-btn").forEach(b => b.classList.remove("active"));
      btn.classList.add("active");
      highlightCropOnMap(crop);
    };
    cropBar.appendChild(btn);
  });
  if (allCrops.length > 0) highlightCropOnMap(allCrops[0]);
}

function highlightCropOnMap(crop) {
  const container = document.getElementById("state-pins-container");
  if (!container) return;
  container.innerHTML = "";
  const regionText = (crop.region || "").toLowerCase();
  let matchedStates = [];

  Object.keys(STATE_COORDINATES).forEach(stateKey => {
    if (regionText.includes(stateKey)) {
      const stateData = STATE_COORDINATES[stateKey];
      if (!matchedStates.some(s => s.name === stateData.name)) matchedStates.push(stateData);
    }
  });

  if (matchedStates.length === 0) {
    matchedStates = [STATE_COORDINATES["punjab"], STATE_COORDINATES["uttar pradesh"], STATE_COORDINATES["madhya pradesh"]];
  }

  matchedStates.forEach(state => {
    const pin = document.createElement("div");
    pin.className = "state-pin";
    pin.style.top = state.top;
    pin.style.left = state.left;
    pin.innerHTML = `<span class="state-pin-marker">📍</span><span class="state-pin-label">${state.name}</span>`;
    container.appendChild(pin);
  });

  if (document.getElementById("map-info-title")) document.getElementById("map-info-title").innerHTML = `🌱 ${escapeHtml(crop.name)} (${escapeHtml(crop.hindi || "")})`;
  if (document.getElementById("map-info-text")) document.getElementById("map-info-text").textContent = crop.desc || "Information available.";
  if (document.getElementById("map-info-crops")) {
    document.getElementById("map-info-crops").innerHTML = `
      <div style="margin-bottom: 6px;"><strong>📍 Major Growing States:</strong> ${escapeHtml(crop.region || "Across India")}</div>
      <div style="margin-bottom: 6px;"><strong>🌧️ Rainfall Needed:</strong> ${escapeHtml(crop.rain || "50-100 cm")}</div>
      <div><strong>🪴 Ideal Soil:</strong> ${escapeHtml(crop.soil || "Loamy Soil")}</div>
    `;
  }
}

function renderFestivals() {
  const grid = $("#festival-grid");
  if (!grid) return;
  grid.innerHTML = "";
  FESTIVALS.forEach(f => {
    const card = el("div", `festival-card season-${f.season}`);
    card.innerHTML = `
      <div class="festival-icon">${f.icon}</div>
      <div class="festival-body">
        <div class="festival-name">${escapeHtml(f.name)}</div>
        <div class="festival-month">📅 ${escapeHtml(f.month)}</div>
        <div class="festival-desc">${escapeHtml(f.desc)}</div>
        <div class="festival-season ${f.season}">${SEASON_META[f.season]?.icon || '🌾'} ${SEASON_META[f.season]?.label || ''} Season</div>
      </div>`;
    grid.appendChild(card);
  });
}

function renderSeasons() {
  const grid = $("#season-grid");
  if (!grid) return;
  grid.innerHTML = "";
  Object.keys(SEASON_META).forEach(key => {
    const m = SEASON_META[key];
    const card = el("div", `season-card ${key}`);
    card.onclick = () => goCrops(key);
    card.innerHTML = `
      <div class="bg" style="background-image:url('${m.bg}')"></div>
      <span class="accent-bar"></span>
      <div class="overlay">
        <div class="icon">${m.icon}</div>
        <h3>${m.label}</h3>
        <div class="meta">${m.tagline} · ${m.month}</div>
        <div class="desc">${m.desc}</div>
        <div class="go">Explore ${CROPS[key].length} crops →</div>
      </div>`;
    grid.appendChild(card);
  });
}

function renderCropsList(season) {
  const m = SEASON_META[season];
  const hero = $("#crops-hero");
  if (hero) {
    hero.querySelector(".bg").style.backgroundImage = `url('${m.bg}')`;
    hero.querySelector(".icon").textContent = m.icon;
    hero.querySelector("h2").textContent = `${m.label} Season Crops`;
    hero.querySelector("p").textContent = `${m.tagline} · ${m.month} · ${CROPS[season].length} crops`;
  }
  if ($("#crop-search")) $("#crop-search").value = "";
  renderCropCards(season, "");
  if ($("#crop-search")) {
    $("#crop-search").oninput = (e) => renderCropCards(season, e.target.value.trim().toLowerCase());
  }
}

function renderCropCards(season, query) {
  const grid = $("#crop-grid");
  if (!grid) return;
  const list = CROPS[season];
  const filtered = query
    ? list.filter(c => c.name.toLowerCase().includes(query) || (c.hindi || "").toLowerCase().includes(query) || (c.wiki || "").toLowerCase().includes(query) || (c.region || "").toLowerCase().includes(query))
    : list;

  if ($("#crop-count")) $("#crop-count").textContent = `${filtered.length} crop${filtered.length !== 1 ? "s" : ""}`;
  grid.innerHTML = "";
  if (!filtered.length) {
    grid.innerHTML = `<div class="no-results">😣 No crops match “${escapeHtml(query)}”. Try another name.</div>`;
    return;
  }

  filtered.forEach((crop, i) => {
    const favActive = isFavorite(crop.name);
    const card = el("div", "crop-card");
    card.style.animationDelay = `${Math.min(i * 0.03, 0.5)}s`;
    card.onclick = () => goCropDetail(season, crop.name);
    card.innerHTML = `
      <div class="thumb" style="position:relative;">
        <img src="${crop.img}" alt="${escapeHtml(crop.name)}" loading="lazy"
             onerror="this.src='data:image/svg+xml;utf8,<svg xmlns=\\'http://www.w3.org/2000/svg\\' width=\\'400\\' height=\\'300\\'><rect width=\\'100%25\\' height=\\'100%25\\' fill=\\'%23eef3f0\\'/><text x=\\'50%25\\' y=\\'50%25\\' font-family=\\'sans-serif\\' font-size=\\'22\\' fill=\\'%235a8a72\\' text-anchor=\\'middle\\' dy=\\'.35em\\'>${encodeURIComponent(crop.name)}</text></svg>'">
        <button onclick="toggleFavorite('${escapeHtml(crop.name)}', '${season}', event)" 
                title="${favActive ? 'Remove from favorites' : 'Save to favorites'}"
                style="position:absolute; top:10px; right:10px; background:rgba(0,0,0,0.5); color:${favActive ? '#ff4757' : '#ffffff'}; border:none; border-radius:50%; width:36px; height:36px; font-size:1.1rem; cursor:pointer; display:grid; place-items:center;">
          ${favActive ? '❤️' : '🤍'}
        </button>
      </div>
      <div class="body">
        <div class="name">${escapeHtml(crop.name)}</div>
        <div class="hindi-name">${escapeHtml(crop.hindi || "")}</div>
        <div class="sci">${escapeHtml(crop.wiki)}</div>
        <div class="tags"><span class="tag rain">🌧️ ${escapeHtml(crop.rain)}</span><span class="tag soil">🪴 ${shortSoil(crop.soil)}</span></div>
        <div class="crop-desc">${escapeHtml(crop.desc)}</div>
        <div class="region-note">📍 ${shortRegion(crop.region)}</div>
        <div class="more">View details →</div>
      </div>`;
    grid.appendChild(card);
  });
}

function shortRegion(r) {
  const parts = (r || "").split(",").map(s => s.trim());
  return parts.length <= 2 ? r : parts.slice(0, 2).join(", ") + " +more";
}

function shortSoil(s) {
  if (!s) return "Loamy soil";
  const head = s.split(";")[0].trim();
  return head.length > 32 ? head.slice(0, 30) + "…" : head;
}

function renderCropDetail(season, crop) {
  const m = SEASON_META[season];
  const hero = $("#detail-hero");
  if (hero) hero.querySelector(".bg").style.backgroundImage = `url('${crop.img}')`;
  if ($("#detail-back")) $("#detail-back").onclick = () => goCrops(season);
  if ($("#detail-name")) $("#detail-name").textContent = crop.name;
  if ($("#detail-hindi")) $("#detail-hindi").textContent = crop.hindi || "";
  if ($("#detail-sci")) $("#detail-sci").textContent = crop.wiki;
  if ($("#detail-season-chip")) $("#detail-season-chip").innerHTML = `${m.icon} ${m.label} Season · ${m.month}`;
  if ($("#detail-lead")) $("#detail-lead").textContent = crop.desc;
  if ($("#detail-rain")) $("#detail-rain").textContent = crop.rain;
  if ($("#detail-soil")) $("#detail-soil").textContent = crop.soil || "Well-drained loamy soil";
  if ($("#detail-region")) $("#detail-region").textContent = crop.region;
  if ($("#detail-season-full")) $("#detail-season-full").innerHTML = `${m.icon} ${m.label} Season<br><span style="font-weight:400;opacity:.8;font-size:.92rem">${m.tagline} (${m.month})</span>`;
  if ($("#detail-back-bottom")) $("#detail-back-bottom").onclick = () => goCrops(season);

  const defaultEquipments = [
    "🚜 Tractor / Cultivator (खेत जुताई)",
    "🌱 Seed Drill / Planter (बुवाई मशीन)",
    "💧 Water Pump / Drip Irrigation (सिंचाई यंत्र)",
    "🎒 Knapsack Sprayer (छिड़काव मशीन)",
    "🌾 Sickle / Harvester (फसल कटाई औजार)"
  ];
  const equipList = (crop.equipments && crop.equipments.length > 0) ? crop.equipments : defaultEquipments;
  const equipContainer = $("#detail-equipments");
  if (equipContainer) {
    equipContainer.innerHTML = equipList.map(item => `<span class="equip-pill">${escapeHtml(item)}</span>`).join('');
  }

  const defaultSteps = [
    { title: "Step 1: खेत की तैयारी (Field Preparation)", desc: "मिट्टी पलटने वाले हल या रोटावेटर से 2-3 बार गहरी जुताई करें। प्रति एकड़ 4-5 टन गोबर की खाद मिलाएँ।" },
    { title: "Step 2: बीज चयन एवं उपचार (Seed Selection & Treatment)", desc: "प्रमाणित बीजों का चयन करें। फफूंदजनित रोगों से बचाव के लिए बीजोपचार अवश्य करें।" },
    { title: "Step 3: बुवाई एवं रोपाई (Sowing & Transplantation)", desc: "कतार व पौधों की निश्चित दूरी रखते हुए बीजों को 2-4 सेमी गहराई में बोएँ।" },
    { title: "Step 4: सिंचाई एवं उर्वरक प्रबंधन (Irrigation & Nutrients)", desc: "बुवाई के तुरंत बाद पहली हल्की सिंचाई दें और संतुलित मात्रा में खाद दें।" },
    { title: "Step 5: निराई-गुड़ाई एवं कीट नियंत्रण (Weeding & Crop Care)", desc: "20-30 दिनों के भीतर खरपतवार निकालें और कीट दिखने पर अनुशंसित छिड़काव करें।" },
    { title: "Step 6: कटाई एवं सुरक्षित भंडारण (Harvesting & Storage)", desc: "फसल पकने पर उचित धूप में कटाई करें और सुखाकर सुरक्षित नमी स्तर पर भंडारित करें।" }
  ];
  const stepsList = (crop.steps && crop.steps.length > 0) ? crop.steps : defaultSteps;
  const stepsContainer = $("#detail-steps");
  if (stepsContainer) {
    stepsContainer.innerHTML = stepsList.map((step, idx) => `
      <div class="step-card">
        <div class="step-badge">${idx + 1}</div>
        <div class="step-info">
          <h4>${escapeHtml(step.title)}</h4>
          <p>${escapeHtml(step.desc)}</p>
        </div>
      </div>
    `).join('');
  }

  initCropReviewSystem(crop.name);
}

function initCropRecommender() {
  const form = $("#recommenderForm");
  const resultsContainer = $("#recommendationResults");
  if (!form) return;

  const soilKeywords = {
    alluvial: ["alluvial", "loam", "loamy", "silt", "ganga", "river", "rich"],
    black: ["black", "regur", "cotton soil", "deep black", "medium black"],
    red: ["red", "yellow", "red loam", "red soil"],
    laterite: ["laterite", "lateritic", "acidic", "ghats"],
    loam: ["loam", "loamy", "fertile loam", "sandy loam", "clay loam"],
    sandy: ["sandy", "arid", "desert", "light", "drought", "dry"],
    clay: ["clay", "clayey", "heavy soil", "water-retentive", "puddled"],
    mountain: ["mountain", "forest", "hill", "hilly", "humus", "stone"],
    saline: ["saline", "alkaline", "sodic", "salt", "coastal", "usar"],
    peaty: ["peaty", "marshy", "organic", "boggy", "waterlogged"],
    tarai: ["terai", "tarai", "swampy", "sub-mountain", "alluvial"],
    coastal: ["coastal", "beach", "coastal sand", "lateritic", "saline"],
    gravelly: ["gravelly", "skeletal", "rocky", "stony", "marginal", "poor"]
  };

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const selectedSeason = $("#recSeason").value;
    const selectedSoil = $("#recSoil").value;
    if (!CROPS || !CROPS[selectedSeason]) return;

    const list = CROPS[selectedSeason];
    const recommended = list.filter((crop) => {
      if (selectedSoil === "all") return true;
      const soilText = (crop.soil || "").toLowerCase();
      const keywords = soilKeywords[selectedSoil] || [selectedSoil.toLowerCase()];
      return keywords.some((kw) => soilText.includes(kw));
    });

    resultsContainer.innerHTML = "";
    if (recommended.length === 0) {
      resultsContainer.innerHTML = `<div style="grid-column: 1/-1; text-align:center; padding:30px; color:#6b7d76;">
        😣 Is soil type ke liye is season mein exact crop match nahi mili. Kripya "All Soil Types" chunein.
      </div>`;
      return;
    }

    recommended.forEach((crop) => {
      const favActive = isFavorite(crop.name);
      const card = el("div", "crop-card");
      card.onclick = () => goCropDetail(selectedSeason, crop.name);
      card.innerHTML = `
        <div class="thumb" style="position:relative;">
          <img src="${crop.img}" alt="${escapeHtml(crop.name)}" loading="lazy"
               onerror="this.src='data:image/svg+xml;utf8,<svg xmlns=\\'http://www.w3.org/2000/svg\\' width=\\'400\\' height=\\'300\\'><rect width=\\'100%25\\' height=\\'100%25\\' fill=\\'%23eef3f0\\'/><text x=\\'50%25\\' y=\\'50%25\\' font-family=\\'sans-serif\\' font-size=\\'22\\' fill=\\'%235a8a72\\' text-anchor=\\'middle\\' dy=\\'.35em\\'>${encodeURIComponent(crop.name)}</text></svg>'">
          <button onclick="toggleFavorite('${escapeHtml(crop.name)}', '${selectedSeason}', event)" 
                  title="${favActive ? 'Remove from favorites' : 'Save to favorites'}"
                  style="position:absolute; top:10px; right:10px; background:rgba(0,0,0,0.5); color:${favActive ? '#ff4757' : '#ffffff'}; border:none; border-radius:50%; width:36px; height:36px; font-size:1.1rem; cursor:pointer; display:grid; place-items:center;">
            ${favActive ? '❤️' : '🤍'}
          </button>
        </div>
        <div class="body">
          <div class="name">${escapeHtml(crop.name)}</div>
          <div class="hindi-name">${escapeHtml(crop.hindi || "")}</div>
          <div class="sci">${escapeHtml(crop.wiki)}</div>
          <div class="tags"><span class="tag rain">🌧️ ${escapeHtml(crop.rain)}</span><span class="tag soil">🪴 ${shortSoil(crop.soil)}</span></div>
          <div class="crop-desc">${escapeHtml(crop.desc)}</div>
          <div class="more">View details →</div>
        </div>`;
      resultsContainer.appendChild(card);
    });
  });
}

async function fetchWeather(cityName = 'Delhi') {
  const cityEl = document.getElementById('weatherCity');
  const tempEl = document.getElementById('weatherTemp');
  const descEl = document.getElementById('weatherDesc');
  const humidityEl = document.getElementById('weatherHumidity');
  const iconEl = document.getElementById('weatherIcon');
  if (!cityEl) return;

  try {
    descEl.textContent = 'Fetching weather...';
    const geoRes = await fetch(`https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(cityName)}&count=1&language=en&format=json`);
    const geoData = await geoRes.json();
    if (!geoData.results || geoData.results.length === 0) {
      descEl.textContent = 'City not found. Try another city!';
      return;
    }
    const { latitude, longitude, name, admin1 } = geoData.results[0];
    const weatherRes = await fetch(`https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current_weather=true&hourly=relativehumidity_2m`);
    const weatherData = await weatherRes.json();
    const current = weatherData.current_weather;
    const temp = Math.round(current.temperature);
    const weatherMap = {
      0: { text: 'Clear Sky', icon: '☀️' }, 1: { text: 'Mainly Clear', icon: '🌤️' }, 2: { text: 'Partly Cloudy', icon: '⛅' },
      3: { text: 'Overcast', icon: '☁️' }, 45: { text: 'Foggy', icon: '🌫️' }, 51: { text: 'Drizzle', icon: '🌦️' },
      61: { text: 'Rainy', icon: '🌧️' }, 71: { text: 'Snowy', icon: '❄️' }, 95: { text: 'Thunderstorm', icon: '🌩️' }
    };
    const condition = weatherMap[current.weathercode] || { text: 'Moderate Weather', icon: '🌤️' };
    cityEl.textContent = `${name}, ${admin1 || 'India'}`;
    tempEl.textContent = `${temp} °C`;
    descEl.textContent = condition.text;
    iconEl.textContent = condition.icon;
    humidityEl.textContent = `${weatherData.hourly.relativehumidity_2m[0]}%`;
  } catch (error) {
    if (descEl) descEl.textContent = 'Unable to load weather details.';
  }
}

function initWeatherWidget() {
  const searchBtn = document.getElementById('searchWeatherBtn');
  const inputEl = document.getElementById('weatherInput');
  fetchWeather('Delhi');
  if (searchBtn && inputEl) {
    searchBtn.addEventListener('click', () => { const q = inputEl.value.trim(); if (q) fetchWeather(q); });
    inputEl.addEventListener('keypress', (e) => { if (e.key === 'Enter') { const q = inputEl.value.trim(); if (q) fetchWeather(q); } });
  }
}

const MANDI_DATA = [
  { crop: "Wheat (गेहूं)", mandi: "Khanna, Punjab", min: "₹ 2,275", max: "₹ 2,450", modal: "₹ 2,350 / Qtl" },
  { crop: "Wheat (गेहूं)", mandi: "Indore, Madhya Pradesh", min: "₹ 2,300", max: "₹ 2,600", modal: "₹ 2,420 / Qtl" },
  { crop: "Rice / Paddy (धान)", mandi: "Karnal, Haryana", min: "₹ 3,200", max: "₹ 3,850", modal: "₹ 3,550 / Qtl" },
  { crop: "Rice / Paddy (धान)", mandi: "Burdwan, West Bengal", min: "₹ 2,100", max: "₹ 2,400", modal: "₹ 2,250 / Qtl" },
  { crop: "Mustard (सरसों)", mandi: "Bharatpur, Rajasthan", min: "₹ 5,100", max: "₹ 5,650", modal: "₹ 5,400 / Qtl" },
  { crop: "Potato (आलू)", mandi: "Agra, Uttar Pradesh", min: "₹ 1,200", max: "₹ 1,650", modal: "₹ 1,450 / Qtl" },
  { crop: "Cotton (कपास)", mandi: "Rajkot, Gujarat", min: "₹ 6,800", max: "₹ 7,500", modal: "₹ 7,150 / Qtl" },
  { crop: "Maize (मक्का)", mandi: "Davangere, Karnataka", min: "₹ 1,950", max: "₹ 2,250", modal: "₹ 2,100 / Qtl" }
];

function renderMandiPrices(filterCrop = "all") {
  const tbody = document.getElementById("mandiTableBody");
  if (!tbody) return;
  tbody.innerHTML = "";
  const filtered = filterCrop === "all" ? MANDI_DATA : MANDI_DATA.filter(item => item.crop.toLowerCase().includes(filterCrop.toLowerCase()));
  filtered.forEach((item) => {
    const tr = document.createElement("tr");
    tr.style.borderBottom = "1px solid #eef3f0";
    tr.innerHTML = `
      <td style="padding: 12px 16px; font-weight: 600; color: #173a30;">${item.crop}</td>
      <td style="padding: 12px 16px; color: #555;">📍 ${item.mandi}</td>
      <td style="padding: 12px 16px; color: #d9534f; font-weight: 600;">${item.min}</td>
      <td style="padding: 12px 16px; color: #2e8b57; font-weight: 600;">${item.max}</td>
      <td style="padding: 12px 16px; font-weight: 700; color: #10231f; background: #f9fbf9;">${item.modal}</td>
    `;
    tbody.appendChild(tr);
  });
}

function initMandiPrices() {
  const select = document.getElementById("mandiCropSelect");
  const refreshBtn = document.getElementById("refreshMandiBtn");
  renderMandiPrices("all");
  if (select) select.addEventListener("change", (e) => renderMandiPrices(e.target.value));
  if (refreshBtn) {
    refreshBtn.addEventListener("click", () => {
      refreshBtn.textContent = "⌛ Loading...";
      setTimeout(() => { renderMandiPrices(select ? select.value : "all"); refreshBtn.textContent = "🔄 Refresh Rates"; }, 500);
    });
  }
}

const CROP_REQUIREMENTS_PER_ACRE = {
  wheat: { seed: 40, urea: 65, dap: 50, potash: 20 },
  rice: { seed: 12, urea: 70, dap: 40, potash: 25 },
  maize: { seed: 8, urea: 85, dap: 50, potash: 30 },
  bajra: { seed: 2, urea: 40, dap: 30, potash: 15 },
  jowar: { seed: 4, urea: 45, dap: 30, potash: 20 },
  barley: { seed: 35, urea: 50, dap: 35, potash: 20 },
  ragi: { seed: 2, urea: 35, dap: 25, potash: 15 },
  sugarcane: { seed: 3000, urea: 150, dap: 60, potash: 50 },
  cotton: { seed: 2.5, urea: 90, dap: 45, potash: 30 },
  jute: { seed: 3, urea: 50, dap: 25, potash: 20 },
  potato: { seed: 1200, urea: 100, dap: 80, potash: 60 },
  onion: { seed: 4, urea: 60, dap: 45, potash: 35 },
  mustard: { seed: 2, urea: 45, dap: 30, potash: 15 },
  soybean: { seed: 30, urea: 25, dap: 50, potash: 25 },
  groundnut: { seed: 45, urea: 20, dap: 40, potash: 30 },
  sunflower: { seed: 3, urea: 40, dap: 40, potash: 25 },
  sesame: { seed: 2, urea: 25, dap: 20, potash: 15 },
  chickpea: { seed: 35, urea: 15, dap: 45, potash: 15 },
  pigeonpea: { seed: 8, urea: 15, dap: 40, potash: 15 },
  moong: { seed: 8, urea: 10, dap: 35, potash: 10 },
  urad: { seed: 8, urea: 10, dap: 35, potash: 10 },
  lentil: { seed: 15, urea: 15, dap: 40, potash: 15 },
  pea: { seed: 35, urea: 20, dap: 40, potash: 20 },
  chilli: { seed: 0.5, urea: 70, dap: 50, potash: 40 },
  tomato: { seed: 0.2, urea: 65, dap: 50, potash: 45 },
  garlic: { seed: 200, urea: 50, dap: 40, potash: 30 },
  turmeric: { seed: 800, urea: 80, dap: 50, potash: 60 },
  ginger: { seed: 700, urea: 75, dap: 45, potash: 50 }
};

function convertToAcres(val, unit) {
  switch (unit) {
    case "acre": return val;
    case "hectare": return val * 2.47105;
    case "bigha_std": return val / 1.6;
    case "bigha_wb": return val / 3.025;
    case "katha": case "biswa": return val / 32;
    case "guntha": return val / 40;
    case "cent": return val / 100;
    case "ground": return val / 18.15;
    case "kanal": return val / 8;
    case "marla": return val / 160;
    case "sq_yard": return val / 4840;
    case "sq_meter": return val / 4046.86;
    default: return val;
  }
}

function initFertilizerCalculator() {
  const form = document.getElementById("agriCalcForm");
  const resultsBox = document.getElementById("calcResults");
  if (!form) return;

  form.onsubmit = (e) => {
    e.preventDefault();
    const cropKey = document.getElementById("calcCrop").value;
    const landValue = parseFloat(document.getElementById("calcLandValue").value);
    const unit = document.getElementById("calcLandUnit").value;
    if (isNaN(landValue) || landValue <= 0) return;

    const acres = convertToAcres(landValue, unit);
    const req = CROP_REQUIREMENTS_PER_ACRE[cropKey] || { seed: 10, urea: 50, dap: 30, potash: 20 };

    document.getElementById("resSeed").textContent = `${(req.seed * acres).toFixed(acres < 0.1 ? 2 : 1)} kg`;
    document.getElementById("resUrea").textContent = `${(req.urea * acres).toFixed(acres < 0.1 ? 2 : 1)} kg`;
    document.getElementById("resDap").textContent = `${(req.dap * acres).toFixed(acres < 0.1 ? 2 : 1)} kg`;
    document.getElementById("resPotash").textContent = `${(req.potash * acres).toFixed(acres < 0.1 ? 2 : 1)} kg`;

    const acreText = document.getElementById("calculatedAcreText");
    if (acreText) acreText.textContent = `Equiv. Area: ${acres.toFixed(3)} Acre (एकड़)`;
    resultsBox.style.display = "block";
    resultsBox.scrollIntoView({ behavior: "smooth", block: "nearest" });
  };
}

function initMusic() {
  const audio = $("#bg-music");
  const btn = $("#music-toggle");
  if (!audio || !btn) return;
  let isPlaying = false;

  const safePlay = (onOk, onErr) => {
    let result;
    try { result = audio.play(); } catch (e) { if (onErr) onErr(e); return; }
    if (result && typeof result.then === "function") {
      result.then(onOk || (() => {})).catch(onErr || (() => {}));
    } else if (result !== undefined) {
      if (onOk) onOk();
    } else {
      if (onErr) onErr();
    }
  };

  btn.onclick = (e) => {
    e.stopPropagation();
    if (isPlaying) {
      audio.pause();
      isPlaying = false;
      btn.classList.remove("playing");
    } else {
      safePlay(() => { isPlaying = true; btn.classList.add("playing"); }, () => {});
    }
  };
}

function escapeHtml(s) {
  return String(s == null ? "" : s)
    .replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;").replace(/'/g, "&#39;");
}

/* ============================================================
   6. MAIN APP INITIALIZATION
   ============================================================ */
async function init() {
  if (typeof CROP_DATA === "undefined") {
    console.error("CROP_DATA not found - ensure javascript/data.js is loaded before app.js");
    return;
  }
  CROPS = JSON.parse(JSON.stringify(CROP_DATA));

  await fetchAndMergeServerCrops();
  await fetchUserFavorites();

  renderSeasons();
  renderFestivals();

  if ($("#welcome-cta")) $("#welcome-cta").onclick = () => document.querySelector(".welcome-part-2")?.scrollIntoView({ behavior: "smooth" });
  if ($("#scroll-hint")) $("#scroll-hint").onclick = () => document.querySelector(".welcome-part-2")?.scrollIntoView({ behavior: "smooth" });

  if ($("#opt-help")) $("#opt-help").onclick = () => goKisanHelp();
  if ($("#opt-recommend")) $("#opt-recommend").onclick = () => goRecommend();
  if ($("#opt-season")) $("#opt-season").onclick = () => goSeasons();
  if ($("#opt-agri")) $("#opt-agri").onclick = () => goAgri();
  if ($("#opt-map")) $("#opt-map").onclick = () => goIndiaMap();

  document.querySelectorAll(".nav-link").forEach(b => {
    b.onclick = () => {
      const nav = b.dataset.nav;
      if (nav === "welcome") goWelcome();
      else if (nav === "kisan-help") goKisanHelp();
      else if (nav === "recommend") goRecommend();
      else if (nav === "favorites") goFavorites();
      else if (nav === "admin") goAdmin();
      else if (nav === "calculator") goCalculator();
      else if (nav === "season") goSeasons();
      else if (nav === "agri") goAgri();
      else if (nav === "india-map") goIndiaMap();
    };
  });

  if ($("#home-btn")) $("#home-btn").onclick = () => goWelcome();
  if ($("#help-back-welcome")) $("#help-back-welcome").onclick = () => goWelcome();
  if ($("#help-go-seasons")) $("#help-go-seasons").onclick = () => goSeasons();
  if ($("#rec-back-welcome")) $("#rec-back-welcome").onclick = () => goWelcome();
  if ($("#rec-go-seasons")) $("#rec-go-seasons").onclick = () => goSeasons();
  if ($("#fav-back-welcome")) $("#fav-back-welcome").onclick = () => goWelcome();
  if ($("#fav-go-seasons")) $("#fav-go-seasons").onclick = () => goSeasons();
  if ($("#admin-back-welcome")) $("#admin-back-welcome").onclick = () => goWelcome();
  if ($("#calc-back-welcome")) $("#calc-back-welcome").onclick = () => goWelcome();
  if ($("#map-back-welcome")) $("#map-back-welcome").onclick = () => goWelcome();
  if ($("#map-go-seasons")) $("#map-go-seasons").onclick = () => goSeasons();
  if ($("#agri-back-welcome")) $("#agri-back-welcome").onclick = () => goWelcome();
  if ($("#agri-go-seasons")) $("#agri-go-seasons").onclick = () => goSeasons();

  initMusic();
  initKisanHelpSection();
  initCropRecommender();
  initWeatherWidget();
  initMandiPrices();
  initAdminPanel();
  initFertilizerCalculator();
  initInteractiveMap();

  history.replaceState({ view: "welcome-view" }, "", location.pathname + location.search);
  if (document.querySelector(".loader")) document.querySelector(".loader").classList.add("hide");
  showView("welcome-view");
}

document.addEventListener("DOMContentLoaded", init);

function initUserProfile() {
  const profileBtn = document.getElementById('userProfileBtn');
  const dropdown = document.getElementById('userDropdown');
  const logoutBtn = document.getElementById('logoutBtn');
  if (!profileBtn || !dropdown) return;

  const avatarImg = document.getElementById('userAvatar');
  const initialSpan = document.getElementById('userInitial');
  const userNameSpan = document.getElementById('userName');
  const dropdownName = document.getElementById('dropdownName');
  const dropdownEmail = document.getElementById('dropdownEmail');

  const profileData = localStorage.getItem('userProfile');
  if (profileData) {
    try {
      const user = JSON.parse(profileData);
      if (userNameSpan) userNameSpan.textContent = user.name || 'User';
      if (dropdownName) dropdownName.textContent = user.name || 'User';
      if (dropdownEmail) dropdownEmail.textContent = user.email || '';

      if (user.avatar && avatarImg) {
        avatarImg.src = user.avatar;
        avatarImg.style.display = 'block';
        if (initialSpan) initialSpan.style.display = 'none';
      } else if (initialSpan) {
        if (avatarImg) avatarImg.style.display = 'none';
        initialSpan.style.display = 'grid';
        initialSpan.textContent = (user.name || 'U').charAt(0).toUpperCase();
      }
    } catch (e) {
      console.error('User profile parse error', e);
    }
  }

  profileBtn.addEventListener('click', (e) => {
    e.stopPropagation();
    dropdown.classList.toggle('show');
  });

  document.addEventListener('click', () => dropdown.classList.remove('show'));

  if (logoutBtn) {
    logoutBtn.addEventListener('click', () => {
      localStorage.removeItem('isLoggedIn');
      localStorage.removeItem('userProfile');
      localStorage.removeItem('userFavorites');
      window.location.href = 'login page/login.html';
    });
  }
}

document.addEventListener('DOMContentLoaded', initUserProfile);

/* Comments Review Logic */
function getCropReviews(cropName) {
  const allReviews = localStorage.getItem('cropReviews');
  const reviewsObj = allReviews ? JSON.parse(allReviews) : {};
  return reviewsObj[cropName] || [];
}

function saveCropReview(cropName, author, comment) {
  const allReviews = localStorage.getItem('cropReviews');
  const reviewsObj = allReviews ? JSON.parse(allReviews) : {};
  if (!reviewsObj[cropName]) reviewsObj[cropName] = [];
  reviewsObj[cropName].unshift({
    author, comment,
    date: new Date().toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })
  });
  localStorage.setItem('cropReviews', JSON.stringify(reviewsObj));
}

function renderCropReviews(cropName) {
  const reviewsList = document.getElementById('cropReviewsList');
  if (!reviewsList) return;
  const reviews = getCropReviews(cropName);
  reviewsList.innerHTML = '';
  if (reviews.length === 0) {
    reviewsList.innerHTML = `<p style="color: #888; font-style: italic; font-size: 0.9rem;">No discussions yet. Be the first farmer to share a tip!</p>`;
    return;
  }
  reviews.forEach(r => {
    const item = document.createElement('div');
    item.style.padding = '12px 16px';
    item.style.background = '#f9fbf9';
    item.style.borderRadius = '10px';
    item.style.borderLeft = '4px solid #2e8b57';
    item.innerHTML = `
      <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 4px;">
        <strong style="color: #173a30; font-size: 0.95rem;">👤 ${escapeHtml(r.author)}</strong>
        <span style="font-size: 0.8rem; color: #888;">${r.date}</span>
      </div>
      <p style="color: #444; font-size: 0.9rem; margin: 0; line-height: 1.4;">${escapeHtml(r.comment)}</p>
    `;
    reviewsList.appendChild(item);
  });
}

function initCropReviewSystem(cropName) {
  renderCropReviews(cropName);
  const form = document.getElementById('cropReviewForm');
  if (!form) return;
  form.onsubmit = (e) => {
    e.preventDefault();
    const authorInput = document.getElementById('reviewAuthor');
    const commentInput = document.getElementById('reviewComment');
    const author = authorInput.value.trim();
    const comment = commentInput.value.trim();
    if (author && comment) {
      saveCropReview(cropName, author, comment);
      renderCropReviews(cropName);
      authorInput.value = '';
      commentInput.value = '';
    }
  };
}