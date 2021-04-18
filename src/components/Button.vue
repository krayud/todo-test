<template>
  <button :class="['button', getButtonClassType]" @click="$emit('click')"><slot></slot></button>
</template>

<script>
export default {
  name: 'Button',
  props: {
    type: {
      type: String,
      default: 'base', // base / danger
    },
  },
  computed: {
    getButtonClassType() {
      return `button_${this.type}`;
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="sass">
  @import "@/assets/css/colors"

  .button
    padding: 8px 31px
    border-radius: 999px
    font-size: 16px
    line-height: 28px
    font-weight: bold
    outline: 0
    cursor: pointer
    transition: background-color 0.5s ease
    &_base
      color: $c-light-gray
      border: 1px solid darken($c-dark, 5%)
      background-color: $c-dark
      &:hover
        background-color: lighten($c-light-dark, 10%)

    &_danger
      color: $c-light-gray
      border: 1px solid darken($c-red, 5%)
      background-color: $c-red
      &:hover
        background-color: lighten($c-red, 10%)
</style>
