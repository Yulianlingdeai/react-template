import React, { useEffect, useState, useRef, useCallback } from "react";
import ReactImageGallery from "react-image-gallery";
// import "react-image-gallery/styles/css/image-gallery.css";
// import ImageGallery from "@/components/ImageGallery";
import "@/assets/css/App.css";
import NoData from "@/components/NoData";
import { Toast } from "antd-mobile";
import type { ToastHandler } from "antd-mobile/es/components/toast";
import { ReactComponent as Download } from "@/assets/image/download.svg";
import { ReactComponent as Preview } from "@/assets/image/preview.svg";
import { useNavigate } from "react-router-dom";
import type { topicFileItem, baseMeetingInfo } from "@/types";
import api from "@/apis";
// import Modal from "react-modal";

import ModalComponent1 from "@/components/Modal";

const ModalComponent = React.memo(ModalComponent1);

export default function Home() {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedIndex, setSelectedIndex] = useState(0);
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
                    console.log(res);
                    setMeetingInfo(res);
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

    /**开启预览模式 */
    const openModal = (index: number) => {
        setSelectedIndex(index);
        setIsModalOpen(true);
        document.body.style.overflow = "hidden"; // 禁止背后内容滚动
    };

    /**关闭预览模式 */
    const closeModal = useCallback(() => {
        setIsModalOpen(false);
        document.body.style.overflow = ""; // 恢复背后内容滚动
    }, []);
    /**预览pdf */
    const handlePreview = async (topicFile: topicFileItem) => {
        navigate(`/PdfPage?id=${topicFile.id}`);
    };
    /**下载单个文件 */
    const handleDownload = async (topicFile: topicFileItem) => {
        handler.current = Toast.show({
            duration: 0,
            content: "文件下载中…"
        });
        try {
            const a = document.createElement("a");
            if (/MicroMessenger/i.test(navigator.userAgent)) {
                a.href = `${process.env.REACT_APP_BASE_API}api/topic/downloadFileNoIntercept?fileId=${topicFile.id}`;
                a.download = topicFile.name;
                document.body.appendChild(a);
                a.click();
                document.body.removeChild(a);
                handler.current?.close();
            } else {
                const res = await api.downLoadTopicFile({ fileId: topicFile.id });
                console.log(res);
                const filename = res.headers["content-disposition"];
                const blob = new Blob([res.data], { type: "application/pdf" });
                const href = window.URL.createObjectURL(blob);
                a.href = href;
                a.download = decodeURIComponent(filename.split("filename=")[1].replace(/"/g, ""));
                document.body.appendChild(a);
                a.click();
                document.body.removeChild(a);
                handler.current?.close();
                window.URL.revokeObjectURL(href);
            }
        } catch (e) {
            console.log(e);
            handler.current?.close();
            setTimeout(() => {
                Toast.show({
                    content: "文件下载失败"
                });
            }, 300);
        }
    };
    /**下载全部文件 */
    const handleDownloadAllFile = async () => {
        handler.current = Toast.show({
            duration: 0,
            content: "文件下载中…"
        });
        try {
            const a = document.createElement("a");
            if (/MicroMessenger/i.test(navigator.userAgent)) {
                console.log("微信浏览器");
                a.setAttribute(
                    "href",
                    `${process.env.REACT_APP_BASE_API}api/reserve/meeting/filesBatchDownload?meetingId=${meetingId}`
                );
                // a.setAttribute("href", `http://47.109.100.216:5005/?meetingId=${meetingId}`);
                a.setAttribute("download", meetingInfo?.title + ".zip");
                // a.setAttribute("type", "application/zip");
                // a.setAttribute("target", "_blank");
                document.body.appendChild(a);
                a.click();
                document.body.removeChild(a);
                handler.current?.close();
                // a.download = decodeURIComponent(filename.split("filename=")[1].replace(/"/g, ""));
            } else {
                const res = await api.downloadAllFile({
                    meetingId
                });
                const filename = res.headers["content-disposition"];
                const blob = new Blob([res.data], { type: "application/zip" });
                const href = window.URL.createObjectURL(blob);
                a.setAttribute("href", href);
                a.setAttribute("type", "application/zip");
                a.setAttribute(
                    "download",
                    decodeURIComponent(filename.split("filename=")[1].replace(/"/g, ""))
                );
                document.body.appendChild(a);
                a.click();
                document.body.removeChild(a);
                handler.current?.close();
                window.URL.revokeObjectURL(href);
                // a.download = decodeURIComponent(filename.split("filename=")[1].replace(/"/g, ""));
            }
        } catch (e) {
            console.log(e);
            handler.current?.close();
            setTimeout(() => {
                Toast.show({
                    content: "文件下载失败"
                });
            }, 300);
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
            <div className="container-item" style={{ alignItems: "normal" }}>
                <div className="container-label">参会人：</div>
                <div className="container-describe">
                    {meetingInfo &&
                        meetingInfo.attendeeList.map((item) => item.userName).join("、")}
                </div>
            </div>
            {meetingInfo && meetingInfo.seatChart && (
                <div className="container-item" style={{ overflow: "hidden" }}>
                    <div className="container-label">座次图：</div>
                    {/* <img
                        src={"http://47.109.100.216:5003/media/" + meetingInfo.seatChart}
                        alt=""
                        width="100%"
                        style={{ margin: "5px 0" }}
                        onClick={() => openModal(0)}
                    /> */}
                    <ReactImageGallery
                        items={[
                            {
                                original:
                                    "http://47.109.100.216:5003/media/" + meetingInfo.seatChart
                                // description: "座次图"
                            }
                        ]}
                        onClick={() => openModal(0)}
                        startIndex={selectedIndex}
                        showNav={false}
                        showPlayButton={false}
                        showFullscreenButton={false}
                        onSlide={(index) => setSelectedIndex(index)}
                    />
                </div>
            )}
            <ModalComponent
                closeModal={closeModal}
                isModalOpen={isModalOpen}
                meetingInfo={meetingInfo}
            ></ModalComponent>
            {/* <Modal
                isOpen={isModalOpen}
                onRequestClose={() => {
                    closeModal();
                }}
                // contentLabel="Image Gallery Modal"
                ariaHideApp={false}
                className="custom-modal"
                overlayClassName="custom-overlay"
            >
                <div style={{ touchAction: "pan-y", maxHeight: "100vh" }}>
                    <ImageGallery
                        src={"http://47.109.100.216:5003/media/" + meetingInfo.seatChart}
                    ></ImageGallery>
                </div>
            </Modal> */}
            {meetingInfo && meetingInfo.topicInfoDtos.length > 0 && (
                <div className="container-item topic-list">
                    <div style={{ fontWeight: "bolder" }}>会议内容：</div>
                    {meetingInfo &&
                        meetingInfo.topicInfoDtos.some((item) => item.topicFilesList.length) && (
                            <div className="download-all" style={{ marginTop: "10px" }}>
                                <span
                                    style={{ color: "#1296db", cursor: "pointer" }}
                                    onClick={handleDownloadAllFile}
                                >
                                    {/* onClick={handleDownloadAllFile} */}
                                    {/* <a
                                        href={`http://47.109.100.216:5005/no-paper-meeting/api/reserve/meeting/filesBatchDownload?meetingId=${meetingId}`}
                                        target="_blank"
                                        rel="noreferrer"
                                    > */}
                                    下载全部文件
                                    {/* </a> */}
                                </span>
                            </div>
                        )}
                </div>
            )}
            {meetingInfo &&
                meetingInfo.topicInfoDtos.map((item) => (
                    <div className="container-item topic-box" key={item.topic.id}>
                        <div className="container-topic" style={{ fontWeight: "bolder" }}>
                            {item.topic.topicType + item.topic.name}
                            {/* 议题一、关于测试会议的议题一 */}
                        </div>
                        {item.topicFilesList.length > 0 &&
                            item.topicFilesList.map((topicFile, index) => (
                                <div className="topic-content" key={topicFile.id}>
                                    <span>{"文件" + (index + 1) + "："}</span>
                                    {topicFile.name}
                                    {/* 1、议题一文件一 */}
                                    <span className="icon-box">
                                        <Download
                                            width={20}
                                            height={20}
                                            title="下载"
                                            style={{
                                                marginLeft: "10px",
                                                verticalAlign: "middle",
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
                            <div className="topic-content liexi">
                                列席人员：
                                {item.attendanceList.map((user) => user.userName).join("、")}
                            </div>
                        )}
                    </div>
                ))}
        </div>
    ) : (
        <NoData></NoData>
    );
}
