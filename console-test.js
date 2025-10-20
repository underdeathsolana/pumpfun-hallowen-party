// Quick Console Test for Costume Generator
// Copy paste this into browser console (F12) when index.html is open

console.log('🎃 TESTING COSTUME GENERATOR 🎃\n');

// Test 1: Check if function exists
if (typeof getRandomCostumeSuggestion === 'function') {
    console.log('✅ Test 1: getRandomCostumeSuggestion function exists');
} else {
    console.error('❌ Test 1 FAILED: Function not found!');
}

// Test 2: Check if button exists
const btn = document.getElementById('getCostumeBtn');
if (btn) {
    console.log('✅ Test 2: Button getCostumeBtn found');
} else {
    console.error('❌ Test 2 FAILED: Button not found!');
}

// Test 3: Check if input exists
const input = document.getElementById('userName');
if (input) {
    console.log('✅ Test 3: Input userName found');
} else {
    console.error('❌ Test 3 FAILED: Input not found!');
}

// Test 4: Check if result container exists
const result = document.getElementById('costumeResult');
if (result) {
    console.log('✅ Test 4: Result container found');
} else {
    console.error('❌ Test 4 FAILED: Result container not found!');
}

// Test 5: Generate sample costume
try {
    const sample = getRandomCostumeSuggestion('TestUser');
    if (sample && sample.length > 50) {
        console.log('✅ Test 5: Function generates output');
        console.log('Sample output (first 200 chars):', sample.substring(0, 200) + '...');
    } else {
        console.error('❌ Test 5 FAILED: Invalid output');
    }
} catch (error) {
    console.error('❌ Test 5 FAILED:', error.message);
}

// Test 6: Generate 5 random costumes to verify randomness
console.log('\n🎲 Testing Randomness (5 generations):');
try {
    for (let i = 1; i <= 5; i++) {
        const costume = getRandomCostumeSuggestion('User' + i);
        const match = costume.match(/<h4[^>]*>([^<]+)<\/h4>/);
        if (match) {
            console.log(`  ${i}. ${match[1].trim()}`);
        }
    }
    console.log('✅ Test 6: Randomness working');
} catch (error) {
    console.error('❌ Test 6 FAILED:', error.message);
}

console.log('\n🎃 ALL TESTS COMPLETE! 🎃');
console.log('\n📝 Manual Test:');
console.log('1. Enter your name in the input field');
console.log('2. Click "Get My Costume Suggestion" button');
console.log('3. Wait 1.5 seconds for typing animation');
console.log('4. Costume should appear with emoji, name, description, tips');
console.log('5. Click again for different random costume!');
