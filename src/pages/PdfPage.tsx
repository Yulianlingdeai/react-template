import React from "react";
import { useLocation } from "react-router-dom";
import PDFPreview from "@/components/PDFPreview";

export default function PdfPages() {
    const location = useLocation();
    const searchParams = new URLSearchParams(location.search);
    const path = searchParams.get("path") as string;
    return (
        <>
            <PDFPreview pdfUrl={path} />
        </>
    );
}
