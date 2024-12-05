import { Line } from 'react-chartjs-2';
import { Chart, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';
import { useMemo } from 'react';

Chart.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

const LineChart = ({ monthData }) => {
    const data = useMemo(() => {
        const months = Array.from({ length: 12 }, (_, i) => ({ month: i + 1, count: 0 }));

        monthData.forEach(item => {
            const monthIndex = item.month - 1;
            months[monthIndex].count = parseInt(item.count, 10);
        })

        return {
            labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
            datasets: [
                {
                    label: 'Data Count',
                    data: months.map(item => item.count),
                    borderColor: '#DCE75C',
                    backgroundColor: 'rgba(75, 192, 192, 0.2)',
                    fill: true,
                    tension: 0.4,
                },
            ],
        };
    }, [monthData]);

    const options = {
        responsive: true,
        plugins: {
            legend: {
                display: true,
                position: 'top',
            },
            title: {
                display: true,
                text: 'Monthly Data',
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
                    text: 'Months',
                },
            },
            y: {
                title: {
                    display: true,
                    text: 'Count',
                },
                beginAtZero: true,
            },
        },
    }

    return (
        <div className='md:w-[600px] md:h-[300px] sm:w-[480px] w-[340px] xs:w-[300px]'>
            <Line data={data} options={options} />
        </div>

    )
}

export default LineChart;