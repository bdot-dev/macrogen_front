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
        const movePositionX = -1 * (nowX * ((contWidth + 50 - winWidth) / 2));
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

    const setInitialPosition = () => {
        const initialPositionX = (winWidth - contWidth) / 2;
        const initialPositionY = (winHeight - contHeight) / 2;
        moveBox.style.transform = `translate(${initialPositionX}px, ${initialPositionY}px)`;
    };

    window.addEventListener('load', setInitialPosition);

    // 스크롤 이벤트 추가
    window.addEventListener('scroll', setInitialPosition);
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
        //
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

    // ScrollTrigger로 scroll-area 고정 설정
    ScrollTrigger.create({
        trigger: '.scroll-area',
        pin: true, // 고정
        pinSpacing: false, // 고정된 요소가 공간을 차지하지 않도록 설정
        start: 'top top', // 스크롤 시작 시점
        end: () => '+=' + document.querySelector('.scroll-area').offsetHeight, // 스크롤 고정 종료
    });

    // 숫자 카운팅
    function getRandomInt(min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }

    function generateRandomNumber(length) {
        const min = Math.pow(10, length - 1);
        const max = Math.pow(10, length) - 1;
        return getRandomInt(min, max);
    }

    async function countToTarget(element, target, duration) {
        return new Promise((resolve) => {
            const start = 0;
            const change = target - start;
            const increment = change / ((duration / 1000) * 60); // 프레임당 증가량
            let current = start;
            const startTime = performance.now();
            const targetLength = target.toString().length; // 목표 숫자의 자리수

            const step = () => {
                const elapsed = performance.now() - startTime;
                const progress = Math.min(elapsed / duration, 1); // 0에서 1까지의 비율
                current = Math.floor(progress * target); // 현재 카운트

                // 랜덤 숫자 생성 (자리수에 맞춰)
                element.innerText = generateRandomNumber(targetLength);

                if (progress < 1) {
                    requestAnimationFrame(step);
                } else {
                    element.innerText = target; // 목표 값 설정
                    resolve(); // 카운팅 완료
                }
            };
            requestAnimationFrame(step);
        });
    }

    async function startCounting(element) {
        const duration = 1000; // 모든 카운팅이 2초 동안 진행
        const target = parseInt(element.getAttribute('data-count'), 10);
        await countToTarget(element, target, duration);
        console.log(`${target} 카운팅 완료!`);
    }

    const options = {
        root: null, // 뷰포트
        rootMargin: '0px',
        threshold: 0.1, // 10%가 보일 때
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                const element = entry.target;
                element.classList.add('visible'); // 요소가 보일 때 클래스 추가
                startCounting(element); // 카운팅 시작
                observer.unobserve(element); // 카운팅이 시작되면 더 이상 관찰하지 않음
            }
        });
    }, options);

    const counters = document.querySelectorAll('.counting');
    counters.forEach((counter) => {
        observer.observe(counter); // 각 카운터 요소를 관찰
    });

    var swiper = new Swiper('.global-swiper', {
        slidesPerView: 'auto',
        spaceBetween: 20,
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
