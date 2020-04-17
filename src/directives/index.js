import Vue from 'vue'
Vue.directive('rule', {
  // 第一次绑定到元素上的时候 （只调用一次）
  bind (el, binding, vnode, oldVnode) {},
  // 绑定的元素被插入到父节点
  inserted (el, binding, vnode, oldVnode) {},
  // 所在的组件的VNode更新时调用，但是可能发生在其子VNode更新之前
  // 可能会导致值得变化 所以说这个钩子函数是不是在子节点完全更新完之后调用的钩子
  update (el, binding, vnode, oldVnode) {},
  // 指令所在组件的 VNode 及其子 VNode 全部更新后调用
  componentUpdated (el, binding, vnode, oldVnode) {},
  // 只调用一次 解绑时调用的
  unbind (el, binding, vnode, oldVnode) {}
})
