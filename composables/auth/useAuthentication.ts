import { User } from '@supabase/supabase-js'
import type { AuthResponse, OAuthResponse } from '@supabase/gotrue-js/dist/module/lib/types.d.ts'
import { AuthError } from '@supabase/gotrue-js/dist/module/lib/errors'
const supabase = useSupabaseClient()

export const signInWithGoogle = async () => {
  return await supabase.auth.signInWithOAuth({
    provider: 'google'
  })
}
export const signInWithEmail = async (
  email: string,
  password: string
): Promise<AuthResponse> => {
  return await supabase.auth.signInWithPassword({
    email,
    password
  })
}

export const loginOAuth = async (provider: 'github' | 'google' | 'apple'): Promise<OAuthResponse> => {
  return await supabase.auth.signInWithOAuth({
    provider,
    options: {
      redirectTo: useRequestHeaders()?.host + '/dashboard'
    }
  })
}

export const logout = async (): Promise<{
  error: AuthError | null;
}> => {
  return await supabase.auth.signOut()
}

export const me = async (): Promise<User | null> => {
  return await useSupabaseUser().value
}
