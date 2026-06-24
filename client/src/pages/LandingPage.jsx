import { useNavigate } from 'react-router-dom';

export default function LandingPage() {
  const navigate = useNavigate();

  const features = [
    {
      icon: '🎫',
      title: 'Virtual Token System',
      desc: 'Customers scan a QR code and get a digital token instantly. No physical token machine needed.'
    },
    {
      icon: '⏱️',
      title: 'Real-Time Wait Updates',
      desc: 'Live queue position and estimated wait time updates automatically as the queue moves.'
    },
    {
      icon: '📍',
      title: 'Smart Departure Time',
      desc: 'System calculates travel time from customer location and tells them exactly when to leave.'
    },
    {
      icon: '📱',
      title: 'WhatsApp Notifications',
      desc: 'Customers get notified on WhatsApp when their turn is approaching. No app download needed.'
    },
    {
      icon: '📊',
      title: 'Peak Hour Analytics',
      desc: 'Understand your busiest hours with data. Open extra counters before the rush hits.'
    },
    {
      icon: '🚫',
      title: 'No-Show Tracking',
      desc: 'Track absent patients automatically and keep your queue moving efficiently.'
    }
  ];

  const useCases = [
    { icon: '🏥', label: 'Hospitals' },
    { icon: '🏦', label: 'Banks' },
    { icon: '🏛️', label: 'Government Offices' },
    { icon: '🏪', label: 'Clinics' },
  ];

  return (
    <div className="min-h-screen bg-white">

      {/* Navbar */}
      <nav className="flex items-center justify-between px-8 py-4 border-b border-gray-100">
        <div className="flex items-center gap-2">
          <span className="text-2xl">🔢</span>
          <span className="text-xl font-bold text-gray-900">QueueLess AI</span>
        </div>
        <div className="flex gap-3">
          <button
            onClick={() => navigate('/login')}
            className="text-gray-600 px-4 py-2 rounded-lg hover:bg-gray-50 font-medium"
          >
            Login
          </button>
          <button
            onClick={() => navigate('/signup')}
            className="bg-blue-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-blue-700"
          >
            Get Started
          </button>
        </div>
      </nav>

      {/* Hero Section */}
      <div className="max-w-5xl mx-auto px-8 py-20 text-center">
        <div className="inline-block bg-blue-50 text-blue-600 text-sm font-medium px-4 py-2 rounded-full mb-6">
          AI-Powered Queue Management
        </div>
        <h1 className="text-5xl font-bold text-gray-900 leading-tight mb-6">
          No More Waiting in Lines.<br />
          <span className="text-blue-600">Ever Again.</span>
        </h1>
        <p className="text-xl text-gray-500 max-w-2xl mx-auto mb-10">
          QueueLess AI gives your customers real-time queue updates, smart departure time predictions, and WhatsApp notifications — so they never waste time waiting.
        </p>
        <div className="flex gap-4 justify-center">
          <button
            onClick={() => navigate('/signup')}
            className="bg-blue-600 text-white px-8 py-4 rounded-xl font-bold text-lg hover:bg-blue-700"
          >
            Register Your Organisation
          </button>
          <button
            onClick={() => navigate('/login')}
            className="border border-gray-200 text-gray-700 px-8 py-4 rounded-xl font-bold text-lg hover:bg-gray-50"
          >
            Login
          </button>
        </div>
      </div>

      {/* Use Cases */}
      <div className="bg-gray-50 py-12">
        <div className="max-w-5xl mx-auto px-8">
          <p className="text-center text-gray-500 font-medium mb-8">Trusted by organisations across India</p>
          <div className="flex justify-center gap-12">
            {useCases.map(u => (
              <div key={u.label} className="text-center">
                <div className="text-4xl mb-2">{u.icon}</div>
                <p className="text-gray-600 font-medium">{u.label}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Features */}
      <div className="max-w-5xl mx-auto px-8 py-20">
        <h2 className="text-3xl font-bold text-gray-900 text-center mb-4">
          Everything your queue needs
        </h2>
        <p className="text-gray-500 text-center mb-12">
          Replace your token machine with an intelligent platform
        </p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {features.map(f => (
            <div key={f.title} className="p-6 rounded-xl border border-gray-100 hover:shadow-md transition-shadow">
              <div className="text-3xl mb-4">{f.icon}</div>
              <h3 className="text-lg font-bold text-gray-900 mb-2">{f.title}</h3>
              <p className="text-gray-500 text-sm leading-relaxed">{f.desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* CTA */}
      <div className="bg-blue-600 py-16">
        <div className="max-w-3xl mx-auto px-8 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">
            Ready to eliminate waiting?
          </h2>
          <p className="text-blue-100 mb-8">
            Join hospitals, banks, and clinics already using QueueLess AI
          </p>
          <button
            onClick={() => navigate('/signup')}
            className="bg-white text-blue-600 px-8 py-4 rounded-xl font-bold text-lg hover:bg-blue-50"
          >
            Get Started Free
          </button>
        </div>
      </div>

      {/* Footer */}
      <div className="border-t border-gray-100 py-8 text-center">
        <p className="text-gray-400 text-sm">© 2024 QueueLess AI. Built for smarter queues.</p>
      </div>

    </div>
  );
}