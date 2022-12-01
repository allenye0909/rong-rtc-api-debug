import { RCRTCCode } from '../enums/RCRTCCode';
import { ISubscribeAttr } from '../interfaces';
import { IExchangeReqBody } from '../service';
import { ReadableStore } from '../Store';
import RCRTCPeerConnection from '../webrtc/RCRTCPeerConnection';
/**
 * 获取 exchange 接口的请求体数据
 * @param subscribeList 订阅清单
 * @param iceRestart
 * @param pc RCRTCPeerConnection 实例
 * @param store: Store
 */
export declare function createExchangeParams(subscribeList: ISubscribeAttr[], iceRestart: boolean, pc: RCRTCPeerConnection, store: ReadableStore): Promise<IExchangeReqBody>;
/**
   * 开启、停用 CDN 推资源后发信令
   */
export declare function sendCDNInfoSignal(store: ReadableStore): Promise<{
    code: RCRTCCode;
}>;
//# sourceMappingURL=helper.d.ts.map