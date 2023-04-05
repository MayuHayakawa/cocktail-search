import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { TbSearch } from "react-icons/tb";

const Search = () => {
  const items = ['Name', 'Ingredient', 'Random'];

  // const [ loading, setLoading ] = useState(false);

  const [ selected, setSelected ] = useState(""); //users select
  const [ firstLetter, setFirstLetter ] = useState("");
  const [ filteredData, setFilteredData ] = useState([]); //array that mach recipes
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
        setSelected('Ingredient'); //do i need it?
        const fetchFilteredDataByIngredient = async () => {
          try {
            const res = await axios.get(`https://www.thecocktaildb.com/api/json/v1/1/list.php?i=list`);
            setFilteredData(res.data);
            // console.log(filteredData);
          }
          catch (error) {
            console.log(`Error while fetching api: ${error}`);
          }
        }
        fetchFilteredDataByIngredient();
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

  useEffect(() => {
    console.log("firstletter changes");
    const fetchFilteredDataByName = async () => {
      try {
        const res = await axios.get(`https://www.thecocktaildb.com/api/json/v1/1/search.php?f=${firstLetter}`);
        setFilteredData(res.data.drinks);
      }
      catch (error){
        console.log(`Error while fetching api: ${error}`);
      }
    }
    fetchFilteredDataByName();
  }, [firstLetter]);

  // ERROR: filteredData is undefined?? 
  useEffect(() => {
    // console.log(filteredData);
    if(filteredData != "") {
      const newFilter = filteredData.filter((data) => {
        return data.strDrink.toLowerCase().includes(wordEntered.toLowerCase());
      });
      if(wordEntered === "") {
        setFilteredData([]);
      } else {
        console.log(newFilter);
        setFilteredData(newFilter);
      }
    }
  }, [wordEntered])

  // autocorrect
  const handleFilter = (e) => {
    const searchWord = e.target.value;
    setWordEntered(searchWord);
    if(selected === 'Name') {
      // const firstLetter = searchWord.charAt(0);
      setFirstLetter(searchWord.charAt(0));
      // console.log(firstLetter);
      // fetchFilteredDataByName(firstLetter);
    };
    // const newFilter = filteredData.filter((data) => {
    //   return data.strDrink.toLowerCase().includes(searchWord.toLowerCase());
    // });
    // if(searchWord === "") {
    //   setFilteredData([]);
    // } else {
    //   console.log(newFilter);
    //   setFilteredData(newFilter);
    // }
  };

  async function fetchFilteredDataByName(firstLetter) {
    try {
      const res = await axios.get(`https://www.thecocktaildb.com/api/json/v1/1/search.php?f=${firstLetter}`);
      setFilteredData(res.data.drinks);
    }
    catch (error){
      console.log(`Error while fetching api: ${error}`);
    }
  }
  
  // {display}
  const onSubmitHandler = (e) => {
    // method
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
            { filteredData.length != 0 && (
              <ul>
                {filteredData.map((value) => {
                  return (
                    <li key={value.idDrink}>
                      {value.strDrink}
                      {value.strDrinkThumb}
                    </li>
                  )
                })}
              </ul>
            )}
          </div>
          <button>
            <TbSearch />
          </button>
        </form>
    </>
  )
}

export default Search

