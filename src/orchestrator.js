import {addNewVehicleToPath} from "./path.js";
import {moveUpIfPossible} from "./utils/movement.js";

//Main function that updates path in every frame refresh
export function updatePathPointVehicles(pathArr, ctx) {
    for (var i = pathArr.length - 1; i >= 0; i--) {
        //console.log(pathArr[i].position + " : " + i)
        if (pathArr[i].vehicle == null) {
            //If start point is null, add a vehicle to the path 
            if (pathArr[i].position == "start") {
                addNewVehicleToPath(i, pathArr, ctx);
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
