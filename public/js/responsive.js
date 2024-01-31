//Scroll Trigger
gsap.registerPlugin(ScrollTrigger);

//ELEMENTOS

//Menu
const menuButton = document.getElementById("menu-button");
const menuItems = document.querySelectorAll(".menuDisplay-item");

//Proyects
const proyectGrid = document.querySelector("#proyect-grid");
const select = document.querySelector("#select-filter");

//EVENTOS
//Load
loadProyects(proyects);

//Menu
menuButton.addEventListener("click", function () {
  menuButton.classList.toggle("close");
  openCloseMenuDisplay();
});

menuItems.forEach((e) => {
  e.addEventListener("click", () => {
    menuButton.classList.toggle("close");

    openCloseMenuDisplay();
  });
});

//Filter
select.addEventListener("change", filterProyects);

//FUNCIONES

//Load
function loadProyects(proyectsArray) {
  proyectGrid.innerHTML = "";
  for (let i = 0; i <= proyectsArray.length - 1; i++) {
    proyectGrid.innerHTML += `
      <a href="${proyectsArray[i].url}" target="_blank" class="proyect proyect-${proyectsArray[i].type} " >
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
  gsap.from(".proyect", {
    yPercent: 100,
    opacity: 0,
    duration: 1,
  });
}

//Update
const closeDialog = document.querySelector("#closeUpdate");

closeDialog.addEventListener("click", () => {
  document.querySelector(".update").style.display = "none";
});

//Menu
function openCloseMenuDisplay() {
  if (menuButton.className == "close") {
    gsap.to("#menuDisplay", {
      xPercent: -100,
      duration: 0.5,
      ease: Power2.easeOut,
    });
    gsap.set("body", {
      overflow: "hidden",
    });
  } else {
    gsap.to("#menuDisplay", {
      xPercent: 0,
      duration: 0.5,
      ease: Power2.easeOut,
    });
    gsap.set("body", {
      overflow: "visible",
    });
  }
}

//Filter
function filterProyects() {
  if (select.value == "Todos") {
    loadProyects(proyects);
    document.querySelector(".square-proyects-2").style.display = "block";
  } else {
    loadProyects(proyects.filter((e) => e.filter == select.value));
    document.querySelector(".square-proyects-2").style.display = "none";
  }
}

//ANIMATIONS
gsap.to("#text-path-1", {
  attr: { startOffset: "5%" },
  ease: Power2.easeInOut,
  scrollTrigger: {
    trigger: "#home",
    start: "top top",
    scrub: true,
  },
  duration: 2,
});
gsap.to("#text-path-2", {
  attr: { startOffset: "20%" },
  ease: Power2.easeInOut,
  scrollTrigger: {
    trigger: "#about",
    start: "bottom center",
    scrub: true,
  },
  duration: 2,
});

gsap.from(".anim1", {
  opacity: 0,
  duration: 2,
  stagger: 0.1,
  scrollTrigger: {
    toggleActions: "play restart play reverse",
    trigger: ".habilities",
    start: "top bottom-=200",
  },
});
gsap.from(".anim2", {
  opacity: 0,
  duration: 2,
  stagger: 0.1,
  scrollTrigger: {
    toggleActions: "play restart play reverse",
    trigger: ".values",
    start: "top bottom-=200",
  },
});

gsap.to(".square-about", {
  xPercent: 100,
  yPercent: 50,
  scrollTrigger: {
    trigger: "#about",
    start: "top top",
    scrub: true,
    end: "center top",
  },
});
gsap.to(".square-about-2", {
  xPercent: -100,
  yPercent: 100,
  scrollTrigger: {
    trigger: ".about-1",
    start: "bottom-=100 top",
    end: "+=1000",
    scrub: true,
  },
});
gsap.to(".square-about-3", {
  xPercent: -50,
  yPercent: 100,
  scrollTrigger: {
    trigger: ".about-2",
    start: "bottom center",
    end: "+=1000",
    scrub: true,
  },
});
gsap.to(".square-proyects-1", {
  xPercent: -100,

  yPercent: 100,
  scrollTrigger: {
    trigger: "#proyects",
    start: "top center",
    end: "+=2000",
    scrub: true,
  },
});
gsap.to(".square-proyects-2", {
  xPercent: 50,
  yPercent: 100,
  scrollTrigger: {
    trigger: "#proyects",
    start: "center center",
    end: "+=2000",
    scrub: true,
  },
});

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

const loadingBar = document.querySelector(".loading-bar");

const header = document.querySelector("#header");
const title1 = document.querySelector(".titles-first");
const title2 = document.querySelector(".titles-second-span");
const title3 = document.querySelector(".titles-third");
const pic1 = document.querySelector(".pic1");
const pic2 = document.querySelector(".pic2");
const arrayPic = [pic1, pic2];

gsap.set("body", {
  overflow: "hidden",
});

gsap.to(loadingBar, {
  yPercent: -100,
  duration: 3,
  ease: Power2.easeOut,
});
gsap.to(loadingBar, {
  width: "85%",
  height: "90vh",
  xPercent: 10,
  delay: 3.5,
  ease: Power2.easeOut,
});
gsap.to(loadingBar, {
  height: "50vh",
  yPercent: -140,
  delay: 4,
  ease: Power2.easeOut,
});
gsap.set("body", {
  overflow: "visible",
  delay: 5,
});
gsap.from(header, {
  yPercent: -100,
  opacity: 0,
  duration: 2,
  ease: Power2.easeOut,
  delay: 5.5,
});

gsap.from(splitH1IntoSpans(title1), {
  yPercent: 250,
  stagger: 0.1,
  duration: 1,
  ease: "back",
  delay: 5.5,
});
gsap.from(splitH1IntoSpans(title2), {
  opacity: 0,
  stagger: 0.1,
  duration: 2,
  ease: Power2.easeOut,
  delay: 5.8,
});
gsap.from(splitH1IntoSpans(title3), {
  yPercent: 250,
  stagger: 0.1,
  duration: 1,
  ease: "back",
  delay: 6.2,
});

gsap.from(arrayPic, {
    opacity: 0,
    delay: 6.2,
    duration: 1,
})

gsap.from(".m-scroll-title-span", {
    opacity: 0,
    delay: 7,
    ease: Power2.easeOut,
    duration: 2,
})

const loadingPercentage = document.querySelector(".loading-percentage")
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