// ========== Matrix Rain Effect ==========
const canvas = document.getElementById('matrixCanvas');
const ctx = canvas.getContext('2d');

function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}
resizeCanvas();
window.addEventListener('resize', resizeCanvas);

const matrixChars = '01アイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホマミムメモヤユヨラリルレロワヲン';
const fontSize = 14;
let columns = Math.floor(canvas.width / fontSize);
let drops = Array(columns).fill(1);

function drawMatrix() {
    ctx.fillStyle = 'rgba(10, 10, 15, 0.05)';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = '#00ff88';
    ctx.font = fontSize + 'px monospace';

    for (let i = 0; i < drops.length; i++) {
        const char = matrixChars[Math.floor(Math.random() * matrixChars.length)];
        ctx.fillText(char, i * fontSize, drops[i] * fontSize);

        if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) {
            drops[i] = 0;
        }
        drops[i]++;
    }
}

setInterval(drawMatrix, 50);

window.addEventListener('resize', () => {
    columns = Math.floor(canvas.width / fontSize);
    drops = Array(columns).fill(1);
});

// ========== Cursor Glow ==========
const cursorGlow = document.getElementById('cursorGlow');
let mouseX = 0, mouseY = 0;
let glowX = 0, glowY = 0;

document.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
});

function animateCursorGlow() {
    glowX += (mouseX - glowX) * 0.08;
    glowY += (mouseY - glowY) * 0.08;
    cursorGlow.style.left = glowX + 'px';
    cursorGlow.style.top = glowY + 'px';
    requestAnimationFrame(animateCursorGlow);
}
animateCursorGlow();

// ========== Navbar Scroll ==========
const navbar = document.getElementById('navbar');
let lastScroll = 0;

window.addEventListener('scroll', () => {
    const currentScroll = window.scrollY;
    if (currentScroll > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
    lastScroll = currentScroll;
});

// ========== Mobile Menu ==========
const navToggle = document.getElementById('navToggle');
const mobileMenu = document.getElementById('mobileMenu');

navToggle.addEventListener('click', () => {
    navToggle.classList.toggle('active');
    mobileMenu.classList.toggle('active');
    document.body.style.overflow = mobileMenu.classList.contains('active') ? 'hidden' : '';
});

document.querySelectorAll('.mobile-link').forEach(link => {
    link.addEventListener('click', () => {
        navToggle.classList.remove('active');
        mobileMenu.classList.remove('active');
        document.body.style.overflow = '';
    });
});

// ========== Smooth Scroll for nav links ==========
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    });
});

// ========== Typing Effect ==========
const typingPhrases = [
    'securing networks...',
    'scanning vulnerabilities...',
    'hardening endpoints...',
    'configuring firewalls...',
    'analyzing traffic...',
    'building secure systems...',
    'automating with Python...',
    'deploying SIEM solutions...'
];

const typingElement = document.getElementById('typingText');
let phraseIndex = 0;
let charIndex = 0;
let isDeleting = false;
let typingSpeed = 80;

function typeEffect() {
    const currentPhrase = typingPhrases[phraseIndex];

    if (isDeleting) {
        typingElement.textContent = currentPhrase.substring(0, charIndex - 1);
        charIndex--;
        typingSpeed = 40;
    } else {
        typingElement.textContent = currentPhrase.substring(0, charIndex + 1);
        charIndex++;
        typingSpeed = 80;
    }

    if (!isDeleting && charIndex === currentPhrase.length) {
        isDeleting = true;
        typingSpeed = 2000; // Pause at end
    } else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        phraseIndex = (phraseIndex + 1) % typingPhrases.length;
        typingSpeed = 500; // Pause before next
    }

    setTimeout(typeEffect, typingSpeed);
}

typeEffect();

// ========== Terminal Animation ==========
const terminalBody = document.getElementById('terminalBody');
const terminalLines = [
    { type: 'output', text: 'Starting Nmap scan...', delay: 800 },
    { type: 'output', text: 'Scanning portfolio.dev [1000 ports]', delay: 600 },
    { type: 'output', text: '', delay: 300 },
    { type: 'success', text: 'PORT     STATE  SERVICE       VERSION', delay: 400 },
    { type: 'info', text: '22/tcp   open   ssh           OpenSSH 8.9', delay: 300 },
    { type: 'info', text: '80/tcp   open   http          nginx 1.24', delay: 300 },
    { type: 'info', text: '443/tcp  open   https         TLS 1.3', delay: 300 },
    { type: 'info', text: '3389/tcp closed ms-wbt-server', delay: 300 },
    { type: 'output', text: '', delay: 200 },
    { type: 'success', text: 'Nmap done: 1 IP address (1 host up)', delay: 400 },
    { type: 'output', text: '', delay: 300 },
    { type: 'prompt', text: '$ whoami', delay: 500 },
    { type: 'success', text: 'danylo_vilkhovyi // cybersecurity_student', delay: 400 },
    { type: 'output', text: '', delay: 200 },
    { type: 'prompt', text: '$ cat skills.txt', delay: 500 },
    { type: 'warning', text: '[CCNA] [Python] [Kali] [Wireshark] [Nmap]', delay: 300 },
    { type: 'output', text: '', delay: 200 },
    { type: 'prompt', text: '$ echo "Status: Ready for new challenges"', delay: 500 },
    { type: 'success', text: 'Status: Ready for new challenges', delay: 400 },
];

let lineIndex = 0;

function addTerminalLine() {
    if (lineIndex >= terminalLines.length) {
        // Reset after a pause
        setTimeout(() => {
            // Keep the first line (the nmap command)
            const firstLine = terminalBody.querySelector('.terminal-line');
            terminalBody.innerHTML = '';
            terminalBody.appendChild(firstLine);
            lineIndex = 0;
            setTimeout(addTerminalLine, 1000);
        }, 4000);
        return;
    }

    const line = terminalLines[lineIndex];
    const div = document.createElement('div');
    div.className = 'terminal-line';
    div.style.animationDelay = '0s';

    if (line.type === 'prompt') {
        div.innerHTML = `<span class="prompt">$</span> <span class="cmd">${line.text.substring(2)}</span>`;
    } else if (line.text === '') {
        div.innerHTML = '&nbsp;';
    } else {
        div.innerHTML = `<span class="${line.type}">${line.text}</span>`;
    }

    terminalBody.appendChild(div);
    terminalBody.scrollTop = terminalBody.scrollHeight;

    lineIndex++;
    setTimeout(addTerminalLine, line.delay);
}

// Start terminal animation after a delay
setTimeout(addTerminalLine, 1500);

// ========== Scroll Reveal Animation ==========
const observerOptions = {
    root: null,
    rootMargin: '0px 0px -80px 0px',
    threshold: 0.1
};

const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
}, observerOptions);

document.querySelectorAll('.reveal-up, .reveal-left, .reveal-scale, .reveal-width').forEach(el => {
    revealObserver.observe(el);
});

// ========== Counter Animation ==========
function animateCounter(element, target) {
    let current = 0;
    const increment = target / 60;
    const duration = 1500;
    const step = duration / 60;

    function update() {
        current += increment;
        if (current >= target) {
            element.textContent = target;
            return;
        }
        element.textContent = Math.floor(current);
        setTimeout(update, step);
    }

    update();
}

const counterObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const counters = entry.target.querySelectorAll('.stat-number');
            counters.forEach(counter => {
                const target = parseInt(counter.dataset.target);
                animateCounter(counter, target);
            });
            counterObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.5 });

const statsContainer = document.querySelector('.hero-stats');
if (statsContainer) {
    counterObserver.observe(statsContainer);
}

// ========== Tilt Effect on Cards ==========
document.querySelectorAll('[data-tilt]').forEach(card => {
    card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        const rotateX = (y - centerY) / centerY * -5;
        const rotateY = (x - centerX) / centerX * 5;

        card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-8px)`;
    });

    card.addEventListener('mouseleave', () => {
        card.style.transform = '';
    });
});

// ========== Active Nav Link Highlight ==========
const sections = document.querySelectorAll('.section');
const navLinks = document.querySelectorAll('.nav-link');

window.addEventListener('scroll', () => {
    let current = '';
    sections.forEach(section => {
        const sectionTop = section.offsetTop - 150;
        if (window.scrollY >= sectionTop) {
            current = section.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${current}`) {
            link.classList.add('active');
        }
    });
});

// Add active nav link style
const style = document.createElement('style');
style.textContent = `.nav-link.active { color: var(--accent); background: var(--accent-glow); }`;
document.head.appendChild(style);

// ========== Parallax on Hero ==========
window.addEventListener('scroll', () => {
    const scrolled = window.scrollY;
    const hero = document.querySelector('.hero-content');
    if (hero && scrolled < window.innerHeight) {
        hero.style.transform = `translateY(${scrolled * 0.15}px)`;
        hero.style.opacity = 1 - scrolled / (window.innerHeight * 0.8);
    }
});

// ========== Page Load Animation ==========
window.addEventListener('load', () => {
    document.body.style.opacity = '0';
    document.body.style.transition = 'opacity 0.5s ease';
    requestAnimationFrame(() => {
        document.body.style.opacity = '1';
    });

    // Trigger hero animations
    setTimeout(() => {
        document.querySelectorAll('.hero .reveal-up, .hero .reveal-scale').forEach(el => {
            el.classList.add('visible');
        });
    }, 200);
});
