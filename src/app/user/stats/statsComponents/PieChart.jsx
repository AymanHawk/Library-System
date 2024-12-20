import { Pie } from 'react-chartjs-2';
import { Chart, ArcElement, Tooltip, Legend, elements } from 'chart.js';
import { useMemo } from 'react';
import ChartDataLabels from 'chartjs-plugin-datalabels'

Chart.register(ArcElement, Tooltip, Legend, ChartDataLabels);

const PieChart = ({ genreData }) => {

    const getRandomColor = () => {
        const letters = '0123456789ABCDEF';
        let color = '#';
        for (let i = 0; i < 6; i++) {
            color += letters[Math.floor(Math.random() * 16)];
        }
        return color;
    };

    const data = useMemo(() => {
        const labels = genreData.map(item => `${item.genre.slice(0,1).toUpperCase()}${item.genre.slice(1,item.genre.length)}`);
        const counts = genreData.map(item => item.count);
        return {
            labels: labels,
            datasets: [
                {
                    label: 'distribution count',
                    data: counts,
                    backgroundColor: labels.map(() => getRandomColor()),
                    borderWidth: 0,
                },
            ],
        };
    }, [genreData]);

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
                    label: (context) => `${context.raw}`,
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
        <div className='sm:h-[250px] sm:w-[250px] md:h-[400px] md:w-[400px] w-[250px] h-[250px]'>
            <Pie data={data} options={options}/>
        </div>
    );
};

export default PieChart;