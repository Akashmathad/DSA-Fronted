import {
  createContext,
  useContext,
  useEffect,
  useReducer,
  useState,
} from 'react';
import styled from 'styled-components';
import { colorBlack } from '../styles/colors';
import DSAReady from '../features/DSA/DSAReady';
import DSA from '../features/DSA/DSA';
import DSAFinished from '../features/DSA/DSAFinished';
import Error from '../features/Aptitude/Error';
import { AuthContext, ContestContext } from '../App';

const data4 = [
  {
    questionNumber: 1,
    questionDescription:
      'Lorem ipsum dolor, sit amet consectetur adipisicing elit. Hic sunt sint, a, minima voluptates nesciunt incidunt provident officiis voluptate vitae mollitia eum. Quae vero ab assumenda libero, dignissimos rerum maiores, unde maxime natus sint quas exercitationem nulla error sed voluptates',
    testCases: [
      {
        testCase: 1,
        input: '23 43 53 56 57',
        output: '34',
      },
      {
        testCase: 2,
        input: '23 4 53 57 57',
        output: '34',
      },
      {
        testCase: 3,
        input: '23 43 53 56 57',
        output: '34',
      },
    ],
  },
  {
    questionNumber: 2,
    questionDescription:
      'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Repellat harum, explicabo dolor eius maiores tempore, a ipsa, voluptates ad velit unde eos aliquid? Qui, nihil voluptate delectus quibusdam a mollitia.',
    testCases: [
      {
        testCase: 1,
        input: '23 43 53 56 57',
        output: '34',
      },
      {
        testCase: 2,
        input: '23 4 53 57 57',
        output: '34',
      },
      {
        testCase: 3,
        input: '23 43 53 56 57',
        output: '34',
      },
    ],
  },
  {
    questionNumber: 3,
    questionDescription:
      'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Repellat harum, explicabo dolor eius maiores tempore, a ipsa, voluptates ad velit unde eos aliquid? Qui, nihil voluptate delectus quibusdam a mollitia.',
    testCases: [
      {
        testCase: 1,
        input: '23 43 53 56 57',
        output: '34',
      },
      {
        testCase: 2,
        input: '23 4 53 57 57',
        output: '34',
      },
      {
        testCase: 3,
        input: '23 43 53 56 57',
        output: '34',
      },
    ],
  },
];

const starterCodes = [
  {
    java: `class solution{
  public int addition(int a, int b){
  // write ur code here...
  }
}`,
    cpp: `class Solution {
public:
  int addition(int a, int b) {
   //write your code here...           
  }
};`,
    python: `class Solution(object):
  def addition(self, a, b):
    //write your code here
`,
  },
  {
    java: `class solution{
  public int substact(int a, int b){
    // write ur code here...
  }
}`,
    cpp: `class Solution {
public:
  int substract(int a, int b) {
    //write your code here...           
  }
};`,
    python: `class Solution(object):
  def addition(self, a, b):
    //write your code here
`,
  },
  {
    java: `class solution{
  public int multiply(int a, int b){
  // write ur code here...
  }
}`,
    cpp: `class Solution {
  public:
  int multiply(int a, int b) {
    //write your code here...           
  }
};`,
    python: `class Solution(object):
  def multiply(self, a, b):
    //write your code here
`,
  },
];

const initialState = {
  questions: null,
  starterCodes: null,
  language: 'java',
  status: 'setup',
  index: 0,
  ans: [],
  results: [],
  secondsRemaining: null,
};

function reducer(state, action) {
  switch (action.type) {
    case 'dataReceived':
      return {
        ...state,
        questions: action.payload[0],
        starterCodes: action.payload[1],
        status: 'ready',
      };

    case 'dataFailed':
      return { ...state, status: 'error' };

    case 'start':
      return {
        ...state,
        results: [
          { status: false, message: 'Not submitted yet!', error: false },
          { status: false, message: 'Not submitted yet!', error: false },
          { status: false, message: 'Not submitted yet!', error: false },
        ],
        ans: [{}, {}, {}],
        status: 'active',
        secondsRemaining: 3600,
      };

    case 'nextQuestion':
      return { ...state, index: state.index + 1 };
    case 'previousQuestion':
      return { ...state, index: state.index - 1 };
    case 'changeLanguage':
      return { ...state, language: action.payload };
    case 'setAnswer':
      return {
        ...state,
        ans: action.payload,
      };
    case 'setResult':
      return {
        ...state,
        results: action.payload,
      };
    case 'check':
      return { ...state, status: 'checking' };
    case 'finish':
      return { ...state, status: 'finished' };
    case 'tick':
      return {
        ...state,
        secondsRemaining: state.secondsRemaining - 1,
        status: state.secondsRemaining === 0 ? 'checking' : state.status,
      };
    default:
      return { ...state, status: 'error' };
  }
}

export const DSAContext = createContext();

function handleFullscreenChange(dispatch) {
  if (!document.fullscreenElement) {
    dispatch({ type: 'check' });
  }
}

export function DSATest() {
  const [contestNumber, setContestNumber] = useState();
  const [contestName, setContestName] = useState();
  const [open, setOpen] = useState(true);
  const { jwt } = useContext(AuthContext);
  const { aptitudeContest, aptitudeName } = useContext(ContestContext);
  console.log(aptitudeContest, aptitudeName);
  const [
    {
      questions,
      starterCodes,
      index,
      ans,
      results,
      secondsRemaining,
      status,
      language,
    },
    dispatch,
  ] = useReducer(reducer, initialState);

  useEffect(
    function () {
      async function fetchData() {
        try {
          if (!jwt) return;
          const req = await fetch(
            `${
              import.meta.env.VITE_API_URL
            }/api/v1/aptitude-dsa/dsa/questions?contestNumber=${aptitudeContest}&contestName=${aptitudeName}`,
            {
              method: 'GET',
              headers: {
                Authorization: `Bearer ${jwt}`,
              },
            }
          );
          const data = await req.json();
          console.log(data);

          const req1 = await fetch(
            `${
              import.meta.env.VITE_API_URL
            }/api/v1/aptitude-dsa/dsa/getStarter?contestNumber=${aptitudeContest}&contestName=${aptitudeName}`,
            {
              method: 'GET',
              headers: {
                Authorization: `Bearer ${jwt}`,
              },
            }
          );
          const data1 = await req1.json();
          console.log(data1);
          setContestNumber(data.data.results[0].contestNumber);
          setContestName(data.data.results[0].contestName);
          dispatch({
            type: 'dataReceived',
            payload: [
              data.data.results[0].questions,
              data1.data.results[0].starterCode,
            ],
          });
        } catch (e) {
          console.log(e);
        }
      }
      fetchData();
    },
    [jwt]
  );

  useEffect(() => {
    // Add event listeners for the fullscreenchange and keydown events
    document.addEventListener('fullscreenchange', () =>
      handleFullscreenChange(dispatch)
    );
    document.addEventListener('webkitfullscreenchange', () =>
      handleFullscreenChange(dispatch)
    );
    document.addEventListener('mozfullscreenchange', () =>
      handleFullscreenChange(dispatch)
    );

    // Remove the event listeners when the component unmounts
    return () => {
      document.removeEventListener('fullscreenchange', () =>
        handleFullscreenChange(dispatch)
      );
      document.removeEventListener('webkitfullscreenchange', () =>
        handleFullscreenChange(dispatch)
      );
      document.removeEventListener('mozfullscreenchange', () =>
        handleFullscreenChange(dispatch)
      );
    };
  }, []);
  return (
    <DSATestContainer>
      <DSAContext.Provider
        value={{
          status,
          questions,
          starterCodes,
          index,
          ans,
          results,
          language,
          secondsRemaining,
          dispatch,
          contestName,
          contestNumber,
          open,
          setOpen,
        }}
      >
        {status === 'setup' && <DSAReady />}
        {status === 'ready' && <DSAReady />}
        {status === 'active' && <DSA />}
        {status === 'checking' && <DSAFinished />}
        {status === 'finished' && <DSAFinished />}
        {status === 'error' && <Error />}
      </DSAContext.Provider>
    </DSATestContainer>
  );
}

const DSATestContainer = styled.div`
  width: 100%;
  height: 100vh;
  background-color: ${colorBlack};
`;

export default DSATest;
