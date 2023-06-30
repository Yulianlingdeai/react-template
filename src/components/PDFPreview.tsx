import React, { useState } from "react";
import { Document, Page, pdfjs } from "react-pdf";
import "./index.css";

// 设置pdf.js的worker路径
pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;

export default function PDFPreview({ pdfUrl }: { pdfUrl: string }) {
    const [numPages, setNumPages] = useState(0);

    const onDocumentLoadSuccess = ({ numPages }: { numPages: number }) => {
        setNumPages(numPages);
    };
    return (
        <div className="pdf-container">
            <Document
                file={pdfUrl}
                className="document-content"
                onLoadSuccess={onDocumentLoadSuccess}
            >
                {Array.from({ length: numPages }, (el, index) => (
                    <Page key={`page_${index + 1}`} pageNumber={index + 1} scale={0.2} />
                ))}
            </Document>
            {/* <Page pageNumber={1} scale={0.2} />new Array(numPages) */}
        </div>
    );
}
