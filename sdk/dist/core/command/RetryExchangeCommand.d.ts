import { Invoker } from '../Invoker';
import { IPushOtherRooms, IRTCReqHeader } from '../service';
import { Store } from '../Store';
import { BaseCommand, CommandPriority } from './BaseCommand';
export declare type RetryHookRes = {
    pushOtherRooms: IPushOtherRooms[];
    headers: IRTCReqHeader;
};
export declare type RetryHook = (pcName: string) => RetryHookRes;
export declare class RetryExchangeCommand extends BaseCommand<void> {
    private pcName;
    private isPub;
    private retryHook;
    constructor(pcName: string, isPub: boolean, retryHook: RetryHook);
    get priority(): CommandPriority;
    execute(store: Store, invoker: Invoker): Promise<void>;
}
//# sourceMappingURL=RetryExchangeCommand.d.ts.map