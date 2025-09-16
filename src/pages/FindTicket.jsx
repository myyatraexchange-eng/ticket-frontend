import React, { useEffect, useState } from "react";
import { Helmet } from "react-helmet-async";
import Loader from "../components/Loader"; // reusable loader import

// Backend URL
const API_BASE =
  process.env.REACT_APP_API_BASE_URL ||
  "https://ticket-backend-g5da.onrender.com/api";

// Station list JSON
import stations from "../data/stations.json";

const FindTicket = () => {
  const [tickets, setTickets] = useState([]);
  const [filteredTickets, setFilteredTickets] = useState([]);
  const [fromFilter, setFromFilter] = useState("");
  const [toFilter, setToFilter] = useState("");
  const [dateFilter, setDateFilter] = useState("");
  const [loading, setLoading] = useState(true);
  const [unlocking, setUnlocking] = useState(false); // unlocking state

  const [searchParams, setSearchParams] = useState({
    from: "",
    to: "",
    date: "",
  });

  // 🔹 Tickets fetch karna
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

  // 🔹 Filters apply karna
  useEffect(() => {
    const filtered = tickets.filter((ticket) => {
      const from = ticket.from?.toLowerCase() || "";
      const to = ticket.to?.toLowerCase() || "";
      const ticketDate = ticket.date
        ? new Date(ticket.date).toISOString().slice(0, 10)
        : "";

      const matchesFrom = searchParams.from
        ? from === searchParams.from.toLowerCase()
        : true;
      const matchesTo = searchParams.to
        ? to === searchParams.to.toLowerCase()
        : true;
      const matchesDate = searchParams.date
        ? ticketDate === searchParams.date
        : true;

      return matchesFrom && matchesTo && matchesDate;
    });

    setFilteredTickets(filtered);
  }, [searchParams, tickets]);

  // 🔹 Search button
  const handleSearch = () => {
    setSearchParams({
      from: fromFilter,
      to: toFilter,
      date: dateFilter,
    });
  };

  // 🔹 Razorpay Payment + Unlock logic
  const handlePayment = async (ticketId) => {
    try {
      setUnlocking(true); // loader on
      // ✅ Step 1: backend se order create
      const res = await fetch(`${API_BASE}/payment/create-order`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ amount: 20 }), // ₹20
      });

      const order = await res.json();
      if (!order || !order.id) {
        alert("Order creation failed!");
        setUnlocking(false);
        return;
      }

      // ✅ Step 2: Razorpay open
      const options = {
        key: process.env.REACT_APP_RAZORPAY_KEY_ID,
        amount: order.amount,
        currency: order.currency,
        order_id: order.id,
        name: "MyYatraExchange",
        description: "Unlock Contact Number",
        handler: async function (response) {
          try {
            // ✅ Step 3: payment verify
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
              // ✅ Update ticket frontend me
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
            setUnlocking(false); // loader off
          }
        },
        prefill: {
          name: "Demo User",
          email: "demo@example.com",
          contact: "9999999999",
        },
        theme: {
          color: "#3399cc",
        },
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
      {/* 🔹 SEO Helmet */}
      <Helmet>
        <title>Find Train Tickets | MyYatraExchange</title>
        <meta
          name="description"
          content="Search and find confirmed train tickets easily on MyYatraExchange."
        />
        <meta
          name="keywords"
          content="train tickets, find train ticket, confirmed train tickets, Indian Railways, MyYatraExchange"
        />
      </Helmet>

      <h2 className="text-3xl font-bold mb-6 text-center text-blue-600">
        Find Your Ticket
      </h2>

      {/* 🔹 Filters */}
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

        <input
          type="date"
          value={dateFilter}
          onChange={(e) => setDateFilter(e.target.value)}
          className="border p-2 rounded"
        />

        <button
          onClick={handleSearch}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
        >
          Search
        </button>
      </div>

      {/* 🔹 Tickets List */}
      {loading ? (
        <Loader message="Fetching tickets..." />
      ) : filteredTickets.length === 0 ? (
        <p className="text-center text-red-600 font-medium">
          No matching tickets found
        </p>
      ) : (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {filteredTickets.map((ticket) => (
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
                <strong>Date:</strong>{" "}
                {ticket.date
                  ? new Date(ticket.date).toLocaleDateString()
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

              {/* 🔹 Contact unlock logic */}
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
      )}
    </div>
  );
};

export default FindTicket;

