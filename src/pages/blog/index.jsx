import React from "react";
import { Link } from "react-router-dom";

const BlogHome = () => {
  const blogs = [
    {
      title: "IRCTC Seat Confirm Karne Ke Best Tricks",
      link: "/blog/seat-confirm",
      description: "Train seat confirm karne ka best method – full guide.",
    },
    {
      title: "IRCTC Tatkal Ticket Fast Booking Tips",
      link: "/blog/tatkal-fast",
      description: "Tatkal ticket jaldi kaise book kare – top fast tricks.",
    },
    {
      title: "Unused Ticket Ka Refund Kaise Milega?",
      link: "/blog/unused-ticket",
      description: "Unused ticket ka refund rule, process aur important tips.",
    },
    {
      title: "Waiting Ticket Cancel & Refund Full Guide",
      link: "/blog/waiting-cancel",
      description: "Waiting ticket cancel karne ka tarika & refund details.",
    },
  ];

  return (
    <div className="max-w-4xl mx-auto py-10 px-4">
      <h1 className="text-3xl font-bold mb-6 text-center">Travel & IRCTC Blog</h1>

      <div className="space-y-6">
        {blogs.map((blog, index) => (
          <div key={index} className="p-4 border rounded shadow-sm hover:shadow-md transition">
            <h2 className="text-xl font-semibold">
              <Link to={blog.link} className="text-blue-600 hover:underline">
                {blog.title}
              </Link>
            </h2>

            <p className="text-gray-700 mt-1">{blog.description}</p>

            <Link
              to={blog.link}
              className="text-blue-500 mt-2 inline-block hover:underline"
            >
              Read More →
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BlogHome;

