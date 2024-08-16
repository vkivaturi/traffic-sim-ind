import createVehicle from "./src/vehicle.js";

let ctx;
let raf;
let vehicleArr = [];

function init() {
    ctx = document.getElementById("canvas").getContext("2d");

    for (var i = 0; i < 20; i++) {
        vehicleArr[i] = createVehicle(ctx, 100 + i*20, 800);
    }
    window.requestAnimationFrame(updateVehiclePositions);
}

function updateVehiclePositions() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    for (var index = 0; index < vehicleArr.length; index++) {
        if (vehicleArr[index].y > 0) {
            vehicleArr[index].x += vehicleArr[index].vx;
            vehicleArr[index].y += vehicleArr[index].vy;
            vehicleArr[index].draw();
        }
    };
    window.requestAnimationFrame(updateVehiclePositions);
}

init();
