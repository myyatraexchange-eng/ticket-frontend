import React from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

import Home from "./pages/Home";
import About from "./pages/About";
import FindTicket from "./pages/FindTicket";
import Post from "./pages/Post";
import Contact from "./pages/Contact";
import Policy from "./pages/Policy";
import Disclaimer from "./pages/Disclaimer";
import TermsOfUse from "./pages/TermsOfUse";
import RefundPolicy from "./pages/RefundPolicy";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Profile from "./pages/Profile";
import EditTicket from "./pages/EditTicket";
import PrivateRoute from "./routes/PrivateRoute";
import AdminPayments from "./pages/AdminPayments"; // ✅ Admin page

import { LoaderProvider, useLoader } from "./context/LoaderContext";

// 🔹 Scroll to top on route change
function ScrollToTop() {
  const { pathname } = useLocation();
  React.useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
}

// 🔹 Loader Overlay
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
        <Routes>
          {/* 🔹 Public Pages */}
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />

          {/* 🔹 Private Pages */}
          <Route path="/find" element={<PrivateRoute><FindTicket /></PrivateRoute>} />
          <Route path="/post" element={<PrivateRoute><Post /></PrivateRoute>} />
          <Route path="/profile" element={<PrivateRoute><Profile /></PrivateRoute>} />
          <Route path="/edit-ticket/:id" element={<PrivateRoute><EditTicket /></PrivateRoute>} />

          {/* 🔹 Admin Page (login required) */}
          <Route path="/admin/payments" element={<PrivateRoute><AdminPayments /></PrivateRoute>} />

          {/* 🔹 Legal Pages */}
          <Route path="/policy" element={<Policy />} />
          <Route path="/disclaimer" element={<Disclaimer />} />
          <Route path="/terms" element={<TermsOfUse />} />
          <Route path="/refund-policy" element={<RefundPolicy />} />

          {/* 🔹 Auth Pages */}
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
        </Routes>
      </main>
      <Footer />
    </>
  );
}

function App() {
  return (
    <LoaderProvider>
      <AppContent />
    </LoaderProvider>
  );
}

export default App;

