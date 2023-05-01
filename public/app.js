// Set up the canvas
const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

// Set the canvas dimensions based on the current window dimensions
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

// Set the radius of the circle and the number of lines
const radius = 300;
const numLines = Math.floor(Math.random() * 6) + 3;

// Set the starting angle and increment for each line
let angle = Math.random() * 2 * Math.PI;
const angleIncrement = (2 * Math.PI) / numLines;
const curvatureFactor = 10;
const curvature = Math.random() * curvatureFactor;

// Move the origin to the center of the canvas
ctx.translate(canvas.width / 2, canvas.height / 2);

// Set the line style
ctx.strokeStyle = "#000000";
ctx.lineCap = "round";

// Set the line widths randomly between 2 and 8, then double the thickness
const lineThicknesses = Math.floor(Math.random() * 5) + 50;

// Draw the circle with a border
ctx.beginPath();
ctx.arc(0, 0, radius + lineThicknesses / 2, 0, 2 * Math.PI);
ctx.lineWidth = lineThicknesses;
ctx.stroke();

// Clip the canvas to the interior of the circle
ctx.clip();
ctx.beginPath();
ctx.arc(0, 0, radius, 0, 2 * Math.PI);
ctx.closePath();
ctx.clip();

// Draw the lines with rotational symmetry
for (let i = 0; i < numLines; i++) {
  // Calculate the end point of the line
  const x = radius * Math.cos(angle);
  const y = radius * Math.sin(angle);

  // Calculate the control points of the Bezier curve
  const cpx1 =
    (1 + curvature) * 1.5 * radius * Math.cos(angle + 0.5 * angleIncrement);
  const cpy1 =
    (1 + curvature) * 1.5 * radius * Math.sin(angle + 0.5 * angleIncrement);
  const cpx2 =
    (1 - curvature) * 1.5 * radius * Math.cos(angle - 0.5 * angleIncrement);
  const cpy2 =
    (1 - curvature) * 1.5 * radius * Math.sin(angle - 0.5 * angleIncrement);

  // Set the line width
  ctx.lineWidth = lineThicknesses;

  // Draw the Bezier curve from the center to the end point and back to the center
  ctx.beginPath();
  ctx.moveTo(0, 0);
  ctx.bezierCurveTo(cpx1, cpy1, cpx2, cpy2, x, y);
  ctx.bezierCurveTo(-cpx2, -cpy2, -cpx1, -cpy1, 0, 0);
  ctx.stroke();

  // Increment the angle for the next line
  angle += angleIncrement;
}

// Resize the canvas when the window is resized
window.addEventListener("resize", () => {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  ctx.translate(canvas.width / 2, canvas.height / 2);
});
