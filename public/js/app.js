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
        <span class="temple-status-badge ${badgeClass}">${temple.status}</span>
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

function attachLikeHandlers() {
  // Handlers attached via inline onclick for speed & reliability
}

// Interactive Vastupurusha Mandala visualizer
function initMandalaVisualizer() {
  const mandalaContainer = document.getElementById('mandala-grid');
  if (!mandalaContainer) return;

  mandalaContainer.innerHTML = '';
  // 9x9 = 81 cells Paramasayika Grid
  for (let row = 0; row < 9; row++) {
    for (let col = 0; col < 9; col++) {
      const cell = document.createElement('div');
      cell.classList.add('mandala-cell');
      
      // Brahma Sthan (Centre 3x3 = 9 cells)
      if (row >= 3 && row <= 5 && col >= 3 && col <= 5) {
        cell.classList.add('brahma');
        cell.title = "Brahmasthana (Centre 9 Cells) - Unloaded Sacred Core";
      } else {
        cell.title = `Vastupurusha Grid Coordinate [${row+1}, ${col+1}]`;
      }

      cell.addEventListener('mouseenter', () => {
        const infoTitle = document.getElementById('mandala-info-title');
        const infoDesc = document.getElementById('mandala-info-desc');
        if (cell.classList.contains('brahma')) {
          if (infoTitle) infoTitle.textContent = "Brahmasthana (The Nucleus)";
          if (infoDesc) infoDesc.textContent = "The central 9 cells of the 81-cell Paramasayika Mandala. In Vedic temple architecture, this zone remains completely unweighted by heavy superstructures, channeling cosmic prana directly to the deity's Garbhagriha.";
        } else {
          if (infoTitle) infoTitle.textContent = `Pada Section (${col+1}, ${row+1})`;
          if (infoDesc) infoDesc.textContent = "Outer concentric ring dedicated to the presiding cosmic devatas (Indra, Surya, Agni, Yama, Varuna, Vayu, Kubera, Soma) governing alignment, drainage, and solar illumination.";
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
