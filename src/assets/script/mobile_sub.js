document.addEventListener('DOMContentLoaded', function () {
    const $plusIcon = document.querySelectorAll('.examine__plus');
    const $closeButton = document.querySelectorAll('.examine__hideclose');
    const $topButton = document.querySelector('.top-btn button');

    $topButton.addEventListener('click', function () {
        window.scrollTo(0, 0);
    });

    let examineSwiper = new Swiper('.examine__function', {
        slidesPerView: 'auto',
        spaceBetween: 20,
    });

    let banner_swiper = new Swiper('.slide-banner', {
        pagination: {
            el: '.swiper-pagination',
        },
        autoplay: {
            delay: 3000,
        },
        loop: true,
        speed: 800,
    });

    let advanSwiper = new Swiper('.advantage-slide', {
        slidesPerView: 'auto',
        spaceBetween: 20,
        pagination: {
            el: '.advantage-slide__progres',
            type: 'progressbar',
        },
    });
    let commsSwiper = new Swiper('.comms-slide', {
        slidesPerView: 'auto',
        spaceBetween: 20,
        pagination: {
            el: '.comms-slide__progres',
            type: 'progressbar',
        },
    });

    function toggleElement(e, target) {
        let toggleHeight = target.scrollHeight;

        if (target.classList.contains('active')) {
            e.target.classList.remove('active');
            target.classList.remove('active');
            target.lastElementChild.classList.remove('active');
            target.style.height = `0px`;
        } else {
            e.target.classList.add('active');
            target.classList.add('active');
            target.lastElementChild.classList.add('active');
            target.style.height = `${toggleHeight}px`;
        }
    }

    $plusIcon.forEach((icon) => {
        icon.addEventListener('click', function (e) {
            const $target = this.parentNode.nextElementSibling;
            toggleElement(e, $target);
        });
    });

    $closeButton.forEach((icon) => {
        icon.addEventListener('click', function (e) {
            const $target = this.parentNode;

            // 이전 형제 요소가 존재하는지 확인
            if ($target.previousElementSibling) {
                toggleElement(e, $target);
                const $previousSibling = $target.previousElementSibling;
                if ($previousSibling.lastElementChild) {
                    $previousSibling.lastElementChild.classList.remove('active');
                }
            }
        });
    });
});
