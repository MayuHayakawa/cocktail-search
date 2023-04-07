import axios from 'axios';
import React, { useState, useEffect } from 'react'
import RecipeCards from './RecipeCards';

const SearchByName = () => {
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
      <div>
        {firstLetters.map((value) => {
          return (
            <div key={value}>
              <button onClick={(e) => setFirstLetter(value)}>{value}</button>
            </div>
          )
        })}
      </div>
      { recipes && recipes.length != 0 && (
        <RecipeCards data={recipes} />
      )}
    </>
  )
}

export default SearchByName