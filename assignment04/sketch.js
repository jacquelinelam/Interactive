var canvas
var mouseImg // Current mouse image
var hammerUp, hammerDown // Hammer up and down images
var target // Target image
//9 mole objects
var mole1, mole2, mole3, mole4, mole5, mole6, mole7, mole8, mole9
var moles = [mole1, mole2, mole3, mole4, mole5, mole6, mole7, mole8, mole9]

// Scoring
var hits = 0
var misses = 0

var showStartScreen = true
var showGameOverText = false
var timer = 30

// Preload assets
function preload() {
  hammerUp = loadImage('images/hammer_up.png')
  hammerDown = loadImage('images/hammer_down.png')
  target = loadImage('images/hela.png')
  badTarget = loadImage('images/capt.png')
  goldTarget = loadImage('images/loki.png')

  regularHit = loadSound('sounds/hammer_hit.mp3')
  goldHit = loadSound('sounds/golden_state.mp3')
  badHit = loadSound('sounds/bad_state.mp3')
}

function setup() {
  // create our canvas and store a reference to it
  canvas = createCanvas(500, 500)
  canvas.parent("#game-section")

  // Instantiate 9 mole objects
  mole1 = new Mole(100, 100)
  mole2 = new Mole(250, 100)
  mole3 = new Mole(400, 100)
  mole4 = new Mole(100, 250)
  mole5 = new Mole(250, 250)
  mole6 = new Mole(400, 250)
  mole7 = new Mole(100, 400)
  mole8 = new Mole(250, 400)
  mole9 = new Mole(400, 400)
  moles = [mole1, mole2, mole3, mole4, mole5, mole6, mole7, mole8, mole9]

  imageMode(CENTER)
  noCursor() // Turn off standard mouse cursor
  mouseImg = hammerUp
}

function draw() {
  background(0)

  if (!displayStartScreen()) {
    // Display and update each mole
    for (var i = 0; i < moles.length; i += 1) {
      moles[i].display()
      moles[i].update()
    }
  }
  // Draw hammer at the mouse's position
  image(mouseImg, mouseX, mouseY)

  // Escape to start screen
  if (keyIsDown(ESCAPE)) {
    showStartScreen = true
  }

  // Increment timer
  if (isInGame()) {
    if (frameCount % 60 == 0 && timer > 0) {
      timer--;
    }
    if (timer <= 0) {
      showGameOverText = true
      showStartScreen = true
    }
  } else {
    timer = 30
  }

  // Display hits and misses
  noStroke()
  textSize(30)
  if (timer <= 10) {
    fill("red")
  } else {
    fill(255)
  }
  text(timer, 233, 35)
  textSize(14)
  fill(255)
  text("ESC to return to start screen", 5, 20)
  text("Hits: " + hits, 430, 20)
  text("Misses: " + misses, 430, 35)
}

function displayStartScreen() {
  if (isInGame()) {
    return false
  }

  textSize(30)
  fill(255)
  if (showGameOverText) {
    var totalScore = hits - (2 * misses)
    text("GAME OVER", 160, 120)
    fill("yellow")
    textSize(20)
    text(`Total points: ${hits} - (2 x ${misses}) = ${totalScore}`, 120, 160)
  }

  textSize(15)
  fill(255)
  text("Press ENTER to start the game!", 150, 220)
  text("Hit Hela for 1 point", 180, 290)
  text("Hit Loki for 5 points!", 180, 305)
  text("Don't hit Captain America or else you'll lose 3 points!", 80, 320)
  text("The game will end in 30 seconds", 140, 390)
  text("Try to get as many points as you can!", 125, 405)

  if (keyIsDown(ENTER)) {
    showStartScreen = false
    showGameOverText = false
    hits = 0
    misses = 0
  }

  return true
}

function isInGame() {
  return !(showStartScreen || showGameOverText)
}

// When mouse is in the clicked state
function mousePressed() {
  mouseImg = hammerDown
  // Check hit for each mole
  for (var i = 0; i < moles.length; i += 1) {
    moles[i].checkHit(mouseX, mouseY)
  }
}

// When mouse is in the click released state
function mouseReleased() {
  mouseImg = hammerUp
}

// Mole class - this class contains everything we need to implement our mole target
class Mole {
  // Instantiates our Mole on create
  constructor(x, y) {
    // all Mole objects should keep track of their own position
    this.xPos = x
    this.yPos = y

    // all Mole objects have two states, 0 or 1
    // 0 = when Mole object is down
    // 1 = when Mole object is up
    this.state = 0

    // How many frames should our object stay in this state?
    this.framesToStayInState = int(random(80, 150))

    // How many frames have we been in this state?
    this.framesInState = 0

    // Mole type determines whether the mole is a regular, gold, or bad mole (0-9)
    // 0-4 is a regular mole, 5-7 is a bad mole, 8-9 is a gold mole
    this.moleType = 0
  }

  isDown() {
    return this.state == 0
  }

  isUp() {
    return this.state == 1
  }

  isRegularMole() {
    return this.moleType <= 4
  }

  isBadMole() {
    return this.moleType >= 5 && this.moleType <= 7
  }

  isGoldMole() {
    return this.moleType >= 8
  }

  isStateExpired() {
    this.framesInState += 1 // Increment counter
    return this.framesInState >= this.framesToStayInState
  }

  toggleState() {
    if (this.isDown()) {
      this.state = 1
      this.moleType = int(random(0, 9))
    } else {
      this.state = 0
    }
    this.framesInState = 0 // Reset counter on state toggle
    this.framesToStayInState = int(random(80, 150)) // Assign new timeout
  }

  display() {
    noFill()
    strokeWeight(10)
    stroke(255)
    ellipse(this.xPos, this.yPos, 90, 90)

    if (this.isUp()) {
      if (this.isRegularMole()) {
        image(target, this.xPos, this.yPos)
      } else if (this.isGoldMole()) {
        image(goldTarget, this.xPos, this.yPos)
      } else {
        image(badTarget, this.xPos, this.yPos)
      }
    }
  }

  update() {
    if (this.isStateExpired()) {
      this.toggleState()
    }
  }

  checkHit(mouseX, mouseY) {
    var distance = dist(this.xPos, this.yPos, mouseX, mouseY)
    if (distance <= 45) {
      if (this.isUp()) {
        if (this.isRegularMole()) {
          hits += 1
          regularHit.play()
        } else if (this.isGoldMole()) {
          hits += 5
          goldHit.play()
        } else if (this.isBadMole()) {
          hits -= 3
          misses += 1
          badHit.play()
        }
        this.toggleState()
      } else {
        misses += 1
      }
    }
  }
}
