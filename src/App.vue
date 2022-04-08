<template>
  <div id="app">
     <header>
      <router-link to="/olmap">OpenStreetMap</router-link> 
      &nbsp; &nbsp; 
      <router-link to="/amap">高德地图</router-link>
      &nbsp; &nbsp; 
      <router-link to="/googlemap">Google</router-link>
      &nbsp; &nbsp; 
      <router-link to="/tiandimap">天地图</router-link>
    </header>
    <router-view></router-view>   
  </div>
</template>

<script>
export default {

}
</script>

<style>
*{padding:0; margin:0;}
html,body{
  height: 100%;
}
#app {
  height: 100%;
}
</style>