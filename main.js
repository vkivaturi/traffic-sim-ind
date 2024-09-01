import { createPath } from "./src/creator/path.js";
import { updatePathPointVehicles } from "./src/preserver/orchestrator.js";
import { config } from "./src/config.js";
import { createRoad, createObstacle } from "./src/creator/road.js";

let ctx;
let laneArr = [];
let simStartTime = Date.now();

function launch() {
    ctx = document.getElementById("canvas").getContext("2d");

    let y = 25;
    let start = [0, y]; // Starting point
    let interim1 = [300, y]; // First control point
    let interim2 = [600, y]; // Second control point
    let end = [canvas.width, y]; // Ending point

    for (var i = 0; i < config.NumLanes; i++) {
        //Create lane specific path that the vehicles should follow
        laneArr[i] = createPath(start, interim1, interim2, end, config.NumPathPoints);

        start[1] = start[1] + 50;
        interim1[1] = interim1[1] + 50;
        interim2[1] = interim2[1] + 50;
        end[1] = end[1] + 50;

        console.log(start);

    }
    simulate();
}

function simulate() {
    //Limit the total number of iterations or time of the simulation
    if (Date.now() > (simStartTime + config.SimRunTimeSecs*1000))
        return;

    //Clear the canvas and repaint it for each frame refresh
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    createRoad(ctx);
    
    //Create obstacles and attach to path points
    // let x1 = laneArr[0][10].x;
    // let y1 = laneArr[0][10].y;
    // laneArr[0][10].obstacleType = config.ObstacleType.POT_HOLE;
    // createObstacle(ctx, x1, y1, config.ObstacleType.POT_HOLE);

    // let x2 = laneArr[0][12].x;
    // let y2 = laneArr[0][12].y;
    // laneArr[0][12].obstacleType = config.ObstacleType.BUS_STOP;
    // createObstacle(ctx, x2, y2, config.ObstacleType.BUS_STOP);
    //End obstacle creation

    //Update the recreated canvas with change in vehicle positions
    // laneArr.forEach(function (path) {
    //     updatePathPointVehicles(path, ctx);
    // });

    randomIterate(laneArr, (path) => {
        updatePathPointVehicles(path, ctx);
    });

    //Control the frame refresh period
    setTimeout(() => {
        window.requestAnimationFrame(simulate);
    }, 1000 / config.FramesPerSecond);
}

//Fisher Yates algo to shuffle lanes
function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}

function randomIterate(array, callback) {
    const shuffledArray = shuffleArray(array);
    for (const element of shuffledArray) {
        callback(element);
    }
}

//Launch simulation
launch();
