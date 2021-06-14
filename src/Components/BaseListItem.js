import React from "react";
import sprite from "../icons/folders.svg";

const BaseListItem = ({ category, getSubCategories, closeCategory }) => {
  const getCategories = () =>
    getSubCategories(category.subCategories, category.level);
  const closeOpenedCategory = () => closeCategory(category.id, category.level);

  return (
    <li className="categoriesListItem" key={category.id}>
      <div
        className="itemBlock"
        onClick={category.isOpen ? closeOpenedCategory : getCategories}
      >
        <svg className="icon">
          <use
            href={
              !category.isOpen
                ? sprite + "#icon-folder"
                : sprite + "#icon-folder-open"
            }
          />
        </svg>
        <p className="title">{category.name}</p>
      </div>
      {category.isOpen && (
        <ul className="categoriesList">
          {category?.subCategories.length &&
            category.subCategories.map((category) => (
              <BaseListItem
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
