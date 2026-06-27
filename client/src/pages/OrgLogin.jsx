// import { useState } from 'react';
// import axios from 'axios';
// import { useNavigate } from 'react-router-dom';

// export default function OrgLogin() {
//   const [form, setForm] = useState({ email: '', password: '' });
//   const navigate = useNavigate();

//   const handleSubmit = async () => {
//     try {
//       const { data } = await axios.post('http://localhost:5000/api/auth/login', form);
//       localStorage.setItem('token', data.token);
//       localStorage.setItem('org', JSON.stringify(data.org));
//       navigate('/dashboard');
//     } catch (err) {
//       alert(err.response?.data?.message || 'Login failed');
//     }
//   };

//   return (
//     <div className="min-h-screen bg-gray-50 flex items-center justify-center p-6">
//       <div className="bg-white p-8 rounded-xl shadow-md w-full max-w-md space-y-4">
//         <h2 className="text-2xl font-bold text-gray-900">Organisation Login</h2>
//         <input className="w-full border p-3 rounded-lg" placeholder="Email" onChange={e => setForm({...form, email: e.target.value})} />
//         <input className="w-full border p-3 rounded-lg" type="password" placeholder="Password" onChange={e => setForm({...form, password: e.target.value})} />
//         <button onClick={handleSubmit} className="w-full bg-blue-600 text-white py-3 rounded-lg font-medium hover:bg-blue-700">
//           Login
//         </button>
//       </div>
//     </div>
//   );
// }



//--------------------------------------------------------------------------------


// import { useState } from 'react';
// import axios from 'axios';
// import { useNavigate } from 'react-router-dom';

// export default function OrgLogin() {
//   const [form, setForm] = useState({ email: '', password: '' });
//   const [loading, setLoading] = useState(false);
//   const navigate = useNavigate();

//   const handleSubmit = async () => {
//     setLoading(true);
//     try {
//       const { data } = await axios.post('http://localhost:5000/api/auth/login', form);
//       localStorage.setItem('token', data.token);
//       localStorage.setItem('org', JSON.stringify(data.org));
//       navigate('/dashboard');
//     } catch (err) {
//       alert(err.response?.data?.message || 'Login failed');
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleKeyDown = (e) => {
//     if (e.key === 'Enter') handleSubmit();
//   };

//   return (
//     <div className="min-h-screen bg-white flex flex-col">

//       {/* Navbar */}
//       <nav className="flex items-center justify-between px-8 py-4 border-b border-gray-100">
//         <button onClick={() => navigate('/')} className="flex items-center gap-2 hover:opacity-80 transition-opacity">
//           <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
//             <svg viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" className="w-5 h-5">
//               <rect x="3" y="3" width="7" height="7" rx="1"/><rect x="14" y="3" width="7" height="7" rx="1"/>
//               <rect x="3" y="14" width="7" height="7" rx="1"/><rect x="14" y="14" width="7" height="7" rx="1"/>
//             </svg>
//           </div>
//           <span className="text-xl font-bold text-gray-900">QueueLess AI</span>
//         </button>
//         <button
//           onClick={() => navigate('/signup')}
//           className="text-sm font-medium text-gray-600 hover:text-gray-900 transition-colors"
//         >
//           No account? <span className="text-blue-600 font-semibold">Register →</span>
//         </button>
//       </nav>

//       {/* Main: two-column */}
//       <div className="flex flex-1">

//         {/* Left panel — branding */}
//         <div className="hidden lg:flex w-1/2 bg-blue-600 flex-col justify-between p-12 relative overflow-hidden">
//           {/* Background circles */}
//           <div className="absolute top-0 right-0 w-72 h-72 bg-blue-500 rounded-full -translate-y-1/2 translate-x-1/2 opacity-50"></div>
//           <div className="absolute bottom-0 left-0 w-56 h-56 bg-blue-700 rounded-full translate-y-1/2 -translate-x-1/2 opacity-50"></div>

//           <div className="relative z-10">
//             <p className="text-blue-200 text-sm font-medium uppercase tracking-widest mb-8">Organisation Portal</p>
//             <h2 className="text-4xl font-extrabold text-white leading-tight mb-4">
//               Your queue,<br />under control.
//             </h2>
//             <p className="text-blue-100 text-base leading-relaxed max-w-xs">
//               Manage tokens, track wait times, and keep your customers informed — all from one dashboard.
//             </p>
//           </div>

//           {/* Mini stats */}
//           <div className="relative z-10 grid grid-cols-3 gap-4">
//             {[['95%','Less waiting'],['3x','Throughput'],['10k+','Daily tokens']].map(([val, lbl]) => (
//               <div key={lbl} className="bg-white/10 rounded-2xl px-4 py-3">
//                 <p className="text-white text-xl font-black">{val}</p>
//                 <p className="text-blue-200 text-xs mt-0.5">{lbl}</p>
//               </div>
//             ))}
//           </div>
//         </div>

//         {/* Right panel — form */}
//         <div className="flex-1 flex items-center justify-center px-8 py-12">
//           <div className="w-full max-w-sm">
//             <div className="mb-8">
//               <h1 className="text-2xl font-bold text-gray-900 mb-1">Welcome back</h1>
//               <p className="text-gray-500 text-sm">Sign in to your organisation account</p>
//             </div>

//             <div className="space-y-4">
//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-1.5">Email address</label>
//                 <input
//                   type="email"
//                   placeholder="admin@hospital.com"
//                   className="w-full border border-gray-200 px-4 py-3 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
//                   onChange={e => setForm({...form, email: e.target.value})}
//                   onKeyDown={handleKeyDown}
//                 />
//               </div>
//               <div>
//                 <div className="flex items-center justify-between mb-1.5">
//                   <label className="block text-sm font-medium text-gray-700">Password</label>
//                   <button className="text-xs text-blue-600 hover:underline font-medium">Forgot password?</button>
//                 </div>
//                 <input
//                   type="password"
//                   placeholder="••••••••"
//                   className="w-full border border-gray-200 px-4 py-3 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
//                   onChange={e => setForm({...form, password: e.target.value})}
//                   onKeyDown={handleKeyDown}
//                 />
//               </div>

//               <button
//                 onClick={handleSubmit}
//                 disabled={loading}
//                 className="w-full bg-blue-600 text-white py-3 rounded-xl font-semibold text-sm hover:bg-blue-700 transition-colors disabled:opacity-60 disabled:cursor-not-allowed mt-2"
//               >
//                 {loading ? (
//                   <span className="flex items-center justify-center gap-2">
//                     <svg className="animate-spin w-4 h-4" viewBox="0 0 24 24" fill="none">
//                       <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="3" strokeOpacity="0.3"/>
//                       <path d="M12 2a10 10 0 0 1 10 10" stroke="currentColor" strokeWidth="3" strokeLinecap="round"/>
//                     </svg>
//                     Signing in...
//                   </span>
//                 ) : 'Sign in'}
//               </button>
//             </div>

//             <p className="text-center text-xs text-gray-400 mt-8">
//               Don't have an account?{' '}
//               <button onClick={() => navigate('/signup')} className="text-blue-600 font-semibold hover:underline">
//                 Register your organisation
//               </button>
//             </p>

//             {/* Trust badges */}
//             <div className="mt-10 pt-6 border-t border-gray-100">
//               <p className="text-xs text-gray-400 text-center mb-4">Trusted by organisations across India</p>
//               <div className="flex justify-center gap-6 text-gray-400 text-xs font-medium">
//                 {['🏥 Hospitals','🏦 Banks','🏛️ Govt Offices'].map(t => (
//                   <span key={t}>{t}</span>
//                 ))}
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }




//--------------------------------------------------------------------------------------





// import { useState } from 'react';
// import axios from 'axios';
// import { useNavigate } from 'react-router-dom';

// export default function OrgLogin() {
//   const [form, setForm] = useState({ email: '', password: '' });
//   const [loading, setLoading] = useState(false);
//   const [showPassword, setShowPassword] = useState(false);
//   const navigate = useNavigate();

//   const handleSubmit = async () => {
//     setLoading(true);
//     try {
//       const { data } = await axios.post('http://localhost:5000/api/auth/login', form);
//       localStorage.setItem('token', data.token);
//       localStorage.setItem('org', JSON.stringify(data.org));
//       navigate('/dashboard');
//     } catch (err) {
//       alert(err.response?.data?.message || 'Login failed');
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleKeyDown = (e) => { if (e.key === 'Enter') handleSubmit(); };

//   return (
//     <div className="min-h-screen bg-white flex flex-col">

//       {/* Navbar */}
//       <nav className="flex items-center justify-between px-8 py-4 border-b border-gray-100">
//         <button onClick={() => navigate('/')} className="flex items-center gap-2 hover:opacity-80 transition-opacity">
//           <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
//             <svg viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" className="w-5 h-5">
//               <rect x="3" y="3" width="7" height="7" rx="1"/><rect x="14" y="3" width="7" height="7" rx="1"/>
//               <rect x="3" y="14" width="7" height="7" rx="1"/><rect x="14" y="14" width="7" height="7" rx="1"/>
//             </svg>
//           </div>
//           <span className="text-xl font-bold text-gray-900">QueueLess AI</span>
//         </button>
//         <button onClick={() => navigate('/signup')} className="text-sm font-medium text-gray-600 hover:text-gray-900 transition-colors">
//           No account? <span className="text-blue-600 font-semibold">Register →</span>
//         </button>
//       </nav>

//       {/* Main */}
//       <div className="flex flex-1">

//         {/* Left panel */}
//         <div className="hidden lg:flex w-1/2 bg-blue-600 flex-col justify-between p-12 relative overflow-hidden">
//           <div className="absolute top-0 right-0 w-72 h-72 bg-blue-500 rounded-full -translate-y-1/2 translate-x-1/2 opacity-50"></div>
//           <div className="absolute bottom-0 left-0 w-56 h-56 bg-blue-700 rounded-full translate-y-1/2 -translate-x-1/2 opacity-50"></div>

//           <div className="relative z-10">
//             <p className="text-blue-200 text-sm font-medium uppercase tracking-widest mb-6">Organisation Portal</p>
//             <h2 className="text-4xl font-extrabold text-white leading-tight mb-4">
//               Your queue,<br />under control.
//             </h2>
//             <p className="text-blue-100 text-base leading-relaxed max-w-xs">
//               Manage tokens, track wait times, and keep your customers informed — all from one dashboard.
//             </p>
//           </div>

//           {/* Mini dashboard card */}
//           <div className="relative z-10 bg-white/10 backdrop-blur-sm rounded-2xl p-5 border border-white/20">
//             <div className="flex items-center justify-between mb-4">
//               <div className="flex items-center gap-2">
//                 <div className="w-5 h-5 bg-white rounded flex items-center justify-center">
//                   <svg viewBox="0 0 24 24" fill="none" stroke="#2563eb" strokeWidth="2.5" className="w-3 h-3">
//                     <rect x="3" y="3" width="7" height="7" rx="1"/><rect x="14" y="3" width="7" height="7" rx="1"/>
//                     <rect x="3" y="14" width="7" height="7" rx="1"/><rect x="14" y="14" width="7" height="7" rx="1"/>
//                   </svg>
//                 </div>
//                 <span className="text-white text-xs font-bold">Live Dashboard</span>
//               </div>
//               <div className="flex items-center gap-1.5">
//                 <div className="w-1.5 h-1.5 bg-green-400 rounded-full animate-pulse"></div>
//                 <span className="text-green-300 text-xs font-medium">Active</span>
//               </div>
//             </div>
//             <div className="space-y-2.5">
//               {[
//                 { label: 'Current Token', value: 'A-102', icon: '🎫' },
//                 { label: 'Customers Waiting', value: '38', icon: '👥' },
//                 { label: 'Avg Wait Time', value: '8 mins', icon: '⏱' },
//                 { label: 'WhatsApp Sent', value: '✓ Notified', icon: '📱', green: true },
//                 { label: 'AI Peak Prediction', value: '2:00 PM', icon: '🤖' },
//               ].map(row => (
//                 <div key={row.label} className="flex items-center justify-between bg-white/10 rounded-xl px-3 py-2">
//                   <div className="flex items-center gap-2">
//                     <span className="text-sm">{row.icon}</span>
//                     <span className="text-blue-100 text-xs">{row.label}</span>
//                   </div>
//                   <span className={`text-xs font-bold ${row.green ? 'text-green-300' : 'text-white'}`}>{row.value}</span>
//                 </div>
//               ))}
//             </div>
//           </div>
//         </div>

//         {/* Right panel — form */}
//         <div className="flex-1 flex items-center justify-center px-8 py-12">
//           <div className="w-full max-w-sm">
//             <div className="mb-8">
//               <h1 className="text-2xl font-bold text-gray-900 mb-1">Welcome back</h1>
//               <p className="text-gray-500 text-sm">Sign in to your organisation account</p>
//             </div>

//             <div className="space-y-4">
//               {/* Email */}
//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-1.5">Email address</label>
//                 <div className="relative">
//                   <div className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400">
//                     <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className="w-4 h-4">
//                       <rect x="2" y="4" width="20" height="16" rx="2"/><path d="m2 7 10 7 10-7"/>
//                     </svg>
//                   </div>
//                   <input
//                     type="email"
//                     placeholder="admin@hospital.com"
//                     className="w-full border border-gray-200 pl-10 pr-4 py-3 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
//                     onChange={e => setForm({...form, email: e.target.value})}
//                     onKeyDown={handleKeyDown}
//                   />
//                 </div>
//               </div>

//               {/* Password */}
//               <div>
//                 <div className="flex items-center justify-between mb-1.5">
//                   <label className="block text-sm font-medium text-gray-700">Password</label>
//                   <button className="text-xs text-blue-600 hover:underline font-medium">Forgot password?</button>
//                 </div>
//                 <div className="relative">
//                   <div className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400">
//                     <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className="w-4 h-4">
//                       <rect x="3" y="11" width="18" height="11" rx="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/>
//                     </svg>
//                   </div>
//                   <input
//                     type={showPassword ? 'text' : 'password'}
//                     placeholder="••••••••"
//                     className="w-full border border-gray-200 pl-10 pr-11 py-3 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
//                     onChange={e => setForm({...form, password: e.target.value})}
//                     onKeyDown={handleKeyDown}
//                   />
//                   <button
//                     type="button"
//                     onClick={() => setShowPassword(p => !p)}
//                     className="absolute right-3.5 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
//                   >
//                     {showPassword ? (
//                       <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className="w-4 h-4">
//                         <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94"/><path d="M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19"/><line x1="1" y1="1" x2="23" y2="23"/>
//                       </svg>
//                     ) : (
//                       <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className="w-4 h-4">
//                         <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/>
//                       </svg>
//                     )}
//                   </button>
//                 </div>
//               </div>

//               <button
//                 onClick={handleSubmit}
//                 disabled={loading}
//                 className="w-full bg-blue-600 text-white py-3 rounded-xl font-semibold text-sm hover:bg-blue-700 transition-colors disabled:opacity-60 disabled:cursor-not-allowed mt-2"
//               >
//                 {loading ? (
//                   <span className="flex items-center justify-center gap-2">
//                     <svg className="animate-spin w-4 h-4" viewBox="0 0 24 24" fill="none">
//                       <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="3" strokeOpacity="0.3"/>
//                       <path d="M12 2a10 10 0 0 1 10 10" stroke="currentColor" strokeWidth="3" strokeLinecap="round"/>
//                     </svg>
//                     Signing in...
//                   </span>
//                 ) : 'Sign in'}
//               </button>
//             </div>

//             <p className="text-center text-xs text-gray-400 mt-8">
//               Don't have an account?{' '}
//               <button onClick={() => navigate('/signup')} className="text-blue-600 font-semibold hover:underline">
//                 Register your organisation
//               </button>
//             </p>

//             <div className="mt-10 pt-6 border-t border-gray-100">
//               <p className="text-xs text-gray-400 text-center mb-4">Trusted by organisations across India</p>
//               <div className="flex justify-center gap-6 text-gray-400 text-xs font-medium">
//                 {['🏥 Hospitals','🏦 Banks','🏛️ Govt Offices'].map(t => (
//                   <span key={t}>{t}</span>
//                 ))}
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }







//---------------------------------------------------------------------





// import { useState } from 'react';
// import axios from 'axios';
// import { useNavigate } from 'react-router-dom';

// export default function OrgLogin() {
//   const [form, setForm] = useState({ email: '', password: '' });
//   const [loading, setLoading] = useState(false);
//   const [showPassword, setShowPassword] = useState(false);
//   const navigate = useNavigate();

//   const handleSubmit = async () => {
//     setLoading(true);
//     try {
//       const { data } = await axios.post('http://localhost:5000/api/auth/login', form);
//       localStorage.setItem('token', data.token);
//       localStorage.setItem('org', JSON.stringify(data.org));
//       navigate('/dashboard');
//     } catch (err) {
//       alert(err.response?.data?.message || 'Login failed');
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleKeyDown = (e) => { if (e.key === 'Enter') handleSubmit(); };

//   return (
//     <div className="min-h-screen bg-white flex flex-col">

//       {/* Navbar */}
//       <nav className="flex items-center justify-between px-8 py-4 border-b border-gray-100">
//         <button onClick={() => navigate('/')} className="flex items-center gap-2 hover:opacity-80 transition-opacity">
//           <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
//             <svg viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" className="w-5 h-5">
//               <rect x="3" y="3" width="7" height="7" rx="1"/><rect x="14" y="3" width="7" height="7" rx="1"/>
//               <rect x="3" y="14" width="7" height="7" rx="1"/><rect x="14" y="14" width="7" height="7" rx="1"/>
//             </svg>
//           </div>
//           <span className="text-xl font-bold text-gray-900">QueueLess AI</span>
//         </button>
//         <button onClick={() => navigate('/signup')} className="text-sm font-medium text-gray-600 hover:text-gray-900 transition-colors">
//           No account? <span className="text-blue-600 font-semibold">Register →</span>
//         </button>
//       </nav>

//       {/* Main */}
//       <div className="flex flex-1">

//         {/* Left panel */}
//         <div className="hidden lg:flex w-1/2 bg-gray-50 border-r border-gray-100 flex-col justify-between p-12 relative overflow-hidden">
//           {/* Subtle decorative circles */}
//           <div className="absolute top-0 right-0 w-72 h-72 bg-blue-50 rounded-full -translate-y-1/2 translate-x-1/2"></div>
//           <div className="absolute bottom-0 left-0 w-56 h-56 bg-blue-50 rounded-full translate-y-1/2 -translate-x-1/2"></div>

//           <div className="relative z-10">
//             <div className="inline-flex items-center gap-2 bg-blue-50 text-blue-600 text-xs font-semibold px-3 py-1.5 rounded-full mb-6 uppercase tracking-wide">
//               <span className="w-1.5 h-1.5 bg-blue-500 rounded-full"></span>
//               Organisation Portal
//             </div>
//             <h2 className="text-4xl font-extrabold text-gray-900 leading-tight mb-4">
//               Your queue,<br /><span className="text-blue-600">under control.</span>
//             </h2>
//             <p className="text-gray-500 text-base leading-relaxed max-w-xs">
//               Manage tokens, track wait times, and keep your customers informed — all from one dashboard.
//             </p>
//           </div>

//           {/* Mini dashboard card */}
//           <div className="relative z-10 bg-white rounded-2xl p-5 border border-gray-200 shadow-sm">
//             <div className="flex items-center justify-between mb-4">
//               <div className="flex items-center gap-2">
//                 <div className="w-6 h-6 bg-blue-600 rounded-lg flex items-center justify-center">
//                   <svg viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" className="w-3.5 h-3.5">
//                     <rect x="3" y="3" width="7" height="7" rx="1"/><rect x="14" y="3" width="7" height="7" rx="1"/>
//                     <rect x="3" y="14" width="7" height="7" rx="1"/><rect x="14" y="14" width="7" height="7" rx="1"/>
//                   </svg>
//                 </div>
//                 <span className="text-gray-800 text-xs font-bold">Live Dashboard</span>
//               </div>
//               <div className="flex items-center gap-1.5">
//                 <div className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse"></div>
//                 <span className="text-green-600 text-xs font-medium">Active</span>
//               </div>
//             </div>
//             <div className="space-y-2">
//               {[
//                 { label: 'Current Token', value: 'A-102', icon: '🎫', valueClass: 'text-blue-600' },
//                 { label: 'Customers Waiting', value: '38', icon: '👥', valueClass: 'text-gray-800' },
//                 { label: 'Avg Wait Time', value: '8 mins', icon: '⏱', valueClass: 'text-orange-500' },
//                 { label: 'WhatsApp Sent', value: '✓ Notified', icon: '📱', valueClass: 'text-green-600' },
//                 { label: 'AI Peak Prediction', value: '2:00 PM', icon: '🤖', valueClass: 'text-violet-600' },
//               ].map(row => (
//                 <div key={row.label} className="flex items-center justify-between bg-gray-50 rounded-xl px-3 py-2">
//                   <div className="flex items-center gap-2">
//                     <span className="text-sm">{row.icon}</span>
//                     <span className="text-gray-500 text-xs">{row.label}</span>
//                   </div>
//                   <span className={`text-xs font-bold ${row.valueClass}`}>{row.value}</span>
//                 </div>
//               ))}
//             </div>
//           </div>
//         </div>

//         {/* Right panel — form */}
//         <div className="flex-1 flex items-center justify-center px-8 py-12">
//           <div className="w-full max-w-sm">
//             <div className="mb-8">
//               <h1 className="text-2xl font-bold text-gray-900 mb-1">Welcome back</h1>
//               <p className="text-gray-500 text-sm">Sign in to your organisation account</p>
//             </div>

//             <div className="space-y-4">
//               {/* Email */}
//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-1.5">Email address</label>
//                 <div className="relative">
//                   <div className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400">
//                     <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className="w-4 h-4">
//                       <rect x="2" y="4" width="20" height="16" rx="2"/><path d="m2 7 10 7 10-7"/>
//                     </svg>
//                   </div>
//                   <input
//                     type="email"
//                     placeholder="admin@hospital.com"
//                     className="w-full border border-gray-200 pl-10 pr-4 py-3 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
//                     onChange={e => setForm({...form, email: e.target.value})}
//                     onKeyDown={handleKeyDown}
//                   />
//                 </div>
//               </div>

//               {/* Password */}
//               <div>
//                 <div className="flex items-center justify-between mb-1.5">
//                   <label className="block text-sm font-medium text-gray-700">Password</label>
//                   <button className="text-xs text-blue-600 hover:underline font-medium">Forgot password?</button>
//                 </div>
//                 <div className="relative">
//                   <div className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400">
//                     <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className="w-4 h-4">
//                       <rect x="3" y="11" width="18" height="11" rx="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/>
//                     </svg>
//                   </div>
//                   <input
//                     type={showPassword ? 'text' : 'password'}
//                     placeholder="••••••••"
//                     className="w-full border border-gray-200 pl-10 pr-11 py-3 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
//                     onChange={e => setForm({...form, password: e.target.value})}
//                     onKeyDown={handleKeyDown}
//                   />
//                   <button
//                     type="button"
//                     onClick={() => setShowPassword(p => !p)}
//                     className="absolute right-3.5 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
//                   >
//                     {showPassword ? (
//                       <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className="w-4 h-4">
//                         <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94"/><path d="M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19"/><line x1="1" y1="1" x2="23" y2="23"/>
//                       </svg>
//                     ) : (
//                       <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className="w-4 h-4">
//                         <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/>
//                       </svg>
//                     )}
//                   </button>
//                 </div>
//               </div>

//               <button
//                 onClick={handleSubmit}
//                 disabled={loading}
//                 className="w-full bg-blue-600 text-white py-3 rounded-xl font-semibold text-sm hover:bg-blue-700 transition-colors disabled:opacity-60 disabled:cursor-not-allowed mt-2"
//               >
//                 {loading ? (
//                   <span className="flex items-center justify-center gap-2">
//                     <svg className="animate-spin w-4 h-4" viewBox="0 0 24 24" fill="none">
//                       <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="3" strokeOpacity="0.3"/>
//                       <path d="M12 2a10 10 0 0 1 10 10" stroke="currentColor" strokeWidth="3" strokeLinecap="round"/>
//                     </svg>
//                     Signing in...
//                   </span>
//                 ) : 'Sign in'}
//               </button>
//             </div>

//             <p className="text-center text-xs text-gray-400 mt-8">
//               Don't have an account?{' '}
//               <button onClick={() => navigate('/signup')} className="text-blue-600 font-semibold hover:underline">
//                 Register your organisation
//               </button>
//             </p>

//             <div className="mt-10 pt-6 border-t border-gray-100">
//               <p className="text-xs text-gray-400 text-center mb-4">Trusted by organisations across India</p>
//               <div className="flex justify-center gap-6 text-gray-400 text-xs font-medium">
//                 {['🏥 Hospitals','🏦 Banks','🏛️ Govt Offices'].map(t => (
//                   <span key={t}>{t}</span>
//                 ))}
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }



//-----------------------------------------------------------------------



import { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export default function OrgLogin() {
  const [form, setForm] = useState({ email: '', password: '' });
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  // Live dashboard state
  const tokenNum = useRef(102);
  const [liveToken, setLiveToken] = useState('A-102');
  const [liveWaiting, setLiveWaiting] = useState(38);
  const [liveWait, setLiveWait] = useState(8);
  const [tokenFade, setTokenFade] = useState(true);
  const [waitingFade, setWaitingFade] = useState(true);
  const [waitFade, setWaitFade] = useState(true);

  const animateValue = (setter, fadeSetter, newVal) => {
    fadeSetter(false);
    setTimeout(() => {
      setter(newVal);
      fadeSetter(true);
    }, 300);
  };

  useEffect(() => {
    const interval = setInterval(() => {
      tokenNum.current += 1;
      animateValue(setLiveToken, setTokenFade, `A-${tokenNum.current}`);
      setTimeout(() => animateValue(setLiveWaiting, setWaitingFade, v => Math.max(1, v - 1)), 400);
      setTimeout(() => {
        animateValue(setLiveWait, setWaitFade, Math.max(1, Math.floor(Math.random() * 4) + 6));
      }, 800);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  const handleSubmit = async () => {
    setLoading(true);
    try {
      const { data } = await axios.post('http://localhost:5000/api/auth/login', form);
      localStorage.setItem('token', data.token);
      localStorage.setItem('org', JSON.stringify(data.org));
      navigate('/dashboard');
    } catch (err) {
      alert(err.response?.data?.message || 'Login failed');
    } finally {
      setLoading(false);
    }
  };

  const handleKeyDown = (e) => { if (e.key === 'Enter') handleSubmit(); };

  return (
    <div className="min-h-screen bg-white flex flex-col">

      {/* Navbar */}
      <nav className="flex items-center justify-between px-8 py-4 border-b border-gray-100">
        <button onClick={() => navigate('/')} className="flex items-center gap-2 hover:opacity-80 transition-opacity">
          <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
            <svg viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" className="w-5 h-5">
              <rect x="3" y="3" width="7" height="7" rx="1"/><rect x="14" y="3" width="7" height="7" rx="1"/>
              <rect x="3" y="14" width="7" height="7" rx="1"/><rect x="14" y="14" width="7" height="7" rx="1"/>
            </svg>
          </div>
          <span className="text-xl font-bold text-gray-900">QueueLess AI</span>
        </button>
        <button onClick={() => navigate('/signup')} className="text-sm font-medium text-gray-600 hover:text-gray-900 transition-colors">
          No account? <span className="text-blue-600 font-semibold">Register →</span>
        </button>
      </nav>

      {/* Main */}
      <div className="flex flex-1">

        {/* Left panel */}
        <div className="hidden lg:flex w-1/2 bg-gray-50 border-r border-gray-100 flex-col justify-between p-12 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-72 h-72 bg-blue-50 rounded-full -translate-y-1/2 translate-x-1/2"></div>
          <div className="absolute bottom-0 left-0 w-56 h-56 bg-blue-50 rounded-full translate-y-1/2 -translate-x-1/2"></div>

          <div className="relative z-10">
            <div className="inline-flex items-center gap-2 bg-blue-50 text-blue-600 text-xs font-semibold px-3 py-1.5 rounded-full mb-6 uppercase tracking-wide">
              <span className="w-1.5 h-1.5 bg-blue-500 rounded-full"></span>
              Organisation Portal
            </div>
            <h2 className="text-4xl font-extrabold text-gray-900 leading-tight mb-4">
              Your queue,<br /><span className="text-blue-600">under control.</span>
            </h2>
            <p className="text-gray-500 text-base leading-relaxed max-w-xs">
              Manage tokens, track wait times, and keep your customers informed — all from one dashboard.
            </p>
          </div>

          {/* Live dashboard card */}
          <div className="relative z-10 bg-white rounded-2xl p-5 border border-gray-200 shadow-sm">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <div className="w-6 h-6 bg-blue-600 rounded-lg flex items-center justify-center">
                  <svg viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" className="w-3.5 h-3.5">
                    <rect x="3" y="3" width="7" height="7" rx="1"/><rect x="14" y="3" width="7" height="7" rx="1"/>
                    <rect x="3" y="14" width="7" height="7" rx="1"/><rect x="14" y="14" width="7" height="7" rx="1"/>
                  </svg>
                </div>
                <span className="text-gray-800 text-xs font-bold">Live Dashboard</span>
              </div>
              <div className="flex items-center gap-1.5">
                <div className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse"></div>
                <span className="text-green-600 text-xs font-medium">Active</span>
              </div>
            </div>
            <div className="space-y-2">
              {/* Current Token — animates */}
              <div className="flex items-center justify-between bg-gray-50 rounded-xl px-3 py-2">
                <div className="flex items-center gap-2">
                  <span className="text-sm">🎫</span>
                  <span className="text-gray-500 text-xs">Current Token</span>
                </div>
                <span
                  className="text-xs font-bold text-blue-600 transition-opacity duration-300"
                  style={{ opacity: tokenFade ? 1 : 0 }}
                >
                  {liveToken}
                </span>
              </div>

              {/* Customers Waiting — animates */}
              <div className="flex items-center justify-between bg-gray-50 rounded-xl px-3 py-2">
                <div className="flex items-center gap-2">
                  <span className="text-sm">👥</span>
                  <span className="text-gray-500 text-xs">Customers Waiting</span>
                </div>
                <span
                  className="text-xs font-bold text-gray-800 transition-opacity duration-300"
                  style={{ opacity: waitingFade ? 1 : 0 }}
                >
                  {liveWaiting}
                </span>
              </div>

              {/* Avg Wait Time — animates */}
              <div className="flex items-center justify-between bg-gray-50 rounded-xl px-3 py-2">
                <div className="flex items-center gap-2">
                  <span className="text-sm">⏱</span>
                  <span className="text-gray-500 text-xs">Avg Wait Time</span>
                </div>
                <span
                  className="text-xs font-bold text-orange-500 transition-opacity duration-300"
                  style={{ opacity: waitFade ? 1 : 0 }}
                >
                  {liveWait} mins
                </span>
              </div>

              {/* Static rows */}
              <div className="flex items-center justify-between bg-gray-50 rounded-xl px-3 py-2">
                <div className="flex items-center gap-2">
                  <span className="text-sm">📱</span>
                  <span className="text-gray-500 text-xs">WhatsApp Sent</span>
                </div>
                <span className="text-xs font-bold text-green-600">✓ Notified</span>
              </div>
              <div className="flex items-center justify-between bg-gray-50 rounded-xl px-3 py-2">
                <div className="flex items-center gap-2">
                  <span className="text-sm">🤖</span>
                  <span className="text-gray-500 text-xs">AI Peak Prediction</span>
                </div>
                <span className="text-xs font-bold text-violet-600">2:00 PM</span>
              </div>
            </div>
          </div>
        </div>

        {/* Right panel — form */}
        <div className="flex-1 flex items-center justify-center px-8 py-12">
          <div className="w-full max-w-sm">
            <div className="mb-8">
              <h1 className="text-2xl font-bold text-gray-900 mb-1">Welcome back</h1>
              <p className="text-gray-500 text-sm">Sign in to your organisation account</p>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">Email address</label>
                <div className="relative">
                  <div className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className="w-4 h-4">
                      <rect x="2" y="4" width="20" height="16" rx="2"/><path d="m2 7 10 7 10-7"/>
                    </svg>
                  </div>
                  <input
                    type="email"
                    placeholder="admin@hospital.com"
                    className="w-full border border-gray-200 pl-10 pr-4 py-3 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                    onChange={e => setForm({...form, email: e.target.value})}
                    onKeyDown={handleKeyDown}
                  />
                </div>
              </div>

              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <label className="block text-sm font-medium text-gray-700">Password</label>
                  <button className="text-xs text-blue-600 hover:underline font-medium">Forgot password?</button>
                </div>
                <div className="relative">
                  <div className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className="w-4 h-4">
                      <rect x="3" y="11" width="18" height="11" rx="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/>
                    </svg>
                  </div>
                  <input
                    type={showPassword ? 'text' : 'password'}
                    placeholder="••••••••"
                    className="w-full border border-gray-200 pl-10 pr-11 py-3 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                    onChange={e => setForm({...form, password: e.target.value})}
                    onKeyDown={handleKeyDown}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(p => !p)}
                    className="absolute right-3.5 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                  >
                    {showPassword ? (
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className="w-4 h-4">
                        <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94"/><path d="M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19"/><line x1="1" y1="1" x2="23" y2="23"/>
                      </svg>
                    ) : (
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className="w-4 h-4">
                        <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/>
                      </svg>
                    )}
                  </button>
                </div>
              </div>

              <button
                onClick={handleSubmit}
                disabled={loading}
                className="w-full bg-blue-600 text-white py-3 rounded-xl font-semibold text-sm hover:bg-blue-700 transition-colors disabled:opacity-60 disabled:cursor-not-allowed mt-2"
              >
                {loading ? (
                  <span className="flex items-center justify-center gap-2">
                    <svg className="animate-spin w-4 h-4" viewBox="0 0 24 24" fill="none">
                      <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="3" strokeOpacity="0.3"/>
                      <path d="M12 2a10 10 0 0 1 10 10" stroke="currentColor" strokeWidth="3" strokeLinecap="round"/>
                    </svg>
                    Signing in...
                  </span>
                ) : 'Sign in'}
              </button>
            </div>

            <p className="text-center text-xs text-gray-400 mt-8">
              Don't have an account?{' '}
              <button onClick={() => navigate('/signup')} className="text-blue-600 font-semibold hover:underline">
                Register your organisation
              </button>
            </p>

            <div className="mt-10 pt-6 border-t border-gray-100">
              <p className="text-xs text-gray-400 text-center mb-4">Trusted by organisations across India</p>
              <div className="flex justify-center gap-6 text-gray-400 text-xs font-medium">
                {['🏥 Hospitals','🏦 Banks','🏛️ Govt Offices'].map(t => (
                  <span key={t}>{t}</span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
