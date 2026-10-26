const fs = require('fs');
const path = require('path');

const DB_FILE = path.join(__dirname, 'data', 'temple_data.json');

// Ensure data directory exists
const dataDir = path.join(__dirname, 'data');
if (!fs.existsSync(dataDir)) {
  fs.mkdirSync(dataDir, { recursive: true });
}

// Master Contractor Profile & Initial Seed Data
const initialData = {
  contractor: {
    name: "Acharya Someshwar Sthapati & Sons",
    title: "Chief Master Temple Contractor & Shilpa Shastra Architect",
    experience: "35+ Years of Master Turnkey Execution across Pan-India",
    phone: "+91 95353 43935",
    whatsapp: "919535343935",
    email: "contact@thetempleconstruction.com",
    headOffice: "GINI Viviana, Balewadi Highstreet, Balewadi, Pune - 411045, Maharashtra, India",
    quarryYards: "Pune (Maharashtra), Makrana (Rajasthan), Jaisalmer & Karkala (Karnataka)",
    panIndiaCoverage: "Maharashtra, Gujarat, Rajasthan, Tamil Nadu, Karnataka, Andhra Pradesh, Telangana, Uttar Pradesh, Madhya Pradesh, Delhi NCR, and International Exports.",
    bio: "Chief Master Contractor specialized in turnkey structural temple construction across Pan-India. Carrying forward a 4-generation family legacy of Shilpa Shastra, we supply stone directly from private quarries, manage in-house carving guilds (Karigars), handle structural RCC/stone foundation civil work, and erect towering Shikharas and Rajagopurams to the exact astrological and Vastu rules.",
    specializations: [
      "Turnkey Pan-India Stone & RCC Temple Contracts",
      "81-Cell Paramasayika & 64-Cell Vastupurusha Mandala Planning",
      "Monolithic Granite Rajagopurams & Dravida Vimanas",
      "Nagara Curvilinear Spire (Latina & Sekhari) Corbelled Construction",
      "Hoysala Stellate Star Plan Soapstone & Schist Carving",
      "Jirnoddharana (Ritual Renovation of Heritage Sanctums)",
      "Zero Iron Bar Sanctum Masonry (Engineered for 1,000+ Years Longevity)"
    ],
    stats: {
      templesCompleted: "1,200+",
      statesCovered: "22 Indian States",
      artisansEmployed: "20+ Years Experience",
      heritageYears: "75+ Years & 4 Generations"
    }
  },
  temples: [
    {
      id: "temple-1",
      name: "Mahadev Temple, Arni",
      deity: "Lord Shiva (Mahadev)",
      tradition: "Nagara",
      subType: "Size 11×11 ft · Temple Height 21 Feet",
      stoneType: "Carved Monolithic Stone & Nagara Shikhara Superstructure",
      location: "Arni, Tq: Arni, Dist: Yavatmal, Maharashtra",
      country: "India",
      status: "Completed",
      year: "2024",
      height: "21 Feet",
      area: "Size 11×11 ft",
      coverImage: "/images/rajagopuram_venkateswara.jpg",
      images: [
        "/images/rajagopuram_venkateswara.jpg",
        "/images/carving_detail_1.png"
      ],
      description: "Mahadev temple Arni tq Arni dist Yavatmal size 11×11 temple height 21 feet. Consecrated Lord Shiva sanctum featuring a sculpted corbelled Nagara Shikhara spire, sanctified Garbhagriha, and sacred Kalasham pinnacle executed by master temple artisans.",
      features: [
        "Mahadev temple Arni tq Arni dist Yavatmal",
        "Size 11×11 ft",
        "Temple height 21 feet",
        "Consecrated Lord Shiva (Mahadev) Garbhagriha sanctum",
        "Tiered Nagara Shikhara spire with crowning Kalasham pinnacle",
        "Zero iron bar stone masonry engineered according to classical Shilpa Shastra"
      ],
      likes: 345,
      featured: true,
      createdAt: new Date().toISOString()
    },
    {
      id: "temple-2",
      name: "Hanuman Temple, Mirghali",
      deity: "Lord Hanuman",
      tradition: "Nagara",
      subType: "Size 11×11 ft · Temple Height 25 Feet",
      stoneType: "Monolithic Dressed Stone & Nagara Shikhara Superstructure",
      location: "Mirghali, Tq: Nilanga, Dist: Latur, Maharashtra",
      country: "India",
      status: "Completed",
      year: "2024",
      height: "25 Feet",
      area: "Size 11×11 ft",
      coverImage: "/images/somnath_temple_shikhara.jpg",
      images: [
        "/images/somnath_temple_shikhara.jpg",
        "/images/carving_detail_1.png"
      ],
      description: "Hanuman temple Mirghali tq Nilanga dist Latur size 11×11 temple height 25 feet. Consecrated Lord Hanuman sanctum featuring a sculpted corbelled Nagara Shikhara spire, sacred Garbhagriha, ornamental stone mouldings, and auspicious Kalasham pinnacle executed by master temple artisans.",
      features: [
        "Hanuman temple Mirghali tq Nilanga dist Latur",
        "Size 11×11 ft",
        "Temple height 25 feet",
        "Consecrated Lord Hanuman Garbhagriha sanctum",
        "Tiered Nagara Shikhara spire with crowning Kalasham pinnacle",
        "Precision stone masonry and Shilpa Shastra compliant proportions"
      ],
      likes: 280,
      featured: true,
      createdAt: new Date().toISOString()
    },
    {
      id: "temple-3",
      name: "Veer Hanuman Mandir, Amarwara",
      deity: "Lord Hanuman (Veer Hanuman)",
      tradition: "Nagara",
      subType: "Size 30×40 ft · Temple Height 25 Feet",
      stoneType: "Carved Monolithic Stone & Nagara Shikhara Superstructure",
      location: "Amarwara, Tq: Harrai, Dist: Chhindwara, Madhya Pradesh",
      country: "India",
      status: "Completed",
      year: "2024",
      height: "25 Feet",
      area: "Size 30×40 ft",
      coverImage: "/images/veer_hanuman_mandir_amarwara.jpg",
      images: [
        "/images/veer_hanuman_mandir_amarwara.jpg",
        "/images/carving_detail_1.png"
      ],
      description: "Veer Hanuman Mandir Amarwara tq Harrai dist Chhindwara Madhya Pradesh size 30×40 temple height 25 feet. Consecrated Lord Veer Hanuman temple featuring a vibrant tiered Nagara Shikhara spire crowned with sacred Kalasham and flagpost, ornamental entrance Mandapa with sculpted pillars, arched sanctum windows, and spacious paved Pradakshina courtyard.",
      features: [
        "Veer Hanuman Mandir Amarwara tq Harrai dist Chhindwara MP",
        "Size 30×40 ft",
        "Temple height 25 feet",
        "Tiered golden-yellow Nagara Shikhara spire with auspicious Kalasham and sacred Dhwaja flagpost",
        "Covered entrance Mukha Mandapa with fluted columns and carved dome",
        "Spacious circumambulatory Pradakshina pathway and ornate window relief mouldings"
      ],
      likes: 198,
      featured: true,
      createdAt: new Date().toISOString()
    },
    {
      id: "temple-4",
      name: "Hanuman Temple, Bhootmungli",
      deity: "Lord Hanuman",
      tradition: "Nagara",
      subType: "Size 12×12 ft · Temple Height 31 Feet",
      stoneType: "Monolithic Dressed Stone & Nagara Shikhara Superstructure",
      location: "Bhootmungli, Tq: Nilanga, Dist: Latur, Maharashtra",
      country: "India",
      status: "Completed",
      year: "2024",
      height: "31 Feet",
      area: "Size 12×12 ft",
      coverImage: "/images/radha_krishna_temple.jpg",
      images: [
        "/images/radha_krishna_temple.jpg",
        "/images/carving_detail_1.png"
      ],
      description: "Hanuman temple Bhootmungli tq Nilanga dist Latur size 12×12 temple height 31 feet Maharashtra. Consecrated Lord Hanuman sanctum featuring a soaring multi-tier corbelled Nagara Shikhara spire, sanctified Garbhagriha, decorative stone mouldings, and auspicious Kalasham pinnacle executed by master temple artisans.",
      features: [
        "Hanuman temple Bhootmungli tq Nilanga dist Latur Maharashtra",
        "Size 12×12 ft",
        "Temple height 31 feet",
        "Consecrated Lord Hanuman Garbhagriha sanctum",
        "Towering 31 ft Nagara Shikhara spire crowned with sacred Kalasham",
        "Precision stone masonry and Shilpa Shastra compliant proportions"
      ],
      likes: 310,
      featured: true,
      createdAt: new Date().toISOString()
    },
    {
      id: "temple-5",
      name: "Veerbhadreshwar Temple, Kewad",
      deity: "Lord Veerbhadreshwar (Lord Shiva)",
      tradition: "Nagara",
      subType: "Size 30×40 ft · Temple 25 Feet + 11 Feet",
      stoneType: "RCC Reinforced Core with Ornate Traditional Stucco & Stone Craft",
      location: "Kewad, Tq: Madha, Dist: Solapur, Maharashtra",
      country: "India",
      status: "Completed",
      year: "2024",
      height: "25 feet + 11 feet (Total 36 Feet)",
      area: "Size 30×40 ft",
      coverImage: "/images/ganesh_temple_pune.jpg",
      images: [
        "/images/ganesh_temple_pune.jpg",
        "/images/carving_detail_1.png"
      ],
      description: "Veerbhadreshwar temple Kewad tq Madha dist Solapur size 30×40 temple 25 feet + 11 feet. Consecrated Lord Veerbhadreshwar Mandir featuring a multi-tier Nagara Shikhara spire of 25 feet with an 11-foot Kalasham pinnacle, sanctified Garbhagriha, spacious Sabha Mandapa, and ornate stone architectural mouldings.",
      features: [
        "Veerbhadreshwar temple Kewad tq Madha dist Solapur",
        "Size 30×40 ft",
        "Temple 25 feet + 11 feet (Total 36 Feet)",
        "Consecrated Lord Veerbhadreshwar (Lord Shiva) sanctum",
        "Tiered Nagara Shikhara spire crowned with sacred Kalasham finial",
        "Spacious Sabha Mandapa hall with traditional carved pillars and raised plinth"
      ],
      likes: 145,
      featured: true,
      createdAt: new Date().toISOString()
    },
    {
      id: "temple-6",
      name: "Sri Maha Shikhara Live Brick & Stone Superstructure",
      deity: "Lord Shiva & Shakti Devasthanam",
      tradition: "Nagara",
      subType: "Multi-tier Corbelled Shikhara & Spire Erection",
      stoneType: "High-Grade Kiln Brick & Basalt Stone Core",
      location: "Pan-India On-Site Turnkey Contract",
      country: "India",
      status: "In Progress",
      year: "2025-2026",
      height: "72 ft",
      area: "18,500 sq.ft",
      coverImage: "/images/site_work_tower_scaffolding.png",
      images: [
        "/images/site_erection_elevated_shikhara.jpg",
        "/images/site_work_tower_scaffolding.png",
        "/images/site_work_shikhara_masonry.png",
        "/images/site_work_artisan_carving_tower.jpg"
      ],
      description: "Live on-site structural erection of a classical multi-tier corbelled Shikhara tower. Crafted using traditional stepped interlocking geometry with heavy bamboo scaffolding, featuring stepped cornices, miniature niche recesses, and spherical amalaka base.",
      features: [
        "Live on-site stepped brick & stone shikhara masonry",
        "Traditional bamboo scaffolding engineered for elevation safety",
        "Corbelled hollow-core geometry according to Shilpa Shastra",
        "Precision lime & cement bonding for 500+ year longevity"
      ],
      likes: 412,
      featured: true,
      createdAt: new Date().toISOString()
    },
    {
      id: "temple-7",
      name: "Sri Maha Sabha Mandapa & Monolithic Pillared Hall",
      deity: "Sri Rama & Hanuman Mandir",
      tradition: "Dravida",
      subType: "Monolithic Stone Pillars & Elevated Sanctum Shikhara",
      stoneType: "Solid Dressed Granite Pillars & Brick Superstructure",
      location: "Maharashtra & Karnataka Project Site",
      country: "India",
      status: "In Progress",
      year: "2025",
      height: "58 ft",
      area: "22,000 sq.ft",
      coverImage: "/images/site_work_mandapa_stone_hall.png",
      images: [
        "/images/site_grand_mandapa_tiered_vimana.jpg",
        "/images/site_work_mandapa_stone_hall.png",
        "/images/site_work_tower_scaffolding.png",
        "/images/site_work_shikhara_masonry.png"
      ],
      description: "On-site erection of a massive open Sabha Mandapa featuring 16 hand-dressed monolithic stone pillars, heavy stone lintel beams, cantilevered stone sunshades (Chhajjas), and an elevated brick Shikhara under active scaffolding.",
      features: [
        "Hand-dressed monolithic granite pillar columns and bracket capitals",
        "Interlocking dry-joint beam-and-lintel structural assembly",
        "Elevated stone plinth (Adhishthana) with dressed perimeter walls",
        "Integrated covered circumambulation hall (Pradakshina Path)"
      ],
      likes: 388,
      featured: true,
      createdAt: new Date().toISOString()
    },
    {
      id: "temple-8",
      name: "Sri Mahadwara & Ornamental Temple Archway",
      deity: "Lord Dattatreya & Sadguru Ashram",
      tradition: "Dravida",
      subType: "Carved White Archway Mahadwara with Murti Niche",
      stoneType: "White Monolith Stone & Carved Lime Stucco",
      location: "Goa & Maharashtra Region",
      country: "India",
      status: "Completed",
      year: "2024",
      height: "32 ft",
      area: "8,000 sq.ft",
      coverImage: "/images/site_work_mahadwara_archway.jpg",
      images: [
        "/images/site_work_mahadwara_archway.jpg",
        "/images/site_work_mandapa_stone_hall.png"
      ],
      description: "Completed grand Mahadwara entrance portal featuring hand-sculpted floral columns, ornate pediment with seated saint sculpture in sanctum niche, ceremonial brass flagpost (Dhwaja Stambha), and perimeter enclosure wall.",
      features: [
        "Hand-sculpted relief floral pillar shafts and brackets",
        "Central archway pediment housing sanctified deity niche",
        "Weather-resistant sacred white lime finish",
        "Cast iron decorative gate with solar motif symbols"
      ],
      likes: 295,
      featured: true,
      createdAt: new Date().toISOString()
    },
    {
      id: "temple-9",
      name: "High Elevation Shikhara Artisans & Spire Detailing",
      deity: "Grama Devata & Sri Krishna Mandir",
      tradition: "Nagara",
      subType: "Live High-Altitude Shikhara Tier Carving & Masonry",
      stoneType: "Vedic Fired Red Brick & Hardstone Masonry",
      location: "Pan-India Live Construction Site",
      country: "India",
      status: "In Progress",
      year: "2025",
      height: "64 ft",
      area: "14,000 sq.ft",
      coverImage: "/images/site_work_artisan_carving_tower.jpg",
      images: [
        "/images/site_corbelled_brick_dome_masonry.jpg",
        "/images/site_work_artisan_carving_tower.jpg",
        "/images/site_work_shikhara_masonry.png",
        "/images/site_work_tower_scaffolding.png"
      ],
      description: "Live on-site craftsmanship by our travelling master artisans carrying out precision brick alignment, tier shaping, and Kalasha pinnacle alignment at high elevation on bamboo staging.",
      features: [
        "Traditional plumb-line symmetry verification according to Shilpa Shastra",
        "Artisans working at 35+ ft height on secure bamboo scaffolding",
        "Precision stepped tier layering for optimal wind & seismic load dissipation",
        "Complete turnkey civil & craft execution by Master Contractor"
      ],
      likes: 367,
      featured: true,
      createdAt: new Date().toISOString()
    },
    {
      id: "temple-19",
      name: "Renuka Temple, Mahagaon",
      deity: "Goddess Renuka Devi",
      tradition: "Dravida & Nagara",
      subType: "Size 29×8 ft · Temple Height 27 Feet",
      stoneType: "Monolithic Dressed Stone & Traditional Temple Stucco",
      location: "Mahagaon, Tq: Umarkhed, Dist: Nanded, Maharashtra",
      country: "India",
      status: "Completed",
      year: "2025",
      height: "27 Feet",
      area: "Size 29×8 ft",
      coverImage: "/images/consecrated_yellow_mahadwara.jpg",
      images: [
        "/images/consecrated_yellow_mahadwara.jpg"
      ],
      description: "Renuka temple size 29×8 hight 27 feet, Mahagaon tq umarkhed dist nanded. Consecrated ceremonial entrance Mahadwara portal featuring multi-tier yellow Dravidian stepped gopuram crest, sculpted seated deity niche, guardian dwarapalakas, and ceremonial scalloped archway.",
      features: [
        "Renuka temple Mahagaon tq umarkhed dist nanded",
        "Size 29×8 ft",
        "Temple height 27 feet",
        "Stepped yellow Dravidian temple gateway crest with central deity shrine",
        "Sculpted dwarapalaka attendants in prayer posture (Anjali Mudra)",
        "Traditional scalloped archway framing the temple inner compound",
        "Sturdy monolithic square columns with layered stone plinths"
      ],
      likes: 512,
      featured: true,
      createdAt: new Date().toISOString()
    },
    {
      id: "temple-20",
      name: "Khondoba Temple, Shrigonda",
      deity: "Lord Khandoba (Martanda Bhairava)",
      tradition: "Nagara",
      subType: "Size 30×40 ft · Temple 31 Feet + 11 Feet",
      stoneType: "RCC Reinforced Core with Ornate Traditional Stucco Craft",
      location: "Shrigonda, Tq: Shrigonda, Dist: Ahilyanagar, Maharashtra",
      country: "India",
      status: "Completed",
      year: "2024",
      height: "31 feet + 11 feet (Total 42 Feet)",
      area: "Size: 30×40 ft",
      coverImage: "/images/consecrated_dual_shikhara_mandir.jpg",
      images: [
        "/images/consecrated_dual_shikhara_mandir.jpg"
      ],
      description: "Khondoba temple shrigonda tq shrigonda dist ahilanagar size 30×40 temple 31 feet +11 feet. Consecrated Lord Khandoba Mandir featuring dual tiered colorful conical Shikharas with sacred Kalasham pinnacles, arched sanctum windows, and spacious compound.",
      features: [
        "Khondoba temple shrigonda tq shrigonda dist ahilanagar",
        "Size 30×40 ft",
        "Temple 31 feet + 11 feet (Total 42 Feet)",
        "Dual tiered conical Shikharas with sacred kalasham pinnacles and flagposts",
        "Enclosed Garbhagriha with traditional arched ventilation windows and raised stone plinth"
      ],
      likes: 628,
      featured: true,
      createdAt: new Date().toISOString()
    },
    {
      id: "temple-21",
      name: "Mahadev Temple, Jamner",
      deity: "Lord Shiva (Mahadev)",
      tradition: "Nagara",
      subType: "Size 25×25 ft · Temple Height 25 Feet",
      stoneType: "Carved Stone Pillars & Vibrant Shikhara Superstructure",
      location: "Jamner, Tq: Jamner, Dist: Jalgaon, Maharashtra",
      country: "India",
      status: "Completed",
      year: "2024",
      height: "25 Feet",
      area: "Size 25×25 ft",
      coverImage: "/images/consecrated_polychrome_spire_mandapa.jpg",
      images: [
        "/images/consecrated_polychrome_spire_mandapa.jpg"
      ],
      description: "Mahadev temple jamner tq jamner dist Jalgaon size 25×25 temple hight 25 feet. Magnificent finished temple with an open pillared Sabha Mandapa, sculpted decorative columns, archway brackets, carved lotus balustrades, and a soaring multi-tier polychrome Nagara Shikhara spire.",
      features: [
        "Mahadev temple jamner tq jamner dist Jalgaon",
        "Size 25×25 ft",
        "Temple height 25 feet",
        "Soaring multi-color tiered Nagara Shikhara with crowning golden Kalasham",
        "Open-air Sabha Mandapa with sculpted decorative stone pillars and scalloped arches"
      ],
      likes: 735,
      featured: true,
      createdAt: new Date().toISOString()
    }
  ],
  enquiries: []
};

function readDb() {
  try {
    if (!fs.existsSync(DB_FILE)) {
      fs.writeFileSync(DB_FILE, JSON.stringify(initialData, null, 2), 'utf-8');
      return initialData;
    }
    const content = fs.readFileSync(DB_FILE, 'utf-8');
    return JSON.parse(content);
  } catch (err) {
    console.error("Database read error:", err);
    return initialData;
  }
}

function writeDb(data) {
  try {
    fs.writeFileSync(DB_FILE, JSON.stringify(data, null, 2), 'utf-8');
    return true;
  } catch (err) {
    console.error("Database write error:", err);
    return false;
  }
}

module.exports = {
  readDb,
  writeDb
};
