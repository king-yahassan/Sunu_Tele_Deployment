import axios from "axios";
import config from "../config.json"
// Créer une instance Axios avec l'URL de base configurée
const Instance = axios.create({
  baseURL: config.api_url,
});

// Définition d'une fonction pour ajouter le token d'authentification à l'en-tête de chaque requête
const addAuthToken = () => {
  // Récupérer le token d'authentification depuis le stockage local (localStorage)
  const token = localStorage.getItem("token");

  // Si un token existe
  if (token) {
    // Ajouter le token à l'en-tête des requêtes HTTP sortantes
    Instance.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  } else {
    // Si aucun token n'est présent, supprimer l'en-tête "Authorization"
    delete Instance.defaults.headers.common["Authorization"];
  }
};

// Appeler la fonction addAuthToken pour la première fois pour configurer l'en-tête avec le token actuel (s'il existe)
addAuthToken();

// Intercepter chaque requête sortante pour mettre à jour le token dans l'en-tête si nécessaire
Instance.interceptors.request.use(
  function (config) {
    // Appeler la fonction addAuthToken pour mettre à jour l'en-tête avant chaque requête
    addAuthToken();
    return config;
  },
  function (error) {
    // Gérer les erreurs de requête
    return Promise.reject(error);
  }
);

// Exporter l'instance Axios configurée, qui peut être utilisée pour effectuer des requêtes HTTP
export default Instance;

//Ce code configure une instance Axios pour effectuer des requêtes HTTP vers une API en utilisant un token d'authentification.
//Il ajoute automatiquement le token d'authentification à l'en-tête de chaque requête sortante et intercepte les requêtes pour mettre à jour le token si nécessaire.
//Cette approche est utilisée pour gérer l'authentification dans  l'application coté frontend.