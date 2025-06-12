document.addEventListener('DOMContentLoaded', () => {
    // 커스텀 마우스 커서 기능
    const cursor = document.querySelector('.cursor');

    document.addEventListener('mousemove', e => {
        cursor.style.left = e.clientX + 'px';
        cursor.style.top = e.clientY + 'px';
    });

    document.addEventListener('mousedown', () => {
        cursor.style.transform = 'translate(-50%, -50%) scale(0.8)';
        cursor.style.backgroundColor = 'rgba(118, 0, 255, 0.5)';
    });

    document.addEventListener('mouseup', () => {
        cursor.style.transform = 'translate(-50%, -50%) scale(1)';
        cursor.style.backgroundColor = 'transparent';
    });

    // 마우스 오버 시 커서 변화를 적용할 요소들
    const hoverables = document.querySelectorAll(
        'a, button, .site-logo, .search-icon, .menu-toggle, .close-sidebar, .sidebar-item, ' +
        '.korean-name, .chinese-name, .tagline, .strength-item, .portfolio-item, ' +
        '.modal-links a, .close-button, .social-links a, .award-item'
    );

    hoverables.forEach(item => {
        item.addEventListener('mouseenter', () => {
            cursor.classList.add('hover');
        });
        item.addEventListener('mouseleave', () => {
            cursor.classList.remove('hover');
        });
    });

    // 사이드바 토글 기능 (햄버거 메뉴)
    const menuToggle = document.querySelector('.menu-toggle');
    const closeSidebar = document.querySelector('.close-sidebar');
    const sidebar = document.querySelector('.sidebar');
    const sidebarItems = document.querySelectorAll('.sidebar-item');

    menuToggle.addEventListener('click', () => {
        sidebar.classList.add('active');
    });

    closeSidebar.addEventListener('click', () => {
        sidebar.classList.remove('active');
    });

    // 사이드바 메뉴 클릭 시 사이드바 닫기 (부드러운 스크롤과 함께)
    sidebarItems.forEach(item => {
        item.addEventListener('click', function(e) {
            e.preventDefault();

            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);

            if (targetElement) {
                sidebar.classList.remove('active');
                targetElement.scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    });

    // 검색창 토글 및 이동 기능
    const searchIcon = document.querySelector('.search-icon');
    const searchBox = document.querySelector('.search-box');
    const searchInput = document.querySelector('.search-box input');

    // 검색어와 섹션 ID 매핑 (소문자로 변환하여 일치시킬 것)
    const sectionMap = {
        "home": "#home",
        "about me": "#about",
        "about": "#about", // 추가
        "콘텐츠 파일럿": "#about",
        "content pilot": "#about", // 추가
        "portfolio": "#portfolio",
        "my portfolio": "#portfolio",
        "education": "#education",
        "education & skills": "#education",
        "skills": "#education", // 추가
        "awards": "#awards",
        "awards & certifications": "#awards",
        "certifications": "#awards", // 추가
        "contact": "#contact",
        "contact me": "#contact"
    };

    searchIcon.addEventListener('click', () => {
        searchBox.classList.toggle('active');
        if (searchBox.classList.contains('active')) {
            searchInput.focus();
        } else {
            searchInput.value = '';
        }
    });

    searchInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            const query = searchInput.value.toLowerCase().trim();
            const targetId = sectionMap[query];

            if (targetId) {
                const targetElement = document.querySelector(targetId);
                if (targetElement) {
                    searchBox.classList.remove('active'); // 검색창 닫기
                    searchInput.value = ''; // 검색어 초기화
                    targetElement.scrollIntoView({ behavior: 'smooth' });
                }
            } else {
                alert(`"${searchInput.value}"에 해당하는 섹션을 찾을 수 없습니다.`);
            }
            e.preventDefault(); // Enter 키 기본 동작(폼 제출) 방지
        }
    });


    // === 포트폴리오 모달 기능 ===
    const portfolioItems = document.querySelectorAll('.portfolio-item');
    const portfolioModals = document.querySelectorAll('.portfolio-modal');
    const portfolioCloseButtons = document.querySelectorAll('.portfolio-modal .close-button');
    const portfolioModalOverlay = document.getElementById('portfolio-modal-overlay'); // 포트폴리오 모달 오버레이

    portfolioItems.forEach(item => {
        item.addEventListener('click', () => {
            const portfolioId = item.dataset.portfolioId;
            const targetModal = document.getElementById(`portfolio-modal-${portfolioId}`);

            if (targetModal) {
                targetModal.classList.add('active');
                portfolioModalOverlay.classList.add('active');
                document.body.style.overflow = 'hidden'; // body 스크롤 방지
            }
        });
    });

    // 닫기 버튼 클릭 시 포트폴리오 모달 닫기
    portfolioCloseButtons.forEach(button => {
        button.addEventListener('click', () => {
            const parentModal = button.closest('.portfolio-modal');
            parentModal.classList.remove('active');
            portfolioModalOverlay.classList.remove('active');
            document.body.style.overflow = 'auto'; // body 스크롤 허용
        });
    });

    // 포트폴리오 모달 오버레이 클릭 시 모달 닫기
    portfolioModalOverlay.addEventListener('click', () => {
        portfolioModals.forEach(modal => {
            modal.classList.remove('active');
        });
        portfolioModalOverlay.classList.remove('active');
        document.body.style.overflow = 'auto';
    });

    // === 강점 모달 기능 ===
    const strengthItems = document.querySelectorAll('.strength-item');
    const strengthModals = document.querySelectorAll('.strength-modal');
    const strengthCloseButtons = document.querySelectorAll('.strength-modal .close-button');
    const strengthModalOverlay = document.getElementById('strength-modal-overlay'); // 강점 모달 오버레이

    strengthItems.forEach(item => {
        item.addEventListener('click', () => {
            const strengthId = item.dataset.strengthId;
            const targetModal = document.getElementById(`strength-modal-${strengthId}`);

            if (targetModal) {
                targetModal.classList.add('active');
                strengthModalOverlay.classList.add('active');
                document.body.style.overflow = 'hidden';
            }
        });
    });

    // 닫기 버튼 클릭 시 강점 모달 닫기
    strengthCloseButtons.forEach(button => {
        button.addEventListener('click', () => {
            const parentModal = button.closest('.strength-modal');
            parentModal.classList.remove('active');
            strengthModalOverlay.classList.remove('active');
            document.body.style.overflow = 'auto';
        });
    });

    // 강점 모달 오버레이 클릭 시 모달 닫기
    strengthModalOverlay.addEventListener('click', () => {
        strengthModals.forEach(modal => {
            modal.classList.remove('active');
        });
        strengthModalOverlay.classList.remove('active');
        document.body.style.overflow = 'auto';
    });


    // === Awards 모달 기능 ===
    const awardItems = document.querySelectorAll('.award-item');
    const awardModals = document.querySelectorAll('.award-modal');
    const awardCloseButtons = document.querySelectorAll('.award-modal .close-button');
    const awardModalOverlay = document.getElementById('award-modal-overlay'); // Awards 모달 오버레이

    awardItems.forEach(item => {
        item.addEventListener('click', () => {
            const awardId = item.dataset.awardId;
            const targetModal = document.getElementById(`award-modal-${awardId}`);

            if (targetModal) {
                targetModal.classList.add('active');
                awardModalOverlay.classList.add('active');
                document.body.style.overflow = 'hidden';
            }
        });
    });

    // 닫기 버튼 클릭 시 Awards 모달 닫기
    awardCloseButtons.forEach(button => {
        button.addEventListener('click', () => {
            const parentModal = button.closest('.award-modal');
            parentModal.classList.remove('active');
            awardModalOverlay.classList.remove('active');
            document.body.style.overflow = 'auto'; // body 스크롤 허용
        });
    });

    // Awards 모달 오버레이 클릭 시 모달 닫기
    awardModalOverlay.addEventListener('click', () => {
        awardModals.forEach(modal => {
            modal.classList.remove('active');
        });
        awardModalOverlay.classList.remove('active');
        document.body.style.overflow = 'auto';
    });


    // ESC 키 눌렀을 때 모든 모달 닫기
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            portfolioModals.forEach(modal => { modal.classList.remove('active'); });
            strengthModals.forEach(modal => { modal.classList.remove('active'); });
            awardModals.forEach(modal => { modal.classList.remove('active'); });
            portfolioModalOverlay.classList.remove('active');
            strengthModalOverlay.classList.remove('active');
            awardModalOverlay.classList.remove('active');
            document.body.style.overflow = 'auto';
        }
    });

    // === 스킬바 퍼센티지 애니메이션 ===
    const skillProgressBars = document.querySelectorAll('.skill-progress');

    // Education & Skills 섹션이 화면에 보일 때 스킬바 애니메이션 시작
    const educationSkillsSection = document.getElementById('education');

    if (educationSkillsSection) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    skillProgressBars.forEach(bar => {
                        const progress = bar.dataset.progress;
                        const span = bar.querySelector('span');

                        // 애니메이션 시작
                        bar.style.width = `${progress}%`;

                        // 퍼센테이지 숫자 증가 애니메이션
                        let currentProgress = 0;
                        const interval = setInterval(() => {
                            if (currentProgress < progress) {
                                currentProgress++;
                                span.textContent = `${currentProgress}%`;
                            } else {
                                clearInterval(interval);
                            }
                        }, 20);
                    });
                    observer.unobserve(entry.target); // 한번 애니메이션 했으면 옵저버 해제
                }
            });
        }, { threshold: 0.5 });

        observer.observe(educationSkillsSection);
    }
});
