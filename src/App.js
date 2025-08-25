import React from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';

import Navbar from './components/Navbar';
import Footer from './components/Footer';

import Home from './pages/Home';
import About from './pages/About';
import FindTicket from './pages/FindTicket'; 
import PostTicket from './pages/PostTicket';   // ✅ yahan change kiya
import Contact from './pages/Contact';
import Policy from './pages/Policy';
import Privacy from './pages/Privacy';
import Disclaimer from './pages/Disclaimer';
import TermsOfUse from './pages/TermsOfUse';
import Login from './pages/Login';
import Signup from './pages/Signup';

function Layout() {
  const location = useLocation();
  const isHome = location.pathname === '/';

  return (
    <>
      <Navbar />

      <main className={isHome ? '' : 'min-h-screen px-4 md:px-8 py-6'}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/find" element={<FindTicket />} /> 
          <Route path="/post" element={<PostTicket />} />   {/* ✅ yahan bhi change */}
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

function App() {
  return (
    <Router>
      <Layout />
    </Router>
  );
}

export default App;
