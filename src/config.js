//Config data used by different parts of the application

export const config = {
    //Vehicle speed indicates number of slots a vehicle will travel in each frame
    VehicleSpeed : Object.freeze({
        NORMAL: 3,
        SLOW: 2
    }),
    FramesPerSecond : 5,
    NumLanes : 3,
    //Simulation run time (in seconds)
    SimRunTimeSecs : 15,
    //Traffic to be handled (vehicles per hour)
    VehiclesPerHour: 10000,
    //Number of points to be created in the path
    NumPathPoints : 30,
    ObstacleType : Object.freeze({
        POT_HOLE : {image: "/images/warning.png"},
        BUS_STOP : {image: "/images/bus_stop.png"},
        PEDESTRIAN_CROSSING : {image: "/images/pederstrian.png"}
    })
}
