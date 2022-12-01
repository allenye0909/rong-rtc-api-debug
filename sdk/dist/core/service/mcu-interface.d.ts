import { MixLayoutMode } from '../enums/MixLayoutMode';
import { MixVideoRenderMode } from '../enums/MixVideoRenderMode';
import { RCInnerCDNModel } from '../enums/RCInnerCDNModel';
import { RCMixInputFilterMode } from '../enums/RCMixInputFilterMode';
/**
 * 合流后的 video 输出编码配置，包含分辨率、帧率、码率配置项
 */
export interface IMCUOutputVideoAttrs {
    /**
     * 视频分辨率宽度
     */
    width?: number;
    /**
     * 视频分辨率高度
     */
    height?: number;
    /**
     * 帧率
     */
    fps?: number;
    /**
     * 码率
     */
    bitrate?: number;
}
/**
 * 合并入 MCU 的音频流
 */
export interface IMCUInputAudio {
    user_id: string;
    stream_id: string;
}
/**
 * 自定义布局中的单一视频流布局
 */
export interface IMCUInputVideoLayout {
    user_id: string;
    stream_id: string;
    x: number;
    y: number;
    width: number;
    height: number;
}
/**
 * 图片配置，用于水印、视频流背景图
 */
export interface IPictureAttrs {
    /**
     * 资源下载地址，需包含协议
     */
    uri: string;
    /**
     * 相对于整体画布的起始位置 x 坐标
     */
    x: number;
    /**
     * 相对于整体画布的起始位置 y 坐标
     */
    y: number;
    /**
     * 相对于整体画布的宽（百分比），有效值 `0.0` - `1.0`
     */
    w: number;
    /**
     * 相对于整体画布的高（百分比），有效值 `0.0` - `1.0`
     */
    h: number;
}
/**
 * 合流后的 Video 输出配置，包含背景图、背景色、大小流编码等配置项
 */
export interface IMCUOutputVideoConfig {
    /**
     * 标准流输出定义
     */
    normal?: IMCUOutputVideoAttrs;
    /**
     * 小流输出定义
     */
    tiny?: IMCUOutputVideoAttrs;
    exparams?: {
        /**
         * 合流布局时，对视频流的填充方式
         */
        renderMode: MixVideoRenderMode;
    };
    /**
     * 背景色，如 `'0xf1a2c3'`
     */
    backgroundColor?: string;
    /**
     * 背景图
     */
    backgroundPicture?: {
        /**
         * 填充模式：
         * 1. 按比例裁剪
         * 2. 不裁剪，按比例压缩
         */
        fillMode: 1 | 2;
        /**
         * 资源列表
         */
        picture: IPictureAttrs[];
    };
}
/**
 * 合流后的媒体输出定义
 */
export interface IMCUOutputConfig {
    /**
     * 输出视频配置
     */
    video: IMCUOutputVideoConfig;
    /**
     * 输出音频配置
     */
    audio?: {
        /**
         * 音频码率
         */
        bitrate: number;
    };
    /**
     * CDN 推流地址列表
     */
    cdn?: {
        /**
         * 推流地址，如：`'rtmp://xxxx'`
         */
        pushurl: string;
    }[];
}
/**
 * 时间戳参数，用于水印
 */
export interface ITimestampAttrs {
    /**
     * 时区
     */
    timezone: number;
    /**
     * 字体像素大小
     */
    fontSize: number;
    /**
     * 字体颜色
     */
    color: 'black' | 'white';
    /**
     * 透明度，有效值 `0.0` 至 `1.0`
     */
    alpha: number;
    /**
     * 相较于整体画布的 x 坐标（百分比），有效值 `0.0` 至 `1.0`
     */
    x: number;
    /**
     * 相较于整体画布的 y 坐标（百分比），有效值 `0.0` 至 `1.0`
     */
    y: number;
}
/**
 * 文本参数，用于水印
 */
export interface ITextAttrs {
    /**
     * 文字内容
     */
    content: string;
    /**
     * 文字像素
     */
    fontSize: number;
    /**
     * 文字颜色
     */
    color: 'black' | 'white';
    /**
     * 透明度，有效值 `0.0` 至 `1.0`
     */
    alpha: number;
    /**
     * 相较于整体画布的 x 坐标（百分比），有效值 `0.0` 至 `1.0`
     */
    x: number;
    /**
     * 相较于整体画布的 y 坐标（百分比），有效值 `0.0` 至 `1.0`
     */
    y: number;
}
/**
 * 屏幕水印配置
 */
export interface IWaterMarkConfig {
    /**
     * 时间戳水印配置
     */
    timestamp?: ITimestampAttrs;
    /**
     * 图片水印配置
     */
    picture?: IPictureAttrs[];
    /**
     * 文字水印配置
     */
    text: ITextAttrs[];
}
/**
 * 合流前的单一视频流水印配置
 *【客户端仅提供图片水印设置】
 */
export interface IMCUSignalScreenWaterMarkConfig {
    /**
     * 媒体流的 msid
     */
    streamId: string;
    picture: IPictureAttrs[];
}
export interface IMCUWaterMarkConfig {
    enable: 'on' | 'off';
    /**
     * 合流后的屏幕水印配置
     *【客户端暂不提供合流水印设置】
     */
    /**
     * 合流前的单人视频流水印配置
     */
    singleScreen: IMCUSignalScreenWaterMarkConfig[];
}
/**
 * 发布到服务器的 MCU 配置数据
 */
export interface IMCUConfig {
    /**
     * 为向后兼容，当前为常量 1
     */
    version: 2;
    /**
     * 布局模式，在只配置推流 CDN 时，该值不存在
     */
    mode: MixLayoutMode;
    /**
     * 渲染到主位置上的流 Id，当该值为空时，输出到主位置的流按发布时间顺序优先选择最早发布的流
     */
    host_stream_id?: string;
    /**
     * 自定义布局输入定义，只有在 mode 值为 `MixLayoutMode.CUSTOMIZE` 时需传值
     */
    input?: {
        video?: IMCUInputVideoLayout[];
        audio?: IMCUInputAudio[];
    };
    /**
     * 合流后的媒体输出配置
     */
    output?: IMCUOutputConfig;
    /**
     * 水印配置
     */
    waterMark?: IMCUWaterMarkConfig;
    /**
     * MCU 拉流配置，决定 MCU 从 MediaServer 拉流的方式
     */
    inputFilterMode?: RCMixInputFilterMode;
    /**
     * MCU 混入列表中房间内的资源
     */
    mixRooms?: string[];
}
/**
 * 设置开启、停用内置 CDN 数据
 */
export interface ISetEnableCDN {
    version: 2;
    output: {
        /**
         * 手动开启/停用内置 CDN
         */
        inCDNModel: RCInnerCDNModel;
    };
}
/**
 * 业务层传入的 input video 数据
 */
export interface ICustomInputVideo {
    trackId: string;
    x: number;
    y: number;
    width: number;
    height: number;
}
//# sourceMappingURL=mcu-interface.d.ts.map