<!DOCTYPE html>
<html lang="fr">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>README - Projet Next.js</title>
  <style>
    body {
      font-family: "Inter", sans-serif;
      background-color: #fafafa;
      color: #111;
      line-height: 1.7;
      padding: 2rem 3rem;
      max-width: 900px;
      margin: auto;
    }
    h1, h2, h3 {
      color: #0a0a0a;
    }
    h1 {
      font-size: 2.5rem;
      margin-bottom: 1rem;
    }
    h2 {
      font-size: 1.6rem;
      margin-top: 2.5rem;
      border-left: 5px solid #00bfa6;
      padding-left: 10px;
    }
    p, li {
      font-size: 1rem;
    }
    ul {
      padding-left: 1.2rem;
    }
    a {
      color: #00bfa6;
      text-decoration: none;
    }
    a:hover {
      text-decoration: underline;
    }
    .highlight {
      background: #e0f7f4;
      padding: 0.2rem 0.5rem;
      border-radius: 4px;
      font-weight: 500;
    }
  </style>
</head>
<body>

  <h1>🚀 Projet Next.js avec Supabase</h1>

  <h2>📖 Introduction</h2>
  <p>
    Bienvenue dans votre projet <strong>Next.js</strong> utilisant 
    <strong>TypeScript</strong>, <strong>Tailwind CSS</strong> et 
    <strong>Supabase</strong> pour la gestion de l’authentification et des données.  
    Ce projet est configuré pour tirer parti des dernières fonctionnalités du framework 
    <em>Next.js App Router</em>.
  </p>

  <h2>⚙️ Installation</h2>
  <ol>
    <li>Installez les dépendances du projet : <span class="highlight">npm install</span></li>
    <li>Lancez le serveur de développement : <span class="highlight">npm run dev</span></li>
    <li>Ouvrez votre navigateur à l’adresse : <strong>http://localhost:3000</strong></li>
  </ol>

  <h2>🧩 Variables d’environnement (.env.local)</h2>
  <p>
    À la racine du projet, créez un fichier nommé <span class="highlight">.env.local</span> 
    et ajoutez vos identifiants Supabase :
  </p>
  <ul>
    <li><span class="highlight">NEXT_PUBLIC_SUPABASE_URL=</span> votre URL de projet Supabase</li>
    <li><span class="highlight">NEXT_PUBLIC_SUPABASE_ANON_KEY=</span> clé publique (anon)</li>
    <li><span class="highlight">SUPABASE_SERVICE_ROLE_KEY=</span> clé de service privée (optionnelle, côté serveur)</li>
  </ul>

  <h2>📁 Structure du projet</h2>
  <ul>
    <li><strong>app/</strong> — pages, routes et logique côté serveur</li>
    <li><strong>components/</strong> — composants UI réutilisables</li>
    <li><strong>public/</strong> — fichiers statiques (logos, images, etc.)</li>
    <li><strong>lib/</strong> — configuration Supabase et utilitaires backend</li>
    <li><strong>api/</strong> — routes API côté serveur</li>
  </ul>

  <h2>📘 Commandes disponibles</h2>
  <ul>
    <
