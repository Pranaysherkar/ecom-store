import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
// Image array
const images = [
  {
    id: 1,
    url: "https://i.pinimg.com/736x/7e/60/46/7e6046133227695d237c3cd736dfe9fe.jpg",
    alt: "Stylish headphones",
  },
  {
    id: 2,
    url: "https://i.pinimg.com/736x/dc/0c/43/dc0c439c18d3beb37e36dba04ca0dd4b.jpg",
    alt: "Smartwatch on hand",
  },
  {
    id: 3,
    url: "https://i.pinimg.com/736x/ac/a2/0d/aca20d89669917ba0cb8af318e05b1d0.jpg",
    alt: "Modern sneakers",
  },
  {
    id: 4,
    url: "https://i.pinimg.com/736x/dc/18/92/dc189244056d58866550db74a076da51.jpg",
    alt: "Sunglasses with sunlight",
  },
];

const Home = () => {
  const [currentImage, setCurrentImage] = useState(0);

  // Auto-change background every 5 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImage((prev) => (prev + 1) % images.length);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative h-screen w-full overflow-hidden text-white">
      {/* Background Image */}
      <div
        className="absolute inset-0 bg-cover bg-center transition-all duration-[1500ms] ease-in-out"
        style={{
          backgroundImage: `url(${images[currentImage].url})`,
        }}
      ></div>

      {/* Overlay */}
      <div className="absolute inset-0 bg-black/60 z-10"></div>

      {/* Content */}
      <div className="relative z-20 h-full w-full flex flex-col items-center justify-center text-center px-4">
        <h1 className="text-5xl md:text-6xl font-bold leading-tight drop-shadow-lg animate-fadeInUp">
          Premium Products, <br /> Delivered to You
        </h1>

        <p className="text-lg text-gray-300 mt-4 animate-fadeInUp">
          Explore our latest collection of stylish, top-rated products with fast
          delivery.
        </p>

        <div className="flex gap-4 mt-8 justify-center animate-fadeInUp">
          <NavLink
            to={"/products"}
            className="px-6 py-3 border bg-slate-900/80  hover:bg-slate-700 border-white/50 cursor-pointer text-white font-bold rounded-xl transition-all duration-300"
          >
            View Products
          </NavLink>
        </div>
      </div>
    </div>
  );
};

export default Home;
