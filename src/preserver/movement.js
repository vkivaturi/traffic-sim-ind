import { config } from "../config.js";

//Move vehicle along a path if the next point is free
export function moveUpIfPossible(pIdx, pathArr) {
    var isMoved = false;
    //Initialise slot increment to represent the next slot for the vehicle
    var slotIncr = pathArr[pIdx].vehicle.speed;

    if (pIdx >= 0 && pIdx < pathArr.length) {
        var increment = pIdx;
        //Identify how many slots this vehicle can move. Consider its speed and availability of slots
        while (slotIncr-- > 0 && increment >= 0 && increment < pathArr.length - 1) {
            if (pathArr[increment + 1].vehicle == null) {
                increment++;
            } else {
                break;
            }
        }

        //Logic to move the vehicle by increment count
        var nextIdx = increment;
        if (pathArr[nextIdx].vehicle == null) {
            pathArr[nextIdx].vehicle = pathArr[pIdx].vehicle;

            pathArr[nextIdx].vehicle.x = pathArr[nextIdx].x;
            pathArr[nextIdx].vehicle.y = pathArr[nextIdx].y;
            pathArr[nextIdx].vehicle.draw();

            pathArr[pIdx].vehicle = null;
            isMoved = true;

            pIdx++;

        } else {
            console.log("break");
            //         break;
        }
        //   }

    }
    return isMoved;
}


function checkObstacles(pathPoint, increment, pIdx) {
    //Check for obstacles and take appropriate decision
    switch (pathPoint.obstacleType) {
        case config.ObstacleType.BUS_STOP:
            if (pathPoint.vehicle.name == 'Bus') {
                console.log("Bus found");
                //increment = pIdx;
            }
            break;
        case config.ObstacleType.POT_HOLE:
            console.log("Pot hole found for " + pathPoint.vehicle.name);
            //increment = (increment > pIdx) ? increment-- : increment;
            console.log("before " + increment);
            increment = pIdx + 1;
            console.log("after " + increment);
            break;
        default:
            break;
    }

    return increment;

}
