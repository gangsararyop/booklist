const STORAGE_KEY = "BOOKS_APPS";

let books = [];

function isStorageExist(){
    if(typeof(storage) == undefined){
        console.log("Local Storage is not available in this browser.");
        return false;
    }
    
    return true;
}

function submitData(){
    localStorage.setItem(STORAGE_KEY, JSON.stringify(books))

    document.dispatchEvent(new Event("ondatasaved"));
}

function getDataFromStorage(){
    let data = JSON.parse(localStorage.getItem(STORAGE_KEY));

    if(data !== null){
        books = data; 
    }

    document.dispatchEvent(new Event("ondataloaded"));   
}

function completedOrNot(){
    for(book of books){
        if(book.isCompleted === true){
            return book.isCompleted;
        }

        return false;
    }    
}

function addData(judul, penulis, tahun, isCompleted){
    return {
        id: +new Date(),
        judul,
        penulis,
        tahun,
        isCompleted       
    };
}

function updateDataStorage(){
    if(isStorageExist()){
        submitData();
    }
}

function findBook(bookId){
    for(book of books){
        if(book.id ===  bookId){
            return book;
        }
    }
    return null;
}

function findBookIndex(bookIndex){
    
    let index = 0;

    for(book of books){
        if(book.id === bookIndex){
            return index;
        }

        index++;
    }

    return -1;
    
}



