const $searchIcon = document.querySelector('.search-icon');
const $searchInput = document.querySelector('.search-input');

$searchIcon.addEventListener('click', function () {
    $searchInput.classList.toggle('active');
})

const $menuIcon = document.querySelector('.menu-icon');
const $painel = document.querySelector('.panel');
const $menu = document.querySelector('.menu');

$menuIcon.addEventListener('click', function () {
    $painel.classList.toggle('show-menu');
    $menu.classList.toggle('active');
})

// INITIAL FETCH
function search() {

    fetch(`https://api.github.com/users/kevenalves/repos`)
        .then(response => {
            if (!response.ok) {
                throw new Error(`http error: status ${response.status}`)
            }
             return response.json();
        })
        .catch(error => {
            console.log(error.message)
        })
        .then(response => {
            organizeRepo(response);
        });
}
search();

// SearchUser
$searchInput.addEventListener('keydown', function (event) {
    if (event.keyCode === 13) {
        $nameUser = $searchInput.value;

        fetch(`https://api.github.com/users/${$nameUser}/repos`)
        .then(response => {
            if (!response.ok) {
                throw new Error(`http error: status ${response.status}`)
            }
            return response.json();
        })
        .catch(error => {
            console.log(error.message)
        })
        .then(response => {
            organizeRepo(response);
        });
    }   
});

//organize repository by commit date
function organizeRepo(itens) {
    
    let selectInfo = [];
    itens.forEach(i => {
        let editDataHour = i.pushed_at.split('T',2);
        let dataRepo = editDataHour[0].split("-").reverse().join("/");
        let id = editDataHour[0].split("-").join("");
        let user = i.owner.login;
        selectInfo.push(`${parseInt(id)} ${dataRepo} ${i.name} ${user}`);
    });

    let transformArray = [];
    selectInfo.forEach(i => {
        transformArray.push( i.split(" "));
    });

    function sortfunction(a, b){
        return a[0] - b[0]
    }
    transformArray.sort(sortfunction).reverse();

    selectArray(transformArray);
}

// The three most recently modified repositories
function selectArray(array){
    const threeRepos = array.slice(0, 3);
    
    setData(threeRepos);
}

// show items on screen
let $data = document.querySelectorAll('.data');
let $nameRepo = document.querySelectorAll('.name-repo');
let $user = document.querySelectorAll('.user');

function setData (itens) {
    for(i = 0; i <= 3; i++){
        $data[i].innerText = itens[i][1];
        $nameRepo[i].innerText = itens[i][2];
        $user[i].innerText = itens[i][3];
    }
}