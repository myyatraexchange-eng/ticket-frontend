import React, { createContext, useContext, useState } from "react";

const TicketContext = createContext();

export const TicketProvider = ({ children }) => {
  const [tickets, setTickets] = useState([]);

  const addTicket = (ticket) => setTickets((prev) => [...prev, ticket]);
  const removeTicket = (ticketId) =>
    setTickets((prev) => prev.filter((t) => t._id !== ticketId));

  return (
    <TicketContext.Provider
      value={{ tickets, setTickets, addTicket, removeTicket }}
    >
      {children}
    </TicketContext.Provider>
  );
};

export const useTickets = () => useContext(TicketContext);

