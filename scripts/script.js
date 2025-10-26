// Main Script - Import all JavaScript modules
import { initThreeJS, updateParticleColors } from './threejs.js';
import { initDarkMode } from './darkmode.js';
import { initModal } from './modal.js';
import { initAnimations } from './animations.js';
import { initUtils } from './utils.js';

// DOM이 로드된 후 실행
document.addEventListener('DOMContentLoaded', function() {
    
    // Three.js 초기화
    initThreeJS();
    
    // 다크모드 초기화
    initDarkMode();
    
    // 모달 초기화
    initModal();
    
    // 애니메이션 초기화
    initAnimations();
    
    // 유틸리티 초기화
    initUtils();
});

// 페이지 로드 완료 후 초기화
window.addEventListener('load', function() {
    console.log('Vibe Me 페이지가 성공적으로 로드되었습니다! 🎉');
});
