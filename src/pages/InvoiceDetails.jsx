import React, { useState } from "react";
import { motion } from "framer-motion";
import { AiOutlineClose } from "react-icons/ai"; // Close icon
import PDFGenerator from "../components/PDFGenerator";

const InvoiceDetails = ({ invoice, onUpdate, onClose, isViewOnly = false }) => {
  const [formData, setFormData] = useState(invoice);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSave = () => {
    onUpdate(formData);
  };

  return (
    <motion.div
      className="fixed inset-0 bg-black bg-opacity-40 backdrop-blur-md flex items-end sm:items-center justify-center z-50 p-2 sm:p-4"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose} // Tap outside to close
    >
      <motion.div
        onClick={(e) => e.stopPropagation()} // Prevent close when clicking inside
        initial={{ y: "100%", opacity: 0 }}
        animate={{ y: "0%", opacity: 1 }}
        exit={{ y: "100%", opacity: 0 }}
        transition={{ duration: 0.3 }}
        className="bg-white p-3 sm:p-4 rounded-t-lg sm:rounded-lg shadow-md w-full max-w-md h-[65vh] sm:h-[70vh] overflow-y-auto relative"
      >
        {/* Close Button */}
        <button
          className="absolute top-2 right-2 text-gray-500 hover:text-gray-800"
          onClick={onClose}
        >
          <AiOutlineClose size={18} />
        </button>

        <h2 className="text-base sm:text-lg font-bold mb-2 sm:mb-3 text-center">
          {isViewOnly ? "Invoice Details" : "Edit Invoice"}
        </h2>

        {/* Invoice Number & Date */}
        <div className="grid grid-cols-2 gap-2 text-xs sm:text-sm">
          <div>
            <label className="block font-medium">Invoice #</label>
            <input
              type="text"
              name="invoiceNumber"
              value={formData.invoiceNumber}
              disabled
              className="border p-1 rounded w-full"
            />
          </div>
          <div>
            <label className="block font-medium">Date</label>
            <input
              type="date"
              name="date"
              value={formData.date}
              onChange={handleChange}
              disabled={isViewOnly}
              className="border p-1 rounded w-full"
            />
          </div>
        </div>

        {/* Customer Name */}
        <label className="block font-medium mt-2 text-xs sm:text-sm">
          Customer Name
        </label>
        <input
          type="text"
          name="customerName"
          value={formData.customerName}
          onChange={handleChange}
          disabled={isViewOnly}
          className="border p-1 rounded w-full text-xs sm:text-sm"
        />

        {/* Status Field */}
        <label className="block font-medium mt-2 text-xs sm:text-sm">
          Status
        </label>
        <select
          name="status"
          value={formData.status}
          onChange={handleChange}
          disabled={isViewOnly}
          className="border p-1 rounded w-full text-xs sm:text-sm"
        >
          <option value="Paid">Paid</option>
          <option value="Pending">Pending</option>
        </select>

        {/* Items List */}
        <h3 className="text-xs sm:text-sm font-medium mt-3 mb-2">Items:</h3>
        <div className="border rounded p-2 mb-3 text-xs">
          <div className="grid grid-cols-5 gap-1 font-bold border-b pb-1 mb-1">
            <span>Description</span>
            <span>Size</span>
            <span>Qty</span>
            <span>Price</span>
            <span>Total</span>
          </div>
          {formData.items.map((item, index) => (
            <div key={index} className="grid grid-cols-5 gap-1 border-b py-1">
              <input
                type="text"
                value={item.description}
                disabled={isViewOnly}
                onChange={(e) => {
                  const newItems = [...formData.items];
                  newItems[index].description = e.target.value;
                  setFormData({ ...formData, items: newItems });
                }}
                className="border p-1 text-xs"
              />
              <input
                type="text"
                value={item.size}
                disabled={isViewOnly}
                onChange={(e) => {
                  const newItems = [...formData.items];
                  newItems[index].size = e.target.value;
                  setFormData({ ...formData, items: newItems });
                }}
                className="border p-1 text-xs"
              />
              <input
                type="number"
                value={item.quantity}
                disabled={isViewOnly}
                onChange={(e) => {
                  const newItems = [...formData.items];
                  newItems[index].quantity = parseInt(e.target.value, 10);
                  setFormData({ ...formData, items: newItems });
                }}
                className="border p-1 text-xs w-10"
              />
              <input
                type="number"
                value={item.unitPrice}
                disabled={isViewOnly}
                onChange={(e) => {
                  const newItems = [...formData.items];
                  newItems[index].unitPrice = parseFloat(e.target.value);
                  setFormData({ ...formData, items: newItems });
                }}
                className="border p-1 text-xs w-14"
              />
              <span className="p-1 text-right">
                {(item.quantity * item.unitPrice).toFixed(2)}
              </span>
            </div>
          ))}
        </div>

        {/* Totals */}
        <div className="grid grid-cols-2 gap-2 text-xs sm:text-sm">
          <div>
            <label className="block font-medium">Subtotal</label>
            <input
              type="number"
              name="subtotal"
              value={formData.subtotal.toFixed(2)}
              disabled
              className="border p-1 rounded w-full"
            />
          </div>
          <div>
            <label className="block font-medium">VAT (16%)</label>
            <input
              type="number"
              name="tax"
              value={formData.tax.toFixed(2)}
              disabled
              className="border p-1 rounded w-full"
            />
          </div>
        </div>

        <label className="block font-medium mt-2 text-xs sm:text-sm">
          Total Amount
        </label>
        <input
          type="number"
          name="totalAmount"
          value={formData.totalAmount.toFixed(2)}
          disabled
          className="border p-1 rounded w-full text-xs sm:text-sm"
        />

        {/* Buttons */}
        <div className="flex justify-between mt-3 sm:mt-4">
          {!isViewOnly && (
            <button
              onClick={handleSave}
              className="bg-green-500 text-white px-3 sm:px-4 py-2 rounded-lg text-xs sm:text-sm"
            >
              Save
            </button>
          )}
          <PDFGenerator invoice={formData} />
        </div>
      </motion.div>
    </motion.div>
  );
};

export default InvoiceDetails;
