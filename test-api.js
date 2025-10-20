// Test script untuk costume-suggestion.js
const handler = require('./api/costume-suggestion.js');

// Mock request
const mockReq = {
    method: 'POST',
    body: {
        userName: 'TestUser'
    }
};

// Mock response
const mockRes = {
    headers: {},
    statusCode: 200,
    
    setHeader: function(key, value) {
        this.headers[key] = value;
        return this;
    },
    
    status: function(code) {
        this.statusCode = code;
        return this;
    },
    
    json: function(data) {
        console.log('\n========== RESPONSE ==========');
        console.log('Status Code:', this.statusCode);
        console.log('Headers:', this.headers);
        console.log('\nResponse Data:');
        console.log(JSON.stringify(data, null, 2));
        console.log('\nSuggestion Preview:');
        console.log(data.suggestion.substring(0, 200) + '...');
        console.log('==============================\n');
        return this;
    },
    
    end: function() {
        console.log('Response ended');
        return this;
    }
};

// Run test
console.log('\n🧪 Testing costume-suggestion.js...\n');
console.log('Request:', mockReq);

handler(mockReq, mockRes).catch(err => {
    console.error('❌ Test failed:', err);
});
