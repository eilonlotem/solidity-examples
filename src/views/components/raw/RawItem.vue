<template>
  <div>
    <div
      v-b-modal="`modal-raw-${item.id}`"
      class="text-dark"
    >
      Raw
      <feather-icon
        size="12"
        icon="CornerRightUpIcon"
      />
    <b-modal
      :id="`modal-raw-${item.id}`"
      cancel-variant="secondary"
      hide-footer
      scrollable
    >
    <json-viewer
      class="shadow-none bg-transparent"
      :value="item"
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
  props: {
    item: {
      type: Object,
      default: () => new Object()    
    },
  },
}
</script>
