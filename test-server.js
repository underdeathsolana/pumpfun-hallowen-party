// Simple local test server for API endpoints
const express = require('express');
const cors = require('cors');
const path = require('path');

const app = express();
const PORT = 3000;

// Middleware
app.use(cors());
app.use(express.json());

// Import handlers
let costumeHandler, healthHandler;
try {
    costumeHandler = require('./api/costume-suggestion.js');
    healthHandler = require('./api/health.js');
    console.log('✅ Handlers loaded successfully');
} catch (err) {
    console.error('❌ Error loading handlers:', err.message);
    process.exit(1);
}

// Convert serverless function to Express route
app.post('/api/costume-suggestion', async (req, res) => {
    console.log('📥 Received request:', req.body);
    try {
        await costumeHandler(req, res);
    } catch (err) {
        console.error('❌ Handler error:', err);
        res.status(500).json({ error: err.message });
    }
});

app.get('/api/health', async (req, res) => {
    console.log('📥 Health check request');
    try {
        await healthHandler(req, res);
    } catch (err) {
        console.error('❌ Health check error:', err);
        res.status(500).json({ error: err.message });
    }
});

// Serve static files
app.use(express.static('.'));

// Error handler
app.use((err, req, res, next) => {
    console.error('💥 Server error:', err);
    res.status(500).json({ error: 'Internal server error', message: err.message });
});

// Start server
app.listen(PORT, () => {
    console.log(`
╔════════════════════════════════════════════════════════╗
║   🎃 LOCAL TEST SERVER                                ║
╚════════════════════════════════════════════════════════╝

✅ Server running on: http://localhost:${PORT}
✅ Frontend: http://localhost:${PORT}/index.html
✅ API endpoint: http://localhost:${PORT}/api/costume-suggestion
✅ Health check: http://localhost:${PORT}/api/health

📊 Test the website:
   1. Open http://localhost:${PORT} in browser
   2. Enter a name
   3. Click button
   4. Check console for logs (F12)

🛑 Press Ctrl+C to stop server
    `);
});
