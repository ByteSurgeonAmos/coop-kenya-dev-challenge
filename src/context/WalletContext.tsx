import React, { createContext, useContext, useState, useEffect } from "react";

interface WalletContextType {
  balance: number;
  updateBalance: (amount: number) => void;
}

const WalletContext = createContext<WalletContextType | undefined>(undefined);

export function WalletProvider({ children }: { children: React.ReactNode }) {
  const [balance, setBalance] = useState(() => {
    const stored = localStorage.getItem("walletBalance");
    return stored ? Number(stored) : 2400;
  });

  useEffect(() => {
    localStorage.setItem("walletBalance", balance.toString());
  }, [balance]);

  const updateBalance = (amount: number) => {
    setBalance((prev) => {
      const newBalance = prev - amount;
      localStorage.setItem("walletBalance", newBalance.toString());
      return newBalance;
    });
  };

  return (
    <WalletContext.Provider value={{ balance, updateBalance }}>
      {children}
    </WalletContext.Provider>
  );
}

export const useWallet = () => {
  const context = useContext(WalletContext);
  if (!context) {
    throw new Error("useWallet must be used within a WalletProvider");
  }
  return context;
};
