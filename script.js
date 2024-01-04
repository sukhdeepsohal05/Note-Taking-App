const addNoteBtn = document.querySelector(".add-note__btn");

const textValue = document.querySelectorAll("textarea").value;

if (textValue == " ") {
  console.log("hello");
} else {
  const updateLSData = () => {
    const textAreaData = document.querySelectorAll("textarea");
    const notes = [];
    textAreaData.forEach((note) => {
      return notes.push(note.value);
    });
    localStorage.setItem("notes", JSON.stringify(notes));
  };

  const addNote = (text = "") => {
    const note = document.createElement("div");
    note.classList.add("note");

    const htmlData = `
        <div class="operation">
        <button class="edit-button"></button>
        <button class="delete-button"></button>
        </div>
        <textarea ${text && "disabled"}></textarea>`;

    note.innerHTML = htmlData;
    document.querySelector(".notes__container").appendChild(note);

    const editButton = note.querySelector(".edit-button");
    const delButton = note.querySelector(".delete-button");
    const textArea = note.querySelector("textarea");

    textArea.focus();

    // Editing note
    editButton.addEventListener("click", () => {
        textArea.toggleAttribute("disabled");
        textArea.focus();
      updateLSData();
    });

    // Deleting note
    delButton.addEventListener("click", () => {
      note.remove();
      updateLSData();
    });

    textArea.value = text;
  };

  const notes = JSON.parse(localStorage.getItem("notes"));
  if (notes) {
    notes.forEach((note) => addNote(note));
  }

  addNoteBtn.addEventListener("click", () => {
    addNote();
  });
}
