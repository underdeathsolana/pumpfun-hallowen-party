// Configuration for OpenAI API
// Jangan share file ini jika sudah berisi API key!

const CONFIG = {
    // OpenAI API Settings
    openai: {
        // Anda bisa set API key di sini, atau biarkan kosong untuk input manual
        apiKey: '', // Kosongkan untuk keamanan, atau isi: 'sk-your-key-here'
        model: 'gpt-3.5-turbo',
        maxTokens: 300,
        temperature: 0.9,
        
        // System prompt untuk AI
        systemPrompt: `You are a creative Halloween costume consultant. 
Give personalized, creative, and fun Halloween costume suggestions based on the person's name. 
Make it spooky, creative, and exciting! Include why the costume fits them and some tips for making it amazing. 
Keep it under 200 words and make it entertaining!`
    },
    
    // Event Settings
    event: {
        name: 'Pump Fun Halloween Party',
        date: 'October 31, 2025 20:00:00',
        location: 'The Haunted Mansion',
        address: '666 Spooky Street'
    },
    
    // Audio Settings
    audio: {
        enabled: false, // Default audio state
        volume: 0.5,
        screamInterval: 20000, // ms between random screams
        thunderInterval: 15000 // ms between thunder sounds
    },
    
    // Animation Settings
    animation: {
        spiderCount: 10,
        ghostCount: 5,
        particleCount: 10
    },
    
    // Feature Flags
    features: {
        enableOpenAI: true, // Set false to disable OpenAI integration
        enableAudio: true,
        enableAnimations: true,
        enableEasterEggs: true
    }
};

// Fungsi helper untuk get API key
CONFIG.getApiKey = function() {
    // Prioritas: localStorage > config > user input
    const storedKey = localStorage.getItem('openai_api_key');
    if (storedKey) return storedKey;
    if (this.openai.apiKey) return this.openai.apiKey;
    return null;
};

// Fungsi untuk save API key ke localStorage
CONFIG.saveApiKey = function(apiKey) {
    if (apiKey && apiKey.startsWith('sk-')) {
        localStorage.setItem('openai_api_key', apiKey);
        return true;
    }
    return false;
};

// Fungsi untuk clear API key
CONFIG.clearApiKey = function() {
    localStorage.removeItem('openai_api_key');
};

// Export config
if (typeof module !== 'undefined' && module.exports) {
    module.exports = CONFIG;
}
