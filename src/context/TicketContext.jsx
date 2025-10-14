// src/context/TicketContext.jsx
import React, { createContext, useContext, useEffect, useState } from "react";

const TicketContext = createContext();

export const TicketProvider = ({ children }) => {
  const [tickets, setTickets] = useState([]);
  const API_BASE = process.env.REACT_APP_API_BASE_URL || "https://ticket-backend-g5da.onrender.com/api";

  const fetchAll = async () => {
    try {
      const res = await fetch(`${API_BASE}/tickets`);
      if (!res.ok) throw new Error("Failed to fetch tickets");
      const data = await res.json();
      setTickets(data.tickets || []);
    } catch (err) {
      console.error("TicketContext fetch error:", err);
    }
  };

  useEffect(() => { fetchAll(); }, []);

  const removeTicket = (id) => setTickets(prev => prev.filter(t => t._id !== id));
  const addTicket = (t) => setTickets(prev => [t, ...prev]);
  const updateTicket = (id, updates) => setTickets(prev => prev.map(t => t._id === id ? {...t, ...updates} : t));

  return (
    <TicketContext.Provider value={{ tickets, setTickets, fetchAll, removeTicket, addTicket, updateTicket }}>
      {children}
    </TicketContext.Provider>
  );
};

export const useTickets = () => useContext(TicketContext);

