<template>

  <span
    v-b-tooltip.hover.top="hash"
  >
    {{ hash.slice(0, 8) }}...{{ hash.slice(hash.length-8, hash.length) }}
  </span>
   
</template>

<script>
import {
  VBTooltip
} from 'bootstrap-vue'
/* eslint-disable global-require */
export default {
  directives: {
    'b-tooltip': VBTooltip,
  },
  props: {
    hash: {
      type: String,
      required: true
    },
  }
}
</script>
