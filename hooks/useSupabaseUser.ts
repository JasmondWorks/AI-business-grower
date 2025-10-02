"use client";

import { createClient } from "@/lib/supabase";
import { useQuery } from "@tanstack/react-query";

export function useSupabaseUser() {
  const supabase = createClient();

  return useQuery({
    queryKey: ["supabase-user"],
    queryFn: async () => {
      const {
        data: { user },
        error,
      } = await supabase.auth.getUser();
      if (error) {
        throw error;
      }
      return user;
    },
    staleTime: 60_000,
  });
}