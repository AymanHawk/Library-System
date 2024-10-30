
import { Bubble } from 'react-chartjs-2';
import { Chart, LinearScale, PointElement, Tooltip, Legend } from 'chart.js';
import { useMemo } from 'react';
import ChartDataLabels from 'chartjs-plugin-datalabels'


Chart.register(LinearScale, PointElement, Tooltip, Legend, ChartDataLabels);

const BubbleChart = ({ themeData }) => {
    const getRandomColor = () => {
        const letters = '0123456789ABCDEF';
        let color = '#';
        for (let i = 0; i < 6; i++) {
            color += letters[Math.floor(Math.random() * 16)];
        }
        return color;
    };

    const maxRadius = 40;
    const canvasSize = 160;
    const maxCount = Math.max(...themeData.map(item => item.count));

    const generateBubbleData = (themeData) => {
        
        const columns = Math.ceil(Math.sqrt(themeData.length));
        const rowSpacing = canvasSize / columns;
        const colSpacing = canvasSize / columns;
        return themeData.map((item, index) => {
            const row = Math.floor(index / columns);
            const col = index % columns;

            return {
                x: col * colSpacing + colSpacing / 2,
                y: row * rowSpacing + rowSpacing / 2,
                r: Math.min(maxRadius, (item.count / maxCount) * maxRadius),
                theme: item.theme,
            };
        });
    }

    const data = useMemo(() => ({
        datasets: generateBubbleData(themeData).map(item => ({
            label: `${item.theme.slice(0,1).toUpperCase()}${item.theme.slice(1,item.theme.length)}`,
            data: [
                {
                    x: item.x,
                    y:item.y,
                    r:item.r,
                    theme: `${item.theme.slice(0,1).toUpperCase()}${item.theme.slice(1,item.theme.length)}`,
                }
            ],
            backgroundColor: getRandomColor(),
        })),
    }), [themeData]);

    const options = {
        responsive: true,
        maintainAspectRatio: false,
        scales: {
            x: {
                min: 0,
                max: canvasSize,
                grid: {
                    display: false,
                },
                ticks: {
                    display: false,
                },
            },
            y: {
                min: 0,
                max: canvasSize,
                grid: {
                    display: false,
                },
                ticks: {
                    display: false,
                }
            }
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
                    label: (context) => `${context.raw.theme}: ${Math.round(context.raw.r / maxRadius * maxCount)}`, // Display theme name and count in tooltip
                },
                backgroundColor: 'rgba(0, 0, 0, 1)',
                titleColor: 'white',
                bodyColor: 'white',
            },
            datalabels: {
                color: 'white',
                align: 'center',
                ancor: 'center',
                font: {
                    weight: 'bold',
                    size: 10,
                },
                formatter: (value) => {
                    return value.r > 25 ?  `${value.theme.slice(0,1).toUpperCase()}${value.theme.slice(1,value.theme.length)}` : '';
                },
            }
        },
    };

    return (
        <div className='md:w-[600px] mx-auto md:h-[300px] sm:w-[480px] h-[350px] w-[340px] xs:w-[250px]'>
            <Bubble data={data} options={options} />
        </div>
    )
};


export default BubbleChart;