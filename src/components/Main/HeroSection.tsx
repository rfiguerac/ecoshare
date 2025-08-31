import { useState, useEffect } from 'react';
import { Leaf, Users } from 'lucide-react';
import { useAuthStore } from '../../store/AuthStore';
import { useDonationStore } from '../../store/DonationStore';



const carouselImages = [
  "https://plus.unsplash.com/premium_photo-1665311515452-a9f54c4266c9?q=80&w=1675&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  "https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?q=80&w=2213&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  "https://plus.unsplash.com/premium_photo-1681987448179-4a93b7975018?q=80&w=987&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  "https://images.unsplash.com/photo-1609054841737-9feb7029bd7b?q=80&w=1562&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
];

const HeroSection = () => {
  const { donationPagination } = useDonationStore();
  const { allProfiles } = useAuthStore();

  const totalItemsShared = donationPagination.data ? donationPagination.data.length : 0;
  const totalUsers = allProfiles ? allProfiles.length : 0;

  const stats = [
    { icon: Leaf, value: `${totalItemsShared}+`, description: 'Items Shared' },
    { icon: Users, value: `${totalUsers}+`, description: 'Community Members' },
  ];
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prev) => (prev + 1) % carouselImages.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="relative h-[80vh] flex flex-col justify-center text-center">

      {/* Background Carousel */}
      <div className="absolute inset-0 h-full w-full overflow-hidden">
        {carouselImages.map((img, i) => (
          <img
            key={i}
            src={img}
            alt=""
            className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-1000 ${i === currentImageIndex ? "opacity-100" : "opacity-0"
              }`}
          />
        ))}
        {/* Overlay for readability */}
        <div className="absolute inset-0 bg-black/40"></div>
      </div>

      {/* Main Content */}
      <div className="relative z-10 flex flex-col items-center justify-center h-full text-white px-4">
        <h1 className="text-5xl md:text-6xl font-bold tracking-tight">
          Share. Save.<span className="text-green-400">Sustain.</span>
        </h1>
        <p className="mt-4 text-lg md:text-xl max-w-3xl mx-auto">
          Join our community-driven platform to reduce waste, help neighbors, and build a more sustainable future together.
        </p>

        {/* Call to Action Button (mobile only) */}
        <button className="mt-8 px-6 py-3 text-lg font-semibold bg-green-500 rounded-full transition-colors duration-300 hover:bg-green-600 sm:hidden">
          Donate
        </button>
      </div>

      {/* Stats Section */}
      <div className="relative z-10 mt-auto mb-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 p-2 md:p-4 max-w-xs md:max-w-xl lg:max-w-2xl mx-auto bg-white/20 backdrop-blur-sm rounded-lg">
          {stats.map((stat, index) => (
            <div key={index} className="flex flex-col items-center space-y-1 p-2">
              <stat.icon className="text-white" size={25} />
              <div className="text-md md:text-2xl font-bold text-white">{stat.value}</div>
              <div className="text-xs md:text-sm text-white opacity-90">{stat.description}</div>
            </div>
          ))}
        </div>
      </div>
    </section>

  );
};

export default HeroSection;