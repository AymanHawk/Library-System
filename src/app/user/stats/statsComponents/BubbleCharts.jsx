
import { Bubble } from 'react-chartjs-2';
import { Chart, LinearScale, PointElement, Tooltip, Legend } from 'chart.js';
import { useMemo } from 'react';


Chart.register(LinearScale, PointElement, Tooltip, Legend);

const BubbleChart = ({ themeData }) => {
    const getRandomColor = () => {
        const letters = '0123456789ABCDEF';
        let color = '#';
        for (let i = 0; i < 6; i++) {
            color += letters[Math.floor(Math.random() * 16)];
        }
        return color;
    };

    const generateBubbleData = (themeData) => {
        const bubbles = [];
        themeData.forEach(item => {
            let x, y, overlapping;
            do {
                overlapping = false,
                x = Math.random()*100;
                y = Math.random()*100;
                for(const bubble of bubbles) {
                    const dx = bubble.x - x;
                    const dy = bubble.y - y;
                    const distance = Math.sqrt(dx * dx + dy * dy);
                    if(distance < (bubble.r + item.count *5)) {
                        overlapping = true;
                        break;
                    }
                }
            } while (overlapping);

            bubbles.push({
                x,
                y,
                r: item.count*5,
                theme: item.theme,
            })
        })
        return bubbles;
    }

    const data = useMemo(() => ({
        datasets: [
            {
                label: 'Themes',
                // data: themeData.map((item) => ({
                //     x: Math.random() * 100,
                //     y: Math.random() * 100,
                //     r: item.count * 5,
                //     theme: item.theme,
                // })),
                data: generateBubbleData(themeData),
                backgroundColor: themeData.map(() => getRandomColor()),
            },
        ],
    }), [themeData]);

    const options = {
        responsive: true,
        scales: {
            x: {
                min: 0,
                max: 100,
                grid: {
                    display: false,
                },
                ticks: {
                    display: false,
                },
            },
            y: {
                min: 0,
                max: 100,
                grid: {
                    display: false,
                },
                ticks: {
                    display: false,
                }
            }
        },
        plugins: {
            tooltip: {
                callbacks: {
                    label: (context) => `${context.raw.theme}: ${context.raw.r / 5}`, // Display theme name and count in tooltip
                },
            },
        },
    };

    return (
        <div style={{ width: "600px", height: "400px" }}>
            <Bubble data={data} options={options} />
        </div>
    )
};


export default BubbleChart;