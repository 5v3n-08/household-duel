import { User } from '@supabase/supabase-js'
import type { AuthResponse, OAuthResponse } from '@supabase/gotrue-js/dist/module/lib/types.d.ts'
import { AuthError } from '@supabase/gotrue-js/dist/module/lib/errors'
const supabase = useSupabaseClient()
const config = useRuntimeConfig()

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
export const registerWithEmail = async (
  email: string,
  password: string,
  firstname?: string,
  lastname?: string
): Promise<AuthResponse> => {
  return await supabase.auth.signUp(
    {
      email,
      password,
      options: {
        data: {
          firstname,
          lastname
        },
        emailRedirectTo: config.public.redirectUrl + '/dashboard'
      }
    }
  )
}

export const loginOAuth = async (provider: 'github' | 'google' | 'apple'): Promise<OAuthResponse> => {
  return await supabase.auth.signInWithOAuth({
    provider,
    options: {
      redirectTo: config.public.redirectUrl + '/dashboard'
    }
  })
}

export const registerOAuth = async (provider: 'github' | 'google' | 'apple'): Promise<OAuthResponse> => {
  return await supabase.auth.signInWithOAuth({
    provider,
    options: {
      redirectTo: config.public.redirectUrl + '/dashboard'
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
