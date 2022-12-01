import { IRCTrackBitrate } from '../../interfaces';
import { ISdpSemantics, RtpTransceiverDirection } from './ASdpStrategy';
/**
 * 以字符串的形式 硬处理 SDP 信息
 * 对于 plan-b | unified-plan 数据的处理 方式是相同的。
 * 将 SDP 以 m=[video|audio] 进行拆分，
 * 从而获取 SDPHeader | videoStreams | audioStreams 并对其内容进行处理
 */
export default abstract class ASdpBuilder {
    readonly SDP: string;
    readonly type: ISdpSemantics;
    protected SDPHeader: string;
    protected videoStreams: string[];
    protected audioStreams: string[];
    static KBitrate: number;
    get videoSdps(): string[];
    get audioSdps(): string[];
    constructor(SDP: string, type: ISdpSemantics);
    /**
     * 它从 SDP 中删除空行和尾随空格
     * @param {string} sdp - 要处理的 SDP 字符串。
     * @returns 删除了换行符的 sdp 字符串。
     */
    static trimBlankLine(sdp: string): string;
    /**
     * 通过 m=video | m=audio 将 SDP 进行分隔
     * 它返回一个索引数组，其中在 SDP 中找到子字符串“m=video”或“m=audio”
     * 它返回 SDP 中 execResult.index 的索引数组。
     * @returns 一组数字。
     */
    private getStreamIndex;
    /**
     * 它将 SDP 拆分为标头和流
     * @param {number[]} streams - 表示每个流的开始和结束的数字数组。
     */
    private spliteStreams;
    /**
     * 如果当前资源方向 RTCRtpTransceiverDirection 是 recvonly | inactive
     * 表明当前不需要发送 RTP 数据所以将 SDP 中删除所有以 `a=ssrc` 或 `a=msid` 开头的行
     * @param {string} stream - string - 要修改的 SDP 字符串
     * @returns 正在返回流。
     */
    static clearInactiveOrRecvonly(stream: string): string;
    /**
     * 它采用 SDP 标头和音频和视频流并将它们连接到一个字符串中
     * @returns SDP 标头和音频和视频流的字符串。
     */
    abstract stringify(): string;
    /**
     * 它获取音频流并将它们映射到一个新数组，其中每个项目都是调用 setAudioItemBitrate 函数的结果
     * @param {IRCTrackBitrate} bitrate - 以 kbps 为单位的比特率。
     */
    setAudiosBitrate(bitrate: IRCTrackBitrate): ASdpBuilder;
    /**
     * 它设置特定 MID 的音频比特率。
     * @param {IRCTrackBitrate} bitrate - 音频流的比特率，以 kbps 为单位。
     * @param {string} streamId - 音频流的媒体流 ID。
     */
    setAudioBitrateWithStreamId(bitrate: IRCTrackBitrate, streamId: string): ASdpBuilder;
    /**
     * 它设置特定 MID 的音频比特率。
     * @param {IRCTrackBitrate} bitrate - 音频流的比特率，以 kbps 为单位。
     * @param {string} mid - 音频流的媒体流 ID。
     */
    setAudioBitrateWithMid(bitrate: IRCTrackBitrate, mid: string): ASdpBuilder;
    /**
     * 它接受一个 SDP 音频块和一个比特率，并返回比特率设置为给定值的 SDP 音频块
     * @param {string} sdpAudioBlock - SDP 的音频块。
     * @param {IRCTrackBitrate} bitrate - 以 kbps 为单位的比特率。
     * @returns 正在返回 sdpAudioBlock 并将比特率设置为传入的比特率。
     */
    private setAudioItemBitrate;
    /**
     * 如果 SDP 的音频块没有 b=AS: 行，则添加一个
     * @param {string} sdpAudioBlock - SDP 的音频块。
     * @param {IRCTrackBitrate} bitrate - IRCTrack比特率
     * @returns 正在返回 sdpAudioBlock。
     */
    private addAudioBlineAS;
    /**
     * 对视频元素设置 SDP 相关信息
     * 针对 SDP 中所有的 video 元素添加码率设置
     * @param bitrate
     */
    setVideosBitrate(bitrate: IRCTrackBitrate): ASdpBuilder;
    /**
     * 它设置特定中间的视频比特率， 针对 SDP 中给定 mid 的 video 元素添加码率设置。
     * @param {IRCTrackBitrate} bitrate - 您要设置的比特率。
     * @param {string} streamId - 媒体流 ID。
     */
    setVideoBitrateWithStreamId(bitrate: IRCTrackBitrate, streamId: string): ASdpBuilder;
    /**
     * 它设置特定中间的视频比特率， 针对 SDP 中给定 mid 的 video 元素添加码率设置。
     * @param {IRCTrackBitrate} bitrate - 您要设置的比特率。
     * @param {string} streamId - 媒体流 ID。
     */
    setVideoBitrateWithMid(bitrate: IRCTrackBitrate, mid: string): ASdpBuilder;
    /**
     * 它设置视频项目的比特率。
     * @param {string} sdpVideoBlock - SDP 的视频块。
     * @param {IRCTrackBitrate} bitrate - 包含最小、最大和起始比特率值的比特率对象。
     * @returns 正在返回 sdpVideoBlock。
     */
    private setVideoItemBitrate;
    /**
     * 如果视频块没有 b=AS: 行，则添加一个
     * @param {string} sdpVideoBlock - SDP 的视频块。
     * @param {IRCTrackBitrate} bitrate - IRCTrack比特率
     * @returns 正在返回 sdpVideoBlock。
     */
    private addVideoBlineAS;
    clearnSsrcWithMid(mid: string, direction: RtpTransceiverDirection): ASdpBuilder;
    private clearSSRC;
}
//# sourceMappingURL=ASdpBuilder.d.ts.map