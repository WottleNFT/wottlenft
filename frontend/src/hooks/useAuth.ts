import { useEffect, useState } from "react";

import { Status } from "../features/wallet/walletSlice";
import useWallet from "./useWallet";

const loggedInKey = "isLoggedIn";
export const tokenKey = "accessToken";

const useAuth = () => {
  const wallet = useWallet();
  // Keeps track of whether (1) wallet is ready and (2) authenticated status is ready
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isLoggedIn, setIsLoggedIn] = useState<boolean | null>();

  // Retrieve information from local storage
  useEffect(() => {
    if (wallet.status === Status.Enabled) {
      const loggedIn = !!localStorage.getItem(loggedInKey) || false;
      setIsLoggedIn(loggedIn);
      setIsLoading(false);
    }
  }, [wallet.status]);

  useEffect(() => {
    if (
      wallet.status === Status.NoExtension ||
      wallet.status === Status.NotEnabled
    ) {
      localStorage.removeItem(loggedInKey);
      localStorage.removeItem(tokenKey);
      setIsLoggedIn(false);
      setIsLoading(false);
    }
  }, [wallet.status]);

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

  // Get access token
  const getAccessToken = () => {
    return localStorage.getItem(tokenKey);
  };

  return {
    isLoading,
    isLoggedIn,
    setLogin,
    setLogout,
    getAccessToken,
    wallet,
  };
};
export default useAuth;
