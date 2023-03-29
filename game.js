var myGamePiece;
var myObstacles = [];
var myCrewmates = [];
var myColors = [];
var myCorpses = [];
var myScore;
var speed = 1;
var score = 0;

var start = document.getElementById("start");

var kill = document.getElementById("killSound");
var death = document.getElementById("deathSound");
var music = document.getElementById("backgroundMusic");
var gameOver = false;

function startGame() {
    start.style.display = 'none';
    myGamePiece = new component(60, 60, "red", 100, 120, "object", "Red.png");
    myGamePiece.gravity = 0.05;
    myScore = new component("30px", "Consolas", "black", 800, 40, "text");
    myGameArea.start();
    music.volume = 0.5;
    music.play();
}

var myGameArea = {
    canvas : document.getElementById("gameCanvas"),
    start : function() {
        this.canvas.width = 960;
        this.canvas.height = 540;
        this.context = this.canvas.getContext("2d");
        this.frameNo = 0;
        this.interval = setInterval(updateGameArea, 20);
        },
    clear : function() {
        this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
    }
}

function component(width, height, color, x, y, type, src) {
    this.type = type;
    this.score = 0;
    this.width = width;
    this.height = height;
    this.speedX = 0;
    this.speedY = 0;    
    this.x = x;
    this.y = y;
    this.gravity = 0;
    this.gravitySpeed = 0;
    this.update = function() {
        ctx = myGameArea.context;
        if (this.type == "text") {
            ctx.font = this.width + " " + this.height;
            ctx.fillStyle = color;
            ctx.fillText(this.text, this.x, this.y);
        } if (this.type == "object") {
            ctx = myGameArea.context;

            crewmate_image = new Image();
            crewmate_image.src = `AmogusArt/${src}`;
            ctx.drawImage(crewmate_image, this.x, this.y, this.width, this.height);
        }
    }
    this.newPos = function() {
        this.gravitySpeed += this.gravity;
        this.x += this.speedX;
        this.y += this.speedY + this.gravitySpeed;
        this.hitBottom();
        this.hitTop();
    }
    this.hitBottom = function() {
        var rockbottom = myGameArea.canvas.height - this.height;
        if (this.y > rockbottom) {
            this.y = rockbottom;
            this.gravitySpeed = 0;
        }
    }
    this.hitTop = function() {
    	var cloud9 = 0;
        if (this.y < cloud9) {
        	this.y = cloud9;
            this.gravitySpeed = 0;
        }
    }
    
    this.crashWith = function(otherobj) {
        var myleft = this.x;
        var myright = this.x + (this.width);
        var mytop = this.y;
        var mybottom = this.y + (this.height);
        var otherleft = otherobj.x;
        var otherright = otherobj.x + (otherobj.width);
        var othertop = otherobj.y;
        var otherbottom = otherobj.y + (otherobj.height);
        var crash = true;
        if ((mybottom < othertop) || (mytop > otherbottom) || (myright < otherleft) || (myleft > otherright)) {
            crash = false;
        }
        return crash;
    }
}

function updateGameArea() {
    var x, height, gap, minHeight, maxHeight, minGap, maxGap, crewmateColorNum, crewmateColor;
    for (i = 0; i < myObstacles.length; i += 1) {
        if (myGamePiece.crashWith(myObstacles[i])) {
            var deathMessage = new component("30px", "Consolas", "black", 270, 270, "text");
            deathMessage.text = " You Got Caught Being Sus!";
            deathMessage.update();
            music.pause();

            if (gameOver == false){
                death.play();
                gameOver = true;
            }
            return;
        } 
    }
    for (i = 0; i < myCrewmates.length; i += 1) {
        if (myGamePiece.crashWith(myCrewmates[i])) {
            myCorpses.push(new component(50, 50, "color", myCrewmates[i].x, myCrewmates[i].y, "object", myColors[i]));
            myCrewmates.splice(i, 1);
            myColors.splice(i, 1);
            kill.play();
            score ++;
        }
    }
    myGameArea.clear();
    myGameArea.frameNo += 1;
    if (myGameArea.frameNo == 1 || everyinterval(200/speed)) {
        x = myGameArea.canvas.width;
        minHeight = 20;
        maxHeight = 200;
        height = Math.floor(Math.random()*(maxHeight-minHeight+1)+minHeight);
        minGap = 100;
        maxGap = 200;
        gap = Math.floor(Math.random()*(maxGap-minGap+1)+minGap);
        myObstacles.push(new component(40, height, "green", x, 0, "object", "PipeBody.png"));
        myObstacles.push(new component(40, 64, "green", x, height - 64, "object", "PipeU.png"));
        myObstacles.push(new component(40, x - height - gap, "green", x, height + gap, "object", "PipeBody.png"));
        myObstacles.push(new component(40, 64, "green", x, height + gap, "object", "Pipe.png"));

        if (everyinterval(600)) {
            crewmateColorNum = randomIntFromInterval(1, 8);
            switch (crewmateColorNum) {
                case 1:
                    crewmateColor = "Blue.png";
                    myColors.push("BlueDead.png");
                    break;
                case 2:
                    crewmateColor = "Green.png";
                    myColors.push("GreenDead.png");
                    break;
                case 3:
                    crewmateColor = "Lime.png";
                    myColors.push("LimeDead.png");
                    break;
                case 4:
                    crewmateColor = "Pink.png";
                    myColors.push("PinkDead.png");
                    break;
                case 5:
                    crewmateColor = "Purple.png";
                    myColors.push("PurpleDead.png");
                    break;
                case 6:
                    crewmateColor = "Teal.png";
                    myColors.push("TealDead.png");
                    break;
                case 7:
                    crewmateColor = "White.png";
                    myColors.push("WhiteDead.png");
                    break;
                case 8:
                    crewmateColor = "Yellow.png";
                    myColors.push("YellowDead.png");
                    break;
                default:
                    console.log("Something has gone wrong");
                    break;
            }
            myCrewmates.push(new component(60, 60, "color", x, height + gap / 2 - 32, "object", crewmateColor));
        }

        if (everyinterval(2000)) {
            speed ++;
        }
    }
    for (i = 0; i < myObstacles.length; i += 1) {
        myObstacles[i].x -= speed;
        myObstacles[i].update();
    }
    for (i = 0; i < myCrewmates.length; i += 1) {
        myCrewmates[i].x -= speed;
        myCrewmates[i].update();
    }
    for (i = 0; i < myCorpses.length; i += 1) {
        myCorpses[i].x -= speed;
        myCorpses[i].update();
    }

    myScore.text="SCORE: " + score;
    myScore.update();
    myGamePiece.newPos();
    myGamePiece.update();
}

function everyinterval(n) {
    if ((myGameArea.frameNo / n) % 1 == 0) {return true;}
    return false;
}

function accelerate(n) {
    myGamePiece.gravity = n;
    
}

function randomIntFromInterval(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
  }