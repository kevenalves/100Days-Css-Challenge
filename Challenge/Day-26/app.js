const $menuIcon = document.querySelector('.menu-icon');
const $menu = document.querySelector('.menu');

$menuIcon.addEventListener('click', () => {
    
    $menuIcon.classList.remove('paused');
    $menuIcon.classList.toggle('active');

    $menu.classList.remove('paused');
    $menu.classList.toggle('active');
})