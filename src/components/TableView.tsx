import React from "react";
import {IDataShape} from "../App";

interface IProps {
    data: IDataShape[];
}

const TableView = ({data}: IProps) => (
    <div className="app">
        <div>
            <h3>Weather Data</h3>
            <table>
                <thead>
                <tr>
                    <th>Date</th>
                    <th>Precipitation</th>
                    <th>Temp Max</th>
                    <th>Temp Min</th>
                    <th>Weather</th>
                    <th>Wind</th>
                </tr>
                </thead>
                <tbody>
                {data.map((row, idx) => (
                    <tr
                        key={idx}
                    >
                        <td>{row.date}</td>
                        <td>{row.precipitation}</td>
                        <td>{row.temp_max}</td>
                        <td>{row.temp_min}</td>
                        <td>{row.weather}</td>
                        <td>{row.wind}</td>
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
    </div>
)
export default TableView;

