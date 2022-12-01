import { ErrorCode, IRuntime } from '@rongcloud/engine';
import RCLivingRoom from './room/RCLivingRoom';
import RCRTCRoom from './room/RCRTCRoom';
import RCAudienceClient from './RCAudienceClient';
import { IJoinResCDNInfo, IRCRTCInitOptions } from './interfaces';
import RCAbstractRoom from './room/RCAbstractRoom';
import { RCRTCCode } from './enums/RCRTCCode';
import { RCLivingType } from './enums/RCLivingType';
import { RCRemoteTrack } from './tracks/RCRemoteTrack';
import RCAudienceLivingRoom from './room/RCAudienceLivingRoom';
import RCMediaStreamCapture from './RCMediaStreamCapture';
import { RTCContext } from './codec/RTCContext';
import { RTCMode } from './enums/RTCMode';
import { RTCJoinType } from './enums/RTCJoinType';
import { IRTCUserData, IRTCJoinedInfo } from './codec/interface';
/**
 * RTC 业务客户端
 * @public
 */
export default class RCRTCClient extends RCMediaStreamCapture {
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
//# sourceMappingURL=RCRTCClient.d.ts.map