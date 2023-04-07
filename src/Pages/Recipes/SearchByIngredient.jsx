import React, { useState, useEffect, useContext } from 'react';
import styled from 'styled-components';
import ThemeContext from '../../Context/ThemeContext';
import axios from 'axios';
import { TbSearch } from "react-icons/tb";
import { CgClose } from "react-icons/cg";
import RecipeCards from './RecipeCards';

const InputContainer = styled.div`
  display: flex;
  justify-content: center;
  input {
    width: 30%;
    height: 2rem;
  }
  button {
    width: 2rem;
    height: 2rem;
    font-size: 1.3rem;
  }

  
`

const SearchByIngredient = ( { placeholder,data } ) => {
  const { theme } = useContext(ThemeContext);

  const [ filteredData, setFilteredData ] = useState([]);
  const [ wordEntered, setWordEntered ] = useState("");
  const [ isFocus, setIsFocus ] = useState(false);
  const [ ingredient, setIngredient ] = useState("");
  const [ recipes, setRecipes ] = useState([]);

  useEffect(() => {
    const newFilter = data.filter((value) => {
      const reg = new RegExp(`^${wordEntered}`, 'gi'); //create RegExp object
      return reg.test(value.strIngredient1.toLowerCase()); //test() returns true or false
    })
    if(wordEntered === "") {
      setFilteredData("");
    } else {
      setFilteredData(newFilter);
    }
  }, [wordEntered]);

  useEffect(() => {
    if(ingredient) {
      const fetchRecipes = async () => {
        try {
          const res = await axios.get(`https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=${ingredient}`);
          setRecipes(res.data.drinks)
        }
        catch (error) {
          console.log(`Error while fetching api: ${error}`);
        }
      }
      fetchRecipes();
    }
  }, [ingredient])

  const checkInput = () => {
    if(wordEntered.includes(data)) {
      setIngredient(wordEntered);
    } else {
      alert("there are not ingredient you input");
      console.log("no ingredient!")
    }
    setIsFocus(false);
  }

  const clearInput = () => {
    setFilteredData(data);
    setWordEntered("");
  }

  return (
    <>
      <InputContainer>
          <input
            onFocus={() => setIsFocus(true)}
            type="text"
            placeholder={placeholder}
            value={wordEntered}
            onChange={(e) => setWordEntered(e.target.value)}
          />
          <button>
            { wordEntered.length === 0 ? (
              <TbSearch onClick={checkInput}/>
            ):(
              <CgClose onClick={clearInput}/>
            )}
          </button>
          <div>
            { filteredData && filteredData.length != 0 && isFocus === true && (
            <ul>
              {filteredData.map((value, i) => {
                return(
                  <li 
                    key={i}
                    onClick={async () => {
                      setWordEntered(value.strIngredient1);
                      setIngredient(value.strIngredient1);
                      setIsFocus(false);
                    }}
                  >
                    {value.strIngredient1}
                  </li>
                )
              })}
            </ul>
            )}
          </div>
      </InputContainer>
      { recipes && recipes.length != 0 && (
        <RecipeCards data={recipes} />
      )}
    </>
  )
}

export default SearchByIngredient