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
            if (pathArr[nextIdx].vehicle == null && pathArr[nextIdx].obstacleType != config.ObstacleType.CAR_BREAK) {
                //Next slot is free in same lane. Move up
                pathArr[nextIdx].vehicle = pathArr[pIdx].vehicle;
                pathArr[nextIdx].vehicle.x = pathArr[nextIdx].x;
                pathArr[nextIdx].vehicle.y = pathArr[nextIdx].y;
                pathArr[nextIdx].vehicle.draw();

                pathArr[pIdx].vehicle = null;
                isMoved = true;
            } else {
                //Check next point in an adjacent lane - overtaking use case
                isMoved = checkRightLaneAndMove(pathArr, pIdx, isMoved);
            }
        }
    }
    if (isMoved) {
        //Clear the image from previous location
        let ctx = GlobalMemberStore.getMember("ctx").member.value;
        ctx.fillStyle = "black";
        ctx.fillRect(pathArr[pIdx].x, pathArr[pIdx].y - 25, 48, 48);
    }
    return isMoved;
}


function checkRightLaneAndMove(pathArr, pIdx, isMoved) {
    var nextLaneId = pathArr[pIdx].vehicle.laneId + 1;
    var laneArr = GlobalMemberStore.getMember("laneArray").member.value;
    //Check only right side lane availability for overtaking. If no more right lane exists, stay in same lane and wait 
    if (nextLaneId < laneArr.length) {
        var nextLanePathArr = laneArr[nextLaneId];
        if (nextLanePathArr[pIdx].vehicle == null) {
            nextLanePathArr[pIdx].vehicle = pathArr[pIdx].vehicle;
            nextLanePathArr[pIdx].vehicle.x = nextLanePathArr[pIdx].x;
            nextLanePathArr[pIdx].vehicle.y = nextLanePathArr[pIdx].y;
            nextLanePathArr[pIdx].vehicle.draw();

            pathArr[pIdx].vehicle = null;
            isMoved = true;
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
                if (pathPoint.vehicle.obstacleTimeout == 0) {
                    pathPoint.vehicle.obstacleTimeout = currentTimeMillis + config.ObstacleType.BUS_STOP.timeout;
                }
            }
            break;
        case config.ObstacleType.POT_HOLE:
            if (pathPoint.vehicle.obstacleTimeout == 0) {
                pathPoint.vehicle.obstacleTimeout = currentTimeMillis + config.ObstacleType.POT_HOLE.timeout;
            }
            break;
        case config.ObstacleType.TRAFFIC_LIGHTS:
            if (pathPoint.vehicle.obstacleTimeout == 0) {
                pathPoint.vehicle.obstacleTimeout = currentTimeMillis + config.ObstacleType.TRAFFIC_LIGHTS.timeout;
            }
            break;
        case config.ObstacleType.CAR_BREAK:
            //Car break use case is handled differently since no other vehicle can simply go over it (like pot hole / bus stop)
            pathPoint.vehicle.obstacleTimeout = 0;
            break;
        default:
            break;
    }

    return pathPoint;

}
