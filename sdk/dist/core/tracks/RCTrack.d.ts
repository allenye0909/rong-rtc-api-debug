import { EventEmitter } from '@rongcloud/engine';
import { RCRTCCode } from '../enums/RCRTCCode';
export declare enum RCTrackKind {
    AUDIO = "audio",
    VIDEO = "video"
}
export declare abstract class RCTrack extends EventEmitter {
    private readonly _tag;
    private readonly _userId;
    protected readonly _kind: 'audio' | 'video';
    private readonly _isLocalTrack;
    private readonly _roomId?;
    protected _localMuted: boolean;
    protected _remoteMuted: boolean;
    protected readonly _id: string;
    protected readonly _streamId: string;
    protected _msTrack?: MediaStreamTrack;
    private _msStream;
    constructor(_tag: string, _userId: string, _kind: 'audio' | 'video', _isLocalTrack: boolean, _roomId?: string | undefined);
    /**
     * 获取音视轨所属的 streamId，streamId 相同的音轨和视轨可认为属于统一道流
     * @returns
     */
    getStreamId(): string;
    getTrackId(): string;
    /**
     * 当 isMCUTrack 为 true 时，返回空字符串
     */
    getUserId(): string;
    __innerGetMediaStreamTrack(): MediaStreamTrack | undefined;
    /**
     * 它返回 MediaStreamTrack 对象。
     * @returns 表示媒体源的 MediaStreamTrack 对象。
     */
    get streamTrack(): (MediaStreamTrack | undefined);
    /**
     * 获取数据标识
     * @returns
     */
    getTag(): string;
    isLocalTrack(): boolean;
    isVideoTrack(): boolean;
    isAudioTrack(): boolean;
    /**
     * 查询流数据是否已可进行播放
     * @returns
     */
    isReady(): boolean;
    __innerSetMediaStreamTrack(track: MediaStreamTrack | undefined): void;
    protected _setLocalMuted(bool: boolean): void;
    /**
     * 禁用
     */
    mute(): void;
    /**
     * 启用
     */
    unmute(): void;
    /**
     * 本端是否已禁用该轨道数据
     */
    isLocalMuted(): boolean;
    /**
     * 是否为 MCU track
     */
    isMCUTrack(): boolean;
    /**
     * 发布者是否已禁用该轨道数据，在 RCLocalTrack 实例中，则其值始终等于 `isLocalMuted()`
     */
    isOwnerMuted(): boolean;
    private _element?;
    /**
     * 播放
     * @param element 用于承载媒体流的元素标签，音频流可传空
     * @param volume 有效值为 0-100
     */
    play(element?: HTMLVideoElement, options?: {
        volume?: number;
        audioDeviceId?: string;
    }): Promise<{
        code: RCRTCCode;
    }>;
    __innerDestroy(): void;
    /**
     * 释放内存中的 video、audio 标签
     */
    __releaseMediaElement(): void;
    /**
     * 它检查元素是否是视频节点
     * @param {any} element - 您要检查的元素是否为视频元素。
     * @returns 一个布尔值。
     */
    private __validateVideoNodeName;
}
//# sourceMappingURL=RCTrack.d.ts.map