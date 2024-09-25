import React from 'react';
import {Line} from 'react-chartjs-2';
import {Chart as ChartJS } from 'chart.js/auto';

const ingresos = [15, 25, 60, 30,
    5, 20, 45, 40, 
    70, 60, 50, 100];
const gastos = [10,25, 30,10, 2, 25, 15,10,20,60,30,70];
const gananciasNetas = ingresos.map((ingresos, index) => ingresos - gastos[index])
const data = {
    labels: ['Enero','Febrero', ' Marzo', 'Abril',
             'Mayo', 'Junio', 'Julio', 'Agosto',
             'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'],
             datasets: [
                {
                    label: 'Ingresos',
                    data: ingresos,
                    fill: false,
                    borderColor: 'rgba( 0, 255, 0, 1)',
                    tension: 0.1,
                    
                },
                {
                    label: 'Gastos',
                    data: gastos,
                    fill: false,
                    borderColor: 'rgba(255, 0, 0, 1)',
                    tension: 0.1,
                },
                {
                    label: 'Ganancias Netas',
                    data: gananciasNetas,
                    fill:  false,
                    borderColor: 'rgba(0, 0, 255, 1)',
                    tension: 0.1,
                }
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
            text: 'Ingresos, Costos y Ganancia del año'
        },
    },
};

function LineChart() {
return <Line data={data} options={options}/>;
}
export default LineChart;