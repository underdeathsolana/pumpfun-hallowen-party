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
    // Halloween 2025: October 31, 2025, 20:00 (8:00 PM)
    const targetDate = new Date('2025-10-31T20:00:00').getTime();
    
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

// Costume AI - Pure Frontend with 200+ Templates
function initializeCostumeAI() {
    const getCostumeBtn = document.getElementById('getCostumeBtn');
    const closeResultBtn = document.getElementById('closeResult');
    const costumeResult = document.getElementById('costumeResult');
    const resultText = document.getElementById('resultText');
    const typingIndicator = document.getElementById('typingIndicator');
    
    // No API key needed - pure frontend!
    
    getCostumeBtn.addEventListener('click', async function() {
        const userName = document.getElementById('userName').value.trim();
        
        if (!userName) {
            alert('Please enter your name!');
            return;
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
            // PURE FRONTEND - Langsung pakai random template!
            console.log('🎃 Generating costume suggestion for:', userName);
            const suggestion = getRandomCostumeSuggestion(userName);
            
            // Show result with fade-in effect (no typing for HTML content)
            setTimeout(() => {
                typingIndicator.style.display = 'none';
                resultText.style.display = 'block';
                resultText.innerHTML = suggestion; // Direct HTML rendering
                resultText.style.opacity = '0';
                setTimeout(() => {
                    resultText.style.transition = 'opacity 0.5s ease-in';
                    resultText.style.opacity = '1';
                }, 10);
            }, 1500);
            
        } catch (error) {
            console.error('Error:', error);
            typingIndicator.style.display = 'none';
            resultText.style.display = 'block';
            resultText.innerHTML = `
                <p style="color: var(--blood-red);">❌ Oops! Something went wrong.</p>
                <p>But here's a costume idea anyway:</p>
                <p>${getRandomCostumeSuggestion(userName)}</p>
            `;
        }
    });
    
    closeResultBtn.addEventListener('click', function() {
        costumeResult.style.display = 'none';
    });
}

// 200+ RANDOM COSTUME TEMPLATES - PURE FRONTEND!
function getRandomCostumeSuggestion(userName) {
    const COSTUME_TEMPLATES = [
        // Classic Monsters (50 templates)
        { emoji: '🧛', name: 'Vampire Count/Countess', desc: 'Classic bloodsucker with velvet cape, fangs, and pale makeup. Elegant yet terrifying!', tips: 'Carry a wine glass with red liquid and practice your Transylvanian accent' },
        { emoji: '🧛‍♀️', name: 'Vampire Queen', desc: 'Regal undead royalty dripping in gothic elegance. Blood red lips and eternal beauty!', tips: 'Victorian gown with lace, dramatic makeup, and ornate jewelry' },
        { emoji: '🧛‍♂️', name: 'Vampire Lord', desc: 'Ancient vampire with centuries of power. Dark and commanding presence!', tips: 'Tailored suit with cape, slicked hair, and aristocratic attitude' },
        { emoji: '🧟', name: 'Zombie Walker', desc: 'Undead walker with torn clothes, fake wounds, and greenish makeup. Perfect for scaring everyone!', tips: 'Use liquid latex for realistic wounds and practice your zombie walk' },
        { emoji: '🧟‍♀️', name: 'Zombie Bride', desc: 'Undead bride still in wedding dress. Till death do us... wait, we are dead!', tips: 'Ripped wedding dress with veil, bouquet of dead flowers' },
        { emoji: '🧟‍♂️', name: 'Zombie Groom', desc: 'Rotting groom in tattered tuxedo. Death cant stop this wedding!', tips: 'Torn suit, wilted boutonniere, practice dead-eyed stare' },
        { emoji: '👻', name: 'Phantom Ghost', desc: 'Ethereal spirit in flowing white fabrics with chains. Hauntingly beautiful!', tips: 'Add glow-in-the-dark paint and carry a flickering lantern' },
        { emoji: '👻', name: 'Victorian Ghost', desc: 'Spirit from the 1800s still wandering. Vintage horror!', tips: 'Period clothing with pale makeup and haunted expression' },
        { emoji: '👻', name: 'Child Ghost', desc: 'Innocent yet eerie spirit. The creepiest kind of ghost!', tips: 'Vintage childrens clothes, pale skin, holding old toy' },
        { emoji: '🧙', name: 'Dark Witch', desc: 'Mystical magic user with pointed hat, robes, and spell book. Cast your spells!', tips: 'Carry potion bottles with dry ice effect and learn magic tricks' },
        { emoji: '🧙‍♀️', name: 'Wicked Sorceress', desc: 'Powerful witch commanding dark magic. Spellbinding terror!', tips: 'Dramatic robes, crystal ball, black cat familiar prop' },
        { emoji: '🧙‍♂️', name: 'Dark Warlock', desc: 'Male practitioner of forbidden magic. Dangerous knowledge!', tips: 'Long robes with arcane symbols, staff, mystical accessories' },
        { emoji: '🎃', name: 'Pumpkin King', desc: 'Ruler of Halloween with pumpkin head and regal attire. Jack Skellington vibes!', tips: 'Create LED-lit pumpkin mask and practice commanding presence' },
        { emoji: '🎃', name: 'Pumpkin Queen', desc: 'Female ruler of Halloween realm. Orange majesty!', tips: 'Pumpkin-themed crown and dress, autumn colors' },
        { emoji: '🎃', name: 'Scarecrow King', desc: 'Animated scarecrow come to life. Straw-stuffed nightmare!', tips: 'Plaid shirt with straw sticking out, burlap sack mask' },
        { emoji: '👹', name: 'Demon from Hell', desc: 'Terrifying hellspawn with horns, red skin, and dark wings. Pure evil incarnate!', tips: 'Use red body paint and create foam horns with wire support' },
        { emoji: '👹', name: 'Shadow Demon', desc: 'Dark entity from the abyss. Living darkness!', tips: 'All black with shadowy effects, glowing eyes' },
        { emoji: '👹', name: 'Fire Demon', desc: 'Infernal creature wreathed in flames. Burn with rage!', tips: 'Red/orange costume with flame patterns, LED effects' },
        { emoji: '🦇', name: 'Vampire Bat', desc: 'Half-human, half-bat hybrid with wings and fangs. Nocturnal nightmare!', tips: 'Make expandable wing frame and add fake fur details' },
        { emoji: '🦇', name: 'Bat Demon', desc: 'Demonic bat creature of the night. Winged terror!', tips: 'Large wings, bat ears, clawed hands' },
        { emoji: '🕷️', name: 'Spider Queen', desc: 'Arachnid royalty with multiple legs and web motifs. Eight-legged terror!', tips: 'Create extra legs with foam tubes and add web patterns everywhere' },
        { emoji: '🕷️', name: 'Spider Demon', desc: 'Half-human, half-spider hybrid. Web of nightmares!', tips: 'Spider legs backpack, web cape, multiple eyes makeup' },
        { emoji: '🐺', name: 'Werewolf', desc: 'Moonlight-cursed beast with fur, claws, and fangs. Howl at the moon!', tips: 'Layer fake fur and add prosthetic claws and teeth' },
        { emoji: '🐺', name: 'Alpha Wolf', desc: 'Pack leader werewolf. Most powerful lycanthrope!', tips: 'Enhanced fur, larger claws, dominant stance' },
        { emoji: '🐺', name: 'Dire Wolf', desc: 'Giant supernatural wolf. Ancient predator!', tips: 'Massive wolf head, fur cloak, yellow contact lenses' },
        { emoji: '💀', name: 'Grim Reaper', desc: 'Death personified with black robe and scythe. Your time has come!', tips: 'Make a large fabric scythe and practice ominous movements' },
        { emoji: '💀', name: 'Death Incarnate', desc: 'The embodiment of death itself. Ultimate end!', tips: 'Skeletal makeup, flowing black robes, hour glass prop' },
        { emoji: '💀', name: 'Skull Lord', desc: 'Undead lord with exposed skull. Bone chilling!', tips: 'Skull mask or makeup, royal robes, bone staff' },
        { emoji: '🦴', name: 'Skeleton Warrior', desc: 'Animated bones with armor. Rattle and fight!', tips: 'Wear black with bone patterns or use skeleton suit' },
        { emoji: '🦴', name: 'Bone Mage', desc: 'Skeleton sorcerer wielding death magic!', tips: 'Skeleton suit with mage robes, bone wand' },
        { emoji: '☠️', name: 'Pirate Ghost', desc: 'Undead buccaneer sailing forever. Dead mens chest!', tips: 'Tattered pirate outfit, ghostly makeup, treasure map' },
        { emoji: '☠️', name: 'Plague Doctor', desc: 'Medieval physician with bird mask. Cure worse than disease!', tips: 'Long coat, plague doctor mask, medical bag with leeches' },
        { emoji: '🧟', name: 'Frankenstein Monster', desc: 'Reanimated corpse with bolts in neck. ITS ALIVE!', tips: 'Green makeup, neck bolts, heavy boots, torn suit' },
        { emoji: '🧛', name: 'Nosferatu', desc: 'Ancient vampire with rat-like features. Original bloodsucker!', tips: 'Bald cap, pointed ears, long fingers, sunken eyes' },
        { emoji: '👻', name: 'Poltergeist', desc: 'Mischievous ghost that moves objects. Chaotic spirit!', tips: 'Translucent fabrics, objects attached with strings' },
        { emoji: '🧙', name: 'Swamp Witch', desc: 'Hag living in murky swamps. Nature gone wrong!', tips: 'Mossy clothes, twigs in hair, mud effects' },
        { emoji: '🎃', name: 'Jack O Lantern', desc: 'Living carved pumpkin with fire inside. Halloween icon!', tips: 'Pumpkin head costume with LED lights inside' },
        { emoji: '👹', name: 'Gargoyle', desc: 'Stone guardian come to life. Gothic terror!', tips: 'Gray body paint, wings, stone texture makeup' },
        { emoji: '🦇', name: 'Night Stalker', desc: 'Creature that hunts in darkness. Fear the night!', tips: 'All black tactical gear, night vision goggles prop' },
        { emoji: '🕷️', name: 'Widow Maker', desc: 'Deadly spider in human form. Black widow vibes!', tips: 'Black and red outfit, spider web patterns' },
        { emoji: '🐺', name: 'Lycan Berserker', desc: 'Werewolf in rage mode. Uncontrollable fury!', tips: 'Shredded clothes, full fur coverage, wild hair' },
        { emoji: '💀', name: 'Banshee', desc: 'Wailing spirit predicting death. Screaming horror!', tips: 'White flowing gown, wild white hair, pale makeup' },
        { emoji: '🦴', name: 'Mummy', desc: 'Ancient Egyptian undead wrapped in bandages!', tips: 'Wrap yourself in aged bandages, shuffle walk' },
        { emoji: '👻', name: 'Headless Horseman', desc: 'Rider without a head carrying it. Classic horror!', tips: 'Carry fake head, high collar hiding yours' },
        { emoji: '🧛', name: 'Dracula', desc: 'The original vampire count. King of vampires!', tips: 'Classic tuxedo, medallion, slicked black hair' },
        { emoji: '🧟', name: 'Corpse Bride', desc: 'Beautiful but dead bride. Tragic romance!', tips: 'Blue skin makeup, tattered wedding dress, veil' },
        { emoji: '🎃', name: 'Pumpkinhead', desc: 'Vengeful demon with pumpkin for a head!', tips: 'Massive pumpkin head prop, dark robes' },
        { emoji: '👹', name: 'Krampus', desc: 'Christmas demon punishing bad children!', tips: 'Horns, fur, chains, demonic Santa vibes' },
        { emoji: '🦇', name: 'Man-Bat', desc: 'Scientific experiment gone wrong. Bat hybrid!', tips: 'Torn lab coat, bat features, scientific accident story' },
        { emoji: '💀', name: 'La Llorona', desc: 'Weeping woman searching for lost children!', tips: 'White dress, wet hair, crying makeup effects' },
        
        // Horror Icons (40 templates)
        { emoji: '🔪', name: 'Psycho Killer', desc: 'Deranged slasher with mask and weapon. Straight from horror movies!', tips: 'Use fake blood strategically and practice menacing stare' },
        { emoji: '🔪', name: 'Jason Voorhees Style', desc: 'Hockey mask wearing lake killer. Friday the 13th terror!', tips: 'Hockey mask, machete prop, camp counselor victim' },
        { emoji: '🔪', name: 'Michael Myers Type', desc: 'Silent masked stalker. Halloween franchise vibes!', tips: 'White mask, coveralls, kitchen knife prop' },
        { emoji: '🔪', name: 'Freddy Krueger Inspired', desc: 'Dream demon with blade glove. Nightmare on Elm Street!', tips: 'Striped sweater, fedora, finger knives' },
        { emoji: '🔪', name: 'Ghostface', desc: 'Scream mask killer with knife. Whats your favorite scary movie?', tips: 'Black robe, Ghostface mask, phone prop' },
        { emoji: '🎭', name: 'Creepy Clown', desc: 'Twisted circus performer with exaggerated makeup. Nightmare fuel!', tips: 'Overdo the makeup and add unsettling details' },
        { emoji: '🎭', name: 'Evil Jester', desc: 'Demented court fool. Jokes gone dark!', tips: 'Traditional jester outfit with creepy twist' },
        { emoji: '🎭', name: 'Killer Clown', desc: 'Murderous circus performer. Big top terror!', tips: 'Clown suit with blood stains, oversized props' },
        { emoji: '🤡', name: 'Pennywise Style', desc: 'Sewer dwelling clown demon. IT vibes!', tips: 'Red balloon, clown suit, sharp teeth' },
        { emoji: '🎪', name: 'Cursed Ringmaster', desc: 'Evil circus master. Show of horrors!', tips: 'Top hat, red coat, whip prop' },
        { emoji: '👁️', name: 'Eye Creature', desc: 'Being covered in eyeballs. Every direction is watched!', tips: 'Attach plastic eyes all over costume and makeup' },
        { emoji: '👁️', name: 'Cyclops', desc: 'One-eyed giant. Single vision of terror!', tips: 'One large eye makeup, close other eye' },
        { emoji: '👁️', name: 'Eye Collector', desc: 'Horror entity stealing eyes. See all evil!', tips: 'Jar of fake eyes prop, eyeless victims imagery' },
        { emoji: '🩸', name: 'Blood Cultist', desc: 'Ritual performer in blood-stained robes. Dark ceremonies await!', tips: 'Age the robes and add symbolic patterns' },
        { emoji: '🩸', name: 'Blood Priest', desc: 'Leader of blood magic cult. Crimson rituals!', tips: 'Ceremonial robes, chalice with red liquid' },
        { emoji: '🩸', name: 'Vampire Hunter', desc: 'Slayer of the undead. Stakes and crossbows!', tips: 'Leather coat, stakes, holy water, crossbow' },
        { emoji: '⚰️', name: 'Living Corpse', desc: 'Recently risen from the grave. Dirt, decay, and determination!', tips: 'Add dirt and aging effects to clothes' },
        { emoji: '⚰️', name: 'Coffin Dweller', desc: 'Undead that sleeps in coffins. Grave riser!', tips: 'Coffin prop, funeral clothes, pale makeup' },
        { emoji: '🕸️', name: 'Web Walker', desc: 'Creature that lives in webs. Sticky and scary!', tips: 'Drape fake spider webs and add plastic spiders' },
        { emoji: '🕸️', name: 'Arachne', desc: 'Woman cursed to become spider. Greek myth horror!', tips: 'Beautiful face, spider lower body costume' },
        { emoji: '👹', name: 'Oni Demon', desc: 'Japanese demon with horns and club. Fierce and powerful!', tips: 'Create foam horns and traditional demon makeup' },
        { emoji: '👹', name: 'Tengu', desc: 'Japanese crow demon. Bird-like supernatural!', tips: 'Long nose mask, feathered cloak, wings' },
        { emoji: '🎪', name: 'Carnival Worker', desc: 'Haunted circus employee. The show must go wrong!', tips: 'Distress vintage carnival attire' },
        { emoji: '🎪', name: 'Sideshow Freak', desc: 'Unusual performer with unique horror. Step right up!', tips: 'Vintage circus outfit with bizarre props' },
        { emoji: '🪆', name: 'Living Doll', desc: 'Creepy possessed doll come to life. Childs play gone wrong!', tips: 'Doll-like makeup, Victorian dress, stiff movements' },
        { emoji: '🧸', name: 'Evil Teddy Bear', desc: 'Cute toy turned evil. Fuzzy nightmare!', tips: 'Bear onesie with scary modifications' },
        { emoji: '🎎', name: 'Porcelain Doll', desc: 'Fragile yet terrifying doll. Crack and break!', tips: 'Cracked porcelain makeup, vintage doll dress' },
        { emoji: '🔪', name: 'Butcher', desc: 'Meat cleaver wielding maniac. Fresh cuts!', tips: 'Bloody apron, cleaver, butcher shop vibes' },
        { emoji: '🔪', name: 'Surgeon Gone Mad', desc: 'Doctor who operates for fun. Surgery horror!', tips: 'Surgical gown with blood, scalpel, mask' },
        { emoji: '⛓️', name: 'Chained Spirit', desc: 'Ghost bound by chains. Eternal prisoner!', tips: 'Heavy chain props, prisoner outfit, rattling sound' },
        { emoji: '⛓️', name: 'Torture Victim', desc: 'Escaped from dungeon. Scarred survivor!', tips: 'Torn medieval clothes, fake wounds, chains' },
        { emoji: '🪓', name: 'Axe Murderer', desc: 'Classic woodsman killer. Here is Johnny!', tips: 'Flannel shirt, jeans, bloody axe prop' },
        { emoji: '🪓', name: 'Lumberjack Killer', desc: 'Forest slasher with axe. Timber terror!', tips: 'Plaid shirt, suspenders, work boots, axe' },
        { emoji: '🎃', name: 'Headless Pumpkin', desc: 'Pumpkin creature without head. Gourd gone wrong!', tips: 'Pumpkin body costume, headless illusion' },
        { emoji: '👻', name: 'Sheet Ghost', desc: 'Classic bed sheet ghost. Simple but effective!', tips: 'White sheet with eye holes, vintage horror' },
        { emoji: '🧛', name: 'Blood Countess', desc: 'Female vampire bathing in blood. Elizabeth Bathory vibes!', tips: 'Victorian gown, blood effects, royal crown' },
        { emoji: '🧟', name: 'Nazi Zombie', desc: 'Undead soldier from WWII. Historical horror!', tips: 'Military uniform, zombie makeup, medals' },
        { emoji: '🔪', name: 'Leather face Type', desc: 'Chainsaw wielding maniac with skin mask!', tips: 'Apron, chainsaw prop, disturbing mask' },
        { emoji: '🎭', name: 'Mime Killer', desc: 'Silent performer turned deadly. Quiet terror!', tips: 'Black and white makeup, striped shirt, silent acting' },
        { emoji: '🎪', name: 'Marionette', desc: 'Puppet controlled by strings. Dancing death!', tips: 'Attached strings above, jerky movements' },
        
        // Supernatural (35 templates)
        { emoji: '👽', name: 'Grey Alien', desc: 'Classic extraterrestrial with big eyes. UFO abductee!', tips: 'Grey bodysuit, large black eyes, alien head' },
        { emoji: '👽', name: 'Xenomorph Inspired', desc: 'Deadly alien hunter. Space horror!', tips: 'Black biomechanical costume, elongated head' },
        { emoji: '🛸', name: 'UFO Pilot', desc: 'Commander of flying saucer. Space invader!', tips: 'Add LED lights and metallic details' },
        { emoji: '🛸', name: 'Area 51 Escapee', desc: 'Alien that broke out of secret base!', tips: 'Government facility clothes, alien features' },
        { emoji: '🌙', name: 'Moon Witch', desc: 'Lunar-powered sorceress. Celestial magic!', tips: 'Use silver and white with moon symbols' },
        { emoji: '🌙', name: 'Lunar Demon', desc: 'Dark side of the moon entity. Eclipse terror!', tips: 'Black and white costume, moon phases' },
        { emoji: '⭐', name: 'Star Entity', desc: 'Cosmic being made of stardust. Shine bright!', tips: 'Add glitter and LED string lights' },
        { emoji: '⭐', name: 'Fallen Star', desc: 'Crashed celestial being. Cosmic crash!', tips: 'Glittery costume with burn marks' },
        { emoji: '🔮', name: 'Fortune Teller', desc: 'Mystic seer with crystal ball. Your future looks spooky!', tips: 'Bring crystal ball prop and mystical accessories' },
        { emoji: '🔮', name: 'Oracle of Death', desc: 'Seer who predicts doom. Dark prophecy!', tips: 'Mystical robes, crystal ball, tarot cards' },
        { emoji: '🃏', name: 'Tarot Witch', desc: 'Card reader with dark powers. Draw your fate!', tips: 'Carry oversized tarot cards as props' },
        { emoji: '🃏', name: 'Cursed Card Dealer', desc: 'Gambler who deals death. House always wins!', tips: 'Dealer outfit, cursed deck, poker chips' },
        { emoji: '🕯️', name: 'Candlelight Phantom', desc: 'Spirit appears by candlelight. Flickering fear!', tips: 'Carry LED candles and wear flowing fabrics' },
        { emoji: '🕯️', name: 'Wax Demon', desc: 'Entity made of melted wax. Dripping horror!', tips: 'Wax drip effects on costume and makeup' },
        { emoji: '📿', name: 'Cursed Priest', desc: 'Holy person turned dark. Faith corrupted!', tips: 'Distress religious garments and add dark symbols' },
        { emoji: '📿', name: 'Exorcist Gone Wrong', desc: 'Possessed by demon during ritual!', tips: 'Priest outfit with demonic features emerging' },
        { emoji: '⚡', name: 'Storm Summoner', desc: 'Weather witch controlling lightning. Electric personality!', tips: 'Add lightning bolt patterns and storm effects' },
        { emoji: '⚡', name: 'Electric Ghost', desc: 'Spirit made of pure electricity. Shocking!', tips: 'Lightning effects, crackling sounds, Tesla coil' },
        { emoji: '🌊', name: 'Sea Phantom', desc: 'Ghost from Davy Jones locker. Drowned soul!', tips: 'Add seaweed and water damage effects' },
        { emoji: '🌊', name: 'Drowned Sailor', desc: 'Victim of shipwreck haunting the seas!', tips: 'Wet sailor outfit, barnacles, fish' },
        { emoji: '🌪️', name: 'Tornado Spirit', desc: 'Wind demon causing destruction!', tips: 'Swirling fabric effects, wind-blown look' },
        { emoji: '🔥', name: 'Flame Specter', desc: 'Ghost made of fire. Burning soul!', tips: 'Red/orange flowing fabrics, LED flames' },
        { emoji: '❄️', name: 'Ice Spirit', desc: 'Frozen entity from arctic wastes!', tips: 'All white with icicles, frost makeup' },
        { emoji: '🌋', name: 'Lava Demon', desc: 'Molten rock creature from volcano!', tips: 'Black with glowing cracks of red/orange' },
        { emoji: '☄️', name: 'Comet Creature', desc: 'Space entity riding on meteor!', tips: 'Trail effects, star patterns, impact damage' },
        { emoji: '🌑', name: 'Eclipse Demon', desc: 'Evil that emerges during solar eclipse!', tips: 'Black sun imagery, celestial symbols' },
        { emoji: '⚰️', name: 'Crypt Keeper', desc: 'Guardian of the dead. Graveyard caretaker!', tips: 'Tattered groundskeeper clothes, shovel, lantern' },
        { emoji: '🏚️', name: 'Haunted House Spirit', desc: 'Ghost bound to abandoned mansion!', tips: 'Victorian ghost with house architecture elements' },
        { emoji: '🗿', name: 'Ancient Statue', desc: 'Stone idol come to life. Weeping angel vibes!', tips: 'Stone texture makeup, dont blink!' },
        { emoji: '📻', name: 'Radio Demon', desc: 'Entity that speaks through static!', tips: 'Vintage radio prop, static sounds, 1940s attire' },
        { emoji: '📺', name: 'TV Ghost', desc: 'Spirit emerging from television. The Ring vibes!', tips: 'Long wet hair, white gown, TV frame prop' },
        { emoji: '☎️', name: 'Phone Stalker', desc: 'Killer who calls first. Scream reference!', tips: 'Old phone prop, creepy voice changer' },
        { emoji: '🎵', name: 'Music Box Dancer', desc: 'Mechanical ballerina cursed to dance forever!', tips: 'Ballet outfit, wind-up key on back, jerky movements' },
        { emoji: '🎻', name: 'Devil Violinist', desc: 'Musician who sold soul for talent!', tips: 'Fancy outfit, violin, demonic features' },
        { emoji: '🎹', name: 'Phantom Pianist', desc: 'Ghost playing haunted piano. Phantom opera vibes!', tips: 'Tuxedo, white mask, cape' },
        
        // Mythological Creatures (35 templates)
        { emoji: '🐉', name: 'Dragon Warrior', desc: 'Half-dragon with scales and wings. Fire breathing optional!', tips: 'Create scale patterns and dragon wing cape' },
        { emoji: '🐉', name: 'Dragon Sorceress', desc: 'Human who merged with dragon. Scaly magic!', tips: 'Dragon horns, scale makeup, tail, claws' },
        { emoji: '🦅', name: 'Harpy', desc: 'Bird-woman hybrid with talons and wings. Sky predator!', tips: 'Make feathered wings and add talon gloves' },
        { emoji: '🦅', name: 'Phoenix Dark', desc: 'Corrupted firebird. Ash and ember!', tips: 'Black and red feathers, fire effects' },
        { emoji: '🐍', name: 'Medusa', desc: 'Snake-haired Gorgon. One look turns you to stone!', tips: 'Create snake headpiece with toy snakes' },
        { emoji: '🐍', name: 'Serpent Queen', desc: 'Royal naga with snake lower body!', tips: 'Snake scale bodysuit, crown, forked tongue' },
        { emoji: '🐍', name: 'Basilisk', desc: 'King of serpents with deadly gaze!', tips: 'Green scales, hood like cobra, deadly eyes' },
        { emoji: '🦂', name: 'Scorpion Queen', desc: 'Desert creature with deadly tail. Venomous royalty!', tips: 'Build tail prop and add exoskeleton patterns' },
        { emoji: '🦂', name: 'Scorpion Demon', desc: 'Hell creature with massive pincers!', tips: 'Pincer props, segmented armor, stinger tail' },
        { emoji: '🦉', name: 'Owl Witch', desc: 'Nocturnal bird sorceress. Wise and wicked!', tips: 'Add feather details and owl mask' },
        { emoji: '🦉', name: 'Owl Spirit', desc: 'Mythical owl creature of night. Silent hunter!', tips: 'Feathered cloak, owl mask, talons' },
        { emoji: '🐙', name: 'Kraken Priest', desc: 'Deep sea cultist serving tentacled god!', tips: 'Add tentacle props and oceanic details' },
        { emoji: '🐙', name: 'Cthulhu Spawn', desc: 'Lovecraftian horror from the depths!', tips: 'Tentacle face, wings, cosmic horror vibes' },
        { emoji: '🦈', name: 'Shark Demon', desc: 'Aquatic predator in human form. Apex nightmare!', tips: 'Create fin headpiece and add teeth details' },
        { emoji: '🦈', name: 'Megalodon Spirit', desc: 'Ghost of ancient giant shark!', tips: 'Massive jaw prop, prehistoric ocean vibes' },
        { emoji: '🦎', name: 'Lizard Shaman', desc: 'Reptilian mystic with scales. Cold-blooded magic!', tips: 'Use green makeup and scale patterns' },
        { emoji: '🦎', name: 'Raptor Hybrid', desc: 'Human-dinosaur mutation. Jurassic terror!', tips: 'Dinosaur features, claws, tail' },
        { emoji: '🐊', name: 'Crocodile God', desc: 'Ancient Egyptian deity. Sobek vibes!', tips: 'Crocodile head, Egyptian clothes, golden accessories' },
        { emoji: '🦛', name: 'Behemoth', desc: 'Biblical beast of massive size!', tips: 'Huge costume, earth tones, unstoppable presence' },
        { emoji: '🦏', name: 'Rhino Berserker', desc: 'Armored warrior with horn. Charging fury!', tips: 'Horn headpiece, armor plates, aggressive stance' },
        { emoji: '🦬', name: 'Minotaur', desc: 'Bull-headed maze guardian. Labyrinth terror!', tips: 'Bull horns and head, muscular build, axe' },
        { emoji: '🐺', name: 'Fenrir Wolf', desc: 'Norse wolf destined to devour gods!', tips: 'Massive wolf head, chains breaking, Norse symbols' },
        { emoji: '🐴', name: 'Nightmare Horse', desc: 'Demonic steed from hell. Dark ride!', tips: 'Horse head, black mane, fire hooves' },
        { emoji: '🦄', name: 'Dark Unicorn', desc: 'Corrupted unicorn of nightmares!', tips: 'Black horn, dark colors, evil magic' },
        { emoji: '🦌', name: 'Wendigo', desc: 'Cannibalistic spirit with deer skull!', tips: 'Deer skull, antlers, emaciated look' },
        { emoji: '🦅', name: 'Thunderbird', desc: 'Massive bird creating storms!', tips: 'Huge wings, lightning effects, Native American motifs' },
        { emoji: '🦎', name: 'Hydra', desc: 'Many-headed serpent. Cut one, two grow back!', tips: 'Multiple snake heads on costume' },
        { emoji: '🐉', name: 'Wyvern', desc: 'Two-legged dragon. Aerial hunter!', tips: 'Wings, two legs, barbed tail' },
        { emoji: '🦇', name: 'Vampire Lord Bat', desc: 'Ancient vampire in true bat form!', tips: 'Full bat transformation, huge wings' },
        { emoji: '🕷️', name: 'Jorōgumo', desc: 'Japanese spider woman. Beautiful but deadly!', tips: 'Beautiful face, spider lower half' },
        { emoji: '🐍', name: 'Lamia', desc: 'Snake woman demon. Seductive serpent!', tips: 'Beautiful upper body, snake lower' },
        { emoji: '🦅', name: 'Siren', desc: 'Bird-woman luring sailors to death!', tips: 'Beautiful voice, bird features, rocks prop' },
        { emoji: '🧜', name: 'Dark Mermaid', desc: 'Corrupted sea creature. Sirens call!', tips: 'Scales, tail, seaweed, sharp teeth' },
        { emoji: '🧜‍♂️', name: 'Merman Warrior', desc: 'Male sea creature with trident!', tips: 'Fish scales, trident, oceanic colors' },
        { emoji: '🧚', name: 'Dark Fairy', desc: 'Corrupted fae creature. Twisted magic!', tips: 'Black wings, dark dress, wicked smile' },
        
        // Dark Fantasy & Warriors (40+ templates)
        { emoji: '⚔️', name: 'Undead Knight', desc: 'Fallen warrior in rusted armor. Death before dishonor!', tips: 'Age and rust metal-look armor' },
        { emoji: '⚔️', name: 'Death Knight', desc: 'Warrior serving death itself. Unholy champion!', tips: 'Dark armor, glowing eyes, cursed sword' },
        { emoji: '🛡️', name: 'Corrupted Paladin', desc: 'Holy warrior turned evil. Tarnished righteousness!', tips: 'Mix holy symbols with dark corruption' },
        { emoji: '🛡️', name: 'Dark Crusader', desc: 'Zealot fighting for wrong cause!', tips: 'Religious armor with evil twist' },
        { emoji: '🏹', name: 'Shadow Archer', desc: 'Dark ranger of the night. Silent and deadly!', tips: 'All black with bow prop and quiver' },
        { emoji: '🏹', name: 'Demon Hunter', desc: 'Warrior who became what they hunt!', tips: 'Hunter gear with demonic features' },
        { emoji: '🗡️', name: 'Cursed Assassin', desc: 'Hired killer bound by dark magic. Contract of death!', tips: 'Tactical dark clothing with weapon props' },
        { emoji: '🗡️', name: 'Phantom Blade', desc: 'Ghost swordsman still seeking vengeance!', tips: 'Samurai outfit, ghostly effects, katana' },
        { emoji: '🪓', name: 'Berserker', desc: 'Rage-filled warrior. Fury incarnate!', tips: 'Fur and war paint with axe prop' },
        { emoji: '🪓', name: 'Viking Draugr', desc: 'Undead Norse warrior. Hels champion!', tips: 'Viking armor, zombie features, Norse tattoos' },
        { emoji: '👑', name: 'Evil King', desc: 'Tyrannical ruler of darkness. Bow before me!', tips: 'Dramatic crown and regal dark attire' },
        { emoji: '👑', name: 'Lich King', desc: 'Undead sorcerer king. Frozen throne!', tips: 'Crown, blue glow, icy armor, phylactery' },
        { emoji: '👸', name: 'Dark Princess', desc: 'Corrupted royalty. Beauty with evil!', tips: 'Dark gown, corrupted tiara, wicked smile' },
        { emoji: '🤴', name: 'Vampire Prince', desc: 'Young noble vampire. Eternal youth!', tips: 'Royal vampire outfit, crown, cape' },
        { emoji: '💎', name: 'Cursed Jeweler', desc: 'Keeper of evil gems. Precious corruption!', tips: 'Add fake gems and ornate outfit' },
        { emoji: '💎', name: 'Crystal Mage', desc: 'Sorcerer using crystal magic!', tips: 'Crystal props, reflective costume' },
        { emoji: '📜', name: 'Necromancer', desc: 'Death magic specialist raising the dead!', tips: 'Dark robes with bone accessories' },
        { emoji: '📜', name: 'Dark Librarian', desc: 'Keeper of forbidden knowledge!', tips: 'Old robes, cursed books, spectacles' },
        { emoji: '🔥', name: 'Fire Mage', desc: 'Pyromancer controlling flames!', tips: 'Red/orange robes with flame effects' },
        { emoji: '❄️', name: 'Ice Mage', desc: 'Frost wizard of eternal winter!', tips: 'White/blue robes with icicle accessories' },
        { emoji: '⚡', name: 'Storm Mage', desc: 'Lightning caster. Electric power!', tips: 'Purple robes with lightning patterns' },
        { emoji: '🌊', name: 'Water Mage', desc: 'Hydrokinetic sorcerer!', tips: 'Blue flowing robes with water effects' },
        { emoji: '🌍', name: 'Earth Golem', desc: 'Living rock creature!', tips: 'Stone texture paint, moss, crystals' },
        { emoji: '🌪️', name: 'Wind Spirit', desc: 'Air elemental in human form!', tips: 'Flowing fabrics that seem wind-blown' },
        { emoji: '🔮', name: 'Dark Seer', desc: 'Prophet of doom and despair!', tips: 'Mystic robes, clouded eyes, crystal ball' },
        { emoji: '🎴', name: 'Oni Samurai', desc: 'Demon warrior with katana!', tips: 'Samurai armor with oni mask' },
        { emoji: '⚱️', name: 'Mummy Lord', desc: 'Ancient pharaoh risen from tomb!', tips: 'Royal Egyptian garb with bandages' },
        { emoji: '🗿', name: 'Golem', desc: 'Animated clay guardian!', tips: 'Clay texture, Hebrew symbols, rigid movement' },
        { emoji: '🌑', name: 'Shadow Assassin', desc: 'Killer who moves through darkness!', tips: 'All black, shadow effects, smoke bombs' },
        { emoji: '☠️', name: 'Poison Master', desc: 'Toxic alchemist. Lethal touch!', tips: 'Green vials, skull symbols, gas mask' },
        { emoji: '🕷️', name: 'Spider Ninja', desc: 'Web-slinging warrior of night!', tips: 'Ninja outfit with spider motifs' },
        { emoji: '🦇', name: 'Bat Samurai', desc: 'Warrior of the night. Honor in darkness!', tips: 'Samurai armor with bat wings' },
        { emoji: '🐺', name: 'Wolf Warrior', desc: 'Tribal fighter with wolf spirit!', tips: 'Fur armor, wolf pelt, tribal paint' },
        { emoji: '🐉', name: 'Dragon Knight', desc: 'Warrior bonded with dragon!', tips: 'Dragon scale armor, horned helmet' },
        { emoji: '🦅', name: 'Raven Lord', desc: 'Commander of crows. Omen of death!', tips: 'Feathered cloak, crow props, dark attire' },
        { emoji: '👁️', name: 'Mind Flayer', desc: 'Psychic brain eater. Tentacle face!', tips: 'Purple skin, tentacles from face' },
        { emoji: '🦑', name: 'Illithid', desc: 'Alien brain eater. Psychic terror!', tips: 'Squid-like head, psychic effects' },
        { emoji: '🐙', name: 'Deep One', desc: 'Fish-frog hybrid. Lovecraft horror!', tips: 'Amphibian features, oceanic decay' },
        { emoji: '👽', name: 'Xenomorph Queen', desc: 'Alien matriarch. Hive mother!', tips: 'Large crown, biomechanical features' },
        { emoji: '🤖', name: 'Killer Robot', desc: 'Murderous AI. Terminator vibes!', tips: 'Metallic body, red eyes, weapons' }
    ];
    
    // Pick random template
    const template = COSTUME_TEMPLATES[Math.floor(Math.random() * COSTUME_TEMPLATES.length)];
    
    // Personalize dengan nama user
    const personalizedDesc = template.desc;
    
    return `
        <h4 style="color: #ff6b00; font-size: 24px; margin-bottom: 15px; text-align: center;">
            ${template.emoji} ${template.name}
        </h4>
        <p style="margin-bottom: 15px; font-size: 16px; line-height: 1.6;">
            Hey <strong style="color: #ff6b00;">${userName}</strong>! ${personalizedDesc}
        </p>
        <div style="background: rgba(139, 0, 255, 0.1); border-left: 4px solid #8b00ff; padding: 15px; margin: 20px 0; border-radius: 8px;">
            <p style="color: #8b00ff; font-style: italic; margin: 0;">
                <strong>💡 Costume Tips:</strong> ${template.tips}
            </p>
        </div>
        <p style="margin-top: 20px; text-align: center; font-size: 13px; opacity: 0.7; font-style: italic;">
            ✨ Magically selected from ${COSTUME_TEMPLATES.length}+ costume ideas just for you! ✨
        </p>
    `;
}

// OLD FALLBACK (KEEP FOR COMPATIBILITY)
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

// Copy Contract Address Function
function copyContract() {
    const contractAddress = '0x742d35Cc6634C0532925a3b844Bc9e7595f0bEb';
    
    // Try modern clipboard API first
    if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(contractAddress).then(() => {
            showCopyNotification('✅ Contract address copied!');
        }).catch(() => {
            // Fallback method
            fallbackCopy(contractAddress);
        });
    } else {
        // Fallback for older browsers
        fallbackCopy(contractAddress);
    }
}

function fallbackCopy(text) {
    const textArea = document.createElement('textarea');
    textArea.value = text;
    textArea.style.position = 'fixed';
    textArea.style.left = '-999999px';
    document.body.appendChild(textArea);
    textArea.select();
    
    try {
        document.execCommand('copy');
        showCopyNotification('✅ Contract address copied!');
    } catch (err) {
        showCopyNotification('❌ Failed to copy');
    }
    
    document.body.removeChild(textArea);
}

function showCopyNotification(message) {
    // Create notification element
    const notification = document.createElement('div');
    notification.textContent = message;
    notification.style.cssText = `
        position: fixed;
        top: 100px;
        right: 20px;
        background: ${message.includes('✅') ? 'rgba(0, 255, 0, 0.9)' : 'rgba(255, 0, 0, 0.9)'};
        color: white;
        padding: 15px 25px;
        border-radius: 10px;
        font-weight: bold;
        z-index: 10000;
        box-shadow: 0 5px 20px rgba(0, 0, 0, 0.5);
        animation: slideInRight 0.3s ease-out;
    `;
    
    document.body.appendChild(notification);
    
    // Remove after 3 seconds
    setTimeout(() => {
        notification.style.animation = 'slideOutRight 0.3s ease-out';
        setTimeout(() => {
            document.body.removeChild(notification);
        }, 300);
    }, 3000);
}

// Add animations for notification
const notificationStyle = document.createElement('style');
notificationStyle.textContent = `
    @keyframes slideInRight {
        from {
            transform: translateX(400px);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
    
    @keyframes slideOutRight {
        from {
            transform: translateX(0);
            opacity: 1;
        }
        to {
            transform: translateX(400px);
            opacity: 0;
        }
    }
`;
document.head.appendChild(notificationStyle);
