const addBtn = document.querySelector(".add");
const LSData = localStorage.getItem("text");

//CREATE NOTE
function createNote(text = "") {
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
  <div class="main hidden">${text}</div>
  <textarea>${text}</textarea>`;

  document.body.appendChild(notes);

  const mainEl = notes.querySelector(".main");
  const textareaEl = notes.querySelector("textarea");
  addLS(textareaEl.value);

  // REMOVE
  notes.addEventListener("click", (e) => {
    if (e.target.classList.contains("fa-trash")) {
      notes.remove();
      removeLS(notes);

      // EDIT-PARSE
    } else if (e.target.classList.contains("fa-edit")) {
      const content = textareaEl.value;
      mainEl.classList.toggle("hidden");
      textareaEl.classList.toggle("hidden");
      addLS(content);

      mainEl.innerHTML = marked.parse(content);
      if (content === null || content === undefined) {
        return "";
      }
    }
  });
}

// ADD NOTE
addBtn.addEventListener("click", () => {
  createNote((text = ""));
});

// GET
function getLS() {
  const textArr = JSON.parse(localStorage.getItem("text"));

  return textArr === null  ? [] : textArr;
}

// ADD
function addLS(newText) {
  const items = getLS();

  if (items && !items.includes(newText)) {
    localStorage.setItem("text", JSON.stringify([...items, newText]));
  } else {
    return "";
  }
}

// DEL
function removeLS(remove) {
  const textArr = getLS();

  localStorage.setItem(
    "text",
    JSON.stringify(textArr.filter((id) => id !== remove))
  );
}

// LOAD LAST SESSION
function preLoad() {
  const localText = getLS();

  localText.forEach((text) => {
    createNote(text);
  });
}

preLoad();
