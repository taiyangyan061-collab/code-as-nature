let video;
let handPose;
let hands = [];

async function setup() {

  let canvas = createCanvas(640, 480);

  canvas.parent("sketch-container");

  video = createCapture(VIDEO);

  video.size(640, 480);

  video.hide();

  handPose = await ml5.handPose();

  handPose.detectStart(video, gotHands);

}

function draw() {
  background(220);
  image(video, 0, 0);

  for (let i = 0; i < hands.length; i++) {
    let hand = hands[i];
    for (let j = 0; j < hand.keypoints.length; j++) {
      let keypoint = hand.keypoints[j];
      fill(0, 255, 0);
      noStroke();
      circle(keypoint.x, keypoint.y, 10);
    }
  }
}

function gotHands(results) {
  hands = results;
}