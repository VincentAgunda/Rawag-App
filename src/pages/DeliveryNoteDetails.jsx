import React from "react";


const DeliveryNoteDetails = ({ match }) => {
  const noteId = match.params.id;
  const deliveryNote = {
    id: noteId,
    orderId: "ORD001",
    customerName: "Customer A",
    status: "Delivered",
  };

  return (
    <div>
     
      <main className="container mx-auto p-4">
        <h2 className="text-2xl font-bold mb-4">Delivery Note Details</h2>
        <div className="bg-white p-4 rounded-lg shadow-md">
          <h3 className="text-xl font-semibold">Delivery Note #{deliveryNote.id}</h3>
          <p className="text-gray-600">Order ID: {deliveryNote.orderId}</p>
          <p className="text-gray-600">Customer: {deliveryNote.customerName}</p>
          <div className={`mt-2 px-2 py-1 rounded-full text-sm ${deliveryNote.status === "Delivered" ? "bg-green-100 text-green-800" : "bg-yellow-100 text-yellow-800"}`}>
            {deliveryNote.status}
          </div>
        </div>
      </main>
      
    </div>
  );
};

export default DeliveryNoteDetails;