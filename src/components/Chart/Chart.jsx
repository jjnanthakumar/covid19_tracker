import { useState, useEffect } from "react";
import { fetchDailyData } from '../../api';
import { Line, Bar } from 'react-chartjs-2';
import styles from './Chart.module.css';
import CustomChart from 'react-google-charts';
const Chart = ({ data: { confirmed, recovered, deaths }, country, state }) => {
    const [dailyData, setDailyData] = useState([]);

    useEffect(() => {
        const fetchAPI = async () => {
            setDailyData(await fetchDailyData())
        }
        fetchAPI()
    }, [])
    const scatterChart = (
        <CustomChart
            width={'600px'}
            height={'400px'}

            chartType="Scatter"
            loader={<div>Loading Chart</div>}
            data={[
                ['Date', 'Confirmed', 'Deaths'],
                ...dailyData.map(({ date, confirmed, deaths }) => [date, confirmed, deaths]
                ),
            ]}
            options={{
                chart: {
                    title: "Covid-19",
                    subtitle: 'based on data',
                },
                series: {
                    0: { axis: 'hours studied' },
                    1: { axis: 'final grade' },
                },
                axes: {
                    y: {
                        'hours studied': { label: 'Populations' },
                        'final grade': { label: 'Date' },
                    },
                },
            }}
            // rootProps={{ 'data-testid': '4' }}
            legendToggle
        />
    )
    const lineChart = (
        dailyData.length ?
            (<Line
                data={{
                    labels: dailyData.map(({ date }) => date),
                    datasets: [{
                        data: dailyData.map(({ confirmed }) => confirmed),
                        label: 'Infected',
                        borderColor: '#3333ff',
                        fill: true,
                    }, {
                        data: dailyData.map(({ recovered }) => recovered),
                        label: 'Recovered',
                        borderColor: 'green',
                        backgroundColor: 'rgba(0,255,0,0.5)',
                        fill: true,
                    },
                    {
                        data: dailyData.map(({ deaths }) => deaths),
                        label: 'Deaths',
                        borderColor: 'red',
                        backgroundColor: 'rgba(255,0,0,0.5)',
                        fill: true,
                    },
                    ],
                }}
            />) : null

    );
    const barChart = (
        confirmed
            ? (
                <Bar
                    data={{
                        labels: ['Infected', 'Recovered', 'Deaths'],
                        datasets: [
                            {
                                label: 'People',
                                backgroundColor: ['rgba(0, 0, 255, 0.5)',
                                    'rgba(0, 255, 0, 0.5)',
                                    'rgba(255, 0, 0, 0.5)'],
                                data: [confirmed.value || confirmed, recovered.value || recovered, deaths.value || deaths]
                            }
                        ]
                    }}
                    options={{
                        legend: { display: false },
                        title: { display: true, text: `Current situation in ${state || country}` }
                    }}
                />
            ) : null
    )
    return (
        <div className={styles.container}>
            {/* {scatterChart} */}
            {country ? barChart : lineChart}
        </div>
    )
}

export default Chart