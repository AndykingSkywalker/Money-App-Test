import { createGlobalStyle } from "styled-components";

export const lightTheme = {
    body: '#fff',
    fontColor: '#000000',
    backgroundImage: "url('/Images/lightBackground.png')",
}

export const darkTheme = {
    body: '#2c041c',
    fontColor: '#FFFFFF',
    backgroundImage: "url('/Images/darkBackground.png')",
}

export const GlobalStyles = createGlobalStyle`

body {
    background-color: ${(props) => props.theme.body};
    color: ${(props) => props.theme.fontColor};
    background-image: ${(props) => props.theme.backgroundImage};
}

`;