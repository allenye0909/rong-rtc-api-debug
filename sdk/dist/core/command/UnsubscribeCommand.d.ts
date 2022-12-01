import { RCRTCCode } from '../enums/RCRTCCode';
import { ISubscribeAttr } from '../interfaces';
import { Invoker } from '../Invoker';
import { Store } from '../Store';
import { RCRemoteTrack } from '../tracks/RCRemoteTrack';
import { BaseCommand } from './BaseCommand';
import { Subscribehook } from './UpdateSubscribeListCommand';
export declare class UnsubscribeCommand extends BaseCommand<{
    code: RCRTCCode;
    failedList?: ISubscribeAttr[];
}> {
    private tracks;
    private subhook;
    constructor(tracks: RCRemoteTrack[], subhook: Subscribehook);
    execute(store: Store, invoker: Invoker): Promise<{
        code: RCRTCCode;
        failedList?: ISubscribeAttr[];
    }>;
}
//# sourceMappingURL=UnsubscribeCommand.d.ts.map