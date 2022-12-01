import { RCRTCCode } from '../enums/RCRTCCode';
import { BaseCommand } from './BaseCommand';
import { Store } from '../Store';
import { ErrorCode } from '@rongcloud/engine';
import { RCLivingType } from '../enums/RCLivingType';
import { Invoker } from '../Invoker';
import { RCCommandKind } from '../enums/RCCommandKind';
import { RTCMode } from '../enums/RTCMode';
import { RTCJoinType } from '../enums/RTCJoinType';
import { IJoinRTCRoomData, IRTCUserData } from '../codec/interface';
/**
 * 资源发布命令
 */
export declare class JoinRoomCommand extends BaseCommand<{
    code: ErrorCode | RCRTCCode;
    data?: IJoinRTCRoomData;
}> {
    private readonly roomId;
    private readonly roomType;
    private readonly joinType?;
    private readonly livingType?;
    private readonly innerUserDatas?;
    private readonly outerUserDatas?;
    constructor(roomId: string, roomType: RTCMode, joinType?: RTCJoinType | undefined, livingType?: RCLivingType | undefined, innerUserDatas?: IRTCUserData | undefined, outerUserDatas?: IRTCUserData | undefined);
    get kind(): RCCommandKind;
    execute(store: Store, invoker: Invoker): Promise<{
        code: ErrorCode | RCRTCCode;
        data?: IJoinRTCRoomData;
    }>;
}
//# sourceMappingURL=JoinRoomCommand.d.ts.map