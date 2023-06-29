import React, { useEffect } from "react";
// import './App.css';
import "@/App.css";
import axios from "axios";
// import MyComponent from "@/components/MyComponent";

export default function App() {
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get("/api/data");
                console.log(response.data);
            } catch (error) {
                console.error(error);
            }
        };
        fetchData();
    }, []);
    return (
        <div className="container">
            <h1>测试会议测试会议测试会议测试会议测试会议测试会</h1>
            <div className="container-item">
                <div className="container-label">时间：</div>2023-06-20 08:00:00
            </div>
            <div className="container-item">
                <div className="container-label">地点：</div>第一会议室
            </div>
            <div className="container-item">
                <div className="container-label">主持人：</div>张三
            </div>
            <div className="container-item">
                <div className="container-label">参会人：</div>甲、乙、丙、丁
            </div>
            <div className="container-item">
                <div>议题列表：</div>
            </div>
            <div className="container-item">
                <div className="container-topic">议题一、关于测试会议的议题一</div>
                <div className="container-topic">1、议题一文件一 下载、预览</div>
                <div className="container-topic">2、议题一文件二 下载、预览</div>
                <div className="container-topic">列席人员：刘静、张世杰</div>
            </div>
            <div className="container-item">
                <div className="container-topic">议题二、关于测试会议的议题二</div>
                <div className="container-topic">1、议题二文件一 下载、预览</div>
                <div className="container-topic">2、议题二文件二 下载、预览</div>
                <div className="container-topic">列席人员：刘静、张世杰</div>
            </div>
            <div className="container-item">
                <div className="container-topic">议题三、关于测试会议的议题三</div>
                <div className="container-topic">1、议题三文件一 下载、预览</div>
                <div className="container-topic">2、议题三文件二 下载、预览</div>
                <div className="container-topic">列席人员：刘静、张世杰</div>
            </div>
            {/* <MyComponent></MyComponent> */}
        </div>
    );
}
