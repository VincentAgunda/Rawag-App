import React from "react";

const DeliveryNoteTable = ({ deliveryNotes, onViewDetails, onDelete }) => {
  return (
    <div className="overflow-x-auto">
      <table className="w-full border-collapse border border-gray-200">
        <thead>
          <tr className="bg-gray-100">
            <th className="border p-2">Delivery Note #</th>
            <th className="border p-2">Customer</th>
            <th className="border p-2">Delivery Date</th>
            <th className="border p-2">Total Quantity</th>
            <th className="border p-2">Status</th>
            <th className="border p-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {deliveryNotes.map((deliveryNote) => (
            <tr key={deliveryNote.id} className="text-center">
              <td className="border p-2">{deliveryNote.deliveryNoteNumber}</td>
              <td className="border p-2">{deliveryNote.customerName}</td>
              <td className="border p-2">{deliveryNote.deliveryDate}</td>
              <td className="border p-2">{deliveryNote.totalQuantity}</td>
              <td className="border p-2">
                {deliveryNote.status === "Delivered" ? (
                  <span className="text-green-600 font-bold">Delivered</span>
                ) : (
                  <span className="text-yellow-600 font-bold">Pending</span>
                )}
              </td>
              <td className="border p-2">
                <button
                  onClick={() => onViewDetails(deliveryNote)}
                  className="bg-blue-500 text-white px-3 py-1 rounded mr-2"
                >
                  View Details
                </button>
                <button
                  onClick={() => onDelete(deliveryNote.id)}
                  className="bg-red-500 text-white px-3 py-1 rounded"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default DeliveryNoteTable;