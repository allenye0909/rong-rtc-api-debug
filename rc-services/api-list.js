(function (window) {
    const { __RCServices: { IM, METTING, LIVE } } = window;
    const joinRTCRoom = {
        isShow: false,
        name: '加入会议房间',
        event: METTING.joinRTCRoom,
        eventName: 'joinRTCRoom',
        desc: '加入会议房间',
        doc: 'http://doc.rongcloud.cn/meeting/Web/5.X/room/basic#joinRoom',
        params: [
            { name: 'roomid', type: 'string', value: '123', required: true, placeholder: "房间id" },
        ]
    }

    const leaveRoom = {
        isShow: false,
        name: '离开会议房间',
        event: METTING.leaveRoom,
        eventName: 'leaveRoom',
        desc: '离开会议房间',
    }

    const createMicrophoneAudioTrack = (service) => {
        return {
            isShow: false,
            name: '捕获音频流',
            event: service.createMicrophoneAudioTrack,
            eventName: 'createMicrophoneAudioTrack',
            desc: '获取音频资源',
            doc: 'http://doc.rongcloud.cn/meeting/Web/5.X/room/basic#joinRoom',
            params: [
                { name: 'tag', type: 'string', value: 'tagname', required: true, placeholder: "tag 资源标识" },
                {
                    name: 'options', type: 'object', required: false, value: [
                        {
                            name: 'micphoneId', type: 'string', value: null, placeholder: "麦克风id"
                        },
                        {
                            name: 'sampleRate', type: 'number', value: null, placeholder: "采样率"
                        },
                    ]
                },
            ]
        }
    }





    const createMicrophoneAndCameraTracks = (service) => {
        return {
            isShow: false,
            name: '捕获音视频流',
            event: service.createMicrophoneAndCameraTracks,
            eventName: 'createMicrophoneAndCameraTracks',
            desc: '获取音视频资源',
            doc: 'https://doc.rongcloud.cn/meeting/Web/5.X/stream/local',
            params: [
                { name: 'tag', type: 'string', value: 'tagname', required: true, placeholder: "tag 资源标识" },
                {
                    name: 'options', type: 'object', value: [
                        {
                            name: 'audio', type: 'object', value: [
                                {
                                    name: 'micphoneId', type: 'string', value: null, placeholder: "麦克风id"
                                },
                                {
                                    name: 'sampleRate', type: 'number', value: null, placeholder: "采样率"
                                },
                            ],
                        },
                        {
                            name: 'video', type: 'object', value: [
                                {
                                    name: 'cameraId', type: 'string', value: null, placeholder: "相机id"
                                },
                                {
                                    name: 'faceMode', type: 'string', value: null,
                                },

                                {
                                    name: 'frameRate', type: 'string', value: null, placeholder: "格式：FPS_15"
                                },
                                {
                                    name: 'resolution', type: 'string', value: null, placeholder: "格式：W640_H360"
                                },
                            ],
                        },
                    ]
                },
            ]
        }
    }

    const createScreenVideoTrack = (service) => {
        return {
            isShow: false,
            name: '获取屏幕共享流',
            event: service.createScreenVideoTrack,
            eventName: 'createScreenVideoTrack',
            desc: '获取屏幕共享流',
            doc: 'https://doc.rongcloud.cn/live/Web/5.X/guide/advanced/video/share/web',
            params: [
                { name: 'tag', type: 'string', value: 'tagname', required: true, placeholder: "tag 资源标识" },
                {
                    name: 'options', type: 'object', value: [
                        // {
                        // name: 'video', type: 'object', value: [
                        {
                            name: 'frameRate', type: 'string', value: null, placeholder: "格式：FPS_15"
                        },
                        {
                            name: 'resolution', type: 'string', value: null, placeholder: "格式：W640_H360"
                        },
                        // ],
                        // },
                    ]
                },
            ]
        }
    }

    const createLocalAudioTrack_createLocalVideoTrack = (service) => {
        return {
            isShow: false,
            name: '获取屏幕共享资源（音视频）',
            event: service.createLocalAudioTrack_createLocalVideoTrack,
            eventName: 'createLocalAudioTrack_createLocalVideoTrack',
            desc: '<h1>123</h1> <br>1、通过 navigator.mediaDevices.getDisplayMedia \n 获取的共享屏幕（包括音、视频）',
            params: [
                { name: 'tag', type: 'string', value: 'tag123', required: true, placeholder: "资源id" },
            ]
        }
    }


    // ----直播-------------------------------------------------------------------------

    const joinLivingRoom = {
        isShow: false,
        name: '主播加入房间',
        event: LIVE.joinLivingRoom,
        eventName: 'joinLivingRoom',
        desc: '主播加入房间',
        doc: 'http://doc.rongcloud.cn/meeting/Web/5.X/room/basic#joinRoom',
        params: [
            { name: 'roomid', type: 'string', value: '123', required: true, placeholder: "房间id" },
        ]
    }

    const leaveLivingRoom = {
        isShow: false,
        name: '离开直播房间',
        event: LIVE.leaveRoom,
        eventName: 'leaveRoom',
        desc: '离开直播房间',
    }

    const buildLayout_setMixLayoutMode = {
        isShow: false,
        name: '修改布局模式',
        event: LIVE.buildLayout_setMixLayoutMode,
        eventName: 'builder.setMixLayoutMode',
        desc: `修改布局模式:CUSTOMIZE = 1;SUSPENSION = 2;ADAPTATION = 3`,
        params: [
            { name: 'MixLayoutMode', type: 'number', value: 2, required: true, placeholder: "`MixLayoutMode.SUSPENSION`: 悬浮布局（默认）" },
        ]
    }

    const buildLayout_setHostVideoTrack = {
        isShow: false,
        name: '设置主视频流',
        event: LIVE.buildLayout_setHostVideoTrack,
        eventName: 'builder.setHostVideoTrack',
        desc: '设置主视频流',
        params: [
            { name: 'trackId', type: 'string', value: null, required: true, placeholder: "设置主视频的 trackId" },
        ]
    }

    const buildLayout_setOutputVideo = {
        isShow: false,
        name: '视频流配置',
        event: LIVE.buildLayout_setOutputVideo,
        eventName: 'builder.setOutputVideo',
        desc: '视频流配置,即合流后观众端可观看到的视频质量相关参数',
        params: [
            {
                name: 'videoConfig', type: 'object', required: false, value: [
                    { name: 'MixVideoRenderMode', type: 'number', value: null, required: false, placeholder: "设置合流后的视频流渲染方式，默认值为 `MixVideoRenderMode.CROP`;CROP = 1;WHOLE = 2" },
                    { name: 'RCResolution', type: 'string', value: null, required: false, placeholder: "设置视频分辨率默认 W640_H480" },
                    { name: 'RCFrameRate', type: 'string', value: null, required: false, placeholder: "设置视频帧率 FPS_15" },
                    { name: 'bitrate', type: 'number', value: null, required: false, placeholder: "设置视频码率（不推荐主动设置，可能影响视频质量）" },
                ],
            },
        ]
    }


    const buildLayout_setOutputAudio = {
        isShow: false,
        name: '音频流配置',
        event: LIVE.buildLayout_setOutputAudio,
        eventName: 'builder.setOutputAudioBitrate',
        desc: '音频流配置(设置音频码率),即合流后观众端接收到的音频质量相关参数',
        params: [
            { name: 'bitrate', type: 'number', value: null, required: true, placeholder: "设置音频码率" },
        ]
    }


    const buildLayout_CustomizeLayoutVideo = {
        isShow: false,
        name: '自定义布局',
        event: LIVE.buildLayout_CustomizeLayoutVideo,
        eventName: 'builder.CustomizeLayoutVideo',
        desc: '在自定义布局中增加、移除视频流配置',
        params: [
            {
                name: 'layout', type: 'object', required: false, value: [
                    { name: 'addTrackId', type: 'string', value: null, required: false, placeholder: "增加视频流的 TrackId" },
                    { name: 'x', type: 'number', value: null, required: false, placeholder: "在画布中的坐标 x" },
                    { name: 'y', type: 'number', value: null, required: false, placeholder: "在画布中的坐标 y" },
                    { name: 'width', type: 'number', value: null, required: false, placeholder: "分辨率宽度" },
                    { name: 'height', type: 'number', value: null, required: false, placeholder: "分辨率高度" },
                    { name: 'removeTrackId', type: 'string', value: null, required: false, placeholder: "移除指定视频流 TrackId" },
                    { name: 'clear', type: 'boolean', value: false, required: false, placeholder: "清空已配置的自定义视频流布局" },
                ],
            },
        ]
    }

    const buildLayout_CustomizeInputAudio = {
        // 自定义音频合流
        isShow: false,
        name: '自定义音频合流',
        event: LIVE.buildLayout_CustomizeInputAudio,
        eventName: 'builder.CustomizeInputAudio',
        desc: '默认同一房间内的所有音频都会被合流至输出音频中。当需要对合流音频进行自定义时，可以通过如下接口实现。',
        params: [
            {
                name: 'layout', type: 'object', required: false, value: [
                    { name: 'setAudioTrackId1', type: 'string', value: null, required: false, placeholder: "第1个合流音频的 TrackId" },
                    { name: 'setAudioTrackId2', type: 'string', value: null, required: false, placeholder: "第2个合流音频的 TrackId" },
                    { name: 'setAudioTrackId3', type: 'string', value: null, required: false, placeholder: "向既有的音频流合流配置中动态增加一道音频流" },
                    { name: 'removeAudioTrackId', type: 'string', value: null, required: false, placeholder: "从既有的音频流合流配置中动态删除一道音频流" },
                    { name: 'clear', type: 'boolean', value: false, required: false, placeholder: "清除音频流合流配置，恢复房间内的全音频流合流输出" },
                ],
            },
        ]
    }

    const buildLayout_reset = {
        isShow: false,
        name: '重置默认配置',
        event: LIVE.buildLayout_reset,
        eventName: 'builder.reset',
        desc: '重置默认配置',
        params: [
            { name: 'clear', type: 'boolean', value: false, required: false, placeholder: "重置默认配置" },
        ]
    }

    // 跨房间连麦

    const roomPKInit = {
        isShow: false,
        name: '跨房间连麦-初始化、监听',
        event: LIVE.roomPKInit,
        eventName: 'roomPKInit',
        desc: '主播注册跨房间连麦事件监听、初始化',
    }

    const requestJoinOtherRoom = {
        isShow: false,
        name: '跨房间连麦-发起连麦邀请',
        event: LIVE.requestJoinOtherRoom,
        eventName: 'requestJoinOtherRoom',
        desc: '向指定房间的某个用户发送跨房间连麦请求',
        params: [
            { name: 'inviteeRoomId', type: 'string', value: null, required: true, placeholder: "被邀请者所处的房间 roomId" },
            { name: 'inviteeUserId', type: 'string', value: null, required: true, placeholder: "被邀请者 userId" },
            // {
            //     name: 'options', type: 'object', required: false, value: [
            //         { name: 'autoMix', type: 'boolean', value: true, required: false, placeholder: "是否【在加入副房间后自动】将邀请者发布的资源，合并到被邀请者房间内的 MCU 流中。【退出副房间会自动取消合并】" },
            //         { name: 'extra', type: 'string', value: null, required: false, placeholder: "附加信息，可随邀请连麦消息携带给被邀请者" },
            //     ]
            // },
        ]
    }

    const cancelRequestJoinOtherRoom = {
        isShow: false,
        name: '跨房间连麦-取消连麦邀请',
        event: LIVE.cancelRequestJoinOtherRoom,
        eventName: 'cancelRequestJoinOtherRoom',
        desc: '被邀请者未响应连麦请求时，邀请方取消发出去的跨房间连麦请求。',
        params: [
            { name: 'inviteeRoomId', type: 'string', value: null, required: true, placeholder: "被邀请者所处的房间 roomId" },
            { name: 'inviteeUserId', type: 'string', value: null, required: true, placeholder: "被邀请者 userId" },
            { name: 'extra', type: 'string', value: null, required: false, placeholder: "附加信息，可随邀请连麦消息携带给被邀请者" },
        ]
    }

    const responseJoinOtherRoom = {
        isShow: false,
        name: '跨房间连麦-响应连麦请求',
        event: LIVE.responseJoinOtherRoom,
        eventName: 'responseJoinOtherRoom',
        desc: '被邀请者未响应连麦请求时，邀请方取消发出去的跨房间连麦请求。',
        params: [
            { name: 'inviteeRoomId', type: 'string', value: null, required: true, placeholder: "被邀请者所处的房间 roomId" },
            { name: 'inviteeUserId', type: 'string', value: null, required: true, placeholder: "被邀请者 userId" },
            { name: 'agree', type: 'boolean', value: true, required: false, placeholder: "是否同意连麦?" },
            {
                name: 'options', type: 'object', required: false, value: [
                    { name: 'autoMix', type: 'boolean', value: true, required: false, placeholder: "是否【在加入副房间后自动】将邀请者发布的资源，合并到被邀请者房间内的 MCU 流中。【退出副房间会自动取消合并】" },
                    { name: 'extra', type: 'string', value: null, required: false, placeholder: "附加信息，可随邀请连麦消息携带给被邀请者" },
                ]
            },
            // { name: 'extra', type: 'string', value: null, required: false, placeholder: "附加信息，可随邀请连麦消息携带给被邀请者" },
        ]
    }

    const joinOtherRoom = {
        isShow: false,
        name: '跨房间连麦-加入副房间',
        event: LIVE.joinOtherRoom,
        eventName: 'joinOtherRoom',
        desc: '在连麦邀请方与被邀请方建立连麦关系后，加入副房间',
        doc: 'http://doc.rongcloud.cn/meeting/Web/5.X/room/basic#joinRoom',
        params: [
            { name: 'roomid', type: 'string', value: '123', required: true, placeholder: "房间id" },
        ]
    }

    const leaveOtherRoom = {
        isShow: false,
        name: '跨房间连麦-退出副房间',
        event: LIVE.leaveOtherRoom,
        eventName: 'leaveOtherRoom',
        desc: '退出副房间，参数 isQuitPK 为 false 时，连麦关系依然存在，可重新加入副房间。',
        doc: 'https://doc.rongcloud.cn/live/Web/5.X/guide/joinManage/joinAcross/web#leaveOtherRoom',
        params: [
            { name: 'isQuitPK', type: 'boolean', value: true, required: false, placeholder: "isQuitPK 是否结束连麦" },
        ]
    }

    const getAllPKInfo = {
        isShow: false,
        name: '跨房间连麦-获取所有的连麦信息',
        event: LIVE.getAllPKInfo,
        eventName: 'getAllPKInfo',
        desc: '1、退出副房间，参数；2、获取所有的连麦信息；3、获取指定副房间的连麦信息',
        doc: 'https://doc.rongcloud.cn/live/Web/5.X/guide/joinManage/joinAcross/web#leaveOtherRoom',
        params: [
            { name: 'roomId', type: 'string', value: '123', required: true, placeholder: "房间id" },
        ]
    }



    // 观众

    const joinLivingRoomAsAudience = {
        isShow: false,
        name: '观众加房间',
        event: LIVE.joinLivingRoomAsAudience,
        eventName: 'joinLivingRoomAsAudience',
        desc: '观众加入直播房间',
        params: [
            { name: 'roomid', type: 'string', value: "123", required: true, placeholder: "房间id" },
        ]
    }

    const leaveLivingRoomAsAudience = {
        isShow: false,
        name: '观众退出房间',
        event: LIVE.leaveLivingRoomAsAudience,
        eventName: 'leaveLivingRoomAsAudience',
        desc: '观众退出房间',
    }

    const upgradeToAnchorRoom = {
        isShow: false,
        name: '观众升级为主播',
        event: LIVE.upgradeToAnchorRoom,
        eventName: 'upgradeToAnchorRoom',
        desc: '观众升级为主播房间,只有升级为主播是才能执行主播的 api （比如发布资源publish）',
    }

    const testButtonList = window.__RCTestButtonApiList;



    window.__RCMETTINGApiList = window.__RCMETTINGApiList || [
        [joinRTCRoom, leaveRoom],
        [createMicrophoneAudioTrack(METTING), createMicrophoneAndCameraTracks(METTING), createScreenVideoTrack(METTING), createLocalAudioTrack_createLocalVideoTrack(METTING)],
        testButtonList,
    ];

    window.__RCLIVEApiList = window.__RCLIVEApiList || [
        [joinLivingRoom, leaveLivingRoom],
        [createMicrophoneAudioTrack(LIVE), createMicrophoneAndCameraTracks(LIVE), createScreenVideoTrack(LIVE), createLocalAudioTrack_createLocalVideoTrack(LIVE)],
        [roomPKInit, requestJoinOtherRoom, cancelRequestJoinOtherRoom, responseJoinOtherRoom, joinOtherRoom, leaveOtherRoom, getAllPKInfo,],
        [buildLayout_setMixLayoutMode, buildLayout_setHostVideoTrack, buildLayout_setOutputVideo, buildLayout_setOutputAudio, buildLayout_CustomizeLayoutVideo, buildLayout_CustomizeInputAudio, buildLayout_reset]
    ];
    window.__RCAudienceApiList = window.__RCAudienceApiList || [
        [joinLivingRoomAsAudience, leaveLivingRoomAsAudience, upgradeToAnchorRoom],
        [createMicrophoneAudioTrack(LIVE), createMicrophoneAndCameraTracks(LIVE), createScreenVideoTrack(LIVE), createLocalAudioTrack_createLocalVideoTrack(LIVE)],
    ]
    // 需要注册监听函数以及返回远端tracks
    window.__RCJoinRoomApiList = window.__RCJoinRoomApiList || [
        joinRTCRoom, joinLivingRoom, joinOtherRoom, joinLivingRoomAsAudience, roomPKInit
    ]
})(window)