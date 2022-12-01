import { RCRTCCode } from '../enums/RCRTCCode';
import { ISubscribeAttr } from '../interfaces';
import { Invoker } from '../Invoker';
import { Store } from '../Store';
import { RCRemoteTrack } from '../tracks/RCRemoteTrack';
import { BaseCommand } from './BaseCommand';
import { Subscribehook } from './UpdateSubscribeListCommand';
export declare class SubscribeCommand extends BaseCommand<{
    code: RCRTCCode;
    failedList?: ISubscribeAttr[];
}> {
    private readonly tracks;
    private subhook;
    private readonly forceReq?;
    constructor(tracks: (RCRemoteTrack | ISubscribeAttr)[], subhook: Subscribehook, forceReq?: boolean | undefined);
    execute(store: Store, invoker: Invoker): Promise<{
        code: RCRTCCode;
        failedList?: ISubscribeAttr[];
    }>;
}
//# sourceMappingURL=SubscribeCommand.d.ts.map