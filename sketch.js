var rocket, rocket_img, laser_img, planetGroup, lives, livesGroup;
var bg, bg_img, alien_img, asteroid_img, comet_img, astronaut_img;
var life, life_img, obstaclesGroup, gamestate, laserGroup, gameOver, over_img;
var moon_img, saturn_img, mars_img, jupiter_img, earth_img, star_img;
var restart, restart_img;

function preload(){
 rocket_img = loadImage('Sprites/rocket.png');
 bg_img = loadImage ('Sprites/Bg 1.jpg');
 alien_img = loadImage ('Sprites/alien 2.png');
 life_img = loadImage ('Sprites/Heart.png');
 comet_img = loadImage ('Sprites/comet.png');
 asteroid_img = loadImage ('Sprites/Asteroids.png');  
 astronaut_img = loadImage ('Sprites/Astronaut.png');
 moon_img = loadImage ('Sprites/moon.png');
 saturn_img = loadImage ('Sprites/saturn.png');
 mars_img = loadImage ('Sprites/Mars.png');
 jupiter_img = loadImage ('Sprites/jupiter.png');
 earth_img = loadImage ('Sprites/earth.png');
 star_img = loadImage ('Sprites/star.png');
 laser_img = loadImage ('Sprites/laser.png');
 over_img = loadImage('Sprites/Game over.png');
 restart_img = loadImage ('Sprites/restart.png');

}
function setup(){
createCanvas(displayWidth, displayHeight - 150);
 bg = createSprite(width/2, height/2);
 bg.addImage(bg_img);

 rocket = createSprite(width / 2,height - 100,10,10);
 rocket.addImage(rocket_img);
 rocket.scale = 0.5;
 rocket.setCollider('circle', 0, 0, 150);  
//  rocket.debug = true;

gameOver = createSprite (width/2, height/2, 40, 20);
gameOver.addImage(over_img);
gameOver.visible = false;

restart = createSprite (width/2, height/2 + 25, 30, 10);
restart.addImage(restart_img);
restart.scale = 0.1;
restart.visible = false;


 lives = 3;
 
  obstaclesGroup = new Group();
  laserGroup = new Group();
  planetGroup = new Group();
  // livesGroup = new Group();
  gamestate = 'play';
  bg.velocityY = 5;
//  console.log(displayHeight);
}

function draw(){

  console.log(lives);
  if (gamestate=='play'){
    bg.velocityY = bg.velocityY + 0.01;
    bg.velocityX = 0;
   if (bg.y > height){
    bg.y = height/2;
   }
 
    // rocket.x = mouseX;
    if (keyDown(RIGHT_ARROW)){
      rocket.x = rocket.x + 8;
    }

    if(keyDown(LEFT_ARROW)){
      rocket.x = rocket.x -   8;
    }
    
    createObstacles();
    createPlanets();
    if (keyDown('space')){
      shootLaser();
    }
    
    if (obstaclesGroup.isTouching(rocket)){
      
      lives--
      obstaclesGroup.destroyEach();
    }
    if(lives==0){
      gamestate = 'end';
    }

    if (laserGroup.isTouching(obstaclesGroup)){
      obstaclesGroup.destroyEach();
      laserGroup.destroyEach();
    }

    if(planetGroup.isTouching(rocket)){
      lives++
      planetGroup.destroyEach();  
    }

    if (laserGroup.isTouching(planetGroup)){
      planetGroup.destroyEach();
      laserGroup.destroyEach();
      lives--
    }
    
  }
  else{
    bg.velocityY = 0;
    rocket.velocityX = 0;
    obstaclesGroup.setVelocityYEach(0) ;
    planetGroup.setVelocityYEach(0);
    obstaclesGroup.setLifetimeEach(-1);
    gameOver.visible = true;
    restart.visible = true
  }

  if(mousePressedOver(restart)){
    reset()

  }

  drawSprites();
  var x = width/2;
  for(var i = 0; i < lives; i++) {
    // life = createSprite(x, 30, 20, 20);
    image(life_img, x, 30, 30, 30 );
    x = x + 50;
    // life.addImage (life_img);
    // life.scale = 0.2;

  }
 
}

function reset(){
  console.log('reset');
  gamestate = 'play';
  lives = 3
  gameOver.visible = false;
  restart.visible = false;
  bg.velocityY = 5;
}

function shootLaser(){
  var laser = createSprite(rocket.x, rocket.y, 10, 30);
  laser.velocityY = -5;
  laser.addImage(laser_img);
  laser.scale = 0.2;
  laserGroup.add(laser);

}

function createObstacles(){

if (frameCount%30 == 0){
  var obstacle = createSprite (random(100,width-100),10,20,20);
  obstacle.setCollider('circle', 0, 0, 30);
  // obstacle.debug = true;
  obstacle.velocityY =  bg.velocityY;
  console.log(obstacle.velocityY);
  obstacle.life = height/obstacle.velocityY;
  console.log(obstacle.lifetime);
  var rand = Math.round(random(1,3));
  switch (rand){
    case 1: obstacle.addImage(alien_img);
    obstacle.scale = 0.2;
    break;
          
   case 2: obstacle.addImage (comet_img);
   obstacle.scale = 0.2;
    break;

   case 3: obstacle.addImage (asteroid_img);
   obstacle.scale = 0.5;  
    break;
  }
  obstaclesGroup.add(obstacle)
}
}

function createPlanets(){
  if (frameCount%800 == 0){
    var planet = createSprite (random(100,width - 100), 10, 100, 100);
    // planet.debug = true;
    planet.velocityY = 5;
    planet.lifetime = height/planet.velocityY;
    var rand = Math.round(random(1,6))
    switch (rand){
      case 1: planet.addImage(saturn_img);
      planet.setCollider('circle',0,0,70)
      break; 

      case 2: planet.addImage(moon_img);
      planet.setCollider('circle',0,0,120)  
      break;

      case 3: planet.addImage(mars_img);
      planet.scale = 0.7;
      planet.setCollider('circle',0,0,170)
      break;

      case 4: planet.addImage(star_img);
      planet.scale = 0.2
      planet.setCollider('circle',0,0,80)
      break;

      // case 5: planet.addImage(earth_img);
      // planet.scale = 0.7; 
      // planet.setCollider('circle',0,0,130);
      // break;

      case 6: planet.addImage(jupiter_img);
      planet.setCollider('circle',0,0,150)
      break;
    }
    
    planetGroup.add(planet); 
  }
 
}