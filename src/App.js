import React, { Suspense } from "react";
import { Routes, Route, useLocation } from "react-router-dom";

import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

// Lazy Load All Pages (Speed Boost)
const Home = React.lazy(() => import("./pages/Home"));
const About = React.lazy(() => import("./pages/About"));
const FindTicket = React.lazy(() => import("./pages/FindTicket"));
const Post = React.lazy(() => import("./pages/Post"));
const Contact = React.lazy(() => import("./pages/Contact"));
const Policy = React.lazy(() => import("./pages/Policy"));
const Disclaimer = React.lazy(() => import("./pages/Disclaimer"));
const TermsOfUse = React.lazy(() => import("./pages/TermsOfUse"));
const RefundPolicy = React.lazy(() => import("./pages/RefundPolicy"));
const Login = React.lazy(() => import("./pages/Login"));
const Signup = React.lazy(() => import("./pages/Signup"));
const Profile = React.lazy(() => import("./pages/Profile"));
const AdminPanel = React.lazy(() => import("./pages/AdminPanel"));

// Blogs lazy load
const BlogHome = React.lazy(() => import("./pages/blog"));
const UnusedTicket = React.lazy(() => import("./pages/blog/UnusedTicket"));
const SeatConfirm = React.lazy(() => import("./pages/blog/SeatConfirm"));
const WaitingCancel = React.lazy(() => import("./pages/blog/WaitingCancel"));
const TatkalFast = React.lazy(() => import("./pages/blog/TatkalFast"));
const SeatAvailability = React.lazy(() => import("./pages/blog/SeatAvailability"));

const RacGuide = React.lazy(() => import("./pages/blog/RacGuide"));
const WLCompare = React.lazy(() => import("./pages/blog/WLCompare"));
const PNRGuide = React.lazy(() => import("./pages/blog/PNRGuide"));
const ChartTime = React.lazy(() => import("./pages/blog/ChartTime"));
const TatkalGuide = React.lazy(() => import("./pages/blog/TatkalGuide"));

/* ⭐ NEW – Dhurandhar Movie Blog */
const DhurandharMovieShootingLocation = React.lazy(() =>
  import("./pages/blog/DhurandharMovieShootingLocation")
);

/* ⭐ NEW – Indigo Share Price Blog */
const IndigoSharePrice = React.lazy(() =>
  import("./pages/blog/IndigoSharePrice")
);

/* ⭐ NEW – India vs Pakistan 2026 Blog */
const IndVsPak = React.lazy(() =>
  import("./pages/blog/ind-vs-pak")
);

/* ⭐ NEW – IPL Mini Auction 2025 Blog */
const IplMiniAuction2025 = React.lazy(() =>
  import("./pages/blog/IplMiniAuction2025")
);

/* ⭐ NEW – Aravalli Hills Blog (FIXED PATH) */
const AravalliBlog = React.lazy(() =>
  import("./pages/blog/AravalliBlog")
);

import PrivateRoute from "./routes/PrivateRoute";
import { AuthProvider } from "./context/AuthContext";
import { TicketProvider } from "./context/TicketContext";

/* Scroll To Top */
function ScrollToTop() {
  const { pathname } = useLocation();
  React.useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
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
        <Suspense fallback={<p className="text-center pt-20">Loading...</p>}>
          <Routes>

            {/* Basic Pages */}
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />

            {/* Protected */}
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

            {/* Legal */}
            <Route path="/policy" element={<Policy />} />
            <Route path="/disclaimer" element={<Disclaimer />} />
            <Route path="/terms" element={<TermsOfUse />} />
            <Route path="/refund-policy" element={<RefundPolicy />} />

            {/* Auth */}
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />

            {/* BLOG HOME */}
            <Route path="/blog" element={<BlogHome />} />

            {/* BLOG PAGES */}
            <Route path="/blog/unused-ticket" element={<UnusedTicket />} />
            <Route path="/blog/seat-confirm" element={<SeatConfirm />} />
            <Route path="/blog/waiting-cancel" element={<WaitingCancel />} />
            <Route path="/blog/tatkal-fast" element={<TatkalFast />} />
            <Route path="/blog/seat-availability" element={<SeatAvailability />} />

            {/* New 5 blogs */}
            <Route path="/blog/rac-guide" element={<RacGuide />} />
            <Route path="/blog/wl-compare" element={<WLCompare />} />
            <Route path="/blog/pnr-guide" element={<PNRGuide />} />
            <Route path="/blog/chart-time" element={<ChartTime />} />
            <Route path="/blog/tatkal-guide" element={<TatkalGuide />} />

            {/* ⭐ NEW — Dhurandhar Movie */}
            <Route
              path="/blog/dhurandhar-movie-shooting-location-train-guide"
              element={<DhurandharMovieShootingLocation />}
            />

            {/* ⭐ NEW — Indigo Share Price */}
            <Route
              path="/blog/indigo-share-price-flight-cancel-train-seat"
              element={<IndigoSharePrice />}
            />

            {/* ⭐ NEW — India vs Pakistan 2026 */}
            <Route path="/blog/ind-vs-pak" element={<IndVsPak />} />

            {/* ⭐ NEW — IPL Mini Auction 2025 */}
            <Route
              path="/blog/ipl-mini-auction-2025"
              element={<IplMiniAuction2025 />}
            />

            {/* ⭐ NEW — Aravalli Hills Controversy */}
            <Route
              path="/blog/aravalli-hills-controversy-2025"
              element={<AravalliBlog />}
            />

          </Routes>
        </Suspense>
      </main>

      <Footer />
    </>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <TicketProvider>
        <AppContent />
      </TicketProvider>
    </AuthProvider>
  );
}

