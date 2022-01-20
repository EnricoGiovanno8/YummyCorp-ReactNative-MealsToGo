import React, { useState, createContext } from "react";

import { loginRequest } from "./authentication.service";

export const AuthenticationContext = createContext();

export const AuthenticationContextProvider = ({ children }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [user, setUser] = useState(null);
  const [error, setError] = useState(null);

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
        setError(errMessage);
        setIsLoading(false);
      });
  };

  return (
    <AuthenticationContext.Provider
      value={{
        user,
        isLoading,
        isAuthenticated: !!user,
        error,
        onLogin,
      }}
    >
      {children}
    </AuthenticationContext.Provider>
  );
};
