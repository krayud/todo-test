<template>
  <div id="app">
    <div class="header">
      <router-link :to="{name: 'Home'}"><h1>MAKE ME 😏</h1></router-link>
    </div>
    <router-view/>
  </div>
</template>

<style lang="sass">
@import "@/assets/css/colors"

@font-face
  font-family: "Montserrat"
  src: url("./assets/fonts/Montserrat-Medium.ttf")
  font-display: swap
*
  font-family: 'Montserrat', sans-serif
  -webkit-font-smoothing: antialiased
  -moz-osx-font-smoothing: grayscale
html, body
  margin: 0px
  background-color: #F7F7F7

#app
  margin: 0px auto
  color: #2c3e50

.header
  text-align: center
  background-color: $c-dark
  padding: 20px
  h1
    margin: 0px
  a
    color: white
    text-decoration: none
    &:hover
      color: $c-blue

</style>
