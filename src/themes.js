import { createGlobalStyle } from "styled-components";

export const lightTheme = {
    body: '#fff',
    fontColor: '#000000'
}

export const darkTheme = {
    body: '#191a24',
    fontColor: '#FFFFFF'
}

export const GlobalStyles = createGlobalStyle`

body {

    background-color: ${(props) => props.theme.body};
    color: ${(props) => props.theme.fontColor};

}

`;