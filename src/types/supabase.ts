export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  public: {
    Tables: {
      blog: {
        Row: {
          blog_name: string | null
          description: string | null
          id: string
          nickname: string | null
          user_id: string | null
        }
        Insert: {
          blog_name?: string | null
          description?: string | null
          id?: string
          nickname?: string | null
          user_id?: string | null
        }
        Update: {
          blog_name?: string | null
          description?: string | null
          id?: string
          nickname?: string | null
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "blog_nickname_fkey"
            columns: ["nickname"]
            isOneToOne: true
            referencedRelation: "users"
            referencedColumns: ["nickname"]
          },
          {
            foreignKeyName: "blog_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: true
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      comments: {
        Row: {
          content: string | null
          created_at: string
          id: string
          nickname: string | null
          post_id: string | null
          user_id: string | null
        }
        Insert: {
          content?: string | null
          created_at?: string
          id?: string
          nickname?: string | null
          post_id?: string | null
          user_id?: string | null
        }
        Update: {
          content?: string | null
          created_at?: string
          id?: string
          nickname?: string | null
          post_id?: string | null
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "comments_nickname_fkey"
            columns: ["nickname"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["nickname"]
          },
          {
            foreignKeyName: "comments_post_id_fkey"
            columns: ["post_id"]
            isOneToOne: false
            referencedRelation: "post"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "comments_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      emotion: {
        Row: {
          blog_id: string | null
          created_at: string
          date: string | null
          emotion: string | null
          id: string
          user_id: string | null
        }
        Insert: {
          blog_id?: string | null
          created_at?: string
          date?: string | null
          emotion?: string | null
          id?: string
          user_id?: string | null
        }
        Update: {
          blog_id?: string | null
          created_at?: string
          date?: string | null
          emotion?: string | null
          id?: string
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "emotion_blog_id_fkey"
            columns: ["blog_id"]
            isOneToOne: false
            referencedRelation: "blog"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "emotion_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      post: {
        Row: {
          blog_id: string | null
          blog_name: string | null
          content: string | null
          created_at: string
          id: string
          img_url: string | null
          nickname: string | null
          title: string | null
          user_id: string
        }
        Insert: {
          blog_id?: string | null
          blog_name?: string | null
          content?: string | null
          created_at?: string
          id?: string
          img_url?: string | null
          nickname?: string | null
          title?: string | null
          user_id: string
        }
        Update: {
          blog_id?: string | null
          blog_name?: string | null
          content?: string | null
          created_at?: string
          id?: string
          img_url?: string | null
          nickname?: string | null
          title?: string | null
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "post_blog_id_fkey"
            columns: ["blog_id"]
            isOneToOne: false
            referencedRelation: "blog"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "post_blog_name_fkey"
            columns: ["blog_name"]
            isOneToOne: false
            referencedRelation: "blog"
            referencedColumns: ["blog_name"]
          },
          {
            foreignKeyName: "post_nickname_fkey"
            columns: ["nickname"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["nickname"]
          },
          {
            foreignKeyName: "post_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      users: {
        Row: {
          email: string | null
          id: string
          nickname: string | null
        }
        Insert: {
          email?: string | null
          id?: string
          nickname?: string | null
        }
        Update: {
          email?: string | null
          id?: string
          nickname?: string | null
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type PublicSchema = Database[Extract<keyof Database, "public">]

export type Tables<
  PublicTableNameOrOptions extends
    | keyof (PublicSchema["Tables"] & PublicSchema["Views"])
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
        Database[PublicTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
      Database[PublicTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : PublicTableNameOrOptions extends keyof (PublicSchema["Tables"] &
        PublicSchema["Views"])
    ? (PublicSchema["Tables"] &
        PublicSchema["Views"])[PublicTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  PublicEnumNameOrOptions extends
    | keyof PublicSchema["Enums"]
    | { schema: keyof Database },
  EnumName extends PublicEnumNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = PublicEnumNameOrOptions extends { schema: keyof Database }
  ? Database[PublicEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : PublicEnumNameOrOptions extends keyof PublicSchema["Enums"]
    ? PublicSchema["Enums"][PublicEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof PublicSchema["CompositeTypes"]
    | { schema: keyof Database },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends { schema: keyof Database }
  ? Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof PublicSchema["CompositeTypes"]
    ? PublicSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never
