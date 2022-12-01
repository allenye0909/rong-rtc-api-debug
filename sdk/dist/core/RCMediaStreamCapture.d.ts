import { RCRTCCode } from './enums/RCRTCCode';
import { ICameraVideoProfile, ICreateLocalTrackOptions, IMicphoneAudioProfile, IScreenVideoProfile } from './interfaces';
import { RCCameraVideoTrack, RCLocalAudioTrack, RCLocalFileTrack, RCLocalTrack, RCLocalVideoTrack, RCMicphoneAudioTrack, RCScreenAudioTrack, RCScreenVideoTrack } from './tracks/RCLocalTrack';
import { RTCContext } from './codec/RTCContext';
export default class RCMediaStreamCapture {
    protected readonly _context: RTCContext;
    constructor(_context: RTCContext);
    private _isElectron;
    private _getMediaStream;
    /**
     * 如果用户设置了音频约束为true，那么我们将音频约束设置为一个空对象，
     * 然后我们将检查浏览器是否支持noiseSuppression、autoGainControl和echoCancellation约束，
     * 如果支持，那么我们将设置音频约束为真
     * @param {any} constraints - 约束参数与 getUserMedia 方法中的约束参数相同。
     * @returns 返回值是约束对象。
     */
    private setConstraintsConfig;
    /**
     * 从麦克风中捕获音轨数据
     * @param tag
     * @param options
     * @returns
     */
    createMicrophoneAudioTrack(tag?: string, options?: IMicphoneAudioProfile): Promise<{
        code: RCRTCCode;
        track?: RCMicphoneAudioTrack;
    }>;
    /**
     * 由摄像头捕获视轨数据
     * @param tag
     * @param options
     * @returns
     */
    createCameraVideoTrack(tag?: string, options?: ICameraVideoProfile): Promise<{
        code: RCRTCCode;
        track?: RCCameraVideoTrack;
    }>;
    /**
     * 通过摄像头与麦克风采集音视频轨道数据
     * @param tag
     * @param options
     * @returns
     */
    createMicrophoneAndCameraTracks(tag?: string, options?: {
        audio?: IMicphoneAudioProfile;
        video?: ICameraVideoProfile;
    }): Promise<{
        code: RCRTCCode;
        tracks: RCLocalTrack[];
    }>;
    /**
     * 创建屏幕共享视频流，默认分辨率 `1280 * 720`，帧率 `15`
     * @param tag 屏幕共享视轨数据标识
     * @param options
     * @description
     * 支持 Electron 平台下通过制定 `chromeMediaSourceId` 的方式获取屏幕共享视频。
     * 参考：https://www.electronjs.org/docs/api/desktop-capturer
     */
    createScreenVideoTrack(tag?: string, options?: IScreenVideoProfile): Promise<{
        code: RCRTCCode;
        track?: RCScreenVideoTrack;
    }>;
    /**
     * 创建带音频的屏幕共享资源
     * @param tag 屏幕共享视轨数据标识
     * @param options
     * @description electron 中 mac 系统暂不支持屏幕共享采集声音
     * @returns 在可以取到音频的情况下，tracks 中包含音轨和视轨；取不到音视频时 tracks 仅返回视轨
     */
    createScreenWithAudioTracks(tag?: string, options?: IScreenVideoProfile): Promise<{
        code: RCRTCCode;
        tracks?: (RCScreenVideoTrack | RCScreenAudioTrack)[];
    }>;
    private _createScreenTracks;
    /**
     * 创建 RCLocalAudioTrack 实例
     * @param tag
     * @param track
     * @returns
     */
    createLocalAudioTrack(tag: string, track: MediaStreamTrack): Promise<{
        code: RCRTCCode;
        track?: RCLocalAudioTrack;
    }>;
    /**
     * 创建 RCLocalVideoTrack 实例
     * @param tag 视轨数据标识
     * @param track MediaStreamTrack 实例
     * @returns
     */
    createLocalVideoTrack(tag: string, track: MediaStreamTrack): Promise<{
        code: RCRTCCode;
        track?: RCLocalVideoTrack;
    }>;
    /**
     * 根据本地或网络媒体文件资源创建 `RCLocalFileTrack` 实例
     * @param tag 资源标识
     * @param file 网络文件地址，或通过 <input type='file'> 获取到的 File 实例
     * @param options 可用于指定 `withoutVideo` 与 `withoutAudio` 以剔除视轨与音轨
     */
    createLocalFileTracks(tag: string, file: string | File, options?: ICreateLocalTrackOptions): Promise<{
        code: RCRTCCode;
        tracks: RCLocalFileTrack[];
    }>;
    /**
     * 根据 MediaStream 实例对象创建 RCLocalTrack 实例
     * @param tag 轨道标识
     * @param stream MediaStream 实例
     * @param options 可用于指定 `withoutVideo` 与 `withoutAudio` 以剔除视轨与音轨
     * @returns
     */
    createLocalTracks(tag: string, stream: MediaStream, options?: ICreateLocalTrackOptions): Promise<{
        code: RCRTCCode;
        tracks: RCLocalTrack[];
    }>;
    /**
     * 它接受一个 MediaStream 和一个可选的选项对象并返回一个 MediaStreamTracks 数组
     * @param {MediaStream} stream - MediaStream - 从中获取曲目的流。
     * @param {ICreateLocalTrackOptions} [options] - ICreateLocalTrackOptions
     * @returns 一组 MediaStreamTrack 对象。
     */
    static getTracksWithOptions(stream: MediaStream, options?: ICreateLocalTrackOptions): Array<MediaStreamTrack | undefined>;
}
//# sourceMappingURL=RCMediaStreamCapture.d.ts.map