import { IPublishedResource, ISubscribeAttr, RoomData } from './interfaces';
import PolarisReporter from './PolarisReporter';
import { RCMediaService } from './service';
import { ICDNUris } from './service/interface';
import { RCLocalTrack } from './tracks/RCLocalTrack';
import { RCRemoteAudioTrack, RCRemoteTrack, RCRemoteVideoTrack } from './tracks/RCRemoteTrack';
import RCRTCPeerCManager from './webrtc/RCRTCPeerCManager';
import { RTCContext } from './codec/RTCContext';
import { RTCMode } from './enums/RTCMode';
import { IJoinRTCRoomData } from './codec/interface';
export declare const StoreEvent: {};
export declare abstract class ReadableStore {
    readonly context: RTCContext;
    readonly service: RCMediaService;
    readonly peerMgr: RCRTCPeerCManager;
    readonly roomId: string;
    readonly crtUserId: string;
    readonly roomMode: RTCMode;
    readonly polarisReport: PolarisReporter;
    readonly isUpgrade?: boolean | undefined;
    readonly isMainRoom?: boolean | undefined;
    /**
     * 房间资源数据
     */
    protected _roomResources: RoomData;
    /**
     * 远端 track
     */
    protected _remoteTracks: {
        [trackId: string]: RCRemoteAudioTrack | RCRemoteVideoTrack;
    };
    /**
     * 已订阅参数
     */
    protected _subscribedList: ISubscribeAttr[];
    protected _collectSubscribeList: ISubscribeAttr[];
    /**
     * 与 MediaServer 交互需要的 token 信息
     */
    protected _token: string;
    /**
     * 每次加入房间后都会改变
     */
    protected _sessionId: string;
    /**
     * cdn_uris 信令扩散数据
     */
    protected _CDNUris: ICDNUris | null;
    protected _CDNEnable: boolean;
    protected _destroyed: boolean;
    constructor(context: RTCContext, service: RCMediaService, peerMgr: RCRTCPeerCManager, roomId: string, crtUserId: string, roomMode: RTCMode, polarisReport: PolarisReporter, isUpgrade?: boolean | undefined, isMainRoom?: boolean | undefined);
    get useMutilPeerC(): boolean;
    getResourcesByUserId(userId: string): IPublishedResource[] | undefined;
    getRemoteTrack(trackId: string): RCRemoteTrack | undefined;
    getRemoteTracksByUserId(userId: string): RCRemoteTrack[];
    getRemoteTracks(): {
        [trackId: string]: RCRemoteAudioTrack | RCRemoteVideoTrack;
    };
    getSessionId(): string;
    getAllUserIds(): string[];
    getRemoteUserIds(): string[];
    getSubscribedList(): ISubscribeAttr[];
    getCollectSubscribeList(): ISubscribeAttr[];
    getPublishedResourceByTrackId(trackId: string): IPublishedResource | undefined;
    getToken(): string;
    getLocalTrack(trackId: string): RCLocalTrack | null;
    getLocalTracks(): RCLocalTrack[];
    getTrackState(trackId: string): 0 | 1;
    getCDNEnable(): boolean;
    getCDNUris(): ICDNUris | null;
}
export declare class Store extends ReadableStore {
    private _initRemoteTracks;
    initWithRoomData(data: IJoinRTCRoomData): void;
    assignRoomData(data: RoomData): void;
    setResourcesByUserId(userId: string, arr: IPublishedResource[]): void;
    removeRemoteTrack(trackId: string): void;
    removeResourcesByUserId(userId: string): void;
    addRemoteTrack(track: RCRemoteTrack): void;
    removeRemoteTracks(): void;
    setCDNEnabel(bool: boolean): void;
    setCDNUris(uris: ICDNUris | null): void;
    resetSubscribedList(subscribeList: ISubscribeAttr[]): void;
    resetCollectSubscribeList(collectSubscribeList: ISubscribeAttr[]): void;
}
//# sourceMappingURL=Store.d.ts.map