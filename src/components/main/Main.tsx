import React from 'react';
import Block from '../block/Block';
import ArrowDirectionIcon from '../icons/ArrowDirectionIcon';
import { useAppContext } from '../../contexts/positionContext';
import './main.scss';

function Main() {
  // Access the block coordinates and moveBlockToCoordinates function from the App context
  const { blockCoordinates, moveBlockToCoordinates } = useAppContext();

  // Define the amount to move the block by
  const moveAmount = 150;

  // Function to move the block up
  const handleMoveUp = () => {
    moveBlockToCoordinates(blockCoordinates.x, blockCoordinates.y - moveAmount);
  };

  // Function to move the block down
  const handleMoveDown = () => {
    moveBlockToCoordinates(blockCoordinates.x, blockCoordinates.y + moveAmount);
  };

  // Function to move the block left
  const handleMoveLeft = () => {
    moveBlockToCoordinates(blockCoordinates.x - moveAmount, blockCoordinates.y);
  };

  // Function to move the block right
  const handleMoveRight = () => {
    moveBlockToCoordinates(blockCoordinates.x + moveAmount, blockCoordinates.y);
  };

  return (
    <main className="main">
      <div className="centerDiv">
        <Block />
      </div>
      <button type="button" className="arrow-button up" onClick={handleMoveUp}>
        <ArrowDirectionIcon className="arrowUp" />
      </button>
      <button type="button" className="arrow-button down" onClick={handleMoveDown}>
        <ArrowDirectionIcon className="arrowDown" />
      </button>
      <button type="button" className="arrow-button left" onClick={handleMoveLeft}>
        <ArrowDirectionIcon />
      </button>
      <button type="button" className="arrow-button right" onClick={handleMoveRight}>
        <ArrowDirectionIcon className="arrowRight" />
      </button>
    </main>
  );
}

export default Main;
