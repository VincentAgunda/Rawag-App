import React from "react";
import DeliveryNoteCard from "../components/DeliveryNoteCard";

const DeliveryNoteManagement = () => {
  const deliveryNotes = [
    { id: 1, orderId: "ORD001", customerName: "Customer A", status: "Delivered" },
    { id: 2, orderId: "ORD002", customerName: "Customer B", status: "Pending" },
  ];

  return (
    <div>
      
      <main className="container mx-auto p-4">
        <h2 className="text-2xl font-bold mb-4">Delivery Notes</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {deliveryNotes.map((note) => (
            <DeliveryNoteCard key={note.id} deliveryNote={note} />
          ))}
        </div>
      </main>
      
    </div>
  );
};

export default DeliveryNoteManagement;