// 다크모드 초기화
import { updateParticleColors } from './threejs.js';

export function initDarkMode() {
    const themeToggle = document.getElementById('theme-toggle');
    const body = document.body;
    
    // 저장된 테마 또는 시스템 테마 감지
    const savedTheme = localStorage.getItem('theme');
    const systemTheme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
    const currentTheme = savedTheme || systemTheme;
    
    // 초기 테마 적용
    if (currentTheme === 'dark') {
        body.classList.add('dark-mode');
    }
    
    // 테마 토글 이벤트
    themeToggle.addEventListener('click', function() {
        body.classList.toggle('dark-mode');
        
        // 테마 상태 저장
        const isDark = body.classList.contains('dark-mode');
        localStorage.setItem('theme', isDark ? 'dark' : 'light');
        
        // Three.js 파티클 색상 업데이트
        updateParticleColors(isDark);
        
        // 토글 애니메이션
        themeToggle.style.transform = 'scale(0.95)';
        setTimeout(() => {
            themeToggle.style.transform = 'scale(1)';
        }, 150);
    });
    
    // 시스템 테마 변경 감지
    window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', function(e) {
        if (!localStorage.getItem('theme')) {
            if (e.matches) {
                body.classList.add('dark-mode');
            } else {
                body.classList.remove('dark-mode');
            }
            updateParticleColors(e.matches);
        }
    });
}
