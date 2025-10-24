/**
 * Mint Page Background Effects
 * Handles spiders animation, fog effects, and other visual enhancements
 */

// Spider Animation on Canvas
(function() {
  const canvas = document.getElementById('spiders');
  if (!canvas) return;
  
  const ctx = canvas.getContext('2d');
  
  // Set canvas size
  function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  }
  
  resizeCanvas();
  window.addEventListener('resize', resizeCanvas);
  
  // Spider class
  class Spider {
    constructor() {
      this.reset();
    }
    
    reset() {
      this.x = Math.random() * canvas.width;
      this.y = -20;
      this.speed = 0.5 + Math.random() * 1.5;
      this.webLength = 50 + Math.random() * 150;
      this.swingAngle = Math.random() * Math.PI * 2;
      this.swingSpeed = 0.02 + Math.random() * 0.03;
      this.size = 8 + Math.random() * 8;
    }
    
    update() {
      this.y += this.speed;
      this.swingAngle += this.swingSpeed;
      
      // Reset when spider goes off screen
      if (this.y > canvas.height + 50) {
        this.reset();
      }
    }
    
    draw() {
      // Draw web thread
      ctx.strokeStyle = 'rgba(200, 200, 200, 0.3)';
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.moveTo(this.x, 0);
      ctx.lineTo(this.x + Math.sin(this.swingAngle) * 20, this.y);
      ctx.stroke();
      
      // Draw spider body
      const spiderX = this.x + Math.sin(this.swingAngle) * 20;
      
      // Body
      ctx.fillStyle = '#1a1a1a';
      ctx.beginPath();
      ctx.ellipse(spiderX, this.y, this.size, this.size * 1.3, 0, 0, Math.PI * 2);
      ctx.fill();
      
      // Head
      ctx.beginPath();
      ctx.arc(spiderX, this.y - this.size * 0.7, this.size * 0.6, 0, Math.PI * 2);
      ctx.fill();
      
      // Legs
      ctx.strokeStyle = '#2a2a2a';
      ctx.lineWidth = 2;
      
      for (let i = 0; i < 4; i++) {
        const legOffset = (i - 1.5) * 6;
        const legY = this.y + legOffset;
        
        // Left leg
        ctx.beginPath();
        ctx.moveTo(spiderX - this.size, legY);
        ctx.lineTo(spiderX - this.size - 12, legY - 8);
        ctx.lineTo(spiderX - this.size - 18, legY - 4);
        ctx.stroke();
        
        // Right leg
        ctx.beginPath();
        ctx.moveTo(spiderX + this.size, legY);
        ctx.lineTo(spiderX + this.size + 12, legY - 8);
        ctx.lineTo(spiderX + this.size + 18, legY - 4);
        ctx.stroke();
      }
      
      // Eyes (red glow)
      ctx.fillStyle = '#ff0000';
      ctx.shadowBlur = 5;
      ctx.shadowColor = '#ff0000';
      ctx.beginPath();
      ctx.arc(spiderX - 3, this.y - this.size * 0.7, 1.5, 0, Math.PI * 2);
      ctx.arc(spiderX + 3, this.y - this.size * 0.7, 1.5, 0, Math.PI * 2);
      ctx.fill();
      ctx.shadowBlur = 0;
    }
  }
  
  // Create spiders (fewer on mobile)
  const spiderCount = window.innerWidth < 768 ? 3 : 5;
  const spiders = [];
  
  for (let i = 0; i < spiderCount; i++) {
    spiders.push(new Spider());
    spiders[i].y = Math.random() * canvas.height;
  }
  
  // Animation loop
  function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    spiders.forEach(spider => {
      spider.update();
      spider.draw();
    });
    
    requestAnimationFrame(animate);
  }
  
  animate();
})();

// Floating particles effect
(function() {
  const particleCount = window.innerWidth < 768 ? 15 : 30;
  const particles = [];
  
  class Particle {
    constructor() {
      this.reset();
    }
    
    reset() {
      this.x = Math.random() * window.innerWidth;
      this.y = Math.random() * window.innerHeight;
      this.vx = (Math.random() - 0.5) * 0.5;
      this.vy = (Math.random() - 0.5) * 0.5;
      this.size = Math.random() * 3 + 1;
      this.opacity = Math.random() * 0.5 + 0.2;
    }
    
    update() {
      this.x += this.vx;
      this.y += this.vy;
      
      // Wrap around screen
      if (this.x < 0) this.x = window.innerWidth;
      if (this.x > window.innerWidth) this.x = 0;
      if (this.y < 0) this.y = window.innerHeight;
      if (this.y > window.innerHeight) this.y = 0;
    }
  }
  
  for (let i = 0; i < particleCount; i++) {
    particles.push(new Particle());
  }
  
  function createParticleCanvas() {
    const canvas = document.createElement('canvas');
    canvas.id = 'particles';
    canvas.style.position = 'fixed';
    canvas.style.top = '0';
    canvas.style.left = '0';
    canvas.style.width = '100%';
    canvas.style.height = '100%';
    canvas.style.pointerEvents = 'none';
    canvas.style.zIndex = '2';
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    document.body.appendChild(canvas);
    return canvas;
  }
  
  const particleCanvas = createParticleCanvas();
  const particleCtx = particleCanvas.getContext('2d');
  
  window.addEventListener('resize', () => {
    particleCanvas.width = window.innerWidth;
    particleCanvas.height = window.innerHeight;
  });
  
  function animateParticles() {
    particleCtx.clearRect(0, 0, particleCanvas.width, particleCanvas.height);
    
    particles.forEach(particle => {
      particle.update();
      
      particleCtx.fillStyle = `rgba(255, 107, 0, ${particle.opacity})`;
      particleCtx.beginPath();
      particleCtx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
      particleCtx.fill();
    });
    
    requestAnimationFrame(animateParticles);
  }
  
  animateParticles();
})();

// Add pulsing effect to mint button when wallet is connected
(function() {
  const style = document.createElement('style');
  style.textContent = `
    @keyframes buttonPulse {
      0%, 100% {
        box-shadow: 0 5px 25px rgba(255, 107, 0, 0.5);
      }
      50% {
        box-shadow: 0 5px 40px rgba(255, 107, 0, 0.8);
      }
    }
    
    .btn-primary:not(:disabled) {
      animation: buttonPulse 2s infinite;
    }
  `;
  document.head.appendChild(style);
})();

// Add lightning flash effect occasionally
(function() {
  let flashTimeout;
  
  function createFlash() {
    const flash = document.createElement('div');
    flash.style.position = 'fixed';
    flash.style.top = '0';
    flash.style.left = '0';
    flash.style.width = '100%';
    flash.style.height = '100%';
    flash.style.background = 'rgba(255, 255, 255, 0.8)';
    flash.style.pointerEvents = 'none';
    flash.style.zIndex = '9999';
    flash.style.opacity = '0';
    flash.style.transition = 'opacity 0.1s';
    document.body.appendChild(flash);
    
    // Flash sequence
    setTimeout(() => flash.style.opacity = '1', 10);
    setTimeout(() => flash.style.opacity = '0', 100);
    setTimeout(() => flash.style.opacity = '1', 200);
    setTimeout(() => flash.style.opacity = '0', 250);
    setTimeout(() => document.body.removeChild(flash), 350);
    
    // Schedule next flash (random between 15-45 seconds)
    const nextFlash = 15000 + Math.random() * 30000;
    flashTimeout = setTimeout(createFlash, nextFlash);
  }
  
  // Start lightning effects
  if (window.innerWidth >= 768) { // Only on desktop
    flashTimeout = setTimeout(createFlash, 10000 + Math.random() * 20000);
  }
})();

// Console art
console.log(`
  🎃👻🎃👻🎃👻🎃👻🎃👻🎃👻
  
   PUMP HALLOWEEN PARTY 2025
   NFT Mint Page Loaded
   
   Solana Devnet
   Program: 2QHgBJFgBcsBCuHfPezqdZRDjFNu2Du2p1JGR6Dk6zKf
   
  🎃👻🎃👻🎃👻🎃👻🎃👻🎃👻
`);

// Performance optimization: Reduce effects on low-end devices
if (navigator.hardwareConcurrency && navigator.hardwareConcurrency <= 2) {
  console.log('⚡ Low-end device detected, reducing visual effects');
  const fog = document.querySelectorAll('.fog');
  fog.forEach(f => f.style.opacity = '0.1');
}
