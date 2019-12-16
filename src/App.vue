<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>

<style>

html,body{
  overflow-y: auto;
  margin: 0;
  padding: 0;
  /* height: 100%; */
  height: 10.7rem;
  background: #050926;
}
#app{
  height: 100%;
}
</style>
