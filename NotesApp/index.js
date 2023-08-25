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

  notes.addEventListener("click", (e) => {
    if(e.target.classList.contains('fa-trash')) {
        notes.remove();
    }
    else if(e.target.classList.contains('fa-edit')) 
    {
        mainEl.classList.toggle("hidden");
        textareaEl.classList.toggle("hidden");
        const { valueEl } = e.target;
        const content = textareaEl.valueEl;

        textareaEl.innerHTML = marked.parse(content);
        if(valueEl === null || valueEl === undefined) {
            return '';
        }
    }
    else if(e.target.contains(textareaEl)) {
        const content = textareaEl.valueEl;
        textareaEl.innerHTML = marked.parse(content);
        if(valueEl === null || valueEl === undefined) {
            return '';
        }
    }
  });

}

addBtn.addEventListener("click", () => {
  createNote();
});
