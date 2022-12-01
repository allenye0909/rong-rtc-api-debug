import { RCRTCMessageType } from '../enums/inner/RCRTCMessageType';
import { IPublishedResource } from '../interfaces';
import { Invoker } from '../Invoker';
import { ICDNUris } from '../service';
import { Store } from '../Store';
import { RCRemoteAudioTrack, RCRemoteTrack, RCRemoteVideoTrack } from '../tracks/RCRemoteTrack';
import { BaseCommand, CommandPriority } from './BaseCommand';
import { Subscribehook } from './UpdateSubscribeListCommand';
export declare type ResourceMsgContent = {
    /**
     * 旧版本兼容参数，当收到非 `RTCMessageName.TOTAL_CONTENT_RESOURCE` 时：
     * * ignore 值为 `true` 表示该消息由 signal server 向旧版本 RTCLib 提供的兼容消息，无需处理
     * * 否则认为该消息是由旧版本 RTCLib 主动发出的增量变更消息，需要处理
     */
    ignore?: boolean;
    /**
     * 发布到房间内的资源列表，`RTCMessageName.TOTAL_CONTENT_RESOURCE` 消息携带全量数据，否则为增量数据
     */
    uris: IPublishedResource[];
    cdn_uris?: ICDNUris[];
};
export declare class ParseRemoteResCommand extends BaseCommand<void> {
    private msgContent;
    private messageType;
    private senderId;
    private subhook;
    private callback;
    constructor(msgContent: ResourceMsgContent, messageType: RCRTCMessageType.PUBLISH | RCRTCMessageType.UNPUBLISH | RCRTCMessageType.MODIFY | RCRTCMessageType.TOTAL_CONTENT_RESOURCE, senderId: string, subhook: Subscribehook, callback: {
        onTrackPublish: (tracks: RCRemoteTrack[]) => void;
        onTrackUnublish: (tracks: RCRemoteTrack[]) => void;
        onAudioMute: (track: RCRemoteAudioTrack) => void;
        onVideoMute: (track: RCRemoteVideoTrack) => void;
        onCDNEnableChange: (bool: boolean) => void;
    });
    get priority(): CommandPriority;
    execute(store: Store, invoker: Invoker): Promise<void>;
}
//# sourceMappingURL=ParseRemoteResCommand.d.ts.map