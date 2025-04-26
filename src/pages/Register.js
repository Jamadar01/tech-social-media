import { useState } from 'react';
import { registerUser } from '../api/api';
import { useNavigate } from 'react-router-dom';

const Register = () => {
  const [formData, setFormData] = useState({ username: '', email: '', password: '' });
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await registerUser(formData);
      navigate('/login');
    } catch (error) {
      console.error(error.response.data.message);
    }
  };

  return (
    <div>
      <h2>Register</h2>
      <form onSubmit={handleSubmit}>
        <input placeholder="Username" onChange={(e) => setFormData({ ...formData, username: e.target.value })} />
        <input placeholder="Email" type="email" onChange={(e) => setFormData({ ...formData, email: e.target.value })} />
        <input placeholder="Password" type="password" onChange={(e) => setFormData({ ...formData, password: e.target.value })} />
        <button type="submit">Register</button>
      </form>
    </div>
  );
};

export default Register;
