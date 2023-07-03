import React, { useEffect, useState, useRef } from "react";
import "@/assets/css/App.css";
import api from "@/apis";
import { Toast } from "antd-mobile";
import type { ToastHandler } from "antd-mobile/es/components/toast";
import NoData from "@/components/NoData";
import { ReactComponent as Download } from "@/assets/image/download.svg";
import { ReactComponent as Preview } from "@/assets/image/preview.svg";
import { useNavigate } from "react-router-dom";
import type { topicFileItem, baseMeetingInfo } from "@/types";

export default function Home() {
    const [meetingInfo, setMeetingInfo] = useState<baseMeetingInfo | null>(null);
    const handler = useRef<ToastHandler>();
    const navigate = useNavigate();
    const params = new URLSearchParams(location.search); // 获取 URL 的查询参数
    const meetingId = params.get("meetingId") || ""; // 获取特定参数的值
    // 4c421eb4f4ad4ac6a0d30cf4d6fce9f3
    console.log(meetingId);
    useEffect(() => {
        let ignore = false;
        const fetchData = async () => {
            try {
                const res = await api.getMeetingInfoByQrCode({
                    meetingId
                });
                if (!ignore) {
                    console.log(res.data);
                    setMeetingInfo(res.data.data);
                }
            } catch (error) {
                console.error(error);
            }
        };
        fetchData();
        return () => {
            ignore = true;
        };
    }, [meetingId]);
    /**预览pdf */
    const handlePreview = async (topicFile: topicFileItem) => {
        handler.current = Toast.show({
            duration: 0,
            content: "数据加载中…"
        });
        const res = await api.downLoadTopicFile({ fileId: topicFile.id });
        console.log(res);
        const blob = new Blob([res.data], { type: "application/pdf" });
        const href = window.URL.createObjectURL(blob);
        handler.current?.close();
        navigate(`/PdfPage?path=${href}`);
    };
    /**下载单个文件 */
    const handleDownload = async (topicFile: topicFileItem) => {
        handler.current = Toast.show({
            duration: 0,
            content: "文件下载中…"
        });
        try {
            const res = await api.downLoadTopicFile({ fileId: topicFile.id });
            console.log(res);
            const filename = res.headers["content-disposition"];
            const blob = new Blob([res.data], { type: "application/pdf" });
            const a = document.createElement("a");
            const href = window.URL.createObjectURL(blob);
            a.href = href;
            a.download = decodeURIComponent(filename.split("filename=")[1].replace(/"/g, ""));
            document.body.appendChild(a);
            a.click();
            document.body.removeChild(a);
            handler.current?.close();
            window.URL.revokeObjectURL(href);
        } catch (e) {
            console.log(e);
        }
    };
    /**下载全部文件 */
    const handleDownloadAllFile = async () => {
        handler.current = Toast.show({
            duration: 0,
            content: "文件下载中…"
        });
        try {
            const res = await api.downloadAllFile({
                meetingId
            });
            console.log("res", res);
            const filename = res.headers["content-disposition"];
            const blob = new Blob([res.data]);
            // , { type: "application/zip" }
            const a = document.createElement("a");
            const href = window.URL.createObjectURL(blob);
            a.href = href;
            a.download = decodeURIComponent(filename.split("filename=")[1].replace(/"/g, ""));
            document.body.appendChild(a);
            a.click();
            document.body.removeChild(a);
            handler.current?.close();
            window.URL.revokeObjectURL(href);
        } catch (e) {
            console.log(e);
        }
    };
    return meetingInfo ? (
        <div className="container">
            {/* <h1>测试会议测试会议测试会议测试会议测试会议测试会</h1> */}
            <h1>{meetingInfo && meetingInfo.title}</h1>
            <div className="container-item">
                <div className="container-label">时间：</div>
                <div className="container-describe">
                    {meetingInfo && meetingInfo.startTime.split(".")[0].replace(/T/, " ")}
                </div>
                {/* 2023-06-20 08:00:00 */}
            </div>
            <div className="container-item">
                <div className="container-label">地点：</div>
                <div className="container-describe">{meetingInfo && meetingInfo.roomName}</div>
            </div>
            {meetingInfo && meetingInfo.emcee && (
                <div className="container-item">
                    <div className="container-label">主持人：</div>
                    <div className="container-describe">{meetingInfo.emcee}</div>
                </div>
            )}
            <div className="container-item">
                <div className="container-label">参会人：</div>
                <div className="container-describe">
                    {meetingInfo &&
                        meetingInfo.attendeeList.map((item) => item.userName).join("、")}
                </div>
                {/* 甲、乙、丙、丁 */}
            </div>
            {meetingInfo && meetingInfo.seatChart && (
                <div className="container-item">
                    <div className="container-label">座次图：</div>
                    {/* <div className="container-describe"> */}
                    <img
                        src={"http://47.109.100.216:5003/media/" + meetingInfo.seatChart}
                        alt=""
                        width="100%"
                        style={{ margin: "5px 0" }}
                    />
                    {/* </div> */}
                </div>
            )}
            <div className="container-item">
                <div>议题列表：</div>
            </div>
            {meetingInfo &&
                meetingInfo.topicInfoDtos.map((item) => (
                    <div className="container-item" key={item.topic.id}>
                        <div className="container-topic">
                            {item.topic.name}
                            {/* 议题一、关于测试会议的议题一 */}
                        </div>
                        {item.topicFilesList.length > 0 &&
                            item.topicFilesList.map((topicFile, index) => (
                                <div className="topic-content" key={topicFile.id}>
                                    {index + 1 + "、" + topicFile.name}
                                    {/* 1、议题一文件一 */}
                                    <span>
                                        <Download
                                            width={20}
                                            height={20}
                                            title="下载"
                                            style={{
                                                marginLeft: "10px",
                                                verticalAlign: "bottom",
                                                cursor: "pointer"
                                            }}
                                            onClick={() => handleDownload(topicFile)}
                                        ></Download>
                                        <Preview
                                            width={20}
                                            height={20}
                                            title="预览"
                                            style={{
                                                marginLeft: "10px",
                                                verticalAlign: "bottom",
                                                cursor: "pointer"
                                            }}
                                            onClick={() => handlePreview(topicFile)}
                                        ></Preview>
                                    </span>
                                </div>
                            ))}
                        {item.attendanceList.length > 0 && (
                            <div className="topic-content">
                                列席人员：
                                {item.attendanceList.map((user) => user.userName).join("、")}
                            </div>
                        )}
                    </div>
                ))}
            <div className="download-all" style={{ marginTop: "10px" }}>
                <span
                    style={{ color: "#1296db", cursor: "pointer" }}
                    onClick={handleDownloadAllFile}
                >
                    下载全部文件
                </span>
            </div>
        </div>
    ) : (
        <NoData></NoData>
    );
}
