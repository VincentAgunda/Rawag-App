import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { motion, AnimatePresence } from "framer-motion";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { FaTrash } from "react-icons/fa";

const EditProductModal = ({ product, onClose, onUpdate, onDelete }) => {
  const [editedProduct, setEditedProduct] = useState({
    name: "",
    color: "",
    quantityBags: 0,
    quantityIndividual: 0,
    sizes: "",
    date: null,
    status: "",
  });

  const [isSaving, setIsSaving] = useState(false);
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    if (product) {
      setEditedProduct({
        name: product.name || "",
        color: product.color || "",
        quantityBags: product.quantityBags || 0,
        quantityIndividual: product.quantityIndividual || 0,
        sizes: product.sizes || "",
        date: product.date ? new Date(product.date) : null,
        status: product.status || "In Stock",
      });
    }
  }, [product]);

  const handleClose = () => {
    setIsVisible(false);
    setTimeout(onClose, 300);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isSaving) return; // Prevent multiple clicks
    setIsSaving(true);

    const updatedProduct = {
      id: product.id,
      ...editedProduct,
      quantityBags: Number(editedProduct.quantityBags),
      quantityIndividual: Number(editedProduct.quantityIndividual),
      date: editedProduct.date ? editedProduct.date.toISOString() : null,
    };

    onUpdate(updatedProduct);
    setIsSaving(false);
    handleClose();
  };

  const handleDelete = () => {
    if (window.confirm("Are you sure you want to delete this product?")) {
      onDelete(product.id);
      handleClose();
    }
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          className="fixed inset-0 flex items-center justify-center z-50"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          {/* Backdrop */}
          <motion.div
            className="fixed inset-0 bg-black bg-opacity-50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            onClick={handleClose}
          />

          {/* Modal Content */}
          <motion.div
            className="bg-white p-6 rounded-lg w-full max-w-md max-h-[80vh] overflow-y-auto shadow-lg relative z-50"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ duration: 0.3 }}
          >
            <h2 className="text-lg font-bold mb-4">Edit Product</h2>
            <form onSubmit={handleSubmit} className="space-y-3">
              {/* Name */}
              <div>
                <label className="block text-sm font-medium text-gray-700">Name</label>
                <input
                  type="text"
                  value={editedProduct.name}
                  onChange={(e) => 
                    setEditedProduct((prev) => ({ ...prev, name: e.target.value }))
                  }
                  className="mt-1 block w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>

              {/* Color */}
              <div>
                <label className="block text-sm font-medium text-gray-700">Color</label>
                <input
                  type="text"
                  value={editedProduct.color}
                  onChange={(e) => 
                    setEditedProduct((prev) => ({ ...prev, color: e.target.value }))
                  }
                  className="mt-1 block w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>

              {/* Quantity */}
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-sm font-medium text-gray-700">Bags</label>
                  <input
                    type="number"
                    value={editedProduct.quantityBags}
                    onChange={(e) =>
                      setEditedProduct((prev) => ({
                        ...prev,
                        quantityBags: Number(e.target.value),
                      }))
                    }
                    className="mt-1 block w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
                    min="0"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Units</label>
                  <input
                    type="number"
                    value={editedProduct.quantityIndividual}
                    onChange={(e) =>
                      setEditedProduct((prev) => ({
                        ...prev,
                        quantityIndividual: Number(e.target.value),
                      }))
                    }
                    className="mt-1 block w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
                    min="0"
                    required
                  />
                </div>
              </div>

              {/* Sizes */}
              <div>
                <label className="block text-sm font-medium text-gray-700">Sizes</label>
                <input
                  type="text"
                  value={editedProduct.sizes}
                  onChange={(e) => 
                    setEditedProduct((prev) => ({ ...prev, sizes: e.target.value }))
                  }
                  className="mt-1 block w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
                />
              </div>

              {/* Date */}
              <div>
                <label className="block text-sm font-medium text-gray-700">Date</label>
                <DatePicker
                  selected={editedProduct.date}
                  onChange={(date) => 
                    setEditedProduct((prev) => ({ ...prev, date }))
                  }
                  dateFormat="dd/MM/yyyy"
                  placeholderText="Select a date"
                  className="mt-1 block w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
                />
              </div>

              {/* Status */}
              <div>
                <label className="block text-sm font-medium text-gray-700">Status</label>
                <select
                  value={editedProduct.status}
                  onChange={(e) => 
                    setEditedProduct((prev) => ({ ...prev, status: e.target.value }))
                  }
                  className="mt-1 block w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
                >
                  <option value="In Stock">In Stock</option>
                  <option value="Out of Stock">Out of Stock</option>
                  <option value="In Progress">In Progress</option>
                  <option value="Shipped">Shipped</option>
                </select>
              </div>

              {/* Buttons */}
              <div className="flex justify-between items-center mt-4">
                <button
                  type="button"
                  onClick={handleDelete}
                  className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600 transition flex items-center gap-2"
                >
                  <FaTrash className="text-white" /> Delete
                </button>
                <div className="flex space-x-3">
                  <button
                    type="button"
                    onClick={handleClose}
                    className="bg-gray-500 text-white px-4 py-2 rounded-md hover:bg-gray-600 transition"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition"
                  >
                    Save
                  </button>
                </div>
              </div>
            </form>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default EditProductModal;
