function broadcast (componentName, eventName, params = '') {
  this.$children.forEach(child => {
    const name = child.$options.name
    if (name === componentName) {
      child.$emit.apply(child, [eventName].concat(params))
    } else {
      broadcast.apply(child, [componentName, eventName].concat([params]))
    }
  })
}

export default {
  methods: {
    // 向上派发
    dispatch (componentName, eventName, params = '') {
      console.log('触发 dispatch')
      let parent = this.$parent || this.$root
      let name = parent.$options.name
      while (parent && (!name || name !== componentName)) {
        parent = parent.$parent
        if (parent) {
          name = parent.$options.name
        }
      }
      if (parent) {
        parent.$emit.apply(parent, [eventName].concat(params))
      }
    },
    // 向下广播
    broadcast (componentName, eventName, params) {
      console.log('触发 broadcast')
      broadcast.call(this, componentName, eventName, params)
    }
  }
}