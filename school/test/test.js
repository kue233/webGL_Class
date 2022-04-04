var totalDeck = [];

const getCardsFile = () => {
  var img = document.createElement("img");
  img.src = "./PNG-cards-1.3/PNG-cards-1.3/2_of_clubs.png";
  img.width = "20";
  document.getElementById("div1").appendChild(img);
};

const fileTest = (ev) => {
  var div = document.getElementById("div1");
  if (isSupportFileApi) {
    var file = ev.target.files;
    console.log(file);
    for (let i = 0, f; (f = file[i]); i++) {
      console.log(f.name);
      var img = document.createElement("img");
      img.src = "./PNG-cards-1.3/PNG-cards-1.3/" + f.name;
      img.width = "128";
      img.id = "img" + i.toString();
      console.log(img.id);
      img.style.top = "100px";
      img.addEventListener(
        "onmouseup",
        function (e) {
          //var x = e.clientX - div.offsetLeft;
          //var y = e.clientY - div.offsetTop;
          img.style.top = "100";
          img.style.left = "200";
          img.style.margin = "100";
        },
        false
      );
      document.getElementById("div1").appendChild(img);
    }
  }
};

function isSupportFileApi() {
  if (window.File && window.FileList && window.FileReader && window.Blob) {
    return true;
  }
  return false;
}

const move = (imgId, divId) => {
  var imgElem = document.getElementById(imgId);
  var divElem = document.getElementById(divId);
  if (imgElem == null) return;
  imgElem.onmousedown = function (e) {
    var ev = e || window.event; // comp for IE
    var disX = ev.clientX - divElem.offsetleft;
    var disY = ev.clientY - divElem.offsetTop;
    document.onmousemove = function (e) {
      var ev = e || window.event; // comp for IE
      divElem.style.left = ev.clientX - disX + "px";
      divElem.style.top = ev.clientY - disY + "px";
    };
    document.onmouseup = function () {
      document.onmousemove = null;
      document.onmouseup = null;
    };
  };
};

const gameLogic = () => {
  move();
};

window.onload = gameLogic();
move();
