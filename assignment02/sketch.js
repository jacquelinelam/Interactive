// global variable to hold bitmap images
var bkground, coconut, paddle;
//paddle position
var xPos, yPos;

//ball position
var xBall, yBall;
//ball speed
var xSpeed, ySpeed;

//coconut position
var xCoconut, yCoconut;
//points
var points = 0;
//misses
var misses = 0;

// Helper function that determines which side of the paddle the ball has contacted
function sideOfContact(xPad, xBall) {
  var to_return = '';
  if (xBall <= xPad) {
    to_return = 'left';
  } else {
    to_return = 'right';
  }
  return to_return
}

// Runs function before all other functions and "blocks"
function preload() {
  //load the images
  bkground = loadImage("images/background.jpg");
  coconut = loadImage("images/coconut.png");
  paddle = loadImage("images/paddle.png");

  //load sound
  bounce = loadSound("sound/bounce.mp3");
  missed = loadSound("sound/missed.mp3");
  score = loadSound("sound/score.mp3");
}

function randomSpeedChange(isX) {
  if (isX) {
    ySpeed = random(-8, 8);
    while (ySpeed === 0 || ySpeed === 1) {
      ySpeed = random(-8, 8);
    }
  } else {
    xSpeed = random(-8, 8);
    while (xSpeed === 0 || xSpeed === 1) {
      xSpeed = random(-8, 8);
    }
  }
}

function setup() {
  // create a canvas element on the page
  createCanvas(500, 500);

  //default paddle position to the middle and bottom of the screen
  xPos = 250;
  yPos = 480;
  //left and right sides of paddle
  lPad = xPos - 25;
  rPad = xPos + 25;

  //default ball position
  xBall = 250;
  yBall = 250;

  //assign random ball speed
  xSpeed = random(2, 8);
  ySpeed = random(2, 8);

  //where is the coconut?
  //objective position not overlaping any border nor is it
  //within 200 pixels of bototm of screen
  xCoconut = random(55, width - 55);
  yCoconut = random(55, height - 235);

}

// draw 'game' loop that automatically executes over and over
function draw() {
   // erase the background
  background(0);
  // draw background image at position 250,250
  imageMode(CENTER);
  image(bkground, 250, 250, 500, 500);

  // create visual borders to screen
  fill(238, 220, 118);
  noStroke();
  rect(490, 0, 10, 500);
  rect(0, 0, 10, 500);
  rect(0, 0, 490, 10);

  //paddle move left when a / A is pressed
  if (keyIsDown("A") || keyIsDown(65)) {
    // subtract from paddle's xPos
    xPos -= 10;
  }
  // paddle move right when d/ D is pressed
  if (keyIsDown("D") || keyIsDown(68)) {
    // add to paddle's xPos
    xPos += 10;
  }

  // paddle to stay within borders
  if (xPos > width - 60) {
    xPos = width - 60;
  }
  if (xPos < 60) {
    xPos = 60;
  }

  // draw paddle
  image(paddle, xPos, yPos, 100, 50);

  // move ball based on random xSpeed & ySpeed
  xBall += xSpeed;
  yBall += ySpeed;

  // when ball hits left / right border
  if (xBall <= 20 || xBall >= width - 20) {
    xSpeed *= -1; //reverse xSpeed
    randomSpeedChange(true);
    bounce.play();
  }
  // bounce ball off when it hits top border
  if (yBall <= 20) {
    ySpeed *= -1; //reverse ySpeed
    randomSpeedChange(false);
    bounce.play();
  }

  // ball + coconut COLLISION DETECTION
  if (dist(xBall, yBall, xCoconut, yCoconut) < 35) {
    //sound to play when ball intersects coconut
    score.play();
    // collision occured, move the coconut
    xCoconut = random(55, width - 55);
    yCoconut = random(55, height - 235);

    // give the user a point
    points += 1;
  }

  //draw ball with no 'strokes' and smooth edges
  fill(38, 117, 48);
  noStroke();
  smooth();
  ellipse(xBall, yBall, 20, 20);

  //draw coconut
  image(coconut, xCoconut, yCoconut, 70, 70);

  //display points
  textSize(15);
  fill(0);
  text("Points: " + points, 30, 40);
  //display misses
  text("Misses: " + misses, 30, 60);

  //bounce ball off paddle
  if (yBall >= 450) {
    if (xBall <= xPos + 60 && xBall >= xPos - 60) {
      if (ySpeed < 8 && ySpeed > -8) {
        ySpeed *= -1; //reverse ySpeed

        var side = sideOfContact(xPos, xBall);
        if (side == 'left') {
          // when ball hits the left side of the paddle, then expel the ball upwards to the left
          if (xSpeed > 0) {
            xSpeed *= -1;
          }
        } else if (side == 'right') {
          // otherwise if right, then expel the ball upwards to the right
          if (xSpeed < 0) {
            xSpeed *= -1;
          }
        }
      }
      //play sound every time the ball bounces
      bounce.play();
    }
  }

  // when ball spring spast paddle
  if (yBall >= 455) {
    xBall = 250;
    yBall =250;
    //increase # of misses
    misses += 1;
    //pick new random X and Y speed
    xSpeed = random(2, 8);
    ySpeed = random (2, 8);
    // play sound when ball misses
    missed.play();
  }
}

