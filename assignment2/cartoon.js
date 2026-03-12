const canvas = document.getElementById("cartoonCanvas");
const ctx = canvas.getContext("2d");

// Sky background color
ctx.fillStyle = "#9fd8ff";
ctx.fillRect(0, 0, canvas.width, canvas.height);

// Sun in the background
ctx.beginPath();
ctx.arc(760, 90, 55, 0, Math.PI * 2);
ctx.fillStyle = "#ffd34d";
ctx.fill();
ctx.strokeStyle = "#f5a623";
ctx.lineWidth = 4;
ctx.stroke();

// Sun rays using a loop and translate
ctx.save();
ctx.translate(760, 90);
for (let i = 0; i < 12; i += 1) {
    ctx.rotate(Math.PI / 6);
    ctx.beginPath();
    ctx.moveTo(0, -68);
    ctx.lineTo(0, -90);
    ctx.strokeStyle = "#f5a623";
    ctx.lineWidth = 3;
    ctx.stroke();
}
ctx.restore();

// Ground color
ctx.fillStyle = "#7acb6b";
ctx.fillRect(0, 340, canvas.width, 160);

// House body
ctx.beginPath();
ctx.moveTo(290, 340);
ctx.lineTo(290, 220);
ctx.lineTo(530, 220);
ctx.lineTo(530, 340);
ctx.closePath();
ctx.fillStyle = "#f2d2a4";
ctx.fill();
ctx.strokeStyle = "#7a4d2f";
ctx.lineWidth = 3;
ctx.stroke();

// House roof
ctx.beginPath();
ctx.moveTo(260, 220);
ctx.lineTo(410, 130);
ctx.lineTo(560, 220);
ctx.closePath();
ctx.fillStyle = "#c24d4d";
ctx.fill();
ctx.strokeStyle = "#7a2f2f";
ctx.lineWidth = 3;
ctx.stroke();

// Door
ctx.beginPath();
ctx.moveTo(395, 340);
ctx.lineTo(395, 265);
ctx.lineTo(445, 265);
ctx.lineTo(445, 340);
ctx.closePath();
ctx.fillStyle = "#8b5a2b";
ctx.fill();
ctx.strokeStyle = "#5c3a1c";
ctx.stroke();

// Doorknob
ctx.beginPath();
ctx.arc(435, 305, 4, 0, Math.PI * 2);
ctx.fillStyle = "#f8e39b";
ctx.fill();

// Windows
ctx.fillStyle = "#e8f6ff";
ctx.fillRect(320, 255, 50, 45);
ctx.fillRect(455, 255, 50, 45);
ctx.strokeStyle = "#7a4d2f";
ctx.lineWidth = 2;
ctx.strokeRect(320, 255, 50, 45);
ctx.strokeRect(455, 255, 50, 45);

// Window crossbars
ctx.beginPath();
ctx.moveTo(345, 255);
ctx.lineTo(345, 300);
ctx.moveTo(320, 277.5);
ctx.lineTo(370, 277.5);
ctx.moveTo(480, 255);
ctx.lineTo(480, 300);
ctx.moveTo(455, 277.5);
ctx.lineTo(505, 277.5);
ctx.stroke();

// Fence created with a for loop and translate
ctx.save();
ctx.translate(40, 355);
for (let i = 0; i < 17; i += 1) {
    ctx.save();
    ctx.translate(i * 45, 0);
    ctx.beginPath();
    ctx.moveTo(0, 0);
    ctx.lineTo(0, 70);
    ctx.lineTo(18, 70);
    ctx.lineTo(18, 0);
    ctx.lineTo(9, -14);
    ctx.closePath();
    ctx.fillStyle = "#d8b27c";
    ctx.fill();
    ctx.strokeStyle = "#9b6e3f";
    ctx.lineWidth = 2;
    ctx.stroke();
    ctx.restore();
}
ctx.restore();

// Fence rails
ctx.fillStyle = "#c49a6c";
ctx.fillRect(30, 378, 780, 10);
ctx.fillRect(30, 412, 780, 10);

// Caption text written on the canvas
ctx.fillStyle = "#1f2a3a";
ctx.font = "bold 30px 'Trebuchet MS', sans-serif";
ctx.fillText("Sunny Day in Cartoon Town", 210, 45);
