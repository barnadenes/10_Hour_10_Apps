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

  let mainEl = notes.querySelector(".main");
  let textareaEl = notes.querySelector("textarea");

  notes.addEventListener("click", (e) => {
    if (e.target.classList.contains("fa-trash")) {
      notes.remove();
    } else if (e.target.classList.contains("fa-edit")) {
      const content = textareaEl.value;
      mainEl.classList.toggle("hidden");
      textareaEl.classList.toggle("hidden");

      mainEl.innerHTML = marked.parse(content);
      if (content === null || content === undefined) {
        return "";
      }
    } 
  });
}

addBtn.addEventListener("click", () => {
  createNote();
});
