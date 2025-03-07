import React, { useState } from "react";
import { FaEdit } from "react-icons/fa"; 
import EditProductModal from "./EditProductModal"; 

const ProductCard = ({ product, onUpdate, onDelete }) => {
  const { name, color, quantityBags, quantityIndividual, sizes, date, status } = product || {};

  const statusColor = {
    "In Stock": "bg-green-100 text-green-800",
    "Out of Stock": "bg-[#102A4C] text-[#EEE8EE]",
    "Shipped": "bg-blue-100 text-blue-800",
    "In Progress": "bg-rose-400 text-rose-950",
  }[status] || "bg-gray-100 text-gray-800"; 

  const formattedDate = date ? new Date(date).toLocaleDateString() : "N/A";

  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  const handleEditClick = () => setIsEditModalOpen(true);

  const handleUpdate = (updatedProduct) => {
    setIsEditModalOpen(false);
    setTimeout(() => {
      if (onUpdate) {
        onUpdate(updatedProduct); 
      }
    }, 0); 
  };

  const handleDelete = (productId) => {
    setIsEditModalOpen(false);
    setTimeout(() => {
      if (onDelete) {
        onDelete(productId); 
      }
    }, 0);
  };

  return (
    <div className="bg-gray-100 p-4 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-200 relative flex flex-col h-full">
      {/* Edit Button */}
      <button
        onClick={handleEditClick}
        className="absolute top-2 right-2 text-gray-500 hover:text-blue-500 transition"
      >
        <FaEdit className="w-3 h-3" />
      </button>

      {/* Product Details */}
      <h3 className="text-lg font-semibold mb-2">{name || "Unnamed Product"}</h3>
      {color && color !== "N/A" && <p className="text-gray-600 mb-1"><strong>Color:</strong> {color}</p>}
      {quantityBags > 0 && <p className="text-gray-600 mb-1"><strong>Bags:</strong> {quantityBags}</p>}
      {quantityIndividual > 0 && <p className="text-gray-600 mb-1"><strong>Units:</strong> {quantityIndividual}</p>}
      {sizes && <p className="text-gray-600 mb-1"><strong>Sizes:</strong> {sizes}</p>}
      <p className="text-gray-600 mb-1"><strong>Date:</strong> {formattedDate}</p>

      {/* Status Badge - Pushed to the bottom */}
      <div className={`mt-auto px-3 py-1 rounded-full text-sm font-semibold text-center inline-block ${statusColor}`}>
        {status || "Unknown"}
      </div>

      {/* Edit Modal */}
      {isEditModalOpen && (
        <EditProductModal
          product={product}
          onClose={() => setIsEditModalOpen(false)}
          onUpdate={handleUpdate}
          onDelete={handleDelete} // ✅ Ensure onDelete is passed
        />
      )}
    </div>
  );
};

export default ProductCard;
