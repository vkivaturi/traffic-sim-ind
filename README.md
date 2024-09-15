
---

# Traffic Simulation using JavaScript and HTML5 Canvas

## Overview

This project simulates traffic on a road network using JavaScript and HTML5 Canvas. The simulation incorporates various real-world elements such as vehicles, potholes, bus stops, lane closures, and traffic flow rates (vehicles per hour). This allows for realistic modeling of traffic behavior on different lanes under varying road conditions.

## Features

- **Vehicles per Hour**: Control the number of vehicles entering the road network, adjusting traffic density dynamically.
- **Potholes**: Potholes are randomly generated or manually added to lanes, affecting vehicle speed and lane choices.
- **Bus Stops**: Vehicles may stop at bus stops for a certain duration, simulating public transport delays.
- **Lane Closures**: Simulate roadwork or accidents that result in the closure of one or more lanes, forcing vehicles to reroute or change lanes.
- **Lane Changing for overtaking**: Simulate change lanes and overtaking when vehicles ahead are going slow.

## Technologies Used

- **JavaScript**: The core simulation logic is written in JavaScript.
- **HTML5 Canvas**: Used for rendering the road network and vehicles.
- **CSS**: Basic styling for the simulation interface (if applicable).

## Getting Started

### Prerequisites

To run this project, all you need is a modern web browser (Chrome, Firefox, Safari, etc.) that supports HTML5 and JavaScript.

### Installation

1. Clone the repository or download the project files.
   ```bash
   git clone https://github.com/vkivaturi/traffic-sim-ind
   ```
   
2. npm install
3. npm run dev
4. Open http://localhost:5173/ in your web browser.

### Running the Simulation

Once the project is set up and running in your browser, you can interact with the simulation through the user interface or tweak the code to adjust simulation parameters:

1. **Vehicles per Hour**: Modify the number of vehicles generated per hour (through UI controls or modifying code).
2. **Potholes**: Add potholes to lanes that will slow down or divert vehicles.
3. **Bus Stops**: Simulate delays at bus stops, impacting the overall traffic flow.
4. **Lane Closures**: Dynamically close lanes and observe how vehicles reroute or get delayed.

 ### Configuration

You can configure various aspects of the simulation by modifying the variables inside `app.js`:

- **Vehicles per Hour**: Adjust the frequency of new vehicles entering the simulation.
- **Pothole Locations**: Set positions and sizes for potholes.
- **Bus Stop Locations**: Define where bus stops are located on the road.
- **Lane Closures**: Set which lanes are closed and for how long.

## Customization

To customize the simulation for different traffic patterns or road conditions:

- **Increase/Decrease Traffic Density**: Modify how frequently new vehicles are created.
- **Add/Remove Road Elements**: Easily add more potholes, bus stops, or modify lane closure logic.
- **Change Vehicle Behavior**: Adjust how vehicles react to obstacles like potholes and lane closures.

## Future Enhancements

- **Dynamic Weather Conditions**: Introduce weather elements (rain, fog, etc.) that affect visibility and vehicle speeds.
- **Collision Detection**: Add realistic collisions between vehicles during heavy traffic or lane changes.
- **More Vehicle Types**: Add different types of vehicles (trucks, buses, etc.) with varying speeds and behavior.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---