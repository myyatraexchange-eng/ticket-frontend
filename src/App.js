import React, { Suspense, lazy } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import PrivateRoute from "./routes/PrivateRoute";
import { LoaderProvider, useLoader } from "./context/LoaderContext";

// Lazy load pages
const Home = lazy(() => import("./pages/Home"));
const About = lazy(() => import("./pages/About"));
const FindTicket = lazy(() => import("./pages/FindTicket"));
const Post = lazy(() => import("./pages/Post"));
const Contact = lazy(() => import("./pages/Contact"));
const Policy = lazy(() => import("./pages/Policy"));
const Disclaimer = lazy(() => import("./pages/Disclaimer"));
const TermsOfUse = lazy(() => import("./pages/TermsOfUse"));
const RefundPolicy = lazy(() => import("./pages/RefundPolicy"));
const Login = lazy(() => import("./pages/Login"));
const Signup = lazy(() => import("./pages/Signup"));
const Profile = lazy(() => import("./pages/Profile"));
const EditTicket = lazy(() => import("./pages/EditTicket"));
const AdminPayments = lazy(() => import("./pages/AdminPayments"));
const AdminLogin = lazy(() => import("./pages/AdminLogin"));

// Scroll to top
function ScrollToTop() {
  const { pathname } = useLocation();
  React.useEffect(() => window.scrollTo(0, 0), [pathname]);
  return null;
}

// Loader overlay
const LoaderOverlay = () => {
  const { loading } = useLoader();
  return loading ? (
    <div className="fixed inset-0 bg-white bg-opacity-70 z-50 flex items-center justify-center">
      <div className="loader ease-linear rounded-full border-4 border-t-4 border-gray-200 h-16 w-16"></div>
      <style>{`
        .loader { border-top-color: #3498db; animation: spin 1s linear infinite; }
        @keyframes spin { 0% { transform: rotate(0deg); } 100% { transform: rotate(360deg); } }
      `}</style>
    </div>
  ) : null;
};

function AppContent() {
  const location = useLocation();
  const isHome = location.pathname === "/";

  return (
    <>
      <Navbar />
      <ScrollToTop />
      <LoaderOverlay />
      <main className={isHome ? "" : "min-h-screen px-4 md:px-8 py-6"}>
        <Suspense fallback={<div className="text-center py-20">Loading...</div>}>
          <Routes>
            {/* Public Pages */}
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/policy" element={<Policy />} />
            <Route path="/disclaimer" element={<Disclaimer />} />
            <Route path="/terms" element={<TermsOfUse />} />
            <Route path="/refund-policy" element={<RefundPolicy />} />

            {/* Auth Pages */}
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />

            {/* Private Pages */}
            <Route path="/find" element={<PrivateRoute><FindTicket /></PrivateRoute>} />
            <Route path="/post" element={<PrivateRoute><Post /></PrivateRoute>} />
            <Route path="/profile" element={<PrivateRoute><Profile /></PrivateRoute>} />
            <Route path="/edit-ticket/:id" element={<PrivateRoute><EditTicket /></PrivateRoute>} />

            {/* Admin Pages */}
            <Route path="/admin/login" element={<AdminLogin />} />
            <Route path="/admin/payments" element={<PrivateRoute><AdminPayments /></PrivateRoute>} />
          </Routes>
        </Suspense>
      </main>
      <Footer />
    </>
  );
}

export default function App() {
  return (
    <LoaderProvider>
      <AppContent />
    </LoaderProvider>
  );
}

