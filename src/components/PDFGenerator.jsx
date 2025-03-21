import React from "react";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import { db } from "../firebase/firebaseConfig";
import { doc, updateDoc } from "firebase/firestore";

const PDFGenerator = ({ invoice, deliveryNote, lpo, onStatusUpdate }) => {
  const updateDeliveryStatus = async (deliveryNoteId) => {
    try {
      const deliveryNoteRef = doc(db, "deliveryNotes", deliveryNoteId);
      await updateDoc(deliveryNoteRef, {
        status: "Delivered"
      });
      if (onStatusUpdate) onStatusUpdate();
    } catch (error) {
      console.error("Error updating delivery status:", error);
      alert("Failed to update delivery status!");
    }
  };

  const generatePDF = () => {
    if (!invoice && !deliveryNote && !lpo) {
      console.error("No data provided for PDF generation!");
      alert("No data available to generate PDF.");
      return;
    }

    const doc = new jsPDF();
    const maroonColor = "#800000";

    // Common Header
    doc.setFontSize(16);
    doc.setTextColor(maroonColor);
    doc.text("Rawag Collection", 14, 20);
    doc.setFontSize(12);
    doc.setTextColor("#000000");
    doc.text("For smart outfits", 14, 26);
    doc.text("Tel: 0727 207 245, 0738 295 663 | Email: rawagcollection@gmail.com", 14, 32);

    if (invoice) {
      doc.setFontSize(14);
      doc.setTextColor(maroonColor);
      doc.text("INVOICE", 160, 20);
      doc.setFontSize(12);
      doc.setTextColor("#000000");
      doc.text(`Date: ${invoice.date || ""}`, 160, 30);
      doc.text(`Invoice No: #${invoice.invoiceNumber || ""}`, 160, 36);

      // Bill To
      doc.setTextColor(maroonColor);
      doc.text("BILL TO:", 14, 50);
      doc.setTextColor("#000000");
      doc.text(invoice.customerName || "", 14, 56);

      // Invoice Table
      const invoiceTableColumn = ["Description", "Size", "Qty", "Unit Price", "Amount"];
      const invoiceTableRows = invoice.items?.length > 0
        ? invoice.items.map((item) => [
            item.description || "",
            item.size || "",
            item.quantity || 0,
            (item.unitPrice || 0).toFixed(2),
            ((item.quantity || 0) * (item.unitPrice || 0)).toFixed(2),
          ])
        : [["No items available", "-", "-", "-", "-"]];

      autoTable(doc, {
        startY: 70,
        head: [invoiceTableColumn],
        body: invoiceTableRows,
        theme: "grid",
        headStyles: { fillColor: maroonColor, textColor: "#FFFFFF" },
      });

      // Invoice Totals
      let finalY = doc.lastAutoTable.finalY + 10;
      doc.setTextColor("#000000");
      doc.text(`SUB-TOTAL: ${invoice.subtotal?.toFixed(2) || "0.00"}`, 150, finalY);
      doc.text(`VAT (16%): ${invoice.tax?.toFixed(2) || "0.00"}`, 150, finalY + 6);
      doc.text(`TOTAL: ${invoice.totalAmount?.toFixed(2) || "0.00"}`, 150, finalY + 12);

      doc.save(`Invoice_#${invoice.invoiceNumber || ""}.pdf`);
    } else if (deliveryNote) {
      doc.setFontSize(14);
      doc.setTextColor(maroonColor);
      doc.text("DELIVERY NOTE", 160, 20);
      doc.setFontSize(12);
      doc.setTextColor("#000000");
      doc.text(`Date: ${deliveryNote.deliveryDate || ""}`, 160, 30);
      doc.text(`Delivery Note No: #${deliveryNote.deliveryNoteNumber || ""}`, 160, 36);

      // Delivered To
      doc.setTextColor(maroonColor);
      doc.text("DELIVERED TO:", 14, 50);
      doc.setTextColor("#000000");
      doc.text(deliveryNote.customerName || "", 14, 56);

      // Delivery Note Table
      const deliveryNoteTableColumn = ["Description", "Size", "Quantity"];
      const deliveryNoteTableRows = deliveryNote.items?.length > 0
        ? deliveryNote.items.map(item => [
            item.description || "",
            item.size || "",
            item.quantity || 0
          ])
        : [["No items available", "-", "-"]];

      autoTable(doc, {
        startY: 70,
        head: [deliveryNoteTableColumn],
        body: deliveryNoteTableRows,
        theme: "grid",
        headStyles: { fillColor: maroonColor, textColor: "#FFFFFF" },
      });

      let finalY = doc.lastAutoTable.finalY + 10;
      doc.setTextColor("#000000");
      doc.text(`TOTAL : ${deliveryNote.totalQuantity || "0"}`, 150, finalY);

      doc.save(`DeliveryNote_#${deliveryNote.deliveryNoteNumber || ""}.pdf`);

      if (deliveryNote.status !== "Delivered" && deliveryNote.id) {
        updateDeliveryStatus(deliveryNote.id);
      }
    } else if (lpo) {
      doc.setFontSize(14);
      doc.setTextColor(maroonColor);
      doc.text("LOCAL PURCHASE ORDER (LPO)", 160, 20);
      doc.setFontSize(12);
      doc.setTextColor("#000000");
      doc.text(`Date: ${lpo.date || ""}`, 160, 30);
      doc.text(`LPO No: #${lpo.lpoNumber || ""}`, 160, 36);

      // Supplier Details
      doc.setTextColor(maroonColor);
      doc.text("SUPPLIER:", 14, 50);
      doc.setTextColor("#000000");
      doc.text(lpo.supplierName || "", 14, 56);

      doc.save(`LPO_#${lpo.lpoNumber || ""}.pdf`);
    }
  };

  return (
    <button onClick={generatePDF} className="bg-blue-500 text-white px-4 py-2 mt-2 rounded-lg">
      Download PDF
    </button>
  );
};

export default PDFGenerator;
