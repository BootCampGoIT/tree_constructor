import React, { useState, useEffect } from "react";

import { AppContainer } from "./AppStyled";
import BaseListItem from "./BaseListItem";

const data = [
  { id: 1, parent_id: 0, name: "Ноутбуки" },
  { id: 2, parent_id: 0, name: "Мобильные телефоны" },
  { id: 3, parent_id: 0, name: "Бытовая техника" },
  { id: 4, parent_id: 0, name: "Микроволновки" },
  { id: 5, parent_id: 0, name: "Утюги" },
  { id: 6, parent_id: 0, name: "Инструменты" },
  { id: 7, parent_id: 0, name: "Цветы" },

  { id: 8, parent_id: 1, name: "Acer" },
  { id: 9, parent_id: 1, name: "Dell" },
  { id: 10, parent_id: 1, name: "Apple" },
  { id: 11, parent_id: 1, name: "Asus" },
  { id: 12, parent_id: 1, name: "Siemens" },
  { id: 13, parent_id: 1, name: "Philips" },

  { id: 14, parent_id: 10, name: "MacBook" },
  { id: 15, parent_id: 10, name: "MacBook pro" },
  { id: 16, parent_id: 10, name: "blaBla" },

  { id: 17, parent_id: 14, name: "15" },
  { id: 18, parent_id: 14, name: "17" },
  { id: 19, parent_id: 14, name: "19" },
];

const App = () => {
  const [allCategories, setAllCategories] = useState(null);
  const [baseCategories, setBaseCategories] = useState(null);
  useEffect(() => {
    setAllCategories(data);
    setBaseCategories(getBaseCategories(data));
  }, []);

  const getBaseCategories = (data) => {
    return data
      .filter((category) => category.parent_id === 0)
      .map((category) => ({
        ...category,
        subCategories: [],
        isOpen: false,
        level: [category.id],
      }));
  };

  const getFilteredCategories = (parent_id) =>
    allCategories
      .filter((category) => category.parent_id === parent_id)
      .map((category) => ({
        ...category,
        subCategories: [],
        isOpen: false,
        level: category.level
          ? [category.id, ...category.level]
          : [category.id, parent_id],
      }));

  const closeCategory = (id, level = []) => {
    if (!level.length) {
      setBaseCategories((prevState) => [
        ...prevState.map((category) =>
          category.id === Number(id) ? { ...category, isOpen: false } : category
        ),
      ]);
    }
  };

  const getSubCategories = (categories, level = []) => {
    console.log(`level`, level);
    // newLevel.slice(1, newLevel.length - 1);
    if (level.length === 1) {
      const filteredCategories = getFilteredCategories(level[0]);
      return setBaseCategories((prev) => [
        ...prev.map((category) => {
          return category.id === level[0]
            ? {
                ...category,
                subCategories: [...filteredCategories],
                isOpen: true,
                level: [category.id],
              }
            : category;
        }),
      ]);
    }

    if (level.length > 1) {
      const newLevel = [...level];
      let result = [];

      const getNewSubcategories = (categories, level = []) => {
        // const newCategories = getFilteredCategories(level[0]);
        if (level.length === 1) {
          const filteredCategories = getFilteredCategories(level[0]);
          return categories.map((category) => {
            newLevel.splice(0, 1);
            return category.id === level[0]
              ? {
                  ...category,
                  subCategories: [...filteredCategories],
                  isOpen: true,
                  level: [category.id, ...level],
                }
              : category;
          });
        }
      };

      if (level.length > 1) {
        return getNewSubcategories(result, newLevel);
      }

      // getSubCategories(level[0], level);
      // newLevel.slice(1, newLevel.length - 1);
    }
  };

  return (
    <AppContainer>
      <ul className="categoriesList">
        {baseCategories?.map((category) => (
          <BaseListItem
            category={category}
            getSubCategories={getSubCategories}
            closeCategory={closeCategory}
            key={category.id}
          />
        ))}
      </ul>
    </AppContainer>
  );
};

export default App;
