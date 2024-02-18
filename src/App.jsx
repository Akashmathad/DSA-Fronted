import { BrowserRouter, Route, Routes } from 'react-router-dom';
import AppLayout from './utils/AppLayout';
import HomePage from './pages/HomePage';
import AptitudeTest from './pages/AptitudeTest';
import DSATest from './pages/DSATest';
import Results from './pages/Results';
import Register from './pages/Register';
import { createContext, useEffect, useState } from 'react';
import LeaderShip from './pages/LeaderShip';
import Profile from './pages/Profile';
import AptitudeMainPage from './pages/AptitudeMainPage';
import Theme from './styles/Theme';
import GlobalStyles from './styles/GlobalStyles';
import DSAMainPage from './pages/DSAMainPage';
export const AuthContext = createContext();
export const ContestContext = createContext();

function App() {
  const [usn, setUsn] = useState('');
  const [jwt, setJwt] = useState('');
  const [aptitudeContest, setAptitudeContest] = useState();
  const [aptitudeName, setAptitudeName] = useState();
  const [loggedIn, setLoggedIn] = useState(false);

  useEffect(function () {
    const getUsn = localStorage.getItem('usn');
    const getJwt = localStorage.getItem('jwt');
    if (getUsn) setUsn(getUsn);
    if (getJwt) setJwt(getJwt);
  }, []);

  function setUsnAndJwt(newUsn, newJwt) {
    localStorage.setItem('usn', newUsn);
    localStorage.setItem('jwt', newJwt);
    const getUsn = localStorage.getItem('usn');
    const getJwt = localStorage.getItem('jwt');
    if (getUsn) setUsn(getUsn);
    if (getJwt) setJwt(getJwt);
  }

  function removeUsnandJwt() {
    localStorage.removeItem('usn');
    localStorage.removeItem('jwt');
  }

  useEffect(
    function () {
      async function fetchData() {
        if (!jwt) return;

        const req = await fetch(
          `${import.meta.env.VITE_API_URL}/api/v1/aptitude-dsa/user`,
          {
            method: 'GET',
            headers: {
              'content-type': 'application/json',
              Authorization: `Bearer ${jwt}`,
            },
          }
        );
        if (req.status === 200) {
          setLoggedIn(true);
        } else {
          setLoggedIn(false);
        }
      }
      fetchData();
    },
    [jwt]
  );

  return (
    <Theme>
      <GlobalStyles />
      <AuthContext.Provider
        value={{ usn, jwt, removeUsnandJwt, setJwt, loggedIn, setLoggedIn }}
      >
        <ContestContext.Provider
          value={{
            aptitudeContest,
            setAptitudeContest,
            aptitudeName,
            setAptitudeName,
          }}
        >
          <BrowserRouter>
            <Routes>
              <Route element={<AppLayout />}>
                <Route index element={<HomePage />} />
                <Route path="/aptitude" element={<AptitudeMainPage />} />
                <Route path="/dsa" element={<DSAMainPage />} />
                <Route path="/results" element={<Results />} />
                <Route path="/leaderShip" element={<LeaderShip />} />
                <Route path="/profile" element={<Profile />} />
              </Route>
              <Route path="/aptitude-test" element={<AptitudeTest />} />
              <Route path="/dsa-test" element={<DSATest />} />

              <Route
                path="/register"
                element={<Register setUsnAndJwt={setUsnAndJwt} />}
              />
            </Routes>
          </BrowserRouter>
        </ContestContext.Provider>
      </AuthContext.Provider>
    </Theme>
  );
}

export default App;
