import styled from 'styled-components';
import { conatinerWidth } from '../styles/defaults';
import { useEffect, useState } from 'react';
import { colorPrimaryLight, colorWhite } from '../styles/colors';

function HomePage() {
  const [quote, setQuote] = useState('');
  const [author, setAuthor] = useState('');
  useEffect(
    () =>
      async function () {
        try {
          const category = [
            'dreams',
            'failure',
            'forgiveness',
            'friendship',
            'happiness',
            'inspirational',
            'life',
            'mom',
            'success',
          ];

          const req = await fetch(
            `https://api.api-ninjas.com/v1/quotes?category=${
              category[Math.floor(Math.random() * category.length)]
            }`,
            {
              method: 'GET',
              headers: {
                'X-Api-Key': 'knDLLw79l8uotqUr8WAzsyT19SppeTCanAphXMxR',
                'Content-Type': 'application/json',
              },
            }
          );
          const data = await req.json();
          setQuote(data[0].quote);
          setAuthor(data[0].author);
          console.log(data[0]);
        } catch (e) {
          console.log(e);
        }
      },
    []
  );

  return (
    <Container>
      <HomePageContainer>
        <H2>Hello Gitians</H2>
        <QuoteConatiner>
          <QuoteHeading>Quote of the day...</QuoteHeading>
          <H1>{quote}</H1>
          <QuoteAuthor>&ndash; {author}</QuoteAuthor>
        </QuoteConatiner>
      </HomePageContainer>
    </Container>
  );
}

const Container = styled.div`
  background-image: linear-gradient(
    to bottom,
    #0e031a,
    #130522,
    #17082a,
    #1a0a32,
    #1e0a3a,
    #270c4a,
    #310e5a,
    #3b0f6a,
    #4d1588,
    #5f1aa7,
    #7320c7,
    #8726e8
  );
`;

const HomePageContainer = styled.div`
  padding: 9.6rem 0 3.2rem 0;
  max-width: ${conatinerWidth};
  margin: 0 auto;
  height: 100%;
`;

const H2 = styled.h2`
  font-size: 7.4rem;
  text-align: center;
  color: ${colorWhite};
  font-weight: 800;
  letter-spacing: -1.5px;
`;

const QuoteConatiner = styled.div`
  min-height: 55vh;
  padding: 4.8rem;
  display: flex;
  flex-direction: column;
  gap: 2.4rem;
`;
const QuoteHeading = styled.h3`
  font-size: 2.4rem;
  color: ${colorPrimaryLight};
`;
const H1 = styled.h1`
  font-size: 4.4rem;
  line-height: 1.2;
  color: ${colorWhite};
  font-style: italic;
  font-weight: 400;
`;
const QuoteAuthor = styled.p`
  align-self: flex-end;
  font-size: 2.4rem;
  color: ${colorPrimaryLight};
  font-style: italic;
  font-weight: 600;
`;

export default HomePage;
