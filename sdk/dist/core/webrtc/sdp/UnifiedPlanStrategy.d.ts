import { RCRTCCode } from '../../enums/RCRTCCode';
import { RCLocalTrack } from '../../tracks/RCLocalTrack';
import { RCRemoteTrack } from '../../tracks/RCRemoteTrack';
import { ASdpStrategy, IOfferInfo } from './ASdpStrategy';
export declare class UnifiedPlanStrategy extends ASdpStrategy {
    private _sendTransceiver;
    setBitrate(max: number, min: number, start?: number): void;
    private _localTracks;
    addLocalTrack(track: RCLocalTrack): void;
    removeLocalTrack(track: RCLocalTrack): void;
    private _recvAudio;
    private _recvVideo;
    private _recvTransceiver;
    private _subedTracks;
    updateRecvTransceiverMap(trackId: string, transceiver: RTCRtpTransceiver): void;
    updateSubRemoteTracks(tracks: RCRemoteTrack[]): void;
    protected midMsid: {
        [key: string]: string;
    };
    createOffer(iceRestart: boolean): Promise<IOfferInfo>;
    setRemoteAnswer(sdp: string): Promise<RCRTCCode>;
    protected resetOfferSdp(sdp: string): string;
    protected resetAnswerSdp(sdp: string): string;
}
//# sourceMappingURL=UnifiedPlanStrategy.d.ts.map