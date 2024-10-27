import React from 'react';
import {Doughnut} from 'react-chartjs-2';
import {Chart as ChartJS} from 'chart.js/auto';

const data = {
    labels: [ 'De Navidad', 'Timberos', 'De grasa'],
    datasets: [
        {
            label: 'GORDOS MUNDIALES',
            data: [300, 100, 250],
            backgroundColor: [
                'rgba(255, 0, 0, 0.3)',
                'rgba(0, 255, 0, 0.3)',
                'rgba(0, 0, 255, 0.3)',
            ],
            borderColor: [
                'rgba(255, 0, 0, 1)',
                'rgba(0, 255, 0, 1)',
                'rgba(0, 0, 255, 1)',
            ],
            borderWidth: 1,
        },
    ],
};

const options = {
    responsive: true,
    plugins : {
        legend: {
            position: 'top',
        },
        title: {
            display: true,
            text: 'Gordos'
        },
    },
};

function DoughnutChart() {
    return <Doughnut data = {data} options = {options}/>
}
export default DoughnutChart;