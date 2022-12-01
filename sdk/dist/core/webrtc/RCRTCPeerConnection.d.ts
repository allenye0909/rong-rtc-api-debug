import { IRCRTCReportListener } from '../interfaces';
import PolarisReporter from '../PolarisReporter';
import { RCLocalTrack } from '../tracks/RCLocalTrack';
import { RCRemoteTrack } from '../tracks/RCRemoteTrack';
import { EventEmitter } from '@rongcloud/engine';
import IStatParser from './stat-parser/IStatParser';
/**
 * PC 实例管理类
 */
export default class RCRTCPeerConnection extends EventEmitter {
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
    createOffer(iceRestart: boolean): Promise<import("./sdp/ASdpStrategy").IOfferInfo>;
    setRemoteAnswer(answer: string): Promise<import("../..").RCRTCCode>;
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
    getOutboundVideoInfo(): import("./sdp/ASdpStrategy").OutboundVideoInfo[];
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
//# sourceMappingURL=RCRTCPeerConnection.d.ts.map