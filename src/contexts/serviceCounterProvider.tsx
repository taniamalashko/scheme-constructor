import React, {
  createContext, useContext, useState, useMemo,
} from 'react';

// Define the context type for managing service count
interface ServicesCountContextType {
  serviceCount: number; // The current count of services
  incrementServiceCount: () => void; // Function to increment the service count
  decrementServiceCount: () => void; // Function to decrement the service count
}

// Create the services count context
const ServicesCountContext = createContext<ServicesCountContextType | undefined>(undefined);

// Hook for using the services count context
export function useServicesCountContext() {
  const context = useContext(ServicesCountContext);
  if (!context) {
    throw new Error('useServicesCountContext must be used within an ServicesCountProvider');
  }
  return context;
}

// Services count provider component
export function ServicesCountProvider({ children }: { children: React.ReactNode }) {
  // Initialize the service count state with a default value of 0
  const [serviceCount, setServiceCount] = useState(0);

  // Function to increment the service count
  const incrementServiceCount = () => {
    setServiceCount((prevServiceCount) => prevServiceCount + 1);
  };

  // Function to decrement the service count
  const decrementServiceCount = () => {
    setServiceCount((prevServiceCount) => prevServiceCount - 1);
  };

  // Create a memoized context value
  // eslint-disable-next-line max-len
  const appContextValue = useMemo(() => ({ serviceCount, incrementServiceCount, decrementServiceCount }), [serviceCount]);

  return (
    <ServicesCountContext.Provider value={appContextValue}>
      {children}
    </ServicesCountContext.Provider>
  );
}
