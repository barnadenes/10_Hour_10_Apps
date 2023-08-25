const addBtn = document.querySelector(".add");

function createNote() {
  const notes = document.createElement("div");
  notes.classList.add("notes");

  notes.innerHTML = `<div class="tools">
    <button class="edit">
      <i class="fas fa-edit"></i>
    </button>
    <button class="delete">
      <i class="fas fa-trash"></i>
    </button>
  </div>
  <div class="main hidden"></div>
  <textarea></textarea>`;

  document.body.appendChild(notes);

  let editBtn = document.querySelector(".edit");
  let deletetBtn = document.querySelector(".delete");
  let mainEl = notes.querySelector(".main");
  let textareaEl = notes.querySelector("textarea");

  editBtn.addEventListener("click", () => {
    mainEl.classList.toggle("hidden");
    textareaEl.classList.toggle("hidden");
    const content = textareaEl.value;

    mainEl.innerHTML = marked.parse(content);
  });

  notes.addEventListener("click", (e) => {
    if(e.target.classList.contains('fa-trash')) {
        notes.remove();
    }
    
  });

  textareaEl.addEventListener("click", (e) => {
    const { value } = e.target;

    mainEl.innerHTML = marked.parse(value);
  });
}

addBtn.addEventListener("click", () => {
  createNote();
});
