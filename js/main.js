function showPage(pageId) {
    // Hide all pages
    const pages = document.querySelectorAll('.page-content');
    pages.forEach(page => page.classList.remove('active'));
    
    // Show selected page
    document.getElementById(pageId).classList.add('active');
    
    // Scroll to top
    window.scrollTo(0, 0);
    
    // Track page view
    trackClick('page_' + pageId);
}

function trackClick(action) {
    // 数据跟踪功能 - 现在集成Google Analytics
    const trackingData = {
        action: action,
        timestamp: new Date().toISOString(),
        userAgent: navigator.userAgent,
        referrer: document.referrer,
        page: window.location.href,
        screenSize: screen.width + 'x' + screen.height,
        language: navigator.language
    };
    
    // 控制台输出（开发测试用）
    console.log('Tracking Event:', trackingData);
    
    // Google Analytics 4 事件跟踪
    if (typeof gtag !== 'undefined') {
        gtag('event', action, {
            'event_category': 'engagement',
            'event_label': action,
            'custom_parameters': trackingData
        });
    }
    
    // 或者发送到自己的分析服务
    // fetch('/api/track', {
    //     method: 'POST',
    //     headers: { 'Content-Type': 'application/json' },
    //     body: JSON.stringify(trackingData)
    // });
}

// 页面加载时跟踪
document.addEventListener('DOMContentLoaded', function() {
    trackClick('page_load');
});

// 跟踪停留时间
let startTime = Date.now();
window.addEventListener('beforeunload', function() {
    const timeSpent = Math.round((Date.now() - startTime) / 1000);
    trackClick('time_spent_' + timeSpent + 's');
});

// 跟踪滚动深度
let maxScroll = 0;
window.addEventListener('scroll', function() {
    const scrollPercent = Math.round((window.scrollY / (document.body.scrollHeight - window.innerHeight)) * 100);
    if (scrollPercent > maxScroll) {
        maxScroll = scrollPercent;
        if (maxScroll >= 25 && maxScroll < 50) {
            trackClick('scroll_25_percent');
        } else if (maxScroll >= 50 && maxScroll < 75) {
            trackClick('scroll_50_percent');
        } else if (maxScroll >= 75) {
            trackClick('scroll_75_percent');
        }
    }
});

// 移动端菜单功能
function toggleMobileMenu() {
    const mobileNav = document.querySelector('.mobile-nav-links');
    const hamburger = document.querySelector('.hamburger');
    const closeIcon = document.querySelector('.close');
    
    mobileNav.classList.toggle('active');
    
    if (mobileNav.classList.contains('active')) {
        hamburger.style.display = 'none';
        closeIcon.style.display = 'block';
        trackClick('mobile_menu_open');
    } else {
        hamburger.style.display = 'block';
        closeIcon.style.display = 'none';
        trackClick('mobile_menu_close');
    }
}

function closeMobileMenu() {
    const mobileNav = document.querySelector('.mobile-nav-links');
    const hamburger = document.querySelector('.hamburger');
    const closeIcon = document.querySelector('.close');
    
    mobileNav.classList.remove('active');
    hamburger.style.display = 'block';
    closeIcon.style.display = 'none';
}
