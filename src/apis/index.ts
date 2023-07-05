import request from "@/utils/request";
import { baseMeetingInfo } from "@/types";

export default {
    /**
     * 获取会议具体信息包括议题列表
     * @param params
     * @returns
     */
    async getMeetingInfoByQrCode(params: { meetingId: string }) {
        return await request.get<any, baseMeetingInfo>("/api/reserve/meetingInfoQRCode", {
            params
        });
    },
    /**
     * 下载议题文件
     * @param params
     * @returns
     */
    async downLoadTopicFile(params: { fileId: string }) {
        return await request.get(`/api/topic/downloadFileNoIntercept`, {
            params,
            responseType: "blob"
        });
    },
    /**
     * 下载全部文件
     * @param params
     * @returns
     */
    async downloadAllFile(params: { meetingId: string }) {
        return await request.get("/api/reserve/meeting/filesBatchDownload", {
            params,
            responseType: "blob"
        });
    }
};
