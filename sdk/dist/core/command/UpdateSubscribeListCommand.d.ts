import { RCRTCCode } from '../enums/RCRTCCode';
import { ISubscribeAttr } from '../interfaces';
import { Invoker } from '../Invoker';
import { IPushOtherRooms, IRTCReqHeader } from '../service';
import { Store } from '../Store';
import { RCRemoteTrack } from '../tracks/RCRemoteTrack';
import RCRTCPeerConnection from '../webrtc/RCRTCPeerConnection';
import { BaseCommand } from './BaseCommand';
export declare type SubscribehookRes = {
    pc: RCRTCPeerConnection;
    pushOtherRooms: IPushOtherRooms[];
    headers: IRTCReqHeader;
};
export declare type Subscribehook = (tracks: (RCRemoteTrack | ISubscribeAttr)[]) => SubscribehookRes;
export declare class UpdateSubscribeListCommand extends BaseCommand<{
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
//# sourceMappingURL=UpdateSubscribeListCommand.d.ts.map