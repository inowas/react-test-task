import React, {ChangeEvent} from 'react'

interface IProps {
    onFileSelect: (file: File) => void;
}

const FileUploader = ({onFileSelect}: IProps) => {

    const handleFileInput = (e: ChangeEvent<HTMLInputElement>) => {
        if (!e || !e.target || !e.target.files || !e.target.files[0]) {
            return;
        }
        const file = e.target.files[0];
        if (file.name.endsWith('.csv')) {
            return onFileSelect(file);
        }
    }

    return (
        <div className="app">
            <h4 className="custom-file-upload">
                <i className="fa fa-cloud-upload"/>
                Upload File
            </h4>
            <input type="file" onChange={handleFileInput}/>
        </div>
    )
}

export default FileUploader;
