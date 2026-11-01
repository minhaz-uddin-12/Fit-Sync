import { useEffect } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import About from "./pages/About";
import Services from "./pages/Services";
import Equipments from "./pages/Equipments";
import Plans from "./pages/Plans";
import Support from "./pages/Support";
import Contact from "./pages/Contact";
import Login from "./pages/Login";
import Register from "./pages/Register";
import ForgotPassword from "./pages/ForgotPassword";
import BMICalculator from "./pages/BMICalculator";
import Checkout from "./pages/Checkout";
import { NotificationProvider } from './contexts/NotificationContext';
import { Alert } from './components/ui/Alert';
import { AuthProvider } from "./contexts/AuthContext";
import { ProtectedRoute } from "./components/ProtectedRoute";
import UserDashboard from "./pages/member/UserDashboard"; 
import TrainerDashboard from "./pages/trainer/TrainerDashboard";
import AdminDashboard from "./pages/admin/AdminDashboard";
import Profile from "./pages/Profile";
import Workouts from "./pages/member/Workouts";
import NotFound from "./pages/NotFound";
import ResetPassword from "./pages/ResetPassword";
import { Navigate } from "react-router-dom";
import { useAuth, dashboardPath } from "./contexts/AuthContext";

function GuestRoute({ children }) {
  const { user } = useAuth();
  return user ? <Navigate to={dashboardPath(user.role)} replace /> : children;
}
import { ErrorBoundary } from "./components/ErrorBoundary";

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
}

function App() {
  return (
    <NotificationProvider>
      <AuthProvider>
        <div className="flex min-h-screen flex-col">
          <ScrollToTop />
          <Navbar />
          <main className="flex-grow">
            <ErrorBoundary>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/about" element={<About />} />
              <Route path="/services" element={<Services />} />
              <Route path="/equipments" element={<Equipments />} />
              <Route path="/plans" element={<Plans />} />
              <Route path="/support" element={<Support />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/checkout" element={<Checkout />} />
              <Route path="/login" element={<GuestRoute><Login /></GuestRoute>} />
              <Route path="/register" element={<GuestRoute><Register /></GuestRoute>} />
              <Route path="/forgotpassword" element={<ForgotPassword />} />
              <Route path="/reset-password/:token" element={<ResetPassword />} />
              <Route path="/bmicalculator" element={<BMICalculator />} />
              <Route 
                path="/dashboard" 
                element={
                  <ProtectedRoute roles={['member']}>
                    <UserDashboard />
                  </ProtectedRoute>
                } 
              />
              <Route 
                path="/workouts" 
                element={
                  <ProtectedRoute roles={['member']}>
                    <Workouts />
                  </ProtectedRoute>
                } 
              />
              <Route 
                path="/profile" 
                element={
                  <ProtectedRoute roles={['member', 'trainer', 'admin']}>
                    <Profile />
                  </ProtectedRoute>
                } 
              />
              <Route 
                path="/trainer/dashboard" 
                element={
                  <ProtectedRoute roles={['trainer']}>
                    <TrainerDashboard />
                  </ProtectedRoute>
                } 
              />
              <Route 
                path="/admin/dashboard" 
                element={
                  <ProtectedRoute roles={['admin']}>
                    <AdminDashboard />
                  </ProtectedRoute>
                } 
              />
              <Route path="*" element={<NotFound />} />
            </Routes>
            </ErrorBoundary>
          </main>
          <Footer />
          <Alert />
        </div>
      </AuthProvider>
    </NotificationProvider>
  );
}

export default App;