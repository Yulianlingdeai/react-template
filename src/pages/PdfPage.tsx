import React, { useEffect, useRef, useState } from "react";
import { useLocation } from "react-router-dom";
import PDFPreview from "@/components/PDFPreview";
import { Toast } from "antd-mobile";
import type { ToastHandler } from "antd-mobile/es/components/toast";
import api from "@/apis";

export default function PdfPages() {
    const location = useLocation();
    const handler = useRef<ToastHandler>();
    const searchParams = new URLSearchParams(location.search);
    const id = searchParams.get("id") as string;
    const [url, setUrl] = useState("");

    useEffect(() => {
        const handlePreview = async () => {
            handler.current = Toast.show({
                duration: 0,
                content: "数据加载中…"
            });
            try {
                const res = await api.downLoadTopicFile({ fileId: id });
                const blob = new Blob([res.data], { type: "application/pdf" });
                setUrl(window.URL.createObjectURL(blob));
                handler.current?.close();
            } catch (e) {
                handler.current?.close();
            }
        };
        handlePreview();
    }, [id]);
    console.log("url=====>>>>>>>>", url);
    return <>{url ? <PDFPreview pdfUrl={url} /> : null}</>;
}
