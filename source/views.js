import {getFilters} from "./filters.js"
import {sortNotes,deleteNote,notes} from "./notes.js"
import {loadNotes} from "./notes.js"

//i exported notes array from notes.js,so we have a global notes now on this page. and since notes equals an object(array) and objects are stored as reference, any update to this notes array in notes.js will affect the note array everywhere. So on this file, whenever note is used, it is the most up to date note array from note.js


//Display notes to the screen
const displayNotes=()=>{
  const filters=getFilters();
  let sortedNotes=sortNotes(filters);
  const filteredNotes= sortedNotes.filter((item)=>item.title.toLowerCase().includes(filters.searchText.toLowerCase()));

  //clear the screen before writing the filtered note
  document.querySelector("#note_container").textContent="";

  // create the number-of-notes-message DOM element and write to screen
  if(filters.searchText!==""){
  document.querySelector("#note_container").appendChild(generateFilteredNotesMessage(filteredNotes));
}
  //create the note DOM element for each filtered note and write to the screen
  filteredNotes.forEach((item)=>{
    const noteElement=generateNoteElement(item);
    if(filters.hideAll!==true){
      document.querySelector("#note_container").appendChild(noteElement);
    };
})
totalNotesMessage();
}

//Generate note item DOM element
const generateNoteElement=(item)=>{
  //create note Elements
  const noteDiv=document.createElement("div");
  const noteDelete=document.createElement("button")
  const noteElement=document.createElement("a");
  //add textContent to noteDelete
  noteDelete.textContent="X";
  noteDelete.classList.add("delete-button")
  //add textContent to noteElement;
  item.title.trim()===""?noteElement.textContent="blank note":
  noteElement.textContent=item.title

  //add class to generateNoteElement
  noteDiv.setAttribute("class","note-div");
  noteElement.setAttribute("href",`edit.html#${item.id}`);
  //add click event for noteDelete to delete the note
  noteDelete.addEventListener("click",(e)=>{
    deleteNote(item.id);
    displayNotes();
  })
  //append elements to noteDiv
  noteDiv.appendChild(noteDelete);
  noteDiv.appendChild(noteElement);
  //return noteDiv
  return noteDiv;
}

//Generate number-of-notes-match-message DOM element
const generateFilteredNotesMessage=(filteredNotes)=>{
  const numberOfFilteredNotesMessage=document.createElement("h2");
  if(filteredNotes.length===0){
  numberOfFilteredNotesMessage.textContent=`0 notes match`;
  }else if(filteredNotes.length===1){
  numberOfFilteredNotesMessage.textContent=`1 note matches`;
  }else{
  numberOfFilteredNotesMessage.textContent=` ${filteredNotes.length} notes match`;
  }
  return numberOfFilteredNotesMessage;
}

//total Notes message DOM element
const totalNotesMessage=()=>{
  const totalElement=document.querySelector("#note_length");
  if(notes.length===0){
    totalElement.textContent=`0`;
  }
  totalElement.textContent=`${notes.length}`;
  }

  export{displayNotes}
