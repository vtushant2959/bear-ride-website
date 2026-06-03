import { Link } from "react-router-dom";
import Navbar from "../components/navbar/Navbar";
import Footer from "../components/footer/Footer";

function NotFound() {
  return (
    <>
      <Navbar />
      <section className="min-h-screen bg-black flex items-center justify-center px-5">
        <div className="text-center">
          <h1 className="text-[150px] md:text-[200px] font-black gradient-text leading-none">404</h1>
          <h2 className="text-4xl md:text-5xl font-black mb-6">Page Not Found</h2>
          <p className="text-gray-400 text-lg mb-10 max-w-xl mx-auto">
            The page you're looking for doesn't exist or has been moved.
          </p>
          <Link
            to="/"
            className="inline-block bg-yellow-400 text-black px-10 py-5 rounded-2xl font-bold hover:scale-105 transition-all duration-300"
          >
            Back to Home
          </Link>
        </div>
      </section>
      <Footer />
    </>
  );
}

export default NotFound;
