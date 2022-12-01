import { RCLinkedListPoint } from '../enums/RCLinkedListPoint';
import { RCRTCCode } from '../enums/RCRTCCode';
import { ISubscribeAttr } from '../interfaces';
import { Invoker } from '../Invoker';
import { Store } from '../Store';
import { RCRemoteTrack } from '../tracks/RCRemoteTrack';
import { AsyncCommand, AsyncCommandCallback } from './AsyncCommand';
import { Subscribehook } from './UpdateSubscribeListCommand';
export declare class AsyncUnsubscribeCommand extends AsyncCommand<{
    code: RCRTCCode;
    failedList?: ISubscribeAttr[];
}> {
    private tracks;
    private subhook;
    private callbacks;
    constructor(tracks: RCRemoteTrack[], subhook: Subscribehook, callbacks: AsyncCommandCallback, state?: RCLinkedListPoint);
    execute(store: Store, invoker: Invoker): Promise<{
        code: RCRTCCode;
        failedList?: ISubscribeAttr[];
    }>;
    /**
     * 如果当前节点的状态为 MIDDLE，则返回 store 的订阅属性列表。否则，返回存储的订阅属性列表
     * @param {Store} store
     * @returns ISubscribeAttr 对象的数组。
     */
    private getSubscribedList;
}
//# sourceMappingURL=AsyncUnsubscribeCommand.d.ts.map