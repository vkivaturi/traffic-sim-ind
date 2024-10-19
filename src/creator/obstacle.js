//Obstacle object with its basic properties
export class Obstacle {
    constructor(x, y, laneId, pathPointId, obType) {
        this.x = x;
        this.y = y;
        this.laneId = laneId;
        this.pathPointId = pathPointId;
        this.type = obType;
    }
}