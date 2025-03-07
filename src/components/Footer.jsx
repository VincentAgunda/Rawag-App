import React from "react";
import { motion } from "framer-motion";
import { FaFacebookF, FaTwitter, FaLinkedinIn, FaInstagram } from "react-icons/fa";
import { Link } from "react-router-dom";

const linkVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.2, duration: 0.5, ease: "easeOut" },
  }),
};

const Footer = () => {
  const links = [
    { path: "/landing", label: "Home" },
    { path: "/", label: "Products" },
    { path: "/add-product", label: "Add Product" },
    { path: "/invoices", label: "Invoices" },
    { path: "/delivery-notes", label: "Delivery Notes" },
    { path: "/settings", label: "Settings" },
  ];

  return (
    <footer className="bg-[#102A4C] text-white py-10 w-full">
      <div className="container mx-auto px-4">
        {/* Useful Links & Contact Us - Side by Side on Small Screens */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
          {/* Useful Links with Framer Motion */}
          <div>
            <h2 className="text-lg font-bold mb-4">Useful Links</h2>
            <motion.ul initial="hidden" animate="visible" className="space-y-2">
              {links.map(({ path, label }, i) => (
                <motion.li key={label} variants={linkVariants} custom={i}>
                  <Link to={path} className="hover:underline">
                    {label}
                  </Link>
                </motion.li>
              ))}
            </motion.ul>
          </div>

          {/* Contact Us */}
          <div>
            <h2 className="text-lg font-bold mb-4">Contact Us</h2>
            <div className="space-y-3">
              <p className="flex items-center space-x-2">
                📞 <span>0727 207 245, 0738 295 663</span>
              </p>
              <p className="flex items-center space-x-2">
                ✉️ <span>rawagcollection@gmail.com</span>
              </p>
            </div>
          </div>
        </div>

        {/* Social Links - Below Everything */}
        <div className="mt-8 text-center">
          <h2 className="text-lg font-bold mb-4">Follow Us</h2>
          <div className="flex justify-center space-x-4">
            {[FaFacebookF, FaTwitter, FaLinkedinIn, FaInstagram].map((Icon, index) => (
              <a key={index} href="#" className="bg-white text-[#102A4C] p-2 rounded-full hover:bg-gray-200 transition">
                <Icon className="w-5 h-5" />
              </a>
            ))}
          </div>
        </div>

        {/* Email Subscription */}
        <div className="mt-10 flex flex-col md:flex-row justify-center items-center space-y-4 md:space-y-0 md:space-x-4">
          <input
            type="email"
            placeholder="ENTER YOUR EMAIL"
            className="w-full md:w-96 px-4 py-3 rounded-full text-black focus:outline-none"
          />
          <button className="bg-orange-500 px-6 py-3 rounded-full font-semibold hover:bg-orange-600 transition">
            SUBSCRIBE
          </button>
        </div>

        {/* Copyright */}
        <div className="text-center mt-10 text-sm">
          <p>&copy; 2025 Rawag Store. All Rights Reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
