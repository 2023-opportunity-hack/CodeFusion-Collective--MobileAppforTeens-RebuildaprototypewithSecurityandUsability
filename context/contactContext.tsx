import { createContext, useContext, useState } from "react";

type EmergencyContactContextProviderProps = {
  children: React.ReactNode
};

export type EmergencyContactsType = {
  [key: string]: string
}[];

type EmergencyContactsContextType = {
  emerContacts: EmergencyContactsType,
  setEmerContacts: React.Dispatch<React.SetStateAction<EmergencyContactsType>>
}

export const EmergencyContactContext = createContext<EmergencyContactsContextType | null>(null);

export default function EmergencyContactContextProvider({ children }: EmergencyContactContextProviderProps) {
  const [emerContacts, setEmerContacts] = useState<EmergencyContactsType>([]);

  return (
    <EmergencyContactContext.Provider value={{ emerContacts, setEmerContacts }}>
      {children}
    </EmergencyContactContext.Provider>
  )
};

export function useEmergencyContactContext() {
  const context = useContext(EmergencyContactContext);

  if (context === null) {
    throw new Error("useEmergencyContactContext must be used within an EmergencyContactContextProvider");
  }

  return context;
}