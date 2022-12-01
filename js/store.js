(function (window) {
    const { createStore, useStore } = Vuex;
    const store = createStore({
        state() {
            return {
                // treeData: {},
                // config: {}
            }
        },
        getters: {
            treeData: (state) => state.treeData,
            trackList: (state) => state.trackList,
            apiList:(state) => state.apiList,
            serviceMode:(state) => state.serviceMode,
        },
        mutations: {
            setTreeData: (state, data) => state.treeData = data || {},
            setTrackList: (state, data) => state.trackList = data || {},
            setApiList: (state, data) => state.apiList = data || {},
            setServiceMode: (state, data) => state.serviceMode = data || 0,
        }
    })

    window.__RCStore = store;
})(window)