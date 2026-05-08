# TP 11 : Communication HTTP entre Frontend et Backend avec Fetch et Axios

## Description

Ce projet React a été réalisé dans le cadre du TP 11 du cours **Développement web full-stack avec JavaScript**.

L’objectif principal est de comprendre et maîtriser la communication HTTP entre une application frontend React et une API backend simulée avec JSON Server.

Le projet utilise :
- React JS
- Fetch API
- Axios
- JSON Server

---

# Objectifs pédagogiques

Ce TP permet de :

- Comprendre les requêtes HTTP (GET, POST, DELETE)
- Utiliser Fetch API pour communiquer avec une API REST
- Utiliser Axios et ses fonctionnalités avancées
- Gérer les erreurs HTTP
- Manipuler les états React avec les Hooks
- Créer des hooks personnalisés
- Implémenter un système de cache simple
- Simuler une authentification

---

# Technologies utilisées

- React JS
- JavaScript ES6+
- Axios
- Fetch API
- JSON Server
- HTML5
- CSS3

---

# Structure du projet

```bash
src/
│
├── components/
│   ├── FetchDemo/
│   │   ├── FetchBasic.js
│   │   ├── FetchAdvanced.js
│   │   └── FetchUpload.js
│   │
│   ├── AxiosDemo/
│   │   ├── AxiosBasic.js
│   │   ├── AxiosConfig.js
│   │   └── AxiosAdvanced.js
│   │
│   └── Shared/
│       ├── ErrorBoundary.js
│       └── ProgressBar.js
│
├── hooks/
│   └── useFetch.js
│
├── services/
│   ├── api.js
│   ├── axiosInstance.js
│   ├── authService.js
│   └── cacheService.js
│
└── App.js
```

---

# Fonctionnalités réalisées

## Fetch API

* Récupération des utilisateurs
* Gestion des erreurs HTTP
* Création d’utilisateurs
* Timeout avec AbortController
* Chargement des commentaires et auteurs

---

## Axios

* Configuration d’instance Axios
* Requêtes GET / POST / DELETE
* Gestion automatique du JSON
* Gestion avancée des erreurs

---

## Hooks React utilisés

* useState
* useEffect
* useCallback

---

## Fonctionnalités avancées

* Hook personnalisé `useFetch`
* Service d’authentification
* Gestion du token JWT
* Cache des requêtes HTTP

---

# Comparaison Fetch vs Axios

| Fonctionnalité                       | Fetch   | Axios       |
| ------------------------------------ | ------- | ----------- |
| Inclus dans le navigateur            | Oui     | Non         |
| Conversion JSON automatique          | Non     | Oui         |
| Gestion automatique des erreurs HTTP | Non     | Oui         |
| Timeout intégré                      | Non     | Oui         |
| Intercepteurs                        | Non     | Oui         |
| Simplicité                           | Moyenne | Très simple |

---

# Captures d'écran

<img width="1346" height="622" alt="Capture d’écran 2026-05-08 114023" src="https://github.com/user-attachments/assets/25888901-ca18-4d02-87a6-522b34267b0c" />


<img width="1363" height="580" alt="Capture d’écran 2026-05-08 114112" src="https://github.com/user-attachments/assets/0e22baaa-15dd-45ba-820f-a306316a847b" />


<img width="1347" height="629" alt="Capture d’écran 2026-05-08 114139" src="https://github.com/user-attachments/assets/823a4bb9-7458-46e4-89f4-4356197b43be" />

# Résultat attendu

L’application permet :

* d’afficher les utilisateurs
* d’ajouter des utilisateurs
* d’afficher les posts
* de supprimer des posts
* de tester Fetch et Axios
* de simuler une API backend

---

# Auteur

Projet réalisé par :

**Fatima-ezzahra Sahmad**

Dans le cadre du module :

**Développement web full-stack avec JavaScript**

---

# Conclusion

Ce TP a permis de comprendre le fonctionnement des communications HTTP dans une application React moderne.

Les principales notions étudiées sont :

* Fetch API
* Axios
* Gestion des erreurs
* API REST
* Hooks React
* Authentification
* Cache des données

Ce projet constitue une excellente base pour le développement d’applications web full-stack modernes.

