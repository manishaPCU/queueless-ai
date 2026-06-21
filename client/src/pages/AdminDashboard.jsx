import { useEffect, useState } from 'react';
import axios from 'axios';
import { QRCodeSVG } from 'qrcode.react';
import socket from '../socket';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';

export default function AdminDashboard() {
  const [queue, setQueue] = useState(null);
  const [tokens, setTokens] = useState([]);
  const [avgTime, setAvgTime] = useState(8);
  const [peakData, setPeakData] = useState([]);
  const org = JSON.parse(localStorage.getItem('org') || '{}');
  const token = localStorage.getItem('token');

  const fetchQueue = async () => {
    const { data } = await axios.get(`http://localhost:5000/api/token/status/${org.id}`);
    setQueue(data.queue);
    setTokens(data.waitingTokens);
  };
  const fetchPeakHours = async () => {
    try {
      const { data } = await axios.get(
        `http://localhost:5000/api/token/peak/${org.id}`,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setPeakData(data.peakData);
    } catch (err) {
      console.error('Peak hours error:', err);
    }
  };

  useEffect(() => {
    fetchQueue();
    fetchPeakHours();
    socket.emit('joinQueue', org.id);

    socket.on('queueUpdate', () => {
      fetchQueue();
    });

    socket.on('connect', () => {
      socket.emit('joinQueue', org.id);
    });

    return () => {
      socket.off('queueUpdate');
      socket.off('connect');
    };
  }, []);

  const callNext = async () => {
    try {
      await axios.post('http://localhost:5000/api/token/next',
        { orgId: org.id },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      fetchQueue();
    } catch (err) {
      alert(err.response?.data?.message || 'Error calling next token');
    }
  };
  const markAbsent = async (tokenId) => {
    await axios.post('http://localhost:5000/api/token/absent',
      { tokenId },
      { headers: { Authorization: `Bearer ${token}` } }
    );
    fetchQueue();
  };
  const updateSettings = async () => {
    try {
      await axios.put('http://localhost:5000/api/auth/settings',
        { avgServiceTime: avgTime },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      alert('Settings saved');
    } catch (err) {
      alert('Failed to save settings');
    }
  };
  

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-4xl mx-auto space-y-6">
        <h1 className="text-3xl font-bold text-gray-900">Admin Dashboard</h1>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-white p-6 rounded-xl shadow-sm text-center">
            <p className="text-gray-500">Current Token</p>
            <p className="text-5xl font-bold text-blue-600">{queue?.currentToken || 0}</p>
          </div>
          <div className="bg-white p-6 rounded-xl shadow-sm text-center">
            <p className="text-gray-500">Waiting</p>
            <p className="text-5xl font-bold text-orange-500">{tokens.length}</p>
          </div>
          <div className="bg-white p-6 rounded-xl shadow-sm text-center">
            <p className="text-gray-500">Total Issued</p>
            <p className="text-5xl font-bold text-green-600">{queue?.lastTokenIssued || 0}</p>
          </div>
        </div>
        <button onClick={callNext} className="bg-blue-600 text-white px-8 py-4 rounded-xl font-bold text-lg hover:bg-blue-700">
          Call Next Token
        </button>
        <div className="bg-white p-6 rounded-xl shadow-sm">
          <h2 className="text-xl font-bold mb-4">Queue Settings</h2>
          <div className="flex items-center gap-4">
            <div>
              <p className="text-gray-500 text-sm mb-1">Average time per patient (minutes)</p>
              <input
                type="number"
                value={avgTime}
                onChange={e => setAvgTime(e.target.value)}
                className="border p-2 rounded-lg w-24 text-center text-lg font-bold"
                min="1"
                max="60"
              />
            </div>
            <button
              onClick={updateSettings}
              className="bg-green-600 text-white px-6 py-2 rounded-lg font-medium hover:bg-green-700 mt-4"
            >
              Save Settings
            </button>
          </div>
        </div>
        <div className="bg-white p-6 rounded-xl shadow-sm">
          <h2 className="text-xl font-bold mb-4">Peak Hours</h2>
          {peakData.length === 0 ? (
            <p className="text-gray-400">Not enough data yet</p>
          ) : (
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={peakData}>
                <XAxis dataKey="hour" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="tokens" fill="#2563eb" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          )}
        </div>
        <div className="bg-white p-6 rounded-xl shadow-sm">
          <h2 className="text-xl font-bold mb-4">Your QR Code</h2>
          {org.qrCode && <img src={org.qrCode} alt="QR Code" className="w-48 h-48" />}
        </div>
        <div className="bg-white p-6 rounded-xl shadow-sm">
          <h2 className="text-xl font-bold mb-4">Waiting Queue</h2>
          <div className="space-y-2">
            {tokens.map(t => (
              <div key={t._id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <span className="font-bold text-blue-600">#{t.tokenNumber}</span>
                <span className="text-gray-600">{t.phoneNumber}</span>
                <button onClick={() => markAbsent(t._id)} className="text-red-500 text-sm hover:underline">
                  Mark Absent
                </button>
              </div>
            ))}
            {tokens.length === 0 && <p className="text-gray-400">No tokens waiting</p>}
          </div>
        </div>
      </div>
    </div>
  );
}