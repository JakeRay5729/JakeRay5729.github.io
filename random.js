//below for the button switch on turns
var playerHealthDisp = document.getElementById('playerHealth');
var enemyHealthDisp = document.getElementById('enemyHealth');
var infoDisp = document.getElementById('info');
//buttons and listeners
var playButton = document.getElementById('play');
var playerTurnButton = document.getElementById('playerTurn');
var enemyTurnButton = document.getElementById('enemyTurn');
//event listener
playButton.onclick = function () {
   play()
};
function play() {
   playerTurnButton.disabled = false;
   enemyTurnButton.disabled = false;
}
playerTurnButton.onclick = function () {
   playerTurn()
};
enemyTurnButton.onclick = function () {
   enemyTurn()
};
function playerTurn() {
   updateDisp();
   playerTurnButton.disabled = true;
   enemyTurnButton.disabled = false;
}
function enemyTurn() {
   updateDisp();
   enemyTurnButton.disabled = true;
   playerTurnButton.disabled = false;
}
function updateDisp() {
   if (enemyTurnButton.disabled == false) {
      infoDisp.innerHTML = "Player Turn";
   }
   if (playerTurnButton.disabled == false) {
      infoDisp.innerHTML = "Enemy Turn";
   }
}
//for random number generator
var randomNumber = 0;
function getRandomInt(max) {
   return Math.floor(Math.random() * Math.floor(max));
}
var randomButton = document.getElementById('random');
//event listener
randomButton.onclick = function () {
   randomNumber = getRandomInt(100);
   infoDisp.innerHTML = randomNumber;
   var i;
   for (i = 0; i < randomNumber; i++) {
      infoDisp.innerHTML +="!";
   }
}
//below for text box
function submit(text) {
   if (text != "") {
      var canvas = document.getElementById("canvas");
      var ctx = canvas.getContext("2d");
      ctx.font = "30px Arial";
      ctx.fillText(text, 10, 50);
   } else {
      var canvas = document.getElementById("canvas");
      var ctx = canvas.getContext("2d");
      ctx.font = "30px Arial";
      ctx.fillText("Aww man, you should have typed something", 10, 50);
   }
}