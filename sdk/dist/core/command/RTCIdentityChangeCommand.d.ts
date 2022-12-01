import { ErrorCode } from '@rongcloud/engine';
import { RCLivingType } from '../enums/RCLivingType';
import { BaseInvoker } from '../Invoker';
import { Store } from '../Store';
import { BaseCommand } from './BaseCommand';
import { IJoinRTCRoomData } from '../codec/interface';
export declare class RTCIdentityChangeCommand extends BaseCommand<{
    code: ErrorCode;
    data?: IJoinRTCRoomData;
}> {
    private livingType;
    constructor(livingType: RCLivingType);
    execute(store: Store, invoker: BaseInvoker<Store>): Promise<{
        code: ErrorCode;
        data?: IJoinRTCRoomData;
    }>;
}
//# sourceMappingURL=RTCIdentityChangeCommand.d.ts.map