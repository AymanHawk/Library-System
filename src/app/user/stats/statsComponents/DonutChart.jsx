import { Doughnut } from 'react-chartjs-2';
import { Chart, ArcElement, Tooltip, Legend } from 'chart.js';
import { useMemo } from 'react';
import ChartDataLabels from 'chartjs-plugin-datalabels'


Chart.register(ArcElement, Tooltip, Legend, ChartDataLabels);

const DonutChart = ({paceData}) => {
    const getRandomColor = () => {
        const letters = '0123456789ABCDEF';
        let color = '#';
        for (let i = 0; i < 6; i++) {
            color += letters[Math.floor(Math.random() * 16)];
        }
        return color;
    };

    const data = useMemo(() => {
        const labels = paceData.map(item => `${item.pace.charAt(0).toUpperCase()}${item.pace.slice(1)}`);
        const counts = paceData.map(item => item.count);
        return {
            labels: labels,
            datasets: [
                {
                    label: 'Distribution Count',
                    data: counts,
                    backgroundColor: labels.map(() => getRandomColor()), // Random colors for each segment
                    borderWidth: 0,
                },
            ],
        };
    }, [paceData]);

    const options = {
        responsive: true,
        plugins: {
            legend: {
                position: 'top',
                labels: {
                    color: 'white', 
                },
            },
            tooltip: {
                callbacks: {
                    label: (context) => `${context.label}: ${context.raw}`, 
                },
                backgroundColor: 'rgba(0, 0, 0, 0.8)', 
                titleColor: 'white', 
                bodyColor: 'white', 
            },
            datalabels: {
                color: 'white',
                formatter: (value) => {
                    return value;
                },
            },
        },
        cutout: '70%', 
    };

    return (
        <div className='sm:h-[250px] sm:w-[250px] md:h-[400px] md:w-[400px] w-[250px] h-[250px]'>
            <Doughnut data={data} options={options} />
        </div>
    );
}

export default DonutChart;