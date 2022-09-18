import { createUserWithEmailAndPassword, onAuthStateChanged, User, UserCredential } from 'firebase/auth';
import React, { useCallback, useContext, useEffect, useState } from 'react';
import { auth } from '../firebase';
import { TArgCallback } from '../types';

type TAuthContext = {
  currentUser: User|null;
  signUp: TArgCallback<TSignUpData, Promise<UserCredential>>;
}

const AuthContext = React.createContext<TAuthContext>({
  currentUser: null,
  signUp: () => new Promise((_, rej) => rej('Not set'))
});

export const useAuth = () => useContext(AuthContext);


type TSignUpData = { email: string; password: string; }
type TProps = { children?: React.ReactNode }

export const AuthProvider: React.FC<TProps> = ({ children }) => {
  const [currentUser, setCurrentUser] = useState<User|null>(null);

  const signUp = useCallback<TAuthContext['signUp']>(({ email, password }) => {
    return createUserWithEmailAndPassword(auth, email, password);
  }, []);
  useEffect(() => {
    const callback = onAuthStateChanged(auth, (user) => {
      setCurrentUser(user)
    });
    return callback;
  }, []);

  return <AuthContext.Provider value={{currentUser, signUp}}>
    {children}
  </AuthContext.Provider>
}