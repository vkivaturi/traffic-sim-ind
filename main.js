import { createPath } from "./src/creator/path.js";
import { updatePathPointVehicles } from "./src/preserver/orchestrator.js";
import { config } from "./src/config.js";
import { createRoad, createObstacle, removeObstacle } from "./src/creator/road.js";
import { GlobalMemberStore } from "./src/data/system.js";

let ctx;
let simStartTime = Date.now();

function launch() {
    ctx = document.getElementById("canvas").getContext("2d");
    GlobalMemberStore.putMember({ id: "ctx", value: ctx });

    //Initialise lane array
    if (GlobalMemberStore.getMember("laneArray").member === undefined) {
        GlobalMemberStore.putMember({ id: "laneArray", value: createLanesArray() });
    } else {
        GlobalMemberStore.updateMember({ id: "laneArray", value: createLanesArray() });
    }

    //Add simulation time to global store
    const slider1 = document.getElementById('simulationSlider');
    const sliderValue1 = document.getElementById('simulationSliderValue');
    GlobalMemberStore.putMember({ id: "simRunTimeSecs", value: (slider1.value) });

    slider1.addEventListener('input', function () {
        sliderValue1.textContent = slider1.value; // Display current value of the slider
        GlobalMemberStore.updateMember({ id: "simRunTimeSecs", value: (slider1.value) });
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

    // Adding event listener for lane checkbox
    const checkLane1 = document.getElementById('potholeLane1');
    const checkLane2 = document.getElementById('potholeLane2');
    const checkLane3 = document.getElementById('potholeLane3');
    checkLane1.addEventListener('click', function () {
        let obId = "obstacle1";
        if (this.checked) {
            //Create obstacles and attach to path points
            let [laneId, pathPointId] = [0, 10];
            //let pathPointId = 10
            let obType = config.ObstacleType.POT_HOLE;   
            createObstacle(obId, obType, laneId, pathPointId);
        } else {
            //Remove the obstacle
            removeObstacle(obId);
        }
    });
    checkLane2.addEventListener('click', function () {
        let obId = "obstacle2";
        if (this.checked) {
            //Create obstacles and attach to path points
            let [laneId, pathPointId] = [1, 15];
            //let pathPointId = 10
            let obType = config.ObstacleType.POT_HOLE;   
            createObstacle(obId, obType, laneId, pathPointId);
        } else {
            //Remove the obstacle
            removeObstacle(obId);
        }
    });
    checkLane3.addEventListener('click', function () {
        let obId = "obstacle3";
        if (this.checked) {
            //Create obstacles and attach to path points
            let [laneId, pathPointId] = [2, 20];
            //let pathPointId = 10
            let obType = config.ObstacleType.POT_HOLE;   
            createObstacle(obId, obType, laneId, pathPointId);
        } else {
            //Remove the obstacle
            removeObstacle(obId);
        }
    });

    //Start simulation button click event capture
    startSimulationBtn.addEventListener('click', function () {
        simStartTime = Date.now();
        simulate();
    });

    //Stop simulation button click event capture
    stopSimulationBtn.addEventListener('click', function () {
        //Break the loop in Simulate function
        simStartTime = 0;
    });

    //Progress bar updates
    const progressBar = document.getElementById('progressBar');
    //const increaseProgressBtn = document.getElementById('startSimulationBtn');
    // Function to update the progress bar value
    //increaseProgressBtn.addEventListener('click', function () {
    //    updateProgressBar(progressBar);
    //});

    createRoad(ctx);

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

    //Update progress bar
    updateProgressBar(progressBar);

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

function updateProgressBar(progressBar) {
    let currentValue = parseInt(progressBar.getAttribute('aria-valuenow'));
    //if (currentValue < 100) {
    currentValue += 1; // Increase by 10%
    progressBar.style.width = currentValue + '%'; // Update the width
    progressBar.setAttribute('aria-valuenow', currentValue); // Update the aria value
    progressBar.textContent = currentValue + '%';
}

//Launch simulation
launch();
