import PropTypes from "prop-types";
import AuthContext from "../context/AuthContext";
import { useEffect, useState } from "react";
import {
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  updateProfile,
} from "firebase/auth";
import auth from "@/firebase/firebase.config";
import useAxiosSecure from "@/hooks/useAxiosSecure";

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const axiosSecure = useAxiosSecure();

  const createUser = (email, password) => {
    setLoading(true);
    return createUserWithEmailAndPassword(auth, email, password);
  };

  const signIn = (email, password) => {
    setLoading(true);
    return signInWithEmailAndPassword(auth, email, password);
  };

  const logOut = () => {
    setLoading(true);
    return signOut(auth);
  };

  const updateUserProfile = (displayName, photoURL) => {
    return updateProfile(auth.currentUser, { displayName, photoURL });
  };

  const googleSignIn = () => {
    setLoading(true);
    return signInWithPopup(auth, new GoogleAuthProvider());
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) {
        setUser(currentUser);
        setLoading(false);
        const userPayload = { email: currentUser.email };
        axiosSecure
          .post("/users/jwt", userPayload)
          .then((res) => {
            if (res.data.data) {
              localStorage.setItem("access-token", res.data.data);
            }
          })
          .catch((err) => {
            console.log(err);
          });
      } else {
        setUser(null);
        setLoading(false);
        axiosSecure
          .post("/users/logout")
          .then(() => {
            localStorage.removeItem("access-token");
          })
          .catch((err) => {
            console.log(err);
          });
      }
    });

    return () => unsubscribe();
  }, [axiosSecure]);

  const authInfo = {
    user,
    loading,
    createUser,
    signIn,
    logOut,
    updateUserProfile,
    googleSignIn,
  };
  return (
    <AuthContext.Provider value={authInfo}>{children}</AuthContext.Provider>
  );
};

AuthProvider.propTypes = {
  children: PropTypes.node,
};

export default AuthProvider;
