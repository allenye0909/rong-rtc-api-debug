import { RCRTCCode } from '../../enums/RCRTCCode';
import { RCLocalTrack } from '../../tracks/RCLocalTrack';
import { RCRemoteTrack } from '../../tracks/RCRemoteTrack';
import { IOfferInfo, ASdpStrategy } from './ASdpStrategy';
export declare class PlanBStrategy extends ASdpStrategy {
    private senders;
    private _maxBitrate?;
    private _minBitrate?;
    private _startBitrate?;
    private _localTracks;
    addLocalTrack(track: RCLocalTrack): void;
    removeLocalTrack(track: RCLocalTrack): void;
    updateSubRemoteTracks(remoteTracks: RCRemoteTrack[]): void;
    updateRecvTransceiverMap(trackId: string, transceiver: RTCRtpTransceiver): void;
    /**
     * 指定上行码率范围
     * @param maxBitrate
     * @param minBitrate
     * @param startBitrate
     */
    setBitrate(maxBitrate: number, minBitrate: number, startBitrate?: number): void;
    createOffer(iceRestart: boolean): Promise<IOfferInfo>;
    setRemoteAnswer(sdp: string): Promise<RCRTCCode>;
    protected resetSdp(sdp: string): string;
}
//# sourceMappingURL=PlanBStrategy.d.ts.map