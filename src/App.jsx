import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import AppLayout from './utils/AppLayout';
import HomePage from './pages/HomePage';
import AptitudeTest from './pages/AptitudeTest';
import Results from './pages/Results';
import Register from './pages/Register';
import { createContext, useEffect, useState } from 'react';
import LeaderShip from './pages/LeaderShip';
import Profile from './pages/Profile';

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
    <AuthContext.Provider value={{ usn, jwt, removeUsnandJwt }}>
      <BrowserRouter>
        <Routes>
          <Route element={<AppLayout />}>
            <Route index element={<HomePage />} />
            <Route path="/results" element={<Results />} />
            <Route path="/leaderShip" element={<LeaderShip />} />
            <Route path="/profile" element={<Profile />} />
          </Route>
          <Route path="/aptitude-test" element={<AptitudeTest />} />
          <Route
            path="/register"
            element={<Register setUsnAndJwt={setUsnAndJwt} />}
          />
        </Routes>
      </BrowserRouter>
    </AuthContext.Provider>
  );
}

export default App;
