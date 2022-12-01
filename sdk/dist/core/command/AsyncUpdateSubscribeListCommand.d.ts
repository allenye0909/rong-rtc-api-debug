import { RCLinkedListPoint } from '../enums/RCLinkedListPoint';
import { RCRTCCode } from '../enums/RCRTCCode';
import { ISubscribeAttr } from '../interfaces';
import { Invoker } from '../Invoker';
import { Store } from '../Store';
import { RCRemoteTrack } from '../tracks/RCRemoteTrack';
import { AsyncCommand, AsyncCommandCallback } from './AsyncCommand';
import { Subscribehook } from './UpdateSubscribeListCommand';
/**
 * 更新订阅关系，为强制更新订阅关系，传入的 Tracks 都会被订阅
 */
export declare class AsyncUpdateSubscribeListCommand extends AsyncCommand<{
    code: RCRTCCode;
    failedList?: ISubscribeAttr[];
}> {
    private readonly tracks;
    private subhook;
    private callbacks;
    constructor(tracks: (RCRemoteTrack | ISubscribeAttr)[], subhook: Subscribehook, callbacks: AsyncCommandCallback, state?: RCLinkedListPoint);
    execute(store: Store, invoker: Invoker): Promise<{
        code: RCRTCCode;
        failedList?: ISubscribeAttr[];
    }>;
}
//# sourceMappingURL=AsyncUpdateSubscribeListCommand.d.ts.map