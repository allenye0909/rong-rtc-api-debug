(function (params) {
    const RCStorage = {
        key: 'RC-demo-userList',
        // value: [
        //     {
        //         label: "appkey--userId",
        //         value: "appkey--token"
        //     }
        // ],
        get: function (key) {
            var str = localStorage.getItem(key);
            return JSON.parse(str)
        },
        set: function (key, val) {

            const str = JSON.stringify(val);
            localStorage.setItem(key, str);
        }
    }
    const updateStorageUserList = (appkey, token, userId) => {
        const userInfo =
        {
            label: `${appkey}--${userId}`,
            value: `${appkey}--${token}`
        }
        const userList = getStorageUserList();

        userList
            &&
            userList.findIndex(userItem => {
                const [_appkey, _user] = userItem.label.split("--");
                return appkey === _appkey && _user === userId
            }) < 0
            &&
            userList.push(userInfo)
        RCStorage.set(RCStorage.key, userList)
    }


    const getStorageUserList = () => {
        return RCStorage.get(RCStorage.key) || []
    }
    const __RCUtils = {
        // RCStorage,
        updateStorageUserList,
        getStorageUserList,
        getAPIAllParams(params) {
            const allParams = []
            params && params.forEach(oneLevel => {
                if (oneLevel.type === 'object') {
                    let oneObj = {}
                    oneLevel.value.forEach((twoLevel) => {
                        if (twoLevel.type === 'object') {
                            oneObj[twoLevel.name] = {}
                            twoLevel.value.forEach(threeLevel => {
                                if (threeLevel.value || threeLevel.value === false) {
                                    oneObj[twoLevel.name][threeLevel.name] = threeLevel.value;
                                }
                            })
                        } else {
                            oneObj[twoLevel.name] = twoLevel.value
                        }
                    })
                    if (JSON.stringify(oneObj) !== "{}") allParams.push(oneObj)
                } else {
                    oneLevel.value && allParams.push(oneLevel.value)
                }

            });

            return allParams;
        },
        play(track) {
            track.isVideoTrack() && track.play(document.getElementById(track._id));
            // 不播放音频本端视频
            track.isAudioTrack() && !track.isLocalTrack() && track.play()
        },
        getTemplateById(id) {
            var dom = document.getElementById(id)
            return dom.innerHTML
        },
    }

    window.__RCUtils = __RCUtils
})()