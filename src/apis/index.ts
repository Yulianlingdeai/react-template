import request from "@/utils/request";

export default {
    /**
     * 获取会议具体信息包括议题列表
     * @param params
     * @returns
     */
    async getMeetingInfoByQrCode(params: { meetingId: string }) {
        // http://192.168.0.17:10022/no-paper-meeting
        return await request.get("/api/reserve/meetingInfoQRCode", { params });
    },
    /**
     * 下载议题文件
     * @param params
     * @returns
     */
    async downLoadTopicFile(params: { fileId: string }) {
        return await request.get(`/api/topic/downloadFile`, { params, responseType: "blob" });
    }
};
