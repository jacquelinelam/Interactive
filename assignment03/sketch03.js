// Canvas consts
var bgHeight = 400
var bgWidth = 400
var groundY = 370

// Global image vars
var bkground, character, objective, rock, bomb

// Character speed according to cheat mode setting (1-5)
var xSpeed = 3

// Player counters
var points = 0
var hits = 0

// Monkey's initial position
var xPos = bgWidth / 2
var yPos = groundY

// Banana vars
var bX = groundY
var bY = groundY

// Obstacles vars
var fallSpeed = 1
var initRockY = 30
var rockX = 30
var rockY = initRockY
var initBombY = 60
var bombX = 60
var bombY = initBombY

// Whether or not we should skip start screen
var showStartScreen = true
var difficulty = "EASY"

function drawBackground() {
  background(0)
  imageMode(CENTER)
  image(bkground, bgWidth / 2, height / 2, bgWidth, bgWidth)
}

function preload(){
  // load images
  bkground = loadImage("images/forest.png")
  character = loadImage("images/monkey.png")
  objective = loadImage("images/banana.png")
  rock = loadImage("images/rock.png")
  bomb = loadImage("images/bomb.png")

  // load sound
  hit = loadSound("sound/hit.mp3")
  score = loadSound("sound/score.mp3")
}

function setup(){
  var theCanvas = createCanvas(bgWidth, bgHeight)
  theCanvas.parent("#game");
  // // set CSS rules on our canvas element
  // // tell the element to behave like a 'block'
  // theCanvas.style('display', 'block')
  // // set canvas' margin to 'auto' evenly distribute any extra space on both sides of canvas element
  // theCanvas.style('margin', 'auto')


  rockX = random(30, width - 30)
  bombX = random(50, width - 50)
}

// Display stats in the top left corner
function displayStats() {
  if (showStartScreen) {
    return
  }
  textSize(15)
  fill(255)
  text("ESC to return to start screen", 193, 20)
  text("Points: " + points, 325, 40)
  text("Hits: " + hits, 341, 60)
}

// Display start splash screen
function displayStartScreen(){
  if (!showStartScreen) {
    return
  }

  textSize(15)
  fill(255)
  text("Press ENTER to start the game!", 100, 180)

  if (keyIsDown(ENTER)) {
    showStartScreen = false
    bX = bXSpawn()
  } else if (keyIsDown(49)) {
    difficulty = "EASY"
    fallSpeed = 1
  } else if (keyIsDown(50)) {
    difficulty = "MEDIUM"
    fallSpeed = 2
  } else if (keyIsDown(51)) {
    difficulty = "HARD"
    fallSpeed = 3
  }

  text(`You are currently on ${difficulty} difficulty.`, 90, 215)
  text("Press 1 for EASY difficulty", 120, 250)
  text("Press 2 for MEDIUM difficulty", 110, 265)
  text("Press 3 for HARD difficulty", 120, 280)
  text("<--------------- a               Controls                d --------------->", 10, 320)
}

// Updating the speed of the monkey on slider adjustment
function updateRange(clickedRange) {
  // grab the range data as an integer
  xSpeed = int(clickedRange.value)
}

// Returns the best banana x coordinate spawn location
function bXSpawn() {
  var toReturn = random(30, width - 30)
  // Ensure that initial banana spawn isn't too close to the monkey current position
  while (toReturn > xPos - 40 && toReturn < xPos + 40) {
    toReturn = random(30, width - 30)
  }
  return toReturn
}

// Boolean on whether or not a type rock or bomb has collided with the monkey
function obstacleCollision(type) {
  if (type === "rock" && dist(xPos, yPos, rockX, rockY) < 40) {
    return true
  } else if (type === "bomb" && dist(xPos, yPos, bombX, bombY) < 70) {
    return true
  }
  return false
}

function draw() {
  drawBackground()
  displayStartScreen()

  image(character, xPos, yPos, 50, 50) // Draw character - monkey

  // ESC to go back to start screen and reset stats
  if (keyIsDown(ESCAPE)) {
    showStartScreen = true
    points = 0
    hits = 0
  }

  // Character movement listeners w/ border constraint logic
  if (keyIsDown("A") || keyIsDown(65)) {
    if (xPos >= 25) {
      xPos -= xSpeed
    }
  } else if (keyIsDown("D") || keyIsDown(68)) {
    if (xPos <= bgWidth - 25) {
      xPos += xSpeed
    }
  }

  // Collision detection for monkey and banana
  if (dist(xPos, yPos, bX, yPos) < 20) {
    score.play() // Play audio
    bX = bXSpawn() // New randomized position for banana
    points += 1 // Player earns a point
  }

  // If we're in-game
  if (!showStartScreen) {
    image(objective, bX, bY, 50, 50) // Draw the objective - banana

    var rockCollision = obstacleCollision("rock")
    var bombCollision = obstacleCollision("bomb")
    if (rockCollision || bombCollision) {
      hit.play()
      hits += 1
    }

    if (rockY > groundY || rockCollision) {
      rockY = initRockY
      rockX = random(30, width - 30)
    } else { // Simulate falling rock
      rockY += fallSpeed
    }
    image(rock, rockX, rockY, 50, 50)

    if (bombY > groundY || bombCollision) {
      bombY = initBombY
      bombX = random(50, width - 50)
    } else { // Simulate falling bomb
      bombY += (fallSpeed + 1.5)
    }
    image(bomb, bombX, bombY, 100, 100)
  }

  displayStats();
}
