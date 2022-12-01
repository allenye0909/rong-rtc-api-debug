import { IInnerRCRTCStateReport } from '../../interfaces';
export default interface IStatParser {
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
}
//# sourceMappingURL=IStatParser.d.ts.map