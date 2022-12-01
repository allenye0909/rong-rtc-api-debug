import { AbsCodec } from '@rongcloud/engine';
import { RTCMode } from '../enums/RTCMode';
import { RTCJoinType } from '../enums/RTCJoinType';
import { RTCKeyMaps } from './proto';
import { IRTCUserData, IJoinRTCRoomData } from './interface';
export declare const encodeRtcInput: (codec: AbsCodec<RTCKeyMaps>, roomType: RTCMode, broadcastType?: number, joinType?: RTCJoinType, innerUserDatas?: IRTCUserData, outerUserDatas?: IRTCUserData) => ArrayBuffer | {
    roomType?: any;
    broadcastType?: any;
    extraInnerData?: any;
    needSysChatroom?: any;
    identityChangeType?: any;
    joinType?: any;
    innerDatas?: any;
    outerDatas?: any;
};
export declare const decodeRtcUserListOutput: (codec: AbsCodec<RTCKeyMaps>, buffer: Uint8Array | string) => IJoinRTCRoomData;
//# sourceMappingURL=rtc-helper.d.ts.map