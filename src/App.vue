<template>
  <div id="app">
    <div id="nav">
      <router-link to="blog">Blog</router-link>
      <router-link to="photo">Photo</router-link>
      <router-link to="picture">picture</router-link>
    </div>
    <router-view/>
  </div>
</template>
 
<script>
import axios from 'axios'
import getHash from './utils/encryption.js' 
export default {
  name: 'App',
  mounted(){
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
