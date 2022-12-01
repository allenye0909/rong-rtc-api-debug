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
export declare enum RCRTCCode {
    /** 成功 */
    SUCCESS = 10000,
    /** IM 服务未连接 */
    SIGNAL_DISCONNECTED = 50000,
    /** 参数错误 */
    PARAMS_ERROR = 50001,
    /** 加入房间错误，重复加入 RTC 房间内 */
    REPERT_JOIN_ROOM = 50002,
    /** 当前不在房间内 */
    NOT_IN_ROOM = 50003,
    /** MediaServer 未开启 */
    SERVICE_INVALID = 50004,
    /** RTC Token 无效 */
    RTC_TOKEN_INVALID = 50006,
    /** 底层信令调用错误 */
    SIGNAL_ERROR = 53001,
    /** 创建 Offer 失败 */
    CREATE_OFFER_FAILED = 53003,
    /** 网络请求失败 */
    REQUEST_FAILED = 53004,
    /** MCU 地址不可为空 */
    MCU_SERVER_NOT_FOUND = 53005,
    /** 直播订阅失败，当前存在已订阅资源 */
    BROADCAST_SUB_LIST_NOT_EMPTY = 53007,
    /** 房间已被销毁，需重新加入房间获取 Room 实例 */
    ROOM_HAS_BEEN_DESTROYED = 53008,
    /** 没有可用的音视频服务器地址 */
    NOT_OPEN_VIDEO_AUDIO_SERVER = 53009,
    /** 获取用户媒体资源流失败 */
    GET_USER_MEDIA_FAILED = 53010,
    /** 获取屏幕共享流失败 */
    GET_DISPLAY_MEDIA_FAILED = 53011,
    /** 权限问题导致获取媒体流被拒绝 */
    BROWSER_PERMISSION_DENIED = 53012,
    /** 创建自定义流失败 */
    CREATE_CUSTOM_TRACK_FAILED = 53013,
    /** 无效的 TAG 定义 */
    INVALID_TAGS = 53014,
    /** IM 连接无效，无法识别当前登录的用户身份 */
    INVALID_USER_ID = 53015,
    /** 创建文件流失败 */
    CREATE_FILE_TRACK_FAILED = 53016,
    /** 无效的 File 实例 */
    INVALID_FILE_INSTANCE = 53017,
    /** setRemoteDescription failed */
    SET_REMOTE_DESCRIPTION_FAILED = 53018,
    /** 浏览器不支持此方法 */
    BROWSER_NOT_SUPPORT = 53019,
    /** 媒体流无法播放，可能是远端流未订阅或本地流已销毁 */
    TRACK_NOT_READY = 53020,
    /** 视频流播放需时需传参 HTMLVideoElement 作为显示组件 */
    VIDEO_TRACK_MISS_MEDIA_ELEMENT = 53021,
    /** 媒体流播放失败 */
    TRACK_PLAY_ERROR = 53022,
    /** 观众加入直播房间信令错误 */
    SIGNAL_AUDIENCE_JOIN_ROOM_FAILED = 53023,
    /** 直播房间切换身份错误 */
    SIGNAL_ROOM_CHANGE_IDENTITY_FAILED = 53024,
    /** 公有云 SDK 包不允许使用私有云环境 */
    PACKAGE_ENVIRONMENT_ERROR = 53025,
    /** 单个用户发布资源超过限制 （ MediaServer 限制最多 10 个 track ） */
    PUBLISH_TRACK_LIMIT_EXCEEDED = 53026,
    /** 房间内无主播推 CDN */
    CDN_RESOURCE_IS_EMPTY = 53027,
    /** 加入 RTC 房间 joinTYype 为 1 时，当前有其他端在房间时的应答码 */
    SIGNAL_JOIN_RTC_ROOM_REFUSED = 53028,
    /** 设置音频输出设备时，无权限使用请求的设备 */
    NO_PERMISSION_TO_USE_REQUESTED_DEVICE = 53029,
    /** 方法在 PK 房间上不可用 */
    THE_FUNCTION_IS_DISABLED_IN_PKROOM = 53030,
    /** 资源没有全部发成功 */
    SOME_TRACKS_PUBLISH_FAILED = 53031,
    /** electron 中 mac 系统暂不支持屏幕共享采集声音 */
    MAC_IN_ELECTRON_NOT_SUPPORT_SCREEN_SHARE_WITH_AUDIO = 53032,
    /** JWT token 解析超时，需要刷新 navi 重新获取 */
    JWT_TIME_OUT = 1004,
    /** 获取媒体资源时，无系统权限 */
    SYSTEM_PERMISSION_DENIED = 53033
}
//# sourceMappingURL=RCRTCCode.d.ts.map