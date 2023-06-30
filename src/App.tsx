import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "@/pages/Home";
import PdfPage from "@/pages/PdfPage";

const App = () => {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/PdfPage" element={<PdfPage />} />
            </Routes>
        </Router>
    );
};

export default App;
