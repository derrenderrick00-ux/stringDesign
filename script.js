const canvas = document.getElementById("stringArtCanvas");
const ctx = canvas.getContext("2d");


// --------------------------------------------------
// BASIC SETTINGS
// --------------------------------------------------

const width = canvas.width;
const height = canvas.height;

const centerX = width / 2;
const centerY = height / 2;

const artSize = 250;

const totalLines = 50;

const step = artSize / totalLines;


// --------------------------------------------------
// ANIMATION SETTINGS
// --------------------------------------------------

const animationSpeed = 0.35;

const colorSpeed = 1;


// This keeps track of how many lines currently exist.
let lineCount = 0;


// +1 means the artwork is forming.
// -1 means the artwork is reversing.
let direction = 1;


// Current color.
let hue = 0;


// --------------------------------------------------
// DRAW ONE QUADRANT
// --------------------------------------------------

function drawQuadrant(dirX, dirY, lines) {

    ctx.beginPath();

    for (let i = 1; i <= lines; i++) {

        // First point
        const x1 = centerX + i * step * dirX;
        const y1 = centerY;

        // Second point
        const x2 = centerX;
        const y2 = centerY + (totalLines - i) * step * dirY;


        // Connect the two points
        ctx.moveTo(x1, y1);
        ctx.lineTo(x2, y2);
    }

    ctx.stroke();
}


// --------------------------------------------------
// DRAW ALL FOUR QUADRANTS
// --------------------------------------------------

function drawStringArt(lines) {

    // Top-right
    drawQuadrant(1, -1, lines);

    // Bottom-right
    drawQuadrant(1, 1, lines);

    // Bottom-left
    drawQuadrant(-1, 1, lines);

    // Top-left
    drawQuadrant(-1, -1, lines);
}


// --------------------------------------------------
// DRAW THE AXES
// --------------------------------------------------

function drawAxes(color) {

    ctx.beginPath();

    // Horizontal line
    ctx.moveTo(centerX - artSize, centerY);
    ctx.lineTo(centerX + artSize, centerY);

    // Vertical line
    ctx.moveTo(centerX, centerY - artSize);
    ctx.lineTo(centerX, centerY + artSize);

    ctx.strokeStyle = color;
    ctx.lineWidth = 1;

    ctx.stroke();
}


// --------------------------------------------------
// UPDATE THE ANIMATION STATE
// --------------------------------------------------

function update() {

    /*
     * Move the line count.
     *
     * direction = 1
     * means the shape gets bigger.
     *
     * direction = -1
     * means the shape gets smaller.
     */

    lineCount += animationSpeed * direction;


    // If the shape has reached its maximum size...
    if (lineCount >= totalLines) {

        lineCount = totalLines;

        // Change direction.
        direction = -1;
    }


    // If the shape has disappeared...
    if (lineCount <= 0) {

        lineCount = 0;

        // Start forming again.
        direction = 1;
    }


    // Change the color.
    hue += colorSpeed;


    // HSL hue goes from 0 to 360.
    if (hue >= 360) {
        hue = 0;
    }
}


// --------------------------------------------------
// DRAW ONE FRAME
// --------------------------------------------------

function draw() {

    // Remove the previous frame.
    ctx.clearRect(0, 0, width, height);


    // Create the current color.
    const color = `hsl(${hue}, 100%, 55%)`;


    // Set line appearance.
    ctx.strokeStyle = color;
    ctx.lineWidth = 0.8;


    // Draw the axes.
    drawAxes(color);


    // Draw the current number of lines.
    drawStringArt(Math.floor(lineCount));
}


// --------------------------------------------------
// MAIN ANIMATION LOOP
// --------------------------------------------------

function animate() {

    update();

    draw();

    requestAnimationFrame(animate);
}


// Start everything.
animate();