import React, { useState } from 'react';
import './App.css';
import FetchBasic from './components/FetchDemo/FetchBasic';
import FetchAdvanced from './components/FetchDemo/FetchAdvanced';
import FetchUpload from './components/FetchDemo/FetchUpload';
import AxiosBasic from './components/AxiosDemo/AxiosBasic';
import AxiosAdvanced from './components/AxiosDemo/AxiosAdvanced';

function App() {
  const [activeTab, setActiveTab] = useState('fetch-basic');

  const renderContent = () => {
    switch (activeTab) {
      case 'fetch-basic':
        return <FetchBasic />;
      case 'fetch-advanced':
        return <FetchAdvanced />;
      case 'fetch-upload':
        return <FetchUpload />;
      case 'axios-basic':
        return <AxiosBasic />;
      case 'axios-advanced':
        return <AxiosAdvanced />;
      default:
        return <div>Sélectionnez un onglet</div>;
    }
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>Communication HTTP Frontend-Backend</h1>
        <p>Démonstration de l'API Fetch et d'Axios

      </header>

      <nav className="App-nav">
        <div className="nav-section">
          <h3>API Fetch</h3>
          <button
            className={activeTab === 'fetch-basic' ? 'active' : ''}
            onClick={() => setActiveTab('fetch-basic')}
          >
            Fetch Basique
          </button>
          <button
            className={activeTab === 'fetch-advanced' ? 'active' : ''}
            onClick={() => setActiveTab('fetch-advanced')}
          >
            Fetch Avancé
          </button>
          <button
            className={activeTab === 'fetch-upload' ? 'active' : ''}
            onClick={() => setActiveTab('fetch-upload')}
          >
            Upload avec Fetch
          </button>
        </div>

        <div className="nav-section">
          <h3>Axios</h3>
          <button
            className={activeTab === 'axios-basic' ? 'active' : ''}
            onClick={() => setActiveTab('axios-basic')}
          >
            Axios Basique
          </button>
          <button
            className={activeTab === 'axios-advanced' ? 'active' : ''}
            onClick={() => setActiveTab('axios-advanced')}
          >
            Axios Avancé
          </button>
        </div>
      </nav>

      <main className="App-content">
        {renderContent()}
      </main>

      <footer className="App-footer">
        <p>
          TP: Communication HTTP entre Frontend et Backend avec Fetch et Axios
        

      </footer>
    </div>
  );
}

export default App;