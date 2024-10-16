document.addEventListener('DOMContentLoaded', () => {
    // 캐시된 요소들
    const moveBox = document.querySelector('.main-board__pc');
    const mainBoard = document.querySelector('.main-board');
    const header = document.querySelector('#header');
    const serviceButtons = document.querySelectorAll('.main-service__button li');

    let winWidth = window.innerWidth;
    let winHeight = window.innerHeight;
    let contWidth = moveBox.clientWidth;
    let contHeight = moveBox.clientHeight;
    let isMoving = false;

    // 디바운스된 리사이즈 핸들러
    const updateDimensions = () => {
        winWidth = window.innerWidth;
        winHeight = window.innerHeight;
        contWidth = moveBox.clientWidth;
        contHeight = moveBox.clientHeight;
    };

    const debounce = (func, wait) => {
        let timeout;
        return function (...args) {
            clearTimeout(timeout);
            timeout = setTimeout(() => func.apply(this, args), wait);
        };
    };

    window.addEventListener('resize', debounce(updateDimensions, 100));

    // 마우스 이동 핸들러
    const mouseMoveHandler = (e) => {
        const nowX = (-1 + (e.pageX / winWidth) * 2).toFixed(2);
        const nowY = (1 - (e.pageY / winHeight) * 2).toFixed(2);

        const movePositionX = -1 * (nowX * ((contWidth + 100 - winWidth) / 2));
        const movePositionY = nowY * ((contHeight + 50 - winHeight) / 2);

        if (!isMoving) {
            isMoving = true;
            requestAnimationFrame(() => {
                moveBox.style.transform = `translate(${movePositionX}px, ${movePositionY}px)`;
                isMoving = false;
            });
        }
    };

    mainBoard.addEventListener('mousemove', mouseMoveHandler);
    header.addEventListener('mousemove', mouseMoveHandler);

    // GSAP 애니메이션
    gsap.registerPlugin(ScrollTrigger);

    const highlights = document.querySelectorAll('.highlight .bg');
    highlights.forEach((bg, index) => {
        gsap.to(bg, {
            width: '100%',
            duration: 0.6,
            delay: index * 0.3,
            scrollTrigger: {
                trigger: bg.closest('.highlight'),
                start: 'top 60%',
                end: 'bottom 40%',
                once: true,
            },
        });
    });

    // 서비스 슬라이드 설정
    const serviceSwiper = new Swiper('.main-service__slide', {
        slidesPerView: 'auto',
        loop: false,
        speed: 600,
        effect: 'fade',
        parallax: true,
        grabCursor: false,
        on: {
            slideChange: function () {
                const index = this.activeIndex;
                serviceButtons.forEach((btn, i) => {
                    btn.classList.toggle('active', i === index);
                });
            },
        },
    });

    // 버튼 클릭 이벤트
    serviceButtons.forEach((btn, index) => {
        btn.addEventListener('click', () => {
            serviceSwiper.slideTo(index);
            serviceButtons.forEach((b) => b.classList.remove('active'));
            btn.classList.add('active');
        });
    });

    const sections = gsap.utils.toArray('.main-full');
    let isScrolling = false;
    let currentSectionIndex = 0;

    function goToSection(index) {
        if (isScrolling || index < 0 || index >= sections.length) return;

        isScrolling = true;

        gsap.to(window, {
            scrollTo: { y: sections[index], autoKill: false },
            duration: 1,
            ease: 'expo.inOut',
            onComplete: () => {
                currentSectionIndex = index;
                isScrolling = false;
            },
        });
    }
    goToSection(currentSectionIndex);

    function handleWheel(e) {
        // prdslider가 활성화된 경우 스크롤 방지
        if (document.querySelector('.prdslider').contains(e.target)) {
            return; // prdslider 내에서 스크롤 이벤트를 무시
        }

        if (isScrolling) {
            e.preventDefault();
            return;
        }

        const delta = e.deltaY > 0 ? 'down' : 'up';

        // 방향에 따라 섹션 전환
        if (delta === 'down' && currentSectionIndex < sections.length - 1) {
            currentSectionIndex += 1;
            goToSection(currentSectionIndex);
        } else if (delta === 'up' && currentSectionIndex > 0 && currentSectionIndex !== sections.length - 1) {
            currentSectionIndex -= 1;
            goToSection(currentSectionIndex);
        } else if (delta === 'up' && currentSectionIndex === sections.length - 1 && document.querySelector('.scroll-area').scrollTop === 0) {
            currentSectionIndex -= 1;
            goToSection(currentSectionIndex);
            document.querySelector('.scroll-area').scrollTop = 0;
        }
    }

    window.addEventListener('wheel', handleWheel, { passive: false });

    // // ScrollTrigger로 scroll-area 고정 설정
    ScrollTrigger.create({
        trigger: '.scroll-area',
        pin: true, // 고정
        pinSpacing: false, // 고정된 요소가 공간을 차지하지 않도록 설정
        start: 'top top', // 스크롤 시작 시점
        end: () => '+=' + document.querySelector('.scroll-area').offsetHeight, // 스크롤 고정 종료
    });
});

/*********************************************************** */

// const cards = gsap.utils.toArray('.prdslider ul li');
// let cardsWidth = cards.reduce((totalWidth, item) => totalWidth + $(item).outerWidth(true), 0);

// if (cardsWidth > $('.prdslider').innerWidth()) {
//     gsap.timeline({
//         scrollTrigger: {
//             trigger: '.parallax-slider',
//             scroller: '.scroll-area',
//             start: 'top top', // parallax-slider의 상단이 뷰포트 상단에 닿을 때 시작
//             end: () => '+=' + (cardsWidth - $('.parallax-slider').outerWidth(true)) + 'px',
//             pin: true,
//             scrub: 1,
//             markers: true, // 디버깅용 마커, 필요 시 제거
//         },
//     }).to(cards, {
//         x: () => -(cardsWidth - $('.prdslider').outerWidth(true)) - 80 + 'px',
//         ease: 'none',
//     });
// }

// // 화면 크기 변경 시 ScrollTrigger 다시 계산
// ScrollTrigger.addEventListener('refreshInit', function () {
//     cardsWidth = cards.reduce((totalWidth, item) => totalWidth + $(item).outerWidth(true), 0);
// });
