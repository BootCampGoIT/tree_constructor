import styled from "styled-components";

export const AppContainer = styled.div`
  .categoriesList {
    list-style: none;
  }
  .categoriesListItem {
    display: flex;
    flex-direction: column;
    cursor: pointer;
  }
  .itemBlock {
    display: flex;
    align-items: center;
  }
  .icon {
    width: 30px;
    height: 30px;
    fill: yellowgreen;
  }
  .title {
    margin-left: 10px;
  }
`;
