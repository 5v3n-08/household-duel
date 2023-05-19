export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json }
  | Json[]

export interface Database {
  public: {
    Tables: {
      profiles: {
        Row: {
          avatar_filename: string | null
          firstname: string | null
          full_name: string | null
          id: string
          lastname: string | null
          updated_at: string | null
          username: string | null
          website: string | null
        }
        Insert: {
          avatar_filename?: string | null
          firstname?: string | null
          full_name?: string | null
          id: string
          lastname?: string | null
          updated_at?: string | null
          username?: string | null
          website?: string | null
        }
        Update: {
          avatar_filename?: string | null
          firstname?: string | null
          full_name?: string | null
          id?: string
          lastname?: string | null
          updated_at?: string | null
          username?: string | null
          website?: string | null
        }
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      delete_avatar: {
        Args: {
          avatar_url: string
        }
        Returns: Record<string, unknown>
      }
      delete_storage_object: {
        Args: {
          bucket: string
          object: string
        }
        Returns: Record<string, unknown>
      }
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}
