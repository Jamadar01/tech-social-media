import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { UserProvider } from './context/UserContext';
import { SocketProvider } from './context/SocketContext';
import Register from './pages/Register';
import Login from './pages/Login';
import Home from './pages/Home';
import Chat from './pages/Chat';
import Profile from './pages/Profile';
import Navbar from './components/Navbar';
import { UserProvider } from './context/UserContext';
import Users from './pages/Users';

function App() {
  return (
    <UserProvider>
      <SocketProvider>
        <Router>
          <Routes>
            <Route path="/" element={<Register />} />
            <Route path="/login" element={<Login />} />
            <Route path="/home" element={<Home />} />
            <Route path="/chat" element={<Chat />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/users" element={<Users />} />
          </Routes>
        </Router>
      </SocketProvider>
    </UserProvider>
  );
}

export default App;
