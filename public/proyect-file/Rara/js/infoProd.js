//ELEMENTOS

//Gral
let parametros = new URLSearchParams(window.location.search);
let id = parametros.get("id");
let producto = todosLosObj[id];

//Header
let headerEl = document.querySelector("header");
let headerTxt = document.querySelectorAll("header a");
let logo = document.querySelector("#logo");

//Imgs
let ampliacion = document.querySelector("#ampliacion");
let miniaturasUl = document.querySelector(".miniaturas-container");
let todasLasMiniaturas;

//Progress Bar
let progreso = document.querySelector("#progreso");

//Txts
let nombreProd = document.querySelector("#nombreProd");
let descProd = document.querySelector("#descProd");
let precioProd = document.querySelector("#precioProd");
let nombreColor = document.querySelector("#nombreColor");

//Colores
let coloresProd = document.querySelector(".colores-prod");

//EVENTOS
//-------------INICIO-----------//
document.querySelector("title").textContent = producto.nombre;
cargarImgs();
cargarTextos();
cargarColoresHeader();
esNoche();
cargarVariantes();

//FUNCIONES
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
    root.style.setProperty("--color-claro-header", "#000");
  }
}

function cargarImgs() {
  ampliacion.innerHTML = "";
  for (let i = 0; i <= producto.fotos.length - 1; i++) {
    ampliacion.insertAdjacentHTML(
      "beforeend",
      `<li><img src="img/${producto.fotos[i]}.jpg" alt="${producto.nombre}"></li>`
    );
  }
  miniaturasUl.innerHTML = "";
  for (let i = 0; i <= producto.fotos.length - 1; i++) {
    miniaturasUl.insertAdjacentHTML(
      "beforeend",
      `<img id="pos-${i}" src="img/${producto.fotos[i]}.jpg" alt="${producto.nombre}">`
    );
  }
  todasLasMiniaturas = document.querySelectorAll("#miniaturas img");
  progreso.style.height = `${100 / todasLasMiniaturas.length}%`;

  for (let i = 0; i <= todasLasMiniaturas.length - 1; i++) {
    todasLasMiniaturas[i].addEventListener("click", cambiarImgAmpliada);
    todasLasMiniaturas[i].style.height = `${
      100 / todasLasMiniaturas.length - 1
    }%`;
  }
}

function cargarTextos() {
  nombreProd.textContent = producto.nombre;
  descProd.textContent = producto.desc;
  precioProd.textContent = producto.precio;
  nombreColor.textContent = producto.color[1];
}

function cambiarImgAmpliada() {
  let pos = this.getAttribute("id");
  let idPos = pos.charAt(pos.length - 1);
  ampliacion.style.top = `${idPos * -75}vh`;
  progreso.style.height = `${
    (100 / todasLasMiniaturas.length) * idPos + 100 / todasLasMiniaturas.length
  }%`;
}

//VARIANTES//
function cargarVariantes() {
  let j = 0;
  coloresProd.innerHTML = `<p class="selected" id="color-0" style="color:${producto.color[0]};">
  <i class="fa-solid fa-circle"></i>
</p>`;
  for (let i = 0; i <= producto.variantes.length - 1; i++) {
    //Agrega tantos puntos como variantes
    j++;
    coloresProd.insertAdjacentHTML(
      "beforeend",
      `<p id="color${j}"">
    <i class="fa-solid fa-circle" style="color:${producto.variantes[i][1]};"></i>
  </p>`
    ); //Les pone color
  }
  let todosLosColores = document.querySelectorAll(".colores-prod p");
  for (let i = 0; i <= todosLosColores.length - 1; i++) {
    todosLosColores[i].addEventListener("click", cambiarColor);
  }
}

function cambiarColor() {
  let clase = this.getAttribute("id");
  let pos = clase.charAt(clase.length - 1);

  let selectedPrev = document.querySelector(".selected");
  selectedPrev.removeAttribute("class");

  ampliacion.style.top = `0vh`;
  progreso.style.height = `${100 / todasLasMiniaturas.length}%`;

  this.setAttribute("class", "selected");


  if (pos > 0) {
    nombreColor.textContent = producto.variantes[pos-1][0];
    ampliacion.innerHTML = "";
    for (let i = 2; i <= producto.variantes[pos - 1].length - 1; i++) {
      ampliacion.insertAdjacentHTML(
        "beforeend",
        `<li><img src="img/${producto.variantes[pos - 1][i]}.jpg" alt="${
          producto.nombre
        }"></li>`
      );
    }
    miniaturasUl.innerHTML = "";
    for (let i = 2; i <= producto.variantes[pos - 1].length - 1; i++) {
      miniaturasUl.insertAdjacentHTML(
        "beforeend",
        `<img id="pos-${i - 2}" src="img/${
          producto.variantes[pos - 1][i]
        }.jpg" alt="${producto.nombre}">`
      );
    }
    todasLasMiniaturas = document.querySelectorAll("#miniaturas img");
    progreso.style.height = `${100 / todasLasMiniaturas.length}%`;

    for (let i = 0; i <= todasLasMiniaturas.length - 1; i++) {
      todasLasMiniaturas[i].addEventListener("click", cambiarImgAmpliada);
      todasLasMiniaturas[i].style.height = `${
        100 / todasLasMiniaturas.length - 1
      }%`;
    }
  } else {
    nombreColor.textContent = producto.color[1];
    cargarImgs();
  }
}
