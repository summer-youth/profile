// Contact 모달 초기화
export function initModal() {
    // Contact 모달 관련 요소들
    const contactOpenBtn = document.getElementById('contact-open');
    const contactDialog = document.getElementById('contact-dialog');
    const contactCloseBtn = document.getElementById('contact-close-x');
    const emailLink = contactDialog.querySelector('a[href^="mailto:"]');
    
    // Contact 모달 열기
    contactOpenBtn.addEventListener('click', function() {
        contactDialog.showModal();
    });
    
    // Contact 모달 닫기 (X 버튼 클릭)
    contactCloseBtn.addEventListener('click', function() {
        contactDialog.close();
    });
    
    // Contact 모달 닫기 (배경 클릭)
    contactDialog.addEventListener('click', function(e) {
        if (e.target === contactDialog) {
            contactDialog.close();
        }
    });
    
    // ESC 키로 모달 닫기
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && contactDialog.open) {
            contactDialog.close();
        }
    });
    
    // 이메일 복사 기능
    emailLink.addEventListener('click', function(e) {
        e.preventDefault();
        
        const email = 'zij08209712@gmail.com';
        
        // 클립보드에 복사
        navigator.clipboard.writeText(email).then(function() {
            // 복사 성공 메시지
            showNotification('이메일 주소가 복사되었습니다!');
        }).catch(function(err) {
            console.error('이메일 복사 실패:', err);
            // 폴백: 이메일 주소 선택
            selectText(email);
            showNotification('이메일 주소를 선택했습니다. Ctrl+C로 복사하세요.');
        });
    });
}

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

// 유틸리티 함수들 export
export { showNotification, selectText };
