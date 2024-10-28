document.addEventListener('DOMContentLoaded', function () {
    const topButton = document.querySelector('.top-btn');
    const contactButton = document.querySelector('.contact-btn');
    const footer = document.querySelector('.footer');
    const $plusIcon = document.querySelectorAll('.examine__plus');

    let banner_swiper = new Swiper('.slide-banner', {
        navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev',
        },
        pagination: {
            el: '.swiper-pagination',
        },
        autoplay: {
            delay: 3000,
        },
        loop: true,
        speed: 1100,
    });
    let advanSwiper = new Swiper('.advantage-slide', {
        slidesPerView: 'auto',
        spaceBetween: 50,
        pagination: {
            el: '.advantage-slide__progres',
            type: 'progressbar',
        },
    });
    let commsSwiper = new Swiper('.comms-slide', {
        slidesPerView: 'auto',
        spaceBetween: 50,
        pagination: {
            el: '.comms-slide__progres',
            type: 'progressbar',
        },
    });

    $plusIcon.forEach((icon) => {
        icon.addEventListener('click', function (e) {
            const $target = this.parentNode.nextElementSibling;
            let toggleHeight = this.parentNode.nextElementSibling.scrollHeight;

            if ($target.classList.contains('active')) {
                e.target.classList.remove('active');
                $target.classList.remove('active');
                this.parentNode.nextElementSibling.style.height = `0px`;
            } else {
                e.target.classList.add('active');
                $target.classList.add('active');
                this.parentNode.nextElementSibling.style.height = `${toggleHeight}px`;
            }

            // this.parentNode.nextElementSibling.style.height = `${toggleHeight}px`;
        });
    });

    topButton.addEventListener('click', () => {
        window.scrollTo(0, 0);
    });

    const observer = new IntersectionObserver(
        (entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    contactButton.classList.add('fixed');
                } else {
                    contactButton.classList.remove('fixed');
                }
            });
        },
        {
            threshold: 0,
            rootMargin: '0px 0px -80px 0px',
        }
    );

    observer.observe(footer);
});
