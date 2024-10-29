import { useMemo } from "react";
import { Line } from 'react-chartjs-2';
import { Chart, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';

Chart.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);


const LineChartYears = ({ yearData }) => {

    const data = useMemo(() => {
        const years = yearData.map(item => item.year);
        const minYear = Math.min(...years);
        const maxYear = Math.max(...years);

        const yearRange = Array.from({ length: maxYear - minYear + 2 }, (_, i) => minYear - 1 + i);

        const yearCounts = yearRange.map(year => {
            const yearEntry = yearData.find(item => item.year === year);
            return yearEntry ? parseInt(yearEntry.count, 10) : 0;
        });

        return {
            labels: yearRange,
            datasets: [
                {
                    label: 'Yearly Data Count',
                    data: yearCounts,
                    borderColor: '#DCE75C',
                    backgroundColor: 'rgba(75, 192, 192, 0.2)',
                    fill: true,
                    tension: 0.4,
                },
            ],
        }
    }, [yearData]);
    const options = {
        responsive: true,
        plugins: {
            legend: {
                display: true,
                position: 'top',
            },
            title: {
                display: true,
                text: 'Yearly Data Chart',
            },
            tooltip: {
                callbacks: {
                    label: (context) => `${context.raw}`,
                },
            },
        },
        scales: {
            x: {
                title: {
                    display: true,
                    text: 'Years',
                },
                beginAtZero: false,
            },
            y: {
                title: {
                    display: true,
                    text: 'Variable Count',
                },
                beginAtZero: true,
            },
        },
    };

    return <Line data={data} options={options} />;
}

export default LineChartYears;