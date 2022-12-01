import { BackgroundPictureFillMode } from '../enums/BackgroundPictureFillMode';
import { MixLayoutMode } from '../enums/MixLayoutMode';
import { MixVideoRenderMode } from '../enums/MixVideoRenderMode';
import { RCFrameRate } from '../enums/RCFrameRate';
import { RCResolution } from '../enums/RCResolution';
import { RCRTCCode } from '../enums/RCRTCCode';
import { Invoker } from '../Invoker';
import { IMCUConfig } from '../service';
export default class RCMCUConfigBuilder {
    private _invoker;
    /**
     * flush 提交回调
     */
    /**
     * trackId 有效性验证方法
     */
    private readonly _isValidTrackId;
    /**
     * mcu 配置数据，每次向服务器提交全量数据
     */
    private _values;
    constructor(_invoker: Invoker, 
    /**
     * flush 提交回调
     */
    /**
     * trackId 有效性验证方法
     */
    _isValidTrackId: (trackId: string) => boolean);
    /**
     * 设置合流后的主位置显示的视频流
     * @param videoTrackId 视频流资源 Id
     */
    setHostVideoTrack(videoTrackId: string): RCMCUConfigBuilder;
    /**
     * 设置合流布局模式，当使用 `MixLayoutMode.CUSTOMIZE` 模式时，需自定义合流结构
     * @param mode
     * * `MixLayoutMode.CUSTOMIZE`: 自定义布局，需用户设置布局结构
     * * `MixLayoutMode.SUSPENSION`: 悬浮布局（默认）
     * * `MixLayoutMode.ADAPTATION`: 自适应布局
     */
    setMixLayoutMode(mode: MixLayoutMode): RCMCUConfigBuilder;
    private _addOutputValue;
    /**
     * 设置合流输出视频流的分辨率
     * @param resulution 有效值为 `RCResolution` 定义的枚举值
     */
    setOutputVideoResolution(resolution: RCResolution): RCMCUConfigBuilder;
    /**
     * 设置合流输出视频流的帧率
     * @param fps 其有效值为 `RCFrameRate` 中定义的枚举值
     */
    setOutputVideoFPS(fps: RCFrameRate): RCMCUConfigBuilder;
    /**
     * 设置合流输出视频流的码率（不推荐主动修改）
     * @param bitrate
     */
    setOutputVideoBitrate(bitrate: number): RCMCUConfigBuilder;
    /**
     * 设置合流后输出视频流小流的分辨率
     * @param resulution 有效值为 `RCResolution` 定义的枚举值
     */
    setOutputTinyVideoResolution(resolution: RCResolution): RCMCUConfigBuilder;
    /**
     * 设置合流输出视频流小流的帧率
     * @param fps 其有效值为 `RCFrameRate` 中定义的枚举值
     */
    setOutputTinyVideoFPS(fps: RCFrameRate): RCMCUConfigBuilder;
    /**
     * 设置合流输出视频流小流的码率（不推荐主动修改）
     * @param bitrate
     */
    setOutputTinyVideoBitrate(bitrate: number): RCMCUConfigBuilder;
    /**
     * 设置合流后的视频流渲染方式
     * @param renderMode
     */
    setOutputVideoRenderMode(renderMode: MixVideoRenderMode): RCMCUConfigBuilder;
    /**
     * 设置合流后音频流的编码参数（不推荐主动修改）
     * @param bitrate 音频码率
     */
    setOutputAudioBitrate(bitrate: number): RCMCUConfigBuilder;
    /**
     * 设置合流后的视频流的背景色，默认为 `0x000000`
     * @param color 颜色参数，为 16 进制标识法，如 '0x000000'
     */
    setOutputBackgroundColor(color: string): RCMCUConfigBuilder;
    /**
     * 向合流后的视频流中增加背景图片
     * @param uri 图片资源的完整下载地址
     * @param x 相对于整体画布的起始位置 x 坐标（百分比），有效值 `0.0` - `1.0`
     * @param y 相对于整体画布的起始位置 y 坐标（百分比），有效值 `0.0` - `1.0`
     * @param w 相对于整体画布的宽（百分比），有效值 `0.0` - `1.0`
     * @param h 相对于整体画布的高（百分比），有效值 `0.0` - `1.0`
     */
    addOutputBackgroundPicture(uri: string, x: number, y: number, w: number, h: number): RCMCUConfigBuilder;
    /**
     * 移除对合流后的视频流中添加的指定背景图片
     * @param uri
     */
    removeOutputBackgroundPicture(uri: string): RCMCUConfigBuilder;
    /**
     * 清理对合流后的视频流中添加的所有背景图片
     */
    clearOutputBackgroundPicture(): RCMCUConfigBuilder;
    /**
     * 设置合流后的视频流中添加的背景图片的填充方式：
     * 1. 按比例裁剪
     * 2. 不裁剪，按比例压缩
     * @param fillMode
     */
    setOutputBackgroundPictureFillMode(fillMode: BackgroundPictureFillMode): RCMCUConfigBuilder;
    /**
     * 设置直播 CDN 旁路推流地址，最多支持 5 个推流地址
     * @param urls 地址列表
     */
    addPublishStreamUrls(urls: string[]): RCMCUConfigBuilder;
    /**
     * 移除直播 CDN 旁路推流地址
     * @param urls
     */
    removePublishStreamUrls(urls: string[]): RCMCUConfigBuilder;
    /**
     * 清理已添加的 CDN 旁路推流地址
     */
    clearPublishStreamUrls(): RCMCUConfigBuilder;
    /**
     * 在自定义布局中增加视频流配置
     * @param trackId 资源 Id
     * @param x 在画布中的坐标 x
     * @param y 在画布中的坐标 y
     * @param width 分辨率宽度
     * @param height 分辨率高度
     */
    addCustomizeLayoutVideo(trackId: string, x: number, y: number, width: number, height: number): RCMCUConfigBuilder;
    /**
     * 移除自定义布局中的视频流配置
     * @param trackId
     */
    removeCustomizeLayoutVideo(trackId: string): RCMCUConfigBuilder;
    /**
     * 清除已添加的自定义布局中的视频流配置
     */
    clearCustomizeLayoutVideo(): RCMCUConfigBuilder;
    /**
     * 覆盖设置合流媒体中的音频流
     * @param trackIds 音频流 trackId 数组，当数组长度为 0 时，则合流媒体中将无音频输出
     * @returns
     */
    setCustomizeInputAudio(trackIds: string[]): RCMCUConfigBuilder;
    /**
     * 向既有的音频流合流配置中增加一道音频流
     * @param trackId 音频 trackId
     * @since v5.3.7
     */
    addCustomizeInputAudio(trackId: string): RCMCUConfigBuilder;
    /**
     * 从既有的音频流合流配置中删除一道音频流
     * @param trackId 音频对应的 trackId
     * @since v5.3.7
     */
    removeCustomizeInputAudio(trackId: string): RCMCUConfigBuilder;
    /**
     * 清除音频流合流配置，恢复房间内的全音频流合流输出
     * @since v5.3.7
     */
    clearCustomizeInputAudio(): RCMCUConfigBuilder;
    /**
     * 给单道流添加水印
     */
    addPictureWaterMark(trackId: string, uri: string, x: number, y: number, w: number, h: number): RCMCUConfigBuilder;
    /**
     * 删除所有水印
     */
    clearPictureWaterMark(): RCMCUConfigBuilder;
    /**
   * 移除对合流后的某个视频流中添加的指定水印图片
   * @param uri
   */
    removePictureWaterMark(trackId: string, uri: string): RCMCUConfigBuilder;
    /**
     * 设置 MCU 混流配置
     * @param videoList 视频输入混流列表，为 null 代表视频全混流，为空集合代表视频全不混流，否则按照输入列表进行混流
     * @param audioList 音频输入混流列表，为 null 代表音频全混流，为空集合代表音频全不混流，否则按照输入列表进行混流
     */
    /**
     * 设置 MCU 混流配置
     * @param roomIds 混流房间列表
     * @param mediaType 混流媒体类型
     * @param isAppend 是否为增量混流
     * * true 为增量混流
     * * false 为全量覆盖混流
     */
    /**
     * 重置所有合流配置
     * @since v5.3.7
     * @returns
     */
    reset(): RCMCUConfigBuilder;
    /**
     * 使已修改的配置生效，在调用该方法前，所有数据只会对本地配置进行修改，不会产生实际效果
     * @param reset 调用完成后清空当前配置记录，默认为 `true`（v5.3.7 版本开始启用）
     * @returns
     */
    flush(reset?: boolean): Promise<{
        code: RCRTCCode;
    }>;
    __innerGetValues(): IMCUConfig;
}
//# sourceMappingURL=RCMCUConfigBuilder.d.ts.map