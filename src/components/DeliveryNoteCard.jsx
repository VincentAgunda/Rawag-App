import React from "react";

const DeliveryNoteCard = ({ deliveryNote }) => {
  const { id, orderId, customerName, status } = deliveryNote;

  // Determine the status color
  const statusColor = {
    Delivered: "bg-green-100 text-green-800",
    Pending: "bg-yellow-100 text-yellow-800",
  }[status];

  return (
    <div className="bg-white p-4 rounded-lg shadow-md">
      <h3 className="text-xl font-semibold">Delivery Note #{id}</h3>
      <p className="text-gray-600">Order ID: {orderId}</p>
      <p className="text-gray-600">Customer: {customerName}</p>
      <div className={`mt-2 px-2 py-1 rounded-full text-sm ${statusColor}`}>
        {status}
      </div>
    </div>
  );
};

export default DeliveryNoteCard;