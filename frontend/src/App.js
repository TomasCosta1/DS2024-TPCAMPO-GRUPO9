import logo from './logo.svg';
import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ReqForm from './components/ReqForm';

function App() {
  return (
    <Router>
      <div>
        <Routes>
          <Route path="/newReq" element={<ReqForm />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
