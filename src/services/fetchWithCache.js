import axios from 'axios';
import cacheService from './cacheService';

// Fonction qui récupère des données avec mise en cache
export async function fetchWithCache(url, options = {}) {
  const { ttl, skipCache, ...axiosOptions } = options;
  
  // Générer une clé de cache basée sur l'URL et les options
  const cacheKey = `${url}-${JSON.stringify(axiosOptions)}`;
  
  // Vérifier si les données sont dans le cache (sauf si skipCache est true)
  if (!skipCache) {
    const cachedData = cacheService.get(cacheKey);
    if (cachedData) {
      console.log(`Données récupérées du cache pour: ${url}`);
      return cachedData;
    }
  }
  
  // Si les données ne sont pas dans le cache ou skipCache est true, faire la requête
  try {
    const response = await axios(url, axiosOptions);
    
    // Stocker les données dans le cache
    cacheService.set(cacheKey, response.data, ttl);
    
    return response.data;
  } catch (error) {
    console.error(`Erreur lors de la récupération des données pour: ${url}`, error);
    throw error;
  }
}