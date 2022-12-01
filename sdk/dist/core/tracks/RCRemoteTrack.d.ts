import { RCTrack } from './RCTrack';
export declare class RCRemoteTrack extends RCTrack {
    constructor(tag: string, userId: string, kind: 'audio' | 'video', roomId?: string);
    /**
     * 根据房间数据更新状态
     * @param value
     */
    __innerSetRemoteMuted(bool: boolean): void;
    private _isSubscribed;
    __innerSetSubscribed(bool: boolean): void;
    /**
     * 查看是否已订阅了该远端资源
     * @returns
     */
    isSubscribed(): boolean;
}
export declare class RCRemoteAudioTrack extends RCRemoteTrack {
    constructor(tag: string, userId: string, roomId?: string);
}
export declare class RCRemoteVideoTrack extends RCRemoteTrack {
    constructor(tag: string, userId: string, roomId?: string);
    private _isSubTiny;
    __innerSetIsTinyTrack(bool: boolean): void;
    /**
     * 是否订阅的小流
     */
    isSubTiny(): boolean;
}
//# sourceMappingURL=RCRemoteTrack.d.ts.map