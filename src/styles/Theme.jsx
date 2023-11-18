import React from 'react';
import { ThemeProvider } from 'styled-components';

const theme = {
  colors: {
    colorPrimary: '#5a21ff',
    colorPrimaryLight: '#7c4fff',
    colorPrimaryLighter: '#cac7d1',
    colorPrimaryLightest: '#c4b7e5',
    colorSecondary: '#008cff',
    colorSecondaryLight: '#39a6ff',
    colorSecondaryLighter: '#aad9ff',
    colorSecondaryLightest: '#e3f2ff',
    colorTritary: '#00c2a8',
    colorTritaryLight: '#39ffe4',
    colorTritaryLighter: '#aafff4',
    colorTritaryLightest: '#e3fffb',
  },
  fontSizes: {
    small: '1em',
    medium: '2em',
    large: '3em',
  },
};

const Theme = ({ children }) => (
  <ThemeProvider theme={theme}>{children}</ThemeProvider>
);

export default Theme;
