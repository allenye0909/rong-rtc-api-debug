import { RCCommandKind } from '../enums/RCCommandKind';
import { RCRTCCode } from '../enums/RCRTCCode';
import { IPKInfo } from '../interfaces';
import { Invoker } from '../Invoker';
import { RCLivingPKHandler } from '../room/RCLivingPKHandler';
import RCLivingRoom from '../room/RCLivingRoom';
import { Store } from '../Store';
import { BaseCommand } from './BaseCommand';
import { ExchangeHooks } from './ExchangeWithPushOtherRoomCommand';
export declare class LeaveOtherRoomCommand extends BaseCommand<{
    code: RCRTCCode;
}> {
    private pkHandler;
    private room;
    private _PKInfo;
    private hooks;
    private _joinedPKRooms;
    private isQuitPK?;
    constructor(pkHandler: RCLivingPKHandler, room: RCLivingRoom, _PKInfo: IPKInfo, hooks: ExchangeHooks, _joinedPKRooms: {
        [roomId: string]: RCLivingRoom;
    }, isQuitPK?: boolean | undefined);
    get kind(): RCCommandKind;
    /**
   * 结束跨房间连麦
   * @param roomId 需要结束连麦的房间 roomId
   */
    private quitRoomPK;
    execute(store: Store, invoker: Invoker): Promise<{
        code: RCRTCCode;
    }>;
}
//# sourceMappingURL=LeaveOtherRoomCommand.d.ts.map