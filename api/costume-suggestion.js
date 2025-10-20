// Vercel Serverless Function untuk Costume Suggestion
require('dotenv').config();
const OpenAI = require('openai');

// Initialize OpenAI
const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY
});

// Helper function untuk generate fallback
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

    for (const suggestion of suggestions) {
        if (suggestion.condition(firstLetter)) {
            return `
                <h4 style="color: #ff6b00; font-size: 24px; margin-bottom: 15px;">
                    ${suggestion.costume}
                </h4>
                <p style="margin-bottom: 15px; font-size: 16px;">
                    ${suggestion.description}
                </p>
                <p style="color: #8b00ff; font-style: italic; border-left: 3px solid #ff6b00; padding-left: 15px; margin-top: 15px;">
                    💡 <strong>Costume Tips:</strong> ${suggestion.tips}
                </p>
                <p style="margin-top: 20px; text-align: center; font-size: 14px; opacity: 0.8;">
                    ⭐ This costume was magically selected based on your name's energy! ⭐
                </p>
            `;
        }
    }

    return `
        <h4 style="color: #ff6b00; font-size: 24px; margin-bottom: 15px;">
            🎭 Classic Horror Icon
        </h4>
        <p style="margin-bottom: 15px;">
            ${userName}, you have a timeless name that deserves a classic horror costume! Consider going as Frankenstein's Monster, the Mummy, or a Classic Movie Monster. These iconic looks never go out of style!
        </p>
        <p style="color: #8b00ff; font-style: italic;">
            💡 <strong>Tip:</strong> Study classic horror movies for inspiration and add your own modern twist!
        </p>
    `;
}

module.exports = async (req, res) => {
    // Set CORS headers
    res.setHeader('Access-Control-Allow-Credentials', true);
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT');
    res.setHeader(
        'Access-Control-Allow-Headers',
        'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version'
    );

    // Handle OPTIONS request
    if (req.method === 'OPTIONS') {
        res.status(200).end();
        return;
    }

    // Only allow POST
    if (req.method !== 'POST') {
        return res.status(405).json({ 
            error: 'Method not allowed',
            message: 'Only POST requests are accepted'
        });
    }

    try {
        const { userName } = req.body;

        // Validasi input
        if (!userName || userName.trim() === '') {
            return res.status(400).json({ 
                error: 'Name is required',
                message: 'Please provide your name to get costume suggestion.'
            });
        }

        if (userName.length > 50) {
            return res.status(400).json({ 
                error: 'Name too long',
                message: 'Please provide a name with maximum 50 characters.'
            });
        }

        const sanitizedName = userName.trim().replace(/[<>]/g, '');

        console.log(`Generating costume for: ${sanitizedName}`);

        // Check if OpenAI API key is available
        if (!process.env.OPENAI_API_KEY) {
            console.log('No API key, using fallback');
            const suggestion = generateFallbackSuggestion(sanitizedName);
            return res.status(200).json({
                success: true,
                userName: sanitizedName,
                suggestion: suggestion,
                isFallback: true,
                timestamp: new Date().toISOString()
            });
        }

        // Call OpenAI API
        const completion = await openai.chat.completions.create({
            model: 'gpt-3.5-turbo',
            messages: [
                {
                    role: 'system',
                    content: `You are a creative Halloween costume consultant for the Pump Fun Halloween Party. 
Give personalized, creative, and fun Halloween costume suggestions based on the person's name. 
Make it spooky, creative, and exciting! Include why the costume fits them and some tips for making it amazing. 
Keep it under 200 words and make it entertaining! Format your response in HTML with proper styling using inline styles.`
                },
                {
                    role: 'user',
                    content: `My name is ${sanitizedName}. What Halloween costume should I wear to the Pump Fun Halloween Party?`
                }
            ],
            max_tokens: 300,
            temperature: 0.9,
        });

        const suggestion = completion.choices[0].message.content;

        console.log(`Successfully generated suggestion for: ${sanitizedName}`);

        return res.status(200).json({
            success: true,
            userName: sanitizedName,
            suggestion: suggestion,
            timestamp: new Date().toISOString()
        });

    } catch (error) {
        console.error('Error:', error);

        // Gunakan fallback jika error
        const sanitizedName = req.body?.userName?.trim() || 'Guest';
        const suggestion = generateFallbackSuggestion(sanitizedName);

        return res.status(200).json({
            success: true,
            userName: sanitizedName,
            suggestion: suggestion,
            isFallback: true,
            error: 'Used fallback due to API error',
            timestamp: new Date().toISOString()
        });
    }
};
