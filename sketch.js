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
  button.size(100);
  button.mousePressed(updateTime);
}

function draw() {
  background(255);
  if(updateTimeFlag){
    hourOffset = parseInt(inputTime.value().substring(0, 2));
    minuteOffset = parseInt(inputTime.value().substring(3));
    updateTimeFlag = false;
  }
  
  drawClock(width / 4, height / 2, hourOffset, minuteOffset, 0, "La Paz, BCS"); // La Paz
  drawClock(width / 2, height / 2, hourOffset, minuteOffset, -2, "Ciudad de México"); // Ciudad de México
  drawClock(3 * width / 4, height / 2, hourOffset, minuteOffset, +8, "Barcelona, Esp"); // Barcelona
}

function drawClock(x, y, hourOffset, minuteOffset, cityHourOffset, cityName) {
  let cityTime = (hour() + hourOffset + cityHourOffset) % 24;
  let cityMinutes = (minute() + minuteOffset) % 60;
  let citySeconds = second() % 60;

  let radius = 80;
  drawCircle(x, y, radius);
  switch (cityName) {
    case "La Paz, BCS":
      drawClockHands(x, y, radius, cityTime, cityMinutes, citySeconds, cityName);
      break;
    case "Ciudad de México":
      drawClockHands(x, y, radius, cityTime, cityMinutes, citySeconds, cityName);
      break;
    case "Barcelona, Esp":
      drawClockHands(x, y, radius, cityTime, cityMinutes, citySeconds, cityName);
      break;
  }

  // Dibujar reloj.
  fill(0);
  circle(x, y, 5);
  
  // Texto de los lugares correspondientes.
  textAlign(CENTER, TOP);
  textSize(14);
  text(cityName, x, y + radius + 10);
  text(nf(cityTime, 2) + ":" + nf(cityMinutes, 2) + ":" + nf(citySeconds, 2), x, y + radius + 30);
}

function updateTime() {
  updateTimeFlag = true;
}

function drawClockHands(x, y, radius, cityTime, cityMinutes, citySeconds, cityName) {
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


  switch (cityName) {
    case "La Paz, BCS":
      line(x, y, hourX, hourY);
      line(x, y, minuteX, minuteY);
      line(x, y, secondX, secondY);
      break;
    case "Ciudad de México":
      functionDDA(x, y, hourX, hourY);
      functionDDA(x, y, minuteX, minuteY);
      functionDDA(x, y, secondX, secondY);
      break;
    case "Barcelona, Esp":
      functionBresenham(x, y, hourX, hourY);
      functionBresenham(x, y, minuteX, minuteY);
      functionBresenham(x, y, secondX, secondY);
      break;
  }


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

function functionDDA(x1, y1, x2, y2) {
  let dx = x2 - x1;
  let dy = y2 - y1;
  let steps = abs(dx) > abs(dy) ? abs(dx) : abs(dy);
  let xIncrement = dx / steps;
  let yIncrement = dy / steps;
  let x = x1;
  let y = y1;

  for (let i = 0; i <= steps; i++) {
    point(x, y);
    x += xIncrement;
    y += yIncrement;
  }
}

function functionBresenham(x1, y1, x2, y2) {
  let dx = x2 - x1;
  let dy = y2 - y1;
  let p = 2 * dy - dx;
  let x = x1;
  let y = y1;

  while (x <= x2) {
    point(x, y);
    x++;

    if (p < 0)
      p += 2 * dy;
    else {
      p += 2 * (dy - dx);
      y++;
    }
  }
}