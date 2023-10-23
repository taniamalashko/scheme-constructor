import React from 'react';
import './addItemModal.scss';

// Define the props interface for the AddItemModal component.
interface AddItemModalProps {
  onClose: () => void; // Callback when the modal should be closed
  onCategorySelect: () => void; // Callback when the "Category" button is clicked
  onServiceSelect: () => void; // Callback when the "Service" button is clicked
  position: { top: number; left: number }; // Position of the modal
}

// Define constants for the modal title and button labels.
const modalTitle: string = 'What do you want to create?';
const categoryButtonLabel: string = 'Category';
const serviceButtonLabel: string = 'Service';

// Functional component for the AddItemModal.
function AddItemModal({
  onClose,
  onCategorySelect,
  onServiceSelect,
  position,
}: AddItemModalProps) {
  // Define the style for the modal based on the provided position.
  const modalStyle: React.CSSProperties = {
    position: 'absolute',
    top: position.top,
    left: position.left,
  };

  return (
    <div className="add-item-modal" style={modalStyle}>
      <div className="modal-content">
        {/* Render the modal title */}
        <h2>{modalTitle}</h2>
        {/* Button for selecting a category */}
        <button type="button" onClick={onCategorySelect}>
          {categoryButtonLabel}
        </button>
        {/* Button for selecting a service */}
        <button type="button" onClick={onServiceSelect}>
          {serviceButtonLabel}
        </button>
        {/* Button for closing the modal */}
        <button type="button" onClick={onClose} className="cancel-button">
          &#10006;
        </button>
      </div>
    </div>
  );
}

export default AddItemModal;
