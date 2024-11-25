import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import NewReq from './pages/NewReq';
import HomePage from './pages/HomePage';


function App() {
  return (
    <Router>
      <div>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/newReq" element={<NewReq />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
