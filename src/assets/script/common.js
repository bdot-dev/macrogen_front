document.addEventListener('DOMContentLoaded', function () {
    const $familyButton = document.querySelector('.footer__button');
    const $familyToggle = document.querySelector('.footer__toggle');

    $familyButton.addEventListener('click', function (e) {
        const $target = this.nextElementSibling;
        const menuHeight = $target.scrollHeight;
        if (this.classList.contains('active')) {
            this.classList.remove('active');
            this.nextElementSibling.style.height = 0 + 'px';
        } else {
            this.classList.add('active');
            this.nextElementSibling.style.height = menuHeight + 'px';
        }
    });

    document.documentElement.addEventListener('click', function (e) {
        if (!e.target.closest('.footer__select')) {
            $familyButton.classList.remove('active');
            if ($familyToggle) {
                $familyToggle.style.height = '0px';
            }
        }
    });

    const contactButton = document.querySelector('.contact-btn');
    const topButton = document.querySelector('.top-btn');
    const footer = document.querySelector('.footer');

    const observer = new IntersectionObserver(
        (entries) => {
            console.log(entries);
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    // 푸터가 화면에 나타나면 top 버튼을 absolute로 설정하여 멈춤
                    contactButton.style.position = 'absolute';
                    contactButton.style.bottom = `${footer.offsetHeight + 10}px`; // 푸터 바로 위에서 멈춤
                } else {
                    // 푸터가 화면에서 벗어나면 fixed로 설정하여 따라다니게 함
                    contactButton.style.position = 'fixed';
                    contactButton.style.bottom = '100px';
                }
            });
        },
        {
            threshold: 0,
            rootMargin: '0px 0px -100px 0px', // 하단에서 100px 만큼 여유를 두고 감지
        }
    );

    // footer 요소에 대해 IntersectionObserver 작동
    observer.observe(footer);

    // top 버튼 클릭 시 상단으로 이동
    topButton.addEventListener('click', () => {
        gsap.to(window, {
            scrollTo: {
                y: 0,
                autoKill: false,
            },
            duration: 1,
            ease: 'expo.inOut',
        });
    });
});
