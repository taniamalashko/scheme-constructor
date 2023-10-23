/* eslint-disable jsx-a11y/no-static-element-interactions */
import React, {
  useState, MouseEvent, CSSProperties, useCallback, useEffect,
} from 'react';
import './block.scss';
import CustomCategoriesList from '../categoriesList/CategoriesList';
import { useAppContext } from '../../contexts/positionContext';
import { useScale } from '../../contexts/scaleContext';

export default function CustomDraggableBlock() {
  // Get the scale from the scale context
  const { scale } = useScale();

  // Get properties from the application context
  const {
    isDraggable, blockCoordinates, moveBlockToCoordinates,
  } = useAppContext();

  // State for tracking whether the block is currently being dragged
  const [isDragging, setIsDragging] = useState(false);

  // State for the block's position
  const [position, setPosition] = useState<{ x: number; y: number }>({
    x: blockCoordinates.x,
    y: blockCoordinates.y,
  });

  // Update the block's position when blockCoordinates change
  useEffect(() => {
    setPosition({ x: blockCoordinates.x, y: blockCoordinates.y });
  }, [blockCoordinates]);

  // Handle mouse down event when the block is clicked
  const handleMouseDown = useCallback(
    (e: MouseEvent<HTMLDivElement>): void => {
      if (isDraggable) {
        setIsDragging(true);

        // Calculate the initial position of the mouse relative to the block
        const initialX = e.clientX - position.x;
        const initialY = e.clientY - position.y;

        // Handle mouse move while dragging
        const handleMouseMove = (event: Event): void => {
          const mouseEvent = event as unknown as MouseEvent;

          if (
            mouseEvent.clientX !== undefined
            && mouseEvent.clientY !== undefined
          ) {
            const newX = mouseEvent.clientX - initialX;
            const newY = mouseEvent.clientY - initialY;
            setPosition({ x: newX, y: newY });
          }
        };

        // Handle mouse up event to stop dragging
        const handleMouseUp = (): void => {
          setIsDragging(false);
          window.removeEventListener('mousemove', handleMouseMove);
          window.removeEventListener('mouseup', handleMouseUp);
        };

        // Add event listeners for mouse move and mouse up
        window.addEventListener('mousemove', handleMouseMove as EventListener);
        window.addEventListener('mouseup', handleMouseUp as EventListener);

        // Update the block's position when it's moved
        moveBlockToCoordinates(position.x, position.y);
      }
    },
    [isDraggable, position, moveBlockToCoordinates],
  );

  // Define the CSS properties for the block
  const blockStyle: CSSProperties = {
    transform: `translate(${position.x}px, ${position.y}px) scale(${scale / 100})`,
    transition: isDragging ? 'none' : '0.3s ease',
  };

  return (
    <div
      // Add CSS classes to the block based on whether it's being dragged
      className={`custom-dnd-block ${isDragging ? 'custom-active' : ''}`}
      onMouseDown={handleMouseDown}
      style={blockStyle}
    >
      <CustomCategoriesList />
    </div>
  );
}
