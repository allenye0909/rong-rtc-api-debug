import { RCRTCCode } from '../enums/RCRTCCode';
import { RCMediaType } from '../enums/RCMediaType';
import { RCStreamType } from '../enums/inner/RCStreamType';
import { IResource } from '../interfaces';
import { IOfferInfo } from '../webrtc/sdp/ASdpStrategy';
import { RCInnerCDNPushMode } from '../enums/RCInnerCDNPushMode';
import { RCInnerCDNBroadcast } from '../enums/RCInnerCDNBroadcast';
import { RTCMode } from '../enums/RTCMode';
/**
 * 与 MediaServer 交互所需的 Request Header 信息
 */
export interface IRTCReqHeader {
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
export interface IMCUReqHeaders {
    'App-Key': string;
    Token: string;
    RoomId: string;
    UserId: string;
    SessionId: string;
}
/**
 * exchange 接口中 pushOtherRooms 字段接口
 */
export interface IPushOtherRooms {
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
export interface IExchangeReqBody {
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
export interface ILiveUrls {
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
export interface IRTCResponse {
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
export interface IExchangeResponse extends IRTCResponse {
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
export interface ICallEngine3 {
    engineType: 3;
    vendorKey: string;
    signKey: string;
    blinkSnifferServer: string;
    blinkCMPServer: string;
}
export interface ICallEngine4 {
    engineType: 4;
    /**
     * 房间所有人发布的最大流数量总上限，当前未启用
     */
    maxStreamCount?: number;
    mediaServer: string;
    backupMediaServer?: string[];
    /**
     * 到 mediaServer 的请求超时时限，默认 10，有效值 10 - 30。单位：秒
     */
    timeOut?: number;
    detectorManager?: string;
}
export interface IBroadcastSubReqBody {
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
export interface IBroadcastSubRespBody extends IRTCResponse {
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
export interface ICDNPlayUrlReqHeaders extends IMCUReqHeaders {
}
/**
 * 获取 CDN 拉流地址的请求参数
 */
export interface ICDNPlayUrlReq {
    w?: number;
    h?: number;
    fps?: number;
}
/**
 * 获取 CDN 资源拉流地址响应
 */
export interface ICDNPlayUrlResponse extends IRTCResponse {
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
export interface ICDNUris {
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
export interface IDetectoraddrs {
    'detectorAddr': string;
    'clusterId': string;
}
//# sourceMappingURL=interface.d.ts.map