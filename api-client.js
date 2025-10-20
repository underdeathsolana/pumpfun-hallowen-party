// API Configuration untuk Backend
const API_CONFIG = {
    // Backend API URL - ubah sesuai deployment Anda
    baseURL: window.location.hostname === 'localhost' 
        ? 'http://localhost:3000/api'  // Development
        : '/api',  // Production (same domain)
    
    endpoints: {
        costumeSuggestion: '/costume-suggestion',
        fallbackSuggestion: '/fallback-suggestion',
        health: '/health'
    },
    
    // Timeout untuk request (ms)
    timeout: 30000
};

// Function untuk call backend API
async function getCostumeFromBackend(userName) {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), API_CONFIG.timeout);
    
    try {
        const response = await fetch(`${API_CONFIG.baseURL}${API_CONFIG.endpoints.costumeSuggestion}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ userName }),
            signal: controller.signal
        });
        
        clearTimeout(timeoutId);
        
        const data = await response.json();
        
        if (!response.ok) {
            // Jika backend error, coba fallback
            if (data.fallback) {
                console.log('Backend error, using fallback...');
                return await getFallbackFromBackend(userName);
            }
            throw new Error(data.message || 'Failed to get suggestion');
        }
        
        return data.suggestion;
        
    } catch (error) {
        clearTimeout(timeoutId);
        console.error('Backend API error:', error);
        
        // Jika backend tidak available, gunakan local fallback
        if (error.name === 'AbortError') {
            console.log('Request timeout, using local fallback...');
        } else {
            console.log('Backend unavailable, using local fallback...');
        }
        
        return getFallbackCostumeSuggestion(userName);
    }
}

// Function untuk fallback dari backend
async function getFallbackFromBackend(userName) {
    try {
        const response = await fetch(`${API_CONFIG.baseURL}${API_CONFIG.endpoints.fallbackSuggestion}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ userName })
        });
        
        const data = await response.json();
        return data.suggestion;
        
    } catch (error) {
        // Ultimate fallback - local function
        return getFallbackCostumeSuggestion(userName);
    }
}
