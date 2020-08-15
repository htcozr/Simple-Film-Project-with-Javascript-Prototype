const form = document.getElementById("film-form");
const titleElement = document.querySelector("#title");
const directorElement = document.querySelector("#director");
const urlElement = document.querySelector("#url");
const cardBody = document.querySelectorAll(".card-body")[1];//ikinci card body
const clear = document.getElementById("clear-films");
//UI Objesini başlatma
const ui = new UI();

// storage nesnesi üret
const storage = new Storage();

//tüm eventleri yükleme 

eventListeners();

function eventListeners(){
    form.addEventListener("submit",addFilm);
        document.addEventListener("DOMContentLoaded",function(){
            let films = storage.getFilmsFromStorage();
            films.forEach(film => {
                ui.addFilmToUI(film);
            });  
    });
    /* Bu şekilde çalışıyor daha kolay hatta
    document.addEventListener("DOMContentLoaded",function(){
        let films = storage.getFilmsFromStorage();
        films.forEach(film => {
            ui.addFilmToUI(film);
        });  
    });
    */   
    cardBody.addEventListener("click",deleteFilm);
    clear.addEventListener("click", clearAllFilms);
}

function addFilm(e){
    const title = titleElement.value;
    const director = directorElement.value;
    const url = urlElement.value;

    if (title === "" || director === "" || url === ""){
        //hata mesajı
        ui.displayMessage("Tüm alanları doldurunuz..","danger");
    }
    else {
        const newFilm = new Film(title, director, url);
        ui.addFilmToUI(newFilm); // arayüze film ekleme
        storage.addFilmToStorage(newFilm); // storagea film ekleme
        ui.displayMessage("Film başarıyla eklendi!!","success");

    }
    ui.clearInput(titleElement,urlElement,directorElement);

    e.preventDefault();
}

function deleteFilm (e) {
    if(e.target.id === "delete-film"){
        ui.deleteFilmFromUI(e.target);
        storage.deleteFilmFromStorage(e.target.parentElement.previousElementSibling.previousElementSibling.textContent);
        // console.log(e.target.parentElement.previousElementSibling.previousElementSibling.textContent);
        ui.displayMessage("Silme işlemi başarılı!!", "success");
    }
}

function clearAllFilms(){
    ui.cleartAllFilmsFromUI();
    storage.clearAllFilmsFromStorage();
}