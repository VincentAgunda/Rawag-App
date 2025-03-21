import React from "react";
import { motion } from "framer-motion";

const sectionVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: { 
    opacity: 1, 
    y: 0, 
    transition: { duration: 1.2, ease: "easeInOut" }
  },
};

const LandingPage = () => {
  return (
    <div className="w-full min-h-screen bg-gray-100 scroll-smooth">
      {/* Hero Section - Fixed Top Border Radius */}
      <section
        className="relative w-full h-screen flex items-center justify-center bg-cover bg-center rounded-t-xl rounded-b-xl overflow-hidden"
        style={{ backgroundImage: "url('/hero-image.jpg')" }} // Ensure this image exists in /public
      >
        <div className="absolute inset-0 bg-black bg-opacity-50 rounded-t-xl rounded-b-xl"></div>
        <div className="relative z-10 text-center text-white px-6">
          <h1 className="text-5xl font-bold">Discover Rawag Collection</h1>
          <p className="mt-4 text-lg">Premium Sweaters, Handmade Perfection</p>
          <button className="mt-6 px-6 py-3 bg-white text-black font-medium rounded-lg hover:bg-gray-300 transition">
            Explore Now
          </button>
        </div>
      </section>

      {/* Features Section */}
      <motion.section
        variants={sectionVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: false, amount: 0.2 }}
        className="py-20 bg-white text-center rounded-xl mx-4 mt-10 shadow-lg"
      >
        <h2 className="text-3xl font-bold">Why Choose Rawag Collection?</h2>
        <div className="mt-10 grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {[
            { title: "Handmade Quality", text: "Crafted with precision using the finest threads." },
            { title: "Eco-Friendly", text: "Sustainable materials for a greener future." },
            { title: "Fast Shipping", text: "Reliable and quick delivery worldwide." },
          ].map(({ title, text }, index) => (
            <motion.div
              key={index}
              variants={sectionVariants}
              className="p-6 bg-gray-100 rounded-xl shadow-md"
            >
              <h3 className="text-xl font-semibold">{title}</h3>
              <p className="mt-2 text-gray-600">{text}</p>
            </motion.div>
          ))}
        </div>
      </motion.section>

      {/* Product Showcase */}
      <motion.section
        variants={sectionVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: false, amount: 0.2 }}
        className="py-20 bg-gray-200 text-center rounded-xl mx-4 mt-10 shadow-lg"
      >
        <h2 className="text-3xl font-bold">Our Bestsellers</h2>
        <div className="mt-10 grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {[
            { src: "/sweater1.jpg", name: "Classic Knit Sweater", price: "Ksh 490.99" },
            { src: "/sweater2.jpg", name: "Uniform set", price: "Ksh 1590.99" },
            { src: "/sweater3.jpg", name: "Minimalist Wool Sweater", price: "Ksh 540.99" },
          ].map(({ src, name, price }, index) => (
            <motion.div
              key={index}
              variants={sectionVariants}
              className="p-4 bg-white rounded-xl shadow-md"
            >
              <img src={src} alt={name} className="w-full h-64 object-cover rounded-lg" />
              <h3 className="mt-4 text-lg font-semibold">{name}</h3>
              <p className="mt-2 text-gray-600">{price}</p>
            </motion.div>
          ))}
        </div>
      </motion.section>

      {/* Testimonials */}
      <motion.section
        variants={sectionVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: false, amount: 0.2 }}
        className="py-20 bg-white text-center rounded-xl mx-4 mt-10 shadow-lg"
      >
        <h2 className="text-3xl font-bold">What Our Customers Say</h2>
        <div className="mt-10 max-w-4xl mx-auto">
          <motion.div variants={sectionVariants} className="bg-gray-100 p-6 rounded-xl shadow-md">
            <p className="text-lg text-gray-600">
              "Absolutely love the quality and warmth of these sweaters. Perfect for winter!"
            </p>
            <p className="mt-2 font-semibold">- Alice.A</p>
          </motion.div>
        </div>
      </motion.section>

      {/* Call to Action */}
      <motion.section
        variants={sectionVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: false, amount: 0.2 }}
        className="py-20 bg-black text-center text-white rounded-xl mx-4 mt-10 shadow-lg"
      >
        <h2 className="text-3xl font-bold">Join the Rawag Collection</h2>
        <p className="mt-4 text-lg">Stay updated with our latest arrivals and offers.</p>
        <motion.button
          whileHover={{ scale: 1.1 }}
          className="mt-6 px-6 py-3 bg-orange-500 text-white font-medium rounded-lg hover:bg-orange-600 transition"
        >
          Shop Now
        </motion.button>
      </motion.section>
    </div>
  );
};

export default LandingPage;
