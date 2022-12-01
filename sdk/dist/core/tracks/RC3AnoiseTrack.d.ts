export default class RC3AnoiseTrack {
    static workletModule: string;
    static workletWasm: string;
    static isOpen: boolean;
    /**
     * 该函数接受一个布尔值作为参数，如果没有传递参数，该函数将默认为 true
     * @param {boolean} [isOpen=true] - 轨道是否开放。
     */
    static setStatus(isOpen?: boolean): void;
    /**
     * 它设置 worklet 模块和 wasm。
     * @param {string} module - 将用于创建工作集的模块的名称。
     * @param {string} wasm - Rust 编译器生成的 wasm 文件。
     */
    static setWroklet(module: string, wasm: string): void;
    /**
     * 它创建一个 AudioContext，从输入流创建一个 MediaStreamSource，
     * 创建一个 MediaStreamDestination，创建一个 AudioWorkletNode，并将节点连接在一起。
     * @param {MediaStream} audioStream - 媒体流
     * @returns 一个媒体流对象。
     */
    static transformStreamTrack(audioStream: MediaStream): Promise<{
        track: MediaStreamTrack;
        stop: Function;
    }>;
}
//# sourceMappingURL=RC3AnoiseTrack.d.ts.map