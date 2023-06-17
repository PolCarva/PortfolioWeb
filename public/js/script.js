//Scroll Trigger
gsap.registerPlugin(ScrollTrigger);

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

//----------------ELEMENTS----------------//
//Load
const scrollDown = document.querySelector("#scroll-down");


//Menu Btn
const menuButton = document.getElementById("menu-button");
const menuDisplay = document.querySelector("#menuDisplay");
const menuDisplayItems = document.querySelectorAll(".menuDisplay-item");
const logo = document.querySelector("#logo");

//Proyects
const proyectGrid = document.querySelector("#proyect-grid");

//Filter
const filterItems = document.querySelectorAll(".filter-item");

//Contact
const contactSec = document.querySelector("#contact");

const contactPath1 = document.querySelector("#contact-text-on-path-1");
const contactPath2 = document.querySelector("#contact-text-on-path-2");

const form = document.querySelector("#form");
const nameInp = document.querySelector("#name");
const mailInp = document.querySelector("#email");
const messageInp = document.querySelector("#message");
const charCount = document.querySelector("#char-count");
const submitButton = document.getElementById("submit");

//----------------EVENTS----------------//

//Load
loadProyects(proyects);

//Filter
filterItems.forEach((e) => {
  e.addEventListener("click", () => {
    filterItems.forEach((item) => item.classList.remove("active-filter"));
    e.classList.add("active-filter");
    filterProyects(e.textContent);
  });
});

//About
gsap.to(".horizontal-scroll-dinamic", {
  transform: "translateX(-66.6%)",
  scrollTrigger: {
    trigger: ".wrapper-about",
    pin: true,
    scrub: true,
    end: "+=5000",
  },
  ease: Quad.easeInOut,
});
gsap.to(".mask", {
  width: "110%",
  scrollTrigger: {
    trigger: ".wrapper-about",
    scrub: true,
    start: "top left",
    end: "+=5000",
  },
  ease: Quad.easeInOut,
});
gsap.to(".pic-back", {
  x: "-40%",
  ease: Power4.easeOut,
  scrollTrigger: {
    trigger: ".wrapper-about",
    scrub: true,
    start: "top left",
    end: "+=5000",
  },
});
gsap.to(".pic-front", {
  x: "-10%",
  ease: Quad.easeInOut,
  scrollTrigger: {
    trigger: ".wrapper-about",
    scrub: true,
    start: "top left",
    end: "+=5000",
  },
});
gsap.to(".square-about", {
  x: "-50%",
  y: "-50%",
  ease: Quad.easeInOut,
  scrollTrigger: {
    trigger: ".wrapper-about",
    scrub: true,
    start: "top left",
    end: "+=5000",
  },
});

let anim1 = document.querySelectorAll(".anim1");
gsap.from(anim1, {
  opacity: 0,
  x: 50,
  duration: 0.5,
  stagger: 0.1,
  scrollTrigger: {
    toggleActions: "play restart play reverse",
    trigger: ".sobre-mi-2",
    start: "+=1900",
  },
});

let anim2 = document.querySelectorAll(".anim2");
gsap.from(anim2, {
  opacity: 0,
  x: 50,
  duration: 0.5,
  stagger: 0.1,
  scrollTrigger: {
    toggleActions: "play restart play reverse",
    trigger: ".sobre-mi-3",
    start: "+=3500",
  },
});

//Scroll letras
const textPath1 = document.querySelector("#text-path-1");
const textPath2 = document.querySelector("#text-path-2");

gsap.to(textPath1, {
  attr: { startOffset: "15%" },
  scrollTrigger: {
    trigger: "#home",
    start: "bottom-=100 center",
    toggleActions: "play reverse play reverse",
  },
  duration: 1,
});
gsap.from(textPath2, {
  attr: { startOffset: "-100%" },
  scrollTrigger: {
    trigger: "#about",
    start: "+=5100",
    toggleActions: "play reverse play reverse",
  },
  duration: 1,
});

//Menu Btn
gsap.set(menuDisplay, {
  xPercent: 110,
});

menuButton.addEventListener("click", function () {
  menuButton.classList.toggle("close");
  openCloseMenuDisplay();
});

logo.addEventListener("click", () => {
  gsap.to("body", {
    overflowY: "visible",
  })
})

menuDisplayItems.forEach((e) => {
  e.addEventListener("click", (f) => {
    menuButton.classList.toggle("close");
    openCloseMenuDisplay();
  });
});

//Contact
contactSec.addEventListener("mouseenter", () => {
  gsap.to(contactPath1, {
    attr: { startOffset: "0%" },
    duration: 1,
  });
  gsap.to(contactPath2, {
    attr: { startOffset: "0%" },
    duration: 1,
  });
});
contactSec.addEventListener("mouseleave", () => {
  gsap.to(contactPath1, {
    attr: { startOffset: "-100%" },
    duration: 1,
  });
  gsap.to(contactPath2, {
    attr: { startOffset: "100%" },
    duration: 1,
  });
});
//----------------FUNCTIONS----------------//

//Loading
function splitH1IntoSpans(h1) {
  let text = h1.innerText;
  let splitText = text.split("");
  let spans = [];

  splitText.forEach(function (char) {
    let span = document.createElement("span");
    span.innerText = char;
    spans.push(span);
  });

  h1.innerHTML = "";
  spans.forEach(function (span) {
    h1.appendChild(span);
  });

  return spans;
}


//Menu

function openCloseMenuDisplay() {
  if (menuButton.className == "magic-hover close") {
    gsap.to("#menuDisplay", {
      xPercent: 0,
      ease: Power2.easeOut,
    });
    gsap.to("body", {
      overflowY: "hidden",
    });
    gsap.to("#menuDisplay", {
      boxShadow: "-50vw 0 10px 20px rgba(0, 0, 0, 0.5)",
    })

  } else {
    gsap.to("#menuDisplay", {
      xPercent: 100,
      ease: Power2.easeOut,
    });
    gsap.to(".backgroundMenu", {
      opacity: 0,
      display: "none",
      duration: 0.5,
    });
    gsap.to("body", {
      overflowY: "visible",
    });
    gsap.to("#menuDisplay", {
      boxShadow: "50vw 0 10px 0px rgba(0, 0, 0, 0.5)",
    })

  }
}

window.addEventListener("scroll", () => {
  if (menuButton.className == "magic-hover close") {
    if (menuButton.style.display == "none") {
      gsap.to(menuDisplay, {
        xPercent: 110,
      });

      menuButton.classList.remove("close");
    }
  } else {
    gsap.to(menuDisplay, {
      xPercent: 110,
    });
    gsap.to("#menuDisplay", {
      boxShadow: "50vw 0 10px 0px rgba(0, 0, 0, 0.5)",
    })
  }
});

gsap.to("#menu-button", {
  display: "flex",
  scrollTrigger: {
    trigger: "#home",
    start: "center top",
    end: "center top",
    scrub: true,
  },
});

gsap.to("#menu", {
  display: "none",
  scrollTrigger: {
    trigger: "#home",
    start: "center top",
    end: "center top",
    scrub: true,
  },
});

//Proyects
function loadProyects(proyectsArray) {
  proyectGrid.innerHTML = "";
  for (let i = 0; i <= proyectsArray.length-1; i++) {
    console.log(proyectsArray[i]);
    proyectGrid.innerHTML += `
    <a href="${proyectsArray[i].url}" target="_blank" data-tilt data-tilt-reverse="true" class="proyect proyect-${proyectsArray[i].type} magic-hover" >
                <div class="proyect-bg" style="background-color: ${proyectsArray[i].color};">
                  <div class="proyect-mockup" style="background-image: url(img/Mockups/${proyectsArray[i].img}.png);">
                  </div>
                </div>
                <div class="proyect-info">
                  <div class="proyect-categories">${proyectsArray[i].categories}</div>
                  <div class="proyect-text">
                    <h4 class="proyect-title">${proyectsArray[i].title}</h4>
                    <span class="proyect-year bold">${proyectsArray[i].year}</span>
                  </div>
                </div>
              </a>
    `;
  }
  //Reset Mouse
  magicMouse(options);

  //Reset Tilt
  let proyectsEl = document.querySelectorAll(".proyect");
  VanillaTilt.init(proyectsEl);

  //Animate Enter
  gsap.from(proyectsEl, {
    opacity: 0,
    duration: 0.7,
    y: 5000,
    ease: Power4.easeOut,
  });
}

function filterProyects(f) {
  if (f == "Todos") {
    loadProyects(proyects);
    document.querySelector(".square-proyects-3").style.display = "block";
    document.querySelector(".square-proyects-2").style.display = "block";
  } else {
    loadProyects(proyects.filter((p) => p.filter == f));
    if (proyects.filter((p) => p.filter == f).length < 10) {
      document.querySelector(".square-proyects-3").style.display = "none";
      document.querySelector(".square-proyects-2").style.display = "none";
    }
  }
}

gsap.to(".square-proyects-1", {
  scrollTrigger: {
    trigger: "#proyects",
    scrub: true,
  },
  xPercent: 100,
});
gsap.to(".square-proyects-2", {
  scrollTrigger: {
    trigger: "#proyects",
    scrub: true,
  },
  xPercent: -100,
});
gsap.to(".square-proyects-3", {
  scrollTrigger: {
    trigger: "#proyects",
    scrub: true,
  },
  xPercent: 100,
});

//Contact
//Char Counter
messageInp.addEventListener("keyup", () => {
  charCount.textContent = `${messageInp.value.length}/250`;
});

form.addEventListener("submit", function (event) {
  if (
    nameInp.value.trim() === "" ||
    mailInp.value.trim() === "" ||
    messageInp.value.trim() === ""
  ) {
    alert("Completa todos los campos.");

    event.preventDefault();
  } else if (!isValidEmail(mailInp.value)) {
    alert("Ingresa un Mail válido.");

    event.preventDefault();
  }
});

function isValidEmail(email) {
  let emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

//-----ANIMATIONS-----//
const loadingBar = document.querySelector(".loading-bar");

const header = document.querySelector("#header");
const title1 = document.querySelector(".titles-first");
const title2 = document.querySelector(".titles-second-span");
const title3 = document.querySelector(".titles-third");

gsap.set("body", {
  overflowY: "hidden",
});

//Bar loads up
gsap.to(loadingBar, {
  ease: Power4.easeOut,
  yPercent: -100,
  duration: 3,
});

//Bar shrinks
gsap.to(loadingBar, {
  ease: Power4.easeIn,
  width: "90%",
  height: "75vh",
  duration: 0.3,
  delay: 3.5,
});
gsap.to(loadingBar, {
  ease: Power4.easeIn,
  yPercent: -20,
  duration: 0.3,
  delay: 4.3,
});

//Header
gsap.from(header, {
  yPercent: -100,
  opacity: 0,
  display: "none",
  delay: 5,
  ease: Power2.easeInOut,
  duration: 2,
});

//Titles

//Creando
gsap.from(splitH1IntoSpans(title1), {
  yPercent: 100,
  stagger: 0.1,
  ease: "back",
  duration: 0.8,
  delay: 5,
});

//Identidades
gsap.from(splitH1IntoSpans(title2), {
  opacity: 0,
  stagger: 0.1,
  ease: "back",
  duration: 0.8,
  delay: 5.5,
});
gsap.from(".m-scroll-title-span", {
  opacity: 0,
  delay: 7,
});

//Únicas
gsap.from(splitH1IntoSpans(title3), {
  yPercent: 100,
  stagger: 0.1,
  ease: "back",
  duration: 0.8,
  delay: 6,
});

gsap.to("body", {
  overflowY: "visible",
  delay: 5,
});

//Scroll Down
gsap.from(scrollDown, {
  scale: 0,
  delay: 6.5,
  ease: "back",
});
gsap.to(scrollDown, {
  opacity: 0,
  ease: Power2.easeOut,
  scrollTrigger: {
    trigger: "#home",
    start: "20% top",
  },
  duration: 0.5,
});

const loadingPercentage = document.querySelector(".loading-percentage");

let percentage = 0;
const duration = 3000; // 3 seconds
let startTime = null;

const easeOutCubic = (t, b, c, d) => c * ((t = t / d - 1) * t * t + 1) + b;

const animate = (timestamp) => {
  if (!startTime) startTime = timestamp;
  const progress = timestamp - startTime;
  percentage = easeOutCubic(progress, 0, 100, duration);

  if (progress >= duration) {
    percentage = 100;
  }

  loadingPercentage.innerHTML = `${Math.round(percentage)}%`;
  if (percentage === 100) {
    loadingPercentage.style.opacity = 0;
    setTimeout(() => {
      loadingPercentage.style.display = "none";
    }, 400);
  }

  if (percentage < 100) {
    window.requestAnimationFrame(animate);
  }
};

window.requestAnimationFrame(animate);
