import React, { useEffect, useState } from "react";
import { Routes, Route, useLocation } from "react-router-dom";

import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Loader from "./components/Loader";

import Home from "./pages/Home";
import About from "./pages/About";
import FindTicket from "./pages/FindTicket";
import Post from "./pages/Post";
import Contact from "./pages/Contact";
import Policy from "./pages/Policy";
import Privacy from "./pages/Privacy";
import Disclaimer from "./pages/Disclaimer";
import TermsOfUse from "./pages/TermsOfUse";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Profile from "./pages/Profile";
import EditTicket from "./pages/EditTicket";
import PrivateRoute from "./routes/PrivateRoute.jsx";

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => window.scrollTo(0, 0), [pathname]);
  return null;
}

function App() {
  const [loading, setLoading] = useState(true);
  const [routeLoading, setRouteLoading] = useState(false);
  const location = useLocation();

  // Initial splash loader
  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 2000);
    return () => clearTimeout(timer);
  }, []);

  // Route change loader
  useEffect(() => {
    if (!loading) {
      setRouteLoading(true);
      const timer = setTimeout(() => setRouteLoading(false), 800); // route loading duration
      return () => clearTimeout(timer);
    }
  }, [location.pathname, loading]);

  if (loading) return <Loader message="Please wait..." />;
  if (routeLoading) return <Loader message="Loading page..." />;

  return (
    <>
      <Navbar />
      <ScrollToTop />
      <main className="min-h-screen px-4 md:px-8 py-6">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/find" element={<PrivateRoute><FindTicket /></PrivateRoute>} />
          <Route path="/post" element={<PrivateRoute><Post /></PrivateRoute>} />
          <Route path="/profile" element={<PrivateRoute><Profile /></PrivateRoute>} />
          <Route path="/edit-ticket/:id" element={<PrivateRoute><EditTicket /></PrivateRoute>} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/policy" element={<Policy />} />
          <Route path="/privacy" element={<Privacy />} />
          <Route path="/disclaimer" element={<Disclaimer />} />
          <Route path="/terms" element={<TermsOfUse />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
        </Routes>
      </main>
      <Footer />
    </>
  );
}

export default App;

