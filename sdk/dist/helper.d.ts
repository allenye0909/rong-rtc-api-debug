import { INaviInfo } from '@rongcloud/engine';
import { RCFrameRate } from './core/enums/RCFrameRate';
import { RCResolution } from './core/enums/RCResolution';
import { RCRTCMessageType } from './core/enums/inner/RCRTCMessageType';
import { IPKInfo, IPublishAttrs, IPublishedResource, IResource, ISubscribeAttr, RoomData } from './core/interfaces';
import { RCMediaType } from './core/enums/RCMediaType';
import { RCLocalTrack } from './core/tracks/RCLocalTrack';
import RCRTCPeerConnection from './core/webrtc/RCRTCPeerConnection';
import { RCRemoteTrack } from './core/tracks/RCRemoteTrack';
import { RCTrack } from './core/tracks/RCTrack';
import { IRTCUsers, IServerRTCRoomEntry } from './core/codec/interface';
/**
 * 构建增量消息内容
 * @param objectname 消息名
 * @param uris 增量变更资源
 */
export declare const buildPlusMessage: (messageName: RCRTCMessageType, uris: IPublishedResource[]) => {
    name: RCRTCMessageType;
    content: string;
};
/**
 * 构建预发布的全量资源变更消息
 * @param uris 全量资源数据
 */
export declare const buildTotalURIMessageContent: (uris: IPublishedResource[]) => string;
/**
 * roomId 有效性验证
 * @param roomId
 */
export declare const isValidRoomId: (roomId: string) => boolean;
/**
 * 验证 tag 是否有效
 * @param tag
 * @returns
 */
export declare const isValidTag: (tag: string) => boolean;
/**
 * 页面地址有效性检测
 */
export declare const isValidLocation: boolean;
/**
 * 获取视频流的分辨率及帧率数据，若无法获取真实值，则返回 0
 * @param track
 */
export declare const getVideoTrackInfo: (track: MediaStreamTrack) => {
    width: number;
    height: number;
    frameRate: number;
};
/**
 * 取视频流动态码率
 * @param track
 * @returns
 */
export declare const getDynamicBitrate: (track: MediaStreamTrack) => {
    min: number;
    max: number;
};
/**
 * 获取资源唯一性标识
 * @param item
 */
export declare const getTrackId: (item: IResource) => string;
/**
 * 它接受一个类似“userId_tag_mediaType”的字符串，并返回一个包含字符串三个部分的对象
 * 解析 trackId 以获取资源信息
 * trackId 构成说明 trackId = [ userid, tag, mediaType ].join('_')
 *    userid    : 用户可随意定义可包含 _ 下划线
 *    tag       : `不可以有 _ 下划线`
 *    mediaType : RCMediaType 0:音频流  1:视频流 2:音视频混合流
 * @param {string} trackId - 远程轨道的轨道 ID。
 * @returns 具有三个属性的对象：mediaType、tag 和 userId。
 */
export declare const parseTrackId: (trackId: string) => {
    mediaType: RCMediaType;
    tag: string;
    userId: string;
};
export declare const parseStreamId: (streamId: string) => {
    tag: string;
    userId: string;
};
export declare const formatStreamId: (userId: string, tag: string) => string;
export declare const deepCopyResources: <T>(resources: T[]) => T[];
/**
 * 比对资源找出新增、状态变更及取消发布的资源
 * @param prevResources 原资源数据
 * @param resources 变更的全量资源
 */
export declare const diffPublishResources: (prevResources: IPublishedResource[], resources: IPublishedResource[], isReconnect?: boolean) => {
    publishedList: IPublishedResource[];
    unpublishedList: IPublishedResource[];
    modifiedList: IPublishedResource[];
};
export declare const diffPubResOnReconnect: (prevResources: IPublishedResource[], resources: IPublishedResource[]) => {
    publishedList: IPublishedResource[];
    unpublishedList: IPublishedResource[];
    modifiedList: IPublishedResource[];
};
export declare const getUUID22: () => string;
/**
 * 转化 RCResolution 枚举值为分辨率宽高
 * @param resolution
 * @returns
 */
export declare const transResolution: (resolution: RCResolution) => {
    width: number;
    height: number;
};
/**
 * 判断枚举值有效性
 * @param resolution
 * @returns
 */
export declare const isValidResolution: (resolution?: RCResolution) => boolean;
/**
 * 判断帧率枚举值有效性
 * @param fps
 * @returns
 */
export declare const isValidFPS: (fps?: RCFrameRate) => boolean;
/**
 * 获取枚举值对应的帧率
 * @param fps
 * @returns
 */
export declare const transFrameRate: (fps: RCFrameRate) => number;
export declare type IBrowserDetails = {
    browser: string;
    version?: number;
    supportsUnifiedPlan: boolean;
};
export declare const browserInfo: IBrowserDetails;
/**
 * 验证浏览器是否支持创建自定义文件流
 * @returns
 */
export declare function ifSupportLocalFileTrack(): boolean;
/**
 * 验证浏览器是否支持屏幕共享
 * @returns
 */
export declare function ifSupportScreenShare(): boolean;
/**
 * 检查参数是否为 null
*/
export declare const isNull: (val: any) => boolean;
/**
 * 公有云连接私有云 SDK 为非法连接
 */
export declare const isIllegalConnection: (navi: INaviInfo) => boolean;
/**
 * 获取将要发布的 track 数量
 * 需要发布小流的算两个 track
 */
export declare const calcTracksNum: (tracks: (RCLocalTrack | IPublishAttrs)[], pc: RCRTCPeerConnection) => number;
/**
 * 解析房间数据
 */
export declare const parseRoomData: (data: IRTCUsers, mainRoomId: string) => RoomData;
export declare const isRepeatPub: (newPub: IPublishedResource, allPublishList: IPublishedResource[]) => {
    isInclude: boolean;
    index: number;
};
/**
 * 从加房间返回的数据中获取加入的副房间
 */
export declare const getPKInfoByRoomData: (mainRoomId: string, roomInfo: {
    key: string;
    value: string;
}[]) => IPKInfo;
/**
 * 解析观众加房间 kv 数据
 * 远端无人员时，kvEntries 的 key 不包含 RC_ANCHOR_LIST
 * 远端无资源时，key 不包含 RC_RES_、RC_CDN
 * 远端有资源、无 CDN 资源时，key 不包含 RC_CDN
 * 服务端 bug，偶现无 RC_RTC_SESSIONID
 */
export declare const parseAudienceRoomData: (roomId: string, kvEntries: IServerRTCRoomEntry[]) => {
    sessionId: string;
    remoteUserIds: string[];
    remoteRTCUris: IPublishedResource[];
    remoteMUCUris: IPublishedResource[];
    remoteRTCTracks: RCRemoteTrack[];
    remoteMCUTracks: RCRemoteTrack[];
    remoteTracks: RCRemoteTrack[];
    CDNUris: any;
};
export declare const getTrackIdFromAttr: (track: RCTrack | ISubscribeAttr | IPublishAttrs) => string;
export declare const int64ToTimestamp: (obj: any) => number;
//# sourceMappingURL=helper.d.ts.map