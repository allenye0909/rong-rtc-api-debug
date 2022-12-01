import { RCRTCCode } from '../enums/RCRTCCode';
import { IRCTrackBitrate } from '../interfaces';
import { RCTrack } from './RCTrack';
import { RCAudioBitrate, RCVideoBitrate } from '../enums/RCBitrate';
export declare abstract class RCLocalTrack extends RCTrack {
    /**
     * 本地流结束事件通知
     * @description
     * 该事件为 MediaStreamTrack 实例的 'ended' 事件触发
     */
    static EVENT_LOCAL_TRACK_END: string;
    /**
     * muted 状态变更通知常量定义
     */
    static __INNER_EVENT_MUTED_CHANGE__: string;
    /**
     * 本地流已销毁
     */
    static __INNER_EVENT_DESTROY__: string;
    constructor(tag: string, userId: string, kind: 'audio' | 'video', track: MediaStreamTrack);
    /**
     * @override 重写 RCTrack 父类方法
     * @param bool
     */
    _setLocalMuted(bool: boolean): void;
    private _isPublished;
    __innerSetPublished(bool: boolean): void;
    /**
     * 检测本地资源是否已发布
     */
    isPublished(): boolean;
    /**
     * 销毁本地流
     */
    destroy(): void;
    private _bitrateInfo?;
    /**
     * 为本地流设定上行码率，仅视频流有效，音频默认 15 kbps，不支持修改
     * @description 当 `max` 或 `min` 值为 `0` 时，取动态码率计算结果
     * @param max 最大码率
     * @param min 最小码率
     * @param start 起始码率
     */
    setBitrate(max?: number, min?: number, start?: number): void;
    /**
     * 获取码率配置，当未指定码率时，将取得动态码率计算值
     * @returns
     */
    getBitrate(): IRCTrackBitrate;
}
export declare class RCLocalAudioTrack extends RCLocalTrack {
    constructor(tag: string, userId: string, track: MediaStreamTrack);
    /**
     * 它设置推荐的音频码率。
     * @param {RCAudioBitrate} audio - RCA音频比特率
     */
    setRecommendBitrate(audio: RCAudioBitrate): void;
    /**
     * 它设置视频的比特率。
     * @param {number} max - 客户端将使用的最大比特率。
     * @param {number[]} args - [分钟，开始]
     */
    setBitrate(max: number, ...args: number[]): void;
    protected _stopProcess: Function;
    /**
     * @override __innerSetMediaStreamTrack
     * @params {track} MediaStreamTrack 添加音频流
     * @params {track} undefined        销毁音频流
     */
    __innerSetMediaStreamTrack(track: MediaStreamTrack | undefined): void;
}
export declare class RCLocalVideoTrack extends RCLocalTrack {
    private _isTiny;
    constructor(tag: string, userId: string, track: MediaStreamTrack, _isTiny?: boolean);
    __isTiny(): boolean;
    getStreamId(): string;
    getTrackId(): string;
    /**
     * 它设置推荐的音频码率
     * @param {RCVideoBitrate} video - RC视频比特率
     */
    setRecommendBitrate(video: RCVideoBitrate): void;
    /**
     * 它设置视频的比特率。
     * @param {number} max - 视频可以编码的最大比特率。
     * @param {number[]} args - [最大、最小、开始]
     */
    setBitrate(max: number, ...args: number[]): void;
}
export declare abstract class RCLocalFileTrack extends RCLocalTrack {
    /**
     * 自定义文件流的播放宿主原生，该类型流所持有的 MediaStreamTrack 实例是由该宿主元素 `captureStream` 获取
     */
    protected _resource: HTMLVideoElement;
    private static readonly _mapping;
    /**
     * 建立 trackId 与宿主播放元素的映射关系
     * @param trackId
     * @param video
     */
    private static __innerSetMapping;
    private static __innerRemoveMapping;
    constructor(tag: string, userId: string, kind: 'audio' | 'video', track: MediaStreamTrack, 
    /**
     * 自定义文件流的播放宿主原生，该类型流所持有的 MediaStreamTrack 实例是由该宿主元素 `captureStream` 获取
     */
    _resource: HTMLVideoElement);
    destroy(): void;
}
export declare class RCLocalFileVideoTrack extends RCLocalFileTrack {
    constructor(tag: string, userId: string, track: MediaStreamTrack, element: HTMLVideoElement);
}
export declare class RCLocalFileAudioTrack extends RCLocalFileTrack {
    constructor(tag: string, userId: string, track: MediaStreamTrack, element: HTMLVideoElement);
    _setLocalMuted(bool: boolean): void;
    play(): Promise<{
        code: RCRTCCode;
    }>;
    protected _stopProcess: Function;
    /**
     * @override __innerSetMediaStreamTrack
     * @params {track} MediaStreamTrack 添加音频流
     * @params {track} undefined        销毁音频流
     */
    __innerSetMediaStreamTrack(track: MediaStreamTrack | undefined): void;
}
export declare class RCMicphoneAudioTrack extends RCLocalAudioTrack {
}
export declare class RCCameraVideoTrack extends RCLocalVideoTrack {
}
export declare class RCScreenVideoTrack extends RCLocalVideoTrack {
}
export declare class RCScreenAudioTrack extends RCLocalAudioTrack {
}
//# sourceMappingURL=RCLocalTrack.d.ts.map