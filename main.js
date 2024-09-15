import { createPath } from "/src/creator/path.js";
import { updatePathPointVehicles } from "/src/preserver/orchestrator.js";
import { config } from "/src/config.js";
import { createRoad } from "/src/creator/road.js";
import { addUIEventHandlers } from "/src/creator/eventhandlers.js";
import { GlobalMemberStore } from "/src/data/system.js";
import { Analytics } from "./src/creator/analytics";

function initialise() {
    let ctx = document.getElementById("canvas").getContext("2d");
    GlobalMemberStore.putMember({ id: "ctx", value: ctx });

    //Initialise
    GlobalMemberStore.putMember({ id: "simStartTimeMillis", value: Date.now() });
    GlobalMemberStore.putMember({ id: "isSimulationActive", value: false });

    GlobalMemberStore.putMember({ id: "vehicleCounter", value: 0 });

    //Initialise lane array
    if (GlobalMemberStore.getMember("laneArray").member === undefined) {
        GlobalMemberStore.putMember({ id: "laneArray", value: createLanesArray() });
    } else {
        GlobalMemberStore.updateMember({ id: "laneArray", value: createLanesArray() });
    }

    //Pothole locations in the lane path array are predefined
    let potholePathPoints = [[0, 20], [1, 15], [2, 20]];
    GlobalMemberStore.putMember({ id: "potholePathPoints", value: potholePathPoints });

    //Bus stop location in the lane path array are predefined
    let busStopPathPoints = [[0, 25]];
    GlobalMemberStore.putMember({ id: "busStopPathPoints", value: busStopPathPoints });

    //Add simulation time to global store
    addUIEventHandlers();

    //Start simulation button click event capture
    startSimulationBtn.addEventListener('click', function () {
        GlobalMemberStore.updateMember({ id: "simStartTimeMillis", value: Date.now() });
        GlobalMemberStore.updateMember({ id: "isSimulationActive", value: true });  
        simulate();
    });
    //Stop simulation button click event capture
    stopSimulationBtn.addEventListener('click', function () {
        //Break the loop in Simulate function
        GlobalMemberStore.updateMember({ id: "simStartTimeMillis", value: 0 });
        GlobalMemberStore.updateMember({ id: "isSimulationActive", value: false });  
    });

    createRoad(ctx);

    Analytics.createAnalytics();
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
    let simStartTimeMillis = GlobalMemberStore.getMember("simStartTimeMillis").member.value;

    Analytics.updateAnalytics();

    if (Date.now() > (simStartTimeMillis + GlobalMemberStore.getMember("simRunTimeSecs").member.value * 1000)) {
        //Simulation run time is reached. Exit simulation
        updateProgressBar(progressBar, 100);    
        GlobalMemberStore.updateMember({ id: "isSimulationActive", value: false });
        return;
    }

    //Obstacles get overriden by moving vehicles. Render them again in each iteration
    addAllObstacles();

    //Update the recreated canvas with change in vehicle positions
    var tempArray = getRandomArray(config.NumLanes);
    tempArray.forEach(function (i) {
        var laneId = i - 1;
        updatePathPointVehicles(laneId, GlobalMemberStore.getMember("ctx").member.value);
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

//Update proress bar. Value is optional. If present, it will be used directly
function updateProgressBar(progressBar, value) {

    let newValue = 0;
    if (value !== undefined) {
        newValue = value;
    } else {
        //Calculate the progress value since nothing is passed from caller
        let simRunTimeSecs = GlobalMemberStore.getMember("simRunTimeSecs").member.value;
        let simStartTimeMillis = GlobalMemberStore.getMember("simStartTimeMillis").member.value;
        let currentTimeMillis = Date.now();

        newValue = Math.floor((currentTimeMillis - simStartTimeMillis) * 100 / (simRunTimeSecs * 1000));
    }
    //console.log(`${simRunTimeSecs} ${simStartTimeMillis} ${currentTimeMillis} ${newValue}`)
    progressBar.style.width = newValue + '%'; // Update the width
    progressBar.setAttribute('aria-valuenow', newValue); // Update the aria value
    progressBar.textContent = newValue + '%';
}

function addAllObstacles() {
    let potholePathPointsArr = GlobalMemberStore.getMember("potholePathPoints").member.value;
    let ctx = GlobalMemberStore.getMember("ctx").member.value;
    potholePathPointsArr.forEach(function (valueLanePathPoint) {
        let [laneId, pathPointId] = valueLanePathPoint;
        let obstaclePathPoint = GlobalMemberStore.getMember("laneArray").member.value[laneId][pathPointId];
        if (obstaclePathPoint.obstacleType !== undefined) {
            //Add image at that point
            const img = new Image();
            img.addEventListener("load", () => {
                ctx.drawImage(img, obstaclePathPoint.x, obstaclePathPoint.y - 25, 50, 50);
            });
            img.src = obstaclePathPoint.obstacleType.image;
            console.log(`Added obstacle ${obstaclePathPoint.obstacleType} to ${laneId}`)
        }
    });

    let busStopPathPointsArr = GlobalMemberStore.getMember("busStopPathPoints").member.value;
    busStopPathPointsArr.forEach(function (valueLanePathPoint) {
        let [laneId, pathPointId] = valueLanePathPoint;
        let obstaclePathPoint = GlobalMemberStore.getMember("laneArray").member.value[laneId][pathPointId];
        if (obstaclePathPoint.obstacleType !== undefined) {
            //Add image at that point
            const img = new Image();
            img.addEventListener("load", () => {
                ctx.drawImage(img, obstaclePathPoint.x, obstaclePathPoint.y - 25, 50, 50);
            });
            img.src = obstaclePathPoint.obstacleType.image;
        }
    });

}

//Initialise simulation
initialise();
