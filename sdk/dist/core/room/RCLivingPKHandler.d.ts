import { ExchangeHooks } from '../command/ExchangeWithPushOtherRoomCommand';
import { ErrorCode, IReceivedMessage, IRuntime } from '@rongcloud/engine';
import { RCRTCCode } from '../enums/RCRTCCode';
import { IPKInfo, IPKEndInfo, IPKInviteAnswerInfo, IPKInviteInfo, IRCRTCInitOptions, IReqResPKOptions } from '../interfaces';
import { Invoker } from '../Invoker';
import RCMediaService from '../service/RCMediaService';
import { RCRemoteTrack } from '../tracks/RCRemoteTrack';
import RCLivingRoom from './RCLivingRoom';
import { RTCContext } from '../codec/RTCContext';
export declare type IOnRecvPKMsg = (msg: IReceivedMessage) => void;
export interface IRoomPKEventListener {
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
export declare class RCLivingPKHandler {
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
//# sourceMappingURL=RCLivingPKHandler.d.ts.map