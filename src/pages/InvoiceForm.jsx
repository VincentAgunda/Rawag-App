import React, { useState } from "react";
import { db } from "../firebase/firebaseConfig";
import { collection, addDoc, getDocs } from "firebase/firestore";

const InvoiceForm = ({ onClose, onInvoiceAdded }) => {
  const [customerName, setCustomerName] = useState("");
  const [date, setDate] = useState(""); // Invoice Date
  const [items, setItems] = useState([{ description: "", size: "", quantity: 1, unitPrice: 0 }]);

  const generateInvoiceNumber = async () => {
    const snapshot = await getDocs(collection(db, "invoices"));
    return snapshot.size + 1;
  };

  const addItem = () => {
    setItems([...items, { description: "", size: "", quantity: 1, unitPrice: 0 }]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const nextInvoiceNumber = await generateInvoiceNumber();

    const subtotal = items.reduce((sum, item) => sum + item.quantity * item.unitPrice, 0);
    const tax = subtotal * 0.16;
    const totalAmount = subtotal + tax;

    const docRef = await addDoc(collection(db, "invoices"), {
      invoiceNumber: nextInvoiceNumber,
      customerName,
      date,
      items,
      subtotal,
      tax,
      totalAmount,
      status: "pending",
    });

    // ✅ Immediately update invoices list
    onInvoiceAdded({
      id: docRef.id,
      invoiceNumber: nextInvoiceNumber,
      customerName,
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
      onClick={onClose} // Closes when clicking outside
    >
      <form
        onClick={(e) => e.stopPropagation()} // Prevents closing when clicking inside the form
        onSubmit={handleSubmit}
        className="bg-white p-4 rounded-lg shadow-md w-full max-w-md h-[70vh] overflow-y-auto"
      >
        <h2 className="text-xl font-bold mb-4">New Invoice</h2>

        {/* Invoice Date */}
        <label className="block font-medium">Invoice Date</label>
        <input
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
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

        {/* ✅ Add Item Button */}
        <button 
          type="button" 
          onClick={addItem} 
          className="bg-green-500 text-white px-2 py-1 mt-2 w-full rounded"
        >
          + Add Item
        </button>

        {/* ✅ Save Invoice Button */}
        <button 
          type="submit" 
          className="bg-blue-500 text-white px-4 py-2 mt-4 block w-full rounded"
        >
          Save Invoice
        </button>
      </form>
    </div>
  );
};

export default InvoiceForm;
