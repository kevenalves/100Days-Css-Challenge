const $count = document.querySelector('.count');

let Countnumber = 0;

const updateCount = (num) => {

	Countnumber += num;
    
	const toDelete = $count.querySelector('.old');

	if (toDelete) {
		toDelete.remove();
	}

	const oldElm = $count.firstElementChild;
	oldElm.classList.remove('number');
	oldElm.classList.add('old');
	
	const newElm = document.createElement('div');
	const upOrDown = num > 0 ? 'up' : 'down';
	newElm.classList.add('number', upOrDown);
	newElm.appendChild(document.createTextNode(Countnumber));
	
	$count.appendChild(newElm);
};

document.querySelector('.counter').addEventListener('click', e => {
	if (e.target.className === 'minus') {
		updateCount(-1);
	} else if (e.target.className === 'plus') {
		updateCount(1);
	}
});
