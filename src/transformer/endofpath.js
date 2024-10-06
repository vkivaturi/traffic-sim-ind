import { GlobalMemberStore } from "/src/data/system.js";

export function removeVehicleFromLane(pathArr, i) {
    clearImageFromPath(pathArr,i);
    pathArr[i].vehicle = null;
}

function clearImageFromPath(pathArr, pIdx) {
    let ctx = GlobalMemberStore.getMember("ctx").member.value;
    ctx.fillStyle = "black";
    ctx.fillRect(pathArr[pIdx].x, pathArr[pIdx].y - 25, 48, 48);
}