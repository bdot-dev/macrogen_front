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
        // const initialPositionX = (winWidth - contWidth) / 2;
        // const initialPositionY = (winHeight - contHeight) / 2;
        moveBox.style.transform = `translate(0px, 0px)`;
    };

    window.addEventListener('load', setInitialPosition);

    // 스크롤 이벤트 추가
    window.addEventListener('scroll', setInitialPosition);
    // GSAP 애니메이션
    gsap.registerPlugin(ScrollTrigger);

    const marquee = document.querySelector('.main-slogan__marquee h2');
    const marqueeImgae = document.querySelector('.main-slogan__imagewrap');
    const marqueeWidth = marquee.offsetWidth;
    const marqueeImgaeWidth = marqueeImgae.offsetWidth;
    const totalWidth = marqueeWidth + marqueeImgaeWidth;
    const screenWidth = window.innerWidth;

    console.log('totalWidth', totalWidth);
    console.log('screenWidth', screenWidth);

    // 타임라인 및 ScrollTrigger 설정
    const tl = gsap.timeline({
        scrollTrigger: {
            trigger: '.section--slogan',
            start: 'top center',
            end: '+=1000',
            onEnter: () => {
                tl.restart();
            },
            onLeave: () => {
                setTimeout(() => {
                    resetAnimation();
                }, 500);
            },
            onEnterBack: () => {
                setTimeout(() => {
                    tl.restart();
                }, 500);
            },
            onLeaveBack: () => {
                setTimeout(() => {
                    resetAnimation();
                }, 500);
            },
        },
    });

    tl.to('.main-slogan', {
        backgroundColor: '#1F273C',
        duration: 1,
        ease: 'power2.out',
        onStart: () => {
            // main-service__button의 모든 li 요소에서 active 클래스 제거
            const listItems = document.querySelectorAll('.main-service__button li');
            listItems.forEach((li) => {
                li.classList.remove('active'); // active 클래스 제거
            });

            // 첫 번째 li에 active 클래스 추가
            const firstLi = listItems[0];
            if (firstLi) {
                firstLi.classList.add('active'); // 첫 번째 li에 active 클래스 추가
                firstLi.click(); // 첫 번째 li를 클릭한 것처럼 처리
            }
        },
    })
        .to(
            '.main-slogan__text h2',
            {
                y: 0,
                scale: 1,
                duration: 1.5,
                ease: 'power2.out',
                stagger: 0,
            },
            '-=0.5'
        )
        .to(
            '.highlight .bg',
            {
                width: '100%',
                duration: 0.6,
                ease: 'power2.out',
                stagger: 0.3,
            },
            '-=0.5'
        )
        .to('.main-slogan__text h2', {
            y: 100,
            scale: 1,
            duration: 1.5,
            ease: 'power2.out',
            stagger: 0,
        })
        .to(
            '.overlay-circle',
            {
                scale: 100,
                opacity: 1,
                duration: 1.5,
                ease: 'power2.out',
                stagger: 0.5,
                onComplete: () => {
                    gsap.to('.overlay-circle', { opacity: 0, duration: 0 });
                    gsap.to('.main-slogan', {
                        backgroundColor: '#fff',
                        duration: 0,
                        ease: 'power2.out',
                    });
                },
            },
            '-=0.5'
        )
        .to(
            '.main-slogan__marquee',
            {
                x: `-${totalWidth / 1.5}px`,
                duration: 5,
                stagger: 0,
            },
            '-=0.1'
        )
        .to(
            '.main-slogan__marquee',
            {
                opacity: 1, // opacity를 1로 설정
                duration: 1, // opacity 변경 시간
            },
            '-=5' // 첫 번째 애니메이션과 겹치도록 설정
        )
        .to(
            '.main-slogan__image--scale',
            {
                scale: 3.6, // 원하는 scale 값 (예: 1.5로 설정)
                x: '-50%', // 수평으로 이동 (조정 필요)
                y: '-50%',
                borderRadius: '0%',
                duration: 1, // scale 변경 시간
                ease: 'power2.out', // 부드러운 애니메이션
            },
            '+=0.5' // opacity 애니메이션이 끝난 후 0.5초 지연
        )
        .to('.main-slogan__image--scale', {
            opacity: 0,
            duration: 1,
        })
        .to(
            '.main-service',
            {
                opacity: 1, // opacity를 1로 설정
                duration: 1,
                onStart: () => {
                    // main-service의 z-index를 설정
                    document.querySelector('.main-service').style.zIndex = '10'; // 원하는 z-index 값
                },
            },
            '-=1.5' // 이전 애니메이션과 동시에 실행하려면 적절한 지점에서 설정
        );

    function resetAnimation() {
        gsap.set('.main-slogan', { backgroundColor: '#1F1F1F' });
        gsap.set('.main-slogan__text h2', { y: 100, scale: 1.3 });
        gsap.set('.highlight .bg', { width: '0%' });
        gsap.set('.main-slogan__marquee', { opacity: 0, x: '100%' });
        gsap.set('.main-service', { opacity: 0 });
    }

    // const highlights = document.querySelectorAll('.highlight .bg');
    // highlights.forEach((bg, index) => {
    //     gsap.to(bg, {
    //         width: '100%',
    //         duration: 0.6,
    //         delay: index * 0.3,
    //         scrollTrigger: {
    //             trigger: bg.closest('.highlight'),
    //             start: 'top 60%',
    //             end: 'bottom 40%',
    //             once: true,
    //         },
    //     });
    // });
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
        pin: true,
        pinSpacing: false,
        start: 'top top',
        end: () => '+=' + document.querySelector('.scroll-area').offsetHeight,
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
            const increment = change / ((duration / 1000) * 60);
            let current = start;
            const startTime = performance.now();
            const targetLength = target.toString().length;

            const step = () => {
                const elapsed = performance.now() - startTime;
                const progress = Math.min(elapsed / duration, 1);
                current = Math.floor(progress * target);

                element.innerText = generateRandomNumber(targetLength);

                if (progress < 1) {
                    requestAnimationFrame(step);
                } else {
                    element.innerText = target;
                    resolve();
                }
            };
            requestAnimationFrame(step);
        });
    }

    async function startCounting(element) {
        const duration = 800;
        const target = parseInt(element.getAttribute('data-count'), 10);
        await countToTarget(element, target, duration);
    }

    const options = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1,
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                const element = entry.target;
                element.classList.add('visible');
                startCounting(element);
                observer.unobserve(element);
            }
        });
    }, options);

    const counters = document.querySelectorAll('.counting');
    counters.forEach((counter) => {
        observer.observe(counter);
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
