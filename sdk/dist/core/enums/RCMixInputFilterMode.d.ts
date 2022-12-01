export declare enum RCMixInputFilterMode {
    /** 全合流，后续加入房间的用户会自动合流 */
    AUDIO_VIDEO_ALL = 0,
    /** 全不合流，后续加入本房间的用户 */
    AUDIO_VIDEO_NO = 1,
    /** 音频全订阅, 视频全不订阅 */
    AUDIO_ALL_VIDEO_NO = 2,
    /** 视频全订阅, 音频全不订阅 */
    AUDIO_NO_VIDEO_ALL = 3,
    /**
     * 根据设置的音频合流列表和视频合流列表合并媒体流
     */
    AUDIO_VIDEO_INPUT = 4,
    /** 音频全订阅，视频根据设置的视频合流列表 */
    AUDIO_ALL_VIDEO_INPUT = 5,
    /** 音频全不订阅, 视频根据input里面的视频项订阅 */
    AUDIO_NO_VIDEO_INPUT = 6,
    /** 视频全订阅, 音频根据input里面的音频项订阅 */
    AUDIO_INPUT_VIDEO_ALL = 7,
    /** 视频全不订阅, 音频根据input里面的音频项订阅 */
    AUDIO_INPUT_VIDEO_NO = 8,
    /** 按房间列表订阅音视频(保留当前已经订阅的, 但没在房间列表里的音视频) */
    ROOM_AUDIO_VIDEO_APPEND = 9,
    /** 按房间列表订阅音视频(清理当前已经订阅的, 但没在房间列表里的音视频) */
    ROOM_AUDIO_VIDEO_NOT_APPEND = 10,
    /** 按房间列表订阅音频, 不订阅视频(保留当前已经订阅的, 但没在房间列表里的音频) */
    ROOM_AUDIO_APPEND = 11,
    /** 按房间列表订阅音视, 不订阅视频(清理当前已经订阅的, 但没在房间列表里的音频) */
    ROOM_AUDIO_NOT_APPEND = 12,
    /** 按房间列表订阅视频, 不订阅音频(保留当前已经订阅的, 但没在房间列表里的视频) */
    ROOM_VIDEO_APPEND = 13,
    /** 按房间列表订阅视频, 不订阅音频(清理当前已经订阅的, 但没在房间列表里的视频) */
    ROOM_VIDEO_NOT_APPEND = 14
}
//# sourceMappingURL=RCMixInputFilterMode.d.ts.map