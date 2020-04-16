import Vue from 'vue'
// 加载 global 中的以 .js 结尾的文件
const componentsContext = require.context('./Global', true, /[.js|.vue]$/)
// 默认加载全景的组件
componentsContext.keys().forEach(component => {
  const componentConfig = componentsContext(component)
  // 兼容 import export 和 require module.exports 两种规范
  const ctrl = componentConfig.default || componentConfig
  Vue.component(ctrl.name, ctrl)
})
