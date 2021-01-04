var PLAY=1;
var END=0;
var gameState=PLAY;



var coin, coinImg, fish, fishImg,fishGroup, iceblock, iceblockImg, icicle, icicleImg,icicleGroup, obstacle, obstacleImg;
var penguin;
var penguinjump;
var penguinwalk;
var backgroundImg,platform;
var ground;
var invground;
var climberGroup;
var score;

function preload() {
    backgroundImg = loadImage("images/bg.PNG");
    //penguinjump=loadImage("images/penguinjump.png");
    penguinwalk=loadAnimation("images/p1.png","images/p2.png");
    coinImg=loadImage("images/coin.png");
    fishImg=loadAnimation("images/f1.png","images/f2.png");
    iceblockImg=loadImage("images/iceblock.png");
    icicleImg=loadImage("images/icicle.png");
    obstacleImg=loadImage("images/obstacle.png");
}

function setup(){
    var canvas = createCanvas(displayWidth-50, displayHeight-300);
    ground = createSprite(1000,300,700,40)
    ground.addImage(backgroundImg)
    ground.velocityX=-9;
    ground.scale=1.4
    invground = createSprite(660, displayHeight-300,displayWidth,20)
    //engine = Engine.create();
    //world = engine.world;
    
   
    //penguinjump=createSprite(150,100,50,200);
    //penguinjump.addImage(penguinjump);
    penguin=createSprite(150, displayHeight-350,50,100);
    penguin.addAnimation("moving",penguinwalk);
   
    climberGroup = new Group()
    fishGroup = new Group()
    icicleGroup = new Group()
score=0;
}

function draw(){
    background("blue");

    
if (gameState===PLAY) {
    if(ground.x<0){
        ground.x=ground.width/2
     }
 
    // Engine.update(engine);
     if (keyDown("space") ) {
         penguin.velocityY=-5
     }
     penguin.velocityY=penguin.velocityY+0.5
 
 if(keyDown(RIGHT_ARROW)){
   penguin.x=penguin.x+3
 }
 
 if (keyDown(LEFT_ARROW)){
  penguin.x=penguin.x-3
 }
 
     spawnClimbers();
     spawnIcicle();
    
     penguin.collide(invground);
 
    if(penguin.isTouching(climberGroup)){
     penguin.velocityX=0;
     penguin.velocityY=0;
    } 
    if(penguin.isTouching(fishGroup)){
        fishGroup.destroyEach()
        score=score+1;
       } 
       if(penguin.isTouching(icicleGroup)){
        icicleGroup.destroyEach()
        gameState=END
       } 
} else if(gameState===END) {
    score=0;
}
 
    drawSprites();
    textSize(30);
    fill("black")
    text("Score:"+score,300,50);
}

function spawnClimbers() {
    if (frameCount%100===0) {
        climber=createSprite(1000,100,50,20);
        climber.addImage(iceblockImg);
        climber.scale=0.7
       climberGroup.add(climber);
        climber.velocityX = -5;
        climber.y=random(displayHeight-600,displayHeight/2+50);
        climber.debug=true
       // climber.setCollider("rectangle",0,10,270,80);
        fish=createSprite(200,100,50,20);
        fish.addAnimation("static",fishImg);
        fish.scale=0.7
        fish.x=climber.x
       fish.velocityX=-5;
        
        fish.y=climber.y-100;
        penguin.depth=climber.depth+1;
        fishGroup.add(fish)
    }
}
function spawnIcicle() {
    if (frameCount%50===0) {
        icicle=createSprite(200,10,50,20);
        icicle.addImage(icicleImg);
        icicle.scale=0.3;
        icicle.velocityY=20;
        icicle.velocityX=-4
        icicle.x=random(50,displayWidth);
        icicleGroup.add(icicle)
        
    }
}
