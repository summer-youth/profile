// 알림 메시지 표시 함수
function showNotification(message) {
    // 기존 알림이 있다면 제거
    const existingNotification = document.querySelector('.notification');
    if (existingNotification) {
        existingNotification.remove();
    }
    
    // 새 알림 요소 생성
    const notification = document.createElement('div');
    notification.className = 'notification';
    notification.textContent = message;
    
    // 스타일 적용
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: #2563eb;
        color: white;
        padding: 12px 20px;
        border-radius: 8px;
        box-shadow: 0 4px 12px rgba(37, 99, 235, 0.3);
        z-index: 1000;
        font-size: 14px;
        opacity: 0;
        transform: translateX(100%);
        transition: all 0.3s ease;
    `;
    
    // DOM에 추가
    document.body.appendChild(notification);
    
    // 애니메이션으로 나타나기
    setTimeout(function() {
        notification.style.opacity = '1';
        notification.style.transform = 'translateX(0)';
    }, 100);
    
    // 3초 후 자동 제거
    setTimeout(function() {
        notification.style.opacity = '0';
        notification.style.transform = 'translateX(100%)';
        setTimeout(function() {
            if (notification.parentNode) {
                notification.parentNode.removeChild(notification);
            }
        }, 300);
    }, 3000);
}

// 텍스트 선택 함수 (폴백용)
function selectText(text) {
    const textArea = document.createElement('textarea');
    textArea.value = text;
    textArea.style.position = 'fixed';
    textArea.style.left = '-999999px';
    textArea.style.top = '-999999px';
    document.body.appendChild(textArea);
    textArea.focus();
    textArea.select();
    document.body.removeChild(textArea);
}

// 기본 유틸리티 초기화
export function initUtils() {
    // 연도 자동 업데이트
    const yearElement = document.getElementById('year');
    if (yearElement) {
        yearElement.textContent = new Date().getFullYear();
    }
    
    // 링크 클릭 시 새 탭에서 열기 (확실하게 하기 위해)
    const externalLinks = document.querySelectorAll('a[target="_blank"]');
    externalLinks.forEach(function(link) {
        link.addEventListener('click', function() {
            // 링크가 새 탭에서 열리도록 보장
            window.open(this.href, '_blank', 'noopener,noreferrer');
        });
    });
}
