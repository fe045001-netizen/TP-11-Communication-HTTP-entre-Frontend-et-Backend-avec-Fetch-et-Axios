import React from 'react';
import useFetch from '../../hooks/useFetch';

function UsersList() {
  const { data, loading, error, execute } = useFetch('http://localhost:3001/users', {
    autoLoad: true // Charge automatiquement les données au montage
  });

  const handleRefresh = () => {
    execute(); // Recharge les données
  };

  if (loading) return <div>Chargement...</div>;
  if (error) return <div className="error">{error}</div>;

  return (
    <div>
      <h2>Liste des utilisateurs</h2>
      <button onClick={handleRefresh}>Rafraîchir</button>
      
      {data && (
        <ul>
          {data.map(user => (
            <li key={user.id}>{user.name} ({user.email})</li>
          ))}
        </ul>
      )}
    </div>
  );
}