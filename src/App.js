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
import AdminPanel from "./pages/AdminPanel";

import PrivateRoute from "./routes/PrivateRoute";
import { AuthProvider } from "./context/AuthContext";
import { TicketProvider } from "./context/TicketContext";

/* ------------------------------
   ✅ BLOG IMPORTS (All 10 pages)
--------------------------------*/
import BlogHome from "./pages/blog";

import UnusedTicket from "./pages/blog/UnusedTicket";
import SeatConfirm from "./pages/blog/SeatConfirm";
import WaitingCancel from "./pages/blog/WaitingCancel";
import TatkalFast from "./pages/blog/TatkalFast";
import SeatAvailability from "./pages/blog/SeatAvailability";

/* NEW 5 BLOGS */
import RacGuide from "./pages/blog/RacGuide";
import WlCompare from "./pages/blog/WlCompare";
import PnrGuide from "./pages/blog/PnrGuide";
import ChartTime from "./pages/blog/ChartTime";
import TatkalGuide from "./pages/blog/TatkalGuide";

/* Scroll To Top */
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

          {/* Basic Pages */}
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />

          {/* Auth Protected */}
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

          {/* Admin */}
          <Route
            path="/admin/*"
            element={
              <PrivateRoute adminOnly={true}>
                <AdminPanel />
              </PrivateRoute>
            }
          />

          {/* Legal Pages */}
          <Route path="/policy" element={<Policy />} />
          <Route path="/disclaimer" element={<Disclaimer />} />
          <Route path="/terms" element={<TermsOfUse />} />
          <Route path="/refund-policy" element={<RefundPolicy />} />

          {/* Auth */}
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />

          {/* ---------------------------------
               ✅ BLOG ROUTES
             --------------------------------- */}

          <Route path="/blog" element={<BlogHome />} />

          {/* Main 5 blogs */}
          <Route path="/blog/unused-ticket" element={<UnusedTicket />} />
          <Route path="/blog/seat-confirm" element={<SeatConfirm />} />
          <Route path="/blog/waiting-cancel" element={<WaitingCancel />} />
          <Route path="/blog/tatkal-fast" element={<TatkalFast />} />
          <Route path="/blog/seat-availability" element={<SeatAvailability />} />

          {/* NEW 5 Blogs */}
          <Route path="/blog/rac-guide" element={<RacGuide />} />
          <Route path="/blog/wl-compare" element={<WlCompare />} />
          <Route path="/blog/pnr-guide" element={<PnrGuide />} />
          <Route path="/blog/chart-time" element={<ChartTime />} />
          <Route path="/blog/tatkal-guide" element={<TatkalGuide />} />

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

