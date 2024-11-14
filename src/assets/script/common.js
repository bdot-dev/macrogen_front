document.addEventListener('DOMContentLoaded', function () {
    const $familyButton = document.querySelector('.footer__button');
    const $familyToggle = document.querySelector('.footer__toggle');
    const header = document.getElementById('header');

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
    document.querySelector('.top-btn').addEventListener('click', function () {
        window.scrollTo({
            top: 0,
            behavior: 'smooth',
        });
        header.style.display = 'block';
    });
});
