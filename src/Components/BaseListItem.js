import React from "react";
import sprite from "../icons/folders.svg";

const BaseListItem = ({ category, getSubCategories, closeCategory }) => {
  const getCategories = () => getSubCategories(category.id, category.level);

  const closeOpenedCategory = () => closeCategory(category);
  return (
    <li className='categoriesListItem' id={category.id} key={category.id}>
      <div
        className='itemBlock'
        onClick={getCategories}>
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
      {category.isOpen && category.subCategories.length && (
        <ul className='categoriesList'>
          {category.subCategories?.map((category) => (
            <BaseListItem
              key={category.id}
              category={category}
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
