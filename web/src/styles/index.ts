import { createGlobalStyle } from 'styled-components';

export default createGlobalStyle`
  @import url('https://fonts.googleapis.com/css2?family=Baloo+Bhai+2:wght@400;500;600;700&display=swap');

  * {
    margin: 0;
    padding: 0;
    outline: 0;
    box-sizing: border-box;
    -webkit-font-smoothing: antialiased !important;
    &::selection {
      background: transparent;
    }
  }

  html {
    font-size: 62.5%;
  }
  
  html, body, #root {
    font-family: 'Baloo Bhai 2' ,sans-serif;
    min-height: 100vh;
    max-height: 100vh;
    max-width: 100vw;
  }

`;
