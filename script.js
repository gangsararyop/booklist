document.addEventListener("DOMContentLoaded", function(){
    const submitForm = document.getElementById("form");
    const findBar = document.getElementById("findItem");
    

    submitForm.addEventListener("submit", function(event){
        event.preventDefault();
        addBook();
    });

    findBar.addEventListener("submit", function(event){
        event.preventDefault();
        searchBook();
    })

    if(isStorageExist()){
        getDataFromStorage();
    }
});

document.addEventListener("ondataloaded", () => {
    
    refreshDataFromBooks();
    
});
