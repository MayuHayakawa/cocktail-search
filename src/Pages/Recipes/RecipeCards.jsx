import React, { useState,useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const RecipeCards = ( data ) => {
  const [ recipes, setRecipes ] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    if(data) {
      setRecipes(data.data);
    }
  },[data])

  function handleRoute(id) {
    navigate(`/recipes/${id}`);
  }
  
  return (
    <div>
      {recipes.map((value) => {
        return(
          <div 
            key={value && value.idDrink}
            onClick={() => handleRoute(value.idDrink)}
          >
              <div>
                  <img src={value && value.strDrinkThumb} alt={value && value.strDrink}/>
              </div>
              <div>
                  <h2>{ value && value.strDrink}</h2>
              </div>
          </div>
        )
      })}
    </div>
  )
}

export default RecipeCards