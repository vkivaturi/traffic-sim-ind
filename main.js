import createVehicle from "./src/vehicle.js";

let ctx;
let vehicleArr = [];

function init() {
    ctx = document.getElementById("canvas").getContext("2d");
    createVehicles();
    window.requestAnimationFrame(updateVehiclePositions);
}

function createRoad() {
    ctx.fillStyle = "black"; 
    ctx.strokeStyle = "white"; 
    ctx.setLineDash([10, 15]);
    ctx.fillRect(80, 0, 100, 800);
    //ctx.clearRect(45, 45, 60, 60);
    ctx.strokeRect(80, 0, 50, 800);
}

//Create vehicles required in simulation
function createVehicles() {
    let x,y;
    for (var i = 0; i < 2; i++) {
        //Create new vehicle at a different horizontal position
        x = 100 + i*60;
        y = 800;
        vehicleArr[i] = createVehicle(ctx, x, y);
    }
}

//Update positions of the vehicles on the path
function updateVehiclePositions() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    createRoad();

    for (var index = 0; index < vehicleArr.length; index++) {
        if (vehicleArr[index].y > 0) {
            vehicleArr[index].x += vehicleArr[index].vx;
            vehicleArr[index].y += vehicleArr[index].vy;
            vehicleArr[index].draw();
        }
    };
    window.requestAnimationFrame(updateVehiclePositions);
}

//Start simulation with the init function
init();
