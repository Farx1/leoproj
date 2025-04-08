import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout/Layout';
import Dashboard from './pages/Dashboard';
import Employees from './pages/Employees';
import EmployeeDetails from './pages/EmployeeDetails';
import Emails from './pages/Emails';
import { AuthProvider } from './contexts/AuthContext';
import ProtectedRoute from './components/Auth/ProtectedRoute';
import Login from './pages/Login';
import AccessDenied from './pages/AccessDenied';

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          {/* Routes publiques */}
          <Route path="/login" element={<Login />} />
          <Route path="/access-denied" element={<AccessDenied />} />
          
          {/* Routes protégées */}
          <Route element={<ProtectedRoute />}>
            <Route path="/" element={<Layout />}>
              <Route index element={<Dashboard />} />
              
              {/* Routes avec restrictions de rôles */}
              <Route element={<ProtectedRoute requiredRoles={['admin', 'manager']} />}>
                <Route path="/employees" element={<Employees />} />
                <Route path="/employees/:id" element={<EmployeeDetails />} />
              </Route>
              
              <Route element={<ProtectedRoute requiredRoles={['admin', 'user']} />}>
                <Route path="/emails" element={<Emails />} />
              </Route>
            </Route>
          </Route>
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
