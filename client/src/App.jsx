// import { BrowserRouter, Routes, Route } from 'react-router-dom';
// import LandingPage from './pages/LandingPage';
// import OrgSignup from './pages/OrgSignup';
// import OrgLogin from './pages/OrgLogin';
// import AdminDashboard from './pages/AdminDashboard';
// import CustomerToken from './pages/CustomerToken';

// function App() {
//   return (
//     <BrowserRouter>
//       <Routes>
//         <Route path="/" element={<LandingPage />} />
//         <Route path="/signup" element={<OrgSignup />} />
//         <Route path="/login" element={<OrgLogin />} />
//         <Route path="/dashboard" element={<AdminDashboard />} />
//         <Route path="/token/:orgId" element={<CustomerToken />} />
//       </Routes>
//     </BrowserRouter>
//   );
// }

// export default App;




//------------------------------------------------------------




import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import LandingPage from './pages/LandingPage';
import OrgSignup from './pages/OrgSignup';
import OrgLogin from './pages/OrgLogin';
import AdminDashboard from './pages/AdminDashboard';
import CustomerToken from './pages/CustomerToken';

const ProtectedRoute = ({ children }) => {
  const token = localStorage.getItem('token');
  if (!token) return <Navigate to="/login" replace />;
  return children;
};

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/signup" element={<OrgSignup />} />
        <Route path="/login" element={<OrgLogin />} />
        <Route path="/dashboard" element={
          <ProtectedRoute>
            <AdminDashboard />
          </ProtectedRoute>
        } />
        <Route path="/token/:orgId" element={<CustomerToken />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
