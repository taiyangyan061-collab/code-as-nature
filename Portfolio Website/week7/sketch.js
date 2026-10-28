let mic;

let started = false;

let soundLevel = 0;

let plants = [];

let particles = [];

const MAX_PLANTS = 12;

const MAX_PARTICLES = 180;

function setup() {

  let canvas = createCanvas(800, 600);
canvas.parent("sketch-container");
  pixelDensity(1);

  mic = new p5.AudioIn();

  colorMode(HSB, 360, 100, 100, 100);

  // Create the initial garden

  for (let i = 0; i < 5; i++) {

    plants.push(new Plant(

      random(100, width - 100),

      height + 20

    ));

  }

  // Create floating particles

  for (let i = 0; i < MAX_PARTICLES; i++) {

    particles.push(new Particle());

  }

}

function draw() {

  background(230, 35, 5);

  if (started) {

    soundLevel = lerp(

      soundLevel,

      mic.getLevel(),

      0.15

    );

  }

  let energy = constrain(

    map(soundLevel, 0.003, 0.12, 0, 1),

    0,

    1

  );

  // Atmospheric glow

  drawAtmosphere();

  // Draw plants

  for (let plant of plants) {

    plant.update(energy);

    plant.display(energy);

  }

  // Floating particles

  for (let particle of particles) {

    particle.update(energy);

    particle.display();

  }

  // Create new plants when sound is strong

  if (

    energy > 0.65 &&

    frameCount % 90 === 0 &&

    plants.length < MAX_PLANTS

  ) {

    plants.push(

      new Plant(random(80, width - 80), height + 20)

    );

  }

  // Instructions

  noStroke();

  fill(0, 0, 100, 70);

  textSize(14);

  if (!started) {

    text("Click to activate the garden", 20, 30);

  } else {

    text("Sound Energy: " + energy.toFixed(2), 20, 30);

  }

}

// -------------------------

// ATMOSPHERE

// -------------------------

function drawAtmosphere() {

  noStroke();

  for (let i = 0; i < 8; i++) {

    fill(220 + i * 5, 50, 20, 2);

    ellipse(

      width / 2,

      height * 0.75,

      300 + i * 90,

      200 + i * 60

    );

  }

}

// -------------------------

// PLANT

// -------------------------

class Plant {

  constructor(x, y) {

    this.x = x;

    this.y = y;

    this.height = random(130, 280);

    this.growth = 0;

    this.phase = random(TWO_PI);

    this.hue = random([175, 195, 265, 310]);

    this.branches = [];

    for (let i = 0; i < 5; i++) {

      this.branches.push({

        position: random(0.3, 0.95),

        side: random([-1, 1]),

        length: random(25, 65)

      });

    }

  }

  update(energy) {

    if (energy > 0.05) {

      this.growth += energy * 0.004;

    }

    this.growth = constrain(this.growth, 0, 1);

  }

  display(energy) {

    push();

    translate(this.x, this.y);

    let sway =

      sin(frameCount * 0.015 + this.phase) *

      (5 + energy * 20);

    let h = this.height * this.growth;

    if (h < 2) {

      pop();

      return;

    }

    // Main curved stem

    noFill();

    drawingContext.shadowBlur = 18;

    drawingContext.shadowColor = color(

      this.hue, 80, 100

    ).toString();

    stroke(this.hue, 65, 95, 85);

    strokeWeight(2);

    bezier(

      0, 0,

      -30, -h * 0.3,

      30 + sway, -h * 0.7,

      sway, -h

    );

    drawingContext.shadowBlur = 0;

    // Branches and leaves

    for (let branch of this.branches) {

      if (this.growth < branch.position) continue;

      let by = -h * branch.position;

      let bx = sway * branch.position;

      let endX =

        bx + branch.side * branch.length;

      let endY =

        by - branch.length * 0.45;

      stroke(this.hue, 55, 90, 65);

      strokeWeight(1.2);

      noFill();

      bezier(

        bx, by,

        bx + branch.side * 15, by - 10,

        endX - branch.side * 10, endY + 10,

        endX, endY

      );

      // Leaf

      push();

      translate(endX, endY);

      rotate(branch.side * 0.5);

      fill(this.hue, 50, 90, 35);

      stroke(this.hue, 60, 100, 65);

      ellipse(0, 0, 12, 28);

      pop();

    }

    // Flower

    if (this.growth > 0.6) {

      drawFlower(

        sway,

        -h,

        this.hue,

        energy,

        this.phase,

        this.growth

      );

    }

    pop();

  }

}

// -------------------------

// FLOWER

// -------------------------

function drawFlower(x, y, hue, energy, phase, growth) {

  push();

  translate(x, y);

  let bloom = constrain(

    map(growth, 0.6, 1, 0, 1),

    0,

    1

  );

  let breathing =

    sin(frameCount * 0.035 + phase) * 0.1;

  let flowerSize =

    (18 + energy * 25 + breathing * 15) * bloom;

  drawingContext.shadowBlur = 25;

  drawingContext.shadowColor =

    color(hue, 70, 100).toString();

  // Outer petals

  for (let i = 0; i < 8; i++) {

    push();

    rotate(TWO_PI * i / 8 + phase);

    fill(hue, 55, 100, 20);

    stroke(hue, 65, 100, 65);

    strokeWeight(1);

    ellipse(

      0,

      -flowerSize * 0.6,

      flowerSize * 0.65,

      flowerSize * 1.4

    );

    pop();

  }

  // Inner petals

  for (let i = 0; i < 5; i++) {

    push();

    rotate(TWO_PI * i / 5 - phase);

    fill((hue + 25) % 360, 40, 100, 35);

    ellipse(

      0,

      -flowerSize * 0.3,

      flowerSize * 0.4,

      flowerSize * 0.8

    );

    pop();

  }

  // Flower center

  noStroke();

  fill(45, 40, 100, 95);

  circle(0, 0, flowerSize * 0.35);

  drawingContext.shadowBlur = 0;

  pop();

}

// -------------------------

// PARTICLES

// -------------------------

class Particle {

  constructor() {

    this.reset();

    this.y = random(height);

  }

  reset() {

    this.x = random(width);

    this.y = height + random(50);

    this.size = random(1, 4);

    this.speed = random(0.2, 1);

    this.hue = random([180, 210, 270, 310]);

    this.phase = random(TWO_PI);

  }

  update(energy) {

    this.y -= this.speed + energy * 3;

    this.x += sin(

      frameCount * 0.02 + this.phase

    ) * (0.3 + energy);

    if (this.y < -20) {

      this.reset();

    }

  }

  display() {

    noStroke();

    drawingContext.shadowBlur = 10;

    drawingContext.shadowColor =

      color(this.hue, 60, 100).toString();

    fill(this.hue, 45, 100, 65);

    circle(this.x, this.y, this.size);

    drawingContext.shadowBlur = 0;

  }

}

// -------------------------

// MICROPHONE

// -------------------------

function mousePressed() {

  if (!started) {

    userStartAudio().then(() => {

      mic.start(

        () => {

          started = true;

        },

        (err) => {

          console.error("Microphone error:", err);

        }

      );

    });

  }

}