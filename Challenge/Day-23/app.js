const $btn = document.getElementById("btn");
const $card = document.getElementById("card");
const $title = document.getElementById("title");
const $subText = document.getElementById("sub-text");
const $count = document.getElementById("count");

let index = 0;

const dataArray = [
	["The couch", "If you want to grow, get outside your comfort zone."],
	[
		"Failing is learning",
		"Pick yourself up, dust yourself off, and start again."
	],
	["Flowers and rainbows", "Always be yourself, unless you can be a unicorn."]
];

const cardChange = () => {
	$card.classList.remove("animation");
	setTimeout(() => {
		$card.classList.add("animation");
	}, 10);

	index = ++index % 3;
	setTimeout(() => {
		$title.innerHTML = dataArray[index][0];
		$subText.innerHTML = dataArray[index][1];
		$count.innerHTML = index + 1;
	}, 500);
};

$btn.addEventListener("click", cardChange);
