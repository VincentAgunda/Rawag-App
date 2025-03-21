import React from "react";
import { FaEye, FaEdit, FaTrash } from "react-icons/fa";

const LPOTable = ({ lpos, onViewDetails, onEdit, onDelete }) => {
  return (
    <div className="p-4">
      {/* Large Screen: 5-Column Grid */}
      <div className="hidden sm:grid grid-cols-5 gap-4">
        {lpos.map((lpo) => (
          <div
            key={lpo.id}
            className="border rounded-lg p-4 shadow-md bg-white flex flex-col justify-between"
          >
            <h3 className="text-md font-bold text-blue-950">LPO {lpo.lpoNumber}</h3>
            <p className="text-sm"><strong>Supplier:</strong> {lpo.supplierName}</p>
            <p className="text-sm"><strong>Date:</strong> {lpo.date}</p>
            <p className="text-sm"><strong>Total:</strong> Ksh {lpo.totalAmount.toFixed(2)}</p>
            <p className="text-sm flex items-center gap-2">
              <strong>Status:</strong>
              <span
                className={`px-2 py-1 text-xs font-semibold rounded-md ${
                  lpo.status === "Delivered"
                    ? "bg-green-200 text-green-700 border border-green-200"
                    : lpo.status === "Pending"
                    ? "bg-yellow-100 text-yellow-700 border border-yellow-100"
                    : "bg-blue-100 text-blue-700 border border-blue-100"
                }`}
              >
                {lpo.status}
              </span>
            </p>

            {/* Icons Centered */}
            <div className="mt-3 flex justify-center items-center space-x-4">
              <button onClick={() => onEdit(lpo)} className="text-green-500 hover:text-green-700">
                <FaEdit size={18} />
              </button>
              <button onClick={() => onViewDetails(lpo)} className="text-blue-500 hover:text-blue-700">
                <FaEye size={18} />
              </button>
              <button onClick={() => onDelete(lpo.id)} className="text-red-500 hover:text-red-700">
                <FaTrash size={18} />
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Mobile View: Side-by-Side Layout (2-Columns) */}
      <div className="sm:hidden grid grid-cols-2 gap-4">
        {lpos.map((lpo) => (
          <div key={lpo.id} className="border rounded-lg p-4 shadow-md bg-white">
            <h3 className="text-md font-bold text-blue-950">LPO {lpo.lpoNumber}</h3>
            <p className="text-sm"><strong>Supplier:</strong> {lpo.supplierName}</p>
            <p className="text-sm"><strong>Date:</strong> {lpo.date}</p>
            <p className="text-sm"><strong>Total:</strong> Ksh {lpo.totalAmount.toFixed(2)}</p>
            <p className="text-sm flex items-center gap-2">
              <strong>Status:</strong>
              <span
                className={`px-2 py-1 text-xs font-semibold rounded-md ${
                  lpo.status === "Delivered"
                    ? "bg-green-200 text-green-700 border border-green-200"
                    : lpo.status === "Pending"
                    ? "bg-yellow-100 text-yellow-700 border border-yellow-100"
                    : "bg-blue-100 text-blue-700 border border-blue-100"
                }`}
              >
                {lpo.status}
              </span>
            </p>

            {/* Icons Centered */}
            <div className="flex justify-center items-center mt-3 space-x-4">
              <button onClick={() => onViewDetails(lpo)} className="text-blue-500 hover:text-blue-700">
                <FaEye size={18} />
              </button>
              <button onClick={() => onEdit(lpo)} className="text-green-500 hover:text-green-700">
                <FaEdit size={18} />
              </button>
              <button onClick={() => onDelete(lpo.id)} className="text-red-500 hover:text-red-700">
                <FaTrash size={18} />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default LPOTable;

