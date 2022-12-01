import { AbsCodec, ErrorCode, IAsyncRes, IPromiseResult, KVString, RTCPluginContext, ConversationType, ISendMsgOptions, IReceivedMessage, ConnectionStatus } from '@rongcloud/engine';
import { RTCMode } from '../enums/RTCMode';
import { RTCJoinType } from '../enums/RTCJoinType';
import { RTCApiType } from '../enums/inner/RTCApiType';
import { RTCIdentityChangeType } from '../enums/inner/RTCIdentityChangeType';
import { IChrmKVPullData } from '../interfaces';
import { RTCKeyMaps } from './proto';
import { IRTCUserData, IJoinRTCRoomData, IRTCRoomInfo, IRTCUsers, IRtcTokenData, IServerRTCRoomEntry, IReqRoomPKOptions, ICancelRoomPKOptions, IResRoomPKOptions, IEndRoomPKOptions, IRTCJoinedInfo } from './interface';
export declare class RTCContext {
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
    getNaviInfo(): import("@rongcloud/engine").INaviInfo | null;
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
//# sourceMappingURL=RTCContext.d.ts.map