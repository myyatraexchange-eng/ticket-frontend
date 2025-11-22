import React from "react";
import { Link } from "react-router-dom";

const blogs = [
  {
    title: "IRCTC Ticket Confirm Kaise Kare? (MyYatraExchange Special Tricks)",
    link: "/blog/seat-confirm",
    tag: "Ticket Tips",
    desc:
      "Confirm ticket chahiye? MyYatraExchange ke smart system se confirmation 3x easy ho jata hai.",
  },
  {
    title: "Tatkal Ticket Fast Booking – MyYatraExchange का Real Solution",
    link: "/blog/tatkal-fast",
    tag: "Tatkal Guide",
    desc:
      "Tatkal full ho jata hai? MyYatraExchange par log extra tickets post karte hain.",
  },
  {
    title: "Unused / Extra Ticket cancel karne ke loss se kaise bache?",
    link: "/blog/unused-ticket",
    tag: "Save Money",
    desc:
      "Cancellation me heavy charges lagte hain. MyYatraExchange par post karke paisa bachaye.",
  },
  {
    title: "Waiting Ticket Confirm / Cancel Process – MyYatraExchange Guide",
    link: "/blog/waiting-cancel",
    tag: "Waiting Tips",
    desc:
      "Waiting risky hota hai. MyYatraExchange se real confirmed tickets mil jate hain.",
  },
];

export default function BlogIndex() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <h1 className="text-4xl font-bold text-gray-900 mb-6 text-center">
        📚 Latest Blogs – MyYatraExchange
      </h1>

      <p className="text-lg text-gray-600 mb-10 text-center">
        Train tickets se related sabhi important guides, tricks aur smart solutions ek jagah.
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {blogs.map((blog, i) => (
          <Link
            key={i}
            to={blog.link}
            className="bg-white shadow-lg p-6 rounded-2xl border hover:shadow-xl transition duration-300"
          >
            <span className="bg-blue-600 text-white text-xs px-3 py-1 rounded-full">
              {blog.tag}
            </span>

            <h2 className="text-xl font-bold mt-4 text-gray-900">{blog.title}</h2>

            <p className="text-gray-600 mt-2 text-sm">{blog.desc}</p>

            <button className="mt-4 text-blue-700 font-semibold underline text-sm">
              Read More →
            </button>
          </Link>
        ))}
      </div>
    </div>
  );
}

