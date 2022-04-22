let menu = document.querySelector('.menu-icon');
let noAnimation = document.querySelectorAll('.no-animation')

menu.addEventListener('click', function(){
    menu.classList.toggle('active');

    for(let i = noAnimation.length - 1; i>= 0; i-- ){
        noAnimation[i].classList.remove('no-animation');
    }
});