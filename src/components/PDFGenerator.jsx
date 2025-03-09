import React from "react";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

const PDFGenerator = ({ invoice, deliveryNote }) => {
  const generatePDF = () => {
    const doc = new jsPDF();

    // Set maroon color for headers and titles
    const maroonColor = "#800000";

    // Common Header
    doc.setFontSize(16);
    doc.setTextColor(maroonColor); // Maroon color
    doc.text("Rawag Collection", 14, 20);
    doc.setFontSize(12);
    doc.setTextColor("#000000"); // Maroon color
    doc.text("For smart outfits", 14, 26);
    doc.setTextColor("#000000"); // Reset to black for contact info
    doc.text("Tel: 0727 207 245, 0738 295 663 | Email: rawagcollection@gmail.com", 14, 32);

    if (invoice) {
      // Generate Invoice PDF
      doc.setFontSize(14);
      doc.setTextColor(maroonColor); // Maroon color
      doc.text("INVOICE", 160, 20);
      doc.setFontSize(12);
      doc.setTextColor("#000000"); // Reset to black for details
      doc.text(`Date: ${invoice.date || ""}`, 160, 30);
      doc.text(`Invoice No: #${invoice.invoiceNumber || ""}`, 160, 36); // Added # before invoice number

      // Bill To
      doc.setTextColor("#000000"); // Maroon color
      doc.text("BILL TO:", 14, 50);
      doc.setTextColor("#000000"); // Reset to black for customer name
      doc.text(invoice.customerName || "", 14, 56);

      // Invoice Table
      const invoiceTableColumn = ["Description", "Size", "Qty", "Unit Price", "Amount"];
      const invoiceTableRows =
        invoice.items && invoice.items.length > 0
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
        headStyles: { fillColor: maroonColor, textColor: "#FFFFFF" }, // Maroon header with white text
      });

      // Invoice Totals
      let finalY = doc.lastAutoTable.finalY + 10;
      doc.setTextColor("#000000"); // Maroon color
      doc.text(`SUB-TOTAL: ${invoice.subtotal?.toFixed(2) || "0.00"}`, 150, finalY);
      doc.text(`VAT (16%): ${invoice.tax?.toFixed(2) || "0.00"}`, 150, finalY + 6);
      doc.text(`TOTAL: ${invoice.totalAmount?.toFixed(2) || "0.00"}`, 150, finalY + 12);

      // Save Invoice PDF
      doc.save(`Invoice_#${invoice.invoiceNumber || ""}.pdf`); // Added # in file name
    } else if (deliveryNote) {
      // Generate Delivery Note PDF
      doc.setFontSize(14);
      doc.setTextColor("#000000"); // Maroon color
      doc.text("DELIVERY NOTE", 160, 20);
      doc.setFontSize(12);
      doc.setTextColor("#000000"); // Reset to black for details
      doc.text(`Date: ${deliveryNote.deliveryDate || ""}`, 160, 30);
      doc.text(`Delivery Note No: #${deliveryNote.deliveryNoteNumber || ""}`, 160, 36); // Added # before delivery note number

      // Delivered To
      doc.setTextColor( maroonColor); // Maroon color
      doc.text("DELIVERED TO:", 14, 50);
      doc.setTextColor("#000000"); // Reset to black for customer name
      doc.text(deliveryNote.customerName || "", 14, 56);

      // Delivery Note Table
      const deliveryNoteTableColumn = ["Description", "Size", "Quantity"];
      const deliveryNoteTableRows =
        deliveryNote.items && deliveryNote.items.length > 0
          ? deliveryNote.items.map((item) => [
              item.description || "",
              item.size || "",
              item.quantity || 0,
            ])
          : [["No items available", "-", "-"]];

      autoTable(doc, {
        startY: 70,
        head: [deliveryNoteTableColumn],
        body: deliveryNoteTableRows,
        theme: "grid",
        headStyles: { fillColor: maroonColor, textColor: "#FFFFFF" }, // Maroon header with white text
      });

      // Total Quantity
      let finalY = doc.lastAutoTable.finalY + 10;
      doc.setTextColor("#000000"); // Maroon color
      doc.text(`TOTAL : ${deliveryNote.totalQuantity || "0"}`, 150, finalY);

      // Save Delivery Note PDF
      doc.save(`DeliveryNote_#${deliveryNote.deliveryNoteNumber || ""}.pdf`); // Added # in file name
    } else {
      console.error("No data provided for PDF generation!");
    }
  };

  return (
    <button onClick={generatePDF} className="bg-blue-500 text-white px-4 py-2 mt-2 rounded-lg">
      Download PDF
    </button>
  );
};

export default PDFGenerator;