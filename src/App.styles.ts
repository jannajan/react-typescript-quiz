import styled, { createGlobalStyle } from "styled-components"
import bgImage from "./images/img-main.jpg"

// TODO: Clean up these styles and leverage material-ui
export const GlobalStyle = createGlobalStyle`
 html {
   height: 100%;
 }

 body {
   background: url(${bgImage}) no-repeat;
   background-size: cover;
 }

 * {
   box-sizing: border-box;
   font-family: 'Roboto', sans-serif;
 }
`

export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  > p {
    color: #fff;
  }

  .subtext {
    margin-bottom: 1rem;
    color: #fff;
  }

  .score {
    color: #fff;
    font-size: 2rem;
    margin: 0;
  }

  h1 {
    font-family: Montserrat, "Arial Narrow Bold", sans-serif;
    color: #222831;
    font-size: 4rem;
    text-align: center;
    margin: 1rem 1rem 0 1rem;
  }

  .start,
  .next {
    cursor: pointer;
    background: linear-gradient(180deg, #fff, #ffcc91);
    border: 2px solid #d38558;
    box-shadow: 0px 5px 10px rgba(0, 0, 0.25);
    border-radius: 10px;
    height: 40px;
    margin: 20px 0;
    padding: 0 40px;
  }

  .start {
    max-width: 200px;
  }
`
