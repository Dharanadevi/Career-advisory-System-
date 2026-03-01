const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');
const app = express();

// --- 1. DATABASE CONNECTION ---
// Ensure this is called so your routes don't hang waiting for a connection
connectDB();

// --- 2. MIDDLEWARE ---
// Use relaxed CORS to ensure your React app can connect without issues
app.use(cors({
    origin: "*", 
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"]
}));

// MUST be before routes so the server can read the job data you post
app.use(express.json());

// --- 3. HEALTH CHECK ROUTES ---
// Simple test route
app.get('/test', (req, res) => res.status(200).send("<h1>Server is Alive and Healthy!</h1>"));

// API specific health check (useful for your frontend to ping)
app.get('/api/health', (req, res) => {
    res.status(200).json({ 
        status: "online", 
        timestamp: new Date().toISOString() 
    });
});

// --- 4. MAIN ROUTES ---
app.use('/api/auth', require('./routes/authRoutes'));
app.use('/api/jobs', require('./routes/jobRoutes')); 

// --- 5. GLOBAL ERROR HANDLER ---
// This prevents the server from crashing if a route has an error
app.use((err, req, res, next) => {
    console.error("❌ Server Error:", err.stack);
    res.status(500).json({ error: "Something went wrong on the server!" });
});

// --- 6. START SERVER ---
const PORT = 5000;
// Using '0.0.0.0' allows connections from your local network (mobile devices, etc.)
app.listen(PORT, '0.0.0.0', () => {
    console.log(`\n====================================`);
    console.log(`🚀  Server running on http://localhost:${PORT}`);
    console.log(`✅  Health Check: http://localhost:${PORT}/api/health`);
    console.log(`====================================\n`);
});