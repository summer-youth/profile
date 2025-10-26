// Three.js 3D Scene
export let scene, camera, renderer, particles, particleSystem;
let mouseX = 0, mouseY = 0;
let windowHalfX = window.innerWidth / 2;
let windowHalfY = window.innerHeight / 2;

// Three.js 초기화
export function initThreeJS() {
    const canvas = document.getElementById('three-canvas');
    
    // Scene 생성
    scene = new THREE.Scene();
    
    // Camera 생성
    camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 1, 1000);
    camera.position.z = 300;
    
    // Renderer 생성
    renderer = new THREE.WebGLRenderer({ canvas: canvas, alpha: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setClearColor(0x000000, 0);
    
    // 파티클 생성
    createParticles();
    
    // 이벤트 리스너 추가
    window.addEventListener('resize', onWindowResize);
    document.addEventListener('mousemove', onMouseMove);
    
    // 애니메이션 시작
    animate();
}

// 파티클 생성
function createParticles() {
    const particleCount = 150;
    const geometry = new THREE.BufferGeometry();
    const positions = new Float32Array(particleCount * 3);
    const colors = new Float32Array(particleCount * 3);
    
    for (let i = 0; i < particleCount * 3; i += 3) {
        positions[i] = (Math.random() - 0.5) * 800;
        positions[i + 1] = (Math.random() - 0.5) * 800;
        positions[i + 2] = (Math.random() - 0.5) * 800;
        
        // 그라데이션 색상
        const color = new THREE.Color();
        color.setHSL(0.6 + Math.random() * 0.2, 0.8, 0.6 + Math.random() * 0.4);
        colors[i] = color.r;
        colors[i + 1] = color.g;
        colors[i + 2] = color.b;
    }
    
    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));
    
    const material = new THREE.PointsMaterial({
        size: 3,
        vertexColors: true,
        transparent: true,
        opacity: 0.8,
        blending: THREE.AdditiveBlending
    });
    
    particleSystem = new THREE.Points(geometry, material);
    scene.add(particleSystem);
}

// 마우스 이동 이벤트
function onMouseMove(event) {
    mouseX = (event.clientX - windowHalfX) * 0.5;
    mouseY = (event.clientY - windowHalfY) * 0.5;
}

// 윈도우 리사이즈 이벤트
function onWindowResize() {
    windowHalfX = window.innerWidth / 2;
    windowHalfY = window.innerHeight / 2;
    
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    
    renderer.setSize(window.innerWidth, window.innerHeight);
}

// 애니메이션 루프
function animate() {
    requestAnimationFrame(animate);
    
    if (particleSystem) {
        particleSystem.rotation.x += 0.001;
        particleSystem.rotation.y += 0.002;
        
        // 마우스 인터랙션
        camera.position.x += (mouseX - camera.position.x) * 0.05;
        camera.position.y += (-mouseY - camera.position.y) * 0.05;
        camera.lookAt(scene.position);
        
        // 파티클 개별 애니메이션
        const positions = particleSystem.geometry.attributes.position.array;
        for (let i = 0; i < positions.length; i += 3) {
            positions[i + 1] += Math.sin(Date.now() * 0.001 + i * 0.01) * 0.5;
        }
        particleSystem.geometry.attributes.position.needsUpdate = true;
    }
    
    renderer.render(scene, camera);
}

// 파티클 색상 업데이트
export function updateParticleColors(isDark) {
    if (!particleSystem) return;
    
    const colors = particleSystem.geometry.attributes.color.array;
    
    for (let i = 0; i < colors.length; i += 3) {
        const color = new THREE.Color();
        
        if (isDark) {
            // 다크모드: 보라색-핑크 계열
            color.setHSL(0.8 + Math.random() * 0.2, 0.8, 0.6 + Math.random() * 0.4);
        } else {
            // 라이트모드: 파란색 계열
            color.setHSL(0.6 + Math.random() * 0.2, 0.8, 0.6 + Math.random() * 0.4);
        }
        
        colors[i] = color.r;
        colors[i + 1] = color.g;
        colors[i + 2] = color.b;
    }
    
    particleSystem.geometry.attributes.color.needsUpdate = true;
}
