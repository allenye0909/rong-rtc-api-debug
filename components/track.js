(function (window) {
    const { ref, reactive, toRefs, defineProps, computed, watch } = Vue;
    const { useStore } = Vuex;

    const setup = () => {
        const store = useStore()

        const state = reactive({
            trackList: [],
        })



        state.trackList = computed(() => store.getters.trackList);


        return {
            ...toRefs(state),
        }
    }
    window.__RCComponents = window.__RCComponents || {};
    window.__RCComponents.track = {
        setup,
        template: getTemplateById("track-component")
    }

    function getTemplateById(id) {
        var dom = document.getElementById(id)
        return dom.innerHTML
    }


})(window)