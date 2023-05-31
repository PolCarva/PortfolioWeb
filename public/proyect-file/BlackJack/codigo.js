//ELEMENTOS
let deckId = "new";
let otra = document.querySelector("#otra");
let parar = document.querySelector("#parar");
let iniciarBtn = document.querySelector("#iniciar");
let bet = document.querySelector("#bet");
let numPartida = 0;

let mensaje = document.querySelector("#mensaje");

let playerSum = document.querySelector("#player-sum");
let dealerSum = document.querySelector("#dealer-sum");

let playerCards = document.querySelector(".player-cards");
let dealerCards = document.querySelector(".dealer-cards");

let playerCount = 0;
let dealerCount = 0;

let playerOff = false;
let dealerOff = false;

let playerArray = [];
let dealerArray = [];

let aceCounter = 0;

let playerCoins = 100;
let playerBet = 0;
let spanCoins = document.querySelector("#coins");

//EVENTOS
iniciarBtn.addEventListener("click", iniciar);
otra.addEventListener("click", repartir);
parar.addEventListener("click", turnoDelDealer);
bet.addEventListener("keyup", () => {
  if (!isNaN(bet.value) && bet.value != "") {
    bet.style.color = "black";
    bet.style.border = "2px solid rgb(255, 255, 255)";
  } else {
    bet.style.color = "red";
    bet.style.border = "2px solid red";
  }
});
document.querySelector("#coins").innerHTML = playerCoins;

fetch("https://www.deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1") //Crea el mazo
  .then((respuesta) => respuesta.json())
  .then((datosDeck) => (deckId = datosDeck.deck_id))
  .catch(() => console.log("Error al cargar api"));

//FUNCIONES
function iniciar() {
  if (!isNaN(bet.value) && bet.value != "" && bet.value <= playerCoins) {
    iniciarBtn.disabled = true;
    bet.disabled = true;
    mensaje.style.opacity = `0`;
    playerOff = false;
    dealerOff = false;
    otra.disabled = false;
    parar.disabled = false;
    playerSum.style.color = "white";
    dealerSum.innerHTML = ``;
    playerCards.innerHTML = ``;
    playerArray = [];
    dealerArray = [];

    playerBet = parseInt(bet.value);

    spanCoins.innerHTML = `${playerCoins - playerBet}`;

    iniciarBtn.setAttribute("value", "DEAL AGAIN");

    if (numPartida == 0) {
      playerCoins -= playerBet;
      fetch(`https://www.deckofcardsapi.com/api/deck/${deckId}/draw/?count=4`)
        .then((respuesta) => respuesta.json())
        .then((card) => {
          console.log(card);
          if (card.error == "Not enough cards remaining to draw 4 additional") {
            mensaje.innerHTML = `No hay suficientes cartas en el mazo`;
            mensaje.style.backgroundColor = `rgb(255 0 28 / 50%)`;
            mensaje.style.opacity = `1`;
            playerCards.innerHTML = `<div class="carta-falsa"></div>
        <div class="carta-falsa"></div>`;
            dealerCards.innerHTML = `<div class="carta-falsa"></div>
        <div class="carta-falsa"></div>`;
          } else {
            let card1 = card.cards[0];
            let card2 = card.cards[1];
            let card3 = card.cards[2];
            let card4 = card.cards[3];

            dealerCards.innerHTML = `<div class="carta-box">
        <div class="carta">    
          <div class="cara">
            <img src="img/back.png" width="70">
          </div>
          <div class="cara detras" id="hidden">
            <img src="${card4.image}" width="70" >
          </div>    
        </div>
      </div>`;

            playerCards.innerHTML += `<img src="${card1.image}" width="70">`;
            dealerCards.innerHTML += `<img src="${card2.image}" width="70">`;
            playerCards.innerHTML += `<img src="${card3.image}" width="70">`;

            playerCount =
              transformValue(card1.value) + transformValue(card3.value);
            dealerCount =
              transformValue(card2.value) + transformValue(card4.value);
            dealerSum.innerHTML = `${
              dealerCount - transformValue(card4.value)
            }`;

            playerArray.push(card1.value);
            playerArray.push(card3.value);
            playerCount = evaluarAces(playerArray, playerCount);

            dealerArray.push(card2.value);
            dealerArray.push(card4.value);

            dealerCount = evaluarAces(dealerArray, dealerCount);


            if (playerCount == 21) {
              playerCount = "BLACKJACK";
              playerSum.style.color = "#91ff7b";
              otra.disabled = true;
              parar.disabled = true;
              turnoDelDealer();
            }

            playerSum.textContent = `${playerCount}`;
            numPartida++;
          }
        });
    } else {
      numPartida = 0;
      dealerArray = [];
      playerCards.innerHTML = `<div class="player-cards"></div>`;
      dealerCards.innerHTML = ``;
      dealerSum.style.color = "white";
      iniciar();
    }
  } else {
    let animation = [
      { transform: "translateX(4px)" },
      { transform: "translateX(-4px)" },
      { transform: "translateX(4px)" },
    ];
    bet.animate(animation, 200);
    bet.style.border = `2px solid red`;
  }
}

function repartir() {
  fetch(`https://www.deckofcardsapi.com/api/deck/${deckId}/draw/?count=1`)
    .then((respuesta) => respuesta.json())
    .then((card) => {
      let remaining = card.remaining;
      if (remaining != 0) {
        if (playerCount <= 21) {
          //ANIMACION
          let animationPlayer = [{ transform: "translate(30vw, 20vh)" }];
          let cartaVuelta = document.querySelector("#animacionRepartir");
          cartaVuelta.animate(animationPlayer, 200);
          //TERMINA ANIMACION

          let cardImg = card.cards[0].image;
          let cardCode = card.cards[0].code;
          let cardValue = card.cards[0].value;
          playerArray.push(cardValue);

          playerCards.innerHTML += `<img src="${cardImg}" alt="${cardCode}" width="100px">`;
          playerCount += transformValue(cardValue);
          playerCount = evaluarAces(playerArray, playerCount);

          if (playerCount > 21) {
            wasted = true;
            playerSum.style.color = "red";
            otra.disabled = true;
            parar.disabled = true;
            turnoDelDealer();
          } else if (playerCount == 21) {
            otra.disabled = true;
            parar.disabled = true;
            wasted = false;
            playerSum.style.color = "#91ff7b";
            turnoDelDealer();
          }
        }
        playerSum.textContent = playerCount;
      } else {
        mensaje.style.backgroundColor = `rgb(255 0 28 / 50%)`;
        mensaje.innerHTML = `<p>No hay más cartas</p>`;
        mensaje.style.opacity = `1`;
        playerCards.innerHTML = `<div class="carta-falsa"></div>
        <div class="carta-falsa"></div>`;
        dealerCards.innerHTML = `<div class="carta-falsa"></div>
        <div class="carta-falsa"></div>`;
      }
    });
}

function transformValue(_cardVal) {
  if (_cardVal == "ACE") {
    return 11;
  } else if (_cardVal == "KING" || _cardVal == "QUEEN" || _cardVal == "JACK") {
    return 10;
  } else {
    return parseInt(_cardVal);
  }
}

function evaluarAces(_array, _count) {
  while (_array.includes("ACE") && _count > 21) {
    _count -= 10;
    _array.splice(_array.indexOf("ACE"), 1);
  }
  return _count;
}

function turnoDelDealer() {
  otra.disabled = true;
  parar.disabled = true;
  if (dealerCount > 21) {
    dealerSum.style.color = "red";
    dealerOff = true;
  } else {
    dealerOff = false;
  }
  document.querySelector(".carta").style.transform = "rotateY(180deg)";
  dealerSum.innerHTML = dealerCount;
  setTimeout(() => {
    if (dealerCount < 17) {
      fetch(`https://www.deckofcardsapi.com/api/deck/${deckId}/draw/?count=1`)
        .then((respuesta) => respuesta.json())
        .then((card) => {
          dealerArray.push(card.cards[0].value);
          let cartaRepartida = card.cards[0];
          let valorCarta = transformValue(cartaRepartida.value);
          dealerCount += valorCarta;
          dealerCount = evaluarAces(dealerArray, dealerCount);

          dealerSum.innerHTML = `${dealerCount}`;
          dealerCards.innerHTML += `<img src="${cartaRepartida.image}" alt="${cartaRepartida.code}" width="100px">`;
          //ANIMACION
          let animationDealer = [{ transform: "translateX(30vw)" }];

          let cartaVuelta = document.querySelector("#animacionRepartir");

          cartaVuelta.animate(animationDealer, 200);

          turnoDelDealer();
        });
    } else {
      sumarApuesta();
      iniciarBtn.disabled = false;
      bet.disabled = false;
    }
  }, 1000);
}

function evaluarGanador() {
  if (!dealerOff && (dealerCount > playerCount || playerCount > 21)) {
    return 1;
  } else if (
    dealerOff ||
    (playerCount > dealerCount && playerCount <= 21) ||
    playerCount == "BLACKJACK"
  ) {
    return 2;
  } else {
    return 0;
  }
}

function sumarApuesta() {
  if (evaluarGanador() == 0) {
    playerCoins += playerBet;
    mensaje.style.backgroundColor = `rgb(164 176 145 / 60%)`;

    mensaje.innerHTML = `<p>Draw</p>`;
    mensaje.style.opacity = `1`;
  } else if (evaluarGanador() == 1) {
    mensaje.style.backgroundColor = `rgb(255 0 28 / 50%)`;
    mensaje.innerHTML = `<p>You Lost :(</p>`;
    mensaje.style.opacity = `1`;
  } else {
    mensaje.style.backgroundColor = `rgb(95, 153, 0)`;

    mensaje.innerHTML = `<p>You Win! +${playerBet} Coins</p>`;
    mensaje.style.opacity = `1`;
    playerCoins += playerBet * 2;
  }

  //Actualiza puntos
  spanCoins.innerHTML = `${playerCoins}`;
}
