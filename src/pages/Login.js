import { useState } from 'react';
import { loginUser } from '../api/api';
import { useNavigate } from 'react-router-dom';
import { useUser } from '../context/UserContext';

const Login = () => {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const navigate = useNavigate();
  const { setUser } = useUser();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await loginUser(formData);
      setUser(res.data);
      navigate('/home');
    } catch (error) {
      console.error(error.response.data.message);
    }
  };

  return (
    <div>
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <input placeholder="Email" type="email" onChange={(e) => setFormData({ ...formData, email: e.target.value })} />
        <input placeholder="Password" type="password" onChange={(e) => setFormData({ ...formData, password: e.target.value })} />
        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default Login;
