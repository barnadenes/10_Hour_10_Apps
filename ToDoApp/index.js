const TDListEl = document.querySelector(".todo-list");
const inputEl = document.querySelector("#todo-input");
const formEl = document.querySelector(".formEl");
const ULEl = TDListEl.querySelector("ul");

formEl.addEventListener("submit", (e) => {
  e.preventDefault();

  addToDo();
});

function addToDo() {
  const inputText = inputEl.value;
  const liEl = document.createElement("li");
  const hrEl = document.createElement("hr");

  if (inputText) {
    liEl.innerText = inputText;
    ULEl.appendChild(liEl);
    ULEl.appendChild(hrEl);

    inputEl.value = "";

    liEl.addEventListener("click", () => {
      liEl.classList.toggle("cross");
      updateLS();
    });

    liEl.addEventListener("contextmenu", (e) => {
      e.preventDefault();

      liEl.remove();
      hrEl.remove();
      updateLS();
    });
  }
  updateLS();
}

function updateLS() {
  const notesEl = document.querySelectorAll('li');
  const notes = [];

  notesEl.forEach((note) => {
    notes.push({
      text: note.innerText,
      completed: note.classList.contains('cross')
    });
  });

  localStorage.setItem('notes', JSON.stringify(notes));
}
