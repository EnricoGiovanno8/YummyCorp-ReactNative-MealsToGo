import { initializeApp } from "firebase/app";
import {
  getAuth,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signOut,
} from "firebase/auth";

import {
  API_KEY,
  AUTH_DOMAIN,
  PROJECT_ID,
  STORAGE_BUCKET,
  MESSAGING_SENDER_ID,
  APP_ID,
} from "@env";

const firebaseConfig = {
  apiKey: API_KEY,
  authDomain: AUTH_DOMAIN,
  projectId: PROJECT_ID,
  storageBucket: STORAGE_BUCKET,
  messagingSenderId: MESSAGING_SENDER_ID,
  appId: APP_ID,
};

initializeApp(firebaseConfig);

const auth = getAuth();

export const loginRequest = (email, password) => {
  return new Promise((resolve, reject) => {
    signInWithEmailAndPassword(auth, email, password)
      .then((u) => {
        resolve(u.user);
      })
      .catch((e) => {
        reject(e);
      });
  });
};

export const registerRequest = (email, password) => {
  return new Promise((resolve, reject) => {
    createUserWithEmailAndPassword(auth, email, password)
      .then((u) => {
        resolve(u.user);
      })
      .catch((e) => {
        reject(e.code);
      });
  });
};

export const keepLogin = () => {
  return new Promise((resolve, reject) => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        resolve(user);
      } else {
        reject(user);
      }
    });
  });
};

export const logout = () => {
  return new Promise((resolve, reject) => {
    signOut(auth)
      .then(() => {
        resolve("Sign Out Success");
      })
      .catch(() => {
        reject("Sign Out Fail");
      });
  });
};
