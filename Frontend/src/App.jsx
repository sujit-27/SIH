import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './components/Homepage';
import Quizpage from './components/Quizpage';
import RoadmapGenerator from './components/RoadmapGenerator';
import LandingPage from './pages/LandingPage';

export default function App() {
  return (
    <Router>
      <Routes>
        {/* Landingpage */}
        <Route path="/" element={<LandingPage />} />

        <Route path='/home' element={<HomePage/>}/>

        {/* Quiz page */}
        <Route path="/quiz" element={<Quizpage />} />

        {/* Roadmap generator page */}
        <Route path="/roadmap" element={<RoadmapGenerator />} />
      </Routes>
    </Router>
  );
}
