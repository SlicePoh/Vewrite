import React, { useContext, useEffect, useState } from "react";
import { createUserDocument } from "firebase-config";

import { auth, provider } from "firebase-config/firebase-config";

import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
} from "firebase/auth";

const AuthContext = React.createContext();

export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Sign-up function
  async function signUp(email, password) {
    console.log(email, password);
    const response = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );
    const user = await response.user;
    return user;
  }

  // Sign-in function
  function signIn(email, password) {
    return signInWithEmailAndPassword(auth, email, password);
  }

  // Sign-out function
  function logOut() {
    return signOut(auth);
  }

  // Password reset function
  function resetPassword(email) {
    return sendPasswordResetEmail(auth, email);
  }

  async function signUpWithGoogle() {
    try {
      const result = await signInWithPopup(auth, provider);

      const user = result.user;

      console.log("Signed up with google:", result.user);
      await createUserDocument(currentUser.uid, user);
      return user;
    } catch (error) {
      console.error("error signing up with google", error);
      throw error;
    }
  }

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (authUser) => {
      if (authUser) {
        setCurrentUser(authUser);
      } else {
        setCurrentUser(null);
      }
      setLoading(false);
    });

    return () => {
      unsubscribe();
    };
  }, []);

  const value = {
    currentUser,
    signUp,
    signIn,
    resetPassword,
    logOut,
    signUpWithGoogle,
  };

  if (loading) {
    return <h2>Loading</h2>;
  }

  if (loading) {
    return <h2>Loading</h2>;
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
