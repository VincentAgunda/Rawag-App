import React, { useState } from "react";
import { db } from "../firebase/firebaseConfig";
import { collection, addDoc, getDocs } from "firebase/firestore";

const DeliveryNoteForm = ({ onClose, onDeliveryNoteAdded }) => {
  const [customerName, setCustomerName] = useState("");
  const [deliveryDate, setDeliveryDate] = useState("");
  const [items, setItems] = useState([{ description: "", size: "", quantity: 1 }]);

  const generateDeliveryNoteNumber = async () => {
    const snapshot = await getDocs(collection(db, "deliveryNotes"));
    return snapshot.size + 1;
  };

  const addItem = () => {
    setItems([...items, { description: "", size: "", quantity: 1 }]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const nextDeliveryNoteNumber = await generateDeliveryNoteNumber();

    // Calculate total quantity
    const totalQuantity = items.reduce((sum, item) => sum + item.quantity, 0);

    const docRef = await addDoc(collection(db, "deliveryNotes"), {
      deliveryNoteNumber: nextDeliveryNoteNumber,
      customerName,
      deliveryDate,
      items,
      totalQuantity,
      status: "Pending",
    });

    onDeliveryNoteAdded({
      id: docRef.id,
      deliveryNoteNumber: nextDeliveryNoteNumber,
      customerName,
      deliveryDate,
      items,
      totalQuantity,
      status: "Pending",
    });

    onClose();
  };

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm flex items-center justify-center z-50"
      onClick={onClose}
    >
      <form
        onClick={(e) => e.stopPropagation()}
        onSubmit={handleSubmit}
        className="bg-white p-4 rounded-lg shadow-md w-full max-w-md h-[70vh] overflow-y-auto"
      >
        <h2 className="text-xl font-bold mb-4">New Delivery Note</h2>

        {/* Delivery Date */}
        <label className="block font-medium">Delivery Date</label>
        <input
          type="date"
          value={deliveryDate}
          onChange={(e) => setDeliveryDate(e.target.value)}
          required
          className="border p-2 w-full mb-2"
        />

        {/* Customer Name */}
        <label className="block font-medium">Customer Name</label>
        <input
          type="text"
          placeholder="Customer Name"
          value={customerName}
          onChange={(e) => setCustomerName(e.target.value)}
          required
          className="border p-2 w-full mb-2"
        />

        {/* Items Section */}
        <h3 className="mt-4 font-bold">Items</h3>

        {/* Column Labels */}
        <div className="grid grid-cols-3 gap-2 mt-2 font-medium text-gray-700">
          <span>Description</span>
          <span className="text-center">Size</span>
          <span className="text-center">Quantity</span>
        </div>

        {items.map((item, index) => (
          <div key={index} className="grid grid-cols-3 gap-2 mb-2">
            <input
              type="text"
              placeholder="Description"
              value={item.description}
              onChange={(e) => {
                const newItems = [...items];
                newItems[index].description = e.target.value;
                setItems(newItems);
              }}
              className="border p-2"
            />
            <input
              type="text"
              placeholder="Size"
              value={item.size}
              onChange={(e) => {
                const newItems = [...items];
                newItems[index].size = e.target.value;
                setItems(newItems);
              }}
              className="border p-2 text-center"
            />
            <input
              type="number"
              placeholder="Qty"
              value={item.quantity}
              onChange={(e) => {
                const newItems = [...items];
                newItems[index].quantity = parseInt(e.target.value, 10);
                setItems(newItems);
              }}
              className="border p-2 text-center"
            />
          </div>
        ))}

        {/* Add Item Button */}
        <button
          type="button"
          onClick={addItem}
          className="bg-green-500 text-white px-2 py-1 mt-2 w-full rounded"
        >
          + Add Item
        </button>

        {/* Save Delivery Note Button */}
        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 mt-4 block w-full rounded"
        >
          Save Delivery Note
        </button>
      </form>
    </div>
  );
};

export default DeliveryNoteForm;