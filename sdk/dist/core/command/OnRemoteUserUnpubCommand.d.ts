import { Invoker } from '../Invoker';
import { Store } from '../Store';
import { RCRemoteTrack } from '../tracks/RCRemoteTrack';
import { BaseCommand } from './BaseCommand';
import { Subscribehook } from './UpdateSubscribeListCommand';
export declare class OnRemoteUserUnpubCommand extends BaseCommand<void> {
    private subhook;
    private tracks;
    private onTrackUnpublish;
    constructor(subhook: Subscribehook, tracks: RCRemoteTrack[], onTrackUnpublish: (tracks: RCRemoteTrack[]) => void);
    execute(store: Store, invoker: Invoker): Promise<void>;
}
//# sourceMappingURL=OnRemoteUserUnpubCommand.d.ts.map