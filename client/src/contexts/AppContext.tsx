import { createContext, useContext, useState, ReactNode } from "react";

interface AppContextType {
  dateRange: { from: Date; to: Date };
  setDateRange: (range: { from: Date; to: Date }) => void;
  location: string;
  setLocation: (location: string) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const useAppContext = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error("useAppContext must be used within AppProvider");
  }
  return context;
};

export function AppProvider({ children }: { children: ReactNode }) {
  const [dateRange, setDateRange] = useState({
    from: new Date("2025-01-01"),
    to: new Date("2025-01-19"),
  });
  const [location, setLocation] = useState("nyc");

  return (
    <AppContext.Provider value={{ dateRange, setDateRange, location, setLocation }}>
      {children}
    </AppContext.Provider>
  );
}