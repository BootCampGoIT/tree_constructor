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
        level: [category.parent_id, category.id],
      }));
  };

  const closeCategory = (category) => {};

  const getFilteredCategories = (id, level) => {
    return allCategories
      .filter((category) => category.parent_id === id)
      .map((category) => ({
        ...category,
        level: [...level, category.id],
        subCategories: [],
        isOpen: false,
      }));
  };

  const getSubCategories = (id, level) => {
    console.log("level :>> ", level);
    const getTree = (categories, level) => {
      level.splice(0, 1);
      if (level.length) {
        return categories.map((category) =>
          category.id === level[0]
            ? {
                ...category,
                subCategories: [
                  ...getTree(
                    getFilteredCategories(level[0], [...category.level]),
                    level
                  ),
                ],
                isOpen: true,
              }
            : category
        );
      }
      return categories;
    };
    const res = getTree(baseCategories, [...level, id]);
    setBaseCategories(res);
  };

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

// if (level.length > 1) {
//   const innerCategories = [
//     ...categories.map((category) =>
//       category.id === level[level.length - 1]
//         ? {
//             ...categories,
//             subCategories: getMappedCategories(
//               category.subCategories,
//               category.level
//             ),
//           }
//         : category
//     ),
//   ];
// }
// if (level.length === 1) {
//   setBaseCategories((category) =>
//     category.map((category) =>
//       category.id === level[0]
//         ? {
//             ...category,
//             subCategories: [...categories],
//           }
//         : category
//     )
//   );
// }
