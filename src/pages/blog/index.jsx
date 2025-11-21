import { Link } from "react-router-dom";

export default function BlogIndex() {
  const blogs = [
    {
      title: "IRCTC Ticket Confirm Kaise Kare? (100% Working Tips)",
      slug: "seat-confirm",
      desc: "Train ticket confirm nahi ho raha? MyYatraExchange ke through confirm ticket pane ka best smart trick.",
      color: "text-blue-600",
    },
    {
      title: "Tatkal Ticket Fast Booking Guide – Working Formula",
      slug: "tatkal-fast",
      desc: "Tatkal 10 baje full ho jata hai? Yaha fast booking ka real solution + confirm seat ka alternative.",
      color: "text-orange-600",
    },
    {
      title: "Unused Ticket Ka Paisa Kaise Bachayein? Full Guide",
      slug: "unused-ticket",
      desc: "Agar extra ticket book ho gaya ya travel plan cancel ho gaya ho to yaha paisa loss se bacho.",
      color: "text-purple-600",
    },
    {
      title: "Waiting Ticket Confirm Hoga? Cancel Karein? Full Guide",
      slug: "waiting-cancel",
      desc: "Waiting ticket risky hota hai — yaha best solution + confirm ticket ka smart backup.",
      color: "text-red-600",
    },
  ];

  return (
    <div className="max-w-4xl mx-auto p-6 text-gray-800">
      <h1 className="text-3xl md:text-4xl font-bold mb-6 text-green-700">
        MyYatraExchange – Best Travel Blogs & IRCTC Smart Tips
      </h1>

      <p className="mb-8 text-lg text-gray-700">
        Yaha aapko milenge India ke sabse helpful travel blogs —
        <strong className="text-green-700"> IRCTC tricks, confirm ticket solutions, Tatkal hacks,</strong>
        aur paise bachane ke smart methods.
      </p>

      <div className="grid md:grid-cols-2 gap-6">
        {blogs.map((blog, index) => (
          <div
            key={index}
            className="p-5 border rounded-xl shadow hover:shadow-lg bg-white transition"
          >
            <h2 className={`text-xl font-bold mb-2 ${blog.color}`}>
              {blog.title}
            </h2>

            <p className="text-gray-600 mb-4">{blog.desc}</p>

            <Link
              to={`/blog/${blog.slug}`}
              className="text-blue-600 font-semibold underline"
            >
              Read More →
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}

