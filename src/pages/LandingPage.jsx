import React from "react";

const LandingPage = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-[#102A4C] text-white text-center px-8 p-6 w-full">
      <h1 className="text-5xl font-bold mb-6">Welcome to Rawag Collection</h1>
      <p className="text-lg max-w-2xl">
        Discover the finest collection of sweaters, products, and more!
      </p>
      <a
        href="/"
        className="mt-8 px-8 py-4 bg-white text-[#102A4C] font-semibold rounded-lg hover:bg-gray-200 transition"
      >
        Enter the Store
      </a>
    </div>
  );
};

export default LandingPage;
