import React, { useState, useEffect, useContext } from 'react';
import styled from 'styled-components';
import ThemeContext from '../../Context/ThemeContext';
import axios from 'axios';
import RecipeCards from './RecipeCards';

const FirstLetters = styled.div`
  display: flex;
  justify-content: center;
  div {
    margin: 1rem;
    button {
      font-size: 1.1rem;
      width: 2rem;
      height: 2rem;
      background-color: ${props => props.color === "light" ? "var(--light-bg-primary)" : "var(--dark-bg-primary)"};
      color: ${props => props.color === "light" ? "var(--light-font-primary)" : "var(--dark-font-primary)" };
      border: none;
      cursor: pointer;
      &:hover {
        background-color: ${props => props.color === "light" ? "var(--light-bg-secondary)" : "var(--dark-bg-secondary)"};
      }
    }
  }
`

const SearchByName = () => {
  const { theme } = useContext(ThemeContext);
  const firstLetters = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'];
  
  const [ firstLetter, setFirstLetter ] = useState("");
  const [ recipes, setRecipes ] = useState([]);

  useEffect(() => {
    if(firstLetter) {
      async function fetchRecipes() {
        try {
          const res = await axios.get(`https://www.thecocktaildb.com/api/json/v1/1/search.php?f=${firstLetter}`);
          setRecipes(res.data.drinks);
        }
        catch (error) {
          console.log(`Error while fetching api: ${error}`)
        }
      }
      fetchRecipes();
    }
  }, [firstLetter])

  return (
    <>
      <FirstLetters color={theme}>
        {firstLetters.map((value) => {
          return (
            <div key={value}>
              <button onClick={(e) => setFirstLetter(value)}>{value}</button>
            </div>
          )
        })}
      </FirstLetters>
      { recipes && recipes.length != 0 && (
        <RecipeCards data={recipes} />
      )}
    </>
  )
}

export default SearchByName