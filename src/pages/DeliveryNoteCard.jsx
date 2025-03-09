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

const DeliveryNoteCard = ({ deliveryNote, onEdit, onDelete, onView, index }) => {
  return (
    <motion.div
      className="border p-4 rounded-lg shadow-md bg-white"
      variants={cardVariants}
      initial="hidden"
      animate="visible"
      custom={index}
    >
      {/* Delivery Note Number */}
      <h3 className="text-lg font-bold text-blue-950">Delivery Note {deliveryNote.deliveryNoteNumber}</h3>

      {/* Customer & Delivery Date */}
      <p className="text-sm"><strong>Customer:</strong> {deliveryNote.customerName}</p>
      <p className="text-sm"><strong>Delivery Date:</strong> {deliveryNote.deliveryDate}</p>

      {/* Delivery Status */}
      <p className="text-sm flex items-center gap-2">
        <strong>Status:</strong>
        <span
          className={`px-2 py-1 text-xs font-semibold rounded-md ${
            deliveryNote.status === "Delivered"
              ? "bg-green-200 text-green-700 border border-green-200"
              : "bg-yellow-100 text-yellow-700 border border-yellow-100"
          }`}
        >
          {deliveryNote.status}
        </span>
      </p>

      {/* Action Buttons */}
      <div className="mt-3 flex justify-between">
        <button onClick={() => onEdit(deliveryNote)} className="text-slate-900">
          <FaEdit size={18} />
        </button>
        <button onClick={() => onView(deliveryNote)} className="text-blue-600">
          <FaEye size={18} />
        </button>
        <button onClick={() => onDelete(deliveryNote.id)} className="text-rose-500">
          <FaTrash size={18} />
        </button>
      </div>
    </motion.div>
  );
};

export default DeliveryNoteCard;