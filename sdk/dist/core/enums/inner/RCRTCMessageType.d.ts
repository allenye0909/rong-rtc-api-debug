/**
 * RTC 消息类型常量
 * @private
 */
export declare enum RCRTCMessageType {
    /**
     * 增量资源发布消息
     * @deprecated
     */
    PUBLISH = "RCRTC:PublishResource",
    /**
     * 增量资源取消发布消息
     * @deprecated
     */
    UNPUBLISH = "RCRTC:UnpublishResource",
    /**
     * 增量资源状态变更消息
     * @deprecated
     */
    MODIFY = "RCRTC:ModifyResource",
    /**
     * 全量资源变更消息
     */
    TOTAL_CONTENT_RESOURCE = "RCRTC:TotalContentResources",
    /**
     * 房间人员变更
     */
    STATE = "RCRTC:state",
    /**
     * 房间属性变更
     */
    ROOM_NOTIFY = "RCRTC:RoomNtf",
    /**
     * 房间用户属性变更
     */
    USER_NOTIFY = "RCRTC:UserNtf",
    /**
     * 被服务踢出房间
     */
    KICK = "RCRTC:kick",
    /**
     * 跨房间连麦 PK 请求消息
     */
    PK_INVITE = "RCRTC:invite",
    /**
     * 连麦请求超时
     */
    PK_INVITE_TIMEOUT = "RCRTC:inviteTimeout",
    /**
     * 跨房间连麦 PK 取消请求消息
     */
    PK_CANCEL_INVITE = "RCRTC:cancelInvite",
    /**
     * 跨房间连麦 PK 请求响应消息
     */
    PK_INVITE_ANSWER = "RCRTC:answerInvite",
    /**
     * 结束跨房间连麦 PK 消息
     */
    PK_END = "RCRTC:endInvite",
    /**
     * 连麦的房间不再了或离线了，主直播房间会收到的消息通知
     */
    OTHER_ROOM_OFFLINE = "RCRTC:otherRoomOffline",
    /**
     * 订阅、取消订阅动作成功
     */
    ROOM_TASK_FINISH = "RCRTC:roomTaskFinish"
}
//# sourceMappingURL=RCRTCMessageType.d.ts.map