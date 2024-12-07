export default {
  // 此时编写的就是 Vue组件实例的 配置项，通过一定语法，可以直接混入组件内部
  // data methods computed 生命周期函数 ...
  // 注意点：
  // 1. 如果此处 和 组件内，提供了同名的 data 或 methods，则组件内优先级更高
  // 2. 如果编写了生命周期函数，则mixins中的声生命周期函数 和 组件的生命周期函数，会用数组管理统一执行
  data () {
    return {
      title: 'text'
    }
  },
  methods: {
    // 根据登录状态，判断是否需要显示
    // 1. 如果未登录 => 显示确认框 返回 true
    // 2. 如果已登录 => 啥也不干 返回 false
    loginConfirm () {
      // 判断 token 是否存在
      // 1. 如果 token 不存在，弹确认框
      // 2. 如果 token 存在，继续请求操作
      if (!this.$store.getters.token) {
        // 弹确认框
        this.$dialog.confirm({
          title: '温馨提示',
          message: '此时需要先登录才能继续操作',
          confirmButtonText: '去登陆',
          cancelButtonText: '再逛逛'
        })
          .then(() => {
            // 如果希望，跳转到登录 => 登录后能回跳回来，需要在跳转去携带参数（当前的路径地址）
            // this.$route.fullPath(会包含查询参数)
            this.$router.replace({
              path: '/login',
              query: {
                backUrl: this.$route.fullPath
              }
            })
          })
          .catch(() => {})
        return true
      }
      return false
    }
  }
}
