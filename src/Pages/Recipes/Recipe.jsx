import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import styled from 'styled-components';

const RecipeContainer = styled.div`
 margin-top: 10vh;
`

const Recipe = () => {
  const { id } = useParams();
  const [ recipe, setRecipe ] = useState([]);

  useEffect(() => {
    console.log(id);
    async function fetchRecipe() {
      try {
        const res = await axios.get(`https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${id}`);
        console.log(res.data.drinks);
        setRecipe(res.data.drinks)
      }
      catch (error) {
        console.log(`Error while fetching api: ${error}`)
      }
    }
    fetchRecipe();
  }, [id])

  return (
    <RecipeContainer>
      {recipe.map((value) => {
        return(
          <div>
            <div>
              <img src={value.strDrinkThumb}/>
            </div>
            <h1>{value.strDrink}</h1>
          </div>
        )
      })}
    </RecipeContainer>
  )
}

export default Recipe