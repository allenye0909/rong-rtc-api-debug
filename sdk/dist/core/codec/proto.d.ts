/**
 * signal 服务 RTC 业务的接口定义
 */
export declare const RTC_API: {
    rtcRJoin_data: string;
    rtcRExit: string;
    rtcRInfo: string;
    rtcUData: string;
    rtcUDel: string;
    rtcSetData: string;
    /** 全量资源 URI 变更接口 */
    userSetData: string;
    rtcQryData: string;
    rtcDelData: string;
    rtcToken: string;
    rtcUserState: string;
    rtcUList: string;
    /** RTC 直播观众加房间 */
    viewerJoinR: string;
    /** RTC 直播观众退出房间 */
    viewerExitR: string;
    /** RTC 观众端 kv 通知拉取 (kv 为主播加入/退出人员列表、发布/取消发布的资源) */
    rtcPullKv: string;
    /** RTC 直播身份切换 */
    rtcIdentityChange: string;
    /** 直播连麦邀请 */
    rtcInvite: string;
    /** 直播连麦取消邀请 */
    rtcCancelInvite: string;
    /** 直播连麦邀请响应 */
    rtcInviteAnswer: string;
    /** 结束直播连麦邀请 */
    rtcEndInvite: string;
    /** RTC 查询用户信息（是否在房间内） */
    rtcQueryJoined: string;
};
export declare enum RTCPB {
    RtcInput = "RtcInput",
    RtcUserListOutput = "RtcUserListOutput",
    SetUserStatusInput = "SetUserStatusInput",
    RtcSetDataInput = "RtcSetDataInput",
    RtcUserSetDataInput = "RtcUserSetDataInput",
    RtcDataInput = "RtcDataInput",
    RtcSetOutDataInput = "RtcSetOutDataInput",
    MCFollowInput = "MCFollowInput",
    RtcTokenOutput = "RtcTokenOutput",
    RtcQryOutput = "RtcQryOutput",
    RtcQryUserOutDataInput = "RtcQryUserOutDataInput",
    RtcUserOutDataOutput = "RtcUserOutDataOutput",
    RtcQueryListInput = "RtcQueryListInput",
    RtcRoomInfoOutput = "RtcRoomInfoOutput",
    RtcValueInfo = "RtcValueInfo",
    RtcKeyDeleteInput = "RtcKeyDeleteInput",
    RtcNotifyMsg = "RtcNotifyMsg",
    RtcPullKV = "RtcPullKV",
    RtcKVOutput = "RtcKVOutput",
    RtcQueryUserJoinedInput = "RtcQueryUserJoinedInput",
    RtcQueryUserJoinedOutput = "RtcQueryUserJoinedOutput",
    RtcViewerJoinedOutput = "RtcViewerJoinedOutput",
    RtcInviteInput = "RtcInviteInput",
    RtcCancelInviteInput = "RtcCancelInviteInput",
    RtcInviteAnswerInput = "RtcInviteAnswerInput",
    RtcEndInviteInput = "RtcEndInviteInput"
}
export declare const keymaps: {
    readonly RtcInput: readonly ["roomType", "broadcastType", "extraInnerData", "needSysChatroom", "identityChangeType", "joinType", "innerDatas", "outerDatas"];
    readonly RtcUserListOutput: readonly ["users", "token", "sessionId", "roomInfo"];
    readonly SetUserStatusInput: readonly ["status"];
    readonly RtcSetDataInput: readonly ["interior", "target", "key", "value", "objectName", "content"];
    readonly RtcUserSetDataInput: readonly ["valueInfo", "objectName", "content"];
    readonly RtcDataInput: readonly ["interior", "target", "key", "objectName", "content"];
    readonly RtcSetOutDataInput: readonly ["target", "valueInfo", "objectName", "content"];
    readonly MCFollowInput: readonly ["state"];
    readonly RtcTokenOutput: readonly ["rtcToken"];
    readonly RtcQryOutput: readonly ["outInfo"];
    readonly RtcQryUserOutDataInput: readonly ["userId"];
    readonly RtcUserOutDataOutput: readonly ["user"];
    readonly RtcQueryListInput: readonly ["order"];
    readonly RtcRoomInfoOutput: readonly ["roomId", "roomData", "userCount", "list"];
    readonly RtcValueInfo: readonly ["key", "value"];
    readonly RtcKeyDeleteInput: readonly ["key"];
    readonly RtcNotifyMsg: readonly ["type", "time", "roomId"];
    readonly RtcPullKV: readonly ["timestamp", "roomId"];
    readonly RtcKVOutput: readonly ["entries", "bFullUpdate", "syncTime"];
    readonly RtcQueryUserJoinedInput: readonly ["userId"];
    readonly RtcQueryUserJoinedOutput: readonly ["info"];
    readonly RtcInviteInput: readonly ["invitedUserId", "timeoutTime", "invitedRoomId", "inviteInfo", "inviteSessionId"];
    readonly RtcCancelInviteInput: readonly ["invitedUserId", "invitedRoomId", "inviteInfo", "inviteSessionId"];
    readonly RtcInviteAnswerInput: readonly ["inviteUserId", "answerCode", "inviteRoomId", "inviteSessionId", "content", "key", "value"];
    readonly RtcEndInviteInput: readonly ["inviteRoomId", "inviteSessionId", "inviteContent", "inviteRoomKeys"];
};
export declare type RTCKeyMaps = typeof keymaps;
export declare const desc: string;
//# sourceMappingURL=proto.d.ts.map