//-------------ELEMENTOS-------------//

//LOGIN
const singupBtn = document.querySelector(".signupBtn");
const loginBtn = document.querySelector(".loginBtn");
const moveBtn = document.querySelector(".moveBtn");
const singup = document.querySelector(".singup");
const login = document.querySelector(".login");
const info = document.querySelector(".info");
const iconInfo = document.querySelector("#iconInfo");
const menuIcon = document.querySelector("#menuIcon");
const cerrarLogin = document.querySelector("#cerrarLogin");

const loginModal = document.querySelector(".loginModal");

//APP
const apiKey = `3f51dc5fac96db0811b5d2de77f19f3f`;
let bandera = true;

const app = document.querySelector(".weather-app");
const temperatura = document.querySelector(".temp");
const horario = document.querySelector(".horario");
const dia = document.querySelector(".dia");
const condicion = document.querySelector(".condicion");
const nombre = document.querySelector(".nombre");
const icon = document.querySelector(".icon");
const sensacion = document.querySelector(".sensacion");
const humedad = document.querySelector(".humedad");
const viento = document.querySelector(".viento");
const search = document.querySelector(".search");
const btnLupa = document.querySelector(".lupa");
const ciudades = document.querySelectorAll(".ciudadDesplegada");
const spanError = document.querySelector(".spanError");

//-------------EVENTOS-------------//

//LOGIN
loginBtn.addEventListener("click", () => {
  moveBtn.classList.add("rightBtn");
  login.classList.add("loginForm");
  singup.classList.remove("singupForm");
  moveBtn.innerHTML = "Ingresar";
});

singupBtn.addEventListener("click", () => {
  moveBtn.classList.remove("rightBtn");
  login.classList.remove("loginForm");
  singup.classList.add("singupForm");
  moveBtn.innerHTML = "Registrarse";
});

menuIcon.addEventListener("click", abrirCerrarLogin);
cerrarLogin.addEventListener("click", abrirCerrarLogin);

//APP
geoLocalizar();
btnLupa.addEventListener("click", buscar);
iconInfo.addEventListener("click", () => {
  if (info.style.display == "none") {
    info.style.display = "block";
        setTimeout(() => info.style.opacity = "1", 300)
  } else {
    info.style.opacity = "0";
    setTimeout(() => info.style.display = "none", 300)
  }
});

//-------------FUNCIONES-------------//

//LOGIN
function abrirCerrarLogin() {
  loginModal.style.display == `none`
    ? (loginModal.style.display = "flex")
    : (loginModal.style.display = `none`);
}

//APP

function geoLocalizar() {
  navigator.geolocation.getCurrentPosition((pos) => {
    const latitude = pos.coords.latitude;
    const longitude = pos.coords.longitude;

    fetchData(latitude, longitude);
  });
}

function fetchData(_lat, _long) {
  fetch(
    `https://api.openweathermap.org/data/2.5/weather?lat=${_lat}&lon=${_long}&appid=${apiKey}&units=metric&lang=sp`
  )
    .then((r) => r.json())
    .then((data) => {
      setData(data);
    })
    .catch((error) => console.log(error));
}

function setData(_data) {
  temperatura.textContent = `${Math.floor(_data.main.temp)}°`;

  //Transforma la zona horaria y separa los términos
  const fechaNueva = calcularTiempo(_data.timezone);
  const arrayFecha = fechaNueva.toString().split(` `);
  const diaString = arrayFecha[0].toString();
  const mesString = arrayFecha[1].toString();
  transformarDia(diaString);
  transformarMes(mesString);

  dia.textContent = `${diaString} ${arrayFecha[2]} ${mesString} ${arrayFecha[3]}`;
  horario.textContent = `${arrayFecha[4].slice(0, 5)}`;

  condicion.textContent = `${_data.weather[0].description}`;
  sensacion.textContent = `${_data.main.feels_like.toFixed(1)}°`;
  humedad.textContent = `${_data.main.humidity}%`;
  viento.textContent = `${_data.wind.speed} km/h`;

  icon.src = `http://openweathermap.org/img/wn/${_data.weather[0].icon}@2x.png`;

  let noche = "n";
  _data.weather[0].icon.toString().endsWith("d")
    ? (noche = "d")
    : (noche = "n");

  //Si es la primera vez toma el nombre de la ciudad desde la api
  if (bandera) {
    nombre.textContent = `${_data.name} ${_data.sys.country}`;
    bandera = false;
  }

  let itemId = _data.weather[0].id.toString();
  itemId != 800
    ? (app.style.backgroundImage = `url(img/${itemId.charAt(0)}${noche}.jpg)`)
    : (app.style.backgroundImage = `url(img/1${noche}.jpg)`);

   apiHoliday(_data.sys.country);
}

function calcularTiempo(_timezone) {
  d = new Date();
  localTime = d.getTime();
  localOffset = d.getTimezoneOffset() * 60000;
  utc = localTime + localOffset;
  let ciudad = utc + 1000 * _timezone;
  nd = new Date(ciudad);
  return nd;
}

//Transforma dia en Ing a Esp
function transformarDia(_dia) {
  //Cambia el Idioma (por más que puse es de condición, el día está en Inglés)
  switch (_dia) {
    case `Sun`:
      diaString = `Dom`;
      break;
    case `Mon`:
      diaString = `Lun`;
      break;
    case `Tue`:
      diaString = `Mar`;
      break;
    case `Wed`:
      diaString = `Mie`;
      break;
    case `Thu`:
      diaString = `Jue`;
      break;
    case `Fri`:
      diaString = `Vie`;
      break;
    case `Sat`:
      diaString = `Sab`;
      break;
  }
}

//Transforma mes en Ing a Esp
function transformarMes(_mes) {
  //Cambia el Idioma (por más que puse es de condición, el mes está en Inglés)
  switch (_mes) {
    case `Jan`:
      mesString = `Ene`;
      break;
    case `Feb`:
      mesString = `Feb`;
      break;
    case `Mar`:
      mesString = `Mar`;
      break;
    case `Apr`:
      mesString = `Abr`;
      break;
    case `May`:
      mesString = `May`;
      break;
    case `Jun`:
      mesString = `Jun`;
      break;
    case `Jul`:
      mesString = `Jul`;
      break;
    case `Aug`:
      mesString = `Ago`;
      break;
    case `Sep`:
      mesString = `Set`;
      break;
    case `Oct`:
      mesString = `Oct`;
      break;
    case `Nov`:
      mesString = `Nov`;
      break;
    case `Dec`:
      mesString = `Dic`;
      break;
  }
}

//Transforma fecha numérica (10-15) a Palabras (15 de octubre)
function transformarFechaNum(_mes, _dia) {
  let resultado = "";
  switch (_mes) {
    case `1`:
      resultado = `${_dia} de Enero`;
      break;
    case `2`:
      resultado = `${_dia} de Febrero`;
      break;
    case `3`:
      resultado = `${_dia} de Marzo`;
      break;
    case `4`:
      resultado = `${_dia} de Abril`;
      break;
    case `5`:
      resultado = `${_dia} de Mayo`;
      break;
    case `6`:
      resultado = `${_dia} de Junio`;
      break;
    case `7`:
      resultado = `${_dia} de Julio`;
      break;
    case `8`:
      resultado = `${_dia} de Agosto`;
      break;
    case `9`:
      resultado = `${_dia} de Septiembre`;
      break;
    case `10`:
      resultado = `${_dia} de Octubre`;
      break;
    case `11`:
      resultado = `${_dia} de Noviembre`;
      break;
    case `12`:
      resultado = `${_dia} de Diciembre`;
      break;
  }

  return resultado;
}

function buscar(e) {
  e.preventDefault();
  if (search.value != "") {
    let ciudad = search.value;
    fetch(
      `http://api.openweathermap.org/geo/1.0/direct?q=${ciudad}&limit=5&appid=${apiKey}`
    )
      .then((r) => r.json())
      .then((data) => {
        let lat = data[0].lat;
        let lon = data[0].lon;
        nombre.textContent = `${data[0].name} ${data[0].country}`;
        fetchData(lat, lon);
      })
      .catch(() => {
        spanError.textContent = `No se ha encontrado la ciudad`;
        spanError.style.opacity = `1`;
        setTimeout(() => (spanError.style.opacity = `0`), 3000);
      });
  } else {
    spanError.textContent = `Agrega una ciudad`;
    spanError.style.opacity = `1`;
    setTimeout(() => (spanError.style.opacity = `0`), 3000);
  }
  search.value = "";
}


function apiHoliday(_pais) {
  let arrayHoly = [];
  const hoy = new Date();
  const month = hoy.getMonth();
  const day = hoy.getDate();
  const hoy2021 = new Date(2021, month, day);

  fetch(
    `https://holidayapi.com/v1/holidays?pretty&key=e82f212c-ef50-41f5-8b57-f738622ecb72&country=${_pais}&year=2021`
  )
    .then((r) => r.json())
    .then((data) => {
      data.holidays.forEach((e) => {
        let nd = new Date(e.date);
        if (nd >= hoy2021) {
          arrayHoly.push(e);
        }
      });
      console.log(arrayHoly);
      fetchWiki(arrayHoly[0].name, arrayHoly[0].date.slice(5), _pais);
    });
}

function fetchWiki(_busqueda, _fecha, _pais) {
  let myHeaders = new Headers();
  myHeaders.append("X-API-KEY", "c3d58af5c434f020798b8c2f2c97d6bab6ef3b63");
  myHeaders.append("Content-Type", "application/json");

  let raw = JSON.stringify({
    q: `${_busqueda} info`,
    gl: _pais,
    hl: "es",
    autocorrect: true,
  });

  let requestOptions = {
    method: "POST",
    headers: myHeaders,
    body: raw,
    redirect: "follow",
  };
  console.log("https://google.serper.dev/search", requestOptions);

  let fechaError = _fecha.split("-");
  info.innerHTML = `<img src="img/loader.gif" alt="Cargando" height="50px">`;

  fetch("https://google.serper.dev/search", requestOptions)
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
      let festividadInfo = {
        fecha: data.knowledgeGraph.attributes.Fecha,
        titulo: data.knowledgeGraph.title,
        desc: data.knowledgeGraph.description,
        link: data.knowledgeGraph.descriptionLink,
      };
      console.log(festividadInfo);
      let fechaInfo = festividadInfo.fecha;
      let descInfo = festividadInfo.desc;
      let linkInfo = festividadInfo.link;
      if (festividadInfo.fecha == undefined) {
        fechaInfo = transformarFechaNum(fechaError[0], fechaError[1]);
      }
      if (descInfo == undefined) {
        descInfo = ``;
      }
      if (linkInfo == undefined) {
        linkInfo = `https://www.google.com/search?q=${festividadInfo.titulo}`;
      }

      info.innerHTML = `<h4 style="margin-top: -.1em;">Próximo Evento Nacional</h4>
        <h2>${festividadInfo.titulo}</h2> 
        (${fechaInfo})
        <p>${descInfo}</p> <a href="${linkInfo}"style="color: white;" target="blank">Saber más</a>`;
    })
    .catch((error) => {
      console.log(error);
      info.innerHTML = `<h4 style="margin-top: -.1em;">Próximo Evento Nacional</h4>
        <h2>${_busqueda}</h2> 
        (${transformarFechaNum(fechaError[0], fechaError[1])}) <br><br>
         <a href="https://www.google.com/search?q=${_busqueda}"style="color: white;" target="blank">Saber más</a>`;
    });
}
//Problemas:
//------Al abrir desde index no se cargan carpetas
//------
