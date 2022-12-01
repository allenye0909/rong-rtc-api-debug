declare type BitrateConf = {
    width: number;
    height: number;
    maxBitrate: number;
    minBitrate: number;
};
export declare const RongRTCVideoBitrate: {
    W176_H132: {
        width: number;
        height: number;
        maxBitrate: number;
        minBitrate: number;
    };
    W176_H144: {
        width: number;
        height: number;
        maxBitrate: number;
        minBitrate: number;
    };
    W180_H180: {
        width: number;
        height: number;
        maxBitrate: number;
        minBitrate: number;
    };
    W240_H180: {
        width: number;
        height: number;
        maxBitrate: number;
        minBitrate: number;
    };
    W240_H240: {
        width: number;
        height: number;
        maxBitrate: number;
        minBitrate: number;
    };
    W256_H144: {
        width: number;
        height: number;
        maxBitrate: number;
        minBitrate: number;
    };
    W320_H180: {
        width: number;
        height: number;
        maxBitrate: number;
        minBitrate: number;
    };
    W320_H240: {
        width: number;
        height: number;
        maxBitrate: number;
        minBitrate: number;
    };
    W360_H360: {
        width: number;
        height: number;
        maxBitrate: number;
        minBitrate: number;
    };
    W480_H360: {
        width: number;
        height: number;
        maxBitrate: number;
        minBitrate: number;
    };
    W480_H480: {
        width: number;
        height: number;
        maxBitrate: number;
        minBitrate: number;
    };
    W640_H360: {
        width: number;
        height: number;
        maxBitrate: number;
        minBitrate: number;
    };
    W640_H480: {
        width: number;
        height: number;
        maxBitrate: number;
        minBitrate: number;
    };
    W720_H480: {
        width: number;
        height: number;
        maxBitrate: number;
        minBitrate: number;
    };
    W848_H480: {
        width: number;
        height: number;
        maxBitrate: number;
        minBitrate: number;
    };
    W960_H720: {
        width: number;
        height: number;
        maxBitrate: number;
        minBitrate: number;
    };
    W1280_H720: {
        width: number;
        height: number;
        maxBitrate: number;
        minBitrate: number;
    };
    W1920_H1080: {
        width: number;
        height: number;
        maxBitrate: number;
        minBitrate: number;
    };
};
/**
* 向上取最接近的视频分辨率配置
* @param {number} width
* @param {number} height
*/
export declare const getNearestResolution: (width: number, height: number) => BitrateConf;
export declare const Multiplier: {
    [key: number]: number;
};
/**
 * 根据帧率获取码率倍数
 * @param frameRate
 */
export declare const getBitrateMultiple: (frameRate: number) => number;
export {};
//# sourceMappingURL=RCRTCResolution.d.ts.map