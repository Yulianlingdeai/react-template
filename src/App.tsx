import React, { useEffect, useState } from "react";
import "@/assets/css/App.css";
import api from "@/apis";
import { ReactComponent as Download } from "@/assets/image/download.svg";
import { ReactComponent as Preview } from "@/assets/image/preview.svg";
type userItem = {
    createTime: string; // "2023-06-29T08:31:41.000+00:00";
    id: string; // "31cae29a0ab04e74a9fdfc2499548075";
    inputType: string; // "";
    meetingId: string; // "4c421eb4f4ad4ac6a0d30cf4d6fce9f3";
    mqttTopic: string; // "61be139d238a4526ad703df1b0a50c9b";
    showOrder: number; // 2;
    sortInput: number; // 0;
    title: string; // "参会人员";
    titleSort: number; // 2;
    topicId: string; // "";
    updateTime: string; // "";
    userId: string; // "4e689487a6374d288d9637c2327ca8c7";
    userName: string; // "甲";
};
type baseMeetingInfo = {
    attendeeList: userItem[];
    emcee: string; // "费矾";
    meetingId: string; // "4c421eb4f4ad4ac6a0d30cf4d6fce9f3";
    roomName: string; // "第一会议室";
    seatChart: string; // "";
    startTime: string; // "2023-06-27T07:00:00.000+00:00";
    title: string; // "二维码分享测试";
    topicInfoDtos: {
        attendanceList: userItem[];
        topic: {
            broadcastCount: string; // "";
            broadcastTime: string; // "-1";
            durations: string; // "10";
            id: number; // -517881855;
            isRoll: string; // "";
            isSound: string; // "";
            meetingDept: string; // "";
            meetingDeptName: string; // "张三";
            meetingId: string; // "4c421eb4f4ad4ac6a0d30cf4d6fce9f3";
            name: string; // "测试议题一";
            noticeCount: string; // "";
            reportingType: string; // "";
            showOrder: number; // 1;
            status: number; // 1;
            symbol: string; // "";
            topicId: string; // "a42b6e67fa6e4f2ba0ebbd9369e56b13";
            topicType: string; // "议题";
            userNameList: string; // "";
            userNames: string; // "";
            word: string; // "";
        };
        topicFilesList: topicFileItem[];
    }[];
};
type topicFileItem = {
    createTime: string; // "2023-06-26T06:05:43.000+00:00";
    id: string; // "ddeb52c5e0cb4eeaba085674444070c8";
    meetingId: string; // "4c421eb4f4ad4ac6a0d30cf4d6fce9f3";
    name: string; // "测试议题1-1.pdf";
    path: string; // "4c421eb4f4ad4ac6a0d30cf4d6fce9f3/2023/06/26/d453adbfdbe84f3ea9afc999abd9d946.pdf";
    showOrder: number; // 1;
    showUrl: string; // "https://47.109.57.192:9443/media/4c421eb4f4ad4ac6a0d30cf4d6fce9f3/2023/06/26/d453adbfdbe84f3ea9afc999abd9d946.pdf";
    topicId: string; // "a42b6e67fa6e4f2ba0ebbd9369e56b13";
    updateTime: string; // "2023-06-26T06:05:43.000+00:00";
};
export default function App() {
    const [meetingInfo, setMeetingInfo] = useState<baseMeetingInfo | null>(null);
    useEffect(() => {
        let ignore = false;
        const fetchData = async () => {
            try {
                const res = await api.getMeetingInfoByQrCode({
                    meetingId: "4c421eb4f4ad4ac6a0d30cf4d6fce9f3"
                });
                if (!ignore) {
                    console.log(res.data);
                    setMeetingInfo(res.data.data);
                    console.log("123");
                }
            } catch (error) {
                console.error(error);
                if (!ignore) {
                    console.log("123");
                }
            }
        };
        fetchData();
        return () => {
            ignore = true;
        };
    }, []);
    const [state, setState] = useState(0);
    console.log("代码执行一次");
    const handleClick = () => {
        console.log("点击了");
        setState((n) => n + 1);
    };
    const handleDownload = (topicFile: topicFileItem) => {
        try {
            const res = api.downLoadTopicFile({ fileId: topicFile.id });
        } catch (e) {
            console.log(e);
        }
    };
    return (
        <div className="container" onClick={handleClick}>
            {/* <h1>测试会议测试会议测试会议测试会议测试会议测试会</h1> */}
            <h1>{meetingInfo && meetingInfo.title}</h1>
            <div className="container-item">
                <div className="container-label">时间：</div>
                {meetingInfo && meetingInfo.startTime.split(".")[0].replace(/T/, " ")}
                {/* 2023-06-20 08:00:00 */}
            </div>
            <div className="container-item">
                <div className="container-label">地点：</div>
                {meetingInfo && meetingInfo.roomName}
            </div>
            {meetingInfo && meetingInfo.emcee && (
                <div className="container-item">
                    <div className="container-label">主持人：</div>
                    {meetingInfo.emcee}
                </div>
            )}
            <div className="container-item">
                <div className="container-label">参会人：</div>
                {meetingInfo && meetingInfo.attendeeList.map((item) => item.userName).join("、")}
                {/* 甲、乙、丙、丁 */}
            </div>
            {meetingInfo && meetingInfo.seatChart && (
                <div className="container-item">
                    <div className="container-label">座次图：</div>
                    <img src={meetingInfo.seatChart} alt="" width="100%" />
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
                        {item.topicFilesList.length &&
                            item.topicFilesList.map((topicFile, index) => (
                                <>
                                    <div className="container-topic">
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
                                            ></Preview>
                                        </span>
                                    </div>
                                </>
                            ))}
                        {item.attendanceList.length && (
                            <div className="container-topic">
                                列席人员：
                                {item.attendanceList.map((user) => user.userName).join("、")}
                                {/* 列席人员：刘静、张世杰 */}
                            </div>
                        )}
                    </div>
                ))}
            <div className="container-item">
                <span style={{ color: "#1296db", cursor: "pointer" }}>下载全部文件</span>
            </div>
        </div>
    );
}
