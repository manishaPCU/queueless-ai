import { useNavigate } from 'react-router-dom';

export default function LandingPage() {
  const navigate = useNavigate();
  return (
    <div className="min-h-screen bg-white flex flex-col items-center justify-center gap-8 p-6">
      <h1 className="text-4xl font-bold text-gray-900">QueueLess AI</h1>
      <p className="text-gray-500 text-center max-w-md">
        Smart queue management for hospitals, banks, and clinics. No more waiting in lines.
      </p>
      <div className="flex gap-4">
        <button onClick={() => navigate('/signup')} className="bg-blue-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-blue-700">
          Register Organisation
        </button>
        <button onClick={() => navigate('/login')} className="border border-blue-600 text-blue-600 px-6 py-3 rounded-lg font-medium hover:bg-blue-50">
          Organisation Login
        </button>
      </div>
    </div>
  );
}