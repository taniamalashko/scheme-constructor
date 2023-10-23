import React, {
  createContext, useContext, useState, ReactNode, ReactElement, useMemo,
} from 'react';

// Define the context type for managing scale
interface ScaleContextType {
  scale: number; // The current scale value
  setScale: React.Dispatch<React.SetStateAction<number>>; // Function to set the scale
}

// Create the scale context
const ScaleContext = createContext<ScaleContextType | undefined>(undefined);

// Scale provider component
function ScaleProvider({ children }: { children: ReactNode }): ReactElement {
  // Initialize the scale state with a default value of 100
  const [scale, setScale] = useState<number>(100);

  // Create a memoized context value
  const contextValue = useMemo(() => ({ scale, setScale }), [scale, setScale]);

  return (
    <ScaleContext.Provider value={contextValue}>
      {children}
    </ScaleContext.Provider>
  );
}

// Hook for using the scale context
function useScale(): ScaleContextType {
  const context = useContext(ScaleContext);
  if (context === undefined) {
    throw new Error('useScale must be used within a ScaleProvider');
  }
  return context;
}

export { ScaleProvider, useScale };
