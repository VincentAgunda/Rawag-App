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

const LPOCard = ({ lpo, onEdit, onDelete, onView, index }) => {
  return (
    <motion.div
      className="border p-4 rounded-lg shadow-md bg-white w-64 text-sm"
      variants={cardVariants}
      initial="hidden"
      animate="visible"
      custom={index}
    >
      {/* LPO Number (Title) */}
      <h3 className="text-md font-bold text-blue-950">LPO {lpo.lpoNumber}</h3>

      {/* Supplier & Date */}
      <p><strong>Supplier:</strong> {lpo.supplierName}</p>
      <p><strong>Date:</strong> {lpo.date}</p>

      {/* Status Badge */}
      <p className="flex items-center gap-2 mt-2">
        <strong>Status:</strong>
        <span
          className={`px-2 py-1 text-xs font-semibold rounded-md ${
            lpo.status === "Delivered"
              ? "bg-green-200 text-green-700 border border-green-200"
              : "bg-yellow-100 text-yellow-700 border border-yellow-100"
          }`}
        >
          {lpo.status}
        </span>
      </p>

      {/* Action Buttons */}
      <div className="mt-3 flex justify-between">
        <button onClick={() => onEdit(lpo)} className="text-gray-600 hover:text-gray-800">
          <FaEdit size={16} />
        </button>
        <button onClick={() => onView(lpo)} className="text-blue-600 hover:text-blue-800">
          <FaEye size={16} />
        </button>
        <button onClick={() => onDelete(lpo.id)} className="text-red-500 hover:text-red-700">
          <FaTrash size={16} />
        </button>
      </div>
    </motion.div>
  );
};

export default LPOCard;
