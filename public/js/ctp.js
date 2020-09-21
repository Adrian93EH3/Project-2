// const { data } = require("jquery");

// the snake is divided into small segments, which are drawn and edited on each 'draw' call
let numSegments = 10;
let direction = "right";
// let score = document.getElementById("score");

const xStart = 0; //starting x coordinate for snake
const yStart = 250; //starting y coordinate for snake
const diff = 10;

const xCor = [];
const yCor = [];

let xFruit = 0;
let yFruit = 0;
let scoreElem;
let scoreVal;

/*
 The segments are updated based on the direction of the snake.
 All segments from 0 to n-1 are just copied over to 1 till n, i.e. segment 0
 gets the value of segment 1, segment 1 gets the value of segment 2, and so on,
 and this results in the movement of the snake.

 The last segment is added based on the direction in which the snake is going,
 if it's going left or right, the last segment's x coordinate is increased by a
 predefined value 'diff' than its second to last segment. And if it's going up
 or down, the segment's y coordinate is affected.
*/
function updateSnakeCoordinates() {
  for (let i = 0; i < numSegments - 1; i++) {
    xCor[i] = xCor[i + 1];
    yCor[i] = yCor[i + 1];
  }
  switch (direction) {
    case "right":
      xCor[numSegments - 1] = xCor[numSegments - 2] + diff;
      yCor[numSegments - 1] = yCor[numSegments - 2];
      break;
    case "up":
      xCor[numSegments - 1] = xCor[numSegments - 2];
      yCor[numSegments - 1] = yCor[numSegments - 2] - diff;
      break;
    case "left":
      xCor[numSegments - 1] = xCor[numSegments - 2] - diff;
      yCor[numSegments - 1] = yCor[numSegments - 2];
      break;
    case "down":
      xCor[numSegments - 1] = xCor[numSegments - 2];
      yCor[numSegments - 1] = yCor[numSegments - 2] + diff;
      break;
  }
}
/*
 If the snake hits itself, that means the snake head's (x,y) coordinate
 has to be the same as one of its own segment's (x,y) coordinate.
*/
function checkSnakeCollision() {
  const snakeHeadX = xCor[xCor.length - 1];
  const snakeHeadY = yCor[yCor.length - 1];
  for (let i = 0; i < xCor.length - 1; i++) {
    if (xCor[i] === snakeHeadX && yCor[i] === snakeHeadY) {
      return true;
    }
  }
}
/*
 I always check the snake's head position xCor[xCor.length - 1] and
 yCor[yCor.length - 1] to see if it touches the game's boundaries
 or if the snake hits itself.
*/
function checkGameStatus() {
  if (
    xCor[xCor.length - 1] > width ||
    xCor[xCor.length - 1] < 0 ||
    yCor[yCor.length - 1] > height ||
    yCor[yCor.length - 1] < 0 ||
    checkSnakeCollision()
  ) {
    noLoop();
    scoreVal = parseInt(scoreElem.html().substring(8));
    scoreElem.html("Game ended! Your score was : " + scoreVal);
  }
}
/*
 Whenever the snake consumes a fruit, I increment the number of segments,
 and just insert the tail segment again at the start of the array (basically
 I add the last segment again at the tail, thereby extending the tail)
*/
function checkForFruit() {
  point(xFruit, yFruit);
  if (xCor[xCor.length - 1] === xFruit && yCor[yCor.length - 1] === yFruit) {
    const prevScore = parseInt(scoreElem.html().substring(8));
    scoreElem.html("Score = " + (prevScore + 1));
    xCor.unshift(xCor[0]);
    yCor.unshift(yCor[0]);
    numSegments++;
    updateFruitCoordinates();
  }
}
function setup() {
  scoreElem = createDiv("Score = 0");
  scoreElem.position(20, 20);
  scoreElem.style("color", "black");
  scoreElem.style("margin-top", "350px");

  createCanvas(300, 500);
  frameRate(15);
  stroke(255);
  strokeWeight(10);
  updateFruitCoordinates();

  for (let i = 0; i < numSegments; i++) {
    xCor.push(xStart + i * diff);
    yCor.push(yStart);
  }
}

function draw() {
  background(0);
  for (let i = 0; i < numSegments - 1; i++) {
    line(xCor[i], yCor[i], xCor[i + 1], yCor[i + 1]);
  }
  updateSnakeCoordinates();
  checkGameStatus();
  checkForFruit();
}

const btn = document.querySelector("#resetButton");
btn.addEventListener("click", () => {
  console.log(scoreVal);
  event.preventDefault;
  $.ajax({
    method: "POST",
    url: "/api/catchthepoachers",
    data: {
      score: scoreVal
    }
  })
    .then(data => {
      console.log(data);
      location.reload();
    })
    .catch(err => {
      console.log(err);
      location.reload();
    });
});

<<<<<<< HEAD
const btn2 = document.querySelector("#showScores");
btn2.addEventListener("click", () => {
  console.log();
  event.preventDefault;
=======
const btn2 = document.querySelector("#getScores");
btn2.addEventListener("click", () => {

>>>>>>> 1b85a7909064d5729445ad5827671f41755a2f1c
  $.ajax({
    method: "GET",
    url: "/api/getscores"
    // data: {
    //   score: req.body.score
    // }
  })
    .then(data => {
      console.log(data);
<<<<<<< HEAD
=======
      const scoreEl = $("#showScores");
      scoreEl.empty()
      const scoreGroup = $("<ul>");
      // Looping through each result item
      for (let i = 0; i < data.score.length; i++) {
        const listEl = $("<li>").text(`${data.score[i].User.email.split('@')[0]}: ${data.score[i].score}`);
        scoreGroup.append(listEl);
      }
      scoreEl.append(scoreGroup);
>>>>>>> 1b85a7909064d5729445ad5827671f41755a2f1c
    })
    .catch(err => {
      console.log(err);
    });
});

function updateFruitCoordinates() {
  /*
  The complex math logic is because I wanted the point to lie
  in between 100 and width-100, and be rounded off to the nearest
  number divisible by 10, since I move the snake in multiples of 10.
  */

  xFruit = floor(random(10, (width - 100) / 10)) * 10;
  yFruit = floor(random(10, (height - 100) / 10)) * 10;
}

function keyPressed() {
  switch (keyCode) {
    case 74:
      if (direction !== "right") {
        direction = "left";
      }
      break;
    case 76:
    if (direction !== "left") {
      direction = "right";
      }
    break;
  case 73:
    if (direction !== "down") {
        direction = "up";
      }
    break;
    case 75:
    if (direction !== "up") {
        direction = "down";
    }
      break;
  }
}
