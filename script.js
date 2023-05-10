// Access HTML elements
const doorImage1 = document.getElementById('door1');
const doorImage2 = document.getElementById('door2');
const doorImage3 = document.getElementById('door3');
const startButton = document.getElementById('start');
const scoreBar = document.getElementById('score');

let botDoorPath = 'https://content.codecademy.com/projects/chore-door/images/robot.svg';
let beachDoorPath = 'https://content.codecademy.com/projects/chore-door/images/beach.svg';
let spaceDoorPath = 'https://content.codecademy.com/projects/chore-door/images/space.svg';
let closedDoorPath = 'https://content.codecademy.com/projects/chore-door/images/closed_door.svg';


let numClosedDoors = 3;
let openDoor1;
let openDoor2;
let openDoor3;
let currentlyPlaying = true;
let currentStreak = 0;
let bestStreak = 0;


// Define game logic to check doors, progress game, end game, and choose a random chore door
function isClicked(door) {
  if (door.src === closedDoorPath) {
    return true;
  } else {
    return false;
  }
}


function isBot(door) {
  if (door.src === botDoorPath) {
    return true;
  } else {
    return false;
  }
}

function gameOver(status) {
  if(status === 'win') {
    startButton.innerHTML = 'You win! Play again?';
    currentStreak++;
    if (currentStreak > bestStreak) {
      bestStreak = currentStreak;
    }
  } else  {
    startButton.innerHTML = 'Game over! Play again?';
    currentStreak = 0;
  }
  currentlyPlaying = false;
  updateScoreDisplay();
}

function playDoor(door) {
  numClosedDoors--;
  if(numClosedDoors === 0) {
    gameOver('win');
  } else if(isBot(door)) {
    gameOver();
  }
}

//Choosing a Random Chore Door
function randomChoreDoorGenerator() {
  var choreDoor = Math.floor(Math.random() * numClosedDoors);
  if (choreDoor === 0) {
    openDoor1 = botDoorPath;
    openDoor2 = beachDoorPath;
    openDoor3 = spaceDoorPath;
  } else if (choreDoor === 1) {
    openDoor1 = beachDoorPath;
    openDoor2 = botDoorPath;
    openDoor3 = spaceDoorPath;
  } else {
    openDoor1 = beachDoorPath;
    openDoor2 = spaceDoorPath;
    openDoor3 = botDoorPath;
  }
}

doorImage1.onclick = () => {
  if (currentlyPlaying && isClicked(doorImage1)) {
    doorImage1.src = openDoor1;
    playDoor(doorImage1);
  }
}

doorImage2.onclick = () => {
  if (currentlyPlaying && isClicked(doorImage2)) {
    doorImage2.src = openDoor2;
    playDoor(doorImage2);
  }
}

doorImage3.onclick = () => {
  if (currentlyPlaying && isClicked(doorImage3)) {
    doorImage3.src = openDoor3;
    playDoor(doorImage3);
  }
}

startButton.onclick = () => {
  if (currentlyPlaying === false) {
    startRound();
  }
}

// Start a game round
function updateScoreDisplay() {
  scoreBar.querySelector('#score-number').innerHTML = currentStreak;
  scoreBar.querySelector('#high-score-number').innerHTML = bestStreak;
}

function startRound() {
  // Reset door images to closed doors
  doorImage1.src = closedDoorPath;
  doorImage2.src = closedDoorPath;
  doorImage3.src = closedDoorPath;

  // Reset game state
  numClosedDoors = 3;
  currentlyPlaying = true;
  startButton.innerHTML = 'Good Luck!';

  // Generate random ChoreBot location
  randomChoreDoorGenerator();
}

// Call startRound to start the game
startRound();
