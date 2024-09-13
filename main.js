import { createPath } from "./src/creator/path.js";
import { updatePathPointVehicles } from "./src/preserver/orchestrator.js";
import { config } from "./src/config.js";
import { createRoad, createObstacle } from "./src/creator/road.js";
import { GlobalMemberStore } from "./src/data/system.js";

let ctx;
let simStartTime = Date.now();

function launch() {
    ctx = document.getElementById("canvas").getContext("2d");

    //Add simulation time to global store
    const slider1 = document.getElementById('simulationSlider');
    const sliderValue1 = document.getElementById('simulationSliderValue');
    GlobalMemberStore.putMember({ id: "simRunTimeSecs", value: (slider1.value) });

    slider1.addEventListener('input', function () {
        sliderValue1.textContent = slider1.value; // Display current value of the slider
        GlobalMemberStore.updateMember({ id: "simRunTimeSecs", value: (slider1.value * 60) });
        console.log(GlobalMemberStore.getMember("simRunTimeSecs").member.value);

    });

    //Add traffic density setting to global store
    const slider2 = document.getElementById('trafficSlider');
    const sliderValue2 = document.getElementById('trafficSliderValue');
    var vehiclesPerHourToMillis = Math.floor((60 * 60) / slider2.value * 1000);
    GlobalMemberStore.putMember({ id: "vehiclesPerHourInMillis", value: vehiclesPerHourToMillis });
    slider2.addEventListener('input', function () {
        sliderValue2.textContent = slider2.value; // Display current value of the slider
        vehiclesPerHourToMillis = Math.floor((60 * 60) / slider2.value * 1000);
        GlobalMemberStore.updateMember({ id: "vehiclesPerHourInMillis", value: vehiclesPerHourToMillis });
    });

    //Start simulation button click event capture
    startSimulationBtn.addEventListener('click', function () {
        simStartTime = Date.now();
        //GlobalMemberStore.putMember({ id: "laneArray", value: null });
        if (GlobalMemberStore.getMember("laneArray").member === undefined) {
            GlobalMemberStore.putMember({ id: "laneArray", value: createLanesArray() });
        } else {
            GlobalMemberStore.updateMember({ id: "laneArray", value: createLanesArray() });
        }

        //Initialise lanes array
//        createLanesArray();
        //Add lane array to a global store
        //GlobalMemberStore.putMember({ id: "laneArray", value: createLanesArray() });
        simulate();
    });

    createRoad(ctx);

    //Create obstacles and attach to path points
    // let x1 = laneArr[0][20].x;
    // let y1 = laneArr[0][20].y;
    // laneArr[0][20].obstacleType = config.ObstacleType.BUS_STOP;
    // createObstacle(ctx, x1, y1, config.ObstacleType.BUS_STOP);
    // console.log(`Obstacle -- ${x1} ${y1}`);

    //End obstacle creation

    //simulate();
}

function createLanesArray() {
    let laneArr = [];
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
    }
    return laneArr;
}

function simulate() {
    //Limit the total number of iterations to time of the simulation
    //if (Date.now() > (simStartTime + config.SimRunTimeSecs * 1000))
    if (Date.now() > (simStartTime + GlobalMemberStore.getMember("simRunTimeSecs").member.value * 1000))
        return;

    //Clear the canvas and repaint it for each frame refresh
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    createRoad(ctx);

    //Create obstacles and attach to path points
    //let x1 = laneArr[0][5].x;
    //let y1 = laneArr[0][5].y;
    //laneArr[0][5].obstacleType = config.ObstacleType.POT_HOLE;
    //createObstacle(ctx, x1, y1, config.ObstacleType.POT_HOLE);

    //Create obstacles and attach to path points
    // let x2 = laneArr[1][7].x;
    // let y2 = laneArr[1][7].y;
    // laneArr[1][7].obstacleType = config.ObstacleType.POT_HOLE;
    // createObstacle(ctx, x2, y2, config.ObstacleType.POT_HOLE);

    //Update the recreated canvas with change in vehicle positions
    var tempArray = getRandomArray(config.NumLanes);
    tempArray.forEach(function (i) {
        var laneId = i - 1;
        updatePathPointVehicles(laneId, ctx);
    });

    //Control the frame refresh period
    setTimeout(() => {
        window.requestAnimationFrame(simulate);
    }, 1000 / config.FramesPerSecond);
}

function getRandomArray(size) {
    // Generate an array of numbers from 1 to size
    const array = Array.from({ length: size }, (_, index) => index + 1);

    // Shuffle the array using Fisher-Yates algorithm
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}

//Launch simulation
launch();
