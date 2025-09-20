import React, { useEffect, useState } from "react";
import { Routes, Route, useLocation } from "react-router-dom";

import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Loader from "./Loader"; // ✅ Logo wala loader

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

// 🔹 Scroll to top on route change
function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
}

function Layout() {
  const location = useLocation();
  const [routeLoading, setRouteLoading] = useState(false);
  const isHome = location.pathname === "/";

  useEffect(() => {
    setRouteLoading(true);

    // simulate page fetch delay
    const timer = setTimeout(() => setRouteLoading(false), 1000);
    return () => clearTimeout(timer);
  }, [location.pathname]);

  if (routeLoading) {
    return <Loader message="Loading page..." />;
  }

  return (
    <>
      <Navbar />
      <ScrollToTop />
      <main className={isHome ? "" : "min-h-screen px-4 md:px-8 py-6"}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />

          {/* ✅ Protected routes */}
          <Route
            path="/find"
            element={
              <PrivateRoute>
                <FindTicket />
              </PrivateRoute>
            }
          />
          <Route
            path="/post"
            element={
              <PrivateRoute>
                <Post />
              </PrivateRoute>
            }
          />
          <Route
            path="/profile"
            element={
              <PrivateRoute>
                <Profile />
              </PrivateRoute>
            }
          />
          <Route
            path="/edit-ticket/:id"
            element={
              <PrivateRoute>
                <EditTicket />
              </PrivateRoute>
            }
          />

          {/* Public routes */}
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

export default Layout;

