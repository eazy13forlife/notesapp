import{createNote,deleteAllNotes,refreshNotes} from "./notes.js"
import{setFilters} from "./filters.js"
import{displayNotes} from "./views.js"




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
