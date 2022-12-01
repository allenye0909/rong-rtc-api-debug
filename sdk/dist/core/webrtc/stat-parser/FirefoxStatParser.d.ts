import { IInnerRCRTCStateReport } from '../../interfaces';
import AbstractStatParser from './AbstractStatParser';
export default class RTCReportParser extends AbstractStatParser {
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
//# sourceMappingURL=FirefoxStatParser.d.ts.map