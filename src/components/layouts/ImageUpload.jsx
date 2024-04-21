import { useState } from 'react';
import axios from 'axios';

export default function ImageUpload() {
  const [image, setImage] = useState(null);
  const [uploadedImages, setUploadedImages] = useState([]);

  const handleFileChange = (e) => {
    setImage(e.target.files[0]);
  };

  const handleUpload = async () => {
    if (image) {
      const formData = new FormData();
      formData.append('image', image);

      try {
        const response = await axios.post('/api/upload', formData);
        const { filename } = response.data;

        setUploadedImages([...uploadedImages, filename]);
      } catch (error) {
        console.error('Error uploading image:', error);
      }
    }
  };

  return (
    <div>
      <h1>Upload an Image</h1>
      <input type="file" onChange={handleFileChange} />
      <button onClick={handleUpload}>Upload</button>

      <h2>Uploaded Images</h2>
      <ul>
        {uploadedImages.map((image, index) => (
          <li key={index}>
            <img src={`/api/images/${image}`} alt={`Uploaded image ${index}`} width="100" />
          </li>
        ))}
      </ul>
    </div>
  );
}
