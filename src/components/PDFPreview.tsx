import React, { useState, useEffect } from "react";
import { Document, Page, pdfjs } from "react-pdf";
import "./index.css";

// 设置pdf.js的worker路径
pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;

export default function PDFPreview({ pdfUrl }: { pdfUrl: string }) {
    const [numPages, setNumPages] = useState(0);
    const [screenWidth, setScreenWidth] = useState(window.innerWidth);

    useEffect(() => {
        const handleResize = () => {
            setScreenWidth(window.innerWidth);
        };

        window.addEventListener("resize", handleResize);

        // 清除事件监听器
        return () => {
            window.removeEventListener("resize", handleResize);
        };
    }, []); // 仅在组件挂载和卸载时运行
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
                    <Page
                        width={screenWidth}
                        key={`page_${index + 1}`}
                        pageNumber={index + 1}
                        scale={1}
                        renderAnnotationLayer={false}
                        renderTextLayer={false}
                    />
                ))}
            </Document>
            {/* <Page pageNumber={1} scale={0.2} />new Array(numPages) */}
        </div>
    );
}
