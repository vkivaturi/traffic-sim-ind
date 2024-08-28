import {addNewVehicleToPath} from "./path.js";
import {moveUpIfPossible} from "./utils/movement.js";
import {config} from "./config.js";

let vehicleAddIntervalMillis = Math.floor(((60*60)/config.VehiclesPerHour) * 1000);
let vehicleAddTime = 0;
//Main function that updates path in every frame refresh
export function updatePathPointVehicles(pathArr, ctx) {
    for (var i = pathArr.length - 1; i >= 0; i--) {
        if (pathArr[i].vehicle == null) {
            let currTime = Date.now();
            //If start point is null, add a vehicle to the path 
            if (pathArr[i].position == "start" && isVehiclePerHourAllowed(currTime, vehicleAddIntervalMillis, vehicleAddTime)) {
                addNewVehicleToPath(i, pathArr, ctx);
                vehicleAddTime = currTime;
            }
        } else {
            if ((pathArr[i].position == "start") || (pathArr[i].position == "interim")) {
                var isMoveUp = moveUpIfPossible(i, pathArr);
                //console.log("Is move up : " + isMoveUp);
            } else if (pathArr[i].position == "end") {
                //Remove vehicle from end
                pathArr[i].vehicle = null;

                let vehicleElement = document.getElementById("counter");
                vehicleElement.textContent++;          
            }
        }
    }
}

//Check if it time to add new vehicle. This is based on the vehicles per hour configuration
//that indicates traffic density
function isVehiclePerHourAllowed(currTime, vehicleAddIntervalMillis, vehicleAddTime) {
    return (currTime > (vehicleAddTime + vehicleAddIntervalMillis) ? true : false );
}