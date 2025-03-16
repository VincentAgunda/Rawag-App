import React, { useState } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";

const navLinks = [
  { path: "/landing", label: "Home" },
  { path: "/", label: "Products" },
  { path: "/add-product", label: "Add Product" },
  { path: "/invoices", label: "Invoices" },
  { path: "/delivery-notes", label: "Delivery Notes" },
  { path: "/settings", label: "Settings" },
];

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      {/* Header (Fixed at the top) */}
      <header className="bg-[#0c0c0d] p-4 text-white z-50 fixed top-0 left-0 w-full shadow-md">
        <div className="container mx-auto flex justify-between items-center">
          {/* Logo with Subtle Rounded Edges */}
          <Link to="/">
            <img
              src="/logo.png"
              alt="Logo"
              className="h-8 w-auto rounded-md shadow-sm"
            />
          </Link>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden text-white focus:outline-none relative z-50"
          >
            {isOpen ? <X size={28} /> : <Menu size={28} />}
          </button>

          {/* Desktop Navigation (Reduced Size) */}
          <nav className="hidden md:flex bg-white px-3 py-2 rounded-full shadow-sm space-x-2">
            {navLinks.map(({ path, label }) => (
              <Link
                key={path}
                to={path}
                className="px-3 py-1 rounded-full text-gray-600 hover:text-black hover:bg-gray-100 transition text-sm"
              >
                {label}
              </Link>
            ))}
          </nav>
        </div>
      </header>

      {/* Background Overlay when Mobile Menu is Open */}
      <AnimatePresence>
        {isOpen && (
          <>
            <motion.div
              className="fixed inset-0 bg-black/30 backdrop-blur-sm z-40"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
            />

            {/* Mobile Menu */}
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: "0%" }}
              exit={{ x: "100%" }}
              transition={{ type: "tween", duration: 0.3 }}
              className="fixed top-16 right-4 w-52 bg-white shadow-lg p-4 rounded-xl md:hidden z-50"
            >
              <ul className="space-y-2">
                {navLinks.map(({ path, label }) => (
                  <li key={path}>
                    <Link
                      to={path}
                      className="block px-6 py-2 text-center rounded-full bg-gray-100 text-black hover:text-gray-700 hover:bg-gray-200 transition"
                      onClick={() => setIsOpen(false)}
                    >
                      {label}
                    </Link>
                  </li>
                ))}
              </ul>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Page Content (Moves content down so it's not covered by the fixed header) */}
      <div className="mt-20 relative z-0">{/* Your main content */}</div>
    </>
  );
};

export default Header;