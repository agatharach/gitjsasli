// var myGamePiece;
const otherCars = [];
// var myScore;
var myCar
var myMarkas = [];
var mySideWalks = [];


////modal
// Get the modal
var modal
var myCoints = [];

// Get the <span> element that closes the modal
var span = document.getElementsByClassName("close")[0];

//////////////////
let img = document.getElementById("car");




const canvasWidth = 610;
const canvasHeight = 640;
const carWidth = 100;
const carHeight = 150;
const cointWidth = 40;
const cointHeight = 50;
// const color = "red"
const posisiAwalMyCar = 850
var myMusic
// (width, height, color, x, y, type) {

function startPage(){
    myMusic = new sound("./assets/sound.mp3");
    myMusic.play();
}

function startGame() {
    document.getElementById("game-canvas").removeChild(document.getElementById("main-menu"));
    const newLocal = canvasHeight - carHeight;
    myCar = new componentA(carWidth, carHeight, 235,newLocal , "myCar");
    myScore = new componentScore(0, 30,"white");
    
    for (let i=0;i < 5; i++){
        x = 0;
        y = 0;
        width1 = 15;
        height1 = 80;
        gep = 80;

        myMarkas.push(new componenthidup(202.5,(i*(height1+gep)),"white",width1,height1));
        myMarkas.push(new componenthidup(392.5,(i*(height1+gep)),"white",width1,height1));
    }
    for(let j=0; j < 17; j++){
        width2 = 20;
        height2 = 40;
        if(j%2 === 0){
            mySideWalks.push(new componenthidup(590,canvasHeight-height2*j,"white",20,height2));                    
            mySideWalks.push(new componenthidup(0,canvasHeight-height2*j,"white",20,height2));
        }else{
            mySideWalks.push(new componenthidup(590,canvasHeight-height2*j,"black",20,height2));
            mySideWalks.push(new componenthidup(0,canvasHeight-height2*j,"black",20,height2));         
        } 
    }
      myScoreArea.start()
      myGameArea.start()
     
      
      
}


var myGameArea = {
    canvas : document.createElement("canvas"),
    start : function() {
        this.canvas.width = canvasWidth;
        this.canvas.height = canvasHeight;
        this.context = this.canvas.getContext("2d");
        document.getElementById("game-canvas").appendChild(this.canvas);
        this.frameNo = 0;
        this.score = 0;
        this.interval = setInterval(updateGameArea, 2);
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

var myScoreArea = {
    canvas : document.createElement("canvas"),
    start : function() {
        this.canvas.width = 150;
        this.canvas.height = 400;
        this.context = this.canvas.getContext("2d");
        document.getElementById("score-canvas").appendChild(this.canvas);
        this.interval = setInterval(updateScoreArea, 50);
        // window.addEventListener('keydown', function (e) {
        //     e.preventDefault();
        //     myGameArea.keys = (myGameArea.keys || []);
        //     myGameArea.keys[e.keyCode] = (e.type == "keydown");
        // })
        // window.addEventListener('keyup', function (e) {
        //     myGameArea.keys[e.keyCode] = (e.type == "keydown");
        // })

        },
    clear : function() {
        this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
    }
}

function componenthidup(x, y, color, width, height) {
    this.width = width;
    this.height = height;    
    this.x = x;
    this.y = y;
    this.color = color;
    this.update = function() {
        ctx = myGameArea.context;
        ctx.fillStyle = this.color;
        ctx.fillRect(this.x, this.y, this.width, this.height);
    }
}


function componentScore(x, y, color){ 
    this.x = x;
    this.y = y;
    this.color = color;
    this.update = function() {
        ctx = myScoreArea.context;
        ctx.font = "20px Georgia"
        // ctx.fillStyle = "red";
        ctx.fillText(this.text, this.x, this.y);
    }
}


function componentA(width, height, x, y, type) {
    this.type = type;
    this.width = width;
    this.height = height;   
    this.x = x;
    this.y = y;
    this.bounce;

    this.update = function() {
        ctx = myGameArea.context;
        if (this.type == "text") {
            ctx.font = this.width + " " + this.height;
            ctx.fillStyle = "red";
            ctx.fillText(this.text, this.x, this.y);
        } else if (this.type === "myCar"){
            img = document.getElementById("car3");
            ctx.drawImage(img, this.x, this.y, this.width, this.height);
        } else if (this.type === "otherCar1"){
            img = document.getElementById("car2");
            ctx.drawImage(img, this.x, this.y, this.width, this.height);
        } else if (this.type === "otherCar2"){
            img = document.getElementById("car1");
            ctx.drawImage(img, this.x, this.y, this.width, this.height);
        } else if (this.type === "koin"){
            imgkoin = document.getElementById("koin");
            ctx.drawImage(imgkoin, this.x, this.y, this.width, this.height);
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
    }

    this.crashWithCoint = (coint) => {
        let myleft = this.x;
        let myright = this.x + (this.width);
        let mytop = this.y;
        let mybottom = this.y + (this.height);
        let cointleft = coint.x;
        let cointright = coint.x + (coint.width);
        let cointtop = coint.y;
        let cointbottom = coint.y + (coint.height);
        let gap_y

        if (this.y > coint.y){
            gap_y= mytop - cointbottom
        }
        // lawan dikanan
        if (this.x < coint.x){
            if (myright  >= cointleft && gap_y <= 0){
                return true
            }
        } else if (this.x >= coint.x) {
            if (cointright >= myleft && gap_y <= 0){
                return true
            }
        }
        return false;
    }
}


function updateScoreArea() {
    myScoreArea.clear()

    myScore.text=`SCORE:   ${Math.floor(myGameArea.frameNo/50)+myGameArea.score}`;

    myScore.update();
}


function updateGameArea() {
    // check crash with other
    for (i = 0; i < otherCars.length; i += 1) {
        if (myCar.crashWithOtherCars(otherCars[i])) {
            myMusic.stop()
            clearInterval(myGameArea.interval);
            modal = document.getElementById("myModal");
            modal.style.setProperty('display','block','important')
            return;
        } 
    }


    // check crash with coints
    for (j = 0; j < myCoints.length; j += 1) {
        if (myCar.crashWithCoint(myCoints[j])) {
            myCoints.pop(j);
            myGameArea.score += 50;
        } 
    }

    myGameArea.frameNo += 1;
    myGameArea.clear();
    
    // marka
    if (myGameArea.frameNo == 40 || everyinterval(160)) {
        canvas_height = myGameArea.canvas.height;
        height = 80;
        myMarkas.push(new componenthidup(202.5, - height, "white", 15, 80));
        myMarkas.push(new componenthidup(392.5, -height, "white", 15, 80));
    }

    // sidewalk
    if (myGameArea.frameNo == 1 || everyinterval(80)) {
        height = 40
        mySideWalks.push(new componenthidup(0,-height,"white",20,height));        
        mySideWalks.push(new componenthidup(590,-height,"white",20,height));                    
        mySideWalks.push(new componenthidup(0,-height*2,"black",20,height));                    
        mySideWalks.push(new componenthidup(590,-height*2,"black",20,height));                    
    }    

    for (i = 0; i < myMarkas.length; i += 1) {
        myMarkas[i].y += 1;
        myMarkas[i].update();
    }

    for (i = 0; i < mySideWalks.length; i += 1) {
        mySideWalks[i].y += 1;
        mySideWalks[i].update();
    }

    if(myGameArea.frameNo > 1000 && everyinterval(160)){
        myMarkas.shift();
        myMarkas.shift();
        // console.log(myMarkas);
    }

    if(myGameArea.frameNo > 1000 && everyinterval(80)){
        mySideWalks.shift();
        mySideWalks.shift();
        mySideWalks.shift();
        mySideWalks.shift();
        // console.log(mySideWalks);
    }

// ################
    // generate new otherCar
    if (myGameArea.frameNo == 1 || everyinterval(350)) {
        lineChoice = [65, 255, 445]
        posisiy = - carHeight
        // (width, height, x, y, type) {
        lineIndex = Math.floor(Math.random()*lineChoice.length);
        line = lineChoice[lineIndex]
        random = Math.floor(Math.random()*2)
        if (random === 1){
            otherCars.push(new componentA(carWidth, carHeight, line, posisiy, "otherCar1"))
        } else {
            otherCars.push(new componentA(carWidth, carHeight, line, posisiy, "otherCar2"))
        }
        ;
    }

    // console.log(otherCars)

    for (i = 0; i < otherCars.length; i += 1) {
        otherCars[i].y += 1;
        otherCars[i].update();
        
    }

    // generate coint
    if (myGameArea.frameNo == 700 || everyinterval(700)) {
        lineChoice = [85, 275, 465]
        posisiy = - cointHeight-carHeight-50
        // (width, height, x, y, type) {
        lineIndex = Math.floor(Math.random()*lineChoice.length);
        line = lineChoice[lineIndex]

        myCoints.push(new componentA(cointWidth, cointHeight, line, posisiy, "koin"));
    }

    // console.log(myCoints)

    for (i = 0; i < myCoints.length; i += 1) {
        myCoints[i].y += 1;
        myCoints[i].update();
        
    }
    // delete
    if (myGameArea.frameNo > 1000 && everyinterval(350)){
        otherCars.shift();
    }


    // if (myGameArea.frameNo > 2000 && everyinterval(1000)){
    //     myCoints.shift();
    // }



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
            if (myGameArea.keys && myGameArea.keys[38]) {
                if (myCar.y >= 0) {myCar.y -= 0.5; }} //atas
            if (myGameArea.keys && myGameArea.keys[40]) {
                if (myCar.y <= canvasHeight - carHeight){ myCar.y += 1;} } //bawah
        }
    }

    myCar.update();
////
}


//// sound 
function sound(src) {
    this.sound = document.createElement("audio");
    this.sound.src = src;
    this.sound.setAttribute("preload", "auto");
    this.sound.setAttribute("controls", "none");
    this.sound.style.display = "none";
    document.body.appendChild(this.sound);
    this.play = function(){
        this.sound.play();
    }
    this.stop = function(){
        this.sound.pause();
    }    
}


function everyinterval(n) {
    if ((myGameArea.frameNo / n) % 1 == 0) {return true;}
    return false;
}


////modal


// When the user clicks the button, open the modal 


span.onclick = function() {
  modal.style.display = "none";
}

