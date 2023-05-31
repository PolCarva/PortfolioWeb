const params = new URLSearchParams(window.location.search);
const val = params.get('value'); 
const proyect = proyects.find(item => item.title === val);

const proyectBg = document.querySelector(".proyect-bg");
const proyectImg = document.querySelector(".proyect-img");
const habilities = document.querySelector(".habilities");
const proyectName = document.querySelector(".proyect-name");
const proyectInfo = document.querySelector(".proyect-info");
const visit = document.querySelector(".btn-item");

document.querySelector("title").textContent = `Pablo Carvalho - ${proyect.title}`;
window.addEventListener("resize", () => {
  if (window.innerWidth < 426) {
    document.querySelector(".logo-text").textContent="Pablo C"
  } else {
    document.querySelector(".logo-text").textContent="Pablo Carvalho"

  }
})

//Cursor
options = {
    cursorOuter: "circle-basic",
    hoverEffect: "pointer-blur",
    hoverItemMove: false,
    defaultCursor: false,
    outerWidth: 30,
    outerHeight: 30,
  };
  magicMouse(options);

// Load
proyectBg.style.backgroundColor = `${proyect.color}`;
proyectImg.style.backgroundImage = `url(img/Mockups/${proyect.img}.png)`;
proyectName.textContent = `${proyect.title}`;
proyectInfo.textContent = `${proyect.info}`;
visit.innerHTML = `<a href="${proyect.url}" target="_blank">VISITAR PROYECTO</a>`;

for(let i = 0; i<=proyect.habilities.length-1; i++) {
  habilities.innerHTML += `<img src="img/Habilities/${proyect.habilities[i]}.png" alt="${proyect.habilities[i]}"/>
  `
}