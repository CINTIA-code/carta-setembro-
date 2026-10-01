/* =========================================
   SETEMBRO — CARTA PARA MIM
   ========================================= */

const pages = document.querySelectorAll(".page");

const previousButton = document.getElementById("prevButton");
const nextButton = document.getElementById("nextButton");

const currentPageElement = document.getElementById("currentPage");
const progressFill = document.getElementById("progressFill");

let currentPage = 0;


/* =========================================
   MOSTRAR PÁGINA
   ========================================= */

function showPage(pageIndex) {

    if (pageIndex < 0) {
        pageIndex = 0;
    }

    if (pageIndex >= pages.length) {
        pageIndex = pages.length - 1;
    }

    currentPage = pageIndex;

    pages.forEach((page, index) => {

        page.classList.toggle(
            "active",
            index === currentPage
        );

    });

    updateNavigation();
}


/* =========================================
   PRÓXIMA PÁGINA
   ========================================= */

function nextPage() {

    if (currentPage < pages.length - 1) {

        showPage(currentPage + 1);

    }

}


/* =========================================
   PÁGINA ANTERIOR
   ========================================= */

function previousPage() {

    if (currentPage > 0) {

        showPage(currentPage - 1);

    }

}


/* =========================================
   ATUALIZAR NAVEGAÇÃO
   ========================================= */

function updateNavigation() {

    /*
        Número da página
        01, 02, 03...
    */

    currentPageElement.textContent =
        String(currentPage + 1).padStart(2, "0");


    /*
        Barra de progresso
    */

    const progress =
        (currentPage / (pages.length - 1)) * 100;

    progressFill.style.width =
        `${progress}%`;


    /*
        Desabilitar botão anterior
    */

    previousButton.disabled =
        currentPage === 0;


    /*
        Desabilitar botão próximo
    */

    nextButton.disabled =
        currentPage === pages.length - 1;

}


/* =========================================
   TECLADO
   ========================================= */

document.addEventListener("keydown", (event) => {

    if (event.key === "ArrowRight") {

        nextPage();

    }

    if (event.key === "ArrowLeft") {

        previousPage();

    }

});


/* =========================================
   GESTO DE DESLIZAR NO CELULAR
   ========================================= */

let touchStartX = 0;
let touchEndX = 0;


document.addEventListener("touchstart", (event) => {

    touchStartX =
        event.changedTouches[0].screenX;

});


document.addEventListener("touchend", (event) => {

    touchEndX =
        event.changedTouches[0].screenX;

    handleSwipe();

});


function handleSwipe() {

    const distance =
        touchEndX - touchStartX;

    /*
        Arrastou para a esquerda
        → próxima página
    */

    if (distance < -50) {

        nextPage();

    }

    /*
        Arrastou para a direita
        → página anterior
    */

    if (distance > 50) {

        previousPage();

    }

}


/* =========================================
   INICIAR
   ========================================= */

showPage(0);
