//Move vehicle along a path if the next point is free
export default function moveUpIfPossible(pIdx, pathArr) {
    var isMoved = false;
    if (pIdx >= 0 && pIdx < pathArr.length) {
        if (pathArr[pIdx + 1].vehicle == null) {
            pathArr[pIdx + 1].vehicle = pathArr[pIdx].vehicle;

            pathArr[pIdx + 1].vehicle.x = pathArr[pIdx + 1].x;
            pathArr[pIdx + 1].vehicle.y = pathArr[pIdx + 1].y;
            pathArr[pIdx + 1].vehicle.draw();

            pathArr[pIdx].vehicle = null;
            isMoved = true;
        }
    }
    return isMoved;
}
