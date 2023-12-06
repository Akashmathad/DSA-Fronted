import {
  useReducer,
  createContext,
  useEffect,
  useContext,
  useState,
} from 'react';
import Ready from '../features/Aptitude/Ready';
import Aptitude from '../features/Aptitude/Aptitude';
import Finished from '../features/Aptitude/Finished';
import Error from '../features/Aptitude/Error';
import styled from 'styled-components';
import { AuthContext } from '../App';

const initialState = {
  questions: null,
  //'loading,error,ready,acitve,finished,submitting,over
  status: 'ready',
  index: 0,
  ans: {},
  secondsRemaining: null,
};

function reducer(state, action) {
  switch (action.type) {
    case 'dataReceived':
      return { ...state, questions: action.payload, status: 'ready' };
    case 'dataFailed':
      return { ...state, status: 'error' };
    case 'start':
      return {
        ...state,
        status: 'active',
        secondsRemaining: state.questions.length * 60,
      };
    case 'settingAns':
      return {
        ...state,
        ans: Array.from({ length: state.questions.length }, (_, index) => ({
          question: index + 1,
          answer: null,
        })),
      };
    case 'answer':
      return {
        ...state,
        ans: [
          ...state.ans.filter(
            (ans) => ans.question !== action.payload.question
          ),
          action.payload,
        ],
      };
    case 'nextQuestion':
      return { ...state, index: state.index + 1 };
    case 'previousQuestion':
      return { ...state, index: state.index - 1 };
    case 'jumpQuestion':
      return { ...state, index: action.payload };
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

export const AptitudeContext = createContext();

function handleFullscreenChange(dispatch) {
  if (!document.fullscreenElement) {
    dispatch({ type: 'check' });
  }
}

function AptitudeTest() {
  const [contestNumber, setContestNumber] = useState();
  const [contestName, setContestName] = useState();
  const [{ questions, status, index, ans, secondsRemaining }, dispatch] =
    useReducer(reducer, initialState);
  const { jwt } = useContext(AuthContext);

  useEffect(() => {
    async function fetchData() {
      try {
        if (!jwt) {
          return;
        }

        const req = await fetch(
          'https://backend-aptitude.up.railway.app/api/v1/aptitude-dsa/question-answers/questions',
          {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${jwt}`,
            },
          }
        );
        const data = await req.json();
        console.log(data.data.Questions[0].contestNumber);
        console.log(data.data.Questions[0].contestName);
        console.log(data.data.Questions[0].questions);
        setContestName(data.data.Questions[0].contestName);
        setContestNumber(data.data.Questions[0].contestNumber);
        dispatch({
          type: 'dataReceived',
          payload: data.data.Questions[0].questions,
        });
        dispatch({ type: 'settingAns' });
      } catch (e) {
        dispatch({ type: 'dataFailed' });
      }
    }
    fetchData();
  }, [jwt]);

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
    <Container>
      <AptitudeContext.Provider
        value={{
          questions,
          status,
          index,
          ans,
          secondsRemaining,
          dispatch,
          contestName,
          contestNumber,
        }}
      >
        {status === 'ready' && <Ready />}
        {status === 'active' && <Aptitude />}
        {status === 'checking' && <Finished />}
        {status === 'finished' && <Finished />}
        {status === 'error' && <Error />}
      </AptitudeContext.Provider>
    </Container>
  );
}

const Container = styled.div`
  width: 100%;
  height: 100vh;
  background-color: ${(props) => props.theme.colors.colorBlack100};
`;

export default AptitudeTest;
