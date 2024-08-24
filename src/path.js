import createVehicle from "./vehicle.js";

const colourArray = ['blue', 'pink', 'orange', 'yellow', 'purple', 'green'];

//Create a path using Beizer curve computation
export function createPath(p0, p1, p2, p3, numPoints) {
    var pathArr = [];
    for (let i = 0; i <= numPoints; i++) {
        const t = i / numPoints;
        const point = cubicBezier(t, p0, p1, p2, p3);
        pathArr[i] = point;
        //Label the point with where is stands in the path
        if (i==0) {
            point.position = "start";
        } else if (i==numPoints) {
            point.position = "end";
        } else {
            point.position = "interim";
        }
        //console.log(`t=${t.toFixed(1)}: x=${pathArr[i].x.toFixed(0)}, y=${pathArr[i].y.toFixed(0)}`);
    }
    return pathArr;
}

//Add a new vehicle to the path provided. This is usually done at the beginning of the path
export function addNewVehicleToPath(pIdx, pathArr, ctx) {
    const cIdx = Math.floor(Math.random() * colourArray.length);
    pathArr[pIdx].vehicle = createVehicle(ctx, pathArr[pIdx].x, pathArr[pIdx].y, colourArray[cIdx]);
    pathArr[pIdx].vehicle.draw();
    return pathArr[pIdx];

}

// Compute the cubic Bézier coordinates for a given t value
function cubicBezier(t, p0, p1, p2, p3) {
    var point = {};
    point.x = Math.pow(1 - t, 3) * p0[0] +
        3 * t * Math.pow(1 - t, 2) * p1[0] +
        3 * t * t * (1 - t) * p2[0] +
        Math.pow(t, 3) * p3[0];

    point.y = Math.pow(1 - t, 3) * p0[1] +
        3 * t * Math.pow(1 - t, 2) * p1[1] +
        3 * t * t * (1 - t) * p2[1] +
        Math.pow(t, 3) * p3[1];

    point.x = point.x.toFixed(0);
    point.y = point.y.toFixed(0);

    return point;
}