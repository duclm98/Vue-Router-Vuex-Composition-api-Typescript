<template>
  <the-header></the-header>
  <router-view/>
</template>

<script>
import TheHeader from './components/nav/TheHeader'

export default {
  components: {
    TheHeader,
  }
}
</script>


<style>
* {
  box-sizing: border-box;
}
html {
  font-family: sans-serif;
}
body {
  margin: 0;
}
</style>
