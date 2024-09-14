import { GlobalMemberStore } from "/src/data/system.js";
import { config } from "/src/config.js";
import { createObstacle, removeObstacle } from "/src/creator/road.js";


//Event handlers for all the widgets in UI are defined here
export function addUIEventHandlers() {
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
}
