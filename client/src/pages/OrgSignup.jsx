import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export default function OrgSignup() {
  const [form, setForm] = useState({ 
    name: '', type: 'hospital', email: '', 
    password: '', address: '', lat: '', lng: '' 
  });
  const [locating, setLocating] = useState(false);
  const navigate = useNavigate();

  const detectLocation = () => {
    setLocating(true);
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        setForm({...form, lat: pos.coords.latitude, lng: pos.coords.longitude});
        setLocating(false);
      },
      () => {
        alert('Location access denied. Please enter coordinates manually.');
        setLocating(false);
      }
    );
  };

  const handleSubmit = async () => {
    if (!form.lat || !form.lng) return alert('Please set your organisation location');
    try {
      const { data } = await axios.post('http://localhost:5000/api/auth/signup', form);
      localStorage.setItem('token', data.token);
      localStorage.setItem('org', JSON.stringify(data.org));
      navigate('/dashboard');
    } catch (err) {
      alert(err.response?.data?.message || 'Signup failed');
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-6">
      <div className="bg-white p-8 rounded-xl shadow-md w-full max-w-md space-y-4">
        <h2 className="text-2xl font-bold text-gray-900">Register Organisation</h2>
        <input className="w-full border p-3 rounded-lg" placeholder="Organisation Name" onChange={e => setForm({...form, name: e.target.value})} />
        <select className="w-full border p-3 rounded-lg" onChange={e => setForm({...form, type: e.target.value})}>
          <option value="hospital">Hospital</option>
          <option value="bank">Bank</option>
          <option value="clinic">Clinic</option>
          <option value="government">Government Office</option>
          <option value="other">Other</option>
        </select>
        <input className="w-full border p-3 rounded-lg" placeholder="Email" onChange={e => setForm({...form, email: e.target.value})} />
        <input className="w-full border p-3 rounded-lg" type="password" placeholder="Password" onChange={e => setForm({...form, password: e.target.value})} />
        <input className="w-full border p-3 rounded-lg" placeholder="Address" onChange={e => setForm({...form, address: e.target.value})} />
        <div className="space-y-2">
          <p className="text-gray-500 text-sm">Organisation Location</p>
          <button
            onClick={detectLocation}
            className="w-full border-2 border-dashed border-blue-300 text-blue-600 py-3 rounded-lg font-medium hover:bg-blue-50"
          >
            {locating ? 'Detecting...' : form.lat ? `📍 Location Set (${parseFloat(form.lat).toFixed(4)}, ${parseFloat(form.lng).toFixed(4)})` : '📍 Detect My Location'}
          </button>
        </div>
        <button onClick={handleSubmit} className="w-full bg-blue-600 text-white py-3 rounded-lg font-medium hover:bg-blue-700">
          Register
        </button>
      </div>
    </div>
  );
}