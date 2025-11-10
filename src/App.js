import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import PersonalLandingPage from './PersonalLandingPage';
import Gear from './Gear';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<PersonalLandingPage />} />
        <Route path="/gear" element={<Gear />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;