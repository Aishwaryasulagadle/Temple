 # 🏛️ The Temple Construct - Pan-India Master Temple Contractor & Shilpa Shastra Portal

A modern, high-performance web application and master contractor portal for traditional stone and RCC temple construction across all 28 states of India. Rooted in classical **Shilpa Shastra**, **Agama Shastras**, and **Vedic Vastu**, this platform showcases canonical temple architecture, live on-site construction works, and provides a direct turnkey consultation & booking system.

---

## 🌟 Key Features

- **Pan-India Master Contractor Showcase**: Dedicated profile and capabilities for turnkey temple construction from land orientation, soil testing, quarry sourcing, karkhana carving, to crane erection and consecration rites.
- **Three Classical Architectural Traditions**:
  - **Dravida**: Stepped Tala Vimanas and monolithic white stone & granite Rajagopurams.
  - **Nagara**: Curvilinear Rekha-Deula spires (*Latina* & *Sekhari*) with corbelled masonry.
  - **Vesara**: 16-point stellate star plans, soapstone filigree, and lathe-turned pillars.
- **Interactive Vastupurusha Mandala Visualizer**: 81-cell (*Paramasayika*) interactive grid with core Brahmasthana highlighting and Sthapati rules.
- **Real On-Site Construction Gallery & Lightbox**: Live field photos of stepped brick & stone Shikharas under active scaffolding, 16-pillar monolithic stone Sabha Mandapa erection, and consecrated Mahadwara gateways with full-resolution click-to-zoom modal.
- **Turnkey Temple Application Form**: Complete booking form with material selection (Makrana Marble, Pink Sandstone, Golden Sandstone, Granite), plot sizing, budget tiers, and instant WhatsApp consultation.
- **Curated Vedic Theme Palette**:
  - **Background**: `#F5EFE3` (Warm Ivory)
  - **Primary Text**: `#291C14` (Deep Brown)
  - **Gold**: `#C6A24A` (Antique Gold)
  - **Saffron**: `#B85C24` (Temple Saffron)
  - **Maroon**: `#641F1F` (Deep Temple Red)
  - **Stone**: `#8B8173` (Natural Stone)
  - **Dark Section**: `#211813` (Deep Brown)
- **Typography Hierarchy**:
  - **Headings**: `Marcellus`
  - **Body**: `EB Garamond`
  - **Monospace / UI**: `IBM Plex Mono`

---

## 🚀 Getting Started

### Prerequisites
- [Node.js](https://nodejs.org/) (v16 or higher)

### Installation & Running Locally

1. Clone the repository:
   ```bash
   git clone https://github.com/Aishwaryasulagadle/Temple.git
   cd Temple
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the application:
   ```bash
   npm run dev
   ```

4. Open your browser and navigate to:
   ```
   http://localhost:3000
   ```

---

## 📂 Project Structure

```
Temple/
├── data/
│   └── temple_data.json         # Persistent JSON database for 13 temple projects & contractor profile
├── public/
│   ├── css/
│   │   └── main.css             # Master design system & stylesheet
│   ├── js/
│   │   └── app.js               # Interactive Mandala, dynamic cards, likes counter & form handling
│   ├── images/                  # High-resolution temple photos, hero graphics & site work captures
│   ├── index.html               # Home page
│   ├── contractor.html          # Pan-India Master Contractor capabilities & scope
│   ├── projects.html            # Portfolio gallery & live on-site construction works
│   ├── about.html               # 4-generation Shilpa Shastra lineage & export process
│   ├── contact.html             # Turnkey temple construction application form
│   └── temple-detail.html       # Individual temple architectural specification viewer
├── database.js                  # Database helper module
├── server.js                    # Express.js HTTP and REST API server
├── package.json                 # Project configuration and dependencies
└── README.md                    # Project documentation
```

---

## 📜 License
This project is open-source and available under the [MIT License](LICENSE).
