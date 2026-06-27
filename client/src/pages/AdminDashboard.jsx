// import { useEffect, useState } from 'react';
// import axios from 'axios';
// import socket from '../socket';
// import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
// import { useNavigate } from 'react-router-dom';

// export default function AdminDashboard() {
//   const [queue, setQueue] = useState(null);
//   const [tokens, setTokens] = useState([]);
//   const [avgTime, setAvgTime] = useState(8);
//   const [peakData, setPeakData] = useState([]);
//   const [noShowData, setNoShowData] = useState(null);
//   const [activeTab, setActiveTab] = useState('overview');
//   const [pageLoading, setPageLoading] = useState(true);

//   const org = JSON.parse(localStorage.getItem('org') || '{}');
//   const token = localStorage.getItem('token');
//   const navigate = useNavigate();

//   const fetchQueue = async () => {
//     try {
//       const { data } = await axios.get(`http://localhost:5000/api/token/status/${org.id}`);
//       setQueue(data.queue);
//       setTokens(data.waitingTokens);
//     } catch (err) {
//       console.error(err);
//     }
//   };

//   const fetchPeakHours = async () => {
//     try {
//       const { data } = await axios.get(
//         `http://localhost:5000/api/token/peak/${org.id}`,
//         { headers: { Authorization: `Bearer ${token}` } }
//       );
//       setPeakData(data.peakData);
//     } catch (err) {
//       console.error(err);
//     }
//   };

//   const fetchNoShowRate = async () => {
//     try {
//       const { data } = await axios.get(
//         `http://localhost:5000/api/token/noshow/${org.id}`,
//         { headers: { Authorization: `Bearer ${token}` } }
//       );
//       setNoShowData(data);
//     } catch (err) {
//       console.error(err);
//     }
//   };

//   useEffect(() => {
//     const loadData = async () => {
//       await Promise.all([fetchQueue(), fetchPeakHours(), fetchNoShowRate()]);
//       setPageLoading(false);
//     };
//     loadData();

//     socket.emit('joinQueue', org.id);
//     socket.on('queueUpdate', () => fetchQueue());
//     socket.on('connect', () => socket.emit('joinQueue', org.id));
//     return () => {
//       socket.off('queueUpdate');
//       socket.off('connect');
//     };
//   }, []);

//   const callNext = async () => {
//     try {
//       await axios.post('http://localhost:5000/api/token/next',
//         { orgId: org.id },
//         { headers: { Authorization: `Bearer ${token}` } }
//       );
//       fetchQueue();
//     } catch (err) {
//       alert(err.response?.data?.message || 'Error calling next token');
//     }
//   };

//   const markAbsent = async (tokenId) => {
//     try {
//       await axios.post('http://localhost:5000/api/token/absent',
//         { tokenId },
//         { headers: { Authorization: `Bearer ${token}` } }
//       );
//       fetchQueue();
//       fetchNoShowRate();
//     } catch (err) {
//       alert('Failed to mark absent');
//     }
//   };

//   const updateSettings = async () => {
//     try {
//       await axios.put('http://localhost:5000/api/auth/settings',
//         { avgServiceTime: avgTime },
//         { headers: { Authorization: `Bearer ${token}` } }
//       );
//       alert('Settings saved');
//     } catch (err) {
//       alert('Failed to save settings');
//     }
//   };

//   const completeToken = async () => {
//     try {
//       await axios.post('http://localhost:5000/api/token/complete',
//         { orgId: org.id },
//         { headers: { Authorization: `Bearer ${token}` } }
//       );
//       fetchQueue();
//     } catch (err) {
//       alert(err.response?.data?.message || 'Error');
//     }
//   };

//   const logout = () => {
//     localStorage.clear();
//     navigate('/');
//   };

//   const SkeletonCard = () => (
//     <div className="bg-white p-6 rounded-xl border border-gray-100 animate-pulse">
//       <div className="h-3 bg-gray-200 rounded w-24 mb-4"></div>
//       <div className="h-8 bg-gray-200 rounded w-16 mx-auto"></div>
//     </div>
//   );

//   const SkeletonChart = () => (
//     <div className="bg-white p-6 rounded-xl border border-gray-100 animate-pulse">
//       <div className="h-4 bg-gray-200 rounded w-32 mb-4"></div>
//       <div className="h-48 bg-gray-200 rounded"></div>
//     </div>
//   );

//   return (
//     <div className="min-h-screen bg-gray-50 flex">

//       {/* Sidebar */}
//       <div className="w-64 bg-white border-r border-gray-100 flex flex-col fixed h-full">
//         <div className="p-6 border-b border-gray-100">
//           <div className="flex items-center gap-2">
//             <span className="text-2xl">🔢</span>
//             <span className="text-lg font-bold text-gray-900">QueueLess AI</span>
//           </div>
//           <p className="text-gray-500 text-sm mt-1 truncate">{org.name}</p>
//         </div>
//         <nav className="flex-1 p-4 space-y-1">
//           {[
//             { id: 'overview', icon: '📊', label: 'Overview' },
//             { id: 'queue', icon: '🎫', label: 'Queue Management' },
//             { id: 'analytics', icon: '📈', label: 'Analytics' },
//             { id: 'settings', icon: '⚙️', label: 'Settings' },
//           ].map(tab => (
//             <button
//               key={tab.id}
//               onClick={() => setActiveTab(tab.id)}
//               className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-colors ${activeTab === tab.id
//                 ? 'bg-blue-50 text-blue-600'
//                 : 'text-gray-600 hover:bg-gray-50'
//                 }`}
//             >
//               <span>{tab.icon}</span>
//               {tab.label}
//             </button>
//           ))}
//         </nav>
//         <div className="p-4 border-t border-gray-100">
//           <button
//             onClick={logout}
//             className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium text-red-500 hover:bg-red-50"
//           >
//             <span>🚪</span>
//             Logout
//           </button>
//         </div>
//       </div>

//       {/* Main Content */}
//       <div className="ml-64 flex-1 p-8">

//         {/* Overview Tab */}
//         {activeTab === 'overview' && (
//           <div className="space-y-6">
//             <div>
//               <h1 className="text-2xl font-bold text-gray-900">Overview</h1>
//               <p className="text-gray-500 text-sm">Today's queue performance</p>
//             </div>

//             {pageLoading ? (
//               <div className="grid grid-cols-4 gap-4">
//                 <SkeletonCard />
//                 <SkeletonCard />
//                 <SkeletonCard />
//                 <SkeletonCard />
//               </div>
//             ) : (
//               <div className="grid grid-cols-4 gap-4">
//                 <div className="bg-white p-6 rounded-xl border border-gray-100 text-center">
//                   <p className="text-gray-500 text-sm">Current Token</p>
//                   <p className="text-4xl font-bold text-blue-600 mt-1">{queue?.currentToken || 0}</p>
//                 </div>
//                 <div className="bg-white p-6 rounded-xl border border-gray-100 text-center">
//                   <p className="text-gray-500 text-sm">Waiting</p>
//                   <p className="text-4xl font-bold text-orange-500 mt-1">{tokens.length}</p>
//                 </div>
//                 <div className="bg-white p-6 rounded-xl border border-gray-100 text-center">
//                   <p className="text-gray-500 text-sm">Total Issued</p>
//                   <p className="text-4xl font-bold text-green-600 mt-1">{queue?.lastTokenIssued || 0}</p>
//                 </div>
//                 <div className="bg-white p-6 rounded-xl border border-gray-100 text-center">
//                   <p className="text-gray-500 text-sm">No-Show Rate</p>
//                   <p className="text-4xl font-bold text-red-500 mt-1">{noShowData?.noShowRate || 0}%</p>
//                 </div>
//               </div>
//             )}

//             {pageLoading ? (
//               <SkeletonChart />
//             ) : (
//               <div className="bg-white p-6 rounded-xl border border-gray-100">
//                 <h2 className="text-lg font-bold text-gray-900 mb-4">Today's Peak Hours</h2>
//                 {peakData.length === 0 ? (
//                   <p className="text-gray-400">Not enough data yet</p>
//                 ) : (
//                   <ResponsiveContainer width="100%" height={200}>
//                     <BarChart data={peakData}>
//                       <XAxis dataKey="hour" tick={{ fontSize: 12 }} />
//                       <YAxis tick={{ fontSize: 12 }} />
//                       <Tooltip />
//                       <Bar dataKey="tokens" fill="#2563eb" radius={[4, 4, 0, 0]} />
//                     </BarChart>
//                   </ResponsiveContainer>
//                 )}
//               </div>
//             )}
//           </div>
//         )}

//         {/* Queue Management Tab */}
//         {activeTab === 'queue' && (
//           <div className="space-y-6">
//             <div>
//               <h1 className="text-2xl font-bold text-gray-900">Queue Management</h1>
//               <p className="text-gray-500 text-sm">Manage today's patient queue</p>
//             </div>

//             {pageLoading ? (
//               <div className="grid grid-cols-2 gap-6">
//                 <SkeletonCard />
//                 <SkeletonCard />
//               </div>
//             ) : (
//               <div className="grid grid-cols-2 gap-6">
//                 <div className="bg-white p-6 rounded-xl border border-gray-100">
//                   <h2 className="text-lg font-bold text-gray-900 mb-2">Current Token</h2>
//                   <p className="text-7xl font-bold text-blue-600 text-center py-6">{queue?.currentToken || 0}</p>
//                   <button
//                     onClick={callNext}
//                     className="w-full bg-blue-600 text-white py-4 rounded-xl font-bold text-lg hover:bg-blue-700"
//                   >
//                     Call Next Token →
//                   </button>
//                   <button
//                     onClick={completeToken}
//                     className="w-full bg-green-600 text-white py-4 rounded-xl font-bold text-lg hover:bg-green-700 mt-3"
//                   >
//                     Complete Current Token ✓
//                   </button>
//                 </div>

//                 <div className="bg-white p-6 rounded-xl border border-gray-100">
//                   <h2 className="text-lg font-bold text-gray-900 mb-4">Your QR Code</h2>
//                   <p className="text-gray-500 text-sm mb-4">Display this at your entrance for patients to scan</p>
//                   {org.qrCode && <img src={org.qrCode} alt="QR Code" className="w-40 h-40 mx-auto" />}
//                 </div>
//               </div>
//             )}

//             {pageLoading ? (
//               <SkeletonChart />
//             ) : (
//               <div className="bg-white p-6 rounded-xl border border-gray-100">
//                 <div className="flex items-center justify-between mb-4">
//                   <h2 className="text-lg font-bold text-gray-900">Waiting Queue</h2>
//                   <span className="bg-orange-100 text-orange-600 text-sm font-medium px-3 py-1 rounded-full">
//                     {tokens.length} waiting
//                   </span>
//                 </div>
//                 <div className="space-y-2">
//                   {tokens.map((t, index) => (
//                     <div key={t._id} className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
//                       <div className="flex items-center gap-4">
//                         <span className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${index === 0 ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-600'}`}>
//                           {index + 1}
//                         </span>
//                         <div>
//                           <p className="font-bold text-gray-900">Token #{t.tokenNumber}</p>
//                           <p className="text-gray-500 text-sm">{t.phoneNumber}</p>
//                         </div>
//                       </div>
//                       <button
//                         onClick={() => markAbsent(t._id)}
//                         className="text-red-500 text-sm border border-red-200 px-3 py-1 rounded-lg hover:bg-red-50"
//                       >
//                         Mark Absent
//                       </button>
//                     </div>
//                   ))}
//                   {tokens.length === 0 && (
//                     <div className="text-center py-8">
//                       <p className="text-4xl mb-2">✅</p>
//                       <p className="text-gray-400">No tokens waiting</p>
//                     </div>
//                   )}
//                 </div>
//               </div>
//             )}
//           </div>
//         )}

//         {/* Analytics Tab */}
//         {activeTab === 'analytics' && (
//           <div className="space-y-6">
//             <div>
//               <h1 className="text-2xl font-bold text-gray-900">Analytics</h1>
//               <p className="text-gray-500 text-sm">Understand your queue patterns</p>
//             </div>

//             {pageLoading ? (
//               <div className="grid grid-cols-3 gap-4">
//                 <SkeletonCard />
//                 <SkeletonCard />
//                 <SkeletonCard />
//               </div>
//             ) : (
//               <div className="grid grid-cols-3 gap-4">
//                 <div className="bg-white p-6 rounded-xl border border-gray-100 text-center">
//                   <p className="text-gray-500 text-sm">Total Tokens</p>
//                   <p className="text-3xl font-bold text-gray-900 mt-1">{noShowData?.totalTokens || 0}</p>
//                 </div>
//                 <div className="bg-white p-6 rounded-xl border border-gray-100 text-center">
//                   <p className="text-gray-500 text-sm">Absent Tokens</p>
//                   <p className="text-3xl font-bold text-red-500 mt-1">{noShowData?.absentTokens || 0}</p>
//                 </div>
//                 <div className="bg-white p-6 rounded-xl border border-gray-100 text-center">
//                   <p className="text-gray-500 text-sm">No-Show Rate</p>
//                   <p className="text-3xl font-bold text-red-500 mt-1">{noShowData?.noShowRate || 0}%</p>
//                 </div>
//               </div>
//             )}

//             {pageLoading ? (
//               <SkeletonChart />
//             ) : (
//               <div className="bg-white p-6 rounded-xl border border-gray-100">
//                 <h2 className="text-lg font-bold text-gray-900 mb-4">Peak Hours Breakdown</h2>
//                 {peakData.length === 0 ? (
//                   <p className="text-gray-400">Not enough data yet</p>
//                 ) : (
//                   <ResponsiveContainer width="100%" height={300}>
//                     <BarChart data={peakData}>
//                       <XAxis dataKey="hour" tick={{ fontSize: 12 }} />
//                       <YAxis tick={{ fontSize: 12 }} />
//                       <Tooltip />
//                       <Bar dataKey="tokens" fill="#2563eb" radius={[4, 4, 0, 0]} />
//                     </BarChart>
//                   </ResponsiveContainer>
//                 )}
//               </div>
//             )}
//           </div>
//         )}

//         {/* Settings Tab */}
//         {activeTab === 'settings' && (
//           <div className="space-y-6">
//             <div>
//               <h1 className="text-2xl font-bold text-gray-900">Settings</h1>
//               <p className="text-gray-500 text-sm">Configure your queue settings</p>
//             </div>

//             <div className="bg-white p-6 rounded-xl border border-gray-100">
//               <h2 className="text-lg font-bold text-gray-900 mb-4">Queue Configuration</h2>
//               <div className="space-y-4 max-w-sm">
//                 <div>
//                   <label className="text-gray-700 text-sm font-medium block mb-2">
//                     Average time per patient (minutes)
//                   </label>
//                   <input
//                     type="number"
//                     value={avgTime}
//                     onChange={e => setAvgTime(e.target.value)}
//                     className="border p-3 rounded-lg w-full text-lg font-bold"
//                     min="1"
//                     max="60"
//                   />
//                   <p className="text-gray-400 text-xs mt-1">Used to calculate estimated wait times</p>
//                 </div>
//                 <button
//                   onClick={updateSettings}
//                   className="bg-blue-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-blue-700"
//                 >
//                   Save Settings
//                 </button>
//               </div>
//             </div>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// }



//----------------------------------------------------------------------------------------





// import { useEffect, useState } from 'react';
// import axios from 'axios';
// import socket from '../socket';
// import {
//   BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer,
//   CartesianGrid, Cell
// } from 'recharts';
// import { useNavigate } from 'react-router-dom';
// import {
//   LayoutDashboard, Ticket, BarChart3, Settings, LogOut,
//   RefreshCw, Users, TrendingDown, Clock, CheckCircle2,
//   AlertCircle, ChevronRight, Wifi, QrCode, Save
// } from 'lucide-react';

// export default function AdminDashboard() {
//   const [queue, setQueue] = useState(null);
//   const [tokens, setTokens] = useState([]);
//   const [avgTime, setAvgTime] = useState(8);
//   const [peakData, setPeakData] = useState([]);
//   const [noShowData, setNoShowData] = useState(null);
//   const [activeTab, setActiveTab] = useState('overview');
//   const [pageLoading, setPageLoading] = useState(true);
//   const [refreshing, setRefreshing] = useState(false);
//   const [activity, setActivity] = useState([
//     { id: 1, msg: 'Queue session started', time: '9:00 AM', type: 'info' },
//   ]);

//   const org = JSON.parse(localStorage.getItem('org') || '{}');
//   const token = localStorage.getItem('token');
//   const navigate = useNavigate();

//   const addActivity = (msg, type = 'success') => {
//     const now = new Date();
//     const time = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
//     setActivity(prev => [{ id: Date.now(), msg, time, type }, ...prev].slice(0, 6));
//   };

//   const fetchQueue = async () => {
//     try {
//       const { data } = await axios.get(`http://localhost:5000/api/token/status/${org.id}`);
//       setQueue(data.queue);
//       setTokens(data.waitingTokens);
//     } catch (err) { console.error(err); }
//   };

//   const fetchPeakHours = async () => {
//     try {
//       const { data } = await axios.get(
//         `http://localhost:5000/api/token/peak/${org.id}`,
//         { headers: { Authorization: `Bearer ${token}` } }
//       );
//       setPeakData(data.peakData);
//     } catch (err) { console.error(err); }
//   };

//   const fetchNoShowRate = async () => {
//     try {
//       const { data } = await axios.get(
//         `http://localhost:5000/api/token/noshow/${org.id}`,
//         { headers: { Authorization: `Bearer ${token}` } }
//       );
//       setNoShowData(data);
//     } catch (err) { console.error(err); }
//   };

//   const handleRefresh = async () => {
//     setRefreshing(true);
//     await Promise.all([fetchQueue(), fetchPeakHours(), fetchNoShowRate()]);
//     setTimeout(() => setRefreshing(false), 600);
//   };

//   useEffect(() => {
//     const loadData = async () => {
//       await Promise.all([fetchQueue(), fetchPeakHours(), fetchNoShowRate()]);
//       setPageLoading(false);
//     };
//     loadData();
//     socket.emit('joinQueue', org.id);
//     socket.on('queueUpdate', () => { fetchQueue(); addActivity('Queue updated in real-time', 'info'); });
//     socket.on('connect', () => socket.emit('joinQueue', org.id));
//     return () => { socket.off('queueUpdate'); socket.off('connect'); };
//   }, []);

//   const callNext = async () => {
//     try {
//       await axios.post('http://localhost:5000/api/token/next',
//         { orgId: org.id },
//         { headers: { Authorization: `Bearer ${token}` } }
//       );
//       fetchQueue();
//       addActivity(`Called next token`, 'success');
//     } catch (err) { alert(err.response?.data?.message || 'Error calling next token'); }
//   };

//   const markAbsent = async (tokenId, tokenNumber) => {
//     try {
//       await axios.post('http://localhost:5000/api/token/absent',
//         { tokenId },
//         { headers: { Authorization: `Bearer ${token}` } }
//       );
//       fetchQueue(); fetchNoShowRate();
//       addActivity(`Token #${tokenNumber} marked absent`, 'warning');
//     } catch (err) { alert('Failed to mark absent'); }
//   };

//   const updateSettings = async () => {
//     try {
//       await axios.put('http://localhost:5000/api/auth/settings',
//         { avgServiceTime: avgTime },
//         { headers: { Authorization: `Bearer ${token}` } }
//       );
//       addActivity('Settings saved successfully', 'success');
//     } catch (err) { alert('Failed to save settings'); }
//   };

//   const completeToken = async () => {
//     try {
//       await axios.post('http://localhost:5000/api/token/complete',
//         { orgId: org.id },
//         { headers: { Authorization: `Bearer ${token}` } }
//       );
//       fetchQueue();
//       addActivity(`Token #${queue?.currentToken} completed`, 'success');
//     } catch (err) { alert(err.response?.data?.message || 'Error'); }
//   };

//   const logout = () => { localStorage.clear(); navigate('/'); };

//   const navItems = [
//     { id: 'overview', icon: LayoutDashboard, label: 'Overview' },
//     { id: 'queue', icon: Ticket, label: 'Queue Management' },
//     { id: 'analytics', icon: BarChart3, label: 'Analytics' },
//     { id: 'settings', icon: Settings, label: 'Settings' },
//   ];

//   const SkeletonCard = () => (
//     <div className="bg-white p-6 rounded-2xl border border-gray-100 animate-pulse">
//       <div className="h-3 bg-gray-100 rounded w-24 mb-4"></div>
//       <div className="h-8 bg-gray-100 rounded w-16 mb-2"></div>
//       <div className="h-2 bg-gray-100 rounded w-20"></div>
//     </div>
//   );

//   const CustomTooltip = ({ active, payload, label }) => {
//     if (active && payload && payload.length) {
//       return (
//         <div className="bg-white border border-gray-200 rounded-xl shadow-lg px-4 py-3">
//           <p className="text-xs text-gray-500 mb-1">{label}</p>
//           <p className="text-sm font-bold text-blue-600">{payload[0].value} tokens</p>
//         </div>
//       );
//     }
//     return null;
//   };

//   const maxPeak = Math.max(...(peakData.map(d => d.tokens) || [1]));

//   return (
//     <div className="min-h-screen bg-gray-50 flex">

//       {/* Sidebar */}
//       <div className="w-60 bg-white border-r border-gray-100 flex flex-col fixed h-full z-10">
//         {/* Logo */}
//         <div className="p-5 border-b border-gray-100">
//           <div className="flex items-center gap-2.5 mb-3">
//             <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center flex-shrink-0">
//               <svg viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" className="w-4.5 h-4.5">
//                 <rect x="3" y="3" width="7" height="7" rx="1"/><rect x="14" y="3" width="7" height="7" rx="1"/>
//                 <rect x="3" y="14" width="7" height="7" rx="1"/><rect x="14" y="14" width="7" height="7" rx="1"/>
//               </svg>
//             </div>
//             <span className="text-base font-bold text-gray-900">QueueLess AI</span>
//           </div>
//           <div className="bg-gray-50 rounded-xl px-3 py-2">
//             <p className="text-xs text-gray-400 font-medium">Organisation</p>
//             <p className="text-sm font-semibold text-gray-800 truncate">{org.name || 'My Organisation'}</p>
//           </div>
//         </div>

//         {/* Nav */}
//         <nav className="flex-1 p-3 space-y-0.5">
//           {navItems.map(({ id, icon: Icon, label }) => (
//             <button
//               key={id}
//               onClick={() => setActiveTab(id)}
//               className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all ${
//                 activeTab === id
//                   ? 'bg-blue-50 text-blue-600'
//                   : 'text-gray-500 hover:bg-gray-50 hover:text-gray-800'
//               }`}
//             >
//               <Icon size={16} strokeWidth={activeTab === id ? 2.5 : 2} />
//               {label}
//             </button>
//           ))}
//         </nav>

//         {/* Bottom: live indicator + logout */}
//         <div className="p-3 border-t border-gray-100 space-y-1">
//           <div className="flex items-center gap-2 px-3 py-2">
//             <Wifi size={13} className="text-green-500" />
//             <span className="text-xs text-green-600 font-medium">Live updates on</span>
//             <div className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse ml-auto"></div>
//           </div>
//           <button
//             onClick={logout}
//             className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium text-red-500 hover:bg-red-50 transition-all"
//           >
//             <LogOut size={16} />
//             Logout
//           </button>
//         </div>
//       </div>

//       {/* Main */}
//       <div className="ml-60 flex-1 p-8 min-h-screen">

//         {/* ── OVERVIEW ── */}
//         {activeTab === 'overview' && (
//           <div className="space-y-6">
//             {/* Header */}
//             <div className="flex items-center justify-between">
//               <div>
//                 <h1 className="text-2xl font-bold text-gray-900">Overview</h1>
//                 <p className="text-gray-400 text-sm mt-0.5">Today's queue performance</p>
//               </div>
//               <button
//                 onClick={handleRefresh}
//                 className="flex items-center gap-2 text-sm font-medium text-gray-600 border border-gray-200 px-4 py-2 rounded-xl hover:bg-gray-50 transition-all"
//               >
//                 <RefreshCw size={14} className={refreshing ? 'animate-spin' : ''} />
//                 Refresh
//               </button>
//             </div>

//             {/* Stat cards */}
//             {pageLoading ? (
//               <div className="grid grid-cols-4 gap-4">
//                 {[...Array(4)].map((_, i) => <SkeletonCard key={i} />)}
//               </div>
//             ) : (
//               <div className="grid grid-cols-4 gap-4">
//                 {[
//                   {
//                     label: 'Current Token', icon: Ticket, iconColor: 'text-blue-600',
//                     bg: 'bg-blue-50', value: queue?.currentToken || 0,
//                     valueColor: 'text-blue-600', sub: 'Now serving'
//                   },
//                   {
//                     label: 'Waiting', icon: Users, iconColor: 'text-orange-500',
//                     bg: 'bg-orange-50', value: tokens.length,
//                     valueColor: 'text-orange-500', sub: 'In queue'
//                   },
//                   {
//                     label: 'Total Issued', icon: CheckCircle2, iconColor: 'text-green-600',
//                     bg: 'bg-green-50', value: queue?.lastTokenIssued || 0,
//                     valueColor: 'text-green-600', sub: 'Tokens today'
//                   },
//                   {
//                     label: 'No-Show Rate', icon: TrendingDown, iconColor: 'text-red-500',
//                     bg: 'bg-red-50', value: `${noShowData?.noShowRate || 0}%`,
//                     valueColor: 'text-red-500', sub: 'Absent rate'
//                   },
//                 ].map(card => (
//                   <div key={card.label} className="bg-white rounded-2xl border border-gray-100 p-5 hover:shadow-md hover:-translate-y-0.5 transition-all">
//                     <div className="flex items-center justify-between mb-3">
//                       <p className="text-xs font-medium text-gray-400 uppercase tracking-wide">{card.label}</p>
//                       <div className={`w-8 h-8 ${card.bg} rounded-lg flex items-center justify-center`}>
//                         <card.icon size={15} className={card.iconColor} />
//                       </div>
//                     </div>
//                     <p className={`text-3xl font-bold ${card.valueColor} mb-1`}>{card.value}</p>
//                     <p className="text-xs text-gray-400">{card.sub}</p>
//                   </div>
//                 ))}
//               </div>
//             )}

//             {/* Chart + Activity */}
//             <div className="grid grid-cols-3 gap-6">
//               {/* Peak Hours chart */}
//               <div className="col-span-2 bg-white rounded-2xl border border-gray-100 p-6">
//                 <div className="flex items-center justify-between mb-6">
//                   <div>
//                     <h2 className="text-base font-bold text-gray-900">Today's Peak Hours</h2>
//                     <p className="text-xs text-gray-400 mt-0.5">Token volume by hour</p>
//                   </div>
//                   {peakData.length > 0 && (
//                     <span className="text-xs bg-blue-50 text-blue-600 px-2.5 py-1 rounded-full font-medium">
//                       Peak: {peakData.reduce((a, b) => a.tokens > b.tokens ? a : b, { hour: '-', tokens: 0 }).hour}
//                     </span>
//                   )}
//                 </div>
//                 {peakData.length === 0 ? (
//                   <div className="h-48 flex flex-col items-center justify-center text-center">
//                     <BarChart3 size={32} className="text-gray-200 mb-3" />
//                     <p className="text-gray-400 text-sm font-medium">No data yet</p>
//                     <p className="text-gray-300 text-xs mt-1">Data appears as tokens are issued</p>
//                   </div>
//                 ) : (
//                   <ResponsiveContainer width="100%" height={200}>
//                     <BarChart data={peakData} barSize={28}>
//                       <CartesianGrid strokeDasharray="3 3" stroke="#f3f4f6" vertical={false} />
//                       <XAxis dataKey="hour" tick={{ fontSize: 11, fill: '#9ca3af' }} axisLine={false} tickLine={false} />
//                       <YAxis tick={{ fontSize: 11, fill: '#9ca3af' }} axisLine={false} tickLine={false} width={30} />
//                       <Tooltip content={<CustomTooltip />} cursor={{ fill: '#f3f4f6', radius: 8 }} />
//                       <Bar dataKey="tokens" radius={[6, 6, 0, 0]}>
//                         {peakData.map((entry, i) => (
//                           <Cell key={i} fill={entry.tokens === maxPeak ? '#2563eb' : '#bfdbfe'} />
//                         ))}
//                       </Bar>
//                     </BarChart>
//                   </ResponsiveContainer>
//                 )}
//               </div>

//               {/* Recent Activity */}
//               <div className="bg-white rounded-2xl border border-gray-100 p-6">
//                 <h2 className="text-base font-bold text-gray-900 mb-4">Recent Activity</h2>
//                 <div className="space-y-3">
//                   {activity.length === 0 ? (
//                     <p className="text-gray-400 text-sm">No activity yet</p>
//                   ) : activity.map(a => (
//                     <div key={a.id} className="flex items-start gap-2.5">
//                       <div className={`w-1.5 h-1.5 rounded-full mt-1.5 flex-shrink-0 ${
//                         a.type === 'success' ? 'bg-green-500' :
//                         a.type === 'warning' ? 'bg-orange-400' : 'bg-blue-400'
//                       }`}></div>
//                       <div className="flex-1 min-w-0">
//                         <p className="text-xs text-gray-700 font-medium leading-snug">{a.msg}</p>
//                         <p className="text-xs text-gray-400 mt-0.5">{a.time}</p>
//                       </div>
//                     </div>
//                   ))}
//                 </div>
//               </div>
//             </div>

//             {/* Queue Status card */}
//             <div className="bg-white rounded-2xl border border-gray-100 p-6">
//               <div className="flex items-center justify-between">
//                 <h2 className="text-base font-bold text-gray-900">Queue Status</h2>
//                 <div className="flex items-center gap-1.5">
//                   <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
//                   <span className="text-xs text-green-600 font-semibold">Open</span>
//                 </div>
//               </div>
//               <div className="grid grid-cols-3 gap-4 mt-4">
//                 {[
//                   { label: 'Current Wait', value: `~${tokens.length * (avgTime || 5)} min`, icon: Clock },
//                   { label: 'Avg Service Time', value: `${avgTime} min`, icon: CheckCircle2 },
//                   { label: 'Next Token', value: queue?.currentToken ? `#${queue.currentToken + 1}` : '—', icon: ChevronRight },
//                 ].map(s => (
//                   <div key={s.label} className="bg-gray-50 rounded-xl px-4 py-3 flex items-center gap-3">
//                     <s.icon size={16} className="text-gray-400 flex-shrink-0" />
//                     <div>
//                       <p className="text-xs text-gray-400">{s.label}</p>
//                       <p className="text-sm font-bold text-gray-800">{s.value}</p>
//                     </div>
//                   </div>
//                 ))}
//               </div>
//             </div>
//           </div>
//         )}

//         {/* ── QUEUE MANAGEMENT ── */}
//         {activeTab === 'queue' && (
//           <div className="space-y-6">
//             <div>
//               <h1 className="text-2xl font-bold text-gray-900">Queue Management</h1>
//               <p className="text-gray-400 text-sm mt-0.5">Manage today's live queue</p>
//             </div>

//             <div className="grid grid-cols-2 gap-6">
//               {/* Current token */}
//               <div className="bg-white rounded-2xl border border-gray-100 p-6">
//                 <div className="flex items-center justify-between mb-2">
//                   <h2 className="text-base font-bold text-gray-900">Now Serving</h2>
//                   <div className="flex items-center gap-1.5">
//                     <div className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse"></div>
//                     <span className="text-xs text-green-600 font-medium">Live</span>
//                   </div>
//                 </div>
//                 <div className="text-center py-6">
//                   <p className="text-xs text-gray-400 uppercase tracking-widest mb-2">Current Token</p>
//                   <p className="text-7xl font-black text-blue-600">{queue?.currentToken || 0}</p>
//                   <p className="text-sm text-gray-400 mt-2">{tokens.length} waiting in queue</p>
//                 </div>
//                 <div className="space-y-3">
//                   <button onClick={callNext} className="w-full bg-blue-600 text-white py-3.5 rounded-xl font-semibold hover:bg-blue-700 transition-colors flex items-center justify-center gap-2">
//                     <ChevronRight size={18} />
//                     Call Next Token
//                   </button>
//                   <button onClick={completeToken} className="w-full bg-green-600 text-white py-3.5 rounded-xl font-semibold hover:bg-green-700 transition-colors flex items-center justify-center gap-2">
//                     <CheckCircle2 size={18} />
//                     Complete Current
//                   </button>
//                 </div>
//               </div>

//               {/* QR Code */}
//               <div className="bg-white rounded-2xl border border-gray-100 p-6">
//                 <div className="flex items-center gap-2 mb-2">
//                   <QrCode size={16} className="text-gray-600" />
//                   <h2 className="text-base font-bold text-gray-900">Your QR Code</h2>
//                 </div>
//                 <p className="text-gray-400 text-sm mb-5">Display at your entrance for customers to scan and join the queue</p>
//                 {org.qrCode ? (
//                   <div className="flex flex-col items-center">
//                     <div className="p-3 border-2 border-gray-100 rounded-2xl inline-block">
//                       <img src={org.qrCode} alt="QR Code" className="w-36 h-36" />
//                     </div>
//                     <p className="text-xs text-gray-400 mt-3">Scan to join queue</p>
//                   </div>
//                 ) : (
//                   <div className="flex flex-col items-center justify-center h-40 bg-gray-50 rounded-xl">
//                     <QrCode size={32} className="text-gray-300 mb-2" />
//                     <p className="text-gray-400 text-sm">QR Code not generated</p>
//                   </div>
//                 )}
//               </div>
//             </div>

//             {/* Waiting queue list */}
//             <div className="bg-white rounded-2xl border border-gray-100 p-6">
//               <div className="flex items-center justify-between mb-5">
//                 <h2 className="text-base font-bold text-gray-900">Waiting Queue</h2>
//                 <span className="bg-orange-50 text-orange-600 text-xs font-semibold px-3 py-1 rounded-full">
//                   {tokens.length} waiting
//                 </span>
//               </div>
//               <div className="space-y-2">
//                 {tokens.map((t, index) => (
//                   <div key={t._id} className={`flex items-center justify-between p-4 rounded-xl transition-all ${index === 0 ? 'bg-blue-50 border border-blue-100' : 'bg-gray-50'}`}>
//                     <div className="flex items-center gap-4">
//                       <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0 ${index === 0 ? 'bg-blue-600 text-white' : 'bg-white text-gray-600 border border-gray-200'}`}>
//                         {index + 1}
//                       </div>
//                       <div>
//                         <p className="text-sm font-bold text-gray-900">Token #{t.tokenNumber}</p>
//                         <p className="text-xs text-gray-400">{t.phoneNumber} · ~{(index + 1) * avgTime} min wait</p>
//                       </div>
//                     </div>
//                     <button
//                       onClick={() => markAbsent(t._id, t.tokenNumber)}
//                       className="text-xs text-red-500 border border-red-100 px-3 py-1.5 rounded-lg hover:bg-red-50 transition-colors flex items-center gap-1.5"
//                     >
//                       <AlertCircle size={12} />
//                       Mark Absent
//                     </button>
//                   </div>
//                 ))}
//                 {tokens.length === 0 && (
//                   <div className="text-center py-12">
//                     <CheckCircle2 size={40} className="text-green-300 mx-auto mb-3" />
//                     <p className="text-gray-500 font-medium">Queue is clear</p>
//                     <p className="text-gray-400 text-sm mt-1">No tokens waiting</p>
//                   </div>
//                 )}
//               </div>
//             </div>
//           </div>
//         )}

//         {/* ── ANALYTICS ── */}
//         {activeTab === 'analytics' && (
//           <div className="space-y-6">
//             <div>
//               <h1 className="text-2xl font-bold text-gray-900">Analytics</h1>
//               <p className="text-gray-400 text-sm mt-0.5">Understand your queue patterns</p>
//             </div>

//             <div className="grid grid-cols-3 gap-4">
//               {[
//                 { label: 'Total Tokens', value: noShowData?.totalTokens || 0, color: 'text-gray-900', icon: Ticket, bg: 'bg-gray-50', iconColor: 'text-gray-500' },
//                 { label: 'Absent Tokens', value: noShowData?.absentTokens || 0, color: 'text-red-500', icon: AlertCircle, bg: 'bg-red-50', iconColor: 'text-red-500' },
//                 { label: 'No-Show Rate', value: `${noShowData?.noShowRate || 0}%`, color: 'text-red-500', icon: TrendingDown, bg: 'bg-red-50', iconColor: 'text-red-500' },
//               ].map(card => (
//                 <div key={card.label} className="bg-white rounded-2xl border border-gray-100 p-5 hover:shadow-md transition-all">
//                   <div className="flex items-center justify-between mb-3">
//                     <p className="text-xs font-medium text-gray-400 uppercase tracking-wide">{card.label}</p>
//                     <div className={`w-8 h-8 ${card.bg} rounded-lg flex items-center justify-center`}>
//                       <card.icon size={15} className={card.iconColor} />
//                     </div>
//                   </div>
//                   <p className={`text-3xl font-bold ${card.color}`}>{card.value}</p>
//                 </div>
//               ))}
//             </div>

//             <div className="bg-white rounded-2xl border border-gray-100 p-6">
//               <div className="flex items-center justify-between mb-6">
//                 <div>
//                   <h2 className="text-base font-bold text-gray-900">Peak Hours Breakdown</h2>
//                   <p className="text-xs text-gray-400 mt-0.5">Token volume distributed across the day</p>
//                 </div>
//               </div>
//               {peakData.length === 0 ? (
//                 <div className="h-64 flex flex-col items-center justify-center">
//                   <BarChart3 size={40} className="text-gray-200 mb-3" />
//                   <p className="text-gray-400 text-sm font-medium">Not enough data yet</p>
//                   <p className="text-gray-300 text-xs mt-1">Issue tokens to see patterns here</p>
//                 </div>
//               ) : (
//                 <ResponsiveContainer width="100%" height={280}>
//                   <BarChart data={peakData} barSize={32}>
//                     <CartesianGrid strokeDasharray="3 3" stroke="#f3f4f6" vertical={false} />
//                     <XAxis dataKey="hour" tick={{ fontSize: 11, fill: '#9ca3af' }} axisLine={false} tickLine={false} />
//                     <YAxis tick={{ fontSize: 11, fill: '#9ca3af' }} axisLine={false} tickLine={false} width={30} />
//                     <Tooltip content={<CustomTooltip />} cursor={{ fill: '#f3f4f6', radius: 8 }} />
//                     <Bar dataKey="tokens" radius={[6, 6, 0, 0]}>
//                       {peakData.map((entry, i) => (
//                         <Cell key={i} fill={entry.tokens === maxPeak ? '#2563eb' : '#bfdbfe'} />
//                       ))}
//                     </Bar>
//                   </BarChart>
//                 </ResponsiveContainer>
//               )}
//             </div>
//           </div>
//         )}

//         {/* ── SETTINGS ── */}
//         {activeTab === 'settings' && (
//           <div className="space-y-6">
//             <div>
//               <h1 className="text-2xl font-bold text-gray-900">Settings</h1>
//               <p className="text-gray-400 text-sm mt-0.5">Configure your queue behaviour</p>
//             </div>

//             <div className="bg-white rounded-2xl border border-gray-100 p-6 max-w-lg">
//               <h2 className="text-base font-bold text-gray-900 mb-1">Queue Configuration</h2>
//               <p className="text-gray-400 text-sm mb-6">These values affect wait time predictions shown to customers</p>
//               <div className="space-y-5">
//                 <div>
//                   <label className="block text-sm font-medium text-gray-700 mb-1.5">
//                     Average service time per customer
//                   </label>
//                   <div className="flex items-center gap-3">
//                     <input
//                       type="number"
//                       value={avgTime}
//                       onChange={e => setAvgTime(e.target.value)}
//                       className="border border-gray-200 px-4 py-3 rounded-xl w-32 text-lg font-bold focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
//                       min="1" max="60"
//                     />
//                     <span className="text-gray-500 text-sm font-medium">minutes</span>
//                   </div>
//                   <p className="text-gray-400 text-xs mt-1.5">Used to calculate estimated wait times sent via WhatsApp</p>
//                 </div>
//                 <button
//                   onClick={updateSettings}
//                   className="flex items-center gap-2 bg-blue-600 text-white px-6 py-3 rounded-xl font-semibold text-sm hover:bg-blue-700 transition-colors"
//                 >
//                   <Save size={15} />
//                   Save Settings
//                 </button>
//               </div>
//             </div>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// }




//--------------------------------------------------------------------------------




import { useEffect, useState } from 'react';
import axios from 'axios';
import socket from '../socket';
import {
  BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer,
  CartesianGrid, Cell
} from 'recharts';
import { useNavigate } from 'react-router-dom';
import {
  LayoutDashboard, Ticket, BarChart3, Settings, LogOut,
  RefreshCw, Users, TrendingDown, Clock, CheckCircle2,
  AlertCircle, ChevronRight, Wifi, QrCode, Save
} from 'lucide-react';

export default function AdminDashboard() {
  const DEMO_PEAK = [
    { hour: '9 AM', tokens: 8 }, { hour: '10 AM', tokens: 14 },
    { hour: '11 AM', tokens: 22 }, { hour: '12 PM', tokens: 17 },
    { hour: '1 PM', tokens: 31 }, { hour: '2 PM', tokens: 26 },
    { hour: '3 PM', tokens: 19 }, { hour: '4 PM', tokens: 11 },
  ];
  const [queue, setQueue] = useState({ currentToken: 42, lastTokenIssued: 126 });
  const [tokens, setTokens] = useState([
    { _id: '1', tokenNumber: 43, phoneNumber: '+91 98765 43210' },
    { _id: '2', tokenNumber: 44, phoneNumber: '+91 91234 56789' },
    { _id: '3', tokenNumber: 45, phoneNumber: '+91 87654 32109' },
  ]);
  const [avgTime, setAvgTime] = useState(8);
  const [peakData, setPeakData] = useState(DEMO_PEAK);
  const [noShowData, setNoShowData] = useState({ totalTokens: 126, absentTokens: 5, noShowRate: 4.2 });
  const [activeTab, setActiveTab] = useState('overview');
  const [pageLoading, setPageLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [activity, setActivity] = useState([
    { id: 1, msg: 'Queue session started', time: '9:00 AM', type: 'info' },
  ]);

  const org = JSON.parse(localStorage.getItem('org') || '{}');
  const token = localStorage.getItem('token');
  const navigate = useNavigate();

  const addActivity = (msg, type = 'success') => {
    const now = new Date();
    const time = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    setActivity(prev => [{ id: Date.now(), msg, time, type }, ...prev].slice(0, 6));
  };

  const fetchQueue = async () => {
    try {
      const { data } = await axios.get(`http://localhost:5000/api/token/status/${org.id}`);
      setQueue(data.queue);
      setTokens(data.waitingTokens);
    } catch (err) { console.error(err); }
  };

  const fetchPeakHours = async () => {
    try {
      const { data } = await axios.get(
        `http://localhost:5000/api/token/peak/${org.id}`,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setPeakData(data.peakData);
    } catch (err) { console.error(err); }
  };

  const fetchNoShowRate = async () => {
    try {
      const { data } = await axios.get(
        `http://localhost:5000/api/token/noshow/${org.id}`,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setNoShowData(data);
    } catch (err) { console.error(err); }
  };

  const handleRefresh = async () => {
    setRefreshing(true);
    await Promise.all([fetchQueue(), fetchPeakHours(), fetchNoShowRate()]);
    setTimeout(() => setRefreshing(false), 600);
  };

  useEffect(() => {
    const loadData = async () => {
      await Promise.all([fetchQueue(), fetchPeakHours(), fetchNoShowRate()]);
      setPageLoading(false);
    };
    loadData();
    socket.emit('joinQueue', org.id);
    socket.on('queueUpdate', () => { fetchQueue(); addActivity('Queue updated in real-time', 'info'); });
    socket.on('connect', () => socket.emit('joinQueue', org.id));
    return () => { socket.off('queueUpdate'); socket.off('connect'); };
  }, []);

  const callNext = async () => {
    try {
      await axios.post('http://localhost:5000/api/token/next',
        { orgId: org.id },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      fetchQueue();
      addActivity(`Called next token`, 'success');
    } catch (err) { alert(err.response?.data?.message || 'Error calling next token'); }
  };

  const markAbsent = async (tokenId, tokenNumber) => {
    try {
      await axios.post('http://localhost:5000/api/token/absent',
        { tokenId },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      fetchQueue(); fetchNoShowRate();
      addActivity(`Token #${tokenNumber} marked absent`, 'warning');
    } catch (err) { alert('Failed to mark absent'); }
  };

  const updateSettings = async () => {
    try {
      await axios.put('http://localhost:5000/api/auth/settings',
        { avgServiceTime: avgTime },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      addActivity('Settings saved successfully', 'success');
    } catch (err) { alert('Failed to save settings'); }
  };

  const completeToken = async () => {
    try {
      await axios.post('http://localhost:5000/api/token/complete',
        { orgId: org.id },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      fetchQueue();
      addActivity(`Token #${queue?.currentToken} completed`, 'success');
    } catch (err) { alert(err.response?.data?.message || 'Error'); }
  };

  const logout = () => { localStorage.clear(); navigate('/'); };

  const navItems = [
    { id: 'overview', icon: LayoutDashboard, label: 'Overview' },
    { id: 'queue', icon: Ticket, label: 'Queue Management' },
    { id: 'analytics', icon: BarChart3, label: 'Analytics' },
    { id: 'settings', icon: Settings, label: 'Settings' },
  ];

  const SkeletonCard = () => (
    <div className="bg-white p-6 rounded-2xl border border-gray-100 animate-pulse">
      <div className="h-3 bg-gray-100 rounded w-24 mb-4"></div>
      <div className="h-8 bg-gray-100 rounded w-16 mb-2"></div>
      <div className="h-2 bg-gray-100 rounded w-20"></div>
    </div>
  );

  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white border border-gray-200 rounded-xl shadow-lg px-4 py-3">
          <p className="text-xs text-gray-500 mb-1">{label}</p>
          <p className="text-sm font-bold text-blue-600">{payload[0].value} tokens</p>
        </div>
      );
    }
    return null;
  };

  const maxPeak = Math.max(...(peakData.map(d => d.tokens) || [1]));

  return (
    <div className="min-h-screen bg-gray-50 flex">

      {/* Sidebar */}
      <div className="w-60 bg-white border-r border-gray-100 flex flex-col fixed h-full z-10">
        {/* Logo */}
        <div className="p-5 border-b border-gray-100">
          <div className="flex items-center gap-2.5 mb-3">
            <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center flex-shrink-0">
              <svg viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" className="w-4.5 h-4.5">
                <rect x="3" y="3" width="7" height="7" rx="1"/><rect x="14" y="3" width="7" height="7" rx="1"/>
                <rect x="3" y="14" width="7" height="7" rx="1"/><rect x="14" y="14" width="7" height="7" rx="1"/>
              </svg>
            </div>
            <span className="text-base font-bold text-gray-900">QueueLess AI</span>
          </div>
          <div className="bg-gray-50 rounded-xl px-3 py-2">
            <p className="text-xs text-gray-400 font-medium">Organisation</p>
            <p className="text-sm font-semibold text-gray-800 truncate">{org.name || 'My Organisation'}</p>
          </div>
        </div>

        {/* Nav */}
        <nav className="flex-1 p-3 space-y-0.5">
          {navItems.map(({ id, icon: Icon, label }) => (
            <button
              key={id}
              onClick={() => setActiveTab(id)}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all ${
                activeTab === id
                  ? 'bg-blue-50 text-blue-600'
                  : 'text-gray-500 hover:bg-gray-50 hover:text-gray-800'
              }`}
            >
              <Icon size={16} strokeWidth={activeTab === id ? 2.5 : 2} />
              {label}
            </button>
          ))}
        </nav>

        {/* Bottom: live indicator + logout */}
        <div className="p-3 border-t border-gray-100 space-y-1">
          <div className="flex items-center gap-2 px-3 py-2">
            <Wifi size={13} className="text-green-500" />
            <span className="text-xs text-green-600 font-medium">Live updates on</span>
            <div className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse ml-auto"></div>
          </div>
          <button
            onClick={logout}
            className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium text-red-500 hover:bg-red-50 transition-all"
          >
            <LogOut size={16} />
            Logout
          </button>
        </div>
      </div>

      {/* Main */}
      <div className="ml-60 flex-1 p-8 min-h-screen">

        {/* ── OVERVIEW ── */}
        {activeTab === 'overview' && (
          <div className="space-y-6">
            {/* Header */}
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-2xl font-bold text-gray-900">Overview</h1>
                <p className="text-gray-400 text-sm mt-0.5">Today's queue performance</p>
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={handleRefresh}
                  className="flex items-center gap-2 text-sm font-medium text-gray-600 border border-gray-200 px-4 py-2 rounded-xl hover:bg-gray-50 transition-all"
                >
                  <RefreshCw size={14} className={refreshing ? 'animate-spin' : ''} />
                  Refresh
                </button>
                <button
                  onClick={() => setActiveTab('queue')}
                  className="flex items-center gap-2 text-sm font-medium text-gray-600 border border-gray-200 px-4 py-2 rounded-xl hover:bg-gray-50 transition-all"
                >
                  <QrCode size={14} />
                  View QR
                </button>
                <button
                  onClick={callNext}
                  className="flex items-center gap-2 text-sm font-semibold text-white bg-blue-600 px-4 py-2 rounded-xl hover:bg-blue-700 transition-all"
                >
                  <ChevronRight size={14} />
                  Call Next
                </button>
              </div>
            </div>

            {/* Stat cards */}
            {pageLoading ? (
              <div className="grid grid-cols-4 gap-4">
                {[...Array(4)].map((_, i) => <SkeletonCard key={i} />)}
              </div>
            ) : (
              <div className="grid grid-cols-4 gap-4">
                {[
                  {
                    label: 'Current Token', icon: Ticket, iconColor: 'text-blue-600',
                    bg: 'bg-blue-50', value: queue?.currentToken || 0,
                    valueColor: 'text-blue-600', sub: 'Now serving'
                  },
                  {
                    label: 'Waiting', icon: Users, iconColor: 'text-orange-500',
                    bg: 'bg-orange-50', value: tokens.length,
                    valueColor: 'text-orange-500', sub: 'In queue'
                  },
                  {
                    label: 'Total Issued', icon: CheckCircle2, iconColor: 'text-green-600',
                    bg: 'bg-green-50', value: queue?.lastTokenIssued || 0,
                    valueColor: 'text-green-600', sub: 'Tokens today'
                  },
                  {
                    label: 'No-Show Rate', icon: TrendingDown, iconColor: 'text-red-500',
                    bg: 'bg-red-50', value: `${noShowData?.noShowRate || 0}%`,
                    valueColor: 'text-red-500', sub: 'Absent rate'
                  },
                ].map(card => (
                  <div key={card.label} className="bg-white rounded-2xl border border-gray-100 p-5 hover:shadow-md hover:-translate-y-0.5 transition-all">
                    <div className="flex items-center justify-between mb-3">
                      <p className="text-xs font-medium text-gray-400 uppercase tracking-wide">{card.label}</p>
                      <div className={`w-8 h-8 ${card.bg} rounded-lg flex items-center justify-center`}>
                        <card.icon size={15} className={card.iconColor} />
                      </div>
                    </div>
                    <p className={`text-3xl font-bold ${card.valueColor} mb-1`}>{card.value}</p>
                    <p className="text-xs text-gray-400">{card.sub}</p>
                  </div>
                ))}
              </div>
            )}

            {/* Chart + Activity */}
            <div className="grid grid-cols-3 gap-6">
              {/* Peak Hours chart */}
              <div className="col-span-2 bg-white rounded-2xl border border-gray-100 p-6">
                <div className="flex items-center justify-between mb-6">
                  <div>
                    <h2 className="text-base font-bold text-gray-900">Today's Peak Hours</h2>
                    <p className="text-xs text-gray-400 mt-0.5">Token volume by hour</p>
                  </div>
                  {peakData.length > 0 && (
                    <span className="text-xs bg-blue-50 text-blue-600 px-2.5 py-1 rounded-full font-medium">
                      Peak: {peakData.reduce((a, b) => a.tokens > b.tokens ? a : b, { hour: '-', tokens: 0 }).hour}
                    </span>
                  )}
                </div>
                {peakData.length === 0 ? (
                  <div className="h-48 flex flex-col items-center justify-center text-center px-6">
                    <div className="w-12 h-12 bg-gray-50 rounded-2xl flex items-center justify-center mb-3">
                      <BarChart3 size={22} className="text-gray-300" />
                    </div>
                    <p className="text-gray-500 text-sm font-semibold">No queue history yet</p>
                    <p className="text-gray-400 text-xs mt-1.5 max-w-xs leading-relaxed">Peak hour analytics will appear here once customers start joining the queue</p>
                  </div>
                ) : (
                  <ResponsiveContainer width="100%" height={200}>
                    <BarChart data={peakData} barSize={28}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#f3f4f6" vertical={false} />
                      <XAxis dataKey="hour" tick={{ fontSize: 11, fill: '#9ca3af' }} axisLine={false} tickLine={false} />
                      <YAxis tick={{ fontSize: 11, fill: '#9ca3af' }} axisLine={false} tickLine={false} width={30} />
                      <Tooltip content={<CustomTooltip />} cursor={{ fill: '#f3f4f6', radius: 8 }} />
                      <Bar dataKey="tokens" radius={[6, 6, 0, 0]}>
                        {peakData.map((entry, i) => (
                          <Cell key={i} fill={entry.tokens === maxPeak ? '#2563eb' : '#bfdbfe'} />
                        ))}
                      </Bar>
                    </BarChart>
                  </ResponsiveContainer>
                )}
              </div>

              {/* Recent Activity */}
              <div className="bg-white rounded-2xl border border-gray-100 p-6">
                <h2 className="text-base font-bold text-gray-900 mb-4">Recent Activity</h2>
                <div className="space-y-3">
                  {activity.length === 0 ? (
                    <p className="text-gray-400 text-sm">No activity yet</p>
                  ) : activity.map(a => (
                    <div key={a.id} className="flex items-start gap-2.5">
                      <div className={`w-1.5 h-1.5 rounded-full mt-1.5 flex-shrink-0 ${
                        a.type === 'success' ? 'bg-green-500' :
                        a.type === 'warning' ? 'bg-orange-400' : 'bg-blue-400'
                      }`}></div>
                      <div className="flex-1 min-w-0">
                        <p className="text-xs text-gray-700 font-medium leading-snug">{a.msg}</p>
                        <p className="text-xs text-gray-400 mt-0.5">{a.time}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Queue Status card */}
            <div className="bg-white rounded-2xl border border-gray-100 p-6">
              <div className="flex items-center justify-between">
                <h2 className="text-base font-bold text-gray-900">Queue Status</h2>
                <div className="flex items-center gap-1.5">
                  <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                  <span className="text-xs text-green-600 font-semibold">Open</span>
                </div>
              </div>
              <div className="grid grid-cols-3 gap-4 mt-4">
                {[
                  { label: 'Current Wait', value: `~${tokens.length * (avgTime || 5)} min`, icon: Clock },
                  { label: 'Avg Service Time', value: `${avgTime} min`, icon: CheckCircle2 },
                  { label: 'Next Token', value: queue?.currentToken ? `#${queue.currentToken + 1}` : '—', icon: ChevronRight },
                ].map(s => (
                  <div key={s.label} className="bg-gray-50 rounded-xl px-4 py-3 flex items-center gap-3">
                    <s.icon size={16} className="text-gray-400 flex-shrink-0" />
                    <div>
                      <p className="text-xs text-gray-400">{s.label}</p>
                      <p className="text-sm font-bold text-gray-800">{s.value}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* ── QUEUE MANAGEMENT ── */}
        {activeTab === 'queue' && (
          <div className="space-y-6">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Queue Management</h1>
              <p className="text-gray-400 text-sm mt-0.5">Manage today's live queue</p>
            </div>

            <div className="grid grid-cols-2 gap-6">
              {/* Current token */}
              <div className="bg-white rounded-2xl border border-gray-100 p-6">
                <div className="flex items-center justify-between mb-2">
                  <h2 className="text-base font-bold text-gray-900">Now Serving</h2>
                  <div className="flex items-center gap-1.5">
                    <div className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse"></div>
                    <span className="text-xs text-green-600 font-medium">Live</span>
                  </div>
                </div>
                <div className="text-center py-6">
                  <p className="text-xs text-gray-400 uppercase tracking-widest mb-2">Current Token</p>
                  <p className="text-7xl font-black text-blue-600">{queue?.currentToken || 0}</p>
                  <p className="text-sm text-gray-400 mt-2">{tokens.length} waiting in queue</p>
                </div>
                <div className="space-y-3">
                  <button onClick={callNext} className="w-full bg-blue-600 text-white py-3.5 rounded-xl font-semibold hover:bg-blue-700 transition-colors flex items-center justify-center gap-2">
                    <ChevronRight size={18} />
                    Call Next Token
                  </button>
                  <button onClick={completeToken} className="w-full bg-green-600 text-white py-3.5 rounded-xl font-semibold hover:bg-green-700 transition-colors flex items-center justify-center gap-2">
                    <CheckCircle2 size={18} />
                    Complete Current
                  </button>
                </div>
              </div>

              {/* QR Code */}
              <div className="bg-white rounded-2xl border border-gray-100 p-6">
                <div className="flex items-center gap-2 mb-2">
                  <QrCode size={16} className="text-gray-600" />
                  <h2 className="text-base font-bold text-gray-900">Your QR Code</h2>
                </div>
                <p className="text-gray-400 text-sm mb-5">Display at your entrance for customers to scan and join the queue</p>
                {org.qrCode ? (
                  <div className="flex flex-col items-center">
                    <div className="p-3 border-2 border-gray-100 rounded-2xl inline-block">
                      <img src={org.qrCode} alt="QR Code" className="w-36 h-36" />
                    </div>
                    <p className="text-xs text-gray-400 mt-3">Scan to join queue</p>
                  </div>
                ) : (
                  <div className="flex flex-col items-center justify-center h-40 bg-gray-50 rounded-xl">
                    <QrCode size={32} className="text-gray-300 mb-2" />
                    <p className="text-gray-400 text-sm">QR Code not generated</p>
                  </div>
                )}
              </div>
            </div>

            {/* Waiting queue list */}
            <div className="bg-white rounded-2xl border border-gray-100 p-6">
              <div className="flex items-center justify-between mb-5">
                <h2 className="text-base font-bold text-gray-900">Waiting Queue</h2>
                <span className="bg-orange-50 text-orange-600 text-xs font-semibold px-3 py-1 rounded-full">
                  {tokens.length} waiting
                </span>
              </div>
              <div className="space-y-2">
                {tokens.map((t, index) => (
                  <div key={t._id} className={`flex items-center justify-between p-4 rounded-xl transition-all ${index === 0 ? 'bg-blue-50 border border-blue-100' : 'bg-gray-50'}`}>
                    <div className="flex items-center gap-4">
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0 ${index === 0 ? 'bg-blue-600 text-white' : 'bg-white text-gray-600 border border-gray-200'}`}>
                        {index + 1}
                      </div>
                      <div>
                        <p className="text-sm font-bold text-gray-900">Token #{t.tokenNumber}</p>
                        <p className="text-xs text-gray-400">{t.phoneNumber} · ~{(index + 1) * avgTime} min wait</p>
                      </div>
                    </div>
                    <button
                      onClick={() => markAbsent(t._id, t.tokenNumber)}
                      className="text-xs text-red-500 border border-red-100 px-3 py-1.5 rounded-lg hover:bg-red-50 transition-colors flex items-center gap-1.5"
                    >
                      <AlertCircle size={12} />
                      Mark Absent
                    </button>
                  </div>
                ))}
                {tokens.length === 0 && (
                  <div className="text-center py-12">
                    <CheckCircle2 size={40} className="text-green-300 mx-auto mb-3" />
                    <p className="text-gray-500 font-medium">Queue is clear</p>
                    <p className="text-gray-400 text-sm mt-1">No tokens waiting</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

        {/* ── ANALYTICS ── */}
        {activeTab === 'analytics' && (
          <div className="space-y-6">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Analytics</h1>
              <p className="text-gray-400 text-sm mt-0.5">Understand your queue patterns</p>
            </div>

            <div className="grid grid-cols-3 gap-4">
              {[
                { label: 'Total Tokens', value: noShowData?.totalTokens || 0, color: 'text-gray-900', icon: Ticket, bg: 'bg-gray-50', iconColor: 'text-gray-500' },
                { label: 'Absent Tokens', value: noShowData?.absentTokens || 0, color: 'text-red-500', icon: AlertCircle, bg: 'bg-red-50', iconColor: 'text-red-500' },
                { label: 'No-Show Rate', value: `${noShowData?.noShowRate || 0}%`, color: 'text-red-500', icon: TrendingDown, bg: 'bg-red-50', iconColor: 'text-red-500' },
              ].map(card => (
                <div key={card.label} className="bg-white rounded-2xl border border-gray-100 p-5 hover:shadow-md transition-all">
                  <div className="flex items-center justify-between mb-3">
                    <p className="text-xs font-medium text-gray-400 uppercase tracking-wide">{card.label}</p>
                    <div className={`w-8 h-8 ${card.bg} rounded-lg flex items-center justify-center`}>
                      <card.icon size={15} className={card.iconColor} />
                    </div>
                  </div>
                  <p className={`text-3xl font-bold ${card.color}`}>{card.value}</p>
                </div>
              ))}
            </div>

            <div className="bg-white rounded-2xl border border-gray-100 p-6">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h2 className="text-base font-bold text-gray-900">Peak Hours Breakdown</h2>
                  <p className="text-xs text-gray-400 mt-0.5">Token volume distributed across the day</p>
                </div>
              </div>
              {peakData.length === 0 ? (
                <div className="h-64 flex flex-col items-center justify-center">
                  <BarChart3 size={40} className="text-gray-200 mb-3" />
                  <p className="text-gray-400 text-sm font-medium">Not enough data yet</p>
                  <p className="text-gray-300 text-xs mt-1">Issue tokens to see patterns here</p>
                </div>
              ) : (
                <ResponsiveContainer width="100%" height={280}>
                  <BarChart data={peakData} barSize={32}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#f3f4f6" vertical={false} />
                    <XAxis dataKey="hour" tick={{ fontSize: 11, fill: '#9ca3af' }} axisLine={false} tickLine={false} />
                    <YAxis tick={{ fontSize: 11, fill: '#9ca3af' }} axisLine={false} tickLine={false} width={30} />
                    <Tooltip content={<CustomTooltip />} cursor={{ fill: '#f3f4f6', radius: 8 }} />
                    <Bar dataKey="tokens" radius={[6, 6, 0, 0]}>
                      {peakData.map((entry, i) => (
                        <Cell key={i} fill={entry.tokens === maxPeak ? '#2563eb' : '#bfdbfe'} />
                      ))}
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
              )}
            </div>
          </div>
        )}

        {/* ── SETTINGS ── */}
        {activeTab === 'settings' && (
          <div className="space-y-6">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Settings</h1>
              <p className="text-gray-400 text-sm mt-0.5">Configure your queue behaviour</p>
            </div>

            <div className="bg-white rounded-2xl border border-gray-100 p-6 max-w-lg">
              <h2 className="text-base font-bold text-gray-900 mb-1">Queue Configuration</h2>
              <p className="text-gray-400 text-sm mb-6">These values affect wait time predictions shown to customers</p>
              <div className="space-y-5">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">
                    Average service time per customer
                  </label>
                  <div className="flex items-center gap-3">
                    <input
                      type="number"
                      value={avgTime}
                      onChange={e => setAvgTime(e.target.value)}
                      className="border border-gray-200 px-4 py-3 rounded-xl w-32 text-lg font-bold focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                      min="1" max="60"
                    />
                    <span className="text-gray-500 text-sm font-medium">minutes</span>
                  </div>
                  <p className="text-gray-400 text-xs mt-1.5">Used to calculate estimated wait times sent via WhatsApp</p>
                </div>
                <button
                  onClick={updateSettings}
                  className="flex items-center gap-2 bg-blue-600 text-white px-6 py-3 rounded-xl font-semibold text-sm hover:bg-blue-700 transition-colors"
                >
                  <Save size={15} />
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
