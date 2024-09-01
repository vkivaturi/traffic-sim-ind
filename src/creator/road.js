import { config } from "../config";

//Create road with desired properties
export function createRoad(ctx) {
    ctx.fillStyle = "black";
    ctx.strokeStyle = "white";
    ctx.setLineDash([10, 15]);

    ctx.fillRect(0, 0, canvas.width, 150);
    ctx.strokeRect(0, 50, canvas.width, canvas.width);
    ctx.strokeRect(0, 100, canvas.width, canvas.width);
}

//Add obstacles on road
export function createObstacle(ctx, x, y, obType) {
    const img = new Image();
    img.addEventListener("load", () => {
        ctx.drawImage(img, x, y-25, 50, 50);
    });
    img.src = obType.image;
}