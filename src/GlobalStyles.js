import { createGlobalStyle } from 'styled-components'

export default createGlobalStyle`
  * {
    box-sizing: border-box;
  }


body {
    font-family: sans-serif;
    margin: 0;
  }

  html, body {
    position: fixed;
    width: 100%;
    height: 100%;
    overflow: hidden;
    margin: 0;
    padding: 0;
  }

  input, textarea {
    appearance: none;
  }

  h1, h2, h3, h4, h5, h6,
  ul, ol {
    margin: 0;
  }


`
