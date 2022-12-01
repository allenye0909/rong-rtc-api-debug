import { IRuntime } from '@rongcloud/engine';
import { IRCRTCInitOptions } from '../interfaces';
import RCMediaService from '../service/RCMediaService';
import RCAbstractRoom from './RCAbstractRoom';
import { RTCContext } from '../codec/RTCContext';
import { RTCMode } from '../enums/RTCMode';
/**
 * 普通音视频房间
 */
export default class RCRTCRoom extends RCAbstractRoom {
    constructor(context: RTCContext, runtime: IRuntime, roomId: string, service: RCMediaService, initOptions: IRCRTCInitOptions, isUpgrade?: boolean, isMainRoom?: boolean, 
    /**
     * 是否使用多 peerConnection
     */
    useMutilPeerC?: boolean, _clientSessionId?: string, roomType?: RTCMode);
}
//# sourceMappingURL=RCRTCRoom.d.ts.map