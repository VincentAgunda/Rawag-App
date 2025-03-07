import { FaEdit, FaEye, FaTrash } from "react-icons/fa";
import { motion } from "framer-motion";

const cardVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: (index) => ({
    opacity: 1,
    y: 0,
    transition: { delay: index * 0.1, duration: 0.3, ease: "easeOut" },
  }),
};

const InvoiceCard = ({ invoice, onEdit, onDelete, onView, index }) => {
  return (
    <motion.div
      className="border p-4 rounded-lg shadow-md bg-white"
      variants={cardVariants}
      initial="hidden"
      animate="visible"
      custom={index}
    >
      {/* Invoice Number */}
      <h3 className="text-lg font-bold text-blue-950">Invoice {invoice.invoiceNumber}</h3>

      {/* Customer & Total */}
      <p className="text-sm"><strong>Customer:</strong> {invoice.customerName}</p>
      <p className="text-sm"><strong>Total:</strong> ksh {invoice.totalAmount.toFixed(2)}</p>

      {/* Payment Status with Nice Styling */}
      <p className="text-sm flex items-center gap-2">
        <strong>Status:</strong>
        <span 
          className={`px-2 py-1 text-xs font-semibold rounded-md ${
            invoice.status === "Paid" 
              ? "bg-green-200 text-green-700 border border-green-200" 
              : "bg-red-100 text-red-600 border border-red-100"
          }`}
        >
          {invoice.status}
        </span>
      </p>

      {/* Action Buttons */}
      <div className="mt-3 flex justify-between">
        <button onClick={() => onEdit(invoice)} className="text-slate-900">
          <FaEdit size={18} />
        </button>
        <button onClick={() => onView(invoice)} className="text-blue-600">
          <FaEye size={18} />
        </button>
        <button onClick={() => onDelete(invoice.id)} className="text-rose-500">
          <FaTrash size={18} />
        </button>
      </div>
    </motion.div>
  );
};

export default InvoiceCard;
