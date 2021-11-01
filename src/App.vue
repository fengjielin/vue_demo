<template>
  <div id="app">
    <div id="nav">
      <router-link to="/asyn">Asyn</router-link> |
      <router-link to="/home">Home</router-link> |
      <router-link to="/about">About</router-link> |
      <router-link to="/teachingPlan/termTeachingPlan">授课计划</router-link> |
      <router-link to="/teachingPlan/teachingPlanInfo"
        >授课计划信息</router-link
      >
      |<br>
      <router-link to="/tree/treeDemo">treeDemo</router-link> |
    </div>
    <hr />
    <router-view class="router_view" />
  </div>
</template>

<style lang="less">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;

  background: #eaeff3;
}

#nav {
  padding: 30px;
  text-align: center;
  color: #2c3e50;
  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
.router_view {
  padding: 16px;
  box-sizing: border-box;
}
</style>
