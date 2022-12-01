import { IRuntime, ErrorCode } from '@rongcloud/engine';
import { RCRTCCode } from '../enums/RCRTCCode';
import { IRCRTCInitOptions, IPublishAttrs, IPubSuccessRes } from '../interfaces';
import { RCMediaService, ICDNUris, IPushOtherRooms } from '../service';
import RCAbstractRoom from './RCAbstractRoom';
import RCMCUConfigBuilder from './RCMCUConfigBuilder';
import { RCLivingType } from '../enums/RCLivingType';
import { RCRTCMessageType } from '../enums/inner/RCRTCMessageType';
import { RCInnerCDNPushMode } from '../enums/RCInnerCDNPushMode';
import { RCLivingPKHandler } from './RCLivingPKHandler';
import { RCLocalTrack } from '../tracks/RCLocalTrack';
import { ResourceMsgContent } from '../command/ParseRemoteResCommand';
import { RTCContext } from '../codec/RTCContext';
import { RTCMode } from '../enums/RTCMode';
import { RTCJoinType } from '../enums/RTCJoinType';
import { IJoinRTCRoomData, IRTCUserData } from '../codec/interface';
/**
 * 直播房间
 */
export default class RCLivingRoom extends RCAbstractRoom {
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
//# sourceMappingURL=RCLivingRoom.d.ts.map