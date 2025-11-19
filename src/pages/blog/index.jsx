import React from "react";
import { Link } from "react-router-dom";

const BlogIndex = () => {
  // Yaha future me blog list API se aa sakti hai,
  // filhal static list rakh rahe hain.
  const blogs = [
    {
      title: "Unused Train Ticket Sell Kaise Kare? (2025 Latest Guide)",
      slug: "unused-train-ticket-sell",
      description:
        "IRCTC unused train tickets ko legal & safe tarike se sell ya exchange ka best तरीका.",
    },
    {
      title: "Tatkal Ticket Fast Kaise Book Kare? (2025 New Trick)",
      slug: "tatkal-ticket-tips-2025",
      description:
        "2025 ke naye tatkal rules, fastest booking trick aur confirm seat tips.",
    },
    {
      title: "Train Seat Confirm Karne Ka No.1 Hack (Guaranteed Tips)",
      slug: "train-seat-confirm-hack",
      description:
        "Waiting list aur RAC se confirm seat pane ka best tested hack.",
    },
    {
      title: "IRCTC Cancellation Charges Kaise Bachaye? (Smart Tips)",
      slug: "irctc-cancellation-tips",
      description:
        "IRCTC cancellation fees kaise kam kare ya zero kare — complete guide.",
    },
  ];

  return (
    <div style={{ padding: "20px", maxWidth: "900px", margin: "auto" }}>
      <h1 style={{ fontSize: "32px", marginBottom: "20px" }}>Latest Blog Posts</h1>

      {blogs.map((blog) => (
        <div
          key={blog.slug}
          style={{
            background: "#fff",
            padding: "20px",
            borderRadius: "10px",
            marginBottom: "20px",
            boxShadow: "0 2px 10px rgba(0,0,0,0.1)",
          }}
        >
          <h2 style={{ fontSize: "24px" }}>{blog.title}</h2>
          <p style={{ margin: "10px 0" }}>{blog.description}</p>

          <Link
            to={`/blog/${blog.slug}`}
            style={{
              display: "inline-block",
              marginTop: "10px",
              padding: "8px 16px",
              background: "#1976D2",
              color: "white",
              borderRadius: "6px",
              textDecoration: "none",
            }}
          >
            Read More →
          </Link>
        </div>
      ))}
    </div>
  );
};

export default BlogIndex;

