import Navbar from "../../../components/navbar/Navbar";
import Footer from "../../../components/footer/Footer";
import { FaClock, FaArrowRight, FaTruck, FaMotorcycle, FaBuilding, FaSearch } from "react-icons/fa";
import FadeUp from "../../../components/animations/FadeUp";
import ScaleUp from "../../../components/animations/ScaleUp";

const BLOGS = [
  {
    title: "Future of Smart Deliveries in India",
    category: "Logistics",
    mins: 5,
    author: "Rahul Sharma",
    date: "May 28, 2026",
    img: "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=700&q=80",
    description: "Discover how AI and smart logistics systems are transforming delivery infrastructure across India at an unprecedented pace.",
    featured: true,
  },
  {
    title: "Why Bike Taxi Services Are Growing Rapidly",
    category: "Mobility",
    mins: 4,
    author: "Priya Mehta",
    date: "May 25, 2026",
    img: "https://images.unsplash.com/photo-1558981852-426c6c22a060?auto=format&fit=crop&w=700&q=80",
    description: "Urban mobility is evolving rapidly with affordable and faster bike taxi transportation systems.",
  },
  {
    title: "Enterprise Fleet Management Revolution",
    category: "Enterprise",
    mins: 6,
    author: "Aman Verma",
    date: "May 22, 2026",
    img: "https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=700&q=80",
    description: "Modern businesses require scalable fleet management and transportation ecosystems to stay competitive.",
  },
  {
    title: "How Real-Time Tracking Builds Customer Trust",
    category: "Technology",
    mins: 4,
    author: "Sneha Kapoor",
    date: "May 18, 2026",
    img: "https://images.unsplash.com/photo-1563013544-824ae1b704d3?auto=format&fit=crop&w=700&q=80",
    description: "Customers trust platforms that provide accurate delivery visibility and real-time live updates.",
  },
  {
    title: "AI-Powered Route Optimization Explained",
    category: "AI & Tech",
    mins: 7,
    author: "Vikram Singh",
    date: "May 14, 2026",
    img: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&w=700&q=80",
    description: "Reduce operational costs and improve delivery speed using intelligent AI-driven route optimization.",
  },
  {
    title: "India's Digital Logistics Infrastructure",
    category: "Business",
    mins: 5,
    author: "Anjali Nair",
    date: "May 10, 2026",
    img: "https://images.unsplash.com/photo-1524492412937-b28074a5d7da?auto=format&fit=crop&w=700&q=80",
    description: "India's logistics ecosystem is entering a technology-driven transformation era with massive growth potential.",
  },
];

const CATEGORIES = ["All", "Logistics", "Mobility", "Enterprise", "Technology", "AI & Tech", "Business"];

function Blog() {
  const featured = BLOGS[0];
  const rest = BLOGS.slice(1);

  return (
    <>
      <Navbar />

      {/* HERO */}
      <section className="bg-black text-white py-32 relative overflow-hidden">
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1493612276216-ee3925520721?auto=format&fit=crop&w=1400&q=80"
            alt="Blog Hero"
            className="w-full h-full object-cover opacity-10"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/20 to-black" />
        </div>

        <div className="container-main px-5 text-center relative z-10">
          <div className="inline-block bg-yellow-400/10 border border-yellow-400/20 px-5 py-2 rounded-full text-yellow-400 font-semibold mb-8">
            BearRide Insights & News
          </div>
          <h1 className="text-5xl md:text-7xl font-black leading-tight mb-8">
            Explore
            <span className="gradient-text block">Industry Insights</span>
          </h1>
          <p className="text-gray-400 text-lg md:text-xl max-w-3xl mx-auto leading-9 mb-10">
            Stay updated with logistics trends, mobility innovations, enterprise transport systems, and technology insights.
          </p>

          {/* Search bar */}
          <div className="max-w-xl mx-auto relative">
            <FaSearch className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-500" />
            <input
              type="text"
              placeholder="Search articles..."
              className="w-full bg-zinc-950 border border-yellow-500/20 rounded-2xl pl-14 pr-6 py-5 outline-none text-white focus:border-yellow-400 transition-all"
            />
          </div>
        </div>
      </section>

      {/* CATEGORY TABS */}
      <div className="bg-zinc-950 border-y border-yellow-500/10 sticky top-[80px] z-40">
        <div className="container-main px-5 py-4 flex gap-3 overflow-x-auto scrollbar-hide">
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              className={`px-5 py-2 rounded-full font-bold whitespace-nowrap transition-all ${cat === "All" ? "bg-yellow-400 text-black" : "bg-black border border-yellow-500/10 text-gray-400 hover:text-yellow-400 hover:border-yellow-400/40"}`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* FEATURED POST */}
      <section className="section-padding bg-black">
        <div className="container-main px-5">
          <FadeUp>
            <div className="mb-8">
              <span className="bg-yellow-400/10 border border-yellow-400/20 text-yellow-400 px-4 py-2 rounded-full text-sm font-bold">Featured Article</span>
            </div>
            <div className="grid lg:grid-cols-2 gap-12 items-center bg-zinc-950 border border-yellow-500/10 rounded-[40px] overflow-hidden hover:border-yellow-400/30 transition-all duration-300 group">
              <div className="h-[400px] overflow-hidden">
                <img
                  src={featured.img}
                  alt={featured.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-all duration-700"
                />
              </div>
              <div className="p-10 md:p-12">
                <span className="bg-yellow-400 text-black text-xs font-black px-4 py-2 rounded-full">{featured.category}</span>
                <h2 className="text-4xl font-black mt-6 mb-5 group-hover:text-yellow-400 transition-all duration-300 leading-tight">{featured.title}</h2>
                <p className="text-gray-400 leading-8 mb-8">{featured.description}</p>
                <div className="flex items-center gap-6 mb-8 text-gray-400 text-sm">
                  <span className="flex items-center gap-2"><FaClock /> {featured.mins} min read</span>
                  <span>By {featured.author}</span>
                  <span>{featured.date}</span>
                </div>
                <button className="flex items-center gap-3 bg-yellow-400 text-black px-8 py-4 rounded-2xl font-bold hover:scale-105 transition-all">
                  Read Full Article <FaArrowRight />
                </button>
              </div>
            </div>
          </FadeUp>
        </div>
      </section>

      {/* BLOG GRID */}
      <section className="bg-zinc-950 text-white section-padding pt-0">
        <div className="container-main px-5">
          <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-8">
            {rest.map((blog, index) => (
              <ScaleUp key={index}>
                <div className="bg-black rounded-[35px] overflow-hidden border border-yellow-500/10 hover:border-yellow-400 hover:-translate-y-3 hover:shadow-[0_0_50px_rgba(250,204,21,0.12)] transition-all duration-400 group">
                  <div className="h-60 overflow-hidden relative">
                    <img
                      src={blog.img}
                      alt={blog.title}
                      className="w-full h-full object-cover group-hover:scale-110 transition-all duration-700"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
                    <div className="absolute top-4 left-4 bg-yellow-400 text-black text-xs font-black px-3 py-1 rounded-full">
                      {blog.category}
                    </div>
                  </div>

                  <div className="p-8">
                    <div className="flex items-center gap-4 mb-5 text-gray-500 text-sm">
                      <span className="flex items-center gap-2"><FaClock /> {blog.mins} min</span>
                      <span>·</span>
                      <span>{blog.date}</span>
                    </div>
                    <h2 className="text-2xl font-black leading-tight mb-4 group-hover:text-yellow-400 transition-all duration-300">
                      {blog.title}
                    </h2>
                    <p className="text-gray-400 leading-7 mb-6 text-sm">{blog.description}</p>
                    <div className="flex items-center justify-between pt-5 border-t border-yellow-500/10">
                      <div className="flex items-center gap-3">
                        <div className="w-9 h-9 rounded-full bg-yellow-400 flex items-center justify-center text-black font-black text-sm">
                          {blog.author.charAt(0)}
                        </div>
                        <span className="text-gray-400 text-sm">{blog.author}</span>
                      </div>
                      <button className="text-yellow-400 font-bold flex items-center gap-2 group-hover:gap-4 transition-all text-sm">
                        Read <FaArrowRight className="text-xs" />
                      </button>
                    </div>
                  </div>
                </div>
              </ScaleUp>
            ))}
          </div>
        </div>
      </section>

      {/* NEWSLETTER */}
      <section className="bg-black text-white section-padding relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-yellow-400/5 to-transparent" />
        <div className="container-main px-5 relative z-10">
          <div className="bg-gradient-to-r from-yellow-400 to-yellow-500 rounded-[40px] p-16 text-black text-center">
            <div className="text-6xl mb-6">📨</div>
            <h2 className="text-5xl md:text-6xl font-black mb-6">Stay Updated</h2>
            <p className="text-xl leading-9 max-w-2xl mx-auto mb-10 text-black/80">
              Subscribe to BearRide insights and receive weekly updates about mobility, logistics, and transportation innovation.
            </p>
            <div className="max-w-2xl mx-auto flex flex-col md:flex-row gap-4">
              <input
                type="email"
                placeholder="Enter your email address"
                className="flex-1 px-6 py-5 rounded-2xl outline-none bg-white text-black font-medium"
              />
              <button className="bg-black text-white px-10 py-5 rounded-2xl font-bold hover:scale-105 transition-all duration-300 flex items-center gap-3 justify-center">
                Subscribe <FaArrowRight />
              </button>
            </div>
            <p className="text-black/60 text-sm mt-5">No spam. Unsubscribe anytime.</p>
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
}

export default Blog;
