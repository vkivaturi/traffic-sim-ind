import { GlobalMemberStore } from "/src/data/system.js";
import { config } from "/src/config.js";
import { createObstacle, removeObstacle } from "/src/creator/road.js";


//Event handlers for all the widgets in UI are defined here
export function addUIEventHandlers() {
    //Process the simulation time slider value
    const slider1 = document.getElementById('simulationSlider');
    const sliderValue1 = document.getElementById('simulationSliderValue');
    GlobalMemberStore.putMember({ id: "simRunTimeSecs", value: (slider1.value) * 60 });
    slider1.addEventListener('input', function () {
        sliderValue1.textContent = slider1.value; // Display current value of the slider
        GlobalMemberStore.updateMember({ id: "simRunTimeSecs", value: (slider1.value) * 60 });
        console.log(GlobalMemberStore.getMember("simRunTimeSecs").member.value);
    });

    //Add traffic density setting to global store
    const slider2 = document.getElementById('trafficSlider');
    const sliderValue2 = document.getElementById('trafficSliderValue');
    var vehiclesPerHourToMillis = Math.floor((60 * 60) / slider2.value * 1000);
    GlobalMemberStore.putMember({ id: "vehiclesPerHourInMillis", value: vehiclesPerHourToMillis });
    GlobalMemberStore.putMember({ id: "vehiclesPerHour", value: slider2.value });

    slider2.addEventListener('input', function () {
        sliderValue2.textContent = slider2.value; // Display current value of the slider
        vehiclesPerHourToMillis = Math.floor((60 * 60) / slider2.value * 1000);
        GlobalMemberStore.updateMember({ id: "vehiclesPerHourInMillis", value: vehiclesPerHourToMillis });
        GlobalMemberStore.updateMember({ id: "vehiclesPerHour", value: slider2.value });
    });

    // Adding event listener for lane checkbox and bus stop selection
    const checkLane1 = document.getElementById('potholeLane1');
    const checkLane2 = document.getElementById('potholeLane2');
    const checkLane3 = document.getElementById('potholeLane3');
    const busStop = document.getElementById('busStop');
    const carBreak = document.getElementById('carBreak');
    const trafficLights = document.getElementById('trafficLights');

    checkLane1.addEventListener('click', function () {
        let obId11 = "obstacle11";
        let obId12 = "obstacle12";
        if (this.checked) {
            //Create obstacles and attach to path points
            let [laneId, pathPointId] = GlobalMemberStore.getMember("potholePathPoints").member.value[0];
            let obType = config.ObstacleType.POT_HOLE;
            createObstacle(obId11, obType, laneId, pathPointId);

            [laneId, pathPointId] = GlobalMemberStore.getMember("potholePathPoints").member.value[3];
            createObstacle(obId12, obType, laneId, pathPointId);

        } else {
            //Remove the obstacle
            removeObstacle(obId11);
            removeObstacle(obId12);
        }
    });
    checkLane2.addEventListener('click', function () {
        let obId21 = "obstacle21";
        let obId22 = "obstacle22";

        if (this.checked) {
            //Create obstacles and attach to path points
            let [laneId, pathPointId] = GlobalMemberStore.getMember("potholePathPoints").member.value[1];
            let obType = config.ObstacleType.POT_HOLE;
            createObstacle(obId21, obType, laneId, pathPointId);

            [laneId, pathPointId] = GlobalMemberStore.getMember("potholePathPoints").member.value[4];
            createObstacle(obId22, obType, laneId, pathPointId);

        } else {
            //Remove the obstacle
            removeObstacle(obId21);
            removeObstacle(obId22);
        }
    });
    checkLane3.addEventListener('click', function () {
        let obId32 = "obstacle32";

        if (this.checked) {
            //Create obstacles and attach to path points
            let [laneId, pathPointId] = GlobalMemberStore.getMember("potholePathPoints").member.value[5];
            let obType = config.ObstacleType.POT_HOLE;
            createObstacle(obId32, obType, laneId, pathPointId);
        } else {
            //Remove the obstacle
            removeObstacle(obId32);
        }
    });

    busStop.addEventListener('click', function () {
        let obId = "busStop";
        if (this.checked) {
            //Create bus stop and attach to path points
            let [laneId, pathPointId] = GlobalMemberStore.getMember("busStopPathPoints").member.value[0];
            let obType = config.ObstacleType.BUS_STOP;
            createObstacle(obId, obType, laneId, pathPointId);
        } else {
            //Remove the obstacle
            removeObstacle(obId);
        }
    });

    carBreak.addEventListener('click', function () {
        let obId = "carBreak";
        if (this.checked) {
            //Create bus stop and attach to path points
            let [laneId, pathPointId] = GlobalMemberStore.getMember("carBreakPathPoints").member.value[0];
            let obType = config.ObstacleType.CAR_BREAK;
            createObstacle(obId, obType, laneId, pathPointId);
        } else {
            //Remove the obstacle
            removeObstacle(obId);
        }
    });

    trafficLights.addEventListener('click', function () {
        GlobalMemberStore.updateMember({ id: "isTrafficSignalEnabled", value: true });

        let obId = "trafficLights";
        if (this.checked) {
            var lightsIdx = GlobalMemberStore.getMember("trafficLightsPathPoints").member.value.length;
            let obType = config.ObstacleType.TRAFFIC_LIGHTS;
            //Create traffic lights and attach to path points
            for (var i = 0; i < lightsIdx; i++) {
                let [laneId, pathPointId] = GlobalMemberStore.getMember("trafficLightsPathPoints").member.value[i];
                createObstacle(obId + i, obType, laneId, pathPointId);
            }
        } else {
            GlobalMemberStore.updateMember({ id: "isTrafficSignalEnabled", value: false });
            //Remove the obstacle
            let obId = "trafficLights";
            var lightsIdx = GlobalMemberStore.getMember("trafficLightsPathPoints").member.value.length;
            for (var i = 0; i < lightsIdx; i++) {
                removeObstacle(obId + i);
            }
        }
    });

}

export async function fetchAndRenderReadme() {
    // Fetch the README.md file
    const response = await fetch('About.md');
    const markdown = await response.text();
    // Convert markdown to HTML using Showdown
    const converter = new showdown.Converter();
    const htmlContent = converter.makeHtml(markdown);
    // Insert the HTML into the page
    document.getElementById('readme-content').innerHTML = htmlContent;
}

export function disableAllElementsState(elementState) {
    // Disable all checkboxes
    const checkboxes = document.querySelectorAll('input[type="checkbox"]');
    checkboxes.forEach(checkbox => checkbox.disabled = elementState);

    // Disable all sliders
    const selects = document.querySelectorAll('input[type="range"]');
    selects.forEach(select => select.disabled = elementState);
}

export function disableButtonState(btnId, elementState) {
    // Disable selected button
    const buttons = document.querySelectorAll('button[id=\"' + btnId + '\"]');
    buttons.forEach(button => button.disabled = elementState);
}
