//Config data used by different parts of the application

export const config = {
    //Vehicle speed indicates number of slots a vehicle will travel in each frame
    VehicleSpeed : Object.freeze({
        NORMAL: 1,
        SLOW: 1,
        STOP: 0
    }),
    FramesPerSecond : 5,
    NumLanes : 3,
    NumPathPoints : 40,
    ObstacleType : Object.freeze({
        POT_HOLE : {image: "/images/pothole.png", timeout: 1000},
        BUS_STOP : {image: "/images/bus-stop.png", timeout: 5000},
        PEDESTRIAN_CROSSING : {image: "/images/pederstrian.png", speed: 0, timeout: 1000}
    })
}
