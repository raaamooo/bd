// Enhanced Birthday Surprise Elements with Professional Interactions

document.addEventListener('DOMContentLoaded', function() {
    // Initialize all features
    initSparkles();
    initInteractions();
    initAudioFeedback();
    initAccessibilityFeatures();
    initPerformanceOptimizations();
    initWishWell();
    initTimeSurprise();
    initThemeToggle();

    // Add Easter egg keyboard shortcuts
    initEasterEggs();
});

// Sparkles System - Professional Implementation
function initSparkles() {
    const sparklesContainer = document.createElement('div');
    sparklesContainer.className = 'sparkles';
    document.body.appendChild(sparklesContainer);

    // Create sparkle pool for better performance
    const sparklePool = [];
    const POOL_SIZE = 50;

    // Pre-create sparkle elements
    for (let i = 0; i < POOL_SIZE; i++) {
        const sparkle = createSparkleElement();
        sparkle.inUse = false;
        sparklePool.push(sparkle);
        sparklesContainer.appendChild(sparkle);
    }

    // Sparkle emission rate control
    let lastEmit = 0;
    const EMIT_INTERVAL = 300; // ms

    function emitSparkle() {
        const now = performance.now();
        if (now - lastEmit < EMIT_INTERVAL) return;

        // Find inactive sparkle
        const sparkle = sparklePool.find(s => !s.inUse);
        if (!sparkle) return;

        sparkle.inUse = true;
        resetSparkle(sparkle);
        lastEmit = now;

        // Animate sparkle
        animateSparkle(sparkle);
    }

    // Continuous emission with random variation
    function sparkleLoop() {
        emitSparkle();
        const variation = Math.random() * 100;
        setTimeout(sparkleLoop, EMIT_INTERVAL + variation);
    }

    sparkleLoop();

    // Handle visibility changes to save battery
    document.addEventListener('visibilitychange', function() {
        if (document.hidden) {
            // Pause sparkles when tab is hidden
            sparklesContainer.style.display = 'none';
        } else {
            sparklesContainer.style.display = 'block';
        }
    });
}

function createSparkleElement() {
    const sparkle = document.createElement('div');
    sparkle.className = 'sparkle';
    sparkle.style.willChange = 'transform, opacity';
    return sparkle;
}

function resetSparkle(sparkle) {
    // Random properties
    const size = Math.random() * 6 + 2; // 2-8px
    sparkle.style.width = `${size}px`;
    sparkle.style.height = `${size}px`;

    // Random starting position
    sparkle.style.left = `${Math.random() * 100}vw`;
    sparkle.style.top = `-10vh`;

    // Random duration with variance
    const baseDuration = 6000 + Math.random() * 4000; // 6-10s
    sparkle.style.animationDuration = `${baseDuration}ms`;

    // Random delay
    sparkle.style.animationDelay = `${Math.random() * 2000}ms`;

    // Random color/type
    const types = ['pink', 'peach', 'lavender', 'gold', ''];
    const type = types[Math.floor(Math.random() * types.length)];
    sparkle.className = `sparkle ${type}`.trim();

    // Random rotation
    sparkle.style.setProperty('--rotation', `${Math.random() * 360}deg`);
}

function animateSparkle(sparkle) {
    // Animate using requestAnimationFrame for better performance
    const startTime = performance.now();
    const duration = parseFloat(sparkle.style.animationDuration) || 5000;

    function update(time) {
        const elapsed = time - startTime;
        const progress = Math.min(elapsed / duration, 1);

        if (progress >= 1) {
            sparkle.inUse = false;
            return;
        }

        // Custom easing function
        const easedProgress = easeInOutCubic(progress);

        // Calculate position
        const startY = -10;
        const endY = 110;
        const currentY = startY + (endY - startY) * easedProgress;

        // Add some drift
        const drift = Math.sin(progress * Math.PI * 3) * 10;
        sparkle.style.left = `${parseFloat(sparkle.style.left) + drift * 0.1}vw`;
        sparkle.style.top = `${currentY}vh`;

        // Rotation
        sparkle.style.transform = `rotate(${progress * 360}deg)`;

        // Opacity fade in/out
        if (progress < 0.1) {
            sparkle.style.opacity = progress * 10;
        } else if (progress > 0.9) {
            sparkle.style.opacity = (1 - progress) * 10;
        } else {
            sparkle.style.opacity = 1;
        }

        requestAnimationFrame(update);
    }

    requestAnimationFrame(update);
}

// Easing functions
function easeInOutCubic(t) {
    return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
}

// Enhanced Interactions
function initInteractions() {
    // Photo frame interactions with haptic feedback simulation
    const photoFrames = document.querySelectorAll('.photo-frame');

    photoFrames.forEach(frame => {
        // Hover effects with spring physics
        frame.addEventListener('mouseenter', function(e) {
            addHoverEffect(frame, e);
        });

        frame.addEventListener('mouseleave', function() {
            removeHoverEffect(frame);
        });

        // Click effects
        frame.addEventListener('click', function(e) {
            addClickEffect(frame, e);

            // Simulate haptic feedback on supported devices
            if ('vibrate' in navigator) {
                navigator.vibrate(10);
            }
        });

        // Touch support
        frame.addEventListener('touchstart', function(e) {
            e.preventDefault();
            addTouchEffect(frame, e.touches[0]);
        }, { passive: false });
    });

    // Birthday cake special interaction
    const birthdayCake = document.querySelector('.birthday-cake');
    if (birthdayCake) {
        birthdayCake.addEventListener('mouseenter', function() {
            this.style.transform = 'scale(1.4) rotate(10deg)';
            this.style.transition = 'transform 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275)';

            // Show tooltip
            showTooltip(this, "Click for a surprise!");
        });

        birthdayCake.addEventListener('mouseleave', function() {
            this.style.transform = '';
            this.style.transition = '';
            hideTooltip();
        });

        birthdayCake.addEventListener('click', function() {
            triggerBirthdayWish();
        });
    }
}

function addHoverEffect(frame, event) {
    // Get mouse position relative to element
    const rect = frame.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;

    // Calculate tilt based on mouse position
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const tiltX = (x - centerX) / centerX * 5; // 5 degrees max
    const tiltY = (centerY - y) / centerY * 5;

    frame.style.transform = `
        translateY(-8px)
        scale(1.03)
        rotateX(${tiltY}deg)
        rotateY(${tiltX}deg)
    `;
    frame.style.transition = 'transform 0.2s cubic-bezier(0.175, 0.885, 0.32, 1.275)';

    // Enhanced shadow
    frame.style.boxShadow = `
        0 12px 25px rgba(0,0,0,0.15),
        0 8px 15px rgba(255,154,158,0.2)
    `;
}

function removeHoverEffect(frame) {
    frame.style.transform = '';
    frame.style.transition = 'transform 0.3s ease, box-shadow 0.3s ease';
    frame.style.boxShadow = `
        0 10px 25px rgba(0,0,0,0.1)
    `;
}

function addClickEffect(frame, event) {
    // Create ripple effect
    const ripple = document.createElement('div');
    ripple.style.position = 'absolute';
    ripple.style.borderRadius = '50%';
    ripple.style.background = 'rgba(255,255,255,0.3)';
    ripple.style.transform = 'scale(0)';
    ripple.style.pointerEvents = 'none';
    ripple.style.transition = 'opacity 0.4s ease, transform 0.4s ease';

    // Position ripple at click point
    const rect = frame.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;

    ripple.style.left = `${x}px`;
    ripple.style.top = `${y}px`;

    frame.style.position = 'relative';
    frame.style.overflow = 'hidden';
    frame.appendChild(ripple);

    // Animate ripple
    requestAnimationFrame(() => {
        ripple.style.transform = `scale(20)`;
        ripple.style.opacity = '0';
    });

    // Clean up
    setTimeout(() => {
        ripple.remove();
    }, 500);

    // Scale effect
    frame.style.transform = 'translateY(-4px) scale(0.98)';
    setTimeout(() => {
        frame.style.transform = '';
    }, 150);
}

function addTouchEffect(frame, touch) {
    // Similar to click but for touch
    addClickEffect(frame, {
        clientX: touch.clientX,
        clientY: touch.clientY
    });
}

// Tooltip System
let tooltipElement = null;

function showTooltip(target, text) {
    hideTooltip(); // Remove any existing tooltip

    tooltipElement = document.createElement('div');
    tooltipElement.className = 'tooltip';
    tooltipElement.textContent = text;
    tooltipElement.style.position = 'absolute';
    tooltipElement.style.background = 'rgba(0,0,0,0.8)';
    tooltipElement.style.color = 'white';
    tooltipElement.style.padding = '4px 8px';
    tooltipElement.style.borderRadius = '4px';
    tooltipElement.style.fontSize = '0.75rem';
    tooltipElement.style.whiteSpace = 'nowrap';
    tooltipElement.style.zIndex = '1000';
    tooltipElement.style.pointerEvents = 'none';
    tooltipElement.style.opacity = '0';
    tooltipElement.style.transition = 'opacity 0.2s ease';

    document.body.appendChild(tooltipElement);

    // Position tooltip above target
    const rect = target.getBoundingClientRect();
    tooltipElement.style.left = `${rect.left + rect.width / 2}px`;
    tooltipElement.style.bottom = `${window.innerHeight - rect.top + 10}px`;
    tooltipElement.style.transform = 'translateX(-50%)';

    // Fade in
    requestAnimationFrame(() => {
        tooltipElement.style.opacity = '1';
    });
}

function hideTooltip() {
    if (tooltipElement) {
        tooltipElement.style.opacity = '0';
        setTimeout(() => {
            if (tooltipElement.parentNode) {
                tooltipElement.parentNode.removeChild(tooltipElement);
            }
            tooltipElement = null;
        }, 200);
    }
}

// Birthday Wish System
function triggerBirthdayWish() {
    // Play celebration animation
    createConfetti();
    createBalloonBurst();

    // Show temporary message
    const message = document.createElement('div');
    message.textContent = "Happy Birthday, Oddy! 🎉";
    message.style.position = 'fixed';
    message.style.top = '50%';
    message.style.left = '50%';
    message.style.transform = 'translate(-50%, -50%)';
    message.style.background = 'rgba(255,255,255,0.9)';
    message.style.color = '#d6336c';
    message.style.padding = '16px 32px';
    message.style.borderRadius = '12px';
    message.style.fontSize = '1.5rem';
    message.style.fontWeight = 'bold';
    message.style.boxShadow = '0 10px 25px rgba(0,0,0,0.2)';
    message.style.zIndex = '1001';
    message.style.textAlign = 'center';
    message.style.animation = 'fadeInUp 0.5s ease-out, fadeOut 0.5s ease-in 2.5s forwards';

    document.body.append(message);

    // Remove after animation
    setTimeout(() => {
        message.remove();
    }, 3500);
}

// Audio Feedback System
function initAudioFeedback() {
    // Create audio context for beep sounds
    if ('AudioContext' in window || 'webkitAudioContext' in window) {
        const AudioCtx = window.AudioContext || window.webkitAudioContext;
        window.audioContext = new AudioCtx();
    }
}

function playBeep(frequency = 800, duration = 100) {
    if (!window.audioContext) return;

    const oscillator = window.audioContext.createOscillator();
    const gainNode = window.audioContext.createGain();

    oscillator.connect(gainNode);
    gainNode.connect(window.audioContext.destination);

    oscillator.frequency.value = frequency;
    oscillator.type = 'sine';

    gainNode.gain.setValueAtTime(0, window.audioContext.currentTime);
    gainNode.gain.linearRampToValueAtTime(0.3, window.audioContext.currentTime + 0.01);
    gainNode.gain.linearRampToValueAtTime(0, window.audioContext.currentTime + duration / 1000);

    oscillator.start(window.audioContext.currentTime);
    oscillator.stop(window.audioContext.currentTime + duration / 1000);
}

// Accessibility Features
function initAccessibilityFeatures() {
    // Ensure proper ARIA labels
    document.querySelectorAll('.photo-frame').forEach((frame, index) => {
        frame.setAttribute('role', 'button');
        frame.setAttribute('aria-label', `Photo ${index + 1}: ${frame.querySelector('.caption').textContent}`);
        frame.setAttribute('tabindex', '0');
    });

    // Keyboard navigation
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Enter' || e.key === ' ') {
            // Trigger click on focused elements
            if (e.target.matches('.photo-frame, .birthday-cake')) {
                e.target.click();
            }
        }
    });
}

// Performance Optimizations
function initPerformanceOptimizations() {
    // Use passive event listeners for touch/scroll where possible
    // Add will-change properties for animated elements

    // Throttle resize events
    let resizeTimeout;
    window.addEventListener('resize', function() {
        clearTimeout(resizeTimeout);
        resizeTimeout = setTimeout(() => {
            // Handle resize logic if needed
        }, 250);
    });

    // Intersection Observer for off-screen elements (if we had more content)
    // Not needed for this simple page but good practice
}

// Wish Well Feature
function initWishWell() {
    const wishWellBtn = document.getElementById('wish-well-btn');
    const wishModal = document.getElementById('wish-modal');
    const closeWishModal = document.getElementById('close-wish-modal');
    const wishInput = document.getElementById('wish-input');
    const submitWish = document.getElementById('submit-wish');
    const wishesList = document.getElementById('wishes-list');
    const charCount = document.querySelector('.char-count');

    // Load wishes from localStorage
    let wishes = JSON.parse(localStorage.getItem('oddyWishes')) || [];
    renderWishes();

    // Open modal
    wishWellBtn.addEventListener('click', () => {
        wishModal.setAttribute('aria-hidden', 'false');
        wishInput.focus();
    });

    // Close modal
    closeWishModal.addEventListener('click', () => {
        wishModal.setAttribute('aria-hidden', 'true');
    });

    // Close on outside click
    wishModal.addEventListener('click', (e) => {
        if (e.target === wishModal) {
            wishModal.setAttribute('aria-hidden', 'true');
        }
    });

    // Character count
    wishInput.addEventListener('input', () => {
        const remaining = 200 - wishInput.value.length;
        charCount.textContent = `${wishInput.value.length}/200 characters`;
        if (remaining < 0) {
            charCount.style.color = '#dc3545';
            wishInput.style.borderColor = '#dc3545';
        } else {
            charCount.style.color = '#6c757d';
            wishInput.style.borderColor = '#dee2e6';
        }
    });

    // Submit wish
    submitWish.addEventListener('click', () => {
        const wishText = wishInput.value.trim();
        if (wishText && wishText.length <= 200) {
            wishes.push({
                text: wishText,
                date: new Date().toISOString()
            });
            localStorage.setItem('oddyWishes', JSON.stringify(wishes));
            renderWishes();
            wishInput.value = '';
            charCount.textContent = '0/200 characters';
            playBeep(800, 100);
            showSubmitConfirmation();
        }
    });

    function renderWishes() {
        wishesList.innerHTML = '';
        wishes.slice().reverse().forEach((wish, index) => {
            const wishItem = document.createElement('div');
            wishItem.className = 'wish-item';
            wishItem.innerHTML = `
                <p><strong>${new Date(wish.date).toLocaleDateString()}</strong>: ${wish.text}</p>
            `;
            wishesList.appendChild(wishItem);
        });
    }

    function showSubmitConfirmation() {
        const confirmation = document.createElement('div');
        confirmation.textContent = 'Wish sent! 💫';
        confirmation.style.position = 'fixed';
        confirmation.style.bottom = '20px';
        confirmation.style.left = '50%';
        confirmation.style.transform = 'translateX(-50%)';
        confirmation.style.background = 'rgba(40,167,69,0.9)';
        confirmation.style.color = 'white';
        confirmation.style.padding = '8px 16px';
        confirmation.style.borderRadius = '20px';
        confirmation.style.fontSize = '0.9rem';
        confirmation.style.zIndex = '1000';
        confirmation.style.animation = 'slideUp 0.3s ease-out, fadeOut 0.3s ease-in 2s forwards';
        document.body.appendChild(confirmation);
        setTimeout(() => confirmation.remove(), 2500);
    }
}

// Time-Based Surprise
function initTimeSurprise() {
    const now = new Date();
    const hour = now.getHours();
    const minute = now.getMinutes();

    // Special time: 12:00-12:05
    if (hour === 12 && minute >= 0 && minute <= 5) {
        setTimeout(() => {
            createConfetti(200);
            createBalloonBurst(5);
            showTimeMessage();
        }, 1000);
    }
}

function showTimeMessage() {
    const message = document.createElement('div');
    message.textContent = "It's 12:00! Special birthday time! 🎉";
    message.style.position = 'fixed';
    message.style.top = '20px';
    message.style.left = '50%';
    message.style.transform = 'translateX(-50%)';
    message.style.background = 'linear-gradient(135deg, #ff9a9e, #fad0c4)';
    message.style.color = 'white';
    message.style.padding = '16px 32px';
    message.style.borderRadius = '16px';
    message.style.fontSize = '1.3rem';
    message.style.fontWeight = 'bold';
    message.style.boxShadow = '0 10px 25px rgba(0,0,0,0.3)';
    message.style.zIndex = '1002';
    message.style.animation = 'bounceIn 0.5s ease-out, fadeOut 0.5s ease-in 4s forwards';
    document.body.appendChild(message);
    setTimeout(() => message.remove(), 5000);
}

// Theme Toggle (Dark/Light Mode)
function initThemeToggle() {
    // Check for saved theme preference or use system preference
    const savedTheme = localStorage.getItem('theme');
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;

    if (savedTheme === 'dark' || (!savedTheme && prefersDark)) {
        document.documentElement.setAttribute('data-theme', 'dark');
    }

    // Add theme toggle to header (we'll add it via JS)
    const header = document.querySelector('header');
    const themeToggle = document.createElement('button');
    themeToggle.innerHTML = '🌓';
    themeToggle.setAttribute('aria-label', 'Toggle dark/light mode');
    themeToggle.title = 'Toggle dark/light mode';
    themeToggle.style.position = 'absolute';
    themeToggle.style.top = 'var(--space-4)';
    themeToggle.style.left = 'var(--space-4)';
    themeToggle.style.background = 'rgba(255,255,255,0.2)';
    themeToggle.style.border = 'none';
    themeToggle.style.borderRadius = '50%';
    themeToggle.style.width = '48px';
    themeToggle.style.height = '48px';
    themeToggle.style.fontSize = '1.5rem';
    themeToggle.style.cursor = 'pointer';
    themeToggle.style.display = 'flex';
    themeToggle.style.alignItems = 'center';
    themeToggle.style.justifyContent = 'center';
    themeToggle.style.backdropFilter = 'blur(8px)';
    themeToggle.style.transition = 'all 0.3s ease';
    themeToggle.style.boxShadow = 'var(--shadow-md)';
    header.appendChild(themeToggle);

    themeToggle.addEventListener('click', () => {
        const currentTheme = document.documentElement.getAttribute('data-theme');
        const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
        document.documentElement.setAttribute('data-theme', newTheme);
        localStorage.setItem('theme', newTheme);
        themeToggle.innerHTML = newTheme === 'dark' ? '🌙' : '☀️';
        playBeep(600, 100);
    });
}

// Easter Eggs
function initEasterEggs() {
    let konamiCode = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'b', 'a'];
    let konamiIndex = 0;

    document.addEventListener('keydown', function(e) {
        if (e.key === konamiCode[konamiIndex]) {
            konamiIndex++;
            if (konamiIndex === konamiCode.length) {
                activateKonamiEasterEgg();
                konamiIndex = 0;
            }
        } else {
            konamiIndex = 0;
        }
    });

    // Press 'O' for Oddy's special message
    document.addEventListener('keydown', function(e) {
        if (e.key.toLowerCase() === 'o') {
            showOddyMessage();
        }
    });

    // Press 'C' for confetti
    document.addEventListener('keydown', function(e) {
        if (e.key.toLowerCase() === 'c') {
            createConfetti();
        }
    });

    // Press 'B' for balloons (existing)
    document.addEventListener('keydown', function(e) {
        if (e.key.toLowerCase() === 'b') {
            createBalloonBurst();
        }
    });
}

function activateKonamiEasterEgg() {
    // Play special animation
    createConfetti(300); // More confetti
    createBalloonBurst(10); // More balloons
    triggerBalloonPopGame(); // Launch the mini-game

    // Special message
    const message = document.createElement('div');
    message.textContent = "YOU FOUND THE SECRET! 🎈";
    message.style.position = 'fixed';
    message.style.top = '50%';
    message.style.left = '50%';
    message.style.transform = 'translate(-50%, -50%)';
    message.style.background = 'linear-gradient(135deg, #ff9a9e, #fad0c4)';
    message.style.color = 'white';
    message.style.padding = '20px 40px';
    message.style.borderRadius = '16px';
    message.style.fontSize = '2rem';
    message.style.fontWeight = 'bold';
    message.style.textAlign = 'center';
    message.style.boxShadow = '0 15px 35px rgba(0,0,0,0.3)';
    message.style.zIndex = '1002';
    message.style.animation = 'bounceIn 0.6s ease-out';
    message.style.pointerEvents = 'none';

    document.body.appendChild(message);

    setTimeout(() => {
        message.style.animation = 'fadeOut 0.8s ease-in forwards';
        setTimeout(() => {
            message.remove();
        }, 800);
    }, 3000);

    playBeep(1000, 150);
    setTimeout(() => playBeep(1200, 150), 200);
    setTimeout(() => playBeep(1500, 200), 400);
}

function showOddyMessage() {
    const messages = [
        "Oddy is amazing! 🌟",
        "Happy Birthday to my favorite person! 🎂",
        "You make every day special! 💖",
        "So grateful for you, Oddy! 🙏",
        "Today is all about you! 🎉"
    ];

    const message = document.createElement('div');
    message.textContent = messages[Math.floor(Math.random() * messages.length)];
    message.style.position = 'fixed';
    message.style.top = '20px';
    message.style.right = '20px';
    message.style.background = 'rgba(255,255,255,0.9)';
    message.style.color = '#d6336c';
    message.style.padding = '12px 20px';
    message.style.borderRadius = '20px';
    message.style.fontSize = '1.1rem';
    message.style.fontWeight = '600';
    message.style.boxShadow = '0 4px 12px rgba(0,0,0,0.15)';
    message.style.zIndex = '1000';
    message.style.animation = 'slideInRight 0.4s ease-out, fadeOut 0.4s ease-in 2.5s forwards';

    document.body.appendChild(message);

    setTimeout(() => {
        message.remove();
    }, 3000);

    playBeep(600, 100);
}

// Confetti System
function createConfetti(count = 100) {
    const confettiContainer = document.createElement('div');
    confettiContainer.style.position = 'fixed';
    confettiContainer.style.top = '0';
    confettiContainer.style.left = '0';
    confettiContainer.style.width = '100%';
    confettiContainer.style.height = '100%';
    confettiContainer.style.pointerEvents = 'none';
    confettiContainer.style.zIndex = '1000';
    document.body.appendChild(confettiContainer);

    const colors = ['#ff9a9e', '#fad0c4', '#fbc2eb', '#ffdde1', '#e2f0cb', '#ffffff'];

    for (let i = 0; i < count; i++) {
        const confetti = document.createElement('div');
        confetti.style.position = 'absolute';
        confetti.style.width = `${Math.random() * 8 + 4}px`;
        confetti.style.height = `${Math.random() * 8 + 4}px`;
        confetti.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
        confetti.style.opacity = '0.8';
        confetti.style.borderRadius = '2px';

        // Random starting position
        confetti.style.left = `${Math.random() * 100}vw`;
        confetti.style.top = `-10%`;

        // Random rotation and size
        confetti.style.transform = `rotate(${Math.random() * 360}deg)`;

        // Animation
        confetti.style.animation = `confettiFall ${Math.random() * 4 + 4}s linear forwards`;
        confetti.style.animationDelay = `${Math.random() * 2}s`;

        confettiContainer.appendChild(confetti);
    }

    // Add keyframes if not already present
    if (!document.getElementById('confetti-keyframes')) {
        const style = document.createElement('style');
        style.id = 'confetti-keyframes';
        style.textContent = `
            @keyframes confettiFall {
                0% {
                    transform: translateY(-10vh) rotate(0deg);
                    opacity: 0;
                }
                10% {
                    opacity: 1;
                }
                90% {
                    opacity: 1;
                }
                100% {
                    transform: translateY(110vh) rotate(360deg);
                    opacity: 0;
                }
            }
        `;
        document.head.appendChild(style);
    }

    // Clean up after animation
    setTimeout(() => {
        confettiContainer.remove();
    }, 5000);
}

// Balloon System (for celebrations)
function createBalloonBurst(count = 1) {
    for (let i = 0; i < count; i++) {
        setTimeout(() => {
            createSingleBalloon();
        }, i * 300);
    }
}

function createSingleBalloon() {
    const balloon = document.createElement('div');
    balloon.style.position = 'fixed';
    balloon.style.bottom = '-40px';
    balloon.style.left = `${Math.random() * 80 + 10}vw`;
    balloon.style.width = '30px';
    balloon.style.height = '40px';
    balloon.style.background = ['#ff9a9e', '#fad0c4', '#fbc2eb', '#ffeaa7', '#dda0dd'][Math.floor(Math.random() * 5)];
    balloon.style.borderRadius = '50%';
    balloon.style.boxShadow = '0 4px 8px rgba(0,0,0,0.2)';
    balloon.style.zIndex = '999';
    balloon.style.transform = 'scale(0)';
    balloon.style.transition = 'transform 0.3s ease-out';

    // Balloon knot
    const knot = document.createElement('div');
    knot.style.position = 'absolute';
    knot.style.bottom = '-8px';
    knot.style.left = '50%';
    knot.style.transform = 'translateX(-50%)';
    knot.style.width = '4px';
    knot.style.height = '8px';
    knot.style.background = balloon.style.backgroundColor;
    balloon.appendChild(knot);

    document.body.appendChild(balloon);

    // Animate in
    requestAnimationFrame(() => {
        balloon.style.transform = 'scale(1)';
    });

    // Float up
    let position = -40;
    const floatInterval = setInterval(() => {
        position += 1.5 + Math.random() * 2; // Variable speed
        balloon.style.bottom = `${position}px`;

        // Gentle drift
        balloon.style.left = `${parseFloat(balloon.style.left) + (Math.random() - 0.5) * 0.5}vw`;

        // Gentle wobble
        balloon.style.transform = `scale(1) rotate(${Math.sin(position * 0.05) * 5}deg)`;

        // Remove when off screen
        if (position > window.innerHeight + 50) {
            clearInterval(floatInterval);
            balloon.remove();
        }
    }, 50);

    // Remove after 10 seconds anyway
    setTimeout(() => {
        if (balloon.parentNode) {
            balloon.remove();
        }
    }, 10000);
}

// Balloon Pop Mini-Game
let gameActive = false;
let gameScore = 0;
let gameTime = 30;
let gameTimer = null;
let balloons = [];

function triggerBalloonPopGame() {
    if (gameActive) return;

    gameActive = true;
    gameScore = 0;
    gameTime = 30;

    const gameContainer = document.getElementById('mini-game-container');
    gameContainer.setAttribute('aria-hidden', 'false');

    document.getElementById('game-score').textContent = gameScore;
    document.getElementById('game-time').textContent = gameTime;

    startGameTimer();
    spawnBalloons();

    // Close button
    document.getElementById('close-game').addEventListener('click', endGame);
}

function startGameTimer() {
    gameTimer = setInterval(() => {
        gameTime--;
        document.getElementById('game-time').textContent = gameTime;

        if (gameTime <= 0) {
            endGame();
        }
    }, 1000);
}

function spawnBalloons() {
    if (!gameActive) return;

    // Create a balloon
    const balloon = document.createElement('div');
    balloon.className = 'balloon';

    // Random position
    const left = Math.random() * 80 + 10; // 10-90vw
    balloon.style.left = `${left}vw`;

    // Random color
    balloon.style.background = ['#ff9a9e', '#fad0c4', '#fbc2eb', '#ffeaa7', '#dda0dd'][Math.floor(Math.random() * 5)];

    // Random color
    balloon.style.background = ['#ff9a9e', '#fad0c4', '#fbc2eb', '#ffeaa7', '#dda0dd'][Math.floor(Math.random() * 5)];

    // Add knot
    const knot = document.createElement('div');
    knot.className = 'knot';
    knot.style.background = balloon.style.backgroundColor;
    balloon.appendChild(knot);

    // Add to game area
    const gameArea = document.getElementById('game-area');
    gameArea.appendChild(balloon);
    balloons.push(balloon);

    // Animate balloon
    requestAnimationFrame(() => {
        balloon.style.transform = 'scale(1)';
    });

    // Float up
    let position = -40;
    const floatSpeed = 0.5 + Math.random() * 1; // 0.5-1.5 px per frame
    const floatInterval = setInterval(() => {
        if (!gameActive) {
            clearInterval(floatInterval);
            return;
        }

        position += floatSpeed;
        balloon.style.bottom = `${position}px`;

        // Gentle drift
        balloon.style.left = `${parseFloat(balloon.style.left) + (Math.random() - 0.5) * 0.3}vw`;

        // Gentle wobble
        balloon.style.transform = `scale(1) rotate(${Math.sin(position * 0.05) * 3}deg)`;

        // Remove when off screen
        if (position > window.innerHeight + 50) {
            clearInterval(floatInterval);
            balloon.remove();
            balloons = balloons.filter(b => b !== balloon);
        }

        // Check if popped
        if (balloon.classList.contains('popping')) {
            clearInterval(floatInterval);
        }
    }, 50);

    // Click to pop
    balloon.addEventListener('click', () => {
        if (!gameActive || balloon.classList.contains('popping')) return;

        balloon.classList.add('popping');
        gameScore += 10;
        document.getElementById('game-score').textContent = gameScore;
        playBeep(1000, 100);

        // Create pop effect
        setTimeout(() => {
            balloon.remove();
            balloons = balloons.filter(b => b !== balloon);
        }, 300);
    });

    // Spawn next balloon
    setTimeout(spawnBalloons, 800 + Math.random() * 1200); // 0.8-2s between spawns
}

function endGame() {
    gameActive = false;
    clearInterval(gameTimer);

    // Remove remaining balloons
    balloons.forEach(balloon => {
        balloon.remove();
    });
    balloons = [];

    // Show final score
    const gameContainer = document.getElementById('mini-game-container');
    gameContainer.setAttribute('aria-hidden', 'true');

    // Celebrate based on score
    if (gameScore >= 200) {
        createConfetti(500);
        createBalloonBurst(20);
        showGameMessage('Amazing! You\'re a balloon popping master! 🏆');
    } else if (gameScore >= 100) {
        createConfetti(300);
        createBalloonBurst(10);
        showGameMessage('Great job! You popped lots of balloons! 🎈');
    } else {
        createConfetti(100);
        createBalloonBurst(5);
        showGameMessage('Nice try! Better luck next time! 😊');
    }
}

function showGameMessage(messageText) {
    const message = document.createElement('div');
    message.textContent = messageText;
    message.style.position = 'fixed';
    message.style.top = '50%';
    message.style.left = '50%';
    message.style.transform = 'translate(-50%, -50%)';
    message.style.background = 'rgba(0,0,0,0.8)';
    message.style.color = 'white';
    message.style.padding = '20px 40px';
    message.style.borderRadius = '20px';
    message.style.fontSize = '1.5rem';
    message.style.fontWeight = 'bold';
    message.style.textAlign = 'center';
    message.style.boxShadow = '0 10px 30px rgba(0,0,0,0.5)';
    message.style.zIndex = '1003';
    message.style.animation = 'zoomIn 0.4s ease-out, fadeOut 0.5s ease-in 3s forwards';
    document.body.appendChild(message);
    setTimeout(() => message.remove(), 4000);
}