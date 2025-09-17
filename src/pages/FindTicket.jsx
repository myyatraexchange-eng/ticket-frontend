import React, { useEffect, useState } from "react";
import { Helmet } from "react-helmet-async";
import Loader from "../components/Loader"; 
import stations from "../data/stations.json";

const API_BASE =
  process.env.REACT_APP_API_BASE_URL ||
  "https://ticket-backend-g5da.onrender.com/api";

const FindTicket = () => {
  const [tickets, setTickets] = useState([]);
  const [filteredTickets, setFilteredTickets] = useState([]);
  const [fromFilter, setFromFilter] = useState("");
  const [toFilter, setToFilter] = useState("");
  const [dateTimeFilter, setDateTimeFilter] = useState("");
  const [loading, setLoading] = useState(true);
  const [unlocking, setUnlocking] = useState(false);

  const [searchParams, setSearchParams] = useState({
    from: "",
    to: "",
    fromDateTime: "",
  });

  // ✅ Pagination state
  const [visibleCount, setVisibleCount] = useState(6);

  useEffect(() => {
    const fetchTickets = async () => {
      try {
        setLoading(true);
        const res = await fetch(`${API_BASE}/tickets`);
        if (!res.ok) throw new Error(`Failed to fetch tickets: ${res.status}`);
        const data = await res.json();
        setTickets(data || []);
        setFilteredTickets(data || []);
      } catch (err) {
        console.error("Error fetching tickets:", err);
        setTickets([]);
        setFilteredTickets([]);
      } finally {
        setLoading(false);
      }
    };
    fetchTickets();
  }, []);

  useEffect(() => {
    const filtered = tickets.filter((ticket) => {
      const from = ticket.from?.toLowerCase() || "";
      const to = ticket.to?.toLowerCase() || "";
      const ticketDateTime = ticket.fromDateTime
        ? new Date(ticket.fromDateTime).toISOString().slice(0, 16) // yyyy-MM-ddTHH:mm
        : "";

      const matchesFrom = searchParams.from
        ? from === searchParams.from.toLowerCase()
        : true;
      const matchesTo = searchParams.to
        ? to === searchParams.to.toLowerCase()
        : true;
      const matchesDateTime = searchParams.fromDateTime
        ? ticketDateTime.startsWith(searchParams.fromDateTime)
        : true;

      return matchesFrom && matchesTo && matchesDateTime;
    });

    setFilteredTickets(filtered);
    setVisibleCount(6); // ✅ Reset pagination when filters change
  }, [searchParams, tickets]);

  const handleSearch = () => {
    setSearchParams({
      from: fromFilter,
      to: toFilter,
      fromDateTime: dateTimeFilter,
    });
  };

  const handlePayment = async (ticketId) => {
    try {
      setUnlocking(true);
      const res = await fetch(`${API_BASE}/payment/create-order`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ amount: 20 }),
      });

      const order = await res.json();
      if (!order || !order.id) {
        alert("Order creation failed!");
        setUnlocking(false);
        return;
      }

      const options = {
        key: process.env.REACT_APP_RAZORPAY_KEY_ID,
        amount: order.amount,
        currency: order.currency,
        order_id: order.id,
        name: "MyYatraExchange",
        description: "Unlock Contact Number",
        handler: async function (response) {
          try {
            const verifyRes = await fetch(`${API_BASE}/payment/verify`, {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({
                ...response,
                ticketId,
              }),
            });

            const result = await verifyRes.json();
            if (verifyRes.ok) {
              setTickets((prev) =>
                prev.map((t) =>
                  t._id === ticketId ? { ...t, contactVisible: true } : t
                )
              );
              setFilteredTickets((prev) =>
                prev.map((t) =>
                  t._id === ticketId ? { ...t, contactVisible: true } : t
                )
              );
              alert("Contact unlocked successfully!");
            } else {
              alert(result.message || "Payment verification failed!");
            }
          } catch (err) {
            console.error("Verify Error:", err);
            alert("Error verifying payment!");
          } finally {
            setUnlocking(false);
          }
        },
        prefill: {
          name: "Demo User",
          email: "demo@example.com",
          contact: "9999999999",
        },
        theme: { color: "#3399cc" },
      };

      const rzp = new window.Razorpay(options);
      rzp.open();
    } catch (err) {
      console.error("Payment Error:", err);
      alert("Something went wrong during payment.");
      setUnlocking(false);
    }
  };

  const fromStations = stations?.stations || [];
  const toStations = stations?.stations || [];

  return (
    <div className="max-w-6xl mx-auto px-4 py-6">
      <Helmet>
        <title>Find Train Tickets | MyYatraExchange</title>
      </Helmet>

      <h2 className="text-3xl font-bold mb-6 text-center text-blue-600">
        Find Your Ticket
      </h2>

      {/* Filters */}
      <div className="grid gap-4 md:grid-cols-4 mb-6">
        <input
          list="fromStationsList"
          placeholder="From"
          className="border p-2 rounded"
          value={fromFilter}
          onChange={(e) => setFromFilter(e.target.value)}
        />
        <datalist id="fromStationsList">
          {fromStations.map((station) => (
            <option key={station} value={station} />
          ))}
        </datalist>

        <input
          list="toStationsList"
          placeholder="To"
          className="border p-2 rounded"
          value={toFilter}
          onChange={(e) => setToFilter(e.target.value)}
        />
        <datalist id="toStationsList">
          {toStations.map((station) => (
            <option key={station} value={station} />
          ))}
        </datalist>

        {/* ✅ Calendar + Watch (date + time + AM/PM) */}
        <input
          type="datetime-local"
          value={dateTimeFilter}
          onChange={(e) => setDateTimeFilter(e.target.value)}
          className="border p-2 rounded"
        />

        <button
          onClick={handleSearch}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
        >
          Search
        </button>
      </div>

      {/* Tickets List */}
      {loading ? (
        <Loader message="Fetching tickets..." />
      ) : filteredTickets.length === 0 ? (
        <p className="text-center text-red-600 font-medium">
          No matching tickets found
        </p>
      ) : (
        <>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {filteredTickets.slice(0, visibleCount).map((ticket) => (
              <div
                key={ticket._id}
                className="bg-white shadow-md rounded p-4 border hover:shadow-xl transition"
              >
                <h3 className="font-semibold text-lg text-blue-600">
                  {ticket.trainName} ({ticket.trainNumber})
                </h3>
                <p>
                  <strong>From → To:</strong> {ticket.from} → {ticket.to}
                </p>
                <p>
                  <strong>Departure:</strong>{" "}
                  {ticket.fromDateTime
                    ? new Date(ticket.fromDateTime).toLocaleString()
                    : "N/A"}
                </p>
                <p>
                  <strong>Arrival:</strong>{" "}
                  {ticket.toDateTime
                    ? new Date(ticket.toDateTime).toLocaleString()
                    : "N/A"}
                </p>
                <p>
                  <strong>Tickets:</strong> {ticket.ticketCount}
                </p>
                <p>
                  <strong>Class:</strong> {ticket.seatType}
                </p>
                <p>
                  <strong>Passenger:</strong> {ticket.holderName} ({ticket.gender},{" "}
                  {ticket.age})
                </p>

                <p>
                  {ticket.contactVisible ? (
                    <span className="text-green-600 font-semibold">
                      Contact: {ticket.contactNumber}
                    </span>
                  ) : unlocking ? (
                    <Loader message="Unlocking contact..." />
                  ) : (
                    <button
                      onClick={() => handlePayment(ticket._id)}
                      className="bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-700 transition"
                    >
                      Pay ₹20 to Unlock Contact
                    </button>
                  )}
                </p>
              </div>
            ))}
          </div>

          {/* Load More Button */}
          {visibleCount < filteredTickets.length && (
            <div className="text-center mt-6">
              <button
                onClick={() => setVisibleCount((prev) => prev + 6)}
                className="bg-gray-700 text-white px-6 py-2 rounded hover:bg-gray-800 transition"
              >
                Load More
              </button>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default FindTicket;

