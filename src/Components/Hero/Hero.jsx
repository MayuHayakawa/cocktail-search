import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import ThemeContext from '../../Context/ThemeContext';
import styled from 'styled-components';

import mainImageLight from "../../assets/image/cocktail_light.jpg";
import mainImageDark from "../../assets/image/cocktail_dark.jpg";

const Main = styled.div`
    position: relative;
    width: 100vw;
    height: 100vh;
    .imageContainer {
        width: 100%;
        height: 100%;
        background-color: ${props => props.color === "light" ? "var(--light-bg-primary)" : "var(--dark-bg-primary)" };
        img {
            width: 100%;
            height: 100%;
            object-fit: cover;
            opacity: 60%;
        }
    }
    .titleContainer {
        position: absolute;
        width: 100%;
        top: 45%;
        left: 50%;
        transform: translate(-50%, -50%);
        -webkit-transform: translate(-50%, -50%);
        -ms-transform: translate(-50%, -50%);
        h1 {
            font-size: 4rem;
            font-family: "Seasrn";
            color: ${props => props.color === "light" ? "var(--light-font-primary)" : "var(--dark-font-primary)" };
            text-align: center;
        }

    }
`

const Button = styled.button`
        position: absolute;
        top: 70%;
        left: 50%;
        transform: translate(-50%, -50%);
        -webkit-transform: translate(-50%, -50%);
        -ms-transform: translate(-50%, -50%);
        padding: 1.5rem 3rem;
        text-align: center;
        text-transform: uppercase;
        transition: 0.5s;
        background-size: 200% auto;
        color: white;
        -webkit-text-stroke: 1px ${props => props.color === "light" ? "var(--light-bg-secondary)" : "var(--dark-bg-secondary)" };
        border-radius: 10px;
        display: block;
        border: 0px;
        font-size: 2rem;
        letter-spacing: 1px;
        font-family: "LatoBold";
        /* box-shadow: 0px 0px 14px -7px #f09819; */
        box-shadow: 0px 0px 14px -7px ${props => props.color === "light" ? "var(--light-bg-primary)" : "var(--dark-bg-primary)" };
        background-image: ${props => props.color === "light" ? 
            "linear-gradient(45deg, var(--light-font-primary) 0%, var(--light-bg-secondary)  51%, var(--light-font-primary)  100%)"
            :
            "linear-gradient(45deg, var(--dark-font-primary) 0%, var(--dark-bg-secondary)  51%, var(--dark-font-primary)  100%)"};
        cursor: pointer;
        user-select: none;
        -webkit-user-select: none;
        touch-action: manipulation;
        &:hover {
            background-position: right center;
            color: #fff;
            text-decoration: none;
            cursor: pointer;
        }
        /* &:active {
            transform: scale(0.95);
        } */
`

const Hero = () => {
    const { theme } = useContext(ThemeContext);

  return (
    <Main color={theme}>
        <div className='imageContainer'>
            <img src={theme === "light" ? mainImageLight : mainImageDark} />
        </div>
        <div className='titleContainer'>
            <h1>Start searching COCKTAILS</h1>
        </div>
        <Link to="/recipes">
            <Button color={theme}>Get started</Button>
        </Link>
    </Main>
  )
}

export default Hero