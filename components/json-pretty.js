(function (window) {
    const {
        Vue: { ref, reactive, toRefs, inject, computed },
        Vuex: { mapState, useStore },
        __RCUtils: { getTemplateById },
    } = window


    const setup = (props, { emit }) => {
        const state = reactive({
            treeData: computed(() => store.getters.treeData)

        })
        const store = useStore();

        return {
            ...toRefs(state),
        }
    }

    window.__RCComponents = window.__RCComponents || {};
    window.__RCComponents.pretty = {
        setup,
        components: {
            "vue-json-pretty": VueJsonPretty.default
        },
        template: getTemplateById("json-pretty-component")
    }

})(window)