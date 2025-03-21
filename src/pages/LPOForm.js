import React, { useState } from "react";
import { db } from "../firebase/firebaseConfig";
import { collection, addDoc, getDocs } from "firebase/firestore";

const LPOForm = ({ onClose, onLPOAdded }) => {
  const [supplierName, setSupplierName] = useState("");
  const [date, setDate] = useState("");
  const [items, setItems] = useState([{ description: "", size: "", quantity: 1, unitPrice: 0 }]);

  const generateLPONumber = async () => {
    const snapshot = await getDocs(collection(db, "lpos"));
    return snapshot.size + 1;
  };

  const addItem = () => {
    setItems([...items, { description: "", size: "", quantity: 1, unitPrice: 0 }]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const nextLPONumber = await generateLPONumber();

    const subtotal = items.reduce((sum, item) => sum + item.quantity * item.unitPrice, 0);
    const tax = subtotal * 0.16;
    const totalAmount = subtotal + tax;

    const docRef = await addDoc(collection(db, "lpos"), {
      lpoNumber: nextLPONumber,
      supplierName,
      date,
      items,
      subtotal,
      tax,
      totalAmount,
      status: "pending",
    });

    onLPOAdded({
      id: docRef.id,
      lpoNumber: nextLPONumber,
      supplierName,
      date,
      items,
      subtotal,
      tax,
      totalAmount,
      status: "pending",
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
        <h2 className="text-xl font-bold mb-4">New LPO</h2>

        <label className="block font-medium">Date</label>
        <input
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          required
          className="border p-2 w-full mb-2"
        />

        <label className="block font-medium">Supplier Name</label>
        <input
          type="text"
          placeholder="Supplier Name"
          value={supplierName}
          onChange={(e) => setSupplierName(e.target.value)}
          required
          className="border p-2 w-full mb-2"
        />

        <h3 className="mt-4 font-bold">Items</h3>

        <div className="grid grid-cols-4 gap-2 mt-2 font-medium text-gray-700">
          <span>Description</span>
          <span className="text-center">Size</span>
          <span className="text-center">Qty</span>
          <span className="text-center">Unit Price</span>
        </div>

        {items.map((item, index) => (
          <div key={index} className="grid grid-cols-4 gap-2 mb-2">
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
            <input
              type="number"
              placeholder="Price"
              value={item.unitPrice}
              onChange={(e) => {
                const newItems = [...items];
                newItems[index].unitPrice = parseFloat(e.target.value);
                setItems(newItems);
              }}
              className="border p-2 text-center"
            />
          </div>
        ))}

        <button
          type="button"
          onClick={addItem}
          className="bg-green-500 text-white px-2 py-1 mt-2 w-full rounded"
        >
          + Add Item
        </button>

        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 mt-4 block w-full rounded"
        >
          Save LPO
        </button>
      </form>
    </div>
  );
};

export default LPOForm;