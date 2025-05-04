import React, { createContext, useContext, useState, useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';

export interface Partner {
  id: string;
  name: string;
  logo: string;
  description: string;
  contactPerson: string;
  phone: string;
  email: string;
  address: string;
  active: boolean;
}

interface PartnerContextType {
  partners: Partner[];
  addPartner: (partner: Omit<Partner, 'id'>) => void;
  updatePartner: (partner: Partner) => void;
  deletePartner: (id: string) => void;
  getPartner: (id: string) => Partner | undefined;
}

const PartnerContext = createContext<PartnerContextType | undefined>(undefined);

export function PartnerProvider({ children }: { children: React.ReactNode }) {
  const [partners, setPartners] = useState<Partner[]>(() => {
    const savedPartners = localStorage.getItem('gm-sons-partners');
    return savedPartners ? JSON.parse(savedPartners) : [];
  });

  // Save to localStorage whenever partners change
  useEffect(() => {
    localStorage.setItem('gm-sons-partners', JSON.stringify(partners));
  }, [partners]);

  const addPartner = (partner: Omit<Partner, 'id'>) => {
    const newPartner = { ...partner, id: uuidv4() };
    setPartners([...partners, newPartner]);
  };

  const updatePartner = (updatedPartner: Partner) => {
    setPartners(partners.map(p => 
      p.id === updatedPartner.id ? updatedPartner : p
    ));
  };

  const deletePartner = (id: string) => {
    setPartners(partners.filter(p => p.id !== id));
  };

  const getPartner = (id: string) => {
    return partners.find(p => p.id === id);
  };

  return (
    <PartnerContext.Provider
      value={{
        partners,
        addPartner,
        updatePartner,
        deletePartner,
        getPartner,
      }}
    >
      {children}
    </PartnerContext.Provider>
  );
}

export function usePartners() {
  const context = useContext(PartnerContext);
  if (context === undefined) {
    throw new Error('usePartners must be used within a PartnerProvider');
  }
  return context;
}
