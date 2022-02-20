<template>
  <div>
    <span
      v-b-tooltip.hover.top="'Incoming Txs'"
    >
      {{ incoming }}
      <feather-icon
        size="12"
        icon="ArrowDownIcon"
      />
    </span>
    <span
      v-b-tooltip.hover.top="'Outgoing Txs'"
    >  
      {{ outgoing }}
      <feather-icon
        size="12"
        icon="ArrowUpIcon"
      />
    </span>
  </div>
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
    incoming: {
      type: Number,
      default: -1
    },
    outgoing: {
      type: Number,
      default: -1
    }
  }
}
</script>
