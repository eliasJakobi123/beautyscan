import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { Session, User } from '@supabase/supabase-js';
import { supabase } from '@/lib/supabaseClient';
import { setupUserProfileAfterAuth } from '@/lib/supabaseService';

interface AuthContextType {
  user: User | null;
  session: Session | null;
  isLoading: boolean;
  isPremium: boolean;
  signOut: () => Promise<void>;
  togglePremiumStatus: () => Promise<void>;
  signInWithPassword: (email: string, password: string) => Promise<void>;
  signUpWithPassword: (email: string, password: string, name?: string) => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isPremium, setIsPremium] = useState<boolean>(false);

  useEffect(() => {
    const getSession = async () => {
      try {
        const { data, error } = await supabase.auth.getSession();
        if (error) throw error;
        
        setSession(data.session);
        const currentUser = data.session?.user ?? null;
        setUser(currentUser);
        
        if (currentUser) {
          await setupUserProfileAfterAuth();
          await checkPremiumStatus(currentUser);
        }
      } catch (error) {
        console.error("Error getting session:", error);
      } finally {
        setIsLoading(false);
      }
    };

    getSession();

    const { data: authListener } = supabase.auth.onAuthStateChange(
      async (_event, session) => {
        setSession(session);
        const currentUser = session?.user ?? null;
        setUser(currentUser);
        
        if (currentUser) {
          await setupUserProfileAfterAuth();
          await checkPremiumStatus(currentUser);
        } else {
          setIsPremium(false);
        }
        setIsLoading(false);
      }
    );

    return () => {
      authListener.subscription.unsubscribe();
    };
  }, []);

  const checkPremiumStatus = async (currentUser: User) => {
    try {
      const { data, error } = await supabase
        .from('profiles')
        .select('is_premium')
        .eq('id', currentUser.id)
        .single();

      if (error && error.code !== 'PGRST116') { // Ignore "no rows found" error
        throw error;
      }
      
      setIsPremium(data?.is_premium || false);
    } catch (error) {
      console.error('Error checking premium status:', error);
      setIsPremium(false); // Default to non-premium on error
    }
  };

  const handleSignOut = async () => {
    setIsLoading(true);
    const { error } = await supabase.auth.signOut();
    if (error) {
      console.error('Error signing out:', error);
    }
    // State will be cleared by onAuthStateChange listener
    setIsLoading(false);
  };
  
  const signInWithPassword = async (email: string, password: string) => {
    setIsLoading(true);
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) {
        console.error('Error signing in:', error);
        setIsLoading(false);
        throw error;
    }
    // Nach Login: Session/User explizit neu laden
    const { data } = await supabase.auth.getSession();
    setSession(data.session);
    setUser(data.session?.user ?? null);
    setIsLoading(false);
  };

  const togglePremiumStatus = async () => {
    if (!user) {
      console.error("User not logged in, cannot toggle premium status.");
      return;
    }

    const newPremiumStatus = !isPremium;
    setIsPremium(newPremiumStatus); // Optimistic update for immediate UI feedback

    const { error } = await supabase
      .from('profiles')
      .update({ is_premium: newPremiumStatus })
      .eq('id', user.id);

    if (error) {
      console.error("Error updating premium status in DB:", error);
      setIsPremium(!newPremiumStatus); // Revert UI on failure
      // Consider showing a toast message to the user here
    }
  };

  const signUpWithPassword = async (email: string, password: string, name?: string) => {
    setIsLoading(true);
    const { data, error } = await supabase.auth.signUp({ email, password });
    if (error) {
      console.error('Error signing up:', error);
      setIsLoading(false);
      throw error;
    }
    // Optional: Profil in der DB anlegen/aktualisieren
    if (data.user) {
      // Sicherstellen, dass die ID eine gültige UUID ist
      const uuidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;
      if (!uuidRegex.test(data.user.id)) {
        console.error('❌ Ungültige User-ID, kein UUID:', data.user.id);
        throw new Error('User-ID ist keine gültige UUID!');
      }
      await supabase.from('profiles').upsert({ id: data.user.id, email, name });
    }
    setIsLoading(false);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        session,
        isLoading,
        isPremium,
        signOut: handleSignOut,
        togglePremiumStatus,
        signInWithPassword,
        signUpWithPassword,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
