import { useEffect, useState } from "react";

const loggedInKey = "isLoggedIn";
const tokenKey = "accessToken";

const useAuth = () => {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isLoggedIn, setIsLoggedIn] = useState<boolean | null>();

  // Retrieve information from local storage
  useEffect(() => {
    const loggedIn = !!localStorage.getItem(loggedInKey) || false;
    setIsLoggedIn(loggedIn);
    setIsLoading(false);
  }, []);

  // Store login information
  const setLogin = (accessToken: string) => {
    localStorage.setItem(tokenKey, accessToken);
    localStorage.setItem(loggedInKey, "true");
    setIsLoggedIn(true);
  };

  // Logout
  const setLogout = () => {
    localStorage.removeItem(loggedInKey);
    localStorage.removeItem(tokenKey);
    setIsLoggedIn(false);
  };

  return {
    isLoading,
    isLoggedIn,
    setLogin,
    setLogout,
  };
};
export default useAuth;
