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
    setBaseCategories(getBaseCategories());
  }, []);

  const getBaseCategories = () => {
    return data
      .filter((category) => category.parent_id === 0)
      .map((category) => ({
        ...category,
        baseCategory: true,
        subCategories: [],
        isOpen: false,
        path: [0],
      }));
  };

  const closeCategory = (id, path = []) => {
    if (!path.length) {
      setBaseCategories((prevState) => [
        ...prevState.map((category) =>
          category.id === Number(id) ? { ...category, isOpen: false } : category
        ),
      ]);
    }
  };

  const getSubCategories = (id, path = []) => {};

  return (
    <AppContainer>
      <ul className='categoriesList'>
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
