import { LogLevel } from '@rongcloud/engine';
import { RCMediaType } from './enums/RCMediaType';
import { RCFrameRate } from './enums/RCFrameRate';
import { RCResolution } from './enums/RCResolution';
import { TrackState } from './enums/inner/TrackState';
import { RCLocalTrack, RCLocalAudioTrack } from './tracks/RCLocalTrack';
import { RCRemoteAudioTrack, RCRemoteTrack, RCRemoteVideoTrack } from './tracks/RCRemoteTrack';
import { ISdpSemantics } from './webrtc/sdp/ASdpStrategy';
import { RCInnerCDNPullKind } from './enums/RCInnerCDNPullKind';
import { RCInnerCDNPullIsHttps } from './enums/RCInnerCDNPullIsHttps';
import { RCKickReason } from './enums/RCKickType';
import { RCRTCPingResult } from './enums/RCRTCPingResult';
import { RCRTCLiveRole } from './enums/RCRTCLiveRole';
import RCRTCPeerConnection from './webrtc/RCRTCPeerConnection';
import { RCRTCCode } from './enums/RCRTCCode';
import { IExchangeResponse } from './service/interface';
import { IServerRTCRoomEntry } from './codec/interface';
export interface IRCTrackBitrate {
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
export interface IResource {
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
export interface IPublishedResource extends IResource {
    /**
     * 资源禁用/启用标识，用于向 signal 同步本端资源状态，1 为启用，0 为禁用
     */
    state: 0 | 1;
    /**
     * 资源标识，同标识的资源将视作同道流，标识不可重复
     */
    tag: string;
}
export interface ISubscribeAttr {
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
export interface IVideoProfile {
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
export interface IScreenVideoProfile extends IVideoProfile {
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
export interface IPublishAttrs {
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
 * 资源可用性描述
 */
export interface IResourceEnabled {
    resourceId: string;
    enabled: boolean;
}
/**
 * 资源地址字符串解析后的结构
 */
export interface IUriInfo {
    clousterId: string;
    serverId: string;
    /**
     * 资源唯一标识，为 `userId_tag_mediaType` 拼接而来，mediaType 为 0 或 1，是单独的音频或视频资源
     */
    resourceId: string;
    connectionId: string;
    ssrc: string;
    serviceProvider: string;
    /**
     * 时间戳
     */
    userTimestamp: number;
}
/**
 * peerConnection 抛出给用户的 track 字段
 */
export interface IRCTrackStat {
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
export interface IRCCandidatePairStat {
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
export interface IInnerIcePair extends IRCCandidatePairStat {
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
export interface ISendTrackState extends IRCTrackStat {
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
export interface IRecvTrackState extends IRCTrackStat {
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
export interface IInnerRCRTCStateReport {
    timestamp: number;
    iceCandidatePair?: IInnerIcePair;
    senders: ISendTrackState[];
    receivers: IRecvTrackState[];
}
/**
 * /**
 * peerConnection stats 抛给用户的字段
 */
export interface IRCRTCStateReport {
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
/**
 * 北极星上报 R3、R4 公共字段
 */
export interface IR3R4BaseData {
    /**
     * 发送总码率，单位 kbps
     */
    bitrateSend: number;
    /**
     * 接收总码率，单位 kbps
     */
    bitrateRecv: number;
    /**
     * 本地网络类型
     */
    networkType: string;
    /**
     * （Round-Trip-Time）往返时延，单位 ms
     */
    rtt: number;
    /**
     * 本端地址
     */
    localAddress: string;
    /**
     * 远端地址
     */
    remoteAddress: string;
    /**
     * 可用下行带宽，在无下行资源时，其值为 `0`，单位: `bit`
     */
    receiveBand: number;
    /**
     * 可用上行带宽，单位 bit
     */
    sendBand: number;
    /**
     * 上、下行总丢包数
     */
    packetsLost: number;
    /**
     * 设备id
     */
    deviceId: string;
}
/**
 * 北极星上报 R3 track 字段
 */
export interface IR3TackData {
    /**
     * trackId，内容为: userId_tag_video/(tiny_video)/audio
     */
    trackId: string;
    /**
     * 编解码名称
     */
    googCodecName: string;
    /**
     * 音量
     */
    audioLevel: number;
    /**
     * 音频采样率
     */
    samplingRate: number;
    /**
     * 上行码率
     */
    bitrate: number;
    /**
     * 丢包率
     */
    packetsLostRate: number;
    /**
     * 视频帧率，单位 fps
     */
    frameRate: number;
    /**
     * 分辨率，格式为 640*480
     */
    resolution: string;
    /**
     * 接收卡顿(间隔时间, 单位: ms)
     */
    googRenderDelayMs: number;
    /**
     * jitter 数据抖动
     */
    jitter: number;
    /**
     * nack 数量
     */
    nackCount: number;
    /**
     * PLI 请求数
     */
    pliCount: number;
    /**
     * googRtt 往返时长
     */
    rtt: number;
    /**
     * 第一个关键帧是否正常
     */
    googFirsSent: number;
    /**
     * 编码方式
     */
    encoderImplementation: string;
    /**
     * 流状态(0:不可用, 1:可用)
     */
    trackState: TrackState;
}
/**
 * 北极星上报 R4 track 字段
 */
export interface IR4TackData {
    trackId: string;
    googCodecName: string;
    audioLevel: number;
    samplingRate: number;
    /**
     * 下行码率
     */
    bitrate: number;
    packetsLostRate: number;
    frameRate: number;
    resolution: string;
    googRenderDelayMs: number;
    jitter: number;
    nackCount: number;
    pliCount: number;
    rtt: number;
    /**
     * 第一个关键帧是否正常
     */
    googFirsReceived: number;
    /**
     * 解码方式
     */
    codecImplementationName: string;
    trackState: TrackState;
}
export interface IRCRTCReportListener {
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
export interface IRCRTCTrackEventListener {
    /**
     * 订阅的音视频流通道已建立, track 已可以进行播放
     * @param track RCRemoteTrack 类实例
     */
    onTrackReady?(track: RCRemoteTrack): void;
}
export interface IRoomEventListener extends IRCRTCTrackEventListener {
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
export interface IRCRTCInitOptions {
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
export interface ICameraVideoProfile extends IVideoProfile {
    cameraId?: string;
    faceMode?: 'user' | 'environment';
}
export interface IMicphoneAudioProfile {
    micphoneId?: string;
    sampleRate?: number;
}
export interface ICreateLocalTrackOptions {
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
export interface IAudioLevelChangeHandler {
    (audioLevelReportList: {
        track: RCLocalAudioTrack | RCRemoteAudioTrack;
        audioLevel: number;
    }[]): void;
}
/**
 * 房间资源数据
 */
export declare type RoomData = {
    [userId: string]: IPublishedResource[];
};
/**
  * RCRTCMessageType.KICK content
 */
export interface IRCRTCKickContent {
    users: {
        userId: string;
        type: RCKickReason;
        kickExtra?: any;
    }[];
}
/**
 * IMutilPeerC 中的 track 类型
 */
export declare type TrackParam = RCLocalTrack | IPublishAttrs | RCRemoteTrack | ISubscribeAttr;
/**
 * RCRTCPeerCManager 创建的一条 pcItem 上的数据类型
 */
export interface IMutilPeerC {
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
export interface IPKInfo {
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
export interface IReqResPKOptions {
    autoMix?: boolean;
    extra?: string;
}
export interface IPKInviterBaseInfo {
    /**
     * 邀请者房间 ID
     */
    inviterRoomId: string;
    /**
     * 邀请者用户 ID
     */
    inviterUserId: string;
}
export interface IPKInviteeBaseInfo {
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
export interface IPKInviteInfo extends IPKInviterBaseInfo {
    /**
     * 邀请额外信息
     */
    extra?: string;
}
export interface IPKInviteTimeoutInfo {
    /**
     * 被邀请者房间 ID
     */
    inviteeRoomId: string;
    /**
     * 被邀请者用户 ID
     */
    inviteUserId: string;
}
/**
 * 业务层监听收到连麦应答的字段
 */
export interface IPKInviteAnswerInfo extends IPKInviterBaseInfo, IPKInviteeBaseInfo {
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
export interface IPKEndInfo {
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
 * 给 signal 发邀请连麦时，inviteInfo 字段的内容定义
 */
export interface IReqInviteInfo extends IPKInviterBaseInfo, IPKInviteeBaseInfo {
    /**
     * 邀请超时时间
     */
    inviteeTimeoutTime: number;
    /**
     * 邀请 sessionId
     */
    inviteSessionId: string;
    /**
     * 邀请者房间是否合流
     */
    inviterUserAutoMix: boolean;
    /**
     * 额外信息
     */
    extra: string;
}
/**
 * 给 signal 发取消连麦时，inviteInfo 字段的内容定义
 */
export interface ICancelReqInviteInfo extends IPKInviterBaseInfo, IPKInviteeBaseInfo {
    /**
     * 额外信息
     */
    extra: string;
}
/**
 * 给 signal 发响应连麦时，content 字段的内容定义
 */
export interface IResInviteContent extends IPKInviterBaseInfo, IPKInviteeBaseInfo {
    /**
     * 邀请 sessionId
     */
    inviteSessionId: string;
    /**
     * 邀请者房间是否合流，收到 signal 转发的响应时存在
     */
    inviterUserAutoMix?: boolean;
    /**
     * 被邀请者房间是否合流
     */
    inviteeUserAutoMix: boolean;
    /**
     * 同意邀请时必传 `${inviterRoomId}|${inviteeRoomId}`
     */
    MultiRoomKey?: string;
    /**
     * 同意邀请时必传
     */
    MultiRoomValue?: string;
    /**
     * 额外信息
     */
    extra?: string;
}
/**
 * 给 signal 发结束连麦时，content 字段的内容定义
 */
export interface IEndPKContent {
    /**
     * 被邀请者房间 ID
     */
    inviteeRoomId: string;
    /**
     * 邀请者房间 ID
     */
    inviterRoomId: string;
    /**
     * 当前登录用户 ID
     */
    userId: string;
}
/**
 * 收到结束 PK 时的消息字段
 */
export interface IEndPKMsgContent {
    inviteInfo: IEndPKContent;
    inviteSessionId: string;
}
/**
 * 收到连麦邀请、取消连麦的消息体字段
 */
export interface IPKMsgContent {
    /**
     * 邀请 sessionId
     */
    inviteSessionId: string;
    /**
     * 邀请消息为：IReqInviteInfo 序列化后字符串
     * 取消邀请消息为：ICancelReqInviteInfo 序列化后字符串
     * 超时消息为：IReqInviteInfo 序列化后字符串
     * 结束消息为：IEndPKContent 序列化后字符串
     */
    inviteInfo: IReqInviteInfo;
}
/**
 * 收到 PK 应答消息体字段
 */
export interface IPKAnswerMsgContent {
    /**
     * 响应结果 0: 拒绝; 1: 接收
     */
    answerCode: number;
    /**
     * 邀请 sessionId
     */
    inviteSessionId: string;
    inviteeUserAutoMix: boolean;
    /**
     * 消息内容 IResInviteContent 序列化后字符串
     */
    inviteContent: IResInviteContent;
}
/**
 * 观众加房间返回给客户的 CDN 信息
 */
export interface IJoinResCDNInfo {
    resolution?: RCResolution;
    fps?: RCFrameRate;
    CDNEnable?: boolean;
}
export interface IPubSuccessRes {
    code: RCRTCCode;
    liveUrl?: string;
    failedTracks?: {
        code: RCRTCCode;
        tracks: RCLocalTrack[];
    }[];
}
export interface IPubTaskRes {
    code: RCRTCCode;
    data?: IExchangeResponse | undefined;
    tracks: RCLocalTrack[];
}
export interface IChrmKVPullData {
    kvEntries: IServerRTCRoomEntry[];
    isFullUpdate?: boolean;
    syncTime?: number;
}
export interface IServerRTCKVList {
    entries: IServerRTCRoomEntry[];
    bFullUpdate: boolean;
    syncTime: number;
}
//# sourceMappingURL=interfaces.d.ts.map