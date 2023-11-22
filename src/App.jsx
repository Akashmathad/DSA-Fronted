import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
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

function App() {
  const [usn, setUsn] = useState('');
  const [jwt, setJwt] = useState('');

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

  return (
    <Theme>
      <GlobalStyles />
      <AuthContext.Provider value={{ usn, jwt, removeUsnandJwt }}>
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
      </AuthContext.Provider>
    </Theme>
  );
}

export default App;
