import { Link } from 'react-router-dom';
import { useUser } from '../context/UserContext';

const Navbar = () => {
  const { user } = useUser();

  return (
    <nav style={{ display: 'flex', gap: '20px', padding: '10px', borderBottom: '1px solid gray' }}>
      <Link to="/">Home</Link>
      {user && <Link to="/profile">Profile</Link>}
      {!user && <Link to="/login">Login</Link>}
      {user && <Link to="/users">Explore</Link>}

    </nav>
  );
};

export default Navbar;
