import { config } from "../config.js";
import { GlobalMemberStore } from "../data/system.js";

//Move vehicle along a path if the next point is free
export function moveUpIfPossible(pIdx, pathArr) {
    var isMoved = false;
    var currentTimeMillis = Date.now();
    //Check if there is an active onstacle that might impact the vehicle movement
    pathArr[pIdx] = checkObstacles(pathArr[pIdx], currentTimeMillis);

    if (currentTimeMillis < pathArr[pIdx].vehicle.obstacleTimeout) {
        //Draw the vehicle in current point only. 
        //No movement since there is an obstacle
        pathArr[pIdx].vehicle.draw();
        return;
    } else {
        //Move vehicle to next point in path and draw it there
        pathArr[pIdx].vehicle.obstacleTimeout = 0;

        if (pIdx >= 0 && pIdx < pathArr.length) {
            //Check next point in current lane
            var nextIdx = pIdx + 1;
            if (pathArr[nextIdx].vehicle == null) {
                //Next slot is free in same lane. Move up
                pathArr[nextIdx].vehicle = pathArr[pIdx].vehicle;
                pathArr[nextIdx].vehicle.x = pathArr[nextIdx].x;
                pathArr[nextIdx].vehicle.y = pathArr[nextIdx].y;
                pathArr[nextIdx].vehicle.draw();

                pathArr[pIdx].vehicle = null;
                isMoved = true;
            } else {
                //Check next point in an adjacent lane - overtaking use case
                //Fetch the adjacent lane id
                var nextLaneId = pathArr[nextIdx].vehicle.laneId + 1;

                var laneArr = GlobalMemberStore.getMember("laneArray").member.value;

                //Check only right side lane availability for overtaking 
                if (nextLaneId >= laneArr.length) {
                    pathArr[nextIdx].vehicle.draw();
                    return;
                }
                //Perform availablity check on the point in new lane
                var nextLanePathArr = laneArr[nextLaneId];
                if (nextLanePathArr[pIdx].vehicle == null) {
                    //console.log("Next slot in other lane is free");

                    nextLanePathArr[pIdx].vehicle = pathArr[pIdx].vehicle;
                    nextLanePathArr[pIdx].vehicle.x = nextLanePathArr[pIdx].x;
                    nextLanePathArr[pIdx].vehicle.y = nextLanePathArr[pIdx].y;
                    nextLanePathArr[pIdx].vehicle.draw();

                    pathArr[pIdx].vehicle = null;
                    isMoved = true;
                } else {
                    //Next slot is already taken by another vehicle. Stay in current point
                    //                  console.log("Next slot in same lane and other lane is busy");
                    pathArr[nextIdx].vehicle.draw();
                    isMoved = false;
                }
            }
        }
    }

    return isMoved;
}


function checkObstacles(pathPoint, currentTimeMillis) {
    //Check for obstacles and take appropriate decision
    switch (pathPoint.obstacleType) {
        case config.ObstacleType.BUS_STOP:
            //console.log("Bus stop found for " + pathPoint.vehicle.name);
            if (pathPoint.vehicle.name == 'Bus') {
                console.log("Bus found");
                if (pathPoint.vehicle.obstacleTimeout == 0) {
                    pathPoint.vehicle.obstacleTimeout = currentTimeMillis + config.ObstacleType.BUS_STOP.timeout;
                }
            }
            break;
        case config.ObstacleType.POT_HOLE:
            //console.log("Pot hole found for " + pathPoint.vehicle.name);
            if (pathPoint.vehicle.obstacleTimeout == 0) {
                pathPoint.vehicle.obstacleTimeout = currentTimeMillis + config.ObstacleType.POT_HOLE.timeout;
            }
            break;
        default:
            break;
    }

    return pathPoint;

}
