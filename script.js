const canvas = document.getElementById("drawingCanvas");
const colorButtons = document.querySelectorAll(".color-btn");
const undoBtn = document.getElementById("undoBtn");
const clearBtn = document.getElementById("clearBtn");

let drawing = false;
let currentColor = "black";
let path;
let paths = [];

// change color
colorButtons.forEach(btn => {
    btn.addEventListener("click", function () {
        currentColor = this.dataset.color;
    });
});

// start drawing
canvas.addEventListener("mousedown", function (e) {
    drawing = true;

    path = document.createElementNS("http://www.w3.org/2000/svg", "path");
    path.setAttribute("stroke", currentColor);
    path.setAttribute("fill", "none");
    path.setAttribute("stroke-width", "2");

    path.setAttribute("d", `M ${e.offsetX} ${e.offsetY}`);
    canvas.appendChild(path);
    paths.push(path);
});

// draw
canvas.addEventListener("mousemove", function (e) {
    if (!drawing) return;

    let d = path.getAttribute("d");
    path.setAttribute("d", d + ` L ${e.offsetX} ${e.offsetY}`);
});

// stop drawing
canvas.addEventListener("mouseup", function () {
    drawing = false;
});

// undo
undoBtn.addEventListener("click", function () {
    if (paths.length > 0) {
        canvas.removeChild(paths.pop());
    }
});

// clear
clearBtn.addEventListener("click", function () {
    canvas.innerHTML = "";
    paths = [];
});
