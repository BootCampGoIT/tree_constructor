import React from "react";
import sprite from "../icons/folders.svg";

const BaseListItem = ({ category, getSubCategories, closeCategory }) => {
  const getCategories = () => getSubCategories(category.id, category.path);
  const closeOpenedCategory = () => closeCategory(category.id, category.path);
  return (
    <li className='categoriesListItem' id={category.id} key={category.id}>
      <div
        className='itemBlock'
        onClick={category.isOpen ? closeOpenedCategory : getCategories}>
        <svg className='icon'>
          <use
            href={
              !category.isOpen
                ? sprite + "#icon-folder"
                : sprite + "#icon-folder-open"
            }
          />
        </svg>
        <p className='title'>{category.name}</p>
      </div>
      {category.isOpen && (
        <ul className='categoriesList'>
          {category.subCategories?.map((category) => (
            <BaseListItem
              category={category.subCategories}
              getSubCategories={getSubCategories}
              closeCategory={closeCategory}
            />
          ))}
        </ul>
      )}
    </li>
  );
};

export default BaseListItem;
