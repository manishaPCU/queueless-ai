// import { useState } from 'react';
// import axios from 'axios';
// import { useNavigate } from 'react-router-dom';

// export default function OrgSignup() {
//   const [form, setForm] = useState({ 
//     name: '', type: 'hospital', email: '', 
//     password: '', address: '', lat: '', lng: '' 
//   });
//   const [locating, setLocating] = useState(false);
//   const navigate = useNavigate();

//   const detectLocation = () => {
//     setLocating(true);
//     navigator.geolocation.getCurrentPosition(
//       (pos) => {
//         setForm({...form, lat: pos.coords.latitude, lng: pos.coords.longitude});
//         setLocating(false);
//       },
//       () => {
//         alert('Location access denied. Please enter coordinates manually.');
//         setLocating(false);
//       }
//     );
//   };

//   const handleSubmit = async () => {
//     if (!form.lat || !form.lng) return alert('Please set your organisation location');
//     try {
//       const { data } = await axios.post('http://localhost:5000/api/auth/signup', form);
//       localStorage.setItem('token', data.token);
//       localStorage.setItem('org', JSON.stringify(data.org));
//       navigate('/dashboard');
//     } catch (err) {
//       alert(err.response?.data?.message || 'Signup failed');
//     }
//   };

//   return (
//     <div className="min-h-screen bg-gray-50 flex items-center justify-center p-6">
//       <div className="bg-white p-8 rounded-xl shadow-md w-full max-w-md space-y-4">
//         <h2 className="text-2xl font-bold text-gray-900">Register Organisation</h2>
//         <input className="w-full border p-3 rounded-lg" placeholder="Organisation Name" onChange={e => setForm({...form, name: e.target.value})} />
//         <select className="w-full border p-3 rounded-lg" onChange={e => setForm({...form, type: e.target.value})}>
//           <option value="hospital">Hospital</option>
//           <option value="bank">Bank</option>
//           <option value="clinic">Clinic</option>
//           <option value="government">Government Office</option>
//           <option value="other">Other</option>
//         </select>
//         <input className="w-full border p-3 rounded-lg" placeholder="Email" onChange={e => setForm({...form, email: e.target.value})} />
//         <input className="w-full border p-3 rounded-lg" type="password" placeholder="Password" onChange={e => setForm({...form, password: e.target.value})} />
//         <input className="w-full border p-3 rounded-lg" placeholder="Address" onChange={e => setForm({...form, address: e.target.value})} />
//         <div className="space-y-2">
//           <p className="text-gray-500 text-sm">Organisation Location</p>
//           <button
//             onClick={detectLocation}
//             className="w-full border-2 border-dashed border-blue-300 text-blue-600 py-3 rounded-lg font-medium hover:bg-blue-50"
//           >
//             {locating ? 'Detecting...' : form.lat ? `📍 Location Set (${parseFloat(form.lat).toFixed(4)}, ${parseFloat(form.lng).toFixed(4)})` : '📍 Detect My Location'}
//           </button>
//         </div>
//         <button onClick={handleSubmit} className="w-full bg-blue-600 text-white py-3 rounded-lg font-medium hover:bg-blue-700">
//           Register
//         </button>
//       </div>
//     </div>
//   );
// }



//---------------------------------------------------------------------





// import { useState } from 'react';
// import axios from 'axios';
// import { useNavigate } from 'react-router-dom';

// export default function OrgSignup() {
//   const [form, setForm] = useState({ 
//     name: '', type: 'hospital', email: '', 
//     password: '', address: '', lat: '', lng: '' 
//   });
//   const [locating, setLocating] = useState(false);
//   const [loading, setLoading] = useState(false);
//   const [showPassword, setShowPassword] = useState(false);
//   const navigate = useNavigate();

//   const detectLocation = () => {
//     setLocating(true);
//     navigator.geolocation.getCurrentPosition(
//       (pos) => {
//         setForm({...form, lat: pos.coords.latitude, lng: pos.coords.longitude});
//         setLocating(false);
//       },
//       () => {
//         alert('Location access denied. Please enter coordinates manually.');
//         setLocating(false);
//       }
//     );
//   };

//   const handleSubmit = async () => {
//     if (!form.lat || !form.lng) return alert('Please set your organisation location');
//     setLoading(true);
//     try {
//       const { data } = await axios.post('http://localhost:5000/api/auth/signup', form);
//       localStorage.setItem('token', data.token);
//       localStorage.setItem('org', JSON.stringify(data.org));
//       navigate('/dashboard');
//     } catch (err) {
//       alert(err.response?.data?.message || 'Signup failed');
//     } finally {
//       setLoading(false);
//     }
//   };

//   const orgTypes = [
//     { value: 'hospital', label: '🏥 Hospital' },
//     { value: 'bank', label: '🏦 Bank' },
//     { value: 'clinic', label: '🏪 Clinic' },
//     { value: 'government', label: '🏛️ Government Office' },
//     { value: 'other', label: '🏢 Other' },
//   ];

//   const locationSet = form.lat && form.lng;

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
//         <button onClick={() => navigate('/login')} className="text-sm font-medium text-gray-600 hover:text-gray-900 transition-colors">
//           Already registered? <span className="text-blue-600 font-semibold">Sign in →</span>
//         </button>
//       </nav>

//       <div className="flex flex-1">

//         {/* Left panel */}
//         <div className="hidden lg:flex w-1/2 bg-blue-600 flex-col justify-between p-12 relative overflow-hidden">
//           <div className="absolute top-0 right-0 w-72 h-72 bg-blue-500 rounded-full -translate-y-1/2 translate-x-1/2 opacity-50"></div>
//           <div className="absolute bottom-0 left-0 w-56 h-56 bg-blue-700 rounded-full translate-y-1/2 -translate-x-1/2 opacity-50"></div>

//           <div className="relative z-10">
//             <p className="text-blue-200 text-sm font-medium uppercase tracking-widest mb-6">Get started free</p>
//             <h2 className="text-4xl font-extrabold text-white leading-tight mb-4">
//               Set up your<br />queue in minutes.
//             </h2>
//             <p className="text-blue-100 text-base leading-relaxed max-w-xs">
//               Join hospitals, banks, and government offices across India already running smarter queues with QueueLess AI.
//             </p>
//           </div>

//           {/* Steps */}
//           <div className="relative z-10 space-y-3">
//             <p className="text-blue-200 text-xs font-semibold uppercase tracking-widest mb-4">How it works</p>
//             {[
//               { step: '01', title: 'Register your organisation', desc: 'Takes under 2 minutes' },
//               { step: '02', title: 'Share your QR code', desc: 'Customers scan to join the queue' },
//               { step: '03', title: 'Manage from your dashboard', desc: 'Real-time updates, analytics, alerts' },
//             ].map(s => (
//               <div key={s.step} className="flex items-start gap-4 bg-white/10 rounded-2xl px-4 py-3">
//                 <span className="text-white/40 text-xs font-black mt-0.5">{s.step}</span>
//                 <div>
//                   <p className="text-white text-sm font-semibold">{s.title}</p>
//                   <p className="text-blue-200 text-xs mt-0.5">{s.desc}</p>
//                 </div>
//               </div>
//             ))}
//           </div>
//         </div>

//         {/* Right panel — form */}
//         <div className="flex-1 flex items-center justify-center px-8 py-10">
//           <div className="w-full max-w-sm">
//             <div className="mb-7">
//               <h1 className="text-2xl font-bold text-gray-900 mb-1">Register your organisation</h1>
//               <p className="text-gray-500 text-sm">Create your account and start managing queues</p>
//             </div>

//             <div className="space-y-4">

//               {/* Org Name */}
//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-1.5">Organisation name</label>
//                 <div className="relative">
//                   <div className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400">
//                     <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className="w-4 h-4">
//                       <path d="M3 21h18M3 7v14M21 7v14M6 11h4m-4 4h4m4-4h4m-4 4h4M9 21V11M6 3h12l3 4H3z"/>
//                     </svg>
//                   </div>
//                   <input
//                     type="text"
//                     placeholder="City General Hospital"
//                     className="w-full border border-gray-200 pl-10 pr-4 py-3 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
//                     onChange={e => setForm({...form, name: e.target.value})}
//                   />
//                 </div>
//               </div>

//               {/* Org Type */}
//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-1.5">Organisation type</label>
//                 <div className="relative">
//                   <select
//                     className="w-full border border-gray-200 px-4 py-3 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all appearance-none bg-white"
//                     onChange={e => setForm({...form, type: e.target.value})}
//                   >
//                     {orgTypes.map(t => (
//                       <option key={t.value} value={t.value}>{t.label}</option>
//                     ))}
//                   </select>
//                   <div className="absolute right-3.5 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none">
//                     <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-4 h-4">
//                       <path d="M6 9l6 6 6-6"/>
//                     </svg>
//                   </div>
//                 </div>
//               </div>

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
//                   />
//                 </div>
//               </div>

//               {/* Password */}
//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-1.5">Password</label>
//                 <div className="relative">
//                   <div className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400">
//                     <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className="w-4 h-4">
//                       <rect x="3" y="11" width="18" height="11" rx="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/>
//                     </svg>
//                   </div>
//                   <input
//                     type={showPassword ? 'text' : 'password'}
//                     placeholder="Min. 8 characters"
//                     className="w-full border border-gray-200 pl-10 pr-11 py-3 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
//                     onChange={e => setForm({...form, password: e.target.value})}
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

//               {/* Address */}
//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-1.5">Address</label>
//                 <div className="relative">
//                   <div className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400">
//                     <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className="w-4 h-4">
//                       <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z"/><circle cx="12" cy="9" r="2.5"/>
//                     </svg>
//                   </div>
//                   <input
//                     type="text"
//                     placeholder="123 MG Road, Pune"
//                     className="w-full border border-gray-200 pl-10 pr-4 py-3 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
//                     onChange={e => setForm({...form, address: e.target.value})}
//                   />
//                 </div>
//               </div>

//               {/* Location detect */}
//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-1.5">Organisation location</label>
//                 <button
//                   onClick={detectLocation}
//                   className={`w-full flex items-center justify-center gap-2.5 py-3 rounded-xl text-sm font-medium border-2 border-dashed transition-all ${
//                     locationSet
//                       ? 'border-green-300 bg-green-50 text-green-700'
//                       : 'border-blue-200 bg-blue-50/50 text-blue-600 hover:bg-blue-50'
//                   }`}
//                 >
//                   {locating ? (
//                     <>
//                       <svg className="animate-spin w-4 h-4" viewBox="0 0 24 24" fill="none">
//                         <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="3" strokeOpacity="0.3"/>
//                         <path d="M12 2a10 10 0 0 1 10 10" stroke="currentColor" strokeWidth="3" strokeLinecap="round"/>
//                       </svg>
//                       Detecting location...
//                     </>
//                   ) : locationSet ? (
//                     <>
//                       <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-4 h-4">
//                         <path d="M20 6L9 17l-5-5"/>
//                       </svg>
//                       Location set ({parseFloat(form.lat).toFixed(4)}, {parseFloat(form.lng).toFixed(4)})
//                     </>
//                   ) : (
//                     <>
//                       <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className="w-4 h-4">
//                         <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z"/><circle cx="12" cy="9" r="2.5"/>
//                       </svg>
//                       Detect my location
//                     </>
//                   )}
//                 </button>
//               </div>

//               {/* Submit */}
//               <button
//                 onClick={handleSubmit}
//                 disabled={loading}
//                 className="w-full bg-blue-600 text-white py-3 rounded-xl font-semibold text-sm hover:bg-blue-700 transition-colors disabled:opacity-60 disabled:cursor-not-allowed"
//               >
//                 {loading ? (
//                   <span className="flex items-center justify-center gap-2">
//                     <svg className="animate-spin w-4 h-4" viewBox="0 0 24 24" fill="none">
//                       <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="3" strokeOpacity="0.3"/>
//                       <path d="M12 2a10 10 0 0 1 10 10" stroke="currentColor" strokeWidth="3" strokeLinecap="round"/>
//                     </svg>
//                     Creating account...
//                   </span>
//                 ) : 'Create account →'}
//               </button>
//             </div>

//             <p className="text-center text-xs text-gray-400 mt-6">
//               Already have an account?{' '}
//               <button onClick={() => navigate('/login')} className="text-blue-600 font-semibold hover:underline">
//                 Sign in
//               </button>
//             </p>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }




//---------------------------------------------------------------------------





import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export default function OrgSignup() {
  const [form, setForm] = useState({ 
    name: '', type: 'hospital', email: '', 
    password: '', address: '', lat: '', lng: '' 
  });
  const [locating, setLocating] = useState(false);
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
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
    setLoading(true);
    try {
      const { data } = await axios.post('http://localhost:5000/api/auth/signup', form);
      localStorage.setItem('token', data.token);
      localStorage.setItem('org', JSON.stringify(data.org));
      navigate('/dashboard');
    } catch (err) {
      alert(err.response?.data?.message || 'Signup failed');
    } finally {
      setLoading(false);
    }
  };

  const orgTypes = [
    { value: 'hospital', label: '🏥 Hospital' },
    { value: 'bank', label: '🏦 Bank' },
    { value: 'clinic', label: '🏪 Clinic' },
    { value: 'government', label: '🏛️ Government Office' },
    { value: 'other', label: '🏢 Other' },
  ];

  const locationSet = form.lat && form.lng;

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
        <button onClick={() => navigate('/login')} className="text-sm font-medium text-gray-600 hover:text-gray-900 transition-colors">
          Already registered? <span className="text-blue-600 font-semibold">Sign in →</span>
        </button>
      </nav>

      <div className="flex flex-1">

        {/* Left panel */}
        <div className="hidden lg:flex w-1/2 bg-gray-50 border-r border-gray-100 flex-col justify-between p-12 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-72 h-72 bg-blue-50 rounded-full -translate-y-1/2 translate-x-1/2"></div>
          <div className="absolute bottom-0 left-0 w-56 h-56 bg-blue-50 rounded-full translate-y-1/2 -translate-x-1/2"></div>

          <div className="relative z-10">
            <div className="inline-flex items-center gap-2 bg-blue-50 text-blue-600 text-xs font-semibold px-3 py-1.5 rounded-full mb-6 uppercase tracking-wide">
              <span className="w-1.5 h-1.5 bg-blue-500 rounded-full"></span>
              Get started free
            </div>
            <h2 className="text-4xl font-extrabold text-gray-900 leading-tight mb-4">
              Set up your queue<br /><span className="text-blue-600">in minutes.</span>
            </h2>
            <p className="text-gray-500 text-base leading-relaxed max-w-xs">
              Join hospitals, banks, and government offices across India already running smarter queues with QueueLess AI.
            </p>
          </div>

          {/* Steps */}
          <div className="relative z-10 space-y-3">
            <p className="text-gray-400 text-xs font-semibold uppercase tracking-widest mb-4">How it works</p>
            {[
              { step: '01', title: 'Register your organisation', desc: 'Takes under 2 minutes' },
              { step: '02', title: 'Share your QR code', desc: 'Customers scan to join the queue' },
              { step: '03', title: 'Manage from your dashboard', desc: 'Real-time updates, analytics, alerts' },
            ].map(s => (
              <div key={s.step} className="flex items-start gap-4 bg-white rounded-2xl px-4 py-3 border border-gray-200 shadow-sm">
                <span className="text-blue-200 text-xs font-black mt-0.5">{s.step}</span>
                <div>
                  <p className="text-gray-800 text-sm font-semibold">{s.title}</p>
                  <p className="text-gray-400 text-xs mt-0.5">{s.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right panel — form */}
        <div className="flex-1 flex items-center justify-center px-8 py-10">
          <div className="w-full max-w-sm">
            <div className="mb-7">
              <h1 className="text-2xl font-bold text-gray-900 mb-1">Register your organisation</h1>
              <p className="text-gray-500 text-sm">Create your account and start managing queues</p>
            </div>

            <div className="space-y-4">

              {/* Org Name */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">Organisation name</label>
                <div className="relative">
                  <div className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className="w-4 h-4">
                      <path d="M3 21h18M3 7v14M21 7v14M6 11h4m-4 4h4m4-4h4m-4 4h4M9 21V11M6 3h12l3 4H3z"/>
                    </svg>
                  </div>
                  <input
                    type="text"
                    placeholder="City General Hospital"
                    className="w-full border border-gray-200 pl-10 pr-4 py-3 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                    onChange={e => setForm({...form, name: e.target.value})}
                  />
                </div>
              </div>

              {/* Org Type */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">Organisation type</label>
                <div className="relative">
                  <select
                    className="w-full border border-gray-200 px-4 py-3 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all appearance-none bg-white"
                    onChange={e => setForm({...form, type: e.target.value})}
                  >
                    {orgTypes.map(t => (
                      <option key={t.value} value={t.value}>{t.label}</option>
                    ))}
                  </select>
                  <div className="absolute right-3.5 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-4 h-4">
                      <path d="M6 9l6 6 6-6"/>
                    </svg>
                  </div>
                </div>
              </div>

              {/* Email */}
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
                  />
                </div>
              </div>

              {/* Password */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">Password</label>
                <div className="relative">
                  <div className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className="w-4 h-4">
                      <rect x="3" y="11" width="18" height="11" rx="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/>
                    </svg>
                  </div>
                  <input
                    type={showPassword ? 'text' : 'password'}
                    placeholder="Min. 8 characters"
                    className="w-full border border-gray-200 pl-10 pr-11 py-3 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                    onChange={e => setForm({...form, password: e.target.value})}
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

              {/* Address */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">Address</label>
                <div className="relative">
                  <div className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className="w-4 h-4">
                      <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z"/><circle cx="12" cy="9" r="2.5"/>
                    </svg>
                  </div>
                  <input
                    type="text"
                    placeholder="123 MG Road, Pune"
                    className="w-full border border-gray-200 pl-10 pr-4 py-3 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                    onChange={e => setForm({...form, address: e.target.value})}
                  />
                </div>
              </div>

              {/* Location detect */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">Organisation location</label>
                <button
                  onClick={detectLocation}
                  className={`w-full flex items-center justify-center gap-2.5 py-3 rounded-xl text-sm font-medium border-2 border-dashed transition-all ${
                    locationSet
                      ? 'border-green-300 bg-green-50 text-green-700'
                      : 'border-blue-200 bg-blue-50/50 text-blue-600 hover:bg-blue-50'
                  }`}
                >
                  {locating ? (
                    <>
                      <svg className="animate-spin w-4 h-4" viewBox="0 0 24 24" fill="none">
                        <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="3" strokeOpacity="0.3"/>
                        <path d="M12 2a10 10 0 0 1 10 10" stroke="currentColor" strokeWidth="3" strokeLinecap="round"/>
                      </svg>
                      Detecting location...
                    </>
                  ) : locationSet ? (
                    <>
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-4 h-4">
                        <path d="M20 6L9 17l-5-5"/>
                      </svg>
                      Location set ({parseFloat(form.lat).toFixed(4)}, {parseFloat(form.lng).toFixed(4)})
                    </>
                  ) : (
                    <>
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className="w-4 h-4">
                        <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z"/><circle cx="12" cy="9" r="2.5"/>
                      </svg>
                      Detect my location
                    </>
                  )}
                </button>
              </div>

              {/* Submit */}
              <button
                onClick={handleSubmit}
                disabled={loading}
                className="w-full bg-blue-600 text-white py-3 rounded-xl font-semibold text-sm hover:bg-blue-700 transition-colors disabled:opacity-60 disabled:cursor-not-allowed"
              >
                {loading ? (
                  <span className="flex items-center justify-center gap-2">
                    <svg className="animate-spin w-4 h-4" viewBox="0 0 24 24" fill="none">
                      <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="3" strokeOpacity="0.3"/>
                      <path d="M12 2a10 10 0 0 1 10 10" stroke="currentColor" strokeWidth="3" strokeLinecap="round"/>
                    </svg>
                    Creating account...
                  </span>
                ) : 'Create account →'}
              </button>
            </div>

            <p className="text-center text-xs text-gray-400 mt-6">
              Already have an account?{' '}
              <button onClick={() => navigate('/login')} className="text-blue-600 font-semibold hover:underline">
                Sign in
              </button>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

