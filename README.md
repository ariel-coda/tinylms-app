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
    <li><span class="highlight">npm run dev</span> → Lancer le serveur de développement</li>
    <li><span class="highlight">npm run build</span> → Compiler le projet pour la production</li>
    <li><span class="highlight">npm run start</span> → Démarrer le serveur en mode production</li>
    <li><span class="highlight">npm run lint</span> → Vérifier la qualité du code</li>
  </ul>

  <h2>🚀 Déploiement</h2>
  <p>
    Le déploiement recommandé se fait sur <a href="https://vercel.com/new" target="_blank">Vercel</a> (service officiel Next.js).  
    Vous pouvez aussi utiliser :
  </p>
  <ul>
    <li><strong>Netlify</strong> – support des fonctions serverless</li>
    <li><strong>Railway</strong> – déploiement rapide via Docker</li>
    <li><strong>Render</strong> – PaaS avec certificat SSL automatique</li>
  </ul>

  <h2>🔐 Intégration Supabase</h2>
  <p>
    Supabase est utilisé pour :
  </p>
  <ul>
    <li>La création et la gestion des utilisateurs via <span class="highlight">supabase.auth.signUp()</span></li>
    <li>La gestion des abonnements ou des données via <span class="highlight">supabase.from().insert()</span></li>
  </ul>
  <p>
    Assurez-vous que votre projet Supabase contient les tables nécessaires, 
    comme <span class="highlight">users</span> et <span class="highlight">subscriptions</span>.
  </p>

  <h2>💡 Bonnes pratiques</h2>
  <ul>
    <li>Ne jamais exposer la clé <strong>SUPABASE_SERVICE_ROLE_KEY</strong> dans le frontend.</li>
    <li>Utilisez toujours des routes API (<strong>/app/api/</strong>) pour les opérations sensibles.</li>
    <li>Stockez les clés uniquement dans le fichier <strong>.env.local</strong>.</li>
  </ul>

  <h2>📚 Crédits</h2>
  <p>
    Documentation générée avec ❤️ pour accompagner le développement du projet TinyLMS.  
    © 2025 — Ariel & TinyLMS.
  </p>

</body>
</html>
