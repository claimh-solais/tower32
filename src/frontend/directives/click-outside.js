import Vue from 'vue'

Vue.directive('click-outside', {
    priority: 700,

    bind: function (el, binding, vnode) {
        el.event = function (event) {
            if (!(el == event.target || el.contains(event.target))) {
                vnode.context[binding.expression](event);
            }
        };
        document.body.addEventListener('click', el.event)
        el.addEventListener('click', el.stopProp)
    },

    unbind: function (el) {
        el.removeEventListener('click', el.stopProp)
        document.body.removeEventListener('click', el.event)
    },

    stopProp: function (event) { event.stopPropagation() }
})
