const line1Title = document.querySelector(".column-1 .line-1");
const containerPrincipal = document.querySelectorAll(".container-principal");
const containerSensor = document.querySelectorAll(".container-sensor");
const inputSearch = document.getElementById("inputSearch");
const imgInput = document.getElementById("imgInput");




function cleanSearch() {
    inputSearch.value = "";
    line1Title.innerHTML = "<h1>Bem-vindo, <span>Usuário</span></h1>";
    imgInput.src = "../assets/svg/search-icon.svg";
    imgInput.classList.remove("active");
    containerPrincipal.forEach((e) => e.style.display = "flex");
    containerSensor.forEach((e) => e.style.display = "none");
}

function searchSensor() {
    let searchText = inputSearch.value;

    if (searchText != "") {
        line1Title.innerHTML = "<h1>Painel de controle <span>detalhado</span></h1>";
        imgInput.src = "../assets/svg/x-icon.svg";
        imgInput.classList.add("active");
        containerPrincipal.forEach((e) => e.style.display = "none");
        containerSensor.forEach((e) => e.style.display = "flex");
    } else {
        cleanSearch();
    }
}

inputSearch.addEventListener("input", searchSensor);
imgInput.addEventListener("click", cleanSearch);

function retornarIndex(){
    window.location.href = "../index.html"
}