import React, { useState } from 'react';

function FetchUpload() {
  const [file, setFile] = useState(null);
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const [preview, setPreview] = useState(null);

  // Sélection du fichier
  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];

    if (selectedFile) {
      setFile(selectedFile);

      // Prévisualisation image
      if (selectedFile.type.startsWith('image/')) {
        setPreview(URL.createObjectURL(selectedFile));
      } else {
        setPreview(null);
      }
    }
  };

  // Upload du fichier
  const handleUpload = async () => {
    if (!file) {
      setMessage('Veuillez sélectionner un fichier');
      return;
    }

    setLoading(true);
    setMessage('');

    try {
      const formData = new FormData();
      formData.append('file', file);

      const response = await fetch(
        'http://localhost:3001/upload',
        {
          method: 'POST',
          body: formData
        }
      );

      if (!response.ok) {
        throw new Error(`Erreur HTTP: ${response.status}`);
      }

      const data = await response.json();

      setMessage(`Fichier uploadé avec succès : ${data.fileName}`);
    } catch (error) {
      setMessage(`Erreur : ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fetch-upload">
      <h2>Upload de fichier avec Fetch</h2>

      <div className="upload-section">
        <input
          type="file"
          onChange={handleFileChange}
        />

        <button
          onClick={handleUpload}
          disabled={loading}
        >
          {loading ? 'Upload en cours...' : 'Uploader'}
        </button>
      </div>

      {file && (
        <div className="file-info">
          <p>
            <strong>Nom :</strong> {file.name}
          </p>

          <p>
            <strong>Taille :</strong> {file.size} octets
          </p>

          <p>
            <strong>Type :</strong> {file.type}
          </p>
        </div>
      )}

      {preview && (
        <div className="preview">
          <h3>Prévisualisation</h3>

          <img
            src={preview}
            alt="Preview"
            style={{
              maxWidth: '300px',
              borderRadius: '8px'
            }}
          />
        </div>
      )}

      {message && (
        <p className="message">
          {message}
        </p>
      )}
    </div>
  );
}

export default FetchUpload;