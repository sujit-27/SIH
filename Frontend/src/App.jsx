// import React from 'react';
// import RoadmapGenerator from './components/RoadmapGenerator';
// import HomePage from './components/Homepage';

// export default function App() {
//   return (
//     <div className="App">
//       <HomePage />
//       <RoadmapGenerator />
//     </div>
//   );
// }
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './components/Homepage';
import Quizpage from './components/Quizpage';
import RoadmapGenerator from './components/RoadmapGenerator';

export default function App() {
  return (
    <Router>
      <Routes>
        {/* Homepage */}
        <Route path="/" element={<HomePage />} />

        {/* Quiz page */}
        <Route path="/quiz" element={<Quizpage />} />

        {/* Roadmap generator page */}
        <Route path="/roadmap" element={<RoadmapGenerator />} />
      </Routes>
    </Router>
  );
}
