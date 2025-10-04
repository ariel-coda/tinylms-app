import { supabaseAdmin } from "./supabase";

export interface SignUpData {
  email: string;
  password: string;
  fullName: string;
  phone: string;
  schoolName: string;
  role: string;
}

export const signUpUser = async (data: SignUpData) => {
  const { email, password, fullName, phone, schoolName, role } = data;

  try {
    // Étape 1 : Créer l'utilisateur dans Supabase Auth
    const { data: authData, error: authError } = await supabaseAdmin.auth.admin.createUser({
      email,
      password,
      email_confirm: true, // Confirme automatiquement l'email
      user_metadata: {
        full_name: fullName,
        phone,
        school_name: schoolName,
        role,
      },
    });

    if (authError) {
      throw new Error(authError.message);
    }

    if (!authData.user) {
      throw new Error("Erreur lors de la création de l'utilisateur");
    }

    // Étape 2 : Créer l'abonnement trial de 30 jours
    const startDate = new Date();
    const endDate = new Date();
    endDate.setDate(endDate.getDate() + 30); // Ajoute 30 jours

    const { error: subscriptionError } = await supabaseAdmin
      .from("subscriptions")
      .insert({
        user_id: authData.user.id,
        plan: "trial",
        status: "active",
        start_date: startDate.toISOString(),
        end_date: endDate.toISOString(),
      });

    if (subscriptionError) {
      console.error("Détails erreur subscription:", subscriptionError);
      // Si l'abonnement échoue, on supprime l'utilisateur créé
      await supabaseAdmin.auth.admin.deleteUser(authData.user.id);
      throw new Error(`Erreur abonnement: ${subscriptionError.message} (Code: ${subscriptionError.code})`);
    }

    return {
      success: true,
      user: authData.user,
      message: "Inscription réussie ! Votre période d'essai de 30 jours a commencé.",
    };
  } catch (error: any) {
    console.error("Erreur signUpUser:", error);
    throw error;
  }
};