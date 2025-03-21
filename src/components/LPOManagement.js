import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { db } from "../firebase/firebaseConfig";
import { collection, getDocs, doc, deleteDoc, updateDoc } from "firebase/firestore";
import LPOTable from "../pages/LPOTable";
import LPOForm from "../pages/LPOForm";
import LPODetails from "./LPODetails";

const LPOManagement = () => {
  const [lpos, setLpos] = useState([]);
  const [selectedLPO, setSelectedLPO] = useState(null);
  const [viewLPO, setViewLPO] = useState(null);
  const [showForm, setShowForm] = useState(false);

  useEffect(() => {
    const fetchLPOs = async () => {
      const snapshot = await getDocs(collection(db, "lpos"));
      setLpos(snapshot.docs.map((doc, index) => ({
        id: doc.id,
        lpoNumber: index + 1,
        ...doc.data(),
      })));
    };
    fetchLPOs();
  }, []);

  const deleteLPO = async (id) => {
    await deleteDoc(doc(db, "lpos", id));
    setLpos(lpos.filter((lpo) => lpo.id !== id));
  };

  const handleEdit = (lpo) => {
    setSelectedLPO(lpo);
  };

  const handleView = (lpo) => {
    setViewLPO(lpo);
  };

  const handleUpdate = async (updatedLPO) => {
    await updateDoc(doc(db, "lpos", updatedLPO.id), updatedLPO);
    setLpos(lpos.map((lpo) => (lpo.id === updatedLPO.id ? updatedLPO : lpo)));
    setSelectedLPO(null);
  };

  const handleLPOAdded = (newLPO) => {
    setLpos((prevLPOs) => [...prevLPOs, newLPO]);
  };

  return (
    <motion.div className="p-4 flex flex-col min-h-screen">
      <h2 className="text-2xl font-bold mb-4 text-blue-950">LPOs</h2>

      <button
        onClick={() => setShowForm(true)}
        className="bg-rose-900 text-white px-4 py-2 mb-4 rounded-lg"
      >
        + Add LPO
      </button>

      <LPOTable
        lpos={lpos}
        onViewDetails={handleView}
        onEdit={handleEdit}
        onDelete={deleteLPO}
      />

      <AnimatePresence>
        {showForm && (
          <>
            <motion.div
              className="fixed inset-0 bg-black bg-opacity-40 backdrop-blur-sm z-40"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              transition={{ duration: 0.3 }}
              className="fixed inset-0 flex items-center justify-center z-50"
            >
              <LPOForm onClose={() => setShowForm(false)} onLPOAdded={handleLPOAdded} />
            </motion.div>
          </>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {selectedLPO && (
          <>
            <motion.div
              className="fixed inset-0 bg-black bg-opacity-40 backdrop-blur-sm z-40"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              transition={{ duration: 0.3 }}
              className="fixed inset-0 flex items-center justify-center z-50"
            >
              <LPODetails lpo={selectedLPO} onUpdate={handleUpdate} onClose={() => setSelectedLPO(null)} />
            </motion.div>
          </>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {viewLPO && (
          <>
            <motion.div
              className="fixed inset-0 bg-black bg-opacity-40 backdrop-blur-sm z-40"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              transition={{ duration: 0.3 }}
              className="fixed inset-0 flex items-center justify-center z-50"
            >
              <LPODetails lpo={viewLPO} onClose={() => setViewLPO(null)} isViewOnly />
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default LPOManagement;