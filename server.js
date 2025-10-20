// Backend Server untuk Pump Fun Halloween Party
// API key disimpan aman di server, user tidak perlu input API key

require('dotenv').config();
const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const OpenAI = require('openai');

const app = express();
const PORT = process.env.PORT || 3000;

// Initialize OpenAI dengan API key dari .env
const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY
});

// Middleware
app.use(helmet()); // Security headers
app.use(cors()); // Enable CORS untuk semua origins
app.use(express.json());
app.use(express.static('.')); // Serve static files (HTML, CSS, JS)

// Rate limiting - maksimal 10 requests per 5 menit per IP
const limiter = rateLimit({
    windowMs: 5 * 60 * 1000, // 5 minutes
    max: 10, // Limit each IP to 10 requests per windowMs
    message: {
        error: 'Too many requests from this IP, please try again after 5 minutes.'
    },
    standardHeaders: true,
    legacyHeaders: false,
});

// Apply rate limiter ke API routes
app.use('/api/', limiter);

// Health check endpoint
app.get('/api/health', (req, res) => {
    res.json({ 
        status: 'OK', 
        message: 'Halloween Party API is running!',
        timestamp: new Date().toISOString()
    });
});

// Main API endpoint untuk costume suggestions
app.post('/api/costume-suggestion', async (req, res) => {
    try {
        const { userName } = req.body;

        // Validasi input
        if (!userName || userName.trim() === '') {
            return res.status(400).json({ 
                error: 'Name is required',
                message: 'Please provide your name to get costume suggestion.'
            });
        }

        // Validasi panjang nama
        if (userName.length > 50) {
            return res.status(400).json({ 
                error: 'Name too long',
                message: 'Please provide a name with maximum 50 characters.'
            });
        }

        // Sanitize input
        const sanitizedName = userName.trim().replace(/[<>]/g, '');

        console.log(`[${new Date().toISOString()}] Generating costume suggestion for: ${sanitizedName}`);

        // Call OpenAI API
        const completion = await openai.chat.completions.create({
            model: process.env.OPENAI_MODEL || 'gpt-3.5-turbo',
            messages: [
                {
                    role: 'system',
                    content: `You are a creative Halloween costume consultant for the Pump Fun Halloween Party. 
Give personalized, creative, and fun Halloween costume suggestions based on the person's name. 
Make it spooky, creative, and exciting! Include why the costume fits them and some tips for making it amazing. 
Keep it under 200 words and make it entertaining! Format your response in HTML with proper styling.`
                },
                {
                    role: 'user',
                    content: `My name is ${sanitizedName}. What Halloween costume should I wear to the Pump Fun Halloween Party?`
                }
            ],
            max_tokens: parseInt(process.env.OPENAI_MAX_TOKENS) || 300,
            temperature: parseFloat(process.env.OPENAI_TEMPERATURE) || 0.9,
        });

        const suggestion = completion.choices[0].message.content;

        // Log success
        console.log(`[${new Date().toISOString()}] Successfully generated suggestion for: ${sanitizedName}`);

        // Return response
        res.json({
            success: true,
            userName: sanitizedName,
            suggestion: suggestion,
            timestamp: new Date().toISOString()
        });

    } catch (error) {
        console.error('Error generating costume suggestion:', error);

        // Handle different error types
        if (error.status === 429) {
            return res.status(429).json({
                error: 'Rate limit exceeded',
                message: 'OpenAI API rate limit reached. Please try again later.',
                fallback: true
            });
        }

        if (error.status === 401) {
            return res.status(500).json({
                error: 'API configuration error',
                message: 'Server configuration error. Please contact administrator.',
                fallback: true
            });
        }

        // Generic error response dengan fallback flag
        res.status(500).json({
            error: 'Failed to generate suggestion',
            message: 'Something went wrong. Please try again.',
            fallback: true,
            details: process.env.NODE_ENV === 'development' ? error.message : undefined
        });
    }
});

// Fallback suggestion endpoint (tanpa OpenAI)
app.post('/api/fallback-suggestion', (req, res) => {
    const { userName } = req.body;

    if (!userName || userName.trim() === '') {
        return res.status(400).json({ 
            error: 'Name is required'
        });
    }

    const sanitizedName = userName.trim();
    const suggestion = generateFallbackSuggestion(sanitizedName);

    res.json({
        success: true,
        userName: sanitizedName,
        suggestion: suggestion,
        isFallback: true,
        timestamp: new Date().toISOString()
    });
});

// Function untuk generate fallback suggestions
function generateFallbackSuggestion(userName) {
    const firstLetter = userName.charAt(0).toUpperCase();
    
    const suggestions = [
        {
            condition: (letter) => letter >= 'A' && letter <= 'E',
            costume: '🧛 Vampire Count/Countess',
            description: `Perfect for ${userName}! Your name screams elegance and mystery. Go for a classic vampire look with a velvet cape, fake fangs, and blood-red lipstick. Add some dramatic pale makeup and you'll be the most sophisticated undead at the party!`,
            tips: 'Pro tip: Carry a wine glass filled with "blood" (cranberry juice) and practice your best Transylvanian accent!'
        },
        {
            condition: (letter) => letter >= 'F' && letter <= 'J',
            costume: '👻 Phantom Ghost',
            description: `${userName}, with your mysterious aura, a ghostly phantom costume would be absolutely haunting! Think floating ethereal vibes with flowing white fabrics, chains, and eerie makeup. You'll be the spirit everyone talks about!`,
            tips: 'Add glow-in-the-dark paint to your costume and carry a flickering lantern for maximum spookiness!'
        },
        {
            condition: (letter) => letter >= 'K' && letter <= 'O',
            costume: '🧟 Zombie Apocalypse Survivor',
            description: `Hey ${userName}! Your name has that tough, survivor energy. Go as a zombie apocalypse survivor with ripped clothes, fake wounds, and survival gear. Or go full zombie with green makeup and torn flesh effects!`,
            tips: 'Use liquid latex and tissue to create realistic wounds. Add dirt and blood stains for authenticity!'
        },
        {
            condition: (letter) => letter >= 'P' && letter <= 'T',
            costume: '🎃 Pumpkin King/Queen',
            description: `${userName}, you're destined to rule the Halloween party! Channel your inner Jack Skellington with a Pumpkin King/Queen costume. Orange and black, crown made of vines, and a commanding presence!`,
            tips: 'Create a pumpkin head mask with LED lights inside, or go with stunning pumpkin-themed makeup!'
        },
        {
            condition: (letter) => letter >= 'U' && letter <= 'Z',
            costume: '🧙 Dark Witch/Warlock',
            description: `${userName}, your name has magical energy written all over it! A dark witch or warlock costume would be perfect. Think pointed hat, flowing robes, spell book, and a mystical staff. You'll cast a spell on everyone!`,
            tips: 'Carry a potion bottle with dry ice for smoking effect. Learn a few "magic tricks" to perform!'
        }
    ];

    // Find matching suggestion
    for (const suggestion of suggestions) {
        if (suggestion.condition(firstLetter)) {
            return `
                <h4 style="color: var(--primary-color); font-size: 24px; margin-bottom: 15px;">
                    ${suggestion.costume}
                </h4>
                <p style="margin-bottom: 15px; font-size: 16px;">
                    ${suggestion.description}
                </p>
                <p style="color: var(--secondary-color); font-style: italic; border-left: 3px solid var(--primary-color); padding-left: 15px; margin-top: 15px;">
                    💡 <strong>Costume Tips:</strong> ${suggestion.tips}
                </p>
                <p style="margin-top: 20px; text-align: center; font-size: 14px; opacity: 0.8;">
                    ⭐ This costume was magically selected based on your name's energy! ⭐
                </p>
            `;
        }
    }

    // Default fallback
    return `
        <h4 style="color: var(--primary-color); font-size: 24px; margin-bottom: 15px;">
            🎭 Classic Horror Icon
        </h4>
        <p style="margin-bottom: 15px;">
            ${userName}, you have a timeless name that deserves a classic horror costume! Consider going as Frankenstein's Monster, the Mummy, or a Classic Movie Monster. These iconic looks never go out of style!
        </p>
        <p style="color: var(--secondary-color); font-style: italic;">
            💡 <strong>Tip:</strong> Study classic horror movies for inspiration and add your own modern twist!
        </p>
    `;
}

// 404 handler
app.use((req, res) => {
    res.status(404).json({ 
        error: 'Not Found',
        message: 'The requested endpoint does not exist.'
    });
});

// Error handler
app.use((err, req, res, next) => {
    console.error('Server error:', err);
    res.status(500).json({ 
        error: 'Internal Server Error',
        message: 'Something went wrong on the server.'
    });
});

// Start server
app.listen(PORT, () => {
    console.log(`
╔════════════════════════════════════════════════════════╗
║   🎃 PUMP FUN HALLOWEEN PARTY API SERVER 🎃          ║
╚════════════════════════════════════════════════════════╝

✅ Server running on: http://localhost:${PORT}
✅ API endpoint: http://localhost:${PORT}/api/costume-suggestion
✅ Health check: http://localhost:${PORT}/api/health

📊 Configuration:
   • OpenAI Model: ${process.env.OPENAI_MODEL || 'gpt-3.5-turbo'}
   • Rate Limit: 10 requests per 5 minutes
   • Environment: ${process.env.NODE_ENV || 'development'}

🔒 Security:
   • API Key: ${process.env.OPENAI_API_KEY ? '✓ Configured' : '✗ Missing'}
   • CORS: Enabled
   • Helmet: Enabled
   • Rate Limiting: Enabled

🚀 Ready to serve costume suggestions!
    `);

    // Warn if API key is missing
    if (!process.env.OPENAI_API_KEY) {
        console.warn('\n⚠️  WARNING: OPENAI_API_KEY not found in .env file!');
        console.warn('   API will fallback to local suggestions only.\n');
    }
});

// Graceful shutdown
process.on('SIGTERM', () => {
    console.log('SIGTERM received. Shutting down gracefully...');
    server.close(() => {
        console.log('Server closed.');
        process.exit(0);
    });
});
