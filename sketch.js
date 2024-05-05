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

  // Dibujar reloj.
  fill(0);
  circle(x, y, 5);
  
  // Texto de los lugares correspondientes.
  textAlign(CENTER, TOP);
  textSize(14);
  text(cityName, x, y + radius + 10);
}

function updateTime() {
  updateTimeFlag = true;
}

// Algoritmo Punto y medio para dibujar un círculo
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


