<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/logo.png">
    <hello-world msg="Welcome to Your Vue.js App" />
  </div>
</template>

<script>
// @ is an alias to /src
import HelloWorld from 'components/HelloWorld'

export default {
  name: 'Home',
  components: {
    HelloWorld
  },
  metaInfo: {
    title: 'Home',
    meta: [
      { vmid: 'description', name: 'description', content: 'Vue.js Home' },
      { vmid: 'keywords', name: 'keywords', content: 'vue.js,js' }
    ]
  }
}
</script>
