import React, { useState, createContext, useEffect } from "react";

import {
  loginRequest,
  registerRequest,
  keepLogin,
  logout,
} from "./authentication.service";

export const AuthenticationContext = createContext();

export const AuthenticationContextProvider = ({ children }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [user, setUser] = useState(null);
  const [errorLogin, setErrorLogin] = useState(null);
  const [errorRegister, setErrorRegister] = useState(null);

  useEffect(() => {
    setIsLoading(true);
    keepLogin()
      .then((usr) => {
        setUser(usr);
        setIsLoading(false);
      })
      .catch(() => {
        setIsLoading(false);
      });
  }, []);

  const onLogin = (email, password) => {
    setIsLoading(true);
    loginRequest(email, password)
      .then((u) => {
        setUser(u);
        setIsLoading(false);
      })
      .catch((e) => {
        let errMessage = e.code;
        if (e.code === "auth/invalid-email") {
          errMessage = "Error: E-mail Is Badly Formatted.";
        } else if (e.code === "auth/user-not-found") {
          errMessage =
            "Error: There is no user record corresponding to this identifier. The user may have been deleted.";
        } else if (e.code === "auth/wrong-password") {
          errMessage =
            "Error: The password is invalid or the user does not have a password.";
        } else if (e.code === "auth/internal-error") {
          errMessage = "Error: Please input all fields.";
        } else if (e.code === "auth/too-many-requests") {
          errMessage =
            "Error: Access to this account has been temporarily disabled due to many failed login attempts. You can immediately restore it by resetting your password or you can try again later.";
        }
        setErrorLogin(errMessage);
        setIsLoading(false);
      });
  };

  const onRegister = (email, password, repeatedPassword) => {
    setIsLoading(true);
    if (password !== repeatedPassword) {
      setErrorRegister("Error: Passwords do not match.");
      return setIsLoading(false);
    }
    registerRequest(email, password)
      .then((u) => {
        setUser(u);
        setIsLoading(false);
      })
      .catch((e) => {
        setErrorRegister(e);
        setIsLoading(false);
      });
  };

  const onLogout = () => {
    setUser(null);
    logout()
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <AuthenticationContext.Provider
      value={{
        user,
        isLoading,
        isAuthenticated: !!user,
        errorLogin,
        errorRegister,
        onLogin,
        onRegister,
        onLogout,
      }}
    >
      {children}
    </AuthenticationContext.Provider>
  );
};
