import { createGlobalStyle } from 'styled-components'
 
const GlobalStyle = createGlobalStyle`
  body {
    margin: 0;
    padding: 0;
    background-color: #fff;
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh;
    width: 100%;
  }

  * {
    font-size: 16px;
    font-family: 'Roboto', sans-serif;
    font-weight: 300;
  }
`
 
export default GlobalStyle