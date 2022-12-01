/*
 * RCRTC - v5.5.1-alpha.1
 * CommitId - dd31e1b7e744940a395d3026279843458e87a54c
 * Thu Sep 08 2022 11:37:34 GMT+0800 (中国标准时间)
 * ©2020 RongCloud, Inc. All rights reserved.
 */
import * as _rongcloud_engine from '@rongcloud/engine';
import { EventEmitter, RTCPluginContext, AbsCodec, IPromiseResult, ErrorCode, KVString, IAsyncRes, ConnectionStatus, ConversationType, ISendMsgOptions, IReceivedMessage, IRuntime, LogLevel, IPluginGenerator } from '@rongcloud/engine';

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
declare enum RCRTCCode {
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

/**
 * 媒体资源类型
 */
declare enum RCMediaType {
    /**
     * 音频流
     */
    AUDIO_ONLY = 0,
    /**
     * 视频流
     */
    VIDEO_ONLY = 1,
    /**
     * 音视频混合流，只在 web 端存在混合流的情况
     */
    AUDIO_VIDEO = 2
}

declare enum RCFrameRate {
    FPS_10 = "FPS_10",
    FPS_15 = "FPS_15",
    FPS_24 = "FPS_24",
    FPS_30 = "FPS_30"
}

declare enum RCResolution {
    W176_H132 = "W176_H132",
    W176_H144 = "W176_H144",
    W180_H180 = "W180_H180",
    W240_H180 = "W240_H180",
    W240_H240 = "W240_H240",
    W256_H144 = "W256_H144",
    W320_H180 = "W320_H180",
    W320_H240 = "W320_H240",
    W360_H360 = "W360_H360",
    W480_H360 = "W480_H360",
    W480_H480 = "W480_H480",
    W640_H360 = "W640_H360",
    W640_H480 = "W640_H480",
    W720_H480 = "W720_H480",
    W848_H480 = "W848_H480",
    W960_H720 = "W960_H720",
    W1280_H720 = "W1280_H720",
    W1920_H1080 = "W1920_H1080"
}

/**
 * 流状态
 */
declare enum TrackState {
    /**
     * 不可用
     */
    DISABLE = 0,
    /**
     * 可用
     */
    ENABLE = 1
}

declare abstract class RCTrack extends EventEmitter {
    private readonly _tag;
    private readonly _userId;
    protected readonly _kind: 'audio' | 'video';
    private readonly _isLocalTrack;
    private readonly _roomId?;
    protected _localMuted: boolean;
    protected _remoteMuted: boolean;
    protected readonly _id: string;
    protected readonly _streamId: string;
    protected _msTrack?: MediaStreamTrack;
    private _msStream;
    constructor(_tag: string, _userId: string, _kind: 'audio' | 'video', _isLocalTrack: boolean, _roomId?: string | undefined);
    /**
     * 获取音视轨所属的 streamId，streamId 相同的音轨和视轨可认为属于统一道流
     * @returns
     */
    getStreamId(): string;
    getTrackId(): string;
    /**
     * 当 isMCUTrack 为 true 时，返回空字符串
     */
    getUserId(): string;
    __innerGetMediaStreamTrack(): MediaStreamTrack | undefined;
    /**
     * 它返回 MediaStreamTrack 对象。
     * @returns 表示媒体源的 MediaStreamTrack 对象。
     */
    get streamTrack(): (MediaStreamTrack | undefined);
    /**
     * 获取数据标识
     * @returns
     */
    getTag(): string;
    isLocalTrack(): boolean;
    isVideoTrack(): boolean;
    isAudioTrack(): boolean;
    /**
     * 查询流数据是否已可进行播放
     * @returns
     */
    isReady(): boolean;
    __innerSetMediaStreamTrack(track: MediaStreamTrack | undefined): void;
    protected _setLocalMuted(bool: boolean): void;
    /**
     * 禁用
     */
    mute(): void;
    /**
     * 启用
     */
    unmute(): void;
    /**
     * 本端是否已禁用该轨道数据
     */
    isLocalMuted(): boolean;
    /**
     * 是否为 MCU track
     */
    isMCUTrack(): boolean;
    /**
     * 发布者是否已禁用该轨道数据，在 RCLocalTrack 实例中，则其值始终等于 `isLocalMuted()`
     */
    isOwnerMuted(): boolean;
    private _element?;
    /**
     * 播放
     * @param element 用于承载媒体流的元素标签，音频流可传空
     * @param volume 有效值为 0-100
     */
    play(element?: HTMLVideoElement, options?: {
        volume?: number;
        audioDeviceId?: string;
    }): Promise<{
        code: RCRTCCode;
    }>;
    __innerDestroy(): void;
    /**
     * 释放内存中的 video、audio 标签
     */
    __releaseMediaElement(): void;
    /**
     * 它检查元素是否是视频节点
     * @param {any} element - 您要检查的元素是否为视频元素。
     * @returns 一个布尔值。
     */
    private __validateVideoNodeName;
}

declare enum RCAudioBitrate {
    /**
     * 标清音质
     */
    Speech = "Speech",
    /**
     * 音乐音质
     */
    Music = "Music",
    /**
     * 音乐高清音质
     */
    MusicHigh = "MusicHigh"
}
declare enum RCVideoBitrate {
    /**
     * Bitrate { max: 150, min: 80 }
     */
    LEVEL0 = "LEVEL0",
    /**
     * Bitrate { max: 280, min: 120 }
     */
    LEVEL1 = "LEVEL1",
    /**
     * Bitrate { max: 650, min: 150 }
     */
    LEVEL2 = "LEVEL2",
    /**
     * Bitrate { max: 1000, min: 200 }
     */
    LEVEL3 = "LEVEL3",
    /**
     * Bitrate { max: 2200, min: 250 }
     */
    LEVEL4 = "LEVEL4",
    /**
     * Bitrate { max: 4000, min: 400 }
     */
    LEVEL5 = "LEVEL5"
}

declare abstract class RCLocalTrack extends RCTrack {
    /**
     * 本地流结束事件通知
     * @description
     * 该事件为 MediaStreamTrack 实例的 'ended' 事件触发
     */
    static EVENT_LOCAL_TRACK_END: string;
    /**
     * muted 状态变更通知常量定义
     */
    static __INNER_EVENT_MUTED_CHANGE__: string;
    /**
     * 本地流已销毁
     */
    static __INNER_EVENT_DESTROY__: string;
    constructor(tag: string, userId: string, kind: 'audio' | 'video', track: MediaStreamTrack);
    /**
     * @override 重写 RCTrack 父类方法
     * @param bool
     */
    _setLocalMuted(bool: boolean): void;
    private _isPublished;
    __innerSetPublished(bool: boolean): void;
    /**
     * 检测本地资源是否已发布
     */
    isPublished(): boolean;
    /**
     * 销毁本地流
     */
    destroy(): void;
    private _bitrateInfo?;
    /**
     * 为本地流设定上行码率，仅视频流有效，音频默认 15 kbps，不支持修改
     * @description 当 `max` 或 `min` 值为 `0` 时，取动态码率计算结果
     * @param max 最大码率
     * @param min 最小码率
     * @param start 起始码率
     */
    setBitrate(max?: number, min?: number, start?: number): void;
    /**
     * 获取码率配置，当未指定码率时，将取得动态码率计算值
     * @returns
     */
    getBitrate(): IRCTrackBitrate;
}
declare class RCLocalAudioTrack extends RCLocalTrack {
    constructor(tag: string, userId: string, track: MediaStreamTrack);
    /**
     * 它设置推荐的音频码率。
     * @param {RCAudioBitrate} audio - RCA音频比特率
     */
    setRecommendBitrate(audio: RCAudioBitrate): void;
    /**
     * 它设置视频的比特率。
     * @param {number} max - 客户端将使用的最大比特率。
     * @param {number[]} args - [分钟，开始]
     */
    setBitrate(max: number, ...args: number[]): void;
    protected _stopProcess: Function;
    /**
     * @override __innerSetMediaStreamTrack
     * @params {track} MediaStreamTrack 添加音频流
     * @params {track} undefined        销毁音频流
     */
    __innerSetMediaStreamTrack(track: MediaStreamTrack | undefined): void;
}
declare class RCLocalVideoTrack extends RCLocalTrack {
    private _isTiny;
    constructor(tag: string, userId: string, track: MediaStreamTrack, _isTiny?: boolean);
    __isTiny(): boolean;
    getStreamId(): string;
    getTrackId(): string;
    /**
     * 它设置推荐的音频码率
     * @param {RCVideoBitrate} video - RC视频比特率
     */
    setRecommendBitrate(video: RCVideoBitrate): void;
    /**
     * 它设置视频的比特率。
     * @param {number} max - 视频可以编码的最大比特率。
     * @param {number[]} args - [最大、最小、开始]
     */
    setBitrate(max: number, ...args: number[]): void;
}
declare abstract class RCLocalFileTrack extends RCLocalTrack {
    /**
     * 自定义文件流的播放宿主原生，该类型流所持有的 MediaStreamTrack 实例是由该宿主元素 `captureStream` 获取
     */
    protected _resource: HTMLVideoElement;
    private static readonly _mapping;
    /**
     * 建立 trackId 与宿主播放元素的映射关系
     * @param trackId
     * @param video
     */
    private static __innerSetMapping;
    private static __innerRemoveMapping;
    constructor(tag: string, userId: string, kind: 'audio' | 'video', track: MediaStreamTrack, 
    /**
     * 自定义文件流的播放宿主原生，该类型流所持有的 MediaStreamTrack 实例是由该宿主元素 `captureStream` 获取
     */
    _resource: HTMLVideoElement);
    destroy(): void;
}
declare class RCLocalFileVideoTrack extends RCLocalFileTrack {
    constructor(tag: string, userId: string, track: MediaStreamTrack, element: HTMLVideoElement);
}
declare class RCLocalFileAudioTrack extends RCLocalFileTrack {
    constructor(tag: string, userId: string, track: MediaStreamTrack, element: HTMLVideoElement);
    _setLocalMuted(bool: boolean): void;
    play(): Promise<{
        code: RCRTCCode;
    }>;
    protected _stopProcess: Function;
    /**
     * @override __innerSetMediaStreamTrack
     * @params {track} MediaStreamTrack 添加音频流
     * @params {track} undefined        销毁音频流
     */
    __innerSetMediaStreamTrack(track: MediaStreamTrack | undefined): void;
}
declare class RCMicphoneAudioTrack extends RCLocalAudioTrack {
}
declare class RCCameraVideoTrack extends RCLocalVideoTrack {
}
declare class RCScreenVideoTrack extends RCLocalVideoTrack {
}
declare class RCScreenAudioTrack extends RCLocalAudioTrack {
}

declare class RCRemoteTrack extends RCTrack {
    constructor(tag: string, userId: string, kind: 'audio' | 'video', roomId?: string);
    /**
     * 根据房间数据更新状态
     * @param value
     */
    __innerSetRemoteMuted(bool: boolean): void;
    private _isSubscribed;
    __innerSetSubscribed(bool: boolean): void;
    /**
     * 查看是否已订阅了该远端资源
     * @returns
     */
    isSubscribed(): boolean;
}
declare class RCRemoteAudioTrack extends RCRemoteTrack {
    constructor(tag: string, userId: string, roomId?: string);
}
declare class RCRemoteVideoTrack extends RCRemoteTrack {
    constructor(tag: string, userId: string, roomId?: string);
    private _isSubTiny;
    __innerSetIsTinyTrack(bool: boolean): void;
    /**
     * 是否订阅的小流
     */
    isSubTiny(): boolean;
}

/**
 * 资源大小流标识枚举
 */
declare enum RCStreamType {
    /**
     * 普通流（大流）
     */
    NORMAL = 1,
    /**
     * 小流
     */
    TINY = 2
}

interface IStatParser {
    /**
     * 取消发布后，需把 _latestPacketsSent 中 key 为 resourceId 存储的数据清除掉
     */
    clearLatestpacketsSent(resourceIds: string[]): void;
    /**
     * 取消订阅后，需把 _latestPacketsRecv 中 key 为 resourceId 存储的数据清除掉
     */
    clearLatestPacketsRecv(resourceIds: string[]): void;
    parseRTCStatsReport(reports: RTCStatsReport): {
        [key: string]: any;
    };
    formatRCRTCStateReport(stats: {
        [key: string]: any;
    }): IInnerRCRTCStateReport;
    getAudioLevelList(stats: {
        [key: string]: any;
    }): {
        trackId: string;
        audioLevel: number | null;
    }[];
}

declare type ISdpSemantics = 'plan-b' | 'unified-plan';
interface IOfferInfo {
    type: 'offer';
    sdp: string;
    semantics: ISdpSemantics;
}
declare type OutboundVideoInfo = {
    trackId: string;
    simulcast: RCStreamType;
    resolution: string;
};

declare enum RCInnerCDNPullKind {
    RTMP = "rtmp",
    FLV = "flv",
    HLS = "hls"
}

declare enum RCInnerCDNPullIsHttps {
    NOT_HTTPS = 0,
    HTTPS = 1
}

declare enum RCKickReason {
    /**
     * Server 主动踢（掉 Server API 踢出）
     */
    SERVER_KICK = 1,
    /**
     * 其他设备登陆后，本端被踢
     */
    OTHER_KICK = 2
}

declare enum RCRTCPingResult {
    SUCCESS = "Success",
    FAIL = "Fail"
}

/**
 * 直播角色
 */
declare enum RCRTCLiveRole {
    /**
     * 主播
     */
    ANCHOR = 1,
    /**
     * 观众
     */
    AUDIENCE = 2
}

/**
 * RTC 消息类型常量
 * @private
 */
declare enum RCRTCMessageType {
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

declare enum RCInnerCDNPushMode {
    AUTOMATIC = 0,
    MANUAL = 1
}

declare enum RCInnerCDNBroadcast {
    SPREAD = 0,
    NO_SPREAD = -1
}

/**
 * 音视频模式
 */
declare enum RTCMode {
    /**
     * 普通音视频模式
     */
    RTC = 0,
    /**
     * 直播模式
     */
    LIVE = 2,
    /**
     * 跨应用多人房间
     */
    CROSS_MUTI = 7,
    /**
    * 跨应用直播
    */
    CROSS_LIVE = 8
}

/**
 * 与 MediaServer 交互所需的 Request Header 信息
 */
interface IRTCReqHeader {
    /**
     * RTC Token
     * @todo 有效期问题处理
     */
    Token: string;
    /**
     * 房间 Id
     */
    RoomId: string;
    /**
     * 用户 Id
     */
    UserId: string;
    /**
     * 仅在直播模式下需要
     */
    RoomType?: RTCMode;
    /**
     * 开发者的 AppKey
     */
    'App-Key': string;
    /**
     * signal 会话 session id
     */
    'Session-Id'?: string;
    /**
     * peerConnection Id
     */
    'Peer-Connection-Id'?: string;
    /**
     * client-session-id 标识一个端用户进入房间后的唯一标识
     */
    'Client-Session-Id'?: string;
}
interface IMCUReqHeaders {
    'App-Key': string;
    Token: string;
    RoomId: string;
    UserId: string;
    SessionId: string;
}
/**
 * exchange 接口中 pushOtherRooms 字段接口
 */
interface IPushOtherRooms {
    /**
     * 房间 Id
     */
    roomId: string;
    /**
    * 是否默认合流
    */
    autoMix: boolean;
    /**
    * 房间 Id 对应的 SessionId
    */
    sessionId: string;
}
/**
 * exchange 接口的请求体结构
 */
interface IExchangeReqBody {
    /**
     * local description
     */
    sdp: IOfferInfo;
    /**
     * 订阅列表
     */
    subscribeList: {
        /**
         * 流资源 uri
         */
        uri: string;
        /**
         * 大小流订阅，`1` 为大流，`2` 为小流，默认使用大流
         */
        simulcast: RCStreamType;
        /**
         * 分辨率信息
         */
        resolution: string;
    }[];
    /**
     * 透传参数，一般用于传递参数给其他服务，如 MCU/Record 等，MediaServer 仅透传不处理
     * @example `{"resolutionInfo":[{"trackId":"021ad6e8-a50c-479c-96c8-5f3f09d2352d","simulcast":1,"resolution":"640x480"}]}`
     */
    extend: string;
    /**
     * 跨房间连麦时其他房间的推流信息
     */
    pushOtherRooms?: IPushOtherRooms[];
    /**
     * server 根据网络动态切换大小流开关，默认为 `false`
     */
    switchstream: boolean;
}
interface ILiveUrls {
    /**
     * MCU 服务地址，直播模式中用于向 MCU 服务提交 CDN 及合流配置
     */
    configUrl: string;
    /**
     * 观众端订阅地址，由业务层分发
     */
    liveUrl: string;
    /**
     * 自动推 CDN 模式下，发布资源后返回的 CDN 信息
     */
    pull_url?: string;
}
interface IRTCResponse {
    /**
     * 请求响应码，只有在 resultCode 值为 `10000` 时才为正常响应
     */
    resultCode: RCRTCCode;
    /**
   * 与 resultCode 相应的可读性文字信息
   */
    message: string;
    /**
     * 客户端发送的 Request-Id
     */
    'Request-Id': string;
}
/**
 * /exchange 响应结果
 */
interface IExchangeResponse extends IRTCResponse {
    /**
     * 数据中心地址，当存在此值时，后续所有请求发送到该地址。该地址不携带协议头，故需要补全 `https://` 协议头
     */
    clusterId: string;
    /**
     * 发布的资源列表
     */
    publishList: IResource[];
    /**
     * @deprecated 目前并未使用，服务器返回值为 ''
     */
    roomId: '';
    /**
     * 远端 SDP 数据
     */
    sdp: {
        type: 'answer';
        sdp: string;
    };
    /**
     * 直播模式推流数据，仅在直播模式有值
     */
    urls?: ILiveUrls;
    /**
     * 跨房间连麦响应数据
     */
    otherRoomsRes?: {
        [roomId: string]: ILiveUrls;
    };
    /**
     * 直播 mcu 资源
     * 主播发布为具体资源，会议模式为空数组
     */
    mcuPublishList?: IResource[];
    /**
     * 订阅成功的资源
     */
    subscribedList?: {
        mediaType: RCMediaType.AUDIO_ONLY | RCMediaType.VIDEO_ONLY;
        msid: string;
        userId: string;
        simulcast?: RCStreamType;
    }[];
}
interface IBroadcastSubReqBody {
    /**
     * 客户端 offer
     */
    sdp: {
        type: 'offer';
        sdp: string;
    };
    /**
     * 直播信息
     */
    liveUrl?: string;
    /**
     * 订阅的资源类型，默认为 `RCMediaType.AUDIO_VIDEO`
     */
    mediaType?: RCMediaType;
    /**
     * 订阅大/小流，默认订阅大流
     */
    simulcast?: RCStreamType;
    /**
     * 允许 server 根据网络状况动态切换大小流，默认为 false
     */
    switchstream: boolean;
    /**
     * 订阅列表
     */
    subscribeList?: {
        /**
         * 流资源 uri
         */
        uri: string;
        /**
         * 大小流订阅，`1` 为大流，`2` 为小流，默认使用大流
         */
        simulcast: RCStreamType;
        /**
         * 分辨率信息
         */
        resolution: string;
    }[];
    /**
     * 是否采用新版本模式，加入房间
     */
    newVersionFlag?: boolean;
}
interface IBroadcastSubRespBody extends IRTCResponse {
    /**
     * 已订阅的资源列表
     */
    subscribedList: IResource[];
    /**
     * 远端 SDP
     */
    sdp: {
        type: 'answer';
        sdp: string;
    };
}
/**
 * 获取 CDN 资源拉流地址请求 headers
 */
interface ICDNPlayUrlReqHeaders extends IMCUReqHeaders {
}
/**
 * 获取 CDN 资源拉流地址响应
 */
interface ICDNPlayUrlResponse extends IRTCResponse {
    data: {
        fps: number;
        h: number;
        'pull_url': string;
        w: number;
    };
}
/**
 * cdn_uris 里面包含的字段
 */
interface ICDNUris {
    /**
     * 是否扩散
     */
    broadcast: RCInnerCDNBroadcast;
    /**
     * 拉流资源的宽度
     */
    w?: number;
    /**
     * 拉流资源的高度
     */
    h?: number;
    /**
    * 帧率
    */
    fps?: number;
    /**
     * 获取拉流地址的 url
     */
    url: string;
    /**
     * 开启、停用 CDN
     */
    enableInnerCDN?: boolean;
    /**
     * 推送模式，手动 or 自动
     */
    'push_mode': RCInnerCDNPushMode;
    'pull_safe': boolean;
}

/**
 * 直播布局模式定义
 */
declare enum MixLayoutMode {
    /**
     * 自定义布局
     */
    CUSTOMIZE = 1,
    /**
     * 悬浮布局（默认）
     */
    SUSPENSION = 2,
    /**
     * 自适应布局
     */
    ADAPTATION = 3
}

/**
 * 合流布局对视频的填充模式
 */
declare enum MixVideoRenderMode {
    /**
     * 裁剪（默认）
     */
    CROP = 1,
    /**
     * 不裁剪
     */
    WHOLE = 2
}

declare enum RCInnerCDNModel {
    OPEN = 1,
    STOP = 2
}

declare enum RCMixInputFilterMode {
    /** 全合流，后续加入房间的用户会自动合流 */
    AUDIO_VIDEO_ALL = 0,
    /** 全不合流，后续加入本房间的用户 */
    AUDIO_VIDEO_NO = 1,
    /** 音频全订阅, 视频全不订阅 */
    AUDIO_ALL_VIDEO_NO = 2,
    /** 视频全订阅, 音频全不订阅 */
    AUDIO_NO_VIDEO_ALL = 3,
    /**
     * 根据设置的音频合流列表和视频合流列表合并媒体流
     */
    AUDIO_VIDEO_INPUT = 4,
    /** 音频全订阅，视频根据设置的视频合流列表 */
    AUDIO_ALL_VIDEO_INPUT = 5,
    /** 音频全不订阅, 视频根据input里面的视频项订阅 */
    AUDIO_NO_VIDEO_INPUT = 6,
    /** 视频全订阅, 音频根据input里面的音频项订阅 */
    AUDIO_INPUT_VIDEO_ALL = 7,
    /** 视频全不订阅, 音频根据input里面的音频项订阅 */
    AUDIO_INPUT_VIDEO_NO = 8,
    /** 按房间列表订阅音视频(保留当前已经订阅的, 但没在房间列表里的音视频) */
    ROOM_AUDIO_VIDEO_APPEND = 9,
    /** 按房间列表订阅音视频(清理当前已经订阅的, 但没在房间列表里的音视频) */
    ROOM_AUDIO_VIDEO_NOT_APPEND = 10,
    /** 按房间列表订阅音频, 不订阅视频(保留当前已经订阅的, 但没在房间列表里的音频) */
    ROOM_AUDIO_APPEND = 11,
    /** 按房间列表订阅音视, 不订阅视频(清理当前已经订阅的, 但没在房间列表里的音频) */
    ROOM_AUDIO_NOT_APPEND = 12,
    /** 按房间列表订阅视频, 不订阅音频(保留当前已经订阅的, 但没在房间列表里的视频) */
    ROOM_VIDEO_APPEND = 13,
    /** 按房间列表订阅视频, 不订阅音频(清理当前已经订阅的, 但没在房间列表里的视频) */
    ROOM_VIDEO_NOT_APPEND = 14
}

/**
 * 合流后的 video 输出编码配置，包含分辨率、帧率、码率配置项
 */
interface IMCUOutputVideoAttrs {
    /**
     * 视频分辨率宽度
     */
    width?: number;
    /**
     * 视频分辨率高度
     */
    height?: number;
    /**
     * 帧率
     */
    fps?: number;
    /**
     * 码率
     */
    bitrate?: number;
}
/**
 * 合并入 MCU 的音频流
 */
interface IMCUInputAudio {
    user_id: string;
    stream_id: string;
}
/**
 * 自定义布局中的单一视频流布局
 */
interface IMCUInputVideoLayout {
    user_id: string;
    stream_id: string;
    x: number;
    y: number;
    width: number;
    height: number;
}
/**
 * 图片配置，用于水印、视频流背景图
 */
interface IPictureAttrs {
    /**
     * 资源下载地址，需包含协议
     */
    uri: string;
    /**
     * 相对于整体画布的起始位置 x 坐标
     */
    x: number;
    /**
     * 相对于整体画布的起始位置 y 坐标
     */
    y: number;
    /**
     * 相对于整体画布的宽（百分比），有效值 `0.0` - `1.0`
     */
    w: number;
    /**
     * 相对于整体画布的高（百分比），有效值 `0.0` - `1.0`
     */
    h: number;
}
/**
 * 合流后的 Video 输出配置，包含背景图、背景色、大小流编码等配置项
 */
interface IMCUOutputVideoConfig {
    /**
     * 标准流输出定义
     */
    normal?: IMCUOutputVideoAttrs;
    /**
     * 小流输出定义
     */
    tiny?: IMCUOutputVideoAttrs;
    exparams?: {
        /**
         * 合流布局时，对视频流的填充方式
         */
        renderMode: MixVideoRenderMode;
    };
    /**
     * 背景色，如 `'0xf1a2c3'`
     */
    backgroundColor?: string;
    /**
     * 背景图
     */
    backgroundPicture?: {
        /**
         * 填充模式：
         * 1. 按比例裁剪
         * 2. 不裁剪，按比例压缩
         */
        fillMode: 1 | 2;
        /**
         * 资源列表
         */
        picture: IPictureAttrs[];
    };
}
/**
 * 合流后的媒体输出定义
 */
interface IMCUOutputConfig {
    /**
     * 输出视频配置
     */
    video: IMCUOutputVideoConfig;
    /**
     * 输出音频配置
     */
    audio?: {
        /**
         * 音频码率
         */
        bitrate: number;
    };
    /**
     * CDN 推流地址列表
     */
    cdn?: {
        /**
         * 推流地址，如：`'rtmp://xxxx'`
         */
        pushurl: string;
    }[];
}
/**
 * 合流前的单一视频流水印配置
 *【客户端仅提供图片水印设置】
 */
interface IMCUSignalScreenWaterMarkConfig {
    /**
     * 媒体流的 msid
     */
    streamId: string;
    picture: IPictureAttrs[];
}
interface IMCUWaterMarkConfig {
    enable: 'on' | 'off';
    /**
     * 合流后的屏幕水印配置
     *【客户端暂不提供合流水印设置】
     */
    /**
     * 合流前的单人视频流水印配置
     */
    singleScreen: IMCUSignalScreenWaterMarkConfig[];
}
/**
 * 发布到服务器的 MCU 配置数据
 */
interface IMCUConfig {
    /**
     * 为向后兼容，当前为常量 1
     */
    version: 2;
    /**
     * 布局模式，在只配置推流 CDN 时，该值不存在
     */
    mode: MixLayoutMode;
    /**
     * 渲染到主位置上的流 Id，当该值为空时，输出到主位置的流按发布时间顺序优先选择最早发布的流
     */
    host_stream_id?: string;
    /**
     * 自定义布局输入定义，只有在 mode 值为 `MixLayoutMode.CUSTOMIZE` 时需传值
     */
    input?: {
        video?: IMCUInputVideoLayout[];
        audio?: IMCUInputAudio[];
    };
    /**
     * 合流后的媒体输出配置
     */
    output?: IMCUOutputConfig;
    /**
     * 水印配置
     */
    waterMark?: IMCUWaterMarkConfig;
    /**
     * MCU 拉流配置，决定 MCU 从 MediaServer 拉流的方式
     */
    inputFilterMode?: RCMixInputFilterMode;
    /**
     * MCU 混入列表中房间内的资源
     */
    mixRooms?: string[];
}
/**
 * 设置开启、停用内置 CDN 数据
 */
interface ISetEnableCDN {
    version: 2;
    output: {
        /**
         * 手动开启/停用内置 CDN
         */
        inCDNModel: RCInnerCDNModel;
    };
}

/**
 * RTC 房间加入类型
 */
declare enum RTCJoinType {
    /**
     * 踢前一个设备
     */
    KICK = 0,
    /**
     * 当前加入拒绝
     */
    REFUSE = 1,
    /**
     * 两个设备共存
     */
    COEXIST = 2
}

declare enum RTCApiType {
    ROOM = 1,
    PERSON = 2
}

declare enum RTCIdentityChangeType {
    AnchorToViewer = 1,
    ViewerToAnchor = 2
}

declare const keymaps: {
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
declare type RTCKeyMaps = typeof keymaps;

/**
 * 设置 RTC 人员 inner、outer 数据
 */
interface IRTCUserData {
    [key: string]: string;
}
interface IRtcTokenData {
    rtcToken: string;
}
/**
 * 加入 RTC 房间的用户信息
 */
interface IRTCJoinedInfo {
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
interface IRTCRoomInfo {
    roomId: string;
    roomData: unknown[];
    userCount: number;
    list: unknown[];
}
interface IServerRTCRoomEntry {
    key: string;
    value: string;
    status: number;
    timestamp: number;
    uid: string;
}
interface IRTCUsers {
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
interface IJoinRTCRoomData extends IRTCUsers {
    token: string;
    sessionId: string;
    roomInfo: {
        key: string;
        value: string;
    }[];
    kvEntries: IServerRTCRoomEntry[];
    offlineKickTime: number;
}
interface IReqRoomPKOptions {
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
interface ICancelRoomPKOptions {
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
interface IResRoomPKOptions {
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
interface IEndRoomPKOptions {
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

declare class RTCContext {
    private context;
    private codec;
    constructor(context: RTCPluginContext, codec: AbsCodec<RTCKeyMaps>);
    joinRTCRoom(roomId: string, mode: RTCMode, broadcastType?: number, joinType?: RTCJoinType, innerUserDatas?: IRTCUserData, outerUserDatas?: IRTCUserData): IPromiseResult<IJoinRTCRoomData>;
    quitRTCRoom(roomId: string): Promise<ErrorCode>;
    getRTCRoomInfo(roomId: string): IPromiseResult<IRTCRoomInfo>;
    getRTCUserInfoList(roomId: string): IPromiseResult<IRTCUsers>;
    getRTCUserInfo(roomId: string): IPromiseResult<unknown>;
    removeRTCUserInfo(roomId: string, keys: string[]): Promise<ErrorCode>;
    setRTCData(roomId: string, key: string, value: string, isInner: boolean, apiType: RTCApiType, message?: {
        name: string;
        content: string;
    }): Promise<ErrorCode>;
    /**
     * 全量订阅资源修改
     * @param roomId 房间 Id
     * @param message 向前兼容的消息内容
     * @param valueInfo 全量资源数据
     * @param objectName 全量 URI 消息名
     */
    setRTCTotalRes(roomId: string, message: {
        name: string;
        content: string;
    }, valueInfo: string, objectName: string, mcuValInfo?: string): Promise<ErrorCode>;
    setRTCCDNUris(roomId: string, objectName: string, CDNUris: string): Promise<ErrorCode>;
    getRTCData(roomId: string, keys: string[], isInner: boolean, apiType: RTCApiType): IPromiseResult<KVString>;
    removeRTCData(roomId: string, keys: string[], isInner: boolean, apiType: RTCApiType, message?: {
        name: string;
        content: string;
    }): Promise<ErrorCode>;
    setRTCOutData(roomId: string, rtcData: unknown, type: number, message: unknown): Promise<ErrorCode>;
    getRTCOutData(roomId: string, userIds: string[]): IPromiseResult<unknown>;
    getRTCToken(roomId: string, mode: number, broadcastType?: number): IPromiseResult<IRtcTokenData>;
    setRTCState(roomId: string, report: string): Promise<ErrorCode>;
    getRTCUserList(roomId: string): IPromiseResult<IRTCUsers>;
    joinLivingRoomAsAudience(roomId: string, mode: RTCMode, broadcastType?: number): Promise<IAsyncRes<{
        token: string;
        kvEntries: IServerRTCRoomEntry[];
    }>>;
    quitLivingRoomAsAudience(roomId: string): Promise<ErrorCode>;
    rtcIdentityChange(roomId: string, changeType: RTCIdentityChangeType, broadcastType?: number): Promise<IAsyncRes<IJoinRTCRoomData>>;
    requestRoomPK(options: IReqRoomPKOptions): Promise<ErrorCode>;
    cancelRoomPK(options: ICancelRoomPKOptions): Promise<ErrorCode>;
    responseRoomPK(options: IResRoomPKOptions): Promise<ErrorCode>;
    endRoomPK(options: IEndRoomPKOptions): Promise<ErrorCode>;
    getRTCJoinedUserInfo(userId: string): Promise<IAsyncRes<IRTCJoinedInfo[]>>;
    pullRTCRoomEntry(roomId: string): Promise<IAsyncRes<IChrmKVPullData>>;
    decodeRtcNotify(buffer: Uint8Array): {
        time: any;
        type: any;
        roomId: any;
    };
    getCurrentId(): string;
    getNaviInfo(): _rongcloud_engine.INaviInfo | null;
    getConnectionStatus(): ConnectionStatus;
    getAppkey(): string;
    rtcPing(roomId: string, roomMode: number, broadcastType?: number): Promise<ErrorCode>;
    sendMessage(conversationType: ConversationType, targetId: string, options: ISendMsgOptions): IPromiseResult<IReceivedMessage>;
    registerRTCSignalListener(listener?: ((buffer: Uint8Array) => void) | undefined): void;
    registerConnectionStateChangeListener(listener: (status: ConnectionStatus) => void): void;
    registerDisconnectListener(listener: () => void): void;
    registerDestroyListener(listener: () => void): void;
    registerMessageListener(listener: (message: IReceivedMessage) => boolean): void;
    getCoreVersion(): string;
    getPluginContext(): RTCPluginContext;
}

declare class RCMediaService {
    private readonly _runtime;
    private readonly _context;
    /**
     * 自定义 MediaServer 地址，当有值时，不再使用导航内的地址
     */
    private readonly _msUrl?;
    /**
     * 请求超时时长
     */
    private readonly _timeout;
    /**
     * navi 中获取的媒体服务地址
     */
    private readonly _msInNavi;
    /**
     * 已失败的请求地址
     */
    private readonly _failedMs;
    /**
     * 服务器指纹数据，客户端不得修改，直接透传
     */
    private _rtcFinger;
    /**
     * 服务器接口返回的 clusterId 数据，当此数据有值时，后续所有请求向此服务发送
     */
    private _clusterId;
    /**
     * MCU 服务地址
     */
    private _configUrl;
    /**
     * 嗅探中获取的媒体服务地址
     */
    private static isDetector;
    /**
     * 嗅探中获取的媒体服务地址
     */
    private static msInDetector;
    private static detectorTime;
    private static detectValidMinute;
    private static naviRefetchCount;
    private _msList;
    constructor(_runtime: IRuntime, _context: RTCContext, 
    /**
     * 自定义 MediaServer 地址，当有值时，不再使用导航内的地址
     */
    _msUrl?: string | undefined, 
    /**
     * 请求超时时长
     */
    _timeout?: number);
    detectorMediaSever(): void;
    /**
     *  地址探测
     *  RTC 初始化时检测是否可以拿到 navi，可以拿到开始嗅探
     *  拿不到等 IM 链接成功后，再回调中调用开始嗅探
     */
    private _getDetectorUrls;
    getNaviMS(): string[];
    /**
     * _mslist 列表排序：[_clusterId, ping1, 主域名，ping2, ..., pingN, 备用域名list ]
     * ping1 ：ping 结果返回最快值
     */
    private setMediaServiceList;
    /**
     * 发送请求，请求发送若失败，会继续尝试使用后续可用地址直到无地址可用，此时认为请求失败
     * @param path
     * @param header
     * @param body
     */
    private _request;
    /**
     * 资源协商接口，订阅、发布、变更资源均可以使用此接口。该接口通过 sdp 字段交换 SDP 信息，
     * 并通过 subscribeList 和 publishList 表明最终发布和订阅的资源。本端产出 offer，服务器产出 answer
     * 每次接口调用，都会全量覆盖发布和订阅的资源。
     * @param header
     * @param body
     */
    exchange(headers: IRTCReqHeader, body: IExchangeReqBody): Promise<{
        code: RCRTCCode;
        data?: IExchangeResponse | undefined;
    }>;
    /**
     * 退出房间
     */
    exit(headers: IRTCReqHeader): Promise<RCRTCCode>;
    /**
     * 观众端订阅主播资源
     */
    broadcastSubscribe(headers: IRTCReqHeader, body: IBroadcastSubReqBody): Promise<{
        code: RCRTCCode;
        data?: IBroadcastSubRespBody | undefined;
    }>;
    /**
     * 观众端退出订阅
     */
    broadcastExit(headers: IRTCReqHeader): Promise<{
        code: RCRTCCode;
    }>;
    /**
     * 直播推流、自定义布局配置
     */
    setMcuConfig(headers: IMCUReqHeaders, body: IMCUConfig | ISetEnableCDN): Promise<{
        code: RCRTCCode;
        res?: any;
    }>;
    /**
     * 房间内观众获取 CDN 资源信息、拉流地址
     */
    getCDNResourceInfo(headers: ICDNPlayUrlReqHeaders, url: string): Promise<{
        code: RCRTCCode;
        res?: ICDNPlayUrlResponse;
    }>;
}

/**
 * 直播间类型
 */
declare enum RCLivingType {
    /**
     * 音视频直播
     */
    VIDEO = 0,
    /**
     * 音频直播
     */
    AUDIO = 1
}

declare enum RCCommandKind {
    Unknow = 0,
    Publish = 1,
    UnPublish = 2,
    JoinRoom = 3,
    LeaveRoom = 4,
    UpdateSubscribeTask = 5,
    SubscribedTask = 6,
    UnSubscribedTask = 7,
    AsyncCommand = "AsyncCommand"
}

declare class RCRTCPeerCManager {
    /**
     * 是否使用多 peerConnection
     */
    private readonly _useMutilPeerC;
    /**
     * roomId 或观众端 userId
     */
    private readonly _roomId;
    /**
     * 断线重连每一条 peerConnection
     */
    private readonly _reTryExchange;
    /**
     * 当前用户 id
     */
    private readonly _currentUserId;
    /**
     * 北极星上报模块
     */
    private readonly _polarisReport?;
    /**
     * 存储创建的所有 peerC，key 为 pcName，/exchange 请求中 request header 中的 Peer-Connection-Id 值
     */
    private _mutilPeerC;
    constructor(
    /**
     * 是否使用多 peerConnection
     */
    _useMutilPeerC: boolean, 
    /**
     * roomId 或观众端 userId
     */
    _roomId: string, 
    /**
     * 断线重连每一条 peerConnection
     */
    _reTryExchange: Function, 
    /**
     * 当前用户 id
     */
    _currentUserId: string, 
    /**
     * 北极星上报模块
     */
    _polarisReport?: PolarisReporter | undefined);
    get useMutilPeerC(): boolean;
    /**
     * 根据 track 判断是否为上行
     */
    private _isPub;
    /**
     * 按 tag 分 tracks
     */
    private _groupTracksByTag;
    /**
     * 按规则生成 pcName
     * 单 peerC roomId_pub
     * 多 peerC 上行: roomId_tag、下行: roomId_sub
     * 观众加房间: roomId_sub
     * 观众不加房间: userId_sub
     * @param isPub 是否为上行、下行
     * @param tag 多 peerC 时，上行需资源标识
     */
    private _genPCName;
    /**
     * 创建一个 peerC
     * @param pcName 使用的 peerConnection 名称
     * @param tracks 本次要操作的资源
     */
    private _createOnePeerCItem;
    /**
     * 创建一组 peerC
     * 为了适应多 peerConnection 的场景做出的冗余设计，对单 peerConnection 进行数组进行封装
     * 提示：useMutilPeerC 用户自定义的，没有明确场景，必须使用多 peerConnection
     * @param pcName
     * @returns
     */
    createPeerCList(tracks: TrackParam[]): IMutilPeerC[];
    /**
     * 移除所有 peerConnection 的上行资源
     */
    private _removeAllLocalTrack;
    /**
     * 销毁某一个 peerConnection
     */
    destroyPeerC(pcName: string): void;
    /**
     * 销毁所有 peerConnection
     */
    private _destroyAllPeerC;
    /**
     * 获取某一个 peerC
     */
    getPCItemByPCName(pcName: string): {
        /**
         * RCRTCPeerConnection 对象
         */
        pc: RCRTCPeerConnection;
        /**
         * 存放 peerConnection 上本次要发布、取消发布、订阅、取消订阅的 track
         */
        tracks: TrackParam[];
        /**
         * 当前 peerC 是否为发上行的 peerConnection
         */
        isPub: boolean;
        /**
         * peerConnection 上行资源，暂不需要
         */
        publishList?: IPublishedResource[] | undefined;
        /**
         * peerConnection 下行资源，暂不需要
         */
        subscribeList?: ISubscribeAttr[] | undefined;
    };
    /**
     * 根据 trackId 获取 peerConnection 对象
     */
    getPCByTrackId(trackId: string, isPub?: boolean): RCRTCPeerConnection;
    /**
     * 获取所有的 peerConnection
     */
    getPCList(): RCRTCPeerConnection[];
    /**
     * 获取存储的多 peerConnection 数据
     */
    getMutilPeerCData(): {
        [key: string]: {
            /**
             * RCRTCPeerConnection 对象
             */
            pc: RCRTCPeerConnection;
            /**
             * 存放 peerConnection 上本次要发布、取消发布、订阅、取消订阅的 track
             */
            tracks: TrackParam[];
            /**
             * 当前 peerC 是否为发上行的 peerConnection
             */
            isPub: boolean;
            /**
             * peerConnection 上行资源，暂不需要
             */
            publishList?: IPublishedResource[] | undefined;
            /**
             * peerConnection 下行资源，暂不需要
             */
            subscribeList?: ISubscribeAttr[] | undefined;
        };
    };
    setPeerCData(pcName: string, key: string, value: any): void;
    /**
     * 销毁资源
     */
    clear(): void;
}

declare abstract class ReadableStore {
    readonly context: RTCContext;
    readonly service: RCMediaService;
    readonly peerMgr: RCRTCPeerCManager;
    readonly roomId: string;
    readonly crtUserId: string;
    readonly roomMode: RTCMode;
    readonly polarisReport: PolarisReporter;
    readonly isUpgrade?: boolean | undefined;
    readonly isMainRoom?: boolean | undefined;
    /**
     * 房间资源数据
     */
    protected _roomResources: RoomData;
    /**
     * 远端 track
     */
    protected _remoteTracks: {
        [trackId: string]: RCRemoteAudioTrack | RCRemoteVideoTrack;
    };
    /**
     * 已订阅参数
     */
    protected _subscribedList: ISubscribeAttr[];
    protected _collectSubscribeList: ISubscribeAttr[];
    /**
     * 与 MediaServer 交互需要的 token 信息
     */
    protected _token: string;
    /**
     * 每次加入房间后都会改变
     */
    protected _sessionId: string;
    /**
     * cdn_uris 信令扩散数据
     */
    protected _CDNUris: ICDNUris | null;
    protected _CDNEnable: boolean;
    protected _destroyed: boolean;
    constructor(context: RTCContext, service: RCMediaService, peerMgr: RCRTCPeerCManager, roomId: string, crtUserId: string, roomMode: RTCMode, polarisReport: PolarisReporter, isUpgrade?: boolean | undefined, isMainRoom?: boolean | undefined);
    get useMutilPeerC(): boolean;
    getResourcesByUserId(userId: string): IPublishedResource[] | undefined;
    getRemoteTrack(trackId: string): RCRemoteTrack | undefined;
    getRemoteTracksByUserId(userId: string): RCRemoteTrack[];
    getRemoteTracks(): {
        [trackId: string]: RCRemoteAudioTrack | RCRemoteVideoTrack;
    };
    getSessionId(): string;
    getAllUserIds(): string[];
    getRemoteUserIds(): string[];
    getSubscribedList(): ISubscribeAttr[];
    getCollectSubscribeList(): ISubscribeAttr[];
    getPublishedResourceByTrackId(trackId: string): IPublishedResource | undefined;
    getToken(): string;
    getLocalTrack(trackId: string): RCLocalTrack | null;
    getLocalTracks(): RCLocalTrack[];
    getTrackState(trackId: string): 0 | 1;
    getCDNEnable(): boolean;
    getCDNUris(): ICDNUris | null;
}
declare class Store extends ReadableStore {
    private _initRemoteTracks;
    initWithRoomData(data: IJoinRTCRoomData): void;
    assignRoomData(data: RoomData): void;
    setResourcesByUserId(userId: string, arr: IPublishedResource[]): void;
    removeRemoteTrack(trackId: string): void;
    removeResourcesByUserId(userId: string): void;
    addRemoteTrack(track: RCRemoteTrack): void;
    removeRemoteTracks(): void;
    setCDNEnabel(bool: boolean): void;
    setCDNUris(uris: ICDNUris | null): void;
    resetSubscribedList(subscribeList: ISubscribeAttr[]): void;
    resetCollectSubscribeList(collectSubscribeList: ISubscribeAttr[]): void;
}

declare enum CommandPriority {
    LOW = 0,
    NORMAL = 1,
    HIGH = 2
}
/**
 * 命令基类
 */
declare abstract class BaseCommand<RES, STORE = Store> {
    /**
     * 执行指令
     * @param store
     */
    abstract execute(store: STORE, invoker: BaseInvoker<STORE>): Promise<RES>;
    /**
     * 获取指令优先级，必要时可 override 此函数
     */
    get priority(): CommandPriority;
    /**
     * 它返回命令的种类。
     * @returns 命令的种类。
     */
    get kind(): RCCommandKind;
}

declare class BaseInvoker<STORE> {
    /**
     * 内存数据管理实例
     */
    protected readonly _store: STORE;
    /**
     * 命令终止时返回的错误码定义
     */
    private abortCode;
    constructor(
    /**
     * 内存数据管理实例
     */
    _store: STORE, 
    /**
     * 命令终止时返回的错误码定义
     */
    abortCode: RCRTCCode);
    private _queue;
    private _busy;
    private _next;
    private _execute;
    push<R>(command: BaseCommand<R, STORE>): Promise<R>;
    private _isDestroyed;
    /**
     * 查找出 RCCommandKind.AsyncCommand 类型的 Command，并将其从队列中删除
     * 并使用最新的一次 Command 接管它的 resolve & reject
     * @param resolve
     * @param reject
     * @returns 具有两个属性的对象，resolve 和 reject。
     */
    private commandOffset;
    isDestroyed(): boolean;
    destroy(): void;
}
/**
 * 房间任务队列管理
 */
declare class Invoker extends BaseInvoker<Store> {
    constructor(context: RTCContext, service: RCMediaService, peerMrg: RCRTCPeerCManager, roomId: string, crtUserId: string, mode: RTCMode, reporter: PolarisReporter, isUpgrade?: boolean, isMainRoom?: boolean);
    /**
     * 获取 store 存储实例，返回值类型 `ReadableStore`，避免非 command 定义中修改内存
     */
    get store(): ReadableStore;
    destroy(): void;
}

declare type ExchangeHooksRes = {
    headers: IRTCReqHeader;
    pushOtherRooms: IPushOtherRooms[];
};
declare type ExchangeHooks = (pcName: string) => ExchangeHooksRes;

declare type IOnRecvPKMsg = (msg: IReceivedMessage) => void;
interface IRoomPKEventListener {
    /**
     * 收到连麦邀请
     */
    onRequestJoinOtherRoom: (info: IPKInviteInfo) => {};
    /**
     * 收到取消连麦邀请
     */
    onCancelRequestOtherRoom: (info: IPKInviteInfo) => {};
    /**
     * 收到连麦 PK 请求响应结果
     */
    onResponseJoinOtherRoom: (info: IPKInviteAnswerInfo) => {};
    /**
     * 收到 PK 结束
     */
    onFinishOtherRoom: (info: IPKEndInfo) => {};
}
declare class RCLivingPKHandler {
    private _invoker;
    private _PKInfo;
    private _hooks;
    private readonly _context;
    private readonly _runtime;
    private readonly _service;
    private readonly _initOptions;
    /**
     * 主直播房间
     */
    private readonly _mainLivingRoom;
    private readonly _registerPKMsgListener;
    /**
     * 加入 PK 房间回调
     */
    private readonly _onJoinedPKRoom;
    protected readonly _clientSessionId?: string | undefined;
    /**
     * PK 邀请超时时间，默认 30s
     */
    private readonly _inviteTimeout;
    private _appListener;
    private _mainRoomId;
    /**
     * 跨房间连麦加入的 PK 房间
     */
    private _joinedPKRooms;
    constructor(_invoker: Invoker, _PKInfo: IPKInfo, _hooks: ExchangeHooks, _context: RTCContext, _runtime: IRuntime, _service: RCMediaService, _initOptions: IRCRTCInitOptions, 
    /**
     * 主直播房间
     */
    _mainLivingRoom: RCLivingRoom, _registerPKMsgListener: (listener: IOnRecvPKMsg) => void, 
    /**
     * 加入 PK 房间回调
     */
    _onJoinedPKRoom: (roomId: string, room: RCLivingRoom) => void, _clientSessionId?: string | undefined);
    private _callAppListener;
    /**
     * 收到连麦邀请
     */
    private _onInvite;
    /**
     * 收到取消连麦
     */
    private _onCancelInvite;
    private _onInviteTimeout;
    /**
     * 收到响应连麦
     */
    private _onInviteAnswer;
    private createLeaveOtherRoomCommand;
    /**
     * 收到连麦结束
     */
    private _onPKEnd;
    /**
     * 处理跨房间连麦相关消息
     */
    private _onRecvPKMsg;
    /**
     * 注册跨房间连麦监听事件
     */
    registerRoomPKEventListener(listener: IRoomPKEventListener): void;
    /**
     * 发起跨房间连麦请求
     * @param inviteeRoomId 被邀请者所处的房间 roomId
     * @param inviteeUserId 被邀请者 userId
     * @param options.autoMix 是否要把邀请者发布的资源，合并到被邀请者房间内的 MCU 流中
     * @param options.extra 拓展字段，可随邀请连麦消息透传给被邀请者
     */
    requestJoinOtherRoom(inviteeRoomId: string, inviteeUserId: string, options?: IReqResPKOptions): Promise<{
        code: RCRTCCode | ErrorCode;
    }>;
    /**
     * 取消跨房间连麦请求
     * @param inviteeRoomId 被邀请者所处的房间 roomId
     * @param inviteeUserId 被邀请者 userId
     * @param extra 附加信息，可随取消邀请连麦消息透传给被邀请者
     */
    cancelRequestJoinOtherRoom(inviteeRoomId: string, inviteeUserId: string, extra?: string): Promise<{
        code: RCRTCCode | ErrorCode;
    }>;
    /**
     * 响应跨房间连麦请求
     * @param inviterRoomId 邀请者所处的房间 roomId
     * @param inviterUserId 邀请者 userId
     * @param agree 是否同意连麦
     * @param options.autoMix 是否要把被邀请者发布的资源，合并到邀请者房间内的 MCU 流中
     * @param options.extra 附加信息，可随响应连麦消息透传给邀请者
     */
    responseJoinOtherRoom(inviterRoomId: string, inviterUserId: string, agree: boolean, options?: IReqResPKOptions): Promise<{
        code: RCRTCCode | ErrorCode;
    }>;
    /**
     * 加入副直播房间
     * @roomId 副房间的 roomId
     */
    joinOtherRoom(roomId: string): Promise<{
        code: RCRTCCode;
        room?: RCLivingRoom;
        userIds?: string[];
        tracks?: RCRemoteTrack[];
        CDNEnable?: boolean;
    }>;
    /**
     * 退出副房间
     * @param room 要退出的副房间的 room 实例
     * @param isQuitPK 是否要结束连麦
     */
    leaveOtherRoom(room: RCLivingRoom, isQuitPK?: boolean): Promise<{
        code: RCRTCCode;
    }>;
    /**
     * 获取连麦信息
     * @param roomId 连麦房间的 roomId
     */
    getPKInfo(roomId: string): {
        inviteSessionId: string;
        inviterRoomId: string;
        inviterUserId: string;
        inviterUserAutoMix?: boolean | undefined;
        inviteeRoomId: string;
        inviteeUserAutoMix?: boolean | undefined;
    };
    /**
     * 获取所有连麦信息
     */
    getAllPKInfo(): IPKInfo;
    /**
     * 获取已加入的副房间
     */
    getJoinedPKRooms(): {
        [roomId: string]: RCLivingRoom;
    };
}

declare type ResourceMsgContent = {
    /**
     * 旧版本兼容参数，当收到非 `RTCMessageName.TOTAL_CONTENT_RESOURCE` 时：
     * * ignore 值为 `true` 表示该消息由 signal server 向旧版本 RTCLib 提供的兼容消息，无需处理
     * * 否则认为该消息是由旧版本 RTCLib 主动发出的增量变更消息，需要处理
     */
    ignore?: boolean;
    /**
     * 发布到房间内的资源列表，`RTCMessageName.TOTAL_CONTENT_RESOURCE` 消息携带全量数据，否则为增量数据
     */
    uris: IPublishedResource[];
    cdn_uris?: ICDNUris[];
};

/**
 * 房间抽象基类
 */
declare abstract class RCAbstractRoom extends EventEmitter {
    protected readonly _context: RTCContext;
    protected readonly _runtime: IRuntime;
    readonly _roomId: string;
    protected readonly _service: RCMediaService;
    protected readonly _initOptions: IRCRTCInitOptions;
    /**
     * 是否使用多 peerConnection
     */
    protected readonly _useMutilPeerC?: boolean | undefined;
    protected readonly _clientSessionId: string;
    /**
     * 房间保活 rtcPing
     */
    private _pinger;
    /**
     * 北极星上报实例
     */
    protected _polarisReport: PolarisReporter | null;
    /**
     * 音量上报实例
     */
    private _audioLevelReport;
    /**
     * peerConnection 管理类
     */
    protected _peerCManager: RCRTCPeerCManager | null;
    protected readonly _invoker: Invoker;
    protected readonly _store: ReadableStore;
    constructor(_context: RTCContext, _runtime: IRuntime, _roomId: string, _roomMode: RTCMode, _service: RCMediaService, _initOptions: IRCRTCInitOptions, isUpgrade?: boolean, isMainRoom?: boolean, 
    /**
     * 是否使用多 peerConnection
     */
    _useMutilPeerC?: boolean | undefined, _clientSessionId?: string);
    __innerInit(mode: RTCMode, joinType?: RTCJoinType, livingType?: RCLivingType, innerUserDatas?: IRTCUserData, outerUserDatas?: IRTCUserData): Promise<{
        code: RCRTCCode | ErrorCode;
        data?: IJoinRTCRoomData;
    }>;
    protected _initWithRoomData(offlineKickTime: number): void;
    private _handlePingResult;
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
    setBitrate(max: number, min: number, start?: number): void;
    private _onTrackReady;
    protected _callAppListener(eventType: keyof IRoomEventListener, ...attrs: any[]): void;
    private _onTrackUnpublish;
    __parseInnerMessage(message: IReceivedMessage): boolean;
    /**
     * 被踢出房间通知
     * @param byServer
     * * 当值为 false 时，说明本端 rtcPing 超时
     * * 当值为 true 时，说明本端收到被踢出房间通知
     */
    private _kickoff;
    private _rtcpeerClosed;
    /**
     * 处理资源变更事件
     * @param content
     * @param messageType 消息类型
     * @param userId 消息发送者
     */
    protected _resourceHandle(content: ResourceMsgContent, messageType: RCRTCMessageType.PUBLISH | RCRTCMessageType.UNPUBLISH | RCRTCMessageType.MODIFY | RCRTCMessageType.TOTAL_CONTENT_RESOURCE, userId: string): Promise<void>;
    private _onTrackPublish;
    /**
     * 处理 `RCRTCMessageType.STATE` 消息
     * @param content
     */
    private _stateHandle;
    /**
     * 获取房间 Id
     */
    getRoomId(): string;
    /**
     * 获取当前 userId
     */
    getCrtUserId(): string;
    /**
     * 获取 _pc 实例
     */
    __getPC(): RCRTCPeerConnection[];
    /**
     * 获取远程用户列表，不包含当前用户
     */
    getRemoteUserIds(): string[];
    /**
     * 获取所有房间已发布的远端资源列表
     * @returns
     */
    getRemoteTracks(): RCRemoteTrack[];
    /**
     * 获取远端用户的资源列表
     * @param userId
     * @returns
     */
    getRemoteTracksByUserId(userId: string): RCRemoteTrack[];
    /**
     * 获取房间当前会话 Id，当房间内已无成员时房间会回收，重新加入时 sessionId 将更新
     */
    getSessionId(): string;
    /**
     * 向房间内发消息
     * @param name 消息名称
     * @param content 消息内容
     */
    sendMessage(name: string, content: any): Promise<{
        code: RCRTCCode;
    }>;
    /**
     * 设置房间属性
     * @param key 属性名
     * @param value 属性值
     * @param message 是否在设置属性的时候携带消息内容，传空则不往房间中发送消息
     * @param isInner RTC 业务内部使用参数，用户忽略
     */
    setRoomAttribute(key: string, value: string, message?: {
        name: string;
        content: string;
    }, isInner?: boolean): Promise<{
        code: RCRTCCode;
    }>;
    /**
     * 删除房间属性
     * @param keys 待删除的属性名数组
     * @param message 是否在删除属性的时候携带消息内容，传空则不往房间中发送消息
     * @param isInner RTC 业务内部使用参数，用户忽略
     */
    deleteRoomAttributes(keys: string[], message?: {
        name: string;
        content: string;
    }, isInner?: boolean): Promise<{
        code: RCRTCCode;
    }>;
    /**
     * 获取房间属性
     * @param keys 要查询的属性名数组，当数组长度为空时，取所有已设置的 kv 值
     * @param isInner RTC 业务内部使用参数，用户忽略
     */
    getRoomAttributes(keys?: string[], isInner?: boolean): Promise<{
        code: RCRTCCode;
        data?: KVString;
    }>;
    /**
     * 设置当前用户属性（暂不开放）
     * @param key 属性名
     * @param value 属性值
     * @param message 是否在设置属性的时候携带消息内容，传空则不往房间中发送消息
     */
    private _setUserAttributeValue;
    /**
     * 删除当前用户属性（暂不开放）
     * @param keys 待删除的属性名数组
     * @param message 是否在删除属性的时候携带消息内容，传空则不往房间中发送消息
     */
    private _deleteUserAttributes;
    /**
     * 获取当前用户属性（暂不开放）
     * @param keys 要查询的属性名数组
     */
    private _getUserAttributes;
    /**
     * 查询房间是否已销毁
     */
    isDestroyed(): boolean;
    /**
     * 退出并销毁当前房间实例，退出后该房间的所有方法将不可用
     */
    __destroy(quitRoom: boolean): Promise<void>;
    /**
     * 退出房间之前禁用所有远端资源，避免退出动作耗时过长，
     * 导致在未完全退出的过程中仍能听到房间内的声音问题
     */
    private _muteRemoteTracksBeforeQuit;
    private _leaveHandle;
    /**
     * 释放 PCManager 上的资源
     */
    private _releasePCManager;
    private _onLocalTrackDestroied;
    /**
     * 本端流状态修改，需通知房间内其他成员
     * @param localTrack
     */
    private _onLocalTrackMuted;
    /**
     * 增量发布资源，若发布的资源 tag 及媒体类型重复，后者将覆盖前者进行发布。
     * @param tracks 待发布的 RCLocalTrack 实例
     * @returns
     */
    publish(tracks: (RCLocalTrack | IPublishAttrs)[]): Promise<IPubSuccessRes>;
    /**
     * 获取跨房间连麦需携带参数 pushOtherRooms 的值
     */
    protected _getPushOtherRoomsParams(): IPushOtherRooms[];
    /**
     * ice 断线后，尝试重新走 exchange
     */
    protected _reTryExchange(pcName: string, isPub: boolean): Promise<void>;
    protected _getRTCReqestHeaders(pcName: string): IRTCReqHeader;
    /**
     * 增量取消资源发布，若相应资源中存在小流资源，则同时取消发布
     * @param tracks 取消发布的 RCLocalTrack 列表
     */
    unpublish(tracks: RCLocalTrack[]): Promise<IPubSuccessRes>;
    /**
     * 根据资源 Id 获取资源数据
     * @param trackId
     */
    private _getResourceById;
    /**
     * resourceId 有效性验证
     * @param resourceId
     */
    protected _isValidResourceId(resourceId: string): boolean;
    private _subhook;
    private _pubhook;
    /**
     * 订阅资源
     * @param tracks
     */
    subscribe(tracks: (RCRemoteTrack | ISubscribeAttr)[]): Promise<{
        code: RCRTCCode;
        failedList?: ISubscribeAttr[];
    }>;
    /**
     * 它将订阅任务添加到队列中。
     * @param {(RCRemoteTrack | ISubscribeAttr)[]} tracks - (RCRemoteTrack | ISubscribeAttr)[]
     * @returns 一个用代码和失败列表解析为对象的承诺。
     */
    addSubscribeTask(tracks: (RCRemoteTrack | ISubscribeAttr)[]): void;
    /**
     * 取消订阅资源
     * @param tracks 预取消远端资源
     */
    unsubscribe(tracks: RCRemoteTrack[]): Promise<{
        code: RCRTCCode;
        failedList?: ISubscribeAttr[];
    }>;
    /**
     * 它将取消订阅任务添加到队列中。
     * @param {RCRemoteTrack[]} tracks - 要取消订阅的曲目。
     * @returns 一个用代码和失败列表解析为对象的承诺。
     */
    addUnsubscribeTask(tracks: RCRemoteTrack[]): void;
    /**
     * 强制修改订阅列表，仅订阅数组中的资源，取消订阅其他已订阅资源。
     * 当参数为 `[]` 时，意味着不再订阅任何资源
     * @param tracks 变更的资源列表
     */
    updateSubList(tracks: (RCRemoteTrack | ISubscribeAttr)[]): Promise<{
        code: RCRTCCode;
        failedList?: ISubscribeAttr[];
    }>;
    /**
     * 将任务添加到任务队列的函数。
     * @param {(RCRemoteTrack | ISubscribeAttr)[]} tracks - (RCRemoteTrack | ISubscribeAttr)[]
     */
    addUpdateSubscribeListTask(tracks: (RCRemoteTrack | ISubscribeAttr)[]): void;
    private _onTaskCompleted;
    /**
     * 获取已发布的本地资源
     * @param trackId
     * @returns
     */
    getLocalTrack(trackId: string): RCLocalTrack | null;
    /**
     * 获取所有已发布的资源
     */
    getLocalTracks(): RCLocalTrack[];
    /**
     * 根据 trackId 获取房间内的远端资源
     * @param trackId
     * @returns
     */
    getRemoteTrack(trackId: string): RCRemoteTrack | null;
    /**
     * 获取当前已经订阅的全量资源
     * returns subscribedTracks ISubscribeAttr[]
     */
    get subscribedTracks(): ISubscribeAttr[];
    private _appListener;
    /**
     * 注册事件监听器，多次注册会导致后者覆盖前者，可以通过使用 `registerRoomEventListener(null)` 取消注册
     * @param listener
     */
    registerRoomEventListener(listener: IRoomEventListener | null): void;
    private _reportListener;
    /**
     * 注册房间数据监控
     * @param listener
     * @description 该方法暂仅支持 Chrome 浏览器
     */
    registerReportListener(listener: IRCRTCReportListener | null): void;
    /**
     * 音量上报
     * @param handler 业务端传入的音量上报事件
     * @param gap 上报时间间隔
     */
    onAudioLevelChange(handler: IAudioLevelChangeHandler | null, gap?: number): void;
    /**
     * 断线重连后尝试补发断线过程中的通知信息
     */
    __onReconnected(livingType?: RCLivingType): Promise<{
        data: IJoinRTCRoomData | undefined;
    } | void>;
    private _onAudioMuteChange;
    private _onVideoMuteChange;
    /**
     * 存储连麦监听事件
     */
    private _onRecvPKMsg;
    /**
     * 注册 PK 业务监听方法
     */
    protected _registerPKMsgListener(listener: IOnRecvPKMsg | null): void;
    /**
     * 退出 PK 房间
     */
    protected _quitAllPKRoom(): void;
    getClientSessionId(): string;
}

declare class RCLocalMediaStream {
    readonly msid: string;
    readonly mediaStream: MediaStream;
    readonly tinyStream: MediaStream;
    readonly tag: string;
    constructor(msid: string);
}

interface IAudienceRoomEventListener extends IRCRTCTrackEventListener {
    /**
     * 主播加入
     * @param userIds 加入主播的 id 列表
     */
    onAnchorJoin?(userId: string[]): void;
    /**
     * 主播退出
     * @param userIds 退出主播的 id 列表
     */
    onAnchorLeave?(userId: string[]): void;
    /**
     * 房间内合流发布资源
     * @param tracks 新发布的合流音轨与视轨数据列表，包含新发布的 RCRemoteAudioTrack 与 RCRemoteVideoTrack 实例
     * @description
     * 当房间内某个主播第一次发布资源时触发
     */
    onTrackPublish?(tracks: RCRemoteTrack[]): void;
    /**
     * 房间内取消合流发布资源
     * @param tracks 被取消发布的合流音轨与视轨数据列表
     * @description
     * 当房间内全部主播退出房间时，SDK 内部会取消对资源的订阅，业务层仅需处理 UI 业务
     */
    onTrackUnpublish?(tracks: RCRemoteTrack[]): void;
    /**
     * 房间内主播发布资源
     * @param tracks 主播新发布的音轨与视轨数据列表，包含新发布的 RCRemoteAudioTrack 与 RCRemoteVideoTrack 实例
     */
    onAnchorTrackPublish?(tracks: RCRemoteTrack[]): void;
    /**
     * 房间内主播取消发布资源
     * @param tracks 被主播取消发布的音轨与视轨数据列表
     * @description 当资源被取消发布时，SDK 内部会取消对相关资源的订阅，业务层仅需处理 UI 业务
     */
    onAnchorTrackUnpublish?(tracks: RCRemoteTrack[]): void;
    /**
     * 房间主播禁用/启用音频
     * @param audioTrack RCRemoteAudioTrack 类实例
     */
    onAudioMuteChange?(audioTrack: RCRemoteAudioTrack): void;
    /**
    * 房间主播禁用/启用视频
    * @param videoTrack RCRemoteVideoTrack 类实例对象
    */
    onVideoMuteChange?(videoTrack: RCRemoteVideoTrack): void;
    /**
     * 房间内主播把发布的资源推至 CDN
     */
    onCDNInfoEnable?(CDNInfo: {
        resolution: RCResolution;
        fps: RCFrameRate;
    }): void;
    /**
     * 主播停止推 CDN
     */
    onCDNInfoDisable?(): void;
    /**
     * 主播改变推 CDN 的分辨率或帧率
     */
    onCDNInfoChange?(CDNInfo: {
        resolution: RCResolution;
        fps: RCFrameRate;
    }): void;
}
/**
 * 观众直播房间类
 * 处理：
 * 1、通知观众房间内 人员变更、资源变更
 * 2、观众订阅、取消订阅资源
 */
declare class RCAudienceLivingRoom {
    private readonly _context;
    private readonly _runtime;
    private readonly _initOptions;
    private readonly _roomId;
    private readonly _joinResData;
    readonly livingType: RCLivingType;
    private _useMutilPeerC?;
    protected readonly _clientSessionId: string;
    private readonly _service;
    /**
     * 主播列表
     */
    private _roomAnchorList;
    /**
     * 合流、分流资源
     */
    private _roomRes;
    /**
     * 主播分流资源
     */
    private _roomAnchorRes;
    /**
     * 合流、分流 remoteTracks
     */
    private _remoteTracks;
    private _appListener;
    private _pc;
    private _subscribedList;
    private _sessionId;
    private _destroyed;
    /**
     * 北极星上报实例
     */
    protected _polarisReport: PolarisReporter | null;
    /**
     * 音量上报实例
     */
    private _audioLevelReport;
    /**
     * cdn_uris 资源
     */
    private _CDNUris;
    /**
     * 使用的 peerConnection 对应 id
     */
    private _pcName;
    /**
     * peerConnection 管理类
    */
    private _peerCManager;
    private _isPulling;
    private _pullTime;
    constructor(_context: RTCContext, _runtime: IRuntime, _initOptions: IRCRTCInitOptions, _roomId: string, _joinResData: {
        token: string;
        kvEntries: IServerRTCRoomEntry[];
    }, livingType: RCLivingType, _useMutilPeerC?: boolean | undefined, _clientSessionId?: string);
    private _startPull;
    /**
     * 解析服务端返回的 KV 数据，赋值 room 内数据
     */
    private _setInitData;
    protected _assertRoomDestroyed(): RCRTCCode | undefined;
    /**
     * @description 信令数据处理
     * @param roomId 数据对应的房间 Id
     * @param singalData 拉取到的数据
     * * key RC_ANCHOR_LIST value: 为主播 ID 集合
     * * key RC_RES_`userId` value: 为主播发布的资源
     * * key RC_RTC_SESSIONID value: sessionId
     * * key RC_CDN value: CDN 资源数据
     */
    private singalDataChange;
    /**
     * 计算加入离开的主播 ID 列表
     */
    private _diffAnchorList;
    private _handleNewJoinedAnchor;
    private _handleLeftedAnchor;
    /**
     * 计算新发布和取消发布的合流资源
     */
    private _diffRoomResource;
    /**
     * 计算主播发布和取消发布的资源，以及资源的状态变更
    */
    private _diffAnchorResource;
    private _onUserUnpublish;
    private _callAppListener;
    /**
     * ice 断线后，尝试重新走 exchange
    */
    private _reTryExchange;
    /**
     * 获取 subscribe 接口的请求体数据
     * @param subscribeList 订阅清单
     * @param publishedStreams 已发布流
     * @param iceRestart
     */
    protected _createSubscribeParams(subscribeList: ISubscribeAttr[], publishedStreams: {
        [msid: string]: RCLocalMediaStream;
    }, iceRestart: boolean): Promise<{
        reqBody: IBroadcastSubReqBody;
        offer: RTCSessionDescriptionInit;
        dynamicBitrate: {
            min: number;
            max: number;
        };
    }>;
    private _subscribeHandle;
    /**
     * 添加 peerConnection 事件
     */
    private _addPeerCEvent;
    private _getReqHeaders;
    private _exchangeHandle;
    private _updateSubListHandle;
    /**
     * 对比 cdn_uris 资源
     * @param newCDNUris 新的 cdn_uris 数据
     */
    private _diffCDNUris;
    /**
     * 获取 CDN 资源对应的拉流地址
     * _CDNUris 无 url 时，说明未开启 CDN 推送
     * @returns CDNPlayUrl
     */
    private _getCDNPlayUrl;
    /**
     * 获取 CDN 资源对应的拉流地址
     * @returns CDNPlayUrl
     */
    getCDNPlayUrl(resolution?: RCResolution, fps?: RCFrameRate): Promise<{
        code: RCRTCCode;
        CDNPlayUrl?: string;
    }>;
    /**
     * 订阅资源
     * @param tracks
     */
    subscribe(tracks: (RCRemoteTrack | ISubscribeAttr)[]): Promise<{
        code: RCRTCCode;
        failedList?: ISubscribeAttr[];
    }>;
    addSubscribeTask(tracks: (RCRemoteTrack | ISubscribeAttr)[]): Promise<{
        code: RCRTCCode;
        failedList?: ISubscribeAttr[];
    }>;
    private __unsubscribe;
    /**
     * 取消订阅资源
     * @param tracks
     */
    unsubscribe(tracks: RCRemoteTrack[]): Promise<{
        code: RCRTCCode;
        failedList?: ISubscribeAttr[];
    }>;
    addUnsubscribeTask(tracks: RCRemoteTrack[]): Promise<{
        code: RCRTCCode;
        failedList?: ISubscribeAttr[];
    }>;
    /**
     * 退出房间并销毁当前房间实例，退出后该房间的所有方法将不可用
     */
    __destroy(quitRoom: boolean): Promise<void>;
    /**
     * 根据 trackId 获取房间内的远端资源
     * @param trackId
     */
    getRemoteTrack(trackId: string): RCRemoteTrack;
    /**
     * 获取 _pc 实例
     */
    __getPC(): RCRTCPeerConnection[];
    /**
     * TODO 待优化
     * @param trackId
     */
    getLocalTrack(trackId: string): RCRemoteTrack;
    /**
     * 断线重连后处理逻辑, SDK 内部处理调用
     */
    __onReconnected(): Promise<void>;
    /**
     * 观众房间事件注册
     * @param tag 参数描述
     */
    registerRoomEventListener(listener: IAudienceRoomEventListener | null): void;
    /**
     * 音量上报
     * @param handler 业务端传入的音量上报事件
     * @param gap 上报时间间隔
     */
    onAudioLevelChange(handler: IAudioLevelChangeHandler | null, gap?: number): void;
    private _reportListener;
    /**
     * 注册房间数据监控
     * @param listener
     */
    registerReportListener(listener: IRCRTCReportListener | null): void;
    /**
     * 获取房间 Id
     */
    getRoomId(): string;
    /**
     * 获取当前 userId
     */
    getCrtUserId(): string;
    /**
     * 获取房间当前会话 Id，当房间内已无成员时房间会回收，重新加入时 sessionId 将更新
     */
    getSessionId(): string;
    /**
     * 获取远程主播用户列表
     */
    getRemoteUserIds(): string[];
    /**
     * 获取远端用户的资源列表
     * @param userId
     * @returns
     */
    getRemoteTracksByUserId(userId: string): RCRemoteTrack[];
    /**
     * 获取房间内所有已发布的远端资源列表, 包含合流资源
     * @returns
     */
    getRemoteTracks(): RCRemoteTrack[];
    /**
     * 获取远端 RTC tracks
     */
    getRemoteRTCTracks(): RCRemoteTrack[];
    /**
     * 获取远端 MCU tracks
     */
    getRemoteMCUTracks(): RCRemoteTrack[];
    /**
     * 获取房间内 CDN 信息
     */
    getCDNInfo(): {
        resolution: RCResolution;
        fps: RCFrameRate;
        CDNEnable: boolean | undefined;
    } | {
        CDNEnable: boolean;
        resolution?: undefined;
        fps?: undefined;
    };
    getClientSessionId(): string;
}

/**
 * 北极星上报角色
 */
declare enum PolarisRole {
    /**
     * 会议参会者、主播
     */
    MeetingOrAnchor = 1,
    /**
     * 观众
     */
    Audience = 2
}

declare class PolarisReporter {
    private readonly _context;
    private readonly _runtime;
    private readonly _roomId;
    private readonly _crtRTCRoom;
    private readonly _userRole;
    constructor(_context: RTCContext, _runtime: IRuntime, _roomId: string, _crtRTCRoom: RCAbstractRoom | RCAudienceLivingRoom, _userRole?: PolarisRole);
    private _send;
    private _getClientID;
    /**
     * 小流需去掉 _tiny，小流 resourceId 为 userId_tag_mediaType_tiny
     */
    private _getRealResourceId;
    /**
     * 生成北极星上报的 trackId
     * @param resourceId userId_11_1_tiny 改为 userId_11_tiny_video
     */
    private _getPolarisTrackId;
    sendR3R4Data(data: IInnerRCRTCStateReport): Promise<boolean>;
    /**
     * 加入房间
     */
    sendR1(): void;
    /**
     * RTC 和 LIVE 发布、取消发布
     * RTC 订阅、取消订阅
     */
    sendR2(action: string, status: string, trackIds: string[]): void;
}

/**
 * PC 实例管理类
 */
declare class RCRTCPeerConnection extends EventEmitter {
    /**
     * peerConnection 对应名称
    */
    private readonly _pcName;
    /**
     * _reTryExchange 方法
     */
    private readonly _reTryExchange;
    /**
     * 当前用户 id
     */
    private readonly _currentUserId;
    /**
     * 北极星上传实例
     */
    private readonly _polarisReport?;
    static __INNER_EVENT_TRACK_READY__: string;
    private readonly _rtcPeerConn;
    private readonly _sdpStrategy;
    reportParser: IStatParser | null;
    private pubLocalTracks;
    private _reTryExchangeTimer;
    private _reportStatsTimer;
    private _reportR3R4ToPolarisTimer;
    private _isDestroyed;
    constructor(
    /**
     * peerConnection 对应名称
    */
    _pcName: string, 
    /**
     * _reTryExchange 方法
     */
    _reTryExchange: Function, 
    /**
     * 当前用户 id
     */
    _currentUserId: string, 
    /**
     * 北极星上传实例
     */
    _polarisReport?: PolarisReporter | undefined);
    getName(): string;
    getLocalTracks(): RCLocalTrack[];
    private _onConnectionStateChange;
    private _onICEConnectionStateChange;
    private _onTrackReady;
    /**
     * 它设置对等连接的比特率。
     * @deprecated use RCLocalTrack.setBitrate instead of setBitrate
     */
    setBitrate(max: number, min: number, start?: number): Promise<void>;
    createOffer(iceRestart: boolean): Promise<IOfferInfo>;
    setRemoteAnswer(answer: string): Promise<RCRTCCode>;
    getLocalTrack(trackId: string): RCLocalTrack | null;
    addLocalTrack(track: RCLocalTrack): void;
    removeLocalTrackById(trackId: string): void;
    removeAllLocalTrack(): void;
    removeLocalTrack(track: RCLocalTrack): void;
    private _updateRecvTransceiverMap;
    updateSubRemoteTracks(remoteTracks: RCRemoteTrack[]): void;
    /**
     * 获取当前已发布视频流信息
     */
    getOutboundVideoInfo(): OutboundVideoInfo[];
    private _onLocalTrackMuted;
    private _onLocalTrackDestroied;
    private _reportListener;
    /**
     * 注册连接数据监控，开启质量数据上报定时器
     * @param listener
     */
    registerReportListener(listener: IRCRTCReportListener | null): void;
    private _createRCRTCStateReport;
    /**
     * 获取 peerConnection stats 数据并格式化
     * @returns 返回格式化后的数据
     */
    private _getStatsData;
    getAudioLevelReportData(): Promise<{
        trackId: string;
        audioLevel: number | null;
    }[] | undefined>;
    /**
     * 通知用户质量数据、peerConnection 北极星数据上报
     * @todo
     */
    private _reportHandle;
    /**
     * 北极星上报 R3、R4 数据
     */
    private _sendR3R4Data;
    /**
     * 2s 给北极星上报一次 R3、R4
     */
    __reportR3R4ToPolaris(): Promise<void>;
    getRTCPeerConn(): RTCPeerConnection;
    destroy(): void;
    clearReTryExchangeTimer(): void;
    isDestroyed(): boolean;
}

interface IRCTrackBitrate {
    /**
     * 最大码率
     */
    max: number;
    /**
     * 最小码率
     */
    min: number;
    /**
     * 上行起始码率
     */
    start?: number;
}
/**
 * MediaServer 返回的媒体资源数据
 */
interface IResource {
    /**
     * 媒体类型
     */
    mediaType: RCMediaType.AUDIO_ONLY | RCMediaType.VIDEO_ONLY;
    /**
     * MediaStream Id，基本为 `userId` 与 `tag` 以 `_` 拼接而来。该值无法直接作为资源的唯一性标识属性，
     * 需与 mediaType 拼接使用
     */
    msid: string;
    /**
     * MediaServer 返回的资源地址
     * @example 举例如下：
     * `{"clusterId":"rtc-data-bdcbj.ronghub.com:80","serverId":"172.28.76.215:40080","resourceId":"13111111111_5vls_web_RongCloudRTC_1","connectionId":"AAYxMDAzNjgAFDEzMTExMTExMTExXzV2bHNfd2ViAAMzMzMA","ssrc":1716229921,"serviceProvider":"bdc","userTimestamp":1604994044706}`
     */
    uri: string;
    /**
     * 资源特征，simulcast 代表这道流支持大小流
     * @description 此参数存疑，MediaServer 似乎并未下发此字段，Web 端暂不启用
     * @deprecated
     */
    features?: ['simulcast'] | [];
}
/**
 * 向房间内发布的媒体数据
 */
interface IPublishedResource extends IResource {
    /**
     * 资源禁用/启用标识，用于向 signal 同步本端资源状态，1 为启用，0 为禁用
     */
    state: 0 | 1;
    /**
     * 资源标识，同标识的资源将视作同道流，标识不可重复
     */
    tag: string;
}
interface ISubscribeAttr {
    /**
     * 要订阅的音视轨数据 Id
     */
    track: RCRemoteTrack;
    /**
     * 订阅小流，默认为 `false`
     */
    subTiny?: boolean;
}
/**
 * 视频配置
 */
interface IVideoProfile {
    /**
     * 视频帧率
     */
    frameRate: RCFrameRate;
    /**
     * 视频分辨率
     */
    resolution: RCResolution;
}
/**
 * 屏幕共享流配置
 */
interface IScreenVideoProfile extends IVideoProfile {
    /**
     * Electron 平台下通过 `desktopCapturer.getSources` 获取到的 sourceId，
     * 不传 chromeMediaSourceId 时默认共享桌面，传入时共享指定窗口。
     * @see `https://www.electronjs.org/docs/api/desktop-capturer`
     */
    chromeMediaSourceId?: string;
}
/**
 * 待发布资源数据
 */
interface IPublishAttrs {
    /**
     * 待发布的轨道数据
     */
    track: RCLocalTrack;
    /**
     * 是否同时发布小流
     */
    pubTiny?: boolean | IVideoProfile;
}
/**
 * peerConnection 抛出给用户的 track 字段
 */
interface IRCTrackStat {
    /**
     * stat id
    */
    id?: string;
    /**
     * 资源 Id
     */
    trackId: string;
    /**
     * 资源类型
     */
    kind: 'audio' | 'video';
    /**
     * 丢包率，有效值 `0` - `1`
     */
    packetsLostRate: number | null;
    /**
     * 是否是远端资源
     */
    remoteResource: boolean;
    /**
     * 音量
     */
    audioLevel?: number | null;
    /**
     * 视频高度
     */
    frameHeight?: number | null;
    /**
     * 视频宽度
     */
    frameWidth?: number | null;
    /**
     * 视频帧率
     */
    frameRate?: number | null;
    /**
     * 码率
     */
    bitrate: number;
    /**
     * 网络抖动，单位 ms
     * @description 下行数据中，同道流中只有一个 track 会有值，另一轨道数据值为 `0`
     */
    jitter: number | null;
}
/**
 * peerConnection 抛出给用户的 iceCandidatePair 字段
 */
interface IRCCandidatePairStat {
    /**
     * 本端 IP
     */
    IP: string;
    /**
     * 本地 UDP 端口
     */
    port: number;
    /**
     * 本地网络类型
     */
    networkType: string | null;
    /**
     * 远端 IP
     */
    remoteIP: string;
    /**
     * 远端 UDP 端口
     */
    remotePort: number;
    /**
     * 协议
     */
    protocol: string;
    /**
     * 发送总码率，单位 kbps
     */
    bitrateSend: number;
    /**
     * 接收总码率，单位 kbps
     */
    bitrateRecv: number;
    /**
     * （Round-Trip-Time）往返时延，单位 ms
     */
    rtt: number | null;
    /**
     * 可用上行带宽，单位 bit
     */
    availableOutgoingBitrate: number | null;
    /**
     * 可用下行带宽，在无下行资源时，其值为 `0`，单位: `bit`
     */
    availableIncomingBitrate: number | null;
}
/**
 * iceCandidatePair 所有字段
 * 含 peerConnection 抛出给用户的 iceCandidatePair 字段
 * 含 北极星上报 R3、R4 所需的 totalPacketsLost
 */
interface IInnerIcePair extends IRCCandidatePairStat {
    /**
     * 上、下行总丢包率
     */
    totalPacketsLost?: number;
}
/**
 * send track 所有字段
 * 含 peerConnection 抛出给用户的 track 字段
 * 含 北极星上报 R3 track 所需字段
 */
interface ISendTrackState extends IRCTrackStat {
    /**
     * （Round-Trip-Time）往返时延，单位 ms
     */
    rtt: number | null;
    /**
     * 编码方式
     */
    encoderImplementation: string | null;
    /**
     * PLI 请求数
     */
    pliCount: number;
    /**
     * nack 数量
     */
    nackCount: number;
    /**
     * 第一个关键帧是否正常收到
     */
    googFirsSent: number;
    /**
     * 音频采样率
     */
    samplingRate: number;
    /**
     * 接收卡顿(间隔时间, 单位: ms)
     */
    googRenderDelayMs: number;
    /**
     * 流状态(0:不可用, 1:可用)
     */
    trackState: TrackState;
}
/**
 * receive track 所有字段
 * 含 peerConnection 抛出给用户的 track 字段
 * 含 北极星上报 R4 track 所需字段
 */
interface IRecvTrackState extends IRCTrackStat {
    /**
     * 解码方式
     */
    codecImplementationName: string | null;
    samplingRate: number;
    nackCount: number;
    pliCount: number;
    rtt: number | null;
    googFirsReceived: number;
    googRenderDelayMs: number;
    trackState: TrackState;
}
/**
 * peerConnection stats 解析出来业务所需的所有字段
 */
interface IInnerRCRTCStateReport {
    timestamp: number;
    iceCandidatePair?: IInnerIcePair;
    senders: ISendTrackState[];
    receivers: IRecvTrackState[];
}
/**
 * /**
 * peerConnection stats 抛给用户的字段
 */
interface IRCRTCStateReport {
    pcName?: string;
    /**
     * 报告生成时间戳
     */
    timestamp: number;
    /**
     * 对等连接状态数据
     */
    iceCandidatePair?: IRCCandidatePairStat;
    /**
     * 上行状态数据
     */
    senders: IRCTrackStat[];
    /**
     * 下行状态数据
     */
    receivers: IRCTrackStat[];
}
interface IRCRTCReportListener {
    /**
     * RTCPeerConnection 的详细状态数据
     * @param report
     */
    onStateReport?(report: IRCRTCStateReport): void;
    /**
     * ICE 连接状态变更通知
     * @since version 5.1.5
     */
    onICEConnectionStateChange?(state: RTCIceConnectionState, pcName?: string): void;
    /**
     * @deprecated
     */
    onConnectionStateChange?(state: RTCPeerConnectionState, pcName?: string): void;
}
interface IRCRTCTrackEventListener {
    /**
     * 订阅的音视频流通道已建立, track 已可以进行播放
     * @param track RCRemoteTrack 类实例
     */
    onTrackReady?(track: RCRemoteTrack): void;
}
interface IRoomEventListener extends IRCRTCTrackEventListener {
    /**
     * 当 RTCPeerConnection 连接被异常关闭时触发，此时需业务层重新加入房间并重新发布、订阅资源。
     * 引起连接异常中断的原因包括但不限于：电脑休眠、浏览器页面长期后台运行等
     * @since 5.1.5
     */
    onRTCPeerConnectionCloseByException?(): void;
    /**
     * 当本端被剔出房间时触发
     * @description 被踢出房间可能是由于服务端超出一定时间未能收到 rtcPing 消息，所以认为己方离线。
     * 另一种可能是己方 rtcPing 失败次数超出上限
     * @param byServer 当值为 `false` 时，说明本端 rtcPing 超时；当值为 `true` 时，说明本端收到被踢出房间通知
     */
    onKickOff?(byServer: boolean, state?: RCKickReason, kickExtra?: any): void;
    /**
     * 接收到房间信令时回调，用户可通过房间实例的 sendMessage 接口发送信令
     * @param name 信令名
     * @param content 信令内容
     * @param senderUserId 发送者 Id
     * @param messageUId 消息唯一标识
     */
    onMessageReceive?(name: string, content: any, senderUserId: string, messageUId: string): void;
    /**
     * 房间属性变更回调
     * @param name
     * @param content
     */
    onRoomAttributeChange?(name: string, content?: string): void;
    /**
     * 房间用户禁用/启用音频
     * @param audioTrack RCRemoteAudioTrack 类实例
     */
    onAudioMuteChange?(audioTrack: RCRemoteAudioTrack): void;
    /**
     * 房间用户禁用/启用视频
     * @param videoTrack RCRemoteVideoTrack 类实例对象
     */
    onVideoMuteChange?(videoTrack: RCRemoteVideoTrack): void;
    /**
     * 房间内用户发布资源
     * @param tracks 新发布的音轨与视轨数据列表，包含新发布的 RCRemoteAudioTrack 与 RCRemoteVideoTrack 实例
     */
    onTrackPublish?(tracks: RCRemoteTrack[]): void;
    /**
     * 房间用户取消发布资源
     * @param tracks 被取消发布的音轨与视轨数据列表
     * @description 当资源被取消发布时，SDK 内部会取消对相关资源的订阅，业务层仅需处理 UI 业务
     */
    onTrackUnpublish?(tracks: RCRemoteTrack[]): void;
    /**
     * 人员加入
     * @param userIds 加入的人员 id 列表
     */
    onUserJoin?(userIds: string[]): void;
    /**
     * 人员退出
     * @param userIds
     */
    onUserLeave?(userIds: string[]): void;
    /**
     * 主播开启、停止推 CDN 状态通知
     */
    onCDNEnableChange?(enable: boolean): void;
    /**
     * RTC 每次 Ping 的结果
     * @since version: 5.1.5
     */
    onPing?(result: RCRTCPingResult): void;
    /**
     * 主播和观众切换身份通知
     */
    onSwitchRole?(userId: string, role: RCRTCLiveRole): void;
    /**
     * 房间任务完成时调用的函数。
     * @param code 任务完成后的状态
     * @param subscribe 订阅成功的列表
     * @param unsubscribe 取消订阅成功的列表
     * @param failedList 订阅失败的列表
     */
    onTaskCompleted?(code: RCRTCCode, subscribe: ISubscribeAttr[], unsubscribe: ISubscribeAttr[], failedList: ISubscribeAttr[]): void;
}
/**
 * RTCClient 初始化配置
 * @public
 */
interface IRCRTCInitOptions {
    /**
     * 自定义 MediaServer Url，公有云用户无需关注
     * @description
     * 1. 仅当 `location.hostname` 为 `localhost` 时，`http` 协议地址有效，否则必须使用 `https` 协议地址
     * 2. 当该值有效时，将不再从 IMLib 导航数据中获取 mediaServer 地址
     */
    mediaServer?: string;
    /**
     * 输出日志等级，生产环境默认使用 WARN，开发环境默认为 DEBUG
     * @description
     * * 0 - DEBUG
     * * 1 - INFO
     * * 2 - WARN
     * * 3 - ERROR
     */
    logLevel?: LogLevel;
    /**
     * 修改默认的 log 输出函数
     */
    logStdout?: (logLevel: LogLevel, content: string) => void;
    /**
     * 与 MediaServer 的 http 请求超时时间，单位为毫秒，默认值为 `5000`，有效值 `5000-30000`。
     * 优先级：用户配置 > 导航配置 > 默认时间。
     */
    timeout?: number;
    /**
     * 房间 Ping 间隔时长，默认 `10000` ms，有效值 `3000`-`10000`
     */
    pingGap?: number;
    /**
     * 优化使用的 SDP 协议版本，仅当运行时浏览器支持相应 SDP 协议版本时生效
     */
    sdpSemantics?: ISdpSemantics;
    /**
     * 观众拉内置 CDN 资源的直播拉流协议，默认为 RCInnerCDNPullKind.FLV
     */
    pullInnerCDNProtocol?: RCInnerCDNPullKind;
    /**
     * 观众拉内置 CDN 资源时是否使用 https，默认为 RCInnerCDNPullIsHttps.HTTPS
     */
    pullInnerCDNUseHttps?: RCInnerCDNPullIsHttps;
    /**
     * 音频降噪处理
     * - workletModule 默认值为 https://cdn.ronghub.com/plugin-rtc/wasm/5.0.0-alpha.1/process-worklet.js
     * - workletWasm 默认值为 https://cdn.ronghub.com/plugin-rtc/wasm/5.0.0-alpha.1/AudioProcessing.wasm
     * - isOpen 默认值为 false
     */
    audio?: {
        workletModule?: string;
        workletWasm?: string;
        isOpen?: boolean;
    };
}
interface ICameraVideoProfile extends IVideoProfile {
    cameraId?: string;
    faceMode?: 'user' | 'environment';
}
interface IMicphoneAudioProfile {
    micphoneId?: string;
    sampleRate?: number;
}
interface ICreateLocalTrackOptions {
    /**
     * 剔除音轨
     */
    withoutAudio?: boolean;
    /**
     * 剔除视轨
     */
    withoutVideo?: boolean;
}
/**
 * 音量上报事件接口
 */
interface IAudioLevelChangeHandler {
    (audioLevelReportList: {
        track: RCLocalAudioTrack | RCRemoteAudioTrack;
        audioLevel: number;
    }[]): void;
}
/**
 * 房间资源数据
 */
declare type RoomData = {
    [userId: string]: IPublishedResource[];
};
/**
 * IMutilPeerC 中的 track 类型
 */
declare type TrackParam = RCLocalTrack | IPublishAttrs | RCRemoteTrack | ISubscribeAttr;
/**
 * RCRTCPeerCManager 创建的一条 pcItem 上的数据类型
 */
interface IMutilPeerC {
    /**
     * pcName，/exchange 请求中 request header 中的 Peer-Connection-Id 值
     */
    pcName: string;
    /**
     * RCRTCPeerConnection 对象
     */
    pc: RCRTCPeerConnection;
    /**
     * 存放 peerConnection 上本次要发布、取消发布、订阅、取消订阅的 track
     */
    tracks: TrackParam[];
}
interface IPKInfo {
    [roomId: string]: {
        inviteSessionId: string;
        inviterRoomId: string;
        inviterUserId: string;
        inviterUserAutoMix?: boolean;
        inviteeRoomId: string;
        inviteeUserAutoMix?: boolean;
    };
}
/**
 * 业务层发起连麦、响应连麦可选参数定义
 */
interface IReqResPKOptions {
    autoMix?: boolean;
    extra?: string;
}
interface IPKInviterBaseInfo {
    /**
     * 邀请者房间 ID
     */
    inviterRoomId: string;
    /**
     * 邀请者用户 ID
     */
    inviterUserId: string;
}
interface IPKInviteeBaseInfo {
    /**
     * 被邀请者房间 ID
     */
    inviteeRoomId: string;
    /**
     * 被邀请者用户 ID
     */
    inviteeUserId: string;
}
/**
 * 业务层监听收到连麦邀请、取消连麦的字段
 */
interface IPKInviteInfo extends IPKInviterBaseInfo {
    /**
     * 邀请额外信息
     */
    extra?: string;
}
/**
 * 业务层监听收到连麦应答的字段
 */
interface IPKInviteAnswerInfo extends IPKInviterBaseInfo, IPKInviteeBaseInfo {
    /**
     * 是否同意邀请
     */
    agree: boolean;
    /**
     * 响应额外信息
     */
    extra?: string;
}
/**
 * 业务层监听收到连麦结束的字段
 */
interface IPKEndInfo {
    /**
     * 发起结束的房间 ID
     */
    endRoomId: string;
    /**
     * 发起结束的用户 ID
     */
    endUserId: string;
}
/**
 * 观众加房间返回给客户的 CDN 信息
 */
interface IJoinResCDNInfo {
    resolution?: RCResolution;
    fps?: RCFrameRate;
    CDNEnable?: boolean;
}
interface IPubSuccessRes {
    code: RCRTCCode;
    liveUrl?: string;
    failedTracks?: {
        code: RCRTCCode;
        tracks: RCLocalTrack[];
    }[];
}
interface IChrmKVPullData {
    kvEntries: IServerRTCRoomEntry[];
    isFullUpdate?: boolean;
    syncTime?: number;
}

/**
 * 自定义合流布局时，背景图片填充方式
 */
declare enum BackgroundPictureFillMode {
    /**
     * 裁剪（默认）
     */
    CROP = 1,
    /**
     * 不裁剪
     */
    WHOLE = 2
}

declare class RCMCUConfigBuilder {
    private _invoker;
    /**
     * flush 提交回调
     */
    /**
     * trackId 有效性验证方法
     */
    private readonly _isValidTrackId;
    /**
     * mcu 配置数据，每次向服务器提交全量数据
     */
    private _values;
    constructor(_invoker: Invoker, 
    /**
     * flush 提交回调
     */
    /**
     * trackId 有效性验证方法
     */
    _isValidTrackId: (trackId: string) => boolean);
    /**
     * 设置合流后的主位置显示的视频流
     * @param videoTrackId 视频流资源 Id
     */
    setHostVideoTrack(videoTrackId: string): RCMCUConfigBuilder;
    /**
     * 设置合流布局模式，当使用 `MixLayoutMode.CUSTOMIZE` 模式时，需自定义合流结构
     * @param mode
     * * `MixLayoutMode.CUSTOMIZE`: 自定义布局，需用户设置布局结构
     * * `MixLayoutMode.SUSPENSION`: 悬浮布局（默认）
     * * `MixLayoutMode.ADAPTATION`: 自适应布局
     */
    setMixLayoutMode(mode: MixLayoutMode): RCMCUConfigBuilder;
    private _addOutputValue;
    /**
     * 设置合流输出视频流的分辨率
     * @param resulution 有效值为 `RCResolution` 定义的枚举值
     */
    setOutputVideoResolution(resolution: RCResolution): RCMCUConfigBuilder;
    /**
     * 设置合流输出视频流的帧率
     * @param fps 其有效值为 `RCFrameRate` 中定义的枚举值
     */
    setOutputVideoFPS(fps: RCFrameRate): RCMCUConfigBuilder;
    /**
     * 设置合流输出视频流的码率（不推荐主动修改）
     * @param bitrate
     */
    setOutputVideoBitrate(bitrate: number): RCMCUConfigBuilder;
    /**
     * 设置合流后输出视频流小流的分辨率
     * @param resulution 有效值为 `RCResolution` 定义的枚举值
     */
    setOutputTinyVideoResolution(resolution: RCResolution): RCMCUConfigBuilder;
    /**
     * 设置合流输出视频流小流的帧率
     * @param fps 其有效值为 `RCFrameRate` 中定义的枚举值
     */
    setOutputTinyVideoFPS(fps: RCFrameRate): RCMCUConfigBuilder;
    /**
     * 设置合流输出视频流小流的码率（不推荐主动修改）
     * @param bitrate
     */
    setOutputTinyVideoBitrate(bitrate: number): RCMCUConfigBuilder;
    /**
     * 设置合流后的视频流渲染方式
     * @param renderMode
     */
    setOutputVideoRenderMode(renderMode: MixVideoRenderMode): RCMCUConfigBuilder;
    /**
     * 设置合流后音频流的编码参数（不推荐主动修改）
     * @param bitrate 音频码率
     */
    setOutputAudioBitrate(bitrate: number): RCMCUConfigBuilder;
    /**
     * 设置合流后的视频流的背景色，默认为 `0x000000`
     * @param color 颜色参数，为 16 进制标识法，如 '0x000000'
     */
    setOutputBackgroundColor(color: string): RCMCUConfigBuilder;
    /**
     * 向合流后的视频流中增加背景图片
     * @param uri 图片资源的完整下载地址
     * @param x 相对于整体画布的起始位置 x 坐标（百分比），有效值 `0.0` - `1.0`
     * @param y 相对于整体画布的起始位置 y 坐标（百分比），有效值 `0.0` - `1.0`
     * @param w 相对于整体画布的宽（百分比），有效值 `0.0` - `1.0`
     * @param h 相对于整体画布的高（百分比），有效值 `0.0` - `1.0`
     */
    addOutputBackgroundPicture(uri: string, x: number, y: number, w: number, h: number): RCMCUConfigBuilder;
    /**
     * 移除对合流后的视频流中添加的指定背景图片
     * @param uri
     */
    removeOutputBackgroundPicture(uri: string): RCMCUConfigBuilder;
    /**
     * 清理对合流后的视频流中添加的所有背景图片
     */
    clearOutputBackgroundPicture(): RCMCUConfigBuilder;
    /**
     * 设置合流后的视频流中添加的背景图片的填充方式：
     * 1. 按比例裁剪
     * 2. 不裁剪，按比例压缩
     * @param fillMode
     */
    setOutputBackgroundPictureFillMode(fillMode: BackgroundPictureFillMode): RCMCUConfigBuilder;
    /**
     * 设置直播 CDN 旁路推流地址，最多支持 5 个推流地址
     * @param urls 地址列表
     */
    addPublishStreamUrls(urls: string[]): RCMCUConfigBuilder;
    /**
     * 移除直播 CDN 旁路推流地址
     * @param urls
     */
    removePublishStreamUrls(urls: string[]): RCMCUConfigBuilder;
    /**
     * 清理已添加的 CDN 旁路推流地址
     */
    clearPublishStreamUrls(): RCMCUConfigBuilder;
    /**
     * 在自定义布局中增加视频流配置
     * @param trackId 资源 Id
     * @param x 在画布中的坐标 x
     * @param y 在画布中的坐标 y
     * @param width 分辨率宽度
     * @param height 分辨率高度
     */
    addCustomizeLayoutVideo(trackId: string, x: number, y: number, width: number, height: number): RCMCUConfigBuilder;
    /**
     * 移除自定义布局中的视频流配置
     * @param trackId
     */
    removeCustomizeLayoutVideo(trackId: string): RCMCUConfigBuilder;
    /**
     * 清除已添加的自定义布局中的视频流配置
     */
    clearCustomizeLayoutVideo(): RCMCUConfigBuilder;
    /**
     * 覆盖设置合流媒体中的音频流
     * @param trackIds 音频流 trackId 数组，当数组长度为 0 时，则合流媒体中将无音频输出
     * @returns
     */
    setCustomizeInputAudio(trackIds: string[]): RCMCUConfigBuilder;
    /**
     * 向既有的音频流合流配置中增加一道音频流
     * @param trackId 音频 trackId
     * @since v5.3.7
     */
    addCustomizeInputAudio(trackId: string): RCMCUConfigBuilder;
    /**
     * 从既有的音频流合流配置中删除一道音频流
     * @param trackId 音频对应的 trackId
     * @since v5.3.7
     */
    removeCustomizeInputAudio(trackId: string): RCMCUConfigBuilder;
    /**
     * 清除音频流合流配置，恢复房间内的全音频流合流输出
     * @since v5.3.7
     */
    clearCustomizeInputAudio(): RCMCUConfigBuilder;
    /**
     * 给单道流添加水印
     */
    addPictureWaterMark(trackId: string, uri: string, x: number, y: number, w: number, h: number): RCMCUConfigBuilder;
    /**
     * 删除所有水印
     */
    clearPictureWaterMark(): RCMCUConfigBuilder;
    /**
   * 移除对合流后的某个视频流中添加的指定水印图片
   * @param uri
   */
    removePictureWaterMark(trackId: string, uri: string): RCMCUConfigBuilder;
    /**
     * 设置 MCU 混流配置
     * @param videoList 视频输入混流列表，为 null 代表视频全混流，为空集合代表视频全不混流，否则按照输入列表进行混流
     * @param audioList 音频输入混流列表，为 null 代表音频全混流，为空集合代表音频全不混流，否则按照输入列表进行混流
     */
    /**
     * 设置 MCU 混流配置
     * @param roomIds 混流房间列表
     * @param mediaType 混流媒体类型
     * @param isAppend 是否为增量混流
     * * true 为增量混流
     * * false 为全量覆盖混流
     */
    /**
     * 重置所有合流配置
     * @since v5.3.7
     * @returns
     */
    reset(): RCMCUConfigBuilder;
    /**
     * 使已修改的配置生效，在调用该方法前，所有数据只会对本地配置进行修改，不会产生实际效果
     * @param reset 调用完成后清空当前配置记录，默认为 `true`（v5.3.7 版本开始启用）
     * @returns
     */
    flush(reset?: boolean): Promise<{
        code: RCRTCCode;
    }>;
    __innerGetValues(): IMCUConfig;
}

/**
 * 直播房间
 */
declare class RCLivingRoom extends RCAbstractRoom {
    private _livingType;
    readonly _mcuConfigBuilder: RCMCUConfigBuilder;
    /**
     * 跨房间连麦管理器
     */
    private _roomPKHandler;
    constructor(context: RTCContext, runtime: IRuntime, roomId: string, service: RCMediaService, initOptions: IRCRTCInitOptions, _livingType: RCLivingType, isUpgrade?: boolean, isMainRoom?: boolean, 
    /**
     * 是否使用多 peerConnection
     */
    useMutilPeerC?: boolean, _clientSessionId?: string);
    private _initAfterCatchRoomData;
    /**
     * @override
     */
    __innerInit(mode: RTCMode, joinType?: RTCJoinType, livingType?: RCLivingType, innerUserDatas?: IRTCUserData, outerUserDatas?: IRTCUserData): Promise<{
        code: RCRTCCode | ErrorCode;
        data?: IJoinRTCRoomData;
    }>;
    __innerInitByIdentityChange(): Promise<ErrorCode>;
    /**
     * 增量发布资源，若发布的资源 tag 及媒体类型重复，后者将覆盖前者进行发布。
     * @param tracks 待发布的 RCLocalTrack 实例
     * @returns
     */
    publish(tracks: (RCLocalTrack | IPublishAttrs)[]): Promise<IPubSuccessRes>;
    unpublish(tracks: RCLocalTrack[]): Promise<IPubSuccessRes>;
    /**
     * resourceId 有效性验证
     * @param resourceId
     */
    protected _isValidResourceId(resourceId: string): boolean;
    getLivingType(): RCLivingType;
    /**
     * 获取 MCU 配置构建对象
     */
    getMCUConfigBuilder(): RCMCUConfigBuilder | {
        code: RCRTCCode;
    };
    /**
     * 开启/停用推 CDN
     */
    enableInnerCDN(enable: boolean): Promise<{
        code: RCRTCCode;
    }>;
    /**
     * 资源变化时触发
     * 直播房间需单独处理 cdn_uris
     */
    protected _resourceHandle(content: ResourceMsgContent & {
        cdn_uris?: ICDNUris[];
    }, messageType: RCRTCMessageType.PUBLISH | RCRTCMessageType.UNPUBLISH | RCRTCMessageType.MODIFY | RCRTCMessageType.TOTAL_CONTENT_RESOURCE, userId: string): Promise<void>;
    /**
     * 观众切换为主播后直接处理人员变更及资源变更
     */
    protected _afterChangedRole(data: IJoinRTCRoomData): void;
    /**
     * 返回 CDN 是否可用
     * @returns boolean
     */
    __getCDNEnable(): boolean;
    /**
     * 返回 CDN 推送模式: 自动 or 手动
     */
    __getCDNPushMode(): RCInnerCDNPushMode | undefined;
    /**
     * @override
     * 加入 PK 房间回调
     */
    private _onJoinedPKRoom;
    /**
     * @override
     */
    protected _getPushOtherRoomsParams(): IPushOtherRooms[];
    /**
     * 获取 PK 业务处理器
     * @since version 5.3.0
     */
    getRoomPKHandler(): {
        code: RCRTCCode;
        roomPKHandler?: RCLivingPKHandler;
    };
    /**
     * 退出所有连麦房间
     */
    protected _quitAllPKRoom(): Promise<void>;
    /**
     * 是否是主房间
     */
    isMainRoom(): boolean | undefined;
}

/**
 * 普通音视频房间
 */
declare class RCRTCRoom extends RCAbstractRoom {
    constructor(context: RTCContext, runtime: IRuntime, roomId: string, service: RCMediaService, initOptions: IRCRTCInitOptions, isUpgrade?: boolean, isMainRoom?: boolean, 
    /**
     * 是否使用多 peerConnection
     */
    useMutilPeerC?: boolean, _clientSessionId?: string, roomType?: RTCMode);
}

/**
 * 直播观众客户端
 */
declare class RCAudienceClient {
    private readonly _context;
    /**
     * 是否使用多 peerConnection
     */
    private readonly _useMutilPeerC?;
    private _pc;
    private _service;
    /**
     * RTCToken
     */
    private _rtcToken;
    /**
     * 已订阅的资源信息
     */
    private _liveUrl;
    /**
     * 已订阅的远端流
     */
    private readonly _subTracks;
    /**
     * 客户端传入的数据上报事件
     */
    private _reportListener;
    /**
     * 使用的 peerConnection 对应 id
     */
    private _pcName;
    /**
     * peerConnection 管理类
     */
    private _peerCManager;
    private readonly _clientSessionId;
    constructor(_context: RTCContext, runtime: IRuntime, _initOption: IRCRTCInitOptions, 
    /**
     * 是否使用多 peerConnection
     */
    _useMutilPeerC?: boolean | undefined);
    private _getReqHeaders;
    private _clearSubscribeInfo;
    private _livingType;
    private _mediaType;
    private _subTiny;
    private _fromRetry;
    private _reTryExchange;
    /**
     * 直播观众订阅主播资源，直播观众端无需加入房间
     * @param liveUrl 直播资源地址
     * @param livingType 直播类型，有效值为音频、音视频
     * @param mediaType 订阅资源类型，其有效值为 `RCMediaType` 的枚举值
     * @param subTiny 当值为 `true` 时将订阅小流，否则订阅大流。默认值为 `false`
     */
    subscribe(liveUrl: string, livingType: RCLivingType, mediaType: RCMediaType, subTiny?: boolean): Promise<{
        code: RCRTCCode;
        tracks: RCRemoteTrack[];
    }>;
    private __subscribe;
    /**
     * 取消订阅主播资源
     * @param liveUrl
     */
    unsubscribe(): Promise<{
        code: RCRTCCode;
    }>;
    private __unsubscribe;
    /**
     * 注册房间数据监控
     * @param listener
     * @description 该方法暂仅支持 Chrome 浏览器
     */
    registerReportListener(listener: IRCRTCReportListener | null): void;
    private _appListener;
    /**
     * 注册流事件监听，多次注册会导致后者覆盖前者，可以通过使用 `registerTrackEventListener(null)` 取消注册
     * @param listener
     */
    registerTrackEventListener(listener: IRCRTCTrackEventListener | null): void;
    private _onTrackReady;
}

declare class RCMediaStreamCapture {
    protected readonly _context: RTCContext;
    constructor(_context: RTCContext);
    private _isElectron;
    private _getMediaStream;
    /**
     * 如果用户设置了音频约束为true，那么我们将音频约束设置为一个空对象，
     * 然后我们将检查浏览器是否支持noiseSuppression、autoGainControl和echoCancellation约束，
     * 如果支持，那么我们将设置音频约束为真
     * @param {any} constraints - 约束参数与 getUserMedia 方法中的约束参数相同。
     * @returns 返回值是约束对象。
     */
    private setConstraintsConfig;
    /**
     * 从麦克风中捕获音轨数据
     * @param tag
     * @param options
     * @returns
     */
    createMicrophoneAudioTrack(tag?: string, options?: IMicphoneAudioProfile): Promise<{
        code: RCRTCCode;
        track?: RCMicphoneAudioTrack;
    }>;
    /**
     * 由摄像头捕获视轨数据
     * @param tag
     * @param options
     * @returns
     */
    createCameraVideoTrack(tag?: string, options?: ICameraVideoProfile): Promise<{
        code: RCRTCCode;
        track?: RCCameraVideoTrack;
    }>;
    /**
     * 通过摄像头与麦克风采集音视频轨道数据
     * @param tag
     * @param options
     * @returns
     */
    createMicrophoneAndCameraTracks(tag?: string, options?: {
        audio?: IMicphoneAudioProfile;
        video?: ICameraVideoProfile;
    }): Promise<{
        code: RCRTCCode;
        tracks: RCLocalTrack[];
    }>;
    /**
     * 创建屏幕共享视频流，默认分辨率 `1280 * 720`，帧率 `15`
     * @param tag 屏幕共享视轨数据标识
     * @param options
     * @description
     * 支持 Electron 平台下通过制定 `chromeMediaSourceId` 的方式获取屏幕共享视频。
     * 参考：https://www.electronjs.org/docs/api/desktop-capturer
     */
    createScreenVideoTrack(tag?: string, options?: IScreenVideoProfile): Promise<{
        code: RCRTCCode;
        track?: RCScreenVideoTrack;
    }>;
    /**
     * 创建带音频的屏幕共享资源
     * @param tag 屏幕共享视轨数据标识
     * @param options
     * @description electron 中 mac 系统暂不支持屏幕共享采集声音
     * @returns 在可以取到音频的情况下，tracks 中包含音轨和视轨；取不到音视频时 tracks 仅返回视轨
     */
    createScreenWithAudioTracks(tag?: string, options?: IScreenVideoProfile): Promise<{
        code: RCRTCCode;
        tracks?: (RCScreenVideoTrack | RCScreenAudioTrack)[];
    }>;
    private _createScreenTracks;
    /**
     * 创建 RCLocalAudioTrack 实例
     * @param tag
     * @param track
     * @returns
     */
    createLocalAudioTrack(tag: string, track: MediaStreamTrack): Promise<{
        code: RCRTCCode;
        track?: RCLocalAudioTrack;
    }>;
    /**
     * 创建 RCLocalVideoTrack 实例
     * @param tag 视轨数据标识
     * @param track MediaStreamTrack 实例
     * @returns
     */
    createLocalVideoTrack(tag: string, track: MediaStreamTrack): Promise<{
        code: RCRTCCode;
        track?: RCLocalVideoTrack;
    }>;
    /**
     * 根据本地或网络媒体文件资源创建 `RCLocalFileTrack` 实例
     * @param tag 资源标识
     * @param file 网络文件地址，或通过 <input type='file'> 获取到的 File 实例
     * @param options 可用于指定 `withoutVideo` 与 `withoutAudio` 以剔除视轨与音轨
     */
    createLocalFileTracks(tag: string, file: string | File, options?: ICreateLocalTrackOptions): Promise<{
        code: RCRTCCode;
        tracks: RCLocalFileTrack[];
    }>;
    /**
     * 根据 MediaStream 实例对象创建 RCLocalTrack 实例
     * @param tag 轨道标识
     * @param stream MediaStream 实例
     * @param options 可用于指定 `withoutVideo` 与 `withoutAudio` 以剔除视轨与音轨
     * @returns
     */
    createLocalTracks(tag: string, stream: MediaStream, options?: ICreateLocalTrackOptions): Promise<{
        code: RCRTCCode;
        tracks: RCLocalTrack[];
    }>;
    /**
     * 它接受一个 MediaStream 和一个可选的选项对象并返回一个 MediaStreamTracks 数组
     * @param {MediaStream} stream - MediaStream - 从中获取曲目的流。
     * @param {ICreateLocalTrackOptions} [options] - ICreateLocalTrackOptions
     * @returns 一组 MediaStreamTrack 对象。
     */
    static getTracksWithOptions(stream: MediaStream, options?: ICreateLocalTrackOptions): Array<MediaStreamTrack | undefined>;
}

/**
 * RTC 业务客户端
 * @public
 */
declare class RCRTCClient extends RCMediaStreamCapture {
    protected readonly _context: RTCContext;
    private readonly _runtime;
    private readonly _options;
    private readonly _service;
    constructor(_context: RTCContext, _runtime: IRuntime, _options: IRCRTCInitOptions);
    private _handleMessage;
    /**
     * voip 变更、jwt 变更需要触发重走嗅探逻辑
     */
    private naviDataChange;
    /**
     * 获取加入的连麦房间
     */
    private _getJoinedPKRoomList;
    /**
     * 获取当前用户 Id，若 IM 未连接，这返回 `''`
     * @returns
     */
    getCurrentId(): string;
    private _crtRoom;
    /**
     * 加入普通音视频房间
     * @param roomId
     * @param joinType 多端处理方式
     * @param outerUserDatas 业务层设置人员属性
     * @param useMutilPeerC 是否使用多 peerConnection 发布资源
     * @param roomType 加入房间的类型 默认参数 RTCMode.RTC
     */
    joinRTCRoom(roomId: string, joinType?: RTCJoinType, outerUserDatas?: IRTCUserData, useMutilPeerC?: boolean, roomType?: RTCMode): Promise<{
        room?: RCRTCRoom;
        code: RCRTCCode;
        userIds?: string[];
        tracks?: RCRemoteTrack[];
    }>;
    /**
     * 加入跨AppKey音视频房间
     * @param roomId
     * @param joinType 多端处理方式
     * @param outerUserDatas 业务层设置人员属性
     * @param useMutilPeerC 是否使用多 peerConnection 发布资源
     * @param roomType 加入房间的类型 默认参数 RTCMode.CROSS_MUTI
     */
    joinCrossRTCRoom(roomId: string, joinType?: RTCJoinType, outerUserDatas?: IRTCUserData, useMutilPeerC?: boolean, roomType?: RTCMode): Promise<{
        room?: RCRTCRoom;
        code: RCRTCCode;
        userIds?: string[];
        tracks?: RCRemoteTrack[];
    }>;
    /**
     * 主播加入直播房间或观众上麦场景调用，观众上麦之前需先取消已订阅的直播间资源
     * @param roomId 房间 Id
     * @param livingType 直播间类型，`RCLivingType.AUDIO` 为音频直播，`RCLivingType.VIDEO` 为音视频直播
     * @param joinType 多端处理方式，公有云暂不支持该字段
     * @param outerUserDatas 业务层设置人员属性
     */
    joinLivingRoom(roomId: string, livingType: RCLivingType, joinType?: RTCJoinType, outerUserDatas?: IRTCUserData, useMutilPeerC?: boolean): Promise<{
        room?: RCLivingRoom;
        code: RCRTCCode;
        userIds?: string[];
        tracks?: RCRemoteTrack[];
        CDNEnable?: boolean;
    }>;
    private _audience;
    /**
     * 获取直播观众客户端
     */
    getAudienceClient(useMutilPeerC?: boolean): RCAudienceClient;
    private _onIMStatusChange;
    private _onIMDisconnect;
    private _onIMUninit;
    /**
     * 退出并销毁当前房间实例，退出后该房间的所有方法将不可用
     */
    leaveRoom(room: RCAbstractRoom): Promise<{
        code: RCRTCCode;
    }>;
    private _crtAudienceLivingRoom;
    /**
     * 观众加入直播房间
     * @param roomId 房间 ID
     * @param livingType 直播类型（音频直播 or 音视频直播）
     */
    joinLivingRoomAsAudience(roomId: string, livingType: RCLivingType, useMutilPeerC?: boolean): Promise<{
        room?: RCAudienceLivingRoom;
        code: RCRTCCode;
        userIds?: string[];
        RTCTracks?: RCRemoteTrack[];
        MCUTracks?: RCRemoteTrack[];
        CDNUris?: IJoinResCDNInfo;
    }>;
    /**
     * 观众退出并销毁当前房间实例，退出后该房间的所有方法将不可用
     */
    leaveLivingRoomAsAudience(room: RCAudienceLivingRoom): Promise<{
        code: RCRTCCode;
    }>;
    /**
     * 升级为主播房间
     * @param room 观众房间实例
     */
    upgradeToAnchorRoom(room: RCAudienceLivingRoom): Promise<{
        room?: RCLivingRoom;
        code: RCRTCCode;
        userIds?: string[];
        tracks?: RCRemoteTrack[];
    }>;
    /**
     * 降级为观众房间
     * @param room 主播房间实例
     */
    downgradeToAudienceRoom(room: RCLivingRoom): Promise<{
        room?: RCAudienceLivingRoom;
        code: RCRTCCode;
        userIds?: string[];
        RTCTracks?: RCRemoteTrack[];
        MCUTracks?: RCRemoteTrack[];
        CDNUris?: IJoinResCDNInfo;
    }>;
    /**
     * 获取在房间内用户信息
     * @since version 5.2.1
     */
    getJoinedRoomInfo(): Promise<{
        code: RCRTCCode | ErrorCode;
        data?: IRTCJoinedInfo[];
    }>;
}

/**
 * 验证浏览器是否支持创建自定义文件流
 * @returns
 */
declare function ifSupportLocalFileTrack(): boolean;
/**
 * 验证浏览器是否支持屏幕共享
 * @returns
 */
declare function ifSupportScreenShare(): boolean;

declare const device: {
    getCameras: () => Promise<MediaDeviceInfo[]>;
    getMicrophones: () => Promise<MediaDeviceInfo[]>;
    getSpeakers: () => Promise<MediaDeviceInfo[]>;
};

/**
 * RTC 插件生成器
 * @public
 */
declare const installer: IPluginGenerator<RCRTCClient, IRCRTCInitOptions>;
/**
 * 预定义的资源 tag
 */
declare const RCTag: {
    /**
     * 默认流 Tag 定义
     */
    DEFAULT: string;
};

declare const helper: {
    transResolution: (resolution: RCResolution) => {
        width: number;
        height: number;
    };
    transFrameRate: (fps: RCFrameRate) => number;
    parseTrackId: (trackId: string) => {
        mediaType: RCMediaType;
        tag: string;
        userId: string;
    };
    ifSupportLocalFileTrack: typeof ifSupportLocalFileTrack;
    ifSupportScreenShare: typeof ifSupportScreenShare;
};

export { BackgroundPictureFillMode, IAudienceRoomEventListener, ICameraVideoProfile, IMCUOutputConfig, IMCUOutputVideoConfig, IMicphoneAudioProfile, IPKEndInfo, IPKInviteAnswerInfo, IPKInviteInfo, IPubSuccessRes, IPublishAttrs, IPublishedResource, IRCCandidatePairStat, IRCRTCInitOptions, IRCRTCReportListener, IRCRTCStateReport, IRCTrackStat, IReqResPKOptions, IRoomEventListener, IRoomPKEventListener, ISubscribeAttr, IVideoProfile, MixLayoutMode, MixVideoRenderMode, RCAbstractRoom, RCAudienceClient, RCAudienceLivingRoom, RCAudioBitrate, RCCameraVideoTrack, RCFrameRate, RCInnerCDNPullIsHttps, RCInnerCDNPullKind, RCKickReason, RCLivingRoom, RCLivingType, RCLocalAudioTrack, RCLocalFileAudioTrack, RCLocalFileTrack, RCLocalFileVideoTrack, RCLocalTrack, RCLocalVideoTrack, RCMCUConfigBuilder, RCMediaStreamCapture, RCMediaType, RCMicphoneAudioTrack, RCRTCClient, RCRTCCode, RCRTCLiveRole, RCRTCPingResult, RCRTCRoom, RCRemoteAudioTrack, RCRemoteTrack, RCRemoteVideoTrack, RCResolution, RCScreenAudioTrack, RCScreenVideoTrack, RCTag, RCTrack, RCVideoBitrate, RTCJoinType, device, helper, installer };
