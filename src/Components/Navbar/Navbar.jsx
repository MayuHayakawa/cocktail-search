import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import ThemeContext from '../../Context/ThemeContext';
import styled from 'styled-components';
import { TbSun,TbMoonFilled } from "react-icons/tb";

const Nav = styled.nav`
    position: fixed;
    top: 0;
    width: 100%;
    height: 10vh;
    display: flex;
    align-items: center;
    background-color: ${props => props.color === "light" ? "var(--light-bg-primary)" : "var(--dark-bg-primary)" };
    color: ${props => props.color === "light" ? "var(--light-font-primary)" : "var(--dark-font-primary)" };
    justify-content: space-around;
    padding: 1rem 0;
    z-index: 10;
    h1 {
        font-family: "Seasrn";
        font-size: 2rem;
        a {
            color: ${props => props.color === "light" ? "var(--light-font-primary)" : "var(--dark-font-primary)" };
            text-decoration: none;
        }
    }
    ul {
        width: 50%;
        display: flex;
        list-style: none;
        justify-content: flex-end;
        li {
            cursor: pointer;
            font-family: LatoBold;
            font-size: 1.3rem;
            margin: auto 1rem;
            a {
                color: ${props => props.color === "light" ? "var(--light-font-primary)" : "var(--dark-font-primary)" };
                text-decoration: none;
            }
            a:hover {
                text-decoration: underline;
            }
        }
    }
    @media screen and (max-width: 768px) {
        h1 {
            position: relative;
            width: 100%;
            text-align: center;
        }
        ul {
            position: relative;
            width: 30%;
            padding: 1rem;
            li {
                display: none;
            }
        }
    }
`

const Button = styled.button`
    background-color: ${props => props.color === "light" ? "var(--light-bg-secondary)" : "var(--dark-bg-secondary)" };
    color: ${props => props.color === "light" ? "var(--light-font-primary)" : "var(--dark-font-primary)" };
    box-sizing: border-box;
    display: flex;
    font-size: 1rem;
    font-family: LatoBold;
    justify-content: center;
    line-height: 1.5rem;
    padding: 0.5rem 1rem;
    position: relative;
    text-align: center;
    text-decoration: none #000000 solid;
    width: 5rem;
    /* max-width: 460px; */
    position: relative;
    cursor: pointer;
    transform: rotate(-2deg);
    user-select: none;
    -webkit-user-select: none;
    touch-action: manipulation;
    &:focus {
        outline: 0;
    }
    &:after {
        content: '';
        position: absolute;
        border: 1px solid ${props => props.color === "light" ? "var(--light-font-primary)" : "var(--dark-font-primary)" };
        bottom: 4px;
        left: 4px;
        width: calc(100% - 1px);
        height: calc(100% - 1px);
    }
    &:hover:after {
        bottom: 2.5px;
        left: 2.5px;
    }
`

const Navbar = () => {
    const { theme, toggleTheme } = useContext(ThemeContext);

  return (
    <Nav color={theme}>
        <h1>
            <Link to="/">COCKTAIL SEARCH</Link>
        </h1>
        <ul>
            <li>
                <Link to="/">Home</Link>
            </li>
            <li>
                <Link to="/recipes">Recipes</Link>
            </li>
            <li>
                <Link to="/favorite">Favorite</Link>
            </li>
            <Button 
                color={theme}
                onClick={toggleTheme}
            >
                {theme === "light" ? "Dark" : "Light" }
                {/* {theme === "light" ? "Dark" + <TbMoonFilled /> : "Light" + <TbSun /> } */}
            </Button>
        </ul>
    </Nav>
  )
}

export default Navbar