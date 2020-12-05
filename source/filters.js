const filters={
  searchText:"",
  hideAll:false,
  sortBy:"lastEdited",
}

const getFilters=()=>filters;

const setFilters=(object)=>{
  if(typeof object.searchText==="string"){
    filters.searchText=object.searchText;
  }

  if(typeof object.sortBy==="string"){
    filters.sortBy=object.sortBy;
  }

  if(object.hideAll===true||object.hideAll===false){
    filters.hideAll=object.hideAll;
  }
}


export{getFilters, setFilters};
