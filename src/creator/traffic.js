import { GlobalMemberStore } from "../data/system.js";
import { config } from "../config.js";

//Generate traffic based on two factors - vehicles per hour and vehicle run time - both are set by users
export async function generateTraffic() {
    var vehicleId = 0;
    var simRunTimeMillis = GlobalMemberStore.getMember("simRunTimeSecs").member.value * 1000;
    var millisPerNewVehicle = Math.floor(3600000 / (GlobalMemberStore.getMember("vehiclesPerHour").member.value));
    const intervalId = setInterval(() => {
        let queue = GlobalMemberStore.getMember("newVehicleQueue").member.value;
        queue.enqueue(vehicleId++);
    }, millisPerNewVehicle);

    // Stop after simulation time limit is reached
    setTimeout(() => {
        clearInterval(intervalId);
        let queue = GlobalMemberStore.getMember("newVehicleQueue").member.value;
        console.log(`Simulation ended queue size ${queue.size()}`);
    }, simRunTimeMillis);
}

//Traffic signal is managed asynchronously. It will activate at a given time and deactivate after a specific period
export async function manageTrafficSignal() {
    signalOnOff();

    //Repeat the cycle    
    let intervalCycle = setInterval(() => {
        signalOnOff();
    }, 20000);

    setTimeout(() => {
        clearInterval(intervalCycle);
    }, GlobalMemberStore.getMember("simRunTimeSecs").member.value * 1000);
}

function signalOnOff() {
    setTimeout(() => {
        let tempLaneArr = GlobalMemberStore.getMember("laneArray").member.value;
        tempLaneArr[0][20].obstacleType = config.ObstacleType.TRAFFIC_LIGHTS;
        tempLaneArr[1][20].obstacleType = config.ObstacleType.TRAFFIC_LIGHTS;
        tempLaneArr[2][20].obstacleType = config.ObstacleType.TRAFFIC_LIGHTS;

        config.ObstacleType.TRAFFIC_LIGHTS.timeout = Number.MAX_VALUE;
        config.ObstacleType.TRAFFIC_LIGHTS.image = "/images/traffic-light-on.png";
    }, 2000);

    //Traffic signal turns green after a specific period from turning red
    setTimeout(() => {
        config.ObstacleType.TRAFFIC_LIGHTS.timeout = 0;
        let tempLaneArr = GlobalMemberStore.getMember("laneArray").member.value;
        tempLaneArr[0][20].vehicle.obstacleTimeout = 0;
        tempLaneArr[1][20].vehicle.obstacleTimeout = 0;
        tempLaneArr[2][20].vehicle.obstacleTimeout = 0;

        config.ObstacleType.TRAFFIC_LIGHTS.image = "/images/traffic-light-off.png";
    }, 15000);
}

