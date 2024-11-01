let canvas = document.getElementById("canvasP");
let ctx = canvas.getContext('2d');
ctx.fillStyle = "#FF0000";
let img = new Image();
img.src = "./img/fondoCanvasPresentacion.png"
img.onload = function () {
    ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
};
ctx.beginPath();

let juego1 = new Juego(6, canvas, ctx);
juego1.play();












