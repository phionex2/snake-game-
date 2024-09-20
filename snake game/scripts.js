// Get the canvas element and context
const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

// Initial snake properties
let snake = [
  { x: 10, y: 10 },
  { x: 9, y: 10 },
  { x: 8, y: 10 },
];
let dx = 1;
let dy = 0;

// Initial food properties
let food = { x: 5, y: 5 };
let score = 0;

// Function to generate a random position for food
function randomFoodPosition() {
  return {
    x: Math.floor(Math.random() * (canvas.width / 10)),
    y: Math.floor(Math.random() * (canvas.height / 10)),
  };
}

// Function to draw the snake with gradient effect
function drawSnake() {
  snake.forEach((part, index) => {
    ctx.fillStyle = createSnakeGradient(part.x, part.y, index);
    ctx.fillRect(part.x * 10, part.y * 10, 10, 10);
    ctx.strokeStyle = "#222"; // Darker border for contrast
    ctx.strokeRect(part.x * 10, part.y * 10, 10, 10);
  });
}

// Create a gradient for the snake body
function createSnakeGradient(x, y, index) {
  let gradient = ctx.createLinearGradient(x * 10, y * 10, (x + 1) * 10, (y + 1) * 10);
  if (index === 0) {
    // Snake head has a distinct color
    gradient.addColorStop(0, "#ff7f50");
    gradient.addColorStop(1, "#ff6347");
  } else {
    // Snake body with a smooth gradient
    gradient.addColorStop(0, "#6a5acd");
    gradient.addColorStop(1, "#483d8b");
  }
  return gradient;
}

// Function to draw the food with a radial gradient effect
function drawFood() {
  const { x, y } = food;
  const centerX = x * 10 + 5;
  const centerY = y * 10 + 5;
  const radius = 5;

  // Create a radial gradient for the food
  let gradient = ctx.createRadialGradient(centerX, centerY, radius / 2, centerX, centerY, radius);
  gradient.addColorStop(0, "#ffcc00");
  gradient.addColorStop(1, "#ff4500");

  ctx.fillStyle = gradient;
  ctx.beginPath();
  ctx.arc(centerX, centerY, radius, 0, 2 * Math.PI);
  ctx.fill();
}

// Function to clear the canvas
function clearCanvas() {
  ctx.fillStyle = "#1e1e2f"; // Background color
  ctx.fillRect(0, 0, canvas.width, canvas.height);
}

// Function to update the snake's position
function moveSnake() {
  const head = { x: snake[0].x + dx, y: snake[0].y + dy };
  snake.unshift(head);
  if (head.x === food.x && head.y === food.y) {
    score++;
    food = randomFoodPosition();
  } else {
    snake.pop();
  }
}

// Function to check for collision with walls or itself
function checkCollision() {
  const head = snake[0];
  if (head.x < 0 || head.x >= canvas.width / 10 || head.y < 0 || head.y >= canvas.height / 10) {
    return true;
  }
  for (let i = 4; i < snake.length; i++) {
    if (snake[i].x === head.x && snake[i].y === head.y) {
      return true;
    }
  }
  return false;
}

// Function to update the game
function updateGame() {
  if (checkCollision()) {
    alert("Game Over! Your score: " + score);
    resetGame();
  } else {
    clearCanvas();
    drawFood();
    moveSnake();
    drawSnake();
    document.querySelector(".score span").textContent = score;
  }
}

// Function to reset the game
function resetGame() {
  snake = [
    { x: 10, y: 10 },
    { x: 9, y: 10 },
    { x: 8, y: 10 },
  ];
  dx = 1;
  dy = 0;
  food = randomFoodPosition();
  score = 0;
}

// Function to change direction based on keyboard input
document.addEventListener("keydown", (e) => {
  switch (e.key) {
    case "ArrowUp":
      if (dy === 0) {
        dx = 0;
        dy = -1;
      }
      break;
    case "ArrowDown":
      if (dy === 0) {
        dx = 0;
        dy = 1;
      }
      break;
    case "ArrowLeft":
      if (dx === 0) {
        dx = -1;
        dy = 0;
      }
      break;
    case "ArrowRight":
      if (dx === 0) {
        dx = 1;
        dy = 0;
      }
      break;
  }
});

// Update the game every 100 milliseconds
setInterval(updateGame, 100);

// Initial canvas setup
resetGame();
