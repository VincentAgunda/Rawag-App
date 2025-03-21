import React, { useState } from "react";
import { FaEdit } from "react-icons/fa";
import EditProductModal from "./EditProductModal";

const ProductCard = ({ product, onUpdate, onDelete }) => {
  const {
    id,
    name,
    color,
    quantityBags,
    quantityIndividual,
    sizes,
    date,
    status,
    category,
  } = product || {};

  // Define status colors
  const statusColor = {
    "In Stock": "bg-green-100 text-green-800",
    "Out of Stock": "bg-[#102A4C] text-[#EEE8EE]",
    "Shipped": "bg-blue-100 text-blue-800",
    "In Progress": "bg-rose-400 text-rose-950",
  }[status] || "bg-gray-100 text-gray-800";

  // Format the date
  const formattedDate = date ? new Date(date).toLocaleDateString() : "N/A";

  // State for managing the edit modal
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  // Handle update
  const handleUpdate = (updatedProduct) => {
    setIsEditModalOpen(false);
    onUpdate?.(updatedProduct);
  };

  // Handle delete
  const handleDelete = () => {
    setIsEditModalOpen(false);
    onDelete?.(id);
  };

  return (
    <div className="bg-white p-4 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-200 relative flex flex-col h-full">
      {/* Category Badge */}
      <div className="absolute top-2 left-2 text-xs font-medium text-gray-500">
        {category || "Uncategorized"}
      </div>

      {/* Edit Button */}
      <button
        onClick={() => setIsEditModalOpen(true)}
        className="absolute top-2 right-2 text-gray-500 hover:text-blue-600 transition-colors"
        aria-label="Edit product"
      >
        <FaEdit className="w-4 h-4" />
      </button>

      {/* Product Content */}
      <div className="flex flex-col h-full">
        {/* Product Name */}
        <h3 className="text-lg font-semibold mb-2 truncate">
          {name || "Unnamed Product"}
        </h3>

        {/* Product Details */}
        <div className="space-y-1 text-sm flex-grow">
          {/* Color */}
          {color && color !== "N/A" && (
            <p className="text-gray-600">
              <span className="font-medium">Color:</span> {color}
            </p>
          )}

          {/* Quantity (Bags and Units) */}
          <div className="grid grid-cols-2 gap-x-4">
            {quantityBags > 0 && (
              <p className="text-gray-600">
                <span className="font-medium">Bags:</span> {quantityBags}
              </p>
            )}
            {quantityIndividual > 0 && (
              <p className="text-gray-600">
                <span className="font-medium">Units:</span> {quantityIndividual}
              </p>
            )}
          </div>

          {/* Sizes */}
          {sizes && (
            <p className="text-gray-600">
              <span className="font-medium">Sizes:</span> {sizes}
            </p>
          )}

          {/* Date */}
          <p className="text-gray-600">
            <span className="font-medium">Date:</span> {formattedDate}
          </p>
        </div>

        {/* Status Badge */}
        <div className={`mt-3 px-3 py-1 rounded-full text-sm font-medium text-center ${statusColor}`}>
          {status || "Unknown Status"}
        </div>
      </div>

      {/* Edit Modal */}
      {isEditModalOpen && (
        <EditProductModal
          product={product}
          onClose={() => setIsEditModalOpen(false)}
          onUpdate={handleUpdate}
          onDelete={handleDelete}
        />
      )}
    </div>
  );
};

export default ProductCard;