const $profile = document.querySelectorAll('.profile');
const $detail = document.querySelector('.detail');
const $close = document.querySelector('.close');

function addActive(i) {
    return function() {
        this.profile =  $detail.classList.add('active');
    }
}

for(var i=0; i<$profile.length; i++) {
    $profile[i].onclick = addActive(i);
}

$close.addEventListener('click', function () {
    $detail.classList.remove('active');
})