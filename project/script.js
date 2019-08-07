
// var myGamePiece;
const otherCars = [];
// var myScore;
var myCar

let img = document.getElementById("car");
const canvasWidth = 610;
const canvasHeight = 610;
const carWidth = 100;
const carHeight = 150;
const color = "red"
const posisiAwalMyCar = 850

// (width, height, color, x, y, type) {
function startGame() {
    const newLocal = canvasHeight - carHeight;
    myCar = new componentA(carWidth, carHeight, 235,newLocal , "myCar");
    // otherCar = new componentA(100, 150, "red", 235, canvasHeight - carHeight, "otherCar");
    // myScore = new component("30px", "Consolas", 280, 40, "text");
    myGameArea.start();
}

var myGameArea = {
    canvas : document.createElement("canvas"),
    start : function() {
        this.canvas.width = canvasWidth;
        this.canvas.height = canvasHeight;
        this.context = this.canvas.getContext("2d");
        document.body.insertBefore(this.canvas, document.body.childNodes[0]);
        this.frameNo = 0;
        this.interval = setInterval(updateGameArea, 5);
        window.addEventListener('keydown', function (e) {
            e.preventDefault();
            myGameArea.keys = (myGameArea.keys || []);
            myGameArea.keys[e.keyCode] = (e.type == "keydown");
        })
        window.addEventListener('keyup', function (e) {
            myGameArea.keys[e.keyCode] = (e.type == "keydown");
        })
        },
    clear : function() {
        this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
    }
}

function componentA(width, height, x, y, type) {
    this.type = type;
    this.score = 0;
    this.width = width;
    this.height = height;   
    this.x = x;
    this.y = y;
    this.bounce;

    this.update = function() {
        ctx = myGameArea.context;
        if (this.type == "text") {
            ctx.font = this.width + " " + this.height;
            ctx.fillStyle = color;
            ctx.fillText(this.text, this.x, this.y);
        } else if (this.type === "myCar"){
            img = document.getElementById("car");
            ctx.drawImage(img, this.x, this.y, this.width, this.height);
        } else if (this.type === "otherCar"){
            img = document.getElementById("car");
            ctx.drawImage(img, this.x, this.y, this.width, this.height);
        }
    }

    
    this.crashWithOtherCars = (otherobj) => {
        let myleft = this.x;
        let myright = this.x + (this.width);
        let mytop = this.y;
        let mybottom = this.y + (this.height);
        let otherleft = otherobj.x;
        let otherright = otherobj.x + (otherobj.width);
        let othertop = otherobj.y;
        let otherbottom = otherobj.y + (otherobj.height);
        let gap_y

        if (this.y > otherobj.y){
            gap_y= mytop - otherbottom
        } else {
            gap_y = othertop - mybottom // ketika mycar diatas
        }


        // lawan dikanan
        if (this.x < otherobj.x){
            if (myright - 10 >= otherleft && gap_y <= -5){
                return true
            }
        } else if (this.x >= otherobj.x) {
            if (otherright - 10 >= myleft && gap_y <= -5){
                return true
            }
        }
        return false;
    }

    this.crashWithSide = () => {
        let myleft = this.x;
        let myright = this.x + (this.width);

        if (myleft < 20){
            return 'kiri'
        } else if (myright > 590) {
            return 'kanan'
        }
        return 
    }
}

function updateGameArea() {
    for (i = 0; i < otherCars.length; i += 1) {
        if (myCar.crashWithOtherCars(otherCars[i])) {
            return;
        } 
    }

    


    myGameArea.clear();
    myGameArea.frameNo += 1;
    if (myGameArea.frameNo == 1 || everyinterval(350)) {
        lineChoice = [45, 235, 425]
        posisiy = - carHeight
        // (width, height, x, y, type) {
        lineIndex = Math.floor(Math.random()*lineChoice.length);
        line = lineChoice[lineIndex]

        otherCars.push(new componentA(carWidth, carHeight, line, posisiy, "otherCar"));
    }

    // console.log(otherCars)

    for (i = 0; i < otherCars.length; i += 1) {
        otherCars[i].y += 1;
        otherCars[i].update();
        
    }
    // delete
    if (myGameArea.frameNo > 1000 && everyinterval(350)){
        otherCars.shift()
        console.log(otherCars)
    }
    

    // cek crashside
    let checkCrash = myCar.crashWithSide()
    if ( checkCrash == 'kanan'){
        myCar.bounce = -5
        myCar.x -= 1
    } else if (checkCrash == 'kiri'){
        myCar.bounce = 5
        myCar.x += 1

    } else {
        if (myCar.bounce <0 ){
            myCar.x += myCar.bounce
            myCar.bounce += 1
        } else if (myCar.bounce > 0){
            myCar.x += myCar.bounce
            myCar.bounce -=1
        } else {
            if (myGameArea.keys && myGameArea.keys[37]) {myCar.x -= 1; }  //kiri
            if (myGameArea.keys && myGameArea.keys[39]) {myCar.x += 1; } // kanan
            if (myGameArea.keys && myGameArea.keys[38]) {myCar.y -= 0.5; } //bawah
            if (myGameArea.keys && myGameArea.keys[40]) {myCar.y += 0.5; } //atas
        }
    }
    


    // myScore.text="SCORE: " + myGameArea.frameNo;
    // myScore.update();    
    // myCar.newPos();
    myCar.update();
}

function everyinterval(n) {
    if ((myGameArea.frameNo / n) % 1 == 0) {return true;}
    return false;
}




