import React, { createContext, useContext, useState, useEffect } from "react";
import { useAuth } from "./AuthContext";

const TicketContext = createContext();

export const TicketProvider = ({ children }) => {
  const { token } = useAuth();
  const [tickets, setTickets] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const API_BASE = process.env.REACT_APP_API_BASE || "https://ticket-backend-g5da.onrender.com/api";

  const fetchTickets = async () => {
    setLoading(true);
    setError("");
    try {
      const res = await fetch(`${API_BASE}/tickets`, {
        headers: token ? { Authorization: `Bearer ${token}` } : {},
      });
      if (!res.ok) throw new Error(`Failed to fetch tickets: ${res.status}`);
      const data = await res.json();
      setTickets(data.tickets || []);
    } catch (err) {
      console.error("TicketContext fetch error:", err);
      setError(err.message || "Failed to fetch tickets");
      setTickets([]);
    } finally {
      setLoading(false);
    }
  };

  const fetchMyTickets = async () => {
    if (!token) return;
    setLoading(true);
    setError("");
    try {
      const res = await fetch(`${API_BASE}/tickets/my-tickets`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (!res.ok) throw new Error("Failed to fetch my tickets");
      const data = await res.json();
      setTickets(data.postedTickets?.concat(data.bookedTickets) || []);
    } catch (err) {
      console.error("TicketContext fetch my-tickets error:", err);
      setError(err.message || "Failed to fetch my tickets");
      setTickets([]);
    } finally {
      setLoading(false);
    }
  };

  const addTicket = (ticket) => setTickets(prev => [ticket, ...prev]);
  const removeTicket = (ticketId) => setTickets(prev => prev.filter(t => t._id !== ticketId));

  useEffect(() => {
    fetchTickets();
  }, [token]);

  return (
    <TicketContext.Provider value={{ tickets, setTickets, addTicket, removeTicket, loading, error, fetchTickets, fetchMyTickets }}>
      {children}
    </TicketContext.Provider>
  );
};

export const useTickets = () => useContext(TicketContext);

