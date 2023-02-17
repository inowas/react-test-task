import React, { useEffect, useMemo, useState} from 'react';
import './App.css';
import FileUploader from "./components/FileUploader";
import Papa from "papaparse";
import TableView from "./components/TableView";
import ChartView from './components/ChartView';
const dayjs = require('dayjs')

interface IRawDataShape {
    date: string;
    precipitation: string;
    temp_max: string;
    temp_min: string;
    weather: string;
    wind: string;
}

export interface IDataShape {
    date: string;
    precipitation: number;
    temp_max: number;
    temp_min: number;
    weather: string;
    wind: number;
}

function App() {
    const [selectedFile, setSelectedFile] = useState<File | null>(null);
    const [viewType, setViewType] = useState<'table' | 'chart'>('table')
    const [data, setData] = useState<IDataShape[]>([]);
    const [sortBy, setSortBy] = useState<'daily' | 'weekly' | 'monthly'>('daily')
    useEffect(() => {
        if (!selectedFile) {
            return;
        }

        Papa.parse(selectedFile, {
            header: true,
            complete: (results) => {
                const rawData = results.data as IRawDataShape[];
                setData(rawData.map((row: IRawDataShape) => ({
                    date: row.date as string,
                    precipitation: Number(row.precipitation),
                    temp_max: Number(row.temp_max),
                    temp_min: Number(row.temp_min),
                    weather: row.weather as string,
                    wind: Number(row.wind)
                })))
            }
        });

    }, [selectedFile]);


    function isLastDay(date: string) {
        let d = new Date(date)
        let test = new Date(d.getTime())
        let month = test.getMonth();
        test.setDate(test.getDate() + 1);
        return test.getMonth() !== month;
    }


    const sortedData = useMemo(() => {

        if (sortBy === 'daily') {
            return data
        } else {
            let total_days = 0
            let week_day = 0
            let pr_sum = 0
            let temp_max = 0
            let temp_min = 0
            let wind_sum = 0
            let arr: IDataShape[] = []
            let weather = {
                fog: 0,
                rain: 0,
                snow: 0,
                drizzle: 0,
                sun: 0,
            }

            if (sortBy === 'weekly') {
                for (let i = 0; i < data.length; i++) {
                    total_days += 1
                    week_day = Number(dayjs(data[i].date).format('d'))
                    pr_sum += data[i].precipitation
                    temp_max += data[i].temp_max
                    temp_min += data[i].temp_min
                    wind_sum += data[i].wind
                    // @ts-ignore
                    weather[data[i].weather] += 1

                    if (week_day === 0) {
                        // @ts-ignore
                        // @ts-ignore
                        // @ts-ignore
                        // @ts-ignore
                        // @ts-ignore
                        arr.push({
                            date: data[i].date,
                            precipitation: Number((pr_sum / total_days).toFixed(2)),
                            temp_max: Number((temp_max / total_days).toFixed(2)),
                            temp_min: Number((temp_min / total_days).toFixed(2)),
                            wind: Number((wind_sum / total_days).toFixed(2)),
                            // @ts-ignore
                            weather:  Object.keys(weather).reduce((a, b) => (weather[a] > weather[b] ? a : b)),
                        });
                        total_days = 0;
                        pr_sum = 0.0;
                        temp_max = 0.0;
                        temp_min = 0.0;
                        wind_sum = 0.0;
                        weather.rain = 0;
                        weather.snow = 0;
                        weather.drizzle = 0;
                        weather.sun = 0;
                        weather.fog = 0;
                    }
                }
            } else {
                for (let i = 0; i < data.length; i++) {
                    total_days += 1
                    week_day = Number(dayjs(data[i].date).format('d'))
                    pr_sum += data[i].precipitation
                    temp_max += data[i].temp_max
                    temp_min += data[i].temp_min
                    wind_sum += data[i].wind
                    // @ts-ignore
                    weather[data[i].weather] += 1

                    if (isLastDay(data[i].date)) {
                        arr.push({
                            date: data[i].date,
                            precipitation: Number((pr_sum / total_days).toFixed(2)),
                            temp_max: Number((temp_max / total_days).toFixed(2)),
                            temp_min: Number((temp_min / total_days).toFixed(2)),
                            wind: Number((wind_sum / total_days).toFixed(2)),
                            // @ts-ignore
                            weather:  Object.keys(weather).reduce((a, b) => (weather[a] > weather[b] ? a : b)),
                        });
                        total_days = 0;
                        pr_sum = 0.0;
                        temp_max = 0.0;
                        temp_min = 0.0;
                        wind_sum = 0.0;
                        weather.rain = 0;
                        weather.snow = 0;
                        weather.drizzle = 0;
                        weather.sun = 0;
                        weather.fog = 0;
                    }
                }
            }

            return arr
        }
    }, [data, sortBy]);


    if (data.length > 0) {
        return (
            <>
                <nav className="navbar">
                    <ul>
                        <li>
                            <button onClick={() => setData([])}>
                                Submit Data
                            </button>
                        </li>
                        <li>
                            <button onClick={() => setViewType('table')}>
                                Table View
                            </button>
                        </li>
                        <li>
                            <button onClick={() => setViewType('chart')}>
                                Chart View
                            </button>
                        </li>
                    </ul>
                </nav>

                <div className='dropdown'>
                    <select
                        name="resolution"
                        value={sortBy}
                        onChange={(e) => setSortBy(e.target.value as 'daily' | 'weekly' | 'monthly')}
                    >
                        <option value="daily">Daily</option>
                        <option value="weekly">Weekly</option>
                        <option value="monthly">Monthly</option>
                    </select>
                </div>

                { viewType === 'table' && <TableView data={sortedData}/> }
                { viewType === 'chart' && <ChartView data={sortedData}/> }
            </>
        );
    }

    return (
        <div className="app">
            <FileUploader onFileSelect={(file) => setSelectedFile(file)}/>
        </div>
    );
}

export default App;
