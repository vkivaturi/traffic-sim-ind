import createVehicle from "./src/vehicle.js";
import createPath from "./src/path.js";
let ctx;
let vehicleArr = [];
let pathArr = [];
const colourArray = ['blue', 'pink', 'orange', 'yellow', 'purple', 'green'];
var fps = 5;

//Max number of vehicles to be included in a simulation
let totalIterations = 50;
//Number of points to be created in the path
const numPoints = 25;

function init() {
    ctx = document.getElementById("canvas").getContext("2d");
    //Works
    // createVehicles();
    // window.requestAnimationFrame(updateVehiclePositions);
    //

    // Initialise path coordinates
    const start = [100, 800]; // Starting point
    const interim1 = [100, 600]; // First control point
    const interim2 = [100, 300]; // Second control point
    const end = [100, 0]; // Ending point

    //Create path with the assigned coordinates
    pathArr = createPath(start, interim1, interim2, end, numPoints);

    startSimulation();
}

function startSimulation() {
    if(totalIterations-- < 0)
        return;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    createRoad();
    updatePathPointVehicles();
    
    setTimeout(() => {
        window.requestAnimationFrame(startSimulation);
      }, 1000 / fps);
    
}

function updatePathPointVehicles() {
    for (var i = pathArr.length - 1; i >= 0; i--) {
        //console.log(pathArr[i].position + " : " + i)
        if (pathArr[i].vehicle == null) {
            //If start point is null, add a vehicle to the path 
            if (pathArr[i].position == "start") {
                addNewVehicleToPath(i);
            }
        } else {
            if ((pathArr[i].position == "start") || (pathArr[i].position == "interim")) {
                var isMoveUp = moveUpIfPossible(i);
                //console.log("Is move up : " + isMoveUp);
            } else if (pathArr[i].position == "end") {
                console.log("Remove vehicle from end");
                pathArr[i].vehicle = null;
            }
        }
    }
}

function addNewVehicleToPath(pIdx) {
    const cIdx = Math.floor(Math.random() * colourArray.length);
    pathArr[pIdx].vehicle = createVehicle(ctx, pathArr[pIdx].x, pathArr[pIdx].y, colourArray[cIdx]);
    pathArr[pIdx].vehicle.draw();

}

//Move vehicle along a path if the next point is free
function moveUpIfPossible(pIdx) {
    var isMoved = false;
    if (pIdx >= 0 && pIdx < pathArr.length) {
        if (pathArr[pIdx + 1].vehicle == null) {
            pathArr[pIdx + 1].vehicle = pathArr[pIdx].vehicle;

            pathArr[pIdx + 1].vehicle.x = pathArr[pIdx + 1].x;
            pathArr[pIdx + 1].vehicle.y = pathArr[pIdx + 1].y;
            pathArr[pIdx + 1].vehicle.draw();

            pathArr[pIdx].vehicle = null;
            isMoved = true;
        }
    }
    return isMoved;
}

//Create road with desired properties
function createRoad() {
    ctx.fillStyle = "black";
    ctx.strokeStyle = "white";
    ctx.setLineDash([10, 15]);
    ctx.fillRect(80, 0, 100, 800);
    ctx.strokeRect(80, 0, 50, 800);
}


//Create vehicles required in simulation
function createVehicles() {
    let x, y;
    for (var i = 0; i < 2; i++) {
        //Create new vehicle at a different horizontal position
        x = 100 + i * 60;
        y = 800;
        //Pick a random color
        const cIdx = Math.floor(Math.random() * colourArray.length);

        vehicleArr[i] = createVehicle(ctx, x, y, colourArray[cIdx]);
    }
    return vehicleArr;
}

function updateVehiclesOnRoad() {
    for (var i = 0; i < roadSlotArr.length; i++) {
        var localVehicleArr = roadSlotArr[i];
        for (var index = 0; index < localVehicleArr.length; index++) {
            var localVehicle = localVehicleArr[index];
            if (localVehicle != null) {
                if (localVehicle.y > 0) {
                    localVehicle.x += localVehicle.vx;
                    localVehicle.y += localVehicle.vy;
                    localVehicle.draw();

                    //Remove vehicle from current postion in road array and move it forward
                    roadSlotArr[i][index] = null;
                    roadSlotArr[i][index + 1] = localVehicle;
                } else {
                    //Vehicle reached its destination. Remove it from road array
                    roadSlotArr[i][index] = null;
                }
            }
        }
    }
    window.requestAnimationFrame(updateVehiclesOnRoad);
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
