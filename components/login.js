(function (window) {
    const {
        __RCUtils: { updateStorageUserList, getStorageUserList, getTemplateById },
        Vue: { ref, reactive, toRefs },
        Vuex: { useStore },
        ElementPlus: { ElMessage: $message }
    } = window


    const state = reactive({
        config: {
            appkey: "",
            token: "",
            // logLevel: 3,
            navigators: [] //自定义导航地址，公有云用户不推荐修改
        },
        logLevelData: {
            list: {
                "DEBUG": 0,
                "INFO": 1,
                "WARN": 2,
                "ERROR": 3,
                "FATAL": 4,
                "NONE": 1000,
            },
            info: null
        },
        userData: {
            list: getStorageUserList() || [],
            info: null
        }
    })

    const setup = (props, { emit }) => {
        const store = useStore()
        const login = (mode) => {
            // console.log('login!', state.config);
            if (!state.config.appkey) return $message.error("请检查 appkey")
            if (!state.config.token) return $message.error("请检查 token")
            state.config.mode = mode
            emit('login', state.config) // 需要声明一下
        }
        const selectUserChange = (data) => {
            state.userData.userInfo = data;
            const [appkey, token] = data.split("--");
            state.config.appkey = appkey
            state.config.token = token
        }
        const selectLogLevelChange = (logLevel) => {
            state.config.logLevel = logLevel
        }
        return {
            ...toRefs(state),
            login,
            selectUserChange,
            selectLogLevelChange
        }
    }
    window.__RCComponents = window.__RCComponents || {};
    window.__RCComponents.login = {
        setup,
        emits: ["login"], // emit 声明
        template: getTemplateById("login-component")
    }

})(window)