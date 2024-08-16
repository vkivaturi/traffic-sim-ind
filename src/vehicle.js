export default function createVehicle(ctx, _x, _y) {
    const vehicle = {
        x: _x,
        y: _y,
        vx: 0,
        vy: -5,
        radius: 5,
        color: "blue",
        draw() {
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2, true);
            ctx.closePath();
            ctx.fillStyle = this.color;
            ctx.fill();
        },
    };

    return vehicle;
}