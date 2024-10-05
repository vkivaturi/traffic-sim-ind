import { config } from "../config.js";

let vehicleId = 0;

export const vehicleTypes = [
    { name: 'Auto', weight: 3, speed: config.VehicleSpeed.SLOW, color: "yellow", image: "/images/rickshaw.png" },
    { name: 'Bus', weight: 1, speed: config.VehicleSpeed.SLOW, color: "red", image: "/images/bus.png" },
    { name: 'Car', weight: 6, speed: config.VehicleSpeed.NORMAL, color: "green", image: "/images/car.png" }
];

export default function createVehicle(ctx, _x, _y, _laneId) {
    const selectVehicle = getRandomElementByWeight(vehicleTypes);

    const vehicle = {
        x: _x,
        y: _y,
        id: vehicleId++,
        laneId: _laneId,
        radius: 15,
        maxSpeed: selectVehicle.speed,
        obstacleTimeout: 0,
        name: selectVehicle.name,
        draw() {
            const img = new Image();
            img.addEventListener("load", () => {
                ctx.drawImage(img, this.x, this.y-25, 40, 45);
            });
            img.src = selectVehicle.image;      
        }
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

