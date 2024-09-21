import { GlobalMemberStore } from "../data/system.js";

//Generate traffic based on two factors - vehicles per hour and vehicle run time - both are set by users
export async function generateTraffic() {
    var vehicleId = 0;
    var simRunTimeMillis = GlobalMemberStore.getMember("simRunTimeSecs").member.value * 1000;
    var millisPerNewVehicle = Math.floor(3600000/(GlobalMemberStore.getMember("vehiclesPerHour").member.value));
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
