import React, { createContext, useContext, useEffect, useState } from 'react';
import { onAuthStateChanged, signOut as firebaseSignOut, type User } from 'firebase/auth';
import { auth } from '../firebase';

interface AuthContextType {
  user: User | null;
  loading: boolean;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  loading: true,
  logout: async () => {},
});

export const useAuth = () => useContext(AuthContext);

// 12 hours in milliseconds
const SESSION_TIMEOUT_MS = 12 * 60 * 60 * 1000;

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  const logout = async () => {
    await firebaseSignOut(auth);
    localStorage.removeItem('loginTimestamp');
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) {
        // Check session age
        const loginTimestamp = localStorage.getItem('loginTimestamp');
        if (loginTimestamp) {
          const timeElapsed = Date.now() - parseInt(loginTimestamp, 10);
          if (timeElapsed > SESSION_TIMEOUT_MS) {
            // Session expired
            logout();
            return;
          }
        } else {
          // If no timestamp exists but user is logged in, set it now
          localStorage.setItem('loginTimestamp', Date.now().toString());
        }
        setUser(currentUser);
      } else {
        setUser(null);
        localStorage.removeItem('loginTimestamp');
      }
      setLoading(false);
    });

    // Check expiration periodically (every minute)
    const interval = setInterval(() => {
      const loginTimestamp = localStorage.getItem('loginTimestamp');
      if (user && loginTimestamp) {
        const timeElapsed = Date.now() - parseInt(loginTimestamp, 10);
        if (timeElapsed > SESSION_TIMEOUT_MS) {
          logout();
        }
      }
    }, 60000);

    return () => {
      unsubscribe();
      clearInterval(interval);
    };
  }, [user]);

  return (
    <AuthContext.Provider value={{ user, loading, logout }}>
      {!loading && children}
    </AuthContext.Provider>
  );
};
