//Move vehicle along a path if the next point is free
export function moveUpIfPossible(pIdx, pathArr) {
    var isMoved = false;
    //Initialise slot increment to represent the next slot for the vehicle
    var slotIncr = pathArr[pIdx].vehicle.speed;
    // while(slotIncr-- > 0){

    if (pIdx >= 0 && pIdx < pathArr.length) {
        var increment = pIdx;
        //Identify how many slots this vehicle can move. Consider its speed and availability of slots
        while (slotIncr-- > 0 && increment >= 0 && increment < pathArr.length-1) {
            if (pathArr[increment + 1].vehicle == null) {
                increment++;
            } else {
                break;
            }
        }
        //var nextIdx = pIdx + 1;
        var nextIdx = increment;
        console.log(pIdx + " : " + increment);
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
