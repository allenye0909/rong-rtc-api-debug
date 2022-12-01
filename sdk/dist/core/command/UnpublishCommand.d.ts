import { RCCommandKind } from '../enums/RCCommandKind';
import { IPublishAttrs, IPubSuccessRes } from '../interfaces';
import { Invoker } from '../Invoker';
import { IPushOtherRooms, IRTCReqHeader } from '../service/interface';
import { Store } from '../Store';
import { RCLocalTrack } from '../tracks/RCLocalTrack';
import { BaseCommand } from './BaseCommand';
export declare type UnpubhookRes = {
    pushOtherRooms: IPushOtherRooms[];
    headers: IRTCReqHeader;
};
export declare type Unpubhook = (tracks: (RCLocalTrack | IPublishAttrs)[], pcName: string) => UnpubhookRes;
export declare class UnpublishCommand extends BaseCommand<IPubSuccessRes> {
    private tracks;
    private unpubhook;
    constructor(tracks: RCLocalTrack[], unpubhook: Unpubhook);
    get kind(): RCCommandKind;
    private __unpublish;
    private _mergeUnpublishRes;
    execute(store: Store, invoker: Invoker): Promise<IPubSuccessRes>;
}
//# sourceMappingURL=UnpublishCommand.d.ts.map