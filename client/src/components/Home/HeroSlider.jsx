import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, Navigation, EffectFade } from "swiper/modules";
import { Link } from "react-router-dom";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import "swiper/css/effect-fade";
import { FaArrowRight, FaMotorcycle, FaTruck, FaBox, FaBuilding } from "react-icons/fa";

const SLIDES = [
  {
    title: "Book a Ride in",
    highlight: "Under 60 Seconds",
    subtitle: "Instant bike, auto, and cab booking with live GPS tracking across 100+ cities.",
    btn: "Book Ride Now",
    btnPath: "/booking",
    icon: <FaMotorcycle />,
    img: "https://images.unsplash.com/photo-1449965408869-eaa3f722e40d?w=1400&q=80",
    badge: "Most Booked",
  },
  {
    title: "Enterprise Logistics",
    highlight: "Built for Scale",
    subtitle: "Advanced fleet management and bulk logistics operations for businesses of all sizes.",
    btn: "Explore Enterprise",
    btnPath: "/enterprise",
    icon: <FaBuilding />,
    img: "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=1400&q=80",
    badge: "B2B Ready",
  },
  {
    title: "Same-Day Parcel",
    highlight: "Delivery Anywhere",
    subtitle: "Fast, secure parcel delivery with real-time tracking and safe handling guarantee.",
    btn: "Send a Parcel",
    btnPath: "/parcel",
    icon: <FaBox />,
    img: "https://images.unsplash.com/photo-1566576912321-d58ddd7a6088?w=1400&q=80",
    badge: "Same Day",
  },
  {
    title: "Truck Logistics",
    highlight: "Goods Transport",
    subtitle: "Book mini trucks to heavy containers for commercial transportation and warehousing.",
    btn: "Book Truck",
    btnPath: "/truck-booking",
    icon: <FaTruck />,
    img: "https://images.unsplash.com/photo-1601584115197-04ecc0da31d7?w=1400&q=80",
    badge: "Business",
  },
];

function HeroSlider() {
  return (
    <section className="bg-black overflow-hidden">
      <div className="w-full px-3 md:px-5 lg:px-8 py-8 md:py-12">
        <Swiper
          modules={[Autoplay, Pagination, Navigation, EffectFade]}
          effect="fade"
          slidesPerView={1}
          loop={true}
          speed={1500}
          autoplay={{ delay: 5000, disableOnInteraction: false }}
          pagination={{ clickable: true }}
          navigation={true}
          grabCursor={true}
          className="rounded-[28px] md:rounded-[40px] overflow-hidden border border-yellow-500/10 shadow-[0_0_80px_rgba(250,204,21,0.08)]"
        >
          {SLIDES.map((slide, i) => (
            <SwiperSlide key={i}>
              <div className="relative h-[300px] sm:h-[380px] md:h-[480px] lg:h-[580px] xl:h-[640px] overflow-hidden">
                {/* Background image */}
                <img
                  src={slide.img}
                  alt={slide.title}
                  className="absolute inset-0 w-full h-full object-cover scale-105 animate-[slowZoom_12s_ease-in-out_infinite]"
                />

                {/* Gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/60 to-black/20" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />

                {/* Content */}
                <div className="absolute inset-0 flex items-center">
                  <div className="px-8 sm:px-12 md:px-16 lg:px-20 max-w-3xl">
                    {/* Badge */}
                    <div className="inline-flex items-center gap-2 bg-yellow-400 text-black px-4 py-2 rounded-full font-black text-sm mb-6">
                      <span className="w-2 h-2 bg-black rounded-full animate-pulse" />
                      {slide.badge}
                    </div>

                    {/* Title */}
                    <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-black leading-tight text-white mb-4">
                      {slide.title}
                      <span className="text-yellow-400 block">{slide.highlight}</span>
                    </h2>

                    {/* Subtitle */}
                    <p className="text-gray-300 text-sm sm:text-base md:text-lg lg:text-xl leading-7 md:leading-9 max-w-xl mb-8 hidden sm:block">
                      {slide.subtitle}
                    </p>

                    {/* CTA */}
                    <div className="flex flex-wrap gap-4">
                      <Link
                        to={slide.btnPath}
                        className="inline-flex items-center gap-3 bg-yellow-400 text-black px-6 sm:px-8 py-3 sm:py-4 rounded-2xl font-black text-sm sm:text-base hover:scale-105 transition-all shadow-[0_0_30px_rgba(250,204,21,0.3)]"
                      >
                        <span className="text-lg">{slide.icon}</span>
                        {slide.btn}
                        <FaArrowRight className="text-sm" />
                      </Link>
                    </div>
                  </div>
                </div>

                {/* Right floating stats (desktop only) */}
                <div className="absolute bottom-8 right-8 hidden lg:flex flex-col gap-4">
                  <div className="bg-black/70 backdrop-blur-md border border-yellow-500/20 rounded-2xl px-5 py-4 text-center">
                    <p className="text-yellow-400 font-black text-2xl">12K+</p>
                    <p className="text-gray-400 text-xs mt-1">Rides Today</p>
                  </div>
                  <div className="bg-yellow-400 rounded-2xl px-5 py-4 text-black text-center">
                    <p className="font-black text-2xl">~2 min</p>
                    <p className="text-black/70 text-xs mt-1">Avg Pickup</p>
                  </div>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
}

export default HeroSlider;
