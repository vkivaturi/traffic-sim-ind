import { createPath, addNewVehicleToPath } from "./src/path.js";
import { updatePathPointVehicles } from "./src/orchestrator.js";

let ctx;
let laneArr = [];
//let pathArr = [];
const fps = 5;
const laneCount = 3;
var vehicleElement;
var vehicleCount = 0;

//Max number of simulation iterations
let totalIterations = 50;
//Number of points to be created in the path
const numPoints = 25;

function init() {
    ctx = document.getElementById("canvas").getContext("2d");

    // vehicleElement = document.getElementById("counter");
    // vehicleElement.textContent = vehicleCount;

    // Initialise path coordinates
    let start = [105, 800]; // Starting point
    let interim1 = [105, 600]; // First control point
    let interim2 = [105, 300]; // Second control point
    let end = [105, 0]; // Ending point

    for (var i = 0; i < laneCount; i++) {
        //Create lane specific path that the vehicles should follow
        laneArr[i] = createPath(start, interim1, interim2, end, numPoints);

        //Values for the next iterations
        start[0] = start[0] + 50;
        interim1[0] = interim1[0] + 50;
        interim2[0] = interim2[0] + 50;
        end[0] = end[0] + 50;

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
    ctx.fillRect(80, 0, 150, 800);
    ctx.strokeRect(80, 0, 50, 800);
    ctx.strokeRect(80, 0, 100, 800);
}

//Start simulation with the init function
init();
