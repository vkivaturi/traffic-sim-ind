import { GlobalMemberStore } from "/src/data/system.js";
import { Obstacle } from "/src/creator/obstacle.js";
import { removeVehicleFromLane } from "../transformer/endofpath.js";

//Create road with desired properties
export function createRoad(ctx) {
    ctx.fillStyle = "black";
    ctx.strokeStyle = "white";
    ctx.setLineDash([10, 15]);

    ctx.fillRect(0, 0, canvas.width, 150);
    ctx.strokeRect(0, 50, canvas.width, canvas.width);
    ctx.strokeRect(0, 100, canvas.width, canvas.width);
}

//Add obstacle image to road
export function createObstacle(obId, obType, laneId, pathPointId) {
    //let obstacle = GlobalMemberStore.getMember(obId).member.value;
    let ctx = GlobalMemberStore.getMember("ctx").member.value;
    let tempLaneArr = GlobalMemberStore.getMember("laneArray").member.value;
    let obInstance = new Obstacle(tempLaneArr[laneId][pathPointId].x, tempLaneArr[laneId][[pathPointId]].y, obType);

    //Check if alrady exists and decide on add or update
    if (GlobalMemberStore.getMember(obId).member === undefined) {
        GlobalMemberStore.putMember({ id: obId, value: obInstance });
    } else {
        GlobalMemberStore.updateMember({ id: obId, value: obInstance });
    }

    //Mark the specific path point x,y as obstacle
    tempLaneArr[laneId][pathPointId].obstacleType = obType;
    
    //Add image at that point
    const img = new Image();
    img.addEventListener("load", () => {
        ctx.drawImage(img, obInstance.x, obInstance.y - 25, 50, 50);
    });
    img.src = obInstance.type.image;
}

//Remove obstacle image to road
export function removeObstacle(obId) {
    let obstacle = GlobalMemberStore.getMember(obId).member.value;
    let ctx = GlobalMemberStore.getMember("ctx").member.value;
    let tempLaneArr = GlobalMemberStore.getMember("laneArray").member.value;

    //Remove obstacle from lane array
    tempLaneArr[1][15].obstacleType = null;

    //Clear the image 
    ctx.fillStyle = "black";
    ctx.fillRect(obstacle.x, obstacle.y - 25, 50, 50);
}

//Clear all vehicles from the road
export function clearVehiclesOnRoad() {
    let tempLaneArr = GlobalMemberStore.getMember("laneArray").member.value;
    tempLaneArr.forEach(pathArr => {
        for (var i=0; i<pathArr.length; i++) {
            removeVehicleFromLane(pathArr, i);
        }
    });

}