import { RCRTCPingResult } from '../enums/RCRTCPingResult';
import { RTCContext } from '../codec/RTCContext';
import { RTCMode } from '../enums/RTCMode';
/**
 * RTCPing 类，在下发的 ping 超时时间 _offlineKickTime 内，未能 Ping 成功则认为 ping 失败
 */
export default class Pinger {
    private readonly _roomId;
    private readonly _roomMode;
    private readonly _context;
    private readonly _gap;
    private readonly _offlineKickTime;
    /**
     * 记录最近一次成功的 Ping 时间戳
     */
    private _latestTimestamp;
    constructor(_roomId: string, _roomMode: RTCMode, _context: RTCContext, _gap?: number, _offlineKickTime?: number);
    /**
     * Ping 失败回调，当失败次数超出 `MAX_FAILED` 时，该方法将被调用
     */
    onFailed?(byServer: boolean): void;
    /**
     * 单次 ping 结果
     */
    onPingResult?(result: RCRTCPingResult): void;
    private _started;
    private _timer;
    /**
     * 启动 Ping
     */
    start(): void;
    private _sendPing;
    private _checkAlive;
    stop(): void;
}
//# sourceMappingURL=Pinger.d.ts.map