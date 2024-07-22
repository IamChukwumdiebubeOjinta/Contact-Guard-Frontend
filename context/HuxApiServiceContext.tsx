"use client";
import React, { createContext, useContext, useState, ReactNode } from "react";
import ApiService from "../services/apiService";

interface HuxApiServiceContextProps {
  apiService: ApiService;
  token: string | null;
  updateToken: (token: string | null) => void;
}

const HuxApiServiceContext = createContext<
  HuxApiServiceContextProps | undefined
>(undefined);

export const HuxApiServiceProvider = ({ children }: { children: ReactNode }) => {
  const [apiService] = useState(
    () => new ApiService("http://[::1]:9000")
  );
  const [token, setToken] = useState<string | null>(null);

  const updateToken = (newToken: string | null) => {
    setToken(newToken);
    apiService.setToken(newToken);
  };

  return (
    <HuxApiServiceContext.Provider value={{ apiService, token, updateToken }}>
      {children}
    </HuxApiServiceContext.Provider>
  );
};

export const useApiService = (): HuxApiServiceContextProps => {
  const context = useContext(HuxApiServiceContext);
  if (!context) {
    throw new Error("useApiService must be used within an ApiServiceProvider");
  }
  return context;
};
