import { Invoker } from '../Invoker';
import { RCLivingPKHandler } from '../room/RCLivingPKHandler';
import { IPushOtherRooms, IRTCReqHeader } from '../service/interface';
import { Store } from '../Store';
import { BaseCommand } from './BaseCommand';
export declare type ExchangeHooksRes = {
    headers: IRTCReqHeader;
    pushOtherRooms: IPushOtherRooms[];
};
export declare type ExchangeHooks = (pcName: string) => ExchangeHooksRes;
export declare class ExchangeWithPushOtherRoomCommand extends BaseCommand<void> {
    private roomId;
    private hooks;
    private roomPKHandler?;
    constructor(roomId: string, hooks: ExchangeHooks, roomPKHandler?: RCLivingPKHandler | undefined);
    /**
     * 携带 pushOtherRooms 与 mediaServer 重新交互
     */
    private _exchangeWithPushOtherRoom;
    execute(store: Store, invoker: Invoker): Promise<void>;
}
//# sourceMappingURL=ExchangeWithPushOtherRoomCommand.d.ts.map