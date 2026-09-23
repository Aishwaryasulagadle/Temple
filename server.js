const express = require('express');
const path = require('path');
const cors = require('cors');
const { readDb, writeDb } = require('./database');

const app = express();
const PORT = process.env.PORT || 3000;

// Setup middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Static files
app.use(express.static(path.join(__dirname, 'public')));
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// -------------------------------------------------------------
// PUBLIC REST API ROUTES
// -------------------------------------------------------------

// Get contractor information & Pan-India capability details
app.get('/api/contractor', (req, res) => {
  const db = readDb();
  res.json({ success: true, data: db.contractor });
});

// Get all temples (with optional tradition / status filter / search)
app.get('/api/temples', (req, res) => {
  const db = readDb();
  let list = db.temples || [];
  
  const { tradition, status, search } = req.query;
  if (tradition && tradition !== 'All') {
    list = list.filter(t => t.tradition.toLowerCase() === tradition.toLowerCase());
  }
  if (status && status !== 'All') {
    list = list.filter(t => t.status.toLowerCase() === status.toLowerCase());
  }
  if (search) {
    const query = search.toLowerCase();
    list = list.filter(t => 
      t.name.toLowerCase().includes(query) || 
      t.deity.toLowerCase().includes(query) ||
      t.location.toLowerCase().includes(query) ||
      t.stoneType.toLowerCase().includes(query)
    );
  }

  res.json({ success: true, count: list.length, data: list });
});

// Get single temple by ID
app.get('/api/temples/:id', (req, res) => {
  const db = readDb();
  const temple = (db.temples || []).find(t => t.id === req.params.id);
  if (!temple) {
    return res.status(404).json({ success: false, message: 'Temple not found' });
  }
  res.json({ success: true, data: temple });
});

// Devotee / Client Like action
app.post('/api/temples/:id/like', (req, res) => {
  const db = readDb();
  const templeIndex = (db.temples || []).findIndex(t => t.id === req.params.id);
  if (templeIndex === -1) {
    return res.status(404).json({ success: false, message: 'Temple not found' });
  }
  db.temples[templeIndex].likes = (db.temples[templeIndex].likes || 0) + 1;
  writeDb(db);
  res.json({ success: true, likes: db.temples[templeIndex].likes });
});

// Submit a temple construction booking / contractor enquiry form
app.post('/api/enquiries', (req, res) => {
  const { name, email, phone, deity, tradition, state, location, budget, landArea, message } = req.body;
  if (!name || !phone) {
    return res.status(400).json({ success: false, message: 'Name and phone number are required.' });
  }

  const db = readDb();
  const newEnquiry = {
    id: 'enq-' + Date.now(),
    name,
    email: email || '',
    phone,
    deity: deity || 'Not specified',
    tradition: tradition || 'Not decided',
    state: state || 'Pan-India',
    location: location || '',
    budget: budget || '',
    landArea: landArea || '',
    message: message || '',
    date: new Date().toISOString()
  };

  if (!db.enquiries) db.enquiries = [];
  db.enquiries.unshift(newEnquiry);
  writeDb(db);

  res.json({ 
    success: true, 
    message: 'Om Namah Shivaya. Your temple construction request has been received. Our Master Contractor will reach out directly to discuss drawings, Vastu orientation, and site estimates!', 
    data: newEnquiry 
  });
});

// -------------------------------------------------------------
// PAGE ROUTING
// -------------------------------------------------------------

app.get('/contractor', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'contractor.html'));
});

app.get('/projects', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'projects.html'));
});

app.get('/about', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'about.html'));
});

app.get('/contact', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'contact.html'));
});

app.get('/admin', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'admin.html'));
});

app.get('/admin.html', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'admin.html'));
});

app.get('/temple/:id', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'temple-detail.html'));
});

// Start Server with Graceful Port Fallback
function startServer(port) {
  const server = app.listen(port, () => {
    console.log(`\n======================================================`);
    console.log(`🏛️  Divine Temple Construction & Contractor Portal Online!`);
    console.log(`🌐  Live Site:  http://localhost:${port}`);
    console.log(`👷  Master Contractor Page:  http://localhost:${port}/contractor`);
    console.log(`📋  Book Temple Construction Form:  http://localhost:${port}/contact`);
    console.log(`======================================================\n`);
  });

  server.on('error', (err) => {
    if (err.code === 'EADDRINUSE') {
      console.warn(`⚠️ Port ${port} is currently busy. Trying next port ${port + 1}...`);
      startServer(port + 1);
    } else {
      console.error('Server error:', err);
    }
  });
}

startServer(PORT);
