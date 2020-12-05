import{findNote,saveNotesLocal,deleteNote}from "./notes.js"
import moment from "moment";

const editTitleEl=document.querySelector("#edit_title");
const editBodyEl=document.querySelector("#edit_body");
const updateNoteFormEl=document.querySelector("#update_notes_form");
const removeNoteButton=document.querySelector("#remove_note");
const updatedEl=document.querySelector("#updated_when")


//get the noteId of the specific element that was clicked on
const noteId=location.hash.substring(1);

//find the specific Note element
let note=findNote(noteId);

//populate the fields with their respective content
editTitleEl.value=note.title;
editBodyEl.value=note.body;
updatedEl.textContent=`updated ${moment(note.updatedAt).fromNow()}`;

//add event listener for updateNote
updateNoteFormEl.addEventListener("submit",(e)=>{
  e.preventDefault();
  note.title=editTitleEl.value;
  note.body=editBodyEl.value;
  note.updatedAt=moment.valueOf();
  saveNotesLocal();
  location.assign("../../public/index.html");
})

//add event listener for removeNoteButton
removeNoteButton.addEventListener("click",(e)=>{
  deleteNote(noteId);
  location.assign("../../public/index.html");
})
