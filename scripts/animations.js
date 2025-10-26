// 애니메이션 초기화
export function initAnimations() {
    // 헤더 타이틀 3D 애니메이션
    const siteTitle = document.querySelector('.site-title');
    if (siteTitle) {
        siteTitle.style.transformStyle = 'preserve-3d';
        siteTitle.style.transition = 'transform 0.3s ease';
        
        siteTitle.addEventListener('mouseenter', function() {
            this.style.transform = 'scale(1.1) rotateY(10deg) rotateX(5deg)';
            this.style.textShadow = '0 0 20px rgba(37, 99, 235, 0.5)';
        });
        
        siteTitle.addEventListener('mouseleave', function() {
            this.style.transform = 'scale(1) rotateY(0deg) rotateX(0deg)';
            this.style.textShadow = 'none';
        });
    }
    
    // 링크 버튼들 3D 효과 강화
    const linkButtons = document.querySelectorAll('.link-list a');
    linkButtons.forEach(function(button, index) {
        button.style.transformStyle = 'preserve-3d';
        button.style.transition = 'all 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275)';
        
        button.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-8px) rotateX(10deg) rotateY(5deg) scale(1.05)';
            this.style.boxShadow = '0 15px 30px rgba(37, 99, 235, 0.4)';
        });
        
        button.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0px) rotateX(0deg) rotateY(0deg) scale(1)';
            this.style.boxShadow = '0 2px 4px rgba(0, 0, 0, 0.1)';
        });
        
        // 클릭 효과
        button.addEventListener('mousedown', function() {
            this.style.transform = 'translateY(-4px) scale(0.98)';
        });
        
        button.addEventListener('mouseup', function() {
            this.style.transform = 'translateY(-8px) rotateX(10deg) rotateY(5deg) scale(1.05)';
        });
    });
    
    // Contact 버튼 3D 효과
    const contactBtn = document.getElementById('contact-open');
    if (contactBtn) {
        contactBtn.style.transformStyle = 'preserve-3d';
        contactBtn.style.transition = 'all 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275)';
        
        contactBtn.addEventListener('mouseenter', function() {
            this.style.transform = 'scale(1.1) rotateX(5deg) rotateY(5deg) translateZ(10px)';
            this.style.boxShadow = '0 15px 30px rgba(37, 99, 235, 0.4)';
        });
        
        contactBtn.addEventListener('mouseleave', function() {
            this.style.transform = 'scale(1) rotateX(0deg) rotateY(0deg) translateZ(0px)';
            this.style.boxShadow = 'none';
        });
    }
}
