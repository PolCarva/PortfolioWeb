//---------------------------ELEMENTOS------------------------------//

//GRAL
let variableSliderAuto = setInterval(sliderAuto, 5000);


//CUPON
let btnCupon = document.querySelector("#cuponBtn");
let cuponTxt = document.querySelector("#cuponCode");
let exitCupon = document.querySelector("#exitCupon");
let ventanaModal = document.querySelector(".contenedor-modal");


//HEADER
let logo = document.querySelector("#logo");
let headerEl = document.querySelector("header");
//BANNER
let banner = document.querySelector(".home-section-1");
let bannerPos = 0;
let contdownDate = new Date("Oct 1, 2023 00:00:00").getTime();
let tituloContdown = document.querySelector("#oferta");

//SLIDER REGISTER
let sliderFotos = document.querySelector(".slider-register");
let sliderDots = document.querySelector(".slider-dots");
let dots = document.querySelectorAll(".slider-dots span"); //cargo los puntos
let fotoRandom = Math.floor(Math.random() * todasLasFotosArray.length);

//INPUTS REGISTER
let nombre = document.querySelector("#nombre");
let apellido = document.querySelector("#apellido");
let pass = document.querySelector("#pass");
let passConfirm = document.querySelector("#pass-confirm");
let mail = document.querySelector("#email");
let registrarme = document.querySelector("#registrarmeBtn");

//errores inputs
let errorNombre = document.querySelector("#errorNombre");
let errorApellido = document.querySelector("#errorApellido");
let errorPass = document.querySelector("#errorPass");
let fuerzaContra = false;
let errorPassConf = document.querySelector("#errorPassConf");
let errorMail = document.querySelector("#errorMail");

//---------------------------EVENTOS-------------------------------//
pass.addEventListener("keyup", fuerzaPass);
registrarme.addEventListener("click", validarTodo);
window.addEventListener("scroll", colorFlechas);
window.addEventListener("scroll", colorHeader);
headerEl.addEventListener("mouseenter", headerHover);
headerEl.addEventListener("mouseleave", headerUnhover);
btnCupon.addEventListener("click", copiarCupon);
exitCupon.addEventListener("click", cerrarVentanaModal);

//---------------------------INICIAR--------------------------------//
cargarImagenes(sliderFotos, todasLasFotosArray[fotoRandom], sliderDots);
cargarImgBanner();
cargarDots();
esNoche();
setInterval(bannerAuto, 5000);
setInterval(timerContdown, 1000);
cargarCupon();
setTimeout(abrirVentanaModal, 5000);

//---------------------------FUNCIONES------------------------------//

//BANNER
function cargarImgBanner() {
  let randomPosArray = Math.floor(Math.random() * arrayBanner.length);
  bannerPos = randomPosArray;
  banner.style.backgroundImage = `url(img/${arrayBanner[randomPosArray]}.webp), linear-gradient(rgba(0, 0, 0, 0.283), rgba(0, 0, 0, 0.614))`;
}

function bannerAuto() {
  //Automatiza el banner
  bannerPos++;
  if (bannerPos > arrayBanner.length - 1) {
    bannerPos = 0;
  }
  banner.style.backgroundImage = `url(img/${arrayBanner[bannerPos]}.webp), linear-gradient(rgba(0, 0, 0, 0.283), rgba(0, 0, 0, 0.614))`;
}

function timerContdown() {
  let now = new Date().getTime();
  let distancia = contdownDate - now;
  let dias = Math.floor(distancia / (1000 * 60 * 60 * 24)) % 30;
  let horas = Math.floor(
    (distancia % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
  );
  let minutos = Math.floor((distancia % (1000 * 60 * 60)) / (1000 * 60));
  let segundos = Math.floor((distancia % (1000 * 60)) / 1000);

  tituloContdown.textContent =
    dias + "d " + horas + "h " + minutos + "m " + segundos + "s ";
}

//Color Flechas
function colorFlechas() {
  let flechas = document.querySelectorAll(".flechasMover i");

  if (window.scrollY > 60) {
    for (let i = 0; i <= flechas.length - 1; i++) {
      flechas[i].style.color = "var(--color-oscuro)";
    }
  } else {
    for (let i = 0; i <= flechas.length - 1; i++) {
      flechas[i].style.color = "white";
    }
  }
}

//Es de Noche

function esNoche() {
//Si es de noche cambia a tema oscuro
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
    document.querySelector(".home-section-1 h1").style.color = "#fff";
    document.querySelector(".home-section-1 h2").style.color = "#fff";
    document.querySelector(".home-section-1 h3").style.color = "#fff";
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
    document.querySelector(".home-section-1 h1").style.color = "#fff";
    document.querySelector(".home-section-1 h2").style.color = "#fff";
  }
}

//Color header
function headerHover() { //cambia colores del header cuando hover
  if (window.scrollY < 500) {
    if (esNocheBool()) {
      logo.src = "img/zara-logo-2.png";
    } else {
      logo.src = "img/zara-logo-1.png";
    }
  }
}
function headerUnhover() { //cambia colores del header cuando NO hover
  if (window.scrollY < 500) {
    if (esNocheBool()) {
      logo.src = "img/zara-logo-2.png";
    } else {
      logo.src = "img/zara-logo-2.png";

    }
  }
}
function colorHeader() { //Dependiendo del scroll y si es de noche, cambia colores del header
  if (esNocheBool() == false) {
    if (window.scrollY <=500) {
      logo.src = "img/zara-logo-2.png";
      root.style.setProperty("--color-oscuro-header", "#000");
      root.style.setProperty("--color-claro-header", "#fff");
    } else {
      logo.src = "img/zara-logo-1.png";
      root.style.setProperty("--color-oscuro-header", "#fff");
      root.style.setProperty("--color-claro-header", "#000");
    }
  }
}

//REGISTER SLIDER//
function cargarImagenes(_slider, _arrayImg, _sliderDots) {
  for (let i = 0; i < 5; i++) {
    _slider.insertAdjacentHTML(
      //agrego hasta 5 fotos en el ul del slider

      "beforeend",
      `<li> <a href="infoProd.html?id=${todosLosObj[fotoRandom].id}"><img src="img/${_arrayImg[i]}.jpg" alt="" /></a></li>`
    );
    _sliderDots.insertAdjacentHTML(
      //agrego tantos puntos como fotos

      "beforeend",
      `<span class="dot" id="dot-${i}"><i class="fa-solid fa-circle"></i></span>`
    );
  }
  dots = document.querySelectorAll(".slider-dots span"); //cargo los puntos
}

function cargarDots() {
  for (let i = 0; i <= dots.length - 1; i++) {
    //por cada punto creo un evento y llamo a la f
    dots[i].addEventListener("click", sliderDot);
  }
}
function sliderDot() {
  let stringIdDot = String(this.getAttribute("id"));
  let pos = stringIdDot.charAt(stringIdDot.length - 1); //Ultimo char de su id indica la posicion
  sliderFotos.style.top = `${pos * -70}vh`;
  dotsGris();
  this.style.color = negro;
  clearInterval(variableSliderAuto);

}

function dotsGris() {
  //Todos los puntos a gris
  for (let i = 0; i <= dots.length - 1; i++) {
    dots[i].style.color = gris;
  }
}

function sliderAuto() {
  //Automatiza el movimiento del slider
  let randomDot = Math.floor(Math.random() * dots.length);
  let dotRandomSeleccionada = document.querySelector(`#dot-${randomDot}`);
  dotsGris();
  sliderFotos.style.top = `${randomDot * -70}vh`;
  dotRandomSeleccionada.style.color = negro;
}

//REGISTER INPUTS//

function validarTodo() {
  validarPass();
  validarMail();
  validarNombre();
  validarApellido();
}

function fuerzaPass() {
  //Determina si tu contraseña es fuerte (más de 4 char y minimo un núm)
  let passIngresado = pass.value;
  if (evaluarTxt(passIngresado) && passIngresado.length > 5) {
    errorPass.style.color = verde;
    errorPass.textContent = "Fuerte";
    pass.style.borderBottom = `1px solid ${verde}`;
    fuerzaContra = true;
  } else if (passIngresado.length > 4) {
    errorPass.style.color = amarillo;
    errorPass.textContent = "Media";
    pass.style.borderBottom = `1px solid ${amarillo}`;
    fuerzaContra = true;
  } else {
    errorPass.style.color = rojo;
    errorPass.textContent = "Débil";
    pass.style.borderBottom = `1px solid ${rojo}`;
    fuerzaContra = false;
  }
}

function validarMail() {
  // Valida si el mail tiene @ y .com
  let mailIngresado = mail.value;
  if (mailIngresado.includes("@") && mailIngresado.endsWith(".com")) {
    inputCorrecto(mail, errorMail);
  } else if (mailIngresado == "") {
    // Valida que este lleno
    inputIncorrecto(mail, errorMail);
  } else {
    //No es mail
    inputIncorrecto(mail, errorMail);
    errorMail.innerHTML = `<i class="fa-solid fa-circle-exclamation"></i>Ingrese un Email válido`;
  }
}

function validarPass() {
  let passIngresado = pass.value;
  let passConfirmIngresado = passConfirm.value;

  if (fuerzaContra) {
    //Si la contraseña es fuerte o media

    errorPass.innerHTML = ``;
  } else {
    inputIncorrecto(pass, errorPass); //Si la contra es débil
    errorPass.innerHTML = `<i class="fa-solid fa-circle-exclamation"></i> Ingresa una contraseña más fuerte`;
  }
  if (passIngresado == "") {
    inputIncorrecto(pass, errorPass);
  }

  if (passConfirmIngresado == "") {
    //Si el pass Confirm es vacío

    inputIncorrecto(passConfirm, errorPassConf);
  } else if (passConfirmIngresado != passIngresado) {
    //Si el pass Confirm es distinto

    inputIncorrecto(passConfirm, errorPassConf);
    errorPassConf.innerHTML = `<i class="fa-solid fa-circle-exclamation"></i> Las contraseñas no coinciden`;
  } else if ((passConfirmIngresado = passIngresado && fuerzaContra == false)) {
    inputIncorrecto(passConfirm, errorPassConf);
    errorPassConf.innerHTML = ``;
  } else {
    //Si el pass Confirm esta bien
    inputCorrecto(passConfirm, errorPassConf);
  }
}

function validarNombre() {
  let nombreIngresado = nombre.value;

  if (nombreIngresado == "") {
    //Nombre Vacio
    inputIncorrecto(nombre, errorNombre);
  } else if (evaluarTxt(nombreIngresado)) {
    //Nombre con número
    inputIncorrecto(nombre, errorNombre);
    errorNombre.innerHTML = `<i class="fa-solid fa-circle-exclamation"></i>Ingrese un nombre sin números`;
  } else {
    inputCorrecto(nombre, errorNombre);
  }
}

function validarApellido() {
  let apellidoIngresado = apellido.value;

  if (apellidoIngresado == "") {
    //Apellido Vacio
    inputIncorrecto(apellido, errorApellido);
  } else if (evaluarTxt(apellidoIngresado)) {
    //Apellido con número
    inputIncorrecto(apellido, errorApellido);
    errorApellido.innerHTML = `<i class="fa-solid fa-circle-exclamation"></i>Ingrese un apellido sin números`;
  } else {
    inputCorrecto(apellido, errorApellido);
  }
}

function evaluarTxt(_this) {
  //Evalua si un texto tiene algun numero
  if (
    _this.includes(1) ||
    _this.includes(2) ||
    _this.includes(3) ||
    _this.includes(4) ||
    _this.includes(5) ||
    _this.includes(6) ||
    _this.includes(7) ||
    _this.includes(8) ||
    _this.includes(9) ||
    _this.includes(0)
  ) {
    return true;
  }
}

function inputCorrecto(_input, _error) {
  //Verde y quit el mensaje de error
  _error.innerHTML = "";
  _input.style.borderBottom = `1px solid ${verde}`;
}

function inputIncorrecto(_input, _error) {
  //Rojo y mensaje de error
  _input.value = "";
  _input.style.borderBottom = `1px solid ${rojo}`;
  _error.innerHTML = `<i class="fa-solid fa-circle-exclamation"></i> Debes completar
  este campo`;
}

//CUPON
function cargarCupon () {
  cuponTxt.textContent = generarCupon(10);
}

function generarCupon (_longitud) {
  let cupon = "";
  for (let i = 0; i<=_longitud-1; i++) {
    let aleatorio = Math.floor(Math.random()*todo.length);
    cupon += todo.charAt(aleatorio);
  }
  return cupon;
}

function copiarCupon () {
  navigator.clipboard.writeText(cuponTxt.textContent);
  btnCupon.textContent = "COPIADO";
  btnCupon.style.backgroundColor = "#ccc"
  setTimeout(function(){
    btnCupon.textContent = "COPIAR CÓDIGO";
    btnCupon.style.backgroundColor = "#fff"

  }, 3000)
}

function abrirVentanaModal () {
  body.style.height="100vh";
  body.style.overflow="hidden";
  ventanaModal.style.display = "block";
}

function cerrarVentanaModal () {
  body.style.height="inherit";
  body.style.overflow="inherit";
  ventanaModal.style.display = "none";
}