"use client";
import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { useRouter } from "next/navigation";
import * as Yup from "yup";
import {
  createUserWithEmailAndPassword,
  updateProfile,
  sendEmailVerification,
} from "firebase/auth";
import { doc, setDoc, serverTimestamp } from "firebase/firestore";
import { auth, db } from "./lib/firebase";
import Header from "./components/ui/header";

// Regex personnalisées
const nomCompletRegex = /^[a-zA-ZÀ-ÿ]+([\s'-][a-zA-ZÀ-ÿ]+)+$/;
const telephoneRegex = /^\+237[26]\d{8}$/;
const nomStructureRegex = /^[a-zA-Z0-9À-ÿ]+([\s'-][a-zA-Z0-9À-ÿ]+)*$/;
const roleRegex = /^[a-zA-ZÀ-ÿ]+([\s'-][a-zA-ZÀ-ÿ]+)*$/;
const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
const motDePasseSecuriseRegex =
  /(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&#_])[A-Za-z\d@$!%*?&#_]{8,}/;

// Validation Yup
const validationSchema = Yup.object({
  nomComplet: Yup.string()
    .matches(nomCompletRegex, "Nom complet invalide.")
    .required("Le nom complet est obligatoire."),
  telephone: Yup.string()
    .matches(telephoneRegex, "Numéro de téléphone invalide.")
    .required("Le numéro de téléphone est obligatoire."),
  role: Yup.string()
    .matches(roleRegex, "Rôle invalide.")
    .required("Le rôle est obligatoire."),
  structure: Yup.string()
    .matches(nomStructureRegex, "Nom de structure invalide.")
    .required("La structure est obligatoire."),
  email: Yup.string()
    .matches(emailRegex, "Email invalide.")
    .required("L'email est obligatoire."),
  password: Yup.string()
    .matches(
      motDePasseSecuriseRegex,
      "Le mot de passe doit contenir au moins 8 caractères, une majuscule, une minuscule, un chiffre et un symbole."
    )
    .required("Le mot de passe est obligatoire."),
});

export default function Formulaire() {
  const router = useRouter();

  const handleFirebaseSignup = async (
    values: any,
    {
      setStatus,
      setSubmitting,
      setFieldError,
      resetForm,
    }: {
      setStatus: (status?: any) => void;
      setSubmitting: (isSubmitting: boolean) => void;
      setFieldError: (field: string, message: string) => void;
      resetForm: () => void;
    }
  ) => {
    setSubmitting(true);
    setStatus(undefined);
    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        values.email,
        values.password
      );
      const user = userCredential.user;

      await updateProfile(user, { displayName: values.nomComplet });
      await sendEmailVerification(user);

      await setDoc(doc(db, "users", user.uid), {
        uid: user.uid,
        ...values,
        createdAt: serverTimestamp(),
        emailVerified: user.emailVerified ?? false,
      });

      resetForm();
      setStatus({
        success:
          "Compte créé avec succès ! Vérifiez votre email pour valider le compte.",
      });
      router.push("./solutions");
    } catch (err) {
      const code = (err as { code?: string })?.code ?? "";
      if (code.includes("email-already-in-use"))
        setFieldError("email", "Cet email est déjà utilisé.");
      else if (code.includes("invalid-email"))
        setFieldError("email", "Adresse email invalide.");
      else if (code.includes("weak-password"))
        setFieldError("password", "Mot de passe trop faible.");
      else
        setStatus({
          error:
            "Erreur serveur. Vérifiez votre connexion internet ou réessayez ultérieurement.",
        });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <>
      <Header />
      <div className="min-h-screen bg-white pt-28 sm:pt-32 pb-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-xl mx-auto text-center">
          <h1 className="text-3xl sm:text-4xl font-semibold text-gray-900 mb-3 leading-tight">
            Créez votre compte
          </h1>
          <p className="text-sm sm:text-base text-gray-600 max-w-md mx-auto mb-10">
            Remplissez les informations ci-dessous pour accéder à nos solutions
            TinyDock.
          </p>

          <Formik
            initialValues={{
              nomComplet: "",
              telephone: "",
              role: "",
              structure: "",
              email: "",
              password: "",
            }}
            validationSchema={validationSchema}
            onSubmit={handleFirebaseSignup}
          >
            {({ isSubmitting, status }) => (
              <Form className="bg-white rounded-xl px-6 py-0 sm:px-10 space-y-5 text-left">
                {/* Messages globaux */}
                {status?.success && (
                  <p className="text-green-600 font-medium text-sm text-center">
                    {status.success}
                  </p>
                )}
                {status?.error && (
                  <p className="text-red-600 font-medium text-sm text-center">
                    {status.error}
                  </p>
                )}

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Nom complet
                    </label>
                    <Field
                      name="nomComplet"
                      placeholder="Monsieur Untel"
                      className="w-full border border-gray-200 rounded-lg px-4 py-2 focus:outline-none focus:border-blue-400"
                    />
                    <ErrorMessage
                      name="nomComplet"
                      component="p"
                      className="text-red-600 text-xs mt-1"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Téléphone
                    </label>
                    <Field
                      name="telephone"
                      placeholder="+2376XXXXXXXX"
                      className="w-full border border-gray-200 rounded-lg px-4 py-2 focus:outline-none focus:border-blue-400"
                    />
                    <ErrorMessage
                      name="telephone"
                      component="p"
                      className="text-red-600 text-xs mt-1"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Rôle
                  </label>
                  <Field
                    name="role"
                    placeholder="Directeur, Manager..."
                    className="w-full border border-gray-200 rounded-lg px-4 py-2 focus:outline-none focus:border-blue-400"
                  />
                  <ErrorMessage
                    name="role"
                    component="p"
                    className="text-red-600 text-xs mt-1"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Structure
                  </label>
                  <Field
                    name="structure"
                    placeholder="MonEntreprise"
                    className="w-full border border-gray-200 rounded-lg px-4 py-2 focus:outline-none focus:border-blue-400"
                  />
                  <ErrorMessage
                    name="structure"
                    component="p"
                    className="text-red-600 text-xs mt-1"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Email professionnel
                  </label>
                  <Field
                    name="email"
                    type="email"
                    placeholder="exemple@entreprise.com"
                    className="w-full border border-gray-200 rounded-lg px-4 py-2 focus:outline-none focus:border-blue-400"
                  />
                  <ErrorMessage
                    name="email"
                    component="p"
                    className="text-red-600 text-xs mt-1"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Mot de passe
                  </label>
                  <Field
                    name="password"
                    type="password"
                    placeholder="********"
                    className="w-full border border-gray-200 rounded-lg px-4 py-2 focus:outline-none focus:border-blue-400"
                  />
                  <ErrorMessage
                    name="password"
                    component="p"
                    className="text-red-600 text-xs mt-1"
                  />
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-[#29abe2] hover:bg-[#219bd0] text-white py-3 rounded-lg font-medium transition"
                >
                  {isSubmitting
                    ? "Inscription en cours..."
                    : "Créer mon compte"}
                </button>
              </Form>
            )}
          </Formik>

          <p className="text-sm text-gray-500 text-center mt-3">
            En vous inscrivant, vous acceptez{" "}
            <span className="text-blue-500 underline">
              les conditions d’utilisation
            </span>{" "}
            de TinyDock.
          </p>
        </div>
      </div>
    </>
  );
}
