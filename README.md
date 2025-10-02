#!/bin/bash

# ----------------------------
# Script d'installation Next.js
# et création d'un README.md
# ----------------------------

# Nom du projet
PROJECT_NAME="mon-projet-next"

# Création du projet Next.js
echo "📦 Création du projet Next.js..."
npx create-next-app@latest $PROJECT_NAME

cd $PROJECT_NAME || exit

# Installation des dépendances
echo "⚙️ Installation des dépendances..."
npm install

# Création du README.md
echo "📝 Création du fichier README.md..."
cat <<EOL > README.md
# 📄 Documentation du projet

Ce projet est une application **[Next.js](https://nextjs.org)** générée avec **create-next-app**.

---

## 🚀 Démarrage du projet

Pour lancer le serveur de développement, exécute l'une des commandes suivantes dans le répertoire du projet :  

\`\`\`bash
npm run dev
# ou
yarn dev
# ou
pnpm dev
# ou
bun dev
\`\`\`

Ensuite, ouvre ton navigateur à l’adresse :  
[http://localhost:3000](http://localhost:3000)  

Tu verras ton application Next.js en fonctionnement.

---

## ✏️ Modification du projet

Le point d’entrée principal de la page est le fichier :  
\`\`\`
app/page.tsx
\`\`\`

Tu peux modifier ce fichier pour changer le contenu. Les changements sont **automatiquement appliqués** grâce au rechargement à chaud.

---

## 🔠 Gestion des polices

Ce projet utilise **[next/font](https://nextjs.org/docs/app/building-your-application/optimizing/fonts)** pour optimiser automatiquement les polices.  

La police utilisée ici est **[Geist](https://vercel.com/font)**, une nouvelle famille de polices optimisée pour Vercel.

---

## 📚 Ressources pour en savoir plus

- 📄 [Documentation officielle Next.js](https://nextjs.org/docs)  
- 🎓 [Apprendre Next.js](https://nextjs.org/learn)  
- 🛠 [Dépôt GitHub de Next.js](https://github.com/vercel/next.js)  

---

## 🚢 Déploiement avec Vercel

La manière la plus simple de déployer ton application Next.js est d’utiliser la **[plateforme Vercel](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme)**.  

Pour plus de détails :  
[Documentation sur le déploiement Next.js](https://nextjs.org/docs/app/building-your-application/deploying).

EOL

echo "✅ Projet créé avec succès dans $PROJECT_NAME"
echo "📄 README.md généré."
