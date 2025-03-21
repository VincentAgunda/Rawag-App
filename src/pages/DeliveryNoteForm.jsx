import React, { useState, useEffect } from "react";
import { db } from "../firebase/firebaseConfig";
import { collection, addDoc, getDocs, query, where, doc, updateDoc, orderBy, limit } from "firebase/firestore";

const DeliveryNoteForm = ({ onClose, onDeliveryNoteAdded }) => {
  const [customerName, setCustomerName] = useState("");
  const [deliveryDate, setDeliveryDate] = useState("");
  const [items, setItems] = useState([{ description: "", size: "", quantity: 1 }]);
  const [lpoNumber, setLpoNumber] = useState("");
  const [loading, setLoading] = useState(false);

  // Generate the next delivery note number (optimized)
  const generateDeliveryNoteNumber = async () => {
    const q = query(collection(db, "deliveryNotes"), orderBy("deliveryNoteNumber", "desc"), limit(1));
    const snapshot = await getDocs(q);
    return snapshot.empty ? 1 : snapshot.docs[0].data().deliveryNoteNumber + 1;
  };

  // Add a new item row
  const addItem = () => {
    setItems([...items, { description: "", size: "", quantity: 1 }]);
  };

  // Fetch LPO data and auto-fill fields
  const fetchLPOData = async () => {
    if (!lpoNumber) return alert("Please enter an LPO number!");

    const q = query(collection(db, "lpos"), where("lpoNumber", "==", parseInt(lpoNumber, 10)));
    const snapshot = await getDocs(q);

    if (!snapshot.empty) {
      const lpoDoc = snapshot.docs[0];
      const lpoData = lpoDoc.data();

      // Auto-fill fields
      setItems(lpoData.items);
      setCustomerName(lpoData.supplierName);

      // Update LPO status
      const lpoRef = doc(db, "lpos", lpoDoc.id);
      await updateDoc(lpoRef, { status: "Delivered" });

      console.log("LPO status updated to Delivered.");
    } else {
      alert("LPO not found!");
    }
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const nextDeliveryNoteNumber = await generateDeliveryNoteNumber();

      // Validate items
      const validItems = items.filter(item => item.description.trim() && item.size.trim() && item.quantity > 0);
      if (validItems.length === 0) {
        alert("Please add at least one valid item.");
        setLoading(false);
        return;
      }

      // Calculate total quantity
      const totalQuantity = validItems.reduce((sum, item) => sum + item.quantity, 0);

      // Save to Firestore
      const docRef = await addDoc(collection(db, "deliveryNotes"), {
        deliveryNoteNumber: nextDeliveryNoteNumber,
        customerName,
        deliveryDate,
        items: validItems,
        totalQuantity,
        status: "Pending",
      });

      onDeliveryNoteAdded({
        id: docRef.id,
        deliveryNoteNumber: nextDeliveryNoteNumber,
        customerName,
        deliveryDate,
        items: validItems,
        totalQuantity,
        status: "Pending",
      });

      onClose();
    } catch (error) {
      console.error("Error saving delivery note:", error);
      alert("Failed to save delivery note.");
    } finally {
      setLoading(false);
    }
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

        {/* LPO Number Input with Auto-Populate */}
        <label className="block font-medium">LPO Number</label>
        <div className="flex gap-2 mb-2">
          <input
            type="number"
            placeholder="Enter LPO Number"
            value={lpoNumber}
            onChange={(e) => setLpoNumber(e.target.value)}
            className="border p-2 w-full"
          />
          <button
            type="button"
            onClick={fetchLPOData}
            className="bg-blue-500 text-white px-4 py-2 rounded"
          >
            Auto-Populate
          </button>
        </div>

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
              min="1"
              onChange={(e) => {
                const newItems = [...items];
                newItems[index].quantity = Math.max(1, parseInt(e.target.value, 10));
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
          className={`mt-4 block w-full rounded ${loading ? "bg-gray-400" : "bg-blue-500 text-white px-4 py-2"}`}
          disabled={loading}
        >
          {loading ? "Saving..." : "Save Delivery Note"}
        </button>
      </form>
    </div>
  );
};

export default DeliveryNoteForm;
