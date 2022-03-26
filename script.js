const addNoteBtn = document.querySelector('.add-note');


const textValue = document.querySelectorAll('textarea').value;
if (textValue == '') {
    console.log('hello');
} else {
    const updateLSData = () => {
        const textAreaData = document.querySelectorAll('textarea');
        const notes = [];
        textAreaData.forEach((note) => {
            return notes.push(note.value);
        })
        localStorage.setItem('notes', JSON.stringify(notes));   
    }
    
    
    const addNote = (text = '')=>{
        const note = document.createElement('div');
        note.classList.add('note');
        
        const htmlData = `
        <div class="operation">
        <button class="edit"></button>
        <button class="delete"></button>
        </div>
        <div class="main ${text ? '' : 'hidden'}"></div>
        <textarea class="${text ? 'hidden' : ''}"></textarea>`
        
        note.insertAdjacentHTML('afterbegin',htmlData);
        document.body.appendChild(note);
        
        
        const editButton = note.querySelector('.edit');
        const delButton = note.querySelector('.delete');
        const main = note.querySelector('.main');
        const textArea = note.querySelector('textarea');
        
        // Deleting note
        delButton.addEventListener('click', () =>{
            note.remove();
            updateLSData();
        });
        
        textArea.value = text;
        main.innerHTML = text;
        
        editButton.addEventListener('click', () => {
            main.classList.toggle('hidden');
            textArea.classList.toggle('hidden');
            updateLSData();
        })
        
        textArea.addEventListener('change', (event) => {
            const value = event.target.value;
            main.innerHTML = value;
        })
    }
    
    
    const notes = JSON.parse(localStorage.getItem('notes'));
    if (notes) {notes.forEach((note)=>addNote(note))}
    
    addNoteBtn.addEventListener('click', ()=> {addNote()});
}