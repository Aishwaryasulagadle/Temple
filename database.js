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
    phone: "+91 98909 33567",
    whatsapp: "919890933567",
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
      artisansEmployed: "350+ Karigars & Sthapatis",
      heritageYears: "75+ Years & 4 Generations"
    }
  },
  temples: [
    {
      id: "temple-1",
      name: "Sri Maha Rajagopuram Devasthanam",
      deity: "Lord Sri Venkateswara (Balaji)",
      tradition: "Dravida",
      subType: "7-Tier White Monolith Rajagopuram & Golden Kalasham",
      stoneType: "Pristine Makrana Marble & Monolithic White Granite",
      location: "Pan-India Turnkey Project Site",
      country: "India",
      status: "Completed",
      year: "2024",
      height: "128 ft",
      area: "55,000 sq.ft",
      coverImage: "/images/white_gopuram_hero.png",
      images: [
        "/images/white_gopuram_hero.png",
        "/images/dravida_grand.png",
        "/images/carving_detail_1.png"
      ],
      description: "A monumental pure white Dravidian Rajagopuram masterpiece featuring intricate multi-tiered white stone masonry with golden deity sculptures on every course, culminating in 9 pure gold-leafed Kalasham pinnacles. Erected by our chief master contractor and travelling guild.",
      features: [
        "White stone multi-tier Rajagopuram with gold-plated deities",
        "81-Cell Paramasayika Vastupurusha Mandala core alignment",
        "Dry-fit assembled at Pune karkhana before ground crane installation",
        "Deepastambha and monolithic stone gateway sentinels"
      ],
      likes: 345,
      featured: true,
      createdAt: new Date().toISOString()
    },
    {
      id: "temple-2",
      name: "Shree Somnath Heritage Maha Mandir",
      deity: "Lord Shiva (Mahadev)",
      tradition: "Nagara",
      subType: "Latina & Sekhari Curvilinear Spire",
      stoneType: "Jaisalmer Golden Sandstone & Bansi Paharpur",
      location: "Saurashtra Coast, Gujarat",
      country: "India",
      status: "Completed",
      year: "2023",
      height: "155 ft",
      area: "42,000 sq.ft",
      coverImage: "/images/somnath_grand.png",
      images: [
        "/images/somnath_grand.png",
        "/images/carving_detail_1.png"
      ],
      description: "A monumental 7-tiered Nagara style sandstone temple built according to the classical Shilpa Ratnakara treatises. Featuring an expansive Sabha Mandapa with 72 hand-carved pillars, a gold-plated Kalasha crown, and an impenetrable corbelled shikhara.",
      features: [
        "Corbelled hollow shikhara with parabolic curvature",
        "Zero artificial iron bars used in core sanctum stone joints",
        "Ornate Rangamandapa with carved dome ceiling"
      ],
      likes: 280,
      featured: true,
      createdAt: new Date().toISOString()
    },
    {
      id: "temple-3",
      name: "Chennakesava Vesara Heritage Complex",
      deity: "Lord Vishnu / Chennakesava",
      tradition: "Vesara",
      subType: "16-Point Stellate Star Plan",
      stoneType: "Chloritic Schist & Soapstone Fine Filigree",
      location: "Deccan Plateau / Belur Region",
      country: "India",
      status: "Completed",
      year: "2022",
      height: "85 ft",
      area: "30,000 sq.ft",
      coverImage: "/images/vesara_grand.png",
      images: [
        "/images/vesara_grand.png"
      ],
      description: "The pinnacle of Deccan Hoysala & Chalukya fusion architecture. Raised upon a 5-foot star-shaped Jagati plinth with intricate friezes of elephants, lions, and dancing Madanikas with lathe-turned pillars.",
      features: [
        "16-pointed stellate star foundation geometry",
        "Over 650 hand-carved frieze panels",
        "Lathe-turned monolithic soapstone pillars"
      ],
      likes: 198,
      featured: true,
      createdAt: new Date().toISOString()
    },
    {
      id: "temple-4",
      name: "Radha Krishna Pristine Marble Sanctum",
      deity: "Sri Sri Radha Krishna",
      tradition: "Nagara",
      subType: "Samvarana & Sekhari",
      stoneType: "Pure Makrana Pristine White Marble",
      location: "Pan-India & Export Contract",
      country: "India",
      status: "In Progress",
      year: "2025-2026",
      height: "92 ft",
      area: "48,000 sq.ft",
      coverImage: "/images/marble_temple.png",
      images: [
        "/images/marble_temple.png"
      ],
      description: "Carved entirely in Grade-A Makrana marble at our specialized karkhana, every stone is dry-fitted and crated for assembly by our master Karigars.",
      features: [
        "Translucent Makrana marble with illuminated sanctum",
        "Elaborate peacocks and floral jali stone lattice screens",
        "Full circumambulatory pradakshina path"
      ],
      likes: 310,
      featured: true,
      createdAt: new Date().toISOString()
    },
    {
      id: "temple-5",
      name: "Maha Ganapati Shilpa Devasthanam",
      deity: "Lord Ganesha (Vighnaharta)",
      tradition: "Dravida",
      subType: "Ekatala Sanctum with Deepa Stambha",
      stoneType: "Red Sandstone & Chittoor Granite",
      location: "Pune & Mumbai Region",
      country: "India",
      status: "In Progress",
      year: "2025",
      height: "65 ft",
      area: "25,000 sq.ft",
      coverImage: "/images/ganesh_temple.png",
      images: [
        "/images/ganesh_temple.png"
      ],
      description: "Traditional Dravidian sanctum with hand-carved monolithic Deepastambha lamp tower and 32 postures of Lord Ganesha sculpted along outer walls.",
      features: [
        "Monolithic granite Deepastambha lamp pillar",
        "Integrated shaded stone portico and pradakshina"
      ],
      likes: 145,
      featured: false,
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
