"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import HeaderDashboard from "../components/ui/header-dashboard";

const applications = [
  {
    id: 1,
    name: "Formulaires",
    icon: "./formulaire.png",
    description:
      "Créez des formulaires d’inscription ou d’évaluation en quelques clics.",
    details:
      "Créez et partagez facilement des formulaires personnalisés pour recueillir les inscriptions, les avis ou les demandes de votre cible. Aucune compétence technique requise. Les réponses sont automatiquement classées et exploitables pour vos analyses.",
    advantages: [
      "Gratuit et illimité : créez autant de formulaires que vous le souhaitez",
      "Personnalisation simple : adaptez les champs, couleurs et styles à votre école",
      "Données centralisées : visualisez toutes les réponses dans un tableau clair",
      "Partage instantané : lien ou QR code prêt à diffuser",
      "Suivi en temps réel : surveillez les taux de réponse et optimisez vos campagnes",
    ],

    price: "free",
    image: "./images/form-illustration.jpg",
  },
  {
    id: 2,
    name: "eLearning",
    icon: "./e-learning.png",
    description:
      "Une plateforme tout-en-un pour créer, organiser et suivre vos cours en ligne.",
    details:
      "Créez des modules, suivez la progression et engagez vos apprenants.",
    advantages: [
      "Tableau de bord complet",
      "Hébergement sécurisé des vidéos",
      "Suivi automatique des étudiants",
    ],
    price: "premium",
    image: "./illustration-elearning.png",
  },
  {
    id: 3,
    name: "Suivi Apprenants",
    icon: "./analytics.png",
    description:
      "Un outil de pilotage intelligent pour suivre les performances et la présence.",
    details:
      "Gérez le parcours de vos étudiants du premier jour jusqu’à la diplomation. Visualisez leur progression, leurs notes, leur présence et leur évolution en un seul endroit.",
    advantages: [
      "Vue d’ensemble complète : accédez à toutes les données étudiantes en un clic",
      "Suivi intelligent : repérez automatiquement les étudiants en difficulté",
      "Rapports automatisés : générez bulletins et évaluations facilement",
      "Communication directe : échangez avec les étudiants depuis la plateforme",
      "Sécurité renforcée : données chiffrées et hébergées de manière sécurisée",
    ],
    price: "premium",
    image: "./images/suivi-etudiants.jpg",
  },
];

export default function Formulaire() {
  const [selectedApp, setSelectedApp] = useState<any | null>(null);

  const router = useRouter();

  return (
    <>
      <HeaderDashboard />

      <div className="min-h-screen bg-white pt-28 sm:pt-32 pb-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          {/* En-tête */}
          <div className="text-center mb-12 lg:mb-16">
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-semibold text-gray-900 mb-4 leading-tight">
              Choisissez vos{" "}
              <span className="relative inline-block">
                applications
                <svg
                  className="absolute -bottom-1 sm:-bottom-1 left-0 w-full h-2 sm:h-3"
                  viewBox="0 0 200 12"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  preserveAspectRatio="none"
                >
                  <path
                    d="M2 10C50 5 100 2 198 10"
                    stroke="#29abe2"
                    strokeWidth="4"
                    strokeLinecap="round"
                  />
                </svg>
              </span>
            </h1>
            <p className="text-sm sm:text-base text-gray-600 max-w-2xl mx-auto mt-3">
              Activez les modules dont vous avez besoin pour piloter votre
              structure.
            </p>
          </div>

          {/* Grille d'applications */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 max-w-5xl mx-auto">
            {applications.map((app) => (
              <button
                key={app.id}
                onClick={() => setSelectedApp(app)}
                className="bg-white border border-gray-200 rounded-lg p-6 sm:p-8 text-left transition-colors hover:shadow-xs hover:border-blue-300"
              >
                {/* Icône */}
                <div className="mb-4">
                  <img
                    src={app.icon}
                    alt={app.name}
                    className="w-12 h-12 sm:w-14 sm:h-14 object-contain"
                  />
                </div>

                {/* Contenu */}
                <div>
                  <h3 className="text-lg sm:text-xl font-semibold text-gray-900 mb-2">
                    {app.name}
                  </h3>
                  <p className="text-sm text-gray-600 leading-relaxed mb-2">
                    {app.description}
                  </p>
                </div>
              </button>
            ))}
          </div>

          {/* Message d'information */}
          <div className="mt-12 text-center">
            <p className="text-sm text-gray-500">
              Cliquez sur une application pour commencer
            </p>
          </div>
        </div>
      </div>

      {/* POPUP / MODAL */}
      {selectedApp && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50">
          <div className="bg-white rounded-2xl shadow-xl max-w-4xl w-full mx-6 p-8 flex flex-col lg:flex-row relative">
            {/* Bouton de fermeture */}
            <button
              onClick={() => setSelectedApp(null)}
              className="absolute top-4 right-4 text-gray-500 rounded-md font-medium hover:text-gray-800"
            >
              ✕
            </button>

            {/* Contenu gauche */}
            <div className="lg:w-1/2 flex flex-col justify-center space-y-8">
              <div className="flex flex-col items-left justify-start space-y-5 space-x-3">
                <h2 className="text-2xl font-semibold">{selectedApp.name}</h2>
                <hr className="border border-gray-50" />
              </div>

              <p className="text-gray-700">{selectedApp.details}</p>

              <ul className="list-disc list-inside flex flex-col space-y-2 text-sm text-gray-600">
                {selectedApp.advantages.map((adv: string, i: number) => (
                  <li key={i} className="list-none">
                    {adv}
                  </li>
                ))}
              </ul>
              <hr className="border border-gray-50" />
              <div>
                {selectedApp.price === "free" ? (
                  <button className="w-full bg-gray-900 hover:bg-gray-800 text-white font-medium px-5 py-3 rounded-lg transition">
                    Commencez c’est gratuit
                  </button>
                ) : (
                  <div className="flex flex-col space-y-2">
                    <button className="bg-gray-900 hover:bg-gray-800 text-white font-medium px-5 py-2 rounded-lg transition">
                      Vous pouvez essayer gratuitement
                    </button>
                    <p className="text-center text-xs">
                      Sans carte bancaire demandé tester l'application pendant 30 jours
                    </p>
                    <p className="bg-gray-50 text-center font-semibold text-sm mt-1">
                      15 000 FCFA / mois ou essai gratuit de 30 jours sans carte
                    </p>
                  </div>
                )}
              </div>
            </div>

            {/* Image à droite */}
            <div className="lg:w-1/2 min-h-[100%] mt-6 lg:mt-0 lg:pl-8 max-lg:hidden flex justify-center items-center">
              <img
                src={selectedApp.image}
                alt={selectedApp.name}
                className="rounded-xl h-full w-full max-w-sm object-cover"
              />
            </div>
          </div>
        </div>
      )}
    </>
  );
}
