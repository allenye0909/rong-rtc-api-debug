(function (window) {
    const {
        __RCMETTINGApiList, __RCLIVEApiList,
        __RCUtils: { getAPIAllParams, play, getTemplateById },
        __RCServices: { METTING, LIVE },
        ElementPlus: { ElMessage: $message },
        Vue: { ref, reactive, toRefs, defineProps, computed, shallowReactive, toRaw },
        Vuex: { useStore }
    } = window;
    window.__RCTrackList = [];

    window.DEBUG = false;

    const log = (...msg) => {
        DEBUG && console.log(...msg)
    }


    /**
     * @description 下面 API 需要注册监听
     */
    const registerRoomEventListenerApiList = ["joinRTCRoom", "joinLivingRoom", "joinOtherRoom", "roomPKInit", "joinLivingRoomAsAudience", "upgradeToAnchorRoom"];
    /**
     * desc: 用于区分主房间副房间的 track 。
     */
    const specialApi = "joinOtherRoom";


    const setup = (props, { emit }) => {
        const state = reactive({
            trackList: [],
            isParamsDialogVisible: false,
            apiList: computed(() => store.getters.apiList) || [], // 连接成功后赋值
            serviceMode: computed(() => store.getters.serviceMode)
        })
        const store = useStore()

        const getServiceApi = (api) => {
            const service = state.serviceMode === 0 ? METTING[api] : LIVE[api];
            return service;
        }


        const pageClickEvent = () => {
            /**
             *
             * @desc 所有 API 都从这里执行，返回数据后并处理。
             */
            const runApi = async (data) => {
                const allParams = getAPIAllParams(data.params);
                if (registerRoomEventListenerApiList.includes(data.eventName)) {
                    const roomPKInitWatcher = {
                        /**
                         * 收到连麦邀请，此时可调 roomPKHandler.responseJoinOtherRoom 响应连麦
                         */
                        onRequestJoinOtherRoom(info) {
                            store.commit('setTreeData', { ...{ eventName: "收到连麦邀请" }, ...{ info } })
                            $message.success("收到连麦邀请，此时可调 roomPKHandler.responseJoinOtherRoom 响应连麦")
                        },
                        /**
                         * 收到连麦邀请已被取消
                         */
                        onCancelRequestOtherRoom(info) {
                            store.commit('setTreeData', { ...{ eventName: "收到连麦邀请已被取消" }, ...{ info } })
                            $message.success("收到连麦邀请已被取消")
                        },
                        /**
                         * 收到被邀请方应答，数据中包含对方是否同意请求
                         * 如果对方同意连麦，此时可调 roomPKHandler.joinOtherRoom 加入对方房间
                         */
                        onResponseJoinOtherRoom: (info) => {
                            store.commit('setTreeData', { ...{ eventName: "收到被邀请方应答" }, ...{ info } })
                            info.agree && $message.success("对方同意连麦，此时可调 roomPKHandler.joinOtherRoom 加入对方房间")
                        },
                        /**
                         * 收到连麦结束通知
                         * 连麦结束时，plugin-rtc 内部会退出副房间，业务层只需做 UI 处理
                         */
                        onFinishOtherRoom: (info) => {
                            $message.success("收到连麦结束通知")
                            store.commit('setTreeData', { ...{ eventName: "收到被邀请方应答" }, ...{ info } })
                        }
                    }

                    const commonWatcher = {
                        onKickOff(byServer) {
                            console.log("本端被踢出房间时触发", byServer)
                        },
                        onTrackPublish(tracks) {
                            log("otherRoomWatcher onTrackPublish", tracks)
                            if (data.eventName === specialApi) tracks.forEach(track => track.isOtherRoom = true) // 区分otherRoom发布的track
                            if (state.trackList.length >= 1) {
                                tracks.forEach(track => {
                                    let isHave = false
                                    state.trackList.forEach((_track) => { if (_track._id === track._id) { isHave = true } })
                                    !isHave && state.trackList.push(track)
                                })
                            } else {
                                state.trackList = tracks
                            }
                        },
                        async onTrackUnpublish(tracks) {
                            log("onTrackUnpublish", tracks)
                            tracks.forEach(track => state.trackList = state.trackList.filter(_track => _track._id !== track._id))
                        },
                        onTrackReady(track) {
                            log("onTrackReady->", track)
                            play(track);
                        },
                        // TODO 区分注册跨房间连麦监听
                        ...roomPKInitWatcher,
                    }


                    allParams.push(commonWatcher)
                }

                log(data, allParams)


                let responseData = await data.event.apply(null, allParams);
                log("执行api：", data.eventName, allParams, responseData)

                const { tracks, track, room: roomInstance } = responseData;


                if (track) {
                    if (data.eventName === specialApi) {
                        track.isOtherRoom = true;
                    }
                    track && store.commit('setTrackList', [track]);
                    state.trackList = [...state.trackList, ...[track]]
                    setTimeout(() => {
                        state.trackList && state.trackList.forEach(_track => {
                            _track._isLocalTrack && play(_track)
                        });
                    });
                }
                if (data.eventName === "upgradeToAnchorRoom") {
                    state.trackList = [];
                }


                if (tracks) {
                    if (data.eventName === specialApi) {
                        tracks.forEach((track) => {
                            track.isOtherRoom = true
                        })
                    }
                    tracks && store.commit('setTrackList', tracks)
                    state.trackList = [...state.trackList, ...tracks]

                    setTimeout(() => {
                        state.trackList && state.trackList.forEach(track => {
                            track._isLocalTrack && play(track)
                        });
                    });
                }

                if (roomInstance) responseData.room = null // vue-json-pretty 不能处理room对象
                responseData = JSON.parse(JSON.stringify(responseData))
                store.commit('setTreeData', { ...{ eventName: data.eventName }, ...responseData })

                if (data.eventName === "leaveRoom") {
                    state.trackList = [];
                }
                if (data.eventName === "leaveOtherRoom") {
                    state.trackList = state.trackList.filter(_track => !track.isOtherRoom)
                }
            }
            /**
             *
             * @desc 放大 video 标签
             */
            const resizeVideo = (track) => {
                if (track._kind === "video" && track.isSubscrib) track.isZoomin = !track.isZoomin
            }
            /**
             *
             * @desc 禁用启用资源
             */
            const handleMuteTrack = (track) => {
                if (track.__localMuted) {
                    const unmute = getServiceApi("unmute")
                    unmute(track)
                } else {
                    const mute = getServiceApi("mute")
                    mute(track)
                }
                track.__localMuted = !track.__localMuted
            }
            /**
             *
             * @desc 发布、取消发布资源
             */
            const handlePublishTrack = async (track) => {
                console.log(state.serviceMode)
                let data;
                if (state.serviceMode === 0) {
                    if (getServiceApi("getMettingRoom")() === null) return $message.error("请先调用加入会议房间");
                } else if (state.serviceMode === 1 || state.serviceMode === 2) {
                    if (getServiceApi("getAnchorRoom")() === null) return $message.error("请先调用主播加入房间");
                }
                if (track.isPublished()) {
                    try {
                        const unpublish = getServiceApi("unpublish")
                        data = await unpublish([track]);
                        if (data.code === 10000) {
                            store.commit('setTreeData', { ...{ eventName: "unpublish" }, ...data })
                            log("取消发布", track)

                        }
                    } catch (ERROR) {
                        store.commit('setTreeData', { ...{ eventName: "unpublish" }, ERROR })
                    }

                } else {
                    try {
                        const publish = getServiceApi("publish")
                        data = await publish([track]);
                        if (data.code === 10000) {
                            log("发布", track)
                            store.commit('setTreeData', { ...{ eventName: "publish" }, ...data })
                        }
                        log(data)
                    } catch (ERROR) {
                        log(ERROR)
                        store.commit('setTreeData', { ...{ eventName: "publish" }, ERROR })
                    }

                }

            }
            /**
             *
             * @desc 订阅、取消订阅资源
             */
            const handleSubscribeTrack = async (track) => {
                log("handleSubscribeTrack", track)
                // track = toRaw(track)
                let data;
                if (track.isSubscribed()) {
                    const unsubscribe = getServiceApi("unsubscribe")
                    const _track = toRaw(track);
                    data = await unsubscribe([_track], track.isOtherRoom);
                    if (data.code === 10000) {
                        track.isSubscrib = false
                        store.commit('setTreeData', { ...{ eventName: "unsubscribe" }, ...data })
                    }

                } else {
                    const subscribe = getServiceApi("subscribe")
                    const _track = toRaw(track);
                    data = await subscribe([_track], track.isOtherRoom);
                    if (data.code === 10000) {
                        track.isSubscrib = true
                        store.commit('setTreeData', { ...{ eventName: "subscribe" }, ...data })
                    }
                }
                log(track.isSubscribed())
            }
            /**
             *
             * @desc 销毁资源
             */
            const handelDestroy = (track) => {
                log("handelDestroy")
                track.destroy();
                state.trackList = state.trackList.filter(_track => track._id !== _track._id)
            }

            return { handleMuteTrack, runApi, handlePublishTrack, handleSubscribeTrack, resizeVideo, handelDestroy }
        }




        return {
            ...toRefs(state),
            ...pageClickEvent()
        }
    }

    window.__RCComponents = window.__RCComponents || {};
    window.__RCComponents.api = {
        setup,
        template: getTemplateById("api-component")
    }



})(window)