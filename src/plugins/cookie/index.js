const W_Cookie = {}

W_Cookie.install = function (vm, options) {
  // 关于cookie
  // 参数
  // name
  // expires
  // path
  // domain
  // 获取cookie的时候会返回当前页面可用的所有cookie中间以分号隔开
  // 并且 所有的名字都是经过URL编码过得 必须通过decodeURIComponent解码
  // 设置cookie时 这个cookie字符串会被解释并添加到现有的cookie集合中
  // cookie不会因为新设置cookie而被覆盖，除非已经存在了。
  // 设置cookie的格式与设置 set-cookie格式一致
  // name=value; expires=expiration_time; path=domain_path; domain=domain_name; secure
  // 其中只有 name 是必传的 expires 限制了 cookie的生命周期 如果不设置 那么将会在关闭浏览器的时候消失（是关闭浏览器而不是关闭当前tab）
  // expires 的值 为 toGMTString  或者 toUTCString
  // 注意 cookie分割的时候 是以 分号 + 空格 的方式分割的 ，在切字符串的时候要注意
  const Cookie = vm.prototype.$cookie = document.cookie
  vm.prototype.$getCookie = function (name) {
    const cookiObj = vm.prototype.$parseCookie()
    return cookiObj[name]
  }
  vm.prototype.$setCookie = function (ctx) {
    let res = '', name = ''
    cxt.keys().forEach(key => {
      if (key === 'name') name = key
      res+=`${key}=${ctx[key]}; `
    })
    if (!name) return false
    document.cookie = res.slice(0, -2)
    return vm.prototype.$hasCookie(name)
  }
  vm.prototype.$parseCookie = function () {
    const parseCookie = {}
    Cookie.split('; ').forEach(item => {
      const [key, value] = item.split('=')
      parseCookie[key] = value
    })
    return parseCookie
  }
  vm.prototype.$hasCookie = function (name) {
    return !!vm.prototype.$getCookie(name)
  }
}

export default W_Cookie
