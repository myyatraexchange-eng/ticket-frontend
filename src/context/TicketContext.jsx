import React, { createContext, useContext, useState, useEffect } from "react";
import { useAuth } from "./AuthContext";

const TicketContext = createContext();

export const useTickets = () => useContext(TicketContext);

export const TicketProvider = ({ children }) => {
  const { token } = useAuth();
  const [tickets, setTickets] = useState([]);

  // Fetch tickets that the logged-in user has unlocked (paid)
  const fetchMyTickets = async () => {
    if (!token) return;
    try {
      const res = await fetch(`${process.env.REACT_APP_API_BASE}/tickets/my`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (!res.ok) throw new Error("Failed to fetch tickets");
      const data = await res.json();
      setTickets(Array.isArray(data) ? data : [data]);
    } catch (err) {
      console.error(err);
      setTickets([]);
    }
  };

  useEffect(() => {
    fetchMyTickets();
  }, [token]);

  // Add a ticket to profile (after successful payment)
  const addTicket = (ticket) => {
    setTickets((prev) => [...prev, ticket]);
  };

  // Remove a ticket (after deletion)
  const removeTicket = (id) => {
    setTickets((prev) => prev.filter((t) => t._id !== id));
  };

  return (
    <TicketContext.Provider value={{ tickets, addTicket, removeTicket, fetchMyTickets }}>
      {children}
    </TicketContext.Provider>
  );
};

