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
    <footer className="bg-[#102A4C] text-white py-4 w-full">
      <div className="container mx-auto px-4">
        {/* Useful Links & Contact Us - Side by Side on Small Screens */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {/* Useful Links */}
          <div>
            <h2 className="text-base font-bold mb-2">Useful Links</h2>
            <motion.ul initial="hidden" animate="visible" className="space-y-1">
              {links.map(({ path, label }, i) => (
                <motion.li key={label} variants={linkVariants} custom={i}>
                  <Link to={path} className="hover:underline text-xs">
                    {label}
                  </Link>
                </motion.li>
              ))}
            </motion.ul>
          </div>

          {/* Contact Us */}
          <div>
            <h2 className="text-base font-bold mb-2">Contact Us</h2>
            <div className="space-y-1 text-xs">
              <p className="flex items-center space-x-2">
                📞 <span>0727 207 245, 0738 295 663</span>
              </p>
              <p className="flex items-center space-x-2">
                ✉️ <span>rawagcollection@gmail.com</span>
              </p>
            </div>
          </div>
        </div>

        {/* Social Links */}
        <div className="mt-2 text-center">
          <h2 className="text-base font-bold mb-3">Follow Us</h2>
          <div className="flex justify-center space-x-2">
            {[FaFacebookF, FaTwitter, FaLinkedinIn, FaInstagram].map((Icon, index) => (
              <a key={index} href="#" className="bg-white text-[#102A4C] p-1 rounded-full hover:bg-gray-200 transition">
                <Icon className="w-3 h-3" />
              </a>
            ))}
          </div>
        </div>

        {/* Email Subscription */}
        <div className="mt-4 flex flex-col md:flex-row justify-center items-center space-y-2 md:space-y-0 md:space-x-2">
          <input
            type="email"
            placeholder="ENTER YOUR EMAIL"
            className="w-full md:w-64 px-3 py-1 rounded-full text-black text-xs focus:outline-none"
          />
          <button className="bg-orange-500 px-4 py-1 rounded-full text-xs font-semibold hover:bg-orange-600 transition">
            SUBSCRIBE
          </button>
        </div>

        {/* Copyright */}
        <div className="text-center mt-4 text-xs">
          <p>&copy; 2025 Rawag Store. All Rights Reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;