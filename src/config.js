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
    //Simulation run time (in seconds)
    //SimRunTimeSecs : 1,
    //Traffic to be handled (vehicles per hour)
    //VehiclesPerHour: 10000,
    //Number of points to be created in the path
    NumPathPoints : 30,
    ObstacleType : Object.freeze({
        POT_HOLE : {image: "/images/pothole.png", timeout: 1000},
        BUS_STOP : {image: "/images/busstop.png", timeout: 5000},
        PEDESTRIAN_CROSSING : {image: "/images/pederstrian.png", speed: 0, timeout: 1000}
    })
}
