document.addEventListener('DOMContentLoaded', () => {
    const serviceButtons = document.querySelectorAll('.main-service__button li');
    const $topButton = document.querySelector('.top-btn button');
    const counters = document.querySelectorAll('.counting');
    let tl;

    gsap.registerPlugin(ScrollTrigger);
    gsap.registerPlugin(ScrollToPlugin);

    tl = gsap.timeline({
        scrollTrigger: {
            trigger: '.section--slogan',
            start: '20% bottom',
            end: '80% top',
            toggleActions: 'play reset restart reset',
        },
    });
    tl.to('.main-slogan', {
        backgroundColor: '#1F273C',
        duration: 2.5,
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
                    backgroundColor: '#fff',
                    duration: 0,
                    ease: 'power2.out',
                });
            },
        })
        .to(
            ['.main-slogan__marquee h4', '.main-slogan__imagewrap'], // 두 요소를 배열로 지정
            {
                opacity: 1,
                left: '50%',
                duration: 1.5,
                stagger: 0,
            }
        )
        .to(
            '.main-slogan__marquee',
            {
                opacity: 1, // opacity를 1로 설정
                duration: 1, // opacity 변경 시간
            },
            '-=1.5' // 첫 번째 애니메이션과 겹치도록 설정
        )
        .to(
            '.main-slogan__image--scale',
            {
                width: '101vw',
                height: '101vh',
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
                    document.querySelector('.main-service').style.zIndex = '3'; // 원하는 z-index 값
                },
            },
            '-=1' // 이전 애니메이션과 동시에 실행하려면 적절한 지점에서 설정
        )
        .add(() => {
            document.querySelector('.section--slogan').classList.toggle('animate-end'); // 원하는 클래스 이름으로 변경
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
    serviceButtons.forEach((btn, index) => {
        btn.addEventListener('click', () => {
            serviceSwiper.slideTo(index);
            serviceButtons.forEach((b) => b.classList.remove('active'));
            btn.classList.add('active');
        });
    });

    document.querySelector('.main-global__selecttext').addEventListener('click', function () {
        const optionList = document.querySelector('.main-global__optionlist');
        optionList.classList.toggle('active');
    });

    document.querySelectorAll('.main-global__optionlist li').forEach((option) => {
        option.addEventListener('click', function () {
            const selectedText = this.getAttribute('data-option');
            const selectedGroup = this.getAttribute('data-group');

            const selectText = document.querySelector('.main-global__selecttext');
            selectText.textContent = selectedText;
            selectText.setAttribute('data-text', selectedText);
            selectText.setAttribute('data-group', selectedGroup);

            document.querySelectorAll('.main-global__optionlist li').forEach((li) => {
                li.classList.remove('active');
            });

            this.classList.add('active');
            this.parentNode.classList.remove('active');

            const select = this.closest('.main-global__select');
            select.classList.remove('active');
        });
    });

    const globalSwiper = new Swiper('.global-swiper', {
        slidesPerView: 'auto',
        spaceBetween: 20,
    });

    $topButton.addEventListener('click', function () {
        window.scrollTo(0, 0);
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

    function startCounting(counterElement) {
        countToTarget(counterElement, parseInt(counterElement.getAttribute('data-count'), 10), 1200);
    }

    gsap.to('.section--info', {
        scrollTrigger: {
            trigger: '.section--info',
            start: 'center center',
            end: 'bottom top',
            onEnter: () => {
                document.querySelector('.section--info').classList.add('active');
                counters.forEach((counter) => {
                    if (counter.getAttribute('data-count')) {
                        startCounting(counter);
                    }
                });
            },
            once: true,
        },
    });
});
