// Particle System
function createParticles() {
    const particlesContainer = document.getElementById('particles');
    const particleSymbols = ['❤️', '💕', '💖', '💗', '💝', '💘', '✨', '⭐', '🌟'];
    
    setInterval(() => {
        const particle = document.createElement('div');
        particle.className = 'particle';
        particle.textContent = particleSymbols[Math.floor(Math.random() * particleSymbols.length)];
        particle.style.left = Math.random() * 100 + '%';
        particle.style.animationDuration = (Math.random() * 5 + 5) + 's';
        particle.style.fontSize = (Math.random() * 20 + 15) + 'px';
        
        particlesContainer.appendChild(particle);
        
        setTimeout(() => {
            particle.remove();
        }, 10000);
    }, 300);
}

// Sparkle Effect for Yes Button
function createSparkle(button) {
    const sparklesContainer = button.querySelector('.sparkles');
    const sparkle = document.createElement('div');
    sparkle.className = 'sparkle';
    
    const rect = button.getBoundingClientRect();
    const x = Math.random() * rect.width;
    const y = Math.random() * rect.height;
    
    sparkle.style.left = x + 'px';
    sparkle.style.top = y + 'px';
    sparkle.style.setProperty('--tx', (Math.random() - 0.5) * 100 + 'px');
    sparkle.style.setProperty('--ty', (Math.random() - 0.5) * 100 + 'px');
    
    sparklesContainer.appendChild(sparkle);
    
    setTimeout(() => {
        sparkle.remove();
    }, 1000);
}

// No Button Escape Logic
let escapeCount = 0;
const noBtn = document.getElementById('noBtn');
const yesBtn = document.getElementById('yesBtn');
const escapeCountDisplay = document.getElementById('escapeCount');

function moveNoButton() {
    const maxX = window.innerWidth - noBtn.offsetWidth - 40;
    const maxY = window.innerHeight - noBtn.offsetHeight - 40;
    
    let newX, newY;
    let attempts = 0;
    const minDistance = 200; // Minimum distance from current position
    
    do {
        newX = Math.random() * maxX;
        newY = Math.random() * maxY;
        attempts++;
    } while (attempts < 10 && Math.abs(newX - noBtn.offsetLeft) < minDistance && Math.abs(newY - noBtn.offsetTop) < minDistance);
    
    noBtn.style.position = 'fixed';
    noBtn.style.left = newX + 'px';
    noBtn.style.top = newY + 'px';
    noBtn.classList.add('escaping');
    
    escapeCount++;
    escapeCountDisplay.textContent = escapeCount;
    
    setTimeout(() => {
        noBtn.classList.remove('escaping');
    }, 300);
    
    // Update button text based on escape count
    const messages = [
        "No (Wrong Answer 😂)",
        "Still No? Really? 🤨",
        "Come on now... 😏",
        "You can't escape love! 💕",
        "Shadow, stop playing! 😆",
        "The Yes button is right there! 👉",
        "I'm getting tired... 😅",
        "Fine, keep trying... 🙄",
        "You're stubborn! 😤",
        "Last chance! 💔",
        "Okay, I give up... Just kidding! 😜"
    ];
    
    if (escapeCount < messages.length) {
        noBtn.querySelector('.btn-text').textContent = messages[escapeCount];
    } else {
        noBtn.querySelector('.btn-text').textContent = "You're impossible! 😂";
    }
}

// No Button Event Listeners
noBtn.addEventListener('mouseenter', moveNoButton);
noBtn.addEventListener('touchstart', (e) => {
    e.preventDefault();
    moveNoButton();
});

noBtn.addEventListener('click', (e) => {
    e.preventDefault();
    moveNoButton();
});

// Yes Button Sparkles
yesBtn.addEventListener('mouseenter', () => {
    const sparkleInterval = setInterval(() => {
        createSparkle(yesBtn);
    }, 100);
    
    yesBtn.addEventListener('mouseleave', () => {
        clearInterval(sparkleInterval);
    }, { once: true });
});

// Yes Button Click - Show Reveal
yesBtn.addEventListener('click', () => {
    showReveal();
});

// Show Reveal Screen with Heart Explosion
function showReveal() {
    const revealScreen = document.getElementById('revealScreen');
    const heartExplosion = document.getElementById('heartExplosion');
    
    // Create heart explosion
    for (let i = 0; i < 50; i++) {
        setTimeout(() => {
            const heart = document.createElement('div');
            heart.className = 'exploding-heart';
            heart.textContent = ['❤️', '💕', '💖', '💗', '💝'][Math.floor(Math.random() * 5)];
            
            heart.style.left = '50%';
            heart.style.top = '50%';
            heart.style.setProperty('--ex', (Math.random() - 0.5) * window.innerWidth + 'px');
            heart.style.setProperty('--ey', (Math.random() - 0.5) * window.innerHeight + 'px');
            
            heartExplosion.appendChild(heart);
            
            setTimeout(() => {
                heart.remove();
            }, 2000);
        }, i * 50);
    }
    
    // Show reveal screen
    setTimeout(() => {
        revealScreen.classList.add('active');
    }, 500);
}

// Close Button (Save the moment)
document.getElementById('closeBtn').addEventListener('click', () => {
    // Create a sweet alert effect
    const message = document.createElement('div');
    message.style.cssText = `
        position: fixed;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        background: rgba(255, 255, 255, 0.95);
        color: #f5576c;
        padding: 40px 60px;
        border-radius: 20px;
        font-size: 1.5rem;
        font-weight: 600;
        z-index: 1000;
        box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
        animation: bounceIn 0.5s ease-out;
        text-align: center;
    `;
    message.innerHTML = `
        <div style="font-size: 3rem; margin-bottom: 15px;">💕</div>
        <div>This moment is saved in my heart forever!</div>
        <div style="font-size: 1rem; margin-top: 15px; opacity: 0.7;">See you on Valentine's Day, Shadow! 🌹</div>
    `;
    
    document.body.appendChild(message);
    
    setTimeout(() => {
        message.style.animation = 'fadeOut 0.5s ease-out';
        setTimeout(() => {
            message.remove();
            // Optionally reset to main screen
            document.getElementById('revealScreen').classList.remove('active');
            resetNoButton();
        }, 500);
    }, 3000);
});

// Reset No Button position
function resetNoButton() {
    noBtn.style.position = 'relative';
    noBtn.style.left = 'auto';
    noBtn.style.top = 'auto';
    noBtn.querySelector('.btn-text').textContent = "No (Wrong Answer 😂)";
    escapeCount = 0;
    escapeCountDisplay.textContent = '0';
}

// Portal Interaction - Mouse Move Effect
document.addEventListener('mousemove', (e) => {
    const portal = document.getElementById('portal');
    const x = (e.clientX / window.innerWidth - 0.5) * 20;
    const y = (e.clientY / window.innerHeight - 0.5) * 20;
    
    portal.style.transform = `translate(${x}px, ${y}px)`;
});

// Mobile Touch Support for Portal
document.addEventListener('touchmove', (e) => {
    const touch = e.touches[0];
    const portal = document.getElementById('portal');
    const x = (touch.clientX / window.innerWidth - 0.5) * 20;
    const y = (touch.clientY / window.innerHeight - 0.5) * 20;
    
    portal.style.transform = `translate(${x}px, ${y}px)`;
});

// Easter Egg - Click on portal rings
let portalClicks = 0;
document.querySelectorAll('.portal-ring').forEach(ring => {
    ring.style.cursor = 'pointer';
    ring.style.pointerEvents = 'all';
    
    ring.addEventListener('click', () => {
        portalClicks++;
        
        // Create a floating message
        const message = document.createElement('div');
        message.style.cssText = `
            position: fixed;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            color: white;
            font-size: 1.5rem;
            font-weight: 600;
            z-index: 1000;
            animation: fadeOut 2s ease-out forwards;
            pointer-events: none;
            text-shadow: 0 0 10px rgba(0, 0, 0, 0.5);
        `;
        
        const messages = [
            "You found a secret! ✨",
            "The portal loves you too! 💕",
            "Shadow is amazing! 🌟",
            "Keep clicking... 😏",
            "You're curious, I like that! 💖",
            "Almost there... 🎯",
            "One more time! 🎉",
            "You're the best! 💝"
        ];
        
        message.textContent = messages[Math.min(portalClicks - 1, messages.length - 1)];
        document.body.appendChild(message);
        
        setTimeout(() => {
            message.remove();
        }, 2000);
        
        // Special effect after 5 clicks
        if (portalClicks === 5) {
            createSpecialEffect();
        }
    });
});

// Special Effect for Easter Egg
function createSpecialEffect() {
    const colors = ['#ff6b9d', '#c06c84', '#f093fb', '#f5576c'];
    
    for (let i = 0; i < 100; i++) {
        setTimeout(() => {
            const confetti = document.createElement('div');
            confetti.style.cssText = `
                position: fixed;
                width: 10px;
                height: 10px;
                background: ${colors[Math.floor(Math.random() * colors.length)]};
                top: 50%;
                left: 50%;
                border-radius: 50%;
                pointer-events: none;
                z-index: 1000;
            `;
            
            const angle = (Math.PI * 2 * i) / 100;
            const velocity = Math.random() * 300 + 200;
            const tx = Math.cos(angle) * velocity;
            const ty = Math.sin(angle) * velocity;
            
            confetti.animate([
                { transform: 'translate(0, 0) scale(1)', opacity: 1 },
                { transform: `translate(${tx}px, ${ty}px) scale(0)`, opacity: 0 }
            ], {
                duration: 1000,
                easing: 'ease-out'
            });
            
            document.body.appendChild(confetti);
            
            setTimeout(() => {
                confetti.remove();
            }, 1000);
        }, i * 10);
    }
}

// Add fadeOut animation to CSS dynamically
const style = document.createElement('style');
style.textContent = `
    @keyframes fadeOut {
        from { opacity: 1; transform: translate(-50%, -50%) scale(1); }
        to { opacity: 0; transform: translate(-50%, -50%) scale(0.8); }
    }
`;
document.head.appendChild(style);

// Initialize
createParticles();

// Add a subtle background music option (commented out by default)
// Uncomment and add your music file if desired
/*
const audio = new Audio('romantic-music.mp3');
audio.loop = true;
audio.volume = 0.3;

// Play on first user interaction
document.addEventListener('click', () => {
    audio.play();
}, { once: true });
*/

console.log('💕 Shadow\'s Love Portal initialized! 💕');
console.log('🎯 Easter egg hint: Try clicking the portal rings! ✨');
