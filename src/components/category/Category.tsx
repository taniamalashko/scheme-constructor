/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React, {
  memo, useEffect, useRef, useState,
} from 'react';
import { useServicesCountContext } from '../../contexts/serviceCounterProvider';
import AddItemModal from '../addModal/AddtemModal';
import '../categoriesList/categoriesList.scss';
import AddIcon from '../icons/AddIcon';
import DeleteIcon from '../icons/DeleteIcon';
import EditIcon from '../icons/EditIcon';
import SaveIcon from '../icons/SaveIcon';
import './category.scss';

interface CustomCategoryProps {
  customCategory: CustomSubCategoryType;
  level: number;
  onDeleteCustomCategory: (id: string) => void;
  hasCustomCategories: boolean;
  colors: string[];
}

interface CustomSubCategoryType {
  id: string;
  name: string;
  subCategory: CustomSubCategoryType[];
  type: 'Category' | 'Service';
}

function CustomCategory({
  customCategory,
  level,
  onDeleteCustomCategory,
  hasCustomCategories,
  colors,
}: CustomCategoryProps) {
  const { incrementServiceCount, decrementServiceCount } = useServicesCountContext();

  const [customSubCategories, setCustomSubCategories] = useState<CustomSubCategoryType[]>([]);

  const [isEditing, setIsEditing] = useState(true);
  const [editedText, setEditedText] = useState(customCategory.name);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [modalPosition, setModalPosition] = useState({ top: 0, left: 0 });

  const customCategoryRef = useRef<HTMLDivElement>(null);

  const hasCustomSubCategories = customSubCategories.length > 1;

  const isService = customCategory.type === 'Service';

  useEffect(() => {
    // Set focus on the input field when in edit mode
    if (isEditing && customCategoryRef.current) {
      const inputElement = customCategoryRef.current.querySelector('input');
      if (inputElement) {
        inputElement.focus();
      }
    }
  }, [isEditing]);

  const handleOpenModal = () => {
    // Set the modal position to (0, 0) and make it visible
    setModalPosition({
      top: 0,
      left: 170,
    });
    setIsModalVisible(true);
  };

  const handleCategorySelect = () => {
    // Add a new category and hide the modal
    setIsModalVisible(false);
    const newCustomSubCategory: CustomSubCategoryType = {
      id: `custom-sub-${customSubCategories.length}`,
      name: `SubCategory ${customSubCategories.length + 1}`,
      subCategory: [],
      type: 'Category',
    };
    setCustomSubCategories([...customSubCategories, newCustomSubCategory]);
  };

  const handleServiceSelect = () => {
    // Add a new service and hide the modal
    setIsModalVisible(false);
    const newCustomSubCategory: CustomSubCategoryType = {
      id: `custom-sub-${customSubCategories.length}`,
      name: 'Service',
      subCategory: [],
      type: 'Service',
    };

    setCustomSubCategories([...customSubCategories, newCustomSubCategory]);
    incrementServiceCount();
  };

  const handleEditClick = (): void => {
    // Enable edit mode
    setIsEditing(true);
  };

  const handleSaveClick = (): void => {
    // Disable edit mode
    setIsEditing(false);
  };

  const handleDeleteCustomCategory = (): void => {
    // Delete the custom category
    onDeleteCustomCategory(customCategory.id);

    if (isService) {
      // Decrement the service count if it's a service
      decrementServiceCount();
    }
  };

  const handleDeleteCustomSubCategory = (customSubCategoryId: string): void => {
    // Delete a custom subcategory
    const updatedCustomSubCategories = customSubCategories.filter(
      (customSubCategory) => customSubCategory.id !== customSubCategoryId,
    );
    setCustomSubCategories(updatedCustomSubCategories);
  };

  return (
    <div className={`custom-category ${hasCustomCategories ? 'custom-category__lines' : ''} ${isService ? 'service' : ''}`} ref={customCategoryRef}>
      <div className={`custom-category__block ${isService ? 'service' : ''}`}>
        <span className="custom-category__top-line" />
        {isEditing ? (
          <input
            type="text"
            value={editedText}
            name={customCategory.id}
            className="custom-category__block--input"
            onChange={(e) => setEditedText(e.target.value)}
          />
        ) : (
          <span
            className="custom-category__block--title"
            style={{ backgroundColor: colors[level % colors.length] }}
          >
            {customCategory.name}
            {isModalVisible && (
            <AddItemModal
              onClose={() => { setIsModalVisible(false); }}
              onCategorySelect={() => handleCategorySelect()}
              onServiceSelect={() => handleServiceSelect()}
              position={modalPosition}
            />
            )}
          </span>
        )}
        <div className="custom-category__block--icons">
          {!isService && (
            <span onClick={handleOpenModal}>
              <div className="colored-plus-icon">
                <AddIcon className="plus-icon icon" />
              </div>
            </span>
          )}
          {isEditing ? (
            <span onClick={handleSaveClick}>
              <div className="colored-save-icon">
                <SaveIcon className="save-icon icon" />
              </div>
            </span>
          ) : (
            <span onClick={handleEditClick}>
              <div className="colored-edit-icon">
                <EditIcon className="edit-icon icon" />
              </div>
            </span>
          )}

          <span onClick={handleDeleteCustomCategory}>
            <div className="colored-delete-icon">
              <DeleteIcon className="delete-icon icon" />
            </div>
          </span>
        </div>
        {hasCustomSubCategories && <span className="custom-category__bot-line" />}
      </div>
      <div className={`custom-category__subcategories ${hasCustomSubCategories ? 'more-than-two' : ''}`}>
        <div className="custom-category__subcategories--gap">
          {customSubCategories.map((customSubCategory) => (
            <CustomCategory
              key={customSubCategory.id}
              customCategory={customSubCategory}
              level={level + 1}
              onDeleteCustomCategory={handleDeleteCustomSubCategory}
              hasCustomCategories={hasCustomSubCategories}
              colors={colors}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export default memo(CustomCategory);
