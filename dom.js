const COMPLETED_BOOK = "COMPLETED_BOOKS";
const UNCOMPLETED_BOOK = "UNCOMPLETED_BOOKS";
const TESTING_ID = "bookId";

function makeBook(judul, tahun, penulis, isCompleted){

    const textJudul = document.createElement("h2");
    textJudul.innerText = judul;

    const textTahun = document.createElement("p");
    textTahun.classList.add("tahun-buku")
    textTahun.innerText = tahun;

    const textPenulis = document.createElement("p");
    textPenulis.innerText = penulis;

    const textContainer = document.createElement("div");
    textContainer.classList.add("text-container");
    textContainer.append(textJudul, textTahun, textPenulis);

    const container = document.createElement("div");
    container.classList.add("book");
    container.append(textContainer);
    
    if(isCompleted){
        container.append(
        notCompleteBtn(),
        removeButton()
        );
        
    } else{
        container.append(
        completeBtn(),
        removeButton()
        );
    }

    return container;
}

function addBook(){
    let isCompleted;
    const judulBuku = document.getElementById("judul").value;
    const penulisBuku = document.getElementById("penulis").value;
    const tahunBuku = document.getElementById("tahun").value;
    const status = document.querySelector("#dibaca");
    if (status.checked == true){
        isCompleted = true;
    } else{
        isCompleted = false;
    }

    const make = makeBook(judulBuku, tahunBuku, penulisBuku, isCompleted);
    const book = addData(judulBuku, penulisBuku, tahunBuku, isCompleted);

    make[TESTING_ID] = book.id;
    
    if(isCompleted == true){
        document.getElementById("is-completed").append(make);
    } else{
        document.getElementById("is-not-completed").append(make);
    }
    
    books.push(book);

    updateDataStorage();
}

function refreshDataFromBooks(){

    for(let list of books){
        const listBook = makeBook(list.judul, list.tahun, list.penulis, list.isCompleted);

        listBook[TESTING_ID] = list.id;

        if(list.isCompleted == true){
            document.getElementById("is-completed").append(listBook);
        } else {
            document.getElementById("is-not-completed").append(listBook);
        }
    }

}

function createButton(btn, el, name){
    const button = document.createElement("button");
    button.classList.add(btn);
    button.innerText = name;

    button.addEventListener("click", function(event){
        el(event);
        event.stopPropagation();
    });

    return button;
}

function removeTaskButton(removeTask){
    const position = findBookIndex(removeTask[TESTING_ID]);
    const konfirmasi = confirm("Apakah Anda yakin ingin menghapus?");

    if(konfirmasi){
        books.splice(position, 1);
        removeTask.remove();
    } 

    updateDataStorage();
}

function removeButton(){
    return createButton("hapusBtn", function(e) {
        removeTaskButton(e.target.parentElement);
    }, "X")
}

function completeTaskButton(completeTask){
    
    const bookStatus = findBook(completeTask[TESTING_ID]);
    const book = makeBook(bookStatus.judul, bookStatus.tahun, bookStatus.penulis, true);

    book[TESTING_ID] = bookStatus.id;
    bookStatus.isCompleted = true;

    completeTask.remove();
    document.getElementById("is-completed").append(book);

    updateDataStorage();
}

function completeBtn(){
    return createButton("completeBtn", function(e){
        completeTaskButton(e.target.parentElement);
    }, "Sudah dibaca")
}

function notCompleteTaskButton(notCompleteTask){

    const bookStatus = findBook(notCompleteTask[TESTING_ID]);
    const book = makeBook(bookStatus.judul, bookStatus.tahun, bookStatus.penulis, false);

    book[TESTING_ID] = bookStatus.id;   
    bookStatus.isCompleted = false;

    notCompleteTask.remove();
    document.getElementById("is-not-completed").append(book);

    updateDataStorage();
}

function notCompleteBtn(){
    return createButton("not-complete-btn", function(e){
        notCompleteTaskButton(e.target.parentElement);
    }, "Belum Dibaca")
}

function searchBook(){
    const cari = document.getElementById("cari").value.toUpperCase();
    const listJudul = document.querySelectorAll(".book > .text-container > h2");

    for(i = 0; i < listJudul.length; i++){
        listJudul[i].parentElement.parentElement.style.display = "run-in";
        if(!listJudul[i].innerHTML.toUpperCase().includes(cari)){
           listJudul[i].parentElement.parentElement.style.display = "none";
        } else{
            listJudul[i].parentElement.parentElement.style.display = "flex";
        }
    }
}
