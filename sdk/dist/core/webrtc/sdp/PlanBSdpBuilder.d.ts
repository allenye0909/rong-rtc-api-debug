import { IRCTrackBitrate } from '../../interfaces';
import ASdpBuilder from './ASdpBuilder';
export default class PlanBSdpBuilder extends ASdpBuilder {
    readonly SDP: string;
    constructor(SDP: string);
    /**
     * 它采用 SDP 标头和音频和视频流并将它们连接到一个字符串中
     * @returns SDP 标头和音频和视频流的字符串。
     */
    stringify(): string;
    /**
     * @overwrite 因为 Plan-b 设置是针对整个 m=audio ，所以不需要单独设置
     */
    setAudioBitrateWithStreamId(bitrate: IRCTrackBitrate, streamId: string): ASdpBuilder;
    /**
     * @overwrite 因为 Plan-b 设置是针对整个 m=video ，所以不需要单独设置
     */
    setVideoBitrateWithStreamId(bitrate: IRCTrackBitrate, streamId: string): ASdpBuilder;
}
//# sourceMappingURL=PlanBSdpBuilder.d.ts.map