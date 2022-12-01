import { IRuntime } from '@rongcloud/engine';
import { RCRTCCode } from '../enums/RCRTCCode';
import { IRTCReqHeader, IExchangeReqBody, IExchangeResponse, IMCUReqHeaders, IBroadcastSubReqBody, IBroadcastSubRespBody, ICDNPlayUrlReqHeaders, ICDNPlayUrlResponse } from './interface';
import { IMCUConfig, ISetEnableCDN } from './mcu-interface';
import { RTCContext } from '../codec/RTCContext';
export default class RCMediaService {
    private readonly _runtime;
    private readonly _context;
    /**
     * 自定义 MediaServer 地址，当有值时，不再使用导航内的地址
     */
    private readonly _msUrl?;
    /**
     * 请求超时时长
     */
    private readonly _timeout;
    /**
     * navi 中获取的媒体服务地址
     */
    private readonly _msInNavi;
    /**
     * 已失败的请求地址
     */
    private readonly _failedMs;
    /**
     * 服务器指纹数据，客户端不得修改，直接透传
     */
    private _rtcFinger;
    /**
     * 服务器接口返回的 clusterId 数据，当此数据有值时，后续所有请求向此服务发送
     */
    private _clusterId;
    /**
     * MCU 服务地址
     */
    private _configUrl;
    /**
     * 嗅探中获取的媒体服务地址
     */
    private static isDetector;
    /**
     * 嗅探中获取的媒体服务地址
     */
    private static msInDetector;
    private static detectorTime;
    private static detectValidMinute;
    private static naviRefetchCount;
    private _msList;
    constructor(_runtime: IRuntime, _context: RTCContext, 
    /**
     * 自定义 MediaServer 地址，当有值时，不再使用导航内的地址
     */
    _msUrl?: string | undefined, 
    /**
     * 请求超时时长
     */
    _timeout?: number);
    detectorMediaSever(): void;
    /**
     *  地址探测
     *  RTC 初始化时检测是否可以拿到 navi，可以拿到开始嗅探
     *  拿不到等 IM 链接成功后，再回调中调用开始嗅探
     */
    private _getDetectorUrls;
    getNaviMS(): string[];
    /**
     * _mslist 列表排序：[_clusterId, ping1, 主域名，ping2, ..., pingN, 备用域名list ]
     * ping1 ：ping 结果返回最快值
     */
    private setMediaServiceList;
    /**
     * 发送请求，请求发送若失败，会继续尝试使用后续可用地址直到无地址可用，此时认为请求失败
     * @param path
     * @param header
     * @param body
     */
    private _request;
    /**
     * 资源协商接口，订阅、发布、变更资源均可以使用此接口。该接口通过 sdp 字段交换 SDP 信息，
     * 并通过 subscribeList 和 publishList 表明最终发布和订阅的资源。本端产出 offer，服务器产出 answer
     * 每次接口调用，都会全量覆盖发布和订阅的资源。
     * @param header
     * @param body
     */
    exchange(headers: IRTCReqHeader, body: IExchangeReqBody): Promise<{
        code: RCRTCCode;
        data?: IExchangeResponse | undefined;
    }>;
    /**
     * 退出房间
     */
    exit(headers: IRTCReqHeader): Promise<RCRTCCode>;
    /**
     * 观众端订阅主播资源
     */
    broadcastSubscribe(headers: IRTCReqHeader, body: IBroadcastSubReqBody): Promise<{
        code: RCRTCCode;
        data?: IBroadcastSubRespBody | undefined;
    }>;
    /**
     * 观众端退出订阅
     */
    broadcastExit(headers: IRTCReqHeader): Promise<{
        code: RCRTCCode;
    }>;
    /**
     * 直播推流、自定义布局配置
     */
    setMcuConfig(headers: IMCUReqHeaders, body: IMCUConfig | ISetEnableCDN): Promise<{
        code: RCRTCCode;
        res?: any;
    }>;
    /**
     * 房间内观众获取 CDN 资源信息、拉流地址
     */
    getCDNResourceInfo(headers: ICDNPlayUrlReqHeaders, url: string): Promise<{
        code: RCRTCCode;
        res?: ICDNPlayUrlResponse;
    }>;
}
//# sourceMappingURL=RCMediaService.d.ts.map