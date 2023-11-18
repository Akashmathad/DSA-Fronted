import styled from 'styled-components';

const Button = styled.button`
  width: 100%;
  height: 5.2rem;
  border: none;
  border-radius: 999px;
  cursor: pointer;
  color: ${(props) => props.theme.colors.colorWhite};
  font-size: 2.2rem;
  font-weight: 500;
  transition: all 0.3s;
  background-color: ${(props) => {
    switch (props.color) {
      case 'green':
        return (props) => props.theme.colors.colorTritary;
      case 'red':
        return (props) => props.theme.colors.colorTritary;
      case 'blue':
        return (props) => props.theme.colors.colorSecondary;
      case 'purple':
        return (props) => props.theme.colors.colorPrimary;
      default:
        return (props) => props.theme.colors.colorTritary;
    }
  }};

  &:hover {
    transform: scale(1.03);
  }
`;

export default Button;
