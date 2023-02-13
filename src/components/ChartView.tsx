import React from "react";
import {IDataShape} from "../App";
import {Legend, Line, LineChart, Tooltip, XAxis, YAxis} from "recharts";

interface IProps {
    data: IDataShape[];
}

const ChartView = ({data}: IProps) => {
    return (
        <div className="app">
            <div>
                <h3>Weather Data</h3>
                <LineChart
                    width={1000}
                    height={600}
                    data={data}
                    margin={{
                        top: 5,
                        right: 30,
                        left: 20,
                        bottom: 5,
                    }}
                >
                    <XAxis dataKey="date"/>
                    <YAxis/>
                    <Tooltip/>
                    <Legend/>
                    <Line type="monotone" dataKey="precipitation" stroke="#8884d8" activeDot={{r: 8}}/>
                </LineChart>
            </div>
        </div>
    );
}
export default ChartView;
