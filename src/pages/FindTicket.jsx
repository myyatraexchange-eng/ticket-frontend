import React, { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

const API_BASE =
  process.env.REACT_APP_API_BASE_URL ||
  "https://ticket-backend-g5da.onrender.com/api";

const FindTicket = () => {
  const [tickets, setTickets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState({ from: "", to: "", date: "" });
  const [paymentData, setPaymentData] = useState({});
  const [submitting, setSubmitting] = useState(false);
  const [searching, setSearching] = useState(false);

  useEffect(() => {
    fetchTickets();
  }, []);

  // Fetch all available tickets
  const fetchTickets = async (query = {}) => {
    try {
      setLoading(true);
      const params = new URLSearchParams(query).toString();
      const res = await axios.get(`${API_BASE}/ticket?${params}`);
      if (res.data.success) {
        setTickets(res.data.tickets || []);
      }
    } catch (err) {
      console.error("TicketFetchError:", err);
      toast.error("Failed to load tickets");
    } finally {
      setLoading(false);
    }
  };

  // Handle search filters
  const handleSearch = async () => {
    if (!filters.from && !filters.to && !filters.date) {
      return toast.info("Please enter at least one search field");
    }
    setSearching(true);
    await fetchTickets(filters);
    setSearching(false);
  };

  // Input handler for filters
  const handleFilterChange = (e) => {
    setFilters({ ...filters, [e.target.name]: e.target.value });
  };

  // Input handler for payment fields
  const handleInput = (id, field, value) => {
    setPaymentData((prev) => ({
      ...prev,
      [id]: { ...prev[id], [field]: value },
    }));
  };

  // Unlock Ticket after payment
  const handleUnlock = async (ticketId) => {
    const data = paymentData[ticketId];
    if (!data?.txnId || !data?.payerName || !data?.payerMobile || !data?.amount) {
      return toast.warn("Please fill all payment details");
    }

    try {
      setSubmitting(true);
      const token = localStorage.getItem("token");
      const res = await axios.post(
        `${API_BASE}/ticket/submit-payment-proof`,
        { ...data, ticketId },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      if (res.data.success) {
        toast.success("Ticket unlocked successfully!");
        // Remove unlocked ticket from list
        setTickets((prev) => prev.filter((t) => t._id !== ticketId));
      } else {
        toast.error(res.data.message || "Failed to unlock ticket");
      }
    } catch (err) {
      console.error("Submit failed:", err);
      toast.error("Submit failed");
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) return <p className="text-center mt-10">Loading tickets...</p>;

  return (
    <div className="max-w-7xl mx-auto p-4">
      <h2 className="text-2xl font-semibold mb-4">Find Ticket</h2>

      {/* Filters Section */}
      <div className="bg-gray-50 p-4 rounded-2xl shadow mb-6 grid md:grid-cols-4 gap-3">
        <input
          type="text"
          name="from"
          placeholder="From Station"
          value={filters.from}
          onChange={handleFilterChange}
          className="border rounded-lg px-3 py-2 w-full"
        />
        <input
          type="text"
          name="to"
          placeholder="To Station"
          value={filters.to}
          onChange={handleFilterChange}
          className="border rounded-lg px-3 py-2 w-full"
        />
        <input
          type="date"
          name="date"
          value={filters.date}
          onChange={handleFilterChange}
          className="border rounded-lg px-3 py-2 w-full"
        />
        <button
          onClick={handleSearch}
          disabled={searching}
          className="bg-blue-600 text-white rounded-lg px-4 py-2 hover:bg-blue-700 transition"
        >
          {searching ? "Searching..." : "Search"}
        </button>
      </div>

      {/* Tickets Section */}
      {tickets.length === 0 ? (
        <p className="text-center text-gray-500">No tickets found</p>
      ) : (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {tickets.map((t) => (
            <div
              key={t._id}
              className="border rounded-2xl p-4 shadow-sm hover:shadow-md transition"
            >
              <p className="font-semibold text-lg">
                {t.trainName} ({t.trainNumber})
              </p>
              <p>
                {t.from} → {t.to}
              </p>
              <p>
                <strong>Class:</strong> {t.classType}
              </p>
              <p>
                <strong>Passenger:</strong> {t.passengerName}
              </p>
              <p>
                <strong>Contact:</strong>{" "}
                {t.contactUnlocked ? t.contactNumber : "Locked 🔒"}
              </p>

              {!t.contactUnlocked && (
                <div className="mt-3 border-t pt-3">
                  <p className="font-semibold mb-1">Unlock Contact</p>
                  <input
                    type="text"
                    placeholder="Txn ID"
                    className="w-full mb-2 border rounded px-2 py-1"
                    onChange={(e) =>
                      handleInput(t._id, "txnId", e.target.value)
                    }
                  />
                  <input
                    type="text"
                    placeholder="Payer Name"
                    className="w-full mb-2 border rounded px-2 py-1"
                    onChange={(e) =>
                      handleInput(t._id, "payerName", e.target.value)
                    }
                  />
                  <input
                    type="text"
                    placeholder="Payer Mobile"
                    className="w-full mb-2 border rounded px-2 py-1"
                    onChange={(e) =>
                      handleInput(t._id, "payerMobile", e.target.value)
                    }
                  />
                  <input
                    type="number"
                    placeholder="Amount"
                    className="w-full mb-2 border rounded px-2 py-1"
                    onChange={(e) =>
                      handleInput(t._id, "amount", e.target.value)
                    }
                  />
                  <button
                    disabled={submitting}
                    onClick={() => handleUnlock(t._id)}
                    className="bg-green-600 text-white px-3 py-1 rounded hover:bg-green-700"
                  >
                    {submitting ? "Submitting..." : "Submit"}
                  </button>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default FindTicket;

