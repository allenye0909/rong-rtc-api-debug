import { RCStreamType } from '../../enums/inner/RCStreamType';
import { RCRTCCode } from '../../enums/RCRTCCode';
import { RCLocalTrack } from '../../tracks/RCLocalTrack';
import { RCRemoteTrack } from '../../tracks/RCRemoteTrack';
import IStatParser from '../stat-parser/IStatParser';
export declare type ISdpSemantics = 'plan-b' | 'unified-plan';
export declare enum SdpSemantics {
    PLANB = "plan-b",
    UNIFIEDPLAN = "unified-plan"
}
export declare enum RtpTransceiverDirection {
    SENDONLY = "sendonly",
    RECVONLY = "recvonly",
    INACTIVE = "inactive"
}
export interface IOfferInfo {
    type: 'offer';
    sdp: string;
    semantics: ISdpSemantics;
}
export declare type OutboundVideoInfo = {
    trackId: string;
    simulcast: RCStreamType;
    resolution: string;
};
export declare abstract class ASdpStrategy {
    protected _peer: RTCPeerConnection;
    private static _sdpSemantics;
    /**
     * 设置指定的 SDP 协议版本
     * @param sdpSemantics 优先版本
     */
    static setSdpSemantics(sdpSemantics: ISdpSemantics): void;
    /**
     * 获取使用的 SDP 协议版本
     */
    static getSdpSemantics(): ISdpSemantics;
    protected _outboundStreams: {
        [msid: string]: MediaStream;
    };
    constructor(_peer: RTCPeerConnection);
    getOutboundVideoInfo(): OutboundVideoInfo[];
    setRemoteAnswer(sdp: string): Promise<RCRTCCode>;
    abstract updateRecvTransceiverMap(trackId: string, transceiver: RTCRtpTransceiver): void;
    abstract setBitrate(max: number, min: number, start?: number): void;
    abstract addLocalTrack(track: RCLocalTrack): void;
    abstract removeLocalTrack(track: RCLocalTrack): void;
    abstract updateSubRemoteTracks(remoteTracks: RCRemoteTrack[]): void;
    abstract createOffer(iceRestart: boolean): Promise<IOfferInfo>;
    getStatParsr(rtcPeerConn: RTCPeerConnection, sdpSemantics: string, currentUserId: string): IStatParser | null;
    protected resetSdp(sdp: string): string;
}
//# sourceMappingURL=ASdpStrategy.d.ts.map