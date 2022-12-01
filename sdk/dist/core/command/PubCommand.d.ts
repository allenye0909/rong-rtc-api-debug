import { BaseCommand } from './BaseCommand';
import { IMutilPeerC, IPublishAttrs, IPubSuccessRes } from '../interfaces';
import { Store } from '../Store';
import { RCLocalTrack } from '../tracks/RCLocalTrack';
import { IPushOtherRooms, IRTCReqHeader } from '../service';
import { Invoker } from '../Invoker';
export declare type PubhookPeerItem = IMutilPeerC & {
    headers: IRTCReqHeader;
};
export declare type PubhookRes = {
    plist: PubhookPeerItem[];
    pushOtherRooms: IPushOtherRooms[];
};
export declare type Pubhook = (tracks: (RCLocalTrack | IPublishAttrs)[]) => PubhookRes;
/**
 * 资源发布命令
 */
export declare class PubCommand extends BaseCommand<IPubSuccessRes> {
    private tracks;
    private pubhook;
    constructor(tracks: (RCLocalTrack | IPublishAttrs)[], pubhook: Pubhook);
    /**
     * 从 pc 移除当次发布失败的资源
     */
    private _removePubFailedTracks;
    private __publish;
    /**
     * 处理批量 /exhcange 的返回数据，作为一次 publish 接口返回
     * @param pubResList 每一个 tag 的发布结果[]
     */
    private _mergePublishRes;
    execute(store: Store, invoker: Invoker): Promise<IPubSuccessRes>;
}
//# sourceMappingURL=PubCommand.d.ts.map