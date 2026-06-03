import { Swiper, SwiperSlide } from "swiper/react";

import { Autoplay, Pagination, EffectFade } from "swiper/modules";

import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/effect-fade";

/* IMAGES */
import banner1 from "../../assets/HeroSliderBanner/1-banner.png";
import banner2 from "../../assets/HeroSliderBanner/2-banner.png";
import banner3 from "../../assets/HeroSliderBanner/3-banner.png";
import banner4 from "../../assets/HeroSliderBanner/4-banner.png";

function HeroSlider1() {
  const slides = [banner1, banner2, banner3, banner4];

  return (
    <section className="bg-black py-6 md:py-10 overflow-hidden">
      <div className="w-full px-2 md:px-4 lg:px-6">
        <div
          className="
            rounded-[24px]
            md:rounded-[40px]
            overflow-hidden
            border border-yellow-500/10
            shadow-[0_0_80px_rgba(250,204,21,0.08)]
          "
        >
          <Swiper
            modules={[Autoplay, Pagination, EffectFade]}
            effect="fade"
            slidesPerView={1}
            loop={true}
            speed={2000}
            autoplay={{
              delay: 4500,
              disableOnInteraction: false,
              pauseOnMouseEnter: false,
            }}
            pagination={{
              clickable: true,
            }}
            allowTouchMove={true}
            grabCursor={true}
            className="hero-swiper"
          >
            {slides.map((image, index) => (
              <SwiperSlide key={index}>
                <div
                  className="
                    relative
                    w-full
                    h-[220px]
                    sm:h-[280px]
                    md:h-[380px]
                    lg:h-[480px]
                    xl:h-[560px]
                    overflow-hidden
                    bg-black
                  "
                >
                  {/* IMAGE */}
                  <img
                    src={image}
                    alt={`BearRide Banner ${index + 1}`}
                    className="
                      w-full
                      h-full
                      object-cover
                      scale-100
                      animate-[slowZoom_8s_linear_infinite]
                    "
                  />

                  {/* DARK OVERLAY */}
                  <div
                    className="
                      absolute inset-0
                      bg-gradient-to-t
                      from-black/20
                      via-transparent
                      to-black/10
                    "
                  ></div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>
    </section>
  );
}

export default HeroSlider1;
