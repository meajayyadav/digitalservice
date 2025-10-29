import "@/App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "@/pages/Home";
import About from "@/pages/About";
import Services from "@/pages/Services";
import Pricing from "@/pages/Pricing";
import Portfolio from "@/pages/Portfolio";
import Testimonials from "@/pages/Testimonials";
import FAQ from "@/pages/FAQ";
import Contact from "@/pages/Contact";
import AdminLogin from "@/pages/admin/AdminLogin";
import AdminDashboard from "@/pages/admin/AdminDashboard";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import ProtectedRoute from "@/components/ProtectedRoute";
import { AuthProvider } from "@/contexts/AuthContext";
import { Toaster } from "@/components/ui/sonner";

function App() {
  return (
    <div className="App">
      <AuthProvider>
        <BrowserRouter>
          <Routes>
            {/* Admin Routes */}
            <Route path="/admin/login" element={<AdminLogin />} />
            <Route
              path="/admin/dashboard"
              element={
                <ProtectedRoute>
                  <AdminDashboard />
                </ProtectedRoute>
              }
            />

            {/* Public Routes */}
            <Route
              path="/*"
              element={
                <>
                  <Navigation />
                  <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/about" element={<About />} />
                    <Route path="/services" element={<Services />} />
                    <Route path="/pricing" element={<Pricing />} />
                    <Route path="/portfolio" element={<Portfolio />} />
                    <Route path="/testimonials" element={<Testimonials />} />
                    <Route path="/faq" element={<FAQ />} />
                    <Route path="/contact" element={<Contact />} />
                  </Routes>
                  <Footer />
                </>
              }
            />
          </Routes>
        </BrowserRouter>
        <Toaster position="top-right" />
      </AuthProvider>
    </div>
  );
}

export default App;