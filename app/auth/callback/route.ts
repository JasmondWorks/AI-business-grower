import { createServerClient } from "@supabase/ssr";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const { searchParams, origin } = new URL(request.url);
  const code = searchParams.get("code");
  const next = searchParams.get("next") ?? "/";

  if (code) {
    const response = NextResponse.redirect(`${origin}${next}`);
    const supabase = createServerClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
      {
        cookies: {
          getAll() {
            return request.cookies.getAll();
          },
          setAll(cookiesToSet) {
            cookiesToSet.forEach(({ name, value, options }) =>
              response.cookies.set(name, value, options)
            );
          },
        },
      }
    );

    const { data, error } = await supabase.auth.exchangeCodeForSession(code);
    if (!error && data.user) {
      // Save provider account if it's an OAuth login
      const provider = data.user.app_metadata?.provider;
      if (provider) {
        const { error: insertError } = await supabase
          .from("provider_accounts")
          .upsert({
            user_id: data.user.id,
            provider: provider,
            access_token: data.session?.access_token,
            scopes: [], // Will be updated based on provider
          });
        if (insertError) {
          console.error("Error saving provider account:", insertError);
        }
      }
      return response;
    }
  }

  return NextResponse.redirect(`${origin}/login`);
}
