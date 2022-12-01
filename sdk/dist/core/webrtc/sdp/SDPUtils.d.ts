interface ssrcMedia {
    ssrc: number;
    attribute?: string;
    value?: string;
}
interface Msid {
    stream: string;
    track: string;
}
interface mline {
    kind: string;
    port: number;
    protocol: string;
    fmt: string;
}
export default class SDPUtils {
    static splitSections(blob: string): string[];
    /**
     * 它需要一个 SDP 文本块并返回一个仅包含媒体部分的 SDP 文本数组
     * @param {string} blob - 您要解析的 SDP 字符串。
     * @returns 字符串数组。
     */
    static getMediaSections(blob: string): string[];
    static parseExtmap(line: string): {
        id: number;
        direction: string;
        uri: string;
    };
    static splitLines(blob: string): string[];
    /**
     * 它接受一个媒体部分并返回一个对象，其中包含媒体部分的种类、端口、协议和格式
     * @param {string} mediaSection - SDP的媒体部分。
     * @returns 具有以下属性的对象：
     *   kind：媒体的类型（音频、视频等）
     *   端口：端口号
     *   协议：使用的协议
     *   fmt：媒体的格式
     */
    static parseMLine(mediaSection: string): mline;
    static matchPrefix(blob: string, prefix: string): string[];
    /**
     * 它从 SDP 媒体部分解析 msid 属性
     * @param {string} mediaSection - SDP的媒体部分。
     * @returns 具有两个属性的对象：流和轨道。
     */
    static parseMsid(mediaSection: string): Msid;
    /**
     * 它接受一个字符串并返回一个对象
     * @param {string} line - 我们正在解析的 SDP 行。
     */
    static parseSsrcMedia(line: string): ssrcMedia;
    /**
     * 它从 SDP 的媒体部分返回中间值
     * @param {string} mediaSection - SDP的媒体部分。
     * @returns 媒体部分的中间。
     */
    static getMid(mediaSection: string): string | undefined;
}
export {};
//# sourceMappingURL=SDPUtils.d.ts.map