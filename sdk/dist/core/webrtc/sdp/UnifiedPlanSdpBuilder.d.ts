import ASdpBuilder from './ASdpBuilder';
export default class UnifiedPlanSdpBuilder extends ASdpBuilder {
    readonly SDP: string;
    constructor(SDP: string);
    /**
     * 它采用 SDP 标头和音频和视频流并将它们连接到一个字符串中
     * @returns SDP 标头和音频和视频流的字符串。
     */
    stringify(): string;
}
//# sourceMappingURL=UnifiedPlanSdpBuilder.d.ts.map