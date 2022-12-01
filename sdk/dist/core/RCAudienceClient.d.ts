import { IRuntime } from '@rongcloud/engine';
import { IRCRTCReportListener, IRCRTCTrackEventListener, IRCRTCInitOptions } from './interfaces';
import { RCRemoteTrack } from './tracks/RCRemoteTrack';
import { RCLivingType } from './enums/RCLivingType';
import { RCRTCCode } from './enums/RCRTCCode';
import { RCMediaType } from './enums/RCMediaType';
import { RTCContext } from './codec/RTCContext';
/**
 * 直播观众客户端
 */
export default class RCAudienceClient {
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
//# sourceMappingURL=RCAudienceClient.d.ts.map