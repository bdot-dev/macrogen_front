document.addEventListener('DOMContentLoaded', () => {
    gsap.registerPlugin(ScrollTrigger);

    const moveBox = document.querySelector('.main-board__pc');
    const mainBoard = document.querySelector('.main-board');
    const header = document.querySelector('#header');
    const serviceButtons = document.querySelectorAll('.main-service__button li');
    const marquee = document.querySelector('.main-slogan__marquee h4');
    const marqueeImage = document.querySelector('.main-slogan__imagewrap');
    const marqueeWidth = marquee.offsetWidth;
    const marqueeImageWidth = marqueeImage.offsetWidth;
    const totalWidth = marqueeWidth + marqueeImageWidth;
    const counters = document.querySelectorAll('.counting');
    const sections = gsap.utils.toArray('.section--slide');
    let winWidth = window.outerWidth;
    let winHeight = window.outerHeight;
    let contWidth = moveBox.clientWidth;
    let contHeight = moveBox.clientHeight;
    let isMoving = false;
    let isScrolling = false;
    let currentSectionIndex = 0;
    let tl;

    const updateDimensions = () => {
        winWidth = window.outerWidth;
        winHeight = window.outerHeight;
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

    const mouseMoveHandler = (e) => {
        const nowX = (-1 + (e.pageX / winWidth) * 2).toFixed(2);
        const nowY = (1 - (e.pageY / winHeight) * 2).toFixed(2);
        const movePositionX = -1 * (nowX * ((contWidth + 50 - winWidth) / 2));
        const movePositionY = nowY * ((contHeight + 20 - winHeight) / 2);
        if (!isMoving) {
            isMoving = true;
            requestAnimationFrame(() => {
                moveBox.style.transform = `translate(${movePositionX}px, ${movePositionY}px)`;
                isMoving = false;
            });
        }
    };

    const setInitialPosition = () => {
        moveBox.style.transform = `translate(0px, 0px)`;
    };

    const resetSloganAnimation = () => {
        gsap.set('.main-slogan', { backgroundColor: '#1F1F1F' });
        gsap.set('.main-slogan--diff', { backgroundColor: '#fff' });
        gsap.set('.main-slogan__text h4', { y: '110%', scale: 1.3 });
        gsap.set('.highlight', { color: '#000' });
        gsap.set('.highlight .bg', { width: '0%' });
        gsap.set('.main-slogan__marquee', { opacity: 0, top: '50%', left: '50%', transform: 'translateY(-50%)' });
        gsap.set('.main-service', { opacity: 0 });
        gsap.set('.main-slogan__image--scale', { width: '500px', height: '304px', borderRadius: '10px' });
        gsap.set('.overlay-circle', { scale: 1, opacity: 0 });
    };

    const initAnimation = () => {
        tl = gsap.timeline({
            scrollTrigger: {
                trigger: '.section--slogan',
                start: 'top top',
                end: 'top bottom',
            },
        });

        tl.to('.main-slogan', {
            backgroundColor: '#fff',
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
                '.main-slogan__text h4',
                {
                    y: '0%',
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
            .to(
                '.highlight',
                {
                    color: '#fff',
                    duration: 0.6,
                    ease: 'power2.out',
                    stagger: 0.3,
                },
                '-=0.85'
            )
            .to('.main-slogan__text h4', {
                y: 100,
                scale: 1,
                duration: 1,
                ease: 'power2.in',
                stagger: 0,
            })
            .to('.overlay-circle', {
                scale: 100,
                opacity: 1,
                duration: 1.5,
                ease: 'power2.out',
                stagger: 0.5,
                onComplete: () => {
                    gsap.to('.overlay-circle', { opacity: 0, duration: 0 });
                    gsap.to('.main-slogan', {
                        backgroundColor: '#1F1F1F',
                        duration: 0,
                        ease: 'power2.out',
                    });
                },
            })
            .to(
                '.main-slogan__marquee',
                {
                    left: 'calc(50% + 245.333px)',
                    transform: 'translate(-100%, -50%)',
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
                    width: '101vw',
                    height: '100vh',
                    borderRadius: '0%',
                    duration: 1, // scale 변경 시간
                    ease: 'power2.out', // 부드러운 애니메이션
                },
                '+=0.5' // opacity 애니메이션이 끝난 후 0.5초 지연
            )
            .to('.main-slogan__image--scale', {
                opacity: 1,
                duration: 0.65,
                ease: 'power2.out',
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
            )
            .add(() => {
                document.querySelector('.section--slogan').classList.toggle('animate-end'); // 원하는 클래스 이름으로 변경
            });
    };

    new SimpleMarquee('.main-marquee__slide ul', {
        autoplay: true,
        speed: 1.5,
        pauseOnMouseEnter: false,
        direction: 'right',
    });

    const serviceSwiper = new Swiper('.main-service__slide', {
        slidesPerView: 'auto',
        loop: false,
        speed: 600,
        effect: 'fade',
        parallax: true,
        grabCursor: false,
        on: {
            slideChange() {
                const index = this.activeIndex;
                serviceButtons.forEach((btn, i) => {
                    btn.classList.toggle('active', i === index);
                });
            },
        },
    });

    const getRandomInt = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;

    const generateRandomNumber = (length) => getRandomInt(Math.pow(10, length - 1), Math.pow(10, length) - 1);

    const countToTarget = (element, target, duration) => {
        const startTime = performance.now();

        const step = () => {
            const elapsedTime = performance.now() - startTime;
            const progressRatio = Math.min(elapsedTime / duration, 1);

            element.innerText = progressRatio < 1 ? generateRandomNumber(target.toString().length) : target;

            if (progressRatio < 1) requestAnimationFrame(step);
        };

        requestAnimationFrame(step);
    };

    counters.forEach((counter) => counter.innerText === '0' && startCounting(counter));

    function startCounting(counterElement) {
        countToTarget(counterElement, parseInt(counterElement.getAttribute('data-count'), 10), 1200);
    }

    function goToSection(index) {
        if (isScrolling || index < 0 || index >= sections.length) return;

        isScrolling = true;

        gsap.to(window, {
            scrollTo: {
                y: sections[index].offsetTop,
                autoKill: false,
            },
            duration: 1,
            ease: 'expo.inOut',

            onComplete() {
                currentSectionIndex = index;
                isScrolling = false;

                sections.forEach((section) => {
                    section.classList.remove('active');

                    if (index >= sections.length - 1) {
                        counters.forEach(startCounting);
                    } else {
                        counters.forEach((counter) => (counter.innerText = '0'));
                    }
                });

                sections[index].classList.add('active');

                if (sections[index].classList.contains('section--slogan')) {
                    initAnimation();
                } else {
                    tl.kill();
                    resetSloganAnimation();
                }
            },
        });
    }

    function handleWheel(e) {
        if (isScrolling) {
            e.preventDefault();
            return;
        }

        let delta = e.deltaY > 0 ? 'down' : 'up';

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

    ScrollTrigger.create({
        trigger: '.scroll-area',
        pin: true,
        pinSpacing: false,
        start: 'top top',
        end: 'bottom bottom',
    });

    new Swiper('.global-swiper', {
        slidesPerView: 'auto',
        spaceBetween: 20,
    });

    const handleWindowScroll = () => {
        gsap.to(window, {
            scrollTo: {
                y: sections[currentSectionIndex].offsetTop,
                autoKill: false,
            },
            duration: 1,
            ease: 'expo.inOut',
        });
    };

    const handleTargetPosition = () => {
        const marquee = document.querySelector('.main-slogan__marquee');
        gsap.to(marquee, {
            left: 'calc(50% + 245.333px)',
            transform: 'translate(-100%, -50%)',
            duration: 5,
            stagger: 0,
        });
    };

    window.addEventListener('load', setInitialPosition);
    window.addEventListener('scroll', setInitialPosition);
    window.addEventListener('wheel', handleWheel, { passive: false });
    window.addEventListener(
        'resize',
        debounce(() => {
            updateDimensions();
            handleWindowScroll();
            // handleTargetPosition();
            ScrollTrigger.update();
            ScrollTrigger.refresh();
        }, 100)
    );

    [mainBoard, header].forEach((element) => element.addEventListener('mousemove', mouseMoveHandler));

    serviceButtons.forEach((btn, index) => {
        btn.addEventListener('click', () => {
            serviceSwiper.slideTo(index);
            serviceButtons.forEach((b) => b.classList.remove('active'));
            btn.classList.add('active');
        });
    });

    initAnimation();
    goToSection(currentSectionIndex);
});
