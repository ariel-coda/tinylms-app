#!/bin/bash
# ----------------------------
# Script d'installation Next.js
# et création d'un README.html
# ----------------------------

PROJECT_NAME="mon-projet-next"

echo "📦 Création du projet Next.js..."
npx create-next-app@latest "$PROJECT_NAME" --typescript --tailwind --app --no-src-dir --import-alias "@/*"

cd "$PROJECT_NAME" || exit

echo "⚙️ Installation des dépendances supplémentaires..."
npm install lucide-react framer-motion

echo "📝 Création du fichier README.html..."
cat << 'EOL' > README.html
<!DOCTYPE html>
<html lang="fr">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Documentation - Projet Next.js</title>
    <style>
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }

        :root {
            --primary: #0070f3;
            --primary-dark: #0051cc;
            --bg-primary: #ffffff;
            --bg-secondary: #f8fafc;
            --bg-code: #1e293b;
            --text-primary: #0f172a;
            --text-secondary: #475569;
            --border: #e2e8f0;
            --success: #10b981;
            --warning: #f59e0b;
            --error: #ef4444;
            --radius: 12px;
        }

        body {
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
            line-height: 1.7;
            color: var(--text-primary);
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            min-height: 100vh;
            padding: 20px;
        }

        .container {
            max-width: 1200px;
            margin: 0 auto;
            background: var(--bg-primary);
            border-radius: var(--radius);
            overflow: hidden;
            box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04);
        }

        header {
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            color: white;
            padding: 60px 40px;
            text-align: center;
            position: relative;
            overflow: hidden;
        }

        header::before {
            content: '';
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            background: url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E");
            pointer-events: none;
        }

        h1 {
            font-size: 3rem;
            font-weight: 800;
            margin-bottom: 10px;
            position: relative;
            text-shadow: 2px 2px 4px rgba(0,0,0,0.1);
        }

        .subtitle {
            font-size: 1.25rem;
            opacity: 0.95;
            position: relative;
        }

        nav {
            background: var(--bg-secondary);
            padding: 20px 40px;
            border-bottom: 1px solid var(--border);
            position: sticky;
            top: 0;
            z-index: 100;
            backdrop-filter: blur(10px);
        }

        nav ul {
            list-style: none;
            display: flex;
            gap: 30px;
            flex-wrap: wrap;
        }

        nav a {
            color: var(--text-secondary);
            text-decoration: none;
            font-weight: 500;
            transition: color 0.3s;
            font-size: 0.95rem;
        }

        nav a:hover {
            color: var(--primary);
        }

        main {
            padding: 40px;
        }

        section {
            margin-bottom: 50px;
        }

        h2 {
            font-size: 2rem;
            color: var(--text-primary);
            margin-bottom: 20px;
            padding-bottom: 10px;
            border-bottom: 2px solid var(--border);
            display: flex;
            align-items: center;
            gap: 10px;
        }

        h3 {
            font-size: 1.5rem;
            color: var(--text-primary);
            margin: 30px 0 15px 0;
        }

        p {
            color: var(--text-secondary);
            margin-bottom: 15px;
        }

        .badge {
            display: inline-block;
            padding: 4px 12px;
            background: var(--primary);
            color: white;
            border-radius: 20px;
            font-size: 0.85rem;
            font-weight: 600;
            margin-right: 8px;
        }

        .badge.success { background: var(--success); }
        .badge.warning { background: var(--warning); }
        .badge.error { background: var(--error); }

        pre {
            background: var(--bg-code);
            color: #e2e8f0;
            padding: 20px;
            border-radius: 8px;
            overflow-x: auto;
            font-family: 'Monaco', 'Courier New', monospace;
            font-size: 0.9rem;
            line-height: 1.5;
            margin: 20px 0;
            position: relative;
        }

        pre::before {
            content: attr(data-lang);
            position: absolute;
            top: 8px;
            right: 8px;
            padding: 2px 8px;
            background: rgba(255,255,255,0.1);
            border-radius: 4px;
            font-size: 0.75rem;
            text-transform: uppercase;
        }

        code {
            background: var(--bg-secondary);
            color: var(--primary);
            padding: 2px 6px;
            border-radius: 4px;
            font-family: 'Monaco', 'Courier New', monospace;
            font-size: 0.9em;
        }

        pre code {
            background: none;
            color: inherit;
            padding: 0;
        }

        .grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
            gap: 20px;
            margin: 20px 0;
        }

        .card {
            background: var(--bg-secondary);
            padding: 20px;
            border-radius: 8px;
            border: 1px solid var(--border);
            transition: transform 0.3s, box-shadow 0.3s;
        }

        .card:hover {
            transform: translateY(-2px);
            box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1);
        }

        .card h4 {
            color: var(--text-primary);
            margin-bottom: 10px;
            font-size: 1.1rem;
        }

        .card p {
            font-size: 0.95rem;
        }

        .alert {
            padding: 15px 20px;
            border-radius: 8px;
            margin: 20px 0;
            border-left: 4px solid;
        }

        .alert.info {
            background: #eff6ff;
            border-color: var(--primary);
            color: #1e40af;
        }

        .alert.success {
            background: #f0fdf4;
            border-color: var(--success);
            color: #166534;
        }

        .alert.warning {
            background: #fffbeb;
            border-color: var(--warning);
            color: #92400e;
        }

        .button {
            display: inline-block;
            padding: 10px 24px;
            background: var(--primary);
            color: white;
            border-radius: 6px;
            text-decoration: none;
            font-weight: 600;
            transition: background 0.3s;
            margin: 10px 10px 10px 0;
        }

        .button:hover {
            background: var(--primary-dark);
        }

        .button.secondary {
            background: transparent;
            color: var(--primary);
            border: 2px solid var(--primary);
        }

        .button.secondary:hover {
            background: var(--primary);
            color: white;
        }

        table {
            width: 100%;
            border-collapse: collapse;
            margin: 20px 0;
        }

        th, td {
            padding: 12px;
            text-align: left;
            border-bottom: 1px solid var(--border);
        }

        th {
            background: var(--bg-secondary);
            font-weight: 600;
            color: var(--text-primary);
        }

        tr:hover {
            background: var(--bg-secondary);
        }

        .icon {
            width: 20px;
            height: 20px;
            display: inline-block;
            vertical-align: middle;
        }

        footer {
            background: var(--bg-secondary);
            padding: 30px 40px;
            text-align: center;
            border-top: 1px solid var(--border);
            color: var(--text-secondary);
        }

        @media (max-width: 768px) {
            header { padding: 40px 20px; }
            h1 { font-size: 2rem; }
            main { padding: 20px; }
            nav { padding: 15px 20px; }
            nav ul { gap: 15px; }
        }
    </style>
</head>
<body>
    <div class="container">
        <header>
            <h1>🚀 Projet Next.js</h1>
            <p class="subtitle">Documentation complète pour démarrer rapidement</p>
        </header>

        <nav>
            <ul>
                <li><a href="#introduction">Introduction</a></li>
                <li><a href="#installation">Installation</a></li>
                <li><a href="#structure">Structure</a></li>
                <li><a href="#commandes">Commandes</a></li>
                <li><a href="#features">Fonctionnalités</a></li>
                <li><a href="#deployment">Déploiement</a></li>
            </ul>
        </nav>

        <main>
            <section id="introduction">
                <h2>📖 Introduction</h2>
                <p>Bienvenue dans votre nouveau projet Next.js ! Cette application a été créée avec les dernières technologies web pour vous offrir une expérience de développement optimale.</p>
                
                <div class="alert info">
                    <strong>💡 Info :</strong> Ce projet utilise Next.js 14 avec App Router, TypeScript et Tailwind CSS.
                </div>
            </section>

            <section id="installation">
                <h2>⚙️ Installation</h2>
                <p>Pour installer et démarrer le projet, suivez ces étapes simples :</p>
                
                <h3>Prérequis</h3>
                <ul>
                    <li>Node.js 18.17 ou version supérieure</li>
                    <li>npm, yarn ou pnpm</li>
                </ul>

                <h3>Installation des dépendances</h3>
                <pre data-lang="bash"><code>npm install
# ou
yarn install
# ou
pnpm install</code></pre>

                <h3>Lancer le serveur de développement</h3>
                <pre data-lang="bash"><code>npm run dev
# ou
yarn dev
# ou
pnpm dev</code></pre>

                <p>Ouvrez <a href="http://localhost:3000" target="_blank">http://localhost:3000</a> dans votre navigateur.</p>
            </section>

            <section id="structure">
                <h2>📁 Structure du projet</h2>
                <p>Voici l'organisation des fichiers et dossiers principaux :</p>
                
                <pre data-lang="text"><code>mon-projet-next/
├── app/
│   ├── layout.tsx       # Layout principal
│   ├── page.tsx         # Page d'accueil
│   └── globals.css      # Styles globaux
├── components/          # Composants réutilisables
├── public/             # Fichiers statiques
├── package.json        # Dépendances
├── next.config.js      # Configuration Next.js
├── tsconfig.json       # Configuration TypeScript
└── tailwind.config.js  # Configuration Tailwind</code></pre>
            </section>

            <section id="commandes">
                <h2>🛠️ Commandes disponibles</h2>
                <table>
                    <thead>
                        <tr>
                            <th>Commande</th>
                            <th>Description</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td><code>npm run dev</code></td>
                            <td>Lance le serveur de développement</td>
                        </tr>
                        <tr>
                            <td><code>npm run build</code></td>
                            <td>Compile l'application pour la production</td>
                        </tr>
                        <tr>
                            <td><code>npm run start</code></td>
                            <td>Démarre le serveur de production</td>
                        </tr>
                        <tr>
                            <td><code>npm run lint</code></td>
                            <td>Vérifie le code avec ESLint</td>
                        </tr>
                    </tbody>
                </table>
            </section>

            <section id="features">
                <h2>✨ Fonctionnalités clés</h2>
                <div class="grid">
                    <div class="card">
                        <h4>🎨 Tailwind CSS</h4>
                        <p>Framework CSS utility-first pour un styling rapide et cohérent.</p>
                    </div>
                    <div class="card">
                        <h4>📘 TypeScript</h4>
                        <p>Support complet de TypeScript pour un code plus robuste.</p>
                    </div>
                    <div class="card">
                        <h4>🚀 App Router</h4>
                        <p>Nouveau système de routing avec Server Components.</p>
                    </div>
                    <div class="card">
                        <h4>⚡ Fast Refresh</h4>
                        <p>Rechargement instantané lors des modifications.</p>
                    </div>
                    <div class="card">
                        <h4>🔍 SEO Optimisé</h4>
                        <p>Métadonnées et optimisations SEO intégrées.</p>
                    </div>
                    <div class="card">
                        <h4>📱 Responsive</h4>
                        <p>Design adaptatif pour tous les appareils.</p>
                    </div>
                </div>
            </section>

            <section id="deployment">
                <h2>🚀 Déploiement</h2>
                <p>Plusieurs options sont disponibles pour déployer votre application :</p>
                
                <h3>Vercel (Recommandé)</h3>
                <p>La plateforme officielle de Next.js :</p>
                <a href="https://vercel.com/new" target="_blank" class="button">Déployer sur Vercel</a>

                <h3>Autres plateformes</h3>
                <ul>
                    <li><span class="badge">Netlify</span> Support des fonctions serverless</li>
                    <li><span class="badge">Railway</span> Déploiement simple avec Docker</li>
                    <li><span class="badge">Render</span> PaaS avec SSL gratuit</li>
                </ul>

                <div class="alert success">
                    <strong>✅ Conseil :</strong> Utilisez les variables d'environnement pour gérer vos configurations sensibles.
                </div>
            </section>
        </main>

        <footer>
            <p>📚 Documentation créée avec ❤️ pour votre projet Next.js</p>
            <p>© 2025 - Tous droits réservés</p>
        </footer>
    </div>
</body>
</html>
EOL

echo "✅ Installation terminée !"
echo "📂 Projet créé dans : $PROJECT_NAME"
echo "📖 Documentation disponible : $PROJECT_NAME/README.html"
echo ""
echo "Pour démarrer :"
echo "  cd $PROJECT_NAME"
echo "  npm run dev"
