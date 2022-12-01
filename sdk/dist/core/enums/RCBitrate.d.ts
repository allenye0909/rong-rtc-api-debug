import { IRCTrackBitrate } from '../interfaces';
export declare enum RCAudioBitrate {
    /**
     * 标清音质
     */
    Speech = "Speech",
    /**
     * 音乐音质
     */
    Music = "Music",
    /**
     * 音乐高清音质
     */
    MusicHigh = "MusicHigh"
}
export declare const getAudioBitrate: {
    [key in RCAudioBitrate]: IRCTrackBitrate;
};
export declare enum RCVideoBitrate {
    /**
     * Bitrate { max: 150, min: 80 }
     */
    LEVEL0 = "LEVEL0",
    /**
     * Bitrate { max: 280, min: 120 }
     */
    LEVEL1 = "LEVEL1",
    /**
     * Bitrate { max: 650, min: 150 }
     */
    LEVEL2 = "LEVEL2",
    /**
     * Bitrate { max: 1000, min: 200 }
     */
    LEVEL3 = "LEVEL3",
    /**
     * Bitrate { max: 2200, min: 250 }
     */
    LEVEL4 = "LEVEL4",
    /**
     * Bitrate { max: 4000, min: 400 }
     */
    LEVEL5 = "LEVEL5"
}
export declare const getVideoBitrate: {
    [key in RCVideoBitrate]: IRCTrackBitrate;
};
//# sourceMappingURL=RCBitrate.d.ts.map