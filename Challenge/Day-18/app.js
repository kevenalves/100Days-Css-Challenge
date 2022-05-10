const $button = document.querySelector('.button');
const $modal = document.querySelector('.modal');

$button.addEventListener('click', function(){
    $modal.classList.add('hide');
});