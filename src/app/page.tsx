"use client";

import { useState } from "react";
import { Bird, Mail, Lock, Phone, User, Building2, Shield } from "lucide-react";
import { useRouter } from "next/navigation";

export default function SignupPage() {
  const router = useRouter();
  const [step, setStep] = useState(1);
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const [formData, setFormData] = useState({
    fullName: "",
    phone: "",
    schoolName: "",
    schoolEmail: "",
    role: "",
    password: "",
  });

  const regex = {
    fullName: /^[a-zA-ZÀ-ÿ]+(?: [a-zA-ZÀ-ÿ]+)+$/,
    phone: /^6[5679][0-9]{7}$/,
    email: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
    password: /^.{6,}$/,
  };

  const validateStep1 = () => {
    let newErrors: { [key: string]: string } = {};

    if (!regex.fullName.test(formData.fullName))
      newErrors.fullName = "Nom complet invalide (au moins 2 mots).";
    if (!regex.phone.test(formData.phone))
      newErrors.phone =
        "Numéro invalide (format Cameroun: 65/66/67/69xxxxxxx).";
    if (!formData.schoolName.trim())
      newErrors.schoolName = "Le nom de l'établissement est obligatoire.";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const validateStep2 = () => {
    let newErrors: { [key: string]: string } = {};

    if (!regex.email.test(formData.schoolEmail))
      newErrors.schoolEmail = "Email invalide.";
    if (!formData.role.trim()) newErrors.role = "Veuillez choisir un rôle.";
    if (!regex.password.test(formData.password))
      newErrors.password = "Mot de passe : min. 6 caractères.";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleNext = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateStep1()) {
      setStep(2);
      setErrors({});
    }
  };

  const handleBack = () => {
    setStep(1);
    setErrors({});
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateStep2()) return;

    setLoading(true);
    setMessage("");

    try {
      console.log("📤 Envoi des données:", formData);

      const res = await fetch("/api/inscription", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await res.json();
      console.log("📥 Réponse API:", data);

      if (!res.ok) {
        throw new Error(data.error || "Erreur d'inscription");
      }

      setMessage("✅ " + data.message);
      setTimeout(() => router.push("/login"), 2000);
    } catch (err: any) {
      console.error("💥 Erreur:", err);
      setMessage("❌ " + err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-white px-4">
      <div className="w-full max-w-md bg-white rounded-2xl p-8">
        {/* Logo & Title */}
        <div className="flex flex-col items-center mb-8">
          <div className="flex items-center space-x-2 mb-4">
            <div className="flex items-center justify-center w-16 h-16 rounded-2xl bg-slate-900 mb-4">
              <Bird size={38} className="text-emerald-400" />
            </div>
            <h1 className="hidden">TinyLMS</h1>
          </div>
          <h2 className="text-2xl font-bold text-slate-800">
            {step === 1 ? "Créer un compte" : "Finaliser l'inscription"}
          </h2>
          <p className="text-slate-500 text-center mt-3 text-sm">
            {step === 1
              ? "Rejoignez TinyLMS et simplifiez la gestion de vos formations."
              : "Complétez vos informations de connexion."}
          </p>
        </div>

        {/* Step 1 Form */}
        {step === 1 && (
          <div className="space-y-5">
            <div>
              <label
                htmlFor="fullName"
                className="block text-sm font-medium text-slate-700 mb-2"
              >
                Nom complet
              </label>
              <div className="relative">
                <User
                  size={18}
                  className="absolute left-3 top-3 text-slate-400"
                />
                <input
                  id="fullName"
                  name="fullName"
                  type="text"
                  value={formData.fullName}
                  onChange={handleChange}
                  placeholder="BANAKEN Ariel"
                  className="w-full pl-10 pr-4 py-2.5 border border-slate-300 rounded-lg text-sm focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                />
              </div>
              {errors.fullName && (
                <p className="text-red-500 text-sm mt-1">{errors.fullName}</p>
              )}
            </div>

            <div>
              <label
                htmlFor="phone"
                className="block text-sm font-medium text-slate-700 mb-2"
              >
                Numéro de téléphone
              </label>
              <div className="relative">
                <Phone
                  size={18}
                  className="absolute left-3 top-3 text-slate-400"
                />
                <input
                  id="phone"
                  name="phone"
                  type="tel"
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder="6XXXXXXXX"
                  className="w-full pl-10 pr-4 py-2.5 border border-slate-300 rounded-lg text-sm focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                />
              </div>
              {errors.phone && (
                <p className="text-red-500 text-sm mt-1">{errors.phone}</p>
              )}
            </div>

            <div>
              <label
                htmlFor="schoolName"
                className="block text-sm font-medium text-slate-700 mb-2"
              >
                Nom de l'établissement
              </label>
              <div className="relative">
                <Building2
                  size={18}
                  className="absolute left-3 top-3 text-slate-400"
                />
                <input
                  id="schoolName"
                  name="schoolName"
                  type="text"
                  value={formData.schoolName}
                  onChange={handleChange}
                  placeholder="Centre de formation XYZ"
                  className="w-full pl-10 pr-4 py-2.5 border border-slate-300 rounded-lg text-sm focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                />
              </div>
              {errors.schoolName && (
                <p className="text-red-500 text-sm mt-1">{errors.schoolName}</p>
              )}
            </div>

            <button
              onClick={handleNext}
              className="w-full py-3 bg-emerald-600 text-white rounded-lg font-medium hover:bg-emerald-700 transition-colors"
            >
              Continuer
            </button>
          </div>
        )}

        {/* Step 2 Form */}
        {step === 2 && (
          <div className="space-y-5">
            <div>
              <label
                htmlFor="schoolEmail"
                className="block text-sm font-medium text-slate-700 mb-2"
              >
                Email de l'établissement
              </label>
              <div className="relative">
                <Mail
                  size={18}
                  className="absolute left-3 top-3 text-slate-400"
                />
                <input
                  id="schoolEmail"
                  name="schoolEmail"
                  type="email"
                  value={formData.schoolEmail}
                  onChange={handleChange}
                  placeholder="contact@etablissement.com"
                  className="w-full pl-10 pr-4 py-2.5 border border-slate-300 rounded-lg text-sm focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                />
              </div>
              {errors.schoolEmail && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.schoolEmail}
                </p>
              )}
            </div>

            <div>
              <label
                htmlFor="role"
                className="block text-sm font-medium text-slate-700 mb-2"
              >
                Rôle
              </label>
              <div className="relative">
                <Shield
                  size={18}
                  className="absolute left-3 top-3 text-slate-400"
                />
                <select
                  id="role"
                  name="role"
                  value={formData.role}
                  onChange={handleChange}
                  className="w-full pl-10 pr-4 py-2.5 border border-slate-300 rounded-lg text-sm focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 bg-white"
                >
                  <option value="">Sélectionnez un rôle</option>
                  <option value="administrateur">Directeur du centre</option>
                  <option value="responsable">Responsable pédagogique</option>
                  <option value="enseignant">Enseignant</option>
                </select>
              </div>
              {errors.role && (
                <p className="text-red-500 text-sm mt-1">{errors.role}</p>
              )}
            </div>

            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium text-slate-700 mb-2"
              >
                Mot de passe
              </label>
              <div className="relative">
                <Lock
                  size={18}
                  className="absolute left-3 top-3 text-slate-400"
                />
                <input
                  id="password"
                  name="password"
                  type="password"
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="••••••••"
                  className="w-full pl-10 pr-4 py-2.5 border border-slate-300 rounded-lg text-sm focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                />
              </div>
              {errors.password && (
                <p className="text-red-500 text-sm mt-1">{errors.password}</p>
              )}
            </div>

            <div className="space-y-3">
              <button
                onClick={handleSubmit}
                className="w-full py-3 bg-emerald-600 text-white rounded-lg font-medium hover:bg-emerald-700 transition-colors"
              >
                S'inscrire
              </button>
              <button
                onClick={handleBack}
                className="w-full py-3 bg-slate-100 text-slate-700 rounded-lg font-medium hover:bg-slate-200 transition-colors"
              >
                Retour
              </button>
            </div>
          </div>
        )}

        {/* Footer */}
        <div className="mt-6 text-center text-sm text-slate-500">
          En vous inscrivant à TinyLMS, vous acceptez nos{" "}
          <a href="#" className="text-emerald-600 hover:underline font-medium">
            conditions d'utilisation
          </a>
          .
        </div>
        <p className="text-center mt-5 text-sm text-slate-500">
          Vous avez déjà un compte ?{" "}
          <button
            className="underline text-emerald-600"
            onClick={() => {
              router.push("./login");
            }}
          >
            Connectez vous ici
          </button>
        </p>
      </div>
    </div>
  );
}
