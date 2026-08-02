import { createContext } from "react";
import type { AuthError, Session, User } from "@supabase/supabase-js";

export interface AuthContextType {
  user: User | null;
  session: Session | null;
  loading: boolean;

  signOut: () => Promise<{ error: AuthError | null }>;
}

export const AuthContext = createContext<AuthContextType | null>(null);