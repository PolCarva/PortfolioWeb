//--------------------------ELEMENTOS---------------------------//
//GRAL EL
let headerEl = document.querySelector("header");
let headerTxt = document.querySelectorAll("header a");

//SEARCH EL
let searchIcon = document.querySelector("#searchIcon");
let searchIconActivo;
let searchBar;
let searchUl = document.querySelector(".navbar");

//FILTRO
let select = document.querySelector("#filtro");

//SWITCH EL
let switcher = document.querySelector("#switch");

//CATALOGO EL
let gridCatalogo = document.querySelector(".grid-catalogo");

//--------------------------EVENTOS-----------------------------//
//INICIO//
esNoche();
cargarImgUl(1);
setInterval(cargarColoresHeader, 1);
let gridLi = document.querySelectorAll(".grid-catalogo li"); //CARGO LI DSP DE CARGAR IMG

//EVENT LISTENERS
searchIcon.addEventListener("click", desplegarSearch);
switcher.addEventListener("click", evaluarSwitch);
select.addEventListener("click", filtro);

//-------------------------FUNCIONES---------------------------//
//GRAL F
function cargarImgUl(_cantidad) {
  gridCatalogo.innerHTML = "";
  for (let i = 0; i <= todosLosObj.length - 1; i++) {
    for (let j = 0; j < _cantidad; j++) {
      gridCatalogo.insertAdjacentHTML(
        "beforeend",
        `<li><a href="infoProd.html?id=${todosLosObj[i].id}"><img src="img/${todosLosObj[i].fotos[j]}.jpg" alt="${todosLosObj[i].nombre}" /></a>
    <div>    
      <a href="infoProd.html?id=${todosLosObj[i].id}" id="nombre-producto">${todosLosObj[i].nombre}</a>
      <span id="precio-producto">${todosLosObj[i].precio}</span>
    </div>
  </li>`
      );
    }
  }
}

function esNoche() {
  //Determina si son más de las 7 y cambia el tema a oscuro
  if (esNocheBool()) {
    root.style.setProperty("--color-oscuro", "#fff");
    root.style.setProperty("--color-claro", "#000");
    root.style.setProperty("--color-gris", "#7A7A7A");
    root.style.setProperty("--color-gris-hover", "#ccc")
    negro = "#fff";
    blanco = "#000";
    gris = "#7A7A7A";
    verde = "#00bb2d";
    rojo = "#FF0000";
    amarillo = "#FFFF00";
    logo.src = "img/zara-logo-2.png";
  } else {
    root.style.setProperty("--color-oscuro", "#000");
    root.style.setProperty("--color-claro", "#fff");
    root.style.setProperty("--color-gris", "#ccc");
    negro = "#000";
    blanco = "#fff";
    gris = "#ccc";
    verde = "#008f39";
    rojo = "#FF0000";
    amarillo = "#F1C232";
    logo.src = "img/zara-logo-1.png";
  }
}

function cargarColoresHeader() {
  if (!esNocheBool()) {
    headerEl.style.color = "var(--color-oscuro)";
    for (let i = 0; i <= headerTxt.length - 1; i++) {
      headerTxt[i].style.color = "var(--color-oscuro)";
    }
    searchIcon.style.color = "var(--color-oscuro)";
    root.style.setProperty("--color-claro-header", "#000");
  }
}

//FILTRO F
function filtro() {
  switcher.checked=false;
  evaluarSwitch();
  window.scrollTo(0, 0);

  let valorFiltro = select.value;

  gridCatalogo.innerHTML = "";
  if (valorFiltro != "todo") {
    for (let i = 0; i <= todosLosObj.length - 1; i++) {
      if (todosLosObj[i].tipo == valorFiltro) {
        gridCatalogo.insertAdjacentHTML(
          "beforeend",
          `<li><a href="infoProd.html?id=${todosLosObj[i].id}"><img src="img/${todosLosObj[i].fotos[0]}.jpg" alt="${todosLosObj[i].nombre}" /></a>
      <div>    
        <span id="nombre-producto">${todosLosObj[i].nombre}</span>
        <span id="precio-producto">${todosLosObj[i].precio}</span>
      </div>
    </li>`
        );
      }
    }
  } else {
    cargarImgUl(1);
  }
}

//SEARCH F
function desplegarSearch() {
  searchUl.innerHTML = `<li><input type="text" id="searchBar" placeholder="BUSCAR ITEM"></li>
  <li id="searchIconActive"><i class="fa-solid fa-magnifying-glass"></i></li>`;
  searchIconActivo = document.querySelector("#searchIconActive");
  searchIconActivo.addEventListener("click", replegarSearch);
  searchBar = document.querySelector("#searchBar");
  searchBar.addEventListener("keyup", buscar);
  searchIconActivo.addEventListener("click", replegarSearch);
  searchIconActivo.style.color = "var(--color-oscuro)";
}

function replegarSearch() {
  searchUl.innerHTML = `<li><a href="index.html">Home</a></li>
  <li id="activo"><a href="#">Catálogo</a></li>
  <li id="searchIcon"><i class="fa-solid fa-magnifying-glass"></i></li>`;
  searchIcon = document.querySelector("#searchIcon");
  searchIcon.style.color = "var(--color-oscuro)";
  searchIcon.addEventListener("click", desplegarSearch);
}

function buscar() {
  let textoIngresado = searchBar.value;
  let textoMin = textoIngresado.toLowerCase();

  switcher.checked=false;
  evaluarSwitch();
  window.scrollTo(0, 0);
  select.value="todo";

  gridCatalogo.innerHTML = "";
  if (textoIngresado != "") {
    for (let i = 0; i <= todosLosObj.length - 1; i++) {
      if (todosLosObj[i].nombre.toLocaleLowerCase().includes(textoMin)) {
        gridCatalogo.insertAdjacentHTML(
          "beforeend",
          `<li><a href="infoProd.html?id=${todosLosObj[i].id}"><img src="img/${todosLosObj[i].fotos[0]}.jpg" alt="${todosLosObj[i].nombre}" /></a>
        <div>    
          <span id="nombre-producto">${todosLosObj[i].nombre}</span>
          <span id="precio-producto">${todosLosObj[i].precio}</span>
        </div>
      </li>`
        );
      }
    }

    let arrayBusqueda = document.querySelectorAll(".grid-catalogo li");
    if (arrayBusqueda.length == 0) {
      gridCatalogo.innerHTML = `<span><i class="fa-regular fa-face-frown"></i> No encontramos tu producto</span>`;
    }
  } else {
    evaluarSwitch();
    cargarImgUl(1);
    gridLi = document.querySelectorAll(".grid-catalogo li"); //CARGO LI DSP DE CARGAR IMG
  }
}

//SWITCH F
function evaluarSwitch() {
  if (switcher.checked) {
    select.value = "todo";
    cargarImgUl(4);
    gridLi = document.querySelectorAll(".grid-catalogo li");
    //Si switch esta checkeado desordena en grilla 3x3
    gridCatalogo.style.gridTemplateColumns = "1fr 1fr 1fr";
    gridCatalogo.style.width = "60%";
    gridCatalogo.style.margin = "25vh auto 10vh auto";

    for (let i = 0; i <= gridLi.length - 1; i += 3) {
      //Desordena las fotos
      gridLi[i].style.gridColumn = "span 2";
      gridLi[i].style.width = "80%";
      gridLi[i].style.margin = "2em auto";
    }
    
  } else {
    cargarImgUl(1);
    //Si no esta checkeado ordena en grilla x4
    gridCatalogo.style.gridTemplateColumns = "1fr 1fr 1fr 1fr";
    gridCatalogo.style.width = "auto";
    gridCatalogo.style.margin = "25vh 2em 10vh 2em";

    for (let i = 0; i <= gridLi.length - 1; i += 3) {
      gridLi[i].style.gridColumn = "inherit";
      gridLi[i].style.width = "auto";
      gridLi[i].style.margin = "auto";
    }
  }
}
