import { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import socket from '../socket';

export default function CustomerToken() {
  const { orgId } = useParams();
  const [phone, setPhone] = useState('');
  const [tokenData, setTokenData] = useState(null);
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    socket.emit('joinQueue', orgId);
    socket.on('queueUpdate', (data) => {
      if (tokenData) {
        const newPosition = tokenData.token.tokenNumber - data.currentToken;
        setTokenData(prev => ({
          ...prev,
          position: newPosition > 0 ? newPosition : 0,
          estimatedWait: newPosition * 8
        }));
      }
    });
    return () => socket.off('queueUpdate');
  }, [tokenData]);

  const getToken = async () => {
    if (!phone || phone.length < 10) return alert('Enter valid phone number');
    try {
      const { data } = await axios.post('http://localhost:5000/api/token/generate', { orgId, phoneNumber: phone });
      setTokenData(data);
      setSubmitted(true);
    } catch (err) {
      alert(err.response?.data?.message || 'Failed to get token');
    }
  };

  if (!submitted) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-6">
        <div className="bg-white p-8 rounded-xl shadow-md w-full max-w-sm space-y-4">
          <h2 className="text-2xl font-bold text-gray-900">Get Your Token</h2>
          <p className="text-gray-500">Enter your phone number to join the queue</p>
          <input className="w-full border p-3 rounded-lg" placeholder="Phone Number" value={phone} onChange={e => setPhone(e.target.value)} />
          <button onClick={getToken} className="w-full bg-blue-600 text-white py-3 rounded-lg font-medium hover:bg-blue-700">
            Join Queue
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-6">
      <div className="bg-white p-8 rounded-xl shadow-md w-full max-w-sm space-y-6 text-center">
        <h2 className="text-2xl font-bold text-gray-900">Your Token</h2>
        <div className="bg-blue-50 rounded-xl p-8">
          <p className="text-gray-500 mb-2">Token Number</p>
          <p className="text-7xl font-bold text-blue-600">{tokenData?.token?.tokenNumber}</p>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div className="bg-gray-50 p-4 rounded-lg">
            <p className="text-gray-500 text-sm">Position</p>
            <p className="text-2xl font-bold text-gray-900">{tokenData?.position}</p>
          </div>
          <div className="bg-gray-50 p-4 rounded-lg">
            <p className="text-gray-500 text-sm">Est. Wait</p>
            <p className="text-2xl font-bold text-gray-900">{tokenData?.estimatedWait} min</p>
          </div>
        </div>
        <p className="text-gray-400 text-sm">You will be notified when your turn is near</p>
      </div>
    </div>
  );
}