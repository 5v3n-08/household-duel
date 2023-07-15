export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      household: {
        Row: {
          id: string
          name: string | null
          owner_id: string | null
        }
        Insert: {
          id: string
          name?: string | null
          owner_id?: string | null
        }
        Update: {
          id?: string
          name?: string | null
          owner_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "household_owner_id_fkey"
            columns: ["owner_id"]
            referencedRelation: "users"
            referencedColumns: ["id"]
          }
        ]
      }
      household_members: {
        Row: {
          household_id: string | null
          is_admin: boolean | null
          user_id: string | null
        }
        Insert: {
          household_id?: string | null
          is_admin?: boolean | null
          user_id?: string | null
        }
        Update: {
          household_id?: string | null
          is_admin?: boolean | null
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "household_members_household_id_fkey"
            columns: ["household_id"]
            referencedRelation: "household"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "household_members_user_id_fkey"
            columns: ["user_id"]
            referencedRelation: "users"
            referencedColumns: ["id"]
          }
        ]
      }
      profiles: {
        Row: {
          avatar_filename: string | null
          avatarurl: string | null
          created_at: string | null
          firstname: string | null
          id: string
          lastname: string | null
          sidenav_collapsed: boolean | null
          title: string | null
          updated_at: string | null
          website: string | null
        }
        Insert: {
          avatar_filename?: string | null
          avatarurl?: string | null
          created_at?: string | null
          firstname?: string | null
          id: string
          lastname?: string | null
          sidenav_collapsed?: boolean | null
          title?: string | null
          updated_at?: string | null
          website?: string | null
        }
        Update: {
          avatar_filename?: string | null
          avatarurl?: string | null
          created_at?: string | null
          firstname?: string | null
          id?: string
          lastname?: string | null
          sidenav_collapsed?: boolean | null
          title?: string | null
          updated_at?: string | null
          website?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "profiles_id_fkey"
            columns: ["id"]
            referencedRelation: "users"
            referencedColumns: ["id"]
          }
        ]
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
      verify_user_password: {
        Args: {
          password: string
        }
        Returns: boolean
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
