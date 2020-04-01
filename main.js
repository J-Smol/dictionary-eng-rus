const engWord = document.getElementById('eng'),
	  rusWord = document.getElementById('rus'),
	  inputs = document.getElementsByClassName('input'),
	  addBtn = document.getElementById('add__word_btn'),
	  table = document.getElementById('table');

let words,
	btnsDelete;

localStorage.length < 1 ? words = [] : words = JSON.parse(localStorage.getItem('words'));

const addWordToTable = index => {
	table.innerHTML += `
		<tr class="tr">
			<td class="eng__word">${words[index].english}</td>
			<td class="rus__word">${words[index].russian}</td>
			<td>
				<button class="btn__delete">X</button>
			</td>
		</tr>
	`
}

words.forEach((el, i) => {
	addWordToTable(i);
});

function CreateWord (eng, rus) {
	this.english = eng;
	this.russian = rus;
}

addBtn.addEventListener('click', () => {
	if (
		engWord.value.length < 1 || 
		rusWord.value.length < 1 ||
		!isNaN(engWord.value) || 
		!isNaN(rusWord.value)
	) {
		for (let i of inputs) {
			i.classList.add('error');
		}
	} else {
		for (let i of inputs) {
			i.classList.remove('error');
		}
		words.push(new CreateWord(engWord.value, rusWord.value));
		localStorage.setItem('words', JSON.stringify(words));
		addWordToTable(words.length - 1);
		engWord.value = null;
		rusWord.value = null;
		addEventDelete();
	}
});

const deleteWord = e => {
	const wordIndex = e.target.closest('.tr').rowIndex;
	e.target.closest('.tr').remove();
	words.splice(wordIndex, 1);
	localStorage.removeItem('words');
	localStorage.setItem('words', JSON.stringify(words));
}

const addEventDelete = () => {
	if (words.length > 0) {
		btnsDelete = document.querySelectorAll('.btn__delete');
		for (let btn of btnsDelete) {
			btn.addEventListener('click', e => {
				deleteWord(e);
			})
		}
	}
}

addEventDelete();









