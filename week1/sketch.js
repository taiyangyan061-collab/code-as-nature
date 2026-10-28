/*
----- Coding Tutorial by Patt Vira ----- 
Name: Slime Molds (Physarum)
Video Tutorial: https://youtu.be/VyXxSNcgDtg

References: 
1. Algorithm by Jeff Jones:
https://uwe-repository.worktribe.com/output/980579/characteristics-of-pattern-formation-and-evolution-in-approximations-of-physarum-transport-networks

Connect with Patt: @pattvira
https://www.pattvira.com/
----------------------------------------
*/


// ========================================
// GLOBAL VARIABLES
// ========================================

let molds = [];
let num = 4000;
let d;


// ========================================
// SETUP
// Runs once when the sketch starts
// ========================================

function setup() {

  if (window.previewMode) {
    createCanvas(windowWidth, windowHeight);
  } else {
    createCanvas(windowWidth * 0.95, windowHeight * 0.9);
  }

  angleMode(DEGREES);

  d = pixelDensity();

  // Create all of the mold particles
  for (let i = 0; i < num; i++) {
    molds[i] = new Mold();
  }

  // Only show the description on the full Week 1 page
  if (!window.previewMode) {
    describe(
      'This sketch simulates behaviors of slime molds. Each slime mold object has position, traveling direction and three sensors. As the slime mold moves, it leaves a trace. The mold senses the existing trail and uses it to decide which direction to move.',
      LABEL
    );
  }
}

// ========================================
// WINDOW RESIZE
// Runs when the window is resized
// ========================================

function windowResized() {
  if (window.previewMode) {
    resizeCanvas(windowWidth, windowHeight);
  } else {
    resizeCanvas(windowWidth * 0.9, windowHeight * 0.8);
  }
}


// ========================================
// DRAW
// Runs continuously
// ========================================

function setup() {
  createCanvas(400, 400);
  background(81,237,247);
}

function mouseDragged() {
  textSize(30);
  text("🐟", mouseX, mouseY);
  textSize(80);
  text("🐈", 30, 70)
 textSize(70);
   text("🐈‍⬛", 90, 140) 
textSize(60);
  text("🐈", 150, 200)
textSize(50);
   text("🐈‍⬛", 200, 250)
 textSize(40);
  text("🐈", 250, 300) 
  textSize(30);
   text("🐈‍⬛", 290, 340)
  textSize(20);
  text("🐈", 330, 370)
    }