import { useEffect } from "react";
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";

const swiperImages = [
  {
    url: "https://images.unsplash.com/photo-1566073771259-6a8506099945",
    title: "Luxury Resorts",
    description: "Experience paradise in our premium resorts"
  },
  {
    url: "https://images.unsplash.com/photo-1492144534655-ae79c964c9d7",
    title: "Premium Vehicles",
    description: "Drive in style with our luxury fleet"
  },
  {
    url: "https://images.unsplash.com/photo-1511578314322-379afb476865",
    title: "Conference Halls",
    description: "Professional spaces for your events"
  },
  {
    url: "https://images.unsplash.com/photo-1551882547-ff40c63fe5fa",
    title: "Beach Getaways",
    description: "Escape to tropical paradise"
  }
];

const HeroSwiper = () => {
  const [emblaRef, emblaApi] = useEmblaCarousel(
    { 
      loop: true,
      duration: 30
    },
    [Autoplay({ delay: 4000, stopOnInteraction: false })]
  );

  useEffect(() => {
    if (emblaApi) {
      emblaApi.on('select', () => {
        // Optional: Add any callback on slide change
      });
    }
  }, [emblaApi]);

  return (
    <div className="relative w-full overflow-hidden bg-gradient-to-b from-slate-900 to-slate-800">
      <div className="embla" ref={emblaRef}>
        <div className="embla__container flex">
          {swiperImages.map((image, index) => (
            <div
              key={index}
              className="embla__slide relative min-w-0 flex-[0_0_100%]"
            >
              <div className="relative h-[500px] md:h-[600px]">
                <img
                  src={image.url}
                  alt={image.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent" />
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-center text-white px-4 animate-fade-in">
                    <h2 className="text-4xl md:text-6xl font-bold mb-4 drop-shadow-2xl">
                      {image.title}
                    </h2>
                    <p className="text-xl md:text-2xl text-white/90 drop-shadow-lg">
                      {image.description}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Navigation dots */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex gap-3 z-10">
        {swiperImages.map((_, index) => (
          <button
            key={index}
            onClick={() => emblaApi?.scrollTo(index)}
            className="w-3 h-3 rounded-full bg-white/50 hover:bg-white transition-all duration-300 hover:scale-110"
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
};

export default HeroSwiper;
