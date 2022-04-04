var totalDeck = [];
var leftDeck = [];
var deck1 = [];
var deck2 = [];
var deck3 = [];
var deck4 = [];
var deck5 = [];
var deck6 = [];
var deck7 = [];
var sevenDecks = [deck1, deck2, deck3, deck4, deck5, deck6, deck7];
var aceDeck = [];
var transferingCard = null;

window.onload = function (e) {
  // alert("game start");
  e.preventDefault();
  initCards();
  distributeCards();

  // for all deckss
  var cards = document.querySelectorAll(".cards");
  cards.forEach((card) => {
    // card.insertAdjacentHTML("beforeend", `<li>${deck1[0]["number"]} ${deck1[0]["cardSuit"]}</li>`);
    card.setAttribute("draggable", true);
    card.addEventListener(
      "drag",
      function () {
        console.log("drag!");
      },
      false
    );
  });

  // for left deck
  var totalDeckHTML = document.querySelector(".totalDeckList");
  for (let i = 0; i < leftDeck.length; i++) {
    totalDeckHTML.insertAdjacentHTML(
      "beforeend",
      `<li>${leftDeck[i]["number"]}\u00A0\u00A0\u00A0\u00A0${leftDeck[i]["cardSuit"]}</li>`
    );
  }

  // for 7 decks
  //        `<li>${currenDeckListElem[j]["number"]}\u00A0\u00A0\u00A0\u00A0${currenDeckListElem[j]["cardSuit"]}</li>`
  var deckArr = [];
  for (let index = 1; index < 8; index++) {
    deckArr.push(document.querySelector(`.deck${index}List`));
  }
  for (let i = 0; i < 7; i++) {
    var currentDeck = deckArr[i];
    var currenDeckListElem = sevenDecks[i];
    for (let j = 0; j < currenDeckListElem.length; j++) {
      currentDeck.insertAdjacentText(
        "beforeend",
        `${currenDeckListElem[j]["number"]}\u00A0\u00A0\u00A0\u00A0${currenDeckListElem[j]["cardSuit"]}\n`
      );
    }
  }

  // test debug
  var d1 = document.querySelector(".deck1").childNodes[3].textContent;
  console.log("test");
  console.log(d1);
};

const dragEvent = (ev) => {
  ev.dataTransfer.setData("text", ev.target.id);
  console.log(ev.target.id);
};

const dropEvent = (ev) => {
  var data = ev.dataTransfer.getData("text");
  ev.target.appendChild(document.getElementById(data));
};

const allowDrag = (ev) => {
  ev.preventDefault();
};

// generate cards
const initCards = () => {
  var cardNum = "";
  var suit = "";
  for (let i = 0; i < 13; i++) {
    for (let j = 0; j < 4; j++) {
      switch (j) {
        case 0:
          suit = "club";
          break;
        case 1:
          suit = "diamond";
          break;
        case 2:
          suit = "heart";
          break;
        case 3:
          suit = "spade";
          break;

        default:
          break;
      }
      cardNum = i + 1;
      switch (i) {
        case 1:
          cardNum = "A";
          break;
        case 10:
          cardNum = "J";
          break;
        case 11:
          cardNum = "Q";
          break;
        case 12:
          cardNum = "K";
          break;

        default:
          break;
      }
      //
      const card = { number: cardNum, cardSuit: suit };
      totalDeck.push(card);
    }
  }
};

const distributeCards = () => {
  // TODO: delete initCard() after finish test
  initCards();
  //console.log(totalDeck);

  // generate unique index numbers from 1 to 52
  var randIndex = [];
  while (randIndex.length < 52) {
    var r = Math.floor(Math.random() * 52) + 1;
    if (randIndex.indexOf(r) === -1) randIndex.push(r);
  }
  //console.log(randIndex);

  // shuffle to each decks
  copyTotalDeck = [...totalDeck];

  // to total deck 28 cards
  for (let leftDeckIndex = 0; leftDeckIndex < 24; leftDeckIndex++) {
    leftDeck.push(copyTotalDeck[randIndex[leftDeckIndex] - 1]);

    //console.log(copyTotalDeck[randIndex[leftDeckIndex] - 1]);
  }
  for (let deck1Index = 24; deck1Index < 25; deck1Index++) {
    deck1.push(copyTotalDeck[randIndex[deck1Index] - 1]);
  }
  for (let deck1Index = 25; deck1Index < 27; deck1Index++) {
    deck2.push(copyTotalDeck[randIndex[deck1Index] - 1]);
  }
  for (let deck1Index = 27; deck1Index < 30; deck1Index++) {
    deck3.push(copyTotalDeck[randIndex[deck1Index] - 1]);
  }
  for (let deck1Index = 30; deck1Index < 34; deck1Index++) {
    deck4.push(copyTotalDeck[randIndex[deck1Index] - 1]);
  }
  for (let deck1Index = 34; deck1Index < 39; deck1Index++) {
    deck5.push(copyTotalDeck[randIndex[deck1Index] - 1]);
  }
  for (let deck1Index = 39; deck1Index < 45; deck1Index++) {
    deck6.push(copyTotalDeck[randIndex[deck1Index] - 1]);
  }
  for (let deck1Index = 45; deck1Index < 52; deck1Index++) {
    deck7.push(copyTotalDeck[randIndex[deck1Index] - 1]);
  }
};

const cardDragMove = (ev) => {
  const targetClass = ev.target.className;
  const tgtClassArr = targetClass.split(" ");

  if (tgtClassArr.includes("cards")) {
    console.log("contains cards");
  }
  console.log("------------------------");
  console.log(ev.target.childNodes[3].textContent);
  const currentCardContextList =
    ev.target.childNodes[3].textContent.split("\n");
  console.log(currentCardContextList);
  console.log(currentCardContextList.length);
  // var d1 = document.querySelector("." + targetClass).childNodes[3].textContent;

  
};

const cardDropMove = () => {};
window.addEventListener("click", cardDragMove);
/* const dragEvent = (ev) => {
  ev.dataTransfer.setData("text", ev.target.id);
  console.log(ev.target.id);
};

const dropEvent = (ev) => {
  var data = ev.dataTransfer.getData("text");
  ev.target.appendChild(document.getElementById(data));
}; */

//cardDragMove();
