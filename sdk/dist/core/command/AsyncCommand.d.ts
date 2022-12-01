import { RCCommandKind } from '../enums/RCCommandKind';
import { RCLinkedListPoint } from '../enums/RCLinkedListPoint';
import { RCRTCCode } from '../enums/RCRTCCode';
import { ISubscribeAttr } from '../interfaces';
import { Store } from '../Store';
import { RCRemoteTrack } from '../tracks/RCRemoteTrack';
import { BaseCommand } from './BaseCommand';
export declare type taskCompletedParams = {
    code: RCRTCCode;
    subscribe?: ISubscribeAttr[];
    unsubscribe?: ISubscribeAttr[];
    failedList?: ISubscribeAttr[];
};
export declare type AsyncCommandCallback = {
    onTaskCompleted: (content: taskCompletedParams) => void;
};
export declare abstract class AsyncCommand<RES, STORE = Store> extends BaseCommand<RES> {
    protected state: RCLinkedListPoint;
    constructor(state?: RCLinkedListPoint);
    get kind(): RCCommandKind;
    /**
     * `public setState（状态：RCLinkedListPoint）：void`
     *
     * 该函数是公共的，它被称为 setState，它接受一个称为 state 的参数，它什么也不返回
     * @param {RCLinkedListPoint} state - 链表的状态。
     */
    setState(state: RCLinkedListPoint): void;
    static AsyncSubscribeTasks: (RCRemoteTrack | ISubscribeAttr)[];
    static AsyncUnsubscribeTasks: (RCRemoteTrack | ISubscribeAttr)[];
    static AsyncUpdateSubscribeTasks: (RCRemoteTrack | ISubscribeAttr)[];
    /**
     * 该功能用于向房间发送消息，任务完成时向房间发送消息
     * @param {Store} store - 店铺
     * @param {RCRTCCode} code - 任务的状态码，即任务的状态码。
     * @param {ISubscribeAttr[]} tracks - 要订阅的Tracks
     */
    protected pickoutSubscribed(subscribedTracks: ISubscribeAttr[], originTracks: ISubscribeAttr[]): {
        subscribe: ISubscribeAttr[];
        unsubscribe: ISubscribeAttr[];
    };
    private calcSubscribeList;
    /**
     * 它需要一个轨道数组并返回一个轨道数组。
     * @param {(RCRemoteTrack | ISubscribeAttr)[]} tracks - (RCRemoteTrack | ISubscribeAttr)[]
     * @returns 具有 track 属性的对象数组。
     */
    protected formateTrack(tracks: (RCRemoteTrack | ISubscribeAttr)[]): ISubscribeAttr[];
    /**
     * 它检查 Track 是否已经在订阅列表中。
     * @param {ISubscribeAttr} track - ISubscribeAttr：要添加到列表中的 track
     * @param {ISubscribeAttr[]} tracks - 需要订阅的 track 数组
     */
    private trackInSubscribeList;
}
//# sourceMappingURL=AsyncCommand.d.ts.map