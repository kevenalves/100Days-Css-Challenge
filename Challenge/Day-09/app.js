const $searchIcon = document.querySelector('.search-icon');
const $searchInput = document.querySelector('.search-input');

$searchIcon.addEventListener('click', function() {
    $searchInput.classList.toggle('active');
})

const $menuIcon = document.querySelector('.menu-icon');
const $painel = document.querySelector('.panel');
const $menu = document.querySelector('.menu');

$menuIcon.addEventListener('click', function() {
    $painel.classList.toggle('show-menu');
    $menu.classList.toggle('active');
})