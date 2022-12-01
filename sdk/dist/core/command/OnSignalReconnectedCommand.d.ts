import { RCLivingType } from '../enums/RCLivingType';
import { Invoker } from '../Invoker';
import { Store } from '../Store';
import { RCRemoteAudioTrack, RCRemoteTrack, RCRemoteVideoTrack } from '../tracks/RCRemoteTrack';
import { BaseCommand, CommandPriority } from './BaseCommand';
import { Subscribehook } from './UpdateSubscribeListCommand';
import { IJoinRTCRoomData } from '../codec/interface';
export declare type ReconnectedCommandCallback = {
    onPeerClosed: () => void;
    onUserJoin: (userIds: string[]) => void;
    onUserLeave: (userIds: string[]) => void;
    onTrackPublish: (tracks: RCRemoteTrack[]) => void;
    onTrackUnpublish: (tracks: RCRemoteTrack[]) => void;
    onAudioMuteChange: (track: RCRemoteAudioTrack) => void;
    onVideoMuteChange: (track: RCRemoteVideoTrack) => void;
    onCDNEnableChange: (bool: boolean) => void;
};
export declare class OnSignalReconnectedCommand extends BaseCommand<{
    data: IJoinRTCRoomData | undefined;
} | void> {
    private subhook;
    private callbacks;
    private livingType?;
    constructor(subhook: Subscribehook, callbacks: ReconnectedCommandCallback, livingType?: RCLivingType | undefined);
    /**
     * @override
     */
    get priority(): CommandPriority;
    execute(store: Store, invoker: Invoker): Promise<{
        data: IJoinRTCRoomData | undefined;
    } | void>;
    /**
     * 主播端断线重连后，需更新内存中的 CDN 数据
     * 判断房间内 CDN 状态是否和内存数据一致，不一致时需通知到客户端
     */
    private executeInLivingRoom;
}
//# sourceMappingURL=OnSignalReconnectedCommand.d.ts.map