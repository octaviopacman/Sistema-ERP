import DoughnutChart from '../../../assets/menus/graficos/doghnut.jsx';
import BarChart from '../../../assets/menus/graficos/bar.jsx';
import { Card } from '@nextui-org/react';
export default function Estadisticas() {
    return (
        <div>
            {/* Aquí se mostrarán las estadísticas */}

            <div className='grid grid-cols-3 gap-2'>

            <Card>
                <DoughnutChart /> 
            </Card>
            <Card>
                <BarChart />  
            </Card>
            

            </div>
        </div>
    )
}
