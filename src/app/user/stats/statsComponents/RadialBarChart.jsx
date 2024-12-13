import { Chart, RadialLinearScale, ArcElement, Tooltip, Legend } from 'chart.js';
import { PolarArea } from 'react-chartjs-2';
import ChartDataLabels from 'chartjs-plugin-datalabels';

Chart.register(ArcElement, RadialLinearScale, Tooltip, Legend, ChartDataLabels);

const RadialBarChart = ({avg, dataCall, call}) => {

    const getRandomColor = () => {
        const letters = '0123456789ABCDEF';
        let color = '#';
        for (let i = 0; i < 6; i++) {
            color += letters[Math.floor(Math.random() * 16)];
        }
        return color;
    };

    const data = {
        labels: ['Read', 'Average'], 
        datasets: [
            {
                label: `${call}`,
                data: [dataCall, avg],
                backgroundColor: [getRandomColor(), getRandomColor()],
                borderWidth: 0,
            }
        ]
    }

    const options = {
        responsive: true,
        maintainAspectRatio: false,
        scales: {
            r: {
                ticks: {
                    display: false, 
                },
                grid: {
                    color: 'rgba(255, 255, 255, 0.1)', 
                },
            },
        },
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
    }

    return (
        <div className='sm:h-[200px] sm:w-[200px] md:h-[320px] md:w-[320px] lg:w-[400px] lg:h-[400px] w-[200px] h-[250px]'>
            <PolarArea data={data} options={options} />
        </div>
    );
}

export default RadialBarChart;