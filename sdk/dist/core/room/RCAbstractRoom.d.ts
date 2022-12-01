import { ErrorCode, IReceivedMessage, KVString, IRuntime, EventEmitter } from '@rongcloud/engine';
import { RCRTCMessageType } from '../enums/inner/RCRTCMessageType';
import { IPublishAttrs, IRCRTCReportListener, IRoomEventListener, ISubscribeAttr, IRCRTCInitOptions, IAudioLevelChangeHandler, IPubSuccessRes } from '../interfaces';
import { IPushOtherRooms, IRTCReqHeader, RCMediaService } from '../service';
import RCRTCPeerConnection from '../webrtc/RCRTCPeerConnection';
import PolarisReporter from '../PolarisReporter';
import { RCLocalTrack } from '../tracks/RCLocalTrack';
import { RCRemoteTrack } from '../tracks/RCRemoteTrack';
import { RCRTCCode } from '../enums/RCRTCCode';
import { RCLivingType } from '../enums/RCLivingType';
import { IOnRecvPKMsg } from './RCLivingPKHandler';
import RCRTCPeerCManager from '../webrtc/RCRTCPeerCManager';
import { Invoker } from '../Invoker';
import { ReadableStore } from '../Store';
import { ResourceMsgContent } from '../command/ParseRemoteResCommand';
import { RTCContext } from '../codec/RTCContext';
import { RTCMode } from '../enums/RTCMode';
import { RTCJoinType } from '../enums/RTCJoinType';
import { IRTCUserData, IJoinRTCRoomData } from '../codec/interface';
export declare const RCAbstractRoomEvent: {
    LEAVE: string;
};
/**
 * 房间抽象基类
 */
export default abstract class RCAbstractRoom extends EventEmitter {
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
//# sourceMappingURL=RCAbstractRoom.d.ts.map