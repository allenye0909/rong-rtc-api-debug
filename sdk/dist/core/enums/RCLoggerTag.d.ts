export declare enum RCLoggerTag {
    /**
     * 连接状态变更
     */
    L_RTC_CLIENT_CONNECTION_STATE_S = "L-rtc_client_connection_state-S",
    /**
     * 主动断开
     */
    L_RTC_CLIENT_DISCONNECT_S = "L-rtc_client_disconnect-S",
    /**
     * 消息监听
     */
    L_RTC_CLIENT_MESSAGE_O = "L-rtc_client_message-O",
    /**
     * 销毁实例
     */
    L_RTC_CLIENT_DESTROY_S = "L-rtc_client_destroy-S",
    /**
     * 加入RTC房间任务
     */
    L_RTC_CLIENT_JOIN_RTC_ROOM_T = "L-rtc_client_join_rtc_room-T",
    /**
     * 加入RTC房间结果
     */
    L_RTC_CLIENT_JOIN_RTC_ROOM_R = "L-rtc_client_join_rtc_room-R",
    /**
     * 加入Living房间任务
     */
    L_RTC_CLIENT_JOIN_LIVING_ROOM_T = "L-rtc_client_join_living_room-T",
    /**
     * 加入Living房间结果
     */
    L_RTC_CLIENT_JOIN_LIVING_ROOM_R = "L-rtc_client_join_living_room-R",
    /**
     * 获取audience实例
     */
    L_RTC_CLIENT_GET_AUDIENCE_CLIENT_O = "L-rtc_client_get_audience_client-O",
    /**
     * 离开房间任务
     */
    L_RTC_CLIENT_LEAVE_ROOM_T = "L-rtc_client_leave_room-T",
    /**
     * 离开房间结果
     */
    L_RTC_CLIENT_LEAVE_ROOM_R = "L-rtc_client_leave-room-R",
    /**
     * 创建麦克风音频轨道
     */
    L_RTC_CLIENT_CREATE_MICROPHONE_AUDIO_TRACK_O = "L-rtc_client_create_microphone_audio_track-O",
    /**
     * 创建摄像头视频轨道
     */
    L_RTC_CLIENT_CREATE_CAMERA_VIDEO_TRACK_O = "L-rtc_client_create_camera_video_track-O",
    /**
     * 创建麦克风和摄像头的音视频轨道
     */
    L_RTC_CLIENT_CREATE_MICROPHONE_AND_CAMERA_TRACKS_O = "L-rtc_client_create_microphone_and_camera_tracks-O",
    /**
     * 创建屏幕视频轨道
     */
    L_RTC_CLIENT_CREATE_SCREEN_VIDEO_TRACK_O = "L-rtc_client_create_screen_video_track-O",
    /**
     * 创建包含音频的屏幕共享轨道
     */
    L_RTC_CLIENT_CREATE_SCREEN_VIDEO_AND_AUDIO_TRACKS_O = "L-rtc_client_create_screen_video_and_audio_tracks-O",
    /**
     * 创建本地音频轨道
     */
    L_RTC_CLIENT_CREATE_LOCAL_AUDIO_TRACK_O = "L-rtc_client_create_local_audio_track-O",
    /**
     * 创建本地视频轨道
     */
    L_RTC_CLIENT_CREATE_LOCAL_VIDEO_TRACK_O = "L-rtc_client_create_local_video_track-O",
    /**
     * 创建本地文件流
     */
    L_RTC_CLIENT_CREATE_LOCAL_FILE_TRACKS_O = "L-rtc_client_create_local_file_tracks-O",
    /**
     * 创建本地流
     */
    L_RTC_CLIENT_CREATE_LOCAL_TRACKS_O = "L-rtc_client_create_local_tracks-O",
    /**
     * 以观众身份加入房间的任务
     */
    L_RTC_CLIENT_JOIN_LIVING_ROOM_AS_AUDIENCE_T = "L-rtc_client_join_living_room_as_audience-T",
    /**
     * 以观众身份加入房间的结果
     */
    L_RTC_CLIENT_JOIN_LIVING_ROOM_AS_AUDIENCE_R = "L-tcclient_join_living_room_as_audience_R",
    /**
     * 以观众身份离开房间的任务
     */
    L_RTC_CLIENT_LEAVE_LIVING_ROOM_AS_AUDIENCE_T = "L-rtc_client_leave_living_room_as_audience-T",
    /**
     * 以观众身份离开房间的结果
     */
    L_RTC_CLIENT_LEAVE_LIVING_ROOM_AS_AUDIENCE_R = "L-rtc_client_leave_living_room_as_audience-R",
    /**
     * 观众升级到主播的任务
     */
    L_RTC_CLIENT_UPGRADE_TO_ANCHOR_ROOM_T = "L-rtc_client_upgrade_to_anchor_room-T",
    /**
     * 观众升级到主播的结果
     */
    L_RTC_CLIENT_UPGRADE_TO_ANCHOR_ROOM_R = "L-rtc_client_upgrade_to_anchor_room-R",
    /**
     * 主播降级到观众的任务
     */
    L_RTC_CLIENT_DOWNGRADE_TO_AUDIENCE_ROOM_T = "L-rtc_client_downgrade_to_audience_room-T",
    /**
     * 主播降级到观众的结果
     */
    L_RTC_CLIENT_DOWNGRADE_TO_AUDIENCE_ROOM_R = "L-rtc_client_downgrade_to_audience_room-R",
    /**
     * 获取加入房间的信息
     */
    L_RTC_CLIENT_GET_JOINED_ROOM_INFO_O = "L-rtc_client_get_joined_room_info-O",
    /**
     * 观众订阅资源任务
     */
    L_AUDIENCE_CLIENT_SUBSCRIBE_T = "L-audinence_client_subscribe-T",
    /**
     * 观众订阅资源结果
     */
    L_AUDIENCE_CLIENT_SUBSCRIBE_R = "L-audinence_client_subscribe-R",
    /**
     * 观众取消订阅资源任务
     */
    L_AUDIENCE_CLIENT_UNSUBSCRIBE_T = "L-audinence_client_unsubscribe-T",
    /**
     * 观众端取消订阅资源结果
     */
    L_AUDIENCE_CLIENT_UNSUBSCRIBE_R = "L-audinence_client_unsubscribe-R",
    /**
     * rtcPing开始
     */
    L_PINGER_START_O = "L-pinger_start-O",
    /**
     * rtcPing结束
     */
    L_PINGER_STOP_O = "L-pinger_stop-O",
    /**
     * rtcPing超时
     */
    L_PINGER_TIMEOUT_O = "L-pinger_timeout-O",
    /**
     * 发送消息的任务
     */
    L_ABSTRACT_ROOM_SEND_MESSAGE_T = "L-abstract_room_send_message-T",
    /**
     * 发送消息的结果
     */
    L_ABSTRACT_ROOM_SEND_MESSAGE_R = "L-abstract_room_send_message-R",
    /**
     * 设置房间属性的任务
     */
    L_ABSTRACT_ROOM_SET_ROOM_ATTRIBUTE_T = "L-abstract_room_set_room_attribute-T",
    /**
     * 设置房间属性的结果
     */
    L_ABSTRACT_ROOM_SET_ROOM_ATTRIBUTE_R = "L-abstract_room_set_room_attribute_R",
    /**
     * 删除房间属性的任务
     */
    L_ABSTRACT_ROOM_DELETE_ROOM_ATTRIBUTE_T = "L-abstract_room_delete_room_attribute_T",
    /**
     * 删除房间属性的任务
     */
    L_ABSTRACT_ROOM_DELETE_ROOM_ATTRIBUTE_R = "L-abstract_room_delete_room_attribute_R",
    /**
     * 房间推流的任务
     */
    L_ABSTRACT_ROOM_PUBLISH_T = "L-abstract_room_publish-T",
    /**
     * 房间推流的结果
     */
    L_ABSTRACT_ROOM_PUBLISH_R = "L-abstract_room_publish-R",
    /**
     * 房间停止推流的任务
     */
    L_ABSTRACT_ROOM_UNPUBLISH_T = "L-abstract_room_unpublish-T",
    /**
     * 房间停止推流结果
     */
    L_ABSTRACT_ROOM_UNPUBLISH_R = "L-abstract_room_unpublish-R",
    /**
     * 房间订阅资源任务
     */
    L_ABSTRACT_ROOM_SUBSCRIBE_T = "L-abstract_room_subscribe-T",
    /**
     * 房间订阅资源结果
     */
    L_ABSTRACT_ROOM_SUBSCRIBE_R = "L-abstract_room_subscribe-R",
    /**
     * 房间取消订阅资源的任务
     */
    L_ABSTRACT_ROOM_UNSUBSCRIBE_T = "L-abstract_room_unsubscribe-T",
    /**
     * 房间取消订阅资源的结果
     */
    L_ABSTRACT_ROOM_UNSUBSCRIBE_R = "L-abstract_room_unsubscribe-R",
    /**
     * 房间注册监听事件
     */
    L_ABSTRACT_ROOM_REGISTER_ROOM_EVENT_LISTENER_O = "L-abstract_room_register_room_event_listener-O",
    /**
     * 房间注册上报事件
     */
    L_ABSTRACT_ROOM_REGISTER_REPORT_LISTENER_O = "L-abstract_room_register_report_listener-O",
    /**
     * 房间音频等级变更
     */
    L_ABSTRACT_ROOM_AUDIO_LEVEL_O = "L-abstract_room_audio_level-O",
    /**
     * 房间重连的任务
     */
    L_ABSTRACT_ROOM_RECONNECTED_T = "L-abstract_room_reconnected-T",
    /**
     * 房间重连的结果
     */
    L_ABSTRACT_ROOM_RECONNECTED_R = "L-abstract_room_reconnected-R",
    /**
     * 监听器事件触发
     */
    L_ABSTRACT_ROOM_CALL_APP_LISTENER_O = "L-abstract_room_call_app_listener-O",
    /**
     * livingroom重连的任务
     */
    L_LIVING_ROOM_RECONNECTED_T = "L-living_room_reconnected-T",
    /**
     * livingroom重连的结果
     */
    L_LIVING_ROOM_RECONNECTED_R = "L-living_room_reconnected-R",
    /**
     * livingroom更改cdn状态的任务
     */
    L_LIVING_ROOM_ENABLE_INNER_CDN_T = "L-living_room_enable_inner_cdn-T",
    /**
     * livingroom更改cdn状态的结果
     */
    L_LIVING_ROOM_ENABLE_INNER_CDN_R = "L-living_room_enable_inner_cdn-R",
    /**
     * livingroom扩散cdn内容的任务
     */
    L_LIVING_ROOM_SPREAD_CDN_INFO_T = "L-living_room_spread_cdn_info-T",
    /**
     * livingroom扩散cdn内容的结果
     */
    L_LIVING_ROOM_SPREAD_CDN_INFO_R = "L-living_room_spread_cdn_info-R",
    /**
     * livingroom加入pk房间的任务
     */
    L_LIVING_ROOM_JOINED_PK_ROOM_T = "L-living_room_joined_pk_room-T",
    /**
     * livingroom加入pk房间的结果
     */
    L_LIVING_ROOM_JOINED_PK_ROOM_R = "L-living_room_joined_pk_room-R",
    /**
     * livingroom离开pk房间的任务
     */
    L_LIVING_ROOM_LEAVE_PK_ROOM_T = "L-living_room_leave_pk_room-T",
    /**
     * livingroom离开pk房间的结果
     */
    L_LIVING_ROOM_LEAVE_PK_ROOM_R = "L-living_room_leave_pk_room-R",
    /**
     * livingroom获取pk房间handler
     */
    L_LIVING_ROOM_GET_ROOM_PK_HANDLER_O = "L-living_room_get_room_pk_handler-O",
    /**
     * livingroom离开全部pk房间
     */
    L_LIVING_ROOM_QUIT_ALL_PK_ROOM_O = "L-living_room_quit_all_pk_room-O",
    /**
     * livingpkhandler注册pk房间监听事件
     */
    L_LIVING_PK_HANDLER_REGISTER_ROOM_PK_EVENT_LISTENER_O = "L-living_pk_handler_register_room_pk_event_listener-O",
    /**
     * livingpkhandler发起跨房间连麦请求的任务
     */
    L_LIVING_PK_HANDLER_REQUEST_JOIN_OTHER_ROOM_T = "L-living_pk_handler_request_join_other_room-T",
    /**
     * livingpkhandler发起跨房间连麦请求的结果
     */
    L_LIVING_PK_HANDLER_REQUEST_JOIN_OTHER_ROOM_R = "L-living_pk_handler_request_join_other_room-R",
    /**
     * livingpkhandler取消跨房间连麦请求的任务
     */
    L_LIVING_PK_HANDLER_CANCEL_REQUEST_JOIN_OTHER_ROOM_T = "L-living_pk_handler_cancel_request_join_other_room-T",
    /**
     * livingpkhandler取消跨房间连麦请求的结果
     */
    L_LIVING_PK_HANDLER_CANCEL_REQUEST_JOIN_OTHER_ROOM_R = "L-living_pk_handler_cancel_request_join_other_room-R",
    /**
     * livingpkhandler响应跨房间连麦请求的任务
     */
    L_LIVING_PK_HANDLER_RESPONSE_JOIN_OTHER_ROOM_T = "L-living_pk_handler_response_join_other_room-T",
    /**
     * livingpkhandler响应跨房间连麦请求的结果
     */
    L_LIVING_PK_HANDLER_RESPONSE_JOIN_OTHER_ROOM_R = "L-living_pk_handler_response_join_other_room-R",
    /**
     * livingpkhandler加入连麦房间的任务
     */
    L_LIVING_PK_HANDLER_JOIN_OTHER_ROOM_T = "L-living_pk_handler_join_other_room-T",
    /**
     * livingpkhandler加入连麦房间的结果
     */
    L_LIVING_PK_HANDLER_JOIN_OTHER_ROOM_R = "L-living_pk_handler_join_other_room-R",
    /**
     * livingpkhandler离开连麦房间的任务
     */
    L_LIVING_PK_HANDLER_LEAVE_OTHER_ROOM_T = "L-living_pk_handler_leave_other_room-T",
    /**
     * livingpkhandler离开连麦房间的结果
     */
    L_LIVING_PK_HANDLER_LEAVE_OTHER_ROOM_R = "L-living_pk_handler_leave_other_room-R",
    /**
     * AudienceLivingRoom信令数据变化的任务
     */
    L_AUDIENCE_LIVING_ROOM_SINGAL_DATA_CHANGE_T = "L-audience_living_room_singal_data_change-T",
    /**
     * AudienceLivingRoom信令数据变化的结果
     */
    L_AUDIENCE_LIVING_ROOM_SINGAL_DATA_CHANGE_R = "L-audience_living_room_singal_data_change-R",
    /**
     * AudienceLivingRoom获取cdn播放地址的任务
     */
    L_AUDIENCE_LIVING_ROOM_GET_CDN_PLAY_URL_T = "L-audience_living_room_get_cdn_play_url-T",
    /**
     * AudienceLivingRoom获取cdn播放地址的结果
     */
    L_AUDIENCE_LIVING_ROOM_GET_CDN_PLAY_URL_R = "L-audience_living_room_get_cdn_play_url-R",
    /**
     * AudienceLivingRoom订阅资源的任务
     */
    L_AUDIENCE_LIVING_ROOM_SUBSCRIBE_T = "L-audience_living_room_subscribe-T",
    /**
     * AudienceLivingRoom订阅资源的结果
     */
    L_AUDIENCE_LIVING_ROOM_SUBSCRIBE_R = "L-audience_living_room_subscribe-R",
    /**
     * AudienceLivingRoom取消订阅资源的任务
     */
    L_AUDIENCE_LIVING_ROOM_UNSUBSCRIBE_T = "L-audience_living_room_unsubscribe-T",
    /**
     * AudienceLivingRoom取消订阅资源的结果
     */
    L_AUDIENCE_LIVING_ROOM_UNSUBSCRIBE_R = "L-audience_living_room_unsubscribe-R",
    /**
     * AudienceLivingRoom声音改变
     */
    L_AUDIENCE_LIVING_ROOM_AUDIO_LEVEL_CHANGE_O = "L-audience_living_room_audio_level_change-O",
    /**
     * MCUConfigBuilder设置音频轨道
     */
    L_MCU_CONFIG_BUILDER_SET_HOST_VIDEO_TRACK_O = "L-mcu_config_builder_set_host_video_track-O",
    /**
     * MCUConfigBuilder设置混合排版模式
     */
    L_MCU_CONFIG_BUILDER_SET_MIX_LAYOUT_MODE_O = "L-mcu_config_builder_set_mix_layout_mode-O",
    /**
     * MCUConfigBuilder设置输出视频
     */
    L_MCU_CONFIG_BUILDER_SET_OUTPUT_VIDEO_RESOLUTION_O = "L-mcu_config_builder_set_output_video_resolution-O",
    /**
     * MCUConfigBuilder设置输出视频fps
     */
    L_MCU_CONFIG_BUILDER_SET_OUTPUT_VIDEO_FPS_O = "L-mcu_config_builder_set_output_video_fps-O",
    /**
     * MCUConfigBuilder设置输出视频bitrate
     */
    L_MCU_CONFIG_BUILDER_SET_OUTPUT_VIDEO_BITRATE_O = "L-mcu_config_builder_set_output_video_bitrate-O",
    /**
     * MCUConfigBuilder设置输出小流视频resolution
     */
    L_MCU_CONFIG_BUILDER_SET_OUTPUT_TINY_VIDEO_RESOLUTION_O = "L-mcu_config_builder_set_output_tiny_video_resolution-O",
    /**
     * MCUConfigBuilder设置输出小流视频fps
     */
    L_MCU_CONFIG_BUILDER_SET_OUTPUT_TINY_VIDEO_FPS_O = "L-mcu_config_builder_set_output_tiny_video_fps-O",
    /**
     * MCUConfigBuilder设置输出小流视频bitrate
     */
    L_MCU_CONFIG_BUILDER_SET_OUTPUT_TINY_VIDEO_BITRATE_O = "L-mcu_config_builder_set_output_tiny_video_bitrate-O",
    /**
     * MCUConfigBuilder设置输出视频的渲染模式
     */
    L_MCU_CONFIG_BUILDER_SET_OUTPUT_VIDEO_RENDER_MODE_O = "L-mcu_config_builder_set_output_video_render_mode-O",
    /**
     * MCUConfigBuilder设置输出音频bitrate
     */
    L_MCU_CONFIG_BUILDER_SET_OUTPUT_AUDIO_BITRATE_O = "L-mcu_config_builder_set_output_audio_bitrate-O",
    /**
     * MCUConfigBuilder设置背景颜色
     */
    L_MCU_CONFIG_BUILDER_SET_OUTPUT_BACKGROUND_COLOR_O = "L-mcu_config_builder_set_output_background_color-O",
    /**
     * MCUConfigBuilder设置背景图片
     */
    L_MCU_CONFIG_BUILDER_SET_OUTPUT_BACKGROUND_PICTURE_O = "L-mcu_config_builder_add_output_background_picture-O",
    /**
     * MCUConfigBuilder删除背景图片
     */
    L_MCU_CONFIG_BUILDER_REMOVE_OUTPUT_BACKGROUND_PICTURE_O = "L-mcu_config_builder_remove_output_background_picture-O",
    /**
     * MCUConfigBuilder清除背景图片
     */
    L_MCU_CONFIG_BUILDER_CLEAR_OUTPUT_BACKGROUND_PICTURE_O = "L-mcu_config_builder_clear_output_background_picture-O",
    /**
     * MCUConfigBuilder设置背景图片填充模式
     */
    L_MCU_CONFIG_BUILDER_SET_OUTPUT_BACKGROUND_PICTURE_FILL_MODE_O = "L-mcu_config_builder_set_output_background_picture-fill-mode-O",
    /**
     * MCUConfigBuilder设置直播CDN旁路推流地址
     */
    L_MCU_CONFIG_BUILDER_ADD_PUBLISH_STREAM_URLS_O = "L-mcu_config_builder_add_publish_stream_urls-O",
    /**
     * MCUConfigBuilder移除直播CDN旁路推流地址
     */
    L_MCU_CONFIG_BUILDER_REMOVE_PUBLISH_STREAM_URLS_O = "L-mcu_config_builder_remove_publish_stream_urls-O",
    /**
     * MCUConfigBuilder清除直播CDN旁路推流地址
     */
    L_MCU_CONFIG_BUILDER_CLEAR_PUBLISH_STREAM_URLS_O = "L-mcu_config_builder_clear_publish_stream_urls-O",
    /**
     * MCUConfigBuilder添加自定义布局视频
     */
    L_MCU_CONFIG_BUILDER_ADD_CUSTOMIZE_LAYOUT_VIDEO_O = "L-mcu_config_builder_add_customize_layout_video-O",
    /**
     * MCUConfigBuilder移除自定义布局视频
     */
    L_MCU_CONFIG_BUILDER_REMOVE_CUSTOMIZE_LAYOUT_VIDEO_O = "L-mcu_config_builder_remove_customize_layout_video-O",
    /**
     * MCUConfigBuilder清空自定义布局视频
     */
    L_MCU_CONFIG_BUILDER_CLEAR_CUSTOMIZE_LAYOUT_VIDEO_O = "L-mcu_config_builder_clear_customize_layout_video-O",
    /**
     * MCUConfigBuilder设置自定义输入音频
     */
    L_MCU_CONFIG_BUILDER_SET_CUSTOMIZE_INPUT_AUDIO_O = "L-mcu_config_builder_set_customize_input_audio-O",
    /**
     * MCUConfigBuilder添加自定义输入音频
     */
    L_MCU_CONFIG_BUILDER_ADD_CUSTOMIZE_INPUT_AUDIO_O = "L-mcu_config_builder_add_customize_input_audio-O",
    /**
     * MCUConfigBuilder移除自定义输入音频
     */
    L_MCU_CONFIG_BUILDER_REMOVE_CUSTOMIZE_INPUT_AUDIO_O = "L-mcu_config_builder_remove_customize_input_audio-O",
    /**
     * MCUConfigBuilder清除自定义输入音频
     */
    L_MCU_CONFIG_BUILDER_CLEAR_CUSTOMIZE_INPUT_AUDIO_O = "L-mcu_config_builder_clear_customize_input_audio-O",
    /**
     * MCUConfigBuilder重置
     */
    L_MCU_CONFIG_BUILDER_RESET_O = "L-mcu_config_builder_reset-O",
    /**
     * MCUConfigBuilder刷新
     */
    L_MCU_CONFIG_BUILDER_FLUSH_O = "L-mcu_config_builder_flush-O",
    /**
     * MCUConfigBuilder设置单到流水印
     */
    L_MCU_CONFIG_BUILDER_ADD_SINGLE_WATER_MARK_O = "L-mcu_config_builder_add_single_water_mark-O",
    /**
     * MCUConfigBuilder移除单到流水印
     */
    L_MCU_CONFIG_BUILDER_REMOVE_SINGLE_WATER_MARK_O = "L-mcu_config_builder_remove_single_water_mark-O",
    /**
     * MCUConfigBuilder移除单到流水印
     */
    L_MCU_CONFIG_BUILDER_CLEAR_SINGLE_WATER_MARK_O = "L-mcu_config_builder_clear_single_water_mark-O",
    /**
     * MediaService设置mcu配置的任务
     */
    L_MEDIA_SERVICE_SET_MCU_CONFIG_T = "L-media_service_set_mcu_config-T",
    /**
     * MediaService设置mcu配置的结果
     */
    L_MEDIA_SERVICE_SET_MCU_CONFIG_R = "L-media_service_set_mcu_config-R",
    /**
     * MediaService获取CDN资源内容的任务
     */
    L_MEDIA_SERVICE_GET_CDN_RESOURCE_INFO_T = "L-media_service_get_cnd_resource_info-T",
    /**
     * MediaService获取CDN资源内容的结果
     */
    L_MEDIA_SERVICE_GET_CDN_RESOURCE_INFO_R = "L-media_service_get_cnd_resource_info-R",
    /**
     * MediaService发起请求的任务
     */
    L_MEDIA_SERVICE_REQUEST_T = "L-media_service_request-T",
    /**
     * MediaService发起请求的结果
     */
    L_MEDIA_SERVICE_REQUEST_R = "L-media_service_request-R",
    /**
     * LocalTrack设置推流详情
     */
    L_LOCAL_TRACK_INNER_SET_PUBLISHED_O = "L-loacl_track_inner_set_published-O",
    /**
     * LocalTrack销毁
     */
    L_LOCAL_TRACK_DESTROY_O = "L-loacl_track_destroy-O",
    /**
     * LocalTrack设置bitrate
     */
    L_LOCAL_TRACK_SET_BITRATE_O = "L-loacl_track_set_bitrate-O",
    /**
     * LocalTrack设置禁言状态
     */
    L_LOCAL_TRACK_SET_LOCAL_MUTED_O = "L-loacl_track_set_local_muted-O",
    /**
     * Track播放的任务
     */
    L_TRACK_PLAY_T = "L-track_play-T",
    /**
     * Track播放的结果
     */
    L_TRACK_PLAY_R = "L-track_play-R",
    /**
     * Track静音
     */
    L_TRACK_MUTE_O = "L-track_mute-O",
    /**
     * Track取消静音
     */
    L_TRACK_UNMUTE_O = "L-track_unmute-O",
    /**
     * RemoteTrack设置订阅
     */
    L_REMOTE_TRACK_INNER_SET_SUBSCRIBED_O = "L-remote_track_inner_set_subscribed-O",
    /**
     * AbstractStatParser格式化状态
     */
    L_ABSTRACT_STAT_PARSER_FORMAT_RTC_STATE_REPORT_O = "L-abstract_stat_parser_format_rtc_state_report-O",
    /**
     * ASdpStrategy设置semantics
     */
    L_A_SDP_STRATEGY_SET_SDP_SEMANTICS_O = "L-a_sdp_strategy_set_sdp_semantics-O",
    /**
     * ASdpStrategy设置远端回答
     */
    L_A_SDP_STRATEGY_SET_REMOTE_ANSWER_O = "L-a_sdp_strategy_set_remote_answer-O",
    /**
     * RTCPeerConnection获取状态数据
     */
    L_RTC_PEER_CONNECTION_GET_STATS_DATA_O = "L-rtc_peer_connection_get_stats_data-O",
    /**
     * RTCPeerConnection设置本地轨道
     */
    L_RTC_PEER_CONNECTION_ADD_LOCAL_TRACK_O = "L-rtc_peer_connection_add_local_track-O",
    /**
     * RTCPeerConnection获取本地轨道
     */
    L_RTC_PEER_CONNECTION_GET_LOCAL_TRACKS_O = "L-rtc_peer_connection_get_local_tracks-O",
    /**
     * RTCPeerConnection的ICE连接状态改变
     */
    L_RTC_PEER_CONNECTION_ICE_CONNECTION_STATE_S = "L-rtc_peer_connection_ice_connection_state-S",
    /**
     * RTCPeerConnection的connection连接状态改变
     */
    L_RTC_PEER_CONNECTION_CONNECTION_STATE_S = "L-rtc_peer_connection_connection_state-S",
    /**
     * RTCPeerConnection设置bitrate
     */
    L_RTC_PEER_CONNECTION_SET_BITRATE_O = "L-rtc_peer_connection_set_bitrate-O",
    /**
     * RTCPeerConnection创建offer
     */
    L_RTC_PEER_CONNECTION_CREATE_OFFER_O = "L-rtc_peer_connection_create_offer-O",
    /**
     * RTCPeerConnection设置远端回答
     */
    L_RTC_PEER_CONNECTION_SET_REMOTE_ANSWER_O = "L-rtc_peer_connection_set_remote_answer-O",
    /**
     * RTCPeerConnection删除本地指定轨道
     */
    L_RTC_PEER_CONNECTION_REMOVE_LOCAL_TRACK_BY_ID_O = "L-rtc_peer_connection_remove_local_track_by_id-O",
    /**
     * RTCPeerConnection删除全部本地轨道
     */
    L_RTC_PEER_CONNECTION_REMOVE_ALL_LOCAL_TRACK_O = "L-rtc_peer_connection_remove_all_local_track-O",
    /**
     * RTCPeerConnection删除本地轨道
     */
    L_RTC_PEER_CONNECTION_REMOVE_LOCAL_TRACK_O = "L-rtc_peer_connection_remove_local_track-O",
    /**
     * RTCPeerConnection更新远端轨道
     */
    L_RTC_PEER_CONNECTION_UPDATE_SUB_REMOTE_TRACKS_O = "L-rtc_peer_connection_update_sub_remote_tracks-O",
    /**
     * RTCPeerConnection设置本地声音
     */
    L_RTC_PEER_CONNECTION_LOCAL_TRACK_MUTED_O = "L-rtc_peer_connection_local_track_muted-O",
    /**
     * RTCPeerConnection销毁
     */
    L_RTC_PEER_CONNECTION_DESTROY_O = "L-rtc_peer_connection_destroy-O",
    /**
     * 设置码率出错，设置的码率值未在推荐列表
     */
    L_RTC_SET_RECOMMEND_BITRATE_O = "L_rtc_set_recommend_bitrate_O",
    /**
     * 设置 SDP 上的码率
     */
    L_RTC_SDP_BITRATE_O = "L_rtc_sdp_bitrate_O",
    /**
     * 3A 降噪
     */
    L_RTC_3ANOISE_NODE_O = "L_RTC_AAAnoiseNode_O",
    /**
     * 3A 降噪
     */
    L_RTC_3ANOISE_NODE_E = "L_RTC_AAAnoiseNode_E",
    /**
     * 3A 降噪
     */
    L_RTC_3ANOISE_NODE_STOP_O = "L_RTC_AAAnoiseNode_Stop_O",
    /**
     * 加入跨appkey互通房间的任务
     */
    L_RTC_CLIENT_JOIN_CROSS_RTC_ROOM_T = "L_rtc_client_join_cross_rtc_room_T",
    /**
     * 加入跨appkey互通房间的结果
     */
    L_RTC_CLIENT_JOIN_CROSS_RTC_ROOM_R = "L_rtc_client_join_cross_rtc_room_R"
}
export declare enum RCLoggerStatus {
    /**
     * 失败
     */
    FAILED = "fail",
    /**
     * 成功
     */
    SUCCESSED = "success",
    /**
     * 超时
     */
    TIMEOUT = "timeout",
    /**
     * 信息
     */
    INFO = "info"
}
//# sourceMappingURL=RCLoggerTag.d.ts.map