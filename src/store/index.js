import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

// 自动扫描导入 modules
let modules = {}
const modulesContext = require.context('./', true, /^\.\/modules\/((?!\/)[\s\S])+\/index\.js$/)
modulesContext.keys().forEach(filePath => {
  const moduleNameMatches = filePath.match(/^\.\/modules\/(((?!\/)[\s\S])+)\/index\.js$/)
  if (moduleNameMatches != null) {
    const moduleName = moduleNameMatches[1]
    const moduleConfig = modulesContext(filePath)
    modules[moduleName] = moduleConfig.default || moduleConfig
  }
})

export default new Vuex.Store({
  modules
})
