import React from "react";
import { Link } from "react-router-dom";

const blogs = [
  /* ⭐ NEW TRENDING BLOG — Aravalli Hills ---------------------------------- */
  {
    title:
      "Aravalli Hills Controversy 2025: Kya Hum Apni Sabse Purani Dharohar Kho Rahe Hain? | Guru Shikhar Travel Guide",
    link: "/blog/aravalli-hills-controversy-2025",
    tag: "🔥 Trending",
    desc:
      "Aravalli Hills news 2025: mining controversy, Supreme Court & NGT updates, Guru Shikhar Mount Abu travel guide aur confirm train ticket ka smart solution.",
    thumbnail: "/thumbnails/Aravallith.webp",
  },

  /* ⭐ NEW TRENDING BLOG — IPL MINI AUCTION ---------------------------------- */
  {
    title:
      "IPL Mini Auction 2025 Today: 77 Players, ₹237.55 Crore Purse & Full Analysis",
    link: "/blog/ipl-mini-auction-2025",
    tag: "🔥 Trending",
    desc:
      "IPL Mini Auction 2025 आज 2:30 बजे से। 77 खिलाड़ियों पर बोली, ₹237.55 करोड़ का पर्स और मुंबई इंडियंस का सबसे छोटा बजट – पूरी जानकारी हिंदी में।",
    thumbnail: "/thumbnails/ipl-mini-auction-2025.webp",
  },

  /* ⭐ NEW TRENDING BLOG — India vs Pakistan ---------------------------------- */
  {
    title:
      "India vs Pakistan T20 World Cup 2026 – Colombo Stadium Guide, Tickets, Travel & Match Info",
    link: "/blog/ind-vs-pak",
    tag: "🔥 Trending",
    desc:
      "India vs Pakistan (15 Feb 2026) – R. Premadasa Stadium ka full guide: tickets, travel, entry rules, fan tips & match-day hacks.",
    thumbnail: "/thumbnails/indvspak.webp",
  },

  /* ⭐ Waiting List MAIN BLOG (NEW ADD) ---------------------------------- */
  {
    title:
      "Waiting List Ticket Confirm Kaise Kare? (WL Ticket Alternative Guide 2025)",
    link: "/blog/waiting-list-ticket-confirm",
    tag: "🔥 Must Read",
    desc:
      "WL ticket confirm hone ke chances, chart rules aur agar waiting clear na ho to confirmed ticket ka best alternative.",
    thumbnail: "/thumbnails/wlthambnail1.webp",
  },

  /* ⭐ Existing Trending Blog — Dhurandhar ---------------------------------- */
  {
    title:
      "Dhurandhar Movie Shooting Spots: Thailand to Mumbai — Full Travel + Train Route Breakdown (8.1/10 Review)",
    link: "/blog/dhurandhar-movie-shooting-location-train-guide",
    tag: "🔥 Trending",
    desc:
      "Dhurandhar (2025) ki shooting locations – Thailand, Amritsar, Mumbai & Madh Island ke travel + train route guide ke saath.",
    thumbnail: "/thumbnails/dhurandhar-thumbnail.webp",
  },

  /* ⭐ Existing Trending Blog — Indigo ---------------------------------- */
  {
    title:
      "Indigo Share Price Today: Flight Cancel होने से Stock पर क्या असर पड़ा? और Train में Confirm Seat कैसे पाएं?",
    link: "/blog/indigo-share-price-flight-cancel-train-seat",
    tag: "🔥 Trending",
    desc:
      "Indigo share price, flight cancellations, DGCA rules ka simple breakdown – aur urgent situation me train me confirm seat kaise milega?",
    thumbnail: "/thumbnails/indigo-thumbnail.jpg",
  },

  /* OLD BLOGS ---------------------------------- */
  {
    title: "IRCTC Ticket Confirm Kaise Kare? (MyYatraExchange Special Tricks)",
    link: "/blog/seat-confirm",
    tag: "Ticket Tips",
    desc:
      "Confirm ticket chahiye? MyYatraExchange ke smart system se confirmation 3x easy ho jata hai.",
    thumbnail: "/thumbnails/default.jpg",
  },
  {
    title: "Unused / Extra Ticket cancel karne ke loss se kaise bache?",
    link: "/blog/unused-ticket",
    tag: "Save Money",
    desc:
      "Cancellation me heavy charges lagte hain. MyYatraExchange par post karke paisa bachaye.",
    thumbnail: "/thumbnails/default.jpg",
  },
  {
    title: "Waiting Ticket Confirm / Cancel Process – MyYatraExchange Guide",
    link: "/blog/waiting-cancel",
    tag: "Waiting Tips",
    desc:
      "Waiting risky hota hai. MyYatraExchange se real confirmed tickets mil jate hain.",
    thumbnail: "/thumbnails/default.jpg",
  },
  {
    title: "Train Seat Availability Check – MyYatraExchange Method",
    link: "/blog/seat-availability",
    tag: "Availability",
    desc:
      "IRCTC seat availability ka fastest shortcut — real passengers ke posted confirmed tickets.",
    thumbnail: "/thumbnails/default.jpg",
  },

  /* NEW INFO BLOGS ---------------------------------- */
  {
    title: "RAC Ticket Kya Hota Hai? Confirm Hoga Ya Nahi?",
    link: "/blog/rac-guide",
    tag: "RAC Guide",
    desc:
      "RAC seat, berth, confirmation chances aur MyYatraExchange ke real solutions ka full guide.",
    thumbnail: "/thumbnails/default.jpg",
  },
  {
    title: "GNWL vs PQWL vs RLWL – Kaunsa Confirm Hota Hai?",
    link: "/blog/wl-compare",
    tag: "WL Info",
    desc:
      "Waiting list ke types aur unke confirmation chances — GNWL sabse strong hota hai.",
    thumbnail: "/thumbnails/default.jpg",
  },
  {
    title: "PNR Status Check Kaise Kare? (Smart Guide 2025)",
    link: "/blog/pnr-guide",
    tag: "PNR Guide",
    desc:
      "PNR status dekhne ka simple method aur agar waiting ho to kya karna chahiye.",
    thumbnail: "/thumbnails/default.jpg",
  },
  {
    title: "Train Ka Chart Kab Banta Hai? (Chart Preparation Time)",
    link: "/blog/chart-time",
    tag: "Chart Info",
    desc:
      "Chart banne ke rules, timing aur chart ke baad tickets ka kya hota hai — full explanation.",
    thumbnail: "/thumbnails/default.jpg",
  },
];

export default function BlogIndex() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <h1 className="text-4xl font-bold text-gray-900 mb-6 text-center">
        📚 Latest Blogs – MyYatraExchange
      </h1>

      <p className="text-lg text-gray-600 mb-10 text-center">
        Train tickets se related sabhi important guides, tips & smart solutions ek jagah.
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {blogs.map((blog, i) => (
          <Link
            key={i}
            to={blog.link}
            className="bg-white shadow-lg rounded-2xl border hover:shadow-2xl transition duration-300 overflow-hidden"
          >
            <img
              src={blog.thumbnail}
              alt={blog.title}
              className="w-full h-44 object-cover"
              loading="lazy"
            />

            <div className="p-6">
              <span className="bg-blue-600 text-white text-xs px-3 py-1 rounded-full shadow-sm">
                {blog.tag}
              </span>

              <h2 className="text-xl font-bold mt-4 text-gray-900">
                {blog.title}
              </h2>

              <p className="text-gray-600 mt-2 text-sm">
                {blog.desc}
              </p>

              <span className="mt-4 inline-block text-blue-700 font-semibold underline text-sm">
                Read More →
              </span>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}

