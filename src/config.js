//Config data used by different parts of the application

export const config = {
    //Vehicle speed indicates number of slots a vehicle will travel in each frame
    VehicleSpeed : Object.freeze({
        NORMAL: 2,
        SLOW: 2
    }),
    FramesPerSecond : 4,
    NumLanes : 3,
    //Max number of simulation iterations
    NumIterations : 30,
    //Number of points to be created in the path
    NumPathPoints : 20 
}
