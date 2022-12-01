import { INaviInfo, IRuntime } from '@rongcloud/engine';
export declare const getUUID: () => string;
export declare const randomNum: (min: number, max: number) => number;
/**
 * 解析导航数据获取 RTC Server 地址
 * @param info
 */
export declare const parseNaviInfo: (info: INaviInfo | null) => string[];
/**
 * 根据导航下发探测服务的总域名请求探测地址
 * @param runtime
 */
export declare const getDetectorUrls: (runtime: IRuntime, naviInfo: INaviInfo | null) => Promise<{
    fastMediaUrl: string[] | null;
    clientDetectMinute: number;
    status: number;
}>;
//# sourceMappingURL=helper.d.ts.map