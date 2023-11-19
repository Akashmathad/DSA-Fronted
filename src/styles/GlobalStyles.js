import { createGlobalStyle } from 'styled-components';
/* -FONT sizes(px)
10 / 12 / 14 / 16 / 18 / 20 / 24 / 30 / 36 / 44 / 52 / 62 / 74 / 86 / 98

-Font weights
Defualt: 400;
500
600
700

-Line heights
Defualt: 1;
1.05
1.2
Paragraph defualt:1.6

-Letter spacing
-0.5px
0.75px

-Spacing System(px)
2 / 4 / 8 / 12 / 16 / 24 / 32 / 48 / 64 / 80 / 96 / 128 */

const GlobalStyles = createGlobalStyle`
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

html {
  font-size: 62.5%;
}

body {
  font-weight: 400;
  line-height: 1;
  font-family: 'Instrument Sans', sans-serif;
  font-size: 1.6rem;
  color: #fff;
  background-color: #080315;
  overflow: hidden;
}

.button{
  background-color: ${(props) => props.theme.colors.colorPrimary};
  font-size: ${(props) => props.theme.fontSizes.small};
  transition: all 0.3s ease-in-out;
  color: inherit;
  font-weight: 500;
  padding: 0.9rem 1.8rem;
  text-decoration: none;
  border-radius: 999px;
  border: 1px solid rgba(255, 255, 255, 0.1);

  &:hover{
    background-color: ${(props) => props.theme.colors.colorPrimaryLight};
  }
}

.background{
  width: 100%;
  background-image: linear-gradient(rgba(0, 0, 0, 0), rgba(90, 33, 255, .15));
  
}

.height{
  width: 100%;
  height: 88.4vh;
}



.gradient-circle {
    width: 80%;
    height: 30rem;
    opacity: 1;
    filter: blur(20rem);
    background-color: ${(props) => props.theme.colors.colorPrimaryLight};
    border-radius: 1000%;
    position: absolute;
}

.gradient-circle.bottom {
    left: 50%;
    bottom: -15rem;
    transform: translate(-50%);
}

.gradient-circle.top {
    left: 50%;
    top: -15rem;
    transform: translate(-50%);
}

.gradient-circle.topest {
    left: 50%;
    top: -25rem;
    transform: translate(-50%);
}

.gradient-line {
  width: 90%;
  height: 1px;
  opacity: .8;
  background-image: linear-gradient(to right, rgba(0, 0, 0, 0), #5a21ff 25%, #c4b7e5 50%, #5a21ff 70%, rgba(0, 0, 0, 0));
  position: absolute;
}

.gradient-line.top{
  top: 0;
}

.gradient-line.bottom{
  bottom: 0;
}

//signup / login

.register-container{
  background-image: linear-gradient(rgba(90, 33, 255, .15), rgba(0, 0, 0, 0));
  width: 55rem;
  padding: 2.4rem 3.2rem;
    display: flex;
    flex-direction: column;
    gap: 3.2rem;
    align-items: center;
    justify-content: center;
    border-radius: 4rem;
    transition: all 0.3s;
    position: relative;
    overflow: hidden;
}

.heading {
    font-size: 3.8rem;
    font-weight: 600;
    color: ${(props) => props.theme.colors.colorWhite};
  }

  .details-form {
    display: flex;
    flex-direction: column;
    gap: 1.6rem;
    width: 100%;
  }

  .details-box {
    position: relative;
  }

  .details-input {
    width: 40rem;
    padding: 1rem 4.8rem;
    height: 4.4rem;
    font-family: inherit;
    background-color: ${(props) => props.theme.colors.colorBlack};
    border: 1px solid rgba(255, 255, 255, 0.15);
    border-radius: 8px;
    font-size: ${(props) => props.theme.fontSizes.small};
    color: ${(props) => props.theme.colors.colorWhite};
    transition: all 0.3s;
    outline: none;

    &:hover,
    &:active,
    &:focus {
      border: 1px solid #575757;
    }
  }

  .details-form {
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .icons {
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    font-size: 2.4rem;
    color: ${(props) => props.theme.colors.colorPrimaryLight};
    left: 1rem;
  }

  .buttons-box {
    width: 100%;
    padding: 0 4.8rem;
    gap: 2.4rem;
    display: flex;
    align-items: center;
    justify-content: center;
    margin-top: 1.2rem;
  }

  .cancel {
    background-color: ${(props) => props.theme.colors.colorBlack};
    border: 1px solid ${(props) => props.theme.colors.colorPrimary};
   z-index: 3;
  }

  @keyframes shake {
    0%,
    100% {
      transform: rotate(0) scale(1);
    }
    10%,
    30%,
    50%,
    70%,
    90% {
      transform: rotate(-2deg) scale(1.1);
    }
    20%,
    40%,
    60%,
    80% {
      transform: rotate(2deg) scale(1.1);
    }
  }
  .start {
    animation: shake 1s infinite;
    transition: all 0.3s;
  }

`;

export default GlobalStyles;
