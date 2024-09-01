import { config } from "../config.js";

//Move vehicle along a path if the next point is free
export function moveUpIfPossible(pIdx, pathArr) {
    var isMoved = false;
    //Initialise slot increment to represent the next slot for the vehicle
    var slotIncr = pathArr[pIdx].vehicle.maxSpeed;
    var currentTimeMillis = Date.now();
    //Check if there is an active onstacle that might impact the vehicle movement
    pathArr[pIdx] = checkObstacles(pathArr[pIdx], currentTimeMillis);

    if (currentTimeMillis < pathArr[pIdx].vehicle.obstacleTimeout) {
        return;
    } else {
        pathArr[pIdx].vehicle.obstacleTimeout = 0;
    }

    if (pIdx >= 0 && pIdx < pathArr.length) {
        //Logic to move the vehicle by increment count
        var nextIdx = pIdx + 1;
        if (pathArr[nextIdx].vehicle == null) {

            pathArr[nextIdx].vehicle = pathArr[pIdx].vehicle;
            pathArr[nextIdx].vehicle.erase();

            pathArr[nextIdx].vehicle.x = pathArr[nextIdx].x;
            pathArr[nextIdx].vehicle.y = pathArr[nextIdx].y;
            pathArr[nextIdx].vehicle.draw();

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
            console.log("Bus stop found for " + pathPoint.vehicle.name);
            if (pathPoint.vehicle.name == 'Bus') {
                console.log("Bus found");
                if (pathPoint.vehicle.obstacleTimeout == 0) {
                    pathPoint.vehicle.obstacleTimeout = currentTimeMillis + config.ObstacleType.BUS_STOP.timeout;
                }
            }
            break;
        case config.ObstacleType.POT_HOLE:
            console.log("Pot hole found for " + pathPoint.vehicle.name);
            if (pathPoint.vehicle.obstacleTimeout == 0) {
                pathPoint.vehicle.obstacleTimeout = currentTimeMillis + config.ObstacleType.POT_HOLE.timeout;
            }
            break;
        default:
            break;
    }

    return pathPoint;

}
