// App core interactivity & API integration

document.addEventListener('DOMContentLoaded', () => {
  initHeaderScroll();
  initLikeButtons();
  initMandalaVisualizer();
  initConsultationForm();
  loadFeaturedTemples();
});

// Header scroll effect
function initHeaderScroll() {
  const header = document.querySelector('.site-header');
  if (!header) return;

  window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  });
}

// Load featured temples for homepage
async function loadFeaturedTemples() {
  const container = document.getElementById('featured-temples-container');
  if (!container) return;

  try {
    const res = await fetch('/api/temples');
    const data = await res.json();
    if (data.success && data.data) {
      const temples = data.data.slice(0, 3); // Take top 3
      container.innerHTML = temples.map(t => renderTempleCard(t)).join('');
      attachLikeHandlers();
    }
  } catch (err) {
    console.error("Error loading temples:", err);
  }
}

// Render temple HTML card
function renderTempleCard(temple) {
  const isCompleted = temple.status === 'Completed';
  const badgeClass = isCompleted ? 'badge-completed' : 'badge-progress';
  
  return `
    <article class="temple-card" data-id="${temple.id}">
      <div class="temple-card-media">
        <img src="${temple.coverImage || '/images/somnath_grand.png'}" alt="${temple.name}" loading="lazy" />
        <button class="temple-like-btn" onclick="likeTemple('${temple.id}', this)" title="Like this temple">
          ❤️
        </button>
      </div>
      <div class="temple-card-body">
        <div class="temple-deity">${temple.deity} · <span style="color:var(--text-muted)">${temple.tradition} Style</span></div>
        <h3><a href="/temple/${temple.id}">${temple.name}</a></h3>
        <div class="temple-location">
          <span>📍</span> ${temple.location || 'India'}
        </div>
        <p class="temple-snippet">${(temple.description || '').substring(0, 130)}...</p>
        <div class="temple-card-footer">
          <div class="temple-likes-count">
            <span>✨</span> <span class="likes-num">${temple.likes || 0}</span> Blessings & Likes
          </div>
          <a href="/temple/${temple.id}" class="btn btn-outline-gold" style="padding: 0.45rem 0.95rem; font-size: 0.78rem;">Explore Work →</a>
        </div>
      </div>
    </article>
  `;
}

// Like temple action with live update
async function likeTemple(id, btnElement) {
  try {
    const res = await fetch(`/api/temples/${id}/like`, { method: 'POST' });
    const data = await res.json();
    if (data.success) {
      btnElement.classList.add('liked');
      const card = btnElement.closest('.temple-card');
      if (card) {
        const countSpan = card.querySelector('.likes-num');
        if (countSpan) countSpan.textContent = data.likes;
      }
      showToast("🌸 Blessed with like & appreciation!");
    }
  } catch (err) {
    console.error("Like error:", err);
  }
}

function initLikeButtons() {
  // Handlers attached dynamically or on cards
}

// Interactive Vastupurusha Mandala visualizer
function initMandalaVisualizer() {
  const mandalaContainer = document.getElementById('mandala-grid');
  if (!mandalaContainer) return;

  mandalaContainer.innerHTML = '';

  // 81-Cell (9x9) Devatas & Cardinal directions data
  const devataGrid = [
    ["ईशान\n(Ishana)", "पर्जन्य\n(Parjanya)", "जयन्त\n(Jayanta)", "इन्द्र\n(Indra)", "सूर्य\n(Surya)", "सत्य\n(Satya)", "भृश\n(Bhrisha)", "अन्तरिक्ष\n(Antariksha)", "अग्नि\n(Agni)"],
    ["दिति\n(Diti)", "आप\n(Aapa)", "आप\n(Aapa)", "मरीचि\n(Marichi)", "मरीचि\n(Marichi)", "मरीचि\n(Marichi)", "सावित्री\n(Savitri)", "सावित्री\n(Savitri)", "पूषा\n(Pusha)"],
    ["अदिति\n(Aditi)", "आप\n(Aapa)", "आप\n(Aapa)", "मरीचि\n(Marichi)", "मरीचि\n(Marichi)", "मरीचि\n(Marichi)", "सावित्री\n(Savitri)", "सावित्री\n(Savitri)", "वितथ\n(Vitatha)"],
    ["सोम\n(Soma)", "भूधर\n(Bhudhara)", "भूधर\n(Bhudhara)", "ब्रह्मा\n(Brahma)", "ब्रह्मा\n(Brahma)", "ब्रह्मा\n(Brahma)", "विवस्वान्\n(Vivaswan)", "विवस्वान्\n(Vivaswan)", "गृहक्षत\n(Grihakhata)"],
    ["सोम\n(Soma)", "भूधर\n(Bhudhara)", "भूधर\n(Bhudhara)", "ब्रह्मा\n(Brahma)", "ब्रह्मस्थान\n(Hridaya)", "ब्रह्मा\n(Brahma)", "विवस्वान्\n(Vivaswan)", "विवस्वान्\n(Vivaswan)", "यम\n(Yama)"],
    ["भल्लाट\n(Bhallata)", "भूधर\n(Bhudhara)", "भूधर\n(Bhudhara)", "ब्रह्मा\n(Brahma)", "ब्रह्मा\n(Brahma)", "ब्रह्मा\n(Brahma)", "विवस्वान्\n(Vivaswan)", "विवस्वान्\n(Vivaswan)", "गन्धर्व\n(Gandharva)"],
    ["मुख्य\n(Mukhya)", "रुद्र\n(Rudra)", "रुद्र\n(Rudra)", "मित्र\n(Mitra)", "मित्र\n(Mitra)", "मित्र\n(Mitra)", "इन्द्र\n(Indra)", "इन्द्र\n(Indra)", "भृङ्गराज\n(Bhrngaraja)"],
    ["नाग\n(Naga)", "रुद्र\n(Rudra)", "रुद्र\n(Rudra)", "मित्र\n(Mitra)", "मित्र\n(Mitra)", "मित्र\n(Mitra)", "इन्द्र\n(Indra)", "इन्द्र\n(Indra)", "मृग\n(Mriga)"],
    ["वायु\n(Vayu)", "शोष\n(Shosha)", "असुर\n(Asura)", "वरुण\n(Varuna)", "पुष्पदन्त\n(Pushpadanta)", "सुग्रीव\n(Sugriva)", "दौवारिक\n(Dauvarika)", "पितृ\n(Pitri)", "निर्ऋति\n(Nirriti)"]
  ];

  for (let row = 0; row < 9; row++) {
    for (let col = 0; col < 9; col++) {
      const cell = document.createElement('div');
      cell.classList.add('mandala-cell');
      
      const devataText = devataGrid[row][col];
      const isBrahma = (row >= 3 && row <= 5 && col >= 3 && col <= 5);
      const isCenterCore = (row === 4 && col === 4);

      if (isBrahma) {
        cell.classList.add('brahma');
        if (isCenterCore) {
          cell.innerHTML = `<span class="cell-om">ॐ</span><span class="cell-label">ब्रह्मस्थान</span>`;
        } else {
          cell.innerHTML = `<span class="cell-label">ब्रह्मा</span>`;
        }
        cell.title = "Brahmasthana (Centre 9 Cells) - Sacred Unweighted Garbhagriha Core";
      } else {
        const shortName = devataText.split('\n')[0];
        cell.innerHTML = `<span class="cell-label">${shortName}</span>`;
        cell.title = `Vastupurusha Pada [${row+1}, ${col+1}]: ${devataText.replace('\n', ' ')}`;
      }

      cell.addEventListener('mouseenter', () => {
        document.querySelectorAll('.mandala-cell').forEach(c => c.classList.remove('active'));
        cell.classList.add('active');

        const infoTitle = document.getElementById('mandala-info-title');
        const infoDesc = document.getElementById('mandala-info-desc');
        
        if (isBrahma) {
          if (infoTitle) infoTitle.textContent = "Brahmasthana (The Sacred Nucleus)";
          if (infoDesc) infoDesc.textContent = "The central 9 cells of the 81-cell Paramasayika Mandala. In Vedic temple architecture, this zone remains completely unweighted by heavy superstructures, channeling cosmic prana directly to the deity's Garbhagriha.";
        } else {
          const formattedName = devataText.replace('\n', ' ');
          if (infoTitle) infoTitle.textContent = `Pada [${row+1}, ${col+1}]: ${formattedName}`;
          if (infoDesc) infoDesc.textContent = `Governed by sacred deity ${formattedName}. This consecrated boundary quadrant dictates the placement of outer mandapas, circumambulatory pradakshina paths, gopurams, and ritual water bodies.`;
        }
      });

      mandalaContainer.appendChild(cell);
    }
  }
}

// Consultation Form Submission
function initConsultationForm() {
  const form = document.getElementById('temple-enquiry-form');
  if (!form) return;

  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    const submitBtn = form.querySelector('button[type="submit"]');
    const originalText = submitBtn.innerHTML;
    submitBtn.innerHTML = "Submitting Sacred Request...";
    submitBtn.disabled = true;

    const formData = {
      name: form.name.value,
      phone: form.phone.value,
      email: form.email.value,
      deity: form.deity.value,
      tradition: form.tradition.value,
      location: form.location.value,
      budget: form.budget ? form.budget.value : '',
      message: form.message.value
    };

    try {
      const res = await fetch('/api/enquiries', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });
      const data = await res.json();
      if (data.success) {
        form.reset();
        showToast("🕉️ Your consultation request has been received. Our Sthapatis will connect with you!");
      } else {
        alert(data.message || "Failed to submit enquiry");
      }
    } catch (err) {
      alert("Error submitting form. Please check your connection.");
    } finally {
      submitBtn.innerHTML = originalText;
      submitBtn.disabled = false;
    }
  });
}

// Toast helper
function showToast(msg) {
  let toast = document.getElementById('site-toast');
  if (!toast) {
    toast = document.createElement('div');
    toast.id = 'site-toast';
    toast.style.cssText = `
      position: fixed;
      bottom: 2rem;
      left: 50%;
      transform: translateX(-50%);
      background: linear-gradient(135deg, #1f2434 0%, #11131a 100%);
      border: 1px solid #d4af37;
      color: #fff;
      padding: 0.9rem 2rem;
      border-radius: 30px;
      box-shadow: 0 15px 35px rgba(0,0,0,0.8), 0 0 20px rgba(212,175,55,0.3);
      font-size: 0.95rem;
      z-index: 99999;
      display: flex;
      align-items: center;
      gap: 0.75rem;
      transition: all 0.3s ease;
    `;
    document.body.appendChild(toast);
  }
  toast.innerHTML = msg;
  toast.style.opacity = '1';
  toast.style.display = 'flex';
  setTimeout(() => {
    toast.style.opacity = '0';
    setTimeout(() => { toast.style.display = 'none'; }, 300);
  }, 4000);
}
