// pages/ind-vs-pak.js
import Head from "next/head";
import Image from "next/image";
import React from "react";

export default function IndVsPakBlog() {
  const title =
    "India vs Pakistan — ICC Men’s T20 World Cup 2026 | R. Premadasa Stadium Colombo Guide";
  const description =
    "India vs Pakistan T20 World Cup 2026 match guide: Tickets, how to reach R. Premadasa Stadium Colombo, entry rules, fan tips, nearby hotels, and full match-day information.";
  const pageUrl = "https://yourwebsite.com/ind-vs-pak"; // <-- Replace with your real URL

  // 🔥 Correct image paths for /public/thumbnails/
  const imageHero = "/thumbnails/indvspak.webp";
  const imageFlag = "/thumbnails/India-vs-Pakistanfleg.webp";
  const imageStadium = "/thumbnails/stadium.webp";

  const jsonLdEvent = {
    "@context": "https://schema.org",
    "@type": "SportsEvent",
    name: "India vs Pakistan - ICC Men's T20 World Cup 2026",
    startDate: "2026-02-15T19:00:00+05:30",
    url: pageUrl,
    image: [pageUrl + imageHero],
    location: {
      "@type": "Place",
      name: "R. Premadasa Stadium",
      address: {
        "@type": "PostalAddress",
        streetAddress: "Khettarama Road",
        addressLocality: "Colombo",
        addressCountry: "LK",
      },
    },
    performer: [
      { "@type": "SportsTeam", name: "India" },
      { "@type": "SportsTeam", name: "Pakistan" },
    ],
  };

  return (
    <>
      <Head>
        <title>{title}</title>
        <meta name="description" content={description} />

        {/* Canonical URL */}
        <link rel="canonical" href={pageUrl} />

        {/* OpenGraph */}
        <meta property="og:type" content="article" />
        <meta property="og:title" content={title} />
        <meta property="og:description" content={description} />
        <meta property="og:url" content={pageUrl} />
        <meta property="og:image" content={pageUrl + imageHero} />

        {/* Twitter Card */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={title} />
        <meta name="twitter:description" content={description} />
        <meta name="twitter:image" content={pageUrl + imageHero} />

        {/* Structured Data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdEvent) }}
        />

        {/* Inline Styles */}
        <style>{`
          :root{--accent:#0b58a8;--muted:#666;}
          body{font-family:Inter, sans-serif;margin:0;}
          .container{max-width:980px;margin:28px auto;padding:18px;}
          .hero{display:flex;flex-wrap:wrap;gap:20px;}
          .hero-text{flex:1;min-width:280px;}
          .side-card{width:320px;min-width:260px;}
          .card{background:#fff;padding:18px;border-radius:10px;box-shadow:0 4px 14px rgba(0,0,0,0.05);}
          h1{font-size:28px;margin-bottom:6px;color:#0b2545;}
          h2{font-size:20px;margin-bottom:6px;color:#0b2545;}
          h3{margin-top:10px;}
          p{line-height:1.55;margin-bottom:10px;color:#222;}
          ul{margin:10px 0 12px 20px;}
          .btn{display:inline-block;margin-top:10px;padding:10px 14px;background:var(--accent);color:#fff;border-radius:8px;text-decoration:none;}
          .grid{display:grid;grid-template-columns:1fr 320px;gap:20px;margin-top:20px;}
          @media(max-width:900px){.grid{grid-template-columns:1fr;}.side-card{width:100%;}}
        `}</style>
      </Head>

      <main className="container">
        {/* HERO SECTION */}
        <div className="hero">
          <div className="hero-text">
            <h1>India vs Pakistan — T20 World Cup 2026 (Group A)</h1>
            <p style={{ color: "var(--muted)" }}>
              Sunday, 15 February 2026 • 7:00 PM Local • Colombo
            </p>

            <div className="card">
              <Image
                src={imageHero}
                alt="India vs Pakistan T20 World Cup 2026 thumbnail"
                width={1200}
                height={675}
                style={{ width: "100%", borderRadius: 8 }}
                priority
              />
            </div>
          </div>

          {/* Right Side Card */}
          <aside className="side-card card">
            <Image
              src={imageFlag}
              alt="India vs Pakistan flag graphic"
              width={300}
              height={200}
              style={{ width: "100%", borderRadius: 8 }}
            />

            <p style={{ marginTop: 10 }}>
              <strong>Match:</strong> India vs Pakistan (Group A)  
              <br />
              <strong>Venue:</strong> R. Premadasa Stadium, Colombo
            </p>

            <a
              href="https://www.icc-cricket.com/tournaments/mens-t20-world-cup-2026"
              className="btn"
              target="_blank"
            >
              Official ICC Info
            </a>
          </aside>
        </div>

        {/* MAIN GRID */}
        <div className="grid">
          {/* ARTICLE */}
          <article>
            {/* Venue Section */}
            <section className="card">
              <h2>Venue Details — R. Premadasa Stadium</h2>

              <Image
                src={imageStadium}
                alt="R. Premadasa Stadium Colombo"
                width={1000}
                height={600}
                style={{ width: "100%", borderRadius: 8, marginTop: 10 }}
              />

              <ul>
                <li><strong>Address:</strong> Khettarama Road, Colombo</li>
                <li><strong>Capacity:</strong> 35,000 approx.</li>
                <li><strong>Pitch:</strong> Batting-friendly + dew factor</li>
                <li><strong>Lighting:</strong> Full floodlights</li>
              </ul>
            </section>

            {/* Travel Section */}
            <section className="card">
              <h2>How to Reach the Stadium</h2>
              <p>Colombo match day par bahut rush hota hai — tuk-tuk or cab best options hain.</p>

              <h3>By Cab (PickMe / Uber)</h3>
              <p>Drop: Main Gate — Khettarama Road. Surge possible.</p>

              <h3>By Tuk-Tuk</h3>
              <p>Fastest for short distances. Meter on karwana.</p>

              <h3>By Bus</h3>
              <p>Stop: Khettarama Stadium Bus Stop.</p>

              <h3>By Car</h3>
              <p>Parking limited — avoid driving.</p>
            </section>

            {/* Tickets Section */}
            <section className="card">
              <h2>Tickets — Where & How to Buy</h2>
              <p>Tickets sirf official ICC portal par milenge. WhatsApp/agents = scam.</p>

              <h3>Categories</h3>
              <ul>
                <li>General Stand</li>
                <li>Premium</li>
                <li>Pavilion End</li>
                <li>Hospitality</li>
              </ul>

              <h3>Booking Tips</h3>
              <ul>
                <li>ICC account pehle se bana lo.</li>
                <li>International card ready rakho.</li>
                <li>QR code offline save karo.</li>
                <li>Tickets fast sell out — multiple devices use karo.</li>
              </ul>
            </section>

            {/* Entry Rules */}
            <section className="card">
              <h2>Stadium Entry Rules</h2>
              <div style={{ display: "flex", gap: 20 }}>
                <div>
                  <h3>Allowed</h3>
                  <ul>
                    <li>Mobile phone</li>
                    <li>Sling bag</li>
                    <li>Sealed water bottle</li>
                  </ul>
                </div>
                <div>
                  <h3>Not Allowed</h3>
                  <ul>
                    <li>Backpacks</li>
                    <li>Food & drinks</li>
                    <li>Power banks</li>
                    <li>Lighters, vapes</li>
                  </ul>
                </div>
              </div>
            </section>

            {/* Fan Tips */}
            <section className="card">
              <h2>Fan Tips</h2>
              <ul>
                <li>Gates 2 hours pehle open — jaldi jao.</li>
                <li>Network weak — QR offline rakho.</li>
                <li>Tuk-tuk fastest exit option.</li>
                <li>Light clothes pehno — humidity high.</li>
              </ul>
            </section>
          </article>

          {/* SIDEBAR */}
          <aside className="card">
            <h3>Quick Facts</h3>
            <p><strong>Match:</strong> India vs Pakistan</p>
            <p><strong>Date:</strong> 15 Feb 2026</p>
            <p><strong>Venue:</strong> Colombo, Sri Lanka</p>

            <h3>SEO Keywords</h3>
            <p style={{ color: "var(--muted)" }}>
              IND vs PAK 2026, India vs Pakistan tickets, R Premadasa Stadium, Colombo match guide, T20 World Cup 2026
            </p>
          </aside>
        </div>

        <footer style={{ marginTop: 30, color: "#777", fontSize: 14, textAlign: "center" }}>
          © 2026 — Ronnu’s Trending Blog • ICC Men’s T20 World Cup Guide
        </footer>
      </main>
    </>
  );
}

