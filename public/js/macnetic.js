//Macnetic
const menu = document.getElementById("menu");
const menuItems = document.querySelectorAll(".menu-item");
const btns = document.querySelectorAll(".macnetic");

//Macnetic btn
btns.forEach((btn) => {
    btn.addEventListener("mousemove", function (e) {
      const pos = btn.getBoundingClientRect();
      const fuerza = 0.3;
      const x = e.pageX - pos.left - pos.width / 2;
      const y = e.pageY - pos.top - pos.height / 2;
  
      btn.style.transform = `translate(${x * fuerza}px, ${y * fuerza}px)`;
    });
  });
  
  btns.forEach((btn) => {
    btn.addEventListener("mouseout", function (e) {
      btn.style.transform = `translate(0px, 0px)`;
    });
  });
  