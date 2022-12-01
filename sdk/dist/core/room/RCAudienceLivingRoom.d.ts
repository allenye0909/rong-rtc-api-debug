import { IRuntime } from '@rongcloud/engine';
import { RCRemoteAudioTrack, RCRemoteTrack, RCRemoteVideoTrack } from '../tracks/RCRemoteTrack';
import { RCRTCCode } from '../enums/RCRTCCode';
import { IRCRTCInitOptions, IRCRTCReportListener, IRCRTCTrackEventListener, ISubscribeAttr, IAudioLevelChangeHandler } from '../interfaces';
import PolarisReporter from '../PolarisReporter';
import { IBroadcastSubReqBody } from '../service';
import RCLocalMediaStream from './RCLocalMediaStream';
import { RCResolution } from '../enums/RCResolution';
import { RCFrameRate } from '../enums/RCFrameRate';
import { RCLivingType } from '../enums/RCLivingType';
import RCRTCPeerConnection from '../webrtc/RCRTCPeerConnection';
import { RTCContext } from '../codec/RTCContext';
import { IServerRTCRoomEntry } from '../codec/interface';
export interface IAudienceRoomEventListener extends IRCRTCTrackEventListener {
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
export default class RCAudienceLivingRoom {
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
//# sourceMappingURL=RCAudienceLivingRoom.d.ts.map