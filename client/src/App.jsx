import { BrowserRouter, Routes, Route } from 'react-router-dom';
import LandingPage from './pages/LandingPage';
import OrgSignup from './pages/OrgSignup';
import OrgLogin from './pages/OrgLogin';
import AdminDashboard from './pages/AdminDashboard';
import CustomerToken from './pages/CustomerToken';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/signup" element={<OrgSignup />} />
        <Route path="/login" element={<OrgLogin />} />
        <Route path="/dashboard" element={<AdminDashboard />} />
        <Route path="/token/:orgId" element={<CustomerToken />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;