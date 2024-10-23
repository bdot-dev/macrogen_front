document.addEventListener('DOMContentLoaded', function () {
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

    const $plusIcon = document.querySelectorAll('.examine__plus');

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
});

// $(function () {
//     $('.examine__hidewrap').hide();
//     let examinePlus = $('.examine__plus');
//     examinePlus.on('click', function () {
//         let content = $(this).parent().parent().find('.examine__hidewrap');
//         let icons = $(this).find('img');
//         if (content.is(':visible')) {
//             content.slideUp('slow');
//             icons.attr('src', '../resources/assets/images/sub/plus.svg');
//         } else {
//             content.slideDown('slow');
//             icons.attr('src', '../resources/assets/images/sub/minus.svg');
//         }
//     });
// });
