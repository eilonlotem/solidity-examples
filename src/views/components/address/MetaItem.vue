<template>
  <div>
    <div
      v-for="contract in contracts"
      :key="contract.network"
      v-b-modal="`modal-meta-${contract.id}`"
      class="text-dark"
    > 
      <span v-if="contracts.length > 1">
        {{ contract.network }} ({{ Object.keys(contract.meta).length }} attrs)
      </span>
      <span v-else>
        {{ Object.keys(contract.meta).length }} attrs
      </span>
      <feather-icon
        size="12"
        icon="CornerRightUpIcon"
      />
    <b-modal
      :id="`modal-meta-${contract.id}`"
      cancel-variant="secondary"
      hide-footer
      scrollable
    >
    <json-viewer
      class="shadow-none bg-transparent text-light"
      :value="contract.meta"
      :expand-depth=5
      copyable
      sort
    ></json-viewer>
    </b-modal>
    </div>
  </div>
</template>

<script>
import {
  BLink,
  VBTooltip,
  BModal
} from 'bootstrap-vue'
import JsonViewer from 'vue-json-viewer'
/* eslint-disable global-require */
export default {
  components: {
    BLink,
    BModal,
    JsonViewer
  },
  directives: {
    'b-tooltip': VBTooltip,
  },
  props: {
    contracts: {
      type: Array,
      default: () => new Array()    
    },
  },
}
</script>
