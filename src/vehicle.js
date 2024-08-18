export default function createVehicle(ctx, _x, _y, color) {
    console.log("Create vehicle ");
    const vehicle = {
        x: _x,
        y: _y,
        vx: 0,
        vy: -4,
        radius: 20,
        draw() {
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2, true);
            ctx.closePath();
            ctx.fillStyle = color;
            ctx.fill();
        },
    };

    return vehicle;
}