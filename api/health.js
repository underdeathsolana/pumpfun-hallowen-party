// Health check endpoint for Vercel
module.exports = async (req, res) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
    
    if (req.method === 'OPTIONS') {
        res.status(200).end();
        return;
    }

    res.status(200).json({ 
        status: 'OK', 
        message: 'Halloween Party API is running on Vercel!',
        timestamp: new Date().toISOString(),
        apiKeyConfigured: !!process.env.OPENAI_API_KEY
    });
};
