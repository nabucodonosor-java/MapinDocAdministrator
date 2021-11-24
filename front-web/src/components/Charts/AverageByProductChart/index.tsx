import { useEffect, useState } from 'react';
import Chart from 'react-apexcharts';
import { PrescriptionTotal } from 'types/prescription';
import { makePrivateRequest } from 'utils/request';
import Computers from 'assets/images/computers.jpeg';
import './styles.scss';

type ChartData = {
    labels: string[];
    series: number[];
}

const AverageByProductChart = () => {

    const [chartData, setChartData] = useState<ChartData>({ labels: [], series: [] });

    useEffect(() => {
        makePrivateRequest({ url: 'prescriptions/averageByProductPro' })
            .then(response => {
                const data = response.data as PrescriptionTotal[];
                const myLabels = data.map(x => x.healthPro);
                const mySeries = data.map(x => x.totalServicos);

                setChartData({ labels: myLabels, series: mySeries });
            });
    }, []);

    const options = {
        legend: {
            show: true 
        }
    }
    
    return (
        <>
        <div className="donut-chart-warning">
            <p>Disponível apenas para telas a partir de 1024px</p>
            <img src={Computers} alt="Computers" />
        </div>
        <div className="donut-chart-1200">
            <h1>Média Ponderada de Receitas</h1>
            <Chart
            options={{ ...options, labels: chartData.labels }}
            series={chartData.series}
            type="donut"
            height="300"
            width="900"
            />
        </div>
        </>
    );
}

export default AverageByProductChart;