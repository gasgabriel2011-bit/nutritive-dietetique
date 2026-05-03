import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { supabase } from "@/lib/supabase";

/**
 * @typedef {Object} AuthContextValue
 * @property {any} session
 * @property {any} user
 * @property {boolean} isAuthenticated
 * @property {boolean} isLoadingAuth
 * @property {boolean} isLoadingPublicSettings
 * @property {any} authError
 * @property {() => void} navigateToLogin
 */

/** @type {import('react').Context<AuthContextValue>} */
const AuthContext = createContext({
  session: null,
  user: null,
  isAuthenticated: false,
  isLoadingAuth: true,
  isLoadingPublicSettings: false,
  authError: null,
  navigateToLogin: () => {},
});

export function AuthProvider({ children }) {
  const [session, setSession] = useState(null);
  const [user, setUser] = useState(null);
  const [isLoadingAuth, setIsLoadingAuth] = useState(true);
  const [authError, setAuthError] = useState(null);

  useEffect(() => {
    if (!supabase) {
      setIsLoadingAuth(false);
      return undefined;
    }

    let isMounted = true;

    const hydrateSession = async () => {
      const { data: sessionData, error: sessionError } = await supabase.auth.getSession();
      const storedSession = sessionData?.session ?? null;

      if (!isMounted) {
        return;
      }

      if (sessionError || !storedSession) {
        setSession(null);
        setUser(null);
        setAuthError(sessionError ? { type: "session_error", message: sessionError.message } : null);
        setIsLoadingAuth(false);
        return;
      }

      setSession(storedSession);
      setUser(storedSession.user ?? null);
      setAuthError(null);
      setIsLoadingAuth(false);

      const { data: userData, error: userError } = await supabase.auth.getUser();

      if (!isMounted) {
        return;
      }

      if (userError || !userData.user) {
        setSession(storedSession);
        setUser(storedSession.user ?? null);
        setAuthError(null);
      } else {
        setSession({ ...storedSession, user: userData.user });
        setUser(userData.user);
        setAuthError(null);
      }
    };

    hydrateSession();

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((event, nextSession) => {
      if (event === "INITIAL_SESSION") {
        return;
      }

      setSession(nextSession ?? null);
      setUser(nextSession?.user ?? null);
      setAuthError(null);
      setIsLoadingAuth(false);
    });

    return () => {
      isMounted = false;
      subscription.unsubscribe();
    };
  }, []);

  const value = useMemo(
    () => ({
      session,
      user,
      isAuthenticated: !!user?.id && !!user?.email,
      isLoadingAuth,
      isLoadingPublicSettings: false,
      authError,
      navigateToLogin: () => {
        window.location.href = "/login";
      },
    }),
    [authError, isLoadingAuth, session, user]
  );

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
