// src/App.js
import React from "react";
import { Routes, Route, useLocation } from "react-router-dom";

import Layout from "./components/Layout";
import LoaderOverlay from "./components/LoaderOverlay";

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
import AdminPayments from "./pages/AdminPayments";
import PrivateRoute from "./routes/PrivateRoute";

// Scroll to top on route change
function ScrollToTop() {
  const { pathname } = useLocation();
  React.useEffect(() => window.scrollTo(0, 0), [pathname]);
  return null;
}

const App = () => {
  return (
    <>
      <ScrollToTop />
      <LoaderOverlay />
      <Layout>
        <Routes>
          {/* Public Pages */}
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/policy" element={<Policy />} />
          <Route path="/disclaimer" element={<Disclaimer />} />
          <Route path="/terms" element={<TermsOfUse />} />
          <Route path="/refund-policy" element={<RefundPolicy />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />

          {/* Private Pages */}
          <Route path="/find" element={<PrivateRoute><FindTicket /></PrivateRoute>} />
          <Route path="/post" element={<PrivateRoute><Post /></PrivateRoute>} />
          <Route path="/profile" element={<PrivateRoute><Profile /></PrivateRoute>} />
          <Route path="/edit-ticket/:id" element={<PrivateRoute><EditTicket /></PrivateRoute>} />

          {/* Admin Pages */}
          <Route path="/admin/payments" element={<PrivateRoute><AdminPayments /></PrivateRoute>} />
        </Routes>
      </Layout>
    </>
  );
};

export default App;

