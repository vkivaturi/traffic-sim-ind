//Config data used by different parts of the application

export const config = {
    //Vehicle speed indicates number of slots a vehicle will travel in each frame
    VehicleSpeed : Object.freeze({
        NORMAL: 3,
        SLOW: 1
    }),
    FramesPerSecond : 4,
    NumLanes : 1,
    //Max number of simulation iterations
    NumIterations : 40,
    //Number of points to be created in the path
    NumPathPoints : 25,
    ObstacleType : Object.freeze({
        POT_HOLE : {image: "/images/warning.png"},
        BUS_STOP : {image: "/images/bus_stop.png"},
        PEDESTRIAN_CROSSING : {image: "/images/pederstrian.png"}
    }) 
}
