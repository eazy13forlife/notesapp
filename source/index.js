import{createNote,deleteAllNotes,refreshNotes} from "./notes.js"
import{setFilters} from "./filters.js"
import{displayNotes} from "./views.js"


const addFormEl=document.querySelector("#add_form");
const notesFormEl=document.querySelector("#notes_form")
const addNoteButton=document.querySelector("#add_note_button")
  const allSpans=document.querySelectorAll(".dim-body");

const dimPage=()=>{
  allSpans.forEach((span)=>{
    span.style.display="block";
  })
}

const lightPage=()=>{
  allSpans.forEach((span)=>{
    span.style.display="none";
  })
}
//display notes from the getgo so we can see them
displayNotes();

//Input event listener for note search
document.querySelector("#notes_search").addEventListener("input",(e)=>{
  setFilters({
    searchText:e.target.value,
  });
  displayNotes();
})

//Input event listener for submit note form
document.querySelector("#notes_form").addEventListener("submit",(e)=>{
  e.preventDefault();
  createNote(e);
  displayNotes();
  e.target.elements.add_notes.value="";
  e.target.elements.add_notes_body.value="";
  notesFormEl.setAttribute("style","display:none")
})

//change event for hide random noteCheckbox
document.querySelector("#hide_all").addEventListener("change",(e)=>{
  setFilters({
    hideAll:e.target.checked,
  });
  displayNotes();
})

//change event for delete all notes
document.querySelector("#delete_all").addEventListener("click",(e)=>{
deleteAllNotes();
})

//add change event for selectbox
document.querySelector("#sort_by").addEventListener("change",(e)=>{
  setFilters({
    sortBy:e.target.value,
  });
  displayNotes();


})
//add storage event for window
window.addEventListener("storage", (e)=>{
  console.log(e.newValue);
  if(e.key==="notes"){
  refreshNotes();
  displayNotes();
}
})
//event listener when i click add button. a form appears in the middle of the page
addFormEl.addEventListener("click",(e)=>{
  notesFormEl.setAttribute("style","display:block");
  dimPage();
})

//event listener for when i click anything on the page, remove the form in the middle of the page
document.querySelector("html").addEventListener("click",(e)=>{
  const id=e.target.id
  if(id==="add_notes"||id==="add_notes_body"||id==="add_form"){
    notesFormEl.setAttribute("style","display:block")
  }else{
    notesFormEl.setAttribute("style","display:none");
    lightPage();
  }
})
