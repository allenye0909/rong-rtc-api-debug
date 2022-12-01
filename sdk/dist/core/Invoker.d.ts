import { BaseCommand } from './command/BaseCommand';
import { RCRTCCode } from './enums/RCRTCCode';
import PolarisReporter from './PolarisReporter';
import { RCMediaService } from './service';
import { ReadableStore, Store } from './Store';
import RCRTCPeerCManager from './webrtc/RCRTCPeerCManager';
import { RTCContext } from './codec/RTCContext';
import { RTCMode } from './enums/RTCMode';
export declare class BaseInvoker<STORE> {
    /**
     * 内存数据管理实例
     */
    protected readonly _store: STORE;
    /**
     * 命令终止时返回的错误码定义
     */
    private abortCode;
    constructor(
    /**
     * 内存数据管理实例
     */
    _store: STORE, 
    /**
     * 命令终止时返回的错误码定义
     */
    abortCode: RCRTCCode);
    private _queue;
    private _busy;
    private _next;
    private _execute;
    push<R>(command: BaseCommand<R, STORE>): Promise<R>;
    private _isDestroyed;
    /**
     * 查找出 RCCommandKind.AsyncCommand 类型的 Command，并将其从队列中删除
     * 并使用最新的一次 Command 接管它的 resolve & reject
     * @param resolve
     * @param reject
     * @returns 具有两个属性的对象，resolve 和 reject。
     */
    private commandOffset;
    isDestroyed(): boolean;
    destroy(): void;
}
/**
 * 房间任务队列管理
 */
export declare class Invoker extends BaseInvoker<Store> {
    constructor(context: RTCContext, service: RCMediaService, peerMrg: RCRTCPeerCManager, roomId: string, crtUserId: string, mode: RTCMode, reporter: PolarisReporter, isUpgrade?: boolean, isMainRoom?: boolean);
    /**
     * 获取 store 存储实例，返回值类型 `ReadableStore`，避免非 command 定义中修改内存
     */
    get store(): ReadableStore;
    destroy(): void;
}
//# sourceMappingURL=Invoker.d.ts.map