import decode from "jwt-decode";
import { createContext, useCallback, useLayoutEffect } from "react";
import useLocalStorage from "../hooks/useLocalStorage";

export const AuthContext = createContext(null);

const AuthProvider = ({ children }) => {
  //== Get value from local storage
  const [storedToken, setStoredToken] = useLocalStorage("token:", "");
  const [storedUserData, setStoredUserData] = useLocalStorage("user:", null);

  const getToken = useCallback(() => {
    return storedToken;
  }, [storedToken]);

  //== Logout / SignOut functionality
  const logOut = useCallback(() => {
    setStoredToken("");
    setStoredUserData(null);
    window.location.replace("/");
    window.location.reload();
    // eslint-disable-next-line
  }, []);

  const isTokenExpired = useCallback(
    (token) => {
      try {
        const decoded = decode(token);
        const expirationTime = decoded?.exp * 1000 - 60000;
        if (Date.now() >= expirationTime) {
          logOut();
        }
      } catch (err) {
        return false;
      }
    },
    [logOut]
  );

  //== Check token validity function for login
  const getIsLoggedIn = useCallback(() => {
    const token = getToken();
    return !!token && !isTokenExpired(token);
  }, [getToken, isTokenExpired]);

  //== Initial render before dom ready
  useLayoutEffect(() => {
    getIsLoggedIn();
    // eslint-disable-next-line
  }, [getIsLoggedIn]);

  const values = {
    storedToken,
    setStoredToken,
    storedUserData,
    setStoredUserData,
    getToken,
    getIsLoggedIn,
    logOut,
  };

  return <AuthContext.Provider value={values}>{children}</AuthContext.Provider>;
};

export default AuthProvider;
