import * as Yup from "yup";

const nomCompletRegex = /^[a-zA-ZÀ-ÿ]+([\s'-][a-zA-ZÀ-ÿ]+)+$/;
const telephoneRegex = /^\+237[26]\d{8}$/;
const nomStructureRegex = /^[a-zA-Z0-9À-ÿ]+([\s'-][a-zA-Z0-9À-ÿ]+)*$/;
const roleRegex = /^[a-zA-ZÀ-ÿ]+([\s'-][a-zA-ZÀ-ÿ]+)*$/;
const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
const motDePasseSecuriseRegex =
/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&#_])[A-Za-z\d@$!%*?&#_]{8,}/


const validationSchema = Yup.object({
  nomComplet: Yup.string()
    .matches(nomCompletRegex, "Nom complet invalide")
    .required("Nom complet requis"),

  telephone: Yup.string()
    .matches(telephoneRegex, "Numéro invalide (format : +2376XXXXXXXX)")
    .required("Téléphone requis"),

  role: Yup.string()
    .matches(roleRegex, "Rôle invalide")
    .required("Rôle requis"),

  structure: Yup.string()
    .matches(nomStructureRegex, "Nom de structure invalide")
    .required("Structure requise"),

  email: Yup.string()
    .matches(emailRegex, "Email invalide")
    .required("Email requis"),

  password: Yup.string()
    .matches(
      motDePasseSecuriseRegex,
      "8 caractères min, 1 maj, 1 min, 1 chiffre et 1 symbole"
    )
    .required("Mot de passe requis"),
});

export default validationSchema;