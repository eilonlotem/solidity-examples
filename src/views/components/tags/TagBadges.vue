<template>
  <div class="demo-inline-spacing">
    <b-badge
      v-for="tag in tags"
      :key="tag"
      variant="light-info"
      >
      {{ tag }}
    </b-badge>
  </div>
</template>

<script>
import {
  BBadge
} from 'bootstrap-vue'
/* eslint-disable global-require */
export default {
  components: {
    BBadge
  },
  props: {
    tags: {
      type: Array,
      default: () => new Array()
    }
  },
}
</script>
