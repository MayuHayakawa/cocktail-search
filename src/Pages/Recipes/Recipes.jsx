import React, { useState, useEffect } from 'react';
import Search from './Search';
import styled from 'styled-components';

const RecipesContainer = styled.div`
 margin-top: 10vh;
`

const Recipes = () => {
  return (
    <RecipesContainer>
      <Search />
    </RecipesContainer>
  )
}

export default Recipes