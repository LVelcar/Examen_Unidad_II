// Luis Alberto Velázquez Carballo.
// Alexander Higuera Sanabria.
// Universidad Autónoma De Baja California Sur.
// Ing. Desarrollo De Software.
// T.M.
// Examen Unidad II.

let inputTime;
let cityTimes = {
  "La Paz, BCS": 0,
  "Ciudad de México": -2,
  "Barcelona, Esp": +8
};

let button;

let hourOffset = 0;
let minuteOffset = 0;

let updateTimeFlag = false;

function setup() {
  createCanvas(800, 400);
  
  // Input para ingresar la hora.
  inputTime = createInput("00:00");
  inputTime.position(20, height + 20);
  inputTime.size(100);
  
  // Botón para actualizar la hora.
  button = createButton('Actualizar');
  button.position(inputTime.x + inputTime.width + 10, height + 20);
  button.mousePressed(updateTime);
}

function draw() {
  background(255);  // Clear the canvas
  if(updateTimeFlag) {
    let timeParts = inputTime.value().split(":");
    hourOffset = parseInt(timeParts[0]);
    minuteOffset = parseInt(timeParts[1]);
    updateTimeFlag = false;
  }
  
  drawClock(width / 4, height / 2, hourOffset, minuteOffset, 0, "La Paz, BCS"); // La Paz
  drawClock(width / 2, height / 2, hourOffset, minuteOffset, -2, "Ciudad de México"); // Ciudad de México
  drawClock(3 * width / 4, height / 2, hourOffset, minuteOffset, 8, "Barcelona, Esp"); // Barcelona
}

function updateTime() {
  updateTimeFlag = true;
}

function drawClock(x, y, hourOffset, minuteOffset, cityHourOffset, cityName) {
  let cityTime = (hour() + hourOffset + cityHourOffset) % 24;
  let cityMinutes = (minute() + minuteOffset) % 60;
  let citySeconds = second() % 60;

  let radius = 80;
  drawCircle(x, y, radius);  // Ensure drawCircle is implemented correctly for the circle

  // Calculate angles and lengths for hour, minute, and second hands
  let hourAngle = map((cityTime % 12) * 60 + cityMinutes, 0, 720, 0, TWO_PI) - HALF_PI;
  let hourLength = 0.5 * radius;
  let hourX = x + cos(hourAngle) * hourLength;
  let hourY = y + sin(hourAngle) * hourLength;

  let minuteAngle = map(cityMinutes, 0, 60, 0, TWO_PI) - HALF_PI;
  let minuteLength = 0.8 * radius;
  let minuteX = x + cos(minuteAngle) * minuteLength;
  let minuteY = y + sin(minuteAngle) * minuteLength;

  let secondAngle = map(citySeconds, 0, 60, 0, TWO_PI) - HALF_PI;
  let secondLength = 0.9 * radius;
  let secondX = x + cos(secondAngle) * secondLength;
  let secondY = y + sin(secondAngle) * secondLength;

  // Use the specific algorithm for each city
  if (cityName === "La Paz, BCS") {
    // Use DDA for La Paz or Bresenham, here we use DDA
    drawLineDDA(x, y, hourX, hourY);
    drawLineDDA(x, y, minuteX, minuteY);
    drawLineDDA(x, y, secondX, secondY);
  } else if (cityName === "Ciudad de México") {
    // Use DDA for Ciudad de México
    drawLineDDA(x, y, hourX, hourY);
    drawLineDDA(x, y, minuteX, minuteY);
    drawLineDDA(x, y, secondX, secondY);
  } else if (cityName === "Barcelona, Esp") {
    // Use Bresenham for Barcelona
    drawLine(x, y, hourX, hourY);
    drawLine(x, y, minuteX, minuteY);
    drawLine(x, y, secondX, secondY);
  }

  // Draw center dot and city name label
  fill(0);
  circle(x, y, 5);  // Center of the clock
  textAlign(CENTER, TOP);
  textSize(14);
  text(cityName, x, y + radius + 10);
}

function drawCircle(xc, yc, r) {
  let x = r;
  let y = 0;
  let P = 1 - r;

  while (x > y) {
    point(x + xc, y + yc);
    point(-x + xc, y + yc);
    point(x + xc, -y + yc);
    point(-x + xc, -y + yc);
    point(y + xc, x + yc);
    point(-y + xc, x + yc);
    point(y + xc, -x + yc);
    point(-y + xc, -x + yc);

    y++;

    if (P <= 0)
      P = P + 2*y + 1;
    else {
      x--;
      P = P + 2*y - 2*x + 1;
    }
  }
}

function drawLine(x0, y0, x1, y1) {
  let dx = Math.abs(x1 - x0);
  let dy = Math.abs(y1 - y0);
  let sx = (x0 < x1) ? 1 : -1;
  let sy = (y0 < y1) ? 1 : -1;
  let err = dx - dy;

  while (true) {
    point(x0, y0);
    if (x0 === x1 && y0 === y1) break;
    let e2 = 2 * err;
    if (e2 > -dy) {
      err -= dy;
      x0 += sx;
    }
    if (e2 < dx) {
      err += dx;
      y0 += sy;
    }
  }
}

function drawLineDDA(x0, y0, x1, y1) {
  let dx = x1 - x0;
  let dy = y1 - y0;
  let steps = Math.abs(dx) > Math.abs(dy) ? Math.abs(dx) : Math.abs(dy);
  let xIncrement = dx / steps;
  let yIncrement = dy / steps;
  let x = x0;
  let y = y0;

  for (let i = 0; i <= steps; i++) {
    point(Math.round(x), Math.round(y));
    x += xIncrement;
    y += yIncrement;
  }
}