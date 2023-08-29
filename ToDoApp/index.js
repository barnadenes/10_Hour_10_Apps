const TDListEl = document.querySelector('.todo-list');
const inputEl = document.querySelector('#todo-input');
const formEl = document.querySelector('.formEl');
const ULEl = TDListEl.querySelector('ul');

formEl.addEventListener('submit', (e) => {
  e.preventDefault();

  const inputText = inputEl.value;

  if(inputText) {
    const liEl = document.createElement('li');
    const hrEl = document.createElement('hr');
    liEl.innerText = inputText;
    ULEl.appendChild(liEl);
    ULEl.appendChild(hrEl);
  }

})

