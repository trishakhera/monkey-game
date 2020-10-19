var PLAY = 1
var END =0
var gameState = PLAY;

var monkey , monkey_running
var banana ,bananaImage, obstacle, obstacleImage
var FoodGroup, obstacleGroup
var score
var survivalTime = 0


function preload(){
  
  
  monkey_running =            loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png")
  
  bananaImage = loadImage("banana.png");
  obstaceImage = loadImage("obstacle.png");
 
}



 function setup() {
   createCanvas(600,400);

   monkey = createSprite(90,220,20,20);
   monkey.addAnimation("moving", monkey_running);
   monkey.scale = 0.1
   
   ground = createSprite(400,340,900,10);
   ground.velocityX = -4;
   ground.x=ground.width/2;
   console.log(ground.x)
   
  
   bananasGroup = createGroup();
   rockGroup = createGroup();
   
   monkey.setCollider("circle",0,40,215)
   
   score = 0;
  
 }


 function draw() {
  background("lightblue")
  
    stroke("white");
    textSize(17);
    fill("white");
    text("Score: " + score, 500,30);
   
    stroke("black");
    textSize(17);
    fill("black");
 
    text("Survival Time: " + survivalTime, 30,30);
   
   if(gameState === PLAY){
       ground.velocityX = -4;
      
     
       if(ground.x<0){
       ground.x = ground.width/2;
      }
     
      if(keyDown("space") && monkey.y> 195){
       monkey.velocityY = -10
       }
   
     monkey.velocityY = monkey.velocityY+ 0.8
     
     survivalTime = Math.round(frameCount/frameRate())
     spawnBananas();
     spawnObstacle();
  
     if( bananasGroup.isTouching(monkey)){
       bananasGroup.destroyEach();
       score = score+2
     }
     
     if(rockGroup.isTouching(monkey)){
       gameState = END;
     }
   }
   
    else if(gameState === END){
        ground.velocityX = 0;
        monkey.velocityY = 0;
        monkey.velocityX = 0;
      
       rockGroup.setLifetimeEach(-1);
       bananasGroup.setLifetimeEach(-1);
     
       rockGroup.setVelocityXEach(0);
       bananasGroup.setVelocityXEach(0);
      
    }
   
   
   monkey.collide(ground)
  
  drawSprites();
}

 function spawnBananas(){
 if (frameCount % 60 === 0) {
    banana = createSprite(600,260,40,10);
    banana .y = Math.round(random(155,180));
    banana.addImage(bananaImage);
    banana.scale = 0.08;
    banana.velocityX = -5;
    
    banana.lifetime = 134;
   
    banana.depth = monkey.depth;
    monkey.depth = monkey.depth + 1;
    
    bananasGroup.add( banana);
    }
 }

 function  spawnObstacle(){
   if(frameCount% 80 === 0){
     rock = createSprite(600,390,40,10);
     rock.y = Math.round(random(303,304));
     rock.addImage(obstaceImage);
     rock.scale = 0.17;
     rock.velocityX = -4;
     
     rock.lifetime = 150;
     
      rockGroup.add(rock);
   }
 }
 
