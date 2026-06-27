// import { useNavigate } from 'react-router-dom';

// export default function LandingPage() {
//   const navigate = useNavigate();

//   const features = [
//     {
//       icon: '🎫',
//       title: 'Virtual Token System',
//       desc: 'Customers scan a QR code and get a digital token instantly. No physical token machine needed.'
//     },
//     {
//       icon: '⏱️',
//       title: 'Real-Time Wait Updates',
//       desc: 'Live queue position and estimated wait time updates automatically as the queue moves.'
//     },
//     {
//       icon: '📍',
//       title: 'Smart Departure Time',
//       desc: 'System calculates travel time from customer location and tells them exactly when to leave.'
//     },
//     {
//       icon: '📱',
//       title: 'WhatsApp Notifications',
//       desc: 'Customers get notified on WhatsApp when their turn is approaching. No app download needed.'
//     },
//     {
//       icon: '📊',
//       title: 'Peak Hour Analytics',
//       desc: 'Understand your busiest hours with data. Open extra counters before the rush hits.'
//     },
//     {
//       icon: '🚫',
//       title: 'No-Show Tracking',
//       desc: 'Track absent patients automatically and keep your queue moving efficiently.'
//     }
//   ];

//   const useCases = [
//     { icon: '🏥', label: 'Hospitals' },
//     { icon: '🏦', label: 'Banks' },
//     { icon: '🏛️', label: 'Government Offices' },
//     { icon: '🏪', label: 'Clinics' },
//   ];

//   return (
//     <div className="min-h-screen bg-white">

//       {/* Navbar */}
//       <nav className="flex items-center justify-between px-8 py-4 border-b border-gray-100">
//         <div className="flex items-center gap-2">
//           <span className="text-2xl">🔢</span>
//           <span className="text-xl font-bold text-gray-900">QueueLess AI</span>
//         </div>
//         <div className="flex gap-3">
//           <button
//             onClick={() => navigate('/login')}
//             className="text-gray-600 px-4 py-2 rounded-lg hover:bg-gray-50 font-medium"
//           >
//             Login
//           </button>
//           <button
//             onClick={() => navigate('/signup')}
//             className="bg-blue-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-blue-700"
//           >
//             Get Started
//           </button>
//         </div>
//       </nav>

//       {/* Hero Section */}
//       <div className="max-w-5xl mx-auto px-8 py-20 text-center">
//         <div className="inline-block bg-blue-50 text-blue-600 text-sm font-medium px-4 py-2 rounded-full mb-6">
//           AI-Powered Queue Management
//         </div>
//         <h1 className="text-5xl font-bold text-gray-900 leading-tight mb-6">
//           No More Waiting in Lines.<br />
//           <span className="text-blue-600">Ever Again.</span>
//         </h1>
//         <p className="text-xl text-gray-500 max-w-2xl mx-auto mb-10">
//           QueueLess AI gives your customers real-time queue updates, smart departure time predictions, and WhatsApp notifications — so they never waste time waiting.
//         </p>
//         <div className="flex gap-4 justify-center">
//           <button
//             onClick={() => navigate('/signup')}
//             className="bg-blue-600 text-white px-8 py-4 rounded-xl font-bold text-lg hover:bg-blue-700"
//           >
//             Register Your Organisation
//           </button>
//           <button
//             onClick={() => navigate('/login')}
//             className="border border-gray-200 text-gray-700 px-8 py-4 rounded-xl font-bold text-lg hover:bg-gray-50"
//           >
//             Login
//           </button>
//         </div>
//       </div>

//       {/* Use Cases */}
//       <div className="bg-gray-50 py-12">
//         <div className="max-w-5xl mx-auto px-8">
//           <p className="text-center text-gray-500 font-medium mb-8">Trusted by organisations across India</p>
//           <div className="flex justify-center gap-12">
//             {useCases.map(u => (
//               <div key={u.label} className="text-center">
//                 <div className="text-4xl mb-2">{u.icon}</div>
//                 <p className="text-gray-600 font-medium">{u.label}</p>
//               </div>
//             ))}
//           </div>
//         </div>
//       </div>

//       {/* Features */}
//       <div className="max-w-5xl mx-auto px-8 py-20">
//         <h2 className="text-3xl font-bold text-gray-900 text-center mb-4">
//           Everything your queue needs
//         </h2>
//         <p className="text-gray-500 text-center mb-12">
//           Replace your token machine with an intelligent platform
//         </p>
//         <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
//           {features.map(f => (
//             <div key={f.title} className="p-6 rounded-xl border border-gray-100 hover:shadow-md transition-shadow">
//               <div className="text-3xl mb-4">{f.icon}</div>
//               <h3 className="text-lg font-bold text-gray-900 mb-2">{f.title}</h3>
//               <p className="text-gray-500 text-sm leading-relaxed">{f.desc}</p>
//             </div>
//           ))}
//         </div>
//       </div>

//       {/* CTA */}
//       <div className="bg-blue-600 py-16">
//         <div className="max-w-3xl mx-auto px-8 text-center">
//           <h2 className="text-3xl font-bold text-white mb-4">
//             Ready to eliminate waiting?
//           </h2>
//           <p className="text-blue-100 mb-8">
//             Join hospitals, banks, and clinics already using QueueLess AI
//           </p>
//           <button
//             onClick={() => navigate('/signup')}
//             className="bg-white text-blue-600 px-8 py-4 rounded-xl font-bold text-lg hover:bg-blue-50"
//           >
//             Get Started Free
//           </button>
//         </div>
//       </div>

//       {/* Footer */}
//       <div className="border-t border-gray-100 py-8 text-center">
//         <p className="text-gray-400 text-sm">© 2024 QueueLess AI. Built for smarter queues.</p>
//       </div>

//     </div>
//   );
// }



//------------------------------------------------------------------------------------


// import { useNavigate } from 'react-router-dom';

// export default function LandingPage() {
//   const navigate = useNavigate();

//   const features = [
//     {
//       icon: (
//         <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className="w-6 h-6">
//           <rect x="3" y="3" width="7" height="7" rx="1"/><rect x="14" y="3" width="7" height="7" rx="1"/>
//           <rect x="3" y="14" width="7" height="7" rx="1"/><path d="M14 14h3v3m0 4h4m-4 0v-4m4 0h-4"/>
//         </svg>
//       ),
//       title: 'Virtual Token System',
//       desc: 'Customers scan a QR code and get a digital token instantly. No physical token machine needed.',
//       color: 'bg-blue-50 text-blue-600',
//     },
//     {
//       icon: (
//         <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className="w-6 h-6">
//           <circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 3"/>
//         </svg>
//       ),
//       title: 'Real-Time Wait Updates',
//       desc: 'Live queue position and estimated wait time updates automatically as the queue moves.',
//       color: 'bg-emerald-50 text-emerald-600',
//     },
//     {
//       icon: (
//         <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className="w-6 h-6">
//           <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z"/><circle cx="12" cy="9" r="2.5"/>
//         </svg>
//       ),
//       title: 'Smart Departure Time',
//       desc: 'System calculates travel time from customer location and tells them exactly when to leave.',
//       color: 'bg-violet-50 text-violet-600',
//     },
//     {
//       icon: (
//         <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className="w-6 h-6">
//           <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>
//         </svg>
//       ),
//       title: 'WhatsApp Notifications',
//       desc: 'Customers get notified on WhatsApp when their turn is approaching. No app download needed.',
//       color: 'bg-green-50 text-green-600',
//     },
//     {
//       icon: (
//         <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className="w-6 h-6">
//           <path d="M3 3v18h18"/><path d="M7 16l4-4 4 4 4-7"/>
//         </svg>
//       ),
//       title: 'Peak Hour Analytics',
//       desc: 'Understand your busiest hours with data. Open extra counters before the rush hits.',
//       color: 'bg-amber-50 text-amber-600',
//     },
//     {
//       icon: (
//         <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className="w-6 h-6">
//           <circle cx="12" cy="12" r="9"/><path d="M9 9l6 6m0-6l-6 6"/>
//         </svg>
//       ),
//       title: 'No-Show Tracking',
//       desc: 'Track absent patients automatically and keep your queue moving efficiently.',
//       color: 'bg-rose-50 text-rose-600',
//     },
//   ];

//   const stats = [
//     { value: '95%', label: 'Reduction in wait time' },
//     { value: '3x', label: 'Faster queue throughput' },
//     { value: '10k+', label: 'Tokens issued daily' },
//   ];

//   const useCases = [
//     { icon: '🏥', label: 'Hospitals' },
//     { icon: '🏦', label: 'Banks' },
//     { icon: '🏛️', label: 'Government Offices' },
//     { icon: '🏪', label: 'Clinics' },
//   ];

//   return (
//     <div className="min-h-screen bg-white font-sans">

//       {/* Navbar */}
//       <nav className="flex items-center justify-between px-8 py-4 border-b border-gray-100 sticky top-0 bg-white/90 backdrop-blur-sm z-50">
//         <div className="flex items-center gap-2">
//           <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
//             <svg viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" className="w-5 h-5">
//               <rect x="3" y="3" width="7" height="7" rx="1"/><rect x="14" y="3" width="7" height="7" rx="1"/>
//               <rect x="3" y="14" width="7" height="7" rx="1"/><rect x="14" y="14" width="7" height="7" rx="1"/>
//             </svg>
//           </div>
//           <span className="text-xl font-bold text-gray-900">QueueLess AI</span>
//         </div>
//         <div className="hidden md:flex items-center gap-8 text-sm font-medium text-gray-600">
//           <a href="#features" className="hover:text-gray-900 transition-colors">Features</a>
//           <a href="#how-it-works" className="hover:text-gray-900 transition-colors">How it works</a>
//           <a href="#usecases" className="hover:text-gray-900 transition-colors">Use cases</a>
//         </div>
//         <div className="flex gap-3 items-center">
//           <button
//             onClick={() => navigate('/login')}
//             className="text-gray-600 px-4 py-2 rounded-lg hover:bg-gray-50 font-medium text-sm transition-colors"
//           >
//             Login
//           </button>
//           <button
//             onClick={() => navigate('/signup')}
//             className="bg-blue-600 text-white px-4 py-2 rounded-lg font-medium text-sm hover:bg-blue-700 transition-colors"
//           >
//             Get Started
//           </button>
//         </div>
//       </nav>

//       {/* Hero */}
//       <div className="max-w-6xl mx-auto px-8 pt-16 pb-8">
//         <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
//           {/* Left: copy */}
//           <div>
//             <div className="inline-flex items-center gap-2 bg-blue-50 text-blue-700 text-xs font-semibold px-3 py-1.5 rounded-full mb-6 tracking-wide uppercase">
//               <span className="w-1.5 h-1.5 bg-blue-500 rounded-full animate-pulse"></span>
//               AI-Powered Queue Management
//             </div>
//             <h1 className="text-5xl font-extrabold text-gray-900 leading-[1.1] mb-5">
//               No More<br />
//               Waiting<br />
//               <span className="text-blue-600">in Lines.</span>
//             </h1>
//             <p className="text-lg text-gray-500 leading-relaxed mb-8 max-w-md">
//               Real-time queue updates, smart departure predictions, and WhatsApp notifications — so your customers never waste time waiting.
//             </p>
//             <div className="flex gap-3 flex-wrap">
//               <button
//                 onClick={() => navigate('/signup')}
//                 className="bg-blue-600 text-white px-6 py-3 rounded-xl font-semibold text-base hover:bg-blue-700 transition-colors shadow-sm"
//               >
//                 Register Your Organisation
//               </button>
//               <button
//                 onClick={() => navigate('/login')}
//                 className="border border-gray-200 text-gray-700 px-6 py-3 rounded-xl font-semibold text-base hover:bg-gray-50 transition-colors"
//               >
//                 Login →
//               </button>
//             </div>
//             {/* Mini stats */}
//             <div className="flex gap-6 mt-10 pt-8 border-t border-gray-100">
//               {stats.map(s => (
//                 <div key={s.label}>
//                   <p className="text-2xl font-bold text-gray-900">{s.value}</p>
//                   <p className="text-xs text-gray-500 mt-0.5">{s.label}</p>
//                 </div>
//               ))}
//             </div>
//           </div>

//           {/* Right: dashboard mockup */}
//           <div className="relative">
//             <div className="absolute -inset-4 bg-blue-50 rounded-3xl -z-10"></div>
//             <div className="bg-white rounded-2xl border border-gray-200 shadow-xl overflow-hidden">
//               {/* Browser chrome */}
//               <div className="bg-gray-50 border-b border-gray-200 px-4 py-2.5 flex items-center gap-2">
//                 <div className="flex gap-1.5">
//                   <div className="w-3 h-3 rounded-full bg-red-400"></div>
//                   <div className="w-3 h-3 rounded-full bg-yellow-400"></div>
//                   <div className="w-3 h-3 rounded-full bg-green-400"></div>
//                 </div>
//                 <div className="flex-1 bg-white rounded-md border border-gray-200 px-3 py-1 text-xs text-gray-400 ml-2">
//                   app.queueless.ai/dashboard
//                 </div>
//               </div>
//               {/* Dashboard UI */}
//               <div className="flex h-64">
//                 {/* Sidebar */}
//                 <div className="w-36 bg-gray-50 border-r border-gray-100 p-3 flex flex-col gap-1">
//                   <div className="flex items-center gap-1.5 mb-3">
//                     <div className="w-5 h-5 bg-blue-600 rounded flex items-center justify-center">
//                       <svg viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" className="w-3 h-3">
//                         <rect x="3" y="3" width="7" height="7" rx="1"/><rect x="14" y="3" width="7" height="7" rx="1"/>
//                         <rect x="3" y="14" width="7" height="7" rx="1"/><rect x="14" y="14" width="7" height="7" rx="1"/>
//                       </svg>
//                     </div>
//                     <span className="text-xs font-bold text-gray-700">QueueLess</span>
//                   </div>
//                   {['Overview', 'Queue Mgmt', 'Analytics', 'Settings'].map((item, i) => (
//                     <div key={item} className={`text-xs px-2 py-1.5 rounded-md font-medium ${i === 0 ? 'bg-blue-600 text-white' : 'text-gray-500 hover:bg-gray-100'}`}>
//                       {item}
//                     </div>
//                   ))}
//                 </div>
//                 {/* Main content */}
//                 <div className="flex-1 p-4 overflow-hidden">
//                   <p className="text-xs font-bold text-gray-800 mb-3">Today's Overview</p>
//                   <div className="grid grid-cols-4 gap-2 mb-4">
//                     {[
//                       { label: 'Current', value: '42', color: 'text-blue-600' },
//                       { label: 'Waiting', value: '17', color: 'text-orange-500' },
//                       { label: 'Served', value: '89', color: 'text-green-600' },
//                       { label: 'No-show', value: '3', color: 'text-red-500' },
//                     ].map(m => (
//                       <div key={m.label} className="bg-gray-50 rounded-lg p-2 text-center">
//                         <p className={`text-base font-bold ${m.color}`}>{m.value}</p>
//                         <p className="text-gray-400" style={{fontSize: '9px'}}>{m.label}</p>
//                       </div>
//                     ))}
//                   </div>
//                   {/* Mini bar chart */}
//                   <p className="text-xs font-semibold text-gray-600 mb-2">Peak Hours</p>
//                   <div className="flex items-end gap-1 h-12">
//                     {[2, 4, 7, 5, 9, 8, 6, 10, 7, 4, 3, 5].map((h, i) => (
//                       <div
//                         key={i}
//                         className={`flex-1 rounded-sm ${i === 8 ? 'bg-blue-600' : 'bg-blue-200'}`}
//                         style={{ height: `${h * 10}%` }}
//                       ></div>
//                     ))}
//                   </div>
//                   <div className="flex justify-between mt-1">
//                     <span className="text-gray-400" style={{fontSize:'8px'}}>8am</span>
//                     <span className="text-gray-400" style={{fontSize:'8px'}}>2pm</span>
//                     <span className="text-gray-400" style={{fontSize:'8px'}}>8pm</span>
//                   </div>
//                 </div>
//               </div>
//               {/* Status bar */}
//               <div className="border-t border-gray-100 px-4 py-2 bg-green-50 flex items-center gap-2">
//                 <div className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse"></div>
//                 <span className="text-xs text-green-700 font-medium">Queue active — 17 customers waiting · Avg wait: 12 min</span>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* Use Cases */}
//       <div id="usecases" className="bg-gray-50 py-10 mt-8">
//         <div className="max-w-5xl mx-auto px-8">
//           <p className="text-center text-gray-400 text-sm font-medium mb-6 uppercase tracking-widest">Trusted by organisations across India</p>
//           <div className="flex justify-center gap-12">
//             {useCases.map(u => (
//               <div key={u.label} className="text-center">
//                 <div className="text-3xl mb-2">{u.icon}</div>
//                 <p className="text-gray-600 font-medium text-sm">{u.label}</p>
//               </div>
//             ))}
//           </div>
//         </div>
//       </div>

//       {/* How it works */}
//       <div id="how-it-works" className="max-w-5xl mx-auto px-8 py-20">
//         <div className="text-center mb-14">
//           <h2 className="text-3xl font-bold text-gray-900 mb-3">How it works</h2>
//           <p className="text-gray-500">Three steps from chaos to control</p>
//         </div>
//         <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
//           {[
//             { step: '01', title: 'Customer scans QR', desc: 'They get a digital token on their phone. No app, no counter visit.' },
//             { step: '02', title: 'AI tracks the queue', desc: 'Live position updates + smart departure time based on their location.' },
//             { step: '03', title: 'WhatsApp alerts', desc: 'Notified when their turn is 2 slots away. They arrive just in time.' },
//           ].map(s => (
//             <div key={s.step} className="relative">
//               <div className="text-5xl font-black text-gray-100 mb-3">{s.step}</div>
//               <h3 className="text-lg font-bold text-gray-900 mb-2">{s.title}</h3>
//               <p className="text-gray-500 text-sm leading-relaxed">{s.desc}</p>
//             </div>
//           ))}
//         </div>
//       </div>

//       {/* Features */}
//       <div id="features" className="bg-gray-50 py-20">
//         <div className="max-w-5xl mx-auto px-8">
//           <div className="text-center mb-14">
//             <h2 className="text-3xl font-bold text-gray-900 mb-3">Everything your queue needs</h2>
//             <p className="text-gray-500">Replace your token machine with an intelligent platform</p>
//           </div>
//           <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
//             {features.map(f => (
//               <div key={f.title} className="bg-white p-6 rounded-2xl border border-gray-100 hover:border-blue-100 hover:shadow-md transition-all group">
//                 <div className={`w-11 h-11 rounded-xl flex items-center justify-center mb-4 ${f.color}`}>
//                   {f.icon}
//                 </div>
//                 <h3 className="text-base font-bold text-gray-900 mb-2">{f.title}</h3>
//                 <p className="text-gray-500 text-sm leading-relaxed">{f.desc}</p>
//               </div>
//             ))}
//           </div>
//         </div>
//       </div>

//       {/* CTA */}
//       <div className="max-w-5xl mx-auto px-8 py-20">
//         <div className="bg-blue-600 rounded-3xl px-12 py-14 text-center relative overflow-hidden">
//           <div className="absolute top-0 right-0 w-64 h-64 bg-blue-500 rounded-full -translate-y-1/2 translate-x-1/2 opacity-40"></div>
//           <div className="absolute bottom-0 left-0 w-48 h-48 bg-blue-700 rounded-full translate-y-1/2 -translate-x-1/2 opacity-40"></div>
//           <div className="relative z-10">
//             <h2 className="text-3xl font-bold text-white mb-3">
//               Start managing queues smarter
//             </h2>
//             <p className="text-blue-100 mb-8 max-w-md mx-auto">
//               Join hospitals, clinics, banks and government offices already reducing waiting time with QueueLess AI.
//             </p>
//             <button
//               onClick={() => navigate('/signup')}
//               className="bg-white text-blue-600 px-8 py-3.5 rounded-xl font-bold text-base hover:bg-blue-50 transition-colors shadow-sm"
//             >
//               Get Started Free →
//             </button>
//           </div>
//         </div>
//       </div>

//       {/* Footer */}
//       <div className="border-t border-gray-100 py-8">
//         <div className="max-w-5xl mx-auto px-8 flex items-center justify-between">
//           <div className="flex items-center gap-2">
//             <div className="w-6 h-6 bg-blue-600 rounded-md flex items-center justify-center">
//               <svg viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" className="w-3.5 h-3.5">
//                 <rect x="3" y="3" width="7" height="7" rx="1"/><rect x="14" y="3" width="7" height="7" rx="1"/>
//                 <rect x="3" y="14" width="7" height="7" rx="1"/><rect x="14" y="14" width="7" height="7" rx="1"/>
//               </svg>
//             </div>
//             <span className="text-sm font-semibold text-gray-700">QueueLess AI</span>
//           </div>
//           <p className="text-gray-400 text-sm">© 2024 QueueLess AI. Built for smarter queues.</p>
//         </div>
//       </div>

//     </div>
//   );
// }




//---------------------------------------------------------------------------------








import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';

export default function LandingPage() {
  const navigate = useNavigate();

  // Live demo state
  const [demoQueue, setDemoQueue] = useState([
    { id: 'A-098', status: 'serving', wait: 0 },
    { id: 'A-099', status: 'waiting', wait: 4 },
    { id: 'A-100', status: 'waiting', wait: 8 },
    { id: 'A-101', status: 'waiting', wait: 12 },
    { id: 'A-102', status: 'waiting', wait: 16 },
  ]);
  const [customerToken] = useState('A-102');
  const [whatsappSent, setWhatsappSent] = useState(false);
  const [tick, setTick] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setTick(t => t + 1);
      setDemoQueue(prev => {
        const serving = prev.find(q => q.status === 'serving');
        if (!serving) return prev;
        const idx = prev.indexOf(serving);
        if (idx === prev.length - 1) {
          return prev.map((q, i) => ({ ...q, status: i === 0 ? 'serving' : 'waiting', wait: i * 4 }));
        }
        const next = prev.map((q, i) => {
          if (i === idx) return { ...q, status: 'done' };
          if (i === idx + 1) return { ...q, status: 'serving', wait: 0 };
          return { ...q, wait: Math.max(0, q.wait - 4) };
        });
        const customerIdx = next.findIndex(q => q.id === customerToken);
        if (customerIdx !== -1 && next[customerIdx].wait <= 8 && !whatsappSent) {
          setWhatsappSent(true);
        }
        return next.filter(q => q.status !== 'done').concat(
          next.filter(q => q.status === 'done').map(q => ({ ...q, id: `A-${103 + Math.floor(Math.random()*10)}`, status: 'waiting', wait: (next.filter(q2 => q2.status !== 'done').length) * 4 }))
        ).slice(0, 5);
      });
    }, 2500);
    return () => clearInterval(interval);
  }, [whatsappSent, customerToken]);

  const customerEntry = demoQueue.find(q => q.id === customerToken) || { wait: 0, status: 'serving' };
  const peopleAhead = demoQueue.filter(q => q.status === 'waiting' && demoQueue.indexOf(q) < demoQueue.findIndex(q2 => q2.id === customerToken)).length;
  const adminServing = demoQueue.find(q => q.status === 'serving');

  const features = [
    {
      icon: (<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className="w-6 h-6"><rect x="3" y="3" width="7" height="7" rx="1"/><rect x="14" y="3" width="7" height="7" rx="1"/><rect x="3" y="14" width="7" height="7" rx="1"/><path d="M14 14h3v3m0 4h4m-4 0v-4m4 0h-4"/></svg>),
      title: 'Virtual Token System',
      desc: 'Customers scan a QR code and get a digital token instantly. No physical token machine needed.',
      color: 'bg-blue-50 text-blue-600',
    },
    {
      icon: (<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className="w-6 h-6"><circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 3"/></svg>),
      title: 'Real-Time Wait Updates',
      desc: 'Live queue position and estimated wait time updates automatically as the queue moves.',
      color: 'bg-emerald-50 text-emerald-600',
    },
    {
      icon: (<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className="w-6 h-6"><path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z"/><circle cx="12" cy="9" r="2.5"/></svg>),
      title: 'Smart Departure Time',
      desc: 'System calculates travel time from customer location and tells them exactly when to leave.',
      color: 'bg-violet-50 text-violet-600',
    },
    {
      icon: (<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className="w-6 h-6"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>),
      title: 'WhatsApp Notifications',
      desc: 'Customers get notified on WhatsApp when their turn is approaching. No app download needed.',
      color: 'bg-green-50 text-green-600',
    },
    {
      icon: (<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className="w-6 h-6"><path d="M3 3v18h18"/><path d="M7 16l4-4 4 4 4-7"/></svg>),
      title: 'Peak Hour Analytics',
      desc: 'Understand your busiest hours with data. Open extra counters before the rush hits.',
      color: 'bg-amber-50 text-amber-600',
    },
    {
      icon: (<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className="w-6 h-6"><circle cx="12" cy="12" r="9"/><path d="M9 9l6 6m0-6l-6 6"/></svg>),
      title: 'No-Show Tracking',
      desc: 'Track absent patients automatically and keep your queue moving efficiently.',
      color: 'bg-rose-50 text-rose-600',
    },
  ];

  const stats = [
    { value: '95%', label: 'Reduction in wait time' },
    { value: '3x', label: 'Faster queue throughput' },
    { value: '10k+', label: 'Tokens issued daily' },
  ];

  const useCases = [
    { icon: '🏥', label: 'Hospitals' },
    { icon: '🏦', label: 'Banks' },
    { icon: '🏛️', label: 'Government Offices' },
    { icon: '🏪', label: 'Clinics' },
  ];

  return (
    <div className="min-h-screen bg-white font-sans">

      {/* Navbar */}
      <nav className="flex items-center justify-between px-8 py-4 border-b border-gray-100 sticky top-0 bg-white/90 backdrop-blur-sm z-50">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
            <svg viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" className="w-5 h-5">
              <rect x="3" y="3" width="7" height="7" rx="1"/><rect x="14" y="3" width="7" height="7" rx="1"/>
              <rect x="3" y="14" width="7" height="7" rx="1"/><rect x="14" y="14" width="7" height="7" rx="1"/>
            </svg>
          </div>
          <span className="text-xl font-bold text-gray-900">QueueLess AI</span>
        </div>
        <div className="hidden md:flex items-center gap-8 text-sm font-medium text-gray-600">
          <a href="#features" className="hover:text-gray-900 transition-colors">Features</a>
          <a href="#how-it-works" className="hover:text-gray-900 transition-colors">How it works</a>
          <a href="#live-demo" className="hover:text-gray-900 transition-colors">Live Demo</a>
          <a href="#usecases" className="hover:text-gray-900 transition-colors">Use cases</a>
        </div>
        <div className="flex gap-3 items-center">
          <button onClick={() => navigate('/login')} className="text-gray-600 px-4 py-2 rounded-lg hover:bg-gray-50 font-medium text-sm transition-colors">Login</button>
          <button onClick={() => navigate('/signup')} className="bg-blue-600 text-white px-4 py-2 rounded-lg font-medium text-sm hover:bg-blue-700 transition-colors">Get Started</button>
        </div>
      </nav>

      {/* Hero */}
      <div className="max-w-6xl mx-auto px-8 pt-16 pb-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left: copy */}
          <div>
            <div className="inline-flex items-center gap-2 bg-blue-50 text-blue-700 text-xs font-semibold px-3 py-1.5 rounded-full mb-6 tracking-wide uppercase">
              <span className="w-1.5 h-1.5 bg-blue-500 rounded-full animate-pulse"></span>
              AI-Powered Queue Management
            </div>
            <h1 className="text-5xl font-extrabold text-gray-900 leading-[1.1] mb-5">
              No More<br />Waiting<br />
              <span className="text-blue-600">in Lines.</span>
            </h1>
            <p className="text-lg text-gray-500 leading-relaxed mb-8 max-w-md">
              Real-time queue updates, smart departure predictions, and WhatsApp notifications — so your customers never waste time waiting.
            </p>
            <div className="flex gap-3 flex-wrap">
              <button onClick={() => navigate('/signup')} className="bg-blue-600 text-white px-6 py-3 rounded-xl font-semibold text-base hover:bg-blue-700 transition-colors shadow-sm">
                Register Your Organisation
              </button>
              <button onClick={() => navigate('/login')} className="border border-gray-200 text-gray-700 px-6 py-3 rounded-xl font-semibold text-base hover:bg-gray-50 transition-colors">
                Login →
              </button>
            </div>
            <div className="flex gap-6 mt-10 pt-8 border-t border-gray-100">
              {stats.map(s => (
                <div key={s.label}>
                  <p className="text-2xl font-bold text-gray-900">{s.value}</p>
                  <p className="text-xs text-gray-500 mt-0.5">{s.label}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Right: dashboard mockup + floating cards */}
          <div className="relative py-6">
            <div className="absolute -inset-4 bg-blue-50 rounded-3xl -z-10"></div>

            {/* Floating card top-left */}
            <div className="absolute -left-6 top-4 z-20 bg-white rounded-2xl shadow-lg border border-gray-100 px-4 py-3 w-44 animate-bounce" style={{animationDuration:'3s'}}>
              <div className="flex items-center gap-2 mb-1">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                <span className="text-xs font-bold text-gray-700">Queue #{customerToken}</span>
              </div>
              <p className="text-xs text-gray-500">ETA: <span className="font-semibold text-gray-800">{customerEntry.wait} mins</span></p>
            </div>

            {/* Floating card top-right */}
            <div className="absolute -right-4 top-8 z-20 bg-white rounded-2xl shadow-lg border border-gray-100 px-4 py-3 w-44 animate-bounce" style={{animationDuration:'4s', animationDelay:'0.5s'}}>
              <div className="flex items-center gap-2 mb-1">
                <span className="text-green-500 text-sm">📱</span>
                <span className="text-xs font-bold text-gray-700">WhatsApp Sent</span>
              </div>
              <p className="text-xs text-gray-500">Your turn in <span className="font-semibold text-blue-600">2 slots</span></p>
            </div>

            {/* Floating card bottom-right */}
            <div className="absolute -right-4 bottom-8 z-20 bg-white rounded-2xl shadow-lg border border-gray-100 px-4 py-3 w-44 animate-bounce" style={{animationDuration:'3.5s', animationDelay:'1s'}}>
              <div className="flex items-center gap-2 mb-1">
                <span className="text-violet-500 text-sm">🤖</span>
                <span className="text-xs font-bold text-gray-700">AI Prediction</span>
              </div>
              <p className="text-xs text-gray-500">Accuracy <span className="font-semibold text-violet-600">96%</span></p>
            </div>

            {/* Dashboard mockup */}
            <div className="bg-white rounded-2xl border border-gray-200 shadow-xl overflow-hidden mx-4">
              {/* Browser chrome */}
              <div className="bg-gray-50 border-b border-gray-200 px-4 py-2.5 flex items-center gap-2">
                <div className="flex gap-1.5">
                  <div className="w-3 h-3 rounded-full bg-red-400"></div>
                  <div className="w-3 h-3 rounded-full bg-yellow-400"></div>
                  <div className="w-3 h-3 rounded-full bg-green-400"></div>
                </div>
                <div className="flex-1 bg-white rounded-md border border-gray-200 px-3 py-1 text-xs text-gray-400 ml-2">
                  app.queueless.ai/dashboard
                </div>
              </div>
              <div className="flex h-64">
                {/* Sidebar */}
                <div className="w-36 bg-gray-50 border-r border-gray-100 p-3 flex flex-col gap-1">
                  <div className="flex items-center gap-1.5 mb-3">
                    <div className="w-5 h-5 bg-blue-600 rounded flex items-center justify-center">
                      <svg viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" className="w-3 h-3">
                        <rect x="3" y="3" width="7" height="7" rx="1"/><rect x="14" y="3" width="7" height="7" rx="1"/>
                        <rect x="3" y="14" width="7" height="7" rx="1"/><rect x="14" y="14" width="7" height="7" rx="1"/>
                      </svg>
                    </div>
                    <span className="text-xs font-bold text-gray-700">QueueLess</span>
                  </div>
                  {['Overview', 'Queue Mgmt', 'Analytics', 'Settings'].map((item, i) => (
                    <div key={item} className={`text-xs px-2 py-1.5 rounded-md font-medium ${i === 0 ? 'bg-blue-600 text-white' : 'text-gray-500'}`}>{item}</div>
                  ))}
                </div>
                {/* Main content */}
                <div className="flex-1 p-4 overflow-hidden">
                  <p className="text-xs font-bold text-gray-800 mb-3">Today's Overview</p>
                  <div className="grid grid-cols-4 gap-2 mb-4">
                    {[
                      { label: 'Current', value: '42', color: 'text-blue-600' },
                      { label: 'Waiting', value: '17', color: 'text-orange-500' },
                      { label: 'Served', value: '89', color: 'text-green-600' },
                      { label: 'No-show', value: '3', color: 'text-red-500' },
                    ].map(m => (
                      <div key={m.label} className="bg-gray-50 rounded-lg p-2 text-center">
                        <p className={`text-base font-bold ${m.color}`}>{m.value}</p>
                        <p className="text-gray-400" style={{fontSize:'9px'}}>{m.label}</p>
                      </div>
                    ))}
                  </div>
                  <p className="text-xs font-semibold text-gray-600 mb-2">Peak Hours</p>
                  <div className="flex items-end gap-1 h-12">
                    {[2,4,7,5,9,8,6,10,7,4,3,5].map((h, i) => (
                      <div key={i} className={`flex-1 rounded-sm ${i === 8 ? 'bg-blue-600' : 'bg-blue-200'}`} style={{height:`${h*10}%`}}></div>
                    ))}
                  </div>
                  <div className="flex justify-between mt-1">
                    <span className="text-gray-400" style={{fontSize:'8px'}}>8am</span>
                    <span className="text-gray-400" style={{fontSize:'8px'}}>2pm</span>
                    <span className="text-gray-400" style={{fontSize:'8px'}}>8pm</span>
                  </div>
                </div>
              </div>
              <div className="border-t border-gray-100 px-4 py-2 bg-green-50 flex items-center gap-2">
                <div className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse"></div>
                <span className="text-xs text-green-700 font-medium">Queue active — 17 customers waiting · Avg wait: 12 min</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Use Cases */}
      <div id="usecases" className="bg-gray-50 py-10 mt-8">
        <div className="max-w-5xl mx-auto px-8">
          <p className="text-center text-gray-400 text-sm font-medium mb-6 uppercase tracking-widest">Trusted by organisations across India</p>
          <div className="flex justify-center gap-12">
            {useCases.map(u => (
              <div key={u.label} className="text-center">
                <div className="text-3xl mb-2">{u.icon}</div>
                <p className="text-gray-600 font-medium text-sm">{u.label}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* How it works */}
      <div id="how-it-works" className="max-w-5xl mx-auto px-8 py-20">
        <div className="text-center mb-14">
          <h2 className="text-3xl font-bold text-gray-900 mb-3">How it works</h2>
          <p className="text-gray-500">Three steps from chaos to control</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            { step: '01', title: 'Customer scans QR', desc: 'They get a digital token on their phone. No app, no counter visit.' },
            { step: '02', title: 'AI tracks the queue', desc: 'Live position updates + smart departure time based on their location.' },
            { step: '03', title: 'WhatsApp alerts', desc: 'Notified when their turn is 2 slots away. They arrive just in time.' },
          ].map(s => (
            <div key={s.step} className="relative">
              <div className="text-5xl font-black text-gray-100 mb-3">{s.step}</div>
              <h3 className="text-lg font-bold text-gray-900 mb-2">{s.title}</h3>
              <p className="text-gray-500 text-sm leading-relaxed">{s.desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Live Demo Section */}
      <div id="live-demo" className="bg-gray-50 py-20">
        <div className="max-w-5xl mx-auto px-8">
          <div className="text-center mb-14">
            <div className="inline-flex items-center gap-2 bg-green-50 text-green-700 text-xs font-semibold px-3 py-1.5 rounded-full mb-4">
              <span className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse"></span>
              Live Simulation
            </div>
            <h2 className="text-3xl font-bold text-gray-900 mb-3">See it in action</h2>
            <p className="text-gray-500">Watch the queue move in real time — customer and admin view, side by side</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

            {/* Customer View - Phone mockup */}
            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
              <div className="flex items-center gap-2 mb-5">
                <span className="text-lg">📱</span>
                <span className="text-sm font-bold text-gray-700">Customer View</span>
                <span className="ml-auto text-xs bg-blue-50 text-blue-600 px-2 py-0.5 rounded-full font-medium">Token {customerToken}</span>
              </div>

              {/* Phone frame */}
              <div className="max-w-xs mx-auto bg-gray-900 rounded-3xl p-2 shadow-xl">
                <div className="bg-white rounded-2xl overflow-hidden">
                  {/* Status bar */}
                  <div className="bg-blue-600 px-4 pt-3 pb-4">
                    <div className="flex justify-between items-center mb-3">
                      <span className="text-white text-xs font-medium">QueueLess AI</span>
                      <div className="flex gap-1">
                        <div className="w-1 h-1 bg-white/60 rounded-full"></div>
                        <div className="w-1 h-1 bg-white/60 rounded-full"></div>
                        <div className="w-1 h-1 bg-white rounded-full"></div>
                      </div>
                    </div>
                    <p className="text-blue-100 text-xs mb-1">Your token</p>
                    <p className="text-white text-4xl font-black">{customerToken}</p>
                  </div>
                  <div className="p-4 space-y-3">
                    <div className="flex justify-between items-center bg-gray-50 rounded-xl px-3 py-2.5">
                      <span className="text-xs text-gray-500">People ahead</span>
                      <span className="text-sm font-bold text-gray-900">{Math.max(0, peopleAhead)}</span>
                    </div>
                    <div className="flex justify-between items-center bg-gray-50 rounded-xl px-3 py-2.5">
                      <span className="text-xs text-gray-500">Est. wait time</span>
                      <span className="text-sm font-bold text-blue-600">{customerEntry.wait} mins</span>
                    </div>
                    <div className="flex justify-between items-center bg-gray-50 rounded-xl px-3 py-2.5">
                      <span className="text-xs text-gray-500">Status</span>
                      <span className={`text-xs font-bold px-2 py-0.5 rounded-full ${customerEntry.status === 'serving' ? 'bg-green-100 text-green-700' : 'bg-orange-50 text-orange-600'}`}>
                        {customerEntry.status === 'serving' ? '✓ Your turn!' : 'Waiting'}
                      </span>
                    </div>
                    {/* WhatsApp notification */}
                    <div className={`rounded-xl border px-3 py-2.5 transition-all duration-500 ${whatsappSent ? 'bg-green-50 border-green-200' : 'bg-gray-50 border-gray-100'}`}>
                      <div className="flex items-center gap-2">
                        <span className="text-sm">{whatsappSent ? '✅' : '⏳'}</span>
                        <div>
                          <p className="text-xs font-semibold text-gray-700">WhatsApp Alert</p>
                          <p className="text-xs text-gray-400">{whatsappSent ? 'Sent! Your turn is near.' : 'Will notify when 2 slots away'}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Admin View */}
            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
              <div className="flex items-center gap-2 mb-5">
                <span className="text-lg">🖥️</span>
                <span className="text-sm font-bold text-gray-700">Admin Dashboard</span>
                <span className="ml-auto text-xs bg-green-50 text-green-600 px-2 py-0.5 rounded-full font-medium animate-pulse">● Live</span>
              </div>

              {/* Stats row */}
              <div className="grid grid-cols-3 gap-3 mb-5">
                {[
                  { label: 'In Queue', value: demoQueue.filter(q=>q.status==='waiting').length, color: 'text-orange-500' },
                  { label: 'Avg Wait', value: '7 min', color: 'text-blue-600' },
                  { label: 'Served Today', value: '89', color: 'text-green-600' },
                ].map(m => (
                  <div key={m.label} className="bg-gray-50 rounded-xl p-3 text-center">
                    <p className={`text-lg font-bold ${m.color}`}>{m.value}</p>
                    <p className="text-gray-400 text-xs mt-0.5">{m.label}</p>
                  </div>
                ))}
              </div>

              {/* Queue list */}
              <div className="space-y-2">
                <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-3">Live Queue</p>
                {demoQueue.slice(0, 5).map((q) => (
                  <div key={q.id + tick} className={`flex items-center justify-between rounded-xl px-3 py-2.5 transition-all duration-500 ${
                    q.status === 'serving' ? 'bg-blue-50 border border-blue-200' :
                    q.id === customerToken ? 'bg-violet-50 border border-violet-200' :
                    'bg-gray-50 border border-gray-100'
                  }`}>
                    <div className="flex items-center gap-2.5">
                      <div className={`w-2 h-2 rounded-full ${q.status === 'serving' ? 'bg-green-500 animate-pulse' : 'bg-gray-300'}`}></div>
                      <span className={`text-sm font-bold ${q.status === 'serving' ? 'text-blue-700' : q.id === customerToken ? 'text-violet-700' : 'text-gray-700'}`}>{q.id}</span>
                      {q.id === customerToken && <span className="text-xs bg-violet-100 text-violet-600 px-1.5 py-0.5 rounded font-medium">you</span>}
                    </div>
                    <div className="flex items-center gap-3">
                      {q.status === 'serving'
                        ? <span className="text-xs font-semibold text-green-600 bg-green-100 px-2 py-0.5 rounded-full">Serving now</span>
                        : <span className="text-xs text-gray-500">~{q.wait} min</span>
                      }
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-4 pt-4 border-t border-gray-100 flex items-center justify-between">
                <div>
                  <p className="text-xs text-gray-400">Currently serving</p>
                  <p className="text-sm font-bold text-gray-800">{adminServing?.id || '—'}</p>
                </div>
                <div className="text-right">
                  <p className="text-xs text-gray-400">AI predicted peak</p>
                  <p className="text-sm font-bold text-blue-600">2:00 PM</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Features */}
      <div id="features" className="py-20">
        <div className="max-w-5xl mx-auto px-8">
          <div className="text-center mb-14">
            <h2 className="text-3xl font-bold text-gray-900 mb-3">Everything your queue needs</h2>
            <p className="text-gray-500">Replace your token machine with an intelligent platform</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {features.map(f => (
              <div key={f.title} className="bg-white p-6 rounded-2xl border border-gray-100 hover:border-blue-100 hover:shadow-md hover:-translate-y-1 transition-all group cursor-default">
                <div className={`w-11 h-11 rounded-xl flex items-center justify-center mb-4 ${f.color}`}>{f.icon}</div>
                <h3 className="text-base font-bold text-gray-900 mb-2">{f.title}</h3>
                <p className="text-gray-500 text-sm leading-relaxed">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* CTA */}
      <div className="max-w-5xl mx-auto px-8 py-20">
        <div className="bg-blue-600 rounded-3xl px-12 py-14 text-center relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-blue-500 rounded-full -translate-y-1/2 translate-x-1/2 opacity-40"></div>
          <div className="absolute bottom-0 left-0 w-48 h-48 bg-blue-700 rounded-full translate-y-1/2 -translate-x-1/2 opacity-40"></div>
          <div className="relative z-10">
            <h2 className="text-3xl font-bold text-white mb-3">Start managing queues smarter</h2>
            <div className="flex justify-center gap-8 mb-8 mt-5">
              {[['95%','Less Waiting'],['10k+','Tokens Daily'],['100+','Organisations']].map(([val, lbl]) => (
                <div key={lbl} className="text-center">
                  <p className="text-2xl font-black text-white">{val}</p>
                  <p className="text-blue-200 text-xs">{lbl}</p>
                </div>
              ))}
            </div>
            <button onClick={() => navigate('/signup')} className="bg-white text-blue-600 px-8 py-3.5 rounded-xl font-bold text-base hover:bg-blue-50 transition-colors shadow-sm">
              Get Started Free →
            </button>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="border-t border-gray-100 py-8">
        <div className="max-w-5xl mx-auto px-8 flex items-center justify-between flex-wrap gap-4">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 bg-blue-600 rounded-md flex items-center justify-center">
              <svg viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" className="w-3.5 h-3.5">
                <rect x="3" y="3" width="7" height="7" rx="1"/><rect x="14" y="3" width="7" height="7" rx="1"/>
                <rect x="3" y="14" width="7" height="7" rx="1"/><rect x="14" y="14" width="7" height="7" rx="1"/>
              </svg>
            </div>
            <span className="text-sm font-semibold text-gray-700">QueueLess AI</span>
          </div>
          <div className="flex gap-6 text-sm text-gray-400">
            <a href="https://github.com/manishaPCU/queueless-ai" target="_blank" rel="noreferrer" className="hover:text-gray-600 transition-colors">GitHub</a>
            <span>Privacy Policy</span>
            <span>Terms</span>
          </div>
          <p className="text-gray-400 text-sm">© 2024 QueueLess AI. Built for smarter queues.</p>
        </div>
      </div>

    </div>
  );
}
