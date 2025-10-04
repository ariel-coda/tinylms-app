import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

// ✅ Client pour créer l'utilisateur (ANON KEY)
const supabaseClient = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

// ✅ Client admin pour créer l'abonnement (SERVICE ROLE KEY)
const supabaseAdmin = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!, // Cette clé a tous les droits
  {
    auth: {
      autoRefreshToken: false,
      persistSession: false,
    },
  }
);

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { fullName, phone, schoolName, schoolEmail, role, password } = body;

    console.log("📝 Données reçues:", { fullName, phone, schoolName, schoolEmail, role });

    // 1️⃣ Créer l'utilisateur avec ANON KEY
    const { data: authData, error: authError } = await supabaseClient.auth.signUp({
      email: schoolEmail,
      password: password,
      options: {
        data: {
          full_name: fullName,
          phone: phone,
          school_name: schoolName,
          role: role,
        },
      },
    });

    if (authError) {
      console.error("❌ Erreur auth:", authError);
      throw new Error(authError.message);
    }

    if (!authData.user) {
      throw new Error("Utilisateur non créé");
    }

    console.log("✅ Utilisateur créé:", authData.user.id);

    // 2️⃣ Créer l'abonnement avec SERVICE ROLE KEY (admin)
    const startDate = new Date();
    const endDate = new Date();
    endDate.setDate(endDate.getDate() + 30);

    const { data: subData, error: subError } = await supabaseAdmin
      .from("subscriptions")
      .insert({
        user_id: authData.user.id,
        plan: "trial",
        status: "active",
        start_date: startDate.toISOString(),
        end_date: endDate.toISOString(),
      })
      .select();

    if (subError) {
      console.error("❌ Erreur subscription:", subError);
      // Si l'abonnement échoue, on supprime l'utilisateur créé
      await supabaseAdmin.auth.admin.deleteUser(authData.user.id);
      throw new Error(`Abonnement: ${subError.message}`);
    }

    console.log("✅ Abonnement créé:", subData);

    return NextResponse.json(
      {
        success: true,
        message: "Inscription réussie ! Période d'essai de 30 jours activée.",
      },
      { status: 201 }
    );
  } catch (error: any) {
    console.error("💥 Erreur complète:", error);
    return NextResponse.json(
      { error: error.message || "Erreur d'inscription" },
      { status: 500 }
    );
  }
}