var bgImg, bg, bullet, score;

var PLAY = 1;
var END = 0;
var gameState = PLAY;
function preload() {
  shooterStanding = loadImage("assets/shooter_1.png");
  shooterImg = loadImage("assets/shooter_3.png");
  bgImg = loadImage("assets/bg.jpeg");
  zombieImg = loadImage("assets/zombie.png");
}
function setup() {
  createCanvas(windowWidth, windowHeight);
  bg = createSprite(displayWidth / 2 - 20, displayHeight / 2 - 40);
  bg.addImage(bgImg);
  shooter = createSprite(200, displayHeight / 2);
  shooter.addImage(shooterImg);
  shooter.scale = 0.5;
  zombieGroup = new Group();
  bulletGroup = new Group();
  score = 0;
  bullets = 30;
}

function draw() {
  background("white");
  if ((gameState === PLAY)) {
    if (keyDown("UP_ARROW")) {
      shooter.y -= 30;
    }
    if (keyDown("DOWN_ARROW")) {
      shooter.y += 30;
    }
    if (keyDown("space")) {
      if (bullets >= 0) {
        bullet = createSprite(200, shooter.y - 40, 20, 10);
        bullet.shapeColor = "red";
        bullet.velocityX = 10;
        bulletGroup.add(bullet);
        bullets = bullets - 1;
      }
    }
    spawnZombie();

    if (zombieGroup.isTouching(bulletGroup)) {
      for (var i = 0; i < zombieGroup.length; i++) {
        if (zombieGroup[i].isTouching(bulletGroup)) {
          zombieGroup[i].destroy();
          bulletGroup.destroyEach();
          score = score + 2;
        }
      }
    }
    if (bullets <= 0) {
      gameState = END;
      zombieGroup.setVelocityXEach(0);
    }
    if (zombieGroup.isTouching(shooter)) {
      console.log("end")
      gameState = END;
      zombieGroup.setVelocityXEach(0);
    }
  }
  drawSprites();
  textSize(20);
  fill("black");
  text("Score:" + score, displayWidth - 250, 50);
  if (gameState === END) {
    background(0);
    shooter.destroy();
    bulletGroup.destroyEach();
    zombieGroup.destroyEach();
    textSize(25);
    fill("red");
    text("Game Over", width / 2, height / 2);
  }
}

function spawnZombie() {
  if (frameCount % 60 === 0) {
    var zombie = createSprite(
      random(displayWidth / 2, displayWidth - 100),
      random(100, displayHeight - 100)
    );
    zombie.addImage(zombieImg);
    zombie.scale = 0.1;
    zombieGroup.add(zombie);
    zombie.lifetime = 600;
    if (zombie.x <= 200) {
      gameState = END;
    }
    setTimeout(moveZombie, 1500);
  }
}
function bulletHit(zombie, bullet) {
  zombie.destroy();
  bullet.destroy();
  score = score + 2;
}

function moveZombie() {
  zombieGroup.setVelocityXEach(-2);
}
