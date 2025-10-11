// src/context/TicketContext.jsx
import React, { createContext, useContext, useState, useEffect } from "react";
import { useAuth } from "./AuthContext";

const TicketContext = createContext();

export const TicketProvider = ({ children }) => {
  const { token } = useAuth();
  const [tickets, setTickets] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const API_BASE = process.env.REACT_APP_API_BASE || "https://ticket-backend-g5da.onrender.com/api";

  // Fetch my tickets (posted + booked)
  const fetchMyTickets = async () => {
    if (!token) return;
    setLoading(true);
    setError("");
    try {
      const res = await fetch(`${API_BASE}/tickets/my-tickets`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (!res.ok) throw new Error("Failed to fetch tickets");

      const data = await res.json();
      setTickets(data.postedTickets?.concat(data.bookedTickets) || []);
    } catch (err) {
      console.error("TicketContext fetch error:", err);
      setError(err.message || "Failed to fetch tickets");
    } finally {
      setLoading(false);
    }
  };

  const addTicket = (ticket) => {
    setTickets(prev => [ticket, ...prev]);
  };

  const removeTicket = (ticketId) => {
    setTickets(prev => prev.filter(t => t._id !== ticketId));
  };

  useEffect(() => {
    fetchMyTickets();
  }, [token]);

  return (
    <TicketContext.Provider
      value={{
        tickets,
        setTickets,
        addTicket,
        removeTicket,
        loading,
        error,
        fetchMyTickets,
      }}
    >
      {children}
    </TicketContext.Provider>
  );
};

export const useTickets = () => useContext(TicketContext);

