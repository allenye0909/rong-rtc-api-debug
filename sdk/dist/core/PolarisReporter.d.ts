import { IRuntime } from '@rongcloud/engine';
import { IInnerRCRTCStateReport } from './interfaces';
import RCAbstractRoom from './room/RCAbstractRoom';
import RCAudienceLivingRoom from './room/RCAudienceLivingRoom';
import { PolarisRole } from './enums/inner/PolarisRole';
import { RTCContext } from './codec/RTCContext';
export default class PolarisReporter {
    private readonly _context;
    private readonly _runtime;
    private readonly _roomId;
    private readonly _crtRTCRoom;
    private readonly _userRole;
    constructor(_context: RTCContext, _runtime: IRuntime, _roomId: string, _crtRTCRoom: RCAbstractRoom | RCAudienceLivingRoom, _userRole?: PolarisRole);
    private _send;
    private _getClientID;
    /**
     * 小流需去掉 _tiny，小流 resourceId 为 userId_tag_mediaType_tiny
     */
    private _getRealResourceId;
    /**
     * 生成北极星上报的 trackId
     * @param resourceId userId_11_1_tiny 改为 userId_11_tiny_video
     */
    private _getPolarisTrackId;
    sendR3R4Data(data: IInnerRCRTCStateReport): Promise<boolean>;
    /**
     * 加入房间
     */
    sendR1(): void;
    /**
     * RTC 和 LIVE 发布、取消发布
     * RTC 订阅、取消订阅
     */
    sendR2(action: string, status: string, trackIds: string[]): void;
}
//# sourceMappingURL=PolarisReporter.d.ts.map