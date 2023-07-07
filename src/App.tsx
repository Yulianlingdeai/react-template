import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { lazy, Suspense } from "react";
const Home = lazy(() => import(/* webpackChunkName: "home" */ "./pages/Home"));
const PdfPage = lazy(() => import(/* webpackChunkName: "pdfPage" */ "./pages/PdfPage"));
// import PdfPage from "@/pages/PdfPage";

export default function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/PdfPage" element={<PdfPage />} />
            </Routes>
        </Router>
    );
}
