"use client";

import React, { useState } from "react";
import { Bird, Mail, Lock } from "lucide-react";
import { useRouter } from "next/navigation";

const LoginPage = () => {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log({ email, password });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-white px-4">
      <div className="w-full max-w-md bg-white rounded-2xl p-8">
        {/* Logo & Title */}
        <div className="flex flex-col items-center mb-8">
          <div className="flex items-center space-x-2 mb-4">
            {/* Logo */}
            <div className="flex items-center justify-center w-16 h-16 rounded-2xl bg-slate-900 mb-4">
              <Bird size={38} className="text-emerald-400" />
            </div>
            <h1 className="hidden">TinyLMS</h1>
          </div>
          <h2 className="text-2xl font-bold text-slate-800">Connexion</h2>
          <p className="text-slate-500 text-sm">
            Connectez-vous à votre compte administrateur
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-slate-700 mb-2"
            >
              Adresse email
            </label>
            <div className="relative">
              <Mail
                size={18}
                className="absolute left-3 top-3 text-slate-400"
              />
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="exemple@email.com"
                required
                className="w-full pl-10 pr-4 py-2.5 border border-slate-300 rounded-lg text-sm focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
              />
            </div>
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
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                required
                className="w-full pl-10 pr-4 py-2.5 border border-slate-300 rounded-lg text-sm focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
              />
            </div>
          </div>

          <button
            type="submit"
            className="w-full py-3 bg-emerald-600 text-white rounded-lg font-medium hover:bg-emerald-700 transition-colors"
          >
            Se connecter
          </button>
        </form>

        {/* Footer */}
        <div className="mt-6 text-center text-sm text-slate-500">
          En vous inscrivant à TinyLMS, vous acceptez nos{" "}
          <a href="#" className="text-emerald-600 hover:underline font-medium">
            conditions d’utilisation
          </a>
          .
        </div>
        <p className="text-center mt-5">
          Vous n'avez pas de compte ?{" "}
          <button
            className="underline text-emerald-600"
            onClick={() => router.push("./")}
          >
            Inscrivez vous ici
          </button>
        </p>
      </div>
    </div>
  );
};

export default LoginPage;
