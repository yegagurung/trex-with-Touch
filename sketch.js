var trex,ground,invisible,gameover,cactuses,fluffy,restart;
var score = 0
var trexrunning,trexcollided,groundimage,cloudimage,ob1,ob2,ob3,ob4,ob5,ob6;
var gameoverimage, restartimage;
var start= 1
var p;
var bell;
var jump;
var end=0

var gamestate= start 
function preload() {
trexrunning=loadAnimation("trex1.png","trex3.png", "trex4.png");
trexcollided=loadAnimation("trex_collided.png");
  groundimage=loadImage("ground2.png")
cloudimage=loadImage("cloud.png");
ob1=loadImage("obstacle1.png");
ob2=loadImage("obstacle2.png");  
ob3=loadImage("obstacle3.png"); 
ob4=loadImage("obstacle4.png"); 
ob5=loadImage("obstacle5.png"); 
ob6=loadImage("obstacle6.png"); 
p=loadSound("Gun+357+Magnum.mp3");
bell=loadSound("Bike-bell-ring-sound-effect.mp3");
jump=loadSound("Mario-jump-sound.mp3");  
gameoverimage=loadImage("gameOver.png");
restartimage=loadImage("restart.png");
}
function setup() {
createCanvas(windowWidth,windowHeight);

trex= createSprite(27,370,10,10);
trex.addAnimation("trex", trexrunning);
trex.scale=0.5;
//trex.debug=true;
//trex.setCollider("circle",0,0,40);
ground= createSprite(0,380,400,10);
ground.addImage(groundimage);


invisible= createSprite(0,390,400,10);
invisible.visible=false;
 


cactuses = createGroup();
 fluffy = createGroup();

 gameover= createSprite(200,170);
gameover.addImage(gameoverimage);
restart= createSprite(200,240);
restart.addImage(restartimage);
gameover.visible=false;
restart.visible=false;
}
function draw() {
  background("white");
  textSize(17);
  text("score: " + score,180,60);

if (gamestate==start) {
ground.velocityX=-(4+score/100);    
  
  if (ground.x<0) {
  ground.x=ground.width/2;  
  }


score=score+Math.round(frameRate()/60);

  if (touches.length>0||keyDown("space")&&trex.y>359) {  
  trex.velocityY=-16;
  jump.play();
  touches=[]
  }
  
  //gravity
  trex.velocityY=trex.velocityY+0.8;
  trex.collide(invisible);




clouds();
succulents();
if (trex.isTouching(cactuses)) {
p.play()

gamestate=end;  
trex.changeAnimation("trex_collided",trexcollided);
gameover.visible=true;
restart.visible=true;
}

  
  
}
else if(gamestate==end){
ground.velocityX=0;
trex.velocityY=0;

cactuses.setVelocityXEach(0);  
fluffy.setVelocityXEach(0);

if (mousePressedOver(restart)||touches.length>0) {
touches=[]
  gamestate=start;  
score=0;
gameover.visible=false;
restart.visible=false;  
trex.changeAnimation("trex",trexrunning);
  
}

  
} 

    
if (score%100==0&&score>0) {
bell.play();    
  }
    
  
  drawSprites();  
  }
  
function clouds() {
  if (frameCount%60==0) {
    
  
  cloud= createSprite(350,Math.round(random(60,200)),10,10);
  cloud.addImage(cloudimage);    
  cloud.scale= 1.3;
  cloud.velocityX= -(4+score/100);    
  cloud.lifetime=88;
  cloud.depth=trex.depth; 
  trex.depth=trex.depth+1;
  fluffy.add(cloud);

                
  }
  }
  function succulents() {
  if (frameCount%100==0) {
  select=Math.round(random(1,6));  
  
 cactus= createSprite(350,370,10,10);
 switch(select){
  case 1:
  cactus.addImage(ob1);
  break;
   case 2:
  cactus.addImage(ob2);
  break;
   case 3:
  cactus.addImage(ob3);
  break;
   case 4:
  cactus.addImage(ob4);
  break;
   case 5:
  cactus.addImage(ob5);
  break;
   case 6:
  cactus.addImage(ob6);
  break;
  default:
  break;
 }
  cactus.scale= 0.7;
  cactus.velocityX= -(4+score/100);    
  cactus.lifetime=134;
  cactus.depth= trex.depth; 
  trex.depth=trex.depth+1;
 cactuses.add(cactus);   
    }
  }