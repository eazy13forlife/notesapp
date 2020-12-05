import {v4 as uuidv4} from "uuid";
import moment from "moment";
import{displayNotes}from"./views.js"


//Get our notes Array from Local Storage
const loadNotes=()=>{
  const notesString=localStorage.getItem("notes");
  return notesString? JSON.parse(notesString):[];
}

//expose notes from Module
let notes=loadNotes();

//refresh notes, so that we can use it in localStorage
const refreshNotes=()=>{
  notes=loadNotes();
}
//Save the notes to local storage
const saveNotesLocal=()=>{
    localStorage.setItem("notes",JSON.stringify(notes));
}

const createNote=(e)=>{
  notes.push({
    id:uuidv4(),
    title:e.target.elements.add_notes.value,
    body:e.target.elements.add_notes_body.value,
    textTitle:e.target.elements.add_notes.value,
    textBody:e.target.elements.add_notes_body.value,
    createdAt:moment().valueOf(),
    updatedAt:moment().valueOf(),
  })
  saveNotesLocal();
}

//Delete note from notes array when click button
const deleteNote=(id)=>{
  const index=notes.findIndex((item)=>item.id===id);
  if(index!==-1){
    notes.splice(index,1);
    saveNotesLocal();
  }
}

//find and return the note from our notes object when we pass in an id
const findNote=(id)=>{
  return notes.find((note)=>note.id===id)
}
//delete all notes
const deleteAllNotes=()=>{
  notes=[];
  saveNotesLocal();
  displayNotes();
}

//sortBy last edited, recently created, or alphabetically function
const sortNotes=(filters)=>{
  if(filters.sortBy==="lastEdited"){
    return notes.sort((a,b)=>{
      if(a.updatedAt>b.updatedAt){
        return -1;
      }else if(b.updatedAt>a.updatedAt){
        return 1;
      }else{
        return 0;
      }
    })
  }else if(filters.sortBy==="recentlyCreated"){
    return notes.sort((a,b)=>{
      if(a.createdAt>b.createdAt){
        return -1;
      }else if(b.createdAt>a.createdAt){
        return 1;
      }else{
        return 0;
      }
    })
  }else if(filters.sortBy==="alphabetically"){
    return notes.sort((a,b)=>{
      if(a.title.toLowerCase()<b.title.toLowerCase()){
        return -1;
      }else if(b.title.toLowerCase()<a.title.toLowerCase()){
        return 1;
      }else{
        return 0;
      }
    })
  }else{
  return notes;
  }
}


export{createNote,deleteNote,sortNotes,findNote,notes,deleteAllNotes,refreshNotes,saveNotesLocal}
