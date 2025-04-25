import { Routes, Route } from "react-router-dom";
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

function App() {
  return (
    <AuthProvider>
      <NotificationProvider>
        <div className="flex flex-col min-h-screen">
          <Navbar />
          <main className="flex-grow">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/about" element={<About />} />
              <Route path="/services" element={<Services />} />
              <Route path="/equipments" element={<Equipments />} />
              <Route path="/plans" element={<Plans />} />
              <Route path="/support" element={<Support />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/checkout" element={<Checkout />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/forgotpassword" element={<ForgotPassword />} />
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
            </Routes>
          </main>
          <Footer />
          <Alert />
        </div>
      </NotificationProvider>
    </AuthProvider>
  );
}

export default App;