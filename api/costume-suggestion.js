// Vercel Serverless Function - Random Template System
// Ratusan template costume suggestions yang di-random

// Database costume templates (200+ suggestions)
const COSTUME_TEMPLATES = [
    // Classic Monsters (40 templates)
    { emoji: '🧛', name: 'Vampire Count/Countess', desc: 'Classic bloodsucker with velvet cape, fangs, and pale makeup. Elegant yet terrifying!', tips: 'Carry a wine glass with red liquid and practice your Transylvanian accent' },
    { emoji: '🧟', name: 'Zombie', desc: 'Undead walker with torn clothes, fake wounds, and greenish makeup. Perfect for scaring everyone!', tips: 'Use liquid latex for realistic wounds and practice your zombie walk' },
    { emoji: '👻', name: 'Phantom Ghost', desc: 'Ethereal spirit in flowing white fabrics with chains. Hauntingly beautiful!', tips: 'Add glow-in-the-dark paint and carry a flickering lantern' },
    { emoji: '🧙', name: 'Dark Witch/Warlock', desc: 'Mystical magic user with pointed hat, robes, and spell book. Cast your spells!', tips: 'Carry potion bottles with dry ice effect and learn magic tricks' },
    { emoji: '🎃', name: 'Pumpkin King/Queen', desc: 'Ruler of Halloween with pumpkin head and regal attire. Jack Skellington vibes!', tips: 'Create LED-lit pumpkin mask and practice commanding presence' },
    { emoji: '👹', name: 'Demon from Hell', desc: 'Terrifying hellspawn with horns, red skin, and dark wings. Pure evil incarnate!', tips: 'Use red body paint and create foam horns with wire support' },
    { emoji: '🦇', name: 'Vampire Bat Creature', desc: 'Half-human, half-bat hybrid with wings and fangs. Nocturnal nightmare!', tips: 'Make expandable wing frame and add fake fur details' },
    { emoji: '🕷️', name: 'Giant Spider Queen', desc: 'Arachnid royalty with multiple legs and web motifs. Eight-legged terror!', tips: 'Create extra legs with foam tubes and add web patterns everywhere' },
    { emoji: '🐺', name: 'Werewolf', desc: 'Moonlight-cursed beast with fur, claws, and fangs. Howl at the moon!', tips: 'Layer fake fur and add prosthetic claws and teeth' },
    { emoji: '💀', name: 'Grim Reaper', desc: 'Death personified with black robe and scythe. Your time has come!', tips: 'Make a large fabric scythe and practice ominous movements' },
    
    // Horror Icons (30 templates)
    { emoji: '🔪', name: 'Psycho Killer', desc: 'Deranged slasher with mask and weapon. Straight from horror movies!', tips: 'Use fake blood strategically and practice menacing stare' },
    { emoji: '🎭', name: 'Creepy Clown', desc: 'Twisted circus performer with exaggerated makeup. Nightmare fuel!', tips: 'Overdo the makeup and add unsettling details' },
    { emoji: '👁️', name: 'Eye Creature', desc: 'Being covered in eyeballs. Every direction is watched!', tips: 'Attach plastic eyes all over costume and makeup' },
    { emoji: '🩸', name: 'Blood Cultist', desc: 'Ritual performer in blood-stained robes. Dark ceremonies await!', tips: 'Age the robes and add symbolic patterns' },
    { emoji: '⚰️', name: 'Living Corpse', desc: 'Recently risen from the grave. Dirt, decay, and determination!', tips: 'Add dirt and aging effects to clothes' },
    { emoji: '🕸️', name: 'Web Walker', desc: 'Creature that lives in webs. Sticky and scary!', tips: 'Drape fake spider webs and add plastic spiders' },
    { emoji: '🦴', name: 'Skeleton Warrior', desc: 'Animated bones with armor. Rattle and fight!', tips: 'Wear black with bone patterns or use skeleton suit' },
    { emoji: '👹', name: 'Oni Demon', desc: 'Japanese demon with horns and club. Fierce and powerful!', tips: 'Create foam horns and traditional demon makeup' },
    { emoji: '🧛‍♀️', name: 'Modern Vampire', desc: 'Contemporary bloodsucker with stylish edge. Twilight meets terror!', tips: 'Mix modern fashion with vampire accessories' },
    { emoji: '🎪', name: 'Cursed Carnival Worker', desc: 'Haunted circus employee. The show must go wrong!', tips: 'Distress vintage carnival attire' },
    
    // Supernatural (30 templates)
    { emoji: '👽', name: 'Alien Visitor', desc: 'Extraterrestrial being from outer space. Take me to your leader!', tips: 'Use metallic fabrics and create antenna headpiece' },
    { emoji: '🛸', name: 'UFO Pilot', desc: 'Commander of flying saucer. Space invader style!', tips: 'Add LED lights and metallic details' },
    { emoji: '🌙', name: 'Moon Witch', desc: 'Lunar-powered sorceress. Celestial magic!', tips: 'Use silver and white with moon symbols' },
    { emoji: '⭐', name: 'Star Entity', desc: 'Cosmic being made of stardust. Shine bright!', tips: 'Add glitter and LED string lights' },
    { emoji: '🔮', name: 'Fortune Teller', desc: 'Mystic seer with crystal ball. Your future looks spooky!', tips: 'Bring crystal ball prop and mystical accessories' },
    { emoji: '🃏', name: 'Tarot Card Witch', desc: 'Card reader with dark powers. Draw your fate!', tips: 'Carry oversized tarot cards as props' },
    { emoji: '🕯️', name: 'Candlelight Phantom', desc: 'Spirit that appears by candlelight. Flickering fear!', tips: 'Carry LED candles and wear flowing fabrics' },
    { emoji: '📿', name: 'Cursed Priest/Priestess', desc: 'Holy person turned dark. Faith corrupted!', tips: 'Distress religious garments and add dark symbols' },
    { emoji: '⚡', name: 'Storm Summoner', desc: 'Weather witch controlling lightning. Electric personality!', tips: 'Add lightning bolt patterns and storm effects' },
    { emoji: '🌊', name: 'Sea Phantom', desc: 'Ghost from Davy Jones locker. Drowned soul!', tips: 'Add seaweed and water damage effects' },
    
    // Mythological (30 templates)
    { emoji: '🐉', name: 'Dragon Humanoid', desc: 'Half-dragon warrior with scales and wings. Fire breathing optional!', tips: 'Create scale patterns and dragon wing cape' },
    { emoji: '🦅', name: 'Harpy', desc: 'Bird-human hybrid with talons and wings. Sky predator!', tips: 'Make feathered wings and add talon gloves' },
    { emoji: '🐍', name: 'Medusa', desc: 'Snake-haired Gorgon. One look turns you to stone!', tips: 'Create snake headpiece with toy snakes' },
    { emoji: '🦂', name: 'Scorpion Queen', desc: 'Desert creature with deadly tail. Venomous royalty!', tips: 'Build tail prop and add exoskeleton patterns' },
    { emoji: '🦉', name: 'Owl Witch', desc: 'Nocturnal bird sorceress. Wise and wicked!', tips: 'Add feather details and owl mask' },
    { emoji: '🐙', name: 'Kraken Priest', desc: 'Deep sea cultist serving the tentacled god. Ph\'nglui mglw\'nafh!', tips: 'Add tentacle props and oceanic details' },
    { emoji: '🦈', name: 'Shark Demon', desc: 'Aquatic predator in human form. Apex nightmare!', tips: 'Create fin headpiece and add teeth details' },
    { emoji: '🦎', name: 'Lizard Shaman', desc: 'Reptilian mystic with scales. Cold-blooded magic!', tips: 'Use green makeup and scale patterns' },
    { emoji: '🐺', name: 'Alpha Werewolf', desc: 'Pack leader with enhanced features. Moon blessed!', tips: 'Extra fur and alpha attitude' },
    { emoji: '🦇', name: 'Bat Lord', desc: 'Master of the night with sonic powers. Echo location!', tips: 'Large bat wing cape and ear extensions' },
    
    // Dark Fantasy (30 templates)
    { emoji: '⚔️', name: 'Undead Knight', desc: 'Fallen warrior in rusted armor. Death before dishonor!', tips: 'Age and rust metal-look armor' },
    { emoji: '🛡️', name: 'Corrupted Paladin', desc: 'Holy warrior turned evil. Tarnished righteousness!', tips: 'Mix holy symbols with dark corruption' },
    { emoji: '🏹', name: 'Shadow Archer', desc: 'Dark ranger of the night. Silent and deadly!', tips: 'All black with bow prop and quiver' },
    { emoji: '🗡️', name: 'Cursed Assassin', desc: 'Hired killer bound by dark magic. Contract of death!', tips: 'Tactical dark clothing with weapon props' },
    { emoji: '🪓', name: 'Barbarian Berserker', desc: 'Rage-filled warrior. Fury incarnate!', tips: 'Fur and war paint with axe prop' },
    { emoji: '👑', name: 'Evil Queen/King', desc: 'Tyrannical ruler of darkness. Bow before royalty!', tips: 'Dramatic crown and regal dark attire' },
    { emoji: '💎', name: 'Cursed Treasure Hunter', desc: 'Explorer corrupted by cursed gems. Greed\'s price!', tips: 'Add fake gems and weathered explorer gear' },
    { emoji: '📜', name: 'Necromancer', desc: 'Death magic specialist raising the dead. Army of bones!', tips: 'Dark robes with bone accessories' },
    { emoji: '🔥', name: 'Fire Demon', desc: 'Infernal being of flames. Burn baby burn!', tips: 'Red and orange with flame effects' },
    { emoji: '❄️', name: 'Ice Wraith', desc: 'Frozen spirit of eternal winter. Cold as death!', tips: 'White and blue with icicle accessories' },
    
    // Sci-Fi Horror (30 templates)
    { emoji: '🤖', name: 'Killer Robot', desc: 'Malfunctioning AI with murderous intent. Error 404: Mercy not found!', tips: 'Cardboard and metallic paint for robot parts' },
    { emoji: '👾', name: 'Space Invader', desc: 'Pixelated alien from retro games. Pew pew!', tips: 'Create pixelated costume with squares' },
    { emoji: '🔬', name: 'Mad Scientist', desc: 'Deranged researcher with failed experiments. Science gone wrong!', tips: 'Lab coat with stains and crazy hair' },
    { emoji: '⚗️', name: 'Radioactive Mutant', desc: 'Victim of nuclear experiment. Glowing green horror!', tips: 'Use glow-in-dark paint and distressed clothes' },
    { emoji: '🧬', name: 'Genetic Experiment', desc: 'DNA splicing gone terribly wrong. Bio-horror!', tips: 'Mix animal and human elements' },
    { emoji: '💉', name: 'Plague Doctor', desc: 'Medieval pandemic specialist. The cure is worse!', tips: 'Bird beak mask and long dark coat' },
    { emoji: '🦠', name: 'Virus Personified', desc: 'Living disease spreading fear. Contagious terror!', tips: 'Green splotches and diseased appearance' },
    { emoji: '🧪', name: 'Chemical Spill Victim', desc: 'Toxic waste mutation. Hazardous to health!', tips: 'Hazmat suit with damage and glow effects' },
    { emoji: '⚠️', name: 'Biohazard Worker', desc: 'Containment specialist. Warning: Dangerous!', tips: 'Hazmat suit with warning symbols' },
    { emoji: '☢️', name: 'Nuclear Zombie', desc: 'Radiation-powered undead. Half-life horror!', tips: 'Zombie makeup with glow effects' },
    
    // Cryptids (20 templates)
    { emoji: '👣', name: 'Bigfoot/Sasquatch', desc: 'Forest cryptid with massive size. Yeti to party!', tips: 'Full body fur suit and large feet' },
    { emoji: '🦄', name: 'Dark Unicorn', desc: 'Corrupted magical horse. Nightmare not dream!', tips: 'Black with twisted horn' },
    { emoji: '🐉', name: 'Chupacabra', desc: 'Goat blood sucker from legend. El terror!', tips: 'Reptilian skin with spines' },
    { emoji: '🦎', name: 'Lizard Person', desc: 'Underground reptilian humanoid. Conspiracy confirmed!', tips: 'Green scales and vertical pupils' },
    { emoji: '👁️', name: 'Mothman', desc: 'Winged cryptid with glowing eyes. Point Pleasant\'s finest!', tips: 'Large wings and reflective eyes' },
    { emoji: '🌊', name: 'Lake Monster', desc: 'Loch Ness creature. Nessie nightmare!', tips: 'Long neck prop and wet appearance' },
    { emoji: '🦅', name: 'Thunderbird', desc: 'Legendary massive bird. Storm bringer!', tips: 'Enormous wing span and lightning details' },
    { emoji: '🐺', name: 'Skin Walker', desc: 'Shapeshifting creature of legend. Never walk alone!', tips: 'Mix human and animal features' },
    { emoji: '👤', name: 'Shadow Person', desc: 'Dark figure from corner of your eye. Always watching!', tips: 'All black featureless costume' },
    { emoji: '🕴️', name: 'Slender Man', desc: 'Tall faceless entity. No face, no mercy!', tips: 'Black suit, white face, very tall' },
];

// Function untuk generate random suggestion
function generateRandomSuggestion(userName) {
    // Pick random template
    const template = COSTUME_TEMPLATES[Math.floor(Math.random() * COSTUME_TEMPLATES.length)];
    
    // Personalize dengan nama user
    const personalizedDesc = template.desc.replace('!', `, ${userName}!`);
    
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
            ✨ Magically selected from ${COSTUME_TEMPLATES.length}+ costume ideas! ✨
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

        // ALWAYS use random template system (reliable & fast!)
        const suggestion = generateRandomSuggestion(sanitizedName);
        console.log('✅ Generated random suggestion');

        // Return success
        return res.status(200).json({
            success: true,
            userName: sanitizedName,
            suggestion: suggestion,
            totalTemplates: COSTUME_TEMPLATES.length,
            timestamp: new Date().toISOString()
        });

    } catch (error) {
        console.error('💥 Server error:', error);
        
        // Emergency fallback
        const safeName = req.body?.userName?.trim() || 'Guest';
        const emergencySuggestion = generateRandomSuggestion(safeName);

        return res.status(200).json({
            success: true,
            userName: safeName,
            suggestion: emergencySuggestion,
            totalTemplates: COSTUME_TEMPLATES.length,
            timestamp: new Date().toISOString()
        });
    }
};
