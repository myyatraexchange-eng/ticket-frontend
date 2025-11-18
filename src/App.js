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
import AdminPanel from "./pages/AdminPanel";

import PrivateRoute from "./routes/PrivateRoute";
import { AuthProvider } from "./context/AuthContext";
import { TicketProvider } from "./context/TicketContext";

function ScrollToTop() {
  const { pathname } = useLocation();
  React.useEffect(() => window.scrollTo(0, 0), [pathname]);
  return null;
}

function AppContent() {
  const location = useLocation();
  const isHome = location.pathname === "/";

  return (
    <>
      <Navbar />
      <ScrollToTop />

      <main className={isHome ? "" : "min-h-screen px-4 md:px-8 py-6"}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />

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

          <Route
            path="/admin/*"
            element={
              <PrivateRoute adminOnly={true}>
                <AdminPanel />
              </PrivateRoute>
            }
          />

          <Route path="/policy" element={<Policy />} />
          <Route path="/disclaimer" element={<Disclaimer />} />
          <Route path="/terms" element={<TermsOfUse />} />
          <Route path="/refund-policy" element={<RefundPolicy />} />

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
    <AuthProvider>
      <TicketProvider>
        <AppContent />
      </TicketProvider>
    </AuthProvider>
  );
}

export default App;

