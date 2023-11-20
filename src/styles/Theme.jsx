import React from 'react';
import { ThemeProvider } from 'styled-components';

const theme = {
  colors: {
    colorPrimary: '#5a21ff',
    colorPrimaryLight: '#7c4fff',
    colorPrimaryLighter: '#cac7d1',
    colorPrimaryLightest: '#c4b7e5',
    colorPrimaryDark: '#18005c',
    colorSecondary: '#008cff',
    colorSecondaryLight: '#39a6ff',
    colorSecondaryLighter: '#aad9ff',
    colorSecondaryLightest: '#e3f2ff',
    colorTritary: '#00c2a8',
    colorTritaryLight: '#39ffe4',
    colorTritaryLighter: '#aafff4',
    colorTritaryLightest: '#e3fffb',
    colorTritaryDark: '#000b0a',
    colorRed: '#FF0000',

    colorWhite: '#fff',
    colorBlack: '#080315',

    colorBlack100: '#050505',
    colorBlack200: '#0f0f0f',
    colorBlack300: '#0f0f0f',
    colorBlack400: '#242424',
    colorBlack500: '#2e2e2e',
  },
  fontSizes: {
    small: '1.8rem',
    medium: '2em',
    large: '3em',
  },
};

const Theme = ({ children }) => (
  <ThemeProvider theme={theme}>{children}</ThemeProvider>
);

export default Theme;
