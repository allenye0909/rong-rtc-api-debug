/**
 * 设置 RTC 人员 inner、outer 数据
 */
export interface IRTCUserData {
    [key: string]: string;
}
export interface IRtcTokenData {
    rtcToken: string;
}
/**
 * 加入 RTC 房间的用户信息
 */
export interface IRTCJoinedInfo {
    /**
     * 设备 ID
     */
    deviceId: string;
    /**
     * RTC 房间 ID
     */
    roomId: string;
    /**
     * 加入的时间戳
     */
    joinTime: number;
}
export interface IRTCRoomInfo {
    roomId: string;
    roomData: unknown[];
    userCount: number;
    list: unknown[];
}
export interface IServerRTCRoomEntry {
    key: string;
    value: string;
    status: number;
    timestamp: number;
    uid: string;
}
export interface IRTCUsers {
    users: {
        [userId: string]: {
            /**
             * 发布的资源数据，是一个 JSON 字符串，解析后为发布的资源列表
             */
            uris?: string;
            /**
             * 加房间的身份标识，保存主房间 roomId
             */
            extra?: string;
        };
    };
}
export interface IJoinRTCRoomData extends IRTCUsers {
    token: string;
    sessionId: string;
    roomInfo: {
        key: string;
        value: string;
    }[];
    kvEntries: IServerRTCRoomEntry[];
    offlineKickTime: number;
}
export interface IReqRoomPKOptions {
    /**
     * 当前房间 ID
     */
    roomId: string;
    /**
     * 被邀请房间 ID
     */
    invitedRoomId: string;
    /**
     * 被邀请用户 ID
     */
    invitedUserId: string;
    /**
     * 本次邀请超时时间
     */
    inviteTimeout: number;
    /**
     * 本次邀请额外信息
     */
    inviteInfo: string;
    /**
     * 本次邀请唯一 ID
     */
    inviteSessionId: string;
}
export interface ICancelRoomPKOptions {
    /**
     * 当前房间 ID
     */
    roomId: string;
    /**
     * 被邀请房间 ID
     */
    invitedRoomId: string;
    /**
     * 被邀请用户 ID
     */
    invitedUserId: string;
    /**
     * 本次邀请额外信息
     */
    inviteInfo: string;
    /**
     * 本次邀请唯一 ID
     */
    inviteSessionId: string;
}
export interface IResRoomPKOptions {
    /**
     * 当前房间 ID
     */
    roomId: string;
    /**
     * 邀请者 ID
     */
    inviteUserId: string;
    /**
     * 邀请者房间 ID
     */
    inviteRoomId: string;
    /**
     * 邀请的 session ID
     */
    inviteSessionId: string;
    /**
     * 需要转发的信息
     */
    content: string;
    /**
     * 同意邀请时要设置的 key, 放在room级别的k和v,新加入房间的能拉取到
     */
    key: string;
    /**
     * 同意邀请时要设置的 value, 放在room级别的k和v,新加入房间的能拉取到
     */
    value: string;
    /**
     * 是否同意邀请
     */
    agree: boolean;
}
export interface IEndRoomPKOptions {
    /**
     * 当前房间 ID
     */
    roomId: string;
    /**
     * 需要结束的连麦房间 ID
     */
    endRoomId: string;
    /**
     * 需要结束连麦的 sessionID
     */
    sessionId: string;
    /**
     * 结束连麦的信息
     */
    content: string;
    /**
     * 需要删除连麦的信息的 keys
     */
    keys: string[];
}
//# sourceMappingURL=interface.d.ts.map