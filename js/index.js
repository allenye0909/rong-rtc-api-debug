(function (window) {
    const {
        __RCComponents: { login, pretty, api, main, track, },
        __RCMETTINGApiList, __RCLIVEApiList, __RCAudienceApiList, __RCStore,
        __RCServices: { IM, METTING, LIVE },
        __RCUtils: { updateStorageUserList, getStorageUserList },

        ElementPlus: { ElMessage: $message },
        Vue: { reactive, toRefs, computed, provide },
        Vuex: { useStore }
    } = window;


    const state = reactive({
        isShowMainView: false,
        tree: "null",
    })



    const setup = () => {
        const store = useStore()

        const login = async (config) => {
            const data = await IM.connect(config, {});

            console.log("login config:", config)
            store.commit('setServiceMode', config.mode);

            switch (config.mode) {
                case 0:
                    METTING.rtcInit()
                    store.commit('setApiList', __RCMETTINGApiList)
                    break;

                case 1:
                    LIVE.rtcInit()
                    store.commit('setApiList', __RCLIVEApiList)
                    break;

                case 2:
                    LIVE.rtcInit()
                    store.commit('setApiList', __RCAudienceApiList)
                    break;

                default:
                    METTING.rtcInit()
                    store.commit('setApiList', __RCMETTINGApiList)
                    break;
            }
            if (data.code !== 0) return $message.error("链接失败：", data.code);
            updateStorageUserList(config.appkey, config.token, data.data.userId);
            state.isShowMainView = true;
            setTreeData(data, "connect");
        }
        const setTreeData = (data, eventName) => {
            const otherData = { eventName }
            state.tree = { ...otherData, ...data };
            store.commit('setTreeData', state.tree)
        }
        return {
            ...toRefs(state),
            login
        }
    }

    const App = {
        setup,
    };
    const app = Vue.createApp(App);
    app.component('rc-login', login);
    app.component('rc-pretty', pretty);
    app.component('rc-api', api);
    app.component('rc-main', main);
    app.component('rc-track', track)
    app.use(ElementPlus);
    app.use(__RCStore);
    app.mount("#app");
})(window)