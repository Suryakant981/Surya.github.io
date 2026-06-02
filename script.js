document.addEventListener('DOMContentLoaded', () => {
    const btn = document.getElementById('mode-toggle');

    if (btn) {
        btn.addEventListener('click', () => {
            document.body.classList.toggle('dark-mode');
            btn.innerHTML = document.body.classList.contains('dark-mode')
                ? '<i class="fas fa-sun"></i>'
                : '<i class="fas fa-moon"></i>';
        });
    }

    if (window.gsap) {
        gsap.from('nav', { y: -80, opacity: 0, duration: 1, ease: 'power3.out' });
        gsap.from('.hero-content > *', {
            y: 30,
            opacity: 0,
            duration: 0.8,
            stagger: 0.12,
            delay: 0.2
        });
        gsap.from('.profile-pic-wrapper', {
            scale: 0.8,
            opacity: 0,
            duration: 1,
            delay: 0.4,
            ease: 'back.out(1.7)'
        });
    }

    if (window.tsParticles) {
        tsParticles.load('particles-js', {
            fullScreen: { enable: false },
            background: { color: { value: 'transparent' } },
            particles: {
                number: { value: 35, density: { enable: true, area: 900 } },
                color: { value: ['#e94560', '#00c6ff', '#ffffff'] },
                links: { enable: true, color: '#ffffff', opacity: 0.12, distance: 140 },
                move: { enable: true, speed: 1.2, direction: 'none', outModes: 'bounce' },
                opacity: { value: 0.35 },
                size: { value: { min: 1, max: 3 } }
            },
            detectRetina: true
        });
    }

    if (window.THREE) {
        const canvas = document.getElementById('hero-canvas');
        if (canvas) {
            const scene = new THREE.Scene();
            const camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 0.1, 1000);
            const renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: true });

            renderer.setSize(window.innerWidth, window.innerHeight);
            renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

            const geometry = new THREE.TorusKnotGeometry(1.6, 0.45, 180, 24);
            const material = new THREE.MeshStandardMaterial({
                color: 0xe94560,
                metalness: 0.7,
                roughness: 0.25
            });

            const mesh = new THREE.Mesh(geometry, material);
            scene.add(mesh);

            const light1 = new THREE.PointLight(0xffffff, 2);
            light1.position.set(5, 5, 5);
            scene.add(light1);

            const light2 = new THREE.PointLight(0x00c6ff, 2);
            light2.position.set(-5, -3, 3);
            scene.add(light2);

            camera.position.z = 5;

            const animate = () => {
                mesh.rotation.x += 0.003;
                mesh.rotation.y += 0.005;
                renderer.render(scene, camera);
                requestAnimationFrame(animate);
            };

            animate();

            window.addEventListener('resize', () => {
                camera.aspect = window.innerWidth / window.innerHeight;
                camera.updateProjectionMatrix();
                renderer.setSize(window.innerWidth, window.innerHeight);
            });
        }
    }
});
