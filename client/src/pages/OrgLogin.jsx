import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export default function OrgLogin() {
  const [form, setForm] = useState({ email: '', password: '' });
  const navigate = useNavigate();

  const handleSubmit = async () => {
    try {
      const { data } = await axios.post('http://localhost:5000/api/auth/login', form);
      localStorage.setItem('token', data.token);
      localStorage.setItem('org', JSON.stringify(data.org));
      navigate('/dashboard');
    } catch (err) {
      alert(err.response?.data?.message || 'Login failed');
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-6">
      <div className="bg-white p-8 rounded-xl shadow-md w-full max-w-md space-y-4">
        <h2 className="text-2xl font-bold text-gray-900">Organisation Login</h2>
        <input className="w-full border p-3 rounded-lg" placeholder="Email" onChange={e => setForm({...form, email: e.target.value})} />
        <input className="w-full border p-3 rounded-lg" type="password" placeholder="Password" onChange={e => setForm({...form, password: e.target.value})} />
        <button onClick={handleSubmit} className="w-full bg-blue-600 text-white py-3 rounded-lg font-medium hover:bg-blue-700">
          Login
        </button>
      </div>
    </div>
  );
}