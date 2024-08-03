import React from 'react';
import {Bar} from 'react-chartjs-2';
import {Chart as ChartJS } from 'chart.js/auto';

const data = {
    labels: ['Enero','Febrero', ' Marzo', 'Abril',
             'Mayo', 'Junio', 'Julio', 'Agosto',
             'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'],
             datasets: [
                {
                    labels: 'Ingresos',
                    data: [15, 25, 60, 30,
                           5, 20, 45, 40, 
                           70, 60, 50, 100],
                    backgroundColor: [
                        'rgba(255, 0, 0, 0.3',
                        'rgba(0, 255, 0, 0.3)',
                        'rgba(0, 0, 255, 0.3)',
                        'rgba(255, 255, 0, 0.3)',
                        'rgba(255, 0, 255, 0.3)',
                        'rgba(0, 255, 255, 0.3)',
                        'rgba(255, 165, 0, 0.3)',
                        'rgba(0, 191, 255, 0.3)',
                        'rgba(139, 0, 139, 0.3)',
                        'rgba(255, 192, 203, 0.3)',
                        'rgba(255, 127, 8, 0.3)',
                        'rgba(128, 0, 0, 0.3)',
                    ],
                    borderColor: [
                        'rgba(255, 0, 0, 1',
                        'rgba(0, 255, 0, 1)',
                        'rgba(0, 0, 255, 1)',
                        'rgba(255, 255, 0, 1)',
                        'rgba(255, 0, 255, 1)',
                        'rgba(0, 255, 255, 1)',
                        'rgba(255, 165, 0, 1)',
                        'rgba(0, 191, 255, 1)',
                        'rgba(139, 0, 139, 1)',
                        'rgba(255, 192, 203, 1)',
                        'rgba(255, 127, 8, 1)',
                        'rgba(128, 0, 0, 1)',
                    ],
                    borderWidth: 1,
                },
             ],
};

const options = {
    responsive: true,
    plugins: {
        legend: {
            position: 'top',
        },
        title: {
            display: true,
            text: 'Estast'
        },
    },
};

function BarChart() {
return <Bar data={data} options={options}/>;
}
export default BarChart;