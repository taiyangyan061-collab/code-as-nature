let plants = [];

let growth = 0;

function setup() {

  let container = document.getElementById("flower-container");

  let canvas = createCanvas(

    container.clientWidth,

    container.clientHeight

  );

  canvas.parent("flower-container");

  angleMode(DEGREES);

  generateGarden();

}

function generateGarden() {

  plants = [];

  randomSeed(25);

  // Plants gradually become taller toward the right

  for (let i = 0; i < 18; i++) {

  let x = map(i, 0, 17, width * 0.23, width - 50);

  let heightScale = map(i, 0, 17, 0.25, 1);

    plants.push({

     x: x + random(-35, 35),
      y: height - random(10, 35),

      height: random(90, 180) * heightScale,

      branches: [],

      phase: random(360)

    });

  }

  for (let plant of plants) {

    createBranch(

      plant.branches,

      0,

      0,

      -90,

      plant.height * 0.35,

      0

    );

  }

}

function createBranch(branches, x, y, angle, length, depth) {

  if (depth > 4 || length < 4) return;

  let x2 = x + cos(angle) * length;

  let y2 = y + sin(angle) * length;

  branches.push({

    x1: x,

    y1: y,

    x2: x2,

    y2: y2,

    depth: depth

  });

  if (depth === 4) return;

  let nextLength = length * random(0.65, 0.8);

  createBranch(

    branches,

    x2,

    y2,

    angle - random(18, 35),

    nextLength,

    depth + 1

  );

  createBranch(

    branches,

    x2,

    y2,

    angle + random(18, 35),

    nextLength,

    depth + 1

  );

}

function draw() {

  clear();

  growth = min(growth + 0.005, 1);

  for (let plant of plants) {

    push();

    translate(plant.x, plant.y);

    let sway = sin(frameCount * 0.5 + plant.phase) * 2;

    rotate(sway);

    let visible = floor(plant.branches.length * growth);

    for (let i = 0; i < visible; i++) {

      let branch = plant.branches[i];

      stroke(35, 100, 65, 180);

      strokeWeight(max(0.5, 2 - branch.depth * 0.3));

      line(

        branch.x1,

        branch.y1,

        branch.x2,

        branch.y2

      );

      // Small leaves at branch tips

      if (branch.depth >= 3) {

        noFill();

        stroke(255, 255, 235, 160);

        strokeWeight(0.7);

        push();

        translate(branch.x2, branch.y2);

        rotate(25);

        ellipse(0, 0, 5, 11);

        pop();

      }

    }

    pop();

  }

}

function windowResized() {

  let container = document.getElementById("flower-container");

  resizeCanvas(

    container.clientWidth,

    container.clientHeight

  );

  generateGarden();

}