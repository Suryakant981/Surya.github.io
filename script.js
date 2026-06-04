// === 1. DARK/LIGHT MODE ===
const btn = document.getElementById('mode-toggle');
const icon = btn ? btn.querySelector('i') : null;

if (localStorage.getItem('theme') === 'dark') {
    document.body.classList.add('dark-mode');
    if (icon) { icon.classList.replace('fa-moon', 'fa-sun'); }
}

if (btn) {
    btn.addEventListener('click', () => {
        document.body.classList.toggle('dark-mode');
        const isDark = document.body.classList.contains('dark-mode');
        localStorage.setItem('theme', isDark ? 'dark' : 'light');
        if (icon) {
            icon.classList.replace(isDark ? 'fa-moon' : 'fa-sun', isDark ? 'fa-sun' : 'fa-moon');
        }
    });
}

// === 2. HAMBURGER MENU ===
const hamburger = document.querySelector('.hamburger');
const navLinks = document.querySelector('.nav-links');

if (hamburger) {
    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('active');
        navLinks.classList.toggle('open');
    });

    // Close menu on link click
    document.querySelectorAll('.nav-links a').forEach(link => {
        link.addEventListener('click', () => {
            hamburger.classList.remove('active');
            navLinks.classList.remove('open');
        });
    });
}

// === 3. SCROLL PROGRESS BAR ===
const dynamicStyles = document.createElement('style');
dynamicStyles.innerHTML = `
    #scroll-progress {
        position: fixed; top: 0; left: 0; width: 0%; height: 4px;
        background: linear-gradient(to right, #ff6b81, #e94560);
        z-index: 10001; box-shadow: 0 0 10px #e94560;
        transition: width 0.1s;
    }
    @media (min-width: 768px) {
        body { cursor: none; }
        a, button { cursor: none !important; }
        .cursor-dot {
            width: 8px; height: 8px;
            background: var(--accent-color, #e94560);
            position: fixed; border-radius: 50%;
            z-index: 10000; pointer-events: none;
            transform: translate(-50%, -50%);
            box-shadow: 0 0 10px #e94560;
            transition: transform 0.1s;
        }
        .cursor-outline {
            width: 30px; height: 30px;
            border: 2px solid #e94560;
            position: fixed; border-radius: 50%;
            z-index: 9999; pointer-events: none;
            transform: translate(-50%, -50%);
            transition: width 0.3s, height 0.3s, background 0.3s;
        }
        .cursor-hover { width: 50px; height: 50px; background: rgba(233,69,96,0.1); }
    }
`;
document.head.appendChild(dynamicStyles);

const scrollBar = document.createElement('div');
scrollBar.id = 'scroll-progress';
document.body.appendChild(scrollBar);

window.addEventListener('scroll', () => {
    const progress = (window.scrollY / (document.body.scrollHeight - window.innerHeight)) * 100;
    scrollBar.style.width = Math.min(Math.max(progress, 0), 100) + "%";

    // Navbar shadow on scroll
    const nav = document.querySelector('nav');
    if (nav) {
        nav.style.boxShadow = window.scrollY > 50
            ? '0 5px 30px rgba(0,0,0,0.5)'
            : '0 2px 20px rgba(0,0,0,0.3)';
    }
});

// === 4. CUSTOM CURSOR ===
if (window.innerWidth >= 768) {
    const cursorDot = document.createElement('div');
    const cursorOutline = document.createElement('div');
    cursorDot.className = 'cursor-dot';
    cursorOutline.className = 'cursor-outline';
    document.body.appendChild(cursorDot);
    document.body.appendChild(cursorOutline);

    window.addEventListener('mousemove', (e) => {
        cursorDot.style.left = e.clientX + 'px';
        cursorDot.style.top = e.clientY + 'px';
        cursorOutline.animate(
            { left: e.clientX + 'px', top: e.clientY + 'px' },
            { duration: 400, fill: 'forwards' }
        );
    });

    document.querySelectorAll('a, button, .flashcard-container, .profile-pic-wrapper, .project-card').forEach(el => {
        el.addEventListener('mouseenter', () => cursorOutline.classList.add('cursor-hover'));
        el.addEventListener('mouseleave', () => cursorOutline.classList.remove('cursor-hover'));
    });
}

// === 5. ACTIVE NAV LINK ===
const currentPage = window.location.pathname.split('/').pop() || 'index.html';
document.querySelectorAll('.nav-links a').forEach(link => {
    if (link.getAttribute('href') === currentPage) {
        link.classList.add('active');
    }
});
