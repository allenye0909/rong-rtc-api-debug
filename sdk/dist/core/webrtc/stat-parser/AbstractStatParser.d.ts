import IStatParser from './IStatParser';
import { IInnerRCRTCStateReport } from '../../interfaces';
export default abstract class AbstractStatParser implements IStatParser {
    protected readonly _rtcPeerConn: RTCPeerConnection;
    protected readonly _sdpSemantics: string;
    protected readonly _currentUserId: string;
    constructor(_rtcPeerConn: RTCPeerConnection, _sdpSemantics: string, _currentUserId: string);
    /**
     * 最近的上行发送包数据统计
     */
    protected _latestPacketsSent: {
        [resourceId: string]: {
            packetsLost?: number;
            packetsSent?: number;
            crtPacketsSent?: number;
        };
    };
    /**
     * 最近的上行发送字节数统计
     */
    protected _latestBytesSent: {
        [resourceId: string]: {
            bytesSent: number;
            timestamp: number;
        };
    };
    /**
     * 最近的下行接收字节数统计
     */
    protected _latestBytesRecv: {
        [resourceId: string]: {
            bytesRecv: number;
            timestamp: number;
        };
    };
    /**
     * 最近的下行接收包数据统计
     */
    protected _latestPacketsRecv: {
        [resourceId: string]: {
            packetsLost: number;
            packetsRecv: number;
        };
    };
    /**
     * 更新上行码率存储，返回计算出的码率
     * @param resourceId
     * @param bytesSent 本次发送的字节数
     * @param timestamp
     * @returns bitrate
     */
    protected updateBytesSent(resourceId: string, bytesSent: number, timestamp: number): number;
    /**
     * 更新下行码率存储，返回计算出的码率
     * @param resourceId
     * @param bytesRecv
     * @param timestamp
     * @returns bitrate
     */
    protected updateBytesRecv(resourceId: string, bytesRecv: number, timestamp: number): number;
    /**
     * 更新上行丢包总数，返回计算出的丢包率
     * 计算丢包率
     * 上行数据统计中，packageLost 的统计具有延时性
     * 会导致瞬时的 packetsLost - prePacketsLost 值大于 packetsSent - prePacketsSent，从而丢包率可能大于 1
     * 因此此处计算只在 packetsLost - prePacketsLost !== 0 时计算丢包率，其他时间丢包为 0
     * packetsSent 只在 packetsLost 有变化时更新
     */
    protected updateSenderPacketsLost(resourceId: string, packetsLost: number, packetsSent: number): number;
    /**
     * 更新下行丢包总数，返回计算出的丢包率
     */
    protected updateReceiverPacketsLost(resourceId: string, packetsLost: number, packetsReceived: number): number;
    /**
     * 取消发布后，需把 _latestPacketsSent 中 key 为 resourceId 存储的数据清除掉
     */
    clearLatestpacketsSent(resourceIds: string[]): void;
    /**
     * 取消订阅后，需把 _latestPacketsRecv 中 key 为 resourceId 存储的数据清除掉
     */
    clearLatestPacketsRecv(resourceIds: string[]): void;
    parseRTCStatsReport(reports: RTCStatsReport): {
        [key: string]: any;
    };
    formatRCRTCStateReport(stats: {
        [key: string]: any;
    }): IInnerRCRTCStateReport;
    getAudioLevelList(stats: {
        [key: string]: any;
    }): {
        trackId: string;
        audioLevel: number | null;
    }[];
    /**
     * 从 offer 和 answer 的 sdp 中获取 ssrc 对应的 msid
     * @param statInfo outbound 和 inbound 对应值
     * @returns resourceId
     */
    protected getResourceIdByParseSdp(statInfo: {
        [key: string]: any;
    }): string;
    /**
     * 从 offer sdp 中查找 ssrc 对应的通道是否可用
     * @param outboundInfo
     */
    protected isValidSender(outboundInfo: {
        [key: string]: any;
    }): boolean;
    /**
     * 从 answer sdp 中查找 ssrc 对应的通道是否可用
     * @param inboundInfo
     */
    protected isValidReceiver(inboundInfo: {
        [key: string]: any;
    }): boolean;
}
//# sourceMappingURL=AbstractStatParser.d.ts.map