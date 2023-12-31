export type userItem = {
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
export type topicFileItem = {
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
export type baseMeetingInfo = {
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

// 从类型T中排除可以赋值给U的类型  string | number
export type otherExclude = Exclude<string | number | null, null>;

// 从类型 T 中选择指定的属性集合 K  { name: string }
export type otherPick = Pick<{ name: string; age: number }, "name">;

// 将部分属性可选
export type PartiallyOptional<T, K extends keyof T> = Omit<T, K> & Partial<Pick<T, K>>;

// 将部分属性必须
export type MakePartialRequired<T, K extends keyof T> = Omit<T, K> & Required<Pick<T, K>>;
