import React from 'react';
import './App.css';
import Header from './components/header/Header';
import Main from './components/main/Main';
import { AppProvider } from './contexts/positionContext';
import { ScaleProvider } from './contexts/scaleContext';
import { ServicesCountProvider } from './contexts/serviceCounterProvider';

function App() {
  return (
    <ServicesCountProvider>
      <ScaleProvider>
        <AppProvider>
          <div className="Wrapper">
            <Header />
            <Main />
          </div>
        </AppProvider>
      </ScaleProvider>
    </ServicesCountProvider>
  );
}

export default App;
