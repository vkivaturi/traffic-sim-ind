//Vehicle speed indicates number of slots a vehicle will travel in each frame
const VehicleSpeed = Object.freeze({
    NORMAL: 3,
    SLOW: 3
});

export const vehicleTypes = [
    { name: 'Auto', weight: 4, speed: VehicleSpeed.NORMAL, color: "yellow" },
    { name: 'Bus', weight: 2, speed: VehicleSpeed.SLOW, color: "red" },
    { name: 'Car', weight: 6, speed: VehicleSpeed.NORMAL, color: "green" }
];

export default function createVehicle(ctx, _x, _y) {
    const selectVehicle = getRandomElementByWeight(vehicleTypes);

    const vehicle = {
        x: _x,
        y: _y,
        radius: 15,
        speed: selectVehicle.speed,
        draw() {
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2, true);
            ctx.closePath();
            ctx.fillStyle = selectVehicle.color;
            ctx.fill();
        },
    };
    return vehicle;
}

//Fetch a random element based on weight. Helps distribute vehicles in traffic
export function getRandomElementByWeight(arr) {
    // Calculate the total weight
    const totalWeight = arr.reduce((sum, item) => sum + item.weight, 0);

    // Generate a random number between 0 and the total weight
    const random = Math.random() * totalWeight;

    // Find the item that corresponds to the random number
    let cumulativeWeight = 0;
    for (let i = 0; i < arr.length; i++) {
        cumulativeWeight += arr[i].weight;
        if (random < cumulativeWeight) {
            return arr[i];
        }
    }
}

