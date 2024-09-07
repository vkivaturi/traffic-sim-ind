import { config } from "../config.js";

//Move vehicle along a path if the next point is free
export function moveUpIfPossible(pIdx, pathArr) {
    var isMoved = false;
    var currentTimeMillis = Date.now();
    //Check if there is an active onstacle that might impact the vehicle movement
    pathArr[pIdx] = checkObstacles(pathArr[pIdx], currentTimeMillis);
    var nextIdx = pIdx;
    
    if (currentTimeMillis < pathArr[pIdx].vehicle.obstacleTimeout) {
        //Draw the vehicle in current point only. No movement since there is an obstacle
        pathArr[nextIdx].vehicle.draw();
        return;
    } else {
        //Move vehicle to next point in path and draw it there
        pathArr[pIdx].vehicle.obstacleTimeout = 0;
        nextIdx = pIdx + 1;

        if (pIdx >= 0 && pIdx < pathArr.length) {
            if (pathArr[nextIdx].vehicle == null) {
            //Next slot is free in same lane. Move up
                pathArr[nextIdx].vehicle = pathArr[pIdx].vehicle;
    
                pathArr[nextIdx].vehicle.x = pathArr[nextIdx].x;
                pathArr[nextIdx].vehicle.y = pathArr[nextIdx].y;
                pathArr[nextIdx].vehicle.draw();
    
                pathArr[pIdx].vehicle = null;
                isMoved = true;
            }else{
                //Next slot is already taken by another vehicle. Stay in current point
                    pathArr[nextIdx].vehicle.draw();
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
