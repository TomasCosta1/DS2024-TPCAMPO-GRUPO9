import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import ProfilePage from './pages/ProfilePage';
import ProfileEditPage from './pages/ProfileEditPage';
import { UserProvider } from './context/UserContext';
import NewReq from './pages/NewReq';

function App() {
  return (
    <Router>
      <UserProvider>
      <div>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/profile" element={<ProfilePage />} />
          <Route path="/newReq" element={<NewReq />} />
          <Route path='/profileEdit' element={<ProfileEditPage />} />
        </Routes>
      </div>
      </UserProvider>
    </Router>
  );
}

export default App;
