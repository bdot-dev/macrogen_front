document.addEventListener('DOMContentLoaded', () => {
    gsap.registerPlugin(ScrollTrigger);
    gsap.registerPlugin(ScrollToPlugin);

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
    const $depth2 = document.querySelector('#gnb2Depth');
    const topButton = document.querySelector('.top-btn');
    let winWidth = window.innerWidth;
    let winHeight = window.innerHeight;
    let contWidth = moveBox.clientWidth;
    let contHeight = moveBox.clientHeight;
    let isMoving = false;
    let isScrolling = false;
    let currentSectionIndex = 0;
    let tl;

    let globalSlider;
    let initialGroupIndex = 0;
    let groupIndex;

    const globalMapSlider = new Swiper('.main-global__bg', {
        slidesPerView: 'auto',
        loop: false,
        speed: 600,
        effect: 'fade',
        fadeEffect: {
            crossFade: true,
        },
        allowTouchMove: false,
        parallax: true,
        grabCursor: false,
    });

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

    const mouseMoveHandler = (e) => {
        const nowX = (-1 + (e.pageX / winWidth) * 2).toFixed(2);
        const nowY = (1 - (e.pageY / winHeight) * 2).toFixed(2);
        let movePositionX;
        const movePositionY = nowY * ((contHeight + 20 - winHeight) / 2);

        if (winWidth < contWidth) {
            movePositionX = -1 * (nowX * ((contWidth + 70 - winWidth) / 2));
        } else {
            movePositionX = nowX * ((contWidth + 70 - winWidth) / 2);
        }

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

    const initAnimation = () => {
        tl = gsap.timeline({
            scrollTrigger: {
                trigger: '.section--slogan',
                start: 'top bottom',
                end: 'bottom top',
                once: true,
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
                '+=0.2'
            )
            .to(
                '.highlight .bg',
                {
                    width: '100%',
                    duration: 0.6,
                    ease: 'power2.out',
                    stagger: 0.3,
                },
                '-=0.85'
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
                        backgroundColor: '#1F273B',
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
                    // stagger: 0,
                    ease: 'power1.in',
                },
                '-=3'
            )
            .to(
                '.main-slogan__marquee',
                {
                    opacity: 1, // opacity를 1로 설정
                    duration: 1, // opacity 변경 시간
                },
                '-=3' // 첫 번째 애니메이션과 겹치도록 설정
            )
            .to(
                '.main-slogan__image--scale',
                {
                    width: '101vw',
                    height: '100vh',
                    minWidth: '1680px',
                    borderRadius: '0%',
                    duration: 1, // scale 변경 시간
                    ease: 'power2.out', // 부드러운 애니메이션
                },
                '+=0' // opacity 애니메이션이 끝난 후 0.5초 지연
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
                        document.querySelector('.main-service').style.zIndex = '3'; // 원하는 z-index 값
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
        pauseOnMouseEnter: true,
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

                if (index === 0) {
                    header.classList.remove('header-sm');
                    header.style.display = 'block';
                    document.querySelector('.scroll-area').scrollTop = 0;
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

    window.addEventListener('load', setInitialPosition);
    window.addEventListener('scroll', setInitialPosition);
    window.addEventListener('wheel', handleWheel, { passive: false });
    window.addEventListener(
        'resize',
        debounce(() => {
            updateDimensions();
            handleWindowScroll();
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

    const swiperOptions = {
        slidesPerView: 'auto',
        spaceBetween: 20,
        on: {
            init: function () {
                const slides = document.querySelectorAll('.global-swiper .swiper-slide');
                slides.forEach((slide, index) => {
                    setTimeout(() => {
                        slide.classList.add('active');
                    }, index * 200);
                });
            },
            slideChange: function () {
                const currentSlide = this.slides[this.activeIndex];
                const currentGroup = currentSlide.getAttribute('data-group');

                // 그룹에 따라 globalMapSlider를 이동
                globalMapSlider.slideTo(currentGroup - 1);

                // 현재 슬라이드의 group에 맞는 버튼 활성화
                document.querySelectorAll('.group-button').forEach((button) => {
                    button.classList.toggle('active', button.dataset.group === currentGroup);
                });

                const lastGroup = Number(this.slides[this.slides.length - 1].getAttribute('data-group'));
                const slidesPerView = this.params.slidesPerView === 'auto' ? Math.floor(this.width / this.slides[0].swiperSlideSize) : this.params.slidesPerView;

                // lastGroup과 같은 data-group을 가진 슬라이드 개수 계산
                const lastGroupSlidesCount = this.slides.filter((slide) => Number(slide.getAttribute('data-group')) === lastGroup).length;

                // isEnd일 때 lastGroupSlidesCount가 slidesPerView보다 작은 경우
                if (this.isEnd) {
                    document.querySelectorAll('.group-button').forEach((button) => {
                        // lastGroupSlidesCount가 slidesPerView보다 작은 경우 마지막 그룹만 활성화
                        if (lastGroupSlidesCount < slidesPerView) {
                            button.classList.toggle('active', Number(button.dataset.group) === lastGroup);
                        } else {
                            // 일반 로직
                            button.classList.toggle('active', button.dataset.group === currentGroup);
                        }
                    });
                }
            },
        },
    };

    gsap.to('.section--global', {
        scrollTrigger: {
            trigger: '.section--global .title',
            scroller: '.scroll-area',
            start: 'bottom+=40px top',
            onEnter: () => {
                document.querySelector('.section--global').classList.add('active');
                document.querySelector('.main-global__btnlist').classList.add('active');
                globalSlider = new Swiper('.global-swiper', swiperOptions);

                if (initialGroupIndex !== null) {
                    const slides = document.querySelectorAll(`.global-swiper .swiper-slide[data-group="${initialGroupIndex}"]`);

                    if (slides.length > 0) {
                        const firstSlide = slides[0];
                        const allSlides = Array.from(globalSlider.slides);
                        const firstSlideIndex = allSlides.indexOf(firstSlide);

                        globalSlider.slideTo(firstSlideIndex);
                        globalMapSlider.slideTo(groupIndex - 1);
                        firstSlide.classList.add('swiper-slide-active');
                        globalSlider.update();
                        globalMapSlider.update();
                    }
                }
            },
            markers: false,
            once: true,
        },
    });

    document.querySelectorAll('.group-button').forEach((button) => {
        button.addEventListener('click', function () {
            groupIndex = this.dataset.group;
            initialGroupIndex = groupIndex;

            const slides = document.querySelectorAll(`.global-swiper .swiper-slide[data-group="${groupIndex}"]`);
            const parentLi = this.closest('li');
            const siblingButtons = parentLi.parentElement.querySelectorAll('li button');

            siblingButtons.forEach((siblingButton) => {
                siblingButton.classList.remove('active');
            });

            this.classList.add('active');

            if (slides.length > 0) {
                const firstSlide = slides[0];
                const allSlides = Array.from(globalSlider.slides);
                const firstSlideIndex = allSlides.indexOf(firstSlide);

                const activeSlides = document.querySelectorAll('.swiper-slide-active');
                activeSlides.forEach((slide) => {
                    slide.classList.remove('swiper-slide-active');
                });

                globalSlider.slideTo(firstSlideIndex);
                globalMapSlider.slideTo(groupIndex - 1);
                firstSlide.classList.add('swiper-slide-active');
                globalSlider.update();
                globalMapSlider.update();
            } else {
                console.log(`그룹 ${groupIndex}에 슬라이드가 없습니다.`);
            }
        });
    });

    topButton.addEventListener('click', () => {
        goToSection(0);
    });
    initAnimation();
    goToSection(currentSectionIndex);
});
