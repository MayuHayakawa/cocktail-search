import React, { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import ThemeContext from '../../Context/ThemeContext';
import axios from 'axios';
import SearchByName from './SearchByName';
import SearchByIngredient from './SearchByIngredient';

const SearchContainer = styled.div`
  padding: 2rem 5rem;
  .categoryContainer {
    margin: 2rem 0;
    display: flex;
    justify-content: space-between;
    &-option {
      display: flex;
      text-align: center;
      width: 20%;
      height: 3rem;
      &-label {
        display: block;
        width: 100%;
        height: 100%;
        background-color: ${props => props.color === "light" ? "var(--light-bg-primary)" : "var(--dark-bg-primary)"};
        color: ${props => props.color === "light" ? "var(--light-font-primary)" : "var(--dark-font-primary)" };
        padding-top: 1rem;
        cursor: pointer;
        input {
          display: none;
          &:checked + .categoryContainer-option-label{
            background-color: ${props => props.color === "light" ? "var(--light-font-primary)" : "var(--dark-font-primary)"};
          }
        }
      }
    }
  }

  
`

const Search = () => {
  const { theme } = useContext(ThemeContext);
  const items = ['Name', 'Ingredient', 'Random'];

  // const [ loading, setLoading ] = useState(false);
  const [ selected, setSelected ] = useState(""); //users select
  const [ ingredientsData, setIngredientsData ] = useState([]); //data that mach with user input
  const [ recipeId, setRecipeId ] = useState("");
  const navigate = useNavigate();

  // {set search field}
  const handleChange = (e) => {
    switch(e.target.value) {
      case 'Name':
        setSelected('Name');
      break;
      case 'Ingredient':
        setSelected('Ingredient');
        const fetchIngredientsData = async () => {
          try {
            const res = await axios.get(`https://www.thecocktaildb.com/api/json/v1/1/list.php?i=list`);
            setIngredientsData(res.data.drinks);
          }
          catch (error) {
            console.log(`Error while fetching api: ${error}`);
          }
        }
        fetchIngredientsData();
      break;
      case 'Random':
        setSelected('Random'); //do i need it?
        const fetchRecipesData = async () => {
          try {
            const res = await axios.get(`https://www.thecocktaildb.com/api/json/v1/1/random.php`);
            console.log(res.data.drinks);
            console.log(res.data.drinks[0].idDrink);
            setRecipeId(res.data.drinks[0].idDrink);
          }
          catch (error) {
            console.log(`Error while fetching api: ${error}`);
          }
        }
        fetchRecipesData();
      break;
    }
  }
    
  useEffect(() => {
    handleRoute(recipeId);
  },[recipeId]);

  function handleRoute(id) {
    navigate(`/recipes/${id}`);
  }

  return (
    <SearchContainer color={theme}>
      <h2>Search by...</h2>
      <div className="categoryContainer">
        {items.map((item) => {
          return (
            <div className="categoryContainer-option" key={item}>
              <label className="categoryContainer-option-label">
                {item}
                <input
                  type="radio"
                  value={item}
                  onChange={handleChange}
                  checked={item === selected}
                />
              </label>
            </div>
          )
        })}
      </div>
      { selected === 'Name' && (
        <SearchByName />
      )}
      { selected === 'Ingredient' && (
        <SearchByIngredient 
          placeholder={'Input an ingredient'}
          data={ingredientsData}
        />
      )}
    </SearchContainer>
  )
}

export default Search

