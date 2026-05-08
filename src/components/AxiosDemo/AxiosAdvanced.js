import React, { useState, useRef, useEffect } from 'react';
import axios from 'axios';
import api from '../../services/axiosInstance';

function AxiosAdvanced() {
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [uploadStatus, setUploadStatus] = useState(null);
  const [file, setFile] = useState(null);
  
  // Référence pour stocker le contrôleur d'annulation
  const cancelTokenRef = useRef(null);
  
  // Nettoyage lors du démontage du composant
  useEffect(() => {
    return () => {
      // Annuler toute requête en cours si le composant est démonté
      if (cancelTokenRef.current) {
        cancelTokenRef.current.cancel('Composant démonté');
      }
    };
  }, []);

  // Recherche avec annulation des requêtes précédentes
  const handleSearch = async () => {
    // Ne rien faire si le terme de recherche est vide
    if (!searchTerm.trim()) {
      setError('Veuillez entrer un terme de recherche');
      return;
    }
    
    setLoading(true);
    setError(null);
    
    // Annuler la requête précédente si elle existe
    if (cancelTokenRef.current) {
      cancelTokenRef.current.cancel('Nouvelle recherche lancée');
    }
    
    // Créer un nouveau token d'annulation
    cancelTokenRef.current = axios.CancelToken.source();
    
    try {
      // Effectuer la recherche avec le token d'annulation
      const response = await api.get(`/posts?q=${searchTerm}`, {
        cancelToken: cancelTokenRef.current.token
      });
      
      setSearchResults(response.data);
    } catch (error) {
      // Ne pas afficher d'erreur si la requête a été annulée volontairement
      if (!axios.isCancel(error)) {
        setError(`Erreur lors de la recherche: ${error.message}`);
      } else {
        console.log('Recherche annulée:', error.message);
      }
    } finally {
      setLoading(false);
    }
  };

  // Gestion de la sélection de fichier
  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
    setUploadProgress(0);
    setUploadStatus(null);
  };

  // Téléversement de fichier avec suivi de progression
  const handleFileUpload = async () => {
    if (!file) {
      setUploadStatus('Veuillez sélectionner un fichier');
      return;
    }
    
    setUploadStatus('uploading');
    setUploadProgress(0);
    
    // Création d'un FormData
    const formData = new FormData();
    formData.append('file', file);
    
    try {
      // Téléversement avec suivi de progression
      // Note: Dans un cas réel, remplacez l'URL par votre endpoint d'upload
      await axios.post('https://httpbin.org/post', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        },
        onUploadProgress: (progressEvent) => {
          // Calcul du pourcentage de progression
          const percentCompleted = Math.round(
            (progressEvent.loaded * 100) / progressEvent.total
          );
          setUploadProgress(percentCompleted);
        }
      });
      
      setUploadStatus('success');
      setTimeout(() => {
        setUploadStatus(null);
        setUploadProgress(0);
        setFile(null);
      }, 3000);
    } catch (error) {
      setUploadStatus(`Erreur: ${error.message}`);
    }
  };

  // Annulation manuelle de la recherche
  const cancelSearch = () => {
    if (cancelTokenRef.current) {
      cancelTokenRef.current.cancel('Recherche annulée par l\'utilisateur');
      setLoading(false);
    }
  };

  // Requêtes parallèles avec Promise.all
  const fetchMultipleResources = async () => {
    setLoading(true);
    setError(null);
    
    try {
      // Exécution de plusieurs requêtes en parallèle
      const [usersResponse, postsResponse, commentsResponse] = await Promise.all([
        api.get('/users'),
        api.get('/posts'),
        api.get('/comments')
      ]);
      
      // Traitement des résultats
      console.log('Utilisateurs:', usersResponse.data);
      console.log('Posts:', postsResponse.data);
      console.log('Commentaires:', commentsResponse.data);
      
      // Affichage d'un message de succès
      setError('Données récupérées avec succès! Consultez la console pour les détails.');
    } catch (error) {
      setError(`Erreur lors de la récupération des données: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="axios-advanced">
      <h2>Fonctionnalités avancées d'Axios</h2>
      
      <div className="search-section">
        <h3>Recherche avec annulation</h3>
        <div className="search-controls">
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Rechercher des posts..."
          />
          <button onClick={handleSearch} disabled={loading}>
            Rechercher
          </button>
          <button onClick={cancelSearch} disabled={!loading}>
            Annuler
          </button>
        </div>
        
        {loading && <div className="loading">Recherche en cours...</div>}
        {error && <div className="error">{error}</div>}
        
        {searchResults.length > 0 && (
          <div className="search-results">
            <h4>Résultats ({searchResults.length})</h4>
            <ul>
              {searchResults.map(result => (
                <li key={result.id}>
                  {result.title}
                  <p>{result.content}
 </p>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
      
      <div className="upload-section">
        <h3>Téléversement avec suivi de progression</h3>
        <div className="upload-controls">
          <input
            type="file"
            onChange={handleFileChange}
            disabled={uploadStatus === 'uploading'}
          />
          <button
            onClick={handleFileUpload}
            disabled={!file || uploadStatus === 'uploading'}
          >
            Téléverser
          </button>
        </div>
        
        {uploadStatus === 'uploading' && (
          <div className="progress-container">
            <div className="progress-bar">
              <div
                className="progress-fill"
                style={{ width: `${uploadProgress}%` }}
              ></div>
            </div>
            <div className="progress-text">{uploadProgress}%</div>
          </div>
        )}
        
        {uploadStatus === 'success' && (
          <div className="success-message">
            Fichier téléversé avec succès!
          </div>
        )}
        
        {uploadStatus && uploadStatus !== 'uploading' && uploadStatus !== 'success' && (
          <div className="error-message">
            {uploadStatus}
          </div>
        )}
      </div>
      
      <div className="parallel-section">
        <h3>Requêtes parallèles</h3>
        <button onClick={fetchMultipleResources} disabled={loading}>
          Récupérer plusieurs ressources
        </button>
      </div>
    </div>
  );
}

export default AxiosAdvanced;