import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import AppLayout from './utils/AppLayout';
import HomePage from './pages/HomePage';
import AptitudeTest from './pages/AptitudeTest';
import Results from './features/Results/Results';
import Register from './pages/Register';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<AppLayout />}>
          <Route index element={<HomePage />} />
          <Route path="/results" element={<Results />} />
        </Route>
        <Route path="/aptitude-test" element={<AptitudeTest />} />
        <Route path="/register" element={<Register />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
