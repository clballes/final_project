import { createClient } from "@supabase/supabase-js";

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;
export const supabase = createClient(supabaseUrl, supabaseAnonKey);

function loginGoogle() {
    const { user, session, error } = supabase.auth.signIn({
        provider: 'google'
      })
};
function logOutGoogle() {
    const { error } = supabase.auth.signOut()
};