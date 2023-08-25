const editBtn = document.querySelector('.edit');
const deletetBtn = document.querySelector('.delete');
const noteEl = document.querySelector('.notes');
const mainEl = noteEl.querySelector('.main');
const textareaEl = noteEl.querySelector('textarea');


editBtn.addEventListener('click', () => {
    mainEl.classList.toggle('hidden');
    textareaEl.classList.toggle('hidden');
    const content = textareaEl.value

    mainEl.innerHTML = marked.parse(content);
})

textareaEl.addEventListener('click', (e) => {
    const {value} = e.target;

    mainEl.innerHTML = marked.parse(value);
})
