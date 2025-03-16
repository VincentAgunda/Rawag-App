import React from "react";


const LandingPage = () => {
  return (
    <div className="w-full min-f-screen bg-gray-100">

      {/* Hero Section */}
      <section
        className="relative w-full h-screen flex items-center justify-center bg-cover bg-center"
        style={{ backgroundImage: "url('/your-image.jpg')" }}
      >
        <div className="absolute inset-0 bg-black bg-opacity-50"></div>
        <div className="relative z-10 text-center text-white px-6">
          <h1 className="text-5xl font-bold">Discover Rawag Collection</h1>
          <p className="mt-4 text-lg">Premium Sweaters, Handmade Perfection</p>
          <button className="mt-6 px-6 py-3 bg-white text-black font-medium rounded-md hover:bg-gray-300 transition">
            Explore Now
          </button>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-white text-center">
        <h2 className="text-3xl font-bold">Why Choose Rawag Collection?</h2>
        <div className="mt-10 grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
          <div className="p-6 bg-gray-100 rounded-lg shadow-md">
            <h3 className="text-xl font-semibold">Handmade Quality</h3>
            <p className="mt-2 text-gray-600">Crafted with precision using the finest threads.</p>
          </div>
          <div className="p-6 bg-gray-100 rounded-lg shadow-md">
            <h3 className="text-xl font-semibold">Eco-Friendly</h3>
            <p className="mt-2 text-gray-600">Sustainable materials for a greener future.</p>
          </div>
          <div className="p-6 bg-gray-100 rounded-lg shadow-md">
            <h3 className="text-xl font-semibold">Fast Shipping</h3>
            <p className="mt-2 text-gray-600">Reliable and quick delivery worldwide.</p>
          </div>
        </div>
      </section>

      {/* Product Showcase */}
      <section className="py-20 bg-gray-200 text-center">
        <h2 className="text-3xl font-bold">Our Bestsellers</h2>
        <div className="mt-10 grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
          <div className="p-4 bg-white rounded-lg shadow-md">
            <img src="/sweater1.jpg" alt="Sweater 1" className="w-full h-64 object-cover rounded-md"/>
            <h3 className="mt-4 text-lg font-semibold">Classic Knit Sweater</h3>
            <p className="mt-2 text-gray-600">$49.99</p>
          </div>
          <div className="p-4 bg-white rounded-lg shadow-md">
            <img src="/sweater2.jpg" alt="Sweater 2" className="w-full h-64 object-cover rounded-md"/>
            <h3 className="mt-4 text-lg font-semibold">Chunky Winter Sweater</h3>
            <p className="mt-2 text-gray-600">$59.99</p>
          </div>
          <div className="p-4 bg-white rounded-lg shadow-md">
            <img src="/sweater3.jpg" alt="Sweater 3" className="w-full h-64 object-cover rounded-md"/>
            <h3 className="mt-4 text-lg font-semibold">Minimalist Wool Sweater</h3>
            <p className="mt-2 text-gray-600">$54.99</p>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 bg-white text-center">
        <h2 className="text-3xl font-bold">What Our Customers Say</h2>
        <div className="mt-10 max-w-4xl mx-auto">
          <div className="bg-gray-100 p-6 rounded-lg shadow-md">
            <p className="text-lg text-gray-600">"Absolutely love the quality and warmth of these sweaters. Perfect for winter!"</p>
            <p className="mt-2 font-semibold">- Sarah M.</p>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-20 bg-black text-center text-white">
        <h2 className="text-3xl font-bold">Join the Rawag Collection</h2>
        <p className="mt-4 text-lg">Stay updated with our latest arrivals and offers.</p>
        <button className="mt-6 px-6 py-3 bg-orange-500 text-white font-medium rounded-md hover:bg-orange-600 transition">
          Shop Now
        </button>
      </section>
    </div>
  );
};

export default LandingPage;
