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
  overflow: hidden;
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

.gradient-circle.left {
    left:-30%;
}

.gradient-circle.right {
    left: 130%;
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
  background-image: linear-gradient(to right, rgba(0, 0, 0, 0), #5a21ff, 100%, 56%) 25%, #c4b7e5 50%, #5a21ff 70%, rgba(0, 0, 0, 0);
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
    display: flex;
    align-items: center;
    justify-content: center;
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

//results and leadership

.input-boxes {
    display: flex;
    justify-content: space-around;
    max-width: 120rem;
    margin: 0 auto;
    padding: 4.8rem 0;
  }

  .subject-box {
    align-self: center;
    justify-self: center;
    display: flex;
    gap: 1.2rem;
    align-items: center;
    justify-content: center;
  }

  .subject {
    font-size: 2.2rem;
    font-weight: 500;
    color: ${(props) => props.theme.colors.colorPrimaryLightest};
  }

  .result-input {
    padding: 1rem;
  }

  .search {
    padding: 1.2rem;
    outline: none;
    position: relative;

    &:focus {
      box-shadow: 0 0 1.2rem ${(props) => props.theme.colors.colorPrimary};
    }
  }

// aptitude and dsa main pages

.main-page-container{
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
}

.heading {
    font-size: 3rem;
    font-weight: 500;
    color: ${(props) => props.theme.colors.colorPrimaryLightest};
  }

  .contest-card {
    width: 30rem;
    height: 16rem;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: ${(props) => props.theme.colors.colorPrimaryLightest};
    border-radius: 3.2rem 1.2rem;
    box-shadow: 0 2.4rem 4.8rem rgba(0, 0, 0, 0.5);
    cursor: pointer;
    text-decoration: none;
    position: relative;
    transition: all 0.3s;

    &:hover{
      transform: scale(1.05);
    }
  }

  .contest-name {
    font-size: 4rem;
    font-weight: 600;
    color: ${(props) => props.theme.colors.colorBlack};
  }

  .contest-message {
    color: ${(props) => props.theme.colors.colorPrimaryLightest};
    font-size: 4.4rem;
    margin-top: 2rem;
  }

  .previous-test-box {
    width: 140rem;
    height: 100%;
    margin: 0 auto;
    border-top: 1px solid ${(props) => props.theme.colors.colorPrimaryLight};
    overflow: scroll;

    &::-webkit-scrollbar {
      width: 0;
    }
  }
  //current contests
  .current-contest-container{
    width: 100%;
  height: 100%;
  max-width: 130rem;
  margin: 0 auto;
  padding: 3.2rem 0;
  display: flex;
  flex-direction: column;
  gap: 2.4rem;
  }

  // previous contests
.previous-contests-container{
  width: 100%;
  height: 100%;
  max-width: 130rem;
  margin: 0 auto;
  padding: 3.2rem 0;
  display: flex;
  flex-direction: column;
  gap: 2.4rem;
}

.contest-box {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 2.4rem;
  }

  .previous-contest-container{
    position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.7);
  backdrop-filter: blur(1rem);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 5;
  }
  .previous-contest-box {
    width: 130rem;
    height: 90vh;
    background-color: ${(props) => props.theme.colors.colorTritaryDark};
    border: 1px solid rgba(255, 255, 255, 0.1);
    border-radius: 11px;
    padding: 3.2rem;
    overflow: scroll;

    &::-webkit-scrollbar {
    width: 0;
  }
  }

  .close {
    color: rgba(255, 255, 255, 0.7);
    font-size: 5.2rem;
    position: absolute;
    top: 1.2rem;
    right: 1.2rem;
    cursor: pointer;
  }

  .previous-contest-heading {
    color: ${(props) => props.theme.colors.colorTritary};
    font-size: 3.6rem;
    font-weight: 500;
    letter-spacing: 1px;
    text-align: center;
    margin-bottom: 1.2rem;
  }

  .question-box {
    overflow: scroll;

    &::-webkit-scrollbar {
      width: 0;
    }
  }

  //test pages
.ready-container{
  width: 100%;
  padding: 9.6rem;
  display: flex;
  flex-direction: column;
  gap: 9.6rem;
  align-items: center;
  justify-content: center;
}

.test-heading {
    color: ${(props) => props.theme.colors.colorTritary};
    font-size: 7.4rem;
    font-weight: 500;
    letter-spacing: 1.5px;
  }

  .rules-box {
    display: flex;
    flex-direction: column;
    gap: 2.4rem;
  }

  .rules-heading {
    font-size: ${(props) => props.theme.fontSizes.small};
    color: ${(props) => props.theme.colors.colorTritaryLight};
    font-weight: 700;
  }

  .rules {
    list-style: decimal;
    padding-left: 2.4rem;
    color: ${(props) => props.theme.colors.colorTritaryLightest};
    font-size: 2.2rem;
    display: flex;
    flex-direction: column;
    gap: 2.4rem;
  }

  .rule-important {
    color: ${(props) => props.theme.colors.colorTritary};
    font-weight: 700;
  }

  .test-start {
    width: 18rem;
  }

  .finished-container{
    width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-around;
  gap: 3.2rem;
  }

  .greeting-icon {
    font-size: 6.2rem;
  }

  .greetings {
    padding: 1.2rem;
    font-size: 6.2rem;
    font-weight: 500;
    font-style: italic;
    background-image: linear-gradient(
      to right,
      #f68989,
      #f09d71,
      #dbb368,
      #bdc876,
      #9ad997,
      #6fddb4,
      #3eddd4,
      #00dbf3,
      #00cbff,
      #36b7ff,
      #819eff,
      #b680e8
    );

    text-align: center;
    -webkit-background-clip: text;
    color: transparent;
  }
`;

export default GlobalStyles;
