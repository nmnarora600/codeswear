import React, { useState } from 'react';
import { Button, TextField, Typography } from '@mui/material';

const ImageUpload = () => {
  const [selectedFile, setSelectedFile] = useState(null);

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    setSelectedFile(file);
  };

  const handleUpload = () => {
    // Perform the upload logic here using the selectedFile
    // You can use libraries like axios or fetch to send the file to your server

    // For example, using FormData and fetch:
    const formData = new FormData();
    formData.append('image', selectedFile);

    fetch('/api/upload', {
      method: 'POST',
      body: formData,
    })
      .then((response) => response.json())
      .then((data) => {
      
        // Handle the response from the server
      })
      .catch((error) => {
        console.error('Error uploading file:', error);
        // Handle the error
      });
  };

  return (
    <div>
      <Typography variant="h6">Image Upload</Typography>
      <TextField
        type="file"
        label="Select Image"
        onChange={handleFileChange}
        InputLabelProps={{
          shrink: true,
        }}
      />
      <Button variant="contained" color="primary" onClick={handleUpload}>
        Upload
      </Button>
    </div>
  );
};

export default ImageUpload;