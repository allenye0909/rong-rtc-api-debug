(function (window) {
    const { installer, RCRTCClient, RCTrack, RCFrameRate, RCResolution, RCLivingType, RCRTCCode, device, RCMCUConfigBuilder } = RCRTC;

    const IM = {
        connect(config, watcher) {
            const { appkey, token, logLevel } = config;
            RongIMLib.init({ appkey, logLevel });
            const Events = RongIMLib.Events;

            watcher.watchMessage && RongIMLib.addEventListener(Events.MESSAGES, watcher.watchMessage)
            watcher.watchDisconnect && RongIMLib.addEventListener(Events.DISCONNECT, watcher.watchDisconnect)
            watcher.watchConnected && RongIMLib.addEventListener(Events.CONNECTED, watcher.watchConnected)

            return Promise.resolve(RongIMLib.connect(token))
        }
    }


    const LIVE = {
        desc: "直播",
        rtcClient: null,
        anchorRoom: null,
        roomPKHandler: null,
        otherRoom: null, // 副房间
        audienceRoom: null,
        rtcInit() {
            const rtcClient = RongIMLib.installPlugin(installer, { /*初始化参数请参考下方参数说明*/ });
            LIVE.rtcClient = rtcClient;
        },
        async joinLivingRoom(roomId, watcher) {
            const { code, room, userIds, tracks, PKRoomIds } = await LIVE.rtcClient.joinLivingRoom(roomId, 0, 0)
            LIVE.anchorRoom = room;
            LIVE.audienceRoom = null;
            LIVE.otherRoom = null;
            LIVE.anchorRoom && LIVE.anchorRoom.registerRoomEventListener(watcher);
            return { code, room, userIds, tracks, PKRoomIds };
        },
        getAnchorRoom() {
            return LIVE.anchorRoom
        },

        async buildLayout_setMixLayoutMode(MixLayoutMode) {
            // 修改布局模式
            /**
             * 设置合流布局模式，当使用 `MixLayoutMode.CUSTOMIZE` 模式时，需自定义合流后的输出流布局结构
             * @param mode
             * * `MixLayoutMode.CUSTOMIZE`: 自定义布局，需用户设置布局结构
             * * `MixLayoutMode.SUSPENSION`: 悬浮布局（默认）
             * * `MixLayoutMode.ADAPTATION`: 自适应布局
             */
            const builder = LIVE.anchorRoom.getMCUConfigBuilder();
            builder.setMixLayoutMode(MixLayoutMode)

            const data = await builder.flush();

            return data
        },
        async buildLayout_setHostVideoTrack(trackId) {
            // 设置主视频流
            const builder = LIVE.anchorRoom.getMCUConfigBuilder();
            builder.setHostVideoTrack(trackId)

            const data = await builder.flush();

            return data
        },
        async buildLayout_setOutputVideo({ MixVideoRenderMode, RCResolution, RCFrameRate, bitrate }) {
            const builder = LIVE.anchorRoom.getMCUConfigBuilder();
            MixVideoRenderMode && builder
                // 设置合流后的视频流渲染方式，默认值为 `MixVideoRenderMode.CROP`
                // `MixVideoRenderMode.CROP`: 当画布尺寸与视频分辨率比例不同时，裁剪视频内容
                // `MixVideoRenderMode.WHOLE`: 当画布尺寸与视频分辨率不同时，压缩视频尺寸以填充画布
                .setOutputVideoRenderMode(MixVideoRenderMode)
            RCResolution && builder
                // 设置视频分辨率
                .setOutputVideoResolution(RCResolution)
            RCFrameRate && builder
                // 设置视频帧率
                .setOutputVideoFPS(RCFrameRate)
            bitrate && builder
                // 设置视频码率（不推荐主动设置，可能影响视频质量）
                .setOutputVideoBitrate(bitrate)

            const data = await builder.flush();

            return data
        },
        async buildLayout_setOutputAudio(bitrate) {
            const builder = LIVE.anchorRoom.getMCUConfigBuilder();
            // 设置音频码率（不推荐主动设置，可能影响声音质量）
            bitrate && builder.setOutputAudioBitrate(bitrate)

            const data = await builder.flush();

            return data
        },
        async buildLayout_CustomizeLayoutVideo({ addTrackId, x, y, width, height, removeTrackId, clear }) {
            // 自定义布局
            const builder = LIVE.anchorRoom.getMCUConfigBuilder();

            /**
             * 在自定义布局中增加视频流配置
             * @param trackId 资源 Id
             * @param x - 在画布中的横向坐标点
             * @param y - 在画布中的纵向坐标点
             * @param width 视频分辨率宽度
             * @param height 视频分辨率高度
             */
            addTrackId && x && y && width && height && builder
                .addCustomizeLayoutVideo(addTrackId, x, y, width, height)
            /**
             * 在自定义布局配置中移除指定视频流
             * @param trackId 视频资源 Id
             */
            removeTrackId && builder
                .removeCustomizeLayoutVideo(removeTrackId)
            /**
             * 清空已配置的自定义视频流布局
             */
            clear && builder
                .clearCustomizeLayoutVideo()


            const data = await builder.flush();

            return data
        },
        //自定义音频合流
        async buildLayout_CustomizeInputAudio({ setAudioTrackId1, setAudioTrackId2, addAudioTrackId3, removeAudioTrackId, clear }) {
            const builder = LIVE.anchorRoom.getMCUConfigBuilder();

            setAudioTrackId1 && setAudioTrackId2 && builder
                /**
                 * 覆盖设置合流媒体中的音频流
                 * @param trackIds 音频流 trackId 数组，当数组长度为 0 时，则合流媒体中将无音频输出
                 * @returns
                 */
                .setCustomizeInputAudio([setAudioTrackId1, setAudioTrackId2])
            addAudioTrackId3 && builder
                /**
                 * 向既有的音频流合流配置中动态增加一道音频流
                 * @param trackId 音频 trackId
                 */
                .addCustomizeInputAudio(addAudioTrackId3)
            removeAudioTrackId && builder
                /**
                 * 从既有的音频流合流配置中动态删除一道音频流
                 * @param trackId 音频对应的 trackId
                 */
                .removeCustomizeInputAudio(removeAudioTrackId)
            clear && builder
                /**
                 * 清除音频流合流配置，恢复房间内的全音频流合流输出
                 */
                .clearCustomizeInputAudio()

            const data = await builder.flush();

            return data


        },
        async buildLayout_reset(isReset) {
            const builder = LIVE.anchorRoom.getMCUConfigBuilder();
            isReset && builder.reset()
            const data = await builder.flush();

            return data
        },

        // ---------跨房间连麦----------------------
        async roomPKInit(watcher) {
            // room 为主播加入各自直播间后，得到的直播房间 room 实例
            if (!LIVE.anchorRoom) return { msg: "请先加入主播房间" }
            const { roomPKHandler } = LIVE.anchorRoom.getRoomPKHandler();
            LIVE.roomPKHandler = roomPKHandler;
            LIVE.roomPKHandler.registerRoomPKEventListener(watcher);
            return { code: RCRTCCode.SUCCESS }
        },
        async requestJoinOtherRoom(inviteeRoomId, inviteeUserId, options) {
            /**
             * 发起跨房间连麦请求
             * @param inviteeRoomId 被邀请者所处的房间 roomId
             * @param inviteeUserId 被邀请者 userId
             * @param options.autoMix 是否【在加入副房间后自动】将邀请者发布的资源，合并到被邀请者房间内的 MCU 流中。【退出副房间会自动取消合并】
             * @param options.extra 附加信息，可随邀请连麦消息携带给被邀请者
             */
            if (!LIVE.roomPKHandler) return { msg: "请先初始化跨房间连麦" }
            return await LIVE.roomPKHandler.requestJoinOtherRoom(inviteeRoomId, inviteeUserId, options)
        },

        async cancelRequestJoinOtherRoom(inviteeRoomId, inviteeUserId, extra) {
            /**
             * 取消跨房间连麦请求
             * @param inviteeRoomId 被邀请者所处的房间 roomId
             * @param inviteeUserId 被邀请者 userId
             * @param extra 附加信息，可随取消邀请连麦消息携带给被邀请者
             */
            if (!LIVE.roomPKHandler) return { msg: "请先初始化跨房间连麦" }
            const { code } = await LIVE.roomPKHandler.cancelRequestJoinOtherRoom(inviteeRoomId, inviteeUserId, extra);
            return code
        },

        async responseJoinOtherRoom(inviterRoomId, inviterUserId, agree, options) {
            /**
             * 响应跨房间连麦请求
             * @param inviterRoomId 邀请者所处的房间 roomId
             * @param inviterUserId 邀请者 userId
             * @param agree 是否同意连麦
             * @param options.autoMix 是否【在加入副房间后自动】将被邀请者发布的资源，合并到邀请者房间内的 MCU 流中。【退出副房间会自动取消合并】
             * @param options.extra 附加信息，可随响应连麦消息携带给邀请者
             */
            const { code } = await LIVE.roomPKHandler.responseJoinOtherRoom(inviterRoomId, inviterUserId, agree, options)
            return code
        },

        async joinOtherRoom(roomId, watcher) {
            /**
             * 加入副房间
             * @param roomId 副房间 Id, 支持大小写英文字母、数字、部分特殊符号 + = - _ 的组合方式 最长 64 个字符
             */
            const data = await LIVE.roomPKHandler.joinOtherRoom(roomId, watcher)
            const { room, userIds, tracks } = data;
            LIVE.otherRoom = room || null;
            // 注册房间事件监听器
            if (!room) return { data }
            room.registerRoomEventListener(watcher);
            if (data.code === RCRTCCode.SUCCESS) {
                // LIVE.anchorRoom = null
                LIVE.audienceRoom = null
                //     const { room: otherRoom, userIds, tracks } = data
                //     console.log('房间实例: ', otherRoom)
                //     console.log('房间内人员: ', userIds)
                //     console.log('房间内资源: ', tracks)
            }
            return data;
        },

        async leaveOtherRoom(isQuitPK) {
            /**
             * 退出副房间
             * @param room 要退出的副房间 room 实例
             * @param isQuitPK 是否结束连麦
             */
            const { code } = await roomPKHandler.leaveOtherRoom(LIVE.otherRoom, isQuitPK)

            return code;
        },

        async getAllPKInfo(roomId) {
            if (!LIVE.otherRoom) { return { msg: "请先加入副房间" } }
            /**
             * @since version 5.3.2
             */
            const isMainRoom = await LIVE.otherRoom.isMainRoom()

            /**
             * @since version 5.3.2
             */
            const allPKInfo = await LIVE.roomPKHandler.getAllPKInfo()
            /**
             * 获取连麦信息
             * @param roomId 连麦房间的 roomId
             */
            const PKInfo = await LIVE.roomPKHandler.getPKInfo(roomId)
            return {
                isMainRoom, allPKInfo, PKInfo
            }
        },

        // 观众端
        async joinLivingRoomAsAudience(roomId, watcher) {
            const { room, RTCTracks, MCUTracks, CDNUris, userIds, code } = await LIVE.rtcClient.joinLivingRoomAsAudience(roomId, 0);
            if (code !== RCRTCCode.SUCCESS) return { code }
            LIVE.audienceRoom = room;
            LIVE.audienceRoom && LIVE.audienceRoom.registerRoomEventListener(watcher);
            const tracks = [...RTCTracks, ...MCUTracks]
            return { room, tracks, RTCTracks, MCUTracks, CDNUris, userIds, code }
        },
        async leaveLivingRoomAsAudience() {
            return LIVE.rtcClient.leaveLivingRoomAsAudience(LIVE.audienceRoom);
        },
        async upgradeToAnchorRoom(watcher) {
            const { code, room, tracks, userIds } = await LIVE.rtcClient.upgradeToAnchorRoom(LIVE.audienceRoom);
            if (code !== RCRTCCode.SUCCESS) return { code, room, tracks, userIds, msg: 'upgrade failed' }
            LIVE.anchorRoom = room;
            LIVE.audienceRoom = null;
            LIVE.otherRoom = null;
            LIVE.anchorRoom && LIVE.anchorRoom.registerRoomEventListener(watcher);
            return { code, room, tracks, userIds }
        },






        // live common
        leaveRoom() {
            return LIVE.rtcClient.leaveRoom(LIVE.anchorRoom)
        },

        createMicrophoneAudioTrack(tag, opts) {
            return LIVE.rtcClient.createMicrophoneAudioTrack(tag, opts)
        },
        createCameraVideoTrack(tag, opts) {
            return LIVE.rtcClient.createCameraVideoTrack(tag, opts)
        },
        createMicrophoneAndCameraTracks(tag, opts) {
            return LIVE.rtcClient.createMicrophoneAndCameraTracks(tag, opts)
        },
        createScreenVideoTrack(tag, opts) {
            return LIVE.rtcClient.createScreenVideoTrack(tag, opts)
        },
        async createLocalAudioTrack_createLocalVideoTrack(tag) {
            /**
             * @describtion 通过 navigator.mediaDevices.getDisplayMedia 获取的共享屏幕（包括音、视频）
             */
            const mediastream = await navigator.mediaDevices.getDisplayMedia({ audio: true, video: true })
            console.log(mediastream.getAudioTracks(), mediastream.getVideoTracks())
            const audioTrack = await LIVE.rtcClient.createLocalAudioTrack('tagaudioTrack' + tag, mediastream.getAudioTracks()[0])

            const videoTrack = await LIVE.rtcClient.createLocalVideoTrack('tagvideoTrack' + tag, mediastream.getVideoTracks()[0])

            const tracks = [];
            if (audioTrack.code === 10000) tracks.push(audioTrack.track)
            if (videoTrack.code === 10000) tracks.push(videoTrack.track)


            return {
                code: 10000,
                audioTrack: {
                    code: audioTrack.code,
                    track: audioTrack.toString()
                },
                videoTrack: {
                    code: videoTrack.code,
                    track: videoTrack.toString()
                },
                tracks
            }
        },
        publish(tracks) {
            const room = LIVE.anchorRoom
            return room.publish(tracks)
        },
        unpublish(tracks) {
            const room = LIVE.anchorRoom
            return room.unpublish(tracks)
        },

        async subscribe(tracks, isOtherRoom) {
            // 思路：
            // 从获取track的源头（加房间时、监听track发布时）区分track。
            if (isOtherRoom) return LIVE.otherRoom.subscribe(tracks);
            const room = LIVE.anchorRoom || LIVE.audienceRoom
            const data = await room.subscribe(tracks)
            return data;
        },

        unsubscribe(tracks, isOtherRoom) {
            if (isOtherRoom) return LIVE.otherRoom.unsubscribe(tracks)
            const room = LIVE.anchorRoom || LIVE.audienceRoom || LIVE.otherRoom
            return room.unsubscribe(tracks)
        },


        unmute(track) {
            try {
                track.unmute()
            } catch (err) {
                return "unmute false:" + err
            }
        },

        mute(track) {
            try {
                track.mute()
            } catch (err) {
                return "unmute false:" + err
            }
        }





    }

    const METTING = {
        desc: "会议",
        mettingRoom: null,
        rtcClient: null,
        rtcInit() {
            const rtcClient = RongIMLib.installPlugin(installer, { /*初始化参数请参考下方参数说明*/ });
            METTING.rtcClient = rtcClient;
        },
        async joinRTCRoom(roomId, watcher) {
            const { code, room, userIds, tracks } = await METTING.rtcClient.joinRTCRoom(roomId);
            METTING.mettingRoom = room;
            METTING.mettingRoom && METTING.mettingRoom.registerRoomEventListener(watcher);
            // 若加入失败，则 room、userIds、tracks 值为 undefined
            return { code, room, userIds, tracks }
        },
        getMettingRoom() {
            return METTING.mettingRoom
        },




        leaveRoom() {
            return METTING.rtcClient.leaveRoom(METTING.mettingRoom)
        },

        createMicrophoneAudioTrack(tag, opts) {
            return METTING.rtcClient.createMicrophoneAudioTrack(tag, opts)
        },
        createCameraVideoTrack(tag, opts) {
            return METTING.rtcClient.createCameraVideoTrack(tag, opts)
        },
        createMicrophoneAndCameraTracks(tag, opts) {
            return METTING.rtcClient.createMicrophoneAndCameraTracks(tag, opts)
        },
        createScreenVideoTrack(tag, opts) {
            return METTING.rtcClient.createScreenVideoTrack(tag, opts)
        },
        async createLocalAudioTrack_createLocalVideoTrack(tag) {
            /**
             * @describtion 通过 navigator.mediaDevices.getDisplayMedia 获取的共享屏幕（包括音、视频）
             */
            const mediastream = await navigator.mediaDevices.getDisplayMedia({ audio: true, video: true })
            console.log(mediastream.getAudioTracks(), mediastream.getVideoTracks())
            const audioTrack = await METTING.rtcClient.createLocalAudioTrack('tagaudioTrack' + tag, mediastream.getAudioTracks()[0])

            const videoTrack = await METTING.rtcClient.createLocalVideoTrack('tagvideoTrack' + tag, mediastream.getVideoTracks()[0])

            const tracks = [];
            if (audioTrack.code === 10000) tracks.push(audioTrack.track)
            if (videoTrack.code === 10000) tracks.push(videoTrack.track)


            return {
                code: 10000,
                audioTrack: {
                    code: audioTrack.code,
                    track: audioTrack.toString()
                },
                videoTrack: {
                    code: videoTrack.code,
                    track: videoTrack.toString()
                },
                tracks
            }
        },
        publish(tracks) {
            const room = METTING.mettingRoom
            return room.publish(tracks)
        },
        unpublish(tracks) {
            const room = METTING.mettingRoom
            return room.unpublish(tracks)
        },

        subscribe(tracks) {
            const room = METTING.mettingRoom
            return room.subscribe(tracks)
        },

        unsubscribe(tracks) {
            const room = METTING.mettingRoom
            return room.unsubscribe(tracks)
        },


        unmute(track) {
            try {
                track.unmute()
            } catch (err) {
                return "unmute false:" + err
            }
        },

        mute(track) {
            try {
                track.mute()
            } catch (err) {
                return "unmute false:" + err
            }
        }
    }






    window.__RCServices = {
        IM,
        METTING,
        LIVE
    }

    console.log(__RCServices)
})(window)