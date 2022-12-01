import { IAudioLevelChangeHandler } from '../interfaces';
import RCAbstractRoom from './RCAbstractRoom';
import RCAudienceLivingRoom from './RCAudienceLivingRoom';
export default class RCAudioLevelReport {
    private readonly _room;
    private _audioLevelChangeHandler;
    private _timer;
    constructor(_room: RCAbstractRoom | RCAudienceLivingRoom);
    /**
     * 通知业务端音量 > 0 的数据，数组每一项包含 track、audioLevel
     */
    private _audioLevelReport;
    onAudioLevelChange(handler: IAudioLevelChangeHandler | null, gap: number): void;
    clearAudioLevelReportTimer(): void;
}
//# sourceMappingURL=RCAudioLevelReport.d.ts.map