// --- 1. DARK/LIGHT MODE WITH MEMORY ---
const btn = document.getElementById('mode-toggle');
const icon = btn ? btn.querySelector('i') : null;

// Page load hone par check karo ki user ne pehle kaunsa theme chuna tha
if (localStorage.getItem('theme') === 'dark') {
    document.body.classList.add('dark-mode');
    if (icon) {
        icon.classList.remove('fa-moon');
        icon.classList.add('fa-sun');
    }
}

// Toggle Button Click Event
if (btn) {
    btn.addEventListener('click', () => {
        document.body.classList.toggle('dark-mode');
        
        // Icon change aur memory save
        if (document.body.classList.contains('dark-mode')) {
            localStorage.setItem('theme', 'dark');
            if (icon) {
                icon.classList.remove('fa-moon');
                icon.classList.add('fa-sun');
            }
        } else {
            localStorage.setItem('theme', 'light');
            if (icon) {
                icon.classList.remove('fa-sun');
                icon.classList.add('fa-moon');
            }
        }
    });
}

// --- 2. DYNAMIC CSS FOR CURSOR & SCROLL BAR ---
// HTML/CSS edit karne ki zaroorat nahi, JS khud styles inject karega
const dynamicStyles = document.createElement('style');
dynamicStyles.innerHTML = `
    /* Scroll Progress Bar */
    #scroll-progress {
        position: fixed; top: 0; left: 0; width: 0%; height: 4px;
        background: linear-gradient(to right, #ff6b81, #e94560);
        z-index: 10001; box-shadow: 0 0 10px #e94560;
    }

    /* Custom Cursor Styles (Hide default cursor on desktop) */
    @media (min-width: 768px) {
        body { cursor: none; }
        a, button, input, textarea { cursor: none !important; }
        
        .cursor-dot {
            width: 8px; height: 8px; background-color: var(--accent-color);
            position: fixed; top: 0; left: 0; transform: translate(-50%, -50%);
            border-radius: 50%; z-index: 10000; pointer-events: none;
            box-shadow: 0 0 10px var(--accent-color);
        }
        
        .cursor-outline {
            width: 30px; height: 30px; border: 2px solid var(--accent-color);
            position: fixed; top: 0; left: 0; transform: translate(-50%, -50%);
            border-radius: 50%; z-index: 9999; pointer-events: none;
            transition: width 0.2s, height 0.2s, background-color 0.2s;
        }
        
        /* Cursor Hover Effect */
        .cursor-hover {
            width: 50px; height: 50px; background-color: rgba(233, 69, 96, 0.1);
        }
    }
`;
document.head.appendChild(dynamicStyles);

// --- 3. SCROLL PROGRESS BAR LOGIC ---
const scrollBar = document.createElement('div');
scrollBar.id = 'scroll-progress';
document.body.appendChild(scrollBar);

window.addEventListener('scroll', () => {
    let scrollDistance = window.scrollY;
    let totalHeight = document.body.scrollHeight - window.innerHeight;
    let progress = (scrollDistance / totalHeight) * 100;
    scrollBar.style.width = Math.min(Math.max(progress, 0), 100) + "%";
});

// --- 4. CUSTOM NEON CURSOR LOGIC (For Desktop Only) ---
if (window.innerWidth >= 768) {
    const cursorDot = document.createElement('div');
    const cursorOutline = document.createElement('div');

    cursorDot.classList.add('cursor-dot');
    cursorOutline.classList.add('cursor-outline');

    document.body.appendChild(cursorDot);
    document.body.appendChild(cursorOutline);

    window.addEventListener('mousemove', function (e) {
        const posX = e.clientX;
        const posY = e.clientY;

        // Dot follows instantly
        cursorDot.style.left = `${posX}px`;
        cursorDot.style.top = `${posY}px`;

        // Outline follows with a slight delay for smooth effect
        cursorOutline.animate({
            left: `${posX}px`,
            top: `${posY}px`
        }, { duration: 400, fill: "forwards" });
    });

    // Add Hover Effect to all Links and Buttons
    const interactiveElements = document.querySelectorAll('a, button, .flashcard-container, .profile-pic-wrapper');
    
    interactiveElements.forEach(el => {
        el.addEventListener('mouseenter', () => {
            cursorOutline.classList.add('cursor-hover');
        });
        el.addEventListener('mouseleave', () => {
            cursorOutline.classList.remove('cursor-hover');
        });
    });
}
