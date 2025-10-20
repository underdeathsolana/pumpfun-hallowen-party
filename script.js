// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    initializeSoundEffects();
    initializeCursorEffect();
    initializeSpiders();
    initializeCountdown();
    initializeButtons();
    initializeScrollAnimations();
    initializeCostumeAI();
});

// Sound Effects Management
let soundEnabled = false;
const backgroundMusic = document.getElementById('backgroundMusic');
const screamSound = document.getElementById('screamSound');
const thunderSound = document.getElementById('thunderSound');

function initializeSoundEffects() {
    const soundToggle = document.getElementById('soundToggle');
    const soundOn = soundToggle.querySelector('.sound-on');
    const soundOff = soundToggle.querySelector('.sound-off');
    
    soundToggle.addEventListener('click', function() {
        soundEnabled = !soundEnabled;
        
        if (soundEnabled) {
            soundOn.style.display = 'none';
            soundOff.style.display = 'inline';
            backgroundMusic.play().catch(e => console.log('Audio play failed:', e));
            
            // Random scream sounds
            setInterval(() => {
                if (soundEnabled && Math.random() > 0.7) {
                    screamSound.play().catch(e => console.log('Scream failed:', e));
                }
            }, 20000);
            
            // Thunder sounds on lightning
            setInterval(() => {
                if (soundEnabled) {
                    thunderSound.play().catch(e => console.log('Thunder failed:', e));
                }
            }, 15000);
        } else {
            soundOn.style.display = 'inline';
            soundOff.style.display = 'none';
            backgroundMusic.pause();
        }
    });
}

// Custom Cursor Effect
function initializeCursorEffect() {
    const cursorEffect = document.getElementById('cursorEffect');
    
    document.addEventListener('mousemove', (e) => {
        cursorEffect.style.left = e.clientX + 'px';
        cursorEffect.style.top = e.clientY + 'px';
    });
    
    // Add click effect
    document.addEventListener('click', (e) => {
        createParticles(e.clientX, e.clientY);
        if (soundEnabled && Math.random() > 0.8) {
            playRandomSound();
        }
    });
}

function createParticles(x, y) {
    const colors = ['#ff6b00', '#8b00ff', '#8b0000'];
    const particles = 10;
    
    for (let i = 0; i < particles; i++) {
        const particle = document.createElement('div');
        particle.style.position = 'fixed';
        particle.style.left = x + 'px';
        particle.style.top = y + 'px';
        particle.style.width = '10px';
        particle.style.height = '10px';
        particle.style.background = colors[Math.floor(Math.random() * colors.length)];
        particle.style.borderRadius = '50%';
        particle.style.pointerEvents = 'none';
        particle.style.zIndex = '9998';
        document.body.appendChild(particle);
        
        const angle = (Math.PI * 2 * i) / particles;
        const velocity = 2 + Math.random() * 3;
        
        animateParticle(particle, Math.cos(angle) * velocity, Math.sin(angle) * velocity);
    }
}

function animateParticle(particle, vx, vy) {
    let x = parseFloat(particle.style.left);
    let y = parseFloat(particle.style.top);
    let opacity = 1;
    
    function update() {
        x += vx;
        y += vy;
        opacity -= 0.02;
        
        particle.style.left = x + 'px';
        particle.style.top = y + 'px';
        particle.style.opacity = opacity;
        
        if (opacity > 0) {
            requestAnimationFrame(update);
        } else {
            particle.remove();
        }
    }
    
    update();
}

function playRandomSound() {
    const sounds = [screamSound, thunderSound];
    const randomSound = sounds[Math.floor(Math.random() * sounds.length)];
    randomSound.currentTime = 0;
    randomSound.play().catch(e => console.log('Sound failed:', e));
}

// Spider Animation
function initializeSpiders() {
    const canvas = document.getElementById('spiders');
    const ctx = canvas.getContext('2d');
    
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    
    const spiders = [];
    const spiderCount = 10;
    
    class Spider {
        constructor() {
            this.x = Math.random() * canvas.width;
            this.y = -50;
            this.speed = 0.3 + Math.random() * 0.5;
            this.threadLength = 50 + Math.random() * 200;
            this.swingAngle = 0;
            this.swingSpeed = 0.02 + Math.random() * 0.03;
        }
        
        update() {
            this.y += this.speed;
            this.swingAngle += this.swingSpeed;
            
            if (this.y > canvas.height + 50) {
                this.y = -50;
                this.x = Math.random() * canvas.width;
            }
        }
        
        draw() {
            const swingX = Math.sin(this.swingAngle) * 30;
            
            // Draw thread
            ctx.strokeStyle = 'rgba(200, 200, 200, 0.3)';
            ctx.lineWidth = 1;
            ctx.beginPath();
            ctx.moveTo(this.x, 0);
            ctx.lineTo(this.x + swingX, this.y);
            ctx.stroke();
            
            // Draw spider
            ctx.fillStyle = '#000';
            ctx.beginPath();
            ctx.arc(this.x + swingX, this.y, 5, 0, Math.PI * 2);
            ctx.fill();
            
            // Draw legs
            for (let i = 0; i < 8; i++) {
                const angle = (Math.PI * 2 * i) / 8;
                ctx.strokeStyle = '#000';
                ctx.lineWidth = 1;
                ctx.beginPath();
                ctx.moveTo(this.x + swingX, this.y);
                ctx.lineTo(
                    this.x + swingX + Math.cos(angle) * 10,
                    this.y + Math.sin(angle) * 10
                );
                ctx.stroke();
            }
        }
    }
    
    for (let i = 0; i < spiderCount; i++) {
        spiders.push(new Spider());
    }
    
    function animate() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        spiders.forEach(spider => {
            spider.update();
            spider.draw();
        });
        
        requestAnimationFrame(animate);
    }
    
    animate();
    
    window.addEventListener('resize', () => {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    });
}

// Countdown Timer
function initializeCountdown() {
    const targetDate = new Date(CONFIG.event.date).getTime();
    
    function updateCountdown() {
        const now = new Date().getTime();
        const distance = targetDate - now;
        
        const days = Math.floor(distance / (1000 * 60 * 60 * 24));
        const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((distance % (1000 * 60)) / 1000);
        
        document.getElementById('days').textContent = String(days).padStart(2, '0');
        document.getElementById('hours').textContent = String(hours).padStart(2, '0');
        document.getElementById('minutes').textContent = String(minutes).padStart(2, '0');
        document.getElementById('seconds').textContent = String(seconds).padStart(2, '0');
        
        if (distance < 0) {
            document.getElementById('countdown').innerHTML = '<h2 style="color: var(--primary-color); font-size: 48px;">🎃 THE PARTY HAS BEGUN! 🎃</h2>';
        }
    }
    
    updateCountdown();
    setInterval(updateCountdown, 1000);
}

// Button Interactions
function initializeButtons() {
    const enterBtn = document.getElementById('enterBtn');
    const costumeBtn = document.getElementById('costumeBtn');
    const costumeSection = document.getElementById('costumeSection');
    
    enterBtn.addEventListener('click', function() {
        if (soundEnabled) {
            screamSound.play().catch(e => console.log('Sound failed:', e));
        }
        
        // Scroll to info section with smooth animation
        document.querySelector('.info-section').scrollIntoView({ 
            behavior: 'smooth',
            block: 'start'
        });
        
        // Add shake effect
        this.style.animation = 'shake 0.5s';
        setTimeout(() => {
            this.style.animation = '';
        }, 500);
    });
    
    costumeBtn.addEventListener('click', function() {
        costumeSection.scrollIntoView({ 
            behavior: 'smooth',
            block: 'start'
        });
    });
}

// Scroll Animations
function initializeScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -100px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);
    
    // Animate sections on scroll
    document.querySelectorAll('.info-card, .gallery-item, .countdown-item').forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(50px)';
        el.style.transition = 'all 0.6s ease-out';
        observer.observe(el);
    });
}

// Costume AI with OpenAI Integration
function initializeCostumeAI() {
    const getCostumeBtn = document.getElementById('getCostumeBtn');
    const closeResultBtn = document.getElementById('closeResult');
    const costumeResult = document.getElementById('costumeResult');
    const resultText = document.getElementById('resultText');
    const typingIndicator = document.getElementById('typingIndicator');
    const apiKeyInput = document.getElementById('apiKey');
    const saveApiKeyCheckbox = document.getElementById('saveApiKey');
    const clearApiKeyBtn = document.getElementById('clearApiKey');
    const savedKeyStatus = document.getElementById('savedKeyStatus');
    
    // Check if there's a saved API key
    checkSavedApiKey();
    
    function checkSavedApiKey() {
        const savedKey = CONFIG.getApiKey();
        if (savedKey) {
            apiKeyInput.value = savedKey;
            savedKeyStatus.style.display = 'inline';
            clearApiKeyBtn.style.display = 'inline-block';
            saveApiKeyCheckbox.checked = true;
        }
    }
    
    // Clear saved API key
    clearApiKeyBtn.addEventListener('click', function() {
        if (confirm('Hapus API key yang tersimpan?')) {
            CONFIG.clearApiKey();
            apiKeyInput.value = '';
            savedKeyStatus.style.display = 'none';
            clearApiKeyBtn.style.display = 'none';
            saveApiKeyCheckbox.checked = false;
            alert('✓ API key berhasil dihapus!');
        }
    });
    
    getCostumeBtn.addEventListener('click', async function() {
        const userName = document.getElementById('userName').value.trim();
        let apiKey = apiKeyInput.value.trim();
        
        if (!userName) {
            alert('Please enter your name!');
            return;
        }
        
        // Save API key if checkbox is checked
        if (saveApiKeyCheckbox.checked && apiKey && apiKey.startsWith('sk-')) {
            CONFIG.saveApiKey(apiKey);
            savedKeyStatus.style.display = 'inline';
            clearApiKeyBtn.style.display = 'inline-block';
        }
        
        // Try to get saved API key if input is empty
        if (!apiKey) {
            apiKey = CONFIG.getApiKey();
        }
        
        // Show result container with typing indicator
        costumeResult.style.display = 'block';
        typingIndicator.style.display = 'flex';
        resultText.style.display = 'none';
        resultText.innerHTML = '';
        
        // Scroll to result
        setTimeout(() => {
            costumeResult.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }, 100);
        
        try {
            let suggestion;
            
            if (CONFIG.features.enableOpenAI && apiKey && apiKey.startsWith('sk-')) {
                // Use OpenAI API if key is provided
                suggestion = await getCostumeFromOpenAI(userName, apiKey);
            } else {
                // Use fallback AI-like suggestions
                suggestion = getFallbackCostumeSuggestion(userName);
            }
            
            // Simulate typing effect
            setTimeout(() => {
                typingIndicator.style.display = 'none';
                resultText.style.display = 'block';
                typeWriter(suggestion, resultText);
            }, 2000);
            
        } catch (error) {
            console.error('Error:', error);
            typingIndicator.style.display = 'none';
            resultText.style.display = 'block';
            resultText.innerHTML = `
                <p style="color: var(--blood-red);">❌ Oops! Something went wrong with the AI.</p>
                <p>Don't worry! Here's a backup suggestion:</p>
                <p>${getFallbackCostumeSuggestion(userName)}</p>
            `;
        }
    });
    
    closeResultBtn.addEventListener('click', function() {
        costumeResult.style.display = 'none';
    });
}

// OpenAI API Integration
async function getCostumeFromOpenAI(userName, apiKey) {
    const response = await fetch('https://api.openai.com/v1/chat/completions', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${apiKey}`
        },
        body: JSON.stringify({
            model: CONFIG.openai.model,
            messages: [
                {
                    role: 'system',
                    content: CONFIG.openai.systemPrompt
                },
                {
                    role: 'user',
                    content: `My name is ${userName}. What Halloween costume should I wear to the ${CONFIG.event.name}?`
                }
            ],
            max_tokens: CONFIG.openai.maxTokens,
            temperature: CONFIG.openai.temperature
        })
    });
    
    if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.error?.message || 'OpenAI API request failed');
    }
    
    const data = await response.json();
    return data.choices[0].message.content;
}

// Fallback Costume Suggestions (when no API key)
function getFallbackCostumeSuggestion(userName) {
    const firstLetter = userName.charAt(0).toUpperCase();
    const nameLength = userName.length;
    
    const suggestions = [
        {
            condition: (letter, length) => letter >= 'A' && letter <= 'E',
            costume: '🧛 Vampire Count/Countess',
            description: `Perfect for ${userName}! Your name screams elegance and mystery. Go for a classic vampire look with a velvet cape, fake fangs, and blood-red lipstick. Add some dramatic pale makeup and you'll be the most sophisticated undead at the party!`,
            tips: 'Pro tip: Carry a wine glass filled with "blood" (cranberry juice) and practice your best Transylvanian accent!'
        },
        {
            condition: (letter, length) => letter >= 'F' && letter <= 'J',
            costume: '👻 Phantom Ghost',
            description: `${userName}, with your mysterious aura, a ghostly phantom costume would be absolutely haunting! Think floating ethereal vibes with flowing white fabrics, chains, and eerie makeup. You'll be the spirit everyone talks about!`,
            tips: 'Add glow-in-the-dark paint to your costume and carry a flickering lantern for maximum spookiness!'
        },
        {
            condition: (letter, length) => letter >= 'K' && letter <= 'O',
            costume: '🧟 Zombie Apocalypse Survivor',
            description: `Hey ${userName}! Your name has that tough, survivor energy. Go as a zombie apocalypse survivor with ripped clothes, fake wounds, and survival gear. Or go full zombie with green makeup and torn flesh effects!`,
            tips: 'Use liquid latex and tissue to create realistic wounds. Add dirt and blood stains for authenticity!'
        },
        {
            condition: (letter, length) => letter >= 'P' && letter <= 'T',
            costume: '🎃 Pumpkin King/Queen',
            description: `${userName}, you're destined to rule the Halloween party! Channel your inner Jack Skellington with a Pumpkin King/Queen costume. Orange and black, crown made of vines, and a commanding presence!`,
            tips: 'Create a pumpkin head mask with LED lights inside, or go with stunning pumpkin-themed makeup!'
        },
        {
            condition: (letter, length) => letter >= 'U' && letter <= 'Z',
            costume: '🧙 Dark Witch/Warlock',
            description: `${userName}, your name has magical energy written all over it! A dark witch or warlock costume would be perfect. Think pointed hat, flowing robes, spell book, and a mystical staff. You'll cast a spell on everyone!`,
            tips: 'Carry a potion bottle with dry ice for smoking effect. Learn a few "magic tricks" to perform!'
        }
    ];
    
    // Find matching suggestion
    for (const suggestion of suggestions) {
        if (suggestion.condition(firstLetter, nameLength)) {
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

// Typewriter Effect
function typeWriter(text, element, speed = 30) {
    let i = 0;
    element.innerHTML = '';
    
    function type() {
        if (i < text.length) {
            element.innerHTML += text.charAt(i);
            i++;
            setTimeout(type, speed);
        }
    }
    
    type();
}

// Add shake animation to CSS (via JavaScript)
const style = document.createElement('style');
style.textContent = `
    @keyframes shake {
        0%, 100% { transform: translateX(0); }
        25% { transform: translateX(-10px) rotate(-5deg); }
        75% { transform: translateX(10px) rotate(5deg); }
    }
`;
document.head.appendChild(style);

// Random scary events
setInterval(() => {
    if (Math.random() > 0.95 && soundEnabled) {
        // Random scream
        screamSound.play().catch(e => console.log('Sound failed:', e));
        
        // Flash screen
        document.body.style.filter = 'brightness(1.5)';
        setTimeout(() => {
            document.body.style.filter = 'brightness(1)';
        }, 100);
    }
}, 30000);

// Easter egg: Konami code
let konamiCode = [];
const konamiPattern = [
    'ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown',
    'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight',
    'b', 'a'
];

document.addEventListener('keydown', (e) => {
    konamiCode.push(e.key);
    konamiCode = konamiCode.slice(-10);
    
    if (konamiCode.join(',') === konamiPattern.join(',')) {
        activateSecretMode();
    }
});

function activateSecretMode() {
    alert('🎃 SECRET MODE ACTIVATED! 🎃');
    document.body.style.animation = 'rainbow 2s infinite';
    
    const rainbowStyle = document.createElement('style');
    rainbowStyle.textContent = `
        @keyframes rainbow {
            0% { filter: hue-rotate(0deg); }
            100% { filter: hue-rotate(360deg); }
        }
    `;
    document.head.appendChild(rainbowStyle);
    
    // Add confetti
    for (let i = 0; i < 100; i++) {
        setTimeout(() => {
            createParticles(
                Math.random() * window.innerWidth,
                Math.random() * window.innerHeight
            );
        }, i * 50);
    }
}
