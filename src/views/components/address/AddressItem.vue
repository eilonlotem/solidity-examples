<template>
  <div
    v-b-tooltip.hover.top="address.address"
    v-if="address.name"
  >
    <p class="mb-0 font-weight-bolder">
      {{ address.name }}
    </p>
    <p class="text-muted">{{ address.description }}</p>
  </div>
  <div
    v-b-tooltip.hover.top="address.address"
    v-else
  >
    {{ address.address.slice(0,8) }}....{{ address.address.slice(address.address.length-8,address.address.length) }}
  </div>
</template>

<script>
import {
  BLink,
  VBTooltip
} from 'bootstrap-vue'
/* eslint-disable global-require */
export default {
  components: {
    BLink
  },
  directives: {
    'b-tooltip': VBTooltip,
  },
  props: {
    address: {
      type: Object,
      default: () => {}    
    },
  },
}
</script>
