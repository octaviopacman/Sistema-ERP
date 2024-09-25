import { Chart as ChartJS } from "chart.js/auto";
import React from "react";
import {Bar} from 'react-chartjs-2'

const nuevosClientes = [12,6,8,80,50,30,57,98,25,64,22,12];
const cantidadTotalClientes = nuevosClientes.map((nuevosClientes, index, arr) => arr.slice(0,index + 1).reduce((total,num)=> total +num,0))

const data = {
    labels: [
        'Enero', 'Febrero', 'Marzo', 'Abril',
        'Mayo', 'Junio', 'Julio', 'Agosto',
        'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'
    ],
    datasets: [
        {
            label: 'Nuevos Clientes',
            data: nuevosClientes,
            backgroundColor: 'rgba(75, 192, 192, 0.2)',
            borderColor: 'rgba(75, 192, 192, 1)',
            borderWidth: 1,
        },
        {label: 'Clientes Acumulados',
         data: cantidadTotalClientes,
         backgroundColor: 'rgba(255, 99, 132, 0.2)',
         borderColor: 'rgba(255, 99, 132, 1)',
         borderWidth: 1,
         },
    ]
}

const options = {
    responsive: true,
    plugins: {
        legend: {
            position: 'top'
        },
        title:{
            display: true,
            text: 'Clientes del mes'
        }
    },
    scales: {
        x:{
            stacked: true,
        },
        y: {
            stacked: true,
            beginAtZero: true,
            title: {
                display: true,
                text: 'Cantidad de Clientes'
            }
        }
    }
}
export default function ClientesTotal(){
    return<Bar data ={data} options ={options}/>
}