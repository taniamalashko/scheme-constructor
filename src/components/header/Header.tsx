/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
import React from 'react';
import ArrowIcon from '../icons/ArrowIcon';
import ScaleControls from '../scaleControls/ScaleControls';
import { useAppContext } from '../../contexts/positionContext';
import './header.scss';
import { useServicesCountContext } from '../../contexts/serviceCounterProvider';

function Header() {
  // Access the App context for setting the block as centered
  const { setBlockCentered } = useAppContext();

  // Function to handle centering the schema
  const handleCenterSchema = () => {
    setBlockCentered(true);
  };

  // Access the service count from the Service Counter context
  const { serviceCount } = useServicesCountContext();

  return (
    <header className="header">
      <div className="logo">
        <h2 className="logo__text">Services</h2>
        <div className="yellow-circle">
          <span className="services-counter">{serviceCount}</span>
        </div>
      </div>
      <div className="controls">
        {/* Button to switch to list view */}
        <button type="button" className="controls__list-view-button">LIST VIEW</button>
        <div
          className="controls__center-schema-button"
          title="Center schema"
          onClick={handleCenterSchema}
        >
          {/* Icon for centering the schema */}
          <ArrowIcon className="controls__arrow-icon" />
        </div>
        {/* Render the ScaleControls component */}
        <ScaleControls />
      </div>
    </header>
  );
}

export default Header;
