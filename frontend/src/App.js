import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ReqForm from './pages/NewReq';
import Home from './pages/HomePage';
import Login from './pages/LoginPage';
import Profile from './pages/ProfilePage';
import { UserProvider } from './context/UserContext';

function App() {
  return (
    <Router>
      <UserProvider>
      <div>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/newReq" element={<ReqForm />} />
        </Routes>
      </div>
      </UserProvider>
    </Router>
  );
}

export default App;
