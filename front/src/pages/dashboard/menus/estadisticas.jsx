import DoughnutChart from '../../../assets/menus/graficos/doghnut.jsx';
import NumeroVentas from '../../../assets/menus/graficos/numerosVentas.jsx';
import { Card } from '@nextui-org/react';
import LineChart from '../../../assets/menus/graficos/LineChart.jsx';
import ClientesTotal from '../../../assets/menus/clientes.jsx';
export default function Estadisticas() {
    return (
        <div>
            {/* Aquí se mostrarán las estadísticas */}

            <div className='grid grid-cols-3 gap-2'>

            <Card>
                <DoughnutChart /> 
            </Card>
            <Card>
                <LineChart />  
            </Card>
            <Card>
                <NumeroVentas />  
            </Card>
            <Card>
                <ClientesTotal />  
            </Card>
            

            </div>
        </div>
    )
}
