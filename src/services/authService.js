import api from './axiosInstance';

// Stockage du token dans le localStorage
const TOKEN_KEY = 'auth_token';

// Service d'authentification
const authService = {
  // Connexion utilisateur
  login: async (email, password) => {
    try {
      // Dans un cas réel, remplacez cette URL par votre endpoint d'authentification
      const response = await api.post('/login', { email, password });
      
      // Stockage du token
      const { token } = response.data;
      localStorage.setItem(TOKEN_KEY, token);
      
      return response.data.user;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Échec de la connexion');
    }
  },
  
  // Déconnexion utilisateur
  logout: () => {
    localStorage.removeItem(TOKEN_KEY);
  },
  
  // Vérification si l'utilisateur est connecté
  isAuthenticated: () => {
    return !!localStorage.getItem(TOKEN_KEY);
  },
  
  // Récupération du token
  getToken: () => {
    return localStorage.getItem(TOKEN_KEY);
  },
  
  // Récupération du profil utilisateur
  getProfile: async () => {
    try {
      // Dans un cas réel, remplacez cette URL par votre endpoint de profil
      const response = await api.get('/profile');
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Échec de la récupération du profil');
    }
  }
};

export default authService;