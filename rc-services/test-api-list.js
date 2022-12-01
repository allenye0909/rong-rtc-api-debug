/**
 * 特殊情况使用
 */
(function (window) {
    console.log(window);
    const { __RCServices: { IM, METTING, LIVE } } = window;


    // const joinRTCRoom = {
    //     isShow: false,
    //     name: '加入会议房间',
    //     event: METTING.joinRTCRoom,
    //     eventName: 'joinRTCRoom',
    //     desc: '加入会议房间',
    //     doc: 'http://doc.rongcloud.cn/meeting/Web/5.X/room/basic#joinRoom',
    //     params: [
    //         { name: 'roomid', type: 'string', value: '123', required: true, placeholder: "房间id" },
    //     ]
    // }

    /**
     * @description 自定义调用 api 模板如下
     */
    const createLocalAudioTrack_createLocalVideoTrack = {
        isShow: false,
        name: '获取屏幕共享资源（音视频）',
        event: async (tag) => {
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
        eventName: 'createLocalAudioTrack_createLocalVideoTrack',
        desc: '通过 navigator.mediaDevices.getDisplayMedia 获取的共享屏幕（包括音、视频）',
        params: [
            { name: 'tag', type: 'string', value: 'tag123', required: true, placeholder: "资源id" },
        ]
    }

    window.__RCTestButtonApiList = [createLocalAudioTrack_createLocalVideoTrack]

})(window)