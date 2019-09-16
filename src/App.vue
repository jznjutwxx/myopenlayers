<template>
  <div id="app">
    <!-- <ClusterFeatures/> -->
    <router-view></router-view>
  </div>
</template>

<script>
// import ClusterFeatures from './pages/Index/Navigation'

export default {
  name: 'app',
  components: {
    // ClusterFeatures
  }
}
</script>

<style>
*{
  padding: 0;
  margin: 0;
}
html,body{
  height: 100%;
}
#app {
  height: 100%;
}
</style>
