(function (window) {
    const {
        __RCUtils: { getTemplateById },
        Vue: { ref, reactive, toRefs },
    } = window

    const state = reactive({

    })


    const setup = (props, { emit }) => {
        return {
            ...toRefs(state),
        }
    }
    window.__RCComponents = window.__RCComponents || {};
    window.__RCComponents.main = {
        setup,
        template: getTemplateById("main-component")
    }

})(window)