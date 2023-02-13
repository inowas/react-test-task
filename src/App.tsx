import React, {useEffect, useState} from 'react';
import './App.css';
import FileUploader from "./components/FileUploader";
import Papa from "papaparse";
import TableView from "./components/TableView";

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
    const [data, setData] = useState<IDataShape[]>([]);
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

    if (data.length > 0) {
        return (
            <TableView data={data}/>
        );
    }

    return (
        <div className="app">
            <FileUploader onFileSelect={(file) => setSelectedFile(file)}/>
        </div>
    );
}

export default App;
