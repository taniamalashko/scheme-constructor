/* eslint-disable react/jsx-no-constructed-context-values */
import React, {
  createContext, useContext, ReactNode, useState,
} from 'react';

// Define the context type
interface AppContextType {
  setBlockCentered: (centered: boolean) => void; // Function to set the block centered or not
  isDraggable: boolean; // Indicates if the block is draggable
  setIsDraggable: (draggable: boolean) => void; // Function to set the block as draggable or not
  blockCoordinates: { x: number; y: number }; // Coordinates of the block
  moveBlockToCoordinates: (x: number, y: number) => void;
  // Function to move the block to specific coordinates
}

// Create the context
const AppContext = createContext<AppContextType | undefined>(undefined);

// Hook for using the context
export function useAppContext(): AppContextType {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useAppContext must be used within an AppProvider');
  }
  return context;
}

// Context provider component
interface AppProviderProps {
  children: ReactNode;
}

export function AppProvider({ children }: AppProviderProps) {
  // States
  const [isDraggable, setIsDraggable] = useState(true); // Block is initially draggable
  const [blockCoordinates, setBlockCoordinates] = useState({ x: 0, y: 0 });
  // Initial block coordinates at (0, 0)

  // Functions for working with the context
  const moveToCoordinates = (x: number, y: number): void => {
    if (isDraggable) {
      setBlockCoordinates({ x, y });
    }
  };

  const setCentered = (centered: boolean): void => {
    if (centered) {
      setBlockCoordinates({ x: 0, y: 0 });
    }
  };

  // Context value
  const contextValue: AppContextType = {
    setBlockCentered: setCentered,
    isDraggable,
    setIsDraggable,
    blockCoordinates,
    moveBlockToCoordinates: moveToCoordinates,
  };

  return (
    <AppContext.Provider value={contextValue}>
      {children}
    </AppContext.Provider>
  );
}
