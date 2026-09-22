// Admin dashboard logic - Authentication, CRUD, Image Uploads & Stats

let currentTab = 'dashboard';
let editingTempleId = null;

document.addEventListener('DOMContentLoaded', () => {
  checkAuth();
  initLoginForm();
  initTempleForm();
});

// Check if admin is currently logged in
async function checkAuth() {
  try {
    const res = await fetch('/api/admin/check-auth');
    const data = await res.json();
    const loginWrapper = document.getElementById('login-wrapper');
    const adminLayout = document.getElementById('admin-layout');

    if (data.authenticated) {
      if (loginWrapper) loginWrapper.style.display = 'none';
      if (adminLayout) adminLayout.style.display = 'flex';
      loadDashboardStats();
      loadTemplesTable();
      loadEnquiriesTable();
    } else {
      if (loginWrapper) loginWrapper.style.display = 'flex';
      if (adminLayout) adminLayout.style.display = 'none';
    }
  } catch (err) {
    console.error("Auth check error:", err);
  }
}

// Handle Admin Login
function initLoginForm() {
  const form = document.getElementById('admin-login-form');
  if (!form) return;

  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    const username = form.username.value;
    const password = form.password.value;
    const errorBox = document.getElementById('login-error');

    try {
      const res = await fetch('/api/admin/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password })
      });
      const data = await res.json();
      if (data.success) {
        checkAuth();
      } else {
        if (errorBox) {
          errorBox.textContent = data.message || "Invalid credentials";
          errorBox.style.display = 'block';
        }
      }
    } catch (err) {
      alert("Login server error");
    }
  });
}

// Handle Logout
async function adminLogout() {
  await fetch('/api/admin/logout', { method: 'POST' });
  window.location.reload();
}

// Switch Admin Tabs
function switchAdminTab(tab) {
  currentTab = tab;
  document.querySelectorAll('.sidebar-btn').forEach(btn => btn.classList.remove('active'));
  document.querySelectorAll('.admin-tab-pane').forEach(pane => pane.style.display = 'none');

  const activeBtn = document.getElementById(`tab-btn-${tab}`);
  const activePane = document.getElementById(`pane-${tab}`);
  if (activeBtn) activeBtn.classList.add('active');
  if (activePane) activePane.style.display = 'block';

  if (tab === 'dashboard') loadDashboardStats();
  if (tab === 'temples') loadTemplesTable();
  if (tab === 'enquiries') loadEnquiriesTable();
}

// Load Dashboard Analytics
async function loadDashboardStats() {
  try {
    const res = await fetch('/api/admin/stats');
    const data = await res.json();
    if (data.success) {
      const s = data.data;
      document.getElementById('stat-total-temples').textContent = s.totalTemples;
      document.getElementById('stat-completed').textContent = s.completedTemples;
      document.getElementById('stat-in-progress').textContent = s.inProgressTemples;
      document.getElementById('stat-likes').textContent = s.totalLikes;
      document.getElementById('stat-enquiries').textContent = s.totalEnquiries;
      document.getElementById('stat-new-enquiries').textContent = s.newEnquiries;
    }
  } catch (err) {
    console.error("Error loading stats:", err);
  }
}

// Load Temples Data Table
async function loadTemplesTable() {
  try {
    const res = await fetch('/api/temples');
    const data = await res.json();
    const tbody = document.getElementById('temples-tbody');
    if (!tbody) return;

    if (data.success && data.data) {
      tbody.innerHTML = data.data.map(t => `
        <tr>
          <td>
            <img src="${t.coverImage || '/images/somnath_grand.png'}" class="table-thumb" alt="${t.name}">
          </td>
          <td>
            <strong>${t.name}</strong><br>
            <small style="color:var(--admin-muted)">${t.deity}</small>
          </td>
          <td><span class="badge badge-blue">${t.tradition}</span></td>
          <td>${t.location || 'N/A'}</td>
          <td>
            <span class="badge ${t.status === 'Completed' ? 'badge-green' : 'badge-orange'}">
              ${t.status}
            </span>
          </td>
          <td>❤️ ${t.likes || 0}</td>
          <td>
            <div class="action-btn-group">
              <button class="icon-btn" onclick="editTemple('${t.id}')">✏️ Edit</button>
              <button class="icon-btn icon-btn-danger" onclick="deleteTemple('${t.id}')">🗑️ Delete</button>
            </div>
          </td>
        </tr>
      `).join('');
    }
  } catch (err) {
    console.error("Error loading table:", err);
  }
}

// Load Enquiries Table
async function loadEnquiriesTable() {
  try {
    const res = await fetch('/api/admin/enquiries');
    const data = await res.json();
    const tbody = document.getElementById('enquiries-tbody');
    if (!tbody) return;

    if (data.success && data.data) {
      tbody.innerHTML = data.data.map(e => `
        <tr>
          <td>${new Date(e.date).toLocaleDateString()}</td>
          <td><strong>${e.name}</strong></td>
          <td>
            <a href="tel:${e.phone}" style="color:var(--admin-accent)">${e.phone}</a><br>
            <small style="color:var(--admin-muted)">${e.email || ''}</small>
          </td>
          <td>${e.deity} (${e.tradition})</td>
          <td>${e.location || 'N/A'}</td>
          <td><small>${e.message || 'No remarks'}</small></td>
          <td>
            <span class="badge ${e.status === 'New' ? 'badge-orange' : 'badge-green'}">
              ${e.status}
            </span>
          </td>
          <td>
            <div class="action-btn-group">
              ${e.status === 'New' ? `<button class="icon-btn" onclick="markEnquiryContacted('${e.id}')">✓ Mark Done</button>` : ''}
              <button class="icon-btn icon-btn-danger" onclick="deleteEnquiry('${e.id}')">🗑️</button>
            </div>
          </td>
        </tr>
      `).join('');
    }
  } catch (err) {
    console.error("Error loading enquiries:", err);
  }
}

// Mark Enquiry as Contacted
async function markEnquiryContacted(id) {
  await fetch(`/api/admin/enquiries/${id}`, {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ status: 'Contacted' })
  });
  loadEnquiriesTable();
  loadDashboardStats();
}

// Delete Enquiry
async function deleteEnquiry(id) {
  if (!confirm("Are you sure you want to delete this enquiry?")) return;
  await fetch(`/api/admin/enquiries/${id}`, { method: 'DELETE' });
  loadEnquiriesTable();
  loadDashboardStats();
}

// Setup Temple Form (Add / Edit) with Image Uploads
function initTempleForm() {
  const form = document.getElementById('temple-manage-form');
  if (!form) return;

  // File input preview
  const fileInput = document.getElementById('temple-photos-input');
  const previewContainer = document.getElementById('upload-previews');
  
  if (fileInput && previewContainer) {
    fileInput.addEventListener('change', () => {
      previewContainer.innerHTML = '';
      Array.from(fileInput.files).forEach(file => {
        const reader = new FileReader();
        reader.onload = (e) => {
          const img = document.createElement('img');
          img.src = e.target.result;
          img.classList.add('preview-thumbnail');
          previewContainer.appendChild(img);
        };
        reader.readAsDataURL(file);
      });
    });
  }

  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    const submitBtn = form.querySelector('button[type="submit"]');
    submitBtn.disabled = true;
    submitBtn.textContent = "Uploading & Saving...";

    const formData = new FormData(form);

    const url = editingTempleId 
      ? `/api/admin/temples/${editingTempleId}` 
      : '/api/admin/temples';
    const method = editingTempleId ? 'PUT' : 'POST';

    try {
      const res = await fetch(url, {
        method: method,
        body: formData
      });
      const data = await res.json();
      if (data.success) {
        alert(data.message);
        form.reset();
        if (previewContainer) previewContainer.innerHTML = '';
        editingTempleId = null;
        document.getElementById('form-modal-title').textContent = "Upload & Add New Temple";
        closeTempleModal();
        loadTemplesTable();
        loadDashboardStats();
      } else {
        alert(data.message || "Failed to save temple.");
      }
    } catch (err) {
      alert("Error saving temple data.");
    } finally {
      submitBtn.disabled = false;
      submitBtn.textContent = "Save Temple & Publish";
    }
  });
}

// Open Modal to Add New Temple
function openNewTempleModal() {
  editingTempleId = null;
  const form = document.getElementById('temple-manage-form');
  if (form) form.reset();
  document.getElementById('upload-previews').innerHTML = '';
  document.getElementById('form-modal-title').textContent = "Upload & Add New Temple";
  document.getElementById('temple-form-modal').classList.add('active');
}

// Edit Temple
async function editTemple(id) {
  editingTempleId = id;
  try {
    const res = await fetch(`/api/temples/${id}`);
    const data = await res.json();
    if (data.success && data.data) {
      const t = data.data;
      const form = document.getElementById('temple-manage-form');
      form.name.value = t.name || '';
      form.deity.value = t.deity || '';
      form.tradition.value = t.tradition || 'Nagara';
      form.subType.value = t.subType || '';
      form.stoneType.value = t.stoneType || '';
      form.location.value = t.location || '';
      form.country.value = t.country || '';
      form.status.value = t.status || 'Completed';
      form.year.value = t.year || '';
      form.height.value = t.height || '';
      form.area.value = t.area || '';
      form.description.value = t.description || '';
      form.features.value = (t.features || []).join('\n');
      form.featured.checked = !!t.featured;

      document.getElementById('form-modal-title').textContent = `Edit Temple: ${t.name}`;
      document.getElementById('temple-form-modal').classList.add('active');
    }
  } catch (err) {
    alert("Could not load temple for editing");
  }
}

// Delete Temple
async function deleteTemple(id) {
  if (!confirm("Are you sure you want to delete this temple project?")) return;
  try {
    const res = await fetch(`/api/admin/temples/${id}`, { method: 'DELETE' });
    const data = await res.json();
    if (data.success) {
      loadTemplesTable();
      loadDashboardStats();
    }
  } catch (err) {
    alert("Delete failed");
  }
}

// Close Modal
function closeTempleModal() {
  document.getElementById('temple-form-modal').classList.remove('active');
}
