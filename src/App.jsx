import { useState } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import ThemeContext from './Context/ThemeContext';

import Navbar from './Components/Navbar/Navbar';
import Hero from './Components/Hero/Hero';
import Home from './Pages/Home/Home';
import Recipes from './Pages/Recipes/Recipes';
import Favorite from './Pages/Favorite/Favorite';

import "./fonts/Lato-Regular.ttf";
import "./fonts/Lato-Bold.ttf";
import "./fonts/SEASRN.ttf";

function App() {
  const [theme, setTheme] = useState("light");

  const toggleTheme = () => {
    setTheme(theme === "light" ? "dark" : "light");
  };

  return (
    <ThemeContext.Provider value={{theme, toggleTheme}}>
      <BrowserRouter>
      <Navbar />
        <Routes>
          <Route path="/" element={<Home />}></Route>
          <Route path="/recipes" element={<Recipes />}></Route>
          <Route path="/favorite" element={<Favorite />}></Route>
        </Routes>
      </BrowserRouter>
    </ThemeContext.Provider>
  )
}

export default App
