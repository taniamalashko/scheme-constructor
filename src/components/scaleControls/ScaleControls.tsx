/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */

import React, { useState } from 'react';
import MinusIcon from '../icons/MinusIcon';
import PlusIcon from '../icons/PlusIcon';
import { useScale } from '../../contexts/scaleContext';
import './scaleControls.scss';

function ScaleControls() {
  // Access the current scale and setScale function from the Scale context
  const { scale, setScale } = useScale();

  // State to manage the visibility of the scale dropdown
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  // Available scale values
  const scales = [25, 30, 40, 50, 60, 70, 80, 90, 100, 125, 150];

  // Toggle the visibility of the scale dropdown
  const handleDropdownClick = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  // Set the selected scale and close the dropdown
  const handleScaleSelect = (newScale: number) => {
    setScale(newScale);
    setIsDropdownOpen(false);
  };

  // Increase the scale value
  const handleScaleIncrease = () => {
    const currentIndex = scales.indexOf(scale);
    if (currentIndex < scales.length - 1) {
      const newScale = scales[currentIndex + 1];
      setScale(newScale);
    }
  };

  // Decrease the scale value
  const handleScaleDecrease = () => {
    const currentIndex = scales.indexOf(scale);
    if (currentIndex > 0) {
      const newScale = scales[currentIndex - 1];
      setScale(newScale);
    }
  };

  return (
    <div className="scale-controls">
      <button type="button" className="scale-controls__button" onClick={handleScaleDecrease}>
        <MinusIcon className="scale-controls__icon" />
      </button>
      <div className="scale-controls__container">
        <div className="scale-controls__value" onClick={handleDropdownClick}>
          {scale}
          %
        </div>
        {isDropdownOpen && (
          <ul className="scale-controls__dropdown">
            {scales.map((scaleValue) => (
              <li
                key={scaleValue}
                onClick={() => handleScaleSelect(scaleValue)}
              >
                {scaleValue}
                %
              </li>
            ))}
          </ul>
        )}
      </div>
      <button type="button" className="scale-controls__button" onClick={handleScaleIncrease}>
        <PlusIcon className="scale-controls__icon" />
      </button>
    </div>
  );
}

export default ScaleControls;
