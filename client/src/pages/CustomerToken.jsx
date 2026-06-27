// import { useState, useEffect } from 'react';
// import axios from 'axios';
// import { useParams } from 'react-router-dom';
// import socket from '../socket';

// export default function CustomerToken() {
//   const { orgId } = useParams();
//   const [phone, setPhone] = useState('');
//   const [tokenData, setTokenData] = useState(null);
//   const [submitted, setSubmitted] = useState(false);
//   const [loading, setLoading] = useState(false);
//   const [phoneError, setPhoneError] = useState('');

//   useEffect(() => {
//     socket.emit('joinQueue', orgId);
//     socket.on('queueUpdate', (data) => {
//       if (tokenData) {
//         const newPosition = tokenData.token.tokenNumber - data.currentToken;
//         setTokenData(prev => ({
//           ...prev,
//           position: newPosition > 0 ? newPosition : 0,
//           estimatedWait: newPosition * 8
//         }));
//       }
//     });
//     return () => socket.off('queueUpdate');
//   }, [tokenData]);

//   const getToken = async () => {
//     const indianPhoneRegex = /^[6-9]\d{9}$/;
//     if (!indianPhoneRegex.test(phone)) {
//       setPhoneError('Enter a valid Indian phone number starting with 6, 7, 8 or 9');
//       return;
//     }
//     setPhoneError('');
//     setLoading(true);

//     navigator.geolocation.getCurrentPosition(
//       async (position) => {
//         try {
//           const { data } = await axios.post('http://localhost:5000/api/token/generate', {
//             orgId,
//             phoneNumber: phone,
//             customerLat: position.coords.latitude,
//             customerLng: position.coords.longitude
//           });
//           setTokenData(data);
//           setSubmitted(true);
//         } catch (err) {
//           setPhoneError(err.response?.data?.message || 'Failed to get token');
//         } finally {
//           setLoading(false);
//         }
//       },
//       async () => {
//         try {
//           const { data } = await axios.post('http://localhost:5000/api/token/generate', {
//             orgId,
//             phoneNumber: phone
//           });
//           setTokenData(data);
//           setSubmitted(true);
//         } catch (err) {
//           setPhoneError(err.response?.data?.message || 'Failed to get token');
//         } finally {
//           setLoading(false);
//         }
//       }
//     );
//   };

//   if (!submitted) {
//     return (
//       <div className="min-h-screen bg-gradient-to-br from-blue-50 to-white flex items-center justify-center p-6">
//         <div className="w-full max-w-sm">
//           <div className="text-center mb-8">
//             <div className="w-16 h-16 bg-blue-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
//               <span className="text-3xl">🔢</span>
//             </div>
//             <h1 className="text-2xl font-bold text-gray-900">Join Queue</h1>
//             <p className="text-gray-500 mt-1">Enter your phone number to get a token</p>
//           </div>

//           <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 space-y-4">
//             <div>
//               <label className="text-gray-700 text-sm font-medium block mb-2">Phone Number</label>
//               <div className="flex gap-2">
//                 <div className="bg-gray-50 border border-gray-200 rounded-xl px-3 flex items-center text-gray-600 font-medium">
//                   +91
//                 </div>
//                 <input
//                   className={`flex-1 border p-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 text-lg ${phoneError ? 'border-red-400' : 'border-gray-200'}`}
//                   placeholder="9876543210"
//                   value={phone}
//                   onChange={e => {
//                     setPhone(e.target.value);
//                     setPhoneError('');
//                   }}
//                   maxLength={10}
//                   type="tel"
//                 />
//               </div>
//               {phoneError && (
//                 <p className="text-red-500 text-sm mt-2">{phoneError}</p>
//               )}
//             </div>

//             <button
//               onClick={getToken}
//               disabled={loading}
//               className="w-full bg-blue-600 text-white py-4 rounded-xl font-bold text-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
//             >
//               {loading ? 'Getting your token...' : 'Get Token'}
//             </button>

//             <p className="text-gray-400 text-xs text-center">
//               Allow location access for smart departure time prediction
//             </p>
//           </div>
//         </div>
//       </div>
//     );
//   }

//   const isNext = tokenData?.position === 0 || tokenData?.position === 1;

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-blue-50 to-white flex items-center justify-center p-6">
//       <div className="w-full max-w-sm space-y-4">

//         <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8 text-center">
//           <p className="text-gray-500 text-sm font-medium mb-2">Your Token Number</p>
//           <div className="bg-blue-50 rounded-2xl py-8 px-4 mb-6">
//             <p className="text-8xl font-bold text-blue-600">{tokenData?.token?.tokenNumber}</p>
//           </div>

//           {isNext && (
//             <div className="bg-green-50 border border-green-200 rounded-xl p-3 mb-4">
//               <p className="text-green-700 font-bold">🎉 Your turn is coming up!</p>
//               <p className="text-green-600 text-sm">Please proceed to the counter</p>
//             </div>
//           )}

//           <div className="grid grid-cols-3 gap-3">
//             <div className="bg-gray-50 p-3 rounded-xl">
//               <p className="text-gray-400 text-xs mb-1">Position</p>
//               <p className="text-xl font-bold text-gray-900">{tokenData?.position}</p>
//             </div>
//             <div className="bg-gray-50 p-3 rounded-xl">
//               <p className="text-gray-400 text-xs mb-1">Wait Time</p>
//               <p className="text-xl font-bold text-gray-900">{tokenData?.estimatedWait}m</p>
//             </div>
//             <div className="bg-gray-50 p-3 rounded-xl">
//               <p className="text-gray-400 text-xs mb-1">Leave By</p>
//               <p className="text-xl font-bold text-green-600">{tokenData?.departureTime || 'Now'}</p>
//             </div>
//           </div>
//         </div>

//         <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 space-y-3">
//           <div className="flex items-center gap-3">
//             <span className="w-8 h-8 bg-blue-50 rounded-lg flex items-center justify-center">📱</span>
//             <p className="text-gray-600 text-sm">You'll get a WhatsApp notification when your turn is near</p>
//           </div>
//           <div className="flex items-center gap-3">
//             <span className="w-8 h-8 bg-green-50 rounded-lg flex items-center justify-center">📍</span>
//             <p className="text-gray-600 text-sm">Departure time calculated based on your location</p>
//           </div>
//           <div className="flex items-center gap-3">
//             <span className="w-8 h-8 bg-orange-50 rounded-lg flex items-center justify-center">⏱️</span>
//             <p className="text-gray-600 text-sm">Wait time updates automatically as queue moves</p>
//           </div>
//         </div>

//         <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-4 text-center">
//           <p className="text-gray-400 text-sm">Token sent to</p>
//           <p className="text-gray-900 font-bold">+91 {phone}</p>
//         </div>

//       </div>
//     </div>
//   );
// }







//-------------------------------------------------------------------------






import { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import socket from '../socket';

export default function CustomerToken() {
  const { orgId } = useParams();
  const [phone, setPhone] = useState('');
  const [tokenData, setTokenData] = useState(null);
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [phoneError, setPhoneError] = useState('');

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
    const indianPhoneRegex = /^[6-9]\d{9}$/;
    if (!indianPhoneRegex.test(phone)) {
      setPhoneError('Enter a valid Indian phone number starting with 6, 7, 8 or 9');
      return;
    }
    setPhoneError('');
    setLoading(true);

    navigator.geolocation.getCurrentPosition(
      async (position) => {
        try {
          const { data } = await axios.post('http://localhost:5000/api/token/generate', {
            orgId, phoneNumber: phone,
            customerLat: position.coords.latitude,
            customerLng: position.coords.longitude
          });
          setTokenData(data); setSubmitted(true);
        } catch (err) {
          setPhoneError(err.response?.data?.message || 'Failed to get token');
        } finally { setLoading(false); }
      },
      async () => {
        try {
          const { data } = await axios.post('http://localhost:5000/api/token/generate', { orgId, phoneNumber: phone });
          setTokenData(data); setSubmitted(true);
        } catch (err) {
          setPhoneError(err.response?.data?.message || 'Failed to get token');
        } finally { setLoading(false); }
      }
    );
  };

  // ── JOIN FORM ──
  if (!submitted) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-white flex items-center justify-center p-6">
        <div className="w-full max-w-sm">
          <div className="text-center mb-8">
            <div className="w-16 h-16 bg-blue-600 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg shadow-blue-200">
              <svg viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" className="w-8 h-8">
                <rect x="3" y="3" width="7" height="7" rx="1"/><rect x="14" y="3" width="7" height="7" rx="1"/>
                <rect x="3" y="14" width="7" height="7" rx="1"/><rect x="14" y="14" width="7" height="7" rx="1"/>
              </svg>
            </div>
            <h1 className="text-2xl font-bold text-gray-900">Join Queue</h1>
            <p className="text-gray-500 mt-1 text-sm">Enter your phone number to get a token</p>
          </div>

          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 space-y-4">
            <div>
              <label className="text-gray-700 text-sm font-medium block mb-2">Phone Number</label>
              <div className="flex gap-2">
                <div className="bg-gray-50 border border-gray-200 rounded-xl px-3 flex items-center text-gray-600 font-medium text-sm">
                  +91
                </div>
                <input
                  className={`flex-1 border p-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 text-lg transition-all ${phoneError ? 'border-red-400' : 'border-gray-200'}`}
                  placeholder="9876543210"
                  value={phone}
                  onChange={e => { setPhone(e.target.value); setPhoneError(''); }}
                  maxLength={10}
                  type="tel"
                />
              </div>
              {phoneError && <p className="text-red-500 text-xs mt-2">{phoneError}</p>}
            </div>

            <button
              onClick={getToken}
              disabled={loading}
              className="w-full bg-blue-600 text-white py-4 rounded-xl font-bold text-base hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              {loading ? (
                <span className="flex items-center justify-center gap-2">
                  <svg className="animate-spin w-4 h-4" viewBox="0 0 24 24" fill="none">
                    <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="3" strokeOpacity="0.3"/>
                    <path d="M12 2a10 10 0 0 1 10 10" stroke="currentColor" strokeWidth="3" strokeLinecap="round"/>
                  </svg>
                  Getting your token...
                </span>
              ) : 'Get Token'}
            </button>

            <p className="text-gray-400 text-xs text-center">
              Allow location access for smart departure time prediction
            </p>
          </div>
        </div>
      </div>
    );
  }

  // ── TOKEN STATUS PAGE ──
  const isNext = tokenData?.position === 0 || tokenData?.position === 1;
  const position = tokenData?.position ?? 0;
  const wait = tokenData?.estimatedWait ?? 0;
  const tokenNumber = tokenData?.token?.tokenNumber;

  // Progress: 0 = just joined, 1 = your turn
  const totalEstimated = (tokenNumber - 1) || 1;
  const progressPct = Math.min(100, Math.round(((totalEstimated - position) / totalEstimated) * 100));

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-blue-50 flex items-center justify-center p-4">
      <div className="w-full max-w-sm space-y-3">

        {/* Token card */}
        <div className={`bg-white rounded-3xl border shadow-sm overflow-hidden ${isNext ? 'border-green-200' : 'border-gray-100'}`}>
          {/* Top status bar */}
          <div className={`px-6 py-3 flex items-center justify-between ${isNext ? 'bg-green-500' : 'bg-blue-600'}`}>
            <div className="flex items-center gap-2">
              <div className="w-1.5 h-1.5 bg-white rounded-full animate-pulse"></div>
              <span className="text-white text-xs font-semibold">{isNext ? 'Your turn is next!' : 'Queue Active'}</span>
            </div>
            <span className="text-white/80 text-xs">+91 {phone}</span>
          </div>

          <div className="p-7">
            {/* Token number */}
            <div className="text-center mb-6">
              <p className="text-xs text-gray-400 uppercase tracking-widest mb-2 font-medium">Your Token</p>
              <div className={`inline-flex items-center justify-center w-32 h-32 rounded-3xl text-6xl font-black mb-3 ${isNext ? 'bg-green-50 text-green-600' : 'bg-blue-50 text-blue-600'}`}>
                {tokenNumber}
              </div>
              {isNext && (
                <div className="bg-green-50 border border-green-200 rounded-2xl px-4 py-2.5 mt-2">
                  <p className="text-green-700 font-bold text-sm">🎉 Please proceed to the counter</p>
                </div>
              )}
            </div>

            {/* Progress bar */}
            {!isNext && (
              <div className="mb-6">
                <div className="flex justify-between text-xs text-gray-400 mb-1.5">
                  <span>Queue progress</span>
                  <span>{progressPct}% ahead of you served</span>
                </div>
                <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-blue-500 rounded-full transition-all duration-1000"
                    style={{ width: `${progressPct}%` }}
                  ></div>
                </div>
              </div>
            )}

            {/* Stats */}
            <div className="grid grid-cols-3 gap-3">
              <div className="bg-gray-50 rounded-2xl p-3 text-center">
                <p className="text-gray-400 text-xs mb-1">Ahead</p>
                <p className="text-2xl font-black text-gray-900">{position}</p>
                <p className="text-gray-400 text-xs">people</p>
              </div>
              <div className="bg-orange-50 rounded-2xl p-3 text-center">
                <p className="text-orange-400 text-xs mb-1">Wait</p>
                <p className="text-2xl font-black text-orange-500">{wait}</p>
                <p className="text-orange-400 text-xs">minutes</p>
              </div>
              <div className="bg-green-50 rounded-2xl p-3 text-center">
                <p className="text-green-500 text-xs mb-1">Leave by</p>
                <p className="text-lg font-black text-green-600 leading-tight">{tokenData?.departureTime || 'Now'}</p>
                <p className="text-green-400 text-xs">smart ETA</p>
              </div>
            </div>
          </div>
        </div>

        {/* Info cards */}
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5 space-y-3">
          <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide">What happens next</p>
          {[
            {
              icon: '📱', bg: 'bg-blue-50',
              text: "You'll get a WhatsApp notification when your turn is 2 slots away"
            },
            {
              icon: '📍', bg: 'bg-green-50',
              text: 'Departure time is calculated using your location so you arrive just in time'
            },
            {
              icon: '⏱️', bg: 'bg-orange-50',
              text: 'Wait time updates automatically as the queue moves forward'
            },
          ].map((item, i) => (
            <div key={i} className="flex items-start gap-3">
              <span className={`w-8 h-8 ${item.bg} rounded-xl flex items-center justify-center flex-shrink-0 text-base`}>
                {item.icon}
              </span>
              <p className="text-gray-500 text-sm leading-relaxed pt-1">{item.text}</p>
            </div>
          ))}
        </div>

        {/* Footer note */}
        <p className="text-center text-xs text-gray-400 pb-2">
          Powered by <span className="font-semibold text-blue-600">QueueLess AI</span> · Do not close this page
        </p>
      </div>
    </div>
  );
}
