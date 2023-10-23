/* eslint-disable max-len */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
// Import necessary dependencies and components
import React, { useState } from 'react';
import Category from '../category/Category'; // Import the 'Category' component
import colors from '../../utils/colors'; // Import colors from a utility file
import './categoriesList.scss'; // Import styling for the 'categoriesList' component
import AddIcon from '../icons/AddIcon'; // Import an 'AddIcon' component
import AddItemModal from '../addModal/AddtemModal'; // Import an 'AddItemModal' component
import { useServicesCountContext } from '../../contexts/serviceCounterProvider'; // Import context for service counts

// Define the custom subcategory type
export interface CustomSubCategoryType {
  id: string; // Unique identifier for the subcategory
  name: string; // Name of the subcategory
  type: 'Category' | 'Service'; // Type of subcategory (Category or Service)
  subCategory: CustomSubCategoryType[]; // Subcategories within this subcategory
}

// Define the 'CustomCategoriesList' component
export default function CustomCategoriesList() {
  const { incrementServiceCount, decrementServiceCount } = useServicesCountContext(); // Access service count context
  const [customCategories, setCustomCategories] = useState<CustomSubCategoryType[]>([]); // Manage custom categories
  const [isModalVisible, setIsModalVisible] = useState(false); // Control visibility of the add item modal
  const [modalPosition, setModalPosition] = useState({ top: 0, left: 0 }); // Manage modal position

  // Open the add item modal
  const handleOpenModal = () => {
    setModalPosition({ top: 0, left: 170 });
    setIsModalVisible(true);
  };

  // Close the add item modal
  const handleCloseModal = () => {
    setIsModalVisible(false);
  };

  // Add a new custom category or service
  const handleAddCustomCategory = (type: 'Category' | 'Service'): void => {
    const newCategory: CustomSubCategoryType = {
      id: `custom-category-${customCategories.length}`, // Generate a unique identifier
      type,
      name: `${type === 'Service' ? 'Service' : `Category ${customCategories.length + 1}`}`,
      subCategory: [], // Initialize with an empty array of subcategories
    };

    // Increment the service count if adding a service
    if (type === 'Service') {
      incrementServiceCount();
    }

    // Update the list of custom categories
    setCustomCategories((prevCustomCategories) => [...prevCustomCategories, newCategory]);

    // Close the add item modal
    setIsModalVisible(false);
  };

  // Delete a custom category or service
  const handleDeleteCustomCategory = (categoryId: string): void => {
    // Remove the specified category from the list of custom categories
    setCustomCategories((prevCustomCategories) => prevCustomCategories.filter((customCategory) => customCategory.id !== categoryId));

    // Find the deleted category and decrement the service count if necessary
    const deletedCategory = customCategories.find((category) => category.id === categoryId);
    if (deletedCategory && deletedCategory.type === 'Service') {
      decrementServiceCount();
    }
  };

  const hasCustomCategories = customCategories.length > 1; // Check if there are more than one custom categories

  // Render the 'CustomCategoriesList' component
  return (
    <div className="custom-categories-list">
      <div className="custom-categories-list__block">
        <span className="custom-categories-list__block--title">
          Categories

          {/* Render the add item modal if it's visible */}
          {isModalVisible && (
            <AddItemModal
              onClose={handleCloseModal}
              onCategorySelect={() => handleAddCustomCategory('Category')}
              onServiceSelect={() => handleAddCustomCategory('Service')}
              position={modalPosition}
            />
          )}
        </span>
        <div onClick={handleOpenModal}>
          <div className="colored-plus-icon">
            <AddIcon className="plus-icon" />
          </div>
        </div>
        {/* Render a line separator if there are custom categories */}
        {hasCustomCategories && <span className="custom-categories-list__line" />}
      </div>
      <div
        className={`custom-categories-list__items ${hasCustomCategories ? 'more-than-two' : ''}`}
      >
        {/* Map and render each custom category using the 'Category' component */}
        {customCategories.map((customCategory) => (
          <Category
            key={customCategory.id}
            customCategory={customCategory}
            level={0} // Initially, the level is set to 0
            onDeleteCustomCategory={handleDeleteCustomCategory}
            hasCustomCategories={hasCustomCategories}
            colors={colors}
          />
        ))}
      </div>
    </div>
  );
}
