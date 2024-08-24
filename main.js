import { createPath, addNewVehicleToPath } from "./src/path.js";
import { updatePathPointVehicles } from "./src/orchestrator.js";

let ctx;
let laneArr = [];
const fps = 4;
const laneCount = 1;

//Max number of simulation iterations
let totalIterations = 300;
//Number of points to be created in the path
const numPoints = 30;

function init() {
    ctx = document.getElementById("canvas").getContext("2d");

    let y = 25;
    let start = [0, y]; // Starting point
    let interim1 = [300, y]; // First control point
    let interim2 = [600, y]; // Second control point
    let end = [canvas.width, y]; // Ending point

    for (var i = 0; i < laneCount; i++) {
        //Create lane specific path that the vehicles should follow
        laneArr[i] = createPath(start, interim1, interim2, end, numPoints);

        start[1] = start[1] + 50;
        interim1[1] = interim1[1] + 50;
        interim2[1] = interim2[1] + 50;
        end[1] = end[1] + 50;

    }
    startSimulation();
}

function startSimulation() {
    //Limit the total number of iterations or time of the simulation
    if (totalIterations-- < 0)
        return;

    //Clear the canvas and repaint it for each frame refresh
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    createRoad();

    //Update the recreated canvas with change in vehicle positions
    laneArr.forEach(function (path) {
        updatePathPointVehicles(path, ctx);
    });

    //Control the frame refresh period
    setTimeout(() => {
        window.requestAnimationFrame(startSimulation);
    }, 1000 / fps);

}

//Create road with desired properties
function createRoad() {
    ctx.fillStyle = "black";
    ctx.strokeStyle = "white";
    ctx.setLineDash([10, 15]);

    ctx.fillRect(0, 0, canvas.width, 150);
    ctx.strokeRect(0, 50, canvas.width, canvas.width);
    ctx.strokeRect(0, 100, canvas.width, canvas.width);
}

//Start simulation with the init function
init();
