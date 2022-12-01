import { Invoker } from '../Invoker';
import { Store } from '../Store';
import { RCLocalTrack } from '../tracks/RCLocalTrack';
import { BaseCommand } from './BaseCommand';
export declare class LocalTrackMuteCommand extends BaseCommand<void> {
    private localTrack;
    constructor(localTrack: RCLocalTrack);
    execute(store: Store, invoker: Invoker): Promise<void>;
}
//# sourceMappingURL=LocalTrackMuteCommand.d.ts.map