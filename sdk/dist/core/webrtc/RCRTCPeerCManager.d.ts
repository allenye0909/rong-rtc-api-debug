import { TrackParam, IMutilPeerC, IPublishedResource, ISubscribeAttr } from '../interfaces';
import PolarisReporter from '../PolarisReporter';
import RCRTCPeerConnection from '../webrtc/RCRTCPeerConnection';
export default class RCRTCPeerCManager {
    /**
     * 是否使用多 peerConnection
     */
    private readonly _useMutilPeerC;
    /**
     * roomId 或观众端 userId
     */
    private readonly _roomId;
    /**
     * 断线重连每一条 peerConnection
     */
    private readonly _reTryExchange;
    /**
     * 当前用户 id
     */
    private readonly _currentUserId;
    /**
     * 北极星上报模块
     */
    private readonly _polarisReport?;
    /**
     * 存储创建的所有 peerC，key 为 pcName，/exchange 请求中 request header 中的 Peer-Connection-Id 值
     */
    private _mutilPeerC;
    constructor(
    /**
     * 是否使用多 peerConnection
     */
    _useMutilPeerC: boolean, 
    /**
     * roomId 或观众端 userId
     */
    _roomId: string, 
    /**
     * 断线重连每一条 peerConnection
     */
    _reTryExchange: Function, 
    /**
     * 当前用户 id
     */
    _currentUserId: string, 
    /**
     * 北极星上报模块
     */
    _polarisReport?: PolarisReporter | undefined);
    get useMutilPeerC(): boolean;
    /**
     * 根据 track 判断是否为上行
     */
    private _isPub;
    /**
     * 按 tag 分 tracks
     */
    private _groupTracksByTag;
    /**
     * 按规则生成 pcName
     * 单 peerC roomId_pub
     * 多 peerC 上行: roomId_tag、下行: roomId_sub
     * 观众加房间: roomId_sub
     * 观众不加房间: userId_sub
     * @param isPub 是否为上行、下行
     * @param tag 多 peerC 时，上行需资源标识
     */
    private _genPCName;
    /**
     * 创建一个 peerC
     * @param pcName 使用的 peerConnection 名称
     * @param tracks 本次要操作的资源
     */
    private _createOnePeerCItem;
    /**
     * 创建一组 peerC
     * 为了适应多 peerConnection 的场景做出的冗余设计，对单 peerConnection 进行数组进行封装
     * 提示：useMutilPeerC 用户自定义的，没有明确场景，必须使用多 peerConnection
     * @param pcName
     * @returns
     */
    createPeerCList(tracks: TrackParam[]): IMutilPeerC[];
    /**
     * 移除所有 peerConnection 的上行资源
     */
    private _removeAllLocalTrack;
    /**
     * 销毁某一个 peerConnection
     */
    destroyPeerC(pcName: string): void;
    /**
     * 销毁所有 peerConnection
     */
    private _destroyAllPeerC;
    /**
     * 获取某一个 peerC
     */
    getPCItemByPCName(pcName: string): {
        /**
         * RCRTCPeerConnection 对象
         */
        pc: RCRTCPeerConnection;
        /**
         * 存放 peerConnection 上本次要发布、取消发布、订阅、取消订阅的 track
         */
        tracks: TrackParam[];
        /**
         * 当前 peerC 是否为发上行的 peerConnection
         */
        isPub: boolean;
        /**
         * peerConnection 上行资源，暂不需要
         */
        publishList?: IPublishedResource[] | undefined;
        /**
         * peerConnection 下行资源，暂不需要
         */
        subscribeList?: ISubscribeAttr[] | undefined;
    };
    /**
     * 根据 trackId 获取 peerConnection 对象
     */
    getPCByTrackId(trackId: string, isPub?: boolean): RCRTCPeerConnection;
    /**
     * 获取所有的 peerConnection
     */
    getPCList(): RCRTCPeerConnection[];
    /**
     * 获取存储的多 peerConnection 数据
     */
    getMutilPeerCData(): {
        [key: string]: {
            /**
             * RCRTCPeerConnection 对象
             */
            pc: RCRTCPeerConnection;
            /**
             * 存放 peerConnection 上本次要发布、取消发布、订阅、取消订阅的 track
             */
            tracks: TrackParam[];
            /**
             * 当前 peerC 是否为发上行的 peerConnection
             */
            isPub: boolean;
            /**
             * peerConnection 上行资源，暂不需要
             */
            publishList?: IPublishedResource[] | undefined;
            /**
             * peerConnection 下行资源，暂不需要
             */
            subscribeList?: ISubscribeAttr[] | undefined;
        };
    };
    setPeerCData(pcName: string, key: string, value: any): void;
    /**
     * 销毁资源
     */
    clear(): void;
}
//# sourceMappingURL=RCRTCPeerCManager.d.ts.map