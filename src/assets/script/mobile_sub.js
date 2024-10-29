document.addEventListener('DOMContentLoaded', function () {
    const $plusIcon = document.querySelectorAll('.examine__plus');
    const $closeButton = document.querySelectorAll('.examine__hideclose');

    let examineSwiper = new Swiper('.examine__function', {
        slidesPerView: 'auto',
        spaceBetween: 20,
    });

    // $plusIcon.forEach((icon) => {
    //     icon.addEventListener('click', function (e) {
    //         const $target = this.parentNode.nextElementSibling;
    //         let toggleHeight = this.parentNode.nextElementSibling.scrollHeight;

    //         if ($target.classList.contains('active')) {
    //             e.target.classList.remove('active');
    //             $target.classList.remove('active');
    //             $target.lastElementChild.classList.remove('active');
    //             this.parentNode.nextElementSibling.style.height = `0px`;
    //         } else {
    //             e.target.classList.add('active');
    //             $target.classList.add('active');
    //             $target.lastElementChild.classList.add('active');
    //             this.parentNode.nextElementSibling.style.height = `${toggleHeight}px`;
    //         }
    //     });
    // });

    // $closeButton.forEach((icon) => {
    //     icon.addEventListener('click', function (e) {
    //         const $target = this.parentNode;
    //         let toggleHeight = $target.scrollHeight;

    //         if ($target.classList.contains('active')) {
    //             e.target.classList.remove('active');
    //             $target.classList.remove('active');
    //             $target.previousElementSibling.lastElementChild.classList.remove('active');
    //             $target.style.height = `0px`;
    //         } else {
    //             e.target.classList.add('active');
    //             $target.classList.add('active');
    //             $target.previousElementSibling.lastElementChild.classList.add('active');
    //             $target.style.height = `${toggleHeight}px`;
    //         }
    //     });
    // });

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
