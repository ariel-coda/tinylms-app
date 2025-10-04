"use client";

import React, { useState } from "react";
import {
  PlayCircle,
  Layers,
  ArrowLeft,
  TrendingUp,
  AlertCircle,
  Award,
  Clock,
  Bird,
  Plus,
  Edit2,
  Trash2,
  Download,
  Menu,
  X,
  Home,
  BookOpen,
  Users,
  CreditCard,
  MessageSquare,
  ChevronRight,
  ChevronDown,
  Play,
  FileText,
} from "lucide-react";

// Types
interface Exercise {
  id: string;
  title: string;
  description: string;
}

interface Resource {
  id: string;
  title: string;
  type: "pdf" | "link";
  url: string;
}

interface Course {
  id: string;
  title: string;
  description: string;
  videoUrl: string;
  resources: Resource[];
  exercises: Exercise[];
}

interface Module {
  id: string;
  name: string;
  courses: Course[];
}

interface Filiere {
  id: string;
  name: string;
  modules: Module[];
}

interface Activity {
  id: string;
  type: string;
  message: string;
  time: string;
}

interface DashboardStats {
  totalFilieres: number;
  totalModules: number;
  totalCourses: number;
  totalStudents: number;
  activeStudents: number;
  completionRate: number;
  pendingPayments: number;
  recentActivities: Activity[];
}

// Données de démonstration
const demoData: Filiere[] = [
  {
    id: "1",
    name: "Informatique",
    modules: [
      {
        id: "m1",
        name: "Programmation Web",
        courses: [
          {
            id: "c1",
            title: "Introduction à React",
            description:
              "Apprenez les fondamentaux de React et créez votre première application.",
            videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
            resources: [
              { id: "r1", title: "Guide React.pdf", type: "pdf", url: "#" },
              {
                id: "r2",
                title: "Documentation officielle",
                type: "link",
                url: "https://react.dev",
              },
            ],
            exercises: [
              {
                id: "e1",
                title: "Exercice 1: Composants",
                description: "Créer des composants React de base",
              },
              {
                id: "e2",
                title: "Exercice 2: Props et State",
                description: "Utiliser les props et le state",
              },
            ],
          },
          {
            id: "c2",
            title: "JavaScript Avancé",
            description:
              "Maîtrisez les concepts avancés de JavaScript moderne.",
            videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
            resources: [
              { id: "r3", title: "ES6+ Features.pdf", type: "pdf", url: "#" },
            ],
            exercises: [
              {
                id: "e3",
                title: "Exercice 1: Async/Await",
                description: "Programmation asynchrone",
              },
            ],
          },
        ],
      },
      {
        id: "m2",
        name: "Base de données",
        courses: [
          {
            id: "c3",
            title: "SQL Fondamentaux",
            description:
              "Apprenez à interroger et gérer des bases de données SQL.",
            videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
            resources: [],
            exercises: [],
          },
        ],
      },
    ],
  },
  {
    id: "2",
    name: "Marketing Digital",
    modules: [
      {
        id: "m3",
        name: "SEO & Contenu",
        courses: [
          {
            id: "c4",
            title: "Optimisation SEO",
            description: "Optimisez votre site pour les moteurs de recherche.",
            videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
            resources: [],
            exercises: [],
          },
        ],
      },
    ],
  },
];

const dashboardStats: DashboardStats = {
  totalFilieres: 2,
  totalModules: 3,
  totalCourses: 4,
  totalStudents: 156,
  activeStudents: 142,
  completionRate: 78,
  pendingPayments: 12,
  recentActivities: [
    {
      id: "1",
      type: "student",
      message: "Nouvel étudiant inscrit: Marie Dupont",
      time: "Il y a 5 min",
    },
    {
      id: "2",
      type: "course",
      message: 'Cours "React Avancé" complété par 8 étudiants',
      time: "Il y a 1h",
    },
    {
      id: "3",
      type: "payment",
      message: "Paiement reçu de Jean Martin - 15,000 FCFA",
      time: "Il y a 2h",
    },
    {
      id: "4",
      type: "student",
      message: "5 étudiants ont terminé un exercice",
      time: "Il y a 3h",
    },
  ],
};

const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState("dashboard");
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [selectedFiliere, setSelectedFiliere] = useState<Filiere | null>(null);
  const [selectedModule, setSelectedModule] = useState<Module | null>(null);
  const [selectedCourse, setSelectedCourse] = useState<Course | null>(null);
  const [expandedFilieres, setExpandedFilieres] = useState<string[]>([]);

  const toggleFiliere = (filiereId: string) => {
    setExpandedFilieres((prev) =>
      prev.includes(filiereId)
        ? prev.filter((id) => id !== filiereId)
        : [...prev, filiereId]
    );
  };

  const selectCourse = (filiere: Filiere, module: Module, course: Course) => {
    setSelectedFiliere(filiere);
    setSelectedModule(module);
    setSelectedCourse(course);
    setActiveTab("academic");
  };

  // Composant Sidebar
  const Sidebar = () => (
    <div
      className={`fixed lg:static inset-y-0 left-0 z-30 w-64 bg-slate-900 text-white transform ${
        sidebarOpen ? "translate-x-0" : "-translate-x-full"
      } lg:translate-x-0 transition-transform duration-300 ease-in-out`}
    >
      <div className="p-6">
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center space-x-2">
            <Bird className="text-emerald-400" size={32} />
            <span className="text-lg font-semibold">TinyLMS</span>
          </div>
          <button onClick={() => setSidebarOpen(false)} className="lg:hidden">
            <X size={20} />
          </button>
        </div>

        <nav className="space-y-1">
          <button
            onClick={() => setActiveTab("dashboard")}
            className={`w-full flex items-center space-x-3 px-3 py-2.5 rounded-lg transition-colors text-sm ${
              activeTab === "dashboard"
                ? "bg-emerald-500 text-white"
                : "text-slate-300 hover:bg-slate-800"
            }`}
          >
            <Home size={18} />
            <span>Tableau de bord</span>
          </button>

          <button
            onClick={() => setActiveTab("academic")}
            className={`w-full flex items-center space-x-3 px-3 py-2.5 rounded-lg transition-colors text-sm ${
              activeTab === "academic"
                ? "bg-emerald-500 text-white"
                : "text-slate-300 hover:bg-slate-800"
            }`}
          >
            <BookOpen size={18} />
            <span>Gestion Académique</span>
          </button>

          <button
            onClick={() => setActiveTab("students")}
            className={`w-full flex items-center space-x-3 px-3 py-2.5 rounded-lg transition-colors text-sm ${
              activeTab === "students"
                ? "bg-emerald-500 text-white"
                : "text-slate-300 hover:bg-slate-800"
            }`}
          >
            <Users size={18} />
            <span>Étudiants</span>
          </button>

          <button
            onClick={() => setActiveTab("payments")}
            className={`w-full flex items-center space-x-3 px-3 py-2.5 rounded-lg transition-colors text-sm ${
              activeTab === "payments"
                ? "bg-emerald-500 text-white"
                : "text-slate-300 hover:bg-slate-800"
            }`}
          >
            <CreditCard size={18} />
            <span>Paiements</span>
          </button>

          <button
            onClick={() => setActiveTab("communication")}
            className={`w-full flex items-center space-x-3 px-3 py-2.5 rounded-lg transition-colors text-sm ${
              activeTab === "communication"
                ? "bg-emerald-500 text-white"
                : "text-slate-300 hover:bg-slate-800"
            }`}
          >
            <MessageSquare size={18} />
            <span>Messages</span>
          </button>
        </nav>
      </div>
    </div>
  );

  // Composant EmptyState
  const EmptyState = ({ title }: { title: string }) => (
    <div className="flex flex-col items-center justify-center h-full py-20">
      <div className="w-48 h-48 mb-6 bg-slate-50 rounded-2xl flex items-center justify-center">
        <Layers size={64} className="text-slate-300" />
      </div>
      <h3 className="text-xl font-semibold text-slate-700 mb-2">{title}</h3>
      <p className="text-slate-500">Commencez par ajouter du contenu</p>
    </div>
  );

  // Dashboard Content
  const DashboardContent = () => (
    <div className="space-y-6">
      {/* Welcome Section */}
      <div className="bg-gradient-to-br from-emerald-500 to-teal-600 rounded-2xl p-8 text-white">
        <h2 className="text-3xl font-bold mb-2">Bonjour, Administrateur 👋</h2>
        <p className="text-emerald-50">
          Gérez votre plateforme et suivez les progrès de vos étudiants
        </p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white rounded-xl p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="w-10 h-10 bg-blue-50 rounded-lg flex items-center justify-center">
              <BookOpen className="text-blue-600" size={20} />
            </div>
          </div>
          <h3 className="text-3xl font-bold text-slate-800 mb-1">
            {dashboardStats.totalCourses}
          </h3>
          <p className="text-slate-500 text-sm">Cours</p>
        </div>

        <div className="bg-white rounded-xl p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="w-10 h-10 bg-emerald-50 rounded-lg flex items-center justify-center">
              <Users className="text-emerald-600" size={20} />
            </div>
          </div>
          <h3 className="text-3xl font-bold text-slate-800 mb-1">
            {dashboardStats.totalStudents}
          </h3>
          <p className="text-slate-500 text-sm">Étudiants</p>
        </div>

        <div className="bg-white rounded-xl p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="w-10 h-10 bg-violet-50 rounded-lg flex items-center justify-center">
              <TrendingUp className="text-violet-600" size={20} />
            </div>
          </div>
          <h3 className="text-3xl font-bold text-slate-800 mb-1">
            {dashboardStats.completionRate}%
          </h3>
          <p className="text-slate-500 text-sm">Taux de complétion</p>
        </div>

        <div className="bg-white rounded-xl p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="w-10 h-10 bg-amber-50 rounded-lg flex items-center justify-center">
              <AlertCircle className="text-amber-600" size={20} />
            </div>
          </div>
          <h3 className="text-3xl font-bold text-slate-800 mb-1">
            {dashboardStats.pendingPayments}
          </h3>
          <p className="text-slate-500 text-sm">En attente</p>
        </div>
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Recent Activities */}
        <div className="lg:col-span-2 bg-white rounded-xl p-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold text-slate-800">
              Activités récentes
            </h3>
            <Clock size={18} className="text-slate-400" />
          </div>
          <div className="space-y-4">
            {dashboardStats.recentActivities.map((activity) => (
              <div
                key={activity.id}
                className="flex items-start space-x-3 pb-4 border-b border-slate-100 last:border-0"
              >
                <div
                  className={`w-9 h-9 rounded-lg flex items-center justify-center flex-shrink-0 ${
                    activity.type === "student"
                      ? "bg-blue-50"
                      : activity.type === "course"
                      ? "bg-emerald-50"
                      : "bg-violet-50"
                  }`}
                >
                  {activity.type === "student" && (
                    <Users size={16} className="text-blue-600" />
                  )}
                  {activity.type === "course" && (
                    <Award size={16} className="text-emerald-600" />
                  )}
                  {activity.type === "payment" && (
                    <CreditCard size={16} className="text-violet-600" />
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-slate-700 text-sm">{activity.message}</p>
                  <p className="text-slate-400 text-xs mt-1">{activity.time}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Overview */}
        <div className="bg-white rounded-xl p-6">
          <h3 className="text-lg font-semibold text-slate-800 mb-6">Aperçu</h3>
          <div className="space-y-4">
            <div className="p-4 bg-slate-50 rounded-lg">
              <div className="text-2xl font-bold text-slate-800 mb-1">
                {dashboardStats.totalFilieres}
              </div>
              <p className="text-slate-600 text-sm">Filières</p>
            </div>
            <div className="p-4 bg-slate-50 rounded-lg">
              <div className="text-2xl font-bold text-slate-800 mb-1">
                {dashboardStats.totalModules}
              </div>
              <p className="text-slate-600 text-sm">Modules</p>
            </div>
            <div className="p-4 bg-slate-50 rounded-lg">
              <div className="text-2xl font-bold text-slate-800 mb-1">
                {dashboardStats.activeStudents}
              </div>
              <p className="text-slate-600 text-sm">Actifs</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  // Academic Management Content
  const AcademicContent = () => {
    const [showMobileSidebar, setShowMobileSidebar] = useState(false);

    if (!selectedFiliere || !selectedModule || !selectedCourse) {
      return (
        <>
          <div className="xl:hidden sticky top-0 z-10 bg-white border-b border-slate-100 px-4 py-3 mb-4 flex items-center justify-between">
            <button
              onClick={() => setShowMobileSidebar(true)}
              className="p-2 hover:bg-slate-50 rounded-lg"
            >
              <Menu size={20} className="text-slate-600" />
            </button>

            <span className="text-sm font-medium text-slate-800 truncate mx-2">
              Cliquez pour sélectionner un cours
            </span>

            <button
              onClick={() => setShowMobileSidebar(true)}
              className="p-2 hover:bg-slate-50 rounded-lg"
            >
              <BookOpen size={20} className="text-slate-600" />
            </button>
          </div>

          <div className="space-y-6">
            {/* Welcome Section */}
            <div className="bg-white rounded-xl p-8">
              <div className="max-w-2xl mx-auto text-center">
                <div className="w-32 h-32 mx-auto mb-6 bg-blue-50 rounded-2xl flex items-center justify-center">
                  <BookOpen size={48} className="text-blue-400" />
                </div>
                <h2 className="text-2xl font-bold text-slate-800 mb-2">
                  Gestion Académique
                </h2>
                <p className="text-slate-500 mb-6">
                  Sélectionnez un cours pour commencer à gérer le contenu
                </p>
                <div className="flex items-center justify-center space-x-2 max-lg:flex-col max-lg:space-y-3 max-lg:justify-center max-lg:space-x-0">
                  <button className="inline-flex items-center space-x-2 px-4 py-3 w-72 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition-colors">
                    <Plus size={13} />
                    <span>Créer une nouvelle filière</span>
                  </button>
                  <button className="inline-flex items-center space-x-2 w-72 py-3 px-4 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition-colors">
                    <Plus size={18} />
                    <span>Créer un nouveau module</span>
                  </button>
                  <button className="inline-flex items-center space-x-2 w-72 py-3 px-4 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition-colors">
                    <Plus size={18} />
                    <span>Créer un nouveau cours</span>
                  </button>
                </div>
              </div>
            </div>

            {/* Modules Récents */}
            <div className="bg-white rounded-xl p-6">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center space-x-3">
                  <div className="p-2 bg-blue-50 rounded-lg">
                    <BookOpen size={20} className="text-blue-600" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-slate-800">
                      Modules Récents
                    </h3>
                    <p className="text-sm text-slate-500">
                      Accédez rapidement à vos modules
                    </p>
                  </div>
                </div>
                <button className="text-sm text-blue-600 hover:text-blue-700 font-medium flex items-center space-x-1">
                  <span>Voir tout</span>
                  <ChevronRight size={16} />
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {[
                  {
                    id: 1,
                    name: "Programmation Web Avancée",
                    filiere: "Informatique",
                    coursesCount: 8,
                    lastAccessed: "Il y a 2 heures",
                  },
                  {
                    id: 2,
                    name: "Base de Données",
                    filiere: "Informatique",
                    coursesCount: 6,
                    lastAccessed: "Hier",
                  },
                  {
                    id: 3,
                    name: "Réseaux et Sécurité",
                    filiere: "Informatique",
                    coursesCount: 10,
                    lastAccessed: "Il y a 3 jours",
                  },
                ].map((module) => (
                  <div
                    key={module.id}
                    className="p-4 border border-slate-200 rounded-lg hover:border-blue-300 hover:shadow-sm transition-all cursor-pointer group"
                  >
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex-1">
                        <h4 className="font-semibold text-slate-800 mb-1 group-hover:text-blue-600 transition-colors">
                          {module.name}
                        </h4>
                        <p className="text-xs text-slate-500">
                          {module.filiere}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-slate-600">
                        {module.coursesCount} cours
                      </span>
                      <div className="flex items-center space-x-1 text-slate-400">
                        <Clock size={14} />
                        <span className="text-xs">{module.lastAccessed}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Cours Récents */}
            <div className="bg-white rounded-xl p-6">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center space-x-3">
                  <div className="p-2 bg-emerald-50 rounded-lg">
                    <PlayCircle size={20} className="text-emerald-600" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-slate-800">
                      Cours Récents
                    </h3>
                    <p className="text-sm text-slate-500">
                      Continuez où vous vous êtes arrêté
                    </p>
                  </div>
                </div>
                <button className="text-sm text-emerald-600 hover:text-emerald-700 font-medium flex items-center space-x-1">
                  <span>Voir tout</span>
                  <ChevronRight size={16} />
                </button>
              </div>

              <div className="space-y-3">
                {[
                  {
                    id: 1,
                    title: "Introduction à React.js",
                    module: "Programmation Web Avancée",
                    duration: "45 min",
                    lastAccessed: "Il y a 1 heure",
                  },
                  {
                    id: 2,
                    title: "SQL et Optimisation",
                    module: "Base de Données",
                    duration: "60 min",
                    lastAccessed: "Il y a 3 heures",
                  },
                  {
                    id: 3,
                    title: "Protocoles TCP/IP",
                    module: "Réseaux et Sécurité",
                    duration: "50 min",
                    lastAccessed: "Hier",
                  },
                ].map((course) => (
                  <div
                    key={course.id}
                    className="flex items-center justify-between p-4 border border-slate-200 rounded-lg hover:border-emerald-300 hover:shadow-sm transition-all cursor-pointer group"
                  >
                    <div className="flex items-center space-x-4 flex-1">
                      <div className="w-12 h-12 bg-gradient-to-br from-emerald-50 to-blue-50 rounded-lg flex items-center justify-center group-hover:from-emerald-100 group-hover:to-blue-100 transition-colors">
                        <PlayCircle size={24} className="text-emerald-600" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <h4 className="font-semibold text-slate-800 mb-1 truncate group-hover:text-emerald-600 transition-colors">
                          {course.title}
                        </h4>
                        <div className="flex items-center space-x-3 text-sm text-slate-500">
                          <span className="truncate">{course.module}</span>
                          <span>•</span>
                          <span>{course.duration}</span>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center space-x-1 text-slate-400 ml-4">
                      <Clock size={14} />
                      <span className="text-xs whitespace-nowrap">
                        {course.lastAccessed}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </>
      );
    }

    return (
      <>
        {/* Mobile Header */}
        <div className="xl:hidden sticky top-0 z-10 bg-white border-b border-slate-100 px-4 py-3 mb-4 flex items-center justify-between">
          <button
            onClick={() => setShowMobileSidebar(true)}
            className="p-2 hover:bg-slate-50 rounded-lg"
          >
            <Menu size={20} className="text-slate-600" />
          </button>

          <span className="text-sm font-medium text-slate-800 truncate mx-2">
            {selectedCourse.title}
          </span>

          <button
            onClick={() => {
              setSelectedCourse(null);
              setSelectedModule(null);
              setSelectedFiliere(null);
            }}
            className="p-2 hover:bg-slate-50 rounded-lg"
          >
            <X size={20} className="text-slate-600" />
          </button>
        </div>

        <div className="space-y-6">
          {/* Breadcrumb Desktop */}
          <div className="hidden xl:flex items-center justify-between">
            <div className="flex items-center space-x-2 text-sm">
              <button
                onClick={() => {
                  setSelectedCourse(null);
                  setSelectedModule(null);
                  setSelectedFiliere(null);
                }}
                className="text-slate-500 hover:text-slate-700"
              >
                Accueil
              </button>
              <ChevronRight size={14} className="text-slate-400" />
              <span className="text-slate-600">{selectedFiliere.name}</span>
              <ChevronRight size={14} className="text-slate-400" />
              <span className="text-slate-600">{selectedModule.name}</span>
              <ChevronRight size={14} className="text-slate-400" />
              <span className="text-slate-800 font-medium">
                {selectedCourse.title}
              </span>
            </div>

            <button
              onClick={() => {
                setSelectedCourse(null);
                setSelectedModule(null);
                setSelectedFiliere(null);
              }}
              className="flex items-center space-x-2 px-3 py-2 text-sm text-slate-600 hover:text-slate-800 hover:bg-slate-50 rounded-lg"
            >
              <ArrowLeft size={16} />
              <span>Retour</span>
            </button>
          </div>

          {/* Course Header */}
          <div className="bg-white rounded-xl overflow-hidden">
            <div className="p-6">
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                  <h1 className="text-2xl lg:text-3xl font-bold text-slate-800 mb-2">
                    {selectedCourse.title}
                  </h1>
                  <p className="text-slate-500">{selectedCourse.description}</p>
                </div>
                <div className="flex items-center space-x-2 ml-4">
                  <button className="p-2 text-slate-400 hover:text-slate-600 hover:bg-slate-50 rounded-lg">
                    <Edit2 size={18} />
                  </button>
                  <button className="p-2 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-lg">
                    <Trash2 size={18} />
                  </button>
                </div>
              </div>

              {/* Video Player */}
              <div className="aspect-video bg-slate-900 rounded-xl overflow-hidden mb-6">
                <iframe
                  src={selectedCourse.videoUrl}
                  className="w-full h-full"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              </div>
            </div>
          </div>

          {/* Resources */}
          <div className="bg-white rounded-xl p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold text-slate-800">
                Ressources
              </h2>
              <button className="p-2 text-slate-400 hover:text-slate-600 hover:bg-slate-50 rounded-lg">
                <Plus size={18} />
              </button>
            </div>

            {selectedCourse.resources.length > 0 ? (
              <div className="space-y-2">
                {selectedCourse.resources.map((resource) => (
                  <div
                    key={resource.id}
                    className="flex items-center justify-between p-4 bg-slate-50 hover:bg-slate-100 rounded-lg group"
                  >
                    <div className="flex items-center space-x-3">
                      <FileText size={18} className="text-slate-400" />
                      <span className="text-sm font-medium text-slate-700">
                        {resource.title}
                      </span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <button className="p-2 text-slate-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg opacity-0 group-hover:opacity-100">
                        <Download size={16} />
                      </button>
                      <button className="p-2 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-lg opacity-0 group-hover:opacity-100">
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <FileText size={32} className="mx-auto text-slate-300 mb-3" />
                <p className="text-slate-500 text-sm mb-3">
                  Aucune ressource pour ce cours
                </p>
                <button className="text-sm text-emerald-600 hover:text-emerald-700 font-medium">
                  Ajouter une ressource
                </button>
              </div>
            )}
          </div>

          {/* Exercises */}
          <div className="bg-white rounded-xl p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold text-slate-800">
                Exercices
              </h2>
              <button className="p-2 text-slate-400 hover:text-slate-600 hover:bg-slate-50 rounded-lg">
                <Plus size={18} />
              </button>
            </div>

            {selectedCourse.exercises.length > 0 ? (
              <div className="space-y-3">
                {selectedCourse.exercises.map((exercise) => (
                  <div
                    key={exercise.id}
                    className="p-4 bg-slate-50 rounded-lg group hover:bg-slate-100"
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <h3 className="font-semibold text-slate-800 mb-1">
                          {exercise.title}
                        </h3>
                        <p className="text-sm text-slate-500">
                          {exercise.description}
                        </p>
                      </div>
                      <div className="flex items-center space-x-2 ml-3">
                        <button className="p-2 text-slate-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg opacity-0 group-hover:opacity-100">
                          <Edit2 size={16} />
                        </button>
                        <button className="p-2 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-lg opacity-0 group-hover:opacity-100">
                          <Trash2 size={16} />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <FileText size={32} className="mx-auto text-slate-300 mb-3" />
                <p className="text-slate-500 text-sm mb-3">
                  Aucun exercice pour ce cours
                </p>
                <button className="text-sm text-emerald-600 hover:text-emerald-700 font-medium">
                  Créer un exercice
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Mobile Sidebar Overlay */}
        {showMobileSidebar && (
          <div className="xl:hidden fixed inset-0 z-50 flex">
            <div
              className="fixed inset-0 bg-slate-900/50"
              onClick={() => setShowMobileSidebar(false)}
            />
            <div className="relative w-80 max-w-[85%] bg-white h-full overflow-y-auto">
              <NavigationSidebar
                onSelectCourse={() => setShowMobileSidebar(false)}
              />
            </div>
          </div>
        )}
      </>
    );
  };

  // Navigation Sidebar
  const NavigationSidebar = ({
    onSelectCourse,
  }: {
    onSelectCourse?: () => void;
  }) => (
    <div className="w-full bg-white h-full overflow-y-auto border-r border-slate-100">
      <div className="p-4">
        <h3 className="text-base font-semibold text-slate-800 mb-4 px-2">
          Structure des cours
        </h3>

        <div className="space-y-1">
          {demoData.map((filiere) => (
            <div key={filiere.id}>
              <button
                onClick={() => toggleFiliere(filiere.id)}
                className="w-full flex items-center justify-between p-2.5 hover:bg-slate-50 rounded-lg"
              >
                <div className="flex items-center space-x-2">
                  <Layers size={16} className="text-slate-400" />
                  <span className="font-medium text-slate-700 text-sm">
                    {filiere.name}
                  </span>
                </div>
                {expandedFilieres.includes(filiere.id) ? (
                  <ChevronDown size={16} className="text-slate-400" />
                ) : (
                  <ChevronRight size={16} className="text-slate-400" />
                )}
              </button>

              {expandedFilieres.includes(filiere.id) && (
                <div className="ml-4 mt-1 space-y-1">
                  {filiere.modules.map((module) => (
                    <div key={module.id}>
                      <div className="flex items-center space-x-2 px-2.5 py-2 text-xs font-medium text-slate-600">
                        <BookOpen size={14} className="text-slate-400" />
                        <span>{module.name}</span>
                      </div>
                      <div className="ml-4 space-y-1">
                        {module.courses.map((course) => (
                          <button
                            key={course.id}
                            onClick={() => {
                              selectCourse(filiere, module, course);
                              onSelectCourse?.();
                            }}
                            className={`w-full text-left px-2.5 py-2 rounded-lg text-xs ${
                              selectedCourse?.id === course.id
                                ? "bg-emerald-500 text-white"
                                : "text-slate-600 hover:bg-slate-50"
                            }`}
                          >
                            <div className="flex items-center space-x-2">
                              <Play size={12} />
                              <span className="truncate">{course.title}</span>
                            </div>
                          </button>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  return (
    <div className="flex h-screen bg-slate-50 overflow-hidden">
      <Sidebar />

      {/* Overlay pour mobile */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-slate-900/50 z-20 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <header className="bg-white border-b border-slate-100 z-10">
          <div className="flex items-center justify-between px-4 lg:px-6 py-4">
            <div className="flex items-center space-x-4">
              <button
                onClick={() => setSidebarOpen(true)}
                className="lg:hidden text-slate-600"
              >
                <Menu size={24} />
              </button>
              <h2 className="text-xl lg:text-2xl font-bold text-slate-800">
                {activeTab === "dashboard" && "Tableau de bord"}
                {activeTab === "academic" && "Gestion Académique"}
                {activeTab === "students" && "Étudiants"}
                {activeTab === "payments" && "Paiements"}
                {activeTab === "communication" && "Messages"}
              </h2>
            </div>

            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-emerald-500 rounded-full flex items-center justify-center text-white font-semibold text-sm">
                AD
              </div>
            </div>
          </div>
        </header>

        {/* Main Content */}
        <main className="flex-1 overflow-hidden flex">
          {activeTab === "academic" && (
            <div className="hidden xl:block w-72 flex-shrink-0">
              <NavigationSidebar />
            </div>
          )}

          <div className="flex-1 overflow-y-auto">
            <div className="p-4 lg:p-6">
              {activeTab === "dashboard" && <DashboardContent />}
              {activeTab === "academic" && <AcademicContent />}
              {activeTab === "students" && (
                <EmptyState title="Gestion des étudiants" />
              )}
              {activeTab === "payments" && (
                <EmptyState title="Suivi des paiements" />
              )}
              {activeTab === "communication" && (
                <EmptyState title="Messagerie" />
              )}
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default AdminDashboard;
