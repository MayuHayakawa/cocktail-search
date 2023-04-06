import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { TbSearch } from "react-icons/tb";
import { CgClose } from "react-icons/cg";

const Search = () => {
  const items = ['Name', 'Ingredient', 'Random'];

  // const [ loading, setLoading ] = useState(false);

  const [ selected, setSelected ] = useState(""); //users select
  const [ firstLetter, setFirstLetter ] = useState(""); //for name category
  const [ categorizedData, setCategorizedData ] = useState([]); //initial data depends on category
  const [ filteredData, setFilteredData ] = useState([]); //data that mach with user input
  const [ wordEntered, setWordEntered ] = useState("");

  const [ keyword, setKeyword ] = useState(""); // enter data
  const [ recipes, setRecipes ] = useState(""); //array recipes data from api

  // {set search field}
  const handleChange = (e) => {
    switch(e.target.value) {
      case 'Name':
        setSelected('Name');
      break;
      case 'Ingredient':
        setSelected('Ingredient');
        const fetchCategorizedDataByIngredient = async () => {
          try {
            const res = await axios.get(`https://www.thecocktaildb.com/api/json/v1/1/list.php?i=list`);
            console.log(res.data.drinks);
            setCategorizedData(res.data.drinks);
          }
          catch (error) {
            console.log(`Error while fetching api: ${error}`);
          }
        }
        fetchCategorizedDataByIngredient();
      break;
      case 'Random':
        setSelected('Random'); //do i need it?
        const fetchRecipesData = async () => {
          try {
            const res = await axios.get(`https://www.thecocktaildb.com/api/json/v1/1/random.php`);
            // console.log(res.data);
            setRecipes(res.data);
          }
          catch (error) {
            console.log(`Error while fetching api: ${error}`);
          }
        }
        fetchRecipesData();
      break;
    }
  }

  //get name category api data with first letter
  useEffect(() => {
    if(firstLetter != "") {
      async function fetchCategorizedDataByName() {
        try {
          const res = await axios.get(`https://www.thecocktaildb.com/api/json/v1/1/search.php?f=${firstLetter}`);
          setCategorizedData(res.data.drinks);
        }
        catch (error){
          console.log(`Error while fetching api: ${error}`);
        }
      }
      fetchCategorizedDataByName();
    }
  }, [firstLetter]);

  //autocrrect
  useEffect(() => {
    if(categorizedData) {
      const newFilter = categorizedData.filter((data) => {
        if(selected === 'Name') {
          return data.strDrink.toLowerCase().includes(wordEntered.toLowerCase());
        } else if(selected === 'Ingredient')
          return data.strIngredient1.toLowerCase().includes(wordEntered.toLowerCase());
      });
      if(wordEntered === "") {
        setFilteredData([]);
      } else {
        console.log(newFilter);
        setFilteredData(newFilter);
      }
    }
  }, [wordEntered])

  // setWordEntered and setFirstLetter for search by name
  const handleFilter = (e) => {
    const searchWord = e.target.value;
    setWordEntered(searchWord);
    if(selected === 'Name') {
      setFirstLetter(searchWord.charAt(0));
    }
  };
  
  // {display}
  const onSubmitHandler = (e) => {
    // method
  }

  const clearInput = () => {
    setFilteredData([]);
    setWordEntered("");
  }

  return (
    <>
      <div>Search by...</div>
        <div>
          {items.map((item) => {
            return (
              <div key={item}>
                <input
                  id={item}
                  type="radio"
                  value={item}
                  onChange={handleChange}
                  checked={item === selected}
                />
                <label htmlFor={item}>{item}</label>
              </div>
            )
          })}
        </div>
        <form onSubmit={onSubmitHandler} >
          <input
            type="text"
            placeholder='Search for a recipe...'
            value={wordEntered}
            // onKeyUp={handleFilter}
            onChange={handleFilter}
          />
          <div>
            { filteredData && filteredData.length != 0 && selected === 'Name' && (
              <ul>
                {filteredData.map((data) => {
                  return (
                    <li key={data.idDrink}>
                      {data.strDrink}
                    </li>
                  )
                })}
              </ul>
            )}
            { filteredData && filteredData.length != 0 && selected === 'Ingredient' && (
              <ul>
                {filteredData.map((data) => {
                  return (
                    <li key={data.index}>
                      {data.strIngredient1}
                    </li>
                  )
                })}
              </ul>
            )}
          </div>
          <button>
            { wordEntered.length === 0 ? (
              <TbSearch />
            ):(
              <CgClose onClick={clearInput}/>
            )}
          </button>
        </form>
    </>
  )
}

export default Search

