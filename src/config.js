//Config data used by different parts of the application

export const config = {
    //Vehicle speed indicates amount of time a vehicle will wait before moving to next slot
    VehicleSpeed : Object.freeze({
        NORMAL: 1,
        SLOW: 1
    }),
    FramesPerSecond : 8,
    NumLanes : 3,
    NumPathPoints : 30,
    ObstacleType : Object.freeze({
        POT_HOLE : {image: "/images/pothole.png", timeout: 1000},
        BUS_STOP : {image: "/images/bus-stop.png", timeout: 5000},
        CAR_BREAK : {image: "/images/car-break.png", timeout: 5000},
        TRAFFIC_LIGHTS : {image: "/images/traffic-light-off.png", timeout: 0}
    })
}
