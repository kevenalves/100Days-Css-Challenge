'use strict'


// add Date
let date = new Date();

const $subtitle = document.querySelector('.subtitle');
$subtitle.innerText = dateBuilder(date);


// format the date
function dateBuilder(d) {

    let MyDateString = ('0' + d.getDate()).slice(-2) + '/' + ('0' + (d.getMonth() + 1)).slice(-2) + '/' + d.getFullYear();

    return MyDateString;
}

let banco = [];
const getBanco = () => JSON.parse(localStorage.getItem('todoList')) ?? []

const setBanco = (banco) => localStorage.setItem('todoList', JSON.stringify(banco))

const criarItem = (tarefa, status, indice) => {
    const item = document.createElement('label')

    item.classList.add('todo__item')

    item.innerHTML = `
        <input type="checkbox" ${status} data-indice=${indice}>
        <div>${tarefa}</div>
        <input type="button" value="X" data-indice=${indice}>
    `
    document.getElementById('todoList').appendChild(item)
}

const limparTarefas = () => {
    const todoList = document.getElementById('todoList')

    while (todoList.firstChild) { todoList.removeChild(todoList.lastChild) }
}

const atualizarTela = () => {
    limparTarefas()
    const banco = getBanco()
    banco.forEach ( (item, indice) => criarItem (item.tarefa, item.status, indice))
}

const inserirItem = (evento) => {
    const tecla = evento.key

    const texto = evento.target.value

    if (tecla === 'Enter') {
        const banco = getBanco()

        banco.push ({'tarefa': texto, 'status': ''})

        setBanco(banco)

        atualizarTela()
    
        evento.target.value = ''
    }

}

const removerItem = (indice) => {

    const banco = getBanco()

    banco.splice (indice, 1)

    setBanco(banco)

    atualizarTela()

}

const atualizarItem = (indice) => {
    const banco = getBanco()
    banco[indice].status = banco[indice].status === '' ? 'checked' : ''
    setBanco(banco)
    atualizarTela()
}

const clickItem = (evento) => {

    const elemento = evento.target

    if (elemento.type === 'button') {
        const indice = elemento.dataset.indice
        removerItem (indice)
    }else if (elemento.type === 'checkbox') {
        const indice = elemento.dataset.indice
        atualizarItem (indice)
    }
}

const PopularLista = () => {
    const banco = getBanco()

    if(banco == ''){
        banco.push (
            {'tarefa': 'Create a list', 'status': 'checked'},
            {'tarefa': 'Complete first task', 'status': ''},
            {'tarefa': 'Write some CSS code', 'status': ''},
            {'tarefa': 'Amaze the world', 'status': ''},
            );
    } else{
        return;
    }

    setBanco(banco);

}

PopularLista();

document.getElementById('newItem').addEventListener('keypress', inserirItem)
document.getElementById('todoList').addEventListener('click', clickItem)

atualizarTela()