import React, { useState } from 'react'
import axios from "axios";
import { FileUploader } from "react-drag-drop-files";

const AddProductForm: React.FC = () => {
    const [file, setFile] = useState(null);
    const fileTypes: string[] = ["JPG", "PNG", "GIF"];
    const client = axios.create({
        baseURL: "https://localhost:7156/" 
      });

    const handleChange = (file: any) => {
    const formData = new FormData();
    formData.append("imageFile", file);
    client.post('api/File/upload', formData, {headers: {
        'Content-Type': 'multipart/form-data'
      }}).then((res) => {
        console.log(res)
        }).catch(err => console.log(err));
    };
    console.log(file)

  const fetchContent = async () => {
    client.get('api/Product').then((response) => {
        console.log(response.data);
     }).catch(err => console.log(err));
  }
    return (
        <div>
            <h1>Welcome to the product page</h1>
            <FileUploader handleChange={handleChange} name="file" types={fileTypes} />
            <button onClick={() => fetchContent()}>Click me to fetch</button>
        </div>
    )
}

export default AddProductForm;