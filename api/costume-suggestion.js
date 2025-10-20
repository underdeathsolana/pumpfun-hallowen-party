// Vercel Serverless Function - Simplified & Reliable Version

// Helper function untuk generate fallback suggestions
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

// Main serverless function handler
module.exports = async (req, res) => {
    // CORS headers
    res.setHeader('Access-Control-Allow-Credentials', true);
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,POST');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

    // Handle OPTIONS request
    if (req.method === 'OPTIONS') {
        return res.status(200).end();
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

        // Validate input
        if (!userName || userName.trim() === '') {
            return res.status(400).json({ 
                error: 'Name is required',
                message: 'Please provide your name'
            });
        }

        if (userName.length > 50) {
            return res.status(400).json({ 
                error: 'Name too long',
                message: 'Name must be less than 50 characters'
            });
        }

        const sanitizedName = userName.trim().replace(/[<>]/g, '');
        console.log(`[${new Date().toISOString()}] Processing: ${sanitizedName}`);

        // Try OpenAI if API key exists
        let suggestion = null;
        let usedOpenAI = false;

        if (process.env.OPENAI_API_KEY) {
            try {
                console.log('Calling OpenAI API...');
                const OpenAI = require('openai');
                const openai = new OpenAI({
                    apiKey: process.env.OPENAI_API_KEY
                });

                const completion = await openai.chat.completions.create({
                    model: 'gpt-3.5-turbo',
                    messages: [
                        {
                            role: 'system',
                            content: 'You are a creative Halloween costume consultant. Give personalized costume suggestions based on the person\'s name. Keep it under 200 words, make it fun and spooky! Format your response in HTML with inline styles.'
                        },
                        {
                            role: 'user',
                            content: `My name is ${sanitizedName}. What Halloween costume should I wear?`
                        }
                    ],
                    max_tokens: 300,
                    temperature: 0.9,
                });

                suggestion = completion.choices[0].message.content;
                usedOpenAI = true;
                console.log('✅ OpenAI success');
            } catch (openaiError) {
                console.error('❌ OpenAI error:', openaiError.message);
                // Will use fallback below
            }
        } else {
            console.log('⚠️ No API key configured');
        }

        // Use fallback if OpenAI failed or unavailable
        if (!suggestion) {
            suggestion = generateFallbackSuggestion(sanitizedName);
            usedOpenAI = false;
            console.log('📦 Using fallback suggestion');
        }

        // Return success
        return res.status(200).json({
            success: true,
            userName: sanitizedName,
            suggestion: suggestion,
            usedOpenAI: usedOpenAI,
            timestamp: new Date().toISOString()
        });

    } catch (error) {
        console.error('💥 Server error:', error);
        
        // Emergency fallback - always return something
        const safeName = req.body?.userName?.trim() || 'Guest';
        const emergencySuggestion = generateFallbackSuggestion(safeName);

        return res.status(200).json({
            success: true,
            userName: safeName,
            suggestion: emergencySuggestion,
            usedOpenAI: false,
            isFallback: true,
            timestamp: new Date().toISOString()
        });
    }
};
