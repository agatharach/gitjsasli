var myMarkas = [];
var mySideWalks = [];


function startGame() {
    for (let i=0;i < 10; i++){
        x = 0;
        y = 0;
        width1 = 15;
        height1 = 80;
        width2 = 20;
        height2 = 40;
        gep = 30;
        
        myMarkas.push(new componenthidup(127.5,0+gep,"white",width1,height1));
        myMarkas.push(new componenthidup(372.5,0+gep,"white",width1,height1));  
        
        if (i%2 == 0){
            mySideWalks.push(new componenthidup(0,height2,"black",width2,height2));        
        }else {
            mySideWalks.push(new componenthidup(590,height2,"white",width2,height2));                    
        }
    }
    myGameArea.start();
}

var myGameArea = {
    canvas : document.createElement("canvas"),
    start : function() {
        this.canvas.width = 610;
        this.canvas.height = 610;
        this.context = this.canvas.getContext("2d");
        document.body.insertBefore(this.canvas, document.body.childNodes[0]);
        this.frameNo = 0;
        this.interval = setInterval(updateGameArea, 20);
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
    this.update = function() {
        ctx = myGameArea.context;
        ctx.fillStyle = color;
        ctx.fillRect(this.x, this.y, this.width, this.height);
    }
}

function updateGameArea() {
    var y, height, gap, minHeight, maxHeight, minGap, maxGap;
    myGameArea.clear();
    myGameArea.frameNo += 1;
    // marka
    if (myGameArea.frameNo == 1 || everyinterval(80)) {
        canvas_height = myGameArea.canvas.height;
        gap = 30;
        height = 80;
        myMarkas.push(new componenthidup(127.5, (canvas_height-height+gap), "white", 15, 80));
        myMarkas.push(new componenthidup(372.5, (canvas_height-height+gap), "white", 15, 80));
    }

    // sidewalk
    if (myGameArea.frameNo == 1 || everyinterval(40)) {
        height = 40
        if (i%2 == 0){
            mySideWalks.push(new componenthidup(0,height,"black",20,height));        
        }else {
            mySideWalks.push(new componenthidup(590,height,"white",20,height));                    
        }
    }    

    for (i = 0; i < myMarkas.length; i += 1) {
        myMarkas[i].y += -1;
        myMarkas[i].update();
    }

    for (i = 0; i < mySideWalks.length; i += 1) {
        myMarkas[i].y += -1;
        myMarkas[i].update();
    }

    if(myGameArea.frameNo > 1000 && everyinterval(40)){
        myMarkas.shift();
        console.log(myMarkas);
    }

    if(myGameArea.frameNo > 1000 && everyinterval(80)){
        mySideWalks.shift();
        console.log(mySideWalks);
    }
}

function everyinterval(n) {
    if ((myGameArea.frameNo / n) % 1 == 0) {return true;}
    return false;
}

