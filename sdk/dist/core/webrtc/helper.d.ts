export declare const getBitrate: (dTime: number, dBytes: number) => number;
/**
 * 限制浮点数小数位的有效位数
 * @param value
 * @param fractionDigits 小数点后保留的有效数字位数
 */
export declare const fixed: (value: number, fractionDigits?: number) => number;
/**
 * 处理音量 * 100，并向下取整
 */
export declare const handleAudioLevel: (audioLevel: number, factor?: number) => number;
/**
 * 计算丢包率
 * @param packetsLost 当前统计丢包总数
 * @param packets 当前统计总包数
 * @param prePacketsLost 前次统计丢包总数
 * @param prePackets 前次统计总包数
 */
export declare const getPacketsLostRate: (packetsLost: number, packets: number, prePacketsLost?: number, prePackets?: number) => number;
export declare const senderHasRemoteData: (sender: {
    [key: string]: any;
}) => boolean;
export declare const senderHasMediaData: (sender: {
    [key: string]: any;
}) => boolean;
//# sourceMappingURL=helper.d.ts.map