import { addNewVehicleToPath } from "../creator/path.js";
import { moveUpIfPossible } from "./movement.js";
import { removeVehicleFromLane } from "../transformer/endofpath.js";
import { GlobalMemberStore } from "../data/system.js";

let vehicleAddTime = 0;
//Main function that updates path in every frame refresh
export function updatePathPointVehicles(laneId, ctx) {
    var pathArr = GlobalMemberStore.getMember("laneArray").member.value[laneId];

    for (var i = pathArr.length - 1; i >= 0; i--) {
        if (pathArr[i].vehicle == null) {
            let currTime = Date.now();
            let queue = GlobalMemberStore.getMember("newVehicleQueue").member.value;
            //If start point is null, add a vehicle to the path 
            if (pathArr[i].position == "start" && queue.size() > 0) {
                addNewVehicleToPath(i, pathArr, ctx, laneId);
                vehicleAddTime = currTime;
                //Remove the vehilce from queue as it is now added to path
                queue.dequeue();
            }
        } else {
            if ((pathArr[i].position == "start") || (pathArr[i].position == "interim")) {
                var isMoveUp = moveUpIfPossible(i, pathArr);
            } else if (pathArr[i].position == "end") {
                //Remove vehicle from lane end
                removeVehicleFromLane(pathArr, i);
                GlobalMemberStore.updateMember({ id: "vehicleCounter", value: GlobalMemberStore.getMember("vehicleCounter").member.value + 1 });
            }
        }
    }
}