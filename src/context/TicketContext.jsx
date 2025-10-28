import React, { createContext, useContext, useState, useMemo } from "react";

// 🔹 Context create
const TicketContext = createContext();

// 🔹 Provider Component
export const TicketProvider = ({ children }) => {
  const [tickets, setTickets] = useState([]);

  // 🟢 Ticket जोड़ने का function
  const addTicket = (ticket) => setTickets((prev) => [...prev, ticket]);

  // 🟢 Ticket हटाने का function
  const removeTicket = (ticketId) =>
    setTickets((prev) => prev.filter((t) => t._id !== ticketId));

  // ⚙️ useMemo से performance optimize (unnecessary re-render रोकता है)
  const value = useMemo(
    () => ({
      tickets,
      setTickets,
      addTicket,
      removeTicket,
    }),
    [tickets]
  );

  return (
    <TicketContext.Provider value={value}>
      {children}
    </TicketContext.Provider>
  );
};

// 🔹 Custom hook — कहीं से भी access के लिए
export const useTickets = () => useContext(TicketContext);

