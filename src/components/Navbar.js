{/* More Dropdown */}
<div className="relative">
  <button onClick={() => setMoreOpen(!moreOpen)} className="py-1 hover:underline">
    More ▾
  </button>
  {moreOpen && (
    <div className="absolute bg-white text-black mt-1 rounded shadow-md w-40 z-50">
      <NavLink to="/policy" onClick={handleLinkClick} className={({ isActive }) =>
        `block px-4 py-2 hover:bg-gray-100 ${isActive ? "font-bold text-blue-600" : ""}`}>
        Policy
      </NavLink>
      <NavLink to="/privacy-policy" onClick={handleLinkClick} className={({ isActive }) =>
        `block px-4 py-2 hover:bg-gray-100 ${isActive ? "font-bold text-blue-600" : ""}`}>
        Privacy Policy
      </NavLink>
      <NavLink to="/disclaimer" onClick={handleLinkClick} className={({ isActive }) =>
        `block px-4 py-2 hover:bg-gray-100 ${isActive ? "font-bold text-blue-600" : ""}`}>
        Disclaimer
      </NavLink>
      <NavLink to="/terms" onClick={handleLinkClick} className={({ isActive }) =>
        `block px-4 py-2 hover:bg-gray-100 ${isActive ? "font-bold text-blue-600" : ""}`}>
        Terms
      </NavLink>
      <NavLink to="/refund-policy" onClick={handleLinkClick} className={({ isActive }) =>
        `block px-4 py-2 hover:bg-gray-100 ${isActive ? "font-bold text-blue-600" : ""}`}>
        Refund Policy
      </NavLink>
      <NavLink to="/shipping-policy" onClick={handleLinkClick} className={({ isActive }) =>
        `block px-4 py-2 hover:bg-gray-100 ${isActive ? "font-bold text-blue-600" : ""}`}>
        Shipping Policy
      </NavLink>
    </div>
  )}
</div>

