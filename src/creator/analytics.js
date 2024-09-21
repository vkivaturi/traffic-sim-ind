import { GlobalMemberStore } from "/src/data/system.js";

let vehicleChart;
let timeLapseSecs = 0;
export const Analytics = {
    createAnalytics: function () {
        const ctx = document.getElementById('vehicleLineChart').getContext('2d');

        // Data for the chart
        const data = {
            labels: [],
            datasets: [{
                label: 'Vehicles completing simulation over time',
                data: [],
                borderColor: 'rgba(75, 192, 192, 1)', // Line color
                backgroundColor: 'rgba(75, 192, 192, 0.2)', // Fill color under the line
                borderWidth: 2,
                tension: 0.4 // Curve of the line
            }]
        };

        // Configuration options for the chart
        const config = {
            type: 'line',
            data: data,
            options: {
                responsive: true,
                scales: {
                    y: {
                        beginAtZero: true // Start the y-axis at zero
                    }
                },
                plugins: {
                    legend: {
                        display: true, // Display the dataset label
                        position: 'top'
                    }
                }
            }
        };

        // Initialize and render the chart
        vehicleChart = new Chart(ctx, config);
    },
    updateAnalytics: function () {
        //Calculate the new time lapse for this data point. Graph is at seconds on time axes.
        //Hence push a new data point only if the second changes. Not for every few milliseconds updates 
        let newTimeLapseSecs = Math.floor((Date.now() - GlobalMemberStore.getMember("simStartTimeMillis").member.value) / 1000);
        if (newTimeLapseSecs != timeLapseSecs) {
            vehicleChart.data.labels.push(timeLapseSecs);
            vehicleChart.data.datasets[0].data.push(GlobalMemberStore.getMember("vehicleCounter").member.value);
            vehicleChart.update();
            timeLapseSecs = newTimeLapseSecs;
        }
    },
    resetAnalytics: function () {
        //Reset all data in the graph
        vehicleChart.data.labels = [];
        vehicleChart.data.datasets[0].data = [];
        vehicleChart.update();
        timeLapseSecs = 0;
    }
};


