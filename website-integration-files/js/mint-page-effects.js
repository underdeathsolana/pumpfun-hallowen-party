// Mint Page Visual Effects - Spider Animation
function initializeSpiders() {
    const canvas = document.getElementById('spiders');
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    
    const spiders = [];
    const spiderCount = 8; // Fewer spiders for mint page
    
    class Spider {
        constructor() {
            this.x = Math.random() * canvas.width;
            this.y = -50;
            this.speed = 0.5 + Math.random() * 1;
            this.swing = Math.random() * 2 - 1;
            this.swingSpeed = 0.02 + Math.random() * 0.02;
            this.threadLength = 0;
        }
        
        update() {
            this.threadLength += 2;
            this.y += this.speed;
            this.x += Math.sin(this.threadLength * this.swingSpeed) * this.swing;
            
            if (this.y > canvas.height + 50) {
                this.y = -50;
                this.x = Math.random() * canvas.width;
                this.threadLength = 0;
            }
        }
        
        draw() {
            // Draw thread
            ctx.beginPath();
            ctx.strokeStyle = 'rgba(200, 200, 200, 0.3)';
            ctx.lineWidth = 1;
            ctx.moveTo(this.x, 0);
            ctx.lineTo(this.x, this.y);
            ctx.stroke();
            
            // Draw spider
            ctx.fillStyle = '#000';
            ctx.beginPath();
            ctx.arc(this.x, this.y, 4, 0, Math.PI * 2);
            ctx.fill();
            
            // Draw legs
            ctx.strokeStyle = '#000';
            ctx.lineWidth = 1;
            for (let i = 0; i < 4; i++) {
                const angle = (i * Math.PI / 2) - Math.PI / 4;
                ctx.beginPath();
                ctx.moveTo(this.x, this.y);
                ctx.lineTo(
                    this.x + Math.cos(angle) * 8,
                    this.y + Math.sin(angle) * 8
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
    
    // Resize handler
    window.addEventListener('resize', () => {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    });
}

// Initialize when DOM is loaded
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initializeSpiders);
} else {
    initializeSpiders();
}
