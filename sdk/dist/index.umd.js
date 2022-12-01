/*
 * RCRTC - v5.5.1-alpha.1
 * CommitId - dd31e1b7e744940a395d3026279843458e87a54c
 * Thu Sep 08 2022 11:37:34 GMT+0800 (中国标准时间)
 * ©2020 RongCloud, Inc. All rights reserved.
 */
(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('@rongcloud/engine')) :
    typeof define === 'function' && define.amd ? define(['exports', '@rongcloud/engine'], factory) :
    (global = typeof globalThis !== 'undefined' ? globalThis : global || self, factory(global.RCRTC = {}, global.RCEngine));
})(this, (function (exports, engine) { 'use strict';

    const logger = new engine.Logger('RCRTC');

    /**
     * 错误码，与移动端对齐
     * @description
     * 1. `51000 - 51999` 为 Android 专用段
     * 2. `52000 - 52999` 为 iOS 专用段
     * 3. `53000 - 53199` 为 Web RTC 专用段
     * 4. `53200 - 53499` 为 Web Call 专用段
     * 5. `53500 - 53999` 为 Web 保留段
     * 6. 1004 jwt token 过期
     */
    exports.RCRTCCode = void 0;
    (function (RCRTCCode) {
        /** 成功 */
        RCRTCCode[RCRTCCode["SUCCESS"] = 10000] = "SUCCESS";
        /** IM 服务未连接 */
        RCRTCCode[RCRTCCode["SIGNAL_DISCONNECTED"] = 50000] = "SIGNAL_DISCONNECTED";
        /** 参数错误 */
        RCRTCCode[RCRTCCode["PARAMS_ERROR"] = 50001] = "PARAMS_ERROR";
        /** 加入房间错误，重复加入 RTC 房间内 */
        RCRTCCode[RCRTCCode["REPERT_JOIN_ROOM"] = 50002] = "REPERT_JOIN_ROOM";
        /** 当前不在房间内 */
        RCRTCCode[RCRTCCode["NOT_IN_ROOM"] = 50003] = "NOT_IN_ROOM";
        /** MediaServer 未开启 */
        RCRTCCode[RCRTCCode["SERVICE_INVALID"] = 50004] = "SERVICE_INVALID";
        /** RTC Token 无效 */
        RCRTCCode[RCRTCCode["RTC_TOKEN_INVALID"] = 50006] = "RTC_TOKEN_INVALID";
        /** 底层信令调用错误 */
        RCRTCCode[RCRTCCode["SIGNAL_ERROR"] = 53001] = "SIGNAL_ERROR";
        /** 创建 Offer 失败 */
        RCRTCCode[RCRTCCode["CREATE_OFFER_FAILED"] = 53003] = "CREATE_OFFER_FAILED";
        /** 网络请求失败 */
        RCRTCCode[RCRTCCode["REQUEST_FAILED"] = 53004] = "REQUEST_FAILED";
        /** MCU 地址不可为空 */
        RCRTCCode[RCRTCCode["MCU_SERVER_NOT_FOUND"] = 53005] = "MCU_SERVER_NOT_FOUND";
        /** 直播订阅失败，当前存在已订阅资源 */
        RCRTCCode[RCRTCCode["BROADCAST_SUB_LIST_NOT_EMPTY"] = 53007] = "BROADCAST_SUB_LIST_NOT_EMPTY";
        /** 房间已被销毁，需重新加入房间获取 Room 实例 */
        RCRTCCode[RCRTCCode["ROOM_HAS_BEEN_DESTROYED"] = 53008] = "ROOM_HAS_BEEN_DESTROYED";
        /** 没有可用的音视频服务器地址 */
        RCRTCCode[RCRTCCode["NOT_OPEN_VIDEO_AUDIO_SERVER"] = 53009] = "NOT_OPEN_VIDEO_AUDIO_SERVER";
        /** 获取用户媒体资源流失败 */
        RCRTCCode[RCRTCCode["GET_USER_MEDIA_FAILED"] = 53010] = "GET_USER_MEDIA_FAILED";
        /** 获取屏幕共享流失败 */
        RCRTCCode[RCRTCCode["GET_DISPLAY_MEDIA_FAILED"] = 53011] = "GET_DISPLAY_MEDIA_FAILED";
        /** 权限问题导致获取媒体流被拒绝 */
        RCRTCCode[RCRTCCode["BROWSER_PERMISSION_DENIED"] = 53012] = "BROWSER_PERMISSION_DENIED";
        /** 创建自定义流失败 */
        RCRTCCode[RCRTCCode["CREATE_CUSTOM_TRACK_FAILED"] = 53013] = "CREATE_CUSTOM_TRACK_FAILED";
        /** 无效的 TAG 定义 */
        RCRTCCode[RCRTCCode["INVALID_TAGS"] = 53014] = "INVALID_TAGS";
        /** IM 连接无效，无法识别当前登录的用户身份 */
        RCRTCCode[RCRTCCode["INVALID_USER_ID"] = 53015] = "INVALID_USER_ID";
        /** 创建文件流失败 */
        RCRTCCode[RCRTCCode["CREATE_FILE_TRACK_FAILED"] = 53016] = "CREATE_FILE_TRACK_FAILED";
        /** 无效的 File 实例 */
        RCRTCCode[RCRTCCode["INVALID_FILE_INSTANCE"] = 53017] = "INVALID_FILE_INSTANCE";
        /** setRemoteDescription failed */
        RCRTCCode[RCRTCCode["SET_REMOTE_DESCRIPTION_FAILED"] = 53018] = "SET_REMOTE_DESCRIPTION_FAILED";
        /** 浏览器不支持此方法 */
        RCRTCCode[RCRTCCode["BROWSER_NOT_SUPPORT"] = 53019] = "BROWSER_NOT_SUPPORT";
        /** 媒体流无法播放，可能是远端流未订阅或本地流已销毁 */
        RCRTCCode[RCRTCCode["TRACK_NOT_READY"] = 53020] = "TRACK_NOT_READY";
        /** 视频流播放需时需传参 HTMLVideoElement 作为显示组件 */
        RCRTCCode[RCRTCCode["VIDEO_TRACK_MISS_MEDIA_ELEMENT"] = 53021] = "VIDEO_TRACK_MISS_MEDIA_ELEMENT";
        /** 媒体流播放失败 */
        RCRTCCode[RCRTCCode["TRACK_PLAY_ERROR"] = 53022] = "TRACK_PLAY_ERROR";
        /** 观众加入直播房间信令错误 */
        RCRTCCode[RCRTCCode["SIGNAL_AUDIENCE_JOIN_ROOM_FAILED"] = 53023] = "SIGNAL_AUDIENCE_JOIN_ROOM_FAILED";
        /** 直播房间切换身份错误 */
        RCRTCCode[RCRTCCode["SIGNAL_ROOM_CHANGE_IDENTITY_FAILED"] = 53024] = "SIGNAL_ROOM_CHANGE_IDENTITY_FAILED";
        /** 公有云 SDK 包不允许使用私有云环境 */
        RCRTCCode[RCRTCCode["PACKAGE_ENVIRONMENT_ERROR"] = 53025] = "PACKAGE_ENVIRONMENT_ERROR";
        /** 单个用户发布资源超过限制 （ MediaServer 限制最多 10 个 track ） */
        RCRTCCode[RCRTCCode["PUBLISH_TRACK_LIMIT_EXCEEDED"] = 53026] = "PUBLISH_TRACK_LIMIT_EXCEEDED";
        /** 房间内无主播推 CDN */
        RCRTCCode[RCRTCCode["CDN_RESOURCE_IS_EMPTY"] = 53027] = "CDN_RESOURCE_IS_EMPTY";
        /** 加入 RTC 房间 joinTYype 为 1 时，当前有其他端在房间时的应答码 */
        RCRTCCode[RCRTCCode["SIGNAL_JOIN_RTC_ROOM_REFUSED"] = 53028] = "SIGNAL_JOIN_RTC_ROOM_REFUSED";
        /** 设置音频输出设备时，无权限使用请求的设备 */
        RCRTCCode[RCRTCCode["NO_PERMISSION_TO_USE_REQUESTED_DEVICE"] = 53029] = "NO_PERMISSION_TO_USE_REQUESTED_DEVICE";
        /** 方法在 PK 房间上不可用 */
        RCRTCCode[RCRTCCode["THE_FUNCTION_IS_DISABLED_IN_PKROOM"] = 53030] = "THE_FUNCTION_IS_DISABLED_IN_PKROOM";
        /** 资源没有全部发成功 */
        RCRTCCode[RCRTCCode["SOME_TRACKS_PUBLISH_FAILED"] = 53031] = "SOME_TRACKS_PUBLISH_FAILED";
        /** electron 中 mac 系统暂不支持屏幕共享采集声音 */
        RCRTCCode[RCRTCCode["MAC_IN_ELECTRON_NOT_SUPPORT_SCREEN_SHARE_WITH_AUDIO"] = 53032] = "MAC_IN_ELECTRON_NOT_SUPPORT_SCREEN_SHARE_WITH_AUDIO";
        /** JWT token 解析超时，需要刷新 navi 重新获取 */
        RCRTCCode[RCRTCCode["JWT_TIME_OUT"] = 1004] = "JWT_TIME_OUT";
        /** 获取媒体资源时，无系统权限 */
        RCRTCCode[RCRTCCode["SYSTEM_PERMISSION_DENIED"] = 53033] = "SYSTEM_PERMISSION_DENIED";
    })(exports.RCRTCCode || (exports.RCRTCCode = {}));

    var RCLoggerTag;
    (function (RCLoggerTag) {
        /**
         * 连接状态变更
         */
        RCLoggerTag["L_RTC_CLIENT_CONNECTION_STATE_S"] = "L-rtc_client_connection_state-S";
        /**
         * 主动断开
         */
        RCLoggerTag["L_RTC_CLIENT_DISCONNECT_S"] = "L-rtc_client_disconnect-S";
        /**
         * 消息监听
         */
        RCLoggerTag["L_RTC_CLIENT_MESSAGE_O"] = "L-rtc_client_message-O";
        /**
         * 销毁实例
         */
        RCLoggerTag["L_RTC_CLIENT_DESTROY_S"] = "L-rtc_client_destroy-S";
        /**
         * 加入RTC房间任务
         */
        RCLoggerTag["L_RTC_CLIENT_JOIN_RTC_ROOM_T"] = "L-rtc_client_join_rtc_room-T";
        /**
         * 加入RTC房间结果
         */
        RCLoggerTag["L_RTC_CLIENT_JOIN_RTC_ROOM_R"] = "L-rtc_client_join_rtc_room-R";
        /**
         * 加入Living房间任务
         */
        RCLoggerTag["L_RTC_CLIENT_JOIN_LIVING_ROOM_T"] = "L-rtc_client_join_living_room-T";
        /**
         * 加入Living房间结果
         */
        RCLoggerTag["L_RTC_CLIENT_JOIN_LIVING_ROOM_R"] = "L-rtc_client_join_living_room-R";
        /**
         * 获取audience实例
         */
        RCLoggerTag["L_RTC_CLIENT_GET_AUDIENCE_CLIENT_O"] = "L-rtc_client_get_audience_client-O";
        /**
         * 离开房间任务
         */
        RCLoggerTag["L_RTC_CLIENT_LEAVE_ROOM_T"] = "L-rtc_client_leave_room-T";
        /**
         * 离开房间结果
         */
        RCLoggerTag["L_RTC_CLIENT_LEAVE_ROOM_R"] = "L-rtc_client_leave-room-R";
        /**
         * 创建麦克风音频轨道
         */
        RCLoggerTag["L_RTC_CLIENT_CREATE_MICROPHONE_AUDIO_TRACK_O"] = "L-rtc_client_create_microphone_audio_track-O";
        /**
         * 创建摄像头视频轨道
         */
        RCLoggerTag["L_RTC_CLIENT_CREATE_CAMERA_VIDEO_TRACK_O"] = "L-rtc_client_create_camera_video_track-O";
        /**
         * 创建麦克风和摄像头的音视频轨道
         */
        RCLoggerTag["L_RTC_CLIENT_CREATE_MICROPHONE_AND_CAMERA_TRACKS_O"] = "L-rtc_client_create_microphone_and_camera_tracks-O";
        /**
         * 创建屏幕视频轨道
         */
        RCLoggerTag["L_RTC_CLIENT_CREATE_SCREEN_VIDEO_TRACK_O"] = "L-rtc_client_create_screen_video_track-O";
        /**
         * 创建包含音频的屏幕共享轨道
         */
        RCLoggerTag["L_RTC_CLIENT_CREATE_SCREEN_VIDEO_AND_AUDIO_TRACKS_O"] = "L-rtc_client_create_screen_video_and_audio_tracks-O";
        /**
         * 创建本地音频轨道
         */
        RCLoggerTag["L_RTC_CLIENT_CREATE_LOCAL_AUDIO_TRACK_O"] = "L-rtc_client_create_local_audio_track-O";
        /**
         * 创建本地视频轨道
         */
        RCLoggerTag["L_RTC_CLIENT_CREATE_LOCAL_VIDEO_TRACK_O"] = "L-rtc_client_create_local_video_track-O";
        /**
         * 创建本地文件流
         */
        RCLoggerTag["L_RTC_CLIENT_CREATE_LOCAL_FILE_TRACKS_O"] = "L-rtc_client_create_local_file_tracks-O";
        /**
         * 创建本地流
         */
        RCLoggerTag["L_RTC_CLIENT_CREATE_LOCAL_TRACKS_O"] = "L-rtc_client_create_local_tracks-O";
        /**
         * 以观众身份加入房间的任务
         */
        RCLoggerTag["L_RTC_CLIENT_JOIN_LIVING_ROOM_AS_AUDIENCE_T"] = "L-rtc_client_join_living_room_as_audience-T";
        /**
         * 以观众身份加入房间的结果
         */
        RCLoggerTag["L_RTC_CLIENT_JOIN_LIVING_ROOM_AS_AUDIENCE_R"] = "L-tcclient_join_living_room_as_audience_R";
        /**
         * 以观众身份离开房间的任务
         */
        RCLoggerTag["L_RTC_CLIENT_LEAVE_LIVING_ROOM_AS_AUDIENCE_T"] = "L-rtc_client_leave_living_room_as_audience-T";
        /**
         * 以观众身份离开房间的结果
         */
        RCLoggerTag["L_RTC_CLIENT_LEAVE_LIVING_ROOM_AS_AUDIENCE_R"] = "L-rtc_client_leave_living_room_as_audience-R";
        /**
         * 观众升级到主播的任务
         */
        RCLoggerTag["L_RTC_CLIENT_UPGRADE_TO_ANCHOR_ROOM_T"] = "L-rtc_client_upgrade_to_anchor_room-T";
        /**
         * 观众升级到主播的结果
         */
        RCLoggerTag["L_RTC_CLIENT_UPGRADE_TO_ANCHOR_ROOM_R"] = "L-rtc_client_upgrade_to_anchor_room-R";
        /**
         * 主播降级到观众的任务
         */
        RCLoggerTag["L_RTC_CLIENT_DOWNGRADE_TO_AUDIENCE_ROOM_T"] = "L-rtc_client_downgrade_to_audience_room-T";
        /**
         * 主播降级到观众的结果
         */
        RCLoggerTag["L_RTC_CLIENT_DOWNGRADE_TO_AUDIENCE_ROOM_R"] = "L-rtc_client_downgrade_to_audience_room-R";
        /**
         * 获取加入房间的信息
         */
        RCLoggerTag["L_RTC_CLIENT_GET_JOINED_ROOM_INFO_O"] = "L-rtc_client_get_joined_room_info-O";
        /**
         * 观众订阅资源任务
         */
        RCLoggerTag["L_AUDIENCE_CLIENT_SUBSCRIBE_T"] = "L-audinence_client_subscribe-T";
        /**
         * 观众订阅资源结果
         */
        RCLoggerTag["L_AUDIENCE_CLIENT_SUBSCRIBE_R"] = "L-audinence_client_subscribe-R";
        /**
         * 观众取消订阅资源任务
         */
        RCLoggerTag["L_AUDIENCE_CLIENT_UNSUBSCRIBE_T"] = "L-audinence_client_unsubscribe-T";
        /**
         * 观众端取消订阅资源结果
         */
        RCLoggerTag["L_AUDIENCE_CLIENT_UNSUBSCRIBE_R"] = "L-audinence_client_unsubscribe-R";
        /**
         * rtcPing开始
         */
        RCLoggerTag["L_PINGER_START_O"] = "L-pinger_start-O";
        /**
         * rtcPing结束
         */
        RCLoggerTag["L_PINGER_STOP_O"] = "L-pinger_stop-O";
        /**
         * rtcPing超时
         */
        RCLoggerTag["L_PINGER_TIMEOUT_O"] = "L-pinger_timeout-O";
        /**
         * 发送消息的任务
         */
        RCLoggerTag["L_ABSTRACT_ROOM_SEND_MESSAGE_T"] = "L-abstract_room_send_message-T";
        /**
         * 发送消息的结果
         */
        RCLoggerTag["L_ABSTRACT_ROOM_SEND_MESSAGE_R"] = "L-abstract_room_send_message-R";
        /**
         * 设置房间属性的任务
         */
        RCLoggerTag["L_ABSTRACT_ROOM_SET_ROOM_ATTRIBUTE_T"] = "L-abstract_room_set_room_attribute-T";
        /**
         * 设置房间属性的结果
         */
        RCLoggerTag["L_ABSTRACT_ROOM_SET_ROOM_ATTRIBUTE_R"] = "L-abstract_room_set_room_attribute_R";
        /**
         * 删除房间属性的任务
         */
        RCLoggerTag["L_ABSTRACT_ROOM_DELETE_ROOM_ATTRIBUTE_T"] = "L-abstract_room_delete_room_attribute_T";
        /**
         * 删除房间属性的任务
         */
        RCLoggerTag["L_ABSTRACT_ROOM_DELETE_ROOM_ATTRIBUTE_R"] = "L-abstract_room_delete_room_attribute_R";
        /**
         * 房间推流的任务
         */
        RCLoggerTag["L_ABSTRACT_ROOM_PUBLISH_T"] = "L-abstract_room_publish-T";
        /**
         * 房间推流的结果
         */
        RCLoggerTag["L_ABSTRACT_ROOM_PUBLISH_R"] = "L-abstract_room_publish-R";
        /**
         * 房间停止推流的任务
         */
        RCLoggerTag["L_ABSTRACT_ROOM_UNPUBLISH_T"] = "L-abstract_room_unpublish-T";
        /**
         * 房间停止推流结果
         */
        RCLoggerTag["L_ABSTRACT_ROOM_UNPUBLISH_R"] = "L-abstract_room_unpublish-R";
        /**
         * 房间订阅资源任务
         */
        RCLoggerTag["L_ABSTRACT_ROOM_SUBSCRIBE_T"] = "L-abstract_room_subscribe-T";
        /**
         * 房间订阅资源结果
         */
        RCLoggerTag["L_ABSTRACT_ROOM_SUBSCRIBE_R"] = "L-abstract_room_subscribe-R";
        /**
         * 房间取消订阅资源的任务
         */
        RCLoggerTag["L_ABSTRACT_ROOM_UNSUBSCRIBE_T"] = "L-abstract_room_unsubscribe-T";
        /**
         * 房间取消订阅资源的结果
         */
        RCLoggerTag["L_ABSTRACT_ROOM_UNSUBSCRIBE_R"] = "L-abstract_room_unsubscribe-R";
        /**
         * 房间注册监听事件
         */
        RCLoggerTag["L_ABSTRACT_ROOM_REGISTER_ROOM_EVENT_LISTENER_O"] = "L-abstract_room_register_room_event_listener-O";
        /**
         * 房间注册上报事件
         */
        RCLoggerTag["L_ABSTRACT_ROOM_REGISTER_REPORT_LISTENER_O"] = "L-abstract_room_register_report_listener-O";
        /**
         * 房间音频等级变更
         */
        RCLoggerTag["L_ABSTRACT_ROOM_AUDIO_LEVEL_O"] = "L-abstract_room_audio_level-O";
        /**
         * 房间重连的任务
         */
        RCLoggerTag["L_ABSTRACT_ROOM_RECONNECTED_T"] = "L-abstract_room_reconnected-T";
        /**
         * 房间重连的结果
         */
        RCLoggerTag["L_ABSTRACT_ROOM_RECONNECTED_R"] = "L-abstract_room_reconnected-R";
        /**
         * 监听器事件触发
         */
        RCLoggerTag["L_ABSTRACT_ROOM_CALL_APP_LISTENER_O"] = "L-abstract_room_call_app_listener-O";
        /**
         * livingroom重连的任务
         */
        RCLoggerTag["L_LIVING_ROOM_RECONNECTED_T"] = "L-living_room_reconnected-T";
        /**
         * livingroom重连的结果
         */
        RCLoggerTag["L_LIVING_ROOM_RECONNECTED_R"] = "L-living_room_reconnected-R";
        /**
         * livingroom更改cdn状态的任务
         */
        RCLoggerTag["L_LIVING_ROOM_ENABLE_INNER_CDN_T"] = "L-living_room_enable_inner_cdn-T";
        /**
         * livingroom更改cdn状态的结果
         */
        RCLoggerTag["L_LIVING_ROOM_ENABLE_INNER_CDN_R"] = "L-living_room_enable_inner_cdn-R";
        /**
         * livingroom扩散cdn内容的任务
         */
        RCLoggerTag["L_LIVING_ROOM_SPREAD_CDN_INFO_T"] = "L-living_room_spread_cdn_info-T";
        /**
         * livingroom扩散cdn内容的结果
         */
        RCLoggerTag["L_LIVING_ROOM_SPREAD_CDN_INFO_R"] = "L-living_room_spread_cdn_info-R";
        /**
         * livingroom加入pk房间的任务
         */
        RCLoggerTag["L_LIVING_ROOM_JOINED_PK_ROOM_T"] = "L-living_room_joined_pk_room-T";
        /**
         * livingroom加入pk房间的结果
         */
        RCLoggerTag["L_LIVING_ROOM_JOINED_PK_ROOM_R"] = "L-living_room_joined_pk_room-R";
        /**
         * livingroom离开pk房间的任务
         */
        RCLoggerTag["L_LIVING_ROOM_LEAVE_PK_ROOM_T"] = "L-living_room_leave_pk_room-T";
        /**
         * livingroom离开pk房间的结果
         */
        RCLoggerTag["L_LIVING_ROOM_LEAVE_PK_ROOM_R"] = "L-living_room_leave_pk_room-R";
        /**
         * livingroom获取pk房间handler
         */
        RCLoggerTag["L_LIVING_ROOM_GET_ROOM_PK_HANDLER_O"] = "L-living_room_get_room_pk_handler-O";
        /**
         * livingroom离开全部pk房间
         */
        RCLoggerTag["L_LIVING_ROOM_QUIT_ALL_PK_ROOM_O"] = "L-living_room_quit_all_pk_room-O";
        /**
         * livingpkhandler注册pk房间监听事件
         */
        RCLoggerTag["L_LIVING_PK_HANDLER_REGISTER_ROOM_PK_EVENT_LISTENER_O"] = "L-living_pk_handler_register_room_pk_event_listener-O";
        /**
         * livingpkhandler发起跨房间连麦请求的任务
         */
        RCLoggerTag["L_LIVING_PK_HANDLER_REQUEST_JOIN_OTHER_ROOM_T"] = "L-living_pk_handler_request_join_other_room-T";
        /**
         * livingpkhandler发起跨房间连麦请求的结果
         */
        RCLoggerTag["L_LIVING_PK_HANDLER_REQUEST_JOIN_OTHER_ROOM_R"] = "L-living_pk_handler_request_join_other_room-R";
        /**
         * livingpkhandler取消跨房间连麦请求的任务
         */
        RCLoggerTag["L_LIVING_PK_HANDLER_CANCEL_REQUEST_JOIN_OTHER_ROOM_T"] = "L-living_pk_handler_cancel_request_join_other_room-T";
        /**
         * livingpkhandler取消跨房间连麦请求的结果
         */
        RCLoggerTag["L_LIVING_PK_HANDLER_CANCEL_REQUEST_JOIN_OTHER_ROOM_R"] = "L-living_pk_handler_cancel_request_join_other_room-R";
        /**
         * livingpkhandler响应跨房间连麦请求的任务
         */
        RCLoggerTag["L_LIVING_PK_HANDLER_RESPONSE_JOIN_OTHER_ROOM_T"] = "L-living_pk_handler_response_join_other_room-T";
        /**
         * livingpkhandler响应跨房间连麦请求的结果
         */
        RCLoggerTag["L_LIVING_PK_HANDLER_RESPONSE_JOIN_OTHER_ROOM_R"] = "L-living_pk_handler_response_join_other_room-R";
        /**
         * livingpkhandler加入连麦房间的任务
         */
        RCLoggerTag["L_LIVING_PK_HANDLER_JOIN_OTHER_ROOM_T"] = "L-living_pk_handler_join_other_room-T";
        /**
         * livingpkhandler加入连麦房间的结果
         */
        RCLoggerTag["L_LIVING_PK_HANDLER_JOIN_OTHER_ROOM_R"] = "L-living_pk_handler_join_other_room-R";
        /**
         * livingpkhandler离开连麦房间的任务
         */
        RCLoggerTag["L_LIVING_PK_HANDLER_LEAVE_OTHER_ROOM_T"] = "L-living_pk_handler_leave_other_room-T";
        /**
         * livingpkhandler离开连麦房间的结果
         */
        RCLoggerTag["L_LIVING_PK_HANDLER_LEAVE_OTHER_ROOM_R"] = "L-living_pk_handler_leave_other_room-R";
        /**
         * AudienceLivingRoom信令数据变化的任务
         */
        RCLoggerTag["L_AUDIENCE_LIVING_ROOM_SINGAL_DATA_CHANGE_T"] = "L-audience_living_room_singal_data_change-T";
        /**
         * AudienceLivingRoom信令数据变化的结果
         */
        RCLoggerTag["L_AUDIENCE_LIVING_ROOM_SINGAL_DATA_CHANGE_R"] = "L-audience_living_room_singal_data_change-R";
        /**
         * AudienceLivingRoom获取cdn播放地址的任务
         */
        RCLoggerTag["L_AUDIENCE_LIVING_ROOM_GET_CDN_PLAY_URL_T"] = "L-audience_living_room_get_cdn_play_url-T";
        /**
         * AudienceLivingRoom获取cdn播放地址的结果
         */
        RCLoggerTag["L_AUDIENCE_LIVING_ROOM_GET_CDN_PLAY_URL_R"] = "L-audience_living_room_get_cdn_play_url-R";
        /**
         * AudienceLivingRoom订阅资源的任务
         */
        RCLoggerTag["L_AUDIENCE_LIVING_ROOM_SUBSCRIBE_T"] = "L-audience_living_room_subscribe-T";
        /**
         * AudienceLivingRoom订阅资源的结果
         */
        RCLoggerTag["L_AUDIENCE_LIVING_ROOM_SUBSCRIBE_R"] = "L-audience_living_room_subscribe-R";
        /**
         * AudienceLivingRoom取消订阅资源的任务
         */
        RCLoggerTag["L_AUDIENCE_LIVING_ROOM_UNSUBSCRIBE_T"] = "L-audience_living_room_unsubscribe-T";
        /**
         * AudienceLivingRoom取消订阅资源的结果
         */
        RCLoggerTag["L_AUDIENCE_LIVING_ROOM_UNSUBSCRIBE_R"] = "L-audience_living_room_unsubscribe-R";
        /**
         * AudienceLivingRoom声音改变
         */
        RCLoggerTag["L_AUDIENCE_LIVING_ROOM_AUDIO_LEVEL_CHANGE_O"] = "L-audience_living_room_audio_level_change-O";
        /**
         * MCUConfigBuilder设置音频轨道
         */
        RCLoggerTag["L_MCU_CONFIG_BUILDER_SET_HOST_VIDEO_TRACK_O"] = "L-mcu_config_builder_set_host_video_track-O";
        /**
         * MCUConfigBuilder设置混合排版模式
         */
        RCLoggerTag["L_MCU_CONFIG_BUILDER_SET_MIX_LAYOUT_MODE_O"] = "L-mcu_config_builder_set_mix_layout_mode-O";
        /**
         * MCUConfigBuilder设置输出视频
         */
        RCLoggerTag["L_MCU_CONFIG_BUILDER_SET_OUTPUT_VIDEO_RESOLUTION_O"] = "L-mcu_config_builder_set_output_video_resolution-O";
        /**
         * MCUConfigBuilder设置输出视频fps
         */
        RCLoggerTag["L_MCU_CONFIG_BUILDER_SET_OUTPUT_VIDEO_FPS_O"] = "L-mcu_config_builder_set_output_video_fps-O";
        /**
         * MCUConfigBuilder设置输出视频bitrate
         */
        RCLoggerTag["L_MCU_CONFIG_BUILDER_SET_OUTPUT_VIDEO_BITRATE_O"] = "L-mcu_config_builder_set_output_video_bitrate-O";
        /**
         * MCUConfigBuilder设置输出小流视频resolution
         */
        RCLoggerTag["L_MCU_CONFIG_BUILDER_SET_OUTPUT_TINY_VIDEO_RESOLUTION_O"] = "L-mcu_config_builder_set_output_tiny_video_resolution-O";
        /**
         * MCUConfigBuilder设置输出小流视频fps
         */
        RCLoggerTag["L_MCU_CONFIG_BUILDER_SET_OUTPUT_TINY_VIDEO_FPS_O"] = "L-mcu_config_builder_set_output_tiny_video_fps-O";
        /**
         * MCUConfigBuilder设置输出小流视频bitrate
         */
        RCLoggerTag["L_MCU_CONFIG_BUILDER_SET_OUTPUT_TINY_VIDEO_BITRATE_O"] = "L-mcu_config_builder_set_output_tiny_video_bitrate-O";
        /**
         * MCUConfigBuilder设置输出视频的渲染模式
         */
        RCLoggerTag["L_MCU_CONFIG_BUILDER_SET_OUTPUT_VIDEO_RENDER_MODE_O"] = "L-mcu_config_builder_set_output_video_render_mode-O";
        /**
         * MCUConfigBuilder设置输出音频bitrate
         */
        RCLoggerTag["L_MCU_CONFIG_BUILDER_SET_OUTPUT_AUDIO_BITRATE_O"] = "L-mcu_config_builder_set_output_audio_bitrate-O";
        /**
         * MCUConfigBuilder设置背景颜色
         */
        RCLoggerTag["L_MCU_CONFIG_BUILDER_SET_OUTPUT_BACKGROUND_COLOR_O"] = "L-mcu_config_builder_set_output_background_color-O";
        /**
         * MCUConfigBuilder设置背景图片
         */
        RCLoggerTag["L_MCU_CONFIG_BUILDER_SET_OUTPUT_BACKGROUND_PICTURE_O"] = "L-mcu_config_builder_add_output_background_picture-O";
        /**
         * MCUConfigBuilder删除背景图片
         */
        RCLoggerTag["L_MCU_CONFIG_BUILDER_REMOVE_OUTPUT_BACKGROUND_PICTURE_O"] = "L-mcu_config_builder_remove_output_background_picture-O";
        /**
         * MCUConfigBuilder清除背景图片
         */
        RCLoggerTag["L_MCU_CONFIG_BUILDER_CLEAR_OUTPUT_BACKGROUND_PICTURE_O"] = "L-mcu_config_builder_clear_output_background_picture-O";
        /**
         * MCUConfigBuilder设置背景图片填充模式
         */
        RCLoggerTag["L_MCU_CONFIG_BUILDER_SET_OUTPUT_BACKGROUND_PICTURE_FILL_MODE_O"] = "L-mcu_config_builder_set_output_background_picture-fill-mode-O";
        /**
         * MCUConfigBuilder设置直播CDN旁路推流地址
         */
        RCLoggerTag["L_MCU_CONFIG_BUILDER_ADD_PUBLISH_STREAM_URLS_O"] = "L-mcu_config_builder_add_publish_stream_urls-O";
        /**
         * MCUConfigBuilder移除直播CDN旁路推流地址
         */
        RCLoggerTag["L_MCU_CONFIG_BUILDER_REMOVE_PUBLISH_STREAM_URLS_O"] = "L-mcu_config_builder_remove_publish_stream_urls-O";
        /**
         * MCUConfigBuilder清除直播CDN旁路推流地址
         */
        RCLoggerTag["L_MCU_CONFIG_BUILDER_CLEAR_PUBLISH_STREAM_URLS_O"] = "L-mcu_config_builder_clear_publish_stream_urls-O";
        /**
         * MCUConfigBuilder添加自定义布局视频
         */
        RCLoggerTag["L_MCU_CONFIG_BUILDER_ADD_CUSTOMIZE_LAYOUT_VIDEO_O"] = "L-mcu_config_builder_add_customize_layout_video-O";
        /**
         * MCUConfigBuilder移除自定义布局视频
         */
        RCLoggerTag["L_MCU_CONFIG_BUILDER_REMOVE_CUSTOMIZE_LAYOUT_VIDEO_O"] = "L-mcu_config_builder_remove_customize_layout_video-O";
        /**
         * MCUConfigBuilder清空自定义布局视频
         */
        RCLoggerTag["L_MCU_CONFIG_BUILDER_CLEAR_CUSTOMIZE_LAYOUT_VIDEO_O"] = "L-mcu_config_builder_clear_customize_layout_video-O";
        /**
         * MCUConfigBuilder设置自定义输入音频
         */
        RCLoggerTag["L_MCU_CONFIG_BUILDER_SET_CUSTOMIZE_INPUT_AUDIO_O"] = "L-mcu_config_builder_set_customize_input_audio-O";
        /**
         * MCUConfigBuilder添加自定义输入音频
         */
        RCLoggerTag["L_MCU_CONFIG_BUILDER_ADD_CUSTOMIZE_INPUT_AUDIO_O"] = "L-mcu_config_builder_add_customize_input_audio-O";
        /**
         * MCUConfigBuilder移除自定义输入音频
         */
        RCLoggerTag["L_MCU_CONFIG_BUILDER_REMOVE_CUSTOMIZE_INPUT_AUDIO_O"] = "L-mcu_config_builder_remove_customize_input_audio-O";
        /**
         * MCUConfigBuilder清除自定义输入音频
         */
        RCLoggerTag["L_MCU_CONFIG_BUILDER_CLEAR_CUSTOMIZE_INPUT_AUDIO_O"] = "L-mcu_config_builder_clear_customize_input_audio-O";
        /**
         * MCUConfigBuilder重置
         */
        RCLoggerTag["L_MCU_CONFIG_BUILDER_RESET_O"] = "L-mcu_config_builder_reset-O";
        /**
         * MCUConfigBuilder刷新
         */
        RCLoggerTag["L_MCU_CONFIG_BUILDER_FLUSH_O"] = "L-mcu_config_builder_flush-O";
        /**
         * MCUConfigBuilder设置单到流水印
         */
        RCLoggerTag["L_MCU_CONFIG_BUILDER_ADD_SINGLE_WATER_MARK_O"] = "L-mcu_config_builder_add_single_water_mark-O";
        /**
         * MCUConfigBuilder移除单到流水印
         */
        RCLoggerTag["L_MCU_CONFIG_BUILDER_REMOVE_SINGLE_WATER_MARK_O"] = "L-mcu_config_builder_remove_single_water_mark-O";
        /**
         * MCUConfigBuilder移除单到流水印
         */
        RCLoggerTag["L_MCU_CONFIG_BUILDER_CLEAR_SINGLE_WATER_MARK_O"] = "L-mcu_config_builder_clear_single_water_mark-O";
        /**
         * MediaService设置mcu配置的任务
         */
        RCLoggerTag["L_MEDIA_SERVICE_SET_MCU_CONFIG_T"] = "L-media_service_set_mcu_config-T";
        /**
         * MediaService设置mcu配置的结果
         */
        RCLoggerTag["L_MEDIA_SERVICE_SET_MCU_CONFIG_R"] = "L-media_service_set_mcu_config-R";
        /**
         * MediaService获取CDN资源内容的任务
         */
        RCLoggerTag["L_MEDIA_SERVICE_GET_CDN_RESOURCE_INFO_T"] = "L-media_service_get_cnd_resource_info-T";
        /**
         * MediaService获取CDN资源内容的结果
         */
        RCLoggerTag["L_MEDIA_SERVICE_GET_CDN_RESOURCE_INFO_R"] = "L-media_service_get_cnd_resource_info-R";
        /**
         * MediaService发起请求的任务
         */
        RCLoggerTag["L_MEDIA_SERVICE_REQUEST_T"] = "L-media_service_request-T";
        /**
         * MediaService发起请求的结果
         */
        RCLoggerTag["L_MEDIA_SERVICE_REQUEST_R"] = "L-media_service_request-R";
        /**
         * LocalTrack设置推流详情
         */
        RCLoggerTag["L_LOCAL_TRACK_INNER_SET_PUBLISHED_O"] = "L-loacl_track_inner_set_published-O";
        /**
         * LocalTrack销毁
         */
        RCLoggerTag["L_LOCAL_TRACK_DESTROY_O"] = "L-loacl_track_destroy-O";
        /**
         * LocalTrack设置bitrate
         */
        RCLoggerTag["L_LOCAL_TRACK_SET_BITRATE_O"] = "L-loacl_track_set_bitrate-O";
        /**
         * LocalTrack设置禁言状态
         */
        RCLoggerTag["L_LOCAL_TRACK_SET_LOCAL_MUTED_O"] = "L-loacl_track_set_local_muted-O";
        /**
         * Track播放的任务
         */
        RCLoggerTag["L_TRACK_PLAY_T"] = "L-track_play-T";
        /**
         * Track播放的结果
         */
        RCLoggerTag["L_TRACK_PLAY_R"] = "L-track_play-R";
        /**
         * Track静音
         */
        RCLoggerTag["L_TRACK_MUTE_O"] = "L-track_mute-O";
        /**
         * Track取消静音
         */
        RCLoggerTag["L_TRACK_UNMUTE_O"] = "L-track_unmute-O";
        /**
         * RemoteTrack设置订阅
         */
        RCLoggerTag["L_REMOTE_TRACK_INNER_SET_SUBSCRIBED_O"] = "L-remote_track_inner_set_subscribed-O";
        /**
         * AbstractStatParser格式化状态
         */
        RCLoggerTag["L_ABSTRACT_STAT_PARSER_FORMAT_RTC_STATE_REPORT_O"] = "L-abstract_stat_parser_format_rtc_state_report-O";
        /**
         * ASdpStrategy设置semantics
         */
        RCLoggerTag["L_A_SDP_STRATEGY_SET_SDP_SEMANTICS_O"] = "L-a_sdp_strategy_set_sdp_semantics-O";
        /**
         * ASdpStrategy设置远端回答
         */
        RCLoggerTag["L_A_SDP_STRATEGY_SET_REMOTE_ANSWER_O"] = "L-a_sdp_strategy_set_remote_answer-O";
        /**
         * RTCPeerConnection获取状态数据
         */
        RCLoggerTag["L_RTC_PEER_CONNECTION_GET_STATS_DATA_O"] = "L-rtc_peer_connection_get_stats_data-O";
        /**
         * RTCPeerConnection设置本地轨道
         */
        RCLoggerTag["L_RTC_PEER_CONNECTION_ADD_LOCAL_TRACK_O"] = "L-rtc_peer_connection_add_local_track-O";
        /**
         * RTCPeerConnection获取本地轨道
         */
        RCLoggerTag["L_RTC_PEER_CONNECTION_GET_LOCAL_TRACKS_O"] = "L-rtc_peer_connection_get_local_tracks-O";
        /**
         * RTCPeerConnection的ICE连接状态改变
         */
        RCLoggerTag["L_RTC_PEER_CONNECTION_ICE_CONNECTION_STATE_S"] = "L-rtc_peer_connection_ice_connection_state-S";
        /**
         * RTCPeerConnection的connection连接状态改变
         */
        RCLoggerTag["L_RTC_PEER_CONNECTION_CONNECTION_STATE_S"] = "L-rtc_peer_connection_connection_state-S";
        /**
         * RTCPeerConnection设置bitrate
         */
        RCLoggerTag["L_RTC_PEER_CONNECTION_SET_BITRATE_O"] = "L-rtc_peer_connection_set_bitrate-O";
        /**
         * RTCPeerConnection创建offer
         */
        RCLoggerTag["L_RTC_PEER_CONNECTION_CREATE_OFFER_O"] = "L-rtc_peer_connection_create_offer-O";
        /**
         * RTCPeerConnection设置远端回答
         */
        RCLoggerTag["L_RTC_PEER_CONNECTION_SET_REMOTE_ANSWER_O"] = "L-rtc_peer_connection_set_remote_answer-O";
        /**
         * RTCPeerConnection删除本地指定轨道
         */
        RCLoggerTag["L_RTC_PEER_CONNECTION_REMOVE_LOCAL_TRACK_BY_ID_O"] = "L-rtc_peer_connection_remove_local_track_by_id-O";
        /**
         * RTCPeerConnection删除全部本地轨道
         */
        RCLoggerTag["L_RTC_PEER_CONNECTION_REMOVE_ALL_LOCAL_TRACK_O"] = "L-rtc_peer_connection_remove_all_local_track-O";
        /**
         * RTCPeerConnection删除本地轨道
         */
        RCLoggerTag["L_RTC_PEER_CONNECTION_REMOVE_LOCAL_TRACK_O"] = "L-rtc_peer_connection_remove_local_track-O";
        /**
         * RTCPeerConnection更新远端轨道
         */
        RCLoggerTag["L_RTC_PEER_CONNECTION_UPDATE_SUB_REMOTE_TRACKS_O"] = "L-rtc_peer_connection_update_sub_remote_tracks-O";
        /**
         * RTCPeerConnection设置本地声音
         */
        RCLoggerTag["L_RTC_PEER_CONNECTION_LOCAL_TRACK_MUTED_O"] = "L-rtc_peer_connection_local_track_muted-O";
        /**
         * RTCPeerConnection销毁
         */
        RCLoggerTag["L_RTC_PEER_CONNECTION_DESTROY_O"] = "L-rtc_peer_connection_destroy-O";
        /**
         * 设置码率出错，设置的码率值未在推荐列表
         */
        RCLoggerTag["L_RTC_SET_RECOMMEND_BITRATE_O"] = "L_rtc_set_recommend_bitrate_O";
        /**
         * 设置 SDP 上的码率
         */
        RCLoggerTag["L_RTC_SDP_BITRATE_O"] = "L_rtc_sdp_bitrate_O";
        /**
         * 3A 降噪
         */
        RCLoggerTag["L_RTC_3ANOISE_NODE_O"] = "L_RTC_AAAnoiseNode_O";
        /**
         * 3A 降噪
         */
        RCLoggerTag["L_RTC_3ANOISE_NODE_E"] = "L_RTC_AAAnoiseNode_E";
        /**
         * 3A 降噪
         */
        RCLoggerTag["L_RTC_3ANOISE_NODE_STOP_O"] = "L_RTC_AAAnoiseNode_Stop_O";
        /**
         * 加入跨appkey互通房间的任务
         */
        RCLoggerTag["L_RTC_CLIENT_JOIN_CROSS_RTC_ROOM_T"] = "L_rtc_client_join_cross_rtc_room_T";
        /**
         * 加入跨appkey互通房间的结果
         */
        RCLoggerTag["L_RTC_CLIENT_JOIN_CROSS_RTC_ROOM_R"] = "L_rtc_client_join_cross_rtc_room_R";
    })(RCLoggerTag || (RCLoggerTag = {}));
    var RCLoggerStatus;
    (function (RCLoggerStatus) {
        /**
         * 失败
         */
        RCLoggerStatus["FAILED"] = "fail";
        /**
         * 成功
         */
        RCLoggerStatus["SUCCESSED"] = "success";
        /**
         * 超时
         */
        RCLoggerStatus["TIMEOUT"] = "timeout";
        /**
         * 信息
         */
        RCLoggerStatus["INFO"] = "info";
    })(RCLoggerStatus || (RCLoggerStatus = {}));

    /*
     *  Copyright (c) 2016 The WebRTC project authors. All Rights Reserved.
     *
     *  Use of this source code is governed by a BSD-style license
     *  that can be found in the LICENSE file in the root of the source
     *  tree.
     */

    let logDisabled_ = true;
    let deprecationWarnings_ = true;

    /**
     * Extract browser version out of the provided user agent string.
     *
     * @param {!string} uastring userAgent string.
     * @param {!string} expr Regular expression used as match criteria.
     * @param {!number} pos position in the version string to be returned.
     * @return {!number} browser version.
     */
    function extractVersion(uastring, expr, pos) {
      const match = uastring.match(expr);
      return match && match.length >= pos && parseInt(match[pos], 10);
    }

    // Wraps the peerconnection event eventNameToWrap in a function
    // which returns the modified event object (or false to prevent
    // the event).
    function wrapPeerConnectionEvent(window, eventNameToWrap, wrapper) {
      if (!window.RTCPeerConnection) {
        return;
      }
      const proto = window.RTCPeerConnection.prototype;
      const nativeAddEventListener = proto.addEventListener;
      proto.addEventListener = function(nativeEventName, cb) {
        if (nativeEventName !== eventNameToWrap) {
          return nativeAddEventListener.apply(this, arguments);
        }
        const wrappedCallback = (e) => {
          const modifiedEvent = wrapper(e);
          if (modifiedEvent) {
            if (cb.handleEvent) {
              cb.handleEvent(modifiedEvent);
            } else {
              cb(modifiedEvent);
            }
          }
        };
        this._eventMap = this._eventMap || {};
        if (!this._eventMap[eventNameToWrap]) {
          this._eventMap[eventNameToWrap] = new Map();
        }
        this._eventMap[eventNameToWrap].set(cb, wrappedCallback);
        return nativeAddEventListener.apply(this, [nativeEventName,
          wrappedCallback]);
      };

      const nativeRemoveEventListener = proto.removeEventListener;
      proto.removeEventListener = function(nativeEventName, cb) {
        if (nativeEventName !== eventNameToWrap || !this._eventMap
            || !this._eventMap[eventNameToWrap]) {
          return nativeRemoveEventListener.apply(this, arguments);
        }
        if (!this._eventMap[eventNameToWrap].has(cb)) {
          return nativeRemoveEventListener.apply(this, arguments);
        }
        const unwrappedCb = this._eventMap[eventNameToWrap].get(cb);
        this._eventMap[eventNameToWrap].delete(cb);
        if (this._eventMap[eventNameToWrap].size === 0) {
          delete this._eventMap[eventNameToWrap];
        }
        if (Object.keys(this._eventMap).length === 0) {
          delete this._eventMap;
        }
        return nativeRemoveEventListener.apply(this, [nativeEventName,
          unwrappedCb]);
      };

      Object.defineProperty(proto, 'on' + eventNameToWrap, {
        get() {
          return this['_on' + eventNameToWrap];
        },
        set(cb) {
          if (this['_on' + eventNameToWrap]) {
            this.removeEventListener(eventNameToWrap,
                this['_on' + eventNameToWrap]);
            delete this['_on' + eventNameToWrap];
          }
          if (cb) {
            this.addEventListener(eventNameToWrap,
                this['_on' + eventNameToWrap] = cb);
          }
        },
        enumerable: true,
        configurable: true
      });
    }

    function disableLog(bool) {
      if (typeof bool !== 'boolean') {
        return new Error('Argument type: ' + typeof bool +
            '. Please use a boolean.');
      }
      logDisabled_ = bool;
      return (bool) ? 'adapter.js logging disabled' :
          'adapter.js logging enabled';
    }

    /**
     * Disable or enable deprecation warnings
     * @param {!boolean} bool set to true to disable warnings.
     */
    function disableWarnings(bool) {
      if (typeof bool !== 'boolean') {
        return new Error('Argument type: ' + typeof bool +
            '. Please use a boolean.');
      }
      deprecationWarnings_ = !bool;
      return 'adapter.js deprecation warnings ' + (bool ? 'disabled' : 'enabled');
    }

    function log() {
      if (typeof window === 'object') {
        if (logDisabled_) {
          return;
        }
        if (typeof console !== 'undefined' && typeof console.log === 'function') {
          console.log.apply(console, arguments);
        }
      }
    }

    /**
     * Shows a deprecation warning suggesting the modern and spec-compatible API.
     */
    function deprecated(oldMethod, newMethod) {
      if (!deprecationWarnings_) {
        return;
      }
      console.warn(oldMethod + ' is deprecated, please use ' + newMethod +
          ' instead.');
    }

    /**
     * Browser detector.
     *
     * @return {object} result containing browser and version
     *     properties.
     */
    function detectBrowser(window) {
      // Returned result object.
      const result = {browser: null, version: null};

      // Fail early if it's not a browser
      if (typeof window === 'undefined' || !window.navigator) {
        result.browser = 'Not a browser.';
        return result;
      }

      const {navigator} = window;

      if (navigator.mozGetUserMedia) { // Firefox.
        result.browser = 'firefox';
        result.version = extractVersion(navigator.userAgent,
            /Firefox\/(\d+)\./, 1);
      } else if (navigator.webkitGetUserMedia ||
          (window.isSecureContext === false && window.webkitRTCPeerConnection &&
           !window.RTCIceGatherer)) {
        // Chrome, Chromium, Webview, Opera.
        // Version matches Chrome/WebRTC version.
        // Chrome 74 removed webkitGetUserMedia on http as well so we need the
        // more complicated fallback to webkitRTCPeerConnection.
        result.browser = 'chrome';
        result.version = extractVersion(navigator.userAgent,
            /Chrom(e|ium)\/(\d+)\./, 2);
      } else if (navigator.mediaDevices &&
          navigator.userAgent.match(/Edge\/(\d+).(\d+)$/)) { // Edge.
        result.browser = 'edge';
        result.version = extractVersion(navigator.userAgent,
            /Edge\/(\d+).(\d+)$/, 2);
      } else if (window.RTCPeerConnection &&
          navigator.userAgent.match(/AppleWebKit\/(\d+)\./)) { // Safari.
        result.browser = 'safari';
        result.version = extractVersion(navigator.userAgent,
            /AppleWebKit\/(\d+)\./, 1);
        result.supportsUnifiedPlan = window.RTCRtpTransceiver &&
            'currentDirection' in window.RTCRtpTransceiver.prototype;
      } else { // Default fallthrough: not supported.
        result.browser = 'Not a supported browser.';
        return result;
      }

      return result;
    }

    /**
     * Checks if something is an object.
     *
     * @param {*} val The something you want to check.
     * @return true if val is an object, false otherwise.
     */
    function isObject(val) {
      return Object.prototype.toString.call(val) === '[object Object]';
    }

    /**
     * Remove all empty objects and undefined values
     * from a nested object -- an enhanced and vanilla version
     * of Lodash's `compact`.
     */
    function compactObject(data) {
      if (!isObject(data)) {
        return data;
      }

      return Object.keys(data).reduce(function(accumulator, key) {
        const isObj = isObject(data[key]);
        const value = isObj ? compactObject(data[key]) : data[key];
        const isEmptyObject = isObj && !Object.keys(value).length;
        if (value === undefined || isEmptyObject) {
          return accumulator;
        }
        return Object.assign(accumulator, {[key]: value});
      }, {});
    }

    /* iterates the stats graph recursively. */
    function walkStats(stats, base, resultSet) {
      if (!base || resultSet.has(base.id)) {
        return;
      }
      resultSet.set(base.id, base);
      Object.keys(base).forEach(name => {
        if (name.endsWith('Id')) {
          walkStats(stats, stats.get(base[name]), resultSet);
        } else if (name.endsWith('Ids')) {
          base[name].forEach(id => {
            walkStats(stats, stats.get(id), resultSet);
          });
        }
      });
    }

    /* filter getStats for a sender/receiver track. */
    function filterStats(result, track, outbound) {
      const streamStatsType = outbound ? 'outbound-rtp' : 'inbound-rtp';
      const filteredResult = new Map();
      if (track === null) {
        return filteredResult;
      }
      const trackStats = [];
      result.forEach(value => {
        if (value.type === 'track' &&
            value.trackIdentifier === track.id) {
          trackStats.push(value);
        }
      });
      trackStats.forEach(trackStat => {
        result.forEach(stats => {
          if (stats.type === streamStatsType && stats.trackId === trackStat.id) {
            walkStats(result, stats, filteredResult);
          }
        });
      });
      return filteredResult;
    }

    /*
     *  Copyright (c) 2016 The WebRTC project authors. All Rights Reserved.
     *
     *  Use of this source code is governed by a BSD-style license
     *  that can be found in the LICENSE file in the root of the source
     *  tree.
     */
    const logging = log;

    function shimGetUserMedia$3(window, browserDetails) {
      const navigator = window && window.navigator;

      if (!navigator.mediaDevices) {
        return;
      }

      const constraintsToChrome_ = function(c) {
        if (typeof c !== 'object' || c.mandatory || c.optional) {
          return c;
        }
        const cc = {};
        Object.keys(c).forEach(key => {
          if (key === 'require' || key === 'advanced' || key === 'mediaSource') {
            return;
          }
          const r = (typeof c[key] === 'object') ? c[key] : {ideal: c[key]};
          if (r.exact !== undefined && typeof r.exact === 'number') {
            r.min = r.max = r.exact;
          }
          const oldname_ = function(prefix, name) {
            if (prefix) {
              return prefix + name.charAt(0).toUpperCase() + name.slice(1);
            }
            return (name === 'deviceId') ? 'sourceId' : name;
          };
          if (r.ideal !== undefined) {
            cc.optional = cc.optional || [];
            let oc = {};
            if (typeof r.ideal === 'number') {
              oc[oldname_('min', key)] = r.ideal;
              cc.optional.push(oc);
              oc = {};
              oc[oldname_('max', key)] = r.ideal;
              cc.optional.push(oc);
            } else {
              oc[oldname_('', key)] = r.ideal;
              cc.optional.push(oc);
            }
          }
          if (r.exact !== undefined && typeof r.exact !== 'number') {
            cc.mandatory = cc.mandatory || {};
            cc.mandatory[oldname_('', key)] = r.exact;
          } else {
            ['min', 'max'].forEach(mix => {
              if (r[mix] !== undefined) {
                cc.mandatory = cc.mandatory || {};
                cc.mandatory[oldname_(mix, key)] = r[mix];
              }
            });
          }
        });
        if (c.advanced) {
          cc.optional = (cc.optional || []).concat(c.advanced);
        }
        return cc;
      };

      const shimConstraints_ = function(constraints, func) {
        if (browserDetails.version >= 61) {
          return func(constraints);
        }
        constraints = JSON.parse(JSON.stringify(constraints));
        if (constraints && typeof constraints.audio === 'object') {
          const remap = function(obj, a, b) {
            if (a in obj && !(b in obj)) {
              obj[b] = obj[a];
              delete obj[a];
            }
          };
          constraints = JSON.parse(JSON.stringify(constraints));
          remap(constraints.audio, 'autoGainControl', 'googAutoGainControl');
          remap(constraints.audio, 'noiseSuppression', 'googNoiseSuppression');
          constraints.audio = constraintsToChrome_(constraints.audio);
        }
        if (constraints && typeof constraints.video === 'object') {
          // Shim facingMode for mobile & surface pro.
          let face = constraints.video.facingMode;
          face = face && ((typeof face === 'object') ? face : {ideal: face});
          const getSupportedFacingModeLies = browserDetails.version < 66;

          if ((face && (face.exact === 'user' || face.exact === 'environment' ||
                        face.ideal === 'user' || face.ideal === 'environment')) &&
              !(navigator.mediaDevices.getSupportedConstraints &&
                navigator.mediaDevices.getSupportedConstraints().facingMode &&
                !getSupportedFacingModeLies)) {
            delete constraints.video.facingMode;
            let matches;
            if (face.exact === 'environment' || face.ideal === 'environment') {
              matches = ['back', 'rear'];
            } else if (face.exact === 'user' || face.ideal === 'user') {
              matches = ['front'];
            }
            if (matches) {
              // Look for matches in label, or use last cam for back (typical).
              return navigator.mediaDevices.enumerateDevices()
              .then(devices => {
                devices = devices.filter(d => d.kind === 'videoinput');
                let dev = devices.find(d => matches.some(match =>
                  d.label.toLowerCase().includes(match)));
                if (!dev && devices.length && matches.includes('back')) {
                  dev = devices[devices.length - 1]; // more likely the back cam
                }
                if (dev) {
                  constraints.video.deviceId = face.exact ? {exact: dev.deviceId} :
                                                            {ideal: dev.deviceId};
                }
                constraints.video = constraintsToChrome_(constraints.video);
                logging('chrome: ' + JSON.stringify(constraints));
                return func(constraints);
              });
            }
          }
          constraints.video = constraintsToChrome_(constraints.video);
        }
        logging('chrome: ' + JSON.stringify(constraints));
        return func(constraints);
      };

      const shimError_ = function(e) {
        if (browserDetails.version >= 64) {
          return e;
        }
        return {
          name: {
            PermissionDeniedError: 'NotAllowedError',
            PermissionDismissedError: 'NotAllowedError',
            InvalidStateError: 'NotAllowedError',
            DevicesNotFoundError: 'NotFoundError',
            ConstraintNotSatisfiedError: 'OverconstrainedError',
            TrackStartError: 'NotReadableError',
            MediaDeviceFailedDueToShutdown: 'NotAllowedError',
            MediaDeviceKillSwitchOn: 'NotAllowedError',
            TabCaptureError: 'AbortError',
            ScreenCaptureError: 'AbortError',
            DeviceCaptureError: 'AbortError'
          }[e.name] || e.name,
          message: e.message,
          constraint: e.constraint || e.constraintName,
          toString() {
            return this.name + (this.message && ': ') + this.message;
          }
        };
      };

      const getUserMedia_ = function(constraints, onSuccess, onError) {
        shimConstraints_(constraints, c => {
          navigator.webkitGetUserMedia(c, onSuccess, e => {
            if (onError) {
              onError(shimError_(e));
            }
          });
        });
      };
      navigator.getUserMedia = getUserMedia_.bind(navigator);

      // Even though Chrome 45 has navigator.mediaDevices and a getUserMedia
      // function which returns a Promise, it does not accept spec-style
      // constraints.
      if (navigator.mediaDevices.getUserMedia) {
        const origGetUserMedia = navigator.mediaDevices.getUserMedia.
            bind(navigator.mediaDevices);
        navigator.mediaDevices.getUserMedia = function(cs) {
          return shimConstraints_(cs, c => origGetUserMedia(c).then(stream => {
            if (c.audio && !stream.getAudioTracks().length ||
                c.video && !stream.getVideoTracks().length) {
              stream.getTracks().forEach(track => {
                track.stop();
              });
              throw new DOMException('', 'NotFoundError');
            }
            return stream;
          }, e => Promise.reject(shimError_(e))));
        };
      }
    }

    /*
     *  Copyright (c) 2018 The adapter.js project authors. All Rights Reserved.
     *
     *  Use of this source code is governed by a BSD-style license
     *  that can be found in the LICENSE file in the root of the source
     *  tree.
     */
    function shimGetDisplayMedia$2(window, getSourceId) {
      if (window.navigator.mediaDevices &&
        'getDisplayMedia' in window.navigator.mediaDevices) {
        return;
      }
      if (!(window.navigator.mediaDevices)) {
        return;
      }
      // getSourceId is a function that returns a promise resolving with
      // the sourceId of the screen/window/tab to be shared.
      if (typeof getSourceId !== 'function') {
        console.error('shimGetDisplayMedia: getSourceId argument is not ' +
            'a function');
        return;
      }
      window.navigator.mediaDevices.getDisplayMedia =
        function getDisplayMedia(constraints) {
          return getSourceId(constraints)
            .then(sourceId => {
              const widthSpecified = constraints.video && constraints.video.width;
              const heightSpecified = constraints.video &&
                constraints.video.height;
              const frameRateSpecified = constraints.video &&
                constraints.video.frameRate;
              constraints.video = {
                mandatory: {
                  chromeMediaSource: 'desktop',
                  chromeMediaSourceId: sourceId,
                  maxFrameRate: frameRateSpecified || 3
                }
              };
              if (widthSpecified) {
                constraints.video.mandatory.maxWidth = widthSpecified;
              }
              if (heightSpecified) {
                constraints.video.mandatory.maxHeight = heightSpecified;
              }
              return window.navigator.mediaDevices.getUserMedia(constraints);
            });
        };
    }

    /*
     *  Copyright (c) 2016 The WebRTC project authors. All Rights Reserved.
     *
     *  Use of this source code is governed by a BSD-style license
     *  that can be found in the LICENSE file in the root of the source
     *  tree.
     */

    function shimMediaStream(window) {
      window.MediaStream = window.MediaStream || window.webkitMediaStream;
    }

    function shimOnTrack$1(window) {
      if (typeof window === 'object' && window.RTCPeerConnection && !('ontrack' in
          window.RTCPeerConnection.prototype)) {
        Object.defineProperty(window.RTCPeerConnection.prototype, 'ontrack', {
          get() {
            return this._ontrack;
          },
          set(f) {
            if (this._ontrack) {
              this.removeEventListener('track', this._ontrack);
            }
            this.addEventListener('track', this._ontrack = f);
          },
          enumerable: true,
          configurable: true
        });
        const origSetRemoteDescription =
            window.RTCPeerConnection.prototype.setRemoteDescription;
        window.RTCPeerConnection.prototype.setRemoteDescription =
          function setRemoteDescription() {
            if (!this._ontrackpoly) {
              this._ontrackpoly = (e) => {
                // onaddstream does not fire when a track is added to an existing
                // stream. But stream.onaddtrack is implemented so we use that.
                e.stream.addEventListener('addtrack', te => {
                  let receiver;
                  if (window.RTCPeerConnection.prototype.getReceivers) {
                    receiver = this.getReceivers()
                      .find(r => r.track && r.track.id === te.track.id);
                  } else {
                    receiver = {track: te.track};
                  }

                  const event = new Event('track');
                  event.track = te.track;
                  event.receiver = receiver;
                  event.transceiver = {receiver};
                  event.streams = [e.stream];
                  this.dispatchEvent(event);
                });
                e.stream.getTracks().forEach(track => {
                  let receiver;
                  if (window.RTCPeerConnection.prototype.getReceivers) {
                    receiver = this.getReceivers()
                      .find(r => r.track && r.track.id === track.id);
                  } else {
                    receiver = {track};
                  }
                  const event = new Event('track');
                  event.track = track;
                  event.receiver = receiver;
                  event.transceiver = {receiver};
                  event.streams = [e.stream];
                  this.dispatchEvent(event);
                });
              };
              this.addEventListener('addstream', this._ontrackpoly);
            }
            return origSetRemoteDescription.apply(this, arguments);
          };
      } else {
        // even if RTCRtpTransceiver is in window, it is only used and
        // emitted in unified-plan. Unfortunately this means we need
        // to unconditionally wrap the event.
        wrapPeerConnectionEvent(window, 'track', e => {
          if (!e.transceiver) {
            Object.defineProperty(e, 'transceiver',
              {value: {receiver: e.receiver}});
          }
          return e;
        });
      }
    }

    function shimGetSendersWithDtmf(window) {
      // Overrides addTrack/removeTrack, depends on shimAddTrackRemoveTrack.
      if (typeof window === 'object' && window.RTCPeerConnection &&
          !('getSenders' in window.RTCPeerConnection.prototype) &&
          'createDTMFSender' in window.RTCPeerConnection.prototype) {
        const shimSenderWithDtmf = function(pc, track) {
          return {
            track,
            get dtmf() {
              if (this._dtmf === undefined) {
                if (track.kind === 'audio') {
                  this._dtmf = pc.createDTMFSender(track);
                } else {
                  this._dtmf = null;
                }
              }
              return this._dtmf;
            },
            _pc: pc
          };
        };

        // augment addTrack when getSenders is not available.
        if (!window.RTCPeerConnection.prototype.getSenders) {
          window.RTCPeerConnection.prototype.getSenders = function getSenders() {
            this._senders = this._senders || [];
            return this._senders.slice(); // return a copy of the internal state.
          };
          const origAddTrack = window.RTCPeerConnection.prototype.addTrack;
          window.RTCPeerConnection.prototype.addTrack =
            function addTrack(track, stream) {
              let sender = origAddTrack.apply(this, arguments);
              if (!sender) {
                sender = shimSenderWithDtmf(this, track);
                this._senders.push(sender);
              }
              return sender;
            };

          const origRemoveTrack = window.RTCPeerConnection.prototype.removeTrack;
          window.RTCPeerConnection.prototype.removeTrack =
            function removeTrack(sender) {
              origRemoveTrack.apply(this, arguments);
              const idx = this._senders.indexOf(sender);
              if (idx !== -1) {
                this._senders.splice(idx, 1);
              }
            };
        }
        const origAddStream = window.RTCPeerConnection.prototype.addStream;
        window.RTCPeerConnection.prototype.addStream = function addStream(stream) {
          this._senders = this._senders || [];
          origAddStream.apply(this, [stream]);
          stream.getTracks().forEach(track => {
            this._senders.push(shimSenderWithDtmf(this, track));
          });
        };

        const origRemoveStream = window.RTCPeerConnection.prototype.removeStream;
        window.RTCPeerConnection.prototype.removeStream =
          function removeStream(stream) {
            this._senders = this._senders || [];
            origRemoveStream.apply(this, [stream]);

            stream.getTracks().forEach(track => {
              const sender = this._senders.find(s => s.track === track);
              if (sender) { // remove sender
                this._senders.splice(this._senders.indexOf(sender), 1);
              }
            });
          };
      } else if (typeof window === 'object' && window.RTCPeerConnection &&
                 'getSenders' in window.RTCPeerConnection.prototype &&
                 'createDTMFSender' in window.RTCPeerConnection.prototype &&
                 window.RTCRtpSender &&
                 !('dtmf' in window.RTCRtpSender.prototype)) {
        const origGetSenders = window.RTCPeerConnection.prototype.getSenders;
        window.RTCPeerConnection.prototype.getSenders = function getSenders() {
          const senders = origGetSenders.apply(this, []);
          senders.forEach(sender => sender._pc = this);
          return senders;
        };

        Object.defineProperty(window.RTCRtpSender.prototype, 'dtmf', {
          get() {
            if (this._dtmf === undefined) {
              if (this.track.kind === 'audio') {
                this._dtmf = this._pc.createDTMFSender(this.track);
              } else {
                this._dtmf = null;
              }
            }
            return this._dtmf;
          }
        });
      }
    }

    function shimGetStats(window) {
      if (!window.RTCPeerConnection) {
        return;
      }

      const origGetStats = window.RTCPeerConnection.prototype.getStats;
      window.RTCPeerConnection.prototype.getStats = function getStats() {
        const [selector, onSucc, onErr] = arguments;

        // If selector is a function then we are in the old style stats so just
        // pass back the original getStats format to avoid breaking old users.
        if (arguments.length > 0 && typeof selector === 'function') {
          return origGetStats.apply(this, arguments);
        }

        // When spec-style getStats is supported, return those when called with
        // either no arguments or the selector argument is null.
        if (origGetStats.length === 0 && (arguments.length === 0 ||
            typeof selector !== 'function')) {
          return origGetStats.apply(this, []);
        }

        const fixChromeStats_ = function(response) {
          const standardReport = {};
          const reports = response.result();
          reports.forEach(report => {
            const standardStats = {
              id: report.id,
              timestamp: report.timestamp,
              type: {
                localcandidate: 'local-candidate',
                remotecandidate: 'remote-candidate'
              }[report.type] || report.type
            };
            report.names().forEach(name => {
              standardStats[name] = report.stat(name);
            });
            standardReport[standardStats.id] = standardStats;
          });

          return standardReport;
        };

        // shim getStats with maplike support
        const makeMapStats = function(stats) {
          return new Map(Object.keys(stats).map(key => [key, stats[key]]));
        };

        if (arguments.length >= 2) {
          const successCallbackWrapper_ = function(response) {
            onSucc(makeMapStats(fixChromeStats_(response)));
          };

          return origGetStats.apply(this, [successCallbackWrapper_,
            selector]);
        }

        // promise-support
        return new Promise((resolve, reject) => {
          origGetStats.apply(this, [
            function(response) {
              resolve(makeMapStats(fixChromeStats_(response)));
            }, reject]);
        }).then(onSucc, onErr);
      };
    }

    function shimSenderReceiverGetStats(window) {
      if (!(typeof window === 'object' && window.RTCPeerConnection &&
          window.RTCRtpSender && window.RTCRtpReceiver)) {
        return;
      }

      // shim sender stats.
      if (!('getStats' in window.RTCRtpSender.prototype)) {
        const origGetSenders = window.RTCPeerConnection.prototype.getSenders;
        if (origGetSenders) {
          window.RTCPeerConnection.prototype.getSenders = function getSenders() {
            const senders = origGetSenders.apply(this, []);
            senders.forEach(sender => sender._pc = this);
            return senders;
          };
        }

        const origAddTrack = window.RTCPeerConnection.prototype.addTrack;
        if (origAddTrack) {
          window.RTCPeerConnection.prototype.addTrack = function addTrack() {
            const sender = origAddTrack.apply(this, arguments);
            sender._pc = this;
            return sender;
          };
        }
        window.RTCRtpSender.prototype.getStats = function getStats() {
          const sender = this;
          return this._pc.getStats().then(result =>
            /* Note: this will include stats of all senders that
             *   send a track with the same id as sender.track as
             *   it is not possible to identify the RTCRtpSender.
             */
            filterStats(result, sender.track, true));
        };
      }

      // shim receiver stats.
      if (!('getStats' in window.RTCRtpReceiver.prototype)) {
        const origGetReceivers = window.RTCPeerConnection.prototype.getReceivers;
        if (origGetReceivers) {
          window.RTCPeerConnection.prototype.getReceivers =
            function getReceivers() {
              const receivers = origGetReceivers.apply(this, []);
              receivers.forEach(receiver => receiver._pc = this);
              return receivers;
            };
        }
        wrapPeerConnectionEvent(window, 'track', e => {
          e.receiver._pc = e.srcElement;
          return e;
        });
        window.RTCRtpReceiver.prototype.getStats = function getStats() {
          const receiver = this;
          return this._pc.getStats().then(result =>
            filterStats(result, receiver.track, false));
        };
      }

      if (!('getStats' in window.RTCRtpSender.prototype &&
          'getStats' in window.RTCRtpReceiver.prototype)) {
        return;
      }

      // shim RTCPeerConnection.getStats(track).
      const origGetStats = window.RTCPeerConnection.prototype.getStats;
      window.RTCPeerConnection.prototype.getStats = function getStats() {
        if (arguments.length > 0 &&
            arguments[0] instanceof window.MediaStreamTrack) {
          const track = arguments[0];
          let sender;
          let receiver;
          let err;
          this.getSenders().forEach(s => {
            if (s.track === track) {
              if (sender) {
                err = true;
              } else {
                sender = s;
              }
            }
          });
          this.getReceivers().forEach(r => {
            if (r.track === track) {
              if (receiver) {
                err = true;
              } else {
                receiver = r;
              }
            }
            return r.track === track;
          });
          if (err || (sender && receiver)) {
            return Promise.reject(new DOMException(
              'There are more than one sender or receiver for the track.',
              'InvalidAccessError'));
          } else if (sender) {
            return sender.getStats();
          } else if (receiver) {
            return receiver.getStats();
          }
          return Promise.reject(new DOMException(
            'There is no sender or receiver for the track.',
            'InvalidAccessError'));
        }
        return origGetStats.apply(this, arguments);
      };
    }

    function shimAddTrackRemoveTrackWithNative(window) {
      // shim addTrack/removeTrack with native variants in order to make
      // the interactions with legacy getLocalStreams behave as in other browsers.
      // Keeps a mapping stream.id => [stream, rtpsenders...]
      window.RTCPeerConnection.prototype.getLocalStreams =
        function getLocalStreams() {
          this._shimmedLocalStreams = this._shimmedLocalStreams || {};
          return Object.keys(this._shimmedLocalStreams)
            .map(streamId => this._shimmedLocalStreams[streamId][0]);
        };

      const origAddTrack = window.RTCPeerConnection.prototype.addTrack;
      window.RTCPeerConnection.prototype.addTrack =
        function addTrack(track, stream) {
          if (!stream) {
            return origAddTrack.apply(this, arguments);
          }
          this._shimmedLocalStreams = this._shimmedLocalStreams || {};

          const sender = origAddTrack.apply(this, arguments);
          if (!this._shimmedLocalStreams[stream.id]) {
            this._shimmedLocalStreams[stream.id] = [stream, sender];
          } else if (this._shimmedLocalStreams[stream.id].indexOf(sender) === -1) {
            this._shimmedLocalStreams[stream.id].push(sender);
          }
          return sender;
        };

      const origAddStream = window.RTCPeerConnection.prototype.addStream;
      window.RTCPeerConnection.prototype.addStream = function addStream(stream) {
        this._shimmedLocalStreams = this._shimmedLocalStreams || {};

        stream.getTracks().forEach(track => {
          const alreadyExists = this.getSenders().find(s => s.track === track);
          if (alreadyExists) {
            throw new DOMException('Track already exists.',
                'InvalidAccessError');
          }
        });
        const existingSenders = this.getSenders();
        origAddStream.apply(this, arguments);
        const newSenders = this.getSenders()
          .filter(newSender => existingSenders.indexOf(newSender) === -1);
        this._shimmedLocalStreams[stream.id] = [stream].concat(newSenders);
      };

      const origRemoveStream = window.RTCPeerConnection.prototype.removeStream;
      window.RTCPeerConnection.prototype.removeStream =
        function removeStream(stream) {
          this._shimmedLocalStreams = this._shimmedLocalStreams || {};
          delete this._shimmedLocalStreams[stream.id];
          return origRemoveStream.apply(this, arguments);
        };

      const origRemoveTrack = window.RTCPeerConnection.prototype.removeTrack;
      window.RTCPeerConnection.prototype.removeTrack =
        function removeTrack(sender) {
          this._shimmedLocalStreams = this._shimmedLocalStreams || {};
          if (sender) {
            Object.keys(this._shimmedLocalStreams).forEach(streamId => {
              const idx = this._shimmedLocalStreams[streamId].indexOf(sender);
              if (idx !== -1) {
                this._shimmedLocalStreams[streamId].splice(idx, 1);
              }
              if (this._shimmedLocalStreams[streamId].length === 1) {
                delete this._shimmedLocalStreams[streamId];
              }
            });
          }
          return origRemoveTrack.apply(this, arguments);
        };
    }

    function shimAddTrackRemoveTrack(window, browserDetails) {
      if (!window.RTCPeerConnection) {
        return;
      }
      // shim addTrack and removeTrack.
      if (window.RTCPeerConnection.prototype.addTrack &&
          browserDetails.version >= 65) {
        return shimAddTrackRemoveTrackWithNative(window);
      }

      // also shim pc.getLocalStreams when addTrack is shimmed
      // to return the original streams.
      const origGetLocalStreams = window.RTCPeerConnection.prototype
          .getLocalStreams;
      window.RTCPeerConnection.prototype.getLocalStreams =
        function getLocalStreams() {
          const nativeStreams = origGetLocalStreams.apply(this);
          this._reverseStreams = this._reverseStreams || {};
          return nativeStreams.map(stream => this._reverseStreams[stream.id]);
        };

      const origAddStream = window.RTCPeerConnection.prototype.addStream;
      window.RTCPeerConnection.prototype.addStream = function addStream(stream) {
        this._streams = this._streams || {};
        this._reverseStreams = this._reverseStreams || {};

        stream.getTracks().forEach(track => {
          const alreadyExists = this.getSenders().find(s => s.track === track);
          if (alreadyExists) {
            throw new DOMException('Track already exists.',
                'InvalidAccessError');
          }
        });
        // Add identity mapping for consistency with addTrack.
        // Unless this is being used with a stream from addTrack.
        if (!this._reverseStreams[stream.id]) {
          const newStream = new window.MediaStream(stream.getTracks());
          this._streams[stream.id] = newStream;
          this._reverseStreams[newStream.id] = stream;
          stream = newStream;
        }
        origAddStream.apply(this, [stream]);
      };

      const origRemoveStream = window.RTCPeerConnection.prototype.removeStream;
      window.RTCPeerConnection.prototype.removeStream =
        function removeStream(stream) {
          this._streams = this._streams || {};
          this._reverseStreams = this._reverseStreams || {};

          origRemoveStream.apply(this, [(this._streams[stream.id] || stream)]);
          delete this._reverseStreams[(this._streams[stream.id] ?
              this._streams[stream.id].id : stream.id)];
          delete this._streams[stream.id];
        };

      window.RTCPeerConnection.prototype.addTrack =
        function addTrack(track, stream) {
          if (this.signalingState === 'closed') {
            throw new DOMException(
              'The RTCPeerConnection\'s signalingState is \'closed\'.',
              'InvalidStateError');
          }
          const streams = [].slice.call(arguments, 1);
          if (streams.length !== 1 ||
              !streams[0].getTracks().find(t => t === track)) {
            // this is not fully correct but all we can manage without
            // [[associated MediaStreams]] internal slot.
            throw new DOMException(
              'The adapter.js addTrack polyfill only supports a single ' +
              ' stream which is associated with the specified track.',
              'NotSupportedError');
          }

          const alreadyExists = this.getSenders().find(s => s.track === track);
          if (alreadyExists) {
            throw new DOMException('Track already exists.',
                'InvalidAccessError');
          }

          this._streams = this._streams || {};
          this._reverseStreams = this._reverseStreams || {};
          const oldStream = this._streams[stream.id];
          if (oldStream) {
            // this is using odd Chrome behaviour, use with caution:
            // https://bugs.chromium.org/p/webrtc/issues/detail?id=7815
            // Note: we rely on the high-level addTrack/dtmf shim to
            // create the sender with a dtmf sender.
            oldStream.addTrack(track);

            // Trigger ONN async.
            Promise.resolve().then(() => {
              this.dispatchEvent(new Event('negotiationneeded'));
            });
          } else {
            const newStream = new window.MediaStream([track]);
            this._streams[stream.id] = newStream;
            this._reverseStreams[newStream.id] = stream;
            this.addStream(newStream);
          }
          return this.getSenders().find(s => s.track === track);
        };

      // replace the internal stream id with the external one and
      // vice versa.
      function replaceInternalStreamId(pc, description) {
        let sdp = description.sdp;
        Object.keys(pc._reverseStreams || []).forEach(internalId => {
          const externalStream = pc._reverseStreams[internalId];
          const internalStream = pc._streams[externalStream.id];
          sdp = sdp.replace(new RegExp(internalStream.id, 'g'),
              externalStream.id);
        });
        return new RTCSessionDescription({
          type: description.type,
          sdp
        });
      }
      function replaceExternalStreamId(pc, description) {
        let sdp = description.sdp;
        Object.keys(pc._reverseStreams || []).forEach(internalId => {
          const externalStream = pc._reverseStreams[internalId];
          const internalStream = pc._streams[externalStream.id];
          sdp = sdp.replace(new RegExp(externalStream.id, 'g'),
              internalStream.id);
        });
        return new RTCSessionDescription({
          type: description.type,
          sdp
        });
      }
      ['createOffer', 'createAnswer'].forEach(function(method) {
        const nativeMethod = window.RTCPeerConnection.prototype[method];
        const methodObj = {[method]() {
          const args = arguments;
          const isLegacyCall = arguments.length &&
              typeof arguments[0] === 'function';
          if (isLegacyCall) {
            return nativeMethod.apply(this, [
              (description) => {
                const desc = replaceInternalStreamId(this, description);
                args[0].apply(null, [desc]);
              },
              (err) => {
                if (args[1]) {
                  args[1].apply(null, err);
                }
              }, arguments[2]
            ]);
          }
          return nativeMethod.apply(this, arguments)
          .then(description => replaceInternalStreamId(this, description));
        }};
        window.RTCPeerConnection.prototype[method] = methodObj[method];
      });

      const origSetLocalDescription =
          window.RTCPeerConnection.prototype.setLocalDescription;
      window.RTCPeerConnection.prototype.setLocalDescription =
        function setLocalDescription() {
          if (!arguments.length || !arguments[0].type) {
            return origSetLocalDescription.apply(this, arguments);
          }
          arguments[0] = replaceExternalStreamId(this, arguments[0]);
          return origSetLocalDescription.apply(this, arguments);
        };

      // TODO: mangle getStats: https://w3c.github.io/webrtc-stats/#dom-rtcmediastreamstats-streamidentifier

      const origLocalDescription = Object.getOwnPropertyDescriptor(
          window.RTCPeerConnection.prototype, 'localDescription');
      Object.defineProperty(window.RTCPeerConnection.prototype,
          'localDescription', {
            get() {
              const description = origLocalDescription.get.apply(this);
              if (description.type === '') {
                return description;
              }
              return replaceInternalStreamId(this, description);
            }
          });

      window.RTCPeerConnection.prototype.removeTrack =
        function removeTrack(sender) {
          if (this.signalingState === 'closed') {
            throw new DOMException(
              'The RTCPeerConnection\'s signalingState is \'closed\'.',
              'InvalidStateError');
          }
          // We can not yet check for sender instanceof RTCRtpSender
          // since we shim RTPSender. So we check if sender._pc is set.
          if (!sender._pc) {
            throw new DOMException('Argument 1 of RTCPeerConnection.removeTrack ' +
                'does not implement interface RTCRtpSender.', 'TypeError');
          }
          const isLocal = sender._pc === this;
          if (!isLocal) {
            throw new DOMException('Sender was not created by this connection.',
                'InvalidAccessError');
          }

          // Search for the native stream the senders track belongs to.
          this._streams = this._streams || {};
          let stream;
          Object.keys(this._streams).forEach(streamid => {
            const hasTrack = this._streams[streamid].getTracks()
              .find(track => sender.track === track);
            if (hasTrack) {
              stream = this._streams[streamid];
            }
          });

          if (stream) {
            if (stream.getTracks().length === 1) {
              // if this is the last track of the stream, remove the stream. This
              // takes care of any shimmed _senders.
              this.removeStream(this._reverseStreams[stream.id]);
            } else {
              // relying on the same odd chrome behaviour as above.
              stream.removeTrack(sender.track);
            }
            this.dispatchEvent(new Event('negotiationneeded'));
          }
        };
    }

    function shimPeerConnection$2(window, browserDetails) {
      if (!window.RTCPeerConnection && window.webkitRTCPeerConnection) {
        // very basic support for old versions.
        window.RTCPeerConnection = window.webkitRTCPeerConnection;
      }
      if (!window.RTCPeerConnection) {
        return;
      }

      // shim implicit creation of RTCSessionDescription/RTCIceCandidate
      if (browserDetails.version < 53) {
        ['setLocalDescription', 'setRemoteDescription', 'addIceCandidate']
            .forEach(function(method) {
              const nativeMethod = window.RTCPeerConnection.prototype[method];
              const methodObj = {[method]() {
                arguments[0] = new ((method === 'addIceCandidate') ?
                    window.RTCIceCandidate :
                    window.RTCSessionDescription)(arguments[0]);
                return nativeMethod.apply(this, arguments);
              }};
              window.RTCPeerConnection.prototype[method] = methodObj[method];
            });
      }
    }

    // Attempt to fix ONN in plan-b mode.
    function fixNegotiationNeeded(window, browserDetails) {
      wrapPeerConnectionEvent(window, 'negotiationneeded', e => {
        const pc = e.target;
        if (browserDetails.version < 72 || (pc.getConfiguration &&
            pc.getConfiguration().sdpSemantics === 'plan-b')) {
          if (pc.signalingState !== 'stable') {
            return;
          }
        }
        return e;
      });
    }

    var chromeShim = /*#__PURE__*/Object.freeze({
        __proto__: null,
        shimMediaStream: shimMediaStream,
        shimOnTrack: shimOnTrack$1,
        shimGetSendersWithDtmf: shimGetSendersWithDtmf,
        shimGetStats: shimGetStats,
        shimSenderReceiverGetStats: shimSenderReceiverGetStats,
        shimAddTrackRemoveTrackWithNative: shimAddTrackRemoveTrackWithNative,
        shimAddTrackRemoveTrack: shimAddTrackRemoveTrack,
        shimPeerConnection: shimPeerConnection$2,
        fixNegotiationNeeded: fixNegotiationNeeded,
        shimGetUserMedia: shimGetUserMedia$3,
        shimGetDisplayMedia: shimGetDisplayMedia$2
    });

    /*
     *  Copyright (c) 2018 The WebRTC project authors. All Rights Reserved.
     *
     *  Use of this source code is governed by a BSD-style license
     *  that can be found in the LICENSE file in the root of the source
     *  tree.
     */
    // Edge does not like
    // 1) stun: filtered after 14393 unless ?transport=udp is present
    // 2) turn: that does not have all of turn:host:port?transport=udp
    // 3) turn: with ipv6 addresses
    // 4) turn: occurring muliple times
    function filterIceServers$1(iceServers, edgeVersion) {
      let hasTurn = false;
      iceServers = JSON.parse(JSON.stringify(iceServers));
      return iceServers.filter(server => {
        if (server && (server.urls || server.url)) {
          let urls = server.urls || server.url;
          if (server.url && !server.urls) {
            deprecated('RTCIceServer.url', 'RTCIceServer.urls');
          }
          const isString = typeof urls === 'string';
          if (isString) {
            urls = [urls];
          }
          urls = urls.filter(url => {
            // filter STUN unconditionally.
            if (url.indexOf('stun:') === 0) {
              return false;
            }

            const validTurn = url.startsWith('turn') &&
                !url.startsWith('turn:[') &&
                url.includes('transport=udp');
            if (validTurn && !hasTurn) {
              hasTurn = true;
              return true;
            }
            return validTurn && !hasTurn;
          });

          delete server.url;
          server.urls = isString ? urls[0] : urls;
          return !!urls.length;
        }
      });
    }

    function createCommonjsModule(fn) {
      var module = { exports: {} };
    	return fn(module, module.exports), module.exports;
    }

    /* eslint-env node */

    var sdp$1 = createCommonjsModule(function (module) {

    // SDP helpers.
    var SDPUtils = {};

    // Generate an alphanumeric identifier for cname or mids.
    // TODO: use UUIDs instead? https://gist.github.com/jed/982883
    SDPUtils.generateIdentifier = function() {
      return Math.random().toString(36).substr(2, 10);
    };

    // The RTCP CNAME used by all peerconnections from the same JS.
    SDPUtils.localCName = SDPUtils.generateIdentifier();

    // Splits SDP into lines, dealing with both CRLF and LF.
    SDPUtils.splitLines = function(blob) {
      return blob.trim().split('\n').map(function(line) {
        return line.trim();
      });
    };
    // Splits SDP into sessionpart and mediasections. Ensures CRLF.
    SDPUtils.splitSections = function(blob) {
      var parts = blob.split('\nm=');
      return parts.map(function(part, index) {
        return (index > 0 ? 'm=' + part : part).trim() + '\r\n';
      });
    };

    // returns the session description.
    SDPUtils.getDescription = function(blob) {
      var sections = SDPUtils.splitSections(blob);
      return sections && sections[0];
    };

    // returns the individual media sections.
    SDPUtils.getMediaSections = function(blob) {
      var sections = SDPUtils.splitSections(blob);
      sections.shift();
      return sections;
    };

    // Returns lines that start with a certain prefix.
    SDPUtils.matchPrefix = function(blob, prefix) {
      return SDPUtils.splitLines(blob).filter(function(line) {
        return line.indexOf(prefix) === 0;
      });
    };

    // Parses an ICE candidate line. Sample input:
    // candidate:702786350 2 udp 41819902 8.8.8.8 60769 typ relay raddr 8.8.8.8
    // rport 55996"
    SDPUtils.parseCandidate = function(line) {
      var parts;
      // Parse both variants.
      if (line.indexOf('a=candidate:') === 0) {
        parts = line.substring(12).split(' ');
      } else {
        parts = line.substring(10).split(' ');
      }

      var candidate = {
        foundation: parts[0],
        component: parseInt(parts[1], 10),
        protocol: parts[2].toLowerCase(),
        priority: parseInt(parts[3], 10),
        ip: parts[4],
        address: parts[4], // address is an alias for ip.
        port: parseInt(parts[5], 10),
        // skip parts[6] == 'typ'
        type: parts[7]
      };

      for (var i = 8; i < parts.length; i += 2) {
        switch (parts[i]) {
          case 'raddr':
            candidate.relatedAddress = parts[i + 1];
            break;
          case 'rport':
            candidate.relatedPort = parseInt(parts[i + 1], 10);
            break;
          case 'tcptype':
            candidate.tcpType = parts[i + 1];
            break;
          case 'ufrag':
            candidate.ufrag = parts[i + 1]; // for backward compability.
            candidate.usernameFragment = parts[i + 1];
            break;
          default: // extension handling, in particular ufrag
            candidate[parts[i]] = parts[i + 1];
            break;
        }
      }
      return candidate;
    };

    // Translates a candidate object into SDP candidate attribute.
    SDPUtils.writeCandidate = function(candidate) {
      var sdp = [];
      sdp.push(candidate.foundation);
      sdp.push(candidate.component);
      sdp.push(candidate.protocol.toUpperCase());
      sdp.push(candidate.priority);
      sdp.push(candidate.address || candidate.ip);
      sdp.push(candidate.port);

      var type = candidate.type;
      sdp.push('typ');
      sdp.push(type);
      if (type !== 'host' && candidate.relatedAddress &&
          candidate.relatedPort) {
        sdp.push('raddr');
        sdp.push(candidate.relatedAddress);
        sdp.push('rport');
        sdp.push(candidate.relatedPort);
      }
      if (candidate.tcpType && candidate.protocol.toLowerCase() === 'tcp') {
        sdp.push('tcptype');
        sdp.push(candidate.tcpType);
      }
      if (candidate.usernameFragment || candidate.ufrag) {
        sdp.push('ufrag');
        sdp.push(candidate.usernameFragment || candidate.ufrag);
      }
      return 'candidate:' + sdp.join(' ');
    };

    // Parses an ice-options line, returns an array of option tags.
    // a=ice-options:foo bar
    SDPUtils.parseIceOptions = function(line) {
      return line.substr(14).split(' ');
    };

    // Parses an rtpmap line, returns RTCRtpCoddecParameters. Sample input:
    // a=rtpmap:111 opus/48000/2
    SDPUtils.parseRtpMap = function(line) {
      var parts = line.substr(9).split(' ');
      var parsed = {
        payloadType: parseInt(parts.shift(), 10) // was: id
      };

      parts = parts[0].split('/');

      parsed.name = parts[0];
      parsed.clockRate = parseInt(parts[1], 10); // was: clockrate
      parsed.channels = parts.length === 3 ? parseInt(parts[2], 10) : 1;
      // legacy alias, got renamed back to channels in ORTC.
      parsed.numChannels = parsed.channels;
      return parsed;
    };

    // Generate an a=rtpmap line from RTCRtpCodecCapability or
    // RTCRtpCodecParameters.
    SDPUtils.writeRtpMap = function(codec) {
      var pt = codec.payloadType;
      if (codec.preferredPayloadType !== undefined) {
        pt = codec.preferredPayloadType;
      }
      var channels = codec.channels || codec.numChannels || 1;
      return 'a=rtpmap:' + pt + ' ' + codec.name + '/' + codec.clockRate +
          (channels !== 1 ? '/' + channels : '') + '\r\n';
    };

    // Parses an a=extmap line (headerextension from RFC 5285). Sample input:
    // a=extmap:2 urn:ietf:params:rtp-hdrext:toffset
    // a=extmap:2/sendonly urn:ietf:params:rtp-hdrext:toffset
    SDPUtils.parseExtmap = function(line) {
      var parts = line.substr(9).split(' ');
      return {
        id: parseInt(parts[0], 10),
        direction: parts[0].indexOf('/') > 0 ? parts[0].split('/')[1] : 'sendrecv',
        uri: parts[1]
      };
    };

    // Generates a=extmap line from RTCRtpHeaderExtensionParameters or
    // RTCRtpHeaderExtension.
    SDPUtils.writeExtmap = function(headerExtension) {
      return 'a=extmap:' + (headerExtension.id || headerExtension.preferredId) +
          (headerExtension.direction && headerExtension.direction !== 'sendrecv'
            ? '/' + headerExtension.direction
            : '') +
          ' ' + headerExtension.uri + '\r\n';
    };

    // Parses an ftmp line, returns dictionary. Sample input:
    // a=fmtp:96 vbr=on;cng=on
    // Also deals with vbr=on; cng=on
    SDPUtils.parseFmtp = function(line) {
      var parsed = {};
      var kv;
      var parts = line.substr(line.indexOf(' ') + 1).split(';');
      for (var j = 0; j < parts.length; j++) {
        kv = parts[j].trim().split('=');
        parsed[kv[0].trim()] = kv[1];
      }
      return parsed;
    };

    // Generates an a=ftmp line from RTCRtpCodecCapability or RTCRtpCodecParameters.
    SDPUtils.writeFmtp = function(codec) {
      var line = '';
      var pt = codec.payloadType;
      if (codec.preferredPayloadType !== undefined) {
        pt = codec.preferredPayloadType;
      }
      if (codec.parameters && Object.keys(codec.parameters).length) {
        var params = [];
        Object.keys(codec.parameters).forEach(function(param) {
          if (codec.parameters[param]) {
            params.push(param + '=' + codec.parameters[param]);
          } else {
            params.push(param);
          }
        });
        line += 'a=fmtp:' + pt + ' ' + params.join(';') + '\r\n';
      }
      return line;
    };

    // Parses an rtcp-fb line, returns RTCPRtcpFeedback object. Sample input:
    // a=rtcp-fb:98 nack rpsi
    SDPUtils.parseRtcpFb = function(line) {
      var parts = line.substr(line.indexOf(' ') + 1).split(' ');
      return {
        type: parts.shift(),
        parameter: parts.join(' ')
      };
    };
    // Generate a=rtcp-fb lines from RTCRtpCodecCapability or RTCRtpCodecParameters.
    SDPUtils.writeRtcpFb = function(codec) {
      var lines = '';
      var pt = codec.payloadType;
      if (codec.preferredPayloadType !== undefined) {
        pt = codec.preferredPayloadType;
      }
      if (codec.rtcpFeedback && codec.rtcpFeedback.length) {
        // FIXME: special handling for trr-int?
        codec.rtcpFeedback.forEach(function(fb) {
          lines += 'a=rtcp-fb:' + pt + ' ' + fb.type +
          (fb.parameter && fb.parameter.length ? ' ' + fb.parameter : '') +
              '\r\n';
        });
      }
      return lines;
    };

    // Parses an RFC 5576 ssrc media attribute. Sample input:
    // a=ssrc:3735928559 cname:something
    SDPUtils.parseSsrcMedia = function(line) {
      var sp = line.indexOf(' ');
      var parts = {
        ssrc: parseInt(line.substr(7, sp - 7), 10)
      };
      var colon = line.indexOf(':', sp);
      if (colon > -1) {
        parts.attribute = line.substr(sp + 1, colon - sp - 1);
        parts.value = line.substr(colon + 1);
      } else {
        parts.attribute = line.substr(sp + 1);
      }
      return parts;
    };

    SDPUtils.parseSsrcGroup = function(line) {
      var parts = line.substr(13).split(' ');
      return {
        semantics: parts.shift(),
        ssrcs: parts.map(function(ssrc) {
          return parseInt(ssrc, 10);
        })
      };
    };

    // Extracts the MID (RFC 5888) from a media section.
    // returns the MID or undefined if no mid line was found.
    SDPUtils.getMid = function(mediaSection) {
      var mid = SDPUtils.matchPrefix(mediaSection, 'a=mid:')[0];
      if (mid) {
        return mid.substr(6);
      }
    };

    SDPUtils.parseFingerprint = function(line) {
      var parts = line.substr(14).split(' ');
      return {
        algorithm: parts[0].toLowerCase(), // algorithm is case-sensitive in Edge.
        value: parts[1]
      };
    };

    // Extracts DTLS parameters from SDP media section or sessionpart.
    // FIXME: for consistency with other functions this should only
    //   get the fingerprint line as input. See also getIceParameters.
    SDPUtils.getDtlsParameters = function(mediaSection, sessionpart) {
      var lines = SDPUtils.matchPrefix(mediaSection + sessionpart,
        'a=fingerprint:');
      // Note: a=setup line is ignored since we use the 'auto' role.
      // Note2: 'algorithm' is not case sensitive except in Edge.
      return {
        role: 'auto',
        fingerprints: lines.map(SDPUtils.parseFingerprint)
      };
    };

    // Serializes DTLS parameters to SDP.
    SDPUtils.writeDtlsParameters = function(params, setupType) {
      var sdp = 'a=setup:' + setupType + '\r\n';
      params.fingerprints.forEach(function(fp) {
        sdp += 'a=fingerprint:' + fp.algorithm + ' ' + fp.value + '\r\n';
      });
      return sdp;
    };

    // Parses a=crypto lines into
    //   https://rawgit.com/aboba/edgertc/master/msortc-rs4.html#dictionary-rtcsrtpsdesparameters-members
    SDPUtils.parseCryptoLine = function(line) {
      var parts = line.substr(9).split(' ');
      return {
        tag: parseInt(parts[0], 10),
        cryptoSuite: parts[1],
        keyParams: parts[2],
        sessionParams: parts.slice(3),
      };
    };

    SDPUtils.writeCryptoLine = function(parameters) {
      return 'a=crypto:' + parameters.tag + ' ' +
        parameters.cryptoSuite + ' ' +
        (typeof parameters.keyParams === 'object'
          ? SDPUtils.writeCryptoKeyParams(parameters.keyParams)
          : parameters.keyParams) +
        (parameters.sessionParams ? ' ' + parameters.sessionParams.join(' ') : '') +
        '\r\n';
    };

    // Parses the crypto key parameters into
    //   https://rawgit.com/aboba/edgertc/master/msortc-rs4.html#rtcsrtpkeyparam*
    SDPUtils.parseCryptoKeyParams = function(keyParams) {
      if (keyParams.indexOf('inline:') !== 0) {
        return null;
      }
      var parts = keyParams.substr(7).split('|');
      return {
        keyMethod: 'inline',
        keySalt: parts[0],
        lifeTime: parts[1],
        mkiValue: parts[2] ? parts[2].split(':')[0] : undefined,
        mkiLength: parts[2] ? parts[2].split(':')[1] : undefined,
      };
    };

    SDPUtils.writeCryptoKeyParams = function(keyParams) {
      return keyParams.keyMethod + ':'
        + keyParams.keySalt +
        (keyParams.lifeTime ? '|' + keyParams.lifeTime : '') +
        (keyParams.mkiValue && keyParams.mkiLength
          ? '|' + keyParams.mkiValue + ':' + keyParams.mkiLength
          : '');
    };

    // Extracts all SDES paramters.
    SDPUtils.getCryptoParameters = function(mediaSection, sessionpart) {
      var lines = SDPUtils.matchPrefix(mediaSection + sessionpart,
        'a=crypto:');
      return lines.map(SDPUtils.parseCryptoLine);
    };

    // Parses ICE information from SDP media section or sessionpart.
    // FIXME: for consistency with other functions this should only
    //   get the ice-ufrag and ice-pwd lines as input.
    SDPUtils.getIceParameters = function(mediaSection, sessionpart) {
      var ufrag = SDPUtils.matchPrefix(mediaSection + sessionpart,
        'a=ice-ufrag:')[0];
      var pwd = SDPUtils.matchPrefix(mediaSection + sessionpart,
        'a=ice-pwd:')[0];
      if (!(ufrag && pwd)) {
        return null;
      }
      return {
        usernameFragment: ufrag.substr(12),
        password: pwd.substr(10),
      };
    };

    // Serializes ICE parameters to SDP.
    SDPUtils.writeIceParameters = function(params) {
      return 'a=ice-ufrag:' + params.usernameFragment + '\r\n' +
          'a=ice-pwd:' + params.password + '\r\n';
    };

    // Parses the SDP media section and returns RTCRtpParameters.
    SDPUtils.parseRtpParameters = function(mediaSection) {
      var description = {
        codecs: [],
        headerExtensions: [],
        fecMechanisms: [],
        rtcp: []
      };
      var lines = SDPUtils.splitLines(mediaSection);
      var mline = lines[0].split(' ');
      for (var i = 3; i < mline.length; i++) { // find all codecs from mline[3..]
        var pt = mline[i];
        var rtpmapline = SDPUtils.matchPrefix(
          mediaSection, 'a=rtpmap:' + pt + ' ')[0];
        if (rtpmapline) {
          var codec = SDPUtils.parseRtpMap(rtpmapline);
          var fmtps = SDPUtils.matchPrefix(
            mediaSection, 'a=fmtp:' + pt + ' ');
          // Only the first a=fmtp:<pt> is considered.
          codec.parameters = fmtps.length ? SDPUtils.parseFmtp(fmtps[0]) : {};
          codec.rtcpFeedback = SDPUtils.matchPrefix(
            mediaSection, 'a=rtcp-fb:' + pt + ' ')
            .map(SDPUtils.parseRtcpFb);
          description.codecs.push(codec);
          // parse FEC mechanisms from rtpmap lines.
          switch (codec.name.toUpperCase()) {
            case 'RED':
            case 'ULPFEC':
              description.fecMechanisms.push(codec.name.toUpperCase());
              break;
          }
        }
      }
      SDPUtils.matchPrefix(mediaSection, 'a=extmap:').forEach(function(line) {
        description.headerExtensions.push(SDPUtils.parseExtmap(line));
      });
      // FIXME: parse rtcp.
      return description;
    };

    // Generates parts of the SDP media section describing the capabilities /
    // parameters.
    SDPUtils.writeRtpDescription = function(kind, caps) {
      var sdp = '';

      // Build the mline.
      sdp += 'm=' + kind + ' ';
      sdp += caps.codecs.length > 0 ? '9' : '0'; // reject if no codecs.
      sdp += ' UDP/TLS/RTP/SAVPF ';
      sdp += caps.codecs.map(function(codec) {
        if (codec.preferredPayloadType !== undefined) {
          return codec.preferredPayloadType;
        }
        return codec.payloadType;
      }).join(' ') + '\r\n';

      sdp += 'c=IN IP4 0.0.0.0\r\n';
      sdp += 'a=rtcp:9 IN IP4 0.0.0.0\r\n';

      // Add a=rtpmap lines for each codec. Also fmtp and rtcp-fb.
      caps.codecs.forEach(function(codec) {
        sdp += SDPUtils.writeRtpMap(codec);
        sdp += SDPUtils.writeFmtp(codec);
        sdp += SDPUtils.writeRtcpFb(codec);
      });
      var maxptime = 0;
      caps.codecs.forEach(function(codec) {
        if (codec.maxptime > maxptime) {
          maxptime = codec.maxptime;
        }
      });
      if (maxptime > 0) {
        sdp += 'a=maxptime:' + maxptime + '\r\n';
      }
      sdp += 'a=rtcp-mux\r\n';

      if (caps.headerExtensions) {
        caps.headerExtensions.forEach(function(extension) {
          sdp += SDPUtils.writeExtmap(extension);
        });
      }
      // FIXME: write fecMechanisms.
      return sdp;
    };

    // Parses the SDP media section and returns an array of
    // RTCRtpEncodingParameters.
    SDPUtils.parseRtpEncodingParameters = function(mediaSection) {
      var encodingParameters = [];
      var description = SDPUtils.parseRtpParameters(mediaSection);
      var hasRed = description.fecMechanisms.indexOf('RED') !== -1;
      var hasUlpfec = description.fecMechanisms.indexOf('ULPFEC') !== -1;

      // filter a=ssrc:... cname:, ignore PlanB-msid
      var ssrcs = SDPUtils.matchPrefix(mediaSection, 'a=ssrc:')
        .map(function(line) {
          return SDPUtils.parseSsrcMedia(line);
        })
        .filter(function(parts) {
          return parts.attribute === 'cname';
        });
      var primarySsrc = ssrcs.length > 0 && ssrcs[0].ssrc;
      var secondarySsrc;

      var flows = SDPUtils.matchPrefix(mediaSection, 'a=ssrc-group:FID')
        .map(function(line) {
          var parts = line.substr(17).split(' ');
          return parts.map(function(part) {
            return parseInt(part, 10);
          });
        });
      if (flows.length > 0 && flows[0].length > 1 && flows[0][0] === primarySsrc) {
        secondarySsrc = flows[0][1];
      }

      description.codecs.forEach(function(codec) {
        if (codec.name.toUpperCase() === 'RTX' && codec.parameters.apt) {
          var encParam = {
            ssrc: primarySsrc,
            codecPayloadType: parseInt(codec.parameters.apt, 10)
          };
          if (primarySsrc && secondarySsrc) {
            encParam.rtx = {ssrc: secondarySsrc};
          }
          encodingParameters.push(encParam);
          if (hasRed) {
            encParam = JSON.parse(JSON.stringify(encParam));
            encParam.fec = {
              ssrc: primarySsrc,
              mechanism: hasUlpfec ? 'red+ulpfec' : 'red'
            };
            encodingParameters.push(encParam);
          }
        }
      });
      if (encodingParameters.length === 0 && primarySsrc) {
        encodingParameters.push({
          ssrc: primarySsrc
        });
      }

      // we support both b=AS and b=TIAS but interpret AS as TIAS.
      var bandwidth = SDPUtils.matchPrefix(mediaSection, 'b=');
      if (bandwidth.length) {
        if (bandwidth[0].indexOf('b=TIAS:') === 0) {
          bandwidth = parseInt(bandwidth[0].substr(7), 10);
        } else if (bandwidth[0].indexOf('b=AS:') === 0) {
          // use formula from JSEP to convert b=AS to TIAS value.
          bandwidth = parseInt(bandwidth[0].substr(5), 10) * 1000 * 0.95
              - (50 * 40 * 8);
        } else {
          bandwidth = undefined;
        }
        encodingParameters.forEach(function(params) {
          params.maxBitrate = bandwidth;
        });
      }
      return encodingParameters;
    };

    // parses http://draft.ortc.org/#rtcrtcpparameters*
    SDPUtils.parseRtcpParameters = function(mediaSection) {
      var rtcpParameters = {};

      // Gets the first SSRC. Note tha with RTX there might be multiple
      // SSRCs.
      var remoteSsrc = SDPUtils.matchPrefix(mediaSection, 'a=ssrc:')
        .map(function(line) {
          return SDPUtils.parseSsrcMedia(line);
        })
        .filter(function(obj) {
          return obj.attribute === 'cname';
        })[0];
      if (remoteSsrc) {
        rtcpParameters.cname = remoteSsrc.value;
        rtcpParameters.ssrc = remoteSsrc.ssrc;
      }

      // Edge uses the compound attribute instead of reducedSize
      // compound is !reducedSize
      var rsize = SDPUtils.matchPrefix(mediaSection, 'a=rtcp-rsize');
      rtcpParameters.reducedSize = rsize.length > 0;
      rtcpParameters.compound = rsize.length === 0;

      // parses the rtcp-mux attrіbute.
      // Note that Edge does not support unmuxed RTCP.
      var mux = SDPUtils.matchPrefix(mediaSection, 'a=rtcp-mux');
      rtcpParameters.mux = mux.length > 0;

      return rtcpParameters;
    };

    // parses either a=msid: or a=ssrc:... msid lines and returns
    // the id of the MediaStream and MediaStreamTrack.
    SDPUtils.parseMsid = function(mediaSection) {
      var parts;
      var spec = SDPUtils.matchPrefix(mediaSection, 'a=msid:');
      if (spec.length === 1) {
        parts = spec[0].substr(7).split(' ');
        return {stream: parts[0], track: parts[1]};
      }
      var planB = SDPUtils.matchPrefix(mediaSection, 'a=ssrc:')
        .map(function(line) {
          return SDPUtils.parseSsrcMedia(line);
        })
        .filter(function(msidParts) {
          return msidParts.attribute === 'msid';
        });
      if (planB.length > 0) {
        parts = planB[0].value.split(' ');
        return {stream: parts[0], track: parts[1]};
      }
    };

    // SCTP
    // parses draft-ietf-mmusic-sctp-sdp-26 first and falls back
    // to draft-ietf-mmusic-sctp-sdp-05
    SDPUtils.parseSctpDescription = function(mediaSection) {
      var mline = SDPUtils.parseMLine(mediaSection);
      var maxSizeLine = SDPUtils.matchPrefix(mediaSection, 'a=max-message-size:');
      var maxMessageSize;
      if (maxSizeLine.length > 0) {
        maxMessageSize = parseInt(maxSizeLine[0].substr(19), 10);
      }
      if (isNaN(maxMessageSize)) {
        maxMessageSize = 65536;
      }
      var sctpPort = SDPUtils.matchPrefix(mediaSection, 'a=sctp-port:');
      if (sctpPort.length > 0) {
        return {
          port: parseInt(sctpPort[0].substr(12), 10),
          protocol: mline.fmt,
          maxMessageSize: maxMessageSize
        };
      }
      var sctpMapLines = SDPUtils.matchPrefix(mediaSection, 'a=sctpmap:');
      if (sctpMapLines.length > 0) {
        var parts = SDPUtils.matchPrefix(mediaSection, 'a=sctpmap:')[0]
          .substr(10)
          .split(' ');
        return {
          port: parseInt(parts[0], 10),
          protocol: parts[1],
          maxMessageSize: maxMessageSize
        };
      }
    };

    // SCTP
    // outputs the draft-ietf-mmusic-sctp-sdp-26 version that all browsers
    // support by now receiving in this format, unless we originally parsed
    // as the draft-ietf-mmusic-sctp-sdp-05 format (indicated by the m-line
    // protocol of DTLS/SCTP -- without UDP/ or TCP/)
    SDPUtils.writeSctpDescription = function(media, sctp) {
      var output = [];
      if (media.protocol !== 'DTLS/SCTP') {
        output = [
          'm=' + media.kind + ' 9 ' + media.protocol + ' ' + sctp.protocol + '\r\n',
          'c=IN IP4 0.0.0.0\r\n',
          'a=sctp-port:' + sctp.port + '\r\n'
        ];
      } else {
        output = [
          'm=' + media.kind + ' 9 ' + media.protocol + ' ' + sctp.port + '\r\n',
          'c=IN IP4 0.0.0.0\r\n',
          'a=sctpmap:' + sctp.port + ' ' + sctp.protocol + ' 65535\r\n'
        ];
      }
      if (sctp.maxMessageSize !== undefined) {
        output.push('a=max-message-size:' + sctp.maxMessageSize + '\r\n');
      }
      return output.join('');
    };

    // Generate a session ID for SDP.
    // https://tools.ietf.org/html/draft-ietf-rtcweb-jsep-20#section-5.2.1
    // recommends using a cryptographically random +ve 64-bit value
    // but right now this should be acceptable and within the right range
    SDPUtils.generateSessionId = function() {
      return Math.random().toString().substr(2, 21);
    };

    // Write boilder plate for start of SDP
    // sessId argument is optional - if not supplied it will
    // be generated randomly
    // sessVersion is optional and defaults to 2
    // sessUser is optional and defaults to 'thisisadapterortc'
    SDPUtils.writeSessionBoilerplate = function(sessId, sessVer, sessUser) {
      var sessionId;
      var version = sessVer !== undefined ? sessVer : 2;
      if (sessId) {
        sessionId = sessId;
      } else {
        sessionId = SDPUtils.generateSessionId();
      }
      var user = sessUser || 'thisisadapterortc';
      // FIXME: sess-id should be an NTP timestamp.
      return 'v=0\r\n' +
          'o=' + user + ' ' + sessionId + ' ' + version +
            ' IN IP4 127.0.0.1\r\n' +
          's=-\r\n' +
          't=0 0\r\n';
    };

    SDPUtils.writeMediaSection = function(transceiver, caps, type, stream) {
      var sdp = SDPUtils.writeRtpDescription(transceiver.kind, caps);

      // Map ICE parameters (ufrag, pwd) to SDP.
      sdp += SDPUtils.writeIceParameters(
        transceiver.iceGatherer.getLocalParameters());

      // Map DTLS parameters to SDP.
      sdp += SDPUtils.writeDtlsParameters(
        transceiver.dtlsTransport.getLocalParameters(),
        type === 'offer' ? 'actpass' : 'active');

      sdp += 'a=mid:' + transceiver.mid + '\r\n';

      if (transceiver.direction) {
        sdp += 'a=' + transceiver.direction + '\r\n';
      } else if (transceiver.rtpSender && transceiver.rtpReceiver) {
        sdp += 'a=sendrecv\r\n';
      } else if (transceiver.rtpSender) {
        sdp += 'a=sendonly\r\n';
      } else if (transceiver.rtpReceiver) {
        sdp += 'a=recvonly\r\n';
      } else {
        sdp += 'a=inactive\r\n';
      }

      if (transceiver.rtpSender) {
        // spec.
        var msid = 'msid:' + stream.id + ' ' +
            transceiver.rtpSender.track.id + '\r\n';
        sdp += 'a=' + msid;

        // for Chrome.
        sdp += 'a=ssrc:' + transceiver.sendEncodingParameters[0].ssrc +
            ' ' + msid;
        if (transceiver.sendEncodingParameters[0].rtx) {
          sdp += 'a=ssrc:' + transceiver.sendEncodingParameters[0].rtx.ssrc +
              ' ' + msid;
          sdp += 'a=ssrc-group:FID ' +
              transceiver.sendEncodingParameters[0].ssrc + ' ' +
              transceiver.sendEncodingParameters[0].rtx.ssrc +
              '\r\n';
        }
      }
      // FIXME: this should be written by writeRtpDescription.
      sdp += 'a=ssrc:' + transceiver.sendEncodingParameters[0].ssrc +
          ' cname:' + SDPUtils.localCName + '\r\n';
      if (transceiver.rtpSender && transceiver.sendEncodingParameters[0].rtx) {
        sdp += 'a=ssrc:' + transceiver.sendEncodingParameters[0].rtx.ssrc +
            ' cname:' + SDPUtils.localCName + '\r\n';
      }
      return sdp;
    };

    // Gets the direction from the mediaSection or the sessionpart.
    SDPUtils.getDirection = function(mediaSection, sessionpart) {
      // Look for sendrecv, sendonly, recvonly, inactive, default to sendrecv.
      var lines = SDPUtils.splitLines(mediaSection);
      for (var i = 0; i < lines.length; i++) {
        switch (lines[i]) {
          case 'a=sendrecv':
          case 'a=sendonly':
          case 'a=recvonly':
          case 'a=inactive':
            return lines[i].substr(2);
            // FIXME: What should happen here?
        }
      }
      if (sessionpart) {
        return SDPUtils.getDirection(sessionpart);
      }
      return 'sendrecv';
    };

    SDPUtils.getKind = function(mediaSection) {
      var lines = SDPUtils.splitLines(mediaSection);
      var mline = lines[0].split(' ');
      return mline[0].substr(2);
    };

    SDPUtils.isRejected = function(mediaSection) {
      return mediaSection.split(' ', 2)[1] === '0';
    };

    SDPUtils.parseMLine = function(mediaSection) {
      var lines = SDPUtils.splitLines(mediaSection);
      var parts = lines[0].substr(2).split(' ');
      return {
        kind: parts[0],
        port: parseInt(parts[1], 10),
        protocol: parts[2],
        fmt: parts.slice(3).join(' ')
      };
    };

    SDPUtils.parseOLine = function(mediaSection) {
      var line = SDPUtils.matchPrefix(mediaSection, 'o=')[0];
      var parts = line.substr(2).split(' ');
      return {
        username: parts[0],
        sessionId: parts[1],
        sessionVersion: parseInt(parts[2], 10),
        netType: parts[3],
        addressType: parts[4],
        address: parts[5]
      };
    };

    // a very naive interpretation of a valid SDP.
    SDPUtils.isValidSDP = function(blob) {
      if (typeof blob !== 'string' || blob.length === 0) {
        return false;
      }
      var lines = SDPUtils.splitLines(blob);
      for (var i = 0; i < lines.length; i++) {
        if (lines[i].length < 2 || lines[i].charAt(1) !== '=') {
          return false;
        }
        // TODO: check the modifier a bit more.
      }
      return true;
    };

    // Expose public methods.
    {
      module.exports = SDPUtils;
    }
    });

    /*
     *  Copyright (c) 2017 The WebRTC project authors. All Rights Reserved.
     *
     *  Use of this source code is governed by a BSD-style license
     *  that can be found in the LICENSE file in the root of the source
     *  tree.
     */



    function fixStatsType(stat) {
      return {
        inboundrtp: 'inbound-rtp',
        outboundrtp: 'outbound-rtp',
        candidatepair: 'candidate-pair',
        localcandidate: 'local-candidate',
        remotecandidate: 'remote-candidate'
      }[stat.type] || stat.type;
    }

    function writeMediaSection(transceiver, caps, type, stream, dtlsRole) {
      var sdp = sdp$1.writeRtpDescription(transceiver.kind, caps);

      // Map ICE parameters (ufrag, pwd) to SDP.
      sdp += sdp$1.writeIceParameters(
          transceiver.iceGatherer.getLocalParameters());

      // Map DTLS parameters to SDP.
      sdp += sdp$1.writeDtlsParameters(
          transceiver.dtlsTransport.getLocalParameters(),
          type === 'offer' ? 'actpass' : dtlsRole || 'active');

      sdp += 'a=mid:' + transceiver.mid + '\r\n';

      if (transceiver.rtpSender && transceiver.rtpReceiver) {
        sdp += 'a=sendrecv\r\n';
      } else if (transceiver.rtpSender) {
        sdp += 'a=sendonly\r\n';
      } else if (transceiver.rtpReceiver) {
        sdp += 'a=recvonly\r\n';
      } else {
        sdp += 'a=inactive\r\n';
      }

      if (transceiver.rtpSender) {
        var trackId = transceiver.rtpSender._initialTrackId ||
            transceiver.rtpSender.track.id;
        transceiver.rtpSender._initialTrackId = trackId;
        // spec.
        var msid = 'msid:' + (stream ? stream.id : '-') + ' ' +
            trackId + '\r\n';
        sdp += 'a=' + msid;
        // for Chrome. Legacy should no longer be required.
        sdp += 'a=ssrc:' + transceiver.sendEncodingParameters[0].ssrc +
            ' ' + msid;

        // RTX
        if (transceiver.sendEncodingParameters[0].rtx) {
          sdp += 'a=ssrc:' + transceiver.sendEncodingParameters[0].rtx.ssrc +
              ' ' + msid;
          sdp += 'a=ssrc-group:FID ' +
              transceiver.sendEncodingParameters[0].ssrc + ' ' +
              transceiver.sendEncodingParameters[0].rtx.ssrc +
              '\r\n';
        }
      }
      // FIXME: this should be written by writeRtpDescription.
      sdp += 'a=ssrc:' + transceiver.sendEncodingParameters[0].ssrc +
          ' cname:' + sdp$1.localCName + '\r\n';
      if (transceiver.rtpSender && transceiver.sendEncodingParameters[0].rtx) {
        sdp += 'a=ssrc:' + transceiver.sendEncodingParameters[0].rtx.ssrc +
            ' cname:' + sdp$1.localCName + '\r\n';
      }
      return sdp;
    }

    // Edge does not like
    // 1) stun: filtered after 14393 unless ?transport=udp is present
    // 2) turn: that does not have all of turn:host:port?transport=udp
    // 3) turn: with ipv6 addresses
    // 4) turn: occurring muliple times
    function filterIceServers(iceServers, edgeVersion) {
      var hasTurn = false;
      iceServers = JSON.parse(JSON.stringify(iceServers));
      return iceServers.filter(function(server) {
        if (server && (server.urls || server.url)) {
          var urls = server.urls || server.url;
          if (server.url && !server.urls) {
            console.warn('RTCIceServer.url is deprecated! Use urls instead.');
          }
          var isString = typeof urls === 'string';
          if (isString) {
            urls = [urls];
          }
          urls = urls.filter(function(url) {
            var validTurn = url.indexOf('turn:') === 0 &&
                url.indexOf('transport=udp') !== -1 &&
                url.indexOf('turn:[') === -1 &&
                !hasTurn;

            if (validTurn) {
              hasTurn = true;
              return true;
            }
            return url.indexOf('stun:') === 0 && edgeVersion >= 14393 &&
                url.indexOf('?transport=udp') === -1;
          });

          delete server.url;
          server.urls = isString ? urls[0] : urls;
          return !!urls.length;
        }
      });
    }

    // Determines the intersection of local and remote capabilities.
    function getCommonCapabilities(localCapabilities, remoteCapabilities) {
      var commonCapabilities = {
        codecs: [],
        headerExtensions: [],
        fecMechanisms: []
      };

      var findCodecByPayloadType = function(pt, codecs) {
        pt = parseInt(pt, 10);
        for (var i = 0; i < codecs.length; i++) {
          if (codecs[i].payloadType === pt ||
              codecs[i].preferredPayloadType === pt) {
            return codecs[i];
          }
        }
      };

      var rtxCapabilityMatches = function(lRtx, rRtx, lCodecs, rCodecs) {
        var lCodec = findCodecByPayloadType(lRtx.parameters.apt, lCodecs);
        var rCodec = findCodecByPayloadType(rRtx.parameters.apt, rCodecs);
        return lCodec && rCodec &&
            lCodec.name.toLowerCase() === rCodec.name.toLowerCase();
      };

      localCapabilities.codecs.forEach(function(lCodec) {
        for (var i = 0; i < remoteCapabilities.codecs.length; i++) {
          var rCodec = remoteCapabilities.codecs[i];
          if (lCodec.name.toLowerCase() === rCodec.name.toLowerCase() &&
              lCodec.clockRate === rCodec.clockRate) {
            if (lCodec.name.toLowerCase() === 'rtx' &&
                lCodec.parameters && rCodec.parameters.apt) {
              // for RTX we need to find the local rtx that has a apt
              // which points to the same local codec as the remote one.
              if (!rtxCapabilityMatches(lCodec, rCodec,
                  localCapabilities.codecs, remoteCapabilities.codecs)) {
                continue;
              }
            }
            rCodec = JSON.parse(JSON.stringify(rCodec)); // deepcopy
            // number of channels is the highest common number of channels
            rCodec.numChannels = Math.min(lCodec.numChannels,
                rCodec.numChannels);
            // push rCodec so we reply with offerer payload type
            commonCapabilities.codecs.push(rCodec);

            // determine common feedback mechanisms
            rCodec.rtcpFeedback = rCodec.rtcpFeedback.filter(function(fb) {
              for (var j = 0; j < lCodec.rtcpFeedback.length; j++) {
                if (lCodec.rtcpFeedback[j].type === fb.type &&
                    lCodec.rtcpFeedback[j].parameter === fb.parameter) {
                  return true;
                }
              }
              return false;
            });
            // FIXME: also need to determine .parameters
            //  see https://github.com/openpeer/ortc/issues/569
            break;
          }
        }
      });

      localCapabilities.headerExtensions.forEach(function(lHeaderExtension) {
        for (var i = 0; i < remoteCapabilities.headerExtensions.length;
             i++) {
          var rHeaderExtension = remoteCapabilities.headerExtensions[i];
          if (lHeaderExtension.uri === rHeaderExtension.uri) {
            commonCapabilities.headerExtensions.push(rHeaderExtension);
            break;
          }
        }
      });

      // FIXME: fecMechanisms
      return commonCapabilities;
    }

    // is action=setLocalDescription with type allowed in signalingState
    function isActionAllowedInSignalingState(action, type, signalingState) {
      return {
        offer: {
          setLocalDescription: ['stable', 'have-local-offer'],
          setRemoteDescription: ['stable', 'have-remote-offer']
        },
        answer: {
          setLocalDescription: ['have-remote-offer', 'have-local-pranswer'],
          setRemoteDescription: ['have-local-offer', 'have-remote-pranswer']
        }
      }[type][action].indexOf(signalingState) !== -1;
    }

    function maybeAddCandidate(iceTransport, candidate) {
      // Edge's internal representation adds some fields therefore
      // not all fieldѕ are taken into account.
      var alreadyAdded = iceTransport.getRemoteCandidates()
          .find(function(remoteCandidate) {
            return candidate.foundation === remoteCandidate.foundation &&
                candidate.ip === remoteCandidate.ip &&
                candidate.port === remoteCandidate.port &&
                candidate.priority === remoteCandidate.priority &&
                candidate.protocol === remoteCandidate.protocol &&
                candidate.type === remoteCandidate.type;
          });
      if (!alreadyAdded) {
        iceTransport.addRemoteCandidate(candidate);
      }
      return !alreadyAdded;
    }


    function makeError(name, description) {
      var e = new Error(description);
      e.name = name;
      // legacy error codes from https://heycam.github.io/webidl/#idl-DOMException-error-names
      e.code = {
        NotSupportedError: 9,
        InvalidStateError: 11,
        InvalidAccessError: 15,
        TypeError: undefined,
        OperationError: undefined
      }[name];
      return e;
    }

    var rtcpeerconnection = function(window, edgeVersion) {
      // https://w3c.github.io/mediacapture-main/#mediastream
      // Helper function to add the track to the stream and
      // dispatch the event ourselves.
      function addTrackToStreamAndFireEvent(track, stream) {
        stream.addTrack(track);
        stream.dispatchEvent(new window.MediaStreamTrackEvent('addtrack',
            {track: track}));
      }

      function removeTrackFromStreamAndFireEvent(track, stream) {
        stream.removeTrack(track);
        stream.dispatchEvent(new window.MediaStreamTrackEvent('removetrack',
            {track: track}));
      }

      function fireAddTrack(pc, track, receiver, streams) {
        var trackEvent = new Event('track');
        trackEvent.track = track;
        trackEvent.receiver = receiver;
        trackEvent.transceiver = {receiver: receiver};
        trackEvent.streams = streams;
        window.setTimeout(function() {
          pc._dispatchEvent('track', trackEvent);
        });
      }

      var RTCPeerConnection = function(config) {
        var pc = this;

        var _eventTarget = document.createDocumentFragment();
        ['addEventListener', 'removeEventListener', 'dispatchEvent']
            .forEach(function(method) {
              pc[method] = _eventTarget[method].bind(_eventTarget);
            });

        this.canTrickleIceCandidates = null;

        this.needNegotiation = false;

        this.localStreams = [];
        this.remoteStreams = [];

        this._localDescription = null;
        this._remoteDescription = null;

        this.signalingState = 'stable';
        this.iceConnectionState = 'new';
        this.connectionState = 'new';
        this.iceGatheringState = 'new';

        config = JSON.parse(JSON.stringify(config || {}));

        this.usingBundle = config.bundlePolicy === 'max-bundle';
        if (config.rtcpMuxPolicy === 'negotiate') {
          throw(makeError('NotSupportedError',
              'rtcpMuxPolicy \'negotiate\' is not supported'));
        } else if (!config.rtcpMuxPolicy) {
          config.rtcpMuxPolicy = 'require';
        }

        switch (config.iceTransportPolicy) {
          case 'all':
          case 'relay':
            break;
          default:
            config.iceTransportPolicy = 'all';
            break;
        }

        switch (config.bundlePolicy) {
          case 'balanced':
          case 'max-compat':
          case 'max-bundle':
            break;
          default:
            config.bundlePolicy = 'balanced';
            break;
        }

        config.iceServers = filterIceServers(config.iceServers || [], edgeVersion);

        this._iceGatherers = [];
        if (config.iceCandidatePoolSize) {
          for (var i = config.iceCandidatePoolSize; i > 0; i--) {
            this._iceGatherers.push(new window.RTCIceGatherer({
              iceServers: config.iceServers,
              gatherPolicy: config.iceTransportPolicy
            }));
          }
        } else {
          config.iceCandidatePoolSize = 0;
        }

        this._config = config;

        // per-track iceGathers, iceTransports, dtlsTransports, rtpSenders, ...
        // everything that is needed to describe a SDP m-line.
        this.transceivers = [];

        this._sdpSessionId = sdp$1.generateSessionId();
        this._sdpSessionVersion = 0;

        this._dtlsRole = undefined; // role for a=setup to use in answers.

        this._isClosed = false;
      };

      Object.defineProperty(RTCPeerConnection.prototype, 'localDescription', {
        configurable: true,
        get: function() {
          return this._localDescription;
        }
      });
      Object.defineProperty(RTCPeerConnection.prototype, 'remoteDescription', {
        configurable: true,
        get: function() {
          return this._remoteDescription;
        }
      });

      // set up event handlers on prototype
      RTCPeerConnection.prototype.onicecandidate = null;
      RTCPeerConnection.prototype.onaddstream = null;
      RTCPeerConnection.prototype.ontrack = null;
      RTCPeerConnection.prototype.onremovestream = null;
      RTCPeerConnection.prototype.onsignalingstatechange = null;
      RTCPeerConnection.prototype.oniceconnectionstatechange = null;
      RTCPeerConnection.prototype.onconnectionstatechange = null;
      RTCPeerConnection.prototype.onicegatheringstatechange = null;
      RTCPeerConnection.prototype.onnegotiationneeded = null;
      RTCPeerConnection.prototype.ondatachannel = null;

      RTCPeerConnection.prototype._dispatchEvent = function(name, event) {
        if (this._isClosed) {
          return;
        }
        this.dispatchEvent(event);
        if (typeof this['on' + name] === 'function') {
          this['on' + name](event);
        }
      };

      RTCPeerConnection.prototype._emitGatheringStateChange = function() {
        var event = new Event('icegatheringstatechange');
        this._dispatchEvent('icegatheringstatechange', event);
      };

      RTCPeerConnection.prototype.getConfiguration = function() {
        return this._config;
      };

      RTCPeerConnection.prototype.getLocalStreams = function() {
        return this.localStreams;
      };

      RTCPeerConnection.prototype.getRemoteStreams = function() {
        return this.remoteStreams;
      };

      // internal helper to create a transceiver object.
      // (which is not yet the same as the WebRTC 1.0 transceiver)
      RTCPeerConnection.prototype._createTransceiver = function(kind, doNotAdd) {
        var hasBundleTransport = this.transceivers.length > 0;
        var transceiver = {
          track: null,
          iceGatherer: null,
          iceTransport: null,
          dtlsTransport: null,
          localCapabilities: null,
          remoteCapabilities: null,
          rtpSender: null,
          rtpReceiver: null,
          kind: kind,
          mid: null,
          sendEncodingParameters: null,
          recvEncodingParameters: null,
          stream: null,
          associatedRemoteMediaStreams: [],
          wantReceive: true
        };
        if (this.usingBundle && hasBundleTransport) {
          transceiver.iceTransport = this.transceivers[0].iceTransport;
          transceiver.dtlsTransport = this.transceivers[0].dtlsTransport;
        } else {
          var transports = this._createIceAndDtlsTransports();
          transceiver.iceTransport = transports.iceTransport;
          transceiver.dtlsTransport = transports.dtlsTransport;
        }
        if (!doNotAdd) {
          this.transceivers.push(transceiver);
        }
        return transceiver;
      };

      RTCPeerConnection.prototype.addTrack = function(track, stream) {
        if (this._isClosed) {
          throw makeError('InvalidStateError',
              'Attempted to call addTrack on a closed peerconnection.');
        }

        var alreadyExists = this.transceivers.find(function(s) {
          return s.track === track;
        });

        if (alreadyExists) {
          throw makeError('InvalidAccessError', 'Track already exists.');
        }

        var transceiver;
        for (var i = 0; i < this.transceivers.length; i++) {
          if (!this.transceivers[i].track &&
              this.transceivers[i].kind === track.kind) {
            transceiver = this.transceivers[i];
          }
        }
        if (!transceiver) {
          transceiver = this._createTransceiver(track.kind);
        }

        this._maybeFireNegotiationNeeded();

        if (this.localStreams.indexOf(stream) === -1) {
          this.localStreams.push(stream);
        }

        transceiver.track = track;
        transceiver.stream = stream;
        transceiver.rtpSender = new window.RTCRtpSender(track,
            transceiver.dtlsTransport);
        return transceiver.rtpSender;
      };

      RTCPeerConnection.prototype.addStream = function(stream) {
        var pc = this;
        if (edgeVersion >= 15025) {
          stream.getTracks().forEach(function(track) {
            pc.addTrack(track, stream);
          });
        } else {
          // Clone is necessary for local demos mostly, attaching directly
          // to two different senders does not work (build 10547).
          // Fixed in 15025 (or earlier)
          var clonedStream = stream.clone();
          stream.getTracks().forEach(function(track, idx) {
            var clonedTrack = clonedStream.getTracks()[idx];
            track.addEventListener('enabled', function(event) {
              clonedTrack.enabled = event.enabled;
            });
          });
          clonedStream.getTracks().forEach(function(track) {
            pc.addTrack(track, clonedStream);
          });
        }
      };

      RTCPeerConnection.prototype.removeTrack = function(sender) {
        if (this._isClosed) {
          throw makeError('InvalidStateError',
              'Attempted to call removeTrack on a closed peerconnection.');
        }

        if (!(sender instanceof window.RTCRtpSender)) {
          throw new TypeError('Argument 1 of RTCPeerConnection.removeTrack ' +
              'does not implement interface RTCRtpSender.');
        }

        var transceiver = this.transceivers.find(function(t) {
          return t.rtpSender === sender;
        });

        if (!transceiver) {
          throw makeError('InvalidAccessError',
              'Sender was not created by this connection.');
        }
        var stream = transceiver.stream;

        transceiver.rtpSender.stop();
        transceiver.rtpSender = null;
        transceiver.track = null;
        transceiver.stream = null;

        // remove the stream from the set of local streams
        var localStreams = this.transceivers.map(function(t) {
          return t.stream;
        });
        if (localStreams.indexOf(stream) === -1 &&
            this.localStreams.indexOf(stream) > -1) {
          this.localStreams.splice(this.localStreams.indexOf(stream), 1);
        }

        this._maybeFireNegotiationNeeded();
      };

      RTCPeerConnection.prototype.removeStream = function(stream) {
        var pc = this;
        stream.getTracks().forEach(function(track) {
          var sender = pc.getSenders().find(function(s) {
            return s.track === track;
          });
          if (sender) {
            pc.removeTrack(sender);
          }
        });
      };

      RTCPeerConnection.prototype.getSenders = function() {
        return this.transceivers.filter(function(transceiver) {
          return !!transceiver.rtpSender;
        })
        .map(function(transceiver) {
          return transceiver.rtpSender;
        });
      };

      RTCPeerConnection.prototype.getReceivers = function() {
        return this.transceivers.filter(function(transceiver) {
          return !!transceiver.rtpReceiver;
        })
        .map(function(transceiver) {
          return transceiver.rtpReceiver;
        });
      };


      RTCPeerConnection.prototype._createIceGatherer = function(sdpMLineIndex,
          usingBundle) {
        var pc = this;
        if (usingBundle && sdpMLineIndex > 0) {
          return this.transceivers[0].iceGatherer;
        } else if (this._iceGatherers.length) {
          return this._iceGatherers.shift();
        }
        var iceGatherer = new window.RTCIceGatherer({
          iceServers: this._config.iceServers,
          gatherPolicy: this._config.iceTransportPolicy
        });
        Object.defineProperty(iceGatherer, 'state',
            {value: 'new', writable: true}
        );

        this.transceivers[sdpMLineIndex].bufferedCandidateEvents = [];
        this.transceivers[sdpMLineIndex].bufferCandidates = function(event) {
          var end = !event.candidate || Object.keys(event.candidate).length === 0;
          // polyfill since RTCIceGatherer.state is not implemented in
          // Edge 10547 yet.
          iceGatherer.state = end ? 'completed' : 'gathering';
          if (pc.transceivers[sdpMLineIndex].bufferedCandidateEvents !== null) {
            pc.transceivers[sdpMLineIndex].bufferedCandidateEvents.push(event);
          }
        };
        iceGatherer.addEventListener('localcandidate',
          this.transceivers[sdpMLineIndex].bufferCandidates);
        return iceGatherer;
      };

      // start gathering from an RTCIceGatherer.
      RTCPeerConnection.prototype._gather = function(mid, sdpMLineIndex) {
        var pc = this;
        var iceGatherer = this.transceivers[sdpMLineIndex].iceGatherer;
        if (iceGatherer.onlocalcandidate) {
          return;
        }
        var bufferedCandidateEvents =
          this.transceivers[sdpMLineIndex].bufferedCandidateEvents;
        this.transceivers[sdpMLineIndex].bufferedCandidateEvents = null;
        iceGatherer.removeEventListener('localcandidate',
          this.transceivers[sdpMLineIndex].bufferCandidates);
        iceGatherer.onlocalcandidate = function(evt) {
          if (pc.usingBundle && sdpMLineIndex > 0) {
            // if we know that we use bundle we can drop candidates with
            // ѕdpMLineIndex > 0. If we don't do this then our state gets
            // confused since we dispose the extra ice gatherer.
            return;
          }
          var event = new Event('icecandidate');
          event.candidate = {sdpMid: mid, sdpMLineIndex: sdpMLineIndex};

          var cand = evt.candidate;
          // Edge emits an empty object for RTCIceCandidateComplete‥
          var end = !cand || Object.keys(cand).length === 0;
          if (end) {
            // polyfill since RTCIceGatherer.state is not implemented in
            // Edge 10547 yet.
            if (iceGatherer.state === 'new' || iceGatherer.state === 'gathering') {
              iceGatherer.state = 'completed';
            }
          } else {
            if (iceGatherer.state === 'new') {
              iceGatherer.state = 'gathering';
            }
            // RTCIceCandidate doesn't have a component, needs to be added
            cand.component = 1;
            // also the usernameFragment. TODO: update SDP to take both variants.
            cand.ufrag = iceGatherer.getLocalParameters().usernameFragment;

            var serializedCandidate = sdp$1.writeCandidate(cand);
            event.candidate = Object.assign(event.candidate,
                sdp$1.parseCandidate(serializedCandidate));

            event.candidate.candidate = serializedCandidate;
            event.candidate.toJSON = function() {
              return {
                candidate: event.candidate.candidate,
                sdpMid: event.candidate.sdpMid,
                sdpMLineIndex: event.candidate.sdpMLineIndex,
                usernameFragment: event.candidate.usernameFragment
              };
            };
          }

          // update local description.
          var sections = sdp$1.getMediaSections(pc._localDescription.sdp);
          if (!end) {
            sections[event.candidate.sdpMLineIndex] +=
                'a=' + event.candidate.candidate + '\r\n';
          } else {
            sections[event.candidate.sdpMLineIndex] +=
                'a=end-of-candidates\r\n';
          }
          pc._localDescription.sdp =
              sdp$1.getDescription(pc._localDescription.sdp) +
              sections.join('');
          var complete = pc.transceivers.every(function(transceiver) {
            return transceiver.iceGatherer &&
                transceiver.iceGatherer.state === 'completed';
          });

          if (pc.iceGatheringState !== 'gathering') {
            pc.iceGatheringState = 'gathering';
            pc._emitGatheringStateChange();
          }

          // Emit candidate. Also emit null candidate when all gatherers are
          // complete.
          if (!end) {
            pc._dispatchEvent('icecandidate', event);
          }
          if (complete) {
            pc._dispatchEvent('icecandidate', new Event('icecandidate'));
            pc.iceGatheringState = 'complete';
            pc._emitGatheringStateChange();
          }
        };

        // emit already gathered candidates.
        window.setTimeout(function() {
          bufferedCandidateEvents.forEach(function(e) {
            iceGatherer.onlocalcandidate(e);
          });
        }, 0);
      };

      // Create ICE transport and DTLS transport.
      RTCPeerConnection.prototype._createIceAndDtlsTransports = function() {
        var pc = this;
        var iceTransport = new window.RTCIceTransport(null);
        iceTransport.onicestatechange = function() {
          pc._updateIceConnectionState();
          pc._updateConnectionState();
        };

        var dtlsTransport = new window.RTCDtlsTransport(iceTransport);
        dtlsTransport.ondtlsstatechange = function() {
          pc._updateConnectionState();
        };
        dtlsTransport.onerror = function() {
          // onerror does not set state to failed by itself.
          Object.defineProperty(dtlsTransport, 'state',
              {value: 'failed', writable: true});
          pc._updateConnectionState();
        };

        return {
          iceTransport: iceTransport,
          dtlsTransport: dtlsTransport
        };
      };

      // Destroy ICE gatherer, ICE transport and DTLS transport.
      // Without triggering the callbacks.
      RTCPeerConnection.prototype._disposeIceAndDtlsTransports = function(
          sdpMLineIndex) {
        var iceGatherer = this.transceivers[sdpMLineIndex].iceGatherer;
        if (iceGatherer) {
          delete iceGatherer.onlocalcandidate;
          delete this.transceivers[sdpMLineIndex].iceGatherer;
        }
        var iceTransport = this.transceivers[sdpMLineIndex].iceTransport;
        if (iceTransport) {
          delete iceTransport.onicestatechange;
          delete this.transceivers[sdpMLineIndex].iceTransport;
        }
        var dtlsTransport = this.transceivers[sdpMLineIndex].dtlsTransport;
        if (dtlsTransport) {
          delete dtlsTransport.ondtlsstatechange;
          delete dtlsTransport.onerror;
          delete this.transceivers[sdpMLineIndex].dtlsTransport;
        }
      };

      // Start the RTP Sender and Receiver for a transceiver.
      RTCPeerConnection.prototype._transceive = function(transceiver,
          send, recv) {
        var params = getCommonCapabilities(transceiver.localCapabilities,
            transceiver.remoteCapabilities);
        if (send && transceiver.rtpSender) {
          params.encodings = transceiver.sendEncodingParameters;
          params.rtcp = {
            cname: sdp$1.localCName,
            compound: transceiver.rtcpParameters.compound
          };
          if (transceiver.recvEncodingParameters.length) {
            params.rtcp.ssrc = transceiver.recvEncodingParameters[0].ssrc;
          }
          transceiver.rtpSender.send(params);
        }
        if (recv && transceiver.rtpReceiver && params.codecs.length > 0) {
          // remove RTX field in Edge 14942
          if (transceiver.kind === 'video'
              && transceiver.recvEncodingParameters
              && edgeVersion < 15019) {
            transceiver.recvEncodingParameters.forEach(function(p) {
              delete p.rtx;
            });
          }
          if (transceiver.recvEncodingParameters.length) {
            params.encodings = transceiver.recvEncodingParameters;
          } else {
            params.encodings = [{}];
          }
          params.rtcp = {
            compound: transceiver.rtcpParameters.compound
          };
          if (transceiver.rtcpParameters.cname) {
            params.rtcp.cname = transceiver.rtcpParameters.cname;
          }
          if (transceiver.sendEncodingParameters.length) {
            params.rtcp.ssrc = transceiver.sendEncodingParameters[0].ssrc;
          }
          transceiver.rtpReceiver.receive(params);
        }
      };

      RTCPeerConnection.prototype.setLocalDescription = function(description) {
        var pc = this;

        // Note: pranswer is not supported.
        if (['offer', 'answer'].indexOf(description.type) === -1) {
          return Promise.reject(makeError('TypeError',
              'Unsupported type "' + description.type + '"'));
        }

        if (!isActionAllowedInSignalingState('setLocalDescription',
            description.type, pc.signalingState) || pc._isClosed) {
          return Promise.reject(makeError('InvalidStateError',
              'Can not set local ' + description.type +
              ' in state ' + pc.signalingState));
        }

        var sections;
        var sessionpart;
        if (description.type === 'offer') {
          // VERY limited support for SDP munging. Limited to:
          // * changing the order of codecs
          sections = sdp$1.splitSections(description.sdp);
          sessionpart = sections.shift();
          sections.forEach(function(mediaSection, sdpMLineIndex) {
            var caps = sdp$1.parseRtpParameters(mediaSection);
            pc.transceivers[sdpMLineIndex].localCapabilities = caps;
          });

          pc.transceivers.forEach(function(transceiver, sdpMLineIndex) {
            pc._gather(transceiver.mid, sdpMLineIndex);
          });
        } else if (description.type === 'answer') {
          sections = sdp$1.splitSections(pc._remoteDescription.sdp);
          sessionpart = sections.shift();
          var isIceLite = sdp$1.matchPrefix(sessionpart,
              'a=ice-lite').length > 0;
          sections.forEach(function(mediaSection, sdpMLineIndex) {
            var transceiver = pc.transceivers[sdpMLineIndex];
            var iceGatherer = transceiver.iceGatherer;
            var iceTransport = transceiver.iceTransport;
            var dtlsTransport = transceiver.dtlsTransport;
            var localCapabilities = transceiver.localCapabilities;
            var remoteCapabilities = transceiver.remoteCapabilities;

            // treat bundle-only as not-rejected.
            var rejected = sdp$1.isRejected(mediaSection) &&
                sdp$1.matchPrefix(mediaSection, 'a=bundle-only').length === 0;

            if (!rejected && !transceiver.rejected) {
              var remoteIceParameters = sdp$1.getIceParameters(
                  mediaSection, sessionpart);
              var remoteDtlsParameters = sdp$1.getDtlsParameters(
                  mediaSection, sessionpart);
              if (isIceLite) {
                remoteDtlsParameters.role = 'server';
              }

              if (!pc.usingBundle || sdpMLineIndex === 0) {
                pc._gather(transceiver.mid, sdpMLineIndex);
                if (iceTransport.state === 'new') {
                  iceTransport.start(iceGatherer, remoteIceParameters,
                      isIceLite ? 'controlling' : 'controlled');
                }
                if (dtlsTransport.state === 'new') {
                  dtlsTransport.start(remoteDtlsParameters);
                }
              }

              // Calculate intersection of capabilities.
              var params = getCommonCapabilities(localCapabilities,
                  remoteCapabilities);

              // Start the RTCRtpSender. The RTCRtpReceiver for this
              // transceiver has already been started in setRemoteDescription.
              pc._transceive(transceiver,
                  params.codecs.length > 0,
                  false);
            }
          });
        }

        pc._localDescription = {
          type: description.type,
          sdp: description.sdp
        };
        if (description.type === 'offer') {
          pc._updateSignalingState('have-local-offer');
        } else {
          pc._updateSignalingState('stable');
        }

        return Promise.resolve();
      };

      RTCPeerConnection.prototype.setRemoteDescription = function(description) {
        var pc = this;

        // Note: pranswer is not supported.
        if (['offer', 'answer'].indexOf(description.type) === -1) {
          return Promise.reject(makeError('TypeError',
              'Unsupported type "' + description.type + '"'));
        }

        if (!isActionAllowedInSignalingState('setRemoteDescription',
            description.type, pc.signalingState) || pc._isClosed) {
          return Promise.reject(makeError('InvalidStateError',
              'Can not set remote ' + description.type +
              ' in state ' + pc.signalingState));
        }

        var streams = {};
        pc.remoteStreams.forEach(function(stream) {
          streams[stream.id] = stream;
        });
        var receiverList = [];
        var sections = sdp$1.splitSections(description.sdp);
        var sessionpart = sections.shift();
        var isIceLite = sdp$1.matchPrefix(sessionpart,
            'a=ice-lite').length > 0;
        var usingBundle = sdp$1.matchPrefix(sessionpart,
            'a=group:BUNDLE ').length > 0;
        pc.usingBundle = usingBundle;
        var iceOptions = sdp$1.matchPrefix(sessionpart,
            'a=ice-options:')[0];
        if (iceOptions) {
          pc.canTrickleIceCandidates = iceOptions.substr(14).split(' ')
              .indexOf('trickle') >= 0;
        } else {
          pc.canTrickleIceCandidates = false;
        }

        sections.forEach(function(mediaSection, sdpMLineIndex) {
          var lines = sdp$1.splitLines(mediaSection);
          var kind = sdp$1.getKind(mediaSection);
          // treat bundle-only as not-rejected.
          var rejected = sdp$1.isRejected(mediaSection) &&
              sdp$1.matchPrefix(mediaSection, 'a=bundle-only').length === 0;
          var protocol = lines[0].substr(2).split(' ')[2];

          var direction = sdp$1.getDirection(mediaSection, sessionpart);
          var remoteMsid = sdp$1.parseMsid(mediaSection);

          var mid = sdp$1.getMid(mediaSection) || sdp$1.generateIdentifier();

          // Reject datachannels which are not implemented yet.
          if (rejected || (kind === 'application' && (protocol === 'DTLS/SCTP' ||
              protocol === 'UDP/DTLS/SCTP'))) {
            // TODO: this is dangerous in the case where a non-rejected m-line
            //     becomes rejected.
            pc.transceivers[sdpMLineIndex] = {
              mid: mid,
              kind: kind,
              protocol: protocol,
              rejected: true
            };
            return;
          }

          if (!rejected && pc.transceivers[sdpMLineIndex] &&
              pc.transceivers[sdpMLineIndex].rejected) {
            // recycle a rejected transceiver.
            pc.transceivers[sdpMLineIndex] = pc._createTransceiver(kind, true);
          }

          var transceiver;
          var iceGatherer;
          var iceTransport;
          var dtlsTransport;
          var rtpReceiver;
          var sendEncodingParameters;
          var recvEncodingParameters;
          var localCapabilities;

          var track;
          // FIXME: ensure the mediaSection has rtcp-mux set.
          var remoteCapabilities = sdp$1.parseRtpParameters(mediaSection);
          var remoteIceParameters;
          var remoteDtlsParameters;
          if (!rejected) {
            remoteIceParameters = sdp$1.getIceParameters(mediaSection,
                sessionpart);
            remoteDtlsParameters = sdp$1.getDtlsParameters(mediaSection,
                sessionpart);
            remoteDtlsParameters.role = 'client';
          }
          recvEncodingParameters =
              sdp$1.parseRtpEncodingParameters(mediaSection);

          var rtcpParameters = sdp$1.parseRtcpParameters(mediaSection);

          var isComplete = sdp$1.matchPrefix(mediaSection,
              'a=end-of-candidates', sessionpart).length > 0;
          var cands = sdp$1.matchPrefix(mediaSection, 'a=candidate:')
              .map(function(cand) {
                return sdp$1.parseCandidate(cand);
              })
              .filter(function(cand) {
                return cand.component === 1;
              });

          // Check if we can use BUNDLE and dispose transports.
          if ((description.type === 'offer' || description.type === 'answer') &&
              !rejected && usingBundle && sdpMLineIndex > 0 &&
              pc.transceivers[sdpMLineIndex]) {
            pc._disposeIceAndDtlsTransports(sdpMLineIndex);
            pc.transceivers[sdpMLineIndex].iceGatherer =
                pc.transceivers[0].iceGatherer;
            pc.transceivers[sdpMLineIndex].iceTransport =
                pc.transceivers[0].iceTransport;
            pc.transceivers[sdpMLineIndex].dtlsTransport =
                pc.transceivers[0].dtlsTransport;
            if (pc.transceivers[sdpMLineIndex].rtpSender) {
              pc.transceivers[sdpMLineIndex].rtpSender.setTransport(
                  pc.transceivers[0].dtlsTransport);
            }
            if (pc.transceivers[sdpMLineIndex].rtpReceiver) {
              pc.transceivers[sdpMLineIndex].rtpReceiver.setTransport(
                  pc.transceivers[0].dtlsTransport);
            }
          }
          if (description.type === 'offer' && !rejected) {
            transceiver = pc.transceivers[sdpMLineIndex] ||
                pc._createTransceiver(kind);
            transceiver.mid = mid;

            if (!transceiver.iceGatherer) {
              transceiver.iceGatherer = pc._createIceGatherer(sdpMLineIndex,
                  usingBundle);
            }

            if (cands.length && transceiver.iceTransport.state === 'new') {
              if (isComplete && (!usingBundle || sdpMLineIndex === 0)) {
                transceiver.iceTransport.setRemoteCandidates(cands);
              } else {
                cands.forEach(function(candidate) {
                  maybeAddCandidate(transceiver.iceTransport, candidate);
                });
              }
            }

            localCapabilities = window.RTCRtpReceiver.getCapabilities(kind);

            // filter RTX until additional stuff needed for RTX is implemented
            // in adapter.js
            if (edgeVersion < 15019) {
              localCapabilities.codecs = localCapabilities.codecs.filter(
                  function(codec) {
                    return codec.name !== 'rtx';
                  });
            }

            sendEncodingParameters = transceiver.sendEncodingParameters || [{
              ssrc: (2 * sdpMLineIndex + 2) * 1001
            }];

            // TODO: rewrite to use http://w3c.github.io/webrtc-pc/#set-associated-remote-streams
            var isNewTrack = false;
            if (direction === 'sendrecv' || direction === 'sendonly') {
              isNewTrack = !transceiver.rtpReceiver;
              rtpReceiver = transceiver.rtpReceiver ||
                  new window.RTCRtpReceiver(transceiver.dtlsTransport, kind);

              if (isNewTrack) {
                var stream;
                track = rtpReceiver.track;
                // FIXME: does not work with Plan B.
                if (remoteMsid && remoteMsid.stream === '-') ; else if (remoteMsid) {
                  if (!streams[remoteMsid.stream]) {
                    streams[remoteMsid.stream] = new window.MediaStream();
                    Object.defineProperty(streams[remoteMsid.stream], 'id', {
                      get: function() {
                        return remoteMsid.stream;
                      }
                    });
                  }
                  Object.defineProperty(track, 'id', {
                    get: function() {
                      return remoteMsid.track;
                    }
                  });
                  stream = streams[remoteMsid.stream];
                } else {
                  if (!streams.default) {
                    streams.default = new window.MediaStream();
                  }
                  stream = streams.default;
                }
                if (stream) {
                  addTrackToStreamAndFireEvent(track, stream);
                  transceiver.associatedRemoteMediaStreams.push(stream);
                }
                receiverList.push([track, rtpReceiver, stream]);
              }
            } else if (transceiver.rtpReceiver && transceiver.rtpReceiver.track) {
              transceiver.associatedRemoteMediaStreams.forEach(function(s) {
                var nativeTrack = s.getTracks().find(function(t) {
                  return t.id === transceiver.rtpReceiver.track.id;
                });
                if (nativeTrack) {
                  removeTrackFromStreamAndFireEvent(nativeTrack, s);
                }
              });
              transceiver.associatedRemoteMediaStreams = [];
            }

            transceiver.localCapabilities = localCapabilities;
            transceiver.remoteCapabilities = remoteCapabilities;
            transceiver.rtpReceiver = rtpReceiver;
            transceiver.rtcpParameters = rtcpParameters;
            transceiver.sendEncodingParameters = sendEncodingParameters;
            transceiver.recvEncodingParameters = recvEncodingParameters;

            // Start the RTCRtpReceiver now. The RTPSender is started in
            // setLocalDescription.
            pc._transceive(pc.transceivers[sdpMLineIndex],
                false,
                isNewTrack);
          } else if (description.type === 'answer' && !rejected) {
            transceiver = pc.transceivers[sdpMLineIndex];
            iceGatherer = transceiver.iceGatherer;
            iceTransport = transceiver.iceTransport;
            dtlsTransport = transceiver.dtlsTransport;
            rtpReceiver = transceiver.rtpReceiver;
            sendEncodingParameters = transceiver.sendEncodingParameters;
            localCapabilities = transceiver.localCapabilities;

            pc.transceivers[sdpMLineIndex].recvEncodingParameters =
                recvEncodingParameters;
            pc.transceivers[sdpMLineIndex].remoteCapabilities =
                remoteCapabilities;
            pc.transceivers[sdpMLineIndex].rtcpParameters = rtcpParameters;

            if (cands.length && iceTransport.state === 'new') {
              if ((isIceLite || isComplete) &&
                  (!usingBundle || sdpMLineIndex === 0)) {
                iceTransport.setRemoteCandidates(cands);
              } else {
                cands.forEach(function(candidate) {
                  maybeAddCandidate(transceiver.iceTransport, candidate);
                });
              }
            }

            if (!usingBundle || sdpMLineIndex === 0) {
              if (iceTransport.state === 'new') {
                iceTransport.start(iceGatherer, remoteIceParameters,
                    'controlling');
              }
              if (dtlsTransport.state === 'new') {
                dtlsTransport.start(remoteDtlsParameters);
              }
            }

            // If the offer contained RTX but the answer did not,
            // remove RTX from sendEncodingParameters.
            var commonCapabilities = getCommonCapabilities(
              transceiver.localCapabilities,
              transceiver.remoteCapabilities);

            var hasRtx = commonCapabilities.codecs.filter(function(c) {
              return c.name.toLowerCase() === 'rtx';
            }).length;
            if (!hasRtx && transceiver.sendEncodingParameters[0].rtx) {
              delete transceiver.sendEncodingParameters[0].rtx;
            }

            pc._transceive(transceiver,
                direction === 'sendrecv' || direction === 'recvonly',
                direction === 'sendrecv' || direction === 'sendonly');

            // TODO: rewrite to use http://w3c.github.io/webrtc-pc/#set-associated-remote-streams
            if (rtpReceiver &&
                (direction === 'sendrecv' || direction === 'sendonly')) {
              track = rtpReceiver.track;
              if (remoteMsid) {
                if (!streams[remoteMsid.stream]) {
                  streams[remoteMsid.stream] = new window.MediaStream();
                }
                addTrackToStreamAndFireEvent(track, streams[remoteMsid.stream]);
                receiverList.push([track, rtpReceiver, streams[remoteMsid.stream]]);
              } else {
                if (!streams.default) {
                  streams.default = new window.MediaStream();
                }
                addTrackToStreamAndFireEvent(track, streams.default);
                receiverList.push([track, rtpReceiver, streams.default]);
              }
            } else {
              // FIXME: actually the receiver should be created later.
              delete transceiver.rtpReceiver;
            }
          }
        });

        if (pc._dtlsRole === undefined) {
          pc._dtlsRole = description.type === 'offer' ? 'active' : 'passive';
        }

        pc._remoteDescription = {
          type: description.type,
          sdp: description.sdp
        };
        if (description.type === 'offer') {
          pc._updateSignalingState('have-remote-offer');
        } else {
          pc._updateSignalingState('stable');
        }
        Object.keys(streams).forEach(function(sid) {
          var stream = streams[sid];
          if (stream.getTracks().length) {
            if (pc.remoteStreams.indexOf(stream) === -1) {
              pc.remoteStreams.push(stream);
              var event = new Event('addstream');
              event.stream = stream;
              window.setTimeout(function() {
                pc._dispatchEvent('addstream', event);
              });
            }

            receiverList.forEach(function(item) {
              var track = item[0];
              var receiver = item[1];
              if (stream.id !== item[2].id) {
                return;
              }
              fireAddTrack(pc, track, receiver, [stream]);
            });
          }
        });
        receiverList.forEach(function(item) {
          if (item[2]) {
            return;
          }
          fireAddTrack(pc, item[0], item[1], []);
        });

        // check whether addIceCandidate({}) was called within four seconds after
        // setRemoteDescription.
        window.setTimeout(function() {
          if (!(pc && pc.transceivers)) {
            return;
          }
          pc.transceivers.forEach(function(transceiver) {
            if (transceiver.iceTransport &&
                transceiver.iceTransport.state === 'new' &&
                transceiver.iceTransport.getRemoteCandidates().length > 0) {
              console.warn('Timeout for addRemoteCandidate. Consider sending ' +
                  'an end-of-candidates notification');
              transceiver.iceTransport.addRemoteCandidate({});
            }
          });
        }, 4000);

        return Promise.resolve();
      };

      RTCPeerConnection.prototype.close = function() {
        this.transceivers.forEach(function(transceiver) {
          /* not yet
          if (transceiver.iceGatherer) {
            transceiver.iceGatherer.close();
          }
          */
          if (transceiver.iceTransport) {
            transceiver.iceTransport.stop();
          }
          if (transceiver.dtlsTransport) {
            transceiver.dtlsTransport.stop();
          }
          if (transceiver.rtpSender) {
            transceiver.rtpSender.stop();
          }
          if (transceiver.rtpReceiver) {
            transceiver.rtpReceiver.stop();
          }
        });
        // FIXME: clean up tracks, local streams, remote streams, etc
        this._isClosed = true;
        this._updateSignalingState('closed');
      };

      // Update the signaling state.
      RTCPeerConnection.prototype._updateSignalingState = function(newState) {
        this.signalingState = newState;
        var event = new Event('signalingstatechange');
        this._dispatchEvent('signalingstatechange', event);
      };

      // Determine whether to fire the negotiationneeded event.
      RTCPeerConnection.prototype._maybeFireNegotiationNeeded = function() {
        var pc = this;
        if (this.signalingState !== 'stable' || this.needNegotiation === true) {
          return;
        }
        this.needNegotiation = true;
        window.setTimeout(function() {
          if (pc.needNegotiation) {
            pc.needNegotiation = false;
            var event = new Event('negotiationneeded');
            pc._dispatchEvent('negotiationneeded', event);
          }
        }, 0);
      };

      // Update the ice connection state.
      RTCPeerConnection.prototype._updateIceConnectionState = function() {
        var newState;
        var states = {
          'new': 0,
          closed: 0,
          checking: 0,
          connected: 0,
          completed: 0,
          disconnected: 0,
          failed: 0
        };
        this.transceivers.forEach(function(transceiver) {
          if (transceiver.iceTransport && !transceiver.rejected) {
            states[transceiver.iceTransport.state]++;
          }
        });

        newState = 'new';
        if (states.failed > 0) {
          newState = 'failed';
        } else if (states.checking > 0) {
          newState = 'checking';
        } else if (states.disconnected > 0) {
          newState = 'disconnected';
        } else if (states.new > 0) {
          newState = 'new';
        } else if (states.connected > 0) {
          newState = 'connected';
        } else if (states.completed > 0) {
          newState = 'completed';
        }

        if (newState !== this.iceConnectionState) {
          this.iceConnectionState = newState;
          var event = new Event('iceconnectionstatechange');
          this._dispatchEvent('iceconnectionstatechange', event);
        }
      };

      // Update the connection state.
      RTCPeerConnection.prototype._updateConnectionState = function() {
        var newState;
        var states = {
          'new': 0,
          closed: 0,
          connecting: 0,
          connected: 0,
          completed: 0,
          disconnected: 0,
          failed: 0
        };
        this.transceivers.forEach(function(transceiver) {
          if (transceiver.iceTransport && transceiver.dtlsTransport &&
              !transceiver.rejected) {
            states[transceiver.iceTransport.state]++;
            states[transceiver.dtlsTransport.state]++;
          }
        });
        // ICETransport.completed and connected are the same for this purpose.
        states.connected += states.completed;

        newState = 'new';
        if (states.failed > 0) {
          newState = 'failed';
        } else if (states.connecting > 0) {
          newState = 'connecting';
        } else if (states.disconnected > 0) {
          newState = 'disconnected';
        } else if (states.new > 0) {
          newState = 'new';
        } else if (states.connected > 0) {
          newState = 'connected';
        }

        if (newState !== this.connectionState) {
          this.connectionState = newState;
          var event = new Event('connectionstatechange');
          this._dispatchEvent('connectionstatechange', event);
        }
      };

      RTCPeerConnection.prototype.createOffer = function() {
        var pc = this;

        if (pc._isClosed) {
          return Promise.reject(makeError('InvalidStateError',
              'Can not call createOffer after close'));
        }

        var numAudioTracks = pc.transceivers.filter(function(t) {
          return t.kind === 'audio';
        }).length;
        var numVideoTracks = pc.transceivers.filter(function(t) {
          return t.kind === 'video';
        }).length;

        // Determine number of audio and video tracks we need to send/recv.
        var offerOptions = arguments[0];
        if (offerOptions) {
          // Reject Chrome legacy constraints.
          if (offerOptions.mandatory || offerOptions.optional) {
            throw new TypeError(
                'Legacy mandatory/optional constraints not supported.');
          }
          if (offerOptions.offerToReceiveAudio !== undefined) {
            if (offerOptions.offerToReceiveAudio === true) {
              numAudioTracks = 1;
            } else if (offerOptions.offerToReceiveAudio === false) {
              numAudioTracks = 0;
            } else {
              numAudioTracks = offerOptions.offerToReceiveAudio;
            }
          }
          if (offerOptions.offerToReceiveVideo !== undefined) {
            if (offerOptions.offerToReceiveVideo === true) {
              numVideoTracks = 1;
            } else if (offerOptions.offerToReceiveVideo === false) {
              numVideoTracks = 0;
            } else {
              numVideoTracks = offerOptions.offerToReceiveVideo;
            }
          }
        }

        pc.transceivers.forEach(function(transceiver) {
          if (transceiver.kind === 'audio') {
            numAudioTracks--;
            if (numAudioTracks < 0) {
              transceiver.wantReceive = false;
            }
          } else if (transceiver.kind === 'video') {
            numVideoTracks--;
            if (numVideoTracks < 0) {
              transceiver.wantReceive = false;
            }
          }
        });

        // Create M-lines for recvonly streams.
        while (numAudioTracks > 0 || numVideoTracks > 0) {
          if (numAudioTracks > 0) {
            pc._createTransceiver('audio');
            numAudioTracks--;
          }
          if (numVideoTracks > 0) {
            pc._createTransceiver('video');
            numVideoTracks--;
          }
        }

        var sdp = sdp$1.writeSessionBoilerplate(pc._sdpSessionId,
            pc._sdpSessionVersion++);
        pc.transceivers.forEach(function(transceiver, sdpMLineIndex) {
          // For each track, create an ice gatherer, ice transport,
          // dtls transport, potentially rtpsender and rtpreceiver.
          var track = transceiver.track;
          var kind = transceiver.kind;
          var mid = transceiver.mid || sdp$1.generateIdentifier();
          transceiver.mid = mid;

          if (!transceiver.iceGatherer) {
            transceiver.iceGatherer = pc._createIceGatherer(sdpMLineIndex,
                pc.usingBundle);
          }

          var localCapabilities = window.RTCRtpSender.getCapabilities(kind);
          // filter RTX until additional stuff needed for RTX is implemented
          // in adapter.js
          if (edgeVersion < 15019) {
            localCapabilities.codecs = localCapabilities.codecs.filter(
                function(codec) {
                  return codec.name !== 'rtx';
                });
          }
          localCapabilities.codecs.forEach(function(codec) {
            // work around https://bugs.chromium.org/p/webrtc/issues/detail?id=6552
            // by adding level-asymmetry-allowed=1
            if (codec.name === 'H264' &&
                codec.parameters['level-asymmetry-allowed'] === undefined) {
              codec.parameters['level-asymmetry-allowed'] = '1';
            }

            // for subsequent offers, we might have to re-use the payload
            // type of the last offer.
            if (transceiver.remoteCapabilities &&
                transceiver.remoteCapabilities.codecs) {
              transceiver.remoteCapabilities.codecs.forEach(function(remoteCodec) {
                if (codec.name.toLowerCase() === remoteCodec.name.toLowerCase() &&
                    codec.clockRate === remoteCodec.clockRate) {
                  codec.preferredPayloadType = remoteCodec.payloadType;
                }
              });
            }
          });
          localCapabilities.headerExtensions.forEach(function(hdrExt) {
            var remoteExtensions = transceiver.remoteCapabilities &&
                transceiver.remoteCapabilities.headerExtensions || [];
            remoteExtensions.forEach(function(rHdrExt) {
              if (hdrExt.uri === rHdrExt.uri) {
                hdrExt.id = rHdrExt.id;
              }
            });
          });

          // generate an ssrc now, to be used later in rtpSender.send
          var sendEncodingParameters = transceiver.sendEncodingParameters || [{
            ssrc: (2 * sdpMLineIndex + 1) * 1001
          }];
          if (track) {
            // add RTX
            if (edgeVersion >= 15019 && kind === 'video' &&
                !sendEncodingParameters[0].rtx) {
              sendEncodingParameters[0].rtx = {
                ssrc: sendEncodingParameters[0].ssrc + 1
              };
            }
          }

          if (transceiver.wantReceive) {
            transceiver.rtpReceiver = new window.RTCRtpReceiver(
                transceiver.dtlsTransport, kind);
          }

          transceiver.localCapabilities = localCapabilities;
          transceiver.sendEncodingParameters = sendEncodingParameters;
        });

        // always offer BUNDLE and dispose on return if not supported.
        if (pc._config.bundlePolicy !== 'max-compat') {
          sdp += 'a=group:BUNDLE ' + pc.transceivers.map(function(t) {
            return t.mid;
          }).join(' ') + '\r\n';
        }
        sdp += 'a=ice-options:trickle\r\n';

        pc.transceivers.forEach(function(transceiver, sdpMLineIndex) {
          sdp += writeMediaSection(transceiver, transceiver.localCapabilities,
              'offer', transceiver.stream, pc._dtlsRole);
          sdp += 'a=rtcp-rsize\r\n';

          if (transceiver.iceGatherer && pc.iceGatheringState !== 'new' &&
              (sdpMLineIndex === 0 || !pc.usingBundle)) {
            transceiver.iceGatherer.getLocalCandidates().forEach(function(cand) {
              cand.component = 1;
              sdp += 'a=' + sdp$1.writeCandidate(cand) + '\r\n';
            });

            if (transceiver.iceGatherer.state === 'completed') {
              sdp += 'a=end-of-candidates\r\n';
            }
          }
        });

        var desc = new window.RTCSessionDescription({
          type: 'offer',
          sdp: sdp
        });
        return Promise.resolve(desc);
      };

      RTCPeerConnection.prototype.createAnswer = function() {
        var pc = this;

        if (pc._isClosed) {
          return Promise.reject(makeError('InvalidStateError',
              'Can not call createAnswer after close'));
        }

        if (!(pc.signalingState === 'have-remote-offer' ||
            pc.signalingState === 'have-local-pranswer')) {
          return Promise.reject(makeError('InvalidStateError',
              'Can not call createAnswer in signalingState ' + pc.signalingState));
        }

        var sdp = sdp$1.writeSessionBoilerplate(pc._sdpSessionId,
            pc._sdpSessionVersion++);
        if (pc.usingBundle) {
          sdp += 'a=group:BUNDLE ' + pc.transceivers.map(function(t) {
            return t.mid;
          }).join(' ') + '\r\n';
        }
        sdp += 'a=ice-options:trickle\r\n';

        var mediaSectionsInOffer = sdp$1.getMediaSections(
            pc._remoteDescription.sdp).length;
        pc.transceivers.forEach(function(transceiver, sdpMLineIndex) {
          if (sdpMLineIndex + 1 > mediaSectionsInOffer) {
            return;
          }
          if (transceiver.rejected) {
            if (transceiver.kind === 'application') {
              if (transceiver.protocol === 'DTLS/SCTP') { // legacy fmt
                sdp += 'm=application 0 DTLS/SCTP 5000\r\n';
              } else {
                sdp += 'm=application 0 ' + transceiver.protocol +
                    ' webrtc-datachannel\r\n';
              }
            } else if (transceiver.kind === 'audio') {
              sdp += 'm=audio 0 UDP/TLS/RTP/SAVPF 0\r\n' +
                  'a=rtpmap:0 PCMU/8000\r\n';
            } else if (transceiver.kind === 'video') {
              sdp += 'm=video 0 UDP/TLS/RTP/SAVPF 120\r\n' +
                  'a=rtpmap:120 VP8/90000\r\n';
            }
            sdp += 'c=IN IP4 0.0.0.0\r\n' +
                'a=inactive\r\n' +
                'a=mid:' + transceiver.mid + '\r\n';
            return;
          }

          // FIXME: look at direction.
          if (transceiver.stream) {
            var localTrack;
            if (transceiver.kind === 'audio') {
              localTrack = transceiver.stream.getAudioTracks()[0];
            } else if (transceiver.kind === 'video') {
              localTrack = transceiver.stream.getVideoTracks()[0];
            }
            if (localTrack) {
              // add RTX
              if (edgeVersion >= 15019 && transceiver.kind === 'video' &&
                  !transceiver.sendEncodingParameters[0].rtx) {
                transceiver.sendEncodingParameters[0].rtx = {
                  ssrc: transceiver.sendEncodingParameters[0].ssrc + 1
                };
              }
            }
          }

          // Calculate intersection of capabilities.
          var commonCapabilities = getCommonCapabilities(
              transceiver.localCapabilities,
              transceiver.remoteCapabilities);

          var hasRtx = commonCapabilities.codecs.filter(function(c) {
            return c.name.toLowerCase() === 'rtx';
          }).length;
          if (!hasRtx && transceiver.sendEncodingParameters[0].rtx) {
            delete transceiver.sendEncodingParameters[0].rtx;
          }

          sdp += writeMediaSection(transceiver, commonCapabilities,
              'answer', transceiver.stream, pc._dtlsRole);
          if (transceiver.rtcpParameters &&
              transceiver.rtcpParameters.reducedSize) {
            sdp += 'a=rtcp-rsize\r\n';
          }
        });

        var desc = new window.RTCSessionDescription({
          type: 'answer',
          sdp: sdp
        });
        return Promise.resolve(desc);
      };

      RTCPeerConnection.prototype.addIceCandidate = function(candidate) {
        var pc = this;
        var sections;
        if (candidate && !(candidate.sdpMLineIndex !== undefined ||
            candidate.sdpMid)) {
          return Promise.reject(new TypeError('sdpMLineIndex or sdpMid required'));
        }

        // TODO: needs to go into ops queue.
        return new Promise(function(resolve, reject) {
          if (!pc._remoteDescription) {
            return reject(makeError('InvalidStateError',
                'Can not add ICE candidate without a remote description'));
          } else if (!candidate || candidate.candidate === '') {
            for (var j = 0; j < pc.transceivers.length; j++) {
              if (pc.transceivers[j].rejected) {
                continue;
              }
              pc.transceivers[j].iceTransport.addRemoteCandidate({});
              sections = sdp$1.getMediaSections(pc._remoteDescription.sdp);
              sections[j] += 'a=end-of-candidates\r\n';
              pc._remoteDescription.sdp =
                  sdp$1.getDescription(pc._remoteDescription.sdp) +
                  sections.join('');
              if (pc.usingBundle) {
                break;
              }
            }
          } else {
            var sdpMLineIndex = candidate.sdpMLineIndex;
            if (candidate.sdpMid) {
              for (var i = 0; i < pc.transceivers.length; i++) {
                if (pc.transceivers[i].mid === candidate.sdpMid) {
                  sdpMLineIndex = i;
                  break;
                }
              }
            }
            var transceiver = pc.transceivers[sdpMLineIndex];
            if (transceiver) {
              if (transceiver.rejected) {
                return resolve();
              }
              var cand = Object.keys(candidate.candidate).length > 0 ?
                  sdp$1.parseCandidate(candidate.candidate) : {};
              // Ignore Chrome's invalid candidates since Edge does not like them.
              if (cand.protocol === 'tcp' && (cand.port === 0 || cand.port === 9)) {
                return resolve();
              }
              // Ignore RTCP candidates, we assume RTCP-MUX.
              if (cand.component && cand.component !== 1) {
                return resolve();
              }
              // when using bundle, avoid adding candidates to the wrong
              // ice transport. And avoid adding candidates added in the SDP.
              if (sdpMLineIndex === 0 || (sdpMLineIndex > 0 &&
                  transceiver.iceTransport !== pc.transceivers[0].iceTransport)) {
                if (!maybeAddCandidate(transceiver.iceTransport, cand)) {
                  return reject(makeError('OperationError',
                      'Can not add ICE candidate'));
                }
              }

              // update the remoteDescription.
              var candidateString = candidate.candidate.trim();
              if (candidateString.indexOf('a=') === 0) {
                candidateString = candidateString.substr(2);
              }
              sections = sdp$1.getMediaSections(pc._remoteDescription.sdp);
              sections[sdpMLineIndex] += 'a=' +
                  (cand.type ? candidateString : 'end-of-candidates')
                  + '\r\n';
              pc._remoteDescription.sdp =
                  sdp$1.getDescription(pc._remoteDescription.sdp) +
                  sections.join('');
            } else {
              return reject(makeError('OperationError',
                  'Can not add ICE candidate'));
            }
          }
          resolve();
        });
      };

      RTCPeerConnection.prototype.getStats = function(selector) {
        if (selector && selector instanceof window.MediaStreamTrack) {
          var senderOrReceiver = null;
          this.transceivers.forEach(function(transceiver) {
            if (transceiver.rtpSender &&
                transceiver.rtpSender.track === selector) {
              senderOrReceiver = transceiver.rtpSender;
            } else if (transceiver.rtpReceiver &&
                transceiver.rtpReceiver.track === selector) {
              senderOrReceiver = transceiver.rtpReceiver;
            }
          });
          if (!senderOrReceiver) {
            throw makeError('InvalidAccessError', 'Invalid selector.');
          }
          return senderOrReceiver.getStats();
        }

        var promises = [];
        this.transceivers.forEach(function(transceiver) {
          ['rtpSender', 'rtpReceiver', 'iceGatherer', 'iceTransport',
              'dtlsTransport'].forEach(function(method) {
                if (transceiver[method]) {
                  promises.push(transceiver[method].getStats());
                }
              });
        });
        return Promise.all(promises).then(function(allStats) {
          var results = new Map();
          allStats.forEach(function(stats) {
            stats.forEach(function(stat) {
              results.set(stat.id, stat);
            });
          });
          return results;
        });
      };

      // fix low-level stat names and return Map instead of object.
      var ortcObjects = ['RTCRtpSender', 'RTCRtpReceiver', 'RTCIceGatherer',
        'RTCIceTransport', 'RTCDtlsTransport'];
      ortcObjects.forEach(function(ortcObjectName) {
        var obj = window[ortcObjectName];
        if (obj && obj.prototype && obj.prototype.getStats) {
          var nativeGetstats = obj.prototype.getStats;
          obj.prototype.getStats = function() {
            return nativeGetstats.apply(this)
            .then(function(nativeStats) {
              var mapStats = new Map();
              Object.keys(nativeStats).forEach(function(id) {
                nativeStats[id].type = fixStatsType(nativeStats[id]);
                mapStats.set(id, nativeStats[id]);
              });
              return mapStats;
            });
          };
        }
      });

      // legacy callback shims. Should be moved to adapter.js some days.
      var methods = ['createOffer', 'createAnswer'];
      methods.forEach(function(method) {
        var nativeMethod = RTCPeerConnection.prototype[method];
        RTCPeerConnection.prototype[method] = function() {
          var args = arguments;
          if (typeof args[0] === 'function' ||
              typeof args[1] === 'function') { // legacy
            return nativeMethod.apply(this, [arguments[2]])
            .then(function(description) {
              if (typeof args[0] === 'function') {
                args[0].apply(null, [description]);
              }
            }, function(error) {
              if (typeof args[1] === 'function') {
                args[1].apply(null, [error]);
              }
            });
          }
          return nativeMethod.apply(this, arguments);
        };
      });

      methods = ['setLocalDescription', 'setRemoteDescription', 'addIceCandidate'];
      methods.forEach(function(method) {
        var nativeMethod = RTCPeerConnection.prototype[method];
        RTCPeerConnection.prototype[method] = function() {
          var args = arguments;
          if (typeof args[1] === 'function' ||
              typeof args[2] === 'function') { // legacy
            return nativeMethod.apply(this, arguments)
            .then(function() {
              if (typeof args[1] === 'function') {
                args[1].apply(null);
              }
            }, function(error) {
              if (typeof args[2] === 'function') {
                args[2].apply(null, [error]);
              }
            });
          }
          return nativeMethod.apply(this, arguments);
        };
      });

      // getStats is special. It doesn't have a spec legacy method yet we support
      // getStats(something, cb) without error callbacks.
      ['getStats'].forEach(function(method) {
        var nativeMethod = RTCPeerConnection.prototype[method];
        RTCPeerConnection.prototype[method] = function() {
          var args = arguments;
          if (typeof args[1] === 'function') {
            return nativeMethod.apply(this, arguments)
            .then(function() {
              if (typeof args[1] === 'function') {
                args[1].apply(null);
              }
            });
          }
          return nativeMethod.apply(this, arguments);
        };
      });

      return RTCPeerConnection;
    };

    /*
     *  Copyright (c) 2016 The WebRTC project authors. All Rights Reserved.
     *
     *  Use of this source code is governed by a BSD-style license
     *  that can be found in the LICENSE file in the root of the source
     *  tree.
     */

    function shimGetUserMedia$2(window) {
      const navigator = window && window.navigator;

      const shimError_ = function(e) {
        return {
          name: {PermissionDeniedError: 'NotAllowedError'}[e.name] || e.name,
          message: e.message,
          constraint: e.constraint,
          toString() {
            return this.name;
          }
        };
      };

      // getUserMedia error shim.
      const origGetUserMedia = navigator.mediaDevices.getUserMedia.
          bind(navigator.mediaDevices);
      navigator.mediaDevices.getUserMedia = function(c) {
        return origGetUserMedia(c).catch(e => Promise.reject(shimError_(e)));
      };
    }

    /*
     *  Copyright (c) 2018 The adapter.js project authors. All Rights Reserved.
     *
     *  Use of this source code is governed by a BSD-style license
     *  that can be found in the LICENSE file in the root of the source
     *  tree.
     */

    function shimGetDisplayMedia$1(window) {
      if (!('getDisplayMedia' in window.navigator)) {
        return;
      }
      if (!(window.navigator.mediaDevices)) {
        return;
      }
      if (window.navigator.mediaDevices &&
        'getDisplayMedia' in window.navigator.mediaDevices) {
        return;
      }
      window.navigator.mediaDevices.getDisplayMedia =
        window.navigator.getDisplayMedia.bind(window.navigator);
    }

    /*
     *  Copyright (c) 2016 The WebRTC project authors. All Rights Reserved.
     *
     *  Use of this source code is governed by a BSD-style license
     *  that can be found in the LICENSE file in the root of the source
     *  tree.
     */

    function shimPeerConnection$1(window, browserDetails) {
      if (window.RTCIceGatherer) {
        if (!window.RTCIceCandidate) {
          window.RTCIceCandidate = function RTCIceCandidate(args) {
            return args;
          };
        }
        if (!window.RTCSessionDescription) {
          window.RTCSessionDescription = function RTCSessionDescription(args) {
            return args;
          };
        }
        // this adds an additional event listener to MediaStrackTrack that signals
        // when a tracks enabled property was changed. Workaround for a bug in
        // addStream, see below. No longer required in 15025+
        if (browserDetails.version < 15025) {
          const origMSTEnabled = Object.getOwnPropertyDescriptor(
              window.MediaStreamTrack.prototype, 'enabled');
          Object.defineProperty(window.MediaStreamTrack.prototype, 'enabled', {
            set(value) {
              origMSTEnabled.set.call(this, value);
              const ev = new Event('enabled');
              ev.enabled = value;
              this.dispatchEvent(ev);
            }
          });
        }
      }

      // ORTC defines the DTMF sender a bit different.
      // https://github.com/w3c/ortc/issues/714
      if (window.RTCRtpSender && !('dtmf' in window.RTCRtpSender.prototype)) {
        Object.defineProperty(window.RTCRtpSender.prototype, 'dtmf', {
          get() {
            if (this._dtmf === undefined) {
              if (this.track.kind === 'audio') {
                this._dtmf = new window.RTCDtmfSender(this);
              } else if (this.track.kind === 'video') {
                this._dtmf = null;
              }
            }
            return this._dtmf;
          }
        });
      }
      // Edge currently only implements the RTCDtmfSender, not the
      // RTCDTMFSender alias. See http://draft.ortc.org/#rtcdtmfsender2*
      if (window.RTCDtmfSender && !window.RTCDTMFSender) {
        window.RTCDTMFSender = window.RTCDtmfSender;
      }

      const RTCPeerConnectionShim = rtcpeerconnection(window,
          browserDetails.version);
      window.RTCPeerConnection = function RTCPeerConnection(config) {
        if (config && config.iceServers) {
          config.iceServers = filterIceServers$1(config.iceServers,
            browserDetails.version);
          log('ICE servers after filtering:', config.iceServers);
        }
        return new RTCPeerConnectionShim(config);
      };
      window.RTCPeerConnection.prototype = RTCPeerConnectionShim.prototype;
    }

    function shimReplaceTrack(window) {
      // ORTC has replaceTrack -- https://github.com/w3c/ortc/issues/614
      if (window.RTCRtpSender &&
          !('replaceTrack' in window.RTCRtpSender.prototype)) {
        window.RTCRtpSender.prototype.replaceTrack =
            window.RTCRtpSender.prototype.setTrack;
      }
    }

    var edgeShim = /*#__PURE__*/Object.freeze({
        __proto__: null,
        shimPeerConnection: shimPeerConnection$1,
        shimReplaceTrack: shimReplaceTrack,
        shimGetUserMedia: shimGetUserMedia$2,
        shimGetDisplayMedia: shimGetDisplayMedia$1
    });

    /*
     *  Copyright (c) 2016 The WebRTC project authors. All Rights Reserved.
     *
     *  Use of this source code is governed by a BSD-style license
     *  that can be found in the LICENSE file in the root of the source
     *  tree.
     */

    function shimGetUserMedia$1(window, browserDetails) {
      const navigator = window && window.navigator;
      const MediaStreamTrack = window && window.MediaStreamTrack;

      navigator.getUserMedia = function(constraints, onSuccess, onError) {
        // Replace Firefox 44+'s deprecation warning with unprefixed version.
        deprecated('navigator.getUserMedia',
            'navigator.mediaDevices.getUserMedia');
        navigator.mediaDevices.getUserMedia(constraints).then(onSuccess, onError);
      };

      if (!(browserDetails.version > 55 &&
          'autoGainControl' in navigator.mediaDevices.getSupportedConstraints())) {
        const remap = function(obj, a, b) {
          if (a in obj && !(b in obj)) {
            obj[b] = obj[a];
            delete obj[a];
          }
        };

        const nativeGetUserMedia = navigator.mediaDevices.getUserMedia.
            bind(navigator.mediaDevices);
        navigator.mediaDevices.getUserMedia = function(c) {
          if (typeof c === 'object' && typeof c.audio === 'object') {
            c = JSON.parse(JSON.stringify(c));
            remap(c.audio, 'autoGainControl', 'mozAutoGainControl');
            remap(c.audio, 'noiseSuppression', 'mozNoiseSuppression');
          }
          return nativeGetUserMedia(c);
        };

        if (MediaStreamTrack && MediaStreamTrack.prototype.getSettings) {
          const nativeGetSettings = MediaStreamTrack.prototype.getSettings;
          MediaStreamTrack.prototype.getSettings = function() {
            const obj = nativeGetSettings.apply(this, arguments);
            remap(obj, 'mozAutoGainControl', 'autoGainControl');
            remap(obj, 'mozNoiseSuppression', 'noiseSuppression');
            return obj;
          };
        }

        if (MediaStreamTrack && MediaStreamTrack.prototype.applyConstraints) {
          const nativeApplyConstraints =
            MediaStreamTrack.prototype.applyConstraints;
          MediaStreamTrack.prototype.applyConstraints = function(c) {
            if (this.kind === 'audio' && typeof c === 'object') {
              c = JSON.parse(JSON.stringify(c));
              remap(c, 'autoGainControl', 'mozAutoGainControl');
              remap(c, 'noiseSuppression', 'mozNoiseSuppression');
            }
            return nativeApplyConstraints.apply(this, [c]);
          };
        }
      }
    }

    /*
     *  Copyright (c) 2018 The adapter.js project authors. All Rights Reserved.
     *
     *  Use of this source code is governed by a BSD-style license
     *  that can be found in the LICENSE file in the root of the source
     *  tree.
     */

    function shimGetDisplayMedia(window, preferredMediaSource) {
      if (window.navigator.mediaDevices &&
        'getDisplayMedia' in window.navigator.mediaDevices) {
        return;
      }
      if (!(window.navigator.mediaDevices)) {
        return;
      }
      window.navigator.mediaDevices.getDisplayMedia =
        function getDisplayMedia(constraints) {
          if (!(constraints && constraints.video)) {
            const err = new DOMException('getDisplayMedia without video ' +
                'constraints is undefined');
            err.name = 'NotFoundError';
            // from https://heycam.github.io/webidl/#idl-DOMException-error-names
            err.code = 8;
            return Promise.reject(err);
          }
          if (constraints.video === true) {
            constraints.video = {mediaSource: preferredMediaSource};
          } else {
            constraints.video.mediaSource = preferredMediaSource;
          }
          return window.navigator.mediaDevices.getUserMedia(constraints);
        };
    }

    /*
     *  Copyright (c) 2016 The WebRTC project authors. All Rights Reserved.
     *
     *  Use of this source code is governed by a BSD-style license
     *  that can be found in the LICENSE file in the root of the source
     *  tree.
     */

    function shimOnTrack(window) {
      if (typeof window === 'object' && window.RTCTrackEvent &&
          ('receiver' in window.RTCTrackEvent.prototype) &&
          !('transceiver' in window.RTCTrackEvent.prototype)) {
        Object.defineProperty(window.RTCTrackEvent.prototype, 'transceiver', {
          get() {
            return {receiver: this.receiver};
          }
        });
      }
    }

    function shimPeerConnection(window, browserDetails) {
      if (typeof window !== 'object' ||
          !(window.RTCPeerConnection || window.mozRTCPeerConnection)) {
        return; // probably media.peerconnection.enabled=false in about:config
      }
      if (!window.RTCPeerConnection && window.mozRTCPeerConnection) {
        // very basic support for old versions.
        window.RTCPeerConnection = window.mozRTCPeerConnection;
      }

      if (browserDetails.version < 53) {
        // shim away need for obsolete RTCIceCandidate/RTCSessionDescription.
        ['setLocalDescription', 'setRemoteDescription', 'addIceCandidate']
            .forEach(function(method) {
              const nativeMethod = window.RTCPeerConnection.prototype[method];
              const methodObj = {[method]() {
                arguments[0] = new ((method === 'addIceCandidate') ?
                    window.RTCIceCandidate :
                    window.RTCSessionDescription)(arguments[0]);
                return nativeMethod.apply(this, arguments);
              }};
              window.RTCPeerConnection.prototype[method] = methodObj[method];
            });
      }

      const modernStatsTypes = {
        inboundrtp: 'inbound-rtp',
        outboundrtp: 'outbound-rtp',
        candidatepair: 'candidate-pair',
        localcandidate: 'local-candidate',
        remotecandidate: 'remote-candidate'
      };

      const nativeGetStats = window.RTCPeerConnection.prototype.getStats;
      window.RTCPeerConnection.prototype.getStats = function getStats() {
        const [selector, onSucc, onErr] = arguments;
        return nativeGetStats.apply(this, [selector || null])
          .then(stats => {
            if (browserDetails.version < 53 && !onSucc) {
              // Shim only promise getStats with spec-hyphens in type names
              // Leave callback version alone; misc old uses of forEach before Map
              try {
                stats.forEach(stat => {
                  stat.type = modernStatsTypes[stat.type] || stat.type;
                });
              } catch (e) {
                if (e.name !== 'TypeError') {
                  throw e;
                }
                // Avoid TypeError: "type" is read-only, in old versions. 34-43ish
                stats.forEach((stat, i) => {
                  stats.set(i, Object.assign({}, stat, {
                    type: modernStatsTypes[stat.type] || stat.type
                  }));
                });
              }
            }
            return stats;
          })
          .then(onSucc, onErr);
      };
    }

    function shimSenderGetStats(window) {
      if (!(typeof window === 'object' && window.RTCPeerConnection &&
          window.RTCRtpSender)) {
        return;
      }
      if (window.RTCRtpSender && 'getStats' in window.RTCRtpSender.prototype) {
        return;
      }
      const origGetSenders = window.RTCPeerConnection.prototype.getSenders;
      if (origGetSenders) {
        window.RTCPeerConnection.prototype.getSenders = function getSenders() {
          const senders = origGetSenders.apply(this, []);
          senders.forEach(sender => sender._pc = this);
          return senders;
        };
      }

      const origAddTrack = window.RTCPeerConnection.prototype.addTrack;
      if (origAddTrack) {
        window.RTCPeerConnection.prototype.addTrack = function addTrack() {
          const sender = origAddTrack.apply(this, arguments);
          sender._pc = this;
          return sender;
        };
      }
      window.RTCRtpSender.prototype.getStats = function getStats() {
        return this.track ? this._pc.getStats(this.track) :
            Promise.resolve(new Map());
      };
    }

    function shimReceiverGetStats(window) {
      if (!(typeof window === 'object' && window.RTCPeerConnection &&
          window.RTCRtpSender)) {
        return;
      }
      if (window.RTCRtpSender && 'getStats' in window.RTCRtpReceiver.prototype) {
        return;
      }
      const origGetReceivers = window.RTCPeerConnection.prototype.getReceivers;
      if (origGetReceivers) {
        window.RTCPeerConnection.prototype.getReceivers = function getReceivers() {
          const receivers = origGetReceivers.apply(this, []);
          receivers.forEach(receiver => receiver._pc = this);
          return receivers;
        };
      }
      wrapPeerConnectionEvent(window, 'track', e => {
        e.receiver._pc = e.srcElement;
        return e;
      });
      window.RTCRtpReceiver.prototype.getStats = function getStats() {
        return this._pc.getStats(this.track);
      };
    }

    function shimRemoveStream(window) {
      if (!window.RTCPeerConnection ||
          'removeStream' in window.RTCPeerConnection.prototype) {
        return;
      }
      window.RTCPeerConnection.prototype.removeStream =
        function removeStream(stream) {
          deprecated('removeStream', 'removeTrack');
          this.getSenders().forEach(sender => {
            if (sender.track && stream.getTracks().includes(sender.track)) {
              this.removeTrack(sender);
            }
          });
        };
    }

    function shimRTCDataChannel(window) {
      // rename DataChannel to RTCDataChannel (native fix in FF60):
      // https://bugzilla.mozilla.org/show_bug.cgi?id=1173851
      if (window.DataChannel && !window.RTCDataChannel) {
        window.RTCDataChannel = window.DataChannel;
      }
    }

    function shimAddTransceiver(window) {
      // https://github.com/webrtcHacks/adapter/issues/998#issuecomment-516921647
      // Firefox ignores the init sendEncodings options passed to addTransceiver
      // https://bugzilla.mozilla.org/show_bug.cgi?id=1396918
      if (!(typeof window === 'object' && window.RTCPeerConnection)) {
        return;
      }
      const origAddTransceiver = window.RTCPeerConnection.prototype.addTransceiver;
      if (origAddTransceiver) {
        window.RTCPeerConnection.prototype.addTransceiver =
          function addTransceiver() {
            this.setParametersPromises = [];
            const initParameters = arguments[1];
            const shouldPerformCheck = initParameters &&
                                      'sendEncodings' in initParameters;
            if (shouldPerformCheck) {
              // If sendEncodings params are provided, validate grammar
              initParameters.sendEncodings.forEach((encodingParam) => {
                if ('rid' in encodingParam) {
                  const ridRegex = /^[a-z0-9]{0,16}$/i;
                  if (!ridRegex.test(encodingParam.rid)) {
                    throw new TypeError('Invalid RID value provided.');
                  }
                }
                if ('scaleResolutionDownBy' in encodingParam) {
                  if (!(parseFloat(encodingParam.scaleResolutionDownBy) >= 1.0)) {
                    throw new RangeError('scale_resolution_down_by must be >= 1.0');
                  }
                }
                if ('maxFramerate' in encodingParam) {
                  if (!(parseFloat(encodingParam.maxFramerate) >= 0)) {
                    throw new RangeError('max_framerate must be >= 0.0');
                  }
                }
              });
            }
            const transceiver = origAddTransceiver.apply(this, arguments);
            if (shouldPerformCheck) {
              // Check if the init options were applied. If not we do this in an
              // asynchronous way and save the promise reference in a global object.
              // This is an ugly hack, but at the same time is way more robust than
              // checking the sender parameters before and after the createOffer
              // Also note that after the createoffer we are not 100% sure that
              // the params were asynchronously applied so we might miss the
              // opportunity to recreate offer.
              const {sender} = transceiver;
              const params = sender.getParameters();
              if (!('encodings' in params) ||
                  // Avoid being fooled by patched getParameters() below.
                  (params.encodings.length === 1 &&
                   Object.keys(params.encodings[0]).length === 0)) {
                params.encodings = initParameters.sendEncodings;
                sender.sendEncodings = initParameters.sendEncodings;
                this.setParametersPromises.push(sender.setParameters(params)
                  .then(() => {
                    delete sender.sendEncodings;
                  }).catch(() => {
                    delete sender.sendEncodings;
                  })
                );
              }
            }
            return transceiver;
          };
      }
    }

    function shimGetParameters(window) {
      if (!(typeof window === 'object' && window.RTCRtpSender)) {
        return;
      }
      const origGetParameters = window.RTCRtpSender.prototype.getParameters;
      if (origGetParameters) {
        window.RTCRtpSender.prototype.getParameters =
          function getParameters() {
            const params = origGetParameters.apply(this, arguments);
            if (!('encodings' in params)) {
              params.encodings = [].concat(this.sendEncodings || [{}]);
            }
            return params;
          };
      }
    }

    function shimCreateOffer(window) {
      // https://github.com/webrtcHacks/adapter/issues/998#issuecomment-516921647
      // Firefox ignores the init sendEncodings options passed to addTransceiver
      // https://bugzilla.mozilla.org/show_bug.cgi?id=1396918
      if (!(typeof window === 'object' && window.RTCPeerConnection)) {
        return;
      }
      const origCreateOffer = window.RTCPeerConnection.prototype.createOffer;
      window.RTCPeerConnection.prototype.createOffer = function createOffer() {
        if (this.setParametersPromises && this.setParametersPromises.length) {
          return Promise.all(this.setParametersPromises)
          .then(() => {
            return origCreateOffer.apply(this, arguments);
          })
          .finally(() => {
            this.setParametersPromises = [];
          });
        }
        return origCreateOffer.apply(this, arguments);
      };
    }

    function shimCreateAnswer(window) {
      // https://github.com/webrtcHacks/adapter/issues/998#issuecomment-516921647
      // Firefox ignores the init sendEncodings options passed to addTransceiver
      // https://bugzilla.mozilla.org/show_bug.cgi?id=1396918
      if (!(typeof window === 'object' && window.RTCPeerConnection)) {
        return;
      }
      const origCreateAnswer = window.RTCPeerConnection.prototype.createAnswer;
      window.RTCPeerConnection.prototype.createAnswer = function createAnswer() {
        if (this.setParametersPromises && this.setParametersPromises.length) {
          return Promise.all(this.setParametersPromises)
          .then(() => {
            return origCreateAnswer.apply(this, arguments);
          })
          .finally(() => {
            this.setParametersPromises = [];
          });
        }
        return origCreateAnswer.apply(this, arguments);
      };
    }

    var firefoxShim = /*#__PURE__*/Object.freeze({
        __proto__: null,
        shimOnTrack: shimOnTrack,
        shimPeerConnection: shimPeerConnection,
        shimSenderGetStats: shimSenderGetStats,
        shimReceiverGetStats: shimReceiverGetStats,
        shimRemoveStream: shimRemoveStream,
        shimRTCDataChannel: shimRTCDataChannel,
        shimAddTransceiver: shimAddTransceiver,
        shimGetParameters: shimGetParameters,
        shimCreateOffer: shimCreateOffer,
        shimCreateAnswer: shimCreateAnswer,
        shimGetUserMedia: shimGetUserMedia$1,
        shimGetDisplayMedia: shimGetDisplayMedia
    });

    /*
     *  Copyright (c) 2016 The WebRTC project authors. All Rights Reserved.
     *
     *  Use of this source code is governed by a BSD-style license
     *  that can be found in the LICENSE file in the root of the source
     *  tree.
     */

    function shimLocalStreamsAPI(window) {
      if (typeof window !== 'object' || !window.RTCPeerConnection) {
        return;
      }
      if (!('getLocalStreams' in window.RTCPeerConnection.prototype)) {
        window.RTCPeerConnection.prototype.getLocalStreams =
          function getLocalStreams() {
            if (!this._localStreams) {
              this._localStreams = [];
            }
            return this._localStreams;
          };
      }
      if (!('addStream' in window.RTCPeerConnection.prototype)) {
        const _addTrack = window.RTCPeerConnection.prototype.addTrack;
        window.RTCPeerConnection.prototype.addStream = function addStream(stream) {
          if (!this._localStreams) {
            this._localStreams = [];
          }
          if (!this._localStreams.includes(stream)) {
            this._localStreams.push(stream);
          }
          // Try to emulate Chrome's behaviour of adding in audio-video order.
          // Safari orders by track id.
          stream.getAudioTracks().forEach(track => _addTrack.call(this, track,
            stream));
          stream.getVideoTracks().forEach(track => _addTrack.call(this, track,
            stream));
        };

        window.RTCPeerConnection.prototype.addTrack =
          function addTrack(track, ...streams) {
            if (streams) {
              streams.forEach((stream) => {
                if (!this._localStreams) {
                  this._localStreams = [stream];
                } else if (!this._localStreams.includes(stream)) {
                  this._localStreams.push(stream);
                }
              });
            }
            return _addTrack.apply(this, arguments);
          };
      }
      if (!('removeStream' in window.RTCPeerConnection.prototype)) {
        window.RTCPeerConnection.prototype.removeStream =
          function removeStream(stream) {
            if (!this._localStreams) {
              this._localStreams = [];
            }
            const index = this._localStreams.indexOf(stream);
            if (index === -1) {
              return;
            }
            this._localStreams.splice(index, 1);
            const tracks = stream.getTracks();
            this.getSenders().forEach(sender => {
              if (tracks.includes(sender.track)) {
                this.removeTrack(sender);
              }
            });
          };
      }
    }

    function shimRemoteStreamsAPI(window) {
      if (typeof window !== 'object' || !window.RTCPeerConnection) {
        return;
      }
      if (!('getRemoteStreams' in window.RTCPeerConnection.prototype)) {
        window.RTCPeerConnection.prototype.getRemoteStreams =
          function getRemoteStreams() {
            return this._remoteStreams ? this._remoteStreams : [];
          };
      }
      if (!('onaddstream' in window.RTCPeerConnection.prototype)) {
        Object.defineProperty(window.RTCPeerConnection.prototype, 'onaddstream', {
          get() {
            return this._onaddstream;
          },
          set(f) {
            if (this._onaddstream) {
              this.removeEventListener('addstream', this._onaddstream);
              this.removeEventListener('track', this._onaddstreampoly);
            }
            this.addEventListener('addstream', this._onaddstream = f);
            this.addEventListener('track', this._onaddstreampoly = (e) => {
              e.streams.forEach(stream => {
                if (!this._remoteStreams) {
                  this._remoteStreams = [];
                }
                if (this._remoteStreams.includes(stream)) {
                  return;
                }
                this._remoteStreams.push(stream);
                const event = new Event('addstream');
                event.stream = stream;
                this.dispatchEvent(event);
              });
            });
          }
        });
        const origSetRemoteDescription =
          window.RTCPeerConnection.prototype.setRemoteDescription;
        window.RTCPeerConnection.prototype.setRemoteDescription =
          function setRemoteDescription() {
            const pc = this;
            if (!this._onaddstreampoly) {
              this.addEventListener('track', this._onaddstreampoly = function(e) {
                e.streams.forEach(stream => {
                  if (!pc._remoteStreams) {
                    pc._remoteStreams = [];
                  }
                  if (pc._remoteStreams.indexOf(stream) >= 0) {
                    return;
                  }
                  pc._remoteStreams.push(stream);
                  const event = new Event('addstream');
                  event.stream = stream;
                  pc.dispatchEvent(event);
                });
              });
            }
            return origSetRemoteDescription.apply(pc, arguments);
          };
      }
    }

    function shimCallbacksAPI(window) {
      if (typeof window !== 'object' || !window.RTCPeerConnection) {
        return;
      }
      const prototype = window.RTCPeerConnection.prototype;
      const origCreateOffer = prototype.createOffer;
      const origCreateAnswer = prototype.createAnswer;
      const setLocalDescription = prototype.setLocalDescription;
      const setRemoteDescription = prototype.setRemoteDescription;
      const addIceCandidate = prototype.addIceCandidate;

      prototype.createOffer =
        function createOffer(successCallback, failureCallback) {
          const options = (arguments.length >= 2) ? arguments[2] : arguments[0];
          const promise = origCreateOffer.apply(this, [options]);
          if (!failureCallback) {
            return promise;
          }
          promise.then(successCallback, failureCallback);
          return Promise.resolve();
        };

      prototype.createAnswer =
        function createAnswer(successCallback, failureCallback) {
          const options = (arguments.length >= 2) ? arguments[2] : arguments[0];
          const promise = origCreateAnswer.apply(this, [options]);
          if (!failureCallback) {
            return promise;
          }
          promise.then(successCallback, failureCallback);
          return Promise.resolve();
        };

      let withCallback = function(description, successCallback, failureCallback) {
        const promise = setLocalDescription.apply(this, [description]);
        if (!failureCallback) {
          return promise;
        }
        promise.then(successCallback, failureCallback);
        return Promise.resolve();
      };
      prototype.setLocalDescription = withCallback;

      withCallback = function(description, successCallback, failureCallback) {
        const promise = setRemoteDescription.apply(this, [description]);
        if (!failureCallback) {
          return promise;
        }
        promise.then(successCallback, failureCallback);
        return Promise.resolve();
      };
      prototype.setRemoteDescription = withCallback;

      withCallback = function(candidate, successCallback, failureCallback) {
        const promise = addIceCandidate.apply(this, [candidate]);
        if (!failureCallback) {
          return promise;
        }
        promise.then(successCallback, failureCallback);
        return Promise.resolve();
      };
      prototype.addIceCandidate = withCallback;
    }

    function shimGetUserMedia(window) {
      const navigator = window && window.navigator;

      if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
        // shim not needed in Safari 12.1
        const mediaDevices = navigator.mediaDevices;
        const _getUserMedia = mediaDevices.getUserMedia.bind(mediaDevices);
        navigator.mediaDevices.getUserMedia = (constraints) => {
          return _getUserMedia(shimConstraints(constraints));
        };
      }

      if (!navigator.getUserMedia && navigator.mediaDevices &&
        navigator.mediaDevices.getUserMedia) {
        navigator.getUserMedia = function getUserMedia(constraints, cb, errcb) {
          navigator.mediaDevices.getUserMedia(constraints)
          .then(cb, errcb);
        }.bind(navigator);
      }
    }

    function shimConstraints(constraints) {
      if (constraints && constraints.video !== undefined) {
        return Object.assign({},
          constraints,
          {video: compactObject(constraints.video)}
        );
      }

      return constraints;
    }

    function shimRTCIceServerUrls(window) {
      if (!window.RTCPeerConnection) {
        return;
      }
      // migrate from non-spec RTCIceServer.url to RTCIceServer.urls
      const OrigPeerConnection = window.RTCPeerConnection;
      window.RTCPeerConnection =
        function RTCPeerConnection(pcConfig, pcConstraints) {
          if (pcConfig && pcConfig.iceServers) {
            const newIceServers = [];
            for (let i = 0; i < pcConfig.iceServers.length; i++) {
              let server = pcConfig.iceServers[i];
              if (!server.hasOwnProperty('urls') &&
                  server.hasOwnProperty('url')) {
                deprecated('RTCIceServer.url', 'RTCIceServer.urls');
                server = JSON.parse(JSON.stringify(server));
                server.urls = server.url;
                delete server.url;
                newIceServers.push(server);
              } else {
                newIceServers.push(pcConfig.iceServers[i]);
              }
            }
            pcConfig.iceServers = newIceServers;
          }
          return new OrigPeerConnection(pcConfig, pcConstraints);
        };
      window.RTCPeerConnection.prototype = OrigPeerConnection.prototype;
      // wrap static methods. Currently just generateCertificate.
      if ('generateCertificate' in OrigPeerConnection) {
        Object.defineProperty(window.RTCPeerConnection, 'generateCertificate', {
          get() {
            return OrigPeerConnection.generateCertificate;
          }
        });
      }
    }

    function shimTrackEventTransceiver(window) {
      // Add event.transceiver member over deprecated event.receiver
      if (typeof window === 'object' && window.RTCTrackEvent &&
          'receiver' in window.RTCTrackEvent.prototype &&
          !('transceiver' in window.RTCTrackEvent.prototype)) {
        Object.defineProperty(window.RTCTrackEvent.prototype, 'transceiver', {
          get() {
            return {receiver: this.receiver};
          }
        });
      }
    }

    function shimCreateOfferLegacy(window) {
      const origCreateOffer = window.RTCPeerConnection.prototype.createOffer;
      window.RTCPeerConnection.prototype.createOffer =
        function createOffer(offerOptions) {
          if (offerOptions) {
            if (typeof offerOptions.offerToReceiveAudio !== 'undefined') {
              // support bit values
              offerOptions.offerToReceiveAudio =
                !!offerOptions.offerToReceiveAudio;
            }
            const audioTransceiver = this.getTransceivers().find(transceiver =>
              transceiver.receiver.track.kind === 'audio');
            if (offerOptions.offerToReceiveAudio === false && audioTransceiver) {
              if (audioTransceiver.direction === 'sendrecv') {
                if (audioTransceiver.setDirection) {
                  audioTransceiver.setDirection('sendonly');
                } else {
                  audioTransceiver.direction = 'sendonly';
                }
              } else if (audioTransceiver.direction === 'recvonly') {
                if (audioTransceiver.setDirection) {
                  audioTransceiver.setDirection('inactive');
                } else {
                  audioTransceiver.direction = 'inactive';
                }
              }
            } else if (offerOptions.offerToReceiveAudio === true &&
                !audioTransceiver) {
              this.addTransceiver('audio');
            }

            if (typeof offerOptions.offerToReceiveVideo !== 'undefined') {
              // support bit values
              offerOptions.offerToReceiveVideo =
                !!offerOptions.offerToReceiveVideo;
            }
            const videoTransceiver = this.getTransceivers().find(transceiver =>
              transceiver.receiver.track.kind === 'video');
            if (offerOptions.offerToReceiveVideo === false && videoTransceiver) {
              if (videoTransceiver.direction === 'sendrecv') {
                if (videoTransceiver.setDirection) {
                  videoTransceiver.setDirection('sendonly');
                } else {
                  videoTransceiver.direction = 'sendonly';
                }
              } else if (videoTransceiver.direction === 'recvonly') {
                if (videoTransceiver.setDirection) {
                  videoTransceiver.setDirection('inactive');
                } else {
                  videoTransceiver.direction = 'inactive';
                }
              }
            } else if (offerOptions.offerToReceiveVideo === true &&
                !videoTransceiver) {
              this.addTransceiver('video');
            }
          }
          return origCreateOffer.apply(this, arguments);
        };
    }

    function shimAudioContext(window) {
      if (typeof window !== 'object' || window.AudioContext) {
        return;
      }
      window.AudioContext = window.webkitAudioContext;
    }

    var safariShim = /*#__PURE__*/Object.freeze({
        __proto__: null,
        shimLocalStreamsAPI: shimLocalStreamsAPI,
        shimRemoteStreamsAPI: shimRemoteStreamsAPI,
        shimCallbacksAPI: shimCallbacksAPI,
        shimGetUserMedia: shimGetUserMedia,
        shimConstraints: shimConstraints,
        shimRTCIceServerUrls: shimRTCIceServerUrls,
        shimTrackEventTransceiver: shimTrackEventTransceiver,
        shimCreateOfferLegacy: shimCreateOfferLegacy,
        shimAudioContext: shimAudioContext
    });

    /* eslint-env node */

    var sdp = createCommonjsModule(function (module) {

    // SDP helpers.
    var SDPUtils = {};

    // Generate an alphanumeric identifier for cname or mids.
    // TODO: use UUIDs instead? https://gist.github.com/jed/982883
    SDPUtils.generateIdentifier = function() {
      return Math.random().toString(36).substr(2, 10);
    };

    // The RTCP CNAME used by all peerconnections from the same JS.
    SDPUtils.localCName = SDPUtils.generateIdentifier();

    // Splits SDP into lines, dealing with both CRLF and LF.
    SDPUtils.splitLines = function(blob) {
      return blob.trim().split('\n').map(function(line) {
        return line.trim();
      });
    };
    // Splits SDP into sessionpart and mediasections. Ensures CRLF.
    SDPUtils.splitSections = function(blob) {
      var parts = blob.split('\nm=');
      return parts.map(function(part, index) {
        return (index > 0 ? 'm=' + part : part).trim() + '\r\n';
      });
    };

    // returns the session description.
    SDPUtils.getDescription = function(blob) {
      var sections = SDPUtils.splitSections(blob);
      return sections && sections[0];
    };

    // returns the individual media sections.
    SDPUtils.getMediaSections = function(blob) {
      var sections = SDPUtils.splitSections(blob);
      sections.shift();
      return sections;
    };

    // Returns lines that start with a certain prefix.
    SDPUtils.matchPrefix = function(blob, prefix) {
      return SDPUtils.splitLines(blob).filter(function(line) {
        return line.indexOf(prefix) === 0;
      });
    };

    // Parses an ICE candidate line. Sample input:
    // candidate:702786350 2 udp 41819902 8.8.8.8 60769 typ relay raddr 8.8.8.8
    // rport 55996"
    SDPUtils.parseCandidate = function(line) {
      var parts;
      // Parse both variants.
      if (line.indexOf('a=candidate:') === 0) {
        parts = line.substring(12).split(' ');
      } else {
        parts = line.substring(10).split(' ');
      }

      var candidate = {
        foundation: parts[0],
        component: parseInt(parts[1], 10),
        protocol: parts[2].toLowerCase(),
        priority: parseInt(parts[3], 10),
        ip: parts[4],
        address: parts[4], // address is an alias for ip.
        port: parseInt(parts[5], 10),
        // skip parts[6] == 'typ'
        type: parts[7]
      };

      for (var i = 8; i < parts.length; i += 2) {
        switch (parts[i]) {
          case 'raddr':
            candidate.relatedAddress = parts[i + 1];
            break;
          case 'rport':
            candidate.relatedPort = parseInt(parts[i + 1], 10);
            break;
          case 'tcptype':
            candidate.tcpType = parts[i + 1];
            break;
          case 'ufrag':
            candidate.ufrag = parts[i + 1]; // for backward compability.
            candidate.usernameFragment = parts[i + 1];
            break;
          default: // extension handling, in particular ufrag
            candidate[parts[i]] = parts[i + 1];
            break;
        }
      }
      return candidate;
    };

    // Translates a candidate object into SDP candidate attribute.
    SDPUtils.writeCandidate = function(candidate) {
      var sdp = [];
      sdp.push(candidate.foundation);
      sdp.push(candidate.component);
      sdp.push(candidate.protocol.toUpperCase());
      sdp.push(candidate.priority);
      sdp.push(candidate.address || candidate.ip);
      sdp.push(candidate.port);

      var type = candidate.type;
      sdp.push('typ');
      sdp.push(type);
      if (type !== 'host' && candidate.relatedAddress &&
          candidate.relatedPort) {
        sdp.push('raddr');
        sdp.push(candidate.relatedAddress);
        sdp.push('rport');
        sdp.push(candidate.relatedPort);
      }
      if (candidate.tcpType && candidate.protocol.toLowerCase() === 'tcp') {
        sdp.push('tcptype');
        sdp.push(candidate.tcpType);
      }
      if (candidate.usernameFragment || candidate.ufrag) {
        sdp.push('ufrag');
        sdp.push(candidate.usernameFragment || candidate.ufrag);
      }
      return 'candidate:' + sdp.join(' ');
    };

    // Parses an ice-options line, returns an array of option tags.
    // a=ice-options:foo bar
    SDPUtils.parseIceOptions = function(line) {
      return line.substr(14).split(' ');
    };

    // Parses an rtpmap line, returns RTCRtpCoddecParameters. Sample input:
    // a=rtpmap:111 opus/48000/2
    SDPUtils.parseRtpMap = function(line) {
      var parts = line.substr(9).split(' ');
      var parsed = {
        payloadType: parseInt(parts.shift(), 10) // was: id
      };

      parts = parts[0].split('/');

      parsed.name = parts[0];
      parsed.clockRate = parseInt(parts[1], 10); // was: clockrate
      parsed.channels = parts.length === 3 ? parseInt(parts[2], 10) : 1;
      // legacy alias, got renamed back to channels in ORTC.
      parsed.numChannels = parsed.channels;
      return parsed;
    };

    // Generate an a=rtpmap line from RTCRtpCodecCapability or
    // RTCRtpCodecParameters.
    SDPUtils.writeRtpMap = function(codec) {
      var pt = codec.payloadType;
      if (codec.preferredPayloadType !== undefined) {
        pt = codec.preferredPayloadType;
      }
      var channels = codec.channels || codec.numChannels || 1;
      return 'a=rtpmap:' + pt + ' ' + codec.name + '/' + codec.clockRate +
          (channels !== 1 ? '/' + channels : '') + '\r\n';
    };

    // Parses an a=extmap line (headerextension from RFC 5285). Sample input:
    // a=extmap:2 urn:ietf:params:rtp-hdrext:toffset
    // a=extmap:2/sendonly urn:ietf:params:rtp-hdrext:toffset
    SDPUtils.parseExtmap = function(line) {
      var parts = line.substr(9).split(' ');
      return {
        id: parseInt(parts[0], 10),
        direction: parts[0].indexOf('/') > 0 ? parts[0].split('/')[1] : 'sendrecv',
        uri: parts[1]
      };
    };

    // Generates a=extmap line from RTCRtpHeaderExtensionParameters or
    // RTCRtpHeaderExtension.
    SDPUtils.writeExtmap = function(headerExtension) {
      return 'a=extmap:' + (headerExtension.id || headerExtension.preferredId) +
          (headerExtension.direction && headerExtension.direction !== 'sendrecv'
            ? '/' + headerExtension.direction
            : '') +
          ' ' + headerExtension.uri + '\r\n';
    };

    // Parses an ftmp line, returns dictionary. Sample input:
    // a=fmtp:96 vbr=on;cng=on
    // Also deals with vbr=on; cng=on
    SDPUtils.parseFmtp = function(line) {
      var parsed = {};
      var kv;
      var parts = line.substr(line.indexOf(' ') + 1).split(';');
      for (var j = 0; j < parts.length; j++) {
        kv = parts[j].trim().split('=');
        parsed[kv[0].trim()] = kv[1];
      }
      return parsed;
    };

    // Generates an a=ftmp line from RTCRtpCodecCapability or RTCRtpCodecParameters.
    SDPUtils.writeFmtp = function(codec) {
      var line = '';
      var pt = codec.payloadType;
      if (codec.preferredPayloadType !== undefined) {
        pt = codec.preferredPayloadType;
      }
      if (codec.parameters && Object.keys(codec.parameters).length) {
        var params = [];
        Object.keys(codec.parameters).forEach(function(param) {
          if (codec.parameters[param]) {
            params.push(param + '=' + codec.parameters[param]);
          } else {
            params.push(param);
          }
        });
        line += 'a=fmtp:' + pt + ' ' + params.join(';') + '\r\n';
      }
      return line;
    };

    // Parses an rtcp-fb line, returns RTCPRtcpFeedback object. Sample input:
    // a=rtcp-fb:98 nack rpsi
    SDPUtils.parseRtcpFb = function(line) {
      var parts = line.substr(line.indexOf(' ') + 1).split(' ');
      return {
        type: parts.shift(),
        parameter: parts.join(' ')
      };
    };
    // Generate a=rtcp-fb lines from RTCRtpCodecCapability or RTCRtpCodecParameters.
    SDPUtils.writeRtcpFb = function(codec) {
      var lines = '';
      var pt = codec.payloadType;
      if (codec.preferredPayloadType !== undefined) {
        pt = codec.preferredPayloadType;
      }
      if (codec.rtcpFeedback && codec.rtcpFeedback.length) {
        // FIXME: special handling for trr-int?
        codec.rtcpFeedback.forEach(function(fb) {
          lines += 'a=rtcp-fb:' + pt + ' ' + fb.type +
          (fb.parameter && fb.parameter.length ? ' ' + fb.parameter : '') +
              '\r\n';
        });
      }
      return lines;
    };

    // Parses an RFC 5576 ssrc media attribute. Sample input:
    // a=ssrc:3735928559 cname:something
    SDPUtils.parseSsrcMedia = function(line) {
      var sp = line.indexOf(' ');
      var parts = {
        ssrc: parseInt(line.substr(7, sp - 7), 10)
      };
      var colon = line.indexOf(':', sp);
      if (colon > -1) {
        parts.attribute = line.substr(sp + 1, colon - sp - 1);
        parts.value = line.substr(colon + 1);
      } else {
        parts.attribute = line.substr(sp + 1);
      }
      return parts;
    };

    SDPUtils.parseSsrcGroup = function(line) {
      var parts = line.substr(13).split(' ');
      return {
        semantics: parts.shift(),
        ssrcs: parts.map(function(ssrc) {
          return parseInt(ssrc, 10);
        })
      };
    };

    // Extracts the MID (RFC 5888) from a media section.
    // returns the MID or undefined if no mid line was found.
    SDPUtils.getMid = function(mediaSection) {
      var mid = SDPUtils.matchPrefix(mediaSection, 'a=mid:')[0];
      if (mid) {
        return mid.substr(6);
      }
    };

    SDPUtils.parseFingerprint = function(line) {
      var parts = line.substr(14).split(' ');
      return {
        algorithm: parts[0].toLowerCase(), // algorithm is case-sensitive in Edge.
        value: parts[1]
      };
    };

    // Extracts DTLS parameters from SDP media section or sessionpart.
    // FIXME: for consistency with other functions this should only
    //   get the fingerprint line as input. See also getIceParameters.
    SDPUtils.getDtlsParameters = function(mediaSection, sessionpart) {
      var lines = SDPUtils.matchPrefix(mediaSection + sessionpart,
        'a=fingerprint:');
      // Note: a=setup line is ignored since we use the 'auto' role.
      // Note2: 'algorithm' is not case sensitive except in Edge.
      return {
        role: 'auto',
        fingerprints: lines.map(SDPUtils.parseFingerprint)
      };
    };

    // Serializes DTLS parameters to SDP.
    SDPUtils.writeDtlsParameters = function(params, setupType) {
      var sdp = 'a=setup:' + setupType + '\r\n';
      params.fingerprints.forEach(function(fp) {
        sdp += 'a=fingerprint:' + fp.algorithm + ' ' + fp.value + '\r\n';
      });
      return sdp;
    };

    // Parses a=crypto lines into
    //   https://rawgit.com/aboba/edgertc/master/msortc-rs4.html#dictionary-rtcsrtpsdesparameters-members
    SDPUtils.parseCryptoLine = function(line) {
      var parts = line.substr(9).split(' ');
      return {
        tag: parseInt(parts[0], 10),
        cryptoSuite: parts[1],
        keyParams: parts[2],
        sessionParams: parts.slice(3),
      };
    };

    SDPUtils.writeCryptoLine = function(parameters) {
      return 'a=crypto:' + parameters.tag + ' ' +
        parameters.cryptoSuite + ' ' +
        (typeof parameters.keyParams === 'object'
          ? SDPUtils.writeCryptoKeyParams(parameters.keyParams)
          : parameters.keyParams) +
        (parameters.sessionParams ? ' ' + parameters.sessionParams.join(' ') : '') +
        '\r\n';
    };

    // Parses the crypto key parameters into
    //   https://rawgit.com/aboba/edgertc/master/msortc-rs4.html#rtcsrtpkeyparam*
    SDPUtils.parseCryptoKeyParams = function(keyParams) {
      if (keyParams.indexOf('inline:') !== 0) {
        return null;
      }
      var parts = keyParams.substr(7).split('|');
      return {
        keyMethod: 'inline',
        keySalt: parts[0],
        lifeTime: parts[1],
        mkiValue: parts[2] ? parts[2].split(':')[0] : undefined,
        mkiLength: parts[2] ? parts[2].split(':')[1] : undefined,
      };
    };

    SDPUtils.writeCryptoKeyParams = function(keyParams) {
      return keyParams.keyMethod + ':'
        + keyParams.keySalt +
        (keyParams.lifeTime ? '|' + keyParams.lifeTime : '') +
        (keyParams.mkiValue && keyParams.mkiLength
          ? '|' + keyParams.mkiValue + ':' + keyParams.mkiLength
          : '');
    };

    // Extracts all SDES paramters.
    SDPUtils.getCryptoParameters = function(mediaSection, sessionpart) {
      var lines = SDPUtils.matchPrefix(mediaSection + sessionpart,
        'a=crypto:');
      return lines.map(SDPUtils.parseCryptoLine);
    };

    // Parses ICE information from SDP media section or sessionpart.
    // FIXME: for consistency with other functions this should only
    //   get the ice-ufrag and ice-pwd lines as input.
    SDPUtils.getIceParameters = function(mediaSection, sessionpart) {
      var ufrag = SDPUtils.matchPrefix(mediaSection + sessionpart,
        'a=ice-ufrag:')[0];
      var pwd = SDPUtils.matchPrefix(mediaSection + sessionpart,
        'a=ice-pwd:')[0];
      if (!(ufrag && pwd)) {
        return null;
      }
      return {
        usernameFragment: ufrag.substr(12),
        password: pwd.substr(10),
      };
    };

    // Serializes ICE parameters to SDP.
    SDPUtils.writeIceParameters = function(params) {
      return 'a=ice-ufrag:' + params.usernameFragment + '\r\n' +
          'a=ice-pwd:' + params.password + '\r\n';
    };

    // Parses the SDP media section and returns RTCRtpParameters.
    SDPUtils.parseRtpParameters = function(mediaSection) {
      var description = {
        codecs: [],
        headerExtensions: [],
        fecMechanisms: [],
        rtcp: []
      };
      var lines = SDPUtils.splitLines(mediaSection);
      var mline = lines[0].split(' ');
      for (var i = 3; i < mline.length; i++) { // find all codecs from mline[3..]
        var pt = mline[i];
        var rtpmapline = SDPUtils.matchPrefix(
          mediaSection, 'a=rtpmap:' + pt + ' ')[0];
        if (rtpmapline) {
          var codec = SDPUtils.parseRtpMap(rtpmapline);
          var fmtps = SDPUtils.matchPrefix(
            mediaSection, 'a=fmtp:' + pt + ' ');
          // Only the first a=fmtp:<pt> is considered.
          codec.parameters = fmtps.length ? SDPUtils.parseFmtp(fmtps[0]) : {};
          codec.rtcpFeedback = SDPUtils.matchPrefix(
            mediaSection, 'a=rtcp-fb:' + pt + ' ')
            .map(SDPUtils.parseRtcpFb);
          description.codecs.push(codec);
          // parse FEC mechanisms from rtpmap lines.
          switch (codec.name.toUpperCase()) {
            case 'RED':
            case 'ULPFEC':
              description.fecMechanisms.push(codec.name.toUpperCase());
              break;
          }
        }
      }
      SDPUtils.matchPrefix(mediaSection, 'a=extmap:').forEach(function(line) {
        description.headerExtensions.push(SDPUtils.parseExtmap(line));
      });
      // FIXME: parse rtcp.
      return description;
    };

    // Generates parts of the SDP media section describing the capabilities /
    // parameters.
    SDPUtils.writeRtpDescription = function(kind, caps) {
      var sdp = '';

      // Build the mline.
      sdp += 'm=' + kind + ' ';
      sdp += caps.codecs.length > 0 ? '9' : '0'; // reject if no codecs.
      sdp += ' UDP/TLS/RTP/SAVPF ';
      sdp += caps.codecs.map(function(codec) {
        if (codec.preferredPayloadType !== undefined) {
          return codec.preferredPayloadType;
        }
        return codec.payloadType;
      }).join(' ') + '\r\n';

      sdp += 'c=IN IP4 0.0.0.0\r\n';
      sdp += 'a=rtcp:9 IN IP4 0.0.0.0\r\n';

      // Add a=rtpmap lines for each codec. Also fmtp and rtcp-fb.
      caps.codecs.forEach(function(codec) {
        sdp += SDPUtils.writeRtpMap(codec);
        sdp += SDPUtils.writeFmtp(codec);
        sdp += SDPUtils.writeRtcpFb(codec);
      });
      var maxptime = 0;
      caps.codecs.forEach(function(codec) {
        if (codec.maxptime > maxptime) {
          maxptime = codec.maxptime;
        }
      });
      if (maxptime > 0) {
        sdp += 'a=maxptime:' + maxptime + '\r\n';
      }
      sdp += 'a=rtcp-mux\r\n';

      if (caps.headerExtensions) {
        caps.headerExtensions.forEach(function(extension) {
          sdp += SDPUtils.writeExtmap(extension);
        });
      }
      // FIXME: write fecMechanisms.
      return sdp;
    };

    // Parses the SDP media section and returns an array of
    // RTCRtpEncodingParameters.
    SDPUtils.parseRtpEncodingParameters = function(mediaSection) {
      var encodingParameters = [];
      var description = SDPUtils.parseRtpParameters(mediaSection);
      var hasRed = description.fecMechanisms.indexOf('RED') !== -1;
      var hasUlpfec = description.fecMechanisms.indexOf('ULPFEC') !== -1;

      // filter a=ssrc:... cname:, ignore PlanB-msid
      var ssrcs = SDPUtils.matchPrefix(mediaSection, 'a=ssrc:')
        .map(function(line) {
          return SDPUtils.parseSsrcMedia(line);
        })
        .filter(function(parts) {
          return parts.attribute === 'cname';
        });
      var primarySsrc = ssrcs.length > 0 && ssrcs[0].ssrc;
      var secondarySsrc;

      var flows = SDPUtils.matchPrefix(mediaSection, 'a=ssrc-group:FID')
        .map(function(line) {
          var parts = line.substr(17).split(' ');
          return parts.map(function(part) {
            return parseInt(part, 10);
          });
        });
      if (flows.length > 0 && flows[0].length > 1 && flows[0][0] === primarySsrc) {
        secondarySsrc = flows[0][1];
      }

      description.codecs.forEach(function(codec) {
        if (codec.name.toUpperCase() === 'RTX' && codec.parameters.apt) {
          var encParam = {
            ssrc: primarySsrc,
            codecPayloadType: parseInt(codec.parameters.apt, 10)
          };
          if (primarySsrc && secondarySsrc) {
            encParam.rtx = {ssrc: secondarySsrc};
          }
          encodingParameters.push(encParam);
          if (hasRed) {
            encParam = JSON.parse(JSON.stringify(encParam));
            encParam.fec = {
              ssrc: primarySsrc,
              mechanism: hasUlpfec ? 'red+ulpfec' : 'red'
            };
            encodingParameters.push(encParam);
          }
        }
      });
      if (encodingParameters.length === 0 && primarySsrc) {
        encodingParameters.push({
          ssrc: primarySsrc
        });
      }

      // we support both b=AS and b=TIAS but interpret AS as TIAS.
      var bandwidth = SDPUtils.matchPrefix(mediaSection, 'b=');
      if (bandwidth.length) {
        if (bandwidth[0].indexOf('b=TIAS:') === 0) {
          bandwidth = parseInt(bandwidth[0].substr(7), 10);
        } else if (bandwidth[0].indexOf('b=AS:') === 0) {
          // use formula from JSEP to convert b=AS to TIAS value.
          bandwidth = parseInt(bandwidth[0].substr(5), 10) * 1000 * 0.95
              - (50 * 40 * 8);
        } else {
          bandwidth = undefined;
        }
        encodingParameters.forEach(function(params) {
          params.maxBitrate = bandwidth;
        });
      }
      return encodingParameters;
    };

    // parses http://draft.ortc.org/#rtcrtcpparameters*
    SDPUtils.parseRtcpParameters = function(mediaSection) {
      var rtcpParameters = {};

      // Gets the first SSRC. Note tha with RTX there might be multiple
      // SSRCs.
      var remoteSsrc = SDPUtils.matchPrefix(mediaSection, 'a=ssrc:')
        .map(function(line) {
          return SDPUtils.parseSsrcMedia(line);
        })
        .filter(function(obj) {
          return obj.attribute === 'cname';
        })[0];
      if (remoteSsrc) {
        rtcpParameters.cname = remoteSsrc.value;
        rtcpParameters.ssrc = remoteSsrc.ssrc;
      }

      // Edge uses the compound attribute instead of reducedSize
      // compound is !reducedSize
      var rsize = SDPUtils.matchPrefix(mediaSection, 'a=rtcp-rsize');
      rtcpParameters.reducedSize = rsize.length > 0;
      rtcpParameters.compound = rsize.length === 0;

      // parses the rtcp-mux attrіbute.
      // Note that Edge does not support unmuxed RTCP.
      var mux = SDPUtils.matchPrefix(mediaSection, 'a=rtcp-mux');
      rtcpParameters.mux = mux.length > 0;

      return rtcpParameters;
    };

    // parses either a=msid: or a=ssrc:... msid lines and returns
    // the id of the MediaStream and MediaStreamTrack.
    SDPUtils.parseMsid = function(mediaSection) {
      var parts;
      var spec = SDPUtils.matchPrefix(mediaSection, 'a=msid:');
      if (spec.length === 1) {
        parts = spec[0].substr(7).split(' ');
        return {stream: parts[0], track: parts[1]};
      }
      var planB = SDPUtils.matchPrefix(mediaSection, 'a=ssrc:')
        .map(function(line) {
          return SDPUtils.parseSsrcMedia(line);
        })
        .filter(function(msidParts) {
          return msidParts.attribute === 'msid';
        });
      if (planB.length > 0) {
        parts = planB[0].value.split(' ');
        return {stream: parts[0], track: parts[1]};
      }
    };

    // SCTP
    // parses draft-ietf-mmusic-sctp-sdp-26 first and falls back
    // to draft-ietf-mmusic-sctp-sdp-05
    SDPUtils.parseSctpDescription = function(mediaSection) {
      var mline = SDPUtils.parseMLine(mediaSection);
      var maxSizeLine = SDPUtils.matchPrefix(mediaSection, 'a=max-message-size:');
      var maxMessageSize;
      if (maxSizeLine.length > 0) {
        maxMessageSize = parseInt(maxSizeLine[0].substr(19), 10);
      }
      if (isNaN(maxMessageSize)) {
        maxMessageSize = 65536;
      }
      var sctpPort = SDPUtils.matchPrefix(mediaSection, 'a=sctp-port:');
      if (sctpPort.length > 0) {
        return {
          port: parseInt(sctpPort[0].substr(12), 10),
          protocol: mline.fmt,
          maxMessageSize: maxMessageSize
        };
      }
      var sctpMapLines = SDPUtils.matchPrefix(mediaSection, 'a=sctpmap:');
      if (sctpMapLines.length > 0) {
        var parts = SDPUtils.matchPrefix(mediaSection, 'a=sctpmap:')[0]
          .substr(10)
          .split(' ');
        return {
          port: parseInt(parts[0], 10),
          protocol: parts[1],
          maxMessageSize: maxMessageSize
        };
      }
    };

    // SCTP
    // outputs the draft-ietf-mmusic-sctp-sdp-26 version that all browsers
    // support by now receiving in this format, unless we originally parsed
    // as the draft-ietf-mmusic-sctp-sdp-05 format (indicated by the m-line
    // protocol of DTLS/SCTP -- without UDP/ or TCP/)
    SDPUtils.writeSctpDescription = function(media, sctp) {
      var output = [];
      if (media.protocol !== 'DTLS/SCTP') {
        output = [
          'm=' + media.kind + ' 9 ' + media.protocol + ' ' + sctp.protocol + '\r\n',
          'c=IN IP4 0.0.0.0\r\n',
          'a=sctp-port:' + sctp.port + '\r\n'
        ];
      } else {
        output = [
          'm=' + media.kind + ' 9 ' + media.protocol + ' ' + sctp.port + '\r\n',
          'c=IN IP4 0.0.0.0\r\n',
          'a=sctpmap:' + sctp.port + ' ' + sctp.protocol + ' 65535\r\n'
        ];
      }
      if (sctp.maxMessageSize !== undefined) {
        output.push('a=max-message-size:' + sctp.maxMessageSize + '\r\n');
      }
      return output.join('');
    };

    // Generate a session ID for SDP.
    // https://tools.ietf.org/html/draft-ietf-rtcweb-jsep-20#section-5.2.1
    // recommends using a cryptographically random +ve 64-bit value
    // but right now this should be acceptable and within the right range
    SDPUtils.generateSessionId = function() {
      return Math.random().toString().substr(2, 21);
    };

    // Write boilder plate for start of SDP
    // sessId argument is optional - if not supplied it will
    // be generated randomly
    // sessVersion is optional and defaults to 2
    // sessUser is optional and defaults to 'thisisadapterortc'
    SDPUtils.writeSessionBoilerplate = function(sessId, sessVer, sessUser) {
      var sessionId;
      var version = sessVer !== undefined ? sessVer : 2;
      if (sessId) {
        sessionId = sessId;
      } else {
        sessionId = SDPUtils.generateSessionId();
      }
      var user = sessUser || 'thisisadapterortc';
      // FIXME: sess-id should be an NTP timestamp.
      return 'v=0\r\n' +
          'o=' + user + ' ' + sessionId + ' ' + version +
            ' IN IP4 127.0.0.1\r\n' +
          's=-\r\n' +
          't=0 0\r\n';
    };

    SDPUtils.writeMediaSection = function(transceiver, caps, type, stream) {
      var sdp = SDPUtils.writeRtpDescription(transceiver.kind, caps);

      // Map ICE parameters (ufrag, pwd) to SDP.
      sdp += SDPUtils.writeIceParameters(
        transceiver.iceGatherer.getLocalParameters());

      // Map DTLS parameters to SDP.
      sdp += SDPUtils.writeDtlsParameters(
        transceiver.dtlsTransport.getLocalParameters(),
        type === 'offer' ? 'actpass' : 'active');

      sdp += 'a=mid:' + transceiver.mid + '\r\n';

      if (transceiver.direction) {
        sdp += 'a=' + transceiver.direction + '\r\n';
      } else if (transceiver.rtpSender && transceiver.rtpReceiver) {
        sdp += 'a=sendrecv\r\n';
      } else if (transceiver.rtpSender) {
        sdp += 'a=sendonly\r\n';
      } else if (transceiver.rtpReceiver) {
        sdp += 'a=recvonly\r\n';
      } else {
        sdp += 'a=inactive\r\n';
      }

      if (transceiver.rtpSender) {
        // spec.
        var msid = 'msid:' + stream.id + ' ' +
            transceiver.rtpSender.track.id + '\r\n';
        sdp += 'a=' + msid;

        // for Chrome.
        sdp += 'a=ssrc:' + transceiver.sendEncodingParameters[0].ssrc +
            ' ' + msid;
        if (transceiver.sendEncodingParameters[0].rtx) {
          sdp += 'a=ssrc:' + transceiver.sendEncodingParameters[0].rtx.ssrc +
              ' ' + msid;
          sdp += 'a=ssrc-group:FID ' +
              transceiver.sendEncodingParameters[0].ssrc + ' ' +
              transceiver.sendEncodingParameters[0].rtx.ssrc +
              '\r\n';
        }
      }
      // FIXME: this should be written by writeRtpDescription.
      sdp += 'a=ssrc:' + transceiver.sendEncodingParameters[0].ssrc +
          ' cname:' + SDPUtils.localCName + '\r\n';
      if (transceiver.rtpSender && transceiver.sendEncodingParameters[0].rtx) {
        sdp += 'a=ssrc:' + transceiver.sendEncodingParameters[0].rtx.ssrc +
            ' cname:' + SDPUtils.localCName + '\r\n';
      }
      return sdp;
    };

    // Gets the direction from the mediaSection or the sessionpart.
    SDPUtils.getDirection = function(mediaSection, sessionpart) {
      // Look for sendrecv, sendonly, recvonly, inactive, default to sendrecv.
      var lines = SDPUtils.splitLines(mediaSection);
      for (var i = 0; i < lines.length; i++) {
        switch (lines[i]) {
          case 'a=sendrecv':
          case 'a=sendonly':
          case 'a=recvonly':
          case 'a=inactive':
            return lines[i].substr(2);
            // FIXME: What should happen here?
        }
      }
      if (sessionpart) {
        return SDPUtils.getDirection(sessionpart);
      }
      return 'sendrecv';
    };

    SDPUtils.getKind = function(mediaSection) {
      var lines = SDPUtils.splitLines(mediaSection);
      var mline = lines[0].split(' ');
      return mline[0].substr(2);
    };

    SDPUtils.isRejected = function(mediaSection) {
      return mediaSection.split(' ', 2)[1] === '0';
    };

    SDPUtils.parseMLine = function(mediaSection) {
      var lines = SDPUtils.splitLines(mediaSection);
      var parts = lines[0].substr(2).split(' ');
      return {
        kind: parts[0],
        port: parseInt(parts[1], 10),
        protocol: parts[2],
        fmt: parts.slice(3).join(' ')
      };
    };

    SDPUtils.parseOLine = function(mediaSection) {
      var line = SDPUtils.matchPrefix(mediaSection, 'o=')[0];
      var parts = line.substr(2).split(' ');
      return {
        username: parts[0],
        sessionId: parts[1],
        sessionVersion: parseInt(parts[2], 10),
        netType: parts[3],
        addressType: parts[4],
        address: parts[5]
      };
    };

    // a very naive interpretation of a valid SDP.
    SDPUtils.isValidSDP = function(blob) {
      if (typeof blob !== 'string' || blob.length === 0) {
        return false;
      }
      var lines = SDPUtils.splitLines(blob);
      for (var i = 0; i < lines.length; i++) {
        if (lines[i].length < 2 || lines[i].charAt(1) !== '=') {
          return false;
        }
        // TODO: check the modifier a bit more.
      }
      return true;
    };

    // Expose public methods.
    {
      module.exports = SDPUtils;
    }
    });

    /*
     *  Copyright (c) 2017 The WebRTC project authors. All Rights Reserved.
     *
     *  Use of this source code is governed by a BSD-style license
     *  that can be found in the LICENSE file in the root of the source
     *  tree.
     */

    function shimRTCIceCandidate(window) {
      // foundation is arbitrarily chosen as an indicator for full support for
      // https://w3c.github.io/webrtc-pc/#rtcicecandidate-interface
      if (!window.RTCIceCandidate || (window.RTCIceCandidate && 'foundation' in
          window.RTCIceCandidate.prototype)) {
        return;
      }

      const NativeRTCIceCandidate = window.RTCIceCandidate;
      window.RTCIceCandidate = function RTCIceCandidate(args) {
        // Remove the a= which shouldn't be part of the candidate string.
        if (typeof args === 'object' && args.candidate &&
            args.candidate.indexOf('a=') === 0) {
          args = JSON.parse(JSON.stringify(args));
          args.candidate = args.candidate.substr(2);
        }

        if (args.candidate && args.candidate.length) {
          // Augment the native candidate with the parsed fields.
          const nativeCandidate = new NativeRTCIceCandidate(args);
          const parsedCandidate = sdp.parseCandidate(args.candidate);
          const augmentedCandidate = Object.assign(nativeCandidate,
              parsedCandidate);

          // Add a serializer that does not serialize the extra attributes.
          augmentedCandidate.toJSON = function toJSON() {
            return {
              candidate: augmentedCandidate.candidate,
              sdpMid: augmentedCandidate.sdpMid,
              sdpMLineIndex: augmentedCandidate.sdpMLineIndex,
              usernameFragment: augmentedCandidate.usernameFragment,
            };
          };
          return augmentedCandidate;
        }
        return new NativeRTCIceCandidate(args);
      };
      window.RTCIceCandidate.prototype = NativeRTCIceCandidate.prototype;

      // Hook up the augmented candidate in onicecandidate and
      // addEventListener('icecandidate', ...)
      wrapPeerConnectionEvent(window, 'icecandidate', e => {
        if (e.candidate) {
          Object.defineProperty(e, 'candidate', {
            value: new window.RTCIceCandidate(e.candidate),
            writable: 'false'
          });
        }
        return e;
      });
    }

    function shimMaxMessageSize(window, browserDetails) {
      if (!window.RTCPeerConnection) {
        return;
      }

      if (!('sctp' in window.RTCPeerConnection.prototype)) {
        Object.defineProperty(window.RTCPeerConnection.prototype, 'sctp', {
          get() {
            return typeof this._sctp === 'undefined' ? null : this._sctp;
          }
        });
      }

      const sctpInDescription = function(description) {
        if (!description || !description.sdp) {
          return false;
        }
        const sections = sdp.splitSections(description.sdp);
        sections.shift();
        return sections.some(mediaSection => {
          const mLine = sdp.parseMLine(mediaSection);
          return mLine && mLine.kind === 'application'
              && mLine.protocol.indexOf('SCTP') !== -1;
        });
      };

      const getRemoteFirefoxVersion = function(description) {
        // TODO: Is there a better solution for detecting Firefox?
        const match = description.sdp.match(/mozilla...THIS_IS_SDPARTA-(\d+)/);
        if (match === null || match.length < 2) {
          return -1;
        }
        const version = parseInt(match[1], 10);
        // Test for NaN (yes, this is ugly)
        return version !== version ? -1 : version;
      };

      const getCanSendMaxMessageSize = function(remoteIsFirefox) {
        // Every implementation we know can send at least 64 KiB.
        // Note: Although Chrome is technically able to send up to 256 KiB, the
        //       data does not reach the other peer reliably.
        //       See: https://bugs.chromium.org/p/webrtc/issues/detail?id=8419
        let canSendMaxMessageSize = 65536;
        if (browserDetails.browser === 'firefox') {
          if (browserDetails.version < 57) {
            if (remoteIsFirefox === -1) {
              // FF < 57 will send in 16 KiB chunks using the deprecated PPID
              // fragmentation.
              canSendMaxMessageSize = 16384;
            } else {
              // However, other FF (and RAWRTC) can reassemble PPID-fragmented
              // messages. Thus, supporting ~2 GiB when sending.
              canSendMaxMessageSize = 2147483637;
            }
          } else if (browserDetails.version < 60) {
            // Currently, all FF >= 57 will reset the remote maximum message size
            // to the default value when a data channel is created at a later
            // stage. :(
            // See: https://bugzilla.mozilla.org/show_bug.cgi?id=1426831
            canSendMaxMessageSize =
              browserDetails.version === 57 ? 65535 : 65536;
          } else {
            // FF >= 60 supports sending ~2 GiB
            canSendMaxMessageSize = 2147483637;
          }
        }
        return canSendMaxMessageSize;
      };

      const getMaxMessageSize = function(description, remoteIsFirefox) {
        // Note: 65536 bytes is the default value from the SDP spec. Also,
        //       every implementation we know supports receiving 65536 bytes.
        let maxMessageSize = 65536;

        // FF 57 has a slightly incorrect default remote max message size, so
        // we need to adjust it here to avoid a failure when sending.
        // See: https://bugzilla.mozilla.org/show_bug.cgi?id=1425697
        if (browserDetails.browser === 'firefox'
             && browserDetails.version === 57) {
          maxMessageSize = 65535;
        }

        const match = sdp.matchPrefix(description.sdp,
          'a=max-message-size:');
        if (match.length > 0) {
          maxMessageSize = parseInt(match[0].substr(19), 10);
        } else if (browserDetails.browser === 'firefox' &&
                    remoteIsFirefox !== -1) {
          // If the maximum message size is not present in the remote SDP and
          // both local and remote are Firefox, the remote peer can receive
          // ~2 GiB.
          maxMessageSize = 2147483637;
        }
        return maxMessageSize;
      };

      const origSetRemoteDescription =
          window.RTCPeerConnection.prototype.setRemoteDescription;
      window.RTCPeerConnection.prototype.setRemoteDescription =
        function setRemoteDescription() {
          this._sctp = null;
          // Chrome decided to not expose .sctp in plan-b mode.
          // As usual, adapter.js has to do an 'ugly worakaround'
          // to cover up the mess.
          if (browserDetails.browser === 'chrome' && browserDetails.version >= 76) {
            const {sdpSemantics} = this.getConfiguration();
            if (sdpSemantics === 'plan-b') {
              Object.defineProperty(this, 'sctp', {
                get() {
                  return typeof this._sctp === 'undefined' ? null : this._sctp;
                },
                enumerable: true,
                configurable: true,
              });
            }
          }

          if (sctpInDescription(arguments[0])) {
            // Check if the remote is FF.
            const isFirefox = getRemoteFirefoxVersion(arguments[0]);

            // Get the maximum message size the local peer is capable of sending
            const canSendMMS = getCanSendMaxMessageSize(isFirefox);

            // Get the maximum message size of the remote peer.
            const remoteMMS = getMaxMessageSize(arguments[0], isFirefox);

            // Determine final maximum message size
            let maxMessageSize;
            if (canSendMMS === 0 && remoteMMS === 0) {
              maxMessageSize = Number.POSITIVE_INFINITY;
            } else if (canSendMMS === 0 || remoteMMS === 0) {
              maxMessageSize = Math.max(canSendMMS, remoteMMS);
            } else {
              maxMessageSize = Math.min(canSendMMS, remoteMMS);
            }

            // Create a dummy RTCSctpTransport object and the 'maxMessageSize'
            // attribute.
            const sctp = {};
            Object.defineProperty(sctp, 'maxMessageSize', {
              get() {
                return maxMessageSize;
              }
            });
            this._sctp = sctp;
          }

          return origSetRemoteDescription.apply(this, arguments);
        };
    }

    function shimSendThrowTypeError(window) {
      if (!(window.RTCPeerConnection &&
          'createDataChannel' in window.RTCPeerConnection.prototype)) {
        return;
      }

      // Note: Although Firefox >= 57 has a native implementation, the maximum
      //       message size can be reset for all data channels at a later stage.
      //       See: https://bugzilla.mozilla.org/show_bug.cgi?id=1426831

      function wrapDcSend(dc, pc) {
        const origDataChannelSend = dc.send;
        dc.send = function send() {
          const data = arguments[0];
          const length = data.length || data.size || data.byteLength;
          if (dc.readyState === 'open' &&
              pc.sctp && length > pc.sctp.maxMessageSize) {
            throw new TypeError('Message too large (can send a maximum of ' +
              pc.sctp.maxMessageSize + ' bytes)');
          }
          return origDataChannelSend.apply(dc, arguments);
        };
      }
      const origCreateDataChannel =
        window.RTCPeerConnection.prototype.createDataChannel;
      window.RTCPeerConnection.prototype.createDataChannel =
        function createDataChannel() {
          const dataChannel = origCreateDataChannel.apply(this, arguments);
          wrapDcSend(dataChannel, this);
          return dataChannel;
        };
      wrapPeerConnectionEvent(window, 'datachannel', e => {
        wrapDcSend(e.channel, e.target);
        return e;
      });
    }


    /* shims RTCConnectionState by pretending it is the same as iceConnectionState.
     * See https://bugs.chromium.org/p/webrtc/issues/detail?id=6145#c12
     * for why this is a valid hack in Chrome. In Firefox it is slightly incorrect
     * since DTLS failures would be hidden. See
     * https://bugzilla.mozilla.org/show_bug.cgi?id=1265827
     * for the Firefox tracking bug.
     */
    function shimConnectionState(window) {
      if (!window.RTCPeerConnection ||
          'connectionState' in window.RTCPeerConnection.prototype) {
        return;
      }
      const proto = window.RTCPeerConnection.prototype;
      Object.defineProperty(proto, 'connectionState', {
        get() {
          return {
            completed: 'connected',
            checking: 'connecting'
          }[this.iceConnectionState] || this.iceConnectionState;
        },
        enumerable: true,
        configurable: true
      });
      Object.defineProperty(proto, 'onconnectionstatechange', {
        get() {
          return this._onconnectionstatechange || null;
        },
        set(cb) {
          if (this._onconnectionstatechange) {
            this.removeEventListener('connectionstatechange',
                this._onconnectionstatechange);
            delete this._onconnectionstatechange;
          }
          if (cb) {
            this.addEventListener('connectionstatechange',
                this._onconnectionstatechange = cb);
          }
        },
        enumerable: true,
        configurable: true
      });

      ['setLocalDescription', 'setRemoteDescription'].forEach((method) => {
        const origMethod = proto[method];
        proto[method] = function() {
          if (!this._connectionstatechangepoly) {
            this._connectionstatechangepoly = e => {
              const pc = e.target;
              if (pc._lastConnectionState !== pc.connectionState) {
                pc._lastConnectionState = pc.connectionState;
                const newEvent = new Event('connectionstatechange', e);
                pc.dispatchEvent(newEvent);
              }
              return e;
            };
            this.addEventListener('iceconnectionstatechange',
              this._connectionstatechangepoly);
          }
          return origMethod.apply(this, arguments);
        };
      });
    }

    function removeExtmapAllowMixed(window, browserDetails) {
      /* remove a=extmap-allow-mixed for webrtc.org < M71 */
      if (!window.RTCPeerConnection) {
        return;
      }
      if (browserDetails.browser === 'chrome' && browserDetails.version >= 71) {
        return;
      }
      if (browserDetails.browser === 'safari' && browserDetails.version >= 605) {
        return;
      }
      const nativeSRD = window.RTCPeerConnection.prototype.setRemoteDescription;
      window.RTCPeerConnection.prototype.setRemoteDescription =
      function setRemoteDescription(desc) {
        if (desc && desc.sdp && desc.sdp.indexOf('\na=extmap-allow-mixed') !== -1) {
          const sdp = desc.sdp.split('\n').filter((line) => {
            return line.trim() !== 'a=extmap-allow-mixed';
          }).join('\n');
          // Safari enforces read-only-ness of RTCSessionDescription fields.
          if (window.RTCSessionDescription &&
              desc instanceof window.RTCSessionDescription) {
            arguments[0] = new window.RTCSessionDescription({
              type: desc.type,
              sdp,
            });
          } else {
            desc.sdp = sdp;
          }
        }
        return nativeSRD.apply(this, arguments);
      };
    }

    function shimAddIceCandidateNullOrEmpty(window, browserDetails) {
      // Support for addIceCandidate(null or undefined)
      // as well as addIceCandidate({candidate: "", ...})
      // https://bugs.chromium.org/p/chromium/issues/detail?id=978582
      // Note: must be called before other polyfills which change the signature.
      if (!(window.RTCPeerConnection && window.RTCPeerConnection.prototype)) {
        return;
      }
      const nativeAddIceCandidate =
          window.RTCPeerConnection.prototype.addIceCandidate;
      if (!nativeAddIceCandidate || nativeAddIceCandidate.length === 0) {
        return;
      }
      window.RTCPeerConnection.prototype.addIceCandidate =
        function addIceCandidate() {
          if (!arguments[0]) {
            if (arguments[1]) {
              arguments[1].apply(null);
            }
            return Promise.resolve();
          }
          // Firefox 68+ emits and processes {candidate: "", ...}, ignore
          // in older versions.
          // Native support for ignoring exists for Chrome M77+.
          // Safari ignores as well, exact version unknown but works in the same
          // version that also ignores addIceCandidate(null).
          if (((browserDetails.browser === 'chrome' && browserDetails.version < 78)
               || (browserDetails.browser === 'firefox'
                   && browserDetails.version < 68)
               || (browserDetails.browser === 'safari'))
              && arguments[0] && arguments[0].candidate === '') {
            return Promise.resolve();
          }
          return nativeAddIceCandidate.apply(this, arguments);
        };
    }

    var commonShim = /*#__PURE__*/Object.freeze({
        __proto__: null,
        shimRTCIceCandidate: shimRTCIceCandidate,
        shimMaxMessageSize: shimMaxMessageSize,
        shimSendThrowTypeError: shimSendThrowTypeError,
        shimConnectionState: shimConnectionState,
        removeExtmapAllowMixed: removeExtmapAllowMixed,
        shimAddIceCandidateNullOrEmpty: shimAddIceCandidateNullOrEmpty
    });

    /*
     *  Copyright (c) 2016 The WebRTC project authors. All Rights Reserved.
     *
     *  Use of this source code is governed by a BSD-style license
     *  that can be found in the LICENSE file in the root of the source
     *  tree.
     */

    // Shimming starts here.
    function adapterFactory({window} = {}, options = {
      shimChrome: true,
      shimFirefox: true,
      shimEdge: true,
      shimSafari: true,
    }) {
      // Utils.
      const logging = log;
      const browserDetails = detectBrowser(window);

      const adapter = {
        browserDetails,
        commonShim,
        extractVersion: extractVersion,
        disableLog: disableLog,
        disableWarnings: disableWarnings
      };

      // Shim browser if found.
      switch (browserDetails.browser) {
        case 'chrome':
          if (!chromeShim || !shimPeerConnection$2 ||
              !options.shimChrome) {
            logging('Chrome shim is not included in this adapter release.');
            return adapter;
          }
          if (browserDetails.version === null) {
            logging('Chrome shim can not determine version, not shimming.');
            return adapter;
          }
          logging('adapter.js shimming chrome.');
          // Export to the adapter global object visible in the browser.
          adapter.browserShim = chromeShim;

          // Must be called before shimPeerConnection.
          shimAddIceCandidateNullOrEmpty(window, browserDetails);

          shimGetUserMedia$3(window, browserDetails);
          shimMediaStream(window);
          shimPeerConnection$2(window, browserDetails);
          shimOnTrack$1(window);
          shimAddTrackRemoveTrack(window, browserDetails);
          shimGetSendersWithDtmf(window);
          shimGetStats(window);
          shimSenderReceiverGetStats(window);
          fixNegotiationNeeded(window, browserDetails);

          shimRTCIceCandidate(window);
          shimConnectionState(window);
          shimMaxMessageSize(window, browserDetails);
          shimSendThrowTypeError(window);
          removeExtmapAllowMixed(window, browserDetails);
          break;
        case 'firefox':
          if (!firefoxShim || !shimPeerConnection ||
              !options.shimFirefox) {
            logging('Firefox shim is not included in this adapter release.');
            return adapter;
          }
          logging('adapter.js shimming firefox.');
          // Export to the adapter global object visible in the browser.
          adapter.browserShim = firefoxShim;

          // Must be called before shimPeerConnection.
          shimAddIceCandidateNullOrEmpty(window, browserDetails);

          shimGetUserMedia$1(window, browserDetails);
          shimPeerConnection(window, browserDetails);
          shimOnTrack(window);
          shimRemoveStream(window);
          shimSenderGetStats(window);
          shimReceiverGetStats(window);
          shimRTCDataChannel(window);
          shimAddTransceiver(window);
          shimGetParameters(window);
          shimCreateOffer(window);
          shimCreateAnswer(window);

          shimRTCIceCandidate(window);
          shimConnectionState(window);
          shimMaxMessageSize(window, browserDetails);
          shimSendThrowTypeError(window);
          break;
        case 'edge':
          if (!edgeShim || !shimPeerConnection$1 || !options.shimEdge) {
            logging('MS edge shim is not included in this adapter release.');
            return adapter;
          }
          logging('adapter.js shimming edge.');
          // Export to the adapter global object visible in the browser.
          adapter.browserShim = edgeShim;

          shimGetUserMedia$2(window);
          shimGetDisplayMedia$1(window);
          shimPeerConnection$1(window, browserDetails);
          shimReplaceTrack(window);

          // the edge shim implements the full RTCIceCandidate object.

          shimMaxMessageSize(window, browserDetails);
          shimSendThrowTypeError(window);
          break;
        case 'safari':
          if (!safariShim || !options.shimSafari) {
            logging('Safari shim is not included in this adapter release.');
            return adapter;
          }
          logging('adapter.js shimming safari.');
          // Export to the adapter global object visible in the browser.
          adapter.browserShim = safariShim;

          // Must be called before shimCallbackAPI.
          shimAddIceCandidateNullOrEmpty(window, browserDetails);

          shimRTCIceServerUrls(window);
          shimCreateOfferLegacy(window);
          shimCallbacksAPI(window);
          shimLocalStreamsAPI(window);
          shimRemoteStreamsAPI(window);
          shimTrackEventTransceiver(window);
          shimGetUserMedia(window);
          shimAudioContext(window);

          shimRTCIceCandidate(window);
          shimMaxMessageSize(window, browserDetails);
          shimSendThrowTypeError(window);
          removeExtmapAllowMixed(window, browserDetails);
          break;
        default:
          logging('Unsupported browser!');
          break;
      }

      return adapter;
    }

    /*
     *  Copyright (c) 2016 The WebRTC project authors. All Rights Reserved.
     *
     *  Use of this source code is governed by a BSD-style license
     *  that can be found in the LICENSE file in the root of the source
     *  tree.
     */

    const adapter =
      adapterFactory({window: typeof window === 'undefined' ? undefined : window});

    exports.RCFrameRate = void 0;
    (function (RCFrameRate) {
        RCFrameRate["FPS_10"] = "FPS_10";
        RCFrameRate["FPS_15"] = "FPS_15";
        RCFrameRate["FPS_24"] = "FPS_24";
        RCFrameRate["FPS_30"] = "FPS_30";
    })(exports.RCFrameRate || (exports.RCFrameRate = {}));

    exports.RCResolution = void 0;
    (function (RCResolution) {
        RCResolution["W176_H132"] = "W176_H132";
        RCResolution["W176_H144"] = "W176_H144";
        RCResolution["W180_H180"] = "W180_H180";
        RCResolution["W240_H180"] = "W240_H180";
        RCResolution["W240_H240"] = "W240_H240";
        RCResolution["W256_H144"] = "W256_H144";
        RCResolution["W320_H180"] = "W320_H180";
        RCResolution["W320_H240"] = "W320_H240";
        RCResolution["W360_H360"] = "W360_H360";
        RCResolution["W480_H360"] = "W480_H360";
        RCResolution["W480_H480"] = "W480_H480";
        RCResolution["W640_H360"] = "W640_H360";
        RCResolution["W640_H480"] = "W640_H480";
        RCResolution["W720_H480"] = "W720_H480";
        RCResolution["W848_H480"] = "W848_H480";
        RCResolution["W960_H720"] = "W960_H720";
        RCResolution["W1280_H720"] = "W1280_H720";
        RCResolution["W1920_H1080"] = "W1920_H1080";
    })(exports.RCResolution || (exports.RCResolution = {}));

    /**
     * 媒体资源类型
     */
    exports.RCMediaType = void 0;
    (function (RCMediaType) {
        /**
         * 音频流
         */
        RCMediaType[RCMediaType["AUDIO_ONLY"] = 0] = "AUDIO_ONLY";
        /**
         * 视频流
         */
        RCMediaType[RCMediaType["VIDEO_ONLY"] = 1] = "VIDEO_ONLY";
        /**
         * 音视频混合流，只在 web 端存在混合流的情况
         */
        RCMediaType[RCMediaType["AUDIO_VIDEO"] = 2] = "AUDIO_VIDEO";
    })(exports.RCMediaType || (exports.RCMediaType = {}));

    // export const RongRTCVideoBitrate: { [key: RCResolution]: BitrateConf } = {
    const RongRTCVideoBitrate = {
        [exports.RCResolution.W176_H132]: { width: 176, height: 132, maxBitrate: 150, minBitrate: 80 },
        [exports.RCResolution.W176_H144]: { width: 176, height: 144, maxBitrate: 150, minBitrate: 80 },
        [exports.RCResolution.W180_H180]: { width: 192, height: 192, maxBitrate: 200, minBitrate: 100 },
        [exports.RCResolution.W240_H180]: { width: 240, height: 192, maxBitrate: 240, minBitrate: 120 },
        [exports.RCResolution.W240_H240]: { width: 240, height: 240, maxBitrate: 280, minBitrate: 120 },
        [exports.RCResolution.W256_H144]: { width: 256, height: 144, maxBitrate: 240, minBitrate: 120 },
        [exports.RCResolution.W320_H180]: { width: 320, height: 192, maxBitrate: 280, minBitrate: 120 },
        [exports.RCResolution.W320_H240]: { width: 320, height: 240, maxBitrate: 400, minBitrate: 120 },
        [exports.RCResolution.W360_H360]: { width: 368, height: 368, maxBitrate: 520, minBitrate: 140 },
        [exports.RCResolution.W480_H360]: { width: 480, height: 368, maxBitrate: 650, minBitrate: 150 },
        [exports.RCResolution.W480_H480]: { width: 480, height: 480, maxBitrate: 800, minBitrate: 180 },
        [exports.RCResolution.W640_H360]: { width: 640, height: 368, maxBitrate: 800, minBitrate: 180 },
        [exports.RCResolution.W640_H480]: { width: 640, height: 480, maxBitrate: 900, minBitrate: 200 },
        [exports.RCResolution.W720_H480]: { width: 720, height: 480, maxBitrate: 1000, minBitrate: 200 },
        [exports.RCResolution.W848_H480]: { width: 848, height: 480, maxBitrate: 1860, minBitrate: 200 },
        [exports.RCResolution.W960_H720]: { width: 960, height: 720, maxBitrate: 2000, minBitrate: 250 },
        [exports.RCResolution.W1280_H720]: { width: 1280, height: 720, maxBitrate: 2200, minBitrate: 250 },
        [exports.RCResolution.W1920_H1080]: { width: 1920, height: 1088, maxBitrate: 4000, minBitrate: 400 }
    };
    /**
     * 分辨率适配
     * @param {number} resolution
     * @returns
     */
    const resolutionAdapter = (resolution) => {
        const ResolutionAdapter = {
            192: 180,
            368: 360,
            1088: 1080
        };
        return ResolutionAdapter[resolution] ? ResolutionAdapter[resolution] : resolution;
    };
    /**
    * 向上取最接近的视频分辨率配置
    * @param {number} width
    * @param {number} height
    */
    const getNearestResolution = (width, height) => {
        // 分辨率适配
        width = resolutionAdapter(width);
        height = resolutionAdapter(height);
        // 优先精准匹配
        const conf = RongRTCVideoBitrate[`W${width}_H${height}`];
        if (conf) {
            return conf;
        }
        // 不规则分辨率计算最接近的配置
        const area = width * height;
        const confs = Object.keys(RongRTCVideoBitrate)
            .map(key => RongRTCVideoBitrate[key])
            // 升序
            .sort((item, item2) => item.height * item.width - item2.width * item2.height)
            // 过滤分辨率小于 area 的配置，避免分配带宽不足
            .filter(item => item.height * item.width >= area);
        // 若 confs 长度为 0 说明分辨率远大于可支持的分辨率配置，取最大配置
        return confs[0] || RongRTCVideoBitrate.W1920_H1080;
    };
    const Multiplier = {
        10: 1,
        15: 1,
        24: 1.5,
        30: 1.5
    };
    /**
     * 根据帧率获取码率倍数
     * @param frameRate
     */
    const getBitrateMultiple = (frameRate) => {
        let d = Number.MAX_VALUE;
        let rate = 1;
        for (const key in Multiplier) {
            const d2 = Math.abs(frameRate - parseInt(key));
            if (d2 < d) {
                d = d2;
                rate = Multiplier[key];
            }
        }
        return rate;
    };

    /**
     * 获取 Microphone 列表
     */
    const getMicrophones = async () => {
        const mediaDivices = await navigator.mediaDevices.enumerateDevices();
        return mediaDivices.filter(item => item.kind === 'audioinput');
    };
    /**
     * 获取摄像头设备列表
     */
    const getCameras = async () => {
        const mediaDevices = await navigator.mediaDevices.enumerateDevices();
        return mediaDevices.filter(item => item.kind === 'videoinput');
    };
    /**
     * 获取扬声器设备列表
     */
    const getSpeakers = async () => {
        const mediaDevices = await navigator.mediaDevices.enumerateDevices();
        return mediaDevices.filter(item => item.kind === 'audiooutput');
    };
    const device = {
        getCameras,
        getMicrophones,
        getSpeakers
    };

    var RCTrackKind;
    (function (RCTrackKind) {
        RCTrackKind["AUDIO"] = "audio";
        RCTrackKind["VIDEO"] = "video";
    })(RCTrackKind || (RCTrackKind = {}));
    class RCTrack extends engine.EventEmitter {
        constructor(_tag, _userId, _kind, _isLocalTrack, _roomId) {
            super();
            this._tag = _tag;
            this._userId = _userId;
            this._kind = _kind;
            this._isLocalTrack = _isLocalTrack;
            this._roomId = _roomId;
            this._localMuted = false;
            this._remoteMuted = false;
            this._streamId = [this._userId || this._roomId, this._tag].join('_');
            this._id = [this._streamId, this.isAudioTrack() ? 0 : 1].join('_');
        }
        /**
         * 获取音视轨所属的 streamId，streamId 相同的音轨和视轨可认为属于统一道流
         * @returns
         */
        getStreamId() {
            return this._streamId;
        }
        getTrackId() {
            return this._id;
        }
        /**
         * 当 isMCUTrack 为 true 时，返回空字符串
         */
        getUserId() {
            return this._userId;
        }
        __innerGetMediaStreamTrack() {
            return this._msTrack;
        }
        /**
         * 它返回 MediaStreamTrack 对象。
         * @returns 表示媒体源的 MediaStreamTrack 对象。
         */
        get streamTrack() {
            return this._msTrack;
        }
        /**
         * 获取数据标识
         * @returns
         */
        getTag() {
            return this._tag;
        }
        isLocalTrack() {
            return this._isLocalTrack;
        }
        isVideoTrack() {
            return this._kind === 'video';
        }
        isAudioTrack() {
            return this._kind === 'audio';
        }
        /**
         * 查询流数据是否已可进行播放
         * @returns
         */
        isReady() {
            var _a;
            return ((_a = this._msTrack) === null || _a === void 0 ? void 0 : _a.readyState) === 'live';
        }
        __innerSetMediaStreamTrack(track) {
            this._msTrack = track;
            this._setLocalMuted(this._localMuted);
            const stream = this._msStream = this._msStream || new MediaStream();
            const preTrack = stream.getTracks()[0];
            preTrack && stream.removeTrack(preTrack);
            if (track) {
                stream.addTrack(track);
            }
            else if (this._element) {
                this._element.pause();
                this._element.srcObject = null;
            }
        }
        _setLocalMuted(bool) {
            if (this._msTrack) {
                this._msTrack.enabled = !bool;
            }
            this._localMuted = bool;
        }
        /**
         * 禁用
         */
        mute() {
            logger.info(`set ${this._id} enabled: false`);
            engine.logger.info(RCLoggerTag.L_TRACK_MUTE_O, {
                status: RCLoggerStatus.SUCCESSED,
                id: this._id
            }, {
                logSource: engine.LogSource.RTC
            });
            this._setLocalMuted(true);
        }
        /**
         * 启用
         */
        unmute() {
            logger.info(`set ${this._id} enabled: true`);
            engine.logger.info(RCLoggerTag.L_TRACK_UNMUTE_O, {
                status: RCLoggerStatus.SUCCESSED,
                id: this._id
            }, {
                logSource: engine.LogSource.RTC
            });
            this._setLocalMuted(false);
        }
        /**
         * 本端是否已禁用该轨道数据
         */
        isLocalMuted() {
            return this._localMuted;
        }
        /**
         * 是否为 MCU track
         */
        isMCUTrack() {
            // 普通 track roomId 为空串，mcu track roomId 为直播房间 Id
            return Boolean(this._roomId);
        }
        /**
         * 发布者是否已禁用该轨道数据，在 RCLocalTrack 实例中，则其值始终等于 `isLocalMuted()`
         */
        isOwnerMuted() {
            return this._remoteMuted;
        }
        /**
         * 播放
         * @param element 用于承载媒体流的元素标签，音频流可传空
         * @param volume 有效值为 0-100
         */
        async play(element, options) {
            engine.logger.info(RCLoggerTag.L_TRACK_PLAY_T, {
                element,
                options
            }, {
                logSource: engine.LogSource.RTC
            });
            if (!this._msTrack) {
                logger.warn(`the track is not ready to play -> id: ${this._id}`);
                engine.logger.error(RCLoggerTag.L_TRACK_PLAY_R, {
                    status: RCLoggerStatus.FAILED,
                    code: exports.RCRTCCode.TRACK_NOT_READY,
                    msg: `play error -> id: ${this._id}`
                }, {
                    logSource: engine.LogSource.RTC
                });
                return { code: exports.RCRTCCode.TRACK_NOT_READY };
            }
            if (this._msTrack.readyState === 'ended') {
                logger.warn(`the track's readyState is 'ended' -> id: ${this._id}`);
                engine.logger.error(RCLoggerTag.L_TRACK_PLAY_R, {
                    status: RCLoggerStatus.FAILED,
                    code: '',
                    msg: `the track's readyState is ended -> id: ${this._id}`
                }, {
                    logSource: engine.LogSource.RTC
                });
            }
            if (options === null || options === void 0 ? void 0 : options.volume) {
                if (!engine.isNumber(options === null || options === void 0 ? void 0 : options.volume)) {
                    logger.error(`${options === null || options === void 0 ? void 0 : options.volume} is not a number, the valid range of options.volume is 0-100`);
                    engine.logger.error(RCLoggerTag.L_TRACK_PLAY_R, {
                        status: RCLoggerStatus.FAILED,
                        code: exports.RCRTCCode.PARAMS_ERROR,
                        msg: 'params error -> options.volume不是数字'
                    }, {
                        logSource: engine.LogSource.RTC
                    });
                    return { code: exports.RCRTCCode.PARAMS_ERROR };
                }
                if ((options === null || options === void 0 ? void 0 : options.volume) < 0) {
                    options.volume = 0;
                    logger.warn('the valid range of options.volume is 0-100, the value of volume has been set 0');
                    engine.logger.warn(RCLoggerTag.L_TRACK_PLAY_R, {
                        status: RCLoggerStatus.FAILED,
                        code: '',
                        msg: 'params error -> options.volume < 0'
                    }, {
                        logSource: engine.LogSource.RTC
                    });
                }
                if ((options === null || options === void 0 ? void 0 : options.volume) > 100) {
                    options.volume = 100;
                    logger.warn('the valid range of options.volume is 0-100, the value of volume has been set 100');
                    engine.logger.warn(RCLoggerTag.L_TRACK_PLAY_R, {
                        status: RCLoggerStatus.FAILED,
                        code: '',
                        msg: 'params error -> options.volume > 100'
                    }, {
                        logSource: engine.LogSource.RTC
                    });
                }
            }
            if (options === null || options === void 0 ? void 0 : options.audioDeviceId) {
                /**
                 * 检测传入的 audioDeviceId 是否有效
                 */
                const deviceIds = (await device.getSpeakers()).map((item) => { return item.deviceId; });
                const isValid = deviceIds.includes(options.audioDeviceId);
                if (!isValid) {
                    logger.error(`the options.audioDeviceId is invalid --> ${options.audioDeviceId}`);
                    engine.logger.error(RCLoggerTag.L_TRACK_PLAY_R, {
                        status: RCLoggerStatus.FAILED,
                        code: exports.RCRTCCode.PARAMS_ERROR,
                        msg: 'params error -> options.audioDeviceId'
                    }, {
                        logSource: engine.LogSource.RTC
                    });
                    return { code: exports.RCRTCCode.PARAMS_ERROR };
                }
            }
            const isVideoTrack = this.isVideoTrack();
            // video 播放必须传递一个 HTMLVideoElement 实例作为 video track 的播放组件
            if (isVideoTrack && (!element || !(element instanceof HTMLVideoElement || this.__validateVideoNodeName(element)))) {
                logger.error(`the video track need an <video> to play -> id: ${this._id}`);
                engine.logger.error(RCLoggerTag.L_TRACK_PLAY_R, {
                    status: RCLoggerStatus.FAILED,
                    code: exports.RCRTCCode.PARAMS_ERROR,
                    msg: 'params error -> element不是一个video标签'
                }, {
                    logSource: engine.LogSource.RTC
                });
                return { code: exports.RCRTCCode.VIDEO_TRACK_MISS_MEDIA_ELEMENT };
            }
            this._element = isVideoTrack ? element : (this._element || new Audio());
            // 若本地静音，则恢复本地播放
            if (this._localMuted) {
                this._setLocalMuted(false);
            }
            if (!this._element.srcObject || this._element.srcObject !== this._msStream) {
                this._element.pause();
            }
            this._element.onloadstart = evt => {
                var _a, _b;
                // 开始寻找资源
                logger.debug(`HTMLMediaElement onloadstart -> id: ${(_a = evt.target) === null || _a === void 0 ? void 0 : _a.id}, trackId: ${this._id}`);
                engine.logger.info(RCLoggerTag.L_TRACK_PLAY_R, {
                    status: RCLoggerStatus.INFO,
                    msg: `HTMLMediaElement onloadstart -> id: ${(_b = evt.target) === null || _b === void 0 ? void 0 : _b.id}, trackId: ${this._id}`
                }, {
                    logSource: engine.LogSource.RTC
                });
            };
            this._element.ondurationchange = evt => {
                var _a, _b;
                // 时长变更
                logger.debug(`HTMLMediaElement ondurationchange -> id: ${(_a = evt.target) === null || _a === void 0 ? void 0 : _a.id}, trackId: ${this._id}`);
                engine.logger.info(RCLoggerTag.L_TRACK_PLAY_R, {
                    status: RCLoggerStatus.INFO,
                    msg: `HTMLMediaElement ondurationchange -> id: ${(_b = evt.target) === null || _b === void 0 ? void 0 : _b.id}, trackId: ${this._id}`
                }, {
                    logSource: engine.LogSource.RTC
                });
            };
            this._element.onloadedmetadata = evt => {
                var _a, _b;
                // 元数据加载完成
                logger.debug(`HTMLMediaElement onloadedmetadata -> id: ${(_a = evt.target) === null || _a === void 0 ? void 0 : _a.id}, trackId: ${this._id}`);
                engine.logger.info(RCLoggerTag.L_TRACK_PLAY_R, {
                    status: RCLoggerStatus.INFO,
                    msg: `HTMLMediaElement onloadedmetadata -> id: ${(_b = evt.target) === null || _b === void 0 ? void 0 : _b.id}, trackId: ${this._id}`
                }, {
                    logSource: engine.LogSource.RTC
                });
            };
            this._element.onloadeddata = evt => {
                var _a, _b;
                // 首帧加载完成
                logger.debug(`HTMLMediaElement onloadeddata -> id: ${(_a = evt.target) === null || _a === void 0 ? void 0 : _a.id}, trackId: ${this._id}`);
                engine.logger.info(RCLoggerTag.L_TRACK_PLAY_R, {
                    status: RCLoggerStatus.INFO,
                    msg: `HTMLMediaElement onloadeddata -> id: ${(_b = evt.target) === null || _b === void 0 ? void 0 : _b.id}, trackId: ${this._id}`
                }, {
                    logSource: engine.LogSource.RTC
                });
            };
            this._element.onabort = (evt) => {
                var _a, _b;
                // 中止
                logger.info(`HTMLMediaElement onabort -> id: ${(_a = evt.target) === null || _a === void 0 ? void 0 : _a.id}, trackId: ${this._id}`);
                engine.logger.info(RCLoggerTag.L_TRACK_PLAY_R, {
                    status: RCLoggerStatus.INFO,
                    msg: `HTMLMediaElement onabort -> id: ${(_b = evt.target) === null || _b === void 0 ? void 0 : _b.id}, trackId: ${this._id}`
                }, {
                    logSource: engine.LogSource.RTC
                });
            };
            this._element.oncanplay = async (evt) => {
                var _a, _b, _c;
                // 可以播放
                logger.info(`HTMLMediaElement oncanplay -> id: ${(_a = evt.target) === null || _a === void 0 ? void 0 : _a.id}, trackId: ${this._id}`);
                engine.logger.info(RCLoggerTag.L_TRACK_PLAY_R, {
                    status: RCLoggerStatus.INFO,
                    msg: `HTMLMediaElement oncanplay -> id: ${(_b = evt.target) === null || _b === void 0 ? void 0 : _b.id}, trackId: ${this._id}`
                }, {
                    logSource: engine.LogSource.RTC
                });
                try {
                    (_c = this._element) === null || _c === void 0 ? void 0 : _c.play();
                }
                catch (error) {
                    /**
                     * 检测是否有设置音频输出设备的权限
                     */
                    if (error.message === 'No permission to use requested device') {
                        logger.error(`setSinkId failed -> ${error.message}`);
                        engine.logger.error(RCLoggerTag.L_TRACK_PLAY_R, {
                            status: RCLoggerStatus.FAILED,
                            code: exports.RCRTCCode.NO_PERMISSION_TO_USE_REQUESTED_DEVICE,
                            msg: 'No permission'
                        }, {
                            logSource: engine.LogSource.RTC
                        });
                        return;
                    }
                    logger.error(error);
                    engine.logger.error(RCLoggerTag.L_TRACK_PLAY_R, {
                        status: RCLoggerStatus.FAILED,
                        code: exports.RCRTCCode.TRACK_PLAY_ERROR,
                        msg: 'play error'
                    }, {
                        logSource: engine.LogSource.RTC
                    });
                }
            };
            this._element.onvolumechange = evt => {
                var _a, _b;
                // 音量变化
                const volume = Math.floor(((_a = evt.target) === null || _a === void 0 ? void 0 : _a.volume) * 100);
                logger.info(`HTMLMediaElement onvolumechange -> volume: ${volume}, trackId: ${this._id}`);
                engine.logger.info(RCLoggerTag.L_TRACK_PLAY_R, {
                    status: RCLoggerStatus.INFO,
                    msg: `HTMLMediaElement onvolumechange -> id: ${(_b = evt.target) === null || _b === void 0 ? void 0 : _b.id}, trackId: ${this._id}`
                }, {
                    logSource: engine.LogSource.RTC
                });
            };
            this._element.srcObject = this._msStream;
            this._element.autoplay = true;
            // video 标签页面内播放
            if (isVideoTrack) {
                this._element.playsInline = true;
                this._element.x5PlaysInline = true;
                this._element.webkitPlaysInline = true;
            }
            if ((options === null || options === void 0 ? void 0 : options.audioDeviceId) && !isVideoTrack) {
                await this._element.setSinkId(options.audioDeviceId);
            }
            // audio 标签设置音量
            if (!isVideoTrack && ((options === null || options === void 0 ? void 0 : options.volume) || (options === null || options === void 0 ? void 0 : options.volume) === 0)) {
                this._element.volume = (options === null || options === void 0 ? void 0 : options.volume) / 100;
            }
            engine.logger.info(RCLoggerTag.L_TRACK_PLAY_R, {
                status: RCLoggerStatus.SUCCESSED,
                element,
                options
            }, {
                logSource: engine.LogSource.RTC
            });
            return { code: exports.RCRTCCode.SUCCESS };
        }
        __innerDestroy() {
            this.__innerSetMediaStreamTrack(undefined);
        }
        /**
         * 释放内存中的 video、audio 标签
         */
        __releaseMediaElement() {
            if (this._element) {
                this._element.remove();
                this._element.srcObject = null;
            }
        }
        /**
         * 它检查元素是否是视频节点
         * @param {any} element - 您要检查的元素是否为视频元素。
         * @returns 一个布尔值。
         */
        __validateVideoNodeName(element) {
            return element && element.nodeName && element.nodeName.toUpperCase() === 'VIDEO';
        }
    }

    exports.RCAudioBitrate = void 0;
    (function (RCAudioBitrate) {
        /**
         * 标清音质
         */
        RCAudioBitrate["Speech"] = "Speech";
        /**
         * 音乐音质
         */
        RCAudioBitrate["Music"] = "Music";
        /**
         * 音乐高清音质
         */
        RCAudioBitrate["MusicHigh"] = "MusicHigh";
    })(exports.RCAudioBitrate || (exports.RCAudioBitrate = {}));
    const getAudioBitrate = {
        [exports.RCAudioBitrate.Music]: { max: 32 * 2, min: 32 * 2 },
        [exports.RCAudioBitrate.MusicHigh]: { max: 32 * 2 * 2, min: 32 * 2 * 2 },
        [exports.RCAudioBitrate.Speech]: { max: 32, min: 32 }
    };
    exports.RCVideoBitrate = void 0;
    (function (RCVideoBitrate) {
        /**
         * Bitrate { max: 150, min: 80 }
         */
        RCVideoBitrate["LEVEL0"] = "LEVEL0";
        /**
         * Bitrate { max: 280, min: 120 }
         */
        RCVideoBitrate["LEVEL1"] = "LEVEL1";
        /**
         * Bitrate { max: 650, min: 150 }
         */
        RCVideoBitrate["LEVEL2"] = "LEVEL2";
        /**
         * Bitrate { max: 1000, min: 200 }
         */
        RCVideoBitrate["LEVEL3"] = "LEVEL3";
        /**
         * Bitrate { max: 2200, min: 250 }
         */
        RCVideoBitrate["LEVEL4"] = "LEVEL4";
        /**
         * Bitrate { max: 4000, min: 400 }
         */
        RCVideoBitrate["LEVEL5"] = "LEVEL5";
    })(exports.RCVideoBitrate || (exports.RCVideoBitrate = {}));
    const getVideoBitrate = {
        [exports.RCVideoBitrate.LEVEL0]: { max: 150, min: 80 },
        [exports.RCVideoBitrate.LEVEL1]: { max: 280, min: 120 },
        [exports.RCVideoBitrate.LEVEL2]: { max: 650, min: 150 },
        [exports.RCVideoBitrate.LEVEL3]: { max: 1000, min: 200 },
        [exports.RCVideoBitrate.LEVEL4]: { max: 2200, min: 250 },
        [exports.RCVideoBitrate.LEVEL5]: { max: 4000, min: 400 }
    };

    class RC3AnoiseTrack {
        /**
         * 该函数接受一个布尔值作为参数，如果没有传递参数，该函数将默认为 true
         * @param {boolean} [isOpen=true] - 轨道是否开放。
         */
        static setStatus(isOpen = true) {
            RC3AnoiseTrack.isOpen = isOpen;
        }
        /**
         * 它设置 worklet 模块和 wasm。
         * @param {string} module - 将用于创建工作集的模块的名称。
         * @param {string} wasm - Rust 编译器生成的 wasm 文件。
         */
        static setWroklet(module, wasm) {
            RC3AnoiseTrack.workletModule = module;
            RC3AnoiseTrack.workletModule = wasm;
        }
        /**
         * 它创建一个 AudioContext，从输入流创建一个 MediaStreamSource，
         * 创建一个 MediaStreamDestination，创建一个 AudioWorkletNode，并将节点连接在一起。
         * @param {MediaStream} audioStream - 媒体流
         * @returns 一个媒体流对象。
         */
        static async transformStreamTrack(audioStream) {
            var _a;
            /* 如果开关未打开则直接返回 音轨。 */
            if (!RC3AnoiseTrack.isOpen) {
                return new Promise(resolve => {
                    resolve({
                        track: audioStream === null || audioStream === void 0 ? void 0 : audioStream.getAudioTracks()[0],
                        stop: () => { }
                    });
                });
            }
            // 创建 AudioContext 并设定采集频率
            let audioCxt = new AudioContext({ sampleRate: 44100 });
            // 创建资源
            let renoise = audioCxt.createMediaStreamSource(audioStream);
            // 最终发布的音频载体
            let destination = audioCxt.createMediaStreamDestination();
            // 始始化 AAAnoiseWorklet 并设置为 null, 为后续垃圾回收准备
            let AAAnoiseWorklet = null;
            let AAAnoiseNode = null;
            AAAnoiseWorklet = await audioCxt.audioWorklet.addModule(RC3AnoiseTrack.workletModule).then(() => {
                logger.info(RCLoggerTag.L_RTC_3ANOISE_NODE_O, {
                    status: RCLoggerStatus.SUCCESSED,
                    message: { msg: 'addModule RC3AnoiseTrack.workletModule success' }
                }, {
                    logSource: engine.LogSource.RTC
                });
                return fetch(RC3AnoiseTrack.workletWasm, {
                    cache: 'force-cache',
                    credentials: 'same-origin'
                }).then(function (response) {
                    return response.arrayBuffer();
                }).catch(error => {
                    throw new Error(error.message);
                });
            }).then(buffer => {
                AAAnoiseNode = new AudioWorkletNode(audioCxt, 'process-worklet', {
                    numberOfInputs: 1,
                    numberOfOutputs: 1,
                    outputChannelCount: [1],
                    processorOptions: {
                        binary: buffer
                    }
                });
                return AAAnoiseNode;
            }).catch(err => {
                logger.info(RCLoggerTag.L_RTC_3ANOISE_NODE_E, {
                    status: RCLoggerStatus.FAILED,
                    message: { msg: err.message }
                }, {
                    logSource: engine.LogSource.RTC
                });
            });
            if (!AAAnoiseWorklet) {
                return new Promise(resolve => {
                    resolve({
                        track: audioStream === null || audioStream === void 0 ? void 0 : audioStream.getAudioTracks()[0],
                        stop: () => { }
                    });
                });
            }
            renoise.connect(AAAnoiseWorklet).connect(destination);
            let track = (_a = destination === null || destination === void 0 ? void 0 : destination.stream) === null || _a === void 0 ? void 0 : _a.getAudioTracks()[0];
            let stop = () => {
                logger.info(RCLoggerTag.L_RTC_3ANOISE_NODE_STOP_O, {
                    status: RCLoggerStatus.SUCCESSED,
                    message: { msg: 'call stop RC3AnoiseTrack.workletModule' }
                }, {
                    logSource: engine.LogSource.RTC
                });
                AAAnoiseWorklet === null || AAAnoiseWorklet === void 0 ? void 0 : AAAnoiseWorklet.port.postMessage({ type: 'stop', msg: '' });
                setTimeout(() => {
                    const originTrack = audioStream === null || audioStream === void 0 ? void 0 : audioStream.getAudioTracks()[0];
                    originTrack === null || originTrack === void 0 ? void 0 : originTrack.stop();
                    audioCxt.suspend();
                    audioCxt.close();
                    destination.disconnect();
                    AAAnoiseWorklet.disconnect();
                    renoise.disconnect();
                    audioCxt = null;
                    AAAnoiseWorklet = null;
                    destination = null;
                    renoise = null;
                    AAAnoiseNode = null;
                    audioStream = null;
                    track === null || track === void 0 ? void 0 : track.stop();
                    track = null;
                    stop = null;
                }, 200);
            };
            return { track, stop };
        }
    }
    RC3AnoiseTrack.workletModule = 'https://cdn.ronghub.com/plugin-rtc/wasm/5.0.0-alpha.2/process-worklet.js';
    RC3AnoiseTrack.workletWasm = 'https://cdn.ronghub.com/plugin-rtc/wasm/5.0.0-alpha.2/AudioProcessing.wasm';
    RC3AnoiseTrack.isOpen = false;

    /* eslint no-dupe-class-members: 'off' */
    class RCLocalTrack extends RCTrack {
        constructor(tag, userId, kind, track) {
            super(tag, userId, kind, true);
            this._isPublished = false;
            this.__innerSetMediaStreamTrack(track);
            // 监听流结束事件
            track.onended = () => {
                track.onended = null;
                this.emit(RCLocalTrack.EVENT_LOCAL_TRACK_END, this);
                this.removeAll(RCLocalTrack.EVENT_LOCAL_TRACK_END);
            };
        }
        /**
         * @override 重写 RCTrack 父类方法
         * @param bool
         */
        _setLocalMuted(bool) {
            const changed = this._localMuted !== bool;
            super._setLocalMuted(bool);
            // 本端流，remoteMuted 与 localMuted 始终保持一致
            this._remoteMuted = this._localMuted;
            // 派发事件以通知房间内其他成员
            changed && this.emit(RCLocalTrack.__INNER_EVENT_MUTED_CHANGE__, this);
            engine.logger.info(RCLoggerTag.L_LOCAL_TRACK_SET_LOCAL_MUTED_O, {
                status: RCLoggerStatus.SUCCESSED,
                bool
            }, {
                logSource: engine.LogSource.RTC
            });
        }
        __innerSetPublished(bool) {
            engine.logger.info(RCLoggerTag.L_LOCAL_TRACK_INNER_SET_PUBLISHED_O, {
                status: RCLoggerStatus.SUCCESSED,
                bool
            }, {
                logSource: engine.LogSource.RTC
            });
            this._isPublished = bool;
        }
        /**
         * 检测本地资源是否已发布
         */
        isPublished() {
            return this._isPublished;
        }
        /**
         * 销毁本地流
         */
        destroy() {
            var _a;
            logger.info(`track is destroyed -> trackId: ${this.getTrackId()}`);
            (_a = this._msTrack) === null || _a === void 0 ? void 0 : _a.stop();
            super.__innerDestroy();
            this.isAudioTrack() && super.__releaseMediaElement();
            // 需要通知房间流已销毁，取消发布流
            this.emit(RCLocalTrack.__INNER_EVENT_DESTROY__, this);
            engine.logger.info(RCLoggerTag.L_LOCAL_TRACK_DESTROY_O, {
                status: RCLoggerStatus.SUCCESSED
            }, {
                logSource: engine.LogSource.RTC
            });
        }
        /**
         * 为本地流设定上行码率，仅视频流有效，音频默认 15 kbps，不支持修改
         * @description 当 `max` 或 `min` 值为 `0` 时，取动态码率计算结果
         * @param max 最大码率
         * @param min 最小码率
         * @param start 起始码率
         */
        setBitrate(max = 0, min = 0, start = 0) {
            if (!engine.isNumber(max) || !engine.isNumber(min) || !engine.isNumber(start) || max <= 0 || min <= 0 || max < min) {
                logger.error('setBitrate params error ->');
                engine.logger.error(RCLoggerTag.L_LOCAL_TRACK_SET_BITRATE_O, {
                    status: RCLoggerStatus.FAILED,
                    code: '',
                    msg: `params error -> max: ${max},min: ${min}, start: ${start}`
                }, {
                    logSource: engine.LogSource.RTC
                });
                return;
            }
            engine.logger.info(RCLoggerTag.L_LOCAL_TRACK_SET_BITRATE_O, {
                status: RCLoggerStatus.SUCCESSED,
                max,
                min,
                start
            }, {
                logSource: engine.LogSource.RTC
            });
            this._bitrateInfo = { max, min, start };
        }
        /**
         * 获取码率配置，当未指定码率时，将取得动态码率计算值
         * @returns
         */
        getBitrate() {
            var _a, _b, _c, _d, _e, _f, _g;
            // 收集默认值
            let { min, max, start } = { min: 0, max: 0, start: 0 };
            if (((_a = this._msTrack) === null || _a === void 0 ? void 0 : _a.kind) === RCTrackKind.VIDEO) {
                // 视频动态码率
                ({ min, max } = getDynamicBitrate(this._msTrack));
            }
            else if (((_b = this._msTrack) === null || _b === void 0 ? void 0 : _b.kind) === RCTrackKind.AUDIO) {
                // 音频动态码率
                ({ min, max } = { min: 32, max: 32 });
            }
            if ((_c = this._bitrateInfo) === null || _c === void 0 ? void 0 : _c.max) {
                start = ((_d = this._bitrateInfo) === null || _d === void 0 ? void 0 : _d.max) * 0.7;
            }
            return { min: ((_e = this._bitrateInfo) === null || _e === void 0 ? void 0 : _e.min) || min, max: ((_f = this._bitrateInfo) === null || _f === void 0 ? void 0 : _f.max) || max, start: ((_g = this._bitrateInfo) === null || _g === void 0 ? void 0 : _g.start) || start };
        }
    }
    /**
     * 本地流结束事件通知
     * @description
     * 该事件为 MediaStreamTrack 实例的 'ended' 事件触发
     */
    RCLocalTrack.EVENT_LOCAL_TRACK_END = 'local-track-end';
    /**
     * muted 状态变更通知常量定义
     */
    RCLocalTrack.__INNER_EVENT_MUTED_CHANGE__ = 'inner-muted-change';
    /**
     * 本地流已销毁
     */
    RCLocalTrack.__INNER_EVENT_DESTROY__ = 'inner-destroy';
    class RCLocalAudioTrack extends RCLocalTrack {
        constructor(tag, userId, track) {
            super(tag, userId, 'audio', track);
            this._stopProcess = () => { };
        }
        /**
         * 它设置推荐的音频码率。
         * @param {RCAudioBitrate} audio - RCA音频比特率
         */
        setRecommendBitrate(audio) {
            if (!engine.validate('livingType', audio, value => value in exports.RCAudioBitrate)) {
                engine.logger.warn(RCLoggerTag.L_RTC_SET_RECOMMEND_BITRATE_O, {
                    status: RCLoggerStatus.FAILED,
                    msg: 'params error -> setRecommendBitrate Audio'
                }, {
                    logSource: engine.LogSource.RTC
                });
                return;
            }
            const audioBitrate = getAudioBitrate[audio];
            this.setBitrate(audioBitrate.max, audioBitrate.min, audioBitrate.start || audioBitrate.max * 0.7);
        }
        /**
         * 它设置视频的比特率。
         * @param {number} max - 客户端将使用的最大比特率。
         * @param {number[]} args - [分钟，开始]
         */
        setBitrate(max, ...args) {
            const [min = 1, start = max * 0.7 || 1] = args;
            super.setBitrate(max, min, start);
        }
        /**
         * @override __innerSetMediaStreamTrack
         * @params {track} MediaStreamTrack 添加音频流
         * @params {track} undefined        销毁音频流
         */
        __innerSetMediaStreamTrack(track) {
            if (!track) {
                // 如果 track 为 undefined 则为销毁动作
                super.__innerSetMediaStreamTrack(track);
                this._stopProcess();
            }
            else {
                // 是否开启3A降噪
                if (RC3AnoiseTrack.isOpen) {
                    const audioStream = new MediaStream([track]);
                    RC3AnoiseTrack.transformStreamTrack(audioStream).then(({ track, stop }) => {
                        super.__innerSetMediaStreamTrack(track);
                        this._stopProcess = stop;
                    });
                }
                else {
                    super.__innerSetMediaStreamTrack(track);
                }
            }
        }
    }
    class RCLocalVideoTrack extends RCLocalTrack {
        constructor(tag, userId, track, _isTiny = false) {
            super(tag, userId, 'video', track);
            this._isTiny = _isTiny;
        }
        __isTiny() {
            return this._isTiny;
        }
        getStreamId() {
            const msid = super.getStreamId();
            return this._isTiny ? `${msid}_tiny` : msid;
        }
        getTrackId() {
            const trackId = super.getTrackId();
            return this._isTiny ? `${trackId}_tiny` : trackId;
        }
        /**
         * 它设置推荐的音频码率
         * @param {RCVideoBitrate} video - RC视频比特率
         */
        setRecommendBitrate(video) {
            if (!engine.validate('livingType', video, value => value in exports.RCVideoBitrate)) {
                engine.logger.warn(RCLoggerTag.L_RTC_SET_RECOMMEND_BITRATE_O, {
                    status: RCLoggerStatus.FAILED,
                    msg: 'params error -> setRecommendBitrate Video'
                }, {
                    logSource: engine.LogSource.RTC
                });
                return;
            }
            const audioBitrate = getVideoBitrate[video];
            this.setBitrate(audioBitrate.max, audioBitrate.min, audioBitrate.start || audioBitrate.max * 0.7);
        }
        /**
         * 它设置视频的比特率。
         * @param {number} max - 视频可以编码的最大比特率。
         * @param {number[]} args - [最大、最小、开始]
         */
        setBitrate(max, ...args) {
            const [min = 1, start = max * 0.7 || 1] = args;
            super.setBitrate(max, min, start);
        }
    }
    class RCLocalFileTrack extends RCLocalTrack {
        constructor(tag, userId, kind, track, 
        /**
         * 自定义文件流的播放宿主原生，该类型流所持有的 MediaStreamTrack 实例是由该宿主元素 `captureStream` 获取
         */
        _resource) {
            super(tag, userId, kind, track);
            this._resource = _resource;
            RCLocalFileTrack.__innerSetMapping(this.getTrackId(), _resource);
        }
        /**
         * 建立 trackId 与宿主播放元素的映射关系
         * @param trackId
         * @param video
         */
        static __innerSetMapping(trackId, video) {
            const ids = this._mapping.get(video) || [];
            ids.push(trackId);
            this._mapping.set(video, ids);
        }
        static __innerRemoveMapping(trackId, video) {
            var _a, _b;
            const ids = (_a = this._mapping.get(video)) === null || _a === void 0 ? void 0 : _a.filter(id => id !== trackId);
            if (ids && ids.length > 0) {
                this._mapping.set(video, ids);
                return;
            }
            this._mapping.delete(video);
            video.pause();
            video.src = '';
            (_b = video.parentNode) === null || _b === void 0 ? void 0 : _b.removeChild(video);
        }
        destroy() {
            this.isAudioTrack() && this.mute();
            RCLocalFileTrack.__innerRemoveMapping(this.getTrackId(), this._resource);
            super.destroy();
        }
    }
    RCLocalFileTrack._mapping = new Map();
    class RCLocalFileVideoTrack extends RCLocalFileTrack {
        constructor(tag, userId, track, element) {
            super(tag, userId, 'video', track, element);
        }
    }
    class RCLocalFileAudioTrack extends RCLocalFileTrack {
        constructor(tag, userId, track, element) {
            super(tag, userId, 'audio', track, element);
            this._stopProcess = () => { };
        }
        _setLocalMuted(bool) {
            if (this._resource) {
                this._resource.muted = bool;
            }
            super._setLocalMuted(bool);
        }
        play() {
            // 自定义文件中的声音播放只需要修改 video 标签的 muted 属性
            this._setLocalMuted(false);
            return Promise.resolve({ code: exports.RCRTCCode.SUCCESS });
        }
        /**
         * @override __innerSetMediaStreamTrack
         * @params {track} MediaStreamTrack 添加音频流
         * @params {track} undefined        销毁音频流
         */
        __innerSetMediaStreamTrack(track) {
            if (!track) {
                // 如果 track 为 undefined 则为销毁动作
                super.__innerSetMediaStreamTrack(track);
                this._stopProcess();
            }
            else {
                // 是否开启3A降噪
                if (RC3AnoiseTrack.isOpen) {
                    const audioStream = new MediaStream([track]);
                    RC3AnoiseTrack.transformStreamTrack(audioStream).then(({ track, stop }) => {
                        super.__innerSetMediaStreamTrack(track);
                        this._stopProcess = stop;
                    });
                }
                else {
                    super.__innerSetMediaStreamTrack(track);
                }
            }
        }
    }
    class RCMicphoneAudioTrack extends RCLocalAudioTrack {
    }
    class RCCameraVideoTrack extends RCLocalVideoTrack {
    }
    class RCScreenVideoTrack extends RCLocalVideoTrack {
    }
    class RCScreenAudioTrack extends RCLocalAudioTrack {
    }

    class RCRemoteTrack extends RCTrack {
        constructor(tag, userId, kind, roomId) {
            super(tag, userId, kind, false, roomId);
            this._isSubscribed = false;
        }
        /**
         * 根据房间数据更新状态
         * @param value
         */
        __innerSetRemoteMuted(bool) {
            this._remoteMuted = bool;
        }
        __innerSetSubscribed(bool) {
            this._isSubscribed = bool;
            engine.logger.info(RCLoggerTag.L_REMOTE_TRACK_INNER_SET_SUBSCRIBED_O, {
                status: RCLoggerStatus.SUCCESSED,
                bool
            }, {
                logSource: engine.LogSource.RTC
            });
        }
        /**
         * 查看是否已订阅了该远端资源
         * @returns
         */
        isSubscribed() {
            return this._isSubscribed;
        }
    }
    class RCRemoteAudioTrack extends RCRemoteTrack {
        constructor(tag, userId, roomId) {
            super(tag, userId, 'audio', roomId);
        }
    }
    class RCRemoteVideoTrack extends RCRemoteTrack {
        constructor(tag, userId, roomId) {
            super(tag, userId, 'video', roomId);
            this._isSubTiny = false;
        }
        __innerSetIsTinyTrack(bool) {
            this._isSubTiny = bool;
        }
        /**
         * 是否订阅的小流
         */
        isSubTiny() {
            return this._isSubTiny;
        }
    }

    /**
     * 构建增量消息内容
     * @param objectname 消息名
     * @param uris 增量变更资源
     */
    const buildPlusMessage = (messageName, uris) => {
        return {
            name: messageName,
            // ignore 用于通知已实现全量 URI 的 RTCLib 忽略此消息
            content: JSON.stringify({ uris, ignore: true })
        };
    };
    /**
     * 构建预发布的全量资源变更消息
     * @param uris 全量资源数据
     */
    const buildTotalURIMessageContent = (uris) => {
        return JSON.stringify(uris);
    };
    /**
     * 验证 tag 是否有效
     * @param tag
     * @returns
     */
    const isValidTag = (tag) => {
        return /^[a-zA-Z\d-=]+$/g.test(tag);
    };
    /**
     * 页面地址有效性检测
     */
    const isValidLocation = location.protocol !== 'http:' || ['localhost', '127.0.0.1'].includes(location.hostname);
    const getValue = (value) => {
        if (value === undefined) {
            return 0;
        }
        if (engine.isNumber(value)) {
            return value;
        }
        const tmp = value;
        return tmp.exact || tmp.ideal || tmp.max || 0;
    };
    /**
     * 获取视频流的分辨率及帧率数据，若无法获取真实值，则返回 0
     * @param track
     */
    const getVideoTrackInfo = (track) => {
        const settings = track.getSettings();
        const constraints = track.getConstraints();
        return {
            width: settings.width || getValue(constraints.width),
            height: settings.height || getValue(constraints.height),
            frameRate: settings.frameRate || getValue(constraints.frameRate)
        };
    };
    /**
     * 取视频流动态码率
     * @param track
     * @returns
     */
    const getDynamicBitrate = (track) => {
        const { width, height, frameRate } = getVideoTrackInfo(track);
        // 计算动态码率，若 videoTrack 的分辨率读取失败，则以 1920 * 1080 的默认分辨率计算码率
        const config = getNearestResolution(width || 1920, height || 1080);
        const multiple = getBitrateMultiple(frameRate);
        return { min: config.minBitrate * multiple, max: config.maxBitrate * multiple };
    };
    /**
     * 获取资源唯一性标识
     * @param item
     */
    const getTrackId = (item) => {
        return [item.msid, item.mediaType].join('_');
    };
    /**
     * 它接受一个类似“userId_tag_mediaType”的字符串，并返回一个包含字符串三个部分的对象
     * 解析 trackId 以获取资源信息
     * trackId 构成说明 trackId = [ userid, tag, mediaType ].join('_')
     *    userid    : 用户可随意定义可包含 _ 下划线
     *    tag       : `不可以有 _ 下划线`
     *    mediaType : RCMediaType 0:音频流  1:视频流 2:音视频混合流
     * @param {string} trackId - 远程轨道的轨道 ID。
     * @returns 具有三个属性的对象：mediaType、tag 和 userId。
     */
    const parseTrackId = (trackId) => {
        const arr = trackId.split('_');
        const mediaType = parseInt(arr.pop());
        const tag = arr.pop();
        const userId = arr.join('_');
        return { mediaType, tag, userId };
    };
    const parseStreamId = (streamId) => {
        const arr = streamId.split('_');
        const tag = arr.pop();
        const userId = arr.join('_');
        return { tag, userId };
    };
    const formatStreamId = (userId, tag) => [userId, tag].join('_');
    const deepCopyResources = (resources) => {
        return resources.map(item => Object.assign({}, item));
    };
    /**
     * 比对资源找出新增、状态变更及取消发布的资源
     * @param prevResources 原资源数据
     * @param resources 变更的全量资源
     */
    const diffPublishResources = (prevResources, resources, isReconnect = false) => {
        prevResources = prevResources.slice();
        const publishedList = [];
        const unpublishedList = [];
        const modifiedList = [];
        // 遍历新全量资源
        resources.forEach(item => {
            const resId = getTrackId(item);
            // 从当前房间数据中查找相同资源索引
            let index = prevResources.findIndex(value => getTrackId(value) === resId);
            /**
             * 重连计算时，直接通过 uri 来算新增和删减的资源。因为 resources 即是最新资源，不能算资源已重新发布的情况
             * 在断网重连情况下如果使用 trackId 计算 index 会导致己端在断网期间，远端取消发布资源 A（tag:C）又重新发布资源 B(tag:C)时, 无法
             * 计算出取消发布的资源 A，只能算出新发布的资源 B, 导致页面视图无法更新、且订阅成功 B 资源后不抛 onTrackReady
             */
            if (isReconnect) {
                index = prevResources.findIndex(value => value.uri === item.uri);
            }
            if (index === -1) {
                // 新增资源
                publishedList.push(item);
                return;
            }
            // 资源变更
            const preItem = prevResources[index];
            if (preItem.uri !== item.uri) {
                // 资源已重新发布
                publishedList.push(item);
            }
            else if (preItem.state !== item.state) {
                // 资源状态变更
                modifiedList.push(item);
            }
            // 从原资源列表中移除已变更资源，剩余为取消发布资源
            prevResources.splice(index, 1);
        });
        unpublishedList.push(...prevResources);
        return { publishedList, unpublishedList, modifiedList };
    };
    const string10to64 = (number) => {
        const chars = '0123456789abcdefghigklmnopqrstuvwxyzABCDEFGHIGKLMNOPQRSTUVWXYZ+/'.split('');
        const radix = chars.length + 1;
        let qutient = +number;
        const arr = [];
        do {
            const mod = qutient % radix;
            qutient = (qutient - mod) / radix;
            arr.unshift(chars[mod]);
        } while (qutient);
        return arr.join('');
    };
    const getUUID$1 = () => {
        return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
            const r = Math.random() * 16 | 0;
            const v = c === 'x' ? r : (r & 0x3 | 0x8);
            return v.toString(16);
        });
    };
    /* 获取 22 位的 UUID */
    const getUUID22 = () => {
        let uuid = getUUID$1();
        uuid = uuid.replace(/-/g, '') + '0';
        uuid = parseInt(uuid, 16);
        uuid = string10to64(uuid);
        if (uuid.length > 22) {
            uuid = uuid.slice(0, 22);
        }
        return uuid;
    };
    /**
     * 转化 RCResolution 枚举值为分辨率宽高
     * @param resolution
     * @returns
     */
    const transResolution = (resolution) => {
        if (RongRTCVideoBitrate[resolution]) {
            const { width, height } = RongRTCVideoBitrate[resolution];
            return { width, height };
        }
        // 保留原有逻辑，防止客户有自定义传值解析异常
        const [width, height] = resolution.split('_').map(item => {
            return parseInt(item.replace(/[^\d]/g, ''));
        });
        return { width, height };
    };
    /**
     * 判断枚举值有效性
     * @param resolution
     * @returns
     */
    const isValidResolution = (resolution) => {
        return !!exports.RCResolution[resolution];
    };
    /**
     * 判断帧率枚举值有效性
     * @param fps
     * @returns
     */
    const isValidFPS = (fps) => {
        return !!exports.RCFrameRate[fps];
    };
    /**
     * 获取枚举值对应的帧率
     * @param fps
     * @returns
     */
    const transFrameRate = (fps) => {
        return parseInt(fps.replace('FPS_', ''));
    };
    const browserInfo = (() => {
        const { browser, version, supportsUnifiedPlan } = adapter.browserDetails;
        return {
            browser,
            version: version,
            // 非明确显示不支持 unified-plan 的浏览器，默认为支持 unified-plan
            supportsUnifiedPlan: supportsUnifiedPlan !== false
        };
    })();
    /**
     * 验证浏览器是否支持创建自定义文件流
     * @returns
     */
    function ifSupportLocalFileTrack() {
        return 'captureStream' in HTMLMediaElement.prototype || 'mozCaptureStream' in HTMLMediaElement.prototype;
    }
    /**
     * 验证浏览器是否支持屏幕共享
     * @returns
     */
    function ifSupportScreenShare() {
        return 'mediaDevices' in navigator && 'getDisplayMedia' in navigator.mediaDevices;
    }
    /**
     * 检查参数是否为 null
    */
    const isNull = (val) => {
        return Object.prototype.toString.call(val) === '[object Null]';
    };
    /**
     * 公有云连接私有云 SDK 为非法连接
     */
    const isIllegalConnection = (navi) => {
        return navi.type === 1;
    };
    /**
     * 获取将要发布的 track 数量
     * 需要发布小流的算两个 track
     */
    const calcTracksNum = (tracks, pc) => {
        let length = 0;
        tracks.forEach(item => {
            const trackId = item instanceof RCLocalTrack ? item.getTrackId() : item.track.getTrackId();
            /**
             * 已经发布过的 track，不计入个数
             */
            if (pc.getLocalTrack(trackId)) {
                return;
            }
            if (item instanceof RCLocalTrack) {
                length++;
            }
            else if (item.pubTiny && item.track.isVideoTrack()) {
                length += 2;
            }
        });
        return length;
    };
    /**
     * 解析房间数据
     */
    const parseRoomData = (data, mainRoomId) => {
        const result = {};
        const userIds = Object.keys(data.users);
        userIds.length && userIds.forEach(userId => {
            const tmp = [];
            const userData = data.users[userId];
            /**
             * 过滤掉副房间身份的人员
             */
            if (userData.extra) {
                const roomId = JSON.parse(userData.extra).roomId;
                if (mainRoomId !== roomId) {
                    return;
                }
            }
            if (userData.uris) {
                try {
                    tmp.push(...JSON.parse(userData.uris));
                }
                catch (error) {
                    logger.warn(`invalid user data -> userId: ${userId}, userData: ${userData}`);
                }
            }
            result[userId] = tmp;
        });
        return result;
    };
    const isRepeatPub = (newPub, allPublishList) => {
        let isInclude = false;
        let index = 0;
        for (let i = 0; i < allPublishList.length; i++) {
            const oldPub = allPublishList[i];
            if (`${newPub.msid}_${newPub.mediaType}` === `${oldPub.msid}_${oldPub.mediaType}`) {
                isInclude = true;
                index = i;
                break;
            }
        }
        return {
            isInclude,
            index
        };
    };
    /**
     * 从加房间返回的数据中获取加入的副房间
     */
    const getPKInfoByRoomData = (mainRoomId, roomInfo) => {
        const pkInfo = {};
        roomInfo.forEach((item) => {
            const PKValue = JSON.parse(item.value);
            const { inviterRoomId, inviteeRoomId } = PKValue;
            const roomId = (mainRoomId === inviterRoomId) ? inviteeRoomId : inviterRoomId;
            pkInfo[roomId] = JSON.parse(item.value);
        });
        return pkInfo;
    };
    /**
     * 解析观众加房间 kv 数据
     * 远端无人员时，kvEntries 的 key 不包含 RC_ANCHOR_LIST
     * 远端无资源时，key 不包含 RC_RES_、RC_CDN
     * 远端有资源、无 CDN 资源时，key 不包含 RC_CDN
     * 服务端 bug，偶现无 RC_RTC_SESSIONID
     */
    const parseAudienceRoomData = (roomId, kvEntries) => {
        const session = kvEntries.filter((kvItem) => {
            return kvItem.key === 'RC_RTC_SESSIONID';
        })[0];
        const sessionId = session ? session.value : '';
        /**
         * 房间内远端人员
         */
        const remoteUserIds = kvEntries.filter((kvItem) => {
            return kvItem.key === 'RC_ANCHOR_LIST';
        }).map((kvItem) => JSON.parse(kvItem.value || '[]'))[0];
        /**
         * 远端 RTC、MUC 资源
         */
        const remoteRes = kvEntries.filter((kvItem) => {
            return kvItem.key.includes('RC_RES_');
        }).map((kvItem) => JSON.parse(kvItem.value || '{}'));
        /**
         * 远端 MUC 资源
         */
        const remoteMUCUris = remoteRes.length ? JSON.parse(remoteRes[0].mcu_uris || '[]') : [];
        /**
         * 远端 MUC tracks
         */
        const remoteMCUTracks = [];
        remoteMUCUris.forEach((uri) => {
            const { mediaType, tag } = uri;
            const track = mediaType === exports.RCMediaType.AUDIO_ONLY ? new RCRemoteAudioTrack(tag, '', roomId) : new RCRemoteVideoTrack(tag, '', roomId);
            remoteMCUTracks.push(track);
        });
        /**
         * 远端 RTC 资源
         */
        const remoteRTCUris = [];
        /**
         * 远端 RTC tracks
         */
        const remoteRTCTracks = [];
        remoteRes.forEach((res) => {
            const RTCUris = JSON.parse(res.uris || '[]');
            remoteRTCUris.push(...RTCUris);
            RTCUris.forEach((uri) => {
                const { mediaType, tag, msid } = uri;
                const userId = msid.split('_')[0];
                const track = mediaType === exports.RCMediaType.AUDIO_ONLY ? new RCRemoteAudioTrack(tag, userId) : new RCRemoteVideoTrack(tag, userId);
                remoteRTCTracks.push(track);
            });
        });
        /**
         * 房间内 CDN 信息
         */
        const CDNUris = kvEntries.filter((kvItem) => {
            return kvItem.key === 'RC_CDN';
        }).map((kvItem) => {
            const CDNUriStr = JSON.parse(kvItem.value || '[]');
            return JSON.parse(CDNUriStr.cdn_uris)[0];
        })[0];
        return {
            sessionId,
            remoteUserIds: remoteUserIds || [],
            remoteRTCUris,
            remoteMUCUris,
            remoteRTCTracks,
            remoteMCUTracks,
            remoteTracks: [...remoteRTCTracks, ...remoteMCUTracks],
            CDNUris: CDNUris || {}
        };
    };
    const getTrackIdFromAttr = (track) => {
        if (track instanceof RCTrack) {
            return track.getTrackId();
        }
        return track.track.getTrackId();
    };
    const int64ToTimestamp = (obj) => {
        if (!engine.isObject(obj) || obj.low === undefined || obj.high === undefined) {
            return obj;
        }
        let low = obj.low;
        if (low < 0) {
            low += 0xffffffff + 1;
        }
        low = low.toString(16);
        const timestamp = parseInt(obj.high.toString(16) + '00000000'.replace(new RegExp('0{' + low.length + '}$'), low), 16);
        return timestamp;
    };

    /**
     * RTC 消息类型常量
     * @private
     */
    var RCRTCMessageType;
    (function (RCRTCMessageType) {
        /**
         * 增量资源发布消息
         * @deprecated
         */
        RCRTCMessageType["PUBLISH"] = "RCRTC:PublishResource";
        /**
         * 增量资源取消发布消息
         * @deprecated
         */
        RCRTCMessageType["UNPUBLISH"] = "RCRTC:UnpublishResource";
        /**
         * 增量资源状态变更消息
         * @deprecated
         */
        RCRTCMessageType["MODIFY"] = "RCRTC:ModifyResource";
        /**
         * 全量资源变更消息
         */
        RCRTCMessageType["TOTAL_CONTENT_RESOURCE"] = "RCRTC:TotalContentResources";
        /**
         * 房间人员变更
         */
        RCRTCMessageType["STATE"] = "RCRTC:state";
        /**
         * 房间属性变更
         */
        RCRTCMessageType["ROOM_NOTIFY"] = "RCRTC:RoomNtf";
        /**
         * 房间用户属性变更
         */
        RCRTCMessageType["USER_NOTIFY"] = "RCRTC:UserNtf";
        /**
         * 被服务踢出房间
         */
        RCRTCMessageType["KICK"] = "RCRTC:kick";
        /**
         * 跨房间连麦 PK 请求消息
         */
        RCRTCMessageType["PK_INVITE"] = "RCRTC:invite";
        /**
         * 连麦请求超时
         */
        RCRTCMessageType["PK_INVITE_TIMEOUT"] = "RCRTC:inviteTimeout";
        /**
         * 跨房间连麦 PK 取消请求消息
         */
        RCRTCMessageType["PK_CANCEL_INVITE"] = "RCRTC:cancelInvite";
        /**
         * 跨房间连麦 PK 请求响应消息
         */
        RCRTCMessageType["PK_INVITE_ANSWER"] = "RCRTC:answerInvite";
        /**
         * 结束跨房间连麦 PK 消息
         */
        RCRTCMessageType["PK_END"] = "RCRTC:endInvite";
        /**
         * 连麦的房间不再了或离线了，主直播房间会收到的消息通知
         */
        RCRTCMessageType["OTHER_ROOM_OFFLINE"] = "RCRTC:otherRoomOffline";
        /**
         * 订阅、取消订阅动作成功
         */
        RCRTCMessageType["ROOM_TASK_FINISH"] = "RCRTC:roomTaskFinish";
    })(RCRTCMessageType || (RCRTCMessageType = {}));

    exports.RCRTCPingResult = void 0;
    (function (RCRTCPingResult) {
        RCRTCPingResult["SUCCESS"] = "Success";
        RCRTCPingResult["FAIL"] = "Fail";
    })(exports.RCRTCPingResult || (exports.RCRTCPingResult = {}));

    /**
     * rtcping 间隔
     */
    const PING_GAP = 5 * 1000;
    /**
     * rtcping 超时时间
     */
    const PING_TIMEOUT = 5 * 1000;
    /**
     * RTCPing 类，在下发的 ping 超时时间 _offlineKickTime 内，未能 Ping 成功则认为 ping 失败
     */
    class Pinger {
        constructor(_roomId, _roomMode, _context, _gap = PING_GAP, _offlineKickTime = 60 * 1000) {
            this._roomId = _roomId;
            this._roomMode = _roomMode;
            this._context = _context;
            this._gap = _gap;
            this._offlineKickTime = _offlineKickTime;
            /**
             * 记录最近一次成功的 Ping 时间戳
             */
            this._latestTimestamp = Date.now();
            this._started = false;
            this._timer = null;
        }
        /**
         * 启动 Ping
         */
        start() {
            if (this._started) {
                return;
            }
            logger.info('rtcping start ->');
            engine.logger.info(RCLoggerTag.L_PINGER_START_O, {
                status: RCLoggerStatus.SUCCESSED,
                interval: this._gap
            }, {
                logSource: engine.LogSource.RTC
            });
            this._started = true;
            this._checkAlive();
        }
        _sendPing() {
            return new Promise(resolve => {
                this._context.rtcPing(this._roomId, this._roomMode)
                    .then(resolve)
                    .catch(error => {
                    logger.error(`rtcping receive unknown error -> ${error}`);
                    resolve(engine.ErrorCode.UNKNOWN);
                });
                setTimeout(resolve, PING_TIMEOUT, engine.ErrorCode.TIMEOUT);
            });
        }
        async _checkAlive() {
            var _a, _b, _c;
            logger.info('rtcping ->');
            const code = await this._sendPing();
            const now = Date.now();
            // ping 成功
            if (code === engine.ErrorCode.SUCCESS) {
                logger.info('rtcping success ->');
                this._latestTimestamp = now;
                (_a = this.onPingResult) === null || _a === void 0 ? void 0 : _a.call(this, exports.RCRTCPingResult.SUCCESS);
                // 延迟递归
                this._timer = setTimeout(() => this._checkAlive(), this._gap);
                return;
            }
            if (code === engine.ErrorCode.TIMEOUT) {
                engine.logger.error(RCLoggerTag.L_PINGER_TIMEOUT_O, {
                    status: RCLoggerStatus.TIMEOUT
                }, {
                    logSource: engine.LogSource.RTC
                });
            }
            logger.warn(`rtcping failed -> code: ${code}`);
            (_b = this.onPingResult) === null || _b === void 0 ? void 0 : _b.call(this, exports.RCRTCPingResult.FAIL);
            // 超出 _offlineKickTime 未 ping 成功，或用户已不存在于房间内时，通知客户离线
            if (code === 40003 || now - this._latestTimestamp > this._offlineKickTime) {
                this.stop();
                (_c = this.onFailed) === null || _c === void 0 ? void 0 : _c.call(this, code === 40003);
                return;
            }
            // 延迟发 rtcping，避免调用栈递归阻塞
            this._timer = setTimeout(() => this._checkAlive(), 500);
        }
        stop() {
            if (!this._started) {
                return;
            }
            logger.info('rtcping stop ->');
            engine.logger.info(RCLoggerTag.L_PINGER_STOP_O, {
                status: RCLoggerStatus.SUCCESSED
            }, {
                logSource: engine.LogSource.RTC
            });
            this._started = false;
            if (this._timer) {
                clearTimeout(this._timer);
                this._timer = null;
            }
        }
    }

    const STAT_NONE = -1;
    const DETECT_MINUTE = 120; // ping 探测有效期默认 120 分钟
    const NAVI_REFETCH_COUNT = 5; // 与 Android 、iOS 协商目前当次连接做多刷新 navi 5 次

    const getUUID = () => {
        return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
            const r = Math.random() * 16 | 0;
            const v = c === 'x' ? r : (r & 0x3 | 0x8);
            return v.toString(16);
        });
    };
    const randomNum = (min, max) => {
        return min + Math.floor(Math.random() * (max - min));
    };
    /**
     * 解析导航数据获取 RTC Server 地址
     * @param info
     */
    const parseNaviInfo = (info) => {
        var _a;
        if (!info) {
            return [];
        }
        let voipInfo;
        try {
            voipInfo = JSON.parse(info.voipCallInfo || '{ "strategy": 0 }');
        }
        catch (error) {
            logger.warn('parse `voipCallInfo` of navi failed: ' + info.voipCallInfo);
            return [];
        }
        if (voipInfo.strategy === 0) {
            return [];
        }
        const engines = (_a = voipInfo.callEngine) === null || _a === void 0 ? void 0 : _a.filter(item => item.engineType === 4);
        if (!engines || engines.length === 0) {
            return [];
        }
        const engine = engines[0];
        const result = [];
        engine.mediaServer && result.push(engine.mediaServer.replace(/^(https?:\/\/)?/, 'https://'));
        if (engine.backupMediaServer) {
            engine.backupMediaServer.forEach(item => {
                result.push(item.replace(/^(https?:\/\/)?/, 'https://'));
            });
        }
        return result;
    };
    const getCommonHeader$1 = () => ({
        'Content-Type': 'application/json;charset=UTF-8',
        'Cache-Control': 'no-cache',
        ClientType: `web|${browserInfo.browser}|${browserInfo.version}`,
        ClientVersion: "5.5.1-alpha.1",
        'Client-Session-Id': getUUID(),
        'Request-Id': Date.now().toString()
    });
    /**
     * 根据探测地址 list 发 ping 拿到返回最快的 Media 地址
     * @param hosts 探测地址 list
     * @param runtime
     * @returns
     */
    const getFastMediaUrl = async (hosts, runtime, jwt) => {
        // 根据 /ping 的响应速度对 hosts 进行排序响应速度排序
        const pingRes = [];
        await Promise.any(hosts.map(async (host) => {
            const detectorAddr = host.detectorAddr.replace(/^(https?:\/\/)?/, 'https://');
            const url = `${detectorAddr}/rtc/detector/ping?t=${randomNum(1000, 9999)}`;
            // 临时测试测试使用
            // const url = `${detectorAddr}/state/server?t=${randomNum(1000, 9999)}`
            const body = { jwt };
            const res = await runtime.httpReq({
                url,
                body: JSON.stringify(body),
                timeout: engine.PING_REQ_TIMEOUT,
                method: engine.HttpMethod.POST
            });
            logger.info(`ping res => ${JSON.stringify({ status: res.status, host })}`);
            if (res.status === 200) {
                pingRes.push(host.clusterId);
            }
            else {
                return Promise.reject();
            }
        }));
        return pingRes;
    };
    /**
     * @param info navi 信息
     * @returns
     */
    const parseDetectorServer = (info) => {
        var _a;
        if (!info) {
            return '';
        }
        let voipInfo;
        try {
            voipInfo = JSON.parse(info.voipCallInfo || '{ "strategy": 0 }');
        }
        catch (error) {
            logger.warn('parse `voipCallInfo` of navi failed: ' + info.voipCallInfo);
            return '';
        }
        if (voipInfo.strategy === 0) {
            return '';
        }
        const engines = (_a = voipInfo.callEngine) === null || _a === void 0 ? void 0 : _a.filter(item => item.engineType === 4);
        if (!engines || engines.length === 0) {
            return '';
        }
        const engine = engines[0];
        return engine.detectorManager ? engine.detectorManager : '';
    };
    /** 获取 jwt token
     * @param info navi 信息
     * @returns
     */
    const parseJWTToken = (info) => {
        if (!info) {
            return '';
        }
        const jwt = info.jwt || '';
        return jwt;
    };
    /**
     * 根据导航下发探测服务的总域名请求探测地址
     * @param runtime
     */
    const getDetectorUrls = async (runtime, naviInfo) => {
        const detectionServer = parseDetectorServer(naviInfo);
        const jwt = parseJWTToken(naviInfo);
        let fastMediaUrl = null;
        let clientDetectMinute = DETECT_MINUTE;
        let status = 0;
        const body = { jwt: jwt };
        // navi 下发 detectionServer 或者 jwt 为空时不走嗅探逻辑
        if (detectionServer && jwt) {
            const resStr = await runtime.httpReq({
                url: `${detectionServer}/rtc/detector/servers`,
                body: JSON.stringify(body),
                headers: getCommonHeader$1(),
                method: engine.HttpMethod.POST
            });
            const detectoraddrs = resStr.data && JSON.parse(resStr.data).detectorAddrs;
            clientDetectMinute = resStr.data && JSON.parse(resStr.data).clientDetectMinute;
            status = resStr.data && JSON.parse(resStr.data).resultCode;
            if (detectoraddrs && engine.isArray(detectoraddrs)) {
                fastMediaUrl = await getFastMediaUrl(detectoraddrs, runtime, jwt);
            }
        }
        return { fastMediaUrl, clientDetectMinute, status };
    };

    const getCommonHeader = () => ({
        'Content-Type': 'application/json;charset=UTF-8',
        'Cache-Control': 'no-cache',
        ClientType: `web|${browserInfo.browser}|${browserInfo.version}`,
        ClientVersion: "5.5.1-alpha.1",
        'Client-Session-Id': getUUID(),
        'Request-Id': Date.now().toString()
    });
    class RCMediaService {
        constructor(_runtime, _context, 
        /**
         * 自定义 MediaServer 地址，当有值时，不再使用导航内的地址
         */
        _msUrl, 
        /**
         * 请求超时时长
         */
        _timeout = 5000) {
            this._runtime = _runtime;
            this._context = _context;
            this._msUrl = _msUrl;
            this._timeout = _timeout;
            /**
             * navi 中获取的媒体服务地址
             */
            this._msInNavi = [];
            /**
             * 已失败的请求地址
             */
            this._failedMs = [];
            /**
             * 服务器指纹数据，客户端不得修改，直接透传
             */
            this._rtcFinger = undefined;
            /**
             * 服务器接口返回的 clusterId 数据，当此数据有值时，后续所有请求向此服务发送
             */
            this._clusterId = '';
            /**
             * MCU 服务地址
             */
            this._configUrl = '';
            this._msList = [];
            // 初始化时判断当前 IM 是否已经处于链接状态，已连接切没有执行过嗅探或嗅探结果无效，主动触发一次嗅探逻辑
            if (!RCMediaService.isDetector && _context.getConnectionStatus() === engine.ConnectionStatus.CONNECTED) {
                this.detectorMediaSever();
            }
        }
        detectorMediaSever() {
            // 如果有传入自定义 MediaServer 地址不走探测逻辑
            if (this._msUrl) {
                return;
            }
            const nowDate = Date.now();
            const isValid = (RCMediaService.detectValidMinute + RCMediaService.detectorTime > nowDate);
            RCMediaService.isDetector = isValid;
            engine.logger.info(`set msInDetector => ${JSON.stringify(RCMediaService.msInDetector)}`);
            const naviInfo = this._context.getNaviInfo();
            if (!isValid && naviInfo && engine.notEmptyObject(naviInfo)) {
                this._msList = [];
                this._getDetectorUrls(naviInfo);
            }
        }
        /**
         *  地址探测
         *  RTC 初始化时检测是否可以拿到 navi，可以拿到开始嗅探
         *  拿不到等 IM 链接成功后，再回调中调用开始嗅探
         */
        async _getDetectorUrls(naviInfo) {
            if (RCMediaService.isDetector) {
                return;
            }
            RCMediaService.isDetector = true;
            const { fastMediaUrl, clientDetectMinute, status } = await getDetectorUrls(this._runtime, naviInfo);
            if (status === exports.RCRTCCode.JWT_TIME_OUT) {
                // 返回 1004 状态需要重新请求 navi获取新的 jwt token
                if (RCMediaService.naviRefetchCount < NAVI_REFETCH_COUNT) {
                    const context = this._context.getPluginContext();
                    context.refetchNaviInfo().then(() => {
                        this.detectorMediaSever();
                    });
                    ++RCMediaService.naviRefetchCount;
                    logger.info(`RCMediaService refetch navi count => ${RCMediaService.naviRefetchCount}`);
                }
            }
            RCMediaService.msInDetector = fastMediaUrl || [];
            RCMediaService.detectorTime = Date.now();
            RCMediaService.detectValidMinute = clientDetectMinute * 60 * 1000;
            logger.info(`RCMediaService detectorTime => ${RCMediaService.detectorTime}`);
            logger.info(`RCMediaService detectValidMinute => ${RCMediaService.detectValidMinute}`);
        }
        getNaviMS() {
            if (this._msUrl) {
                return [this._msUrl];
            }
            // 如果存在 _clusterId 或者 _msList 为空重新构造 _msList 列表
            if (!engine.notEmptyArray(this._msList) || this._clusterId) {
                this._msList = this.setMediaServiceList();
            }
            return this._msList;
        }
        /**
         * _mslist 列表排序：[_clusterId, ping1, 主域名，ping2, ..., pingN, 备用域名list ]
         * ping1 ：ping 结果返回最快值
         */
        setMediaServiceList() {
            let backupMsInDetector = [];
            let backupMsInNavi = [];
            if (this._clusterId) {
                this._clusterId = this._clusterId.replace(/^(https?:\/\/)?/, 'https://');
                this._msList.push(this._clusterId);
            }
            logger.info(`MediaServiceList _clusterId -> ${this._clusterId}`);
            if (engine.notEmptyArray(RCMediaService.msInDetector)) {
                RCMediaService.msInDetector = RCMediaService.msInDetector.map(item => item.replace(/^(https?:\/\/)?/, 'https://'));
                this._msList.push(RCMediaService.msInDetector[0]);
                backupMsInDetector = RCMediaService.msInDetector.concat().splice(1, RCMediaService.msInDetector.length - 1);
            }
            logger.info(`MediaServiceList msInDetector ->${JSON.stringify(RCMediaService.msInDetector)}`);
            if (this._msInNavi.length === 0) {
                if (this._failedMs.length === 0) {
                    this._msInNavi.push(...parseNaviInfo(this._context.getNaviInfo()));
                }
                else {
                    this._msInNavi.push(...this._failedMs);
                    this._failedMs.length = 0;
                }
            }
            logger.info(`MediaServiceList _msInNavi-> ${JSON.stringify(this._msInNavi)}`);
            backupMsInNavi = this._msInNavi.concat().splice(1, this._msInNavi.length - 1);
            this._msList.push(this._msInNavi[0]);
            this._msList = [...this._msList, ...backupMsInDetector, ...backupMsInNavi];
            this._msList = [...new Set(this._msList)];
            logger.info(`MediaServiceList msList -> ${JSON.stringify(this._msList)}`);
            return this._msList;
        }
        /**
         * 发送请求，请求发送若失败，会继续尝试使用后续可用地址直到无地址可用，此时认为请求失败
         * @param path
         * @param header
         * @param body
         */
        async _request(path, headers, body) {
            const urls = this.getNaviMS();
            if (urls.length === 0) {
                logger.warn(`request '${path}' failed -> have no valid service address.`);
                engine.logger.error(RCLoggerTag.L_MEDIA_SERVICE_REQUEST_R, {
                    status: RCLoggerStatus.FAILED,
                    code: exports.RCRTCCode.NOT_OPEN_VIDEO_AUDIO_SERVER,
                    msg: 'invalid navi_url'
                }, {
                    logSource: engine.LogSource.RTC
                });
                return { code: exports.RCRTCCode.NOT_OPEN_VIDEO_AUDIO_SERVER };
            }
            if (this._rtcFinger) {
                body.rtcFinger = this._rtcFinger;
            }
            for (let i = 0; i < urls.length; i += 1) {
                const url = `${urls[i]}${path}`;
                const commonHeader = getCommonHeader();
                const mergeHeaders = Object.assign(Object.assign({}, commonHeader), headers);
                const jsonBody = JSON.stringify(body);
                const reqId = commonHeader['Request-Id'];
                engine.logger.info(RCLoggerTag.L_MEDIA_SERVICE_REQUEST_T, {
                    url,
                    // headers,
                    // body,
                    reqId
                }, {
                    logSource: engine.LogSource.RTC
                });
                logger.info(`request -> Request-Id: ${reqId}, url: ${url}, headers: ${JSON.stringify(mergeHeaders)}, body: ${jsonBody}`);
                const { status, data } = await this._runtime.httpReq({
                    url,
                    body: jsonBody,
                    headers: mergeHeaders,
                    method: engine.HttpMethod.POST,
                    timeout: this._timeout
                });
                if (status === 200) {
                    const resp = JSON.parse(data);
                    if (resp.rtcFinger) {
                        this._rtcFinger = resp.rtcFinger;
                    }
                    if (resp.clusterId) {
                        this._clusterId = resp.clusterId;
                    }
                    logger.info(`request success -> Request-Id: ${reqId}`);
                    engine.logger.info(RCLoggerTag.L_MEDIA_SERVICE_REQUEST_R, {
                        status: RCLoggerStatus.SUCCESSED,
                        url,
                        reqId
                    }, {
                        logSource: engine.LogSource.RTC
                    });
                    return { code: exports.RCRTCCode.SUCCESS, data: resp };
                }
                else {
                    logger.warn(`request failed -> Request-Id: ${reqId}, status: ${status}, url: ${url}`);
                    // 失败的请求需记录，避免多配置时总是请求无效的地址
                    this._failedMs.push(...this._msInNavi.splice(i, 1));
                    engine.logger.error(RCLoggerTag.L_MEDIA_SERVICE_REQUEST_R, {
                        status: RCLoggerStatus.FAILED,
                        code: '',
                        reqId,
                        url,
                        msg: `request error -> Request-Id: ${reqId}, status: ${status}, url: ${url}`
                    }, {
                        logSource: engine.LogSource.RTC
                    });
                }
            }
            return { code: exports.RCRTCCode.REQUEST_FAILED };
        }
        /**
         * 资源协商接口，订阅、发布、变更资源均可以使用此接口。该接口通过 sdp 字段交换 SDP 信息，
         * 并通过 subscribeList 和 publishList 表明最终发布和订阅的资源。本端产出 offer，服务器产出 answer
         * 每次接口调用，都会全量覆盖发布和订阅的资源。
         * @param header
         * @param body
         */
        async exchange(headers, body) {
            var _a;
            const data = await this._request('/exchange', headers, body);
            if (data.code === exports.RCRTCCode.SUCCESS && ((_a = data.data) === null || _a === void 0 ? void 0 : _a.resultCode) === exports.RCRTCCode.SUCCESS) {
                const urls = data.data.urls;
                if (urls) {
                    this._configUrl = urls.configUrl;
                }
            }
            return data;
        }
        /**
         * 退出房间
         */
        async exit(headers) {
            const { code } = await this._request('/exit', headers, {});
            return code;
        }
        /**
         * 观众端订阅主播资源
         */
        broadcastSubscribe(headers, body) {
            return this._request('/broadcast/subscribe', headers, body);
        }
        /**
         * 观众端退出订阅
         */
        async broadcastExit(headers) {
            const { code } = await this._request('/broadcast/exit', headers, {});
            return { code };
        }
        /**
         * 直播推流、自定义布局配置
         */
        async setMcuConfig(headers, body) {
            engine.logger.info(RCLoggerTag.L_MEDIA_SERVICE_SET_MCU_CONFIG_T, {
                headers,
                body
            }, {
                logSource: engine.LogSource.RTC
            });
            if (!this._configUrl) {
                logger.warn('RCMediaService.setMcuConfig failed -> RCRTCCode.MCU_SERVER_NOT_FOUND');
                engine.logger.error(RCLoggerTag.L_MEDIA_SERVICE_SET_MCU_CONFIG_R, {
                    status: RCLoggerStatus.FAILED,
                    code: exports.RCRTCCode.MCU_SERVER_NOT_FOUND,
                    msg: 'MCU not found'
                }, {
                    logSource: engine.LogSource.RTC
                });
                return { code: exports.RCRTCCode.MCU_SERVER_NOT_FOUND };
            }
            // mcu 地址默认使用 https 协议
            const url = `${this._configUrl.replace(/^(https?:\/\/)?/, 'https://')}/server/mcu/config`;
            const commonHeader = getCommonHeader();
            const mergeHeaders = Object.assign(Object.assign({}, commonHeader), headers);
            const jsonBody = JSON.stringify(body);
            const reqId = commonHeader['Request-Id'];
            logger.info(`request -> Request-Id: ${reqId}, url: ${url}, headers: ${JSON.stringify(mergeHeaders)}, body: ${jsonBody}`);
            const { status, data: jsonStr } = await this._runtime.httpReq({
                url,
                headers: mergeHeaders,
                body: jsonBody,
                method: engine.HttpMethod.POST
            });
            if (status === 200) {
                logger.info(`request success -> Request-Id: ${reqId}`);
                const data = JSON.parse(jsonStr);
                engine.logger.info(RCLoggerTag.L_MEDIA_SERVICE_SET_MCU_CONFIG_R, {
                    status: RCLoggerStatus.SUCCESSED,
                    reqId
                }, {
                    logSource: engine.LogSource.RTC
                });
                return { code: data.resultCode, res: data };
            }
            logger.warn(`request failed -> Request-Id: ${reqId}, status: ${status}, url: ${url}`);
            engine.logger.error(RCLoggerTag.L_MEDIA_SERVICE_SET_MCU_CONFIG_R, {
                status: RCLoggerStatus.FAILED,
                code: exports.RCRTCCode.REQUEST_FAILED,
                msg: `request error -> Request-Id: ${reqId}, status: ${status}, url: ${url}`
            }, {
                logSource: engine.LogSource.RTC
            });
            return { code: exports.RCRTCCode.REQUEST_FAILED };
        }
        /**
         * 房间内观众获取 CDN 资源信息、拉流地址
         */
        async getCDNResourceInfo(headers, url) {
            engine.logger.info(RCLoggerTag.L_MEDIA_SERVICE_GET_CDN_RESOURCE_INFO_T, {
                headers,
                url
            }, {
                logSource: engine.LogSource.RTC
            });
            const commonHeader = getCommonHeader();
            const mergeHeaders = Object.assign(Object.assign({}, commonHeader), headers);
            const reqId = commonHeader['Request-Id'];
            logger.info(`request -> Request-Id: ${reqId}, url: ${url}, headers: ${JSON.stringify(mergeHeaders)}`);
            const { status, data: resStr } = await this._runtime.httpReq({
                url,
                headers: mergeHeaders,
                method: engine.HttpMethod.GET
            });
            if (status === 200) {
                logger.info(`request success -> Request-Id: ${commonHeader['Request-Id']}`);
                const data = JSON.parse(resStr);
                engine.logger.info(RCLoggerTag.L_MEDIA_SERVICE_GET_CDN_RESOURCE_INFO_R, {
                    status: RCLoggerStatus.SUCCESSED,
                    reqId: commonHeader['Request-Id']
                }, {
                    logSource: engine.LogSource.RTC
                });
                return { code: data.resultCode, res: data };
            }
            logger.warn(`request failed -> Request-Id: ${commonHeader['Request-Id']}, status: ${status}, url: ${url}`);
            engine.logger.info(RCLoggerTag.L_MEDIA_SERVICE_GET_CDN_RESOURCE_INFO_R, {
                status: RCLoggerStatus.FAILED,
                code: exports.RCRTCCode.REQUEST_FAILED,
                msg: `request error -> Request-Id: ${commonHeader['Request-Id']}, status: ${status}, url: ${url}`
            }, {
                logSource: engine.LogSource.RTC
            });
            return { code: exports.RCRTCCode.REQUEST_FAILED };
        }
    }
    /**
     * 嗅探中获取的媒体服务地址
     */
    RCMediaService.isDetector = false;
    /**
     * 嗅探中获取的媒体服务地址
     */
    RCMediaService.msInDetector = [];
    // 记录执行探测时间
    RCMediaService.detectorTime = 0;
    // 默认有效 120 分钟
    RCMediaService.detectValidMinute = DETECT_MINUTE * 60 * 1000;
    // 一次链接中最多刷新 navi 5 次
    // TODO: 仅为和移动端对其规则，实现方案待考量，应该按照有效时间规范 navi刷新次数，不该是定死的数值
    RCMediaService.naviRefetchCount = 0;

    /**
     * 资源大小流标识枚举
     */
    var RCStreamType;
    (function (RCStreamType) {
        /**
         * 普通流（大流）
         */
        RCStreamType[RCStreamType["NORMAL"] = 1] = "NORMAL";
        /**
         * 小流
         */
        RCStreamType[RCStreamType["TINY"] = 2] = "TINY";
    })(RCStreamType || (RCStreamType = {}));

    const getBitrate = (dTime, dBytes) => {
        // 码率计算：字节数差比时间差，单位 kbps
        // const bitrate = Math.round(dBytes * 8 / 1000 / (dTime / 1000))
        const bitrate = Math.round(dBytes * 8 / dTime);
        return bitrate;
    };
    /**
     * 限制浮点数小数位的有效位数
     * @param value
     * @param fractionDigits 小数点后保留的有效数字位数
     */
    const fixed = (value, fractionDigits = 2) => {
        // return parseFloat(value.toFixed(fractionDigits))
        const rate = 10 ** fractionDigits;
        return Math.round(value * rate) / rate;
    };
    /**
     * 处理音量 * 100，并向下取整
     */
    const handleAudioLevel = (audioLevel, factor = 2) => {
        if (audioLevel > 1) {
            audioLevel = audioLevel / 32767;
        }
        const rate = 10 ** factor;
        return Math.round(audioLevel * rate);
    };
    /**
     * 计算丢包率
     * @param packetsLost 当前统计丢包总数
     * @param packets 当前统计总包数
     * @param prePacketsLost 前次统计丢包总数
     * @param prePackets 前次统计总包数
     */
    const getPacketsLostRate = (packetsLost, packets, prePacketsLost, prePackets) => {
        // 总包数为 0 时，无丢包率
        if (packets === 0) {
            return 0;
        }
        // 没有前次统计记录，当次的丢包可直接计算丢包率
        if (!prePacketsLost || !prePackets) {
            return fixed(packetsLost / packets, 3);
        }
        const dPackets = packets - prePackets;
        if (dPackets === 0) {
            // 总包数无变更，不存在丢包概念
            return 0;
        }
        const dPacketsLost = packetsLost - prePacketsLost;
        /**
         * 每秒发送总码率(bitrateSend)、每秒接收总码率(bitrateRecv)、丢包率(packetsLostRate)计算依赖本地存储的前一次数据
         * 但订阅关系发生变化时，存在 bytesSent 从 0 开始算的情况，会导致计算出的 bitrateSend 为负数（此时丢包数没有从 0 开始算）
         * 鉴于存在一系列超出预期范围的情况，bitrateSend、bitrateRecv、packetsLostRate 为负数时，给业务层抛 0
         */
        if (dPacketsLost < 0 || dPackets < 0) {
            return 0;
        }
        return fixed(dPacketsLost / dPackets, 3);
    };
    const senderHasRemoteData = (sender) => {
        const { jitter, rtt, packetsLostRate } = sender;
        if (isNull(jitter) && isNull(rtt) && packetsLostRate === 0) {
            return false;
        }
        return true;
    };

    class AbstractStatParser {
        constructor(_rtcPeerConn, _sdpSemantics, _currentUserId) {
            this._rtcPeerConn = _rtcPeerConn;
            this._sdpSemantics = _sdpSemantics;
            this._currentUserId = _currentUserId;
            /**
             * 最近的上行发送包数据统计
             */
            this._latestPacketsSent = {};
            /**
             * 最近的上行发送字节数统计
             */
            this._latestBytesSent = {};
            /**
             * 最近的下行接收字节数统计
             */
            this._latestBytesRecv = {};
            /**
             * 最近的下行接收包数据统计
             */
            this._latestPacketsRecv = {};
        }
        /**
         * 更新上行码率存储，返回计算出的码率
         * @param resourceId
         * @param bytesSent 本次发送的字节数
         * @param timestamp
         * @returns bitrate
         */
        updateBytesSent(resourceId, bytesSent, timestamp) {
            if (this._latestBytesSent[resourceId] && bytesSent < this._latestBytesSent[resourceId].bytesSent) {
                this.clearLatestpacketsSent([resourceId]);
            }
            let dBytes;
            let dTime;
            if (!this._latestBytesSent[resourceId]) {
                dBytes = bytesSent;
                dTime = 1000;
                // 更新记录
                this._latestBytesSent[resourceId] = { bytesSent, timestamp };
            }
            else {
                const { bytesSent: preBytesSent, timestamp: preTimestamp } = this._latestBytesSent[resourceId];
                dBytes = bytesSent - preBytesSent;
                dTime = timestamp - preTimestamp;
                // 更新记录
                this._latestBytesSent[resourceId] = {
                    bytesSent,
                    timestamp
                };
            }
            return getBitrate(dTime, dBytes);
        }
        /**
         * 更新下行码率存储，返回计算出的码率
         * @param resourceId
         * @param bytesRecv
         * @param timestamp
         * @returns bitrate
         */
        updateBytesRecv(resourceId, bytesRecv, timestamp) {
            if (this._latestBytesRecv[resourceId] && bytesRecv < this._latestBytesRecv[resourceId].bytesRecv) {
                this.clearLatestPacketsRecv([resourceId]);
            }
            let dBytes;
            let dTime;
            if (!this._latestBytesRecv[resourceId]) {
                dBytes = bytesRecv;
                dTime = 1000;
                // 更新记录
                this._latestBytesRecv[resourceId] = { bytesRecv, timestamp };
            }
            else {
                const { bytesRecv: preBytesRecv, timestamp: preTimestamp } = this._latestBytesRecv[resourceId];
                dBytes = bytesRecv - preBytesRecv;
                dTime = timestamp - preTimestamp;
                // 更新记录
                this._latestBytesRecv[resourceId] = {
                    bytesRecv,
                    timestamp
                };
            }
            return getBitrate(dTime, dBytes);
        }
        /**
         * 更新上行丢包总数，返回计算出的丢包率
         * 计算丢包率
         * 上行数据统计中，packageLost 的统计具有延时性
         * 会导致瞬时的 packetsLost - prePacketsLost 值大于 packetsSent - prePacketsSent，从而丢包率可能大于 1
         * 因此此处计算只在 packetsLost - prePacketsLost !== 0 时计算丢包率，其他时间丢包为 0
         * packetsSent 只在 packetsLost 有变化时更新
         */
        updateSenderPacketsLost(resourceId, packetsLost, packetsSent) {
            let packetsLostRate;
            // 存在 this._latestPacketsSent[resourceId] 中只包含 crtPacketsSent 的情况
            if (!Object.prototype.hasOwnProperty.call(this._latestPacketsSent[resourceId], 'packetsSent')) {
                packetsLostRate = getPacketsLostRate(packetsLost, packetsSent);
                // 更新记录
                this._latestPacketsSent[resourceId].packetsLost = packetsLost;
                this._latestPacketsSent[resourceId].packetsSent = packetsSent;
            }
            else {
                const { packetsLost: prePacketsLost, packetsSent: prePacketsSent } = this._latestPacketsSent[resourceId];
                packetsLostRate = getPacketsLostRate(packetsLost, packetsSent, prePacketsLost, prePacketsSent);
                // 更新记录
                this._latestPacketsSent[resourceId].packetsLost = packetsLost;
                this._latestPacketsSent[resourceId].packetsSent = prePacketsLost === packetsLost ? prePacketsSent : packetsSent;
            }
            return packetsLostRate;
        }
        /**
         * 更新下行丢包总数，返回计算出的丢包率
         */
        updateReceiverPacketsLost(resourceId, packetsLost, packetsReceived) {
            let packetsLostRate;
            if (!this._latestPacketsRecv[resourceId]) {
                packetsLostRate = getPacketsLostRate(packetsLost, packetsReceived);
            }
            else {
                const { packetsLost: prePacketsLost, packetsRecv: prePacketsRecv } = this._latestPacketsRecv[resourceId];
                packetsLostRate = getPacketsLostRate(packetsLost, packetsReceived + packetsLost, prePacketsLost, prePacketsRecv + prePacketsLost);
            }
            this._latestPacketsRecv[resourceId] = {
                packetsLost,
                packetsRecv: packetsReceived
            };
            return packetsLostRate;
        }
        /**
         * 取消发布后，需把 _latestPacketsSent 中 key 为 resourceId 存储的数据清除掉
         */
        clearLatestpacketsSent(resourceIds) {
            resourceIds.forEach((resourceId) => {
                const mediaType = parseInt(resourceId.split('_').pop());
                if (mediaType === exports.RCMediaType.VIDEO_ONLY) {
                    const tinyResourceId = `${resourceId}_tiny`;
                    delete this._latestPacketsSent[tinyResourceId];
                    delete this._latestBytesSent[tinyResourceId];
                }
                delete this._latestPacketsSent[resourceId];
                delete this._latestBytesSent[resourceId];
            });
        }
        /**
         * 取消订阅后，需把 _latestPacketsRecv 中 key 为 resourceId 存储的数据清除掉
         */
        clearLatestPacketsRecv(resourceIds) {
            resourceIds.forEach((resourceId) => {
                delete this._latestPacketsRecv[resourceId];
                delete this._latestBytesRecv[resourceId];
            });
        }
        parseRTCStatsReport(reports) {
            const keys = reports.keys();
            const stats = {};
            let temp = keys.next();
            while (!temp.done) {
                const key = temp.value;
                const value = reports.get(key);
                if (!/^RTCCodec_/.test(key)) {
                    stats[key] = value;
                }
                temp = keys.next();
            }
            return stats;
        }
        formatRCRTCStateReport(stats) {
            const reports = {
                senders: [],
                receivers: []
            };
            engine.logger.info(RCLoggerTag.L_ABSTRACT_STAT_PARSER_FORMAT_RTC_STATE_REPORT_O, {
                status: RCLoggerStatus.SUCCESSED,
                stats,
                reports
            }, {
                logSource: engine.LogSource.RTC
            });
            return reports;
        }
        getAudioLevelList(stats) {
            const audioLevelList = [];
            return audioLevelList;
        }
        /**
         * 从 offer 和 answer 的 sdp 中获取 ssrc 对应的 msid
         * @param statInfo outbound 和 inbound 对应值
         * @returns resourceId
         */
        getResourceIdByParseSdp(statInfo) {
            var _a, _b;
            const ssrc = statInfo.ssrc;
            const kind = statInfo.kind || statInfo.mediaType;
            const offer = (_a = this._rtcPeerConn.currentLocalDescription) === null || _a === void 0 ? void 0 : _a.sdp;
            const answer = (_b = this._rtcPeerConn.currentRemoteDescription) === null || _b === void 0 ? void 0 : _b.sdp;
            let rule;
            if (this._sdpSemantics === 'unified-plan') {
                rule = new RegExp('a=msid:(.*?) ');
            }
            else {
                rule = new RegExp(`a=ssrc:${ssrc} msid:(.*?) `);
            }
            const offerMArr = offer === null || offer === void 0 ? void 0 : offer.split('\r\nm=');
            const selectOfferM = offerMArr === null || offerMArr === void 0 ? void 0 : offerMArr.filter(item => { return item.includes(`a=ssrc:${ssrc}`); })[0];
            const matchOffer = selectOfferM === null || selectOfferM === void 0 ? void 0 : selectOfferM.match(rule);
            let msid = matchOffer ? matchOffer[1] : '';
            if (msid) {
                if (kind === 'audio') {
                    return `${msid}_0`;
                }
                /**
                 * msid 为 userId_tag 或 userId_tag_tiny
                 * 截取完 userId 之后，仅剩 tag 或 tag_tiny
                 */
                const tag = msid.replace(`${this._currentUserId}_`, '');
                const splitTag = tag.split('_');
                /**
                 * tag 或 tag_tiny 最后一位为 tiny，且长度大于 1 时为视频小流
                 */
                if (splitTag.length > 1 && (splitTag[1] === 'tiny')) {
                    return `${this._currentUserId}_${splitTag[0]}_1_tiny`;
                }
                // 视频大流
                return `${msid}_1`;
            }
            const answerMArr = answer === null || answer === void 0 ? void 0 : answer.split('\r\nm=');
            const selectAnswerM = answerMArr === null || answerMArr === void 0 ? void 0 : answerMArr.filter(item => { return item.includes(`a=ssrc:${ssrc}`); })[0];
            const matchAnswer = selectAnswerM === null || selectAnswerM === void 0 ? void 0 : selectAnswerM.match(rule);
            msid = matchAnswer ? matchAnswer[1] : '';
            return msid ? `${msid}_${kind === 'video' ? 1 : 0}` : '';
        }
        /**
         * 从 offer sdp 中查找 ssrc 对应的通道是否可用
         * @param outboundInfo
         */
        isValidSender(outboundInfo) {
            var _a;
            const offer = (_a = this._rtcPeerConn.currentLocalDescription) === null || _a === void 0 ? void 0 : _a.sdp;
            const { ssrc } = outboundInfo;
            const valid = offer === null || offer === void 0 ? void 0 : offer.split('\r\nm=').some(item => (item.includes(ssrc) && item.includes('a=inactive')));
            return !valid;
        }
        /**
         * 从 answer sdp 中查找 ssrc 对应的通道是否可用
         * @param inboundInfo
         */
        isValidReceiver(inboundInfo) {
            var _a;
            const answer = (_a = this._rtcPeerConn.currentRemoteDescription) === null || _a === void 0 ? void 0 : _a.sdp;
            const { ssrc } = inboundInfo;
            const valid = answer === null || answer === void 0 ? void 0 : answer.split('\r\nm=').some(item => (item.includes(ssrc) && item.includes('a=inactive')));
            return !valid;
        }
    }

    /**
     * chrome 73 无 type 为 remote-inbound-rtp 的数据，上行拿不到 jetter、rtt、packetsLost 数据
     */
    class RTCReportParser$2 extends AbstractStatParser {
        formatRCRTCStateReport(stats) {
            const reports = {
                senders: [],
                receivers: []
            };
            // 当次报告创建时的时间戳
            const timestamp = Math.floor(stats.RTCPeerConnection.timestamp);
            reports.timestamp = timestamp;
            const keys = Object.keys(stats);
            // 总丢包数
            let totalPacketsLost = 0;
            // 上行码率总和
            let bitrateSend = 0;
            // 解析上行媒体流数据: RTCOutboundRTPVideoStream | RTCOutboundRTPAudioStream
            const outboundKeys = keys.filter(key => /^RTCOutboundRTP(Video|Audio)Stream_/.test(key));
            outboundKeys.forEach(key => {
                // 本端输出数据
                const outboundInfo = stats[key];
                if (this._sdpSemantics === 'unified-plan' && !this.isValidSender(outboundInfo)) {
                    return;
                }
                const { id, kind, transportId, mediaSourceId, remoteId, packetsSent, bytesSent, trackId, encoderImplementation, pliCount, nackCount, firCount } = outboundInfo;
                if (!trackId) {
                    return;
                }
                // outboundInfo 中取不到 frameWidth, frameHeight, frameRate 时，
                // chrome 73、80 可从 type 为 media-source 中取 frameWidth, frameHeight
                // chrome 80 从 type 为 media-source 中取 frameRate(chrome 73 无 mediaSourceId)
                let { framesPerSecond: frameRate, frameWidth, frameHeight } = outboundInfo;
                if (kind === 'video' && !frameWidth && !frameHeight && !frameRate) {
                    frameWidth = stats[trackId].frameWidth;
                    frameHeight = stats[trackId].frameHeight;
                    frameRate = mediaSourceId ? stats[mediaSourceId].framesPerSecond : null;
                }
                // 远端接收数据
                const remoteStreamInfo = stats[remoteId];
                let jitter = null;
                let rtt = null;
                let packetsLost = 0;
                // 远端流有可能尚未建立
                if (remoteStreamInfo) {
                    jitter = remoteStreamInfo.jitter;
                    rtt = remoteStreamInfo.roundTripTime;
                    packetsLost = remoteStreamInfo.packetsLost;
                }
                totalPacketsLost += packetsLost;
                const resourceId = this.getResourceIdByParseSdp(outboundInfo);
                if (!resourceId) {
                    return;
                }
                const audioLevel = mediaSourceId ? stats[mediaSourceId].audioLevel : stats[trackId].audioLevel;
                let packetsLostRate = null;
                !this._latestPacketsSent[resourceId] && (this._latestPacketsSent[resourceId] = {});
                if (remoteStreamInfo) {
                    packetsLostRate = this.updateSenderPacketsLost(resourceId, packetsLost, packetsSent);
                }
                else {
                    // 无 remoteId 时，需记录 packetsSent
                    this._latestPacketsSent[resourceId].crtPacketsSent = packetsSent;
                }
                // 计算码率
                let bitrate = this.updateBytesSent(resourceId, bytesSent, timestamp);
                if (bitrate < 0) {
                    bitrate = 0;
                }
                // 总和累加
                bitrateSend += bitrate;
                reports.senders.push({
                    id,
                    trackId: resourceId,
                    kind,
                    packetsLostRate,
                    remoteResource: false,
                    audioLevel: (audioLevel || audioLevel === 0) ? handleAudioLevel(audioLevel) : null,
                    frameWidth,
                    frameHeight,
                    frameRate,
                    bitrate,
                    jitter: jitter ? Math.round(jitter * 1000) : jitter,
                    rtt,
                    encoderImplementation,
                    pliCount,
                    nackCount,
                    googFirsSent: STAT_NONE,
                    samplingRate: STAT_NONE,
                    googRenderDelayMs: STAT_NONE,
                    trackState: STAT_NONE
                });
            });
            /**
             * outbound-rtp 存在无 remoteId 的情况，导致取不到有效的 jitter、rtt、packetsLost，
             * 可拿到 remote-inbound-rtp 的 localId，补充 senders 中的 jitter、rtt、packetsLost 数据，重新计算丢包率
            */
            const remoteInboundKeys = keys.filter(key => /RTCRemoteInboundRtp(Video|Audio)Stream_/.test(key));
            remoteInboundKeys.forEach(key => {
                const { localId, jitter, roundTripTime: rtt, packetsLost } = stats[key];
                const sender = reports.senders.filter((item) => {
                    return item.id === localId;
                })[0];
                if (sender && !senderHasRemoteData(sender)) {
                    const resourceId = this.getResourceIdByParseSdp(stats[sender.id]);
                    sender.jitter = Math.round(jitter * 1000);
                    sender.rtt = rtt;
                    const packetsSent = this._latestPacketsSent[resourceId].crtPacketsSent;
                    sender.packetsLostRate = this.updateSenderPacketsLost(resourceId, packetsLost, packetsSent);
                }
            });
            // 下行码率总和
            let bitrateRecv = 0;
            // 下行流数据解析
            const inboundKeys = keys.filter(key => /^RTCInboundRTP(Video|Audio)Stream_/.test(key));
            inboundKeys.forEach(key => {
                const inboundInfo = stats[key];
                if (this._sdpSemantics === 'unified-plan' && !this.isValidReceiver(inboundInfo)) {
                    return;
                }
                const { trackId, packetsLost, packetsReceived, jitter, bytesReceived, framesPerSecond: frameRate, kind, codecImplementationName, nackCount, pliCount } = inboundInfo;
                if (!trackId) {
                    return;
                }
                // inboundInfo 中取不到 frameWidth, frameHeight, audioLevel 时，需从 type 为 track 中取
                let { frameWidth, frameHeight, audioLevel } = inboundInfo;
                if (kind === 'video') {
                    if (!frameWidth && !frameHeight) {
                        frameWidth = stats[trackId].frameWidth;
                        frameHeight = stats[trackId].frameHeight;
                    }
                }
                else if (!audioLevel) {
                    audioLevel = stats[trackId].audioLevel;
                }
                totalPacketsLost += packetsLost;
                const resourceId = this.getResourceIdByParseSdp(inboundInfo);
                const packetsLostRate = this.updateReceiverPacketsLost(resourceId, packetsLost, packetsReceived);
                let bitrate = this.updateBytesRecv(resourceId, bytesReceived, timestamp);
                if (bitrate < 0) {
                    bitrate = 0;
                }
                bitrateRecv += bitrate;
                reports.receivers.push({
                    trackId: resourceId,
                    kind,
                    packetsLostRate,
                    remoteResource: true,
                    audioLevel: (audioLevel || audioLevel === 0) ? handleAudioLevel(audioLevel) : null,
                    frameWidth,
                    frameHeight,
                    frameRate,
                    bitrate,
                    jitter: jitter ? Math.round(jitter * 1000) : 0,
                    codecImplementationName,
                    nackCount,
                    pliCount,
                    rtt: null,
                    samplingRate: STAT_NONE,
                    googFirsReceived: STAT_NONE,
                    googRenderDelayMs: STAT_NONE,
                    trackState: STAT_NONE
                });
            });
            // 解析本端/远端 IP、Port 数据
            const transportKey = keys.filter(key => /^RTCTransport_/.test(key))[0];
            if (transportKey) {
                const rtcTransport = stats[transportKey];
                const { selectedCandidatePairId } = rtcTransport;
                if (selectedCandidatePairId) {
                    const iceCandidatePair = stats[selectedCandidatePairId];
                    const { availableOutgoingBitrate, 
                    // 下行带宽只在有下行资源时有值
                    availableIncomingBitrate, currentRoundTripTime: rtt, localCandidateId, remoteCandidateId } = iceCandidatePair;
                    const localCandidate = stats[localCandidateId];
                    const { ip: IP, port, networkType } = localCandidate;
                    const remoteCandidate = stats[remoteCandidateId];
                    const { ip: remoteIP, port: remotePort, protocol } = remoteCandidate;
                    reports.iceCandidatePair = {
                        IP,
                        port,
                        networkType,
                        remoteIP,
                        remotePort,
                        protocol,
                        bitrateRecv,
                        bitrateSend,
                        rtt: rtt * 1000,
                        availableOutgoingBitrate,
                        availableIncomingBitrate,
                        totalPacketsLost
                    };
                    // 给下行 rtt 赋值
                    reports.receivers.forEach(item => {
                        item.rtt = rtt;
                    });
                }
            }
            return reports;
        }
        getAudioLevelList(stats) {
            const audioLevelList = [];
            const keys = Object.keys(stats);
            // 解析上行媒体流数据: RTCOutboundRTPVideoStream | RTCOutboundRTPAudioStream
            const outboundKeys = keys.filter(key => /^RTCOutboundRTPAudioStream_/.test(key));
            outboundKeys.forEach(key => {
                var _a;
                // 本端输出数据
                const outboundInfo = stats[key];
                if (this._sdpSemantics === 'unified-plan' && !this.isValidSender(outboundInfo)) {
                    return;
                }
                const { mediaSourceId, trackId } = outboundInfo;
                const resourceId = this.getResourceIdByParseSdp(outboundInfo);
                const audioLevel = mediaSourceId && stats[mediaSourceId] ? stats[mediaSourceId].audioLevel : (((_a = stats[trackId]) === null || _a === void 0 ? void 0 : _a.audioLevel) || null);
                audioLevelList.push({
                    trackId: resourceId,
                    audioLevel: (audioLevel || audioLevel === 0) ? handleAudioLevel(audioLevel) : null
                });
            });
            // 下行流数据解析
            const inboundKeys = keys.filter(key => /^RTCInboundRTPAudioStream_/.test(key));
            inboundKeys.forEach(key => {
                const inboundInfo = stats[key];
                if (this._sdpSemantics === 'unified-plan' && !this.isValidReceiver(inboundInfo)) {
                    return;
                }
                const { trackId } = inboundInfo;
                // inboundInfo 中取不到 audioLevel 时，需从 type 为 track 中取
                const audioLevel = inboundInfo.audioLevel || stats[trackId].audioLevel;
                const resourceId = this.getResourceIdByParseSdp(inboundInfo);
                audioLevelList.push({
                    trackId: resourceId,
                    audioLevel: (audioLevel || audioLevel === 0) ? handleAudioLevel(audioLevel) : null
                });
            });
            return audioLevelList;
        }
    }

    /**
     * Firefox stats
     * 取不到分辨率、音量
     * candidate 无本地网络类型、往返时延、可用上行带宽、可用下行带宽
     */
    class RTCReportParser$1 extends AbstractStatParser {
        formatRCRTCStateReport(stats) {
            const timestamp = +new Date();
            const reports = {
                senders: [],
                receivers: [],
                timestamp
            };
            // 总丢包数
            let totalPacketsLost = 0;
            // 上行码率总和
            let bitrateSend = 0;
            // 下行码率总和
            let bitrateRecv = 0;
            for (const key in stats) {
                const value = stats[key];
                const type = value.type;
                /**
                 * 上行资源解析
                 */
                if (type === 'outbound-rtp') {
                    if (this._sdpSemantics === 'unified-plan' && !this.isValidSender(value)) {
                        continue;
                    }
                    const { id, kind, bytesSent, packetsSent, bitrateMean: bitrate, framerateMean: frameRate, nackCount, pliCount, remoteId } = value;
                    const { jitter, roundTripTime, packetsLost } = remoteId ? stats[remoteId] : {
                        jitter: null,
                        roundTripTime: null,
                        packetsLost: 0
                    };
                    const resourceId = this.getResourceIdByParseSdp(value);
                    totalPacketsLost += packetsLost;
                    let packetsLostRate = null;
                    !this._latestPacketsSent[resourceId] && (this._latestPacketsSent[resourceId] = {});
                    if (remoteId) {
                        packetsLostRate = this.updateSenderPacketsLost(resourceId, packetsLost, packetsSent);
                    }
                    else {
                        // 无 remoteId 时，需记录 packetsSent
                        this._latestPacketsSent[resourceId].crtPacketsSent = packetsSent;
                    }
                    let calcBitrate = 0;
                    if (kind === 'video') {
                        bitrate && (calcBitrate = Math.floor(bitrate / 1000));
                    }
                    else {
                        // 音频无码率值，需客户端计算
                        calcBitrate = this.updateBytesSent(resourceId, bytesSent, timestamp);
                    }
                    calcBitrate < 0 && (calcBitrate = 0);
                    // 总和累加
                    bitrateSend += calcBitrate;
                    reports.senders.push({
                        trackId: resourceId,
                        kind,
                        packetsLostRate,
                        remoteResource: false,
                        audioLevel: null,
                        frameWidth: null,
                        frameHeight: null,
                        frameRate: Math.floor(frameRate),
                        bitrate: calcBitrate,
                        jitter: jitter ? Math.round(jitter * 1000) : null,
                        rtt: roundTripTime,
                        encoderImplementation: null,
                        pliCount: pliCount,
                        nackCount: nackCount,
                        googFirsSent: STAT_NONE,
                        samplingRate: STAT_NONE,
                        googRenderDelayMs: STAT_NONE,
                        trackState: STAT_NONE
                    });
                }
                /**
                 * outbound-rtp 存在无 remoteId 的情况，导致取不到有效的 jitter、rtt、packetsLost，
                 * 可拿到 remote-inbound-rtp 的 localId，补充 senders 中的 jitter、rtt、packetsLost 数据，重新计算丢包率
                 */
                if (type === 'remote-inbound-rtp') {
                    const { localId } = value;
                    const resourceId = this.getResourceIdByParseSdp(stats[localId]);
                    const sender = reports.senders.filter((item) => {
                        return item.trackId === resourceId;
                    })[0];
                    if (sender && senderHasRemoteData(sender)) {
                        sender.jitter = Math.round(value.jitter * 1000);
                        sender.rtt = value.rtt;
                        sender.packetsLostRate = this.updateSenderPacketsLost(resourceId, value.packetsLost, this._latestPacketsSent[resourceId].crtPacketsSent);
                    }
                }
                /**
                 * 下行流数据解析
                 */
                if (type === 'inbound-rtp') {
                    if (this._sdpSemantics === 'unified-plan' && !this.isValidReceiver(value)) {
                        continue;
                    }
                    const { id, packetsLost, bytesReceived, packetsReceived, jitter, framerateMean: frameRate, kind, bitrateMean: bitrate, nackCount, pliCount } = value;
                    const resourceId = this.getResourceIdByParseSdp(value);
                    totalPacketsLost += packetsLost;
                    const packetsLostRate = this.updateReceiverPacketsLost(resourceId, packetsLost, packetsReceived);
                    let calcBitrate = 0;
                    if (kind === 'video') {
                        bitrate && (calcBitrate = Math.floor(bitrate / 1000));
                    }
                    else {
                        calcBitrate = this.updateBytesRecv(resourceId, bytesReceived, timestamp);
                    }
                    calcBitrate < 0 && (calcBitrate = 0);
                    bitrateRecv += calcBitrate;
                    reports.receivers.push({
                        trackId: resourceId,
                        kind,
                        packetsLostRate,
                        remoteResource: true,
                        audioLevel: null,
                        frameWidth: null,
                        frameHeight: null,
                        frameRate: Math.floor(frameRate),
                        bitrate: calcBitrate,
                        jitter: jitter ? Math.round(jitter * 1000) : null,
                        codecImplementationName: null,
                        nackCount,
                        pliCount,
                        rtt: null,
                        samplingRate: STAT_NONE,
                        googFirsReceived: STAT_NONE,
                        googRenderDelayMs: STAT_NONE,
                        trackState: STAT_NONE
                    });
                }
                /**
                 * 解析本端/远端 IP、Port 数据
                 */
                if (type === 'candidate-pair' && value.state === 'succeeded') {
                    const localCandidate = stats[value.localCandidateId];
                    const { address: IP, port } = localCandidate;
                    const remoteCandidate = stats[value.remoteCandidateId];
                    const { address: remoteIP, port: remotePort, protocol } = remoteCandidate;
                    reports.iceCandidatePair = {
                        IP,
                        port,
                        networkType: null,
                        remoteIP,
                        remotePort,
                        protocol,
                        bitrateRecv,
                        bitrateSend,
                        rtt: null,
                        availableOutgoingBitrate: null,
                        availableIncomingBitrate: null,
                        totalPacketsLost
                    };
                }
            }
            reports.iceCandidatePair && (reports.iceCandidatePair.bitrateSend = bitrateSend);
            reports.iceCandidatePair && (reports.iceCandidatePair.bitrateRecv = bitrateRecv);
            return reports;
        }
        getAudioLevelList(stats) {
            const audioLevelList = [];
            for (const key in stats) {
                const value = stats[key];
                const type = value.type;
                /**
                 * 上行资源解析
                 */
                if (type === 'outbound-rtp') {
                    if (this._sdpSemantics === 'unified-plan' && !this.isValidSender(value)) {
                        continue;
                    }
                    const { kind } = value;
                    if (kind === 'video') {
                        continue;
                    }
                    const resourceId = this.getResourceIdByParseSdp(value);
                    audioLevelList.push({
                        trackId: resourceId,
                        audioLevel: null
                    });
                }
                /**
                 * 下行流数据解析
                 */
                if (type === 'inbound-rtp') {
                    if (this._sdpSemantics === 'unified-plan' && !this.isValidReceiver(value)) {
                        continue;
                    }
                    const { kind } = value;
                    if (kind === 'video') {
                        continue;
                    }
                    const resourceId = this.getResourceIdByParseSdp(value);
                    audioLevelList.push({
                        trackId: resourceId,
                        audioLevel: null
                    });
                }
            }
            return audioLevelList;
        }
    }

    /**
     * Safari stats
     * 取不到上行丢包数，无法计算上行丢包率，无上行网络抖动
     * 无帧率
     * candidate 无本地网络类型、本端地址
     */
    class RTCReportParser extends AbstractStatParser {
        formatRCRTCStateReport(stats) {
            const reports = {
                senders: [],
                receivers: []
            };
            // 当次报告创建时的时间戳
            const timestamp = Math.floor(stats.RTCPeerConnection.timestamp);
            reports.timestamp = timestamp;
            const keys = Object.keys(stats);
            // 总丢包数
            let totalPacketsLost = 0;
            // 上行码率总和
            let bitrateSend = 0;
            // 解析上行媒体流数据: RTCOutboundRTPVideoStream | RTCOutboundRTPAudioStream
            const outboundKeys = keys.filter(key => /^RTCOutboundRTP(Video|Audio)Stream_/.test(key));
            outboundKeys.forEach(key => {
                // 本端输出数据
                const outboundInfo = stats[key];
                if (this._sdpSemantics === 'unified-plan' && !this.isValidSender(outboundInfo)) {
                    return;
                }
                const resourceId = this.getResourceIdByParseSdp(outboundInfo);
                const { mediaType: kind, transportId, remoteId, packetsSent, bytesSent, trackId, encoderImplementation, pliCount, nackCount, firCount } = outboundInfo;
                if (!trackId) {
                    return;
                }
                const { audioLevel, frameHeight, frameWidth } = stats[trackId];
                let bitrate = this.updateBytesSent(resourceId, bytesSent, timestamp);
                if (bitrate < 0) {
                    bitrate = 0;
                }
                // 总和累加
                bitrateSend += bitrate;
                reports.senders.push({
                    trackId: resourceId,
                    kind,
                    packetsLostRate: null,
                    remoteResource: false,
                    audioLevel: (audioLevel || audioLevel === 0) ? handleAudioLevel(audioLevel) : null,
                    frameWidth,
                    frameHeight,
                    frameRate: null,
                    bitrate,
                    jitter: null,
                    rtt: null,
                    encoderImplementation,
                    pliCount: pliCount,
                    nackCount: nackCount,
                    googFirsSent: STAT_NONE,
                    samplingRate: STAT_NONE,
                    googRenderDelayMs: STAT_NONE,
                    trackState: STAT_NONE
                });
            });
            // 下行码率总和
            let bitrateRecv = 0;
            // 下行流数据解析
            const inboundKeys = keys.filter(key => /^RTCInboundRTP(Video|Audio)Stream_/.test(key));
            inboundKeys.forEach(key => {
                const inboundInfo = stats[key];
                if (this._sdpSemantics === 'unified-plan' && !this.isValidReceiver(inboundInfo)) {
                    return;
                }
                const { trackId, packetsLost, packetsReceived, jitter, bytesReceived, mediaType: kind, nackCount, pliCount } = inboundInfo;
                const resourceId = this.getResourceIdByParseSdp(inboundInfo);
                if (!trackId) {
                    return;
                }
                const { frameHeight, frameWidth, audioLevel } = stats[trackId];
                totalPacketsLost += packetsLost;
                const packetsLostRate = this.updateReceiverPacketsLost(resourceId, packetsLost, packetsReceived);
                let bitrate = this.updateBytesRecv(resourceId, bytesReceived, timestamp);
                if (bitrate < 0) {
                    bitrate = 0;
                }
                bitrateRecv += bitrate;
                reports.receivers.push({
                    trackId: resourceId,
                    kind,
                    packetsLostRate,
                    remoteResource: true,
                    audioLevel: (audioLevel || audioLevel === 0) ? handleAudioLevel(audioLevel) : null,
                    frameWidth,
                    frameHeight,
                    frameRate: null,
                    bitrate,
                    jitter: jitter,
                    codecImplementationName: null,
                    nackCount,
                    pliCount,
                    rtt: null,
                    samplingRate: STAT_NONE,
                    googFirsReceived: STAT_NONE,
                    googRenderDelayMs: STAT_NONE,
                    trackState: STAT_NONE
                });
            });
            // 解析本端/远端 IP、Port 数据
            const transportKey = keys.filter(key => /^RTCTransport_/.test(key))[0];
            if (transportKey) {
                const rtcTransport = stats[transportKey];
                const { selectedCandidatePairId } = rtcTransport;
                if (selectedCandidatePairId) {
                    const iceCandidatePair = stats[selectedCandidatePairId];
                    const { availableOutgoingBitrate, 
                    // 下行带宽只在有下行资源时有值
                    availableIncomingBitrate, currentRoundTripTime: rtt, localCandidateId, remoteCandidateId } = iceCandidatePair;
                    const localCandidate = stats[localCandidateId];
                    const { address: IP, port } = localCandidate;
                    const remoteCandidate = stats[remoteCandidateId];
                    const { address: remoteIP, port: remotePort, protocol } = remoteCandidate;
                    reports.iceCandidatePair = {
                        IP: IP || null,
                        port,
                        networkType: null,
                        remoteIP,
                        remotePort,
                        protocol,
                        bitrateRecv,
                        bitrateSend,
                        rtt: rtt * 1000,
                        availableOutgoingBitrate,
                        availableIncomingBitrate,
                        totalPacketsLost
                    };
                    // 给下行 rtt 赋值
                    reports.receivers.forEach(item => {
                        item.rtt = rtt;
                    });
                }
            }
            return reports;
        }
        getAudioLevelList(stats) {
            const audioLevelList = [];
            const keys = Object.keys(stats);
            // 解析上行媒体流数据: RTCOutboundRTPVideoStream | RTCOutboundRTPAudioStream
            const outboundKeys = keys.filter(key => /^RTCOutboundRTP(Video|Audio)Stream_/.test(key));
            outboundKeys.forEach(key => {
                // 本端输出数据
                const outboundInfo = stats[key];
                if (this._sdpSemantics === 'unified-plan' && !this.isValidSender(outboundInfo)) {
                    return;
                }
                const { trackId, mediaType: kind } = outboundInfo;
                if (kind === 'video') {
                    return;
                }
                const resourceId = this.getResourceIdByParseSdp(outboundInfo);
                const audioLevel = stats[trackId];
                audioLevelList.push({
                    trackId: resourceId,
                    audioLevel: (audioLevel || audioLevel === 0) ? handleAudioLevel(audioLevel) : null
                });
            });
            // 下行流数据解析
            const inboundKeys = keys.filter(key => /^RTCInboundRTP(Video|Audio)Stream_/.test(key));
            inboundKeys.forEach(key => {
                const inboundInfo = stats[key];
                if (this._sdpSemantics === 'unified-plan' && !this.isValidReceiver(inboundInfo)) {
                    return;
                }
                const { trackId, mediaType: kind } = inboundInfo;
                if (!trackId || kind === 'video') {
                    return;
                }
                const { audioLevel } = stats[trackId];
                const resourceId = this.getResourceIdByParseSdp(inboundInfo);
                audioLevelList.push({
                    trackId: resourceId,
                    audioLevel: (audioLevel || audioLevel === 0) ? handleAudioLevel(audioLevel) : null
                });
            });
            return audioLevelList;
        }
    }

    /**
     * 以字符串的形式 硬处理 SDP 信息
     * 对于 plan-b | unified-plan 数据的处理 方式是相同的。
     * 将 SDP 以 m=[video|audio] 进行拆分，
     * 从而获取 SDPHeader | videoStreams | audioStreams 并对其内容进行处理
     */
    class ASdpBuilder {
        constructor(SDP, type) {
            this.SDP = SDP;
            this.type = type;
            this.SDPHeader = '';
            this.videoStreams = [];
            this.audioStreams = [];
            // 获取 Mid 的位置
            const streamPositions = this.getStreamIndex();
            this.spliteStreams(streamPositions);
        }
        get videoSdps() {
            return this.videoStreams.slice();
        }
        get audioSdps() {
            return this.audioStreams.slice();
        }
        /**
         * 它从 SDP 中删除空行和尾随空格
         * @param {string} sdp - 要处理的 SDP 字符串。
         * @returns 删除了换行符的 sdp 字符串。
         */
        static trimBlankLine(sdp) {
            // 移除空行以及行尾的空格
            return sdp.replace(/\n\r\s*\r\n/g, '\r\n').replace(/\s+\r\n/g, '\r\n');
        }
        /**
         * 通过 m=video | m=audio 将 SDP 进行分隔
         * 它返回一个索引数组，其中在 SDP 中找到子字符串“m=video”或“m=audio”
         * 它返回 SDP 中 execResult.index 的索引数组。
         * @returns 一组数字。
         */
        getStreamIndex() {
            const mid = RegExp('m=(?:video|audio)', 'img');
            const midPositions = new Set([0]);
            let execResult;
            while ((execResult = mid.exec(this.SDP)) !== null) {
                midPositions.add(execResult.index);
            }
            midPositions.add(this.SDP.length);
            return [...midPositions];
        }
        /**
         * 它将 SDP 拆分为标头和流
         * @param {number[]} streams - 表示每个流的开始和结束的数字数组。
         */
        spliteStreams(streams) {
            // streams = [0, 30, 40, 50, 80, 100]
            this.SDPHeader = this.SDP.substring(streams[0], streams[1]).replace(/\r\ns=-/g, `\r\ns=${(new Date()).valueOf()}`);
            for (let mid = 1; mid < streams.length; mid++) {
                const stream = this.SDP.substring(streams[mid], streams[mid + 1]);
                if (/^\bm=video\b/.test(stream)) {
                    this.videoStreams.push(stream);
                }
                else {
                    this.audioStreams.push(stream);
                }
            }
        }
        /**
         * 如果当前资源方向 RTCRtpTransceiverDirection 是 recvonly | inactive
         * 表明当前不需要发送 RTP 数据所以将 SDP 中删除所有以 `a=ssrc` 或 `a=msid` 开头的行
         * @param {string} stream - string - 要修改的 SDP 字符串
         * @returns 正在返回流。
         */
        static clearInactiveOrRecvonly(stream) {
            const recvonlyORinactive = /\ba=(recvonly|inactive)\b/.test(stream);
            if (recvonlyORinactive) {
                return stream.replace(/\r\na=(ssrc|msid)[^\r\n]+/ig, '');
            }
            return stream;
        }
        /**
         * 它获取音频流并将它们映射到一个新数组，其中每个项目都是调用 setAudioItemBitrate 函数的结果
         * @param {IRCTrackBitrate} bitrate - 以 kbps 为单位的比特率。
         */
        setAudiosBitrate(bitrate) {
            logger.info(RCLoggerTag.L_RTC_SDP_BITRATE_O, {
                bitrate,
                msg: 'SDP setAudiosBitrate'
            }, {
                logSource: engine.LogSource.RTC
            });
            this.audioStreams = this.audioStreams.map(sdpAudioBlock => {
                return this.setAudioItemBitrate(sdpAudioBlock, bitrate);
            });
            return this;
        }
        /**
         * 它设置特定 MID 的音频比特率。
         * @param {IRCTrackBitrate} bitrate - 音频流的比特率，以 kbps 为单位。
         * @param {string} streamId - 音频流的媒体流 ID。
         */
        setAudioBitrateWithStreamId(bitrate, streamId) {
            logger.info(RCLoggerTag.L_RTC_SDP_BITRATE_O, {
                bitrate,
                streamId,
                msg: 'SDP setAudioBitrateWithStreamId'
            }, {
                logSource: engine.LogSource.RTC
            });
            this.audioStreams = this.audioStreams.map(sdpAudioBlock => {
                const testStreamId = new RegExp(`\\bmsid:${streamId}\\b`, 'ig');
                // 判断 msid 是否存在
                if (testStreamId.test(sdpAudioBlock)) {
                    return this.setAudioItemBitrate(sdpAudioBlock, bitrate);
                }
                return sdpAudioBlock;
            });
            return this;
        }
        /**
         * 它设置特定 MID 的音频比特率。
         * @param {IRCTrackBitrate} bitrate - 音频流的比特率，以 kbps 为单位。
         * @param {string} mid - 音频流的媒体流 ID。
         */
        setAudioBitrateWithMid(bitrate, mid) {
            logger.info(RCLoggerTag.L_RTC_SDP_BITRATE_O, {
                bitrate,
                mid,
                msg: 'SDP setAudioBitrateWithMid'
            }, {
                logSource: engine.LogSource.RTC
            });
            this.audioStreams = this.audioStreams.map(sdpAudioBlock => {
                const testStreamId = new RegExp(`\\bmid:${mid}\\b`, 'ig');
                // 判断 msid 是否存在
                if (testStreamId.test(sdpAudioBlock)) {
                    return this.setAudioItemBitrate(sdpAudioBlock, bitrate);
                }
                return sdpAudioBlock;
            });
            return this;
        }
        /**
         * 它接受一个 SDP 音频块和一个比特率，并返回比特率设置为给定值的 SDP 音频块
         * @param {string} sdpAudioBlock - SDP 的音频块。
         * @param {IRCTrackBitrate} bitrate - 以 kbps 为单位的比特率。
         * @returns 正在返回 sdpAudioBlock 并将比特率设置为传入的比特率。
         */
        setAudioItemBitrate(sdpAudioBlock, bitrate) {
            if (bitrate.max === 0 && /\ba=inactive\b/ig.test(sdpAudioBlock)) {
                return sdpAudioBlock;
            }
            // 如果未替换 则进行替换
            if (!/\bmaxaveragebitrate\b/ig.test(sdpAudioBlock)) {
                const audioBitrate = [
                    '$1',
                    `maxaveragebitrate=${bitrate.max * ASdpBuilder.KBitrate}`
                ];
                sdpAudioBlock = sdpAudioBlock.replace(/(\buseinbandfec=[^\r\n]+)/ig, audioBitrate.join(';'));
            }
            return this.addAudioBlineAS(sdpAudioBlock, bitrate);
        }
        /**
         * 如果 SDP 的音频块没有 b=AS: 行，则添加一个
         * @param {string} sdpAudioBlock - SDP 的音频块。
         * @param {IRCTrackBitrate} bitrate - IRCTrack比特率
         * @returns 正在返回 sdpAudioBlock。
         */
        addAudioBlineAS(sdpAudioBlock, bitrate) {
            if (!/\bb=AS:\d+\b/ig.test(sdpAudioBlock)) {
                return sdpAudioBlock.replace(/^(m=audio[^\r\n]+)/, `$1\r\nb=AS:${bitrate.max * ASdpBuilder.KBitrate}`);
            }
            return sdpAudioBlock;
        }
        /**
         * 对视频元素设置 SDP 相关信息
         * 针对 SDP 中所有的 video 元素添加码率设置
         * @param bitrate
         */
        setVideosBitrate(bitrate) {
            logger.info(RCLoggerTag.L_RTC_SDP_BITRATE_O, {
                bitrate,
                msg: 'SDP setVideosBitrate'
            }, {
                logSource: engine.LogSource.RTC
            });
            // 找到 profile-level-id 行在后面添加  ;x-google--bitrate ;x-google--bitrate=
            this.videoStreams = this.videoStreams.map(sdpVideoBlock => {
                return this.setVideoItemBitrate(sdpVideoBlock, bitrate);
            });
            return this;
        }
        /**
         * 它设置特定中间的视频比特率， 针对 SDP 中给定 mid 的 video 元素添加码率设置。
         * @param {IRCTrackBitrate} bitrate - 您要设置的比特率。
         * @param {string} streamId - 媒体流 ID。
         */
        setVideoBitrateWithStreamId(bitrate, streamId) {
            logger.info(RCLoggerTag.L_RTC_SDP_BITRATE_O, {
                bitrate,
                streamId,
                msg: 'SDP setVideoBitrateWithStreamId'
            }, {
                logSource: engine.LogSource.RTC
            });
            this.videoStreams = this.videoStreams.map(sdpVideoBlock => {
                const testStreamId = new RegExp(`\\bmsid:${streamId}\\b`, 'ig');
                if (testStreamId.test(sdpVideoBlock)) {
                    return this.setVideoItemBitrate(sdpVideoBlock, bitrate);
                }
                return sdpVideoBlock;
            });
            return this;
        }
        /**
         * 它设置特定中间的视频比特率， 针对 SDP 中给定 mid 的 video 元素添加码率设置。
         * @param {IRCTrackBitrate} bitrate - 您要设置的比特率。
         * @param {string} streamId - 媒体流 ID。
         */
        setVideoBitrateWithMid(bitrate, mid) {
            logger.info(RCLoggerTag.L_RTC_SDP_BITRATE_O, {
                bitrate,
                mid,
                msg: 'SDP setVideoBitrateWithMid'
            }, {
                logSource: engine.LogSource.RTC
            });
            this.videoStreams = this.videoStreams.map(sdpVideoBlock => {
                const testStreamId = new RegExp(`\\bmid:${mid}\\b`, 'ig');
                if (testStreamId.test(sdpVideoBlock)) {
                    return this.setVideoItemBitrate(sdpVideoBlock, bitrate);
                }
                return sdpVideoBlock;
            });
            return this;
        }
        /**
         * 它设置视频项目的比特率。
         * @param {string} sdpVideoBlock - SDP 的视频块。
         * @param {IRCTrackBitrate} bitrate - 包含最小、最大和起始比特率值的比特率对象。
         * @returns 正在返回 sdpVideoBlock。
         */
        setVideoItemBitrate(sdpVideoBlock, bitrate) {
            if (bitrate.max === 0 && /\ba=inactive\b/ig.test(sdpVideoBlock)) {
                return sdpVideoBlock;
            }
            // 如果未替换 则进行替换
            if (!/\bx-google-max-bitrate\b/.test(sdpVideoBlock)) {
                console.log('old:', sdpVideoBlock);
                const videoBitrate = [
                    '$1',
                    `x-google-max-bitrate=${bitrate.max * ASdpBuilder.KBitrate}`,
                    `x-google-min-bitrate=${bitrate.min * ASdpBuilder.KBitrate}`,
                    `x-google-start-bitrate=${bitrate.start || bitrate.max * ASdpBuilder.KBitrate * 0.7}`
                ];
                // 42e01f 42001f 为 H264 编码
                sdpVideoBlock = sdpVideoBlock.replace(/(\bprofile-level-id=42[e0]01f\b)/ig, videoBitrate.join(';'));
            }
            return this.addVideoBlineAS(sdpVideoBlock, bitrate);
        }
        /**
         * 如果视频块没有 b=AS: 行，则添加一个
         * @param {string} sdpVideoBlock - SDP 的视频块。
         * @param {IRCTrackBitrate} bitrate - IRCTrack比特率
         * @returns 正在返回 sdpVideoBlock。
         */
        addVideoBlineAS(sdpVideoBlock, bitrate) {
            // b=AS: 定义本端带宽信息
            if (!/\bb=AS:\d+\b/ig.test(sdpVideoBlock)) {
                return sdpVideoBlock.replace(/^(m=video[^\r\n]+)/, `$1\r\nb=AS:${bitrate.max * ASdpBuilder.KBitrate}`);
            }
            return sdpVideoBlock;
        }
        clearnSsrcWithMid(mid, direction) {
            logger.info(RCLoggerTag.L_RTC_SDP_BITRATE_O, {
                mid,
                msg: 'SDP clearnSsrcWithMid'
            }, {
                logSource: engine.LogSource.RTC
            });
            this.audioStreams = this.audioStreams.map(sdpAudioBlock => {
                const testMId = new RegExp(`\\bmid:${mid}\\b`, 'ig');
                // 判断 msid 是否存在
                if (testMId.test(sdpAudioBlock)) {
                    return this.clearSSRC(sdpAudioBlock, direction);
                }
                return sdpAudioBlock;
            });
            this.videoStreams = this.videoStreams.map(sdpVideoBlock => {
                const testMId = new RegExp(`\\bmid:${mid}\\b`, 'ig');
                if (testMId.test(sdpVideoBlock)) {
                    return this.clearSSRC(sdpVideoBlock, direction);
                }
                return sdpVideoBlock;
            });
            return this;
        }
        clearSSRC(stream, direction) {
            if (direction === RtpTransceiverDirection.SENDONLY) {
                const recvonlyORinactive = /\ba=sendonly\b/.test(stream);
                if (recvonlyORinactive) {
                    return stream.replace(/\r\na=(ssrc|msid)[^\r\n]+/ig, '');
                }
            }
            if (direction === RtpTransceiverDirection.RECVONLY) {
                const recvonlyORinactive = /\ba=recvonly\b/.test(stream);
                if (recvonlyORinactive) {
                    return stream.replace(/\r\na=(ssrc|msid)[^\r\n]+/ig, '');
                }
            }
            if (direction === RtpTransceiverDirection.INACTIVE) {
                const recvonlyORinactive = /\ba=inactive\b/.test(stream);
                if (recvonlyORinactive) {
                    return stream.replace(/\r\na=(ssrc|msid)[^\r\n]+/ig, '');
                }
            }
            return stream;
        }
    }
    ASdpBuilder.KBitrate = 1;

    var SdpSemantics;
    (function (SdpSemantics) {
        SdpSemantics["PLANB"] = "plan-b";
        SdpSemantics["UNIFIEDPLAN"] = "unified-plan";
    })(SdpSemantics || (SdpSemantics = {}));
    var RtpTransceiverDirection;
    (function (RtpTransceiverDirection) {
        RtpTransceiverDirection["SENDONLY"] = "sendonly";
        RtpTransceiverDirection["RECVONLY"] = "recvonly";
        RtpTransceiverDirection["INACTIVE"] = "inactive";
    })(RtpTransceiverDirection || (RtpTransceiverDirection = {}));
    class ASdpStrategy {
        constructor(_peer) {
            this._peer = _peer;
            this._outboundStreams = {};
        }
        /**
         * 设置指定的 SDP 协议版本
         * @param sdpSemantics 优先版本
         */
        static setSdpSemantics(sdpSemantics) {
            engine.logger.info(RCLoggerTag.L_A_SDP_STRATEGY_SET_SDP_SEMANTICS_O, {
                status: RCLoggerStatus.SUCCESSED,
                sdpSemantics
            }, {
                logSource: engine.LogSource.RTC
            });
            const { browser, version, supportsUnifiedPlan } = browserInfo;
            engine.logger.debug(`sdpSemantics, browser: ${browser}, version: ${version}, supportsUnifiedPlan: ${supportsUnifiedPlan}`);
            // 在明确不支持 unified-plan 的版本中使用 plan-b
            if (!supportsUnifiedPlan) {
                this._sdpSemantics = 'plan-b';
                return;
            }
            if (/chrome/i.test(browser)) {
                // chrome 72 - 92 之间的版本可以通过传参的方式定义使用的 SDP 协议版本以便于测试
                this._sdpSemantics = version > 92 ? 'unified-plan' : (version < 72 ? 'plan-b' : sdpSemantics);
                return;
            }
            if (/firefox/i.test(browser)) {
                this._sdpSemantics = 'unified-plan';
                return;
            }
            if (/safari/i.test(browser)) {
                this._sdpSemantics = version < 12 ? 'plan-b' : 'unified-plan';
                return;
            }
            this._sdpSemantics = 'unified-plan';
        }
        /**
         * 获取使用的 SDP 协议版本
         */
        static getSdpSemantics() {
            return ASdpStrategy._sdpSemantics;
        }
        getOutboundVideoInfo() {
            const result = [];
            for (const msid in this._outboundStreams) {
                const stream = this._outboundStreams[msid];
                const videoTrack = stream.getVideoTracks()[0];
                if (!videoTrack) {
                    continue;
                }
                const isTiny = /_tiny$/.test(msid);
                const { width, height } = getVideoTrackInfo(videoTrack);
                result.push({
                    trackId: videoTrack.id,
                    simulcast: isTiny ? RCStreamType.TINY : RCStreamType.NORMAL,
                    resolution: `${width}x${height}`
                });
            }
            return result;
        }
        async setRemoteAnswer(sdp) {
            // 过滤行末的空格，服务可能产生空格数据
            sdp = ASdpBuilder.trimBlankLine(sdp);
            engine.logger.info(`set remote answer -> ${sdp}`);
            try {
                await this._peer.setRemoteDescription({ type: 'answer', sdp });
            }
            catch (error) {
                logger.error(error);
                engine.logger.info(RCLoggerTag.L_A_SDP_STRATEGY_SET_REMOTE_ANSWER_O, {
                    status: RCLoggerStatus.FAILED,
                    code: '',
                    msg: error
                }, {
                    logSource: engine.LogSource.RTC
                });
                return exports.RCRTCCode.SET_REMOTE_DESCRIPTION_FAILED;
            }
            engine.logger.info(RCLoggerTag.L_A_SDP_STRATEGY_SET_REMOTE_ANSWER_O, {
                status: RCLoggerStatus.SUCCESSED,
                sdp
            }, {
                logSource: engine.LogSource.RTC
            });
            return exports.RCRTCCode.SUCCESS;
        }
        getStatParsr(rtcPeerConn, sdpSemantics, currentUserId) {
            if (/chrome/i.test(browserInfo.browser)) {
                return new RTCReportParser$2(rtcPeerConn, sdpSemantics, currentUserId);
            }
            if (/Firefox/i.test(browserInfo.browser)) {
                return new RTCReportParser$1(rtcPeerConn, sdpSemantics, currentUserId);
            }
            if (/Safari/i.test(browserInfo.browser)) {
                return new RTCReportParser(rtcPeerConn, sdpSemantics, currentUserId);
            }
            return null;
        }
        resetSdp(sdp) {
            return ASdpBuilder.trimBlankLine(sdp);
        }
    }

    class PlanBSdpBuilder extends ASdpBuilder {
        constructor(SDP) {
            super(SDP, SdpSemantics.PLANB);
            this.SDP = SDP;
        }
        /**
         * 它采用 SDP 标头和音频和视频流并将它们连接到一个字符串中
         * @returns SDP 标头和音频和视频流的字符串。
         */
        stringify() {
            const sdpSource = [this.SDPHeader];
            const sdp = [...this.audioStreams, ...this.videoStreams];
            sdp.forEach(item => {
                const matchMid = item.match(/\ba=mid:(video|audio)\b/);
                // 移除不需要发布资源的 ssrc
                // 订阅或者取消订阅或者取消发布时将 SSRC 删除，这样可以保证每次重新发布资源 SSRC 会发生变化
                const sdpItem = ASdpBuilder.clearInactiveOrRecvonly(item);
                if (matchMid && matchMid[1] === RCTrackKind.AUDIO) {
                    sdpSource[1] = sdpItem;
                }
                if (matchMid && matchMid[1] === RCTrackKind.VIDEO) {
                    sdpSource[2] = sdpItem;
                }
            });
            const streamsJoin = sdpSource.join('');
            return ASdpBuilder.trimBlankLine(streamsJoin);
        }
        /**
         * @overwrite 因为 Plan-b 设置是针对整个 m=audio ，所以不需要单独设置
         */
        setAudioBitrateWithStreamId(bitrate, streamId) {
            logger.warn('plan-b not support set Audio Bitrate With Stream Id');
            return this;
        }
        /**
         * @overwrite 因为 Plan-b 设置是针对整个 m=video ，所以不需要单独设置
         */
        setVideoBitrateWithStreamId(bitrate, streamId) {
            logger.warn('plan-b not support set Video Bitrate With Stream Id');
            return this;
        }
    }

    class PlanBStrategy extends ASdpStrategy {
        constructor() {
            super(...arguments);
            this.senders = {};
            this._localTracks = [];
        }
        addLocalTrack(track) {
            if (!this._localTracks.includes(track)) {
                this._localTracks.push(track);
            }
            const msid = track.getStreamId();
            const msTrack = track.__innerGetMediaStreamTrack();
            // 复用 stream 避免多次重复初始化
            const stream = this._outboundStreams[msid] || (this._outboundStreams[msid] = new MediaStream());
            // 清理同类型轨道数据
            stream.getTracks().forEach(track => {
                track.kind === msTrack.kind && stream.removeTrack(track);
            });
            stream.addTrack(msTrack);
            // addTrack
            const trackId = track.getTrackId();
            const sender = this.senders[trackId];
            if (sender) {
                sender.replaceTrack(msTrack);
            }
            else {
                // 有流音轨
                this.senders[trackId] = this._peer.addTrack(msTrack, stream);
            }
        }
        removeLocalTrack(track) {
            const index = this._localTracks.findIndex(item => item === track);
            index >= 0 && this._localTracks.splice(index, 1);
            const trackId = track.getTrackId();
            const sender = this.senders[trackId];
            if (!sender) {
                return;
            }
            sender.replaceTrack(null);
            this._peer.removeTrack(sender);
            delete this.senders[trackId];
        }
        updateSubRemoteTracks(remoteTracks) {
            // plan-b 中订阅与取消订阅不体现在 SDP 数据中，不需要对 peerConnection 做操作
        }
        updateRecvTransceiverMap(trackId, transceiver) {
            // plan-b 无需维护 offer 中的订阅关系，offer 只描述上行数据
        }
        /**
         * 指定上行码率范围
         * @param maxBitrate
         * @param minBitrate
         * @param startBitrate
         */
        setBitrate(maxBitrate, minBitrate, startBitrate) {
            this._maxBitrate = maxBitrate;
            this._minBitrate = minBitrate;
            this._startBitrate = startBitrate || maxBitrate * 0.7;
        }
        async createOffer(iceRestart) {
            const offer = await this._peer.createOffer({ iceRestart, offerToReceiveAudio: true, offerToReceiveVideo: true });
            for (const msid in this._outboundStreams) {
                /**
                 * 更改 SDP 描述中的 msid
                 * 将 MediaStream id 更改为 msid
                 * 例: ca5dffd8-d6b2-489d-9e4d-4814321efd38 更改为 1001_11
                 */
                const streamId = this._outboundStreams[msid].id;
                offer.sdp = offer.sdp.replace(new RegExp(streamId, 'g'), msid);
            }
            if (offer.sdp) {
                offer.sdp = ASdpBuilder.clearInactiveOrRecvonly(offer.sdp);
            }
            await this._peer.setLocalDescription(offer);
            return { type: 'offer', semantics: 'plan-b', sdp: offer.sdp };
        }
        setRemoteAnswer(sdp) {
            sdp = this.resetSdp(sdp);
            return super.setRemoteAnswer(sdp);
        }
        // 重置设置 SDP 信息
        resetSdp(sdp) {
            const sdpBuilder = new PlanBSdpBuilder(sdp);
            // 计算动态码率
            const videoBitrate = { max: 0, min: 0 };
            const audioBitrate = { max: 0, min: 0 };
            // 计算所以码率的合集。{0 10} & {5, 30} === {0, 30}
            this._localTracks.forEach(item => {
                const { min, max, start } = item.getBitrate();
                if (item.isAudioTrack()) {
                    audioBitrate.max = audioBitrate.max < max ? max : audioBitrate.max;
                    audioBitrate.min = audioBitrate.min > min ? min : audioBitrate.min;
                    // 选择用户在设置碼率中最大值，如果最大值的最大码率时也设置了 start 就使用用户设置的
                    if (audioBitrate.max === max) {
                        audioBitrate.start = start;
                    }
                    else {
                        audioBitrate.start = audioBitrate.max * 0.7;
                    }
                }
                if (item.isVideoTrack()) {
                    videoBitrate.max = videoBitrate.max < max ? max : videoBitrate.max;
                    videoBitrate.min = videoBitrate.min > min ? min : videoBitrate.min;
                    // 选择用户在设置碼率中最大值，如果最大值的最大码率时也设置了 start 就使用用户设置的
                    if (videoBitrate.max === max) {
                        videoBitrate.start = start;
                    }
                    else {
                        videoBitrate.start = videoBitrate.max * 0.7;
                    }
                }
            });
            // 设置音频码率
            sdpBuilder.setAudiosBitrate(audioBitrate);
            // 设置视频码率
            sdpBuilder.setVideosBitrate(videoBitrate);
            return sdpBuilder.stringify();
        }
    }

    class UnifiedPlanSdpBuilder extends ASdpBuilder {
        constructor(SDP) {
            super(SDP, SdpSemantics.UNIFIEDPLAN);
            this.SDP = SDP;
        }
        /**
         * 它采用 SDP 标头和音频和视频流并将它们连接到一个字符串中
         * @returns SDP 标头和音频和视频流的字符串。
         */
        stringify() {
            const sdpSource = [this.SDPHeader];
            const sdp = [...this.audioStreams, ...this.videoStreams];
            sdp.forEach(item => {
                const matchMid = item.match(/\ba=mid:(\d+)\b/);
                // 移除不需要发布资源的 ssrc
                // 订阅或者取消订阅或者取消发布时将 SSRC 删除，这样可以保证每次重新发布资源 SSRC 会发生变化
                if (matchMid && matchMid[1]) {
                    sdpSource[+matchMid[1] + 1] = item;
                }
            });
            // TODO: 重置数据
            this.SDPHeader = '';
            this.videoStreams = [];
            this.audioStreams = [];
            // 对空行进行处理
            const streamsJoin = sdpSource.join('');
            return ASdpBuilder.trimBlankLine(streamsJoin);
        }
    }

    /* 它是一堆解析 SDP 字符串的静态函数 */
    class SDPUtils {
        /* 将 SDP 拆分为多个部分。 */
        static splitSections(blob) {
            const parts = blob.split('\nm=');
            return parts.map((part, index) => (index > 0 ? 'm=' + part : part).trim() + '\r\n');
        }
        /**
         * 它需要一个 SDP 文本块并返回一个仅包含媒体部分的 SDP 文本数组
         * @param {string} blob - 您要解析的 SDP 字符串。
         * @returns 字符串数组。
         */
        static getMediaSections(blob) {
            const sections = SDPUtils.splitSections(blob);
            sections.shift();
            return sections;
        }
        /* 解析 extmap 属性的 SDP 标头。 */
        static parseExtmap(line) {
            const parts = line.substr(9).split(' ');
            return {
                id: parseInt(parts[0], 10),
                direction: parts[0].indexOf('/') > 0 ? parts[0].split('/')[1] : 'sendrecv',
                uri: parts[1]
            };
        }
        /* 将 SDP 字符串拆分为字符串数组。 */
        static splitLines(blob) {
            return blob.trim().split('\n').map(line => line.trim());
        }
        /**
         * 它接受一个媒体部分并返回一个对象，其中包含媒体部分的种类、端口、协议和格式
         * @param {string} mediaSection - SDP的媒体部分。
         * @returns 具有以下属性的对象：
         *   kind：媒体的类型（音频、视频等）
         *   端口：端口号
         *   协议：使用的协议
         *   fmt：媒体的格式
         */
        static parseMLine(mediaSection) {
            const lines = SDPUtils.splitLines(mediaSection);
            const parts = lines[0].substr(2).split(' ');
            return {
                kind: parts[0],
                port: parseInt(parts[1], 10),
                protocol: parts[2],
                fmt: parts.slice(3).join(' ')
            };
        }
        static matchPrefix(blob, prefix) {
            return SDPUtils.splitLines(blob).filter(line => line.indexOf(prefix) === 0);
        }
        /**
         * 它从 SDP 媒体部分解析 msid 属性
         * @param {string} mediaSection - SDP的媒体部分。
         * @returns 具有两个属性的对象：流和轨道。
         */
        static parseMsid(mediaSection) {
            let parts;
            const spec = SDPUtils.matchPrefix(mediaSection, 'a=msid:');
            if (spec.length === 1) {
                parts = spec[0].substr(7).split(' ');
                return { stream: parts[0], track: parts[1] };
            }
            const planB = SDPUtils.matchPrefix(mediaSection, 'a=ssrc:')
                .map(line => SDPUtils.parseSsrcMedia(line))
                .filter(msidParts => msidParts.attribute === 'msid');
            if (planB.length > 0) {
                if (planB[0].value) {
                    parts = planB[0].value.split(' ');
                    return { stream: parts[0], track: parts[1] };
                }
            }
            return { stream: '', track: '' };
        }
        /**
         * 它接受一个字符串并返回一个对象
         * @param {string} line - 我们正在解析的 SDP 行。
         */
        static parseSsrcMedia(line) {
            const sp = line.indexOf(' ');
            const parts = {
                ssrc: parseInt(line.substr(7, sp - 7), 10)
            };
            const colon = line.indexOf(':', sp);
            if (colon > -1) {
                parts.attribute = line.substr(sp + 1, colon - sp - 1);
                parts.value = line.substr(colon + 1);
            }
            else {
                parts.attribute = line.substr(sp + 1);
            }
            return parts;
        }
        /**
         * 它从 SDP 的媒体部分返回中间值
         * @param {string} mediaSection - SDP的媒体部分。
         * @returns 媒体部分的中间。
         */
        static getMid(mediaSection) {
            const mid = SDPUtils.matchPrefix(mediaSection, 'a=mid:')[0];
            if (mid) {
                return mid.substr(6);
            }
        }
    }

    class UnifiedPlanStrategy extends ASdpStrategy {
        constructor() {
            super(...arguments);
            this._sendTransceiver = {};
            this._localTracks = {};
            this._recvAudio = [];
            this._recvVideo = [];
            // 当前的 mid 与 trackId 的匹配关系
            this._recvTransceiver = {};
            this._subedTracks = [];
            this.midMsid = {};
        }
        setBitrate(max, min, start) {
            logger.warn('the interface named `setBitrate` is invalid while sdpSemantics value is `unified-plan`');
        }
        addLocalTrack(track) {
            const trackId = track.getTrackId();
            const msid = track.getStreamId();
            const msTrack = track.__innerGetMediaStreamTrack();
            this._localTracks[trackId] = track;
            // 复用 stream 避免多次重复初始化
            const stream = this._outboundStreams[msid] || (this._outboundStreams[msid] = new MediaStream());
            // 清理同类型轨道数据
            stream.getTracks().forEach(track => {
                track.kind === msTrack.kind && stream.removeTrack(track);
            });
            stream.addTrack(msTrack);
            const transceiver = this._sendTransceiver[trackId];
            if (transceiver) {
                transceiver.sender.replaceTrack(msTrack);
                transceiver.direction = 'sendonly';
            }
            else {
                this._sendTransceiver[trackId] = this._peer.addTransceiver(msTrack, { direction: 'sendonly', streams: [stream] });
            }
        }
        removeLocalTrack(track) {
            const trackId = track.getTrackId();
            const msid = track.getStreamId();
            track.__innerGetMediaStreamTrack();
            delete this._localTracks[trackId];
            const transceiver = this._sendTransceiver[trackId];
            if (!transceiver) {
                return;
            }
            transceiver.direction = 'inactive';
            this._peer.removeTrack(transceiver.sender);
            // 发送器 replaceTrack 参数为空/null时，则终止 RTP 发送器
            transceiver.sender.replaceTrack(null);
            const stream = this._outboundStreams[msid];
            const msTracks = track.isAudioTrack() ? stream.getAudioTracks() : stream.getVideoTracks();
            msTracks.forEach(item => stream.removeTrack(item));
            // 尝试移除小流并销毁
            const tinyTransceiver = this._sendTransceiver[`${trackId}_tiny`];
            if (!tinyTransceiver || (tinyTransceiver.direction === 'inactive')) {
                return;
            }
            tinyTransceiver.direction = 'inactive';
            const sender = tinyTransceiver.sender;
            const tinyTrack = sender.track;
            this._peer.removeTrack(sender);
            // 发送器 replaceTrack 参数为空/null时，则终止 RTP 发送器
            sender.replaceTrack(null);
            const tinyStream = this._outboundStreams[`${msid}_tiny`];
            tinyStream.removeTrack(tinyTrack);
            tinyTrack.stop();
        }
        updateRecvTransceiverMap(trackId, transceiver) {
            const { mediaType } = parseTrackId(trackId);
            // 更新映射关系
            this._recvTransceiver[trackId] = transceiver;
            // 从备选列表中删除 transceiver
            const arrTransceiver = mediaType === exports.RCMediaType.AUDIO_ONLY ? this._recvAudio : this._recvVideo;
            const index = arrTransceiver.findIndex(item => item === transceiver);
            index >= 0 && arrTransceiver.splice(index, 1);
        }
        updateSubRemoteTracks(tracks) {
            // 减法记录新增订阅
            const addTracks = tracks.slice();
            // 备份旧订阅列表，以便于减法记录被移除订阅
            const removeTracks = this._subedTracks.slice();
            // 记录新订阅关系
            this._subedTracks = tracks.slice();
            for (let i = addTracks.length - 1; i >= 0; i -= 1) {
                const track = addTracks[i];
                const index = removeTracks.findIndex(item => item === track);
                if (index >= 0) {
                    // 当前已存在，不属于新增
                    addTracks.splice(i, 1);
                    // 新列表中仍存在，说明未被删除
                    removeTracks.splice(index, 1);
                }
            }
            // 遍历 removeTracks，将对应的 transceiver.direction = 'inactive'
            removeTracks.length && removeTracks.forEach(item => {
                const trackId = item.getTrackId();
                item.__innerSetMediaStreamTrack(undefined);
                /**
                 * peerConnection ontrack 回调参数 RTCTrackEvent 对象中 streams 为 [] 时，服务端无资源，不会添加 transceiver
                 * 需兼容无 transceiver 的情况
                 */
                const transceiver = this._recvTransceiver[trackId];
                transceiver && (transceiver.direction = 'inactive');
            });
            const addCount = { audio: 0, video: 0 };
            addTracks.length && addTracks.forEach(item => {
                const kind = item.isAudioTrack() ? 'audio' : 'video';
                // 查找是否有与该 trackId 绑定的 transceiver
                const transceiver = this._recvTransceiver[item.getTrackId()];
                if (transceiver) {
                    transceiver.direction = 'recvonly';
                    return;
                }
                // 不存在绑定关系的情况下，记录需要新增多少个 transceiver
                addCount[kind] += 1;
            });
            // 新增 transceiver
            for (let i = this._recvAudio.length; i < addCount.audio; i += 1) {
                this._recvAudio.push(this._peer.addTransceiver('audio', { direction: 'recvonly' }));
            }
            for (let i = this._recvVideo.length; i < addCount.video; i += 1) {
                this._recvVideo.push(this._peer.addTransceiver('video', { direction: 'recvonly' }));
            }
        }
        async createOffer(iceRestart) {
            const offer = await this._peer.createOffer({ iceRestart });
            let sdp = offer.sdp;
            for (const msid in this._outboundStreams) {
                /**
                 * 更改 SDP 描述中的 msid
                 * 将 MediaStream id 更改为 msid
                 * 例: ca5dffd8-d6b2-489d-9e4d-4814321efd38 更改为 1001_11
                 */
                const streamId = this._outboundStreams[msid].id;
                sdp = sdp.replace(new RegExp(streamId, 'g'), msid);
            }
            /**
             * INFO:
             * 1. 发布流不要干预 setLocalDescription 的 Offer，会导致多次发布时 SSRC 不变更
             * 2. 下行流或者取消流 可以将 SDP 中的 ssrc|msid 删除
             */
            sdp = this.resetOfferSdp(sdp);
            // console.log('reset Offer', sdp)
            // 增加 a=ice-options:renomination 行
            sdp = sdp.replace(/(a=ice-options:trickle)/g, '$1\r\na=ice-options:renomination');
            offer.sdp = sdp;
            await this._peer.setLocalDescription(offer);
            return { type: 'offer', semantics: 'unified-plan', sdp };
        }
        setRemoteAnswer(sdp) {
            sdp = this.resetAnswerSdp(sdp);
            // console.log('reset Answer', sdp)
            const reg = /[\r\n]+\r\n[\r\n]+/g;
            if (reg.test(sdp)) {
                // 服务给回的数据可能包含多余的 \r\n，故过滤一下
                logger.warn(`answer sdp invalid -> ${JSON.stringify(sdp)}`);
                sdp = sdp.replace(reg, '\r\n');
            }
            return super.setRemoteAnswer(sdp);
        }
        // 重置设置 SDP 信息
        resetOfferSdp(sdp) {
            var _a;
            const sdpBuilder = new UnifiedPlanSdpBuilder(sdp);
            for (const msid in this._sendTransceiver) {
                const transceiver = this._sendTransceiver[msid];
                const kind = (_a = transceiver.sender.track) === null || _a === void 0 ? void 0 : _a.kind;
                let { direction, mid } = transceiver;
                if (!mid) {
                    const sections = SDPUtils.getMediaSections(sdp);
                    sections.forEach(item => {
                        SDPUtils.parseExtmap(item);
                        const { kind: parseKind } = SDPUtils.parseMLine(item);
                        let { stream } = SDPUtils.parseMsid(item);
                        const parseMid = SDPUtils.getMid(item);
                        if (kind === 'video') {
                            if (/tiny$/.test(stream)) {
                                stream = stream.replace(/tiny$/ig, '1_tiny');
                            }
                            else {
                                stream = stream + '_1';
                            }
                        }
                        else {
                            stream = stream + '_0';
                        }
                        // getMid
                        if (stream === msid && kind === parseKind && parseMid) {
                            mid = parseMid;
                        }
                    });
                }
                if (mid) {
                    if (direction === RtpTransceiverDirection.SENDONLY) {
                        const localTrack = this._localTracks[msid];
                        const bitrate = localTrack === null || localTrack === void 0 ? void 0 : localTrack.getBitrate();
                        if (kind === RCTrackKind.AUDIO && bitrate) {
                            sdpBuilder.setAudioBitrateWithMid(bitrate, mid);
                        }
                        if (kind === RCTrackKind.VIDEO && bitrate) {
                            sdpBuilder.setVideoBitrateWithMid(bitrate, mid);
                        }
                    }
                    if (direction === RtpTransceiverDirection.INACTIVE) {
                        sdpBuilder.clearnSsrcWithMid(mid, RtpTransceiverDirection.INACTIVE);
                    }
                }
            }
            for (const msid in this._recvTransceiver) {
                const transceiver = this._recvTransceiver[msid];
                const { direction, mid } = transceiver;
                if (mid) {
                    if (direction === RtpTransceiverDirection.RECVONLY) ;
                    if (direction === RtpTransceiverDirection.INACTIVE) {
                        sdpBuilder.clearnSsrcWithMid(mid, RtpTransceiverDirection.RECVONLY);
                    }
                }
            }
            return sdpBuilder.stringify();
        }
        // Answer SDP 中添加码率信息
        resetAnswerSdp(sdp) {
            var _a;
            // return sdp
            const sdpBuilder = new UnifiedPlanSdpBuilder(sdp);
            for (const msid in this._sendTransceiver) {
                /**
                 * 通过 Sender 获取发布出去的资源
                 * 对于已经发布出去的资源设置码率
                 */
                const transceiver = this._sendTransceiver[msid];
                const { mid } = transceiver;
                if (mid) {
                    const localTrack = this._localTracks[msid];
                    const bitrate = localTrack === null || localTrack === void 0 ? void 0 : localTrack.getBitrate();
                    const kind = (_a = transceiver.sender.track) === null || _a === void 0 ? void 0 : _a.kind;
                    // 对于已经发布出去的资源设置码率
                    if (kind === RCTrackKind.AUDIO && bitrate) {
                        sdpBuilder.setAudioBitrateWithMid(bitrate, mid);
                    }
                    if (kind === RCTrackKind.VIDEO && bitrate) {
                        sdpBuilder.setVideoBitrateWithMid(bitrate, mid);
                    }
                }
            }
            // for (const msid in this._recvTransceiver) {
            //   const transceiver: RTCRtpTransceiver = this._recvTransceiver[msid]
            //   const { direction, mid } = transceiver
            //   if (mid) {
            //     if (direction === RtpTransceiverDirection.RECVONLY) {
            //     }
            //     if (direction === RtpTransceiverDirection.INACTIVE) {
            //     }
            //   }
            // }
            return sdpBuilder.stringify();
        }
    }

    /**
     * PC 实例管理类
     */
    class RCRTCPeerConnection extends engine.EventEmitter {
        constructor(
        /**
         * peerConnection 对应名称
        */
        _pcName, 
        /**
         * _reTryExchange 方法
         */
        _reTryExchange, 
        /**
         * 当前用户 id
         */
        _currentUserId, 
        /**
         * 北极星上传实例
         */
        _polarisReport) {
            super();
            this._pcName = _pcName;
            this._reTryExchange = _reTryExchange;
            this._currentUserId = _currentUserId;
            this._polarisReport = _polarisReport;
            this.pubLocalTracks = {};
            this._reTryExchangeTimer = null;
            // peerConnection stats 计时器
            this._reportStatsTimer = null;
            // 上报上下行数据至北极星定时器
            this._reportR3R4ToPolarisTimer = null;
            this._isDestroyed = false;
            this._reportListener = null;
            const sdpSemantics = ASdpStrategy.getSdpSemantics();
            const peer = this._rtcPeerConn = new RTCPeerConnection({ sdpSemantics });
            this._sdpStrategy = sdpSemantics === 'plan-b' ? new PlanBStrategy(peer) : new UnifiedPlanStrategy(peer);
            this._rtcPeerConn.oniceconnectionstatechange = this._onICEConnectionStateChange.bind(this);
            this._rtcPeerConn.onconnectionstatechange = this._onConnectionStateChange.bind(this);
            this._rtcPeerConn.ontrack = this._onTrackReady.bind(this);
            this.reportParser = this._sdpStrategy.getStatParsr(this._rtcPeerConn, sdpSemantics, this._currentUserId);
        }
        getName() {
            return this._pcName;
        }
        getLocalTracks() {
            engine.logger.info(RCLoggerTag.L_RTC_PEER_CONNECTION_GET_LOCAL_TRACKS_O, {
                status: RCLoggerStatus.SUCCESSED,
                trackIds: Object.keys(this.pubLocalTracks)
            }, {
                logSource: engine.LogSource.RTC
            });
            return Object.values(this.pubLocalTracks);
        }
        _onConnectionStateChange() {
            logger.info(`onconnectionstatechange -> ${this._rtcPeerConn.connectionState}, ${this._pcName}`);
            engine.logger.info(RCLoggerTag.L_RTC_PEER_CONNECTION_CONNECTION_STATE_S, {
                status: RCLoggerStatus.SUCCESSED,
                connectionState: this._rtcPeerConn.connectionState,
                pcName: this._pcName
            }, {
                logSource: engine.LogSource.RTC
            });
        }
        _onICEConnectionStateChange() {
            var _a, _b;
            logger.info(`oniceconnectionstatechange -> ${this._rtcPeerConn.iceConnectionState}, ${this._pcName}`);
            if (this._rtcPeerConn.iceConnectionState === 'connected') {
                // 开启 peerConnection stats 统计定时器
                if (this._reportStatsTimer) {
                    clearInterval(this._reportStatsTimer);
                }
                this._reportStatsTimer = setInterval(this._reportHandle.bind(this), 1000);
            }
            // ICE 连接中断后，需要尝试重新走 exchange 流程以恢复
            if (this._rtcPeerConn.iceConnectionState === 'failed' || this._rtcPeerConn.iceConnectionState === 'disconnected') {
                logger.warn(`${this._pcName} iceconenction state is failed, exchange SDP to try again.`);
                engine.logger.error(RCLoggerTag.L_RTC_PEER_CONNECTION_ICE_CONNECTION_STATE_S, {
                    status: RCLoggerStatus.FAILED,
                    code: '',
                    msg: `${this._pcName} iceconenction state is failed, exchange SDP to try again.`
                }, {
                    logSource: engine.LogSource.RTC
                });
                this._reTryExchange();
                this._reTryExchangeTimer = setInterval(this._reTryExchange, 15 * 1000);
            }
            // ICE 变更通知
            try {
                (_b = (_a = this._reportListener) === null || _a === void 0 ? void 0 : _a.onICEConnectionStateChange) === null || _b === void 0 ? void 0 : _b.call(_a, this._rtcPeerConn.iceConnectionState, this._pcName);
            }
            catch (error) {
                logger.error('onICEConnectionStateChange error', error, this._pcName);
                engine.logger.error(RCLoggerTag.L_RTC_PEER_CONNECTION_ICE_CONNECTION_STATE_S, {
                    status: RCLoggerStatus.FAILED,
                    code: '',
                    msg: `${this._pcName}, ${error}`
                }, {
                    logSource: engine.LogSource.RTC
                });
            }
            engine.logger.info(RCLoggerTag.L_RTC_PEER_CONNECTION_ICE_CONNECTION_STATE_S, {
                status: RCLoggerStatus.SUCCESSED,
                connectionState: this._rtcPeerConn.connectionState,
                pcName: this._pcName
            }, {
                logSource: engine.LogSource.RTC
            });
        }
        _onTrackReady(evt) {
            /**
             * signal 和 mediaServer 不同步时，signal 有资源，mediaServer 没资源，
             * 订阅 mediaServer 不存在的资源时，对应 answer sdp 中的通道没有 ssrc，
             * ontrack 会被触发，但 RTCTrackEvent 对象中的 streams 为 []，需兼容
             */
            if (!evt.streams.length) {
                return;
            }
            // 更新 transceiver 与 trackId 的订阅关系
            const msid = evt.streams[0].id;
            const track = evt.receiver.track;
            const trackId = [msid, track.kind === 'audio' ? exports.RCMediaType.AUDIO_ONLY : exports.RCMediaType.VIDEO_ONLY].join('_');
            this._updateRecvTransceiverMap(trackId, evt.transceiver);
            this.emit(RCRTCPeerConnection.__INNER_EVENT_TRACK_READY__, evt);
        }
        /**
         * 它设置对等连接的比特率。
         * @deprecated use RCLocalTrack.setBitrate instead of setBitrate
         */
        async setBitrate(max, min, start) {
            this._sdpStrategy.setBitrate(max, min, start);
            engine.logger.info(RCLoggerTag.L_RTC_PEER_CONNECTION_SET_BITRATE_O, {
                status: RCLoggerStatus.SUCCESSED,
                max,
                min,
                start
            }, {
                logSource: engine.LogSource.RTC
            });
        }
        async createOffer(iceRestart) {
            const offer = await this._sdpStrategy.createOffer(iceRestart);
            // logger.debug(`sdpDemantics -> ${offer.semantics}`)
            logger.debug(`offer -> ${JSON.stringify(offer.sdp)}`);
            engine.logger.info(RCLoggerTag.L_RTC_PEER_CONNECTION_CREATE_OFFER_O, {
                status: RCLoggerStatus.SUCCESSED,
                offerSDP: offer.sdp
            }, {
                logSource: engine.LogSource.RTC
            });
            return offer;
        }
        async setRemoteAnswer(answer) {
            logger.debug(`answer -> ${JSON.stringify(answer)}`);
            engine.logger.info(RCLoggerTag.L_RTC_PEER_CONNECTION_SET_REMOTE_ANSWER_O, {
                status: RCLoggerStatus.SUCCESSED,
                answer
            }, {
                logSource: engine.LogSource.RTC
            });
            return this._sdpStrategy.setRemoteAnswer(answer);
        }
        getLocalTrack(trackId) {
            return this.pubLocalTracks[trackId] || null;
        }
        addLocalTrack(track) {
            this.pubLocalTracks[track.getTrackId()] = track;
            this._sdpStrategy.addLocalTrack(track);
            // 避免重复添加事件监听
            track.off(RCLocalTrack.__INNER_EVENT_MUTED_CHANGE__, this._onLocalTrackMuted, this);
            track.off(RCLocalTrack.__INNER_EVENT_DESTROY__, this._onLocalTrackDestroied, this);
            track.on(RCLocalTrack.__INNER_EVENT_MUTED_CHANGE__, this._onLocalTrackMuted, this);
            track.on(RCLocalTrack.__INNER_EVENT_DESTROY__, this._onLocalTrackDestroied, this);
            engine.logger.info(RCLoggerTag.L_RTC_PEER_CONNECTION_ADD_LOCAL_TRACK_O, {
                status: RCLoggerStatus.SUCCESSED,
                trackId: track.getTrackId()
            }, {
                logSource: engine.LogSource.RTC
            });
        }
        removeLocalTrackById(trackId) {
            const track = this.getLocalTrack(trackId);
            if (!track) {
                engine.logger.warn(RCLoggerTag.L_RTC_PEER_CONNECTION_REMOVE_LOCAL_TRACK_BY_ID_O, {
                    status: RCLoggerStatus.FAILED,
                    code: '',
                    msg: 'track not found'
                }, {
                    logSource: engine.LogSource.RTC
                });
                return;
            }
            engine.logger.info(RCLoggerTag.L_RTC_PEER_CONNECTION_REMOVE_LOCAL_TRACK_BY_ID_O, {
                status: RCLoggerStatus.SUCCESSED,
                trackId
            }, {
                logSource: engine.LogSource.RTC
            });
            this.removeLocalTrack(track);
        }
        removeAllLocalTrack() {
            Object.keys(this.pubLocalTracks).forEach(id => {
                // 小流不可先于大流执行 removeLocalTrackById，否则可能存在小流被当做大流进而不可被销毁
                /_tiny$/.test(id) || this.removeLocalTrackById(id);
            });
            engine.logger.info(RCLoggerTag.L_RTC_PEER_CONNECTION_REMOVE_ALL_LOCAL_TRACK_O, {
                status: RCLoggerStatus.SUCCESSED
            }, {
                logSource: engine.LogSource.RTC
            });
        }
        removeLocalTrack(track) {
            const trackId = track.getTrackId();
            delete this.pubLocalTracks[trackId];
            this._sdpStrategy.removeLocalTrack(track);
            track.__innerSetPublished(false);
            track.off(RCLocalTrack.__INNER_EVENT_MUTED_CHANGE__, this._onLocalTrackMuted, this);
            track.off(RCLocalTrack.__INNER_EVENT_DESTROY__, this._onLocalTrackDestroied, this);
            // 尝试移除并销毁 tinyTrack
            const tinyId = `${trackId}_tiny`;
            const tinyTrack = this.getLocalTrack(tinyId);
            if (tinyTrack) {
                this._sdpStrategy.removeLocalTrack(tinyTrack);
                delete this.pubLocalTracks[tinyId];
                tinyTrack.destroy();
            }
            engine.logger.info(RCLoggerTag.L_RTC_PEER_CONNECTION_REMOVE_LOCAL_TRACK_O, {
                status: RCLoggerStatus.SUCCESSED,
                trackId
            }, {
                logSource: engine.LogSource.RTC
            });
        }
        _updateRecvTransceiverMap(trackId, transceiver) {
            this._sdpStrategy.updateRecvTransceiverMap(trackId, transceiver);
        }
        updateSubRemoteTracks(remoteTracks) {
            this._sdpStrategy.updateSubRemoteTracks(remoteTracks);
            engine.logger.info(RCLoggerTag.L_RTC_PEER_CONNECTION_UPDATE_SUB_REMOTE_TRACKS_O, {
                status: RCLoggerStatus.SUCCESSED,
                trackIds: remoteTracks.map(track => track.getTrackId())
            }, {
                logSource: engine.LogSource.RTC
            });
        }
        /**
         * 获取当前已发布视频流信息
         */
        getOutboundVideoInfo() {
            return this._sdpStrategy.getOutboundVideoInfo();
        }
        _onLocalTrackMuted(track) {
            // 修改已发布的小流状态
            const tinyTrack = this.getLocalTrack(`${track.getTrackId()}_tiny`);
            if (tinyTrack) {
                tinyTrack.__innerGetMediaStreamTrack().enabled = !track.isLocalMuted();
            }
            this.emit(RCLocalTrack.__INNER_EVENT_MUTED_CHANGE__, track);
            engine.logger.info(RCLoggerTag.L_RTC_PEER_CONNECTION_LOCAL_TRACK_MUTED_O, {
                status: RCLoggerStatus.SUCCESSED,
                trackId: track.getTrackId()
            }, {
                logSource: engine.LogSource.RTC
            });
        }
        _onLocalTrackDestroied(track) {
            this.emit(RCLocalTrack.__INNER_EVENT_DESTROY__, track);
        }
        /**
         * 注册连接数据监控，开启质量数据上报定时器
         * @param listener
         */
        registerReportListener(listener) {
            this._reportListener = listener;
        }
        _createRCRTCStateReport(data) {
            const { timestamp, iceCandidatePair, senders, receivers } = JSON.parse(JSON.stringify(data));
            iceCandidatePair === null || iceCandidatePair === void 0 ? true : delete iceCandidatePair.totalPacketsLost;
            for (const key in iceCandidatePair) {
                isNull(iceCandidatePair[key]) && delete iceCandidatePair[key];
            }
            const newSenders = senders.map((item) => {
                const sender = {};
                item.trackId && (sender.trackId = item.trackId);
                item.kind && (sender.kind = item.kind);
                (item.packetsLostRate || item.packetsLostRate === 0) && (sender.packetsLostRate = item.packetsLostRate);
                sender.remoteResource = item.remoteResource;
                (item.audioLevel || item.audioLevel === 0) && (sender.audioLevel = item.audioLevel);
                item.frameWidth && (sender.frameWidth = item.frameWidth);
                item.frameHeight && (sender.frameHeight = item.frameHeight);
                item.frameRate && (sender.frameRate = item.frameRate);
                (item.bitrate || item.bitrate === 0) && (sender.bitrate = item.bitrate);
                item.jitter && (sender.jitter = item.jitter);
                return sender;
            });
            const newReceivers = receivers.map((item) => {
                const receiver = {};
                item.trackId && (receiver.trackId = item.trackId);
                item.kind && (receiver.kind = item.kind);
                (item.packetsLostRate || item.packetsLostRate === 0) && (receiver.packetsLostRate = item.packetsLostRate);
                receiver.remoteResource = item.remoteResource;
                (item.audioLevel || item.audioLevel === 0) && (receiver.audioLevel = item.audioLevel);
                item.frameWidth && (receiver.frameWidth = item.frameWidth);
                item.frameHeight && (receiver.frameHeight = item.frameHeight);
                item.frameRate && (receiver.frameRate = item.frameRate);
                (item.bitrate || item.bitrate === 0) && (receiver.bitrate = item.bitrate);
                item.jitter && (receiver.jitter = item.jitter);
                return receiver;
            });
            return {
                timestamp,
                iceCandidatePair,
                senders: newSenders,
                receivers: newReceivers,
                pcName: this._pcName
            };
        }
        /**
         * 获取 peerConnection stats 数据并格式化
         * @returns 返回格式化后的数据
         */
        async _getStatsData() {
            var _a, _b;
            const reports = await this._rtcPeerConn.getStats();
            /**
             * 解析 stats 数据
             */
            const data = (_a = this.reportParser) === null || _a === void 0 ? void 0 : _a.parseRTCStatsReport(reports);
            /**
             * 获取 report 中的 iceCandidatePair、senders、receivers 中的所有字段
             */
            const formatData = (_b = this.reportParser) === null || _b === void 0 ? void 0 : _b.formatRCRTCStateReport(data);
            return formatData;
        }
        async getAudioLevelReportData() {
            var _a, _b;
            const reports = await this._rtcPeerConn.getStats();
            /**
             * 解析 stats 数据
             */
            const data = (_a = this.reportParser) === null || _a === void 0 ? void 0 : _a.parseRTCStatsReport(reports);
            if (!data) {
                return [];
            }
            const audioLevelData = (_b = this.reportParser) === null || _b === void 0 ? void 0 : _b.getAudioLevelList(data);
            return audioLevelData;
        }
        /**
         * 通知用户质量数据、peerConnection 北极星数据上报
         * @todo
         */
        async _reportHandle() {
            var _a, _b;
            const formatData = await this._getStatsData();
            if (!formatData) {
                return;
            }
            /**
             * 组装用户层抛出数据
             */
            const reportData = this._createRCRTCStateReport(formatData);
            (_b = (_a = this._reportListener) === null || _a === void 0 ? void 0 : _a.onStateReport) === null || _b === void 0 ? void 0 : _b.call(_a, reportData);
        }
        /**
         * 北极星上报 R3、R4 数据
         */
        async _sendR3R4Data() {
            var _a;
            const formatData = await this._getStatsData();
            if (!formatData) {
                return true;
            }
            if (formatData.senders.length || formatData.receivers.length) {
                /**
                 * 组装北极星上报 R3、R4 数据并发送
                 */
                return await ((_a = this._polarisReport) === null || _a === void 0 ? void 0 : _a.sendR3R4Data(formatData));
            }
        }
        /**
         * 2s 给北极星上报一次 R3、R4
         */
        async __reportR3R4ToPolaris() {
            await this._sendR3R4Data();
            this._reportR3R4ToPolarisTimer = setTimeout(this.__reportR3R4ToPolaris.bind(this), 2000);
        }
        getRTCPeerConn() {
            return this._rtcPeerConn;
        }
        destroy() {
            this.clear();
            this.clearReTryExchangeTimer();
            clearTimeout(this._reportR3R4ToPolarisTimer);
            // 停止计时
            if (this._reportStatsTimer) {
                clearInterval(this._reportStatsTimer);
                this._reportStatsTimer = null;
            }
            this.registerReportListener(null);
            // 关闭 pc 连接
            this._rtcPeerConn.close();
            this._isDestroyed = true;
            // 销毁解析 stats 实例
            this.reportParser = null;
            engine.logger.info(RCLoggerTag.L_RTC_PEER_CONNECTION_DESTROY_O, {
                status: RCLoggerStatus.SUCCESSED
            }, {
                logSource: engine.LogSource.RTC
            });
        }
        clearReTryExchangeTimer() {
            clearInterval(this._reTryExchangeTimer);
            this._reTryExchangeTimer = null;
        }
        isDestroyed() {
            return this._isDestroyed;
        }
    }
    RCRTCPeerConnection.__INNER_EVENT_TRACK_READY__ = 'inner-track-ready';

    /**
     * 流状态
     */
    var TrackState;
    (function (TrackState) {
        /**
         * 不可用
         */
        TrackState[TrackState["DISABLE"] = 0] = "DISABLE";
        /**
         * 可用
         */
        TrackState[TrackState["ENABLE"] = 1] = "ENABLE";
    })(TrackState || (TrackState = {}));

    /**
     * 北极星上报角色
     */
    var PolarisRole;
    (function (PolarisRole) {
        /**
         * 会议参会者、主播
         */
        PolarisRole[PolarisRole["MeetingOrAnchor"] = 1] = "MeetingOrAnchor";
        /**
         * 观众
         */
        PolarisRole[PolarisRole["Audience"] = 2] = "Audience";
    })(PolarisRole || (PolarisRole = {}));

    class PolarisReporter {
        constructor(_context, _runtime, _roomId, _crtRTCRoom, _userRole = PolarisRole.MeetingOrAnchor // 会议模式下为 1 | 直播模式下 主播为 1 观众为 2
        ) {
            this._context = _context;
            this._runtime = _runtime;
            this._roomId = _roomId;
            this._crtRTCRoom = _crtRTCRoom;
            this._userRole = _userRole;
        }
        async _send(report) {
            let isSuccess = false;
            if (this._context.getConnectionStatus() !== engine.ConnectionStatus.CONNECTED) {
                return isSuccess;
            }
            const sendCode = await this._context.setRTCState(this._roomId, report);
            if (sendCode === engine.ErrorCode.SUCCESS) {
                isSuccess = true;
            }
            else {
                isSuccess = false;
            }
            return isSuccess;
        }
        _getClientID() {
            const key = 'uuid';
            let uuid = this._runtime.localStorage.getItem(key);
            if (!uuid) {
                uuid = getUUID22();
                this._runtime.localStorage.setItem(key, uuid);
            }
            return uuid;
        }
        /**
         * 小流需去掉 _tiny，小流 resourceId 为 userId_tag_mediaType_tiny
         */
        _getRealResourceId(resourceId) {
            let realResourceId = resourceId;
            const tinyIndex = resourceId.indexOf('_tiny');
            tinyIndex > -1 && (realResourceId = resourceId.slice(0, tinyIndex));
            return realResourceId;
        }
        /**
         * 生成北极星上报的 trackId
         * @param resourceId userId_11_1_tiny 改为 userId_11_tiny_video
         */
        _getPolarisTrackId(resourceId) {
            let polarisTrackId = '';
            const arr = resourceId.split('_');
            if (resourceId.includes('_tiny')) {
                const mediaSize = arr.pop();
                const mediaType = (parseInt(arr.pop()) === exports.RCMediaType.AUDIO_ONLY) ? 'audio' : 'video';
                const tag = arr.pop();
                const userId = arr.join('_');
                polarisTrackId = [userId, tag, mediaSize, mediaType].join('_');
            }
            else {
                const mediaType = (parseInt(arr.pop()) === exports.RCMediaType.AUDIO_ONLY) ? 'audio' : 'video';
                const tag = arr.pop();
                const userId = arr.join('_');
                polarisTrackId = [userId, tag, mediaType].join('_');
            }
            return polarisTrackId;
        }
        async sendR3R4Data(data) {
            const { iceCandidatePair, senders, receivers } = data;
            /**
             * 上下行 track 包含的公共字段
             */
            const baseData = {
                bitrateSend: (iceCandidatePair === null || iceCandidatePair === void 0 ? void 0 : iceCandidatePair.bitrateSend) || STAT_NONE,
                bitrateRecv: (iceCandidatePair === null || iceCandidatePair === void 0 ? void 0 : iceCandidatePair.bitrateRecv) || STAT_NONE,
                networkType: (iceCandidatePair === null || iceCandidatePair === void 0 ? void 0 : iceCandidatePair.networkType) || 'unknown',
                rtt: (iceCandidatePair === null || iceCandidatePair === void 0 ? void 0 : iceCandidatePair.rtt) || STAT_NONE,
                localAddress: `${(iceCandidatePair === null || iceCandidatePair === void 0 ? void 0 : iceCandidatePair.IP) || STAT_NONE}:${iceCandidatePair === null || iceCandidatePair === void 0 ? void 0 : iceCandidatePair.port}`,
                remoteAddress: `${iceCandidatePair === null || iceCandidatePair === void 0 ? void 0 : iceCandidatePair.remoteIP}:${iceCandidatePair === null || iceCandidatePair === void 0 ? void 0 : iceCandidatePair.remotePort}`,
                receiveBand: (iceCandidatePair === null || iceCandidatePair === void 0 ? void 0 : iceCandidatePair.availableIncomingBitrate) || STAT_NONE,
                sendBand: (iceCandidatePair === null || iceCandidatePair === void 0 ? void 0 : iceCandidatePair.availableOutgoingBitrate) || STAT_NONE,
                packetsLost: (iceCandidatePair === null || iceCandidatePair === void 0 ? void 0 : iceCandidatePair.totalPacketsLost) || STAT_NONE,
                deviceId: this._context.getCurrentId()
            };
            let r3 = `R3\t${baseData.bitrateSend}\t-1\t-1\t-1\t${baseData.networkType}\t${baseData.rtt}\t${baseData.localAddress}\t${baseData.receiveBand}\t${baseData.sendBand}\t${baseData.packetsLost}\t${baseData.deviceId}\r`;
            let r4 = `R4\t${baseData.bitrateRecv}\t-1\t-1\t-1\t${baseData.networkType}\t${baseData.rtt}\t${baseData.localAddress}\t${baseData.receiveBand}\t${baseData.sendBand}\t${baseData.packetsLost}\t${baseData.deviceId}\r`;
            /**
             * 北极星上报 sender tracks 中的字段
             */
            const R3TrackData = senders.map((item) => {
                var _a;
                const { trackId: resourceId, audioLevel, samplingRate, bitrate, packetsLostRate, frameRate, frameWidth, frameHeight, googRenderDelayMs, jitter, nackCount, pliCount, rtt, googFirsSent, encoderImplementation } = item;
                const trackId = this._getPolarisTrackId(resourceId);
                /**
                 * 小流需去掉 _tiny
                 */
                const realResourceId = this._getRealResourceId(resourceId);
                return {
                    trackId,
                    googCodecName: encoderImplementation || String(STAT_NONE),
                    audioLevel: (audioLevel || audioLevel === 0) ? audioLevel : STAT_NONE,
                    bitrate: (bitrate || bitrate === 0) ? bitrate : STAT_NONE,
                    packetsLostRate: (packetsLostRate || packetsLostRate === 0) ? packetsLostRate : STAT_NONE,
                    frameRate: frameRate || STAT_NONE,
                    resolution: (frameWidth && frameHeight) ? `${frameWidth} * ${frameHeight}` : '' + STAT_NONE,
                    jitter: jitter || STAT_NONE,
                    nackCount: (nackCount || nackCount === 0) ? nackCount : STAT_NONE,
                    pliCount: (pliCount || pliCount === 0) ? pliCount : STAT_NONE,
                    rtt: rtt || STAT_NONE,
                    googFirsSent,
                    samplingRate,
                    googRenderDelayMs,
                    encoderImplementation: encoderImplementation || String(STAT_NONE),
                    trackState: ((_a = this._crtRTCRoom.getLocalTrack(realResourceId)) === null || _a === void 0 ? void 0 : _a.isLocalMuted()) ? TrackState.DISABLE : TrackState.ENABLE
                };
            });
            /**
             * 北极星上报 received tracks 中的字段
             */
            const R4TrackData = receivers.filter(item => {
                // unified-plan 下 inactive 的数据会继续携带 ssrc，导致无 trackId
                return !!item.trackId;
            }).map((item) => {
                var _a;
                const { trackId: resourceId, audioLevel, samplingRate, bitrate, packetsLostRate, frameRate, frameWidth, frameHeight, googRenderDelayMs, jitter, nackCount, pliCount, rtt, googFirsReceived, codecImplementationName } = item;
                const trackId = this._getPolarisTrackId(resourceId);
                /**
                 * 小流需去掉 _tiny
                 */
                const realResourceId = this._getRealResourceId(resourceId);
                return {
                    trackId,
                    googCodecName: codecImplementationName || String(STAT_NONE),
                    audioLevel: (audioLevel || audioLevel === 0) ? audioLevel : STAT_NONE,
                    bitrate: (bitrate || bitrate === 0) ? bitrate : STAT_NONE,
                    packetsLostRate: (packetsLostRate || packetsLostRate === 0) ? packetsLostRate : STAT_NONE,
                    frameRate: frameRate || STAT_NONE,
                    resolution: (frameWidth && frameHeight) ? `${frameWidth} * ${frameHeight}` : '' + STAT_NONE,
                    jitter: jitter || STAT_NONE,
                    nackCount: (nackCount || nackCount === 0) ? nackCount : STAT_NONE,
                    pliCount: (pliCount || pliCount === 0) ? pliCount : STAT_NONE,
                    rtt: rtt || STAT_NONE,
                    googFirsReceived,
                    samplingRate,
                    googRenderDelayMs,
                    codecImplementationName: codecImplementationName || String(STAT_NONE),
                    trackState: ((_a = this._crtRTCRoom.getRemoteTrack(realResourceId)) === null || _a === void 0 ? void 0 : _a.isLocalMuted()) ? TrackState.DISABLE : TrackState.ENABLE
                };
            });
            let senderIsSuccess = false;
            r3 += R3TrackData.map((item) => {
                return `${item.trackId}\t${item.googCodecName}\t${item.audioLevel}\t${item.samplingRate}\t${item.bitrate}\t${item.packetsLostRate}\t${item.frameRate}\t${item.resolution}\t${item.googRenderDelayMs}\t${item.jitter}\t${item.nackCount}\t${item.pliCount}\t${item.rtt}\t${item.googFirsSent}\t${item.encoderImplementation}\t${item.trackState}`;
            }).join('\n');
            if (data.senders.length) {
                senderIsSuccess = await this._send(r3 + `\r${this._userRole}`);
            }
            let receiverIsSuccess = false;
            r4 += R4TrackData.map((item) => {
                return `${item.trackId}\t${item.googCodecName}\t${item.audioLevel}\t${item.samplingRate}\t${item.bitrate}\t${item.packetsLostRate}\t${item.frameRate}\t${item.resolution}\t${item.googRenderDelayMs}\t${item.jitter}\t${item.nackCount}\t${item.pliCount}\t${item.rtt}\t${item.googFirsReceived}\t${item.codecImplementationName}\t${item.trackState}`;
            }).join('\n');
            if (data.receivers.length) {
                receiverIsSuccess = await this._send(r4 + `\r${this._userRole}`);
            }
            if (!senderIsSuccess && !receiverIsSuccess) {
                return false;
            }
            return true;
        }
        /**
         * 加入房间
         */
        sendR1() {
            const rtcVersion = "5.5.1-alpha.1";
            const imVersion = this._context.getCoreVersion();
            const platform = 'web';
            const pcName = navigator.platform;
            const pcVersion = STAT_NONE;
            const browserName = browserInfo.browser;
            const browserVersion = browserInfo.version;
            const deviceId = this._getClientID();
            const r1 = `R1\t${rtcVersion}\t${imVersion}\t${platform}\t${pcName}\t${pcVersion}\t${browserName}\t${browserVersion}\t${deviceId}\t${this._userRole}`;
            this._send(r1);
        }
        /**
         * RTC 和 LIVE 发布、取消发布
         * RTC 订阅、取消订阅
         */
        sendR2(action, status, trackIds) {
            const deviceId = this._getClientID();
            const r2 = `R2\t${action}\t${status}\t${deviceId}\r${trackIds.join('\t')}\r${this._userRole}`;
            this._send(r2);
        }
    }

    class RCAudioLevelReport {
        constructor(_room) {
            this._room = _room;
            // 音量上报事件
            this._audioLevelChangeHandler = null;
            // 音量上报定时器
            this._timer = null;
        }
        /**
         * 通知业务端音量 > 0 的数据，数组每一项包含 track、audioLevel
         */
        async _audioLevelReport() {
            if (!this._audioLevelChangeHandler) {
                return;
            }
            const audioLevelList = [];
            const pcList = this._room.__getPC();
            for (let index = 0; index < pcList.length; index++) {
                const pc = pcList[index];
                if (pc.getRTCPeerConn().iceConnectionState === 'new') {
                    return;
                }
                const audioLevelData = await pc.getAudioLevelReportData();
                const list = audioLevelData.map((item) => {
                    const { userId } = parseTrackId(item.trackId);
                    const isLocal = this._room.getCrtUserId() === userId;
                    const track = isLocal ? this._room.getLocalTrack(item.trackId) : this._room.getRemoteTrack(item.trackId);
                    return {
                        track,
                        audioLevel: item.audioLevel || 0
                    };
                }).filter((item) => {
                    return item.track;
                });
                audioLevelList.push(...list);
            }
            this._audioLevelChangeHandler(audioLevelList);
        }
        onAudioLevelChange(handler, gap) {
            if (gap < 300 || gap > 1000) {
                logger.error('the valid range of onAudioLevelChange params "gap" is: > 300 && < 1000');
                return;
            }
            if (!handler) {
                this._audioLevelChangeHandler = null;
            }
            else {
                this._audioLevelChangeHandler = handler;
                this._timer = setInterval(this._audioLevelReport.bind(this), gap);
            }
        }
        clearAudioLevelReportTimer() {
            if (this._timer) {
                clearInterval(this._timer);
                this._timer = null;
            }
        }
    }

    /**
     * 直播角色
     */
    exports.RCRTCLiveRole = void 0;
    (function (RCRTCLiveRole) {
        /**
         * 主播
         */
        RCRTCLiveRole[RCRTCLiveRole["ANCHOR"] = 1] = "ANCHOR";
        /**
         * 观众
         */
        RCRTCLiveRole[RCRTCLiveRole["AUDIENCE"] = 2] = "AUDIENCE";
    })(exports.RCRTCLiveRole || (exports.RCRTCLiveRole = {}));

    class RCRTCPeerCManager {
        constructor(
        /**
         * 是否使用多 peerConnection
         */
        _useMutilPeerC = false, 
        /**
         * roomId 或观众端 userId
         */
        _roomId, 
        /**
         * 断线重连每一条 peerConnection
         */
        _reTryExchange, 
        /**
         * 当前用户 id
         */
        _currentUserId, 
        /**
         * 北极星上报模块
         */
        _polarisReport) {
            this._useMutilPeerC = _useMutilPeerC;
            this._roomId = _roomId;
            this._reTryExchange = _reTryExchange;
            this._currentUserId = _currentUserId;
            this._polarisReport = _polarisReport;
            // private _reportListener: {[key: string]: IRCRTCReportListener | null} = {}
            /**
             * 存储创建的所有 peerC，key 为 pcName，/exchange 请求中 request header 中的 Peer-Connection-Id 值
             */
            this._mutilPeerC = {};
        }
        get useMutilPeerC() {
            return this._useMutilPeerC;
        }
        /**
         * 根据 track 判断是否为上行
         */
        _isPub(tracks) {
            // 取消订阅时，剩余订阅资源为空，tracks 会为 []
            if (!tracks.length) {
                return false;
            }
            const { track } = (tracks[0] instanceof RCLocalTrack || tracks[0] instanceof RCRemoteTrack) ? { track: tracks[0] } : tracks[0];
            return track.isLocalTrack();
        }
        /**
         * 按 tag 分 tracks
         */
        _groupTracksByTag(tracks) {
            const trackSort = {};
            tracks.map((item) => {
                const { track } = item instanceof RCLocalTrack ? { track: item } : item;
                const tag = track.getTag();
                !trackSort[tag] ? (trackSort[tag] = [item]) : trackSort[tag].push(item);
            });
            return trackSort;
        }
        /**
         * 按规则生成 pcName
         * 单 peerC roomId_pub
         * 多 peerC 上行: roomId_tag、下行: roomId_sub
         * 观众加房间: roomId_sub
         * 观众不加房间: userId_sub
         * @param isPub 是否为上行、下行
         * @param tag 多 peerC 时，上行需资源标识
         */
        _genPCName(isPub, tag) {
            let pcName = null;
            if (isPub) {
                pcName = this._useMutilPeerC ? `${this._roomId}_${tag}` : `${this._roomId}_pub`;
            }
            else {
                pcName = `${this._roomId}_sub`;
            }
            return pcName;
        }
        /**
         * 创建一个 peerC
         * @param pcName 使用的 peerConnection 名称
         * @param tracks 本次要操作的资源
         */
        _createOnePeerCItem(pcName, tracks) {
            // 已存在的 peerC、且 peerConnection 没有被销毁，更新本次操作的 tracks
            if (this._mutilPeerC[pcName] && !this._mutilPeerC[pcName].pc.isDestroyed()) {
                this._mutilPeerC[pcName].tracks = tracks;
            }
            else {
                /**
                 * 创建一个新 peerC
                 */
                const isPub = this._isPub(tracks);
                const newPeerC = new RCRTCPeerConnection(pcName, () => this._reTryExchange(pcName, isPub), this._currentUserId, this._polarisReport);
                this._mutilPeerC[pcName] = {
                    pc: newPeerC,
                    tracks,
                    isPub
                };
            }
            return Object.assign({}, this._mutilPeerC[pcName], { pcName });
        }
        /**
         * 创建一组 peerC
         * 为了适应多 peerConnection 的场景做出的冗余设计，对单 peerConnection 进行数组进行封装
         * 提示：useMutilPeerC 用户自定义的，没有明确场景，必须使用多 peerConnection
         * @param pcName
         * @returns
         */
        createPeerCList(tracks) {
            const peerCArr = [];
            // isPublish 判断tracks中的资源是否为本地发布资源 从而区分是订阅与发布
            const isPub = this._isPub(tracks);
            // 不使用多 peerConnection
            if (!this._useMutilPeerC) {
                const pcName = this._genPCName(true);
                peerCArr.push(this._createOnePeerCItem(pcName, tracks));
                return peerCArr;
            }
            // 多 peerConnction 订阅
            if (this._useMutilPeerC && !isPub) {
                const pcName = this._genPCName(false);
                peerCArr.push(this._createOnePeerCItem(pcName, tracks));
                return peerCArr;
            }
            // 使用多 peerConnection 发布
            const sortTracks = this._groupTracksByTag(tracks);
            for (const tag in sortTracks) {
                const pcName = this._genPCName(isPub, tag);
                const tracks = sortTracks[tag];
                peerCArr.push(this._createOnePeerCItem(pcName, tracks));
            }
            return peerCArr;
        }
        /**
         * 移除所有 peerConnection 的上行资源
         */
        _removeAllLocalTrack() {
            this.getPCList().forEach(pc => pc.removeAllLocalTrack());
        }
        /**
         * 销毁某一个 peerConnection
         */
        destroyPeerC(pcName) {
            this._mutilPeerC[pcName].pc.destroy();
        }
        /**
         * 销毁所有 peerConnection
         */
        _destroyAllPeerC() {
            this.getPCList().forEach(pc => pc.destroy());
        }
        /**
         * 获取某一个 peerC
         */
        getPCItemByPCName(pcName) {
            return this._mutilPeerC[pcName];
        }
        /**
         * 根据 trackId 获取 peerConnection 对象
         */
        getPCByTrackId(trackId, isPub = true) {
            const { tag } = parseTrackId(trackId);
            const pcName = this._genPCName(isPub, tag);
            return this._mutilPeerC[pcName].pc;
        }
        /**
         * 获取所有的 peerConnection
         */
        getPCList() {
            const PCList = [];
            for (const key in this._mutilPeerC) {
                PCList.push(this._mutilPeerC[key].pc);
            }
            return PCList;
        }
        /**
         * 获取存储的多 peerConnection 数据
         */
        getMutilPeerCData() {
            return this._mutilPeerC;
        }
        setPeerCData(pcName, key, value) {
        }
        /**
         * 销毁资源
         */
        clear() {
            this._removeAllLocalTrack();
            this._destroyAllPeerC();
        }
    }

    /* 定义命令类型 */
    var RCCommandKind;
    (function (RCCommandKind) {
        // 未定议的
        RCCommandKind[RCCommandKind["Unknow"] = 0] = "Unknow";
        // 发布资源
        RCCommandKind[RCCommandKind["Publish"] = 1] = "Publish";
        // 取消发布资源
        RCCommandKind[RCCommandKind["UnPublish"] = 2] = "UnPublish";
        // 加入房间
        RCCommandKind[RCCommandKind["JoinRoom"] = 3] = "JoinRoom";
        // 离开房间
        RCCommandKind[RCCommandKind["LeaveRoom"] = 4] = "LeaveRoom";
        // 更新订阅列表
        RCCommandKind[RCCommandKind["UpdateSubscribeTask"] = 5] = "UpdateSubscribeTask";
        // 资源订阅
        RCCommandKind[RCCommandKind["SubscribedTask"] = 6] = "SubscribedTask";
        // 取消资源订阅
        RCCommandKind[RCCommandKind["UnSubscribedTask"] = 7] = "UnSubscribedTask";
        // 异步事件命令
        RCCommandKind["AsyncCommand"] = "AsyncCommand";
    })(RCCommandKind || (RCCommandKind = {}));

    // 描述 链表 中的位置
    var RCLinkedListPoint;
    (function (RCLinkedListPoint) {
        RCLinkedListPoint["NORMAL"] = "normal";
        RCLinkedListPoint["MIDDLE"] = "middle";
        RCLinkedListPoint["TAIL"] = "tail";
    })(RCLinkedListPoint || (RCLinkedListPoint = {}));

    var CommandPriority;
    (function (CommandPriority) {
        CommandPriority[CommandPriority["LOW"] = 0] = "LOW";
        CommandPriority[CommandPriority["NORMAL"] = 1] = "NORMAL";
        CommandPriority[CommandPriority["HIGH"] = 2] = "HIGH";
    })(CommandPriority || (CommandPriority = {}));
    var CommandCode;
    (function (CommandCode) {
        CommandCode[CommandCode["Destroy"] = 40400] = "Destroy";
    })(CommandCode || (CommandCode = {}));
    /**
     * 命令基类
     */
    class BaseCommand {
        /**
         * 获取指令优先级，必要时可 override 此函数
         */
        get priority() {
            return CommandPriority.LOW;
        }
        /**
         * 它返回命令的种类。
         * @returns 命令的种类。
         */
        get kind() {
            return RCCommandKind.Unknow;
        }
    }

    class AsyncCommand extends BaseCommand {
        constructor(state = RCLinkedListPoint.NORMAL) {
            super();
            this.state = state;
        }
        get kind() {
            return RCCommandKind.AsyncCommand;
        }
        /**
         * `public setState（状态：RCLinkedListPoint）：void`
         *
         * 该函数是公共的，它被称为 setState，它接受一个称为 state 的参数，它什么也不返回
         * @param {RCLinkedListPoint} state - 链表的状态。
         */
        setState(state) {
            this.state = state;
        }
        /**
         * 该功能用于向房间发送消息，任务完成时向房间发送消息
         * @param {Store} store - 店铺
         * @param {RCRTCCode} code - 任务的状态码，即任务的状态码。
         * @param {ISubscribeAttr[]} tracks - 要订阅的Tracks
         */
        pickoutSubscribed(subscribedTracks, originTracks) {
            // const roomId: string = store.roomId
            const { unsubscribe, subscribe } = this.calcSubscribeList(subscribedTracks, originTracks);
            // 收集成功任务日志列表
            // 清空列表
            AsyncCommand.AsyncSubscribeTasks = [];
            AsyncCommand.AsyncUnsubscribeTasks = [];
            AsyncCommand.AsyncUpdateSubscribeTasks = [];
            return { subscribe, unsubscribe };
        }
        calcSubscribeList(newTracks, oldTracks) {
            const unsubscribe = [];
            const unsubscribeSet = new Set();
            const subscribe = [];
            const subscribeSet = new Set();
            const subscribedTracks = this.formateTrack(newTracks);
            const originTracks = this.formateTrack(oldTracks);
            originTracks.forEach(item => {
                const key = `${item.track.getTrackId()}_SUB_${item.subTiny ? '0' : '1'}`;
                if (!this.trackInSubscribeList(item, subscribedTracks) && !unsubscribeSet.has(key)) {
                    unsubscribe.push(item);
                    unsubscribeSet.add(key);
                }
            });
            subscribedTracks.forEach(item => {
                const key = `${item.track.getTrackId()}_SUB_${item.subTiny ? '0' : '1'}`;
                if (!this.trackInSubscribeList(item, originTracks) && !subscribeSet.has(key)) {
                    subscribe.push(item);
                    subscribeSet.add(key);
                }
            });
            return { unsubscribe, subscribe };
        }
        /**
         * 它需要一个轨道数组并返回一个轨道数组。
         * @param {(RCRemoteTrack | ISubscribeAttr)[]} tracks - (RCRemoteTrack | ISubscribeAttr)[]
         * @returns 具有 track 属性的对象数组。
         */
        formateTrack(tracks) {
            return tracks.map(item => {
                return item instanceof RCRemoteTrack ? { track: item, subTiny: false } : Object.assign({ subTiny: false }, item);
            });
        }
        /**
         * 它检查 Track 是否已经在订阅列表中。
         * @param {ISubscribeAttr} track - ISubscribeAttr：要添加到列表中的 track
         * @param {ISubscribeAttr[]} tracks - 需要订阅的 track 数组
         */
        trackInSubscribeList(track, subscribedTracks) {
            if (subscribedTracks.length === 0) {
                return false;
            }
            const trackIndex = subscribedTracks.findIndex(item => {
                if (item.track.getTrackId() === track.track.getTrackId()) {
                    return item.subTiny === track.subTiny;
                }
                return false;
            });
            return trackIndex > -1;
        }
    }
    AsyncCommand.AsyncSubscribeTasks = [];
    AsyncCommand.AsyncUnsubscribeTasks = [];
    AsyncCommand.AsyncUpdateSubscribeTasks = [];

    class ReadableStore {
        constructor(context, service, peerMgr, roomId, crtUserId, roomMode, polarisReport, isUpgrade, isMainRoom) {
            this.context = context;
            this.service = service;
            this.peerMgr = peerMgr;
            this.roomId = roomId;
            this.crtUserId = crtUserId;
            this.roomMode = roomMode;
            this.polarisReport = polarisReport;
            this.isUpgrade = isUpgrade;
            this.isMainRoom = isMainRoom;
            /**
             * 远端 track
             */
            this._remoteTracks = {};
            /**
             * 已订阅参数
             */
            this._subscribedList = [];
            this._collectSubscribeList = [];
            /**
             * cdn_uris 信令扩散数据
             */
            this._CDNUris = null;
            this._CDNEnable = false;
            this._destroyed = false;
        }
        get useMutilPeerC() {
            return this.peerMgr.useMutilPeerC;
        }
        getResourcesByUserId(userId) {
            return this._roomResources[userId];
        }
        getRemoteTrack(trackId) {
            return this._remoteTracks[trackId];
        }
        getRemoteTracksByUserId(userId) {
            const tracks = [];
            for (const trackId in this._remoteTracks) {
                const track = this._remoteTracks[trackId];
                if (track.getUserId() === userId) {
                    tracks.push(track);
                }
            }
            return tracks;
        }
        getRemoteTracks() {
            return this._remoteTracks;
        }
        getSessionId() {
            return this._sessionId;
        }
        getAllUserIds() {
            return Object.keys(this._roomResources);
        }
        getRemoteUserIds() {
            return this.getAllUserIds().filter(userId => userId !== this.crtUserId);
        }
        getSubscribedList() {
            return this._subscribedList;
        }
        getCollectSubscribeList() {
            return this._collectSubscribeList;
        }
        getPublishedResourceByTrackId(trackId) {
            const { userId } = parseTrackId(trackId);
            return this._roomResources[userId].find(item => getTrackId(item) === trackId);
        }
        getToken() {
            return this._token;
        }
        getLocalTrack(trackId) {
            const pc = this.peerMgr.getPCByTrackId(trackId);
            return pc.getLocalTrack(trackId);
        }
        getLocalTracks() {
            const tracks = [];
            this.peerMgr.getPCList().forEach((pc) => {
                tracks.push(...pc.getLocalTracks());
            });
            return tracks;
        }
        getTrackState(trackId) {
            var _a;
            return ((_a = this.getLocalTrack(trackId)) === null || _a === void 0 ? void 0 : _a.isLocalMuted()) ? 0 : 1;
        }
        getCDNEnable() {
            return this._CDNEnable;
        }
        getCDNUris() {
            return this._CDNUris;
        }
    }
    class Store extends ReadableStore {
        _initRemoteTracks() {
            for (const userId in this._roomResources) {
                const resArr = this._roomResources[userId];
                if (userId === this.crtUserId || resArr.length === 0) {
                    continue;
                }
                resArr.forEach(item => {
                    const resourceId = getTrackId(item);
                    const { tag, userId, mediaType } = parseTrackId(resourceId);
                    const remoteTrack = mediaType === exports.RCMediaType.AUDIO_ONLY ? new RCRemoteAudioTrack(tag, userId) : new RCRemoteVideoTrack(tag, userId);
                    remoteTrack.__innerSetRemoteMuted(item.state === 0);
                    this._remoteTracks[resourceId] = remoteTrack;
                });
            }
        }
        initWithRoomData(data) {
            this._sessionId = data.sessionId;
            this._token = data.token;
            /**
             * 解析房间数据
             * 1、正常加入房间解析房间数据
             * 2、升级房间后，不解析房间数据
             */
            if (this.isUpgrade) {
                this._roomResources = {};
            }
            else {
                this._roomResources = parseRoomData(data, this.roomId);
            }
            // 根据解析出来的数据构建远端流
            this._initRemoteTracks();
            this.setResourcesByUserId(this.crtUserId, this.getResourcesByUserId(this.crtUserId) || []);
            logger.info(`room data -> ${JSON.stringify(this._roomResources)}`);
        }
        assignRoomData(data) {
            Object.assign(this._roomResources, data);
        }
        setResourcesByUserId(userId, arr) {
            this._roomResources[userId] = arr;
        }
        removeRemoteTrack(trackId) {
            delete this._remoteTracks[trackId];
        }
        removeResourcesByUserId(userId) {
            delete this._roomResources[userId];
        }
        addRemoteTrack(track) {
            this._remoteTracks[track.getTrackId()] = track;
        }
        removeRemoteTracks() {
            const remoteTracks = Object.values(this._remoteTracks);
            if (!remoteTracks.length) {
                return;
            }
            remoteTracks.forEach((track) => {
                track.isAudioTrack() && track.__releaseMediaElement();
            });
            this._remoteTracks = {};
        }
        setCDNEnabel(bool) {
            this._CDNEnable = bool;
        }
        setCDNUris(uris) {
            this._CDNUris = uris;
        }
        resetSubscribedList(subscribeList) {
            this._subscribedList.splice(0, this._subscribedList.length, ...subscribeList);
            this.resetCollectSubscribeList(subscribeList);
        }
        resetCollectSubscribeList(collectSubscribeList) {
            this._collectSubscribeList.splice(0, this._collectSubscribeList.length, ...collectSubscribeList);
        }
    }

    class BaseInvoker {
        constructor(
        /**
         * 内存数据管理实例
         */
        _store, 
        /**
         * 命令终止时返回的错误码定义
         */
        abortCode) {
            this._store = _store;
            this.abortCode = abortCode;
            // command 队列
            this._queue = [];
            // 锁
            this._busy = false;
            this._isDestroyed = false;
        }
        _next() {
            this._busy = false;
            this._execute();
        }
        async _execute() {
            if (this._isDestroyed || this._busy || this._queue.length === 0) {
                return;
            }
            this._busy = true;
            const { command, resolve, reject } = this._queue.shift();
            let res;
            try {
                /**
                 * 说明：由于是先弹出 再执行 Command，所以不存在 在队列中正在执行的任务
                 */
                res = await command.execute(this._store, this);
            }
            catch (error) {
                reject(error);
                this._next();
                return;
            }
            resolve(res);
            this._next();
        }
        push(command) {
            return new Promise((resolve, reject) => {
                // 房间已销毁
                if (this._isDestroyed) {
                    return;
                }
                // 合并具有相同功能的 Command
                // 由于 Subscribed 与 UnSubscribed 是全量订阅的，
                // 所以只要队列中存在中 Subscribed 或 UnSubscribed 则可以只执行最后一个
                const kind = command.kind;
                if (this._queue.length > 0) {
                    if (kind === RCCommandKind.AsyncCommand) {
                        // 重写 resolve, reject 并将使用新回调的进行包裹它
                        ({ command, resolve, reject } = this.commandOffset(command, resolve, reject));
                    }
                }
                // 根据 command 优先级确定其在队列中的位置
                const priority = command.priority;
                // 优化队列输入权重为 0 时直接插入队列最未端即可
                if (priority === CommandPriority.LOW) {
                    this._queue.push({ command, resolve, reject });
                }
                else {
                    // 有序队列从前往后查找
                    const index = this._queue.findIndex((item) => item.command.priority < priority);
                    const postion = index === -1 ? this._queue.length - 1 : index;
                    this._queue.splice(postion, 0, { command, resolve, reject });
                }
                // 防止相同任务频繁处理
                // 在Push完成后创建一个微任务队列
                // 在队列内对相同的任务进行处理
                Promise.resolve().then(() => {
                    this._execute();
                });
                // setTimeout(() => {
                //   this._execute()
                // }, 1)
            });
        }
        /**
         * 查找出 RCCommandKind.AsyncCommand 类型的 Command，并将其从队列中删除
         * 并使用最新的一次 Command 接管它的 resolve & reject
         * @param resolve
         * @param reject
         * @returns 具有两个属性的对象，resolve 和 reject。
         */
        commandOffset(command, resolve, reject) {
            // 因为一次只可以插入一个 Command 所以查找 只需要在队列最后查找一个即可
            const index = this._queue.length - 1;
            const item = this._queue[index];
            const hashSubscribTask = item.command.kind === RCCommandKind.AsyncCommand;
            // 如果队列中不存在则直接返回
            if (!hashSubscribTask) {
                return { command, resolve, reject };
            }
            const [task] = this._queue.splice(index, 1);
            if (task.command instanceof AsyncCommand) {
                task.command.setState(RCLinkedListPoint.MIDDLE);
                if (command instanceof AsyncCommand) {
                    command.setState(RCLinkedListPoint.TAIL);
                }
            }
            // 重写 command execute 方法
            const oldexecute = command.execute;
            /* eslint no-useless-call: 'off' */
            command.execute = async function (store, invoker) {
                task.command.execute.call(task.command, store, invoker);
                return oldexecute.call(command, store, invoker);
            };
            return {
                command,
                resolve: (res) => {
                    task.resolve.call(task, res);
                    resolve(res);
                },
                reject: (error) => {
                    task.reject.call(task, error);
                    reject(error);
                }
            };
        }
        isDestroyed() {
            return this._isDestroyed;
        }
        destroy() {
            if (this._isDestroyed) {
                return;
            }
            this._isDestroyed = true;
            // 清空队列
            this._queue.forEach(item => {
                item.resolve({ code: this.abortCode });
            });
            this._queue.length = 0;
        }
    }
    /**
     * 房间任务队列管理
     */
    class Invoker extends BaseInvoker {
        constructor(context, service, peerMrg, roomId, crtUserId, mode, reporter, isUpgrade, isMainRoom) {
            super(new Store(context, service, peerMrg, roomId, crtUserId, mode, reporter, isUpgrade, isMainRoom), exports.RCRTCCode.ROOM_HAS_BEEN_DESTROYED);
        }
        /**
         * 获取 store 存储实例，返回值类型 `ReadableStore`，避免非 command 定义中修改内存
         */
        get store() {
            return this._store;
        }
        destroy() {
            super.destroy();
            this._store.removeRemoteTracks();
        }
    }

    /**
     * 加入房间后，若房间中已存在己方发布的资源，表示之前未能完成正常退出流程
     * 需先清除房间内的己方资源，通知房间内其他人己方已取消当前资源的发布
     * 该步骤没有必要与 MediaServer 的交互，因后续资源变更交互为全量交互
     */
    class UnpublishPrevCommand extends BaseCommand {
        async execute(store) {
            const selfRes = store.getResourcesByUserId(store.crtUserId);
            const tmpRes = selfRes.slice();
            // 清空已发布资源
            selfRes.length = 0;
            logger.info(`unpublish uris before rejoin -> ${JSON.stringify(tmpRes)}`);
            // 添加请求队列并等待结果
            const code = await store.context.setRTCTotalRes(store.roomId, buildPlusMessage(RCRTCMessageType.UNPUBLISH, tmpRes), buildTotalURIMessageContent([]), RCRTCMessageType.TOTAL_CONTENT_RESOURCE, buildTotalURIMessageContent([]));
            if (code !== engine.ErrorCode.SUCCESS) {
                logger.error(`unpublish uris before rejoin failed -> code: ${code}`);
            }
            else {
                logger.info('unpublish uris before rejoin success');
            }
        }
    }

    /**
     * 音视频模式
     */
    var RTCMode;
    (function (RTCMode) {
        /**
         * 普通音视频模式
         */
        RTCMode[RTCMode["RTC"] = 0] = "RTC";
        /**
         * 直播模式
         */
        RTCMode[RTCMode["LIVE"] = 2] = "LIVE";
        /**
         * 跨应用多人房间
         */
        RTCMode[RTCMode["CROSS_MUTI"] = 7] = "CROSS_MUTI";
        /**
        * 跨应用直播
        */
        RTCMode[RTCMode["CROSS_LIVE"] = 8] = "CROSS_LIVE";
    })(RTCMode || (RTCMode = {}));

    /**
     * RTC 房间加入类型
     */
    exports.RTCJoinType = void 0;
    (function (RTCJoinType) {
        /**
         * 踢前一个设备
         */
        RTCJoinType[RTCJoinType["KICK"] = 0] = "KICK";
        /**
         * 当前加入拒绝
         */
        RTCJoinType[RTCJoinType["REFUSE"] = 1] = "REFUSE";
        /**
         * 两个设备共存
         */
        RTCJoinType[RTCJoinType["COEXIST"] = 2] = "COEXIST";
    })(exports.RTCJoinType || (exports.RTCJoinType = {}));

    /**
     * 资源发布命令
     */
    class JoinRoomCommand extends BaseCommand {
        constructor(roomId, roomType, joinType, livingType, innerUserDatas, outerUserDatas) {
            super();
            this.roomId = roomId;
            this.roomType = roomType;
            this.joinType = joinType;
            this.livingType = livingType;
            this.innerUserDatas = innerUserDatas;
            this.outerUserDatas = outerUserDatas;
        }
        get kind() {
            return RCCommandKind.JoinRoom;
        }
        async execute(store, invoker) {
            var _a;
            const { context, service } = store;
            let logTag = RCLoggerTag.L_RTC_CLIENT_JOIN_RTC_ROOM_R;
            if (this.roomType === RTCMode.LIVE) {
                logTag = RCLoggerTag.L_RTC_CLIENT_JOIN_LIVING_ROOM_R;
            }
            else if (this.roomType === RTCMode.CROSS_MUTI) {
                logTag = RCLoggerTag.L_RTC_CLIENT_JOIN_CROSS_RTC_ROOM_R;
            }
            if (context.getConnectionStatus() !== engine.ConnectionStatus.CONNECTED) {
                engine.logger.error(logTag, {
                    status: RCLoggerStatus.FAILED,
                    code: exports.RCRTCCode.SIGNAL_DISCONNECTED,
                    msg: 'im not connected'
                }, { logSource: engine.LogSource.RTC });
                return { code: exports.RCRTCCode.SIGNAL_DISCONNECTED };
            }
            // 加入房间前调用探测逻辑
            service.detectorMediaSever();
            if (isIllegalConnection(context.getNaviInfo())) {
                engine.logger.error(logTag, {
                    status: RCLoggerStatus.FAILED,
                    code: exports.RCRTCCode.PACKAGE_ENVIRONMENT_ERROR,
                    msg: 'navi_usl error'
                }, { logSource: engine.LogSource.RTC });
                return { code: exports.RCRTCCode.PACKAGE_ENVIRONMENT_ERROR };
            }
            if (!engine.validate('roomId', this.roomId, engine.notEmptyString, true)) {
                engine.logger.error(logTag, {
                    status: RCLoggerStatus.FAILED,
                    code: exports.RCRTCCode.PARAMS_ERROR,
                    msg: 'params error -> roomId'
                }, { logSource: engine.LogSource.RTC });
                return { code: exports.RCRTCCode.PARAMS_ERROR };
            }
            if (!engine.validate('roomType', this.roomType, (value) => RTCMode[value] !== undefined)) {
                engine.logger.error(logTag, {
                    status: RCLoggerStatus.FAILED,
                    code: exports.RCRTCCode.PARAMS_ERROR,
                    msg: 'params error -> roomType'
                }, { logSource: engine.LogSource.RTC });
                return { code: exports.RCRTCCode.PARAMS_ERROR };
            }
            if (!engine.validate('outerUserDatas', this.outerUserDatas, engine.isObject, false)) {
                engine.logger.error(logTag, {
                    status: RCLoggerStatus.FAILED,
                    code: exports.RCRTCCode.PARAMS_ERROR,
                    msg: 'params error -> outerUserDatas'
                }, { logSource: engine.LogSource.RTC });
                return { code: exports.RCRTCCode.PARAMS_ERROR };
            }
            if (this.outerUserDatas) {
                const valid = Object.keys(this.outerUserDatas).every(key => {
                    return engine.validate(`outerUserDatas.${key}`, this.outerUserDatas[key], engine.isString, true);
                });
                if (!valid) {
                    engine.logger.error(logTag, {
                        status: RCLoggerStatus.FAILED,
                        code: exports.RCRTCCode.PARAMS_ERROR,
                        msg: 'params error -> outerUserDatas'
                    }, { logSource: engine.LogSource.RTC });
                    return { code: exports.RCRTCCode.PARAMS_ERROR };
                }
            }
            const urls = service.getNaviMS();
            if (!urls.length) {
                engine.logger.error(logTag, {
                    status: RCLoggerStatus.FAILED,
                    code: exports.RCRTCCode.NOT_OPEN_VIDEO_AUDIO_SERVER,
                    msg: 'No audio / video server address available'
                }, { logSource: engine.LogSource.RTC });
                return { code: exports.RCRTCCode.NOT_OPEN_VIDEO_AUDIO_SERVER };
            }
            logger.info(`joinRoom -> roomId: ${this.roomId}; joinType: ${this.joinType || exports.RTCJoinType.KICK}`);
            const { code, data } = await context.joinRTCRoom(this.roomId, this.roomType, this.livingType, this.joinType, this.innerUserDatas, this.outerUserDatas);
            if (code !== engine.ErrorCode.SUCCESS || !data) {
                logger.warn(`joinRoom failed -> code: ${code}`);
                const errorCode = code === 40032 ? exports.RCRTCCode.SIGNAL_JOIN_RTC_ROOM_REFUSED : code;
                engine.logger.error(logTag, {
                    status: RCLoggerStatus.FAILED,
                    code: errorCode,
                    msg: `joinRoom failed -> code: ${code}`
                }, { logSource: engine.LogSource.RTC });
                return { code: errorCode };
            }
            logger.info(`joinRoom success -> userId: ${context.getCurrentId()}, roomId: ${this.roomId}, data: ${JSON.stringify(data)}`);
            store.initWithRoomData(data);
            const selfRes = store.getResourcesByUserId(store.crtUserId);
            /*
             * 加入房间后，若房间中已存在己方发布的资源，表示之前未能完成正常退出流程
             * 需先清除房间内的己方资源，通知房间内其他人己方已取消当前资源的发布
             * 该步骤没有必要与 MediaServer 的交互，因后续资源变更交互为全量交互
             */
            selfRes.length > 0 && invoker.push(new UnpublishPrevCommand());
            const CDNUris = (_a = data.roomInfo.filter((item) => { return item.key === 'cdn_uris'; })[0]) === null || _a === void 0 ? void 0 : _a.value;
            CDNUris && store.setCDNUris(JSON.parse(CDNUris)[0]);
            engine.logger.info(logTag, {
                status: RCLoggerStatus.SUCCESSED,
                userId: store.crtUserId,
                roomId: this.roomId,
                data
            }, { logSource: engine.LogSource.RTC });
            return { code: exports.RCRTCCode.SUCCESS, data };
        }
    }

    /**
     * 北极星上报 R2 参数
     */
    var R2Action;
    (function (R2Action) {
        /**
         * 发布
         */
        R2Action["PUBLISH"] = "publish";
        /**
         * 订阅
         */
        R2Action["SUBSCRIBE"] = "subscribe";
    })(R2Action || (R2Action = {}));

    var R2Status;
    (function (R2Status) {
        /**
         * 开始
         */
        R2Status["BEGIN"] = "begin";
        /**
         * 结束
         */
        R2Status["END"] = "end";
    })(R2Status || (R2Status = {}));

    var RCInnerCDNBroadcast;
    (function (RCInnerCDNBroadcast) {
        // 扩散
        RCInnerCDNBroadcast[RCInnerCDNBroadcast["SPREAD"] = 0] = "SPREAD";
        RCInnerCDNBroadcast[RCInnerCDNBroadcast["NO_SPREAD"] = -1] = "NO_SPREAD";
    })(RCInnerCDNBroadcast || (RCInnerCDNBroadcast = {}));

    var RTCApiType;
    (function (RTCApiType) {
        RTCApiType[RTCApiType["ROOM"] = 1] = "ROOM";
        RTCApiType[RTCApiType["PERSON"] = 2] = "PERSON";
    })(RTCApiType || (RTCApiType = {}));

    /**
     * 获取 exchange 接口的请求体数据
     * @param subscribeList 订阅清单
     * @param iceRestart
     * @param pc RCRTCPeerConnection 实例
     * @param store: Store
     */
    async function createExchangeParams(subscribeList, iceRestart, pc, store) {
        const offer = await pc.createOffer(iceRestart);
        const reqBody = {
            sdp: offer,
            extend: JSON.stringify({
                resolutionInfo: pc.getOutboundVideoInfo()
            }),
            subscribeList: subscribeList.filter((item) => {
                const trackId = item.track.getTrackId();
                const { userId } = parseTrackId(trackId);
                const res = store.getResourcesByUserId(userId);
                if (!res) {
                    return false;
                }
                const isInclude = res.filter(item => trackId === `${item.msid}_${item.mediaType}`).length;
                return isInclude;
            }).map(item => ({
                simulcast: item.subTiny ? RCStreamType.TINY : RCStreamType.NORMAL,
                resolution: '',
                // uri: this._getResourceById(item.track.getTrackId())!.uri
                uri: store.getPublishedResourceByTrackId(item.track.getTrackId()).uri
            })),
            switchstream: false
            // switchstream: !!this._initOptions.autoSwitchStream
        };
        return reqBody;
    }
    /**
     * 扩散 cdn_uris 资源
     */
    async function spreadCDNInfo(context, roomId, CDNUris) {
        const code = await context.setRTCCDNUris(roomId, RCRTCMessageType.TOTAL_CONTENT_RESOURCE, JSON.stringify([CDNUris]));
        if (code !== engine.ErrorCode.SUCCESS) {
            logger.error(`spreadCDNInfo failed -> code: ${code}`);
            return { code: exports.RCRTCCode.SIGNAL_ERROR };
        }
        logger.info('spreadCDNInfo succeed');
        return { code: exports.RCRTCCode.SUCCESS };
    }
    /**
     * 给房间设置 CDN 数据
     */
    async function setRoomCDNInfo(context, roomId, CDNUris) {
        const code = await context.setRTCData(roomId, 'cdn_uris', JSON.stringify([CDNUris]), true, RTCApiType.ROOM);
        if (code !== engine.ErrorCode.SUCCESS) {
            logger.error(`setRoomCDNInfo failed -> code: ${code}`);
            return { code: exports.RCRTCCode.SIGNAL_ERROR };
        }
        logger.info('setRoomCDNInfo succeed');
        return { code: exports.RCRTCCode.SUCCESS };
    }
    /**
       * 开启、停用 CDN 推资源后发信令
       */
    async function sendCDNInfoSignal(store) {
        const context = store.context;
        const roomId = store.roomId;
        const CDNUris = Object.assign({}, store.getCDNUris(), { enableInnerCDN: store.getCDNEnable() });
        engine.logger.info(RCLoggerTag.L_LIVING_ROOM_SPREAD_CDN_INFO_T, {
            roomId,
            CDNUris
        }, {
            logSource: engine.LogSource.RTC
        });
        const resCodeArr = await Promise.all([
            spreadCDNInfo(context, roomId, CDNUris),
            setRoomCDNInfo(context, roomId, CDNUris)
        ]);
        const isSuccess = resCodeArr.every((item) => {
            return item.code === exports.RCRTCCode.SUCCESS;
        });
        if (isSuccess) {
            engine.logger.info(RCLoggerTag.L_LIVING_ROOM_SPREAD_CDN_INFO_R, {
                status: RCLoggerStatus.SUCCESSED,
                CDNUris
            }, {
                logSource: engine.LogSource.RTC
            });
        }
        else {
            engine.logger.error(RCLoggerTag.L_LIVING_ROOM_SPREAD_CDN_INFO_R, {
                status: RCLoggerStatus.FAILED,
                code: exports.RCRTCCode.SIGNAL_ERROR,
                msg: 'signal error'
            }, {
                logSource: engine.LogSource.RTC
            });
        }
        return isSuccess ? { code: exports.RCRTCCode.SUCCESS } : { code: exports.RCRTCCode.SIGNAL_ERROR };
    }

    class ExchangeCommand extends BaseCommand {
        constructor(headers, reqBody) {
            super();
            this.headers = headers;
            this.reqBody = reqBody;
        }
        async execute(store, invoker) {
            var _a, _b;
            const res = await store.service.exchange(this.headers, this.reqBody);
            if (store.roomMode !== RTCMode.LIVE) {
                return res;
            }
            const pullUrl = (_b = (_a = res.data) === null || _a === void 0 ? void 0 : _a.urls) === null || _b === void 0 ? void 0 : _b.pull_url;
            if (res.code !== exports.RCRTCCode.SUCCESS || !pullUrl) {
                return res;
            }
            /**
             * 自动模式下:
             * /exchange 完需根据 broadcast 字端判断是否扩散 cdn_uris 数据，设置房间 cdn_uris 数据
             */
            // this._CDNUris = JSON.parse(pullUrl)
            const uris = JSON.parse(pullUrl);
            store.setCDNUris(uris);
            if ((uris === null || uris === void 0 ? void 0 : uris.broadcast) === RCInnerCDNBroadcast.SPREAD) {
                // this._CDNEnable = true
                store.setCDNEnabel(true);
                sendCDNInfoSignal(store);
            }
            return res;
        }
    }

    class UpdateSubscribeListCommand extends BaseCommand {
        constructor(tracks, subhook, forceReq) {
            super();
            this.tracks = tracks;
            this.subhook = subhook;
            this.forceReq = forceReq;
        }
        async execute(store, invoker) {
            const { tracks, forceReq } = this;
            const roomId = store.roomId;
            if (!engine.validate('tracks', tracks, () => {
                return engine.isArray(tracks) && tracks.every(res => {
                    return res instanceof RCRemoteTrack || res.track instanceof RCRemoteTrack;
                });
            }, true)) {
                logger.warn(`update sublist failed, tracks is invalid -> roomId: ${roomId}`);
                return { code: exports.RCRTCCode.PARAMS_ERROR };
            }
            logger.info(`update subscribe list -> roomId: ${roomId}, forceReq: ${forceReq}, tracks: ${tracks.map(getTrackIdFromAttr)}`);
            let attrs = tracks.map(item => {
                return item instanceof RCRemoteTrack ? { track: item } : Object.assign({}, item);
            });
            // resourceId 去重，并做数据深拷贝
            const map = {};
            attrs = attrs.filter(res => {
                const trackId = res.track.getTrackId();
                // 已不在远端资源列表中，无需订阅/取消订阅
                const track = store.getRemoteTrack(trackId);
                if (!track) {
                    logger.warn(`track cannot found in room -> trackId: ${trackId}`);
                    return false;
                }
                if (map[trackId]) {
                    return false;
                }
                return (map[trackId] = true);
            }).map(item => (Object.assign({}, item)));
            // const crtSubList = this._subscribedList.map(item => ({ ...item }))
            const crtSubList = store.getSubscribedList().map(item => (Object.assign({}, item)));
            if (!forceReq) {
                let changed = false;
                // 检查与现有订阅列表是否有差别
                attrs.forEach(item => {
                    const index = crtSubList.findIndex(tmp => tmp.track === item.track);
                    // 新增订阅
                    if (index === -1) {
                        changed = true;
                        return;
                    }
                    // 已存在的订阅内容，检测 tiny 是否有变更，同时从 crtSubList 中移除
                    // 剩余未移除内容为已取消订阅内容
                    const crt = crtSubList.splice(index, 1)[0];
                    if (crt.subTiny !== item.subTiny) {
                        changed = true;
                    }
                });
                // crtSubList 中剩余内容为取消订阅资源
                if (crtSubList.length) {
                    changed = true;
                }
                if (!changed) {
                    // logger.warn('subscribe list unchanged')
                    return { code: exports.RCRTCCode.SUCCESS };
                }
            }
            const { pc, pushOtherRooms, headers } = this.subhook(tracks);
            pc.updateSubRemoteTracks(attrs.map(item => item.track));
            const reqBody = await createExchangeParams(attrs, false, pc, store);
            /**
              * 直播房间需携带 pushOtherRooms 信息
              */
            pushOtherRooms && (reqBody.pushOtherRooms = pushOtherRooms);
            const result = await new ExchangeCommand(headers, reqBody).execute(store, invoker);
            const subTrackIds = attrs.map((item) => { return item.track.getTrackId(); });
            if (result.code !== exports.RCRTCCode.SUCCESS) {
                return { code: result.code };
            }
            const { sdp: answer, resultCode, message, subscribedList } = result.data;
            if (resultCode !== exports.RCRTCCode.SUCCESS) {
                logger.error(`change subscribe list failed: ${resultCode}`);
                return { code: resultCode };
            }
            logger.debug(`subscribe success: ${subTrackIds.join(',')}`);
            const resCode = await pc.setRemoteAnswer(answer.sdp);
            if (resCode !== exports.RCRTCCode.SUCCESS) {
                return { code: resCode };
            }
            // 获取真正订阅成功的资源
            const subSuccessTrackIds = subscribedList === null || subscribedList === void 0 ? void 0 : subscribedList.map(item => `${item.msid}_${item.mediaType}`);
            const subSuccessList = attrs.filter(item => subSuccessTrackIds === null || subSuccessTrackIds === void 0 ? void 0 : subSuccessTrackIds.includes(item.track.getTrackId()));
            const failedList = attrs.filter(item => !(subSuccessTrackIds === null || subSuccessTrackIds === void 0 ? void 0 : subSuccessTrackIds.includes(item.track.getTrackId())));
            // 更新 remoteTrack.isSubscribed、remoteTrack.isTinyTrack
            const remoteTracks = store.getRemoteTracks();
            for (const trackId in remoteTracks) {
                const subed = subSuccessList.some(item => item.track.getTrackId() === trackId);
                remoteTracks[trackId].__innerSetSubscribed(subed);
                const isTinyTrack = subSuccessList.some(item => (item.track.getTrackId() === trackId && item.subTiny));
                remoteTracks[trackId].isVideoTrack() && (remoteTracks[trackId].__innerSetIsTinyTrack(isTinyTrack));
            }
            // 更新本地订阅关系
            // const sublist = store.getSubscribedList()
            // sublist.splice(0, sublist.length, ...subSuccessList)
            store.resetSubscribedList(subSuccessList);
            return failedList.length ? { code: exports.RCRTCCode.SUCCESS, failedList } : { code: exports.RCRTCCode.SUCCESS };
        }
    }

    class UnsubscribeCommand extends BaseCommand {
        constructor(tracks, subhook) {
            super();
            this.tracks = tracks;
            this.subhook = subhook;
        }
        async execute(store, invoker) {
            const tracks = this.tracks;
            const roomId = store.roomId;
            engine.logger.info(RCLoggerTag.L_ABSTRACT_ROOM_UNSUBSCRIBE_T, {
                trackIds: tracks.map(getTrackIdFromAttr)
            }, {
                logSource: engine.LogSource.RTC
            });
            if (!engine.validate('tracks', tracks, () => {
                return engine.isArray(tracks) && tracks.length > 0 && tracks.every(item => item instanceof RCRemoteTrack);
            }, true)) {
                logger.warn(`unsubscribe failed, tracks is invalid -> roomId: ${roomId}`);
                engine.logger.warn(RCLoggerTag.L_ABSTRACT_ROOM_UNSUBSCRIBE_R, {
                    status: RCLoggerStatus.FAILED,
                    code: exports.RCRTCCode.PARAMS_ERROR,
                    msg: 'params error -> tracks'
                }, {
                    logSource: engine.LogSource.RTC
                });
                return { code: exports.RCRTCCode.PARAMS_ERROR };
            }
            logger.info(`unsubscribe -> roomId: ${roomId}, tracks: ${tracks.map(getTrackIdFromAttr)}`);
            // 计算剩余订阅列表
            const crtSubList = store.getSubscribedList().map(item => (Object.assign({}, item))).filter(item => !tracks.includes(item.track));
            // 北极星上报
            store.polarisReport.sendR2(R2Action.SUBSCRIBE, R2Status.END, tracks.map(item => item.getTrackId()));
            engine.logger.info(RCLoggerTag.L_ABSTRACT_ROOM_UNSUBSCRIBE_R, {
                trackIds: tracks.map(getTrackIdFromAttr),
                roomId
            }, {
                logSource: engine.LogSource.RTC
            });
            return new UpdateSubscribeListCommand(crtSubList, this.subhook, false).execute(store, invoker);
        }
    }

    class ParseUserStateCommand extends BaseCommand {
        constructor(msgContent, subhook) {
            super();
            this.msgContent = msgContent;
            this.subhook = subhook;
        }
        get priority() {
            return CommandPriority.NORMAL;
        }
        async execute(store, invoker) {
            /**
             * 主动加入房间
             */
            const joined = [];
            /**
             * 主动退出房间
             */
            const left = [];
            /**
             * 观众升级为主播加入房间
             */
            const upgrade = [];
            /**
             * 主播降级为观众退出房间
             */
            const downgrade = [];
            const res = { joined, left, upgrade, downgrade };
            const { users } = this.msgContent;
            if (users.length === 0) {
                return res;
            }
            /**
             * 过滤掉副房间身份的人员
             */
            for (let index = 0; index < users.length; index++) {
                const user = users[index];
                // 加入房间时
                if (user.extra && user.extra.roomId !== store.roomId) {
                    // TODO return 存疑
                    return res;
                }
                // 退出房间时
                if (+user.state === 1 && !store.getRemoteUserIds().includes(user.userId)) {
                    // TODO return 存疑
                    return res;
                }
            }
            users.forEach(item => {
                const userId = item.userId;
                if (+item.state === 0) {
                    logger.debug(`user joined -> ${userId}`);
                    // 对端 im 重连之后调加入房间信令获取最新数据，服务会给本端下发“对端加入房间”的消息，本端内存已包含对端人员，所以需过滤掉
                    const resArr = store.getResourcesByUserId(userId);
                    if (!resArr) {
                        item.switchRoleType ? upgrade.push(userId) : joined.push(userId);
                    }
                    store.setResourcesByUserId(userId, resArr || []);
                }
                else {
                    logger.debug(`user left -> ${userId}`);
                    item.switchRoleType ? downgrade.push(userId) : left.push(userId);
                }
            });
            const allLeft = [...left, ...downgrade];
            // 用户离开房间时，自动退订对方资源
            if (allLeft.length) {
                const tracks = [];
                const userIds = [];
                allLeft.forEach(userId => {
                    tracks.push(...store.getRemoteTracksByUserId(userId));
                    // 先暂存待删用户，因当前异步队列中可能存在等待中的待处理任务，需要当前房间数据状态
                    // delete this._roomResources[userId]
                    userIds.push(userId);
                });
                if (tracks.length) {
                    // await this.unsubscribe(tracks)
                    await new UnsubscribeCommand(tracks, this.subhook).execute(store, invoker);
                    // tracks.forEach((item) => delete this._remoteTracks[item.getTrackId()])
                    tracks.forEach(item => store.removeRemoteTrack(item.getTrackId()));
                }
                // 等待队列执行完成后清除内存数据
                if (userIds.length) {
                    // userIds.forEach(userId => delete this._roomResources[userId])
                    userIds.forEach(userId => store.removeResourcesByUserId(userId));
                }
            }
            return res;
        }
    }

    class OnRemoteUserUnpubCommand extends BaseCommand {
        constructor(subhook, tracks, onTrackUnpublish) {
            super();
            this.subhook = subhook;
            this.tracks = tracks;
            this.onTrackUnpublish = onTrackUnpublish;
        }
        async execute(store, invoker) {
            // 需要替业务层取消订阅，业务层只需关注 UI 变化
            const tracks = this.tracks;
            // await this.unsubscribe(tracks)
            await new UnsubscribeCommand(tracks, this.subhook).execute(store, invoker);
            tracks.forEach(item => {
                item.__innerDestroy();
                // delete this._remoteTracks[item.getTrackId()]
                store.removeRemoteTrack(item.getTrackId());
            });
            this.onTrackUnpublish(tracks);
        }
    }

    class ParseRemoteResCommand extends BaseCommand {
        constructor(msgContent, messageType, senderId, subhook, callback) {
            super();
            this.msgContent = msgContent;
            this.messageType = messageType;
            this.senderId = senderId;
            this.subhook = subhook;
            this.callback = callback;
        }
        get priority() {
            return CommandPriority.NORMAL;
        }
        async execute(store, invoker) {
            var _a, _b;
            const { uris } = this.msgContent;
            const publishedList = [];
            const unpublishedList = [];
            const modifiedList = [];
            let parseData;
            const userId = this.senderId;
            const messageType = this.messageType;
            // 当前资源清单
            // const nowResources = this._roomResources[userId] || (this._roomResources[userId] = [])
            const nowResources = store.getResourcesByUserId(userId) || [];
            store.setResourcesByUserId(userId, nowResources);
            switch (messageType) {
                case RCRTCMessageType.MODIFY:
                    modifiedList.push(...uris);
                    break;
                case RCRTCMessageType.PUBLISH:
                    publishedList.push(...uris);
                    break;
                case RCRTCMessageType.UNPUBLISH:
                    unpublishedList.push(...uris);
                    break;
                case RCRTCMessageType.TOTAL_CONTENT_RESOURCE:
                    // 比对本地资源，找出被移除资源、新增资源、被修改资源
                    parseData = diffPublishResources(nowResources, uris);
                    publishedList.push(...parseData.publishedList);
                    unpublishedList.push(...parseData.unpublishedList);
                    modifiedList.push(...parseData.modifiedList);
                    break;
            }
            if (publishedList.length > 0) {
                // published 资源包含当前房间已存在资源二次发布，uri 有变更
                const ids = nowResources.map(getTrackId);
                // 对方重新发布且己方已订阅的资源
                const subedTracks = [];
                const newTracks = [];
                publishedList.forEach(item => {
                    const resourceId = getTrackId(item);
                    const index = ids.indexOf(resourceId);
                    const { userId, tag, mediaType } = parseTrackId(resourceId);
                    if (index > -1) {
                        nowResources[index] = item;
                    }
                    else {
                        nowResources.push(item);
                    }
                    // let rTrack: RCRemoteTrack = this._remoteTracks[resourceId]
                    let rTrack = store.getRemoteTrack(resourceId);
                    // 二次发布的资源，直接更新
                    if (rTrack) {
                        if (rTrack.isSubscribed()) {
                            subedTracks.push(rTrack);
                        }
                    }
                    else {
                        rTrack = mediaType === exports.RCMediaType.AUDIO_ONLY ? new RCRemoteAudioTrack(tag, userId) : new RCRemoteVideoTrack(tag, userId);
                        // this._remoteTracks[resourceId] = rTrack
                        store.addRemoteTrack(rTrack);
                        newTracks.push(rTrack);
                    }
                    rTrack.__innerSetRemoteMuted(item.state === 0);
                });
                // 重新订阅二次发布资源
                if (subedTracks.length) {
                    const trackIds = subedTracks.map(item => item.getTrackId());
                    logger.debug(`resub tracks -> ${JSON.stringify(trackIds)}`);
                    // const { code } = await push(() => this.__subscribe(subedTracks, true))
                    const { code } = await new UpdateSubscribeListCommand(subedTracks, this.subhook).execute(store, invoker);
                    if (code !== exports.RCRTCCode.SUCCESS) {
                        logger.error(`resub tracks failed -> code: ${code}, ids: ${JSON.stringify(trackIds)}`);
                    }
                }
                // this._onTrackPublish(newTracks)
                this.callback.onTrackPublish(newTracks);
            }
            if (unpublishedList.length > 0) {
                const resIds = unpublishedList.map(getTrackId);
                for (let i = nowResources.length - 1; i >= 0; i -= 1) {
                    const item = nowResources[i];
                    if (resIds.includes(getTrackId(item))) {
                        nowResources.splice(i, 1);
                    }
                }
                const tracks = unpublishedList.map(item => {
                    const trackId = getTrackId(item);
                    return store.getRemoteTrack(trackId);
                });
                await new OnRemoteUserUnpubCommand(this.subhook, tracks, this.callback.onTrackUnublish).execute(store, invoker);
            }
            if (modifiedList.length > 0) {
                const resIds = nowResources.map(getTrackId);
                for (let i = 0; i < modifiedList.length; i += 1) {
                    const item = modifiedList[i];
                    const id = getTrackId(item);
                    // 更新资源 state
                    const index = resIds.indexOf(id);
                    nowResources[index].state = item.state;
                    // const rTrack = this._remoteTracks[id]
                    const rTrack = store.getRemoteTrack(id);
                    rTrack.__innerSetRemoteMuted(item.state === 0);
                    // rTrack.isAudioTrack() ? this._onAudioMuteChange(rTrack) : this._onVideoMuteChange(rTrack)
                    rTrack.isAudioTrack() ? this.callback.onAudioMute(rTrack) : this.callback.onVideoMute(rTrack);
                }
            }
            if (store.roomMode !== RTCMode.LIVE) {
                return;
            }
            const content = this.msgContent;
            if (!content.cdn_uris) {
                return;
            }
            // 给业务层抛 CDN 状态
            const changed = ((_a = store.getCDNUris()) === null || _a === void 0 ? void 0 : _a.enableInnerCDN) !== content.cdn_uris[0].enableInnerCDN;
            // 更新 _CDNUris
            // this._CDNUris = content.cdn_uris[0]
            store.setCDNUris(content.cdn_uris[0]);
            if (changed) {
                this.callback.onCDNEnableChange(!!((_b = store.getCDNUris()) === null || _b === void 0 ? void 0 : _b.enableInnerCDN));
            }
        }
    }

    class SubscribeCommand extends BaseCommand {
        constructor(tracks, subhook, forceReq) {
            super();
            this.tracks = tracks;
            this.subhook = subhook;
            this.forceReq = forceReq;
        }
        async execute(store, invoker) {
            // 取消房间状态检查，房间销毁后，invoker 应直接清空，避免后续执行动作
            // const roomStatusCode = this._assertRoomDestroyed()
            // if (roomStatusCode) {
            //   logger.error(`subscribe failed, room has been destroyed -> roomId: ${this._roomId}`)
            //   return { code: RCRTCCode.ROOM_HAS_BEEN_DESTROYED }
            // }
            const { tracks, forceReq } = this;
            const roomId = store.roomId;
            engine.logger.info(RCLoggerTag.L_ABSTRACT_ROOM_SUBSCRIBE_T, {
                trackIds: tracks.map(getTrackIdFromAttr),
                forceReq
            }, {
                logSource: engine.LogSource.RTC
            });
            if (!engine.validate('tracks', tracks, () => {
                return engine.isArray(tracks) && tracks.length > 0 && tracks.every(item => {
                    return item instanceof RCRemoteTrack || item.track instanceof RCRemoteTrack;
                });
            }, true)) {
                logger.warn(`subscribe failed, tracks is invalid -> roomId: ${roomId}`);
                engine.logger.error(RCLoggerTag.L_ABSTRACT_ROOM_SUBSCRIBE_R, {
                    status: RCLoggerStatus.FAILED,
                    code: exports.RCRTCCode.PARAMS_ERROR,
                    msg: 'params error -> tracks'
                }, {
                    logSource: engine.LogSource.RTC
                });
                return { code: exports.RCRTCCode.PARAMS_ERROR };
            }
            logger.info(`subscribe -> roomId: ${roomId}, tracks: ${tracks.map(getTrackIdFromAttr)}`);
            const crtSubList = store.getSubscribedList().map(item => (Object.assign({}, item)));
            const attrs = tracks.map(item => {
                return item instanceof RCRemoteTrack ? { track: item } : item;
            });
            let changed = false;
            const R2TrackIds = [];
            attrs.forEach(item => {
                const trackId = item.track.getTrackId();
                R2TrackIds.push(trackId);
                const crt = crtSubList.find(tmp => tmp.track.getTrackId() === trackId);
                if (crt && crt.subTiny === item.subTiny) {
                    return;
                }
                if (crt) {
                    crt.subTiny = item.subTiny;
                }
                else {
                    crtSubList.push(item);
                }
                changed = true;
            });
            if (!changed && !forceReq) {
                engine.logger.warn(RCLoggerTag.L_ABSTRACT_ROOM_SUBSCRIBE_R, {
                    status: RCLoggerStatus.FAILED,
                    code: '',
                    msg: 'repeat subscribe'
                }, {
                    logSource: engine.LogSource.RTC
                });
                return { code: exports.RCRTCCode.SUCCESS };
            }
            // 北极星上报
            store.polarisReport.sendR2(R2Action.SUBSCRIBE, R2Status.BEGIN, R2TrackIds);
            engine.logger.info(RCLoggerTag.L_ABSTRACT_ROOM_SUBSCRIBE_R, {
                trackIds: tracks.map(getTrackIdFromAttr),
                roomId
            }, {
                logSource: engine.LogSource.RTC
            });
            return new UpdateSubscribeListCommand(crtSubList, this.subhook, true).execute(store, invoker);
        }
    }

    /**
     * 资源发布命令
     */
    class PublishCommand extends BaseCommand {
        constructor(tracks, pubhook) {
            super();
            this.tracks = tracks;
            this.pubhook = pubhook;
        }
        get kind() {
            return RCCommandKind.Publish;
        }
        /**
         * 从 pc 移除当次发布失败的资源
         */
        _removePubFailedTracks(tracks, pc) {
            tracks.forEach(item => {
                const track = item instanceof RCLocalTrack ? item : item.track;
                logger.debug(`remove pub failed track from peerconnection -> trackId: ${track.getTrackId()}`);
                pc.removeLocalTrackById(track.getTrackId());
            });
        }
        async __publish(store, peerCItem, tracks, pushOtherRooms, invoker) {
            const { pcName, pc, headers } = peerCItem;
            const roomId = store.roomId;
            /**
             * 转化 (RCLocalTrack | IPublishAttrs)[] 为 RCLocalTrack[]，发布失败时抛出 RCLocalTrack[]
             */
            const localTracks = [];
            tracks.forEach(track => {
                const { track: localTrack } = track instanceof RCLocalTrack ? { track } : track;
                localTracks.push(localTrack);
            });
            /**
             * 一个 peerConnection 上行不超过 10 个
             */
            const pubedTrackNum = pc.getLocalTracks().length;
            if (pubedTrackNum + calcTracksNum(tracks, pc) > 10) {
                logger.error(`publish failed, tracks limit exceeded -> roomId: ${roomId}`);
                return { code: exports.RCRTCCode.PUBLISH_TRACK_LIMIT_EXCEEDED, tracks: localTracks };
            }
            logger.debug(`publish tracks -> roomId: ${roomId}, tracks: ${tracks.map(getTrackIdFromAttr)}`);
            /*
             * 资源发布应先与 mediaserver 交换资源，建 PeerConnection 通道，后通知房间
             * 资源取消发布则应先通知取消发布，后与 mediaServer 协商取消资源发布
             */
            tracks.forEach(track => {
                // 向 RTCPeerConnection 添加轨道数据
                const { track: localTrack, pubTiny } = track instanceof RCLocalTrack ? { pubTiny: false, track } : track;
                // 拷贝生成小流并添加至 RTCPeerConnection
                if (localTrack.isVideoTrack()) {
                    if (pubTiny) {
                        let cloneTrack;
                        try {
                            cloneTrack = localTrack.__innerGetMediaStreamTrack().clone();
                            const rcFrameRate = pubTiny.frameRate || exports.RCFrameRate.FPS_15;
                            const resolution = pubTiny.resolution || exports.RCResolution.W176_H144;
                            const { width, height } = transResolution(resolution);
                            const frameRate = transFrameRate(rcFrameRate);
                            cloneTrack.applyConstraints({ width, height, frameRate });
                        }
                        catch (error) {
                            cloneTrack === null || cloneTrack === void 0 ? void 0 : cloneTrack.stop();
                            logger.warn(`pubTiny failed -> id: ${localTrack.getTrackId()}, msg: ${error.message}`);
                            return;
                        }
                        pc.addLocalTrack(new RCLocalVideoTrack(localTrack.getTag(), localTrack.getUserId(), cloneTrack, true));
                    }
                }
                pc.addLocalTrack(localTrack);
            });
            // 客户端主动调用 api 发请求时，清除 ice 断线重连的定时器
            pc.clearReTryExchangeTimer();
            // 发送 /exchange 请求
            const subscribeList = store.useMutilPeerC ? [] : store.getSubscribedList();
            const reqBody = await createExchangeParams(subscribeList, false, pc, store);
            /**
             * 直播房间需携带 pushOtherRooms 信息
             */
            pushOtherRooms && (reqBody.pushOtherRooms = pushOtherRooms);
            const resp = await new ExchangeCommand(headers, reqBody).execute(store, invoker);
            if (resp.code !== exports.RCRTCCode.SUCCESS) {
                // TODO: 资源发送失败，需要移除已添加至 RTCPeerConnection 中的资源信息
                logger.error(`publish failed -> roomId: ${roomId}, code: ${resp.code}`);
                this._removePubFailedTracks(tracks, pc);
                return { code: resp.code, tracks: localTracks };
            }
            const { sdp: answer, resultCode: code, message } = resp.data;
            if (code !== exports.RCRTCCode.SUCCESS) {
                // TODO: 资源发送失败，需要移除已添加至 RTCPeerConnection 中的资源信息
                logger.error(`publish failed -> roomId: ${roomId}, code: ${code}, msg: ${message}`);
                this._removePubFailedTracks(tracks, pc);
                return { code, tracks: localTracks };
            }
            const resCode = await pc.setRemoteAnswer(answer.sdp);
            if (resCode !== exports.RCRTCCode.SUCCESS) {
                return { code: resCode, tracks: localTracks };
            }
            return Object.assign({}, resp, { tracks: localTracks });
        }
        /**
         * 处理批量 /exhcange 的返回数据，作为一次 publish 接口返回
         * @param pubResList 每一个 tag 的发布结果[]
         */
        async _mergePublishRes(pubResList, store) {
            const userId = store.crtUserId;
            const roomId = store.roomId;
            let liveUrl = '';
            const pubFailedTracks = [];
            // const oldPublisheList = this._roomResources[userId]
            // const allPublishList: IPublishedResource[] = [...oldPublisheList]
            const oldPublisheList = store.getResourcesByUserId(userId);
            const allPublishList = [...oldPublisheList];
            let crtMcuPublishList = [];
            pubResList.forEach((pubRes) => {
                if (pubRes.code !== exports.RCRTCCode.SUCCESS) {
                    const { tracks } = pubRes;
                    pubFailedTracks.push({
                        code: pubRes.code,
                        tracks
                    });
                    return;
                }
                const { publishList, urls, mcuPublishList } = pubRes.data;
                liveUrl = urls === null || urls === void 0 ? void 0 : urls.liveUrl;
                // 本次发布的全量资源数据
                const newPublishList = publishList.map(item => (Object.assign({ tag: item.msid.split('_').pop(), state: store.getTrackState(getTrackId(item)) }, item)));
                /**
                 * 新增发布 push 数据，重新发布需覆盖原数据
                 */
                newPublishList.forEach((newPub) => {
                    const { isInclude, index } = isRepeatPub(newPub, allPublishList);
                    if (isInclude) {
                        allPublishList.splice(index, 1, newPub);
                    }
                    else {
                        allPublishList.push(newPub);
                    }
                });
                // 当前直播间 mcuPublist
                const newMcuPublishList = (mcuPublishList === null || mcuPublishList === void 0 ? void 0 : mcuPublishList.map(item => (Object.assign({ tag: item.msid.split('_').pop(), state: 1 }, item)))) || [];
                crtMcuPublishList = newMcuPublishList;
            });
            // 计算此次发布的增量资源数据
            const { publishedList: plus } = diffPublishResources(oldPublisheList, allPublishList);
            // 通知房间成员
            const errorCode = await store.context.setRTCTotalRes(roomId, buildPlusMessage(RCRTCMessageType.PUBLISH, plus), buildTotalURIMessageContent(allPublishList), RCRTCMessageType.TOTAL_CONTENT_RESOURCE, buildTotalURIMessageContent(crtMcuPublishList));
            if (errorCode !== engine.ErrorCode.SUCCESS) {
                // TODO: 确认移动端在发布资源后通知失败的处理逻辑，尽量三端统一
                logger.error(`send publish streams notification failed: ${errorCode}`);
                return { code: exports.RCRTCCode.SIGNAL_ERROR };
            }
            // 更新已发布资源列表
            store.setResourcesByUserId(userId, allPublishList);
            const publishTrackIds = plus.map(item => { return getTrackId(item); });
            // 北极星数据上报
            if (store.polarisReport) {
                store.polarisReport.sendR2(R2Action.PUBLISH, R2Status.BEGIN, publishTrackIds);
            }
            /**
             * 修改 localTrack 发布状态
             */
            plus.forEach((item) => {
                // 获取资源对应 peerConnection
                const pcName = store.useMutilPeerC ? `${roomId}_${parseStreamId(item.msid).tag}` : `${roomId}_pub`;
                const { pc } = store.peerMgr.getPCItemByPCName(pcName);
                const localTrack = pc.getLocalTrack(`${item.msid}_${item.mediaType}`);
                localTrack.__innerSetPublished(true);
            });
            logger.debug(`publish success: ${publishTrackIds.join(',')}`);
            /**
             * 生成 publish 接口的返回数据
             */
            const mergeRes = { code: exports.RCRTCCode.SUCCESS };
            liveUrl && (mergeRes.liveUrl = liveUrl);
            if (pubFailedTracks.length) {
                mergeRes.failedTracks = pubFailedTracks;
                mergeRes.code = exports.RCRTCCode.SOME_TRACKS_PUBLISH_FAILED;
            }
            return mergeRes;
        }
        async execute(store, invoker) {
            const tracks = this.tracks;
            const roomId = store.roomId;
            engine.logger.info(RCLoggerTag.L_ABSTRACT_ROOM_PUBLISH_T, {
                trackIds: tracks.map(getTrackIdFromAttr)
            }, {
                logSource: engine.LogSource.RTC
            });
            /**
             * 参数检测
             */
            if (!engine.validate('tracks', tracks, () => {
                return engine.isArray(tracks) && tracks.length > 0 && tracks.every(item => item instanceof RCLocalTrack || item.track instanceof RCLocalTrack);
            }, true)) {
                logger.warn(`publish failed, tracks is invalid -> roomId: ${roomId}`);
                engine.logger.error(RCLoggerTag.L_ABSTRACT_ROOM_PUBLISH_R, {
                    status: RCLoggerStatus.FAILED,
                    code: exports.RCRTCCode.PARAMS_ERROR,
                    msg: 'params error -> tracks'
                }, {
                    logSource: engine.LogSource.RTC
                });
                return { code: exports.RCRTCCode.PARAMS_ERROR };
            }
            /**
             * 给创建的所有 peerConnection 添加事件
             */
            const pubTasks = [];
            const { plist, pushOtherRooms } = this.pubhook(tracks);
            // 在不开启多 peerConnection 情况一下 plist = [ pc ]
            for (let index = 0; index < plist.length; index++) {
                const item = plist[index];
                pubTasks.push(this.__publish(store, item, item.tracks, pushOtherRooms, invoker));
            }
            const pubResList = await Promise.all(pubTasks);
            const result = await this._mergePublishRes(pubResList, store);
            engine.logger.info(RCLoggerTag.L_ABSTRACT_ROOM_PUBLISH_R, {
                status: RCLoggerStatus.SUCCESSED,
                roomId,
                trackIds: tracks.map(getTrackIdFromAttr)
            }, {
                logSource: engine.LogSource.RTC
            });
            return result;
        }
    }

    class UnpublishCommand extends BaseCommand {
        constructor(tracks, unpubhook) {
            super();
            this.tracks = tracks;
            this.unpubhook = unpubhook;
        }
        get kind() {
            return RCCommandKind.UnPublish;
        }
        async __unpublish(store, invoker, peerCItem, tracks) {
            const { pcName, pc } = peerCItem;
            store.roomId;
            const resourceIds = tracks.map(item => item.getTrackId());
            // 过滤无效参数，避免重复有异常数据导致其他端解析失败
            // const unpublishList = resourceIds.map(this._getResourceById.bind(this)).filter(item => !!item)
            const unpublishList = resourceIds.map(store.getPublishedResourceByTrackId.bind(store)).filter(item => !!item);
            if (unpublishList.length === 0) {
                return { code: exports.RCRTCCode.SUCCESS, tracks };
            }
            // 移除 RTCPeerConnection 中添加的轨道数据
            resourceIds.forEach(id => pc.removeLocalTrackById(id));
            // 北极星上报
            store.polarisReport.sendR2(R2Action.PUBLISH, R2Status.END, resourceIds);
            // 客户端主动调用 api 发请求时，清除 ice 断线重连的定时器
            pc.clearReTryExchangeTimer();
            const subscribeList = store.useMutilPeerC ? [] : store.getSubscribedList();
            const reqBody = await createExchangeParams(subscribeList, false, pc, store);
            /**
             * 直播房间需携带 pushOtherRooms 信息
             */
            // const pushOtherRooms = this._getPushOtherRoomsParams()
            const { pushOtherRooms, headers } = this.unpubhook(tracks, pcName);
            pushOtherRooms && (reqBody.pushOtherRooms = pushOtherRooms);
            // const result = await this._exchangeHandle(reqBody, pcName)
            const result = await new ExchangeCommand(headers, reqBody).execute(store, invoker);
            if (result.code !== exports.RCRTCCode.SUCCESS) {
                logger.error(`exchange failed -> code: ${result.code}`);
                return { code: result.code, tracks };
            }
            return Object.assign({}, result, { tracks });
        }
        async _mergeUnpublishRes(store, unpubResList) {
            const crtUserId = store.context.getCurrentId();
            const roomId = store.roomId;
            // /exchange 接口发布成功的结果
            const successResList = [];
            // 发布失败的数据
            const failedTracks = [];
            // 取消发布资源数据
            const unpublishList = [];
            // 取消发布资源的 trackIds
            const unPubResourceIds = [];
            // mcu 数据
            let crtMcuPublishList = [];
            for (let i = 0; i < unpubResList.length; i++) {
                const item = unpubResList[i];
                if (item.code !== exports.RCRTCCode.SUCCESS) {
                    const { tracks } = item;
                    failedTracks.push({
                        code: item.code,
                        tracks
                    });
                    continue;
                }
                const { resultCode, message, mcuPublishList } = item.data;
                if (resultCode !== exports.RCRTCCode.SUCCESS) {
                    logger.error(`unpublish streams failed -> code: ${resultCode}, msg: ${message}`);
                }
                /**
                 * 获取取消发布资源的 trackIds、资源数据
                 */
                const resourceIds = item.tracks.map(track => track.getTrackId());
                unPubResourceIds.push(...resourceIds);
                // 过滤无效参数，避免重复有异常数据导致其他端解析失败
                // const list = resourceIds.map(this._getResourceById.bind(this)).filter(item => !!item)
                const list = resourceIds.map(store.getPublishedResourceByTrackId.bind(store)).filter(item => !!item);
                unpublishList.push(...list);
                successResList.push(item);
                // 当前直播间 mcuPublist
                const newMcuPublishList = mcuPublishList ? mcuPublishList.map(item => (Object.assign({ tag: item.msid.split('_').pop(), state: 1 }, item))) : [];
                crtMcuPublishList = newMcuPublishList;
            }
            // const publishedList = this._roomResources[crtUserId]
            const publishedList = store.getResourcesByUserId(crtUserId);
            // 取消发布后的差集
            const dList = publishedList.filter(item => !unpublishList.includes(item));
            // 通知房间内成员
            const singalCode = await store.context.setRTCTotalRes(roomId, buildPlusMessage(RCRTCMessageType.UNPUBLISH, unpublishList), buildTotalURIMessageContent(dList), RCRTCMessageType.TOTAL_CONTENT_RESOURCE, buildTotalURIMessageContent(crtMcuPublishList));
            if (singalCode !== engine.ErrorCode.SUCCESS) {
                logger.error('send unpublish notification failed:', singalCode);
                return { code: exports.RCRTCCode.SIGNAL_ERROR };
            }
            logger.debug(`unpublish success -> tracks: ${unPubResourceIds.join(',')}`);
            /**
             * 给每一个 peerConnection 设置 answer
             */
            successResList.forEach(async (item) => {
                const { sdp: answer } = item.data;
                const { tracks } = item;
                // const pc = this._peerCManager!.getPCByTrackId(tracks[0].getTrackId())
                const pc = store.peerMgr.getPCByTrackId(tracks[0].getTrackId());
                await pc.setRemoteAnswer(answer.sdp);
            });
            // 更新发布数据
            // this._roomResources[crtUserId] = dList
            store.setResourcesByUserId(crtUserId, dList);
            const res = { code: exports.RCRTCCode.SUCCESS };
            if (failedTracks.length) {
                res.failedTracks = failedTracks;
                res.code = exports.RCRTCCode.SOME_TRACKS_PUBLISH_FAILED;
            }
            return res;
        }
        async execute(store, invoker) {
            const { crtUserId, roomId } = store;
            const tracks = this.tracks;
            engine.logger.info(RCLoggerTag.L_ABSTRACT_ROOM_UNPUBLISH_T, {
                trackIds: tracks.map(getTrackIdFromAttr)
            }, {
                logSource: engine.LogSource.RTC
            });
            // 参数有效性验证
            const valid = engine.validate('tracks', tracks, () => {
                return tracks.every(track => track.getUserId() === crtUserId && track instanceof RCLocalTrack);
            }, true);
            if (!valid) {
                logger.warn(`unpublish failed, tracks is invalid -> roomId: ${roomId}, tracks: ${tracks.map(getTrackIdFromAttr)}`);
                engine.logger.error(RCLoggerTag.L_ABSTRACT_ROOM_UNPUBLISH_R, {
                    status: RCLoggerStatus.FAILED,
                    code: exports.RCRTCCode.PARAMS_ERROR,
                    msg: 'params error -> tracks'
                }, {
                    logSource: engine.LogSource.RTC
                });
                return { code: exports.RCRTCCode.PARAMS_ERROR };
            }
            const peerCList = store.peerMgr.createPeerCList(tracks);
            const pubTasks = [];
            for (let index = 0; index < peerCList.length; index++) {
                const { tracks } = peerCList[index];
                pubTasks.push(this.__unpublish(store, invoker, peerCList[index], tracks));
            }
            const unpubResList = await Promise.all(pubTasks);
            // 如果所有资源都被发布过就不再发布消息
            let unpublistRes = unpubResList.length;
            unpubResList.forEach(item => {
                if (item.code === exports.RCRTCCode.SUCCESS && !item.data) {
                    unpublistRes = unpublistRes - 1;
                }
            });
            if (unpublistRes === 0) {
                return { code: exports.RCRTCCode.SUCCESS };
            }
            const result = await this._mergeUnpublishRes(store, unpubResList);
            engine.logger.info(RCLoggerTag.L_ABSTRACT_ROOM_UNPUBLISH_R, {
                status: RCLoggerStatus.SUCCESSED,
                roomId,
                trackIds: tracks.map(getTrackIdFromAttr)
            }, {
                logSource: engine.LogSource.RTC
            });
            return result;
        }
    }

    class LocalTrackMuteCommand extends BaseCommand {
        constructor(localTrack) {
            super();
            this.localTrack = localTrack;
        }
        async execute(store, invoker) {
            const { localTrack } = this;
            const trackId = localTrack.getTrackId();
            const { crtUserId, roomId } = store;
            const enabled = !localTrack.isLocalMuted();
            // 本地资源，需同步房间状态
            const localResource = [{ resourceId: trackId, enabled }];
            // 计算更新后的全量资源数据
            // const publishedList = this._roomResources[crtUserId] || []
            const publishedList = store.getResourcesByUserId(crtUserId);
            // 增量数据
            const plusList = [];
            for (let i = 0; i < publishedList.length; i += 1) {
                const item = publishedList[i];
                const id = getTrackId(item);
                const index = localResource.findIndex(item => item.resourceId === id);
                if (index >= 0) {
                    const { enabled } = localResource[index];
                    item.state = enabled ? 1 : 0;
                    plusList.push(item);
                    break;
                }
            }
            const code = await store.context.setRTCTotalRes(roomId, buildPlusMessage(RCRTCMessageType.MODIFY, plusList), buildTotalURIMessageContent(publishedList), RCRTCMessageType.TOTAL_CONTENT_RESOURCE);
            if (code !== engine.ErrorCode.SUCCESS) {
                logger.error('notice `track.enabled` change failed -> code: ' + code);
            }
        }
    }

    class RetryExchangeCommand extends BaseCommand {
        constructor(pcName, isPub, retryHook) {
            super();
            this.pcName = pcName;
            this.isPub = isPub;
            this.retryHook = retryHook;
        }
        get priority() {
            return CommandPriority.HIGH;
        }
        async execute(store, invoker) {
            const { pcName, isPub } = this;
            const { useMutilPeerC } = store;
            const { pc } = store.peerMgr.getPCItemByPCName(pcName);
            // 区分发布、订阅的 PeerC
            const subscribeList = (isPub && useMutilPeerC) ? [] : store.getSubscribedList();
            const reqBody = await createExchangeParams(subscribeList, true, pc, store);
            /**
             * 直播房间需携带 pushOtherRooms 信息
             */
            // const pushOtherRooms = this._getPushOtherRoomsParams()
            const { pushOtherRooms, headers } = this.retryHook(pcName);
            pushOtherRooms && (reqBody.pushOtherRooms = pushOtherRooms);
            // 发送 /exchange 请求
            const resp = await new ExchangeCommand(headers, reqBody).execute(store, invoker);
            if (resp.code !== exports.RCRTCCode.SUCCESS) {
                logger.error(`reTryExchange failed: ${resp.code}, pcName: ${pcName}`);
                return;
            }
            const { sdp: answer, resultCode } = resp.data;
            if (resultCode !== exports.RCRTCCode.SUCCESS) {
                logger.error(`reTryExchange failed: ${resultCode}, pcName: ${pcName}`);
                return;
            }
            // 请求成功，清除 ice 断线重连的定时器
            pc.clearReTryExchangeTimer();
            // const resCode = await pc.setRemoteAnswer(answer.sdp)
            // if (resCode !== RCRTCCode.SUCCESS) {
            //   return { code: resCode }
            // }
            await pc.setRemoteAnswer(answer.sdp);
        }
    }

    class OnSignalReconnectedCommand extends BaseCommand {
        constructor(subhook, callbacks, livingType) {
            super();
            this.subhook = subhook;
            this.callbacks = callbacks;
            this.livingType = livingType;
        }
        /**
         * @override
         */
        get priority() {
            return CommandPriority.HIGH;
        }
        async execute(store, invoker) {
            const { livingType } = this;
            const { roomId, crtUserId, roomMode } = store;
            engine.logger.info(RCLoggerTag.L_ABSTRACT_ROOM_RECONNECTED_T, {
                livingType
            }, {
                logSource: engine.LogSource.RTC
            });
            /**
             * 检测 rtcpeerconnection 连接状态是否已变更
             * 电脑息屏后，rtcpeerconnection 状态会被直接修改为 closed 而不触发任何通知，需要主动检测并通知业务层进行业务恢复
             * SDK 无法自行恢复业务，因所需流可能无法自行重新捕获，如屏幕共享流、自定义文件流
             */
            const allPcList = store.peerMgr.getPCList();
            const somePeerClosed = allPcList.some((pc) => pc.getRTCPeerConn().connectionState === 'closed');
            if (somePeerClosed) {
                logger.warn('RTCPeerConnection closed. Please rejoin room to restore services.');
                engine.logger.error(RCLoggerTag.L_ABSTRACT_ROOM_RECONNECTED_R, {
                    status: RCLoggerStatus.FAILED,
                    code: '',
                    msg: 'RTCPeerConnection disconnected'
                }, {
                    logSource: engine.LogSource.RTC
                });
                this.callbacks.onPeerClosed();
                return;
            }
            const { code, data } = await store.context.joinRTCRoom(roomId, roomMode, livingType);
            if (code !== engine.ErrorCode.SUCCESS) {
                logger.error(`RTC __onReconnected getRTCRoomInfo failed: ${code}`);
                engine.logger.error(RCLoggerTag.L_ABSTRACT_ROOM_RECONNECTED_R, {
                    status: RCLoggerStatus.FAILED,
                    code: code,
                    msg: ''
                }, {
                    logSource: engine.LogSource.RTC
                });
                return;
            }
            logger.debug(`RTC __onReconnected getRTCRoomInfo success: ${JSON.stringify(data)}`);
            // 查找新加入人员
            const joinedUserIds = [];
            // 新发布资源
            const published = {};
            // 取消发布的资源
            const unpublished = {};
            // 状态变更的资源
            const modified = {};
            // 当前最新的房间资源数据
            const roomData = parseRoomData(data, roomId);
            const nowUserIds = Object.keys(roomData);
            // const prevUserIds = Object.keys(this._roomResources)
            const prevUserIds = store.getAllUserIds();
            for (let i = nowUserIds.length - 1; i >= 0; i -= 1) {
                const userId = nowUserIds[i];
                const index = prevUserIds.indexOf(userId);
                if (index === -1) {
                    // 新增人员
                    joinedUserIds.push(userId);
                    // 新增人员发布的资源
                    published[userId] = deepCopyResources(roomData[userId]);
                    continue;
                }
                // 房间缓存中的已发布资源
                // const prevResources = this._roomResources[userId]
                const prevResources = store.getResourcesByUserId(userId);
                // 当前资源
                const nowResources = roomData[userId];
                // 资源比对
                const { publishedList, modifiedList, unpublishedList } = diffPublishResources(prevResources, nowResources, true);
                published[userId] = deepCopyResources(publishedList);
                unpublished[userId] = deepCopyResources(unpublishedList);
                modified[userId] = deepCopyResources(modifiedList);
                // 从之前的人员列表中删除已存在人员，剩余人员为已退出人员
                prevUserIds.splice(index, 1);
            }
            // 更新缓存资源
            prevUserIds.length && prevUserIds.forEach(userId => {
                store.removeResourcesByUserId(userId);
            });
            // Object.assign(this._roomResources, roomData)
            store.assignRoomData(roomData);
            // 通知人员退出
            // prevUserIds.length && this._callAppListener('onUserLeave', prevUserIds)
            prevUserIds.length && this.callbacks.onUserLeave(prevUserIds);
            // 通知人员加入
            // joinedUserIds.length && this._callAppListener('onUserJoin', joinedUserIds)
            joinedUserIds.length && this.callbacks.onUserJoin(joinedUserIds);
            /**
              * 资源取消发布
              * im 重连加入房间后，服务返回的自己资源为空时，上抛资源被取消发布需过滤掉本端资源
              */
            for (const userId in unpublished) {
                if (userId === crtUserId) {
                    continue;
                }
                const resources = unpublished[userId];
                if (resources.length) {
                    const tracks = resources.map(item => {
                        // return this._remoteTracks[getTrackId(item)]
                        return store.getRemoteTrack(getTrackId(item));
                    });
                    // await this._onUserUnpublish(tracks)
                    await new OnRemoteUserUnpubCommand(this.subhook, tracks, this.callbacks.onTrackUnpublish).execute(store, invoker);
                }
            }
            // 新发布资源
            Object.keys(published).forEach(userId => {
                const resources = published[userId];
                if (resources.length === 0) {
                    return;
                }
                const tracks = resources.map(item => {
                    const trackId = getTrackId(item);
                    const { userId, tag, mediaType } = parseTrackId(trackId);
                    const track = mediaType === exports.RCMediaType.AUDIO_ONLY ? new RCRemoteAudioTrack(tag, userId) : new RCRemoteVideoTrack(tag, userId);
                    store.addRemoteTrack(track);
                    track.__innerSetRemoteMuted(item.state === 0);
                    return track;
                });
                this.callbacks.onTrackPublish(tracks);
            });
            // 资源状态变更
            Object.keys(modified).forEach(userId => {
                const resources = modified[userId];
                // 音频与视频区分
                resources.forEach(item => {
                    const trackId = getTrackId(item);
                    // const rTrack = this._remoteTracks[trackId]
                    const rTrack = store.getRemoteTrack(trackId);
                    rTrack.__innerSetRemoteMuted(item.state === 0);
                    rTrack.isAudioTrack() ? this.callbacks.onAudioMuteChange(rTrack) : this.callbacks.onVideoMuteChange(rTrack);
                });
            });
            if (store.roomMode === RTCMode.LIVE) {
                this.executeInLivingRoom(store, data);
            }
            engine.logger.info(RCLoggerTag.L_ABSTRACT_ROOM_RECONNECTED_R, {
                status: RCLoggerStatus.SUCCESSED,
                roomData: data
            }, {
                logSource: engine.LogSource.RTC
            });
            return { data };
        }
        /**
         * 主播端断线重连后，需更新内存中的 CDN 数据
         * 判断房间内 CDN 状态是否和内存数据一致，不一致时需通知到客户端
         */
        executeInLivingRoom(store, data) {
            var _a, _b;
            engine.logger.error(RCLoggerTag.L_LIVING_ROOM_RECONNECTED_T, {
                roomData: data
            }, {
                logSource: engine.LogSource.RTC
            });
            if (!data) {
                engine.logger.info(RCLoggerTag.L_LIVING_ROOM_RECONNECTED_R, {
                    status: RCLoggerStatus.FAILED,
                    code: '',
                    msg: 'room not fond'
                }, {
                    logSource: engine.LogSource.RTC
                });
                return;
            }
            const roomInfo = data.roomInfo;
            const CDNUris = (_a = roomInfo.filter((item) => { return item.key === 'cdn_uris'; })[0]) === null || _a === void 0 ? void 0 : _a.value;
            if (!CDNUris) {
                engine.logger.error(RCLoggerTag.L_LIVING_ROOM_RECONNECTED_R, {
                    status: RCLoggerStatus.FAILED,
                    code: '',
                    msg: 'cdn_uris not found'
                }, {
                    logSource: engine.LogSource.RTC
                });
                return;
            }
            const parseCDNUris = JSON.parse(CDNUris);
            const changed = ((_b = store.getCDNUris()) === null || _b === void 0 ? void 0 : _b.enableInnerCDN) !== parseCDNUris.enableInnerCDN;
            store.setCDNUris(parseCDNUris);
            engine.logger.info(RCLoggerTag.L_LIVING_ROOM_RECONNECTED_R, {
                status: RCLoggerStatus.SUCCESSED,
                roomData: data
            }, {
                logSource: engine.LogSource.RTC
            });
            if (changed) {
                this.callbacks.onCDNEnableChange(parseCDNUris.enableInnerCDN);
            }
        }
    }

    /**
     * 更新订阅关系，为强制更新订阅关系，传入的 Tracks 都会被订阅
     */
    class AsyncUpdateSubscribeListCommand extends AsyncCommand {
        constructor(tracks, subhook, callbacks, state = RCLinkedListPoint.NORMAL) {
            super(state);
            this.tracks = tracks;
            this.subhook = subhook;
            this.callbacks = callbacks;
        }
        async execute(store, invoker) {
            var _a, _b, _c;
            const { tracks } = this;
            const roomId = store.roomId;
            logger.info(`unsubscribe -> roomId: ${roomId}, tracks: ${tracks.map(getTrackIdFromAttr)}`);
            if (this.state === RCLinkedListPoint.NORMAL) {
                // 获取原订阅列表
                const originTracks = store.getSubscribedList().slice();
                const { code: updateSuscribeCode, failedList } = await new UpdateSubscribeListCommand(tracks, this.subhook).execute(store, invoker);
                // 获取新的订阅列表
                const subscribedTracks = store.getSubscribedList().slice();
                // 计算订阅列表 Diff
                const { subscribe, unsubscribe } = this.pickoutSubscribed(subscribedTracks, originTracks);
                (_a = this.callbacks) === null || _a === void 0 ? void 0 : _a.onTaskCompleted({ code: updateSuscribeCode, subscribe, unsubscribe, failedList });
                return { code: updateSuscribeCode, failedList };
            }
            if (this.state === RCLinkedListPoint.TAIL) {
                // 自执行一次，计算出最终的 collectSubscribeList
                const { code: unsubscribeCode } = await new AsyncUpdateSubscribeListCommand(this.tracks, this.subhook, this.callbacks, RCLinkedListPoint.MIDDLE).execute(store, invoker);
                // 拥塞队列处理完成的数据
                if (unsubscribeCode === exports.RCRTCCode.SUCCESS) {
                    // 浅Copy 并对 store.getCollectSubscribeList 数据进行清空
                    const tracks = store.getCollectSubscribeList().slice(0);
                    const originTracks = store.getSubscribedList().slice();
                    // 自执行一次，计算出最终的 collectSubscribeList
                    const { code: updateSuscribeCode, failedList } = await new UpdateSubscribeListCommand(tracks, this.subhook).execute(store, invoker);
                    if (updateSuscribeCode !== exports.RCRTCCode.SUCCESS) {
                        (_b = this.callbacks) === null || _b === void 0 ? void 0 : _b.onTaskCompleted({ code: updateSuscribeCode, subscribe: [], unsubscribe: [], failedList });
                        return { code: updateSuscribeCode, failedList };
                    }
                    const subscribedTracks = store.getSubscribedList().slice(0);
                    const { subscribe, unsubscribe } = this.pickoutSubscribed(subscribedTracks, originTracks);
                    (_c = this.callbacks) === null || _c === void 0 ? void 0 : _c.onTaskCompleted({ code: updateSuscribeCode, subscribe, unsubscribe, failedList });
                    return { code: updateSuscribeCode, failedList };
                }
                return { code: unsubscribeCode };
            }
            AsyncCommand.AsyncUpdateSubscribeTasks.splice(AsyncCommand.AsyncUpdateSubscribeTasks.length, 0, ...this.tracks);
            // 处理队列中频繁调用，时带来的频繁订阅的逻辑 只处理一部分
            return new Promise(resolve => {
                const formateTrack = this.formateTrack(tracks);
                // 将需要订阅的数据 设置到订阅列表
                store.resetCollectSubscribeList(formateTrack);
                resolve({ code: exports.RCRTCCode.SUCCESS });
            });
        }
    }

    class AsyncSubscribeCommand extends AsyncCommand {
        constructor(tracks, subhook, callbacks, state = RCLinkedListPoint.NORMAL) {
            super(state);
            this.tracks = tracks;
            this.subhook = subhook;
            this.callbacks = callbacks;
        }
        async execute(store, invoker) {
            var _a;
            const { tracks } = this;
            const roomId = store.roomId;
            // 队列中只有一个发布或者取消发布任务，没有进行操作合并时的处理
            if (this.state === RCLinkedListPoint.NORMAL) {
                // 获取原订阅列表
                const originTracks = store.getSubscribedList().slice();
                const { code: subscribeCode, failedList } = await new SubscribeCommand(tracks, this.subhook).execute(store, invoker);
                // 获取新的订阅列表
                const subscribedTracks = store.getSubscribedList().slice();
                // 计算订阅列表 Diff
                const { subscribe, unsubscribe } = this.pickoutSubscribed(subscribedTracks, originTracks);
                (_a = this.callbacks) === null || _a === void 0 ? void 0 : _a.onTaskCompleted({ code: subscribeCode, subscribe, unsubscribe, failedList });
                return { code: subscribeCode, failedList };
            }
            engine.logger.info(RCLoggerTag.L_ABSTRACT_ROOM_SUBSCRIBE_T, {
                trackIds: tracks.map(getTrackIdFromAttr)
            }, {
                logSource: engine.LogSource.RTC
            });
            if (!engine.validate('tracks', tracks, () => {
                return engine.isArray(tracks) && tracks.length > 0 && tracks.every(item => {
                    return item instanceof RCRemoteTrack || item.track instanceof RCRemoteTrack;
                });
            }, true)) {
                logger.warn(`subscribe failed, tracks is invalid -> roomId: ${roomId}`);
                engine.logger.error(RCLoggerTag.L_ABSTRACT_ROOM_SUBSCRIBE_R, {
                    status: RCLoggerStatus.FAILED,
                    code: exports.RCRTCCode.PARAMS_ERROR,
                    msg: 'params error -> tracks'
                }, {
                    logSource: engine.LogSource.RTC
                });
                return { code: exports.RCRTCCode.PARAMS_ERROR };
            }
            logger.info(`subscribe -> roomId: ${roomId}, tracks: ${tracks.map(getTrackIdFromAttr)}`);
            const crtSubList = this.getSubscribedList(store).map(item => (Object.assign({}, item)));
            const formateTrack = tracks.map(item => {
                return item instanceof RCRemoteTrack ? { track: item } : item;
            });
            const R2TrackIds = [];
            // 查找所发布的 大流 是否存在及 小流 是否有变动
            formateTrack.forEach(item => {
                const trackId = item.track.getTrackId();
                // 收集ID上报日志
                R2TrackIds.push(trackId);
                const crt = crtSubList.find(tmp => tmp.track.getTrackId() === trackId);
                if (crt) {
                    if (crt.subTiny === item.subTiny) {
                        return;
                    }
                    crt.subTiny = item.subTiny;
                }
                else {
                    crtSubList.push(item);
                }
            });
            // 北极星上报
            store.polarisReport.sendR2(R2Action.SUBSCRIBE, R2Status.BEGIN, R2TrackIds);
            engine.logger.info(RCLoggerTag.L_ABSTRACT_ROOM_SUBSCRIBE_R, {
                trackIds: tracks.map(getTrackIdFromAttr),
                roomId
            }, {
                logSource: engine.LogSource.RTC
            });
            if (this.state === RCLinkedListPoint.TAIL) {
                const { code: subscribeCode } = await new AsyncSubscribeCommand(this.tracks, this.subhook, this.callbacks, RCLinkedListPoint.MIDDLE).execute(store, invoker);
                if (subscribeCode === exports.RCRTCCode.SUCCESS) {
                    // 浅Copy 并对 store.getCollectSubscribeList 数据进行清空
                    const tracks = store.getCollectSubscribeList().slice(0);
                    return new AsyncUpdateSubscribeListCommand(tracks, this.subhook, this.callbacks).execute(store, invoker);
                }
                return { code: subscribeCode };
            }
            AsyncCommand.AsyncSubscribeTasks.splice(AsyncCommand.AsyncSubscribeTasks.length, 0, ...this.tracks);
            // 处理队列中频繁调用，时带来的频繁订阅的逻辑 只处理一部分
            return new Promise(resolve => {
                // 将数据写入到订阅列表中，最后一次变更（订阅|取消订阅）会再次处理它
                store.resetCollectSubscribeList(crtSubList);
                resolve({ code: exports.RCRTCCode.SUCCESS });
            });
        }
        /**
         * 如果当前节点的状态为 MIDDLE，则返回 store 的订阅属性列表。否则，返回存储的订阅属性列表
         * @param {Store} store
         * @returns ISubscribeAttr 对象的数组。
         */
        getSubscribedList(store) {
            if (this.state === RCLinkedListPoint.MIDDLE) {
                return store.getCollectSubscribeList();
            }
            return store.getSubscribedList();
        }
    }

    class AsyncUnsubscribeCommand extends AsyncCommand {
        constructor(tracks, subhook, callbacks, state = RCLinkedListPoint.NORMAL) {
            super(state);
            this.tracks = tracks;
            this.subhook = subhook;
            this.callbacks = callbacks;
        }
        async execute(store, invoker) {
            var _a;
            const tracks = this.tracks;
            const roomId = store.roomId;
            // 队列中只有一个发布或者取消发布任务，没有进行操作合并时的处理
            if (this.state === RCLinkedListPoint.NORMAL) {
                // 获取原订阅列表
                const originTracks = store.getSubscribedList().slice();
                const { code: unsubscribeCode, failedList } = await new UnsubscribeCommand(tracks, this.subhook).execute(store, invoker);
                // 获取新的订阅列表
                const subscribedTracks = store.getSubscribedList().slice();
                // 计算出 Diff
                const { subscribe, unsubscribe } = this.pickoutSubscribed(subscribedTracks, originTracks);
                (_a = this.callbacks) === null || _a === void 0 ? void 0 : _a.onTaskCompleted({ code: unsubscribeCode, subscribe, unsubscribe, failedList });
                return { code: unsubscribeCode, failedList };
            }
            engine.logger.info(RCLoggerTag.L_ABSTRACT_ROOM_UNSUBSCRIBE_T, {
                trackIds: tracks.map(getTrackIdFromAttr)
            }, {
                logSource: engine.LogSource.RTC
            });
            if (!engine.validate('tracks', tracks, () => {
                return engine.isArray(tracks) && tracks.length > 0 && tracks.every(item => item instanceof RCRemoteTrack);
            }, true)) {
                logger.warn(`unsubscribe failed, tracks is invalid -> roomId: ${roomId}`);
                engine.logger.warn(RCLoggerTag.L_ABSTRACT_ROOM_UNSUBSCRIBE_R, {
                    status: RCLoggerStatus.FAILED,
                    code: exports.RCRTCCode.PARAMS_ERROR,
                    msg: 'params error -> tracks'
                }, {
                    logSource: engine.LogSource.RTC
                });
                return { code: exports.RCRTCCode.PARAMS_ERROR };
            }
            logger.info(`unsubscribe -> roomId: ${roomId}, tracks: ${tracks.map(getTrackIdFromAttr)}`);
            // 计算剩余订阅列表, 如果资源在取消订阅列表内则排除它
            const crtSubList = this.getSubscribedList(store).map(item => (Object.assign({}, item))).filter(item => !tracks.includes(item.track));
            // 北极星上报
            store.polarisReport.sendR2(R2Action.SUBSCRIBE, R2Status.END, tracks.map(item => item.getTrackId()));
            engine.logger.info(RCLoggerTag.L_ABSTRACT_ROOM_UNSUBSCRIBE_R, {
                trackIds: tracks.map(getTrackIdFromAttr),
                roomId
            }, {
                logSource: engine.LogSource.RTC
            });
            if (this.state === RCLinkedListPoint.TAIL) {
                // 自执行一次，计算出最终的 collectSubscribeList
                const { code: unsubscribeCode } = await new AsyncUnsubscribeCommand(this.tracks, this.subhook, this.callbacks, RCLinkedListPoint.MIDDLE).execute(store, invoker);
                // 拥塞队列处理完成的数据
                if (unsubscribeCode === exports.RCRTCCode.SUCCESS) {
                    // 浅Copy 并对 store.getCollectSubscribeList 数据进行清空
                    const tracks = store.getCollectSubscribeList().slice(0).map(item => item.track);
                    // 自执行一次，计算出最终的 collectSubscribeList
                    return new AsyncUpdateSubscribeListCommand(tracks, this.subhook, this.callbacks).execute(store, invoker);
                }
                return { code: unsubscribeCode };
            }
            AsyncCommand.AsyncUnsubscribeTasks.splice(AsyncCommand.AsyncUnsubscribeTasks.length, 0, ...this.tracks);
            // 处理队列中频繁调用，时带来的频繁订阅的逻辑 只处理一部分
            return new Promise(resolve => {
                // 将需要订阅的数据 设置到订阅列表
                store.resetCollectSubscribeList(crtSubList);
                resolve({ code: exports.RCRTCCode.SUCCESS });
            });
        }
        /**
         * 如果当前节点的状态为 MIDDLE，则返回 store 的订阅属性列表。否则，返回存储的订阅属性列表
         * @param {Store} store
         * @returns ISubscribeAttr 对象的数组。
         */
        getSubscribedList(store) {
            if (this.state === RCLinkedListPoint.MIDDLE) {
                return store.getCollectSubscribeList();
            }
            return store.getSubscribedList();
        }
    }

    const RCAbstractRoomEvent = {
        LEAVE: 'evt-leave'
    };
    /**
     * 房间抽象基类
     */
    class RCAbstractRoom extends engine.EventEmitter {
        constructor(_context, _runtime, _roomId, _roomMode, _service, _initOptions, isUpgrade, isMainRoom, 
        /**
         * 是否使用多 peerConnection
         */
        _useMutilPeerC, _clientSessionId = getUUID()) {
            super();
            this._context = _context;
            this._runtime = _runtime;
            this._roomId = _roomId;
            this._service = _service;
            this._initOptions = _initOptions;
            this._useMutilPeerC = _useMutilPeerC;
            this._clientSessionId = _clientSessionId;
            this._appListener = null;
            this._reportListener = null;
            /**
             * 存储连麦监听事件
             */
            this._onRecvPKMsg = null;
            this._polarisReport = new PolarisReporter(this._context, this._runtime, this._roomId, this);
            this._peerCManager = new RCRTCPeerCManager(this._useMutilPeerC, this._roomId, this._reTryExchange.bind(this), this._context.getCurrentId(), this._polarisReport);
            this._invoker = new Invoker(this._context, this._service, this._peerCManager, _roomId, this._context.getCurrentId(), _roomMode, this._polarisReport, isUpgrade, isMainRoom);
            this._store = this._invoker.store;
        }
        async __innerInit(mode, joinType, livingType, innerUserDatas, outerUserDatas) {
            const { code, data } = await this._invoker.push(new JoinRoomCommand(this._roomId, mode, joinType, livingType, innerUserDatas, outerUserDatas));
            if (code !== exports.RCRTCCode.SUCCESS) {
                return { code };
            }
            // 服务下发的 rtcping 超时时间，单位为秒
            this._initWithRoomData(data.offlineKickTime);
            return { code, data };
        }
        _initWithRoomData(offlineKickTime) {
            var _a;
            // 开始心跳，心跳失败时主动退出房间
            this._pinger = new Pinger(this._store.roomId, this._store.roomMode, this._context, this._initOptions.pingGap, offlineKickTime * 1000);
            this._pinger.onFailed = this._kickoff.bind(this);
            this._pinger.onPingResult = this._handlePingResult.bind(this);
            this._pinger.start();
            (_a = this._polarisReport) === null || _a === void 0 ? void 0 : _a.sendR1();
        }
        _handlePingResult(result) {
            this._callAppListener('onPing', result);
        }
        /**
         * 设置房间上行资源的总码率配置
         * @deprecated use RCLocalTrack.setBitrate instead of setBitrate
         * @description
         * * 自 v5.1.0 版本开始，推荐使用 `RCLocalTrack.setBitrate` 对不同流分别指定码率。
         * * 该方法仅在 SDP `plan-b` 协议下（Chrome 92 与 Safari 11 之前的版本）有效。
         * @param max 音视频发送码率上限，不可小于 200 且不可小于 `min`
         * @param min 音视频发送码率下限，默认值为 1，且不可小于 1，不可大于 `max`
         * @param start 起始码率，默认为码率上限的 70%
         */
        setBitrate(max, min, start) {
            // 多 peerConnection 时不可用，引导客户使用 `RCLocalTrack.setBitrate`
            if (this._useMutilPeerC) {
                logger.error('`RCAbstractRoom.setBitrate` is disabled, use `RCLocalTrack.setBitrate` instead.');
                return;
            }
            logger.warn('`RCAbstractRoom.setBitrate` will be deprecated, use `RCLocalTrack.setBitrate` instead.');
            engine.assert('max', max, (value) => {
                return engine.isNumber(value) && value > Math.max(min || 1, 200);
            }, true);
            engine.assert('min', min, (value) => {
                return engine.isNumber(value) && value >= 1 && (engine.isNumber(max) ? value < max : true);
            }, true);
            engine.assert('start', start, (value) => {
                return engine.isNumber(value) && value > min && value <= max;
            });
            const pcList = this._peerCManager.getPCList();
            pcList.forEach((pc) => {
                pc.setBitrate(max, min, start);
            });
        }
        _onTrackReady(evt) {
            const msid = evt.streams[0].id;
            const track = evt.receiver.track;
            const trackId = [msid, track.kind === 'audio' ? exports.RCMediaType.AUDIO_ONLY : exports.RCMediaType.VIDEO_ONLY].join('_');
            const rTrack = this._store.getRemoteTrack(trackId);
            if (!rTrack) {
                logger.warn(`cannot found remote track ${track.id}`);
                return;
            }
            rTrack.__innerSetMediaStreamTrack(track);
            this._callAppListener('onTrackReady', rTrack);
        }
        _callAppListener(eventType, ...attrs) {
            var _a;
            eventType !== 'onPing' && engine.logger.info(RCLoggerTag.L_ABSTRACT_ROOM_CALL_APP_LISTENER_O, {
                status: RCLoggerStatus.SUCCESSED,
                eventType,
                attrs
            }, {
                logSource: engine.LogSource.RTC
            });
            eventType !== 'onPing' && logger.info(`${eventType} callback ->`, ...attrs);
            const handle = (_a = this._appListener) === null || _a === void 0 ? void 0 : _a[eventType];
            if (!handle) {
                return;
            }
            try {
                handle(...attrs);
            }
            catch (error) {
                logger.error(error);
            }
        }
        _onTrackUnpublish(tracks) {
            this._callAppListener('onTrackUnpublish', tracks);
        }
        __parseInnerMessage(message) {
            const { targetId: roomId, conversationType } = message;
            // 过滤非 RTC 消息
            if (conversationType !== engine.ConversationType.RTC_ROOM) {
                return false;
            }
            // 为 RTC 消息，但不属于当前房间的不处理
            if (roomId !== this._roomId) {
                return true;
            }
            logger.info(`recv inner msg -> message: ${JSON.stringify(message)} | roomid: ${this._roomId}`);
            const content = message.content;
            switch (message.messageType) {
                case RCRTCMessageType.KICK:
                    this._kickoff(true, content);
                    break;
                case RCRTCMessageType.STATE:
                    this._stateHandle(content);
                    break;
                case RCRTCMessageType.MODIFY:
                case RCRTCMessageType.PUBLISH:
                case RCRTCMessageType.UNPUBLISH:
                case RCRTCMessageType.TOTAL_CONTENT_RESOURCE:
                    this._resourceHandle(content, message.messageType, message.senderUserId);
                    break;
                case RCRTCMessageType.ROOM_NOTIFY:
                    this._callAppListener('onRoomAttributeChange', message.messageType, message.content);
                    break;
                case RCRTCMessageType.USER_NOTIFY:
                    logger.warn(`TODO: ${RCRTCMessageType.USER_NOTIFY}`);
                    break;
                case RCRTCMessageType.PK_INVITE:
                case RCRTCMessageType.PK_CANCEL_INVITE:
                case RCRTCMessageType.PK_INVITE_TIMEOUT:
                case RCRTCMessageType.PK_INVITE_ANSWER:
                case RCRTCMessageType.PK_END:
                    this._onRecvPKMsg && this._onRecvPKMsg(message);
                    break;
                case RCRTCMessageType.OTHER_ROOM_OFFLINE:
                    // TODO 处理加入的 PK 房间断线情况
                    break;
                default:
                    this._callAppListener('onMessageReceive', message.messageType, content, message.senderUserId, message.messageUId);
                    break;
            }
            return true;
        }
        /**
         * 被踢出房间通知
         * @param byServer
         * * 当值为 false 时，说明本端 rtcPing 超时
         * * 当值为 true 时，说明本端收到被踢出房间通知
         */
        async _kickoff(byServer, content) {
            if (this._invoker.isDestroyed()) {
                return;
            }
            logger.warn(`onKickOff -> byServer: ${byServer}`);
            this.emit(RCAbstractRoomEvent.LEAVE);
            this._leaveHandle(!byServer);
            // 扩展字段，备注用户为什么被踢出房间
            let kickExtra;
            let kickType;
            if (byServer) {
                ((content === null || content === void 0 ? void 0 : content.users) || []).forEach(item => {
                    if (item.userId === this._context.getCurrentId()) {
                        kickType = item.type;
                        kickExtra = item.kickExtra;
                    }
                });
            }
            this._callAppListener('onKickOff', byServer, kickType, kickExtra);
        }
        _rtcpeerClosed() {
            this.emit(RCAbstractRoomEvent.LEAVE);
            this._leaveHandle(true);
            this._callAppListener('onRTCPeerConnectionCloseByException');
        }
        /**
         * 处理资源变更事件
         * @param content
         * @param messageType 消息类型
         * @param userId 消息发送者
         */
        async _resourceHandle(content, messageType, userId) {
            const { uris, ignore } = content;
            // 内置 CDN 为自动时，先收到 cdn_uris，无 uris 时，不用再对比资源
            if (ignore || !uris) {
                return;
            }
            this._invoker.push(new ParseRemoteResCommand(content, messageType, userId, this._subhook.bind(this), {
                onAudioMute: this._onAudioMuteChange.bind(this),
                onVideoMute: this._onVideoMuteChange.bind(this),
                onTrackPublish: this._onTrackPublish.bind(this),
                onTrackUnublish: this._onTrackUnpublish.bind(this),
                onCDNEnableChange: this._callAppListener.bind(this, 'onCDNEnableChange')
            }));
        }
        _onTrackPublish(tracks) {
            this._callAppListener('onTrackPublish', tracks);
        }
        /**
         * 处理 `RCRTCMessageType.STATE` 消息
         * @param content
         */
        async _stateHandle(content) {
            var _a;
            const { left, joined, upgrade, downgrade } = await this._invoker.push(new ParseUserStateCommand(content, this._subhook.bind(this)));
            /**
             * 通知业务层
             * 有 onSwitchRole 监听时，按 switchRole 分“角色切换、加入房间、退出房间”抛出
             */
            if ((_a = this._appListener) === null || _a === void 0 ? void 0 : _a.onSwitchRole) {
                upgrade.length && upgrade.forEach(userId => this._callAppListener('onSwitchRole', userId, exports.RCRTCLiveRole.ANCHOR));
                downgrade.length && downgrade.forEach(userId => this._callAppListener('onSwitchRole', userId, exports.RCRTCLiveRole.AUDIENCE));
                joined.length && this._callAppListener('onUserJoin', joined);
                left.length && this._callAppListener('onUserLeave', left);
                return;
            }
            const allJoined = [...joined, ...upgrade];
            const allLeft = [...left, ...downgrade];
            /**
             * 通知业务层
             * 无 onSwitchRole 监听时，统一按“加入房间、退出房间”抛出
             */
            allJoined.length && this._callAppListener('onUserJoin', allJoined);
            allLeft.length && this._callAppListener('onUserLeave', allLeft);
        }
        /**
         * 获取房间 Id
         */
        getRoomId() {
            return this._roomId;
        }
        /**
         * 获取当前 userId
         */
        getCrtUserId() {
            return this._context.getCurrentId();
        }
        /**
         * 获取 _pc 实例
         */
        __getPC() {
            return this._store.peerMgr.getPCList();
        }
        /**
         * 获取远程用户列表，不包含当前用户
         */
        getRemoteUserIds() {
            return this._store.getRemoteUserIds();
        }
        /**
         * 获取所有房间已发布的远端资源列表
         * @returns
         */
        getRemoteTracks() {
            const tracks = [];
            this.getRemoteUserIds().forEach(id => {
                tracks.push(...this.getRemoteTracksByUserId(id));
            });
            return tracks;
        }
        /**
         * 获取远端用户的资源列表
         * @param userId
         * @returns
         */
        getRemoteTracksByUserId(userId) {
            return this._store.getRemoteTracksByUserId(userId);
        }
        /**
         * 获取房间当前会话 Id，当房间内已无成员时房间会回收，重新加入时 sessionId 将更新
         */
        getSessionId() {
            return this._store.getSessionId();
        }
        /**
         * 向房间内发消息
         * @param name 消息名称
         * @param content 消息内容
         */
        async sendMessage(name, content) {
            engine.logger.info(RCLoggerTag.L_ABSTRACT_ROOM_SEND_MESSAGE_T, {
                name,
                content
            }, {
                logSource: engine.LogSource.RTC
            });
            // 该接口只能用于发状态消息
            const { code } = await this._context.sendMessage(engine.ConversationType.RTC_ROOM, this._roomId, {
                messageType: name,
                content,
                isStatusMessage: true
            });
            if (code !== engine.ErrorCode.SUCCESS) {
                logger.error(`send message failed -> code: ${code}`);
                engine.logger.error(RCLoggerTag.L_ABSTRACT_ROOM_SEND_MESSAGE_R, {
                    status: RCLoggerStatus.FAILED,
                    code,
                    msg: ''
                }, {
                    logSource: engine.LogSource.RTC
                });
                return { code: exports.RCRTCCode.SIGNAL_ERROR };
            }
            engine.logger.info(RCLoggerTag.L_ABSTRACT_ROOM_SEND_MESSAGE_R, {
                status: RCLoggerStatus.SUCCESSED,
                name,
                content
            }, {
                logSource: engine.LogSource.RTC
            });
            return { code: exports.RCRTCCode.SUCCESS };
        }
        /**
         * 设置房间属性
         * @param key 属性名
         * @param value 属性值
         * @param message 是否在设置属性的时候携带消息内容，传空则不往房间中发送消息
         * @param isInner RTC 业务内部使用参数，用户忽略
         */
        async setRoomAttribute(key, value, message, isInner = false) {
            engine.logger.info(RCLoggerTag.L_ABSTRACT_ROOM_SET_ROOM_ATTRIBUTE_T, {
                roomId: this._roomId,
                key,
                value,
                message,
                isInner
            }, {
                logSource: engine.LogSource.RTC
            });
            const code = await this._context.setRTCData(this._roomId, key, value, isInner, RTCApiType.ROOM, message);
            if (code !== engine.ErrorCode.SUCCESS) {
                logger.error(`SetRoomAttributeValue Failed: ${code}`);
                engine.logger.error(RCLoggerTag.L_ABSTRACT_ROOM_SET_ROOM_ATTRIBUTE_R, {
                    status: RCLoggerStatus.FAILED,
                    code,
                    msg: ''
                }, {
                    logSource: engine.LogSource.RTC
                });
                return { code: exports.RCRTCCode.SIGNAL_ERROR };
            }
            engine.logger.info(RCLoggerTag.L_ABSTRACT_ROOM_SET_ROOM_ATTRIBUTE_R, {
                status: RCLoggerStatus.SUCCESSED,
                roomId: this._roomId,
                key,
                value,
                message,
                isInner
            }, {
                logSource: engine.LogSource.RTC
            });
            return { code: exports.RCRTCCode.SUCCESS };
        }
        /**
         * 删除房间属性
         * @param keys 待删除的属性名数组
         * @param message 是否在删除属性的时候携带消息内容，传空则不往房间中发送消息
         * @param isInner RTC 业务内部使用参数，用户忽略
         */
        async deleteRoomAttributes(keys, message, isInner = false) {
            engine.logger.info(RCLoggerTag.L_ABSTRACT_ROOM_DELETE_ROOM_ATTRIBUTE_T, {
                roomId: this._roomId,
                keys,
                message,
                isInner
            }, {
                logSource: engine.LogSource.RTC
            });
            const code = await this._context.removeRTCData(this._roomId, keys, isInner, RTCApiType.ROOM, message);
            if (code !== engine.ErrorCode.SUCCESS) {
                logger.error(`DeleteRoomAttribute Failed: ${code}`);
                engine.logger.error(RCLoggerTag.L_ABSTRACT_ROOM_DELETE_ROOM_ATTRIBUTE_R, {
                    status: RCLoggerStatus.FAILED,
                    code,
                    msg: ''
                }, {
                    logSource: engine.LogSource.RTC
                });
                return { code: exports.RCRTCCode.SIGNAL_ERROR };
            }
            engine.logger.info(RCLoggerTag.L_ABSTRACT_ROOM_DELETE_ROOM_ATTRIBUTE_R, {
                status: RCLoggerStatus.SUCCESSED,
                roomId: this._roomId,
                keys,
                message,
                isInner
            }, {
                logSource: engine.LogSource.RTC
            });
            return { code: exports.RCRTCCode.SUCCESS };
        }
        /**
         * 获取房间属性
         * @param keys 要查询的属性名数组，当数组长度为空时，取所有已设置的 kv 值
         * @param isInner RTC 业务内部使用参数，用户忽略
         */
        async getRoomAttributes(keys = [], isInner = false) {
            const { code, data } = await this._context.getRTCData(this._roomId, keys, isInner, RTCApiType.ROOM);
            if (code !== engine.ErrorCode.SUCCESS) {
                logger.error(`GetRoomAttributes Failed: ${code}`);
                return { code: exports.RCRTCCode.SIGNAL_ERROR };
            }
            return { code: exports.RCRTCCode.SUCCESS, data };
        }
        /**
         * 设置当前用户属性（暂不开放）
         * @param key 属性名
         * @param value 属性值
         * @param message 是否在设置属性的时候携带消息内容，传空则不往房间中发送消息
         */
        _setUserAttributeValue(key, value, message) {
            return this._context.setRTCData(this._roomId, key, value, false, RTCApiType.PERSON, message);
        }
        /**
         * 删除当前用户属性（暂不开放）
         * @param keys 待删除的属性名数组
         * @param message 是否在删除属性的时候携带消息内容，传空则不往房间中发送消息
         */
        _deleteUserAttributes(keys, message) {
            return this._context.removeRTCData(this._roomId, keys, false, RTCApiType.PERSON, message);
        }
        /**
         * 获取当前用户属性（暂不开放）
         * @param keys 要查询的属性名数组
         */
        _getUserAttributes(keys) {
            return this._context.getRTCData(this._roomId, keys, false, RTCApiType.PERSON);
        }
        /**
         * 查询房间是否已销毁
         */
        isDestroyed() {
            return this._invoker.isDestroyed();
        }
        /**
         * 退出并销毁当前房间实例，退出后该房间的所有方法将不可用
         */
        __destroy(quitRoom) {
            return this._leaveHandle(quitRoom);
        }
        /**
         * 退出房间之前禁用所有远端资源，避免退出动作耗时过长，
         * 导致在未完全退出的过程中仍能听到房间内的声音问题
         */
        _muteRemoteTracksBeforeQuit() {
            const remoteTracks = Object.values(this._store.getRemoteTracks());
            if (!remoteTracks.length) {
                return;
            }
            remoteTracks.forEach((track) => track.mute());
        }
        async _leaveHandle(quitRoom) {
            var _a;
            if (this._invoker.isDestroyed()) {
                return;
            }
            // 清空待执行队列，直接通知房间已销毁
            this._invoker.destroy();
            // 静默所有远端音视频
            this._muteRemoteTracksBeforeQuit();
            this._muteRemoteTracksBeforeQuit();
            // 清除音量上报定时器
            (_a = this._audioLevelReport) === null || _a === void 0 ? void 0 : _a.clearAudioLevelReportTimer();
            if (quitRoom) {
                // 退出 signal 房间
                await this._context.quitRTCRoom(this._roomId);
            }
            // 退出主房间时，退出所有 PK 房间
            this._store.isMainRoom && await this._quitAllPKRoom();
            // 停止 rtcPing 计时
            this._pinger.stop();
            // 中断所有 peerConnection 与 MediaServer 的 UDP 连接
            const exitTasks = [];
            const pcNameList = Object.keys(this._peerCManager.getMutilPeerCData());
            pcNameList.forEach((pcName) => {
                exitTasks.push(this._service.exit(this._getRTCReqestHeaders(pcName)));
            });
            await Promise.all(exitTasks);
            /**
             * 释放 PCManager 上的资源
             */
            this._releasePCManager();
            // 销毁 polarisReport 实例
            this._polarisReport = null;
        }
        /**
         * 释放 PCManager 上的资源
         */
        _releasePCManager() {
            /**
             * 移除 peerConnection 上绑定的事件
             */
            const allPC = this._peerCManager.getPCList();
            allPC === null || allPC === void 0 ? void 0 : allPC.forEach((pc) => {
                pc.off(RCLocalTrack.__INNER_EVENT_MUTED_CHANGE__, this._onLocalTrackMuted, this);
                pc.off(RCLocalTrack.__INNER_EVENT_DESTROY__, this._onLocalTrackDestroied, this);
            });
            // 移除 pc 上的 track，销毁 pc 连接
            this._peerCManager.clear();
            // 销毁 peerCManager 实例
            this._peerCManager = null;
        }
        _onLocalTrackDestroied(localTrack) {
            // 本地流已销毁，需取消发布此流(排除小流)
            const isTinyVideoTrack = (localTrack instanceof RCLocalVideoTrack) && localTrack.__isTiny();
            if (!isTinyVideoTrack) {
                this.unpublish([localTrack]);
            }
        }
        /**
         * 本端流状态修改，需通知房间内其他成员
         * @param localTrack
         */
        async _onLocalTrackMuted(localTrack) {
            this._invoker.push(new LocalTrackMuteCommand(localTrack));
        }
        /**
         * 增量发布资源，若发布的资源 tag 及媒体类型重复，后者将覆盖前者进行发布。
         * @param tracks 待发布的 RCLocalTrack 实例
         * @returns
         */
        async publish(tracks) {
            return this._invoker.push(new PublishCommand(tracks, this._pubhook.bind(this)));
        }
        /**
         * 获取跨房间连麦需携带参数 pushOtherRooms 的值
         */
        _getPushOtherRoomsParams() {
            return [];
        }
        /**
         * ice 断线后，尝试重新走 exchange
         */
        async _reTryExchange(pcName, isPub) {
            this._invoker.push(new RetryExchangeCommand(pcName, isPub, pcName => {
                return { pushOtherRooms: this._getPushOtherRoomsParams(), headers: this._getRTCReqestHeaders(pcName) };
            }));
        }
        _getRTCReqestHeaders(pcName) {
            const heasers = {
                'App-Key': this._context.getAppkey(),
                RoomId: this._roomId,
                Token: this._store.getToken(),
                RoomType: this._store.roomMode,
                UserId: this._context.getCurrentId(),
                'Client-Session-Id': this._clientSessionId,
                'Peer-Connection-Id': pcName
            };
            return heasers;
        }
        /**
         * 增量取消资源发布，若相应资源中存在小流资源，则同时取消发布
         * @param tracks 取消发布的 RCLocalTrack 列表
         */
        async unpublish(tracks) {
            return this._invoker.push(new UnpublishCommand(tracks, (tracks, pcName) => {
                return { pushOtherRooms: this._getPushOtherRoomsParams(), headers: this._getRTCReqestHeaders(pcName) };
            }));
        }
        /**
         * 根据资源 Id 获取资源数据
         * @param trackId
         */
        _getResourceById(trackId) {
            return this._store.getPublishedResourceByTrackId(trackId);
        }
        /**
         * resourceId 有效性验证
         * @param resourceId
         */
        _isValidResourceId(resourceId) {
            var _a;
            const { userId } = parseTrackId(resourceId);
            // return !!this._roomResources[userId]?.find(item => getTrackId(item) === resourceId)
            return !!((_a = this._store.getResourcesByUserId(userId)) === null || _a === void 0 ? void 0 : _a.find(item => getTrackId(item) === resourceId));
        }
        _subhook(tracks) {
            const { pc, pcName } = this._peerCManager.createPeerCList(tracks)[0];
            pc.on(RCRTCPeerConnection.__INNER_EVENT_TRACK_READY__, this._onTrackReady, this);
            // 发送上下行数据至北极星
            pc.__reportR3R4ToPolaris();
            pc.registerReportListener(this._reportListener);
            // 客户端主动调用 api 发请求时，清除 ice 断线重连的定时器
            pc.clearReTryExchangeTimer();
            return { pc, pushOtherRooms: this._getPushOtherRoomsParams(), headers: this._getRTCReqestHeaders(pcName) };
        }
        _pubhook(tracks) {
            const peerList = this._peerCManager.createPeerCList(tracks);
            const plist = peerList.map(item => {
                const { pc, pcName } = item;
                pc.on(RCLocalTrack.__INNER_EVENT_MUTED_CHANGE__, this._onLocalTrackMuted, this);
                pc.on(RCLocalTrack.__INNER_EVENT_DESTROY__, this._onLocalTrackDestroied, this);
                pc.registerReportListener(this._reportListener);
                // 发送上下行数据至北极星
                pc.__reportR3R4ToPolaris();
                return Object.assign(Object.assign({}, item), { headers: this._getRTCReqestHeaders(pcName) });
            });
            return {
                plist,
                pushOtherRooms: this._getPushOtherRoomsParams()
            };
        }
        /**
         * 订阅资源
         * @param tracks
         */
        async subscribe(tracks) {
            return this._invoker.push(new SubscribeCommand(tracks, this._subhook.bind(this)));
        }
        /**
         * 它将订阅任务添加到队列中。
         * @param {(RCRemoteTrack | ISubscribeAttr)[]} tracks - (RCRemoteTrack | ISubscribeAttr)[]
         * @returns 一个用代码和失败列表解析为对象的承诺。
         */
        addSubscribeTask(tracks) {
            this._invoker.push(new AsyncSubscribeCommand(tracks, this._subhook.bind(this), {
                onTaskCompleted: this._onTaskCompleted.bind(this)
            }));
        }
        /**
         * 取消订阅资源
         * @param tracks 预取消远端资源
         */
        async unsubscribe(tracks) {
            return this._invoker.push(new UnsubscribeCommand(tracks, this._subhook.bind(this)));
        }
        /**
         * 它将取消订阅任务添加到队列中。
         * @param {RCRemoteTrack[]} tracks - 要取消订阅的曲目。
         * @returns 一个用代码和失败列表解析为对象的承诺。
         */
        addUnsubscribeTask(tracks) {
            this._invoker.push(new AsyncUnsubscribeCommand(tracks, this._subhook.bind(this), {
                onTaskCompleted: this._onTaskCompleted.bind(this)
            }));
        }
        /**
         * 强制修改订阅列表，仅订阅数组中的资源，取消订阅其他已订阅资源。
         * 当参数为 `[]` 时，意味着不再订阅任何资源
         * @param tracks 变更的资源列表
         */
        async updateSubList(tracks) {
            return this._invoker.push(new UpdateSubscribeListCommand(tracks, this._subhook.bind(this)));
        }
        /**
         * 将任务添加到任务队列的函数。
         * @param {(RCRemoteTrack | ISubscribeAttr)[]} tracks - (RCRemoteTrack | ISubscribeAttr)[]
         */
        addUpdateSubscribeListTask(tracks) {
            this._invoker.push(new AsyncUpdateSubscribeListCommand(tracks, this._subhook.bind(this), {
                onTaskCompleted: this._onTaskCompleted.bind(this)
            }));
        }
        _onTaskCompleted(content) {
            this._callAppListener('onTaskCompleted', content.code, content.subscribe, content.unsubscribe, content.failedList);
        }
        /**
         * 获取已发布的本地资源
         * @param trackId
         * @returns
         */
        getLocalTrack(trackId) {
            return this._store.getLocalTrack(trackId);
        }
        /**
         * 获取所有已发布的资源
         */
        getLocalTracks() {
            return this._store.getLocalTracks();
        }
        /**
         * 根据 trackId 获取房间内的远端资源
         * @param trackId
         * @returns
         */
        getRemoteTrack(trackId) {
            return this._store.getRemoteTrack(trackId) || null;
        }
        /**
         * 获取当前已经订阅的全量资源
         * returns subscribedTracks ISubscribeAttr[]
         */
        get subscribedTracks() {
            // 浅Copy 获取已经订阅的列表
            return this._store.getSubscribedList().slice();
        }
        /**
         * 注册事件监听器，多次注册会导致后者覆盖前者，可以通过使用 `registerRoomEventListener(null)` 取消注册
         * @param listener
         */
        registerRoomEventListener(listener) {
            engine.logger.info(RCLoggerTag.L_ABSTRACT_ROOM_REGISTER_ROOM_EVENT_LISTENER_O, {
                status: RCLoggerStatus.SUCCESSED,
                listener: listener && Object.keys(listener)
            }, {
                logSource: engine.LogSource.RTC
            });
            this._appListener = listener;
        }
        /**
         * 注册房间数据监控
         * @param listener
         * @description 该方法暂仅支持 Chrome 浏览器
         */
        registerReportListener(listener) {
            engine.logger.info(RCLoggerTag.L_ABSTRACT_ROOM_REGISTER_REPORT_LISTENER_O, {
                status: RCLoggerStatus.SUCCESSED,
                listener: listener && Object.keys(listener)
            }, {
                logSource: engine.LogSource.RTC
            });
            this._reportListener = listener;
        }
        /**
         * 音量上报
         * @param handler 业务端传入的音量上报事件
         * @param gap 上报时间间隔
         */
        onAudioLevelChange(handler, gap) {
            var _a;
            engine.logger.info(RCLoggerTag.L_ABSTRACT_ROOM_AUDIO_LEVEL_O, {
                status: RCLoggerStatus.SUCCESSED,
                handler: handler === null || handler === void 0 ? void 0 : handler.name,
                gap
            }, {
                logSource: engine.LogSource.RTC
            });
            (_a = this._audioLevelReport) === null || _a === void 0 ? void 0 : _a.clearAudioLevelReportTimer();
            this._audioLevelReport = new RCAudioLevelReport(this);
            this._audioLevelReport.onAudioLevelChange(handler, gap || 1000);
        }
        /**
         * 断线重连后尝试补发断线过程中的通知信息
         */
        async __onReconnected(livingType) {
            return this._invoker.push(new OnSignalReconnectedCommand(this._subhook.bind(this), {
                onPeerClosed: this._rtcpeerClosed.bind(this),
                onAudioMuteChange: this._onAudioMuteChange.bind(this),
                onVideoMuteChange: this._onVideoMuteChange.bind(this),
                onUserJoin: this._callAppListener.bind(this, 'onUserJoin'),
                onUserLeave: this._callAppListener.bind(this, 'onUserLeave'),
                onTrackPublish: this._onTrackPublish.bind(this),
                onTrackUnpublish: this._onTrackUnpublish.bind(this),
                onCDNEnableChange: this._callAppListener.bind(this, 'onCDNEnableChange')
            }, livingType));
        }
        _onAudioMuteChange(audioTrack) {
            this._callAppListener('onAudioMuteChange', audioTrack);
        }
        _onVideoMuteChange(videoTrack) {
            this._callAppListener('onVideoMuteChange', videoTrack);
        }
        /**
         * 注册 PK 业务监听方法
         */
        _registerPKMsgListener(listener) {
            this._onRecvPKMsg = listener;
        }
        /**
         * 退出 PK 房间
         */
        _quitAllPKRoom() { }
        getClientSessionId() {
            return this._clientSessionId;
        }
    }

    class MCUConfigFlushCommand extends BaseCommand {
        constructor(data, cdnValues) {
            super();
            this.data = data;
            this.cdnValues = cdnValues;
        }
        async execute(store, invoker) {
            var _a, _b, _c, _d;
            const headers = {
                'App-Key': store.context.getAppkey(),
                Token: store.getToken(),
                RoomId: store.roomId,
                UserId: store.context.getCurrentId(),
                SessionId: store.getSessionId()
            };
            const { code, res } = await store.service.setMcuConfig(headers, this.data);
            if (code !== exports.RCRTCCode.SUCCESS) {
                logger.error(`set MCU config failed: ${code}`);
                return { code };
            }
            logger.info('set MCU config success');
            // res.pull_url && (this._CDNUris = JSON.parse(res.pull_url))
            res.pull_url && store.setCDNUris(JSON.parse(res.pull_url));
            /**
             * 合流布局中包含分辨率设置时，需扩散 cdn_uris
             */
            const values = this.cdnValues;
            if (code === exports.RCRTCCode.SUCCESS && (((_b = (_a = values.output) === null || _a === void 0 ? void 0 : _a.video.normal) === null || _b === void 0 ? void 0 : _b.width) || ((_d = (_c = values.output) === null || _c === void 0 ? void 0 : _c.video.normal) === null || _d === void 0 ? void 0 : _d.fps))) {
                sendCDNInfoSignal(store);
            }
            return { code, res };
        }
    }

    /**
     * 自定义合流布局时，背景图片填充方式
     */
    exports.BackgroundPictureFillMode = void 0;
    (function (BackgroundPictureFillMode) {
        /**
         * 裁剪（默认）
         */
        BackgroundPictureFillMode[BackgroundPictureFillMode["CROP"] = 1] = "CROP";
        /**
         * 不裁剪
         */
        BackgroundPictureFillMode[BackgroundPictureFillMode["WHOLE"] = 2] = "WHOLE";
    })(exports.BackgroundPictureFillMode || (exports.BackgroundPictureFillMode = {}));

    /**
     * 直播布局模式定义
     */
    exports.MixLayoutMode = void 0;
    (function (MixLayoutMode) {
        /**
         * 自定义布局
         */
        MixLayoutMode[MixLayoutMode["CUSTOMIZE"] = 1] = "CUSTOMIZE";
        /**
         * 悬浮布局（默认）
         */
        MixLayoutMode[MixLayoutMode["SUSPENSION"] = 2] = "SUSPENSION";
        /**
         * 自适应布局
         */
        MixLayoutMode[MixLayoutMode["ADAPTATION"] = 3] = "ADAPTATION";
    })(exports.MixLayoutMode || (exports.MixLayoutMode = {}));

    /**
     * 合流布局对视频的填充模式
     */
    exports.MixVideoRenderMode = void 0;
    (function (MixVideoRenderMode) {
        /**
         * 裁剪（默认）
         */
        MixVideoRenderMode[MixVideoRenderMode["CROP"] = 1] = "CROP";
        /**
         * 不裁剪
         */
        MixVideoRenderMode[MixVideoRenderMode["WHOLE"] = 2] = "WHOLE";
    })(exports.MixVideoRenderMode || (exports.MixVideoRenderMode = {}));

    var RCMixInputFilterMode;
    (function (RCMixInputFilterMode) {
        /** 全合流，后续加入房间的用户会自动合流 */
        RCMixInputFilterMode[RCMixInputFilterMode["AUDIO_VIDEO_ALL"] = 0] = "AUDIO_VIDEO_ALL";
        /** 全不合流，后续加入本房间的用户 */
        RCMixInputFilterMode[RCMixInputFilterMode["AUDIO_VIDEO_NO"] = 1] = "AUDIO_VIDEO_NO";
        /** 音频全订阅, 视频全不订阅 */
        RCMixInputFilterMode[RCMixInputFilterMode["AUDIO_ALL_VIDEO_NO"] = 2] = "AUDIO_ALL_VIDEO_NO";
        /** 视频全订阅, 音频全不订阅 */
        RCMixInputFilterMode[RCMixInputFilterMode["AUDIO_NO_VIDEO_ALL"] = 3] = "AUDIO_NO_VIDEO_ALL";
        /**
         * 根据设置的音频合流列表和视频合流列表合并媒体流
         */
        RCMixInputFilterMode[RCMixInputFilterMode["AUDIO_VIDEO_INPUT"] = 4] = "AUDIO_VIDEO_INPUT";
        /** 音频全订阅，视频根据设置的视频合流列表 */
        RCMixInputFilterMode[RCMixInputFilterMode["AUDIO_ALL_VIDEO_INPUT"] = 5] = "AUDIO_ALL_VIDEO_INPUT";
        /** 音频全不订阅, 视频根据input里面的视频项订阅 */
        RCMixInputFilterMode[RCMixInputFilterMode["AUDIO_NO_VIDEO_INPUT"] = 6] = "AUDIO_NO_VIDEO_INPUT";
        /** 视频全订阅, 音频根据input里面的音频项订阅 */
        RCMixInputFilterMode[RCMixInputFilterMode["AUDIO_INPUT_VIDEO_ALL"] = 7] = "AUDIO_INPUT_VIDEO_ALL";
        /** 视频全不订阅, 音频根据input里面的音频项订阅 */
        RCMixInputFilterMode[RCMixInputFilterMode["AUDIO_INPUT_VIDEO_NO"] = 8] = "AUDIO_INPUT_VIDEO_NO";
        /** 按房间列表订阅音视频(保留当前已经订阅的, 但没在房间列表里的音视频) */
        RCMixInputFilterMode[RCMixInputFilterMode["ROOM_AUDIO_VIDEO_APPEND"] = 9] = "ROOM_AUDIO_VIDEO_APPEND";
        /** 按房间列表订阅音视频(清理当前已经订阅的, 但没在房间列表里的音视频) */
        RCMixInputFilterMode[RCMixInputFilterMode["ROOM_AUDIO_VIDEO_NOT_APPEND"] = 10] = "ROOM_AUDIO_VIDEO_NOT_APPEND";
        /** 按房间列表订阅音频, 不订阅视频(保留当前已经订阅的, 但没在房间列表里的音频) */
        RCMixInputFilterMode[RCMixInputFilterMode["ROOM_AUDIO_APPEND"] = 11] = "ROOM_AUDIO_APPEND";
        /** 按房间列表订阅音视, 不订阅视频(清理当前已经订阅的, 但没在房间列表里的音频) */
        RCMixInputFilterMode[RCMixInputFilterMode["ROOM_AUDIO_NOT_APPEND"] = 12] = "ROOM_AUDIO_NOT_APPEND";
        /** 按房间列表订阅视频, 不订阅音频(保留当前已经订阅的, 但没在房间列表里的视频) */
        RCMixInputFilterMode[RCMixInputFilterMode["ROOM_VIDEO_APPEND"] = 13] = "ROOM_VIDEO_APPEND";
        /** 按房间列表订阅视频, 不订阅音频(清理当前已经订阅的, 但没在房间列表里的视频) */
        RCMixInputFilterMode[RCMixInputFilterMode["ROOM_VIDEO_NOT_APPEND"] = 14] = "ROOM_VIDEO_NOT_APPEND";
    })(RCMixInputFilterMode || (RCMixInputFilterMode = {}));

    const createMCUConfig = () => ({
        version: 2,
        mode: exports.MixLayoutMode.SUSPENSION
    });
    class RCMCUConfigBuilder {
        constructor(_invoker, 
        /**
         * flush 提交回调
         */
        // private readonly _onFlush: (config: IMCUConfig) => Promise<{ code: RCRTCCode }>,
        /**
         * trackId 有效性验证方法
         */
        _isValidTrackId) {
            this._invoker = _invoker;
            this._isValidTrackId = _isValidTrackId;
            /**
             * mcu 配置数据，每次向服务器提交全量数据
             */
            this._values = createMCUConfig();
        }
        /**
         * 设置合流后的主位置显示的视频流
         * @param videoTrackId 视频流资源 Id
         */
        setHostVideoTrack(videoTrackId) {
            logger.info(`setHostVideoTrack -> videoTrackId: ${videoTrackId}`);
            if (!this._isValidTrackId(videoTrackId)) {
                logger.error(`setHostVideoTrack failed -> videoTrackId is invalid: ${videoTrackId}`);
                engine.logger.error(RCLoggerTag.L_MCU_CONFIG_BUILDER_SET_HOST_VIDEO_TRACK_O, {
                    status: RCLoggerStatus.FAILED,
                    code: '',
                    msg: 'params error -> videoTrackId'
                }, {
                    logSource: engine.LogSource.RTC
                });
                return this;
            }
            const { mediaType, tag, userId } = parseTrackId(videoTrackId);
            if (mediaType !== exports.RCMediaType.VIDEO_ONLY) {
                logger.error(`setHostVideoTrack failed -> kind of resource is not 'video' -> ${videoTrackId}`);
                engine.logger.error(RCLoggerTag.L_MCU_CONFIG_BUILDER_SET_HOST_VIDEO_TRACK_O, {
                    status: RCLoggerStatus.FAILED,
                    code: '',
                    msg: 'not video'
                }, {
                    logSource: engine.LogSource.RTC
                });
                return this;
            }
            this._values.host_stream_id = formatStreamId(userId, tag);
            engine.logger.info(RCLoggerTag.L_MCU_CONFIG_BUILDER_SET_HOST_VIDEO_TRACK_O, {
                status: RCLoggerStatus.SUCCESSED,
                videoTrackId
            }, {
                logSource: engine.LogSource.RTC
            });
            return this;
        }
        /**
         * 设置合流布局模式，当使用 `MixLayoutMode.CUSTOMIZE` 模式时，需自定义合流结构
         * @param mode
         * * `MixLayoutMode.CUSTOMIZE`: 自定义布局，需用户设置布局结构
         * * `MixLayoutMode.SUSPENSION`: 悬浮布局（默认）
         * * `MixLayoutMode.ADAPTATION`: 自适应布局
         */
        setMixLayoutMode(mode) {
            logger.info(`setMixLayoutMode -> mode: ${mode}`);
            const valid = [
                exports.MixLayoutMode.CUSTOMIZE, exports.MixLayoutMode.SUSPENSION, exports.MixLayoutMode.ADAPTATION
            ].includes(mode);
            if (!valid) {
                logger.error(`setMixLayoutMode failed -> mode is invalid: ${mode}`);
                engine.logger.error(RCLoggerTag.L_MCU_CONFIG_BUILDER_SET_MIX_LAYOUT_MODE_O, {
                    status: RCLoggerStatus.SUCCESSED,
                    code: '',
                    msg: `params error -> mode: ${mode}`
                }, {
                    logSource: engine.LogSource.RTC
                });
                return this;
            }
            this._values.mode = mode;
            engine.logger.info(RCLoggerTag.L_MCU_CONFIG_BUILDER_SET_MIX_LAYOUT_MODE_O, {
                status: RCLoggerStatus.SUCCESSED,
                mode
            }, {
                logSource: engine.LogSource.RTC
            });
            return this;
        }
        _addOutputValue(key, value, subkey = 'normal') {
            const output = this._values.output || (this._values.output = { video: { normal: { width: 640, height: 480 } } });
            if (key === 'cdn') {
                output.cdn = value;
                return;
            }
            if (key === 'audio') {
                output.audio = { bitrate: value };
                return;
            }
            // video 修改
            const video = output.video;
            // 修改 video 编码配置
            if (subkey === 'normal' || subkey === 'tiny') {
                const videoConfig = video[subkey] || (video[subkey] = {});
                Object.assign(videoConfig, value);
                return;
            }
            // 修改背景色
            if (subkey === 'backgroundColor') {
                video.backgroundColor = value;
                return;
            }
            // 修改 renderMode
            if (subkey === 'exparams') {
                video.exparams = { renderMode: value };
                return;
            }
            // 增加/删除背景图，修改填充方式
            if (subkey === 'backgroundPicture') {
                const config = video.backgroundPicture || (video.backgroundPicture = {
                    fillMode: exports.BackgroundPictureFillMode.CROP,
                    picture: []
                });
                Object.assign(config, value);
            }
        }
        /**
         * 设置合流输出视频流的分辨率
         * @param resulution 有效值为 `RCResolution` 定义的枚举值
         */
        setOutputVideoResolution(resolution) {
            logger.info(`setOutputVideoResolution -> resolution: ${resolution}`);
            if (!isValidResolution(resolution)) {
                logger.error(`setOutputVideoResolution failed -> resolution is invalid: ${resolution}`);
                engine.logger.error(RCLoggerTag.L_MCU_CONFIG_BUILDER_SET_OUTPUT_VIDEO_RESOLUTION_O, {
                    status: RCLoggerStatus.FAILED,
                    code: '',
                    msg: `params error -> resolution: ${resolution}`
                }, {
                    logSource: engine.LogSource.RTC
                });
                return this;
            }
            const { width, height } = transResolution(resolution);
            this._addOutputValue('video', { width, height }, 'normal');
            engine.logger.info(RCLoggerTag.L_MCU_CONFIG_BUILDER_SET_OUTPUT_VIDEO_RESOLUTION_O, {
                status: RCLoggerStatus.SUCCESSED,
                resolution
            }, {
                logSource: engine.LogSource.RTC
            });
            return this;
        }
        /**
         * 设置合流输出视频流的帧率
         * @param fps 其有效值为 `RCFrameRate` 中定义的枚举值
         */
        setOutputVideoFPS(fps) {
            logger.info(`setOutputVideoFPS -> fps: ${fps}`);
            if (!isValidFPS(fps)) {
                logger.error(`setOutputVideoFPS failed -> fps is invalid: ${fps}`);
                engine.logger.error(RCLoggerTag.L_MCU_CONFIG_BUILDER_SET_OUTPUT_VIDEO_FPS_O, {
                    status: RCLoggerStatus.FAILED,
                    code: '',
                    msg: `params error -> fps: ${fps}`
                }, {
                    logSource: engine.LogSource.RTC
                });
                return this;
            }
            const fpsNum = transFrameRate(fps);
            this._addOutputValue('video', { fps: fpsNum }, 'normal');
            engine.logger.info(RCLoggerTag.L_MCU_CONFIG_BUILDER_SET_OUTPUT_VIDEO_FPS_O, {
                status: RCLoggerStatus.SUCCESSED,
                fps
            }, {
                logSource: engine.LogSource.RTC
            });
            return this;
        }
        /**
         * 设置合流输出视频流的码率（不推荐主动修改）
         * @param bitrate
         */
        setOutputVideoBitrate(bitrate) {
            logger.info(`setOutputVideoBitrate -> bitrate: ${bitrate}`);
            if (!engine.isNumber(bitrate) || bitrate <= 0) {
                logger.error(`setOutputVideoBitrate failed -> bitrate is invalid: ${bitrate}`);
                engine.logger.error(RCLoggerTag.L_MCU_CONFIG_BUILDER_SET_OUTPUT_VIDEO_BITRATE_O, {
                    status: RCLoggerStatus.FAILED,
                    code: '',
                    msg: `params error -> bitrate: ${bitrate}`
                }, {
                    logSource: engine.LogSource.RTC
                });
            }
            else {
                this._addOutputValue('video', { bitrate }, 'normal');
            }
            engine.logger.info(RCLoggerTag.L_MCU_CONFIG_BUILDER_SET_OUTPUT_VIDEO_BITRATE_O, {
                status: RCLoggerStatus.SUCCESSED,
                bitrate
            }, {
                logSource: engine.LogSource.RTC
            });
            return this;
        }
        /**
         * 设置合流后输出视频流小流的分辨率
         * @param resulution 有效值为 `RCResolution` 定义的枚举值
         */
        setOutputTinyVideoResolution(resolution) {
            logger.info(`setOutputTinyVideoResolution -> resolution: ${resolution}`);
            if (!isValidResolution(resolution)) {
                logger.error(`setOutputTinyVideoResolution failed -> resolution is invalid: ${resolution}`);
                engine.logger.error(RCLoggerTag.L_MCU_CONFIG_BUILDER_SET_OUTPUT_TINY_VIDEO_RESOLUTION_O, {
                    status: RCLoggerStatus.FAILED,
                    code: '',
                    msg: `params error -> resolution: ${resolution}`
                }, {
                    logSource: engine.LogSource.RTC
                });
                return this;
            }
            const { width, height } = transResolution(resolution);
            this._addOutputValue('video', { width, height }, 'tiny');
            engine.logger.info(RCLoggerTag.L_MCU_CONFIG_BUILDER_SET_OUTPUT_TINY_VIDEO_RESOLUTION_O, {
                status: RCLoggerStatus.SUCCESSED,
                resolution
            }, {
                logSource: engine.LogSource.RTC
            });
            return this;
        }
        /**
         * 设置合流输出视频流小流的帧率
         * @param fps 其有效值为 `RCFrameRate` 中定义的枚举值
         */
        setOutputTinyVideoFPS(fps) {
            logger.info(`setOutputTinyVideoFPS -> fps: ${fps}`);
            if (!isValidFPS(fps)) {
                logger.error(`setOutputTinyVideoFPS failed -> fps is invalid: ${fps}`);
                engine.logger.error(RCLoggerTag.L_MCU_CONFIG_BUILDER_SET_OUTPUT_TINY_VIDEO_FPS_O, {
                    status: RCLoggerStatus.FAILED,
                    code: '',
                    msg: `params error -> fps: ${fps}`
                }, {
                    logSource: engine.LogSource.RTC
                });
                return this;
            }
            const fpsNum = transFrameRate(fps);
            this._addOutputValue('video', { fps: fpsNum }, 'tiny');
            engine.logger.info(RCLoggerTag.L_MCU_CONFIG_BUILDER_SET_OUTPUT_TINY_VIDEO_FPS_O, {
                status: RCLoggerStatus.SUCCESSED,
                fps
            }, {
                logSource: engine.LogSource.RTC
            });
            return this;
        }
        /**
         * 设置合流输出视频流小流的码率（不推荐主动修改）
         * @param bitrate
         */
        setOutputTinyVideoBitrate(bitrate) {
            logger.info(`setOutputTinyVideoBitrate -> bitrate: ${bitrate}`);
            if (!engine.isNumber(bitrate) || bitrate <= 0) {
                logger.error(`setOutputTinyVideoBitrate failed -> bitrate is invalid: ${bitrate}`);
                engine.logger.error(RCLoggerTag.L_MCU_CONFIG_BUILDER_SET_OUTPUT_TINY_VIDEO_BITRATE_O, {
                    status: RCLoggerStatus.FAILED,
                    code: '',
                    msg: `params error -> bitrate: ${bitrate}`
                }, {
                    logSource: engine.LogSource.RTC
                });
            }
            else {
                this._addOutputValue('video', { bitrate }, 'tiny');
            }
            engine.logger.info(RCLoggerTag.L_MCU_CONFIG_BUILDER_SET_OUTPUT_TINY_VIDEO_BITRATE_O, {
                status: RCLoggerStatus.SUCCESSED,
                bitrate
            }, {
                logSource: engine.LogSource.RTC
            });
            return this;
        }
        /**
         * 设置合流后的视频流渲染方式
         * @param renderMode
         */
        setOutputVideoRenderMode(renderMode) {
            logger.info(`setOutputVideoRenderMode -> renderMode: ${renderMode}`);
            if (![exports.MixVideoRenderMode.CROP, exports.MixVideoRenderMode.WHOLE].includes(renderMode)) {
                logger.error(`setOutputVideoRenderMode failed -> renderMode is invalid: ${renderMode}`);
                engine.logger.error(RCLoggerTag.L_MCU_CONFIG_BUILDER_SET_OUTPUT_VIDEO_RENDER_MODE_O, {
                    status: RCLoggerStatus.FAILED,
                    code: '',
                    msg: `params error -> renderMode: ${renderMode}`
                }, {
                    logSource: engine.LogSource.RTC
                });
            }
            else {
                this._addOutputValue('video', renderMode, 'exparams');
            }
            engine.logger.info(RCLoggerTag.L_MCU_CONFIG_BUILDER_SET_OUTPUT_VIDEO_RENDER_MODE_O, {
                status: RCLoggerStatus.SUCCESSED,
                renderMode
            }, {
                logSource: engine.LogSource.RTC
            });
            return this;
        }
        /**
         * 设置合流后音频流的编码参数（不推荐主动修改）
         * @param bitrate 音频码率
         */
        setOutputAudioBitrate(bitrate) {
            logger.info(`setOutputAudioBitrate -> bitrate: ${bitrate}`);
            if (engine.isNumber(bitrate) && bitrate > 0) {
                this._addOutputValue('audio', bitrate);
            }
            else {
                logger.error(`setOutputAudioBitrate failed -> bitrate is invalid: ${bitrate}`);
                engine.logger.error(RCLoggerTag.L_MCU_CONFIG_BUILDER_SET_OUTPUT_AUDIO_BITRATE_O, {
                    status: RCLoggerStatus.FAILED,
                    code: '',
                    msg: `params error -> bitrate: ${bitrate}`
                }, {
                    logSource: engine.LogSource.RTC
                });
            }
            engine.logger.info(RCLoggerTag.L_MCU_CONFIG_BUILDER_SET_OUTPUT_AUDIO_BITRATE_O, {
                status: RCLoggerStatus.SUCCESSED,
                bitrate
            }, {
                logSource: engine.LogSource.RTC
            });
            return this;
        }
        /**
         * 设置合流后的视频流的背景色，默认为 `0x000000`
         * @param color 颜色参数，为 16 进制标识法，如 '0x000000'
         */
        setOutputBackgroundColor(color) {
            logger.info(`setOutputBackgroundColor -> color: ${color}`);
            if (!/^0x[a-fA-F0-9]{6}$/.test(color)) {
                logger.error(`setOutputBackgroundColor failed -> color is invalid: ${color}`);
                engine.logger.error(RCLoggerTag.L_MCU_CONFIG_BUILDER_SET_OUTPUT_BACKGROUND_COLOR_O, {
                    status: RCLoggerStatus.FAILED,
                    code: '',
                    msg: `params error -> color: ${color}`
                }, {
                    logSource: engine.LogSource.RTC
                });
            }
            else {
                this._addOutputValue('video', color, 'backgroundColor');
            }
            engine.logger.info(RCLoggerTag.L_MCU_CONFIG_BUILDER_SET_OUTPUT_BACKGROUND_COLOR_O, {
                status: RCLoggerStatus.SUCCESSED,
                color
            }, {
                logSource: engine.LogSource.RTC
            });
            return this;
        }
        /**
         * 向合流后的视频流中增加背景图片
         * @param uri 图片资源的完整下载地址
         * @param x 相对于整体画布的起始位置 x 坐标（百分比），有效值 `0.0` - `1.0`
         * @param y 相对于整体画布的起始位置 y 坐标（百分比），有效值 `0.0` - `1.0`
         * @param w 相对于整体画布的宽（百分比），有效值 `0.0` - `1.0`
         * @param h 相对于整体画布的高（百分比），有效值 `0.0` - `1.0`
         */
        addOutputBackgroundPicture(uri, x, y, w, h) {
            var _a, _b, _c;
            logger.info(`addOutputBackgroundPicture -> uri: ${uri}, x: ${x}, y: ${y}, w: ${w}, h: ${h}`);
            if (!engine.isHttpUrl(uri)) {
                logger.error(`addOutputBackgroundPicture failed -> uri is invalid: ${uri}`);
                engine.logger.error(RCLoggerTag.L_MCU_CONFIG_BUILDER_SET_OUTPUT_BACKGROUND_PICTURE_O, {
                    status: RCLoggerStatus.FAILED,
                    code: '',
                    msg: `params error -> uri: ${uri}`
                }, {
                    logSource: engine.LogSource.RTC
                });
                return this;
            }
            if ([x, y, w, h].some(item => !engine.isNumber(item) || item < 0 || item > 1)) {
                logger.error(`addOutputBackgroundPicture failed -> some attrs of (x, y, w, h) is invalid: ${x}, ${y}, ${w}, ${h}`);
                engine.logger.error(RCLoggerTag.L_MCU_CONFIG_BUILDER_SET_OUTPUT_BACKGROUND_PICTURE_O, {
                    status: RCLoggerStatus.FAILED,
                    code: '',
                    msg: `params error -> x: ${x}, y: ${y}, w: ${w}, h: ${h}`
                }, {
                    logSource: engine.LogSource.RTC
                });
                return this;
            }
            const pictures = ((_c = (_b = (_a = this._values.output) === null || _a === void 0 ? void 0 : _a.video) === null || _b === void 0 ? void 0 : _b.backgroundPicture) === null || _c === void 0 ? void 0 : _c.picture) || [];
            pictures.push({ uri, w, h, x, y });
            this._addOutputValue('video', { picture: pictures }, 'backgroundPicture');
            engine.logger.info(RCLoggerTag.L_MCU_CONFIG_BUILDER_SET_OUTPUT_BACKGROUND_PICTURE_O, {
                status: RCLoggerStatus.SUCCESSED,
                uri,
                x,
                y,
                w,
                h
            }, {
                logSource: engine.LogSource.RTC
            });
            return this;
        }
        /**
         * 移除对合流后的视频流中添加的指定背景图片
         * @param uri
         */
        removeOutputBackgroundPicture(uri) {
            var _a, _b, _c;
            logger.info(`removeOutputBackgroundPicture -> uri: ${uri}`);
            if (!engine.isHttpUrl(uri)) {
                logger.error(`removeOutputBackgroundPicture failed -> uri is invalid: ${uri}`);
                engine.logger.error(RCLoggerTag.L_MCU_CONFIG_BUILDER_REMOVE_OUTPUT_BACKGROUND_PICTURE_O, {
                    status: RCLoggerStatus.FAILED,
                    code: '',
                    msg: `params error -> uri: ${uri}`
                }, {
                    logSource: engine.LogSource.RTC
                });
                return this;
            }
            let pictures = (_c = (_b = (_a = this._values.output) === null || _a === void 0 ? void 0 : _a.video) === null || _b === void 0 ? void 0 : _b.backgroundPicture) === null || _c === void 0 ? void 0 : _c.picture;
            if (pictures) {
                pictures = pictures.filter(item => item.uri !== uri);
                this._addOutputValue('video', { pictures }, 'backgroundPicture');
            }
            engine.logger.info(RCLoggerTag.L_MCU_CONFIG_BUILDER_REMOVE_OUTPUT_BACKGROUND_PICTURE_O, {
                status: RCLoggerStatus.SUCCESSED,
                uri
            }, {
                logSource: engine.LogSource.RTC
            });
            return this;
        }
        /**
         * 清理对合流后的视频流中添加的所有背景图片
         */
        clearOutputBackgroundPicture() {
            logger.info('clearOutputBackgroundPicture ->');
            this._addOutputValue('video', { pictures: [] }, 'backgroundPicture');
            engine.logger.info(RCLoggerTag.L_MCU_CONFIG_BUILDER_CLEAR_OUTPUT_BACKGROUND_PICTURE_O, {
                status: RCLoggerStatus.SUCCESSED
            }, {
                logSource: engine.LogSource.RTC
            });
            return this;
        }
        /**
         * 设置合流后的视频流中添加的背景图片的填充方式：
         * 1. 按比例裁剪
         * 2. 不裁剪，按比例压缩
         * @param fillMode
         */
        setOutputBackgroundPictureFillMode(fillMode) {
            logger.info(`setOutputBackgroundPictureFillMode -> fillMode: ${fillMode}`);
            if (![exports.BackgroundPictureFillMode.CROP, exports.BackgroundPictureFillMode.WHOLE].includes(fillMode)) {
                logger.error(`setOutputBackgroundPictureFillMode failed -> fillMode is invalid: ${fillMode}`);
                engine.logger.error(RCLoggerTag.L_MCU_CONFIG_BUILDER_SET_OUTPUT_BACKGROUND_PICTURE_FILL_MODE_O, {
                    status: RCLoggerStatus.FAILED,
                    code: '',
                    msg: `params error -> fillMode: ${fillMode}`
                }, {
                    logSource: engine.LogSource.RTC
                });
            }
            else {
                this._addOutputValue('video', { fillMode }, 'backgroundPicture');
            }
            engine.logger.info(RCLoggerTag.L_MCU_CONFIG_BUILDER_SET_OUTPUT_BACKGROUND_PICTURE_FILL_MODE_O, {
                status: RCLoggerStatus.SUCCESSED,
                fillMode
            }, {
                logSource: engine.LogSource.RTC
            });
            return this;
        }
        /**
         * 设置直播 CDN 旁路推流地址，最多支持 5 个推流地址
         * @param urls 地址列表
         */
        addPublishStreamUrls(urls) {
            var _a, _b;
            logger.info(`addPublishStreamUrls -> urls: ${urls.join(',')}`);
            const regexp = /^rtmp:\/\/.+/;
            const invalid = !engine.isArray(urls) || urls.length === 0 || urls.some(url => !regexp.test(url));
            if (invalid) {
                logger.error(`addPublishStreamUrls failed -> urls is invalid: ${urls.join(',')}`);
                engine.logger.error(RCLoggerTag.L_MCU_CONFIG_BUILDER_SET_OUTPUT_BACKGROUND_PICTURE_FILL_MODE_O, {
                    status: RCLoggerStatus.FAILED,
                    code: '',
                    msg: `params error -> urls: ${urls.join(',')}`
                }, {
                    logSource: engine.LogSource.RTC
                });
                return this;
            }
            const cdns = ((_b = (_a = this._values.output) === null || _a === void 0 ? void 0 : _a.cdn) === null || _b === void 0 ? void 0 : _b.concat()) || [];
            let changed = false;
            urls.forEach(url => {
                if (cdns.some(item => item.pushurl === url)) {
                    return;
                }
                changed = true;
                cdns.push({ pushurl: url });
            });
            if (cdns.length > 5) {
                logger.error('addPublishStreamUrls failed -> publish stream urls no more than 5!');
                engine.logger.error(RCLoggerTag.L_MCU_CONFIG_BUILDER_SET_OUTPUT_BACKGROUND_PICTURE_FILL_MODE_O, {
                    status: RCLoggerStatus.FAILED,
                    code: '',
                    msg: `params error -> publish stream urls no more than 5, length: ${urls.length}`
                }, {
                    logSource: engine.LogSource.RTC
                });
                return this;
            }
            if (changed) {
                this._addOutputValue('cdn', cdns);
            }
            engine.logger.info(RCLoggerTag.L_MCU_CONFIG_BUILDER_ADD_PUBLISH_STREAM_URLS_O, {
                status: RCLoggerStatus.SUCCESSED,
                urls
            }, {
                logSource: engine.LogSource.RTC
            });
            return this;
        }
        /**
         * 移除直播 CDN 旁路推流地址
         * @param urls
         */
        removePublishStreamUrls(urls) {
            var _a, _b;
            logger.info(`removePublishStreamUrls -> urls: ${urls.join(',')}`);
            const regexp = /^rtmp:\/\/.+/;
            const invalid = !engine.isArray(urls) || urls.length === 0 || urls.some(url => !regexp.test(url));
            if (invalid) {
                logger.error(`removePublishStreamUrls failed -> urls contain invalid items: ${urls.join(',')}`);
                engine.logger.error(RCLoggerTag.L_MCU_CONFIG_BUILDER_REMOVE_PUBLISH_STREAM_URLS_O, {
                    status: RCLoggerStatus.FAILED,
                    code: '',
                    msg: `params error -> urls: ${urls.join(',')}`
                }, {
                    logSource: engine.LogSource.RTC
                });
                return this;
            }
            const cdns = ((_b = (_a = this._values.output) === null || _a === void 0 ? void 0 : _a.cdn) === null || _b === void 0 ? void 0 : _b.concat()) || [];
            for (let i = cdns.length - 1; i >= 0; i -= 1) {
                const { pushurl } = cdns[i];
                const index = urls.indexOf(pushurl);
                if (index >= 0) {
                    urls.splice(index, 1);
                    cdns.splice(i, 1);
                }
            }
            this._addOutputValue('cdn', cdns);
            engine.logger.info(RCLoggerTag.L_MCU_CONFIG_BUILDER_REMOVE_PUBLISH_STREAM_URLS_O, {
                status: RCLoggerStatus.SUCCESSED,
                urls
            }, {
                logSource: engine.LogSource.RTC
            });
            return this;
        }
        /**
         * 清理已添加的 CDN 旁路推流地址
         */
        clearPublishStreamUrls() {
            logger.info('clearPublishStreamUrls ->');
            this._addOutputValue('cdn', []);
            engine.logger.info(RCLoggerTag.L_MCU_CONFIG_BUILDER_CLEAR_PUBLISH_STREAM_URLS_O, {
                status: RCLoggerStatus.SUCCESSED
            }, {
                logSource: engine.LogSource.RTC
            });
            return this;
        }
        /**
         * 在自定义布局中增加视频流配置
         * @param trackId 资源 Id
         * @param x 在画布中的坐标 x
         * @param y 在画布中的坐标 y
         * @param width 分辨率宽度
         * @param height 分辨率高度
         */
        addCustomizeLayoutVideo(trackId, x, y, width, height) {
            logger.info(`addCustomizeLayoutVideo -> trackId: ${trackId}, x: ${x}, y: ${y}, width: ${width}, height: ${height}`);
            if (!engine.notEmptyString(trackId) || !this._isValidTrackId(trackId)) {
                logger.error(`addCustomizeLayoutVideo failed -> trackId is invalid: ${trackId}`);
                engine.logger.error(RCLoggerTag.L_MCU_CONFIG_BUILDER_ADD_CUSTOMIZE_LAYOUT_VIDEO_O, {
                    status: RCLoggerStatus.FAILED,
                    code: '',
                    msg: `params error -> trackId: ${trackId}`
                }, {
                    logSource: engine.LogSource.RTC
                });
                return this;
            }
            if (!engine.isNumber(x) || !engine.isNumber(y)) {
                logger.error(`addCustomizeLayoutVideo failed -> some attrs of (x, y) is invalid: ${x}, ${y}`);
                engine.logger.error(RCLoggerTag.L_MCU_CONFIG_BUILDER_ADD_CUSTOMIZE_LAYOUT_VIDEO_O, {
                    status: RCLoggerStatus.FAILED,
                    code: '',
                    msg: `params error -> x: ${x}, y: ${y}`
                }, {
                    logSource: engine.LogSource.RTC
                });
                return this;
            }
            if ([width, height].some(value => !engine.isNumber(value) || value < 0)) {
                logger.error(`addCustomizeLayoutVideo failed -> some attrs of (width, height) is invalid: ${width}, ${height}`);
                engine.logger.error(RCLoggerTag.L_MCU_CONFIG_BUILDER_ADD_CUSTOMIZE_LAYOUT_VIDEO_O, {
                    status: RCLoggerStatus.FAILED,
                    code: '',
                    msg: `params error -> width: ${width}, height: ${height}`
                }, {
                    logSource: engine.LogSource.RTC
                });
                return this;
            }
            const { userId, tag, mediaType } = parseTrackId(trackId);
            if (mediaType !== exports.RCMediaType.VIDEO_ONLY) {
                logger.error(`addCustomizeLayoutVideo failed -> kind of trackId is not 'video': ${trackId}`);
                engine.logger.error(RCLoggerTag.L_MCU_CONFIG_BUILDER_ADD_CUSTOMIZE_LAYOUT_VIDEO_O, {
                    status: RCLoggerStatus.FAILED,
                    code: '',
                    msg: `params error -> trackId: ${trackId}的资源不是视频`
                }, {
                    logSource: engine.LogSource.RTC
                });
                return this;
            }
            const streamId = formatStreamId(userId, tag);
            const input = this._values.input || (this._values.input = {});
            const video = input.video || (input.video = []);
            // 重复配置项忽略
            if (video.some(item => item.height === height && item.width === width &&
                item.stream_id === streamId && item.user_id === userId &&
                item.x === x && item.y === y)) {
                engine.logger.warn(RCLoggerTag.L_MCU_CONFIG_BUILDER_ADD_CUSTOMIZE_LAYOUT_VIDEO_O, {
                    status: RCLoggerStatus.FAILED,
                    code: '',
                    msg: 'Duplicate configuration item ignored'
                }, {
                    logSource: engine.LogSource.RTC
                });
                return this;
            }
            video.push({
                user_id: userId,
                stream_id: streamId,
                x,
                y,
                width,
                height
            });
            engine.logger.info(RCLoggerTag.L_MCU_CONFIG_BUILDER_ADD_CUSTOMIZE_LAYOUT_VIDEO_O, {
                status: RCLoggerStatus.SUCCESSED,
                trackId,
                x,
                y,
                width,
                height
            }, {
                logSource: engine.LogSource.RTC
            });
            return this;
        }
        /**
         * 移除自定义布局中的视频流配置
         * @param trackId
         */
        removeCustomizeLayoutVideo(trackId) {
            logger.info(`clearCustomizeInputAudio -> trackId: ${trackId}`);
            if (!this._isValidTrackId(trackId)) {
                logger.error(`clearCustomizeInputAudio failed -> trackId is invalid: ${trackId}`);
                engine.logger.error(RCLoggerTag.L_MCU_CONFIG_BUILDER_REMOVE_CUSTOMIZE_LAYOUT_VIDEO_O, {
                    status: RCLoggerStatus.FAILED,
                    code: '',
                    msg: `params error -> trackId: ${trackId}`
                }, {
                    logSource: engine.LogSource.RTC
                });
                return this;
            }
            const { userId, tag, mediaType } = parseTrackId(trackId);
            if (mediaType !== exports.RCMediaType.VIDEO_ONLY) {
                logger.error(`clearCustomizeInputAudio failed -> kind of trackId is not 'video': ${trackId}`);
                engine.logger.error(RCLoggerTag.L_MCU_CONFIG_BUILDER_REMOVE_CUSTOMIZE_LAYOUT_VIDEO_O, {
                    status: RCLoggerStatus.FAILED,
                    code: '',
                    msg: `params error -> trackId: ${trackId}的资源不是视频`
                }, {
                    logSource: engine.LogSource.RTC
                });
                return this;
            }
            const streamId = formatStreamId(userId, tag);
            const input = this._values.input;
            if ((input === null || input === void 0 ? void 0 : input.video) && input.video.length > 0) {
                input.video = input.video.filter(item => item.stream_id === streamId);
            }
            engine.logger.info(RCLoggerTag.L_MCU_CONFIG_BUILDER_REMOVE_CUSTOMIZE_LAYOUT_VIDEO_O, {
                status: RCLoggerStatus.SUCCESSED,
                trackId
            }, {
                logSource: engine.LogSource.RTC
            });
            return this;
        }
        /**
         * 清除已添加的自定义布局中的视频流配置
         */
        clearCustomizeLayoutVideo() {
            logger.info('clearCustomizeLayoutVideo ->');
            const input = this._values.input;
            input === null || input === void 0 ? true : delete input.video;
            engine.logger.info(RCLoggerTag.L_MCU_CONFIG_BUILDER_CLEAR_CUSTOMIZE_LAYOUT_VIDEO_O, {
                status: RCLoggerStatus.SUCCESSED
            }, {
                logSource: engine.LogSource.RTC
            });
            return this;
        }
        /**
         * 覆盖设置合流媒体中的音频流
         * @param trackIds 音频流 trackId 数组，当数组长度为 0 时，则合流媒体中将无音频输出
         * @returns
         */
        setCustomizeInputAudio(trackIds) {
            logger.info(`setCustomizeInputAudio -> trackIds: ${trackIds.join(',')}`);
            if (trackIds.some(id => this._isValidTrackId(id))) {
                logger.warn(`setCustomizeInputAudio failed -> trackIds contain invalid items: $${trackIds.join(',')}`);
                engine.logger.error(RCLoggerTag.L_MCU_CONFIG_BUILDER_SET_CUSTOMIZE_INPUT_AUDIO_O, {
                    status: RCLoggerStatus.FAILED,
                    code: '',
                    msg: `params error -> trackIds: ${trackIds.join(',')}`
                }, {
                    logSource: engine.LogSource.RTC
                });
                return this;
            }
            const input = this._values.input || (this._values.input = {});
            input.audio = trackIds.map(id => {
                const { userId, tag } = parseTrackId(id);
                return {
                    stream_id: formatStreamId(userId, tag),
                    user_id: userId
                };
            });
            this._values.inputFilterMode = RCMixInputFilterMode.AUDIO_INPUT_VIDEO_ALL;
            engine.logger.info(RCLoggerTag.L_MCU_CONFIG_BUILDER_SET_CUSTOMIZE_INPUT_AUDIO_O, {
                status: RCLoggerStatus.SUCCESSED,
                trackIds
            }, {
                logSource: engine.LogSource.RTC
            });
            return this;
        }
        /**
         * 向既有的音频流合流配置中增加一道音频流
         * @param trackId 音频 trackId
         * @since v5.3.7
         */
        addCustomizeInputAudio(trackId) {
            logger.info(`addCustomizeInputAudio -> trackId: ${trackId}`);
            if (!this._isValidTrackId(trackId)) {
                logger.warn(`addCustomizeInputAudio failed -> trackId is invalid: ${trackId}`);
                engine.logger.error(RCLoggerTag.L_MCU_CONFIG_BUILDER_ADD_CUSTOMIZE_INPUT_AUDIO_O, {
                    status: RCLoggerStatus.FAILED,
                    code: '',
                    msg: `params error -> trackId: ${trackId}`
                }, {
                    logSource: engine.LogSource.RTC
                });
                return this;
            }
            const input = this._values.input || (this._values.input = {});
            const audio = input.audio || (input.audio = []);
            const { userId, tag } = parseTrackId(trackId);
            const streamId = formatStreamId(userId, tag);
            // 去重
            if (audio.some(item => item.stream_id === streamId && item.user_id === userId)) {
                engine.logger.warn(RCLoggerTag.L_MCU_CONFIG_BUILDER_ADD_CUSTOMIZE_INPUT_AUDIO_O, {
                    status: RCLoggerStatus.FAILED,
                    code: '',
                    msg: `trackId:${trackId} is exist`
                }, {
                    logSource: engine.LogSource.RTC
                });
                return this;
            }
            audio.push({ user_id: userId, stream_id: streamId });
            this._values.inputFilterMode = RCMixInputFilterMode.AUDIO_INPUT_VIDEO_ALL;
            engine.logger.info(RCLoggerTag.L_MCU_CONFIG_BUILDER_ADD_CUSTOMIZE_INPUT_AUDIO_O, {
                status: RCLoggerStatus.SUCCESSED,
                trackId
            }, {
                logSource: engine.LogSource.RTC
            });
            return this;
        }
        /**
         * 从既有的音频流合流配置中删除一道音频流
         * @param trackId 音频对应的 trackId
         * @since v5.3.7
         */
        removeCustomizeInputAudio(trackId) {
            logger.info(`removeCustomizeInputAudio -> trackId: ${trackId}`);
            /**
             * 校验参数
             */
            if (!this._isValidTrackId(trackId)) {
                logger.error(`removeCustomizeInputAudio failed -> trackId is invalid: ${trackId}`);
                engine.logger.error(RCLoggerTag.L_MCU_CONFIG_BUILDER_REMOVE_CUSTOMIZE_INPUT_AUDIO_O, {
                    status: RCLoggerStatus.FAILED,
                    code: '',
                    msg: `params error -> trackId: ${trackId}`
                }, {
                    logSource: engine.LogSource.RTC
                });
                return this;
            }
            const input = this._values.input;
            if (!(input === null || input === void 0 ? void 0 : input.audio) || input.audio.length === 0) {
                engine.logger.error(RCLoggerTag.L_MCU_CONFIG_BUILDER_REMOVE_CUSTOMIZE_INPUT_AUDIO_O, {
                    status: RCLoggerStatus.FAILED,
                    code: '',
                    msg: 'not audio'
                }, {
                    logSource: engine.LogSource.RTC
                });
                return this;
            }
            const { userId, tag } = parseTrackId(trackId);
            const streamId = formatStreamId(userId, tag);
            input.audio = input.audio.filter((item) => {
                return userId !== item.user_id || streamId !== item.stream_id;
            });
            engine.logger.info(RCLoggerTag.L_MCU_CONFIG_BUILDER_REMOVE_CUSTOMIZE_INPUT_AUDIO_O, {
                status: RCLoggerStatus.SUCCESSED,
                trackId
            }, {
                logSource: engine.LogSource.RTC
            });
            return this;
        }
        /**
         * 清除音频流合流配置，恢复房间内的全音频流合流输出
         * @since v5.3.7
         */
        clearCustomizeInputAudio() {
            logger.info('clearCustomizeInputAudio ->');
            const input = this._values.input;
            (input === null || input === void 0 ? void 0 : input.audio) && delete input.audio;
            // 清除后，按默认全部音频都被混入设置 inputFilterMode
            this._values.inputFilterMode = RCMixInputFilterMode.AUDIO_VIDEO_ALL;
            engine.logger.info(RCLoggerTag.L_MCU_CONFIG_BUILDER_CLEAR_CUSTOMIZE_INPUT_AUDIO_O, {
                status: RCLoggerStatus.SUCCESSED
            }, {
                logSource: engine.LogSource.RTC
            });
            return this;
        }
        /**
         * 给单道流添加水印
         */
        addPictureWaterMark(trackId, uri, x, y, w, h) {
            logger.info(`addPictureWaterMark -> trackId: ${trackId} uri: ${uri}, x: ${x}, y: ${y}, w: ${w}, h: ${h}`);
            if (!this._isValidTrackId(trackId)) {
                logger.warn(`addPictureWaterMark failed -> trackId is invalid: ${trackId}`);
                engine.logger.error(RCLoggerTag.L_MCU_CONFIG_BUILDER_ADD_SINGLE_WATER_MARK_O, {
                    status: RCLoggerStatus.FAILED, code: '', msg: `params error -> trackId: ${trackId}`
                }, {
                    logSource: engine.LogSource.RTC
                });
                return this;
            }
            if (!engine.isHttpUrl(uri)) {
                logger.error(`addPictureWaterMark failed -> uri is invalid: ${uri}`);
                engine.logger.error(RCLoggerTag.L_MCU_CONFIG_BUILDER_ADD_SINGLE_WATER_MARK_O, {
                    status: RCLoggerStatus.FAILED, code: '', msg: `params error -> uri: ${uri}`
                }, {
                    logSource: engine.LogSource.RTC
                });
                return this;
            }
            if ([x, y, w, h].some(item => !engine.isNumber(item) || item < 0 || item > 1)) {
                logger.error(`addPictureWaterMark failed -> some attrs of (x, y, w, h) is invalid: ${x}, ${y}, ${w}, ${h}`);
                engine.logger.error(RCLoggerTag.L_MCU_CONFIG_BUILDER_ADD_SINGLE_WATER_MARK_O, {
                    status: RCLoggerStatus.FAILED, code: '', msg: `params error -> x: ${x}, y: ${y}, w: ${w}, h: ${h}`
                }, {
                    logSource: engine.LogSource.RTC
                });
                return this;
            }
            const { userId, tag } = parseTrackId(trackId);
            const streamId = formatStreamId(userId, tag);
            const waterMark = this._values.waterMark || (this._values.waterMark = { enable: 'on', singleScreen: [] });
            const singleScreen = waterMark.singleScreen;
            logger.info(`addPictureWaterMark  singleScreen-> : ${JSON.stringify(singleScreen)}`);
            const target = singleScreen.filter(item => item.streamId === streamId)[0];
            logger.info(`addPictureWaterMark  target-> : ${target}`);
            target ? target.picture.push({ uri, w, h, x, y }) : singleScreen.push({ streamId, picture: [{ uri, w, h, x, y }] });
            logger.info(`addPictureWaterMark  singleScreen-> : ${JSON.stringify(singleScreen)}`);
            this._values.waterMark.singleScreen = singleScreen;
            logger.info(`addPictureWaterMark  this._values.waterMark.singleScreen-> : ${JSON.stringify(this._values.waterMark.singleScreen)}`);
            engine.logger.info(RCLoggerTag.L_MCU_CONFIG_BUILDER_SET_OUTPUT_BACKGROUND_PICTURE_O, {
                status: RCLoggerStatus.SUCCESSED, trackId, uri, x, y, w, h
            }, {
                logSource: engine.LogSource.RTC
            });
            return this;
        }
        /**
         * 删除所有水印
         */
        clearPictureWaterMark() {
            logger.info('clearOutputBackgroundPicture ->');
            const waterMark = this._values.waterMark || (this._values.waterMark = { enable: 'on', singleScreen: [] });
            waterMark.singleScreen = [];
            engine.logger.info(RCLoggerTag.L_MCU_CONFIG_BUILDER_CLEAR_OUTPUT_BACKGROUND_PICTURE_O, {
                status: RCLoggerStatus.SUCCESSED
            }, {
                logSource: engine.LogSource.RTC
            });
            return this;
        }
        /**
       * 移除对合流后的某个视频流中添加的指定水印图片
       * @param uri
       */
        removePictureWaterMark(trackId, uri) {
            if (!engine.notEmptyString(trackId) || !this._isValidTrackId(trackId)) {
                engine.logger.error(RCLoggerTag.L_MCU_CONFIG_BUILDER_REMOVE_SINGLE_WATER_MARK_O, {
                    status: RCLoggerStatus.FAILED, code: '', msg: `params error -> trackId: ${trackId}`
                }, {
                    logSource: engine.LogSource.RTC
                });
                return this;
            }
            const { userId, tag } = parseTrackId(trackId);
            const streamId = formatStreamId(userId, tag);
            const waterMark = this._values.waterMark || (this._values.waterMark = { enable: 'on', singleScreen: [] });
            const singleScreen = waterMark.singleScreen;
            singleScreen.forEach((item) => {
                if (item.streamId === streamId) {
                    item.picture = item.picture.filter(picture => picture.uri !== uri);
                }
            });
            engine.logger.info(RCLoggerTag.L_MCU_CONFIG_BUILDER_REMOVE_SINGLE_WATER_MARK_O, { status: RCLoggerStatus.SUCCESSED, trackId, uri }, {
                logSource: engine.LogSource.RTC
            });
            return this;
        }
        /**
         * 设置 MCU 混流配置
         * @param videoList 视频输入混流列表，为 null 代表视频全混流，为空集合代表视频全不混流，否则按照输入列表进行混流
         * @param audioList 音频输入混流列表，为 null 代表音频全混流，为空集合代表音频全不混流，否则按照输入列表进行混流
         */
        // setMixInputFilterByStreams (videoList?: ICustomInputVideo[], audioList?: string[]) : RCMCUConfigBuilder {
        //   // 校验参数
        //   // this._validateInputVideoParams()
        //   // 参数都无值时，视为全合入
        //   if (!videoList && !audioList) {
        //     this._values.inputFilterMode = RCMixInputFilterMode.AUDIO_VIDEO_ALL
        //     return this
        //   }
        //   // 参数都为 []，为都不合入
        //   if (!videoList?.length && !audioList?.length) {
        //     this._values.inputFilterMode = RCMixInputFilterMode.AUDIO_VIDEO_NO
        //     return this
        //   }
        //   // audioList 无值，videoList 为 [] 时
        //   if (!audioList && !videoList?.length) {
        //     this._values.inputFilterMode = RCMixInputFilterMode.AUDIO_ALL_VIDEO_NO
        //     return this
        //   }
        //   // videoList 无值，audioList 为 [] 时
        //   if (!videoList && !audioList?.length) {
        //     this._values.inputFilterMode = RCMixInputFilterMode.AUDIO_NO_VIDEO_ALL
        //     return this
        //   }
        //   // videoList 和 audioList 数组长度都不为空时
        //   if (videoList?.length && audioList?.length) {
        //     this._values.inputFilterMode = RCMixInputFilterMode.AUDIO_VIDEO_INPUT
        //   }
        //   // videoList 数组长度不为空，audioList 不传时
        //   if (videoList?.length && !audioList) {
        //     this._values.inputFilterMode = RCMixInputFilterMode.AUDIO_ALL_VIDEO_INPUT
        //   }
        //   // videoList 数组长度不为空，audioList 为 []
        //   if (videoList?.length && !audioList?.length) {
        //     this._values.inputFilterMode = RCMixInputFilterMode.AUDIO_NO_VIDEO_INPUT
        //   }
        //   // audioList 数组长度不为空，videoList 不传时
        //   if (audioList?.length && !videoList) {
        //     this._values.inputFilterMode = RCMixInputFilterMode.AUDIO_INPUT_VIDEO_ALL
        //   }
        //   // audioList 数组长度不为空，videoList 为 []
        //   if (audioList?.length && !videoList?.length) {
        //     this._values.inputFilterMode = RCMixInputFilterMode.AUDIO_INPUT_VIDEO_NO
        //   }
        //   // 设置 input 中的 video、audio
        //   videoList?.forEach((item) => {
        //     const { trackId, x, y, width, height } = item
        //     this.addCustomizeLayoutVideo(trackId, x, y, width, height)
        //   })
        //   audioList?.length && this.setCustomInputAudio(audioList)
        //   return this
        // }
        /**
         * 设置 MCU 混流配置
         * @param roomIds 混流房间列表
         * @param mediaType 混流媒体类型
         * @param isAppend 是否为增量混流
         * * true 为增量混流
         * * false 为全量覆盖混流
         */
        // setMixInputFilterByRoomIds (roomIds: string[], mediaType: RCMediaType, isAppend: boolean) : RCMCUConfigBuilder {
        //   this._values.mixRooms = roomIds
        //   switch (mediaType) {
        //     case RCMediaType.AUDIO_VIDEO:
        //       this._values.inputFilterMode = isAppend ? RCMixInputFilterMode.ROOM_AUDIO_VIDEO_APPEND : RCMixInputFilterMode.ROOM_AUDIO_VIDEO_NOT_APPEND
        //       break
        //     case RCMediaType.AUDIO_ONLY:
        //       this._values.inputFilterMode = isAppend ? RCMixInputFilterMode.ROOM_AUDIO_APPEND : RCMixInputFilterMode.ROOM_AUDIO_NOT_APPEND
        //       break
        //     case RCMediaType.VIDEO_ONLY:
        //       this._values.inputFilterMode = isAppend ? RCMixInputFilterMode.ROOM_VIDEO_APPEND : RCMixInputFilterMode.ROOM_VIDEO_NOT_APPEND
        //       break
        //   }
        //   return this
        // }
        /**
         * 重置所有合流配置
         * @since v5.3.7
         * @returns
         */
        reset() {
            logger.info('MCUConfigBuilder.reset ->');
            this._values = createMCUConfig();
            engine.logger.info(RCLoggerTag.L_MCU_CONFIG_BUILDER_RESET_O, {
                status: RCLoggerStatus.SUCCESSED
            }, {
                logSource: engine.LogSource.RTC
            });
            return this;
        }
        /**
         * 使已修改的配置生效，在调用该方法前，所有数据只会对本地配置进行修改，不会产生实际效果
         * @param reset 调用完成后清空当前配置记录，默认为 `true`（v5.3.7 版本开始启用）
         * @returns
         */
        async flush(reset = true) {
            const config = JSON.parse(JSON.stringify(this._values));
            // const { code } = await this._onFlush(config)
            const { code } = await this._invoker.push(new MCUConfigFlushCommand(config, this._values));
            if (reset)
                this._values = createMCUConfig();
            engine.logger.info(RCLoggerTag.L_MCU_CONFIG_BUILDER_FLUSH_O, {
                status: RCLoggerStatus.SUCCESSED
            }, {
                logSource: engine.LogSource.RTC
            });
            return { code };
        }
        __innerGetValues() {
            return JSON.parse(JSON.stringify(this._values));
        }
    }

    /**
     * 直播间类型
     */
    exports.RCLivingType = void 0;
    (function (RCLivingType) {
        /**
         * 音视频直播
         */
        RCLivingType[RCLivingType["VIDEO"] = 0] = "VIDEO";
        /**
         * 音频直播
         */
        RCLivingType[RCLivingType["AUDIO"] = 1] = "AUDIO";
    })(exports.RCLivingType || (exports.RCLivingType = {}));

    var RCInnerCDNPushMode;
    (function (RCInnerCDNPushMode) {
        // 自动模式
        RCInnerCDNPushMode[RCInnerCDNPushMode["AUTOMATIC"] = 0] = "AUTOMATIC";
        // 手动模式
        RCInnerCDNPushMode[RCInnerCDNPushMode["MANUAL"] = 1] = "MANUAL";
    })(RCInnerCDNPushMode || (RCInnerCDNPushMode = {}));

    class ExchangeWithPushOtherRoomCommand extends BaseCommand {
        constructor(roomId, hooks, roomPKHandler) {
            super();
            this.roomId = roomId;
            this.hooks = hooks;
            this.roomPKHandler = roomPKHandler;
        }
        /**
         * 携带 pushOtherRooms 与 mediaServer 重新交互
         */
        async _exchangeWithPushOtherRoom(store, invoker) {
            /**
             * 如果己方未发布过资源，无需发请求
             */
            const pubTracks = store.getLocalTracks();
            if (!pubTracks.length) {
                return;
            }
            const mutilPeerCList = Object.values(store.peerMgr.getMutilPeerCData());
            const pcNameList = Object.keys(store.peerMgr.getMutilPeerCData());
            for (let index = 0; index < mutilPeerCList.length; index++) {
                const { pc, isPub } = mutilPeerCList[index];
                const subscribeList = (isPub && store.useMutilPeerC) ? [] : store.getSubscribedList();
                const reqBody = await createExchangeParams(subscribeList, false, pc, store);
                const { pushOtherRooms, headers } = this.hooks(pcNameList[index]);
                reqBody.pushOtherRooms = pushOtherRooms;
                // const resp = await this._exchangeHandle(reqBody, pcNameList[index])
                const resp = await new ExchangeCommand(headers, reqBody).execute(store, invoker);
                if (resp.code !== exports.RCRTCCode.SUCCESS) {
                    logger.error(`exchange with pushOtherRoom failed: ${resp.code}`);
                    return;
                }
                const { sdp: answer, resultCode } = resp.data;
                if (resultCode !== exports.RCRTCCode.SUCCESS) {
                    logger.error(`exchange with pushOtherRoom failed: ${resultCode}`);
                    return;
                }
                pc.setRemoteAnswer(answer.sdp);
            }
        }
        async execute(store, invoker) {
            const { roomId } = this;
            engine.logger.info(RCLoggerTag.L_LIVING_ROOM_JOINED_PK_ROOM_T, {
                roomId,
                userId: store.crtUserId
            }, {
                logSource: engine.LogSource.RTC
            });
            // 离开 PK 房间后，如果参与过连麦，pushOtherRooms 需去掉退出的连麦房间配置，重新和 mediaServer 交互
            if (!this.roomPKHandler) {
                engine.logger.error(RCLoggerTag.L_LIVING_ROOM_JOINED_PK_ROOM_R, {
                    status: RCLoggerStatus.FAILED,
                    code: '',
                    msg: '_roomPKHandler not exist'
                }, {
                    logSource: engine.LogSource.RTC
                });
                return;
            }
            const PKInfo = this.roomPKHandler.getPKInfo(roomId);
            if (!PKInfo) {
                logger.warn(`exchange to update pushOtherRoom cancel, pkInfo lost -> roomId: ${roomId}`);
                engine.logger.error(RCLoggerTag.L_LIVING_ROOM_JOINED_PK_ROOM_R, {
                    status: RCLoggerStatus.FAILED,
                    code: '',
                    msg: 'PKInfo not exist'
                }, {
                    logSource: engine.LogSource.RTC
                });
                return;
            }
            await this._exchangeWithPushOtherRoom(store, invoker);
            engine.logger.info(RCLoggerTag.L_LIVING_ROOM_JOINED_PK_ROOM_T, {
                status: RCLoggerStatus.SUCCESSED,
                roomId,
                userId: store.crtUserId,
                PKInfo
            }, {
                logSource: engine.LogSource.RTC
            });
        }
    }

    class LeaveOtherRoomCommand extends BaseCommand {
        constructor(pkHandler, room, _PKInfo, hooks, _joinedPKRooms, isQuitPK) {
            super();
            this.pkHandler = pkHandler;
            this.room = room;
            this._PKInfo = _PKInfo;
            this.hooks = hooks;
            this._joinedPKRooms = _joinedPKRooms;
            this.isQuitPK = isQuitPK;
        }
        get kind() {
            return RCCommandKind.LeaveRoom;
        }
        /**
       * 结束跨房间连麦
       * @param roomId 需要结束连麦的房间 roomId
       */
        async quitRoomPK(roomId, store) {
            if (!this._PKInfo[roomId]) {
                return;
            }
            const { inviterRoomId, inviteeRoomId, inviterUserId, inviteSessionId } = this._PKInfo[roomId];
            const content = {
                inviteeRoomId,
                inviterRoomId,
                userId: store.crtUserId
            };
            const params = {
                roomId: store.roomId,
                endRoomId: roomId,
                sessionId: inviteSessionId,
                content: JSON.stringify(content),
                keys: [`${inviterRoomId}|${inviterUserId}`]
            };
            logger.info(`quitRoomPK -> params: ${JSON.stringify(params)}`);
            const code = await store.context.endRoomPK(params);
            if (code !== engine.ErrorCode.SUCCESS) {
                logger.error(`quitRoomPK failed: ${code}`);
                return { code: exports.RCRTCCode.SIGNAL_ERROR };
            }
            logger.info('quitRoomPK success');
            delete this._PKInfo[roomId];
            return { code: exports.RCRTCCode.SUCCESS };
        }
        async execute(store, invoker) {
            const { room, isQuitPK } = this;
            const roomId = room.getRoomId();
            logger.info(`leavePKRoom -> userId: ${store.crtUserId} , roomId: ${roomId}`);
            engine.logger.info(RCLoggerTag.L_LIVING_ROOM_LEAVE_PK_ROOM_T, {
                roomId,
                userId: store.crtUserId,
                isQuitPK
            }, {
                logSource: engine.LogSource.RTC
            });
            await room.__destroy(true);
            // 回调主直播房间离开 PK 房间
            delete this._joinedPKRooms[roomId];
            await new ExchangeWithPushOtherRoomCommand(roomId, this.hooks, this.pkHandler).execute(store, invoker);
            // isQuitPK 为 true 时，结束连麦
            isQuitPK && this.quitRoomPK(roomId, store);
            engine.logger.info(RCLoggerTag.L_LIVING_ROOM_LEAVE_PK_ROOM_R, {
                status: RCLoggerStatus.SUCCESSED,
                roomId,
                userId: store.crtUserId,
                isQuitPK
            }, {
                logSource: engine.LogSource.RTC
            });
            return { code: exports.RCRTCCode.SUCCESS };
        }
    }

    // @since version 5.3.0
    class RCLivingPKHandler {
        constructor(_invoker, _PKInfo, _hooks, _context, 
        // private readonly _proxy: ContextProxy,
        _runtime, _service, _initOptions, 
        /**
         * 主直播房间
         */
        _mainLivingRoom, _registerPKMsgListener, 
        /**
         * 加入 PK 房间回调
         */
        _onJoinedPKRoom, _clientSessionId) {
            this._invoker = _invoker;
            this._PKInfo = _PKInfo;
            this._hooks = _hooks;
            this._context = _context;
            this._runtime = _runtime;
            this._service = _service;
            this._initOptions = _initOptions;
            this._mainLivingRoom = _mainLivingRoom;
            this._registerPKMsgListener = _registerPKMsgListener;
            this._onJoinedPKRoom = _onJoinedPKRoom;
            this._clientSessionId = _clientSessionId;
            /**
             * PK 邀请超时时间，默认 30s
             */
            this._inviteTimeout = 30;
            this._appListener = null;
            /**
             * 跨房间连麦加入的 PK 房间
             */
            this._joinedPKRooms = {};
            this._registerPKMsgListener(this._onRecvPKMsg.bind(this));
            this._mainRoomId = this._mainLivingRoom.getRoomId();
        }
        _callAppListener(eventType, ...attrs) {
            var _a;
            logger.info(`${eventType} callback ->`, ...attrs);
            const handle = (_a = this._appListener) === null || _a === void 0 ? void 0 : _a[eventType];
            if (!handle) {
                return;
            }
            try {
                handle(...attrs);
            }
            catch (error) {
                logger.error(error);
            }
        }
        /**
         * 收到连麦邀请
         */
        _onInvite(content) {
            const inviteInfo = (content.inviteInfo || {});
            const { inviterRoomId, inviterUserId, extra } = inviteInfo;
            const info = {
                inviterRoomId,
                inviterUserId,
                extra
            };
            this._PKInfo[inviterRoomId] = inviteInfo;
            this._callAppListener('onRequestJoinOtherRoom', info);
        }
        /**
         * 收到取消连麦
         */
        _onCancelInvite(content) {
            const { inviterRoomId, inviterUserId, extra } = (content.inviteInfo || {});
            const cancelInfo = {
                inviterRoomId,
                inviterUserId,
                extra
            };
            delete this._PKInfo[inviterRoomId];
            this._callAppListener('onCancelRequestOtherRoom', cancelInfo);
        }
        _onInviteTimeout(content) {
            // 因服务计时不准，暂不处理。（与移动端一致）
        }
        /**
         * 收到响应连麦
         */
        _onInviteAnswer(content) {
            const { answerCode, inviteContent } = content;
            const { inviteSessionId, inviterUserId, inviterRoomId, inviteeUserId, inviterUserAutoMix, inviteeUserAutoMix, inviteeRoomId, extra } = inviteContent;
            const answerInfo = {
                agree: answerCode === 1,
                inviterRoomId,
                inviterUserId,
                inviteeRoomId,
                inviteeUserId,
                extra
            };
            /**
             * 收到非本人发起的邀请连麦时，需新组装 PKInfo
             */
            this._PKInfo[inviteeRoomId] = this._PKInfo[inviteeRoomId] || {
                inviteSessionId,
                inviterRoomId,
                inviterUserId,
                inviterUserAutoMix,
                inviteeRoomId
            };
            this._PKInfo[inviteeRoomId].inviteeUserAutoMix = inviteeUserAutoMix;
            this._callAppListener('onResponseJoinOtherRoom', answerInfo);
        }
        createLeaveOtherRoomCommand(room, isQuitPK) {
            return new LeaveOtherRoomCommand(this, room, this._PKInfo, this._hooks, this._joinedPKRooms, isQuitPK);
        }
        /**
         * 收到连麦结束
         */
        async _onPKEnd(content) {
            const { inviteeRoomId, inviterRoomId, userId } = content.inviteInfo;
            const roomId = inviterRoomId === this._mainRoomId ? inviteeRoomId : inviterRoomId;
            const endInfo = {
                endRoomId: roomId,
                endUserId: userId
            };
            // 兼容先退出房间，再收到 pk 结束的情况
            const room = this._joinedPKRooms[roomId];
            room && await this._invoker.push(this.createLeaveOtherRoomCommand(room));
            delete this._PKInfo[roomId];
            this._callAppListener('onFinishOtherRoom', endInfo);
        }
        /**
         * 处理跨房间连麦相关消息
         */
        _onRecvPKMsg(msg) {
            const { targetId: roomId, content, messageType } = msg;
            switch (messageType) {
                case RCRTCMessageType.PK_INVITE:
                    this._onInvite(content);
                    break;
                case RCRTCMessageType.PK_CANCEL_INVITE:
                    this._onCancelInvite(content);
                    break;
                case RCRTCMessageType.PK_INVITE_TIMEOUT:
                    this._onInviteTimeout(content);
                    break;
                case RCRTCMessageType.PK_INVITE_ANSWER:
                    this._onInviteAnswer(content);
                    break;
                case RCRTCMessageType.PK_END:
                    this._onPKEnd(content);
                    break;
            }
        }
        /**
         * 注册跨房间连麦监听事件
         */
        registerRoomPKEventListener(listener) {
            engine.logger.info(RCLoggerTag.L_LIVING_PK_HANDLER_REGISTER_ROOM_PK_EVENT_LISTENER_O, {
                status: RCLoggerStatus.SUCCESSED,
                listener: listener && Object.keys(listener)
            }, {
                logSource: engine.LogSource.RTC
            });
            this._appListener = listener;
        }
        /**
         * 发起跨房间连麦请求
         * @param inviteeRoomId 被邀请者所处的房间 roomId
         * @param inviteeUserId 被邀请者 userId
         * @param options.autoMix 是否要把邀请者发布的资源，合并到被邀请者房间内的 MCU 流中
         * @param options.extra 拓展字段，可随邀请连麦消息透传给被邀请者
         */
        async requestJoinOtherRoom(inviteeRoomId, inviteeUserId, options) {
            engine.logger.info(RCLoggerTag.L_LIVING_PK_HANDLER_REQUEST_JOIN_OTHER_ROOM_T, {
                inviteeRoomId,
                inviteeUserId,
                options
            }, {
                logSource: engine.LogSource.RTC
            });
            if (!(engine.validate('inviteeRoomId', inviteeRoomId, engine.notEmptyString, true) &&
                engine.validate('inviteeUserId', inviteeUserId, engine.notEmptyString, true))) {
                engine.logger.error(RCLoggerTag.L_LIVING_PK_HANDLER_REQUEST_JOIN_OTHER_ROOM_R, {
                    status: RCLoggerStatus.FAILED,
                    code: exports.RCRTCCode.PARAMS_ERROR,
                    msg: 'params error -> inviteeRoomId 或 inviteeUserId'
                }, {
                    logSource: engine.LogSource.RTC
                });
                return { code: exports.RCRTCCode.PARAMS_ERROR };
            }
            logger.info(`requestRoomPK -> inviteeRoomId: ${inviteeRoomId}; inviteeUserId: ${inviteeUserId}; options: ${JSON.stringify(options || {})}`);
            const inviteSessionId = getUUID();
            const autoMix = engine.isBoolean(options === null || options === void 0 ? void 0 : options.autoMix) ? options === null || options === void 0 ? void 0 : options.autoMix : true;
            const inviteInfo = {
                inviteSessionId,
                inviterRoomId: this._mainRoomId,
                inviterUserId: this._context.getCurrentId(),
                inviterUserAutoMix: autoMix,
                inviteeRoomId,
                inviteeUserId,
                inviteeTimeoutTime: this._inviteTimeout,
                extra: (options === null || options === void 0 ? void 0 : options.extra) || ''
            };
            const params = {
                roomId: this._mainRoomId,
                invitedRoomId: inviteeRoomId,
                invitedUserId: inviteeUserId,
                inviteTimeout: this._inviteTimeout,
                inviteInfo: JSON.stringify(inviteInfo),
                inviteSessionId
            };
            logger.info(`requestRoomPK -> params: ${JSON.stringify(params)}`);
            const code = await this._context.requestRoomPK(params);
            if (code !== engine.ErrorCode.SUCCESS) {
                logger.error(`requestRoomPK failed: ${code}`);
                engine.logger.error(RCLoggerTag.L_LIVING_PK_HANDLER_REQUEST_JOIN_OTHER_ROOM_R, {
                    status: RCLoggerStatus.FAILED,
                    code,
                    msg: ''
                }, {
                    logSource: engine.LogSource.RTC
                });
                return { code };
            }
            logger.info('requestRoomPK success');
            this._PKInfo[inviteeRoomId] = {
                inviteSessionId,
                inviterRoomId: this._mainRoomId,
                inviterUserId: this._context.getCurrentId(),
                inviterUserAutoMix: autoMix,
                inviteeRoomId
            };
            engine.logger.info(RCLoggerTag.L_LIVING_PK_HANDLER_REQUEST_JOIN_OTHER_ROOM_R, {
                inviteeRoomId,
                inviteeUserId,
                options
            }, {
                logSource: engine.LogSource.RTC
            });
            return { code: exports.RCRTCCode.SUCCESS };
        }
        /**
         * 取消跨房间连麦请求
         * @param inviteeRoomId 被邀请者所处的房间 roomId
         * @param inviteeUserId 被邀请者 userId
         * @param extra 附加信息，可随取消邀请连麦消息透传给被邀请者
         */
        async cancelRequestJoinOtherRoom(inviteeRoomId, inviteeUserId, extra) {
            engine.logger.info(RCLoggerTag.L_LIVING_PK_HANDLER_CANCEL_REQUEST_JOIN_OTHER_ROOM_T, {
                inviteeRoomId,
                inviteeUserId,
                extra,
                userId: this._context.getCurrentId(),
                roomId: this._mainRoomId
            }, {
                logSource: engine.LogSource.RTC
            });
            if (!(engine.validate('inviteeRoomId', inviteeRoomId, engine.notEmptyString, true) &&
                engine.validate('inviteeUserId', inviteeUserId, engine.notEmptyString, true))) {
                engine.logger.error(RCLoggerTag.L_LIVING_PK_HANDLER_CANCEL_REQUEST_JOIN_OTHER_ROOM_R, {
                    status: RCLoggerStatus.FAILED,
                    code: exports.RCRTCCode.PARAMS_ERROR,
                    msg: 'params error -> inviteeRoomId or inviteeUserId'
                }, {
                    logSource: engine.LogSource.RTC
                });
                return { code: exports.RCRTCCode.PARAMS_ERROR };
            }
            if (!this._PKInfo[inviteeRoomId]) {
                logger.error(`The request to connect with ${inviteeUserId} user in room ${inviteeRoomId} is not initiated`);
                engine.logger.error(RCLoggerTag.L_LIVING_PK_HANDLER_CANCEL_REQUEST_JOIN_OTHER_ROOM_R, {
                    status: RCLoggerStatus.FAILED,
                    code: exports.RCRTCCode.PARAMS_ERROR,
                    msg: `The request to connect with ${inviteeUserId} user in room ${inviteeRoomId} is not initiated`
                }, {
                    logSource: engine.LogSource.RTC
                });
                return { code: exports.RCRTCCode.PARAMS_ERROR };
            }
            logger.info(`canceRequestJoinPK -> inviteeRoomId: ${inviteeRoomId}; inviteeUserId: ${inviteeUserId}; extra: ${extra}`);
            const inviteInfo = {
                inviterRoomId: this._mainRoomId,
                inviterUserId: this._context.getCurrentId(),
                inviteeRoomId,
                inviteeUserId,
                extra: extra || ''
            };
            const params = {
                roomId: this._mainRoomId,
                invitedRoomId: inviteeRoomId,
                invitedUserId: inviteeUserId,
                inviteSessionId: this._PKInfo[inviteeRoomId].inviteSessionId,
                inviteInfo: JSON.stringify(inviteInfo)
            };
            logger.info(`canceRequestJoinPK -> params: ${JSON.stringify(params)}`);
            const code = await this._context.cancelRoomPK(params);
            if (code !== engine.ErrorCode.SUCCESS) {
                logger.error(`canceRequestJoinPK failed: ${code}`);
                engine.logger.error(RCLoggerTag.L_LIVING_PK_HANDLER_CANCEL_REQUEST_JOIN_OTHER_ROOM_R, {
                    status: RCLoggerStatus.FAILED,
                    code,
                    msg: `The request to connect with ${inviteeUserId} user in room ${inviteeRoomId} is not initiated`
                }, {
                    logSource: engine.LogSource.RTC
                });
                return { code };
            }
            logger.info('canceRequestJoinPK success');
            engine.logger.info(RCLoggerTag.L_LIVING_PK_HANDLER_CANCEL_REQUEST_JOIN_OTHER_ROOM_R, {
                status: RCLoggerStatus.SUCCESSED,
                inviteeRoomId,
                inviteeUserId,
                extra
            }, {
                logSource: engine.LogSource.RTC
            });
            delete this._PKInfo[inviteeRoomId];
            return { code: exports.RCRTCCode.SUCCESS };
        }
        /**
         * 响应跨房间连麦请求
         * @param inviterRoomId 邀请者所处的房间 roomId
         * @param inviterUserId 邀请者 userId
         * @param agree 是否同意连麦
         * @param options.autoMix 是否要把被邀请者发布的资源，合并到邀请者房间内的 MCU 流中
         * @param options.extra 附加信息，可随响应连麦消息透传给邀请者
         */
        async responseJoinOtherRoom(inviterRoomId, inviterUserId, agree, options) {
            engine.logger.info(RCLoggerTag.L_LIVING_PK_HANDLER_RESPONSE_JOIN_OTHER_ROOM_T, {
                inviterRoomId,
                inviterUserId,
                agree,
                options,
                userId: this._context.getCurrentId(),
                roomId: this._mainRoomId
            }, {
                logSource: engine.LogSource.RTC
            });
            if (!(engine.validate('inviterRoomId', inviterRoomId, engine.notEmptyString, true) &&
                engine.validate('inviterUserId', inviterUserId, engine.notEmptyString, true))) {
                engine.logger.error(RCLoggerTag.L_LIVING_PK_HANDLER_RESPONSE_JOIN_OTHER_ROOM_R, {
                    status: RCLoggerStatus.FAILED,
                    code: exports.RCRTCCode.PARAMS_ERROR,
                    msg: 'params error -> inviterRoomId or inviterUserId'
                }, {
                    logSource: engine.LogSource.RTC
                });
                return { code: exports.RCRTCCode.PARAMS_ERROR };
            }
            if (!this._PKInfo[inviterRoomId]) {
                logger.error(`User ${inviterUserId} in room ${inviterRoomId} did not send a request for connection`);
                engine.logger.error(RCLoggerTag.L_LIVING_PK_HANDLER_RESPONSE_JOIN_OTHER_ROOM_R, {
                    status: RCLoggerStatus.FAILED,
                    code: exports.RCRTCCode.PARAMS_ERROR,
                    msg: `User ${inviterUserId} in room ${inviterRoomId} did not send a request for connection`
                }, {
                    logSource: engine.LogSource.RTC
                });
                return { code: exports.RCRTCCode.PARAMS_ERROR };
            }
            logger.info(`responseRoomPK -> inviterRoomId: ${inviterRoomId}; inviterUserId: ${inviterUserId}; agree: ${agree}; options: ${JSON.stringify(options || {})}`);
            const { inviteSessionId, inviterUserAutoMix } = this._PKInfo[inviterRoomId];
            const autoMix = engine.isBoolean(options === null || options === void 0 ? void 0 : options.autoMix) ? options === null || options === void 0 ? void 0 : options.autoMix : true;
            const value = {
                inviteSessionId,
                inviterRoomId,
                inviterUserId,
                inviterUserAutoMix,
                inviteeRoomId: this._mainRoomId,
                inviteeUserId: this._context.getCurrentId(),
                inviteeUserAutoMix: autoMix
            };
            const multiRoomVal = Object.assign(value, { inviterUserAutoMix });
            const content = agree ? Object.assign(value, {
                MultiRoomKey: `${inviterRoomId}|${this._mainRoomId}`,
                MultiRoomValue: JSON.stringify(multiRoomVal)
            }) : value;
            !engine.isUndefined(options === null || options === void 0 ? void 0 : options.extra) && Object.assign(content, { extra: options.extra });
            const params = {
                agree,
                roomId: this._mainRoomId,
                inviteSessionId,
                inviteRoomId: inviterRoomId,
                inviteUserId: inviterUserId,
                content: JSON.stringify(content),
                key: `${inviterRoomId}|${this._mainRoomId}`,
                value: JSON.stringify(value)
            };
            logger.info(`responseRoomPK -> params: ${JSON.stringify(params)}`);
            const code = await this._context.responseRoomPK(params);
            if (code !== engine.ErrorCode.SUCCESS) {
                logger.error(`responseRoomPK failed: ${code}`);
                engine.logger.error(RCLoggerTag.L_LIVING_PK_HANDLER_RESPONSE_JOIN_OTHER_ROOM_R, {
                    status: RCLoggerStatus.FAILED,
                    code,
                    msg: ''
                }, {
                    logSource: engine.LogSource.RTC
                });
                return { code };
            }
            logger.info('responseRoomPK success');
            engine.logger.info(RCLoggerTag.L_LIVING_PK_HANDLER_RESPONSE_JOIN_OTHER_ROOM_R, {
                status: RCLoggerStatus.SUCCESSED,
                inviterRoomId,
                inviterUserId,
                agree,
                options,
                userId: this._context.getCurrentId(),
                roomId: this._mainRoomId
            }, {
                logSource: engine.LogSource.RTC
            });
            this._PKInfo[inviterRoomId].inviteeUserAutoMix = autoMix;
            return { code: exports.RCRTCCode.SUCCESS };
        }
        /**
         * 加入副直播房间
         * @roomId 副房间的 roomId
         */
        async joinOtherRoom(roomId) {
            engine.logger.info(RCLoggerTag.L_LIVING_PK_HANDLER_JOIN_OTHER_ROOM_T, {
                roomId,
                userId: this._context.getCurrentId()
            }, {
                logSource: engine.LogSource.RTC
            });
            if (!(engine.validate('roomId', roomId, engine.notEmptyString, true))) {
                engine.logger.error(RCLoggerTag.L_LIVING_PK_HANDLER_JOIN_OTHER_ROOM_R, {
                    status: RCLoggerStatus.FAILED,
                    code: exports.RCRTCCode.PARAMS_ERROR,
                    msg: 'params error -> roomId'
                }, {
                    logSource: engine.LogSource.RTC
                });
                return { code: exports.RCRTCCode.PARAMS_ERROR };
            }
            if (this._context.getConnectionStatus() !== engine.ConnectionStatus.CONNECTED) {
                engine.logger.error(RCLoggerTag.L_LIVING_PK_HANDLER_JOIN_OTHER_ROOM_R, {
                    status: RCLoggerStatus.FAILED,
                    code: exports.RCRTCCode.SIGNAL_DISCONNECTED,
                    msg: 'IM disconnected'
                }, {
                    logSource: engine.LogSource.RTC
                });
                return { code: exports.RCRTCCode.SIGNAL_DISCONNECTED };
            }
            logger.info(`JoinPKRoom, roomId: ${roomId}`);
            if (this._joinedPKRooms[roomId]) {
                engine.logger.warn(RCLoggerTag.L_LIVING_PK_HANDLER_JOIN_OTHER_ROOM_R, {
                    status: RCLoggerStatus.FAILED,
                    code: exports.RCRTCCode.REPERT_JOIN_ROOM,
                    msg: 'Join the room repeatedly'
                }, {
                    logSource: engine.LogSource.RTC
                });
                return { code: exports.RCRTCCode.REPERT_JOIN_ROOM };
            }
            const livingType = exports.RCLivingType.VIDEO; // signal 不处理 livingType 故写死 RCLivingType.VIDEO
            // 加入副房间时，携带主房间 Id，用于在房间内区分人员身份
            const innerUserData = {
                extra: `{"roomId": "${this._mainRoomId}"}`
            };
            const room = new RCLivingRoom(this._context, this._runtime, roomId, this._service, this._initOptions, livingType, false, false, false, this._clientSessionId);
            const { code, data } = await room.__innerInit(RTCMode.LIVE, undefined, livingType, innerUserData);
            if (code !== exports.RCRTCCode.SUCCESS) {
                logger.error(`JoinPKRoom failed -> code: ${code}`);
                engine.logger.error(RCLoggerTag.L_LIVING_PK_HANDLER_JOIN_OTHER_ROOM_R, {
                    status: RCLoggerStatus.FAILED,
                    code,
                    msg: ''
                }, {
                    logSource: engine.LogSource.RTC
                });
                return { code: code };
            }
            logger.info(`JoinPKRoom success -> userId: ${this._context.getCurrentId()}, roomId: ${roomId}, data: ${JSON.stringify(data)}`);
            // 回调主直播房间，已加入 PK 房间
            this._joinedPKRooms[roomId] = room;
            await this._onJoinedPKRoom(roomId, room);
            engine.logger.info(RCLoggerTag.L_LIVING_PK_HANDLER_JOIN_OTHER_ROOM_R, {
                status: RCLoggerStatus.SUCCESSED,
                roomId,
                userId: this._context.getCurrentId()
            }, {
                logSource: engine.LogSource.RTC
            });
            return { room, code: exports.RCRTCCode.SUCCESS, userIds: room.getRemoteUserIds(), tracks: room.getRemoteTracks() };
        }
        /**
         * 退出副房间
         * @param room 要退出的副房间的 room 实例
         * @param isQuitPK 是否要结束连麦
         */
        async leaveOtherRoom(room, isQuitPK) {
            return this._invoker.push(this.createLeaveOtherRoomCommand(room, isQuitPK));
        }
        /**
         * 获取连麦信息
         * @param roomId 连麦房间的 roomId
         */
        getPKInfo(roomId) {
            return this._PKInfo[roomId];
        }
        /**
         * 获取所有连麦信息
         */
        getAllPKInfo() {
            return this._PKInfo;
        }
        /**
         * 获取已加入的副房间
         */
        getJoinedPKRooms() {
            return this._joinedPKRooms;
        }
    }

    var RCInnerCDNModel;
    (function (RCInnerCDNModel) {
        // 开启
        RCInnerCDNModel[RCInnerCDNModel["OPEN"] = 1] = "OPEN";
        // 停用
        RCInnerCDNModel[RCInnerCDNModel["STOP"] = 2] = "STOP";
    })(RCInnerCDNModel || (RCInnerCDNModel = {}));

    class EnableInnerCDNCommand extends BaseCommand {
        constructor(cdnValues, enable) {
            super();
            this.cdnValues = cdnValues;
            this.enable = enable;
        }
        async execute(store, invoker) {
            const { enable } = this;
            engine.logger.info(RCLoggerTag.L_LIVING_ROOM_ENABLE_INNER_CDN_T, {
                roomId: store.roomId,
                enable
            }, {
                logSource: engine.LogSource.RTC
            });
            /**
             * 副房间不可调用
             */
            if (!store.isMainRoom) {
                logger.error('the `enableInnerCDN` is disabled in PK room');
                engine.logger.error(RCLoggerTag.L_LIVING_ROOM_ENABLE_INNER_CDN_R, {
                    status: RCLoggerStatus.FAILED,
                    code: exports.RCRTCCode.THE_FUNCTION_IS_DISABLED_IN_PKROOM,
                    msg: 'method not available in room'
                }, {
                    logSource: engine.LogSource.RTC
                });
                return { code: exports.RCRTCCode.THE_FUNCTION_IS_DISABLED_IN_PKROOM };
            }
            if (!engine.isBoolean(enable)) {
                logger.error('`enable` is invalid');
                engine.logger.error(RCLoggerTag.L_LIVING_ROOM_ENABLE_INNER_CDN_R, {
                    status: RCLoggerStatus.FAILED,
                    code: exports.RCRTCCode.PARAMS_ERROR,
                    msg: 'params error -> enable'
                }, {
                    logSource: engine.LogSource.RTC
                });
                return { code: exports.RCRTCCode.PARAMS_ERROR };
            }
            store.setCDNEnabel(enable);
            const params = {
                version: 2,
                output: {
                    inCDNModel: enable ? RCInnerCDNModel.OPEN : RCInnerCDNModel.STOP
                }
            };
            const { code } = await new MCUConfigFlushCommand(params, this.cdnValues).execute(store, invoker);
            // const { code } = await this.hooks(params)
            if (code !== exports.RCRTCCode.SUCCESS) {
                logger.error(`enableInnerCDN failed -> code: ${code}`);
                engine.logger.error(RCLoggerTag.L_LIVING_ROOM_ENABLE_INNER_CDN_R, {
                    status: RCLoggerStatus.FAILED,
                    code,
                    msg: 'signal error'
                }, {
                    logSource: engine.LogSource.RTC
                });
                return { code: exports.RCRTCCode.SIGNAL_ERROR };
            }
            // 判断是否需要扩散 cdn_uris 时
            const CDNUris = store.getCDNUris();
            if (CDNUris && (CDNUris.broadcast !== RCInnerCDNBroadcast.SPREAD)) {
                logger.info('enableInnerCDN succeed');
                engine.logger.info(RCLoggerTag.L_LIVING_ROOM_ENABLE_INNER_CDN_R, {
                    status: RCLoggerStatus.SUCCESSED,
                    enable
                }, {
                    logSource: engine.LogSource.RTC
                });
                return { code: exports.RCRTCCode.SUCCESS };
            }
            /**
             * 扩散 cdn_uris
             */
            const { code: sendSingalCode } = await sendCDNInfoSignal(store);
            if (sendSingalCode === exports.RCRTCCode.SUCCESS) {
                logger.info('enableInnerCDN succeed');
                engine.logger.info(RCLoggerTag.L_LIVING_ROOM_ENABLE_INNER_CDN_R, {
                    status: RCLoggerStatus.SUCCESSED,
                    enable
                }, {
                    logSource: engine.LogSource.RTC
                });
                return { code: exports.RCRTCCode.SUCCESS };
            }
            logger.error(`enableInnerCDN failed -> code: ${sendSingalCode}`);
            engine.logger.error(RCLoggerTag.L_LIVING_ROOM_ENABLE_INNER_CDN_R, {
                status: RCLoggerStatus.FAILED,
                code: sendSingalCode,
                msg: ''
            }, {
                logSource: engine.LogSource.RTC
            });
            return { code: sendSingalCode };
        }
    }

    var RTCIdentityChangeType;
    (function (RTCIdentityChangeType) {
        RTCIdentityChangeType[RTCIdentityChangeType["AnchorToViewer"] = 1] = "AnchorToViewer";
        RTCIdentityChangeType[RTCIdentityChangeType["ViewerToAnchor"] = 2] = "ViewerToAnchor"; // 观众变主播
    })(RTCIdentityChangeType || (RTCIdentityChangeType = {}));

    class RTCIdentityChangeCommand extends BaseCommand {
        constructor(livingType) {
            super();
            this.livingType = livingType;
        }
        async execute(store, invoker) {
            var _a;
            const { code, data } = await store.context.rtcIdentityChange(store.roomId, RTCIdentityChangeType.ViewerToAnchor, this.livingType);
            if (code !== engine.ErrorCode.SUCCESS || !data) {
                return { code };
            }
            store.initWithRoomData(data);
            const selfRes = store.getResourcesByUserId(store.crtUserId);
            /*
             * 加入房间后，若房间中已存在己方发布的资源，表示之前未能完成正常退出流程
             * 需先清除房间内的己方资源，通知房间内其他人己方已取消当前资源的发布
             * 该步骤没有必要与 MediaServer 的交互，因后续资源变更交互为全量交互
             */
            selfRes.length > 0 && invoker.push(new UnpublishPrevCommand());
            const CDNUris = (_a = data.roomInfo.filter((item) => { return item.key === 'cdn_uris'; })[0]) === null || _a === void 0 ? void 0 : _a.value;
            CDNUris && store.setCDNUris(JSON.parse(CDNUris)[0]);
            return { code, data };
        }
    }

    /**
     * 直播房间
     */
    class RCLivingRoom extends RCAbstractRoom {
        constructor(context, runtime, roomId, service, initOptions, _livingType, isUpgrade, isMainRoom, 
        /**
         * 是否使用多 peerConnection
         */
        useMutilPeerC, _clientSessionId) {
            super(context, runtime, roomId, RTCMode.LIVE, service, initOptions, isUpgrade, isMainRoom, useMutilPeerC, _clientSessionId);
            this._livingType = _livingType;
            // 初始化 MCUBuilder
            this._mcuConfigBuilder = new RCMCUConfigBuilder(this._invoker, this._isValidResourceId.bind(this));
        }
        _initAfterCatchRoomData(data) {
            /**
             * 观众升级为主播后不会收到全量 uri 消息，需直接触发人员、资源变更
             */
            this._store.isUpgrade && this._afterChangedRole(data);
            // 初始化 RCLivingPKHandler
            if (this._store.isMainRoom) {
                const PKInfo = getPKInfoByRoomData(this._roomId, data.roomInfo);
                this._roomPKHandler = new RCLivingPKHandler(this._invoker, PKInfo, pcName => {
                    return {
                        headers: this._getRTCReqestHeaders(pcName),
                        pushOtherRooms: this._getPushOtherRoomsParams()
                    };
                }, this._context, this._runtime, this._service, this._initOptions, this, super._registerPKMsgListener.bind(this), this._onJoinedPKRoom.bind(this), this._clientSessionId);
            }
        }
        /**
         * @override
         */
        async __innerInit(mode, joinType, livingType, innerUserDatas, outerUserDatas) {
            if (!(engine.validate('livingType', livingType, (value) => value === exports.RCLivingType.AUDIO || value === exports.RCLivingType.VIDEO))) {
                engine.logger.error(RCLoggerTag.L_RTC_CLIENT_JOIN_LIVING_ROOM_R, {
                    status: RCLoggerStatus.FAILED,
                    code: exports.RCRTCCode.PARAMS_ERROR,
                    msg: 'params error -> livingType'
                }, {
                    logSource: engine.LogSource.RTC
                });
                return { code: exports.RCRTCCode.PARAMS_ERROR };
            }
            const { code, data } = await super.__innerInit(mode, joinType, livingType, innerUserDatas, outerUserDatas);
            if (code === exports.RCRTCCode.SUCCESS && data) {
                this._initAfterCatchRoomData(data);
            }
            return { code, data };
        }
        async __innerInitByIdentityChange() {
            const { code, data } = await this._invoker.push(new RTCIdentityChangeCommand(this._livingType));
            if (code === engine.ErrorCode.SUCCESS && data) {
                this._initAfterCatchRoomData(data);
                this._initWithRoomData(data.offlineKickTime);
                engine.logger.info(RCLoggerTag.L_RTC_CLIENT_UPGRADE_TO_ANCHOR_ROOM_R, {
                    status: RCLoggerStatus.SUCCESSED,
                    roomData: data
                }, {
                    logSource: engine.LogSource.RTC
                });
            }
            return code;
        }
        /**
         * 增量发布资源，若发布的资源 tag 及媒体类型重复，后者将覆盖前者进行发布。
         * @param tracks 待发布的 RCLocalTrack 实例
         * @returns
         */
        async publish(tracks) {
            if (!this._store.isMainRoom) {
                logger.warn('the `publish` is disabled in PK room ');
                engine.logger.error(RCLoggerTag.L_ABSTRACT_ROOM_PUBLISH_R, {
                    status: RCLoggerStatus.FAILED,
                    code: exports.RCRTCCode.THE_FUNCTION_IS_DISABLED_IN_PKROOM,
                    msg: 'method not available in room'
                }, {
                    logSource: engine.LogSource.RTC
                });
                return { code: exports.RCRTCCode.THE_FUNCTION_IS_DISABLED_IN_PKROOM };
            }
            return super.publish(tracks);
        }
        async unpublish(tracks) {
            if (!this._store.isMainRoom) {
                logger.warn('the `unpublish` is disabled in PK room ');
                engine.logger.error(RCLoggerTag.L_ABSTRACT_ROOM_UNPUBLISH_R, {
                    status: RCLoggerStatus.FAILED,
                    code: exports.RCRTCCode.THE_FUNCTION_IS_DISABLED_IN_PKROOM,
                    msg: 'method not available in room'
                }, {
                    logSource: engine.LogSource.RTC
                });
                return { code: exports.RCRTCCode.THE_FUNCTION_IS_DISABLED_IN_PKROOM };
            }
            return super.unpublish(tracks);
        }
        /**
         * resourceId 有效性验证
         * @param resourceId
         */
        _isValidResourceId(resourceId) {
            var _a;
            const { userId } = parseTrackId(resourceId);
            // 是否是主房间资源
            // const isHostRoomResource = !!this._roomResources[userId]?.find(item => getTrackId(item) === resourceId)
            const isHostRoomResource = !!((_a = this._store.getResourcesByUserId(userId)) === null || _a === void 0 ? void 0 : _a.find(item => getTrackId(item) === resourceId));
            // 是否是主房间资源
            let isPKRoomResource = false;
            /**
             * 无副房间时，只验证是否为主房间资源
             */
            const { code, roomPKHandler } = this.getRoomPKHandler();
            if (code !== exports.RCRTCCode.SUCCESS || !roomPKHandler) {
                return isHostRoomResource;
            }
            /**
             * 有副房间时，需验证是否为主房间或副房间资源
             */
            const joinedPKRooms = roomPKHandler.getJoinedPKRooms();
            const PKRoomRemoteTracks = [];
            Object.values(joinedPKRooms).map((room) => {
                PKRoomRemoteTracks.push(...room.getRemoteTracks());
            });
            isPKRoomResource = PKRoomRemoteTracks.some((track) => {
                return resourceId === track.getTrackId();
            });
            return isHostRoomResource || isPKRoomResource;
        }
        getLivingType() {
            return this._livingType;
        }
        /**
         * 获取 MCU 配置构建对象
         */
        getMCUConfigBuilder() {
            /**
             * 副房间不可调用
             */
            if (!this._store.isMainRoom) {
                logger.error('the `getMCUConfigBuilder` is disabled in PK room');
                return { code: exports.RCRTCCode.THE_FUNCTION_IS_DISABLED_IN_PKROOM };
            }
            return this._mcuConfigBuilder;
        }
        /**
         * 开启/停用推 CDN
         */
        async enableInnerCDN(enable) {
            return this._invoker.push(new EnableInnerCDNCommand(this._mcuConfigBuilder.__innerGetValues(), enable));
        }
        /**
         * 资源变化时触发
         * 直播房间需单独处理 cdn_uris
         */
        async _resourceHandle(
        // eslint-disable-next-line camelcase
        content, messageType, userId) {
            super._resourceHandle(content, messageType, userId);
        }
        /**
         * 观众切换为主播后直接处理人员变更及资源变更
         */
        _afterChangedRole(data) {
            const parseData = parseRoomData(data, this._roomId);
            const currentUserId = this._context.getCurrentId();
            const joinedAnchorList = Object.keys(parseData);
            // 观众升级主播成功后返回房间实例，才可注册房间事件，需异步抛出
            setTimeout(() => {
                var _a;
                // 通知业务层人员变更
                const needNoticeUserIds = joinedAnchorList.filter(id => {
                    return id !== currentUserId;
                });
                needNoticeUserIds.length > 0 && this._callAppListener('onUserJoin', needNoticeUserIds);
                // 通知业务层资源变更
                for (const userId in parseData) {
                    if (userId === currentUserId) {
                        continue;
                    }
                    this._resourceHandle({
                        uris: parseData[userId]
                    }, RCRTCMessageType.TOTAL_CONTENT_RESOURCE, userId);
                }
                const CDNUris = (_a = data.roomInfo.filter((item) => { return item.key === 'cdn_uris'; })[0]) === null || _a === void 0 ? void 0 : _a.value;
                if (!CDNUris) {
                    return;
                }
                const uris = this._store.getCDNUris();
                if ((uris === null || uris === void 0 ? void 0 : uris.push_mode) === RCInnerCDNPushMode.MANUAL) {
                    this._callAppListener('onCDNEnableChange', uris === null || uris === void 0 ? void 0 : uris.enableInnerCDN);
                }
            });
        }
        /**
         * 返回 CDN 是否可用
         * @returns boolean
         */
        __getCDNEnable() {
            var _a;
            return !!((_a = this._store.getCDNUris()) === null || _a === void 0 ? void 0 : _a.enableInnerCDN);
        }
        /**
         * 返回 CDN 推送模式: 自动 or 手动
         */
        __getCDNPushMode() {
            var _a;
            return (_a = this._store.getCDNUris()) === null || _a === void 0 ? void 0 : _a.push_mode;
        }
        /**
         * @override
         * 加入 PK 房间回调
         */
        async _onJoinedPKRoom(roomId, room) {
            /**
             * 加入副房间之后，如果己方发布过资源，且参与连麦，
             * 需携带 pushOtherRooms 与 mediaServer 重新交互
             */
            this._invoker.push(new ExchangeWithPushOtherRoomCommand(roomId, (pcName) => {
                return {
                    pushOtherRooms: this._getPushOtherRoomsParams(),
                    headers: this._getRTCReqestHeaders(pcName)
                };
            }, this._roomPKHandler));
            // push(async () => this._onLeavePKRoom(roomId))
        }
        /**
         * @override
         */
        _getPushOtherRoomsParams() {
            const pushOtherRooms = [];
            if (!this.isMainRoom() || !this._roomPKHandler) {
                return pushOtherRooms;
            }
            const joinedPKRooms = this._roomPKHandler.getJoinedPKRooms();
            for (const roomId in joinedPKRooms) {
                const room = joinedPKRooms[roomId];
                const sessionId = room.getSessionId();
                /**
                 * 直接加入 PK 房间，无连麦关系时，无 PKInfo 信息
                 */
                const pkInfo = this._roomPKHandler.getPKInfo(roomId);
                if (!pkInfo) {
                    continue;
                }
                const { inviterUserAutoMix, inviteeUserAutoMix, inviterUserId } = pkInfo;
                const isInviter = (this._context.getCurrentId() === inviterUserId);
                pushOtherRooms.push({
                    roomId,
                    sessionId,
                    autoMix: isInviter ? !!inviterUserAutoMix : !!inviteeUserAutoMix
                });
            }
            return pushOtherRooms;
        }
        /**
         * 获取 PK 业务处理器
         * @since version 5.3.0
         */
        getRoomPKHandler() {
            /**
             * 副房间不可调用
             */
            if (!this._store.isMainRoom) {
                logger.error('the `getRoomPKHandler` is disabled in PK room');
                engine.logger.error(RCLoggerTag.L_LIVING_ROOM_GET_ROOM_PK_HANDLER_O, {
                    status: RCLoggerStatus.SUCCESSED,
                    code: exports.RCRTCCode.THE_FUNCTION_IS_DISABLED_IN_PKROOM,
                    msg: 'method not available in room'
                }, {
                    logSource: engine.LogSource.RTC
                });
                return {
                    code: exports.RCRTCCode.THE_FUNCTION_IS_DISABLED_IN_PKROOM
                };
            }
            engine.logger.info(RCLoggerTag.L_LIVING_ROOM_GET_ROOM_PK_HANDLER_O, {
                status: RCLoggerStatus.SUCCESSED
            }, {
                logSource: engine.LogSource.RTC
            });
            return {
                code: exports.RCRTCCode.SUCCESS,
                roomPKHandler: this._roomPKHandler
            };
        }
        /**
         * 退出所有连麦房间
         */
        async _quitAllPKRoom() {
            const PKRooms = this._roomPKHandler.getJoinedPKRooms();
            for (const roomId in PKRooms) {
                this._roomPKHandler.leaveOtherRoom(PKRooms[roomId]);
            }
            engine.logger.info(RCLoggerTag.L_LIVING_ROOM_QUIT_ALL_PK_ROOM_O, {
                status: RCLoggerStatus.SUCCESSED,
                roomIds: Object.keys(PKRooms)
            }, {
                logSource: engine.LogSource.RTC
            });
        }
        /**
         * 是否是主房间
         */
        isMainRoom() {
            return this._store.isMainRoom;
        }
    }

    /**
     * 普通音视频房间
     */
    class RCRTCRoom extends RCAbstractRoom {
        constructor(context, runtime, roomId, service, initOptions, isUpgrade, isMainRoom, 
        /**
         * 是否使用多 peerConnection
         */
        useMutilPeerC, _clientSessionId, roomType = RTCMode.RTC) {
            super(context, runtime, roomId, roomType, service, initOptions, isUpgrade, isMainRoom, useMutilPeerC, _clientSessionId);
        }
    }

    class AsyncTaskQueue {
        constructor() {
            this.queue = [];
            this.locked = false;
            this.taskCount = 0;
        }
        async checkToStart() {
            if (this.queue.length === 0 || this.locked) {
                return;
            }
            this.locked = true;
            const { resolve, task, reject } = this.queue.shift();
            let result;
            try {
                result = await task();
                resolve(result);
            }
            catch (error) {
                reject(error);
            }
            this.locked = false;
            // 递归执行
            this.checkToStart();
        }
        push(task, _name = '') {
            const promise = new Promise((resolve, reject) => {
                this.queue.push({ resolve, task, reject });
            });
            this.checkToStart();
            return promise;
        }
    }
    const defQueeu = new AsyncTaskQueue();
    /**
     * 将异步任务推送到异步队列，队列内任务先进先出，依次执行，执行完成后通过
     * Promise.resolve 返回执行结果
     * @param task 传参不能是 `async () => {}` 所定义的异步函数，
     * 只能使用明确的 `() => Promise<T> | T` 形式，避免转义时微任务被提前执行
     */
    const push = (task, name = '') => {
        return defQueeu.push(task, name);
    };

    /**
     * 直播观众客户端
     */
    class RCAudienceClient {
        constructor(_context, runtime, _initOption, 
        /**
         * 是否使用多 peerConnection
         */
        _useMutilPeerC) {
            this._context = _context;
            this._useMutilPeerC = _useMutilPeerC;
            /**
             * RTCToken
             */
            this._rtcToken = '';
            /**
             * 已订阅的资源信息
             */
            this._liveUrl = '';
            /**
             * 已订阅的远端流
             */
            this._subTracks = [];
            this._clientSessionId = getUUID();
            this._livingType = null;
            this._mediaType = null;
            this._subTiny = false;
            // `subscribe` 方法调用是否来源于 ice 断线重连
            this._fromRetry = false;
            this._appListener = null;
            this._service = new RCMediaService(runtime, _context, _initOption.mediaServer);
            this._peerCManager = new RCRTCPeerCManager(this._useMutilPeerC, this._context.getCurrentId(), this._reTryExchange.bind(this), this._context.getCurrentId());
        }
        async _getReqHeaders(livingType) {
            const userId = this._context.getCurrentId();
            // 直播观众端 RoomId 与 UserId 保持一致
            const roomId = userId;
            // 取 rtcToken
            if (!this._rtcToken) {
                const { code, data } = await this._context.getRTCToken(roomId, RTCMode.LIVE, livingType);
                if (code !== engine.ErrorCode.SUCCESS) {
                    logger.error(`getRTCToken failed: ${code}`);
                    return { code: exports.RCRTCCode.SIGNAL_ERROR };
                }
                this._rtcToken = data.rtcToken;
            }
            return {
                code: exports.RCRTCCode.SUCCESS,
                headers: {
                    'App-Key': this._context.getAppkey(),
                    UserId: userId,
                    RoomId: roomId,
                    RoomType: RTCMode.LIVE,
                    Token: this._rtcToken,
                    'Peer-Connection-Id': this._pcName,
                    'Client-Session-Id': this._clientSessionId
                }
            };
        }
        _clearSubscribeInfo() {
            var _a;
            this._liveUrl = '';
            this._livingType = null;
            this._mediaType = null;
            this._subTiny = false;
            this._subTracks.length = 0;
            (_a = this._pc) === null || _a === void 0 ? void 0 : _a.destroy();
            this._pc = null;
        }
        async _reTryExchange() {
            var _a;
            this._fromRetry = true;
            const { code } = await this.subscribe(this._liveUrl, this._livingType, this._mediaType, this._subTiny);
            if (code === exports.RCRTCCode.SUCCESS) {
                (_a = this._pc) === null || _a === void 0 ? void 0 : _a.clearReTryExchangeTimer();
            }
        }
        /**
         * 直播观众订阅主播资源，直播观众端无需加入房间
         * @param liveUrl 直播资源地址
         * @param livingType 直播类型，有效值为音频、音视频
         * @param mediaType 订阅资源类型，其有效值为 `RCMediaType` 的枚举值
         * @param subTiny 当值为 `true` 时将订阅小流，否则订阅大流。默认值为 `false`
         */
        async subscribe(liveUrl, livingType, mediaType, subTiny = false) {
            return push(() => this.__subscribe(liveUrl, livingType, mediaType, subTiny), 'audience-client-sub');
        }
        async __subscribe(liveUrl, livingType, mediaType, subTiny = false) {
            var _a;
            engine.logger.info(RCLoggerTag.L_AUDIENCE_CLIENT_SUBSCRIBE_T, {
                liveUrl,
                livingType,
                mediaType,
                subTiny
            }, {
                logSource: engine.LogSource.RTC
            });
            const tracks = [];
            if (isIllegalConnection(this._context.getNaviInfo())) {
                engine.logger.error(RCLoggerTag.L_AUDIENCE_CLIENT_SUBSCRIBE_R, {
                    status: RCLoggerStatus.FAILED,
                    code: exports.RCRTCCode.PACKAGE_ENVIRONMENT_ERROR,
                    msg: 'navi_url error'
                }, {
                    logSource: engine.LogSource.RTC
                });
                return { code: exports.RCRTCCode.PACKAGE_ENVIRONMENT_ERROR, tracks };
            }
            // 客户端主动调用 api 发请求时，清除 ice 断线重连的定时器
            !this._fromRetry && ((_a = this._pc) === null || _a === void 0 ? void 0 : _a.clearReTryExchangeTimer());
            this._fromRetry = false;
            if (!engine.isString(liveUrl)) {
                logger.error(`liveUrl is invalid: ${liveUrl}`);
                engine.logger.error(RCLoggerTag.L_AUDIENCE_CLIENT_SUBSCRIBE_R, {
                    status: RCLoggerStatus.FAILED,
                    code: exports.RCRTCCode.PARAMS_ERROR,
                    msg: `params error -> liveUrl: ${liveUrl}`
                }, {
                    logSource: engine.LogSource.RTC
                });
                return { code: exports.RCRTCCode.PARAMS_ERROR, tracks };
            }
            if (![exports.RCLivingType.AUDIO, exports.RCLivingType.VIDEO].includes(livingType)) {
                logger.error(`livingType is invalid: ${livingType}`);
                engine.logger.error(RCLoggerTag.L_AUDIENCE_CLIENT_SUBSCRIBE_R, {
                    status: RCLoggerStatus.FAILED,
                    code: exports.RCRTCCode.PARAMS_ERROR,
                    msg: `params error -> livingType: ${livingType}`
                }, {
                    logSource: engine.LogSource.RTC
                });
                return { code: exports.RCRTCCode.PARAMS_ERROR, tracks };
            }
            if (![exports.RCMediaType.AUDIO_ONLY, exports.RCMediaType.VIDEO_ONLY, exports.RCMediaType.AUDIO_VIDEO].includes(mediaType)) {
                logger.error(`mediaType is invalid: ${mediaType}`);
                engine.logger.error(RCLoggerTag.L_AUDIENCE_CLIENT_SUBSCRIBE_R, {
                    status: RCLoggerStatus.FAILED,
                    code: exports.RCRTCCode.PARAMS_ERROR,
                    msg: `params error -> -> mediaType: ${mediaType}`
                }, {
                    logSource: engine.LogSource.RTC
                });
                return { code: exports.RCRTCCode.PARAMS_ERROR, tracks };
            }
            // 允许观众动态切换大小流订阅，或重复订阅同一资源
            if (this._liveUrl && this._liveUrl !== liveUrl) {
                engine.logger.error(RCLoggerTag.L_AUDIENCE_CLIENT_SUBSCRIBE_R, {
                    status: RCLoggerStatus.FAILED,
                    code: exports.RCRTCCode.BROADCAST_SUB_LIST_NOT_EMPTY,
                    msg: 'repeat subscribe'
                }, {
                    logSource: engine.LogSource.RTC
                });
                return { code: exports.RCRTCCode.BROADCAST_SUB_LIST_NOT_EMPTY, tracks };
            }
            /**
             * 创建 peerConnection，完成注册
             */
            if (!this._pc) {
                const { pcName, pc } = this._peerCManager.createPeerCList(tracks)[0];
                this._pc = pc;
                this._pcName = pcName;
                this._pc.on(RCRTCPeerConnection.__INNER_EVENT_TRACK_READY__, this._onTrackReady, this);
                this._pc.registerReportListener(this._reportListener);
                // 发送上下行数据至北极星
                this._pc.__reportR3R4ToPolaris();
            }
            // 暂存，避免同步栈内并发调用，若订阅失败需清理
            this._liveUrl = liveUrl;
            // 构建 http req headers
            const { code, headers } = await this._getReqHeaders(livingType);
            if (code !== exports.RCRTCCode.SUCCESS) {
                engine.logger.error(RCLoggerTag.L_AUDIENCE_CLIENT_SUBSCRIBE_R, {
                    status: RCLoggerStatus.FAILED,
                    code,
                    msg: ''
                }, {
                    logSource: engine.LogSource.RTC
                });
                return { code, tracks };
            }
            // 直播观众订阅的是合流后的数据，并不存在流的归属问题，此处直接以虚拟生成的合流 id 替代 userId
            const mcuId = `rc_mcu_${Date.now()}`;
            const tag = 'RongCloudRTC';
            if (this._subTracks.length === 0) {
                // 观众端单次只能订阅一个 liveUrl, 订阅后再次重复订阅只是修改订阅参数
                // 重复订阅后之前订阅的流可直接根据参数变动，无需重新添加 transceiver
                this._subTracks.push(new RCRemoteAudioTrack(tag, mcuId), new RCRemoteVideoTrack(tag, mcuId));
                this._pc.updateSubRemoteTracks(this._subTracks.slice());
            }
            const offer = await this._pc.createOffer(true);
            const body = {
                sdp: offer,
                liveUrl,
                mediaType,
                simulcast: subTiny ? RCStreamType.TINY : RCStreamType.NORMAL,
                switchstream: false
                // switchstream: !!this._initOption.autoSwitchStream
            };
            const resp = await this._service.broadcastSubscribe(headers, body);
            if (resp.code !== exports.RCRTCCode.SUCCESS) {
                logger.error(`andience subscribe failed: ${resp.code}`);
                engine.logger.error(RCLoggerTag.L_AUDIENCE_CLIENT_SUBSCRIBE_R, {
                    status: RCLoggerStatus.FAILED,
                    code: resp.code,
                    msg: ''
                }, {
                    logSource: engine.LogSource.RTC
                });
                return { code: resp.code, tracks };
            }
            const data = resp.data;
            if (data.resultCode !== exports.RCRTCCode.SUCCESS) {
                logger.error(`andience subscribe failed! code: ${data.resultCode}; message: ${data.message}`);
                engine.logger.error(RCLoggerTag.L_AUDIENCE_CLIENT_SUBSCRIBE_R, {
                    status: RCLoggerStatus.FAILED,
                    code: data.resultCode,
                    msg: ''
                }, {
                    logSource: engine.LogSource.RTC
                });
                return { code: data.resultCode, tracks };
            }
            logger.debug(`andience subscribe success: ${liveUrl}`);
            this._livingType = livingType;
            this._mediaType = mediaType;
            this._subTiny = subTiny;
            const { sdp: answer, subscribedList } = data;
            const readyTracks = [];
            subscribedList.forEach(item => {
                const { mediaType } = item;
                const rTrack = this._subTracks[mediaType];
                readyTracks.push(rTrack);
                // 直播观众订阅的流为合流数据，不存在单独禁用的问题
                rTrack.__innerSetRemoteMuted(true);
            });
            // 无需等待 setRemoteAnswer 完成，直接返回，避免业务层拿到 tracks 之前先获取了 onTrackReady 通知
            this._pc.setRemoteAnswer(answer.sdp);
            engine.logger.info(RCLoggerTag.L_AUDIENCE_CLIENT_SUBSCRIBE_R, {
                status: RCLoggerStatus.SUCCESSED,
                liveUrl
            }, {
                logSource: engine.LogSource.RTC
            });
            return { code: exports.RCRTCCode.SUCCESS, tracks: readyTracks };
        }
        /**
         * 取消订阅主播资源
         * @param liveUrl
         */
        async unsubscribe() {
            return push(() => this.__unsubscribe(), 'audience-client-unsub');
        }
        async __unsubscribe() {
            var _a;
            engine.logger.info(RCLoggerTag.L_AUDIENCE_CLIENT_UNSUBSCRIBE_T, {
                liveUrl: this._liveUrl
            }, {
                logSource: engine.LogSource.RTC
            });
            // 客户端主动调用 api 发请求时，清除 ice 断线重连的定时器
            (_a = this._pc) === null || _a === void 0 ? void 0 : _a.clearReTryExchangeTimer();
            if (!this._rtcToken || !this._liveUrl) {
                engine.logger.warn(RCLoggerTag.L_AUDIENCE_CLIENT_UNSUBSCRIBE_R, {
                    status: RCLoggerStatus.FAILED,
                    code: '',
                    msg: 'Address does not exist, without unsubscribe'
                }, {
                    logSource: engine.LogSource.RTC
                });
                return { code: exports.RCRTCCode.SUCCESS };
            }
            // 无需验 code，rtcToken 无值的情况已提前校验，不存在重新拿 token 的可能性
            const { headers } = await this._getReqHeaders();
            const { code } = await this._service.broadcastExit(headers);
            if (code !== exports.RCRTCCode.SUCCESS) {
                logger.error(`broadcast unsubscribe failed: ${code}`);
                engine.logger.error(RCLoggerTag.L_AUDIENCE_CLIENT_UNSUBSCRIBE_R, {
                    status: RCLoggerStatus.FAILED,
                    code,
                    msg: ''
                }, {
                    logSource: engine.LogSource.RTC
                });
            }
            else {
                logger.debug('broadcast unsubscribe success');
                engine.logger.info(RCLoggerTag.L_AUDIENCE_CLIENT_UNSUBSCRIBE_R, {
                    status: RCLoggerStatus.SUCCESSED,
                    liveUrl: this._liveUrl
                }, {
                    logSource: engine.LogSource.RTC
                });
            }
            this._clearSubscribeInfo();
            return { code };
        }
        /**
         * 注册房间数据监控
         * @param listener
         * @description 该方法暂仅支持 Chrome 浏览器
         */
        registerReportListener(listener) {
            this._reportListener = listener;
        }
        /**
         * 注册流事件监听，多次注册会导致后者覆盖前者，可以通过使用 `registerTrackEventListener(null)` 取消注册
         * @param listener
         */
        registerTrackEventListener(listener) {
            this._appListener = listener;
        }
        _onTrackReady(evt) {
            var _a, _b;
            const track = evt.receiver.track;
            const mediaType = track.kind === 'audio' ? exports.RCMediaType.AUDIO_ONLY : exports.RCMediaType.VIDEO_ONLY;
            const rTrack = this._subTracks[mediaType];
            rTrack.__innerSetMediaStreamTrack(track);
            try {
                (_b = (_a = this._appListener) === null || _a === void 0 ? void 0 : _a.onTrackReady) === null || _b === void 0 ? void 0 : _b.call(_a, rTrack);
            }
            catch (error) {
                logger.error(error);
            }
        }
    }

    exports.RCInnerCDNPullKind = void 0;
    (function (RCInnerCDNPullKind) {
        RCInnerCDNPullKind["RTMP"] = "rtmp";
        RCInnerCDNPullKind["FLV"] = "flv";
        RCInnerCDNPullKind["HLS"] = "hls";
    })(exports.RCInnerCDNPullKind || (exports.RCInnerCDNPullKind = {}));

    exports.RCInnerCDNPullIsHttps = void 0;
    (function (RCInnerCDNPullIsHttps) {
        RCInnerCDNPullIsHttps[RCInnerCDNPullIsHttps["NOT_HTTPS"] = 0] = "NOT_HTTPS";
        RCInnerCDNPullIsHttps[RCInnerCDNPullIsHttps["HTTPS"] = 1] = "HTTPS";
    })(exports.RCInnerCDNPullIsHttps || (exports.RCInnerCDNPullIsHttps = {}));

    const tinyConf = Object.assign(Object.assign({}, transResolution(exports.RCResolution.W176_H144)), { frameRate: transFrameRate(exports.RCFrameRate.FPS_15) });
    /**
     * 观众直播房间类
     * 处理：
     * 1、通知观众房间内 人员变更、资源变更
     * 2、观众订阅、取消订阅资源
     */
    class RCAudienceLivingRoom {
        constructor(_context, 
        // private readonly _proxy: ContextProxy,
        _runtime, _initOptions, _roomId, _joinResData, livingType, _useMutilPeerC, _clientSessionId = getUUID()) {
            this._context = _context;
            this._runtime = _runtime;
            this._initOptions = _initOptions;
            this._roomId = _roomId;
            this._joinResData = _joinResData;
            this.livingType = livingType;
            this._useMutilPeerC = _useMutilPeerC;
            this._clientSessionId = _clientSessionId;
            /**
             * 主播列表
             */
            this._roomAnchorList = [];
            /**
             * 合流、分流资源
             */
            this._roomRes = {};
            /**
             * 主播分流资源
             */
            this._roomAnchorRes = {};
            /**
             * 合流、分流 remoteTracks
             */
            this._remoteTracks = {};
            this._appListener = null;
            this._pc = null;
            this._subscribedList = [];
            this._sessionId = '';
            this._destroyed = false;
            this._isPulling = false;
            this._pullTime = 0;
            this._reportListener = null;
            // 解析服务返回的 KV 数据，并赋值房间内数据
            this._setInitData();
            this._service = new RCMediaService(this._runtime, this._context, this._initOptions.mediaServer, this._initOptions.timeout);
            // 北极星数据
            this._polarisReport = new PolarisReporter(this._context, this._runtime, this._roomId, this, PolarisRole.Audience);
            this._polarisReport.sendR1();
            this._peerCManager = new RCRTCPeerCManager(this._useMutilPeerC, this._roomId, this._reTryExchange.bind(this), this._context.getCurrentId(), this._polarisReport);
            // 注册监听 rtc_ntf 信令数据，解码后拉取指定房间数据
            this._context.registerRTCSignalListener(async (buffer) => {
                // 1. 拉取数据，非本房间可不拉取
                // 2. 拉取完成后调用原通知方法 this.singalDataChange(_roomId)
                const { time, type, roomId } = this._context.decodeRtcNotify(buffer);
                logger.warn(`registerRTCSignalListener -> ${JSON.stringify({ time, type, roomId })}`);
                switch (type) {
                    case 1:
                        // RTC KV拉取
                        this._startPull(roomId, time);
                        break;
                }
            });
        }
        async _startPull(roomId, timestamp) {
            if (this._isPulling) {
                return;
            }
            this._isPulling = true;
            const pulledUpTime = this._pullTime;
            if (pulledUpTime > timestamp) { // 已经拉取过，不再拉取
                this._isPulling = false;
                return;
            }
            const { code, data } = await this._context.pullRTCRoomEntry(roomId);
            if (code === engine.ErrorCode.SUCCESS) {
                this._isPulling = false;
                this._pullTime = data.syncTime || 0;
                const kvEntries = (data === null || data === void 0 ? void 0 : data.kvEntries) || [];
                logger.info(`_startPull -> ${JSON.stringify(kvEntries)}`);
                this.singalDataChange(kvEntries, roomId);
            }
        }
        /**
         * 解析服务端返回的 KV 数据，赋值 room 内数据
         */
        _setInitData() {
            const { sessionId, remoteUserIds, remoteRTCUris, remoteMUCUris, remoteTracks, CDNUris } = parseAudienceRoomData(this._roomId, this._joinResData.kvEntries);
            /**
             * session 赋值
             */
            this._sessionId = sessionId;
            /**
             * 主播列表赋值
             */
            this._roomAnchorList = remoteUserIds;
            /**
             * RTC、MCU tracks 赋值
             */
            remoteTracks.forEach((track) => {
                this._remoteTracks[track.getTrackId()] = track;
            });
            /**
             * _CDNUris 赋值
             */
            this._CDNUris = CDNUris;
            /**
             * 房间内 RTC 资源赋值
             */
            remoteRTCUris.forEach((uri) => {
                const userId = uri.msid.split('_')[0];
                if (this._roomAnchorRes[userId]) {
                    this._roomAnchorRes[userId].push(uri);
                }
                else {
                    this._roomAnchorRes[userId] = [uri];
                }
            });
            /**
             * 房间内 RTC、MCU 资源赋值
             */
            remoteMUCUris.forEach((uri) => {
                const { mediaType, tag } = uri;
                const trackId = [this._roomId, tag, mediaType].join('_');
                this._roomRes[trackId] = uri;
            });
            remoteRTCUris.forEach((uri) => {
                const trackId = getTrackId(uri);
                this._roomRes[trackId] = uri;
            });
        }
        _assertRoomDestroyed() {
            if (this._destroyed) {
                const msg = 'This room has been destroyed. Please use `RCRTCClient.joinLivingRoomAsAudience` to catch another instance.';
                logger.warn(msg);
                return exports.RCRTCCode.ROOM_HAS_BEEN_DESTROYED;
            }
        }
        /**
         * @description 信令数据处理
         * @param roomId 数据对应的房间 Id
         * @param singalData 拉取到的数据
         * * key RC_ANCHOR_LIST value: 为主播 ID 集合
         * * key RC_RES_`userId` value: 为主播发布的资源
         * * key RC_RTC_SESSIONID value: sessionId
         * * key RC_CDN value: CDN 资源数据
         */
        singalDataChange(singalData, roomId) {
            var _a;
            engine.logger.info(RCLoggerTag.L_AUDIENCE_LIVING_ROOM_SINGAL_DATA_CHANGE_T, {
                singalData,
                roomId,
                userId: this._context.getCurrentId()
            }, {
                logSource: engine.LogSource.RTC
            });
            if (roomId !== this._roomId) {
                logger.warn(`singalDataChange -> not the current room data: data roomId: ${roomId}, current roomId: ${this._roomId}`);
                engine.logger.error(RCLoggerTag.L_AUDIENCE_LIVING_ROOM_SINGAL_DATA_CHANGE_R, {
                    status: RCLoggerStatus.FAILED,
                    code: '',
                    msg: `id inconsistency -> params id:${roomId}，current id:${this._roomId}`
                }, {
                    logSource: engine.LogSource.RTC
                });
                return;
            }
            logger.debug('singalDataChange -> singalData:', JSON.stringify(singalData || {}));
            const allMcuUris = [];
            const CDNUrisStr = (_a = singalData.filter((item) => { return item.key === 'RC_CDN'; })[0]) === null || _a === void 0 ? void 0 : _a.value;
            CDNUrisStr && this._diffCDNUris(JSON.parse(JSON.parse(CDNUrisStr).cdn_uris)[0]);
            singalData.forEach(data => {
                const { key, value, timestamp, uid } = data;
                const isResKey = key.indexOf('RC_RES_') !== -1;
                if (isResKey) {
                    const serverUris = JSON.parse(value || '{}');
                    const mcuUris = JSON.parse(serverUris.mcu_uris || '[]');
                    const anchorUris = JSON.parse(serverUris.uris || '[]');
                    allMcuUris.push(...mcuUris);
                    // 处理主播发布的分流资源
                    this._diffAnchorResource(anchorUris, uid);
                    return;
                }
                // 处理主播列表
                if (key === 'RC_ANCHOR_LIST') {
                    const anchorUserIds = JSON.parse(value || '[]');
                    const { joinUserIds, leftUserIds } = this._diffAnchorList(anchorUserIds);
                    if (joinUserIds.length > 0) {
                        this._handleNewJoinedAnchor(joinUserIds);
                    }
                    if (leftUserIds.length > 0) {
                        this._handleLeftedAnchor(leftUserIds);
                    }
                }
            });
            // 处理直播间 MCU 合流资源资源
            this._diffRoomResource(allMcuUris);
            engine.logger.info(RCLoggerTag.L_AUDIENCE_LIVING_ROOM_SINGAL_DATA_CHANGE_R, {
                status: RCLoggerStatus.SUCCESSED,
                singalData,
                roomId,
                userId: this._context.getCurrentId()
            }, {
                logSource: engine.LogSource.RTC
            });
        }
        /**
         * 计算加入离开的主播 ID 列表
         */
        _diffAnchorList(serverRoomAllAnchor) {
            const joinUserIds = serverRoomAllAnchor.filter(userId => this._roomAnchorList.indexOf(userId) < 0);
            const leftUserIds = this._roomAnchorList.filter(userId => serverRoomAllAnchor.indexOf(userId) < 0);
            return {
                leftUserIds,
                joinUserIds
            };
        }
        _handleNewJoinedAnchor(list) {
            // 更新 _roomAnchorList
            this._roomAnchorList.push(...list);
            // 触发 app 主播加入监听
            this._callAppListener('onAnchorJoin', list);
        }
        async _handleLeftedAnchor(list) {
            // 更新 _roomAnchorList
            this._roomAnchorList = this._roomAnchorList.filter(item => {
                return !(list.indexOf(item) > -1);
            });
            // 主播离开房间时，自动退订对方资源
            const tracks = [];
            list.forEach(userId => {
                tracks.push(...this.getRemoteTracksByUserId(userId));
                delete this._roomAnchorRes[userId];
            });
            if (tracks.length) {
                await this.unsubscribe(tracks);
                tracks.forEach(item => delete this._remoteTracks[item.getTrackId()]);
            }
            // 触发 app 主播离开监听
            this._callAppListener('onAnchorLeave', list);
        }
        /**
         * 计算新发布和取消发布的合流资源
         */
        async _diffRoomResource(uris) {
            const newPubTracks = [];
            const unpubTracks = [];
            // 若 uris 中有， this._remoteTracks 中没有，为新发布
            const remoteUriTrackIds = [];
            uris.forEach(uri => {
                const serverResId = getTrackId(uri);
                const { userId, tag, mediaType } = parseTrackId(serverResId);
                const localTrackId = [this._roomId, tag, mediaType].join('_');
                // 查看资源 ID 是否存在于当前房间的 remoteTracks
                if (!this._remoteTracks[localTrackId]) {
                    // 置为新发布的 track
                    const rTrack = mediaType === exports.RCMediaType.AUDIO_ONLY ? new RCRemoteAudioTrack(tag, '', this._roomId) : new RCRemoteVideoTrack(tag, '', this._roomId);
                    newPubTracks.push(rTrack);
                    this._remoteTracks[localTrackId] = rTrack;
                    this._roomRes[rTrack.getTrackId()] = uri;
                }
                remoteUriTrackIds.push(localTrackId);
            });
            // 若 this._remoteTracks 有，uris 中没有为取消发布
            Object.keys(this._remoteTracks).forEach(trackId => {
                const isUnpubTrackId = remoteUriTrackIds.indexOf(trackId) < 0 && this._remoteTracks[trackId].isMCUTrack();
                if (isUnpubTrackId) {
                    // 置为取消发布的 track
                    unpubTracks.push(this._remoteTracks[trackId]);
                }
            });
            // 通知 APP 新发布的 tracks
            newPubTracks.length > 0 && this._callAppListener('onTrackPublish', newPubTracks);
            unpubTracks.length > 0 && this._onUserUnpublish(unpubTracks, 'onTrackUnpublish');
        }
        /**
         * 计算主播发布和取消发布的资源，以及资源的状态变更
        */
        async _diffAnchorResource(uris, userId) {
            // 当前资源清单
            const nowRes = this._roomAnchorRes[userId] || (this._roomAnchorRes[userId] = []);
            const { publishedList, unpublishedList, modifiedList } = diffPublishResources(nowRes, uris);
            // publishedList 包含当前房间未发布的资源，以及房间已存在资源的二次发布，uri 有变更
            if (publishedList.length) {
                const ids = nowRes.map(getTrackId);
                // 对方重新发布且己方已订阅的资源
                const subedTracks = [];
                const newTracks = [];
                publishedList.forEach(item => {
                    const resId = getTrackId(item);
                    const index = ids.indexOf(resId);
                    const { userId, tag, mediaType } = parseTrackId(resId);
                    if (index > -1) {
                        nowRes[index] = item;
                    }
                    else {
                        nowRes.push(item);
                    }
                    let rTrack = this._remoteTracks[resId];
                    this._roomRes[resId] = item;
                    // 二次发布资源，直接更新
                    if (rTrack) {
                        if (rTrack.isSubscribed()) {
                            subedTracks.push(rTrack);
                        }
                    }
                    else {
                        rTrack = mediaType === exports.RCMediaType.AUDIO_ONLY ? new RCRemoteAudioTrack(tag, userId) : new RCRemoteVideoTrack(tag, userId);
                        this._remoteTracks[resId] = rTrack;
                        newTracks.push(rTrack);
                    }
                    rTrack.__innerSetRemoteMuted(item.state === 0);
                });
                // 重新订阅二次发布资源
                if (subedTracks.length) {
                    const trackIds = subedTracks.map(item => item.getTrackId());
                    logger.debug(`resub tracks -> ${JSON.stringify(trackIds)}`);
                    const { code } = await push(() => this._subscribeHandle(subedTracks, true));
                    if (code !== exports.RCRTCCode.SUCCESS) {
                        logger.error(`resub tracks failed -> code: ${code}, ids: ${JSON.stringify(trackIds)}`);
                    }
                }
                this._callAppListener('onAnchorTrackPublish', newTracks);
            }
            if (unpublishedList.length) {
                const resIds = unpublishedList.map(getTrackId);
                for (let i = nowRes.length - 1; i >= 0; i -= 1) {
                    const item = nowRes[i];
                    if (resIds.includes(getTrackId(item))) {
                        nowRes.splice(i, 1);
                    }
                }
                const tracks = unpublishedList.map(item => {
                    const trackId = getTrackId(item);
                    return this._remoteTracks[trackId];
                });
                await this._onUserUnpublish(tracks, 'onAnchorTrackUnpublish');
            }
            if (modifiedList.length) {
                const resIds = nowRes.map(getTrackId);
                for (let i = 0; i < modifiedList.length; i++) {
                    const item = modifiedList[i];
                    const id = getTrackId(item);
                    // 更新资源 state
                    const index = resIds.indexOf(id);
                    nowRes[index].state = item.state;
                    const rTrack = this._remoteTracks[id];
                    rTrack.__innerSetRemoteMuted(item.state === 0);
                    if (rTrack.isAudioTrack()) {
                        this._callAppListener('onAudioMuteChange', rTrack);
                    }
                    else {
                        this._callAppListener('onVideoMuteChange', rTrack);
                    }
                }
            }
        }
        async _onUserUnpublish(tracks, eventName) {
            // 需要替业务层取消订阅，业务层只需关注 UI 变化
            await this.unsubscribe(tracks);
            tracks.forEach(item => {
                this._subscribedList = this._subscribedList.filter(sub => sub.track.getTrackId() !== item.getTrackId());
                delete this._roomRes[item.getTrackId()];
                item.__innerDestroy();
                delete this._remoteTracks[item.getTrackId()];
            });
            // 通知 APP 取消发布的 tracks
            this._callAppListener(eventName, tracks);
        }
        _callAppListener(eventType, ...attrs) {
            var _a;
            logger.info(`${eventType} callback ->`, ...attrs);
            const handle = (_a = this._appListener) === null || _a === void 0 ? void 0 : _a[eventType];
            if (!handle) {
                return;
            }
            try {
                handle(...attrs);
            }
            catch (error) {
                logger.error(error);
            }
        }
        /**
         * ice 断线后，尝试重新走 exchange
        */
        async _reTryExchange() {
            push(async () => {
                var _a;
                const { reqBody } = await this._createSubscribeParams(this._subscribedList, {}, true);
                // 发送 /exchange 请求
                const resp = await this._exchangeHandle(reqBody);
                if (resp.code !== exports.RCRTCCode.SUCCESS) {
                    logger.error(`reTryExchange failed: ${resp.code}`);
                    return { code: resp.code };
                }
                const { sdp: answer, resultCode } = resp.data;
                if (resultCode !== exports.RCRTCCode.SUCCESS) {
                    logger.error(`reTryExchange failed: ${resultCode}`);
                    return { code: resultCode };
                }
                // 请求成功，清除 ice 断线重连的定时器
                this._pc.clearReTryExchangeTimer();
                const mcuSubList = this._subscribedList.filter(item => item.track.isMCUTrack());
                if (mcuSubList.length > 0) {
                    const mcuTrackId = mcuSubList[0].track.getTrackId();
                    const sdpMsid = (_a = this._roomRes[mcuTrackId]) === null || _a === void 0 ? void 0 : _a.msid;
                    const currentMsid = [this._roomId, 'RongCloudRTC'].join('_');
                    answer.sdp = answer.sdp.replace(new RegExp(sdpMsid, 'g'), currentMsid);
                }
                const resCode = await this._pc.setRemoteAnswer(answer.sdp);
                if (resCode !== exports.RCRTCCode.SUCCESS) {
                    return { code: resCode };
                }
            }, 'audience-retry-exchange');
        }
        /**
         * 获取 subscribe 接口的请求体数据
         * @param subscribeList 订阅清单
         * @param publishedStreams 已发布流
         * @param iceRestart
         */
        async _createSubscribeParams(subscribeList, publishedStreams, iceRestart) {
            // createOffer
            const offer = await this._pc.createOffer(iceRestart);
            // 提供给录像、MCU 的分辨率数据
            const extend = {
                resolutionInfo: []
            };
            // 动态码率
            const dynamicBitrate = { min: 0, max: 0 };
            Object.keys(publishedStreams).forEach(msid => {
                const { mediaStream, tinyStream } = publishedStreams[msid];
                [mediaStream, tinyStream].forEach((stream, index) => {
                    var _a;
                    // 修改 SDP 内的 streamId
                    const tempMsid = index === 1 ? [msid, 'tiny'].join('_') : msid;
                    offer.sdp = (_a = offer.sdp) === null || _a === void 0 ? void 0 : _a.replace(new RegExp(stream.id, 'g'), tempMsid);
                    const videoTrack = stream.getVideoTracks()[0];
                    if (!videoTrack) {
                        return;
                    }
                    const isNormal = index === 0;
                    const { width, height, frameRate } = isNormal ? getVideoTrackInfo(videoTrack) : tinyConf;
                    // 统计分辨率数据
                    extend.resolutionInfo.push({
                        trackId: videoTrack.id,
                        simulcast: isNormal ? RCStreamType.NORMAL : RCStreamType.TINY,
                        resolution: `${width}x${height}`
                    });
                    // 计算动态码率以备给 answer 使用
                    const config = getNearestResolution(width, height);
                    const multiple = getBitrateMultiple(frameRate);
                    dynamicBitrate.min += (config.minBitrate * multiple);
                    dynamicBitrate.max += (config.maxBitrate * multiple);
                });
            });
            const reqBody = {
                sdp: offer,
                switchstream: false,
                newVersionFlag: true,
                subscribeList: subscribeList.map(item => ({
                    simulcast: item.subTiny ? RCStreamType.TINY : RCStreamType.NORMAL,
                    resolution: '',
                    uri: this._roomRes[item.track.getTrackId()].uri
                }))
            };
            return { reqBody, dynamicBitrate, offer };
        }
        async _subscribeHandle(tracks, forceReq = false) {
            var _a;
            engine.logger.info(RCLoggerTag.L_AUDIENCE_LIVING_ROOM_SUBSCRIBE_T, {
                trackIds: tracks.map(getTrackIdFromAttr),
                roomId: this._roomId,
                userId: this._context.getCurrentId(),
                forceReq
            }, {
                logSource: engine.LogSource.RTC
            });
            const roomStatusCode = this._assertRoomDestroyed();
            if (roomStatusCode) {
                engine.logger.error(RCLoggerTag.L_AUDIENCE_LIVING_ROOM_SUBSCRIBE_R, {
                    status: RCLoggerStatus.FAILED,
                    code: exports.RCRTCCode.ROOM_HAS_BEEN_DESTROYED,
                    msg: 'room destroyed'
                }, {
                    logSource: engine.LogSource.RTC
                });
                return { code: exports.RCRTCCode.ROOM_HAS_BEEN_DESTROYED };
            }
            if (!engine.validate('tracks', tracks, () => {
                return engine.isArray(tracks) && tracks.length > 0 && tracks.every(item => {
                    return item instanceof RCRemoteTrack || item.track instanceof RCRemoteTrack;
                });
            }, true)) {
                engine.logger.error(RCLoggerTag.L_AUDIENCE_LIVING_ROOM_SUBSCRIBE_R, {
                    status: RCLoggerStatus.FAILED,
                    code: exports.RCRTCCode.PARAMS_ERROR,
                    msg: 'params error -> tracks'
                }, {
                    logSource: engine.LogSource.RTC
                });
                return { code: exports.RCRTCCode.PARAMS_ERROR };
            }
            const { pc, pcName } = this._peerCManager.createPeerCList(tracks)[0];
            this._pc = pc;
            // 发送上下行数据至北极星
            this._pc.__reportR3R4ToPolaris();
            this._pcName = pcName;
            this._pc.registerReportListener(this._reportListener);
            // 添加 peerConnection 事件
            this._addPeerCEvent();
            const crtSubList = this._subscribedList.map(item => (Object.assign({}, item)));
            const attrs = tracks.map(item => {
                return item instanceof RCRemoteTrack ? { track: item } : item;
            });
            let trackChanged = false;
            const R2TrackIds = [];
            attrs.forEach(item => {
                const trackId = item.track.getTrackId();
                R2TrackIds.push(trackId);
                const crt = crtSubList.find(tmp => tmp.track.getTrackId() === trackId);
                if (crt && crt.subTiny === item.subTiny) {
                    return;
                }
                if (crt) {
                    crt.subTiny = item.subTiny;
                }
                else {
                    crtSubList.push(item);
                }
                trackChanged = true;
            });
            if (!trackChanged && !forceReq) {
                engine.logger.warn(RCLoggerTag.L_AUDIENCE_LIVING_ROOM_SUBSCRIBE_R, {
                    status: RCLoggerStatus.FAILED,
                    code: '',
                    msg: 'repeat subscribe'
                }, {
                    logSource: engine.LogSource.RTC
                });
                return { code: exports.RCRTCCode.SUCCESS };
            }
            // 北极星上报
            (_a = this._polarisReport) === null || _a === void 0 ? void 0 : _a.sendR2(R2Action.SUBSCRIBE, R2Status.BEGIN, R2TrackIds);
            engine.logger.info(RCLoggerTag.L_AUDIENCE_LIVING_ROOM_SUBSCRIBE_R, {
                status: RCLoggerStatus.SUCCESSED,
                trackIds: tracks.map(getTrackIdFromAttr),
                roomId: this._roomId,
                userId: this._context.getCurrentId(),
                forceReq
            }, {
                logSource: engine.LogSource.RTC
            });
            return this._updateSubListHandle(crtSubList, true);
        }
        /**
         * 添加 peerConnection 事件
         */
        _addPeerCEvent() {
            this._pc.on(RCRTCPeerConnection.__INNER_EVENT_TRACK_READY__, (evt) => {
                const msid = evt.streams[0].id;
                const track = evt.receiver.track;
                const trackId = [msid, track.kind === 'audio' ? exports.RCMediaType.AUDIO_ONLY : exports.RCMediaType.VIDEO_ONLY].join('_');
                const rTrack = this._remoteTracks[trackId];
                if (!rTrack) {
                    logger.warn('cannot found RCRemoteTrack:', track.id);
                    return;
                }
                rTrack.__innerSetMediaStreamTrack(track);
                this._callAppListener('onTrackReady', rTrack);
            });
        }
        _getReqHeaders() {
            const userId = this._context.getCurrentId();
            // 直播观众端 RoomId 与 UserId 保持一致
            return {
                'App-Key': this._context.getAppkey(),
                RoomId: userId,
                Token: this._joinResData.token,
                RoomType: RTCMode.LIVE,
                UserId: userId,
                'Session-Id': this._sessionId,
                'Peer-Connection-Id': this._pcName,
                'Client-Session-Id': this._clientSessionId
            };
        }
        _exchangeHandle(body) {
            return this._service.broadcastSubscribe(this._getReqHeaders(), body);
        }
        async _updateSubListHandle(tracks, forceReq = false) {
            var _a;
            const roomStatusCode = this._assertRoomDestroyed();
            if (roomStatusCode) {
                return { code: exports.RCRTCCode.ROOM_HAS_BEEN_DESTROYED };
            }
            if (!engine.validate('resources', tracks, () => {
                return engine.isArray(tracks) && tracks.every(res => {
                    return res instanceof RCRemoteTrack || res.track instanceof RCRemoteTrack;
                });
            }, true)) {
                return { code: exports.RCRTCCode.PARAMS_ERROR };
            }
            let attrs = tracks.map(item => {
                return item instanceof RCRemoteTrack ? { track: item } : Object.assign({}, item);
            });
            // resourceId 去重，并做数据深拷贝
            const map = {};
            attrs = attrs.filter(res => {
                const trackId = res.track.getTrackId();
                if (map[trackId]) {
                    return false;
                }
                return (map[trackId] = true);
            }).map(item => (Object.assign({}, item)));
            const crtSubList = this._subscribedList.map(item => (Object.assign({}, item)));
            if (!forceReq) {
                let changed = false;
                // 检查与现有订阅列表是否有差别
                attrs.forEach(item => {
                    const index = crtSubList.findIndex(tmp => tmp.track === item.track);
                    // 新增订阅
                    if (index === -1) {
                        changed = true;
                        return;
                    }
                    // 已存在的订阅内容，检测 tiny 是否有变更，同时从 crtSubList 中移除
                    // 剩余未移除的内容为已取消订阅内容
                    const crt = crtSubList.splice(index, 1)[0];
                    if (crt.subTiny !== item.subTiny) {
                        changed = true;
                    }
                });
                // crtSubList 中剩余内容为取消订阅资源
                if (crtSubList.length) {
                    changed = true;
                }
                if (!changed) {
                    return { code: exports.RCRTCCode.SUCCESS };
                }
            }
            // 客户端主动调用 api 发请求时，清除 ice 断线重连的定时器
            this._pc.clearReTryExchangeTimer();
            this._pc.updateSubRemoteTracks(attrs.map(item => item.track));
            // MediaServer 交互
            const { reqBody } = await this._createSubscribeParams(attrs, {}, false);
            const result = await this._exchangeHandle(reqBody);
            if (crtSubList.length) {
                // 取消订阅时，清除 parseRTCReport 模块中存储的数据
                const resourceIds = [];
                crtSubList.forEach(item => {
                    resourceIds.push(item.track.getTrackId());
                });
                (_a = this._pc.reportParser) === null || _a === void 0 ? void 0 : _a.clearLatestPacketsRecv(resourceIds);
            }
            if (result.code !== exports.RCRTCCode.SUCCESS) {
                return { code: result.code };
            }
            const { sdp: answer, resultCode, message, subscribedList } = result.data;
            if (resultCode !== exports.RCRTCCode.SUCCESS) {
                logger.error('change subscribe list failed:', message, resultCode);
                return { code: resultCode };
            }
            // 修改 answer.sdp 中 msid
            attrs.forEach(item => {
                const { track } = item;
                if (track.isMCUTrack()) {
                    const sdpMsid = this._roomRes[track.getTrackId()].msid;
                    const { tag, userId: roomId } = parseTrackId(track.getTrackId());
                    const currentMsid = [roomId, tag].join('_');
                    answer.sdp = answer.sdp.replace(new RegExp(sdpMsid, 'g'), currentMsid);
                }
            });
            const resCode = await this._pc.setRemoteAnswer(answer.sdp);
            if (resCode !== exports.RCRTCCode.SUCCESS) {
                return { code: resCode };
            }
            // 获取真正订阅成功的资源
            const subSuccessTrackIds = subscribedList === null || subscribedList === void 0 ? void 0 : subscribedList.map(item => `${item.msid}_${item.mediaType}`);
            const subSuccessList = attrs.filter(item => {
                if (item.track.isMCUTrack()) {
                    const serverTrackInfo = this._roomRes[item.track.getTrackId()];
                    const sdpResourceId = `${serverTrackInfo.msid}_${serverTrackInfo.mediaType}`;
                    return subSuccessTrackIds.includes(sdpResourceId);
                }
                return subSuccessTrackIds === null || subSuccessTrackIds === void 0 ? void 0 : subSuccessTrackIds.includes(item.track.getTrackId());
            });
            const afterReplaceTrackIds = subSuccessList === null || subSuccessList === void 0 ? void 0 : subSuccessList.map(item => `${item.track.getTrackId()}`);
            const failedList = attrs.filter(item => !(afterReplaceTrackIds === null || afterReplaceTrackIds === void 0 ? void 0 : afterReplaceTrackIds.includes(item.track.getTrackId())));
            // 更新 remoteTrack.isSubscribed
            for (const trackId in this._remoteTracks) {
                const subed = subSuccessList.some(item => {
                    return item.track.getTrackId() === trackId;
                });
                this._remoteTracks[trackId].__innerSetSubscribed(subed);
            }
            // 更新本地订阅关系
            this._subscribedList.splice(0, this._subscribedList.length, ...subSuccessList);
            return failedList.length ? { code: exports.RCRTCCode.SUCCESS, failedList } : { code: exports.RCRTCCode.SUCCESS };
        }
        /**
         * 对比 cdn_uris 资源
         * @param newCDNUris 新的 cdn_uris 数据
         */
        async _diffCDNUris(newCDNUris) {
            /**
             * CDN 资源减少: 上次 CDNUris 中有 url，变更后无 url
             */
            if (this._CDNUris.url && !newCDNUris.url) {
                this._callAppListener('onCDNInfoDisable');
                /**
                 * 更新内存中存储的 cdn_uris 数据
                 */
                this._CDNUris = newCDNUris;
                return;
            }
            /**
             * CDN 资源新增条件:
             * 内存中无 CDNUris 或
             * 上次 CDNUris 无 url，变更后有 url
             */
            if (!this._CDNUris || (!this._CDNUris.url && newCDNUris.url)) {
                this._callAppListener('onCDNInfoEnable', {
                    resolution: `W${newCDNUris.w}_H${newCDNUris.h}`,
                    fps: `FPS_${newCDNUris.fps}`
                });
            }
            /**
             * CDN 资源变更: w、h、fps 其中一项变化
             */
            const isWChange = (this._CDNUris.w && newCDNUris.w && (this._CDNUris.w !== newCDNUris.w));
            const isHChange = (this._CDNUris.h && newCDNUris.h && (this._CDNUris.h !== newCDNUris.h));
            const isFpsChange = (this._CDNUris.fps && newCDNUris.fps && (this._CDNUris.fps !== newCDNUris.fps));
            if (isWChange || isHChange || isFpsChange) {
                this._callAppListener('onCDNInfoChange', {
                    resolution: `W${newCDNUris.w}_H${newCDNUris.h}`,
                    fps: `FPS_${newCDNUris.fps}`
                });
            }
            /**
             * 更新内存中存储的 cdn_uris 数据
             */
            this._CDNUris = newCDNUris;
        }
        /**
         * 获取 CDN 资源对应的拉流地址
         * _CDNUris 无 url 时，说明未开启 CDN 推送
         * @returns CDNPlayUrl
         */
        async _getCDNPlayUrl(params) {
            const { w, h, fps } = params;
            const kind = this._initOptions.pullInnerCDNProtocol || exports.RCInnerCDNPullKind.FLV;
            const useHttps = (this._initOptions.pullInnerCDNUseHttps === exports.RCInnerCDNPullIsHttps.NOT_HTTPS) ? exports.RCInnerCDNPullIsHttps.NOT_HTTPS : exports.RCInnerCDNPullIsHttps.HTTPS;
            if (!this._CDNUris.url) {
                logger.error(`cdn_uris url is empty, the anchor need to open or push CDN, code: ${exports.RCRTCCode.CDN_RESOURCE_IS_EMPTY}`);
                return { code: exports.RCRTCCode.CDN_RESOURCE_IS_EMPTY };
            }
            const headers = {
                'App-Key': this._context.getAppkey(),
                Token: this._joinResData.token,
                RoomId: this.getRoomId(),
                UserId: this._context.getCurrentId(),
                SessionId: this.getSessionId()
            };
            const paramsArr = [];
            w && paramsArr.push(`w=${w}`);
            h && paramsArr.push(`h=${h}`);
            fps && paramsArr.push(`fps=${fps}`);
            paramsArr.push(`kind=${kind}`);
            paramsArr.push(`is_https=${useHttps}`);
            const paramsStr = paramsArr.join('&');
            let requestUrl = `${this._CDNUris.url}?`;
            paramsStr && (requestUrl += paramsStr);
            const { code, res } = await this._service.getCDNResourceInfo(headers, requestUrl);
            if (code !== exports.RCRTCCode.SUCCESS) {
                logger.error(`getCDNPlayUrl failed: ${code}`);
                return { code };
            }
            logger.info(`getCDNPlayUrl success: ${res === null || res === void 0 ? void 0 : res.data.pull_url}`);
            return {
                code,
                CDNPlayUrl: res === null || res === void 0 ? void 0 : res.data.pull_url
            };
        }
        /**
         * 获取 CDN 资源对应的拉流地址
         * @returns CDNPlayUrl
         */
        async getCDNPlayUrl(resolution, fps) {
            engine.logger.info(RCLoggerTag.L_AUDIENCE_LIVING_ROOM_GET_CDN_PLAY_URL_T, {
                resolution,
                fps
            }, {
                logSource: engine.LogSource.RTC
            });
            if (resolution && !isValidResolution(resolution)) {
                logger.error('`resolution` is invalid');
                engine.logger.error(RCLoggerTag.L_AUDIENCE_LIVING_ROOM_GET_CDN_PLAY_URL_R, {
                    status: RCLoggerStatus.FAILED,
                    code: exports.RCRTCCode.PARAMS_ERROR,
                    msg: 'params error -> resolution'
                }, {
                    logSource: engine.LogSource.RTC
                });
                return { code: exports.RCRTCCode.PARAMS_ERROR };
            }
            if (fps && !isValidFPS(fps)) {
                logger.error('`fps` is invalid');
                engine.logger.error(RCLoggerTag.L_AUDIENCE_LIVING_ROOM_GET_CDN_PLAY_URL_R, {
                    status: RCLoggerStatus.FAILED,
                    code: exports.RCRTCCode.PARAMS_ERROR,
                    msg: 'params error -> fps'
                }, {
                    logSource: engine.LogSource.RTC
                });
                return { code: exports.RCRTCCode.PARAMS_ERROR };
            }
            const { width, height } = resolution ? transResolution(resolution) : { width: null, height: null };
            const fpsNum = fps ? transFrameRate(fps) : null;
            const params = {};
            width && (params.w = width);
            height && (params.h = height);
            fpsNum && (params.fps = fpsNum);
            engine.logger.info(RCLoggerTag.L_AUDIENCE_LIVING_ROOM_GET_CDN_PLAY_URL_R, {
                status: RCLoggerStatus.SUCCESSED,
                resolution,
                fps
            }, {
                logSource: engine.LogSource.RTC
            });
            return this._getCDNPlayUrl(params);
        }
        /**
         * 订阅资源
         * @param tracks
         */
        async subscribe(tracks) {
            return push(() => this._subscribeHandle(tracks, false), 'audience-sub');
        }
        async addSubscribeTask(tracks) {
            // TODO: 重构RCAudienceLivingRoom, 使用队列处理
            return push(() => this._subscribeHandle(tracks, false), 'audience-sub');
        }
        async __unsubscribe(tracks) {
            var _a;
            engine.logger.info(RCLoggerTag.L_AUDIENCE_LIVING_ROOM_UNSUBSCRIBE_T, {
                trackIds: tracks.map(track => track.getTrackId()),
                roomId: this._roomId,
                userId: this._context.getCurrentId()
            }, {
                logSource: engine.LogSource.RTC
            });
            if (!engine.validate('tracks', tracks, () => {
                return engine.isArray(tracks) && tracks.length > 0 && tracks.every(item => item instanceof RCRemoteTrack);
            }, true)) {
                logger.error(`unsubscribe failed, tracks is invalid -> roomId: ${this._roomId}`);
                engine.logger.error(RCLoggerTag.L_AUDIENCE_LIVING_ROOM_UNSUBSCRIBE_R, {
                    status: RCLoggerStatus.FAILED,
                    code: exports.RCRTCCode.PARAMS_ERROR,
                    msg: 'params error -> tracks'
                }, {
                    logSource: engine.LogSource.RTC
                });
                return { code: exports.RCRTCCode.PARAMS_ERROR };
            }
            // 计算剩余订阅列表
            const crtSubList = this._subscribedList.map(item => (Object.assign({}, item)))
                .filter(item => !tracks.includes(item.track));
            // 北极星上报
            (_a = this._polarisReport) === null || _a === void 0 ? void 0 : _a.sendR2(R2Action.SUBSCRIBE, R2Status.END, tracks.map(item => item.getTrackId()));
            engine.logger.info(RCLoggerTag.L_AUDIENCE_LIVING_ROOM_UNSUBSCRIBE_R, {
                status: RCLoggerStatus.SUCCESSED,
                trackIds: tracks.map(track => track.getTrackId()),
                roomId: this._roomId,
                userId: this._context.getCurrentId()
            }, {
                logSource: engine.LogSource.RTC
            });
            return this._updateSubListHandle(crtSubList, false);
        }
        /**
         * 取消订阅资源
         * @param tracks
         */
        async unsubscribe(tracks) {
            return push(() => this.__unsubscribe(tracks), 'audience-unsub');
        }
        async addUnsubscribeTask(tracks) {
            // TODO: 重构RCAudienceLivingRoom, 使用队列处理
            return push(() => this.__unsubscribe(tracks), 'audience-unsub');
        }
        /**
         * 退出房间并销毁当前房间实例，退出后该房间的所有方法将不可用
         */
        async __destroy(quitRoom) {
            var _a, _b;
            if (this._destroyed) {
                return;
            }
            this._destroyed = true;
            // 清除音量上报定时器
            (_a = this._audioLevelReport) === null || _a === void 0 ? void 0 : _a.clearAudioLevelReportTimer();
            // 退出 signal 房间
            if (quitRoom) {
                await this._context.quitLivingRoomAsAudience(this._roomId);
            }
            // 中断与 MediaServer 的连接
            await this._service.broadcastExit(this._getReqHeaders());
            // 销毁 pc 连接
            (_b = this._pc) === null || _b === void 0 ? void 0 : _b.destroy();
            // 销毁 polarisReport 实例
            this._polarisReport = null;
            // 清空 onrtcdatachange 事件监听
            // this._context.onrtcdatachange = () => {}
            this._context.registerRTCSignalListener(undefined);
        }
        /**
         * 根据 trackId 获取房间内的远端资源
         * @param trackId
         */
        getRemoteTrack(trackId) {
            return this._remoteTracks[trackId];
        }
        /**
         * 获取 _pc 实例
         */
        __getPC() {
            return this._peerCManager.getPCList();
        }
        /**
         * TODO 待优化
         * @param trackId
         */
        getLocalTrack(trackId) {
            return {};
        }
        /**
         * 断线重连后处理逻辑, SDK 内部处理调用
         */
        async __onReconnected() {
            /**
             * 重新加入房间后，从头拉取全量资源
             */
            const { code } = await this._context.joinLivingRoomAsAudience(this._roomId, RTCMode.LIVE);
            if (code !== engine.ErrorCode.SUCCESS) {
                logger.error('join living room error when on reconnected');
            }
        }
        /**
         * 观众房间事件注册
         * @param tag 参数描述
         */
        registerRoomEventListener(listener) {
            this._appListener = listener;
        }
        /**
         * 音量上报
         * @param handler 业务端传入的音量上报事件
         * @param gap 上报时间间隔
         */
        onAudioLevelChange(handler, gap) {
            var _a;
            (_a = this._audioLevelReport) === null || _a === void 0 ? void 0 : _a.clearAudioLevelReportTimer();
            this._audioLevelReport = new RCAudioLevelReport(this);
            this._audioLevelReport.onAudioLevelChange(handler, gap || 1000);
            engine.logger.info(RCLoggerTag.L_AUDIENCE_LIVING_ROOM_AUDIO_LEVEL_CHANGE_O, {
                status: RCLoggerStatus.SUCCESSED,
                handler: handler === null || handler === void 0 ? void 0 : handler.name,
                gap
            }, {
                logSource: engine.LogSource.RTC
            });
        }
        /**
         * 注册房间数据监控
         * @param listener
         */
        registerReportListener(listener) {
            this._reportListener = listener;
        }
        /**
         * 获取房间 Id
         */
        getRoomId() {
            return this._roomId;
        }
        /**
         * 获取当前 userId
         */
        getCrtUserId() {
            return this._context.getCurrentId();
        }
        /**
         * 获取房间当前会话 Id，当房间内已无成员时房间会回收，重新加入时 sessionId 将更新
         */
        getSessionId() {
            return this._sessionId;
        }
        /**
         * 获取远程主播用户列表
         */
        getRemoteUserIds() {
            return this._roomAnchorList;
        }
        /**
         * 获取远端用户的资源列表
         * @param userId
         * @returns
         */
        getRemoteTracksByUserId(userId) {
            const tracks = [];
            for (const trackId in this._remoteTracks) {
                const track = this._remoteTracks[trackId];
                if (track.getUserId() === userId) {
                    tracks.push(track);
                }
            }
            return tracks;
        }
        /**
         * 获取房间内所有已发布的远端资源列表, 包含合流资源
         * @returns
         */
        getRemoteTracks() {
            const tracks = [];
            const mcuTracks = [];
            for (const id in this._remoteTracks) {
                // 合流资源最多两道
                if (mcuTracks.length === 2)
                    break;
                const track = this._remoteTracks[id];
                if (track.isMCUTrack()) {
                    mcuTracks.push(track);
                }
            }
            this._roomAnchorList.forEach(id => {
                tracks.push(...this.getRemoteTracksByUserId(id));
            });
            return [...mcuTracks, ...tracks];
        }
        /**
         * 获取远端 RTC tracks
         */
        getRemoteRTCTracks() {
            const tracks = [];
            for (const trackId in this._remoteTracks) {
                const track = this._remoteTracks[trackId];
                if (!track.isMCUTrack()) {
                    tracks.push(track);
                }
            }
            return tracks;
        }
        /**
         * 获取远端 MCU tracks
         */
        getRemoteMCUTracks() {
            const tracks = [];
            for (const trackId in this._remoteTracks) {
                const track = this._remoteTracks[trackId];
                if (track.isMCUTrack()) {
                    tracks.push(track);
                }
            }
            return tracks;
        }
        /**
         * 获取房间内 CDN 信息
         */
        getCDNInfo() {
            return this._CDNUris.w ? {
                resolution: `W${this._CDNUris.w}_H${this._CDNUris.h}`,
                fps: `FPS_${this._CDNUris.fps}`,
                CDNEnable: this._CDNUris.enableInnerCDN
            } : {
                CDNEnable: false
            };
        }
        getClientSessionId() {
            return this._clientSessionId;
        }
    }

    class RCMediaStreamCapture {
        constructor(_context) {
            this._context = _context;
            this._isElectron = /Electron/.test(navigator.userAgent);
        }
        async _getMediaStream(constraints, method = 'getUserMedia') {
            try {
                const constraintsConfig = this.setConstraintsConfig(constraints);
                const stream = await navigator.mediaDevices[method](constraintsConfig);
                return { code: exports.RCRTCCode.SUCCESS, stream };
            }
            catch (error) {
                if (error.message === 'Permission denied') {
                    return { code: exports.RCRTCCode.BROWSER_PERMISSION_DENIED };
                }
                if (error.message === 'Permission denied by system') {
                    return { code: exports.RCRTCCode.SYSTEM_PERMISSION_DENIED };
                }
                logger.error(`get user media failed -> ${error.message}`);
            }
            return { code: method === 'getUserMedia' ? exports.RCRTCCode.GET_USER_MEDIA_FAILED : exports.RCRTCCode.GET_DISPLAY_MEDIA_FAILED };
        }
        /**
         * 如果用户设置了音频约束为true，那么我们将音频约束设置为一个空对象，
         * 然后我们将检查浏览器是否支持noiseSuppression、autoGainControl和echoCancellation约束，
         * 如果支持，那么我们将设置音频约束为真
         * @param {any} constraints - 约束参数与 getUserMedia 方法中的约束参数相同。
         * @returns 返回值是约束对象。
         */
        setConstraintsConfig(constraints) {
            if ((constraints === null || constraints === void 0 ? void 0 : constraints.audio) && !this._isElectron) {
                if (typeof constraints.audio === 'boolean') {
                    constraints.audio = {};
                }
                // 获取 mediaDevices 支持的约束条件, 如果硬件支持开启则开启
                const supported = navigator.mediaDevices.getSupportedConstraints();
                // 降噪
                if (supported.noiseSuppression) {
                    constraints.audio.noiseSuppression = !!supported.noiseSuppression;
                }
                // 增益
                if (supported.autoGainControl) {
                    constraints.audio.autoGainControl = !!supported.autoGainControl;
                }
                // 回声消除
                if (supported.echoCancellation) {
                    constraints.audio.echoCancellation = !!supported.echoCancellation;
                }
                logger.info(`browser supported -> ${JSON.stringify(supported)}`);
            }
            return constraints;
        }
        /**
         * 从麦克风中捕获音轨数据
         * @param tag
         * @param options
         * @returns
         */
        async createMicrophoneAudioTrack(tag = 'RongCloudRTC', options) {
            if (!isValidTag(tag)) {
                engine.logger.error(RCLoggerTag.L_RTC_CLIENT_CREATE_MICROPHONE_AUDIO_TRACK_O, {
                    status: RCLoggerStatus.FAILED,
                    code: exports.RCRTCCode.INVALID_TAGS,
                    msg: 'invalid tag'
                }, {
                    logSource: engine.LogSource.RTC
                });
                return { code: exports.RCRTCCode.INVALID_TAGS };
            }
            const userId = this._context.getCurrentId();
            if (!userId) {
                engine.logger.error(RCLoggerTag.L_RTC_CLIENT_CREATE_MICROPHONE_AUDIO_TRACK_O, {
                    status: RCLoggerStatus.FAILED,
                    code: exports.RCRTCCode.INVALID_USER_ID,
                    msg: 'invalid IM connection，invalid userId'
                }, {
                    logSource: engine.LogSource.RTC
                });
                return { code: exports.RCRTCCode.INVALID_USER_ID };
            }
            const { stream, code } = await this._getMediaStream({ audio: { deviceId: options === null || options === void 0 ? void 0 : options.micphoneId, sampleRate: options === null || options === void 0 ? void 0 : options.sampleRate } });
            if (code !== exports.RCRTCCode.SUCCESS) {
                engine.logger.error(RCLoggerTag.L_RTC_CLIENT_CREATE_MICROPHONE_AUDIO_TRACK_O, {
                    status: RCLoggerStatus.FAILED,
                    code,
                    msg: 'Failed to get microphone audio stream'
                }, {
                    logSource: engine.LogSource.RTC
                });
                return { code };
            }
            const audioTrack = stream.getAudioTracks()[0];
            const localAudioTrack = new RCMicphoneAudioTrack(tag, userId, audioTrack);
            engine.logger.info(RCLoggerTag.L_RTC_CLIENT_CREATE_MICROPHONE_AUDIO_TRACK_O, {
                status: RCLoggerStatus.SUCCESSED,
                trackId: localAudioTrack.getTrackId()
            }, {
                logSource: engine.LogSource.RTC
            });
            return { code, track: localAudioTrack };
        }
        /**
         * 由摄像头捕获视轨数据
         * @param tag
         * @param options
         * @returns
         */
        async createCameraVideoTrack(tag = 'RongCloudRTC', options) {
            if (!isValidTag(tag)) {
                engine.logger.error(RCLoggerTag.L_RTC_CLIENT_CREATE_CAMERA_VIDEO_TRACK_O, {
                    status: RCLoggerStatus.FAILED,
                    code: exports.RCRTCCode.INVALID_TAGS,
                    msg: 'invalid tag'
                }, {
                    logSource: engine.LogSource.RTC
                });
                return { code: exports.RCRTCCode.INVALID_TAGS };
            }
            const userId = this._context.getCurrentId();
            if (!userId) {
                engine.logger.error(RCLoggerTag.L_RTC_CLIENT_CREATE_CAMERA_VIDEO_TRACK_O, {
                    status: RCLoggerStatus.FAILED,
                    code: exports.RCRTCCode.INVALID_TAGS,
                    msg: 'invalid IM connection，invalid userId'
                }, {
                    logSource: engine.LogSource.RTC
                });
                return { code: exports.RCRTCCode.INVALID_USER_ID };
            }
            const resolution = isValidResolution(options === null || options === void 0 ? void 0 : options.resolution) ? options.resolution : exports.RCResolution.W640_H480;
            const { width, height } = transResolution(resolution);
            const { stream, code } = await this._getMediaStream({
                video: {
                    deviceId: options === null || options === void 0 ? void 0 : options.cameraId,
                    frameRate: transFrameRate((options === null || options === void 0 ? void 0 : options.frameRate) || exports.RCFrameRate.FPS_15),
                    width,
                    height,
                    facingMode: options === null || options === void 0 ? void 0 : options.faceMode
                }
            });
            if (code !== exports.RCRTCCode.SUCCESS) {
                engine.logger.error(RCLoggerTag.L_RTC_CLIENT_CREATE_CAMERA_VIDEO_TRACK_O, {
                    status: RCLoggerStatus.FAILED,
                    code: exports.RCRTCCode.INVALID_TAGS,
                    msg: 'Failed to get camera video stream'
                }, {
                    logSource: engine.LogSource.RTC
                });
                return { code };
            }
            const videoTrack = stream.getVideoTracks()[0];
            const cameraTrack = new RCCameraVideoTrack(tag, userId, videoTrack);
            engine.logger.info(RCLoggerTag.L_RTC_CLIENT_CREATE_CAMERA_VIDEO_TRACK_O, {
                status: RCLoggerStatus.SUCCESSED,
                trackId: cameraTrack.getTrackId()
            }, {
                logSource: engine.LogSource.RTC
            });
            return { code, track: cameraTrack };
        }
        /**
         * 通过摄像头与麦克风采集音视频轨道数据
         * @param tag
         * @param options
         * @returns
         */
        async createMicrophoneAndCameraTracks(tag = 'RongCloudRTC', options) {
            var _a, _b, _c, _d, _e, _f;
            const tracks = [];
            if (!isValidTag(tag)) {
                engine.logger.error(RCLoggerTag.L_RTC_CLIENT_CREATE_MICROPHONE_AND_CAMERA_TRACKS_O, {
                    status: RCLoggerStatus.FAILED,
                    code: exports.RCRTCCode.INVALID_TAGS,
                    msg: 'invalid tag'
                }, {
                    logSource: engine.LogSource.RTC
                });
                return { code: exports.RCRTCCode.INVALID_TAGS, tracks };
            }
            const userId = this._context.getCurrentId();
            if (!userId) {
                engine.logger.error(RCLoggerTag.L_RTC_CLIENT_CREATE_MICROPHONE_AND_CAMERA_TRACKS_O, {
                    status: RCLoggerStatus.FAILED,
                    code: exports.RCRTCCode.INVALID_USER_ID,
                    msg: 'invalid IM connection，invalid userId'
                }, {
                    logSource: engine.LogSource.RTC
                });
                return { code: exports.RCRTCCode.INVALID_USER_ID, tracks };
            }
            const resolution = isValidResolution((_a = options === null || options === void 0 ? void 0 : options.video) === null || _a === void 0 ? void 0 : _a.resolution) ? options.video.resolution : exports.RCResolution.W640_H480;
            const { width, height } = transResolution(resolution);
            const { stream, code } = await this._getMediaStream({
                video: {
                    deviceId: (_b = options === null || options === void 0 ? void 0 : options.video) === null || _b === void 0 ? void 0 : _b.cameraId,
                    frameRate: transFrameRate(((_c = options === null || options === void 0 ? void 0 : options.video) === null || _c === void 0 ? void 0 : _c.frameRate) || exports.RCFrameRate.FPS_15),
                    width,
                    height,
                    facingMode: (_d = options === null || options === void 0 ? void 0 : options.video) === null || _d === void 0 ? void 0 : _d.faceMode
                },
                audio: { deviceId: (_e = options === null || options === void 0 ? void 0 : options.audio) === null || _e === void 0 ? void 0 : _e.micphoneId, sampleRate: (_f = options === null || options === void 0 ? void 0 : options.audio) === null || _f === void 0 ? void 0 : _f.sampleRate }
            });
            if (code !== exports.RCRTCCode.SUCCESS) {
                engine.logger.error(RCLoggerTag.L_RTC_CLIENT_CREATE_MICROPHONE_AND_CAMERA_TRACKS_O, {
                    status: RCLoggerStatus.FAILED,
                    code,
                    msg: 'Failed to get audio and video stream of camera and microphone'
                }, {
                    logSource: engine.LogSource.RTC
                });
                return { code, tracks };
            }
            stream.getTracks().forEach(track => {
                if (track.kind === 'video') {
                    tracks.push(new RCCameraVideoTrack(tag, userId, track));
                }
                else {
                    tracks.unshift(new RCMicphoneAudioTrack(tag, userId, track));
                }
            });
            engine.logger.info(RCLoggerTag.L_RTC_CLIENT_CREATE_MICROPHONE_AND_CAMERA_TRACKS_O, {
                status: RCLoggerStatus.SUCCESSED,
                trackIds: tracks.map(track => track.getTrackId())
            }, {
                logSource: engine.LogSource.RTC
            });
            return { code, tracks };
        }
        /**
         * 创建屏幕共享视频流，默认分辨率 `1280 * 720`，帧率 `15`
         * @param tag 屏幕共享视轨数据标识
         * @param options
         * @description
         * 支持 Electron 平台下通过制定 `chromeMediaSourceId` 的方式获取屏幕共享视频。
         * 参考：https://www.electronjs.org/docs/api/desktop-capturer
         */
        async createScreenVideoTrack(tag = 'screenshare', options) {
            const res = await this._createScreenTracks(tag, false, RCLoggerTag.L_RTC_CLIENT_CREATE_SCREEN_VIDEO_TRACK_O, options);
            if (res.code === exports.RCRTCCode.SUCCESS) {
                return { code: res.code, track: res.tracks[0] };
            }
            return res;
        }
        /**
         * 创建带音频的屏幕共享资源
         * @param tag 屏幕共享视轨数据标识
         * @param options
         * @description electron 中 mac 系统暂不支持屏幕共享采集声音
         * @returns 在可以取到音频的情况下，tracks 中包含音轨和视轨；取不到音视频时 tracks 仅返回视轨
         */
        async createScreenWithAudioTracks(tag = 'screenshare', options) {
            return this._createScreenTracks(tag, true, RCLoggerTag.L_RTC_CLIENT_CREATE_SCREEN_VIDEO_AND_AUDIO_TRACKS_O, options);
        }
        async _createScreenTracks(tag, withAudio, loggerTag, options) {
            var _a, _b;
            if (!isValidTag(tag)) {
                engine.logger.error(loggerTag, {
                    status: RCLoggerStatus.FAILED,
                    code: exports.RCRTCCode.INVALID_TAGS,
                    msg: 'invalid tag'
                }, {
                    logSource: engine.LogSource.RTC
                });
                return { code: exports.RCRTCCode.INVALID_TAGS };
            }
            const userId = this._context.getCurrentId();
            if (!userId) {
                engine.logger.error(loggerTag, {
                    status: RCLoggerStatus.FAILED,
                    code: exports.RCRTCCode.INVALID_USER_ID,
                    msg: 'invalid IM connection，invalid userId'
                }, {
                    logSource: engine.LogSource.RTC
                });
                return { code: exports.RCRTCCode.INVALID_USER_ID };
            }
            if (!ifSupportScreenShare()) {
                engine.logger.error(RCLoggerTag.L_RTC_CLIENT_CREATE_SCREEN_VIDEO_TRACK_O, {
                    status: RCLoggerStatus.FAILED,
                    code: exports.RCRTCCode.BROWSER_NOT_SUPPORT,
                    msg: 'browser not support'
                }, {
                    logSource: engine.LogSource.RTC
                });
                return { code: exports.RCRTCCode.BROWSER_NOT_SUPPORT };
            }
            const isMac = /macintosh|mac os x/i.test(navigator.userAgent);
            /**
             * electron 中 mac 系统暂不支持屏幕共享采集声音
             */
            if (this._isElectron && isMac && withAudio) {
                engine.logger.warn(loggerTag, {
                    status: RCLoggerStatus.INFO,
                    code: exports.RCRTCCode.MAC_IN_ELECTRON_NOT_SUPPORT_SCREEN_SHARE_WITH_AUDIO,
                    msg: 'mac in electron not support screen share with audio'
                });
            }
            const audio = (this._isElectron && isMac) ? false : withAudio;
            /**
             * electron 平台下 video 的配置项 chromeMediaSourceId 为非必传
             * 传入时，类型为字符串
             */
            if (this._isElectron && !engine.isUndefined(options === null || options === void 0 ? void 0 : options.chromeMediaSourceId) && !engine.isString(options === null || options === void 0 ? void 0 : options.chromeMediaSourceId)) {
                engine.logger.error(loggerTag, {
                    status: RCLoggerStatus.FAILED,
                    code: exports.RCRTCCode.PARAMS_ERROR,
                    msg: 'params error -> options.chromeMediaSourceId type is string'
                }, {
                    logSource: engine.LogSource.RTC
                });
                return { code: exports.RCRTCCode.PARAMS_ERROR };
            }
            const resolution = isValidResolution(options === null || options === void 0 ? void 0 : options.resolution) ? options.resolution : exports.RCResolution.W1280_H720;
            const { width, height } = transResolution(resolution);
            const video = this._isElectron ? {
                mandatory: {
                    chromeMediaSourceId: options === null || options === void 0 ? void 0 : options.chromeMediaSourceId,
                    chromeMediaSource: 'desktop',
                    minWidth: width,
                    maxWidth: width,
                    minHeight: height,
                    maxHeight: height
                }
                // electron 环境下不可指定 frameRate
                // frameRate: transFrameRate(options?.frameRate || RCFrameRate.FPS_15),
            } : {
                frameRate: transFrameRate((options === null || options === void 0 ? void 0 : options.frameRate) || exports.RCFrameRate.FPS_15),
                width,
                height
            };
            /**
             * chromeMediaSourceId 为 undefined 时，删掉 video 中的 chromeMediaSourceId 配置
             */
            if (!(options === null || options === void 0 ? void 0 : options.chromeMediaSourceId) && this._isElectron) {
                (_a = video.mandatory) === null || _a === void 0 ? true : delete _a.chromeMediaSourceId;
            }
            /**
             * electron 中采集声音 video、audio 参数赋值
             */
            let electronWindowAudioConfig = null;
            if (audio && this._isElectron) {
                (_b = video.mandatory) === null || _b === void 0 ? true : delete _b.chromeMediaSourceId;
                electronWindowAudioConfig = {
                    mandatory: {
                        chromeMediaSource: 'desktop'
                    }
                };
            }
            const { stream, code } = await this._getMediaStream({ video, audio: electronWindowAudioConfig || audio }, this._isElectron ? 'getUserMedia' : 'getDisplayMedia');
            if (code !== exports.RCRTCCode.SUCCESS) {
                engine.logger.error(loggerTag, {
                    status: RCLoggerStatus.FAILED,
                    code,
                    msg: 'Failed to get shared screen video stream'
                }, {
                    logSource: engine.LogSource.RTC
                });
                return { code };
            }
            const videoTrack = stream.getVideoTracks()[0];
            const screenVideoTrack = new RCScreenVideoTrack(tag, userId, videoTrack);
            const screenTracks = [screenVideoTrack];
            if (audio) {
                const audioTrack = stream.getAudioTracks()[0];
                audioTrack && screenTracks.push(new RCScreenAudioTrack(tag, userId, audioTrack));
            }
            engine.logger.info(loggerTag, {
                status: RCLoggerStatus.SUCCESSED,
                trackIds: screenTracks.map((track) => track.getTrackId())
            }, {
                logSource: engine.LogSource.RTC
            });
            return { code, tracks: screenTracks };
        }
        /**
         * 创建 RCLocalAudioTrack 实例
         * @param tag
         * @param track
         * @returns
         */
        async createLocalAudioTrack(tag, track) {
            if (!isValidTag(tag)) {
                engine.logger.error(RCLoggerTag.L_RTC_CLIENT_CREATE_LOCAL_AUDIO_TRACK_O, {
                    status: RCLoggerStatus.FAILED,
                    code: exports.RCRTCCode.INVALID_TAGS,
                    msg: 'invalid tag'
                }, {
                    logSource: engine.LogSource.RTC
                });
                return { code: exports.RCRTCCode.INVALID_TAGS };
            }
            if (!track || track.toString() !== '[object MediaStreamTrack]' || track.kind !== 'audio') {
                engine.logger.error(RCLoggerTag.L_RTC_CLIENT_CREATE_LOCAL_AUDIO_TRACK_O, {
                    status: RCLoggerStatus.FAILED,
                    code: exports.RCRTCCode.INVALID_USER_ID,
                    msg: 'Failed to create custom stream'
                }, {
                    logSource: engine.LogSource.RTC
                });
                return { code: exports.RCRTCCode.CREATE_CUSTOM_TRACK_FAILED };
            }
            const userId = this._context.getCurrentId();
            if (!userId) {
                engine.logger.error(RCLoggerTag.L_RTC_CLIENT_CREATE_LOCAL_AUDIO_TRACK_O, {
                    status: RCLoggerStatus.FAILED,
                    code: exports.RCRTCCode.INVALID_USER_ID,
                    msg: 'invalid IM connection，invalid userId'
                }, {
                    logSource: engine.LogSource.RTC
                });
                return { code: exports.RCRTCCode.INVALID_USER_ID };
            }
            const localAudioTrack = new RCLocalAudioTrack(tag, userId, track);
            engine.logger.info(RCLoggerTag.L_RTC_CLIENT_CREATE_LOCAL_AUDIO_TRACK_O, {
                status: RCLoggerStatus.SUCCESSED,
                trackId: localAudioTrack.getTrackId()
            }, {
                logSource: engine.LogSource.RTC
            });
            return { code: exports.RCRTCCode.SUCCESS, track: localAudioTrack };
        }
        /**
         * 创建 RCLocalVideoTrack 实例
         * @param tag 视轨数据标识
         * @param track MediaStreamTrack 实例
         * @returns
         */
        async createLocalVideoTrack(tag, track) {
            if (!isValidTag(tag)) {
                engine.logger.error(RCLoggerTag.L_RTC_CLIENT_CREATE_LOCAL_VIDEO_TRACK_O, {
                    status: RCLoggerStatus.FAILED,
                    code: exports.RCRTCCode.INVALID_TAGS,
                    msg: 'invalid tag'
                }, {
                    logSource: engine.LogSource.RTC
                });
                return { code: exports.RCRTCCode.INVALID_TAGS };
            }
            if (!track || track.toString() !== '[object MediaStreamTrack]' || track.kind !== 'video') {
                engine.logger.error(RCLoggerTag.L_RTC_CLIENT_CREATE_LOCAL_VIDEO_TRACK_O, {
                    status: RCLoggerStatus.FAILED,
                    code: exports.RCRTCCode.CREATE_CUSTOM_TRACK_FAILED,
                    msg: 'Failed to create custom stream'
                }, {
                    logSource: engine.LogSource.RTC
                });
                return { code: exports.RCRTCCode.CREATE_CUSTOM_TRACK_FAILED };
            }
            const userId = this._context.getCurrentId();
            if (!userId) {
                engine.logger.error(RCLoggerTag.L_RTC_CLIENT_CREATE_LOCAL_VIDEO_TRACK_O, {
                    status: RCLoggerStatus.FAILED,
                    code: exports.RCRTCCode.INVALID_USER_ID,
                    msg: 'invalid IM connection，invalid userId'
                }, {
                    logSource: engine.LogSource.RTC
                });
                return { code: exports.RCRTCCode.INVALID_USER_ID };
            }
            const localVideoTrack = new RCLocalVideoTrack(tag, userId, track);
            engine.logger.info(RCLoggerTag.L_RTC_CLIENT_CREATE_LOCAL_VIDEO_TRACK_O, {
                status: RCLoggerStatus.SUCCESSED,
                trackId: localVideoTrack.getTrackId()
            }, {
                logSource: engine.LogSource.RTC
            });
            return { code: exports.RCRTCCode.SUCCESS, track: localVideoTrack };
        }
        /**
         * 根据本地或网络媒体文件资源创建 `RCLocalFileTrack` 实例
         * @param tag 资源标识
         * @param file 网络文件地址，或通过 <input type='file'> 获取到的 File 实例
         * @param options 可用于指定 `withoutVideo` 与 `withoutAudio` 以剔除视轨与音轨
         */
        async createLocalFileTracks(tag, file, options) {
            if (!isValidTag(tag)) {
                engine.logger.error(RCLoggerTag.L_RTC_CLIENT_CREATE_LOCAL_FILE_TRACKS_O, {
                    status: RCLoggerStatus.FAILED,
                    code: exports.RCRTCCode.INVALID_TAGS,
                    msg: 'invalid tag'
                }, {
                    logSource: engine.LogSource.RTC
                });
                return { code: exports.RCRTCCode.INVALID_TAGS, tracks: [] };
            }
            // captureStream 检测
            if (!ifSupportLocalFileTrack()) {
                engine.logger.error(RCLoggerTag.L_RTC_CLIENT_CREATE_LOCAL_FILE_TRACKS_O, {
                    status: RCLoggerStatus.FAILED,
                    code: exports.RCRTCCode.BROWSER_NOT_SUPPORT,
                    msg: 'browser not support'
                }, {
                    logSource: engine.LogSource.RTC
                });
                return { code: exports.RCRTCCode.BROWSER_NOT_SUPPORT, tracks: [] };
            }
            const url = file instanceof File ? URL.createObjectURL(file) : file;
            if (!engine.isHttpUrl(url) && !/^blob:/.test(url)) {
                logger.warn(`createLocalFileTracks failed: params error -> url: ${url}`);
                engine.logger.error(RCLoggerTag.L_RTC_CLIENT_CREATE_LOCAL_FILE_TRACKS_O, {
                    status: RCLoggerStatus.FAILED,
                    code: exports.RCRTCCode.PARAMS_ERROR,
                    msg: 'params error -> file'
                }, {
                    logSource: engine.LogSource.RTC
                });
                return { code: exports.RCRTCCode.PARAMS_ERROR, tracks: [] };
            }
            const userId = this._context.getCurrentId();
            if (!userId) {
                engine.logger.error(RCLoggerTag.L_RTC_CLIENT_CREATE_LOCAL_FILE_TRACKS_O, {
                    status: RCLoggerStatus.FAILED,
                    code: exports.RCRTCCode.INVALID_USER_ID,
                    msg: 'invalid IM connection，invalid userId'
                }, {
                    logSource: engine.LogSource.RTC
                });
                return { code: exports.RCRTCCode.INVALID_USER_ID, tracks: [] };
            }
            return new Promise(resolve => {
                const video = document.createElement('video');
                if (options === null || options === void 0 ? void 0 : options.withoutAudio) {
                    video.muted = true;
                }
                video.onloadedmetadata = () => {
                    const tracks = [];
                    let mediaStream;
                    try {
                        const captureStream = video.mozCaptureStream ? 'mozCaptureStream' : 'captureStream';
                        mediaStream = video[captureStream]();
                    }
                    catch (error) {
                        logger.error(`create RCLocalFileTrack failed, captureSteam error. -> url: ${url}`);
                        logger.error(error);
                        engine.logger.error(RCLoggerTag.L_RTC_CLIENT_CREATE_LOCAL_FILE_TRACKS_O, {
                            status: RCLoggerStatus.FAILED,
                            code: exports.RCRTCCode.CREATE_FILE_TRACK_FAILED,
                            msg: 'Failed to create file stream'
                        }, {
                            logSource: engine.LogSource.RTC
                        });
                        resolve({ code: exports.RCRTCCode.CREATE_FILE_TRACK_FAILED, tracks });
                    }
                    const [audioTrack, videoTrack] = RCMediaStreamCapture.getTracksWithOptions(mediaStream, options);
                    audioTrack && tracks.push(new RCLocalFileAudioTrack(tag, userId, audioTrack, video));
                    videoTrack && tracks.push(new RCLocalFileVideoTrack(tag, userId, videoTrack, video));
                    if (tracks.length === 0) {
                        video.pause();
                        video.src = '';
                    }
                    video.onerror = null;
                    engine.logger.info(RCLoggerTag.L_RTC_CLIENT_CREATE_LOCAL_FILE_TRACKS_O, {
                        status: RCLoggerStatus.SUCCESSED,
                        trackIds: tracks.map(track => track.getTrackId())
                    }, {
                        logSource: engine.LogSource.RTC
                    });
                    resolve({ code: exports.RCRTCCode.SUCCESS, tracks });
                };
                video.onerror = () => {
                    logger.error(`create RCLocalFileTrack failed -> url: ${url}`);
                    engine.logger.error(RCLoggerTag.L_RTC_CLIENT_CREATE_LOCAL_FILE_TRACKS_O, {
                        status: RCLoggerStatus.FAILED,
                        code: exports.RCRTCCode.CREATE_FILE_TRACK_FAILED,
                        msg: 'Failed to create file stream'
                    }, {
                        logSource: engine.LogSource.RTC
                    });
                    resolve({ code: exports.RCRTCCode.CREATE_FILE_TRACK_FAILED, tracks: [] });
                };
                video.src = url;
                video.loop = true;
                video.play();
            });
        }
        /**
         * 根据 MediaStream 实例对象创建 RCLocalTrack 实例
         * @param tag 轨道标识
         * @param stream MediaStream 实例
         * @param options 可用于指定 `withoutVideo` 与 `withoutAudio` 以剔除视轨与音轨
         * @returns
         */
        async createLocalTracks(tag, stream, options) {
            const tracks = [];
            if (!isValidTag(tag)) {
                engine.logger.error(RCLoggerTag.L_RTC_CLIENT_CREATE_LOCAL_TRACKS_O, {
                    status: RCLoggerStatus.FAILED,
                    code: exports.RCRTCCode.INVALID_TAGS,
                    msg: 'invalid tag'
                }, {
                    logSource: engine.LogSource.RTC
                });
                return { code: exports.RCRTCCode.INVALID_TAGS, tracks };
            }
            if (!(stream instanceof MediaStream)) {
                engine.logger.error(RCLoggerTag.L_RTC_CLIENT_CREATE_LOCAL_TRACKS_O, {
                    status: RCLoggerStatus.FAILED,
                    code: exports.RCRTCCode.PARAMS_ERROR,
                    msg: 'params error -> stream'
                }, {
                    logSource: engine.LogSource.RTC
                });
                return { code: exports.RCRTCCode.PARAMS_ERROR, tracks };
            }
            const userId = this._context.getCurrentId();
            if (!userId) {
                engine.logger.error(RCLoggerTag.L_RTC_CLIENT_CREATE_LOCAL_TRACKS_O, {
                    status: RCLoggerStatus.FAILED,
                    code: exports.RCRTCCode.INVALID_USER_ID,
                    msg: 'invalid IM connection，invalid userId'
                }, {
                    logSource: engine.LogSource.RTC
                });
                return { code: exports.RCRTCCode.INVALID_USER_ID, tracks };
            }
            const [audioTrack, videoTrack] = RCMediaStreamCapture.getTracksWithOptions(stream, options);
            audioTrack && tracks.push(new RCLocalAudioTrack(tag, userId, audioTrack));
            videoTrack && tracks.push(new RCLocalVideoTrack(tag, userId, videoTrack));
            engine.logger.info(RCLoggerTag.L_RTC_CLIENT_CREATE_LOCAL_TRACKS_O, {
                status: RCLoggerStatus.SUCCESSED,
                trackIds: tracks.map(track => track.getTrackId())
            }, {
                logSource: engine.LogSource.RTC
            });
            return { code: exports.RCRTCCode.SUCCESS, tracks };
        }
        /**
         * 它接受一个 MediaStream 和一个可选的选项对象并返回一个 MediaStreamTracks 数组
         * @param {MediaStream} stream - MediaStream - 从中获取曲目的流。
         * @param {ICreateLocalTrackOptions} [options] - ICreateLocalTrackOptions
         * @returns 一组 MediaStreamTrack 对象。
         */
        static getTracksWithOptions(stream, options) {
            const tracks = [];
            tracks[0] = (options === null || options === void 0 ? void 0 : options.withoutAudio) ? undefined : stream.getAudioTracks()[0];
            tracks[1] = (options === null || options === void 0 ? void 0 : options.withoutVideo) ? undefined : stream.getVideoTracks()[0];
            return tracks;
        }
    }

    /**
     * RTC 业务客户端
     * @public
     */
    class RCRTCClient extends RCMediaStreamCapture {
        constructor(_context, _runtime, _options) {
            super(_context);
            this._context = _context;
            this._runtime = _runtime;
            this._options = _options;
            this._crtRoom = null;
            this._audience = null;
            this._crtAudienceLivingRoom = null;
            // 用户不指定时，默认以 plan-b 优先选项
            ASdpStrategy.setSdpSemantics(_options.sdpSemantics || 'plan-b');
            this._service = new RCMediaService(this._runtime, this._context, this._options.mediaServer, this._options.timeout);
            // 监听 IM 连接状态变更
            this._context.registerConnectionStateChangeListener(this._onIMStatusChange.bind(this));
            // 监听业务层主动断开连接
            this._context.registerDisconnectListener(this._onIMDisconnect.bind(this));
            // 监听业务层 IM 连接销毁
            this._context.registerDestroyListener(this._onIMUninit.bind(this));
            // 监听房间内的消息
            this._context.registerMessageListener(this._handleMessage.bind(this));
            // 监听 navi 变更
            this._context.getPluginContext().onnavidatachange = this.naviDataChange.bind(this);
        }
        _handleMessage(message) {
            var _a;
            // 过滤非 RTC 消息
            if (message.conversationType !== engine.ConversationType.RTC_ROOM) {
                return false;
            }
            // 给连麦房间增加消息处理器
            if (this._crtRoom instanceof RCLivingRoom) {
                const PKRooms = this._getJoinedPKRoomList();
                PKRooms.forEach((room) => {
                    room.__parseInnerMessage(message);
                });
            }
            (_a = this._crtRoom) === null || _a === void 0 ? void 0 : _a.__parseInnerMessage(message);
            engine.logger.info(RCLoggerTag.L_RTC_CLIENT_MESSAGE_O, {
                status: RCLoggerStatus.SUCCESSED,
                message: Object.assign(message, { content: '内容涉及隐私不予显示' })
            }, {
                logSource: engine.LogSource.RTC
            });
            return true;
        }
        /**
         * voip 变更、jwt 变更需要触发重走嗅探逻辑
         */
        naviDataChange(naviInfo) {
            engine.logger.info(`on navi change data => ${JSON.stringify(naviInfo)}`);
            this._service.detectorMediaSever();
        }
        /**
         * 获取加入的连麦房间
         */
        _getJoinedPKRoomList() {
            const { code, roomPKHandler } = this._crtRoom.getRoomPKHandler();
            if (code === exports.RCRTCCode.SUCCESS && roomPKHandler) {
                const PKRooms = roomPKHandler.getJoinedPKRooms() || {};
                return Object.values(PKRooms);
            }
            return [];
        }
        /**
         * 获取当前用户 Id，若 IM 未连接，这返回 `''`
         * @returns
         */
        getCurrentId() {
            return this._context.getCurrentId();
        }
        /**
         * 加入普通音视频房间
         * @param roomId
         * @param joinType 多端处理方式
         * @param outerUserDatas 业务层设置人员属性
         * @param useMutilPeerC 是否使用多 peerConnection 发布资源
         * @param roomType 加入房间的类型 默认参数 RTCMode.RTC
         */
        async joinRTCRoom(roomId, joinType, outerUserDatas, useMutilPeerC, roomType = RTCMode.RTC) {
            engine.logger.info(RCLoggerTag.L_RTC_CLIENT_JOIN_RTC_ROOM_T, {
                roomId,
                joinType,
                outerUserDatas,
                useMutilPeerC,
                roomType
            }, { logSource: engine.LogSource.RTC });
            if (this._crtRoom) {
                engine.logger.error(RCLoggerTag.L_RTC_CLIENT_JOIN_RTC_ROOM_R, {
                    status: RCLoggerStatus.FAILED,
                    code: exports.RCRTCCode.REPERT_JOIN_ROOM,
                    msg: 'Join the room repeatedly'
                }, { logSource: engine.LogSource.RTC });
                return { code: exports.RCRTCCode.REPERT_JOIN_ROOM };
            }
            const room = this._crtRoom = new RCRTCRoom(this._context, this._runtime, roomId, this._service, this._options, false, false, useMutilPeerC, getUUID());
            const { code } = await room.__innerInit(roomType, joinType, undefined, undefined, outerUserDatas);
            if (code !== exports.RCRTCCode.SUCCESS) {
                this._crtRoom = null;
                return { code: code };
            }
            room.once(RCAbstractRoomEvent.LEAVE, () => {
                this._crtRoom = null;
            });
            return { code, room, userIds: room.getRemoteUserIds(), tracks: room.getRemoteTracks() };
        }
        /**
         * 加入跨AppKey音视频房间
         * @param roomId
         * @param joinType 多端处理方式
         * @param outerUserDatas 业务层设置人员属性
         * @param useMutilPeerC 是否使用多 peerConnection 发布资源
         * @param roomType 加入房间的类型 默认参数 RTCMode.CROSS_MUTI
         */
        async joinCrossRTCRoom(roomId, joinType, outerUserDatas, useMutilPeerC, roomType = RTCMode.CROSS_MUTI) {
            engine.logger.info(RCLoggerTag.L_RTC_CLIENT_JOIN_CROSS_RTC_ROOM_T, {
                roomId,
                joinType,
                outerUserDatas,
                useMutilPeerC,
                roomType
            }, { logSource: engine.LogSource.RTC });
            if (this._crtRoom) {
                engine.logger.error(RCLoggerTag.L_RTC_CLIENT_JOIN_CROSS_RTC_ROOM_R, {
                    status: RCLoggerStatus.FAILED,
                    code: exports.RCRTCCode.REPERT_JOIN_ROOM,
                    msg: 'Join the room repeatedly'
                }, { logSource: engine.LogSource.RTC });
                return { code: exports.RCRTCCode.REPERT_JOIN_ROOM };
            }
            const room = this._crtRoom = new RCRTCRoom(this._context, this._runtime, roomId, this._service, this._options, false, false, useMutilPeerC, getUUID(), roomType);
            const { code } = await room.__innerInit(roomType, joinType, undefined, undefined, outerUserDatas);
            if (code !== exports.RCRTCCode.SUCCESS) {
                this._crtRoom = null;
                return { code: code };
            }
            room.once(RCAbstractRoomEvent.LEAVE, () => {
                this._crtRoom = null;
            });
            return { code, room, userIds: room.getRemoteUserIds(), tracks: room.getRemoteTracks() };
        }
        /**
         * 主播加入直播房间或观众上麦场景调用，观众上麦之前需先取消已订阅的直播间资源
         * @param roomId 房间 Id
         * @param livingType 直播间类型，`RCLivingType.AUDIO` 为音频直播，`RCLivingType.VIDEO` 为音视频直播
         * @param joinType 多端处理方式，公有云暂不支持该字段
         * @param outerUserDatas 业务层设置人员属性
         */
        async joinLivingRoom(roomId, livingType, joinType, outerUserDatas, useMutilPeerC) {
            engine.logger.info(RCLoggerTag.L_RTC_CLIENT_JOIN_LIVING_ROOM_T, {
                roomId,
                livingType,
                joinType,
                outerUserDatas,
                useMutilPeerC
            }, {
                logSource: engine.LogSource.RTC
            });
            // 已存在直播房间
            if (this._crtRoom) {
                engine.logger.error(RCLoggerTag.L_RTC_CLIENT_JOIN_LIVING_ROOM_R, {
                    status: RCLoggerStatus.FAILED,
                    code: exports.RCRTCCode.REPERT_JOIN_ROOM,
                    msg: `Join the room repeatedly -> roomId: ${roomId}`
                }, {
                    logSource: engine.LogSource.RTC
                });
                return { code: exports.RCRTCCode.REPERT_JOIN_ROOM };
            }
            const room = this._crtRoom = new RCLivingRoom(this._context, this._runtime, roomId, this._service, this._options, livingType, false, true, useMutilPeerC);
            const { code } = await room.__innerInit(RTCMode.LIVE, joinType, livingType, undefined, outerUserDatas);
            if (code !== exports.RCRTCCode.SUCCESS) {
                this._crtRoom = null;
                return { code: code };
            }
            room.once(RCAbstractRoomEvent.LEAVE, () => {
                this._crtRoom = null;
            });
            const res = { code, room, userIds: room.getRemoteUserIds(), tracks: room.getRemoteTracks() };
            // 手动模式时，用户加入房间，需返回 CDN 开关状态
            if (room.__getCDNPushMode() === RCInnerCDNPushMode.MANUAL) {
                Object.assign(res, { CDNEnable: room.__getCDNEnable() });
            }
            return res;
        }
        /**
         * 获取直播观众客户端
         */
        getAudienceClient(useMutilPeerC) {
            if (!this._audience) {
                this._audience = new RCAudienceClient(this._context, this._runtime, this._options, useMutilPeerC);
            }
            engine.logger.info(RCLoggerTag.L_RTC_CLIENT_GET_AUDIENCE_CLIENT_O, {
                status: RCLoggerStatus.SUCCESSED
            }, { logSource: engine.LogSource.RTC });
            return this._audience;
        }
        _onIMStatusChange(status) {
            logger.debug(`signal server connection state change: ${status}`);
            engine.logger.info(RCLoggerTag.L_RTC_CLIENT_CONNECTION_STATE_S, {
                status: RCLoggerStatus.SUCCESSED,
                data: status
            }, {
                logSource: engine.LogSource.RTC
            });
            if (status !== engine.ConnectionStatus.CONNECTED) {
                return;
            }
            // 重连后执行探测逻辑
            this._service.detectorMediaSever();
            // 给连麦房间增加重连处理
            if (this._crtRoom instanceof RCLivingRoom) {
                const PKRooms = this._getJoinedPKRoomList();
                PKRooms.forEach((room) => {
                    room.__onReconnected();
                });
            }
            this._crtRoom && this._crtRoom.__onReconnected();
        }
        _onIMDisconnect() {
            engine.logger.info(RCLoggerTag.L_RTC_CLIENT_DISCONNECT_S, {
                status: RCLoggerStatus.SUCCESSED
            }, {
                logSource: engine.LogSource.RTC
            });
            // 用户主动断开 IM 连接
            logger.debug('TODO -> on IM disconnect');
        }
        _onIMUninit() {
            engine.logger.info(RCLoggerTag.L_RTC_CLIENT_DESTROY_S, {
                status: RCLoggerStatus.SUCCESSED
            }, {
                logSource: engine.LogSource.RTC
            });
            // 用户销毁 IM 客户端，IM 客户端需重新初始化
            logger.debug('TODO -> on IM client ondestroy');
        }
        /**
         * 退出并销毁当前房间实例，退出后该房间的所有方法将不可用
         */
        async leaveRoom(room) {
            var _a, _b;
            engine.logger.info(RCLoggerTag.L_RTC_CLIENT_LEAVE_ROOM_T, {
                userId: this._context.getCurrentId(),
                roomId: (_a = this._crtRoom) === null || _a === void 0 ? void 0 : _a.getRoomId()
            }, {
                logSource: engine.LogSource.RTC
            });
            if (!this._crtRoom) {
                engine.logger.warn(RCLoggerTag.L_RTC_CLIENT_LEAVE_ROOM_R, {
                    status: RCLoggerStatus.FAILED,
                    code: '',
                    msg: 'Room does not exist, whiout leave'
                }, {
                    logSource: engine.LogSource.RTC
                });
                return { code: exports.RCRTCCode.SUCCESS };
            }
            await this._crtRoom.__destroy(true);
            logger.debug(`quitRTCRoom -> userId: ${this._context.getCurrentId()} , roomId: ${this._crtRoom.getRoomId()}`);
            // 离开房间后调用探测逻辑，查看是否需要更新探测结果
            this._service.detectorMediaSever();
            engine.logger.info(RCLoggerTag.L_RTC_CLIENT_LEAVE_ROOM_R, {
                status: RCLoggerStatus.SUCCESSED,
                userId: this._context.getCurrentId(),
                roomId: (_b = this._crtRoom) === null || _b === void 0 ? void 0 : _b.getRoomId()
            }, {
                logSource: engine.LogSource.RTC
            });
            this._crtRoom = null;
            return { code: exports.RCRTCCode.SUCCESS };
        }
        /**
         * 观众加入直播房间
         * @param roomId 房间 ID
         * @param livingType 直播类型（音频直播 or 音视频直播）
         */
        async joinLivingRoomAsAudience(roomId, livingType, useMutilPeerC) {
            engine.logger.info(RCLoggerTag.L_RTC_CLIENT_JOIN_LIVING_ROOM_AS_AUDIENCE_T, {
                roomId,
                livingType,
                useMutilPeerC
            }, {
                logSource: engine.LogSource.RTC
            });
            // 观众加房间前进行探测
            this._service.detectorMediaSever();
            if (isIllegalConnection(this._context.getNaviInfo())) {
                engine.logger.error(RCLoggerTag.L_RTC_CLIENT_JOIN_LIVING_ROOM_AS_AUDIENCE_R, {
                    status: RCLoggerStatus.FAILED,
                    code: exports.RCRTCCode.PACKAGE_ENVIRONMENT_ERROR,
                    msg: 'navi_url error'
                }, {
                    logSource: engine.LogSource.RTC
                });
                return { code: exports.RCRTCCode.PACKAGE_ENVIRONMENT_ERROR };
            }
            if (!(engine.validate('roomId', roomId, engine.notEmptyString, true) &&
                engine.validate('livingType', livingType, (value) => value === exports.RCLivingType.AUDIO || value === exports.RCLivingType.VIDEO))) {
                engine.logger.error(RCLoggerTag.L_RTC_CLIENT_JOIN_LIVING_ROOM_AS_AUDIENCE_R, {
                    status: RCLoggerStatus.FAILED,
                    code: exports.RCRTCCode.PACKAGE_ENVIRONMENT_ERROR,
                    msg: 'params error -> roomId or livingType'
                }, {
                    logSource: engine.LogSource.RTC
                });
                return { code: exports.RCRTCCode.PARAMS_ERROR };
            }
            // 已存在直播房间
            if (this._crtAudienceLivingRoom) {
                engine.logger.error(RCLoggerTag.L_RTC_CLIENT_JOIN_LIVING_ROOM_AS_AUDIENCE_R, {
                    status: RCLoggerStatus.FAILED,
                    code: exports.RCRTCCode.REPERT_JOIN_ROOM,
                    msg: 'Join the room repeatedly'
                }, {
                    logSource: engine.LogSource.RTC
                });
                return { code: exports.RCRTCCode.REPERT_JOIN_ROOM };
            }
            const urls = this._service.getNaviMS();
            if (!urls.length) {
                engine.logger.error(RCLoggerTag.L_RTC_CLIENT_JOIN_LIVING_ROOM_AS_AUDIENCE_R, {
                    status: RCLoggerStatus.FAILED,
                    code: exports.RCRTCCode.NOT_OPEN_VIDEO_AUDIO_SERVER,
                    msg: 'No audio / video server address available'
                }, {
                    logSource: engine.LogSource.RTC
                });
                return { code: exports.RCRTCCode.NOT_OPEN_VIDEO_AUDIO_SERVER };
            }
            const { code, data } = await this._context.joinLivingRoomAsAudience(roomId, RTCMode.LIVE, livingType);
            if (code !== engine.ErrorCode.SUCCESS) {
                logger.error('audienceJoinLivingRoomError:', code);
                engine.logger.error(RCLoggerTag.L_RTC_CLIENT_JOIN_LIVING_ROOM_AS_AUDIENCE_R, {
                    status: RCLoggerStatus.FAILED,
                    code: exports.RCRTCCode.SIGNAL_AUDIENCE_JOIN_ROOM_FAILED,
                    msg: 'signal error -> audience join room'
                }, {
                    logSource: engine.LogSource.RTC
                });
                return { code: exports.RCRTCCode.SIGNAL_AUDIENCE_JOIN_ROOM_FAILED };
            }
            logger.info(`joinLivingRoomAsAudience success, room data: ${JSON.stringify(data)}`);
            const clientSessionId = getUUID();
            const room = new RCAudienceLivingRoom(this._context, this._runtime, this._options, roomId, data, livingType, useMutilPeerC, clientSessionId);
            this._crtAudienceLivingRoom = room;
            engine.logger.info(RCLoggerTag.L_RTC_CLIENT_JOIN_LIVING_ROOM_AS_AUDIENCE_R, {
                status: RCLoggerStatus.SUCCESSED,
                roomData: data
            }, {
                logSource: engine.LogSource.RTC
            });
            return {
                room,
                code: exports.RCRTCCode.SUCCESS,
                userIds: room.getRemoteUserIds(),
                RTCTracks: room.getRemoteRTCTracks(),
                MCUTracks: room.getRemoteMCUTracks(),
                CDNUris: room.getCDNInfo()
            };
        }
        /**
         * 观众退出并销毁当前房间实例，退出后该房间的所有方法将不可用
         */
        async leaveLivingRoomAsAudience(room) {
            engine.logger.info(RCLoggerTag.L_RTC_CLIENT_LEAVE_LIVING_ROOM_AS_AUDIENCE_T, {
                roomId: room.getRoomId(),
                userId: this._context.getCurrentId()
            }, {
                logSource: engine.LogSource.RTC
            });
            if (!this._crtAudienceLivingRoom) {
                engine.logger.warn(RCLoggerTag.L_RTC_CLIENT_LEAVE_LIVING_ROOM_AS_AUDIENCE_R, {
                    status: RCLoggerStatus.FAILED,
                    code: '',
                    msg: 'Room does not exist, whiout leave'
                }, {
                    logSource: engine.LogSource.RTC
                });
                return { code: exports.RCRTCCode.SUCCESS };
            }
            if (this._crtAudienceLivingRoom !== room) {
                engine.logger.error(RCLoggerTag.L_RTC_CLIENT_LEAVE_LIVING_ROOM_AS_AUDIENCE_R, {
                    status: RCLoggerStatus.FAILED,
                    code: exports.RCRTCCode.PARAMS_ERROR,
                    msg: 'params error -> room'
                }, {
                    logSource: engine.LogSource.RTC
                });
                return { code: exports.RCRTCCode.PARAMS_ERROR };
            }
            await this._crtAudienceLivingRoom.__destroy(true);
            this._crtAudienceLivingRoom = null;
            engine.logger.info(RCLoggerTag.L_RTC_CLIENT_LEAVE_LIVING_ROOM_AS_AUDIENCE_R, {
                status: RCLoggerStatus.SUCCESSED,
                roomId: room.getRoomId(),
                userId: this._context.getCurrentId()
            }, {
                logSource: engine.LogSource.RTC
            });
            return { code: exports.RCRTCCode.SUCCESS };
        }
        /**
         * 升级为主播房间
         * @param room 观众房间实例
         */
        async upgradeToAnchorRoom(room) {
            if (!engine.validate('room', room, () => room instanceof RCAudienceLivingRoom, true)) {
                engine.logger.error(RCLoggerTag.L_RTC_CLIENT_UPGRADE_TO_ANCHOR_ROOM_R, {
                    status: RCLoggerStatus.FAILED,
                    code: exports.RCRTCCode.PARAMS_ERROR,
                    msg: 'params error -> room'
                }, {
                    logSource: engine.LogSource.RTC
                });
                return { code: exports.RCRTCCode.PARAMS_ERROR };
            }
            engine.logger.info(RCLoggerTag.L_RTC_CLIENT_UPGRADE_TO_ANCHOR_ROOM_T, {
                roomId: room.getRoomId(),
                userId: this._context.getCurrentId()
            }, {
                logSource: engine.LogSource.RTC
            });
            // 已存在主播房间
            if (this._crtRoom) {
                engine.logger.error(RCLoggerTag.L_RTC_CLIENT_UPGRADE_TO_ANCHOR_ROOM_R, {
                    status: RCLoggerStatus.FAILED,
                    code: exports.RCRTCCode.REPERT_JOIN_ROOM,
                    msg: 'Join the room repeatedly'
                }, {
                    logSource: engine.LogSource.RTC
                });
                return { code: exports.RCRTCCode.REPERT_JOIN_ROOM };
            }
            const roomId = room.getRoomId();
            const crtRoom = this._crtRoom = new RCLivingRoom(this._context, this._runtime, roomId, this._service, this._options, room.livingType, true, true, false, room.getClientSessionId());
            // const { code, data } = await this._context.rtcIdentityChange(room._roomId, RTCIdentityChangeType.ViewerToAnchor, room.livingType)
            const code = await crtRoom.__innerInitByIdentityChange();
            if (code !== engine.ErrorCode.SUCCESS) {
                logger.warn(`change room identity failed -> code: ${code}`);
                this._crtRoom = null;
                // TODO: 将 ErrorCode 直接抛给业务层，不要中间转换
                engine.logger.error(RCLoggerTag.L_RTC_CLIENT_UPGRADE_TO_ANCHOR_ROOM_R, {
                    status: RCLoggerStatus.FAILED,
                    code: exports.RCRTCCode.SIGNAL_ROOM_CHANGE_IDENTITY_FAILED,
                    msg: 'Switch identity error'
                }, {
                    logSource: engine.LogSource.RTC
                });
                return { code: exports.RCRTCCode.SIGNAL_ROOM_CHANGE_IDENTITY_FAILED };
            }
            crtRoom.once(RCAbstractRoomEvent.LEAVE, () => {
                this._crtRoom = null;
            });
            // 观众房间内存数据清除
            await this._crtAudienceLivingRoom.__destroy(false);
            // 重置观众房间
            this._crtAudienceLivingRoom = null;
            return { room: crtRoom, code: exports.RCRTCCode.SUCCESS, userIds: crtRoom.getRemoteUserIds(), tracks: crtRoom.getRemoteTracks() };
        }
        /**
         * 降级为观众房间
         * @param room 主播房间实例
         */
        async downgradeToAudienceRoom(room) {
            engine.logger.info(RCLoggerTag.L_RTC_CLIENT_DOWNGRADE_TO_AUDIENCE_ROOM_T, {
                roomId: room._roomId,
                userId: this._context.getCurrentId()
            }, {
                logSource: engine.LogSource.RTC
            });
            /**
             * 副房间不能调用
             */
            if (!room.isMainRoom()) {
                logger.error('the `downgradeToAudienceRoom` is disabled in PK room');
                engine.logger.error(RCLoggerTag.L_RTC_CLIENT_DOWNGRADE_TO_AUDIENCE_ROOM_R, {
                    status: RCLoggerStatus.FAILED,
                    code: exports.RCRTCCode.THE_FUNCTION_IS_DISABLED_IN_PKROOM,
                    msg: 'method not available in room'
                }, {
                    logSource: engine.LogSource.RTC
                });
                return { code: exports.RCRTCCode.THE_FUNCTION_IS_DISABLED_IN_PKROOM };
            }
            if (!engine.validate('room._roomId', room._roomId, engine.notEmptyString, true)) {
                engine.logger.error(RCLoggerTag.L_RTC_CLIENT_DOWNGRADE_TO_AUDIENCE_ROOM_R, {
                    status: RCLoggerStatus.FAILED,
                    code: exports.RCRTCCode.PARAMS_ERROR,
                    msg: 'params error -> room._roomId'
                }, {
                    logSource: engine.LogSource.RTC
                });
                return { code: exports.RCRTCCode.PARAMS_ERROR };
            }
            // 已存在观众房间
            if (this._crtAudienceLivingRoom) {
                engine.logger.error(RCLoggerTag.L_RTC_CLIENT_DOWNGRADE_TO_AUDIENCE_ROOM_R, {
                    status: RCLoggerStatus.FAILED,
                    code: exports.RCRTCCode.REPERT_JOIN_ROOM,
                    msg: 'Join the room repeatedly'
                }, {
                    logSource: engine.LogSource.RTC
                });
                return { code: exports.RCRTCCode.REPERT_JOIN_ROOM };
            }
            const { code, data } = await this._context.rtcIdentityChange(room._roomId, RTCIdentityChangeType.AnchorToViewer, room.getLivingType());
            if (code !== engine.ErrorCode.SUCCESS) {
                logger.error('change room identity error', code);
                engine.logger.error(RCLoggerTag.L_RTC_CLIENT_DOWNGRADE_TO_AUDIENCE_ROOM_R, {
                    status: RCLoggerStatus.FAILED,
                    code: exports.RCRTCCode.SIGNAL_ROOM_CHANGE_IDENTITY_FAILED,
                    msg: 'Switch identity error'
                }, {
                    logSource: engine.LogSource.RTC
                });
                return { code: exports.RCRTCCode.SIGNAL_ROOM_CHANGE_IDENTITY_FAILED };
            }
            logger.info(`downgradeToAudienceRoom success, room data: ${JSON.stringify(data)}`);
            engine.logger.info(RCLoggerTag.L_RTC_CLIENT_DOWNGRADE_TO_AUDIENCE_ROOM_R, {
                status: RCLoggerStatus.SUCCESSED,
                roomData: data
            }, {
                logSource: engine.LogSource.RTC
            });
            const clientSessionId = room.getClientSessionId();
            const crtRoom = new RCAudienceLivingRoom(this._context, this._runtime, this._options, room._roomId, data, room.getLivingType(), false, clientSessionId);
            this._crtAudienceLivingRoom = crtRoom;
            // 主播房间内存数据清除及停止 Signal 房间心跳
            this._crtRoom.__destroy(false);
            // 重置主播房间
            this._crtRoom = null;
            return {
                room: crtRoom,
                code: exports.RCRTCCode.SUCCESS,
                userIds: crtRoom.getRemoteUserIds(),
                RTCTracks: crtRoom.getRemoteRTCTracks(),
                MCUTracks: crtRoom.getRemoteMCUTracks(),
                CDNUris: crtRoom.getCDNInfo()
            };
        }
        /**
         * 获取在房间内用户信息
         * @since version 5.2.1
         */
        async getJoinedRoomInfo() {
            const { code, data } = await this._context.getRTCJoinedUserInfo(this._context.getCurrentId());
            if (code !== engine.ErrorCode.SUCCESS) {
                logger.error('getJoinedUserInfo error', code);
                engine.logger.error(RCLoggerTag.L_RTC_CLIENT_GET_JOINED_ROOM_INFO_O, {
                    status: RCLoggerStatus.FAILED,
                    code,
                    msg: 'Switch identity error'
                }, {
                    logSource: engine.LogSource.RTC
                });
                return { code };
            }
            engine.logger.info(RCLoggerTag.L_RTC_CLIENT_GET_JOINED_ROOM_INFO_O, {
                status: RCLoggerStatus.SUCCESSED,
                roomInfo: data
            }, {
                logSource: engine.LogSource.RTC
            });
            return { code: exports.RCRTCCode.SUCCESS, data };
        }
    }

    exports.RCKickReason = void 0;
    (function (RCKickReason) {
        /**
         * Server 主动踢（掉 Server API 踢出）
         */
        RCKickReason[RCKickReason["SERVER_KICK"] = 1] = "SERVER_KICK";
        /**
         * 其他设备登陆后，本端被踢
         */
        RCKickReason[RCKickReason["OTHER_KICK"] = 2] = "OTHER_KICK";
    })(exports.RCKickReason || (exports.RCKickReason = {}));

    // rtc 的 PB 定义，用于向前兼容不具备 PB 数据编解码能力的 RTCLib 版本
    /* eslint-disable camelcase */
    /**
     * signal 服务 RTC 业务的接口定义
     */
    const RTC_API = {
        rtcRJoin_data: 'rtcRJoin_data',
        rtcRExit: 'rtcRExit',
        rtcRInfo: 'rtcRInfo',
        rtcUData: 'rtcUData',
        rtcUDel: 'rtcUDel',
        rtcSetData: 'rtcSetData',
        /** 全量资源 URI 变更接口 */
        userSetData: 'userSetData',
        rtcQryData: 'rtcQryData',
        rtcDelData: 'rtcDelData',
        rtcToken: 'rtcToken',
        rtcUserState: 'rtcUserState',
        rtcUList: 'rtcUList',
        /** RTC 直播观众加房间 */
        viewerJoinR: 'viewerJoinR',
        /** RTC 直播观众退出房间 */
        viewerExitR: 'viewerExitR',
        /** RTC 观众端 kv 通知拉取 (kv 为主播加入/退出人员列表、发布/取消发布的资源) */
        rtcPullKv: 'rtcPullKv',
        /** RTC 直播身份切换 */
        rtcIdentityChange: 'rtcIdentityChange',
        /** 直播连麦邀请 */
        rtcInvite: 'rtcInvite',
        /** 直播连麦取消邀请 */
        rtcCancelInvite: 'rtcCancelInvite',
        /** 直播连麦邀请响应 */
        rtcInviteAnswer: 'rtcInviteAnswer',
        /** 结束直播连麦邀请 */
        rtcEndInvite: 'rtcEndInvite',
        /** RTC 查询用户信息（是否在房间内） */
        rtcQueryJoined: 'rtcQueryJoined'
    };
    var RTCPB;
    (function (RTCPB) {
        RTCPB["RtcInput"] = "RtcInput";
        RTCPB["RtcUserListOutput"] = "RtcUserListOutput";
        RTCPB["SetUserStatusInput"] = "SetUserStatusInput";
        RTCPB["RtcSetDataInput"] = "RtcSetDataInput";
        RTCPB["RtcUserSetDataInput"] = "RtcUserSetDataInput";
        RTCPB["RtcDataInput"] = "RtcDataInput";
        RTCPB["RtcSetOutDataInput"] = "RtcSetOutDataInput";
        RTCPB["MCFollowInput"] = "MCFollowInput";
        RTCPB["RtcTokenOutput"] = "RtcTokenOutput";
        RTCPB["RtcQryOutput"] = "RtcQryOutput";
        RTCPB["RtcQryUserOutDataInput"] = "RtcQryUserOutDataInput";
        RTCPB["RtcUserOutDataOutput"] = "RtcUserOutDataOutput";
        RTCPB["RtcQueryListInput"] = "RtcQueryListInput";
        RTCPB["RtcRoomInfoOutput"] = "RtcRoomInfoOutput";
        RTCPB["RtcValueInfo"] = "RtcValueInfo";
        RTCPB["RtcKeyDeleteInput"] = "RtcKeyDeleteInput";
        RTCPB["RtcNotifyMsg"] = "RtcNotifyMsg";
        RTCPB["RtcPullKV"] = "RtcPullKV";
        RTCPB["RtcKVOutput"] = "RtcKVOutput";
        RTCPB["RtcQueryUserJoinedInput"] = "RtcQueryUserJoinedInput";
        RTCPB["RtcQueryUserJoinedOutput"] = "RtcQueryUserJoinedOutput";
        RTCPB["RtcViewerJoinedOutput"] = "RtcViewerJoinedOutput";
        RTCPB["RtcInviteInput"] = "RtcInviteInput";
        RTCPB["RtcCancelInviteInput"] = "RtcCancelInviteInput";
        RTCPB["RtcInviteAnswerInput"] = "RtcInviteAnswerInput";
        RTCPB["RtcEndInviteInput"] = "RtcEndInviteInput"; // rtc 连麦 pk 结束
    })(RTCPB || (RTCPB = {}));
    const keymaps = {
        [RTCPB.RtcInput]: ['roomType', 'broadcastType', 'extraInnerData', 'needSysChatroom', 'identityChangeType', 'joinType', 'innerDatas', 'outerDatas'],
        [RTCPB.RtcUserListOutput]: ['users', 'token', 'sessionId', 'roomInfo'],
        [RTCPB.SetUserStatusInput]: ['status'],
        [RTCPB.RtcSetDataInput]: ['interior', 'target', 'key', 'value', 'objectName', 'content'],
        [RTCPB.RtcUserSetDataInput]: ['valueInfo', 'objectName', 'content'],
        [RTCPB.RtcDataInput]: ['interior', 'target', 'key', 'objectName', 'content'],
        [RTCPB.RtcSetOutDataInput]: ['target', 'valueInfo', 'objectName', 'content'],
        [RTCPB.MCFollowInput]: ['state'],
        [RTCPB.RtcTokenOutput]: ['rtcToken'],
        [RTCPB.RtcQryOutput]: ['outInfo'],
        [RTCPB.RtcQryUserOutDataInput]: ['userId'],
        [RTCPB.RtcUserOutDataOutput]: ['user'],
        [RTCPB.RtcQueryListInput]: ['order'],
        [RTCPB.RtcRoomInfoOutput]: ['roomId', 'roomData', 'userCount', 'list'],
        [RTCPB.RtcValueInfo]: ['key', 'value'],
        [RTCPB.RtcKeyDeleteInput]: ['key'],
        [RTCPB.RtcNotifyMsg]: ['type', 'time', 'roomId'],
        [RTCPB.RtcPullKV]: ['timestamp', 'roomId'],
        [RTCPB.RtcKVOutput]: ['entries', 'bFullUpdate', 'syncTime'],
        [RTCPB.RtcQueryUserJoinedInput]: ['userId'],
        [RTCPB.RtcQueryUserJoinedOutput]: ['info'],
        // RtcViewerJoinedOutput 无上行调用，所以不需要 map 映射？
        [RTCPB.RtcInviteInput]: ['invitedUserId', 'timeoutTime', 'invitedRoomId', 'inviteInfo', 'inviteSessionId'],
        [RTCPB.RtcCancelInviteInput]: ['invitedUserId', 'invitedRoomId', 'inviteInfo', 'inviteSessionId'],
        [RTCPB.RtcInviteAnswerInput]: ['inviteUserId', 'answerCode', 'inviteRoomId', 'inviteSessionId', 'content', 'key', 'value'],
        [RTCPB.RtcEndInviteInput]: ['inviteRoomId', 'inviteSessionId', 'inviteContent', 'inviteRoomKeys']
    };
    const desc = `
package Modules;
message probuf {
  enum JoinType {
    KICK = 0; //踢前一个设备
    REFUSE = 1; //当前加入拒绝
    COEXIST = 2; //两个设备共存
  }
  enum targetType {
    ROOM =1 ;
    PERSON = 2;
  }
  message ${RTCPB.SetUserStatusInput}
  {
    optional int32 status=1;
  }
  message ${RTCPB.MCFollowInput}
  {
    required string state = 1;
  }
  message ${RTCPB.RtcQueryListInput}{
    optional int32 order=1;
  }
  message ${RTCPB.RtcKeyDeleteInput}{
    repeated string key=1;
  }
  message ${RTCPB.RtcValueInfo}{
    required string key=1;
    required string value=2;
  }
  message RtcUserInfo{
    required string userId=1;
    repeated ${RTCPB.RtcValueInfo} userData=2; //用户资源信息
  }
  message ${RTCPB.RtcUserListOutput}{
    repeated RtcUserInfo users=1;
    optional string token=2;
    optional string sessionId=3;
    repeated RtcValueInfo roomInfo = 4; //房间key value
    repeated RtcKVEntity entries = 5;//直播KV属性对象集合
    optional int64 syncTime = 6;//所有属性的最大时间戳（下次拉取KV时用）。
    optional int32 offlineKickTime = 7;//server超时踢人时间，默认60s
  }
  message RtcRoomInfoOutput{
    optional string roomId = 1;
    repeated ${RTCPB.RtcValueInfo} roomData = 2;
    optional int32 userCount = 3;
    repeated RtcUserInfo list=4;
  }
  message ${RTCPB.RtcInput}{
    required int32 roomType=1;
    optional int32 broadcastType=2;
    optional RtcValueInfo extraInnerData = 3;
    optional bool needSysChatroom = 4; //是否需要同步聊天室
    optional IdentityChangeType identityChangeType = 5; //身份变更类型
    optional JoinType joinType = 6; // 加入房间类型
    repeated ${RTCPB.RtcValueInfo} innerDatas = 7; //用户内部inner数据，角色或者连麦信息等
    repeated ${RTCPB.RtcValueInfo} outerDatas = 8; //用户内部outer数据，自定义数据结构RtcInput。
  }
  message ${RTCPB.RtcQryOutput}{
    repeated ${RTCPB.RtcValueInfo} outInfo=1;
  }
  message ${RTCPB.RtcDataInput}{
    required bool interior=1;
    required targetType target=2;
    repeated string key=3;
    optional string objectName=4;
    optional string content=5;
  }
  message ${RTCPB.RtcSetDataInput}{
    required bool interior=1;
    required targetType target=2;
    required string key=3;
    required string value=4;
    optional string objectName=5;
    optional string content=6;
  }
  message ${RTCPB.RtcUserSetDataInput} {
    repeated ${RTCPB.RtcValueInfo} valueInfo = 1;
    required string objectName = 2;
    repeated ${RTCPB.RtcValueInfo} content = 3;
  }
  message RtcQryInput{
    required bool isInterior=1;
    required targetType target=2;
    repeated string key=3;
  }
  message RtcDelDataInput{
    repeated string key=1;
    required bool isInterior=2;
    required targetType target=3;
  }
  message RtcOutput
  {
    optional int32 nothing=1;
  }
  message ${RTCPB.RtcTokenOutput}{
    required string rtcToken=1;
  }
  message ${RTCPB.RtcSetOutDataInput}{
    required targetType target=1;
    repeated ${RTCPB.RtcValueInfo} valueInfo=2;
    optional string objectName=3;
    optional string content=4;
  }
  message ${RTCPB.RtcQryUserOutDataInput}{
    repeated string userId = 1;
  }
  message ${RTCPB.RtcUserOutDataOutput}{
    repeated RtcUserInfo user = 1;
  }
  message ${RTCPB.RtcNotifyMsg} 
  {
    required int32 type= 1;   //(通知类型 1:rtc房间状态KV变更通知)
    optional int64 time= 2;   //消息产生时间
    optional string roomId=3; //主播房间id
  }
  message ${RTCPB.RtcPullKV}
  {
    required int64 timestamp = 1;
    required string roomId = 2;
  }
  message RtcKVEntity 
  {
    required string key = 1;
    required string value = 2;
    optional int32 status = 3;
    optional int64 timestamp = 4;
    optional string uid = 5;
  }
  message ${RTCPB.RtcKVOutput}
  {
    repeated RtcKVEntity entries = 1;
    optional bool bFullUpdate = 2;
    optional int64 syncTime = 3; 
  }
  enum IdentityChangeType 
  {
    AnchorToViewer = 1; //1为主播变观众
    ViewerToAnchor = 2; //2为观众变主播
  }
  message ${RTCPB.RtcQueryUserJoinedInput}
  {
    required string userId = 1;
  }
  message RtcJoinedInfo
  {
    required string deviceId = 1; //设备ID
    required string roomId = 2;   //加入的房间ID
    optional int64 joinTime = 3;  //加入的时间
  }
  message ${RTCPB.RtcQueryUserJoinedOutput}
  {
    repeated RtcJoinedInfo info = 1;
  }
  message ${RTCPB.RtcViewerJoinedOutput}
  {
    required string rtcToken=1;
    repeated RtcKVEntity entries = 2;//KV属性对象集合
    optional int64 syncTime = 3;//所有属性的最大时间戳（下次拉取KV时用）。
  }
  message ${RTCPB.RtcInviteInput}
  {
    required string invitedUserId=1;    //被邀请的人的uid
    optional int32  timeoutTime=2;       //邀请超时时间(秒),默认三十秒
    required string invitedRoomId=3;    //被邀请的房间
    required string inviteInfo=4;       //邀请的信息(包含邀请人,被邀请人,各自userid)客户端定义好.协议栈和server透传
    required string inviteSessionId= 5; //客户端保证唯一性(建议roomid_userid_时间戳_随机数)
  }
  message ${RTCPB.RtcCancelInviteInput}
  {
    required string invitedUserId=1;   //被邀请的人的uid
    required string invitedRoomId=2;   //被邀请的房间
    required string inviteInfo=3;      //取消邀请的信息(包含邀请人,被邀请人,各自userid)客户端定义好.协议栈和server透传
    required string inviteSessionId=4; //邀请的sessionId,客户端发起邀请时产生
  }
  message ${RTCPB.RtcInviteAnswerInput}
  {
    required string inviteUserId=1;    //邀请的人的uid
    required int32  answerCode=2;      //是否接受连麦邀请.0为拒绝,1为接受
    required string inviteRoomId=3;    //邀请的房间
    required string inviteSessionId=4; //邀请的sessionId
    required string content=5;         //需要转发的content
    optional string key=6;             //如果接受的话,需要加这个字段,放在room级别的k和v,新加入房间的能拉取到
    optional string value=7;           //如果接受的话,需要加这个字段,放在room级别的k和v,新加入房间的能拉取到
  }
  message ${RTCPB.RtcEndInviteInput}
  {
    required string inviteRoomId=1;    //邀请的房间
    required string inviteSessionId=2; //邀请的sessionId
    required string inviteContent=3;   //结束连麦的信息(需要透传给房间内其他人)
    repeated string inviteRoomKeys=4;  //需要删除连麦的信息的key
  }
}
`;

    const encodeRtcInput = (codec, roomType, broadcastType, joinType, innerUserDatas, outerUserDatas) => {
        const innerDatas = innerUserDatas
            ? Object.keys(innerUserDatas).map(key => {
                return codec.encode(RTCPB.RtcValueInfo, { key, value: innerUserDatas[key] }, true);
            })
            : undefined;
        const outerDatas = outerUserDatas
            ? Object.keys(outerUserDatas).map(key => {
                return codec.encode(RTCPB.RtcValueInfo, { key, value: outerUserDatas[key] }, true);
            })
            : undefined;
        return codec.encode(RTCPB.RtcInput, {
            roomType,
            broadcastType,
            joinType,
            innerDatas,
            outerDatas
        });
    };
    const decodeRtcUserListOutput = (codec, buffer) => {
        const rtcInfos = codec.decode(RTCPB.RtcUserListOutput, buffer);
        const { users: list, token, sessionId, roomInfo, entries, offlineKickTime } = rtcInfos;
        const users = {};
        engine.forEach(list, (item) => {
            const { userId, userData } = item;
            const tmpData = {};
            engine.forEach(userData, (data) => {
                const { key, value } = data;
                tmpData[key] = value;
            });
            users[userId] = tmpData;
        });
        return { users, token, sessionId, roomInfo, kvEntries: entries, offlineKickTime };
    };

    class RTCContext {
        constructor(context, codec) {
            this.context = context;
            this.codec = codec;
        }
        async joinRTCRoom(roomId, mode, broadcastType, joinType, innerUserDatas, outerUserDatas) {
            const sourceData = encodeRtcInput(this.codec, mode, broadcastType, joinType, innerUserDatas, outerUserDatas);
            const { code, buffer } = await this.context.rtcSignaling(roomId, RTC_API.rtcRJoin_data, true, sourceData);
            let data;
            if (code === engine.ErrorCode.SUCCESS && buffer) {
                data = decodeRtcUserListOutput(this.codec, buffer);
            }
            return { code, data };
        }
        async quitRTCRoom(roomId) {
            const sourceData = this.codec.encode(RTCPB.SetUserStatusInput, { status: 0 });
            const { code } = await this.context.rtcSignaling(roomId, RTC_API.rtcRExit, true, sourceData);
            return code;
        }
        async getRTCRoomInfo(roomId) {
            const sourceData = this.codec.encode(RTCPB.RtcQueryListInput, { order: 2 });
            const { code, buffer } = await this.context.rtcSignaling(roomId, RTC_API.rtcRInfo, true, sourceData);
            let data;
            if (code === engine.ErrorCode.SUCCESS && buffer) {
                data = this.codec.decode(RTCPB.RtcRoomInfoOutput, buffer);
            }
            return { code, data };
        }
        async getRTCUserInfoList(roomId) {
            // TODO: 确认使用场景
            const sourceData = this.codec.encode(RTCPB.RtcQueryListInput, { order: 2 });
            const { code, buffer } = await this.context.rtcSignaling(roomId, RTC_API.rtcUData, true, sourceData);
            let data;
            if (code === engine.ErrorCode.SUCCESS && buffer) {
                const res = decodeRtcUserListOutput(this.codec, buffer);
                data = { users: res.users };
            }
            return { code, data };
        }
        getRTCUserInfo(roomId) {
            // 确定是否有使用到，没有使用即删除
            throw new Error('Method not implemented.');
        }
        async removeRTCUserInfo(roomId, keys) {
            const sourceData = this.codec.encode(RTCPB.RtcKeyDeleteInput, { key: keys });
            const { code } = await this.context.rtcSignaling(roomId, RTC_API.rtcUDel, false, sourceData);
            return code;
        }
        async setRTCData(roomId, key, value, isInner, apiType, message) {
            const sourceData = this.codec.encode(RTCPB.RtcSetDataInput, {
                interior: isInner,
                target: apiType,
                key,
                value,
                objectName: message === null || message === void 0 ? void 0 : message.name,
                content: message === null || message === void 0 ? void 0 : message.content
            });
            const { code } = await this.context.rtcSignaling(roomId, RTC_API.rtcSetData, false, sourceData);
            return code;
        }
        /**
         * 全量订阅资源修改
         * @param roomId 房间 Id
         * @param message 向前兼容的消息内容
         * @param valueInfo 全量资源数据
         * @param objectName 全量 URI 消息名
         */
        async setRTCTotalRes(roomId, message, valueInfo, objectName, mcuValInfo) {
            const params = {
                objectName,
                content: this.codec.encode(RTCPB.RtcValueInfo, { key: message.name, value: message.content }, true),
                valueInfo: [
                    this.codec.encode(RTCPB.RtcValueInfo, { key: 'uris', value: valueInfo }, true),
                    this.codec.encode(RTCPB.RtcValueInfo, { key: 'mcu_uris', value: mcuValInfo }, true)
                ]
            };
            const sourceData = this.codec.encode(RTCPB.RtcUserSetDataInput, params);
            const { code } = await this.context.rtcSignaling(roomId, RTC_API.userSetData, true, sourceData);
            return code;
        }
        async setRTCCDNUris(roomId, objectName, CDNUris) {
            const sourceData = this.codec.encode(RTCPB.RtcUserSetDataInput, {
                objectName,
                valueInfo: this.codec.encode(RTCPB.RtcValueInfo, { key: 'cdn_uris', value: CDNUris }, true)
            });
            const { code } = await this.context.rtcSignaling(roomId, RTC_API.userSetData, true, sourceData);
            return code;
        }
        async getRTCData(roomId, keys, isInner, apiType) {
            const sourceData = this.codec.encode(RTCPB.RtcDataInput, { interior: isInner, target: apiType, key: keys });
            const { code, buffer } = await this.context.rtcSignaling(roomId, RTC_API.rtcQryData, true, sourceData);
            if (code !== engine.ErrorCode.SUCCESS || !buffer) {
                return { code };
            }
            const { outInfo } = this.codec.decode(RTCPB.RtcQryOutput, buffer);
            const data = {};
            outInfo.forEach((item) => {
                data[item.key] = item.value;
            });
            return { code, data };
        }
        async removeRTCData(roomId, keys, isInner, apiType, message) {
            const sourceData = this.codec.encode(RTCPB.RtcDataInput, {
                interior: isInner,
                target: apiType,
                key: keys,
                objectName: message === null || message === void 0 ? void 0 : message.name,
                content: message === null || message === void 0 ? void 0 : message.content
            });
            const { code } = await this.context.rtcSignaling(roomId, RTC_API.rtcDelData, false, sourceData);
            return code;
        }
        async setRTCOutData(roomId, rtcData, type, message) {
            // TODO: 确认使用场景，是否有必要保留此方法
            throw new Error('JSEngine\'s method not implemented.');
        }
        async getRTCOutData(roomId, userIds) {
            // TODO: 确认使用场景，是否有必要保留此方法
            throw new Error('JSEngine\'s method not implemented.');
        }
        async getRTCToken(roomId, mode, broadcastType) {
            const sourceData = encodeRtcInput(this.codec, mode, broadcastType);
            const { code, buffer } = await this.context.rtcSignaling(roomId, RTC_API.rtcToken, true, sourceData);
            if (code !== engine.ErrorCode.SUCCESS || !buffer) {
                return { code };
            }
            const { rtcToken } = this.codec.decode(RTCPB.RtcTokenOutput, buffer);
            return { code, data: { rtcToken } };
        }
        async setRTCState(roomId, report) {
            const sourceData = this.codec.encode(RTCPB.MCFollowInput, { state: report });
            const { code } = await this.context.rtcSignaling(roomId, RTC_API.rtcUserState, true, sourceData);
            return code;
        }
        async getRTCUserList(roomId) {
            const sourceData = this.codec.encode(RTCPB.RtcQueryListInput, { order: 2 });
            const { code, buffer } = await this.context.rtcSignaling(roomId, RTC_API.rtcUList, true, sourceData);
            if (code !== engine.ErrorCode.SUCCESS || !buffer) {
                return { code };
            }
            const resp = decodeRtcUserListOutput(this.codec, buffer);
            return { code, data: resp };
        }
        async joinLivingRoomAsAudience(roomId, mode, broadcastType) {
            const sourceData = encodeRtcInput(this.codec, mode, broadcastType);
            const { code, buffer } = await this.context.rtcSignaling(roomId, RTC_API.viewerJoinR, true, sourceData);
            if (code !== engine.ErrorCode.SUCCESS || !buffer) {
                return { code };
            }
            const { rtcToken, entries } = this.codec.decode(RTCPB.RtcViewerJoinedOutput, buffer);
            return { code, data: { token: rtcToken, kvEntries: entries } };
        }
        async quitLivingRoomAsAudience(roomId) {
            const sourceData = this.codec.encode(RTCPB.SetUserStatusInput, { status: 0 });
            const { code } = await this.context.rtcSignaling(roomId, RTC_API.viewerExitR, true, sourceData);
            return code;
        }
        async rtcIdentityChange(roomId, changeType, broadcastType) {
            const sourceData = this.codec.encode(RTCPB.RtcInput, {
                roomType: RTCMode.LIVE,
                broadcastType,
                identityChangeType: changeType,
                needSysChatroom: false
            });
            const { code, buffer } = await this.context.rtcSignaling(roomId, RTC_API.rtcIdentityChange, true, sourceData);
            if (code !== engine.ErrorCode.SUCCESS || !buffer) {
                return { code };
            }
            const data = decodeRtcUserListOutput(this.codec, buffer);
            return { code, data };
        }
        async requestRoomPK(options) {
            const { invitedRoomId, invitedUserId, inviteSessionId, inviteTimeout, inviteInfo, roomId } = options;
            const sourceData = this.codec.encode(RTCPB.RtcInviteInput, {
                invitedRoomId,
                invitedUserId,
                inviteSessionId,
                timeoutTime: inviteTimeout,
                inviteInfo
            });
            const { code } = await this.context.rtcSignaling(roomId, RTC_API.rtcInvite, true, sourceData);
            return code;
        }
        async cancelRoomPK(options) {
            const { invitedRoomId, invitedUserId, inviteSessionId, inviteInfo, roomId } = options;
            const sourceData = this.codec.encode(RTCPB.RtcCancelInviteInput, {
                invitedRoomId, invitedUserId, inviteSessionId, inviteInfo
            });
            const { code } = await this.context.rtcSignaling(roomId, RTC_API.rtcCancelInvite, true, sourceData);
            return code;
        }
        async responseRoomPK(options) {
            const { inviteUserId, inviteRoomId, inviteSessionId, content, key, value, agree, roomId } = options;
            const sourceData = this.codec.encode(RTCPB.RtcInviteAnswerInput, {
                inviteUserId,
                inviteRoomId,
                inviteSessionId,
                content,
                key,
                value,
                answerCode: agree ? 1 : 0
            });
            const { code } = await this.context.rtcSignaling(roomId, RTC_API.rtcInviteAnswer, true, sourceData);
            return code;
        }
        async endRoomPK(options) {
            const { endRoomId, sessionId, content, keys, roomId } = options;
            const sourceData = this.codec.encode(RTCPB.RtcEndInviteInput, {
                inviteRoomId: endRoomId,
                inviteSessionId: sessionId,
                inviteContent: content,
                inviteRoomKeys: keys
            });
            const { code } = await this.context.rtcSignaling(roomId, RTC_API.rtcEndInvite, true, sourceData);
            return code;
        }
        async getRTCJoinedUserInfo(userId) {
            const sourceData = this.codec.encode(RTCPB.RtcQueryUserJoinedInput, { userId });
            const { code, buffer } = await this.context.rtcSignaling('', RTC_API.rtcQueryJoined, true, sourceData);
            if (code !== engine.ErrorCode.SUCCESS || !buffer) {
                return { code };
            }
            const info = this.codec.decode(RTCPB.RtcQueryUserJoinedOutput, buffer).info || [];
            return {
                code,
                data: info.map(item => ({
                    deviceId: item.deviceId,
                    roomId: item.roomId,
                    joinTime: int64ToTimestamp(item.joinTime)
                }))
            };
        }
        async pullRTCRoomEntry(roomId) {
            // 不适用增量拉取，直接全量拉取 KV，timestamp 为 0
            const sourceData = this.codec.encode(RTCPB.RtcPullKV, { timestamp: 0, roomId });
            const { code, buffer } = await this.context.rtcSignaling(roomId, RTC_API.rtcPullKv, true, sourceData);
            if (code !== engine.ErrorCode.SUCCESS) {
                return { code };
            }
            const data = this.codec.decode(RTCPB.RtcKVOutput, buffer);
            let { entries: kvEntries, syncTime } = data;
            kvEntries = (kvEntries || []).map((entry) => {
                return Object.assign(Object.assign({}, entry), { timestamp: int64ToTimestamp(entry.timestamp) });
            });
            return {
                code,
                data: {
                    kvEntries,
                    syncTime
                }
            };
        }
        decodeRtcNotify(buffer) {
            const { time, type, roomId } = this.codec.decode(RTCPB.RtcNotifyMsg, buffer);
            return { time, type, roomId };
        }
        getCurrentId() {
            return this.context.getCurrentId();
        }
        getNaviInfo() {
            return this.context.getNaviInfo();
        }
        getConnectionStatus() {
            return this.context.getConnectionStatus();
        }
        getAppkey() {
            return this.context.getAppkey();
        }
        rtcPing(roomId, roomMode, broadcastType) {
            return this.context.rtcPing(roomId, roomMode, broadcastType);
        }
        sendMessage(conversationType, targetId, options) {
            return this.context.sendMessage(conversationType, targetId, options);
        }
        registerRTCSignalListener(listener) {
            this.context.registerRTCSignalListener(listener);
        }
        registerConnectionStateChangeListener(listener) {
            this.context.onconnectionstatechange = listener;
        }
        registerDisconnectListener(listener) {
            this.context.ondisconnect = listener;
        }
        registerDestroyListener(listener) {
            this.context.ondestroy = listener;
        }
        registerMessageListener(listener) {
            this.context.onmessage = listener;
        }
        getCoreVersion() {
            return this.context.getCoreVersion();
        }
        getPluginContext() {
            return this.context;
        }
    }

    /**
     * RTC 插件生成器
     * @public
     */
    const installer = {
        tag: 'RCRTC',
        verify(runtime) {
            if (runtime.tag !== "browser") {
                logger.error(`RCRTC Plugin is not support the runtime '${runtime.tag}'`);
                return false;
            }
            if (!isValidLocation) {
                logger.error('Please use the https protocol or use `http://localhost` to open the page!');
                return false;
            }
            engine.VersionManage.add('plugin-rtc', "5.5.1-alpha.1");
            if (!engine.VersionManage.validEngine("^5.5.1-alpha.1")) {
                logger.error(`The current engine version '${engine.VersionManage.getInfo().engine}' error, plugin-rtc required engine version at least '${"^5.5.1-alpha.1"}'.`);
                return false;
            }
            return true;
        },
        setup(context, runtime, options = {}) {
            var _a, _b, _c, _d, _e, _f, _g, _h;
            logger.setLogLevel(options.logLevel);
            logger.setLogStdout(options.logStdout);
            logger.warn(`RCRTC Version: ${"5.5.1-alpha.1"}, Commit: ${"dd31e1b7e744940a395d3026279843458e87a54c"}`);
            logger.warn(`browserInfo.browser -> ${browserInfo.browser}`);
            logger.warn(`browserInfo.supportsUnifiedPlan -> ${browserInfo.supportsUnifiedPlan}`);
            logger.warn(`browserInfo.version -> ${browserInfo.version}`);
            // mediaServer 地址为空时，使用导航下发地址
            engine.assert('options.mediaServer', options.mediaServer, (value) => {
                // 非有效 http URL 地址或页面为 https 协议而 value 为 http 协议时无效
                // 其他情况均不检测，以便于 Electron 下自定义协议能够通过检测
                return !(!engine.isHttpUrl(value) || (location.protocol === 'https:' && !/^https/.test(value)));
            });
            engine.assert('options.timeout', options.timeout, (value) => {
                return engine.isNumber(value) && value >= 5000 && value <= 30000;
            });
            engine.assert('options.pingGap', options.pingGap, (value) => {
                return engine.isNumber(value) && value >= 3000 && value <= 10000;
            });
            if (options === null || options === void 0 ? void 0 : options.audio) {
                if ((_a = options.audio) === null || _a === void 0 ? void 0 : _a.workletModule) {
                    RC3AnoiseTrack.workletModule = (_b = options.audio) === null || _b === void 0 ? void 0 : _b.workletModule;
                }
                if ((_c = options.audio) === null || _c === void 0 ? void 0 : _c.workletWasm) {
                    RC3AnoiseTrack.workletWasm = (_d = options.audio) === null || _d === void 0 ? void 0 : _d.workletWasm;
                }
                /* 如果 workletModule 与 workletWasm 都配置了，则将 isOpen 配置为 true */
                if (((_e = options.audio) === null || _e === void 0 ? void 0 : _e.workletModule) && ((_f = options.audio) === null || _f === void 0 ? void 0 : _f.workletWasm)) {
                    RC3AnoiseTrack.isOpen = true;
                }
                if (typeof ((_g = options.audio) === null || _g === void 0 ? void 0 : _g.isOpen) !== 'undefined') {
                    RC3AnoiseTrack.isOpen = (_h = options.audio) === null || _h === void 0 ? void 0 : _h.isOpen;
                }
            }
            return new RCRTCClient(new RTCContext(context, context.createCodec(keymaps, desc)), runtime, options);
        }
    };
    /**
     * 预定义的资源 tag
     */
    const RCTag = {
        /**
         * 默认流 Tag 定义
         */
        DEFAULT: 'RongCloudRTC'
    };
    const helper = {
        transResolution,
        transFrameRate,
        parseTrackId,
        ifSupportLocalFileTrack,
        ifSupportScreenShare
    };

    exports.RCAbstractRoom = RCAbstractRoom;
    exports.RCAudienceClient = RCAudienceClient;
    exports.RCAudienceLivingRoom = RCAudienceLivingRoom;
    exports.RCCameraVideoTrack = RCCameraVideoTrack;
    exports.RCLivingRoom = RCLivingRoom;
    exports.RCLocalAudioTrack = RCLocalAudioTrack;
    exports.RCLocalFileAudioTrack = RCLocalFileAudioTrack;
    exports.RCLocalFileTrack = RCLocalFileTrack;
    exports.RCLocalFileVideoTrack = RCLocalFileVideoTrack;
    exports.RCLocalTrack = RCLocalTrack;
    exports.RCLocalVideoTrack = RCLocalVideoTrack;
    exports.RCMCUConfigBuilder = RCMCUConfigBuilder;
    exports.RCMediaStreamCapture = RCMediaStreamCapture;
    exports.RCMicphoneAudioTrack = RCMicphoneAudioTrack;
    exports.RCRTCClient = RCRTCClient;
    exports.RCRTCRoom = RCRTCRoom;
    exports.RCRemoteAudioTrack = RCRemoteAudioTrack;
    exports.RCRemoteTrack = RCRemoteTrack;
    exports.RCRemoteVideoTrack = RCRemoteVideoTrack;
    exports.RCScreenAudioTrack = RCScreenAudioTrack;
    exports.RCScreenVideoTrack = RCScreenVideoTrack;
    exports.RCTag = RCTag;
    exports.RCTrack = RCTrack;
    exports.device = device;
    exports.helper = helper;
    exports.installer = installer;

    Object.defineProperty(exports, '__esModule', { value: true });

}));
