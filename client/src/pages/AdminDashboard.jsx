import { useEffect, useState } from 'react';
import axios from 'axios';
import socket from '../socket';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import { useNavigate } from 'react-router-dom';

export default function AdminDashboard() {
  const [queue, setQueue] = useState(null);
  const [tokens, setTokens] = useState([]);
  const [avgTime, setAvgTime] = useState(8);
  const [peakData, setPeakData] = useState([]);
  const [noShowData, setNoShowData] = useState(null);
  const [activeTab, setActiveTab] = useState('overview');
  const [pageLoading, setPageLoading] = useState(true);

  const org = JSON.parse(localStorage.getItem('org') || '{}');
  const token = localStorage.getItem('token');
  const navigate = useNavigate();

  const fetchQueue = async () => {
    try {
      const { data } = await axios.get(`http://localhost:5000/api/token/status/${org.id}`);
      setQueue(data.queue);
      setTokens(data.waitingTokens);
    } catch (err) {
      console.error(err);
    }
  };

  const fetchPeakHours = async () => {
    try {
      const { data } = await axios.get(
        `http://localhost:5000/api/token/peak/${org.id}`,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setPeakData(data.peakData);
    } catch (err) {
      console.error(err);
    }
  };

  const fetchNoShowRate = async () => {
    try {
      const { data } = await axios.get(
        `http://localhost:5000/api/token/noshow/${org.id}`,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setNoShowData(data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    const loadData = async () => {
      await Promise.all([fetchQueue(), fetchPeakHours(), fetchNoShowRate()]);
      setPageLoading(false);
    };
    loadData();

    socket.emit('joinQueue', org.id);
    socket.on('queueUpdate', () => fetchQueue());
    socket.on('connect', () => socket.emit('joinQueue', org.id));
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
    try {
      await axios.post('http://localhost:5000/api/token/absent',
        { tokenId },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      fetchQueue();
      fetchNoShowRate();
    } catch (err) {
      alert('Failed to mark absent');
    }
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

  const completeToken = async () => {
    try {
      await axios.post('http://localhost:5000/api/token/complete',
        { orgId: org.id },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      fetchQueue();
    } catch (err) {
      alert(err.response?.data?.message || 'Error');
    }
  };

  const logout = () => {
    localStorage.clear();
    navigate('/');
  };

  const SkeletonCard = () => (
    <div className="bg-white p-6 rounded-xl border border-gray-100 animate-pulse">
      <div className="h-3 bg-gray-200 rounded w-24 mb-4"></div>
      <div className="h-8 bg-gray-200 rounded w-16 mx-auto"></div>
    </div>
  );

  const SkeletonChart = () => (
    <div className="bg-white p-6 rounded-xl border border-gray-100 animate-pulse">
      <div className="h-4 bg-gray-200 rounded w-32 mb-4"></div>
      <div className="h-48 bg-gray-200 rounded"></div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50 flex">

      {/* Sidebar */}
      <div className="w-64 bg-white border-r border-gray-100 flex flex-col fixed h-full">
        <div className="p-6 border-b border-gray-100">
          <div className="flex items-center gap-2">
            <span className="text-2xl">🔢</span>
            <span className="text-lg font-bold text-gray-900">QueueLess AI</span>
          </div>
          <p className="text-gray-500 text-sm mt-1 truncate">{org.name}</p>
        </div>
        <nav className="flex-1 p-4 space-y-1">
          {[
            { id: 'overview', icon: '📊', label: 'Overview' },
            { id: 'queue', icon: '🎫', label: 'Queue Management' },
            { id: 'analytics', icon: '📈', label: 'Analytics' },
            { id: 'settings', icon: '⚙️', label: 'Settings' },
          ].map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-colors ${activeTab === tab.id
                ? 'bg-blue-50 text-blue-600'
                : 'text-gray-600 hover:bg-gray-50'
                }`}
            >
              <span>{tab.icon}</span>
              {tab.label}
            </button>
          ))}
        </nav>
        <div className="p-4 border-t border-gray-100">
          <button
            onClick={logout}
            className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium text-red-500 hover:bg-red-50"
          >
            <span>🚪</span>
            Logout
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="ml-64 flex-1 p-8">

        {/* Overview Tab */}
        {activeTab === 'overview' && (
          <div className="space-y-6">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Overview</h1>
              <p className="text-gray-500 text-sm">Today's queue performance</p>
            </div>

            {pageLoading ? (
              <div className="grid grid-cols-4 gap-4">
                <SkeletonCard />
                <SkeletonCard />
                <SkeletonCard />
                <SkeletonCard />
              </div>
            ) : (
              <div className="grid grid-cols-4 gap-4">
                <div className="bg-white p-6 rounded-xl border border-gray-100 text-center">
                  <p className="text-gray-500 text-sm">Current Token</p>
                  <p className="text-4xl font-bold text-blue-600 mt-1">{queue?.currentToken || 0}</p>
                </div>
                <div className="bg-white p-6 rounded-xl border border-gray-100 text-center">
                  <p className="text-gray-500 text-sm">Waiting</p>
                  <p className="text-4xl font-bold text-orange-500 mt-1">{tokens.length}</p>
                </div>
                <div className="bg-white p-6 rounded-xl border border-gray-100 text-center">
                  <p className="text-gray-500 text-sm">Total Issued</p>
                  <p className="text-4xl font-bold text-green-600 mt-1">{queue?.lastTokenIssued || 0}</p>
                </div>
                <div className="bg-white p-6 rounded-xl border border-gray-100 text-center">
                  <p className="text-gray-500 text-sm">No-Show Rate</p>
                  <p className="text-4xl font-bold text-red-500 mt-1">{noShowData?.noShowRate || 0}%</p>
                </div>
              </div>
            )}

            {pageLoading ? (
              <SkeletonChart />
            ) : (
              <div className="bg-white p-6 rounded-xl border border-gray-100">
                <h2 className="text-lg font-bold text-gray-900 mb-4">Today's Peak Hours</h2>
                {peakData.length === 0 ? (
                  <p className="text-gray-400">Not enough data yet</p>
                ) : (
                  <ResponsiveContainer width="100%" height={200}>
                    <BarChart data={peakData}>
                      <XAxis dataKey="hour" tick={{ fontSize: 12 }} />
                      <YAxis tick={{ fontSize: 12 }} />
                      <Tooltip />
                      <Bar dataKey="tokens" fill="#2563eb" radius={[4, 4, 0, 0]} />
                    </BarChart>
                  </ResponsiveContainer>
                )}
              </div>
            )}
          </div>
        )}

        {/* Queue Management Tab */}
        {activeTab === 'queue' && (
          <div className="space-y-6">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Queue Management</h1>
              <p className="text-gray-500 text-sm">Manage today's patient queue</p>
            </div>

            {pageLoading ? (
              <div className="grid grid-cols-2 gap-6">
                <SkeletonCard />
                <SkeletonCard />
              </div>
            ) : (
              <div className="grid grid-cols-2 gap-6">
                <div className="bg-white p-6 rounded-xl border border-gray-100">
                  <h2 className="text-lg font-bold text-gray-900 mb-2">Current Token</h2>
                  <p className="text-7xl font-bold text-blue-600 text-center py-6">{queue?.currentToken || 0}</p>
                  <button
                    onClick={callNext}
                    className="w-full bg-blue-600 text-white py-4 rounded-xl font-bold text-lg hover:bg-blue-700"
                  >
                    Call Next Token →
                  </button>
                  <button
                    onClick={completeToken}
                    className="w-full bg-green-600 text-white py-4 rounded-xl font-bold text-lg hover:bg-green-700 mt-3"
                  >
                    Complete Current Token ✓
                  </button>
                </div>

                <div className="bg-white p-6 rounded-xl border border-gray-100">
                  <h2 className="text-lg font-bold text-gray-900 mb-4">Your QR Code</h2>
                  <p className="text-gray-500 text-sm mb-4">Display this at your entrance for patients to scan</p>
                  {org.qrCode && <img src={org.qrCode} alt="QR Code" className="w-40 h-40 mx-auto" />}
                </div>
              </div>
            )}

            {pageLoading ? (
              <SkeletonChart />
            ) : (
              <div className="bg-white p-6 rounded-xl border border-gray-100">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-lg font-bold text-gray-900">Waiting Queue</h2>
                  <span className="bg-orange-100 text-orange-600 text-sm font-medium px-3 py-1 rounded-full">
                    {tokens.length} waiting
                  </span>
                </div>
                <div className="space-y-2">
                  {tokens.map((t, index) => (
                    <div key={t._id} className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
                      <div className="flex items-center gap-4">
                        <span className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${index === 0 ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-600'}`}>
                          {index + 1}
                        </span>
                        <div>
                          <p className="font-bold text-gray-900">Token #{t.tokenNumber}</p>
                          <p className="text-gray-500 text-sm">{t.phoneNumber}</p>
                        </div>
                      </div>
                      <button
                        onClick={() => markAbsent(t._id)}
                        className="text-red-500 text-sm border border-red-200 px-3 py-1 rounded-lg hover:bg-red-50"
                      >
                        Mark Absent
                      </button>
                    </div>
                  ))}
                  {tokens.length === 0 && (
                    <div className="text-center py-8">
                      <p className="text-4xl mb-2">✅</p>
                      <p className="text-gray-400">No tokens waiting</p>
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
        )}

        {/* Analytics Tab */}
        {activeTab === 'analytics' && (
          <div className="space-y-6">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Analytics</h1>
              <p className="text-gray-500 text-sm">Understand your queue patterns</p>
            </div>

            {pageLoading ? (
              <div className="grid grid-cols-3 gap-4">
                <SkeletonCard />
                <SkeletonCard />
                <SkeletonCard />
              </div>
            ) : (
              <div className="grid grid-cols-3 gap-4">
                <div className="bg-white p-6 rounded-xl border border-gray-100 text-center">
                  <p className="text-gray-500 text-sm">Total Tokens</p>
                  <p className="text-3xl font-bold text-gray-900 mt-1">{noShowData?.totalTokens || 0}</p>
                </div>
                <div className="bg-white p-6 rounded-xl border border-gray-100 text-center">
                  <p className="text-gray-500 text-sm">Absent Tokens</p>
                  <p className="text-3xl font-bold text-red-500 mt-1">{noShowData?.absentTokens || 0}</p>
                </div>
                <div className="bg-white p-6 rounded-xl border border-gray-100 text-center">
                  <p className="text-gray-500 text-sm">No-Show Rate</p>
                  <p className="text-3xl font-bold text-red-500 mt-1">{noShowData?.noShowRate || 0}%</p>
                </div>
              </div>
            )}

            {pageLoading ? (
              <SkeletonChart />
            ) : (
              <div className="bg-white p-6 rounded-xl border border-gray-100">
                <h2 className="text-lg font-bold text-gray-900 mb-4">Peak Hours Breakdown</h2>
                {peakData.length === 0 ? (
                  <p className="text-gray-400">Not enough data yet</p>
                ) : (
                  <ResponsiveContainer width="100%" height={300}>
                    <BarChart data={peakData}>
                      <XAxis dataKey="hour" tick={{ fontSize: 12 }} />
                      <YAxis tick={{ fontSize: 12 }} />
                      <Tooltip />
                      <Bar dataKey="tokens" fill="#2563eb" radius={[4, 4, 0, 0]} />
                    </BarChart>
                  </ResponsiveContainer>
                )}
              </div>
            )}
          </div>
        )}

        {/* Settings Tab */}
        {activeTab === 'settings' && (
          <div className="space-y-6">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Settings</h1>
              <p className="text-gray-500 text-sm">Configure your queue settings</p>
            </div>

            <div className="bg-white p-6 rounded-xl border border-gray-100">
              <h2 className="text-lg font-bold text-gray-900 mb-4">Queue Configuration</h2>
              <div className="space-y-4 max-w-sm">
                <div>
                  <label className="text-gray-700 text-sm font-medium block mb-2">
                    Average time per patient (minutes)
                  </label>
                  <input
                    type="number"
                    value={avgTime}
                    onChange={e => setAvgTime(e.target.value)}
                    className="border p-3 rounded-lg w-full text-lg font-bold"
                    min="1"
                    max="60"
                  />
                  <p className="text-gray-400 text-xs mt-1">Used to calculate estimated wait times</p>
                </div>
                <button
                  onClick={updateSettings}
                  className="bg-blue-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-blue-700"
                >
                  Save Settings
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}