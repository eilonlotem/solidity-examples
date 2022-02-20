<template>
  <div>
    <div
      v-for="contract in contracts"
      :key="contract.network"
      v-b-modal="`modal-abi-${contract.id}`"
      class="text-dark"
    >
      <span v-if="contracts.length > 1">
        {{ contract.network }} ({{ Object.keys(contract.abi).length }} attrs)
      </span>
      <span v-else>
        {{ Object.keys(contract.abi).length }} funcs
      </span>
      <feather-icon
        size="12"
        icon="CornerRightUpIcon"
      />
    <b-modal
      :id="`modal-abi-${contract.id}`"
      cancel-variant="secondary"
      hide-footer
      scrollable
    >
    <json-viewer
      class="shadow-none bg-transparent"
      :value="contract.abi"
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
