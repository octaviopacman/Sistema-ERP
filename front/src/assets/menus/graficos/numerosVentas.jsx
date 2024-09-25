import React from "react";
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS } from "chart.js/auto";
import { Card } from '@nextui-org/react';

const ventasAnuales = [120, 100, 200, 250, 80, 120, 140, 450, 350, 300, 100, 150];

const data = {
    labels: [
        'Enero', 'Febrero', 'Marzo',
        'Abril', 'Mayo', 'Junio',
        'Julio', 'Agosto', 'Septiembre',
        'Octubre', 'Noviembre', 'Diciembre',
    ],
    datasets: [
        {
            label: 'Numeros de ventas',
            data: ventasAnuales,
            borderColor: '(255,165,0, 0.2)',
            tension: 0.1,

        }
    ]

}
const options = {
    responsive: true,
    maintainAspectRatio: true,
    plugins: {
        legend: {
            position: 'top',

        },
        title: {
            display: true,
            text: 'Numeros de ventas por mes'
        }
    },


    scales: {
        y: {
            stacked: true,
            beginAtZero: true,
            title: {
                display: true,
                text: 'Ventas',
            }
        },
        x: {
            stacked: true,
            beginAtZero: true,
            title: {
                display: true,
                text: 'Meses',
            }
        }
    }
}
export default function NumeroVentas() {
    return (
        <>
            <div>
                <Card>
                    <p>Numeros de ventas por mes</p>
                    <Line data={data} options={options} />
                </Card>
            </div>
        </>
    )
}