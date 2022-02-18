<template>
    <b-avatar-group size="32px">
        <b-avatar
            v-for="network in networks"
            :key="network"
            v-b-tooltip.hover.top="network"
            variant="light"
            class="pull-up"
        >
          <b-img
            width="14"
            :src="require(`@/assets/images/networks/${network}.png`)"
          />
        </b-avatar>
    </b-avatar-group>
</template>

<script>
import {
  BAvatar, BAvatarGroup, VBTooltip, BImg
} from 'bootstrap-vue'
/* eslint-disable global-require */
export default {
  components: {
    BAvatar,
    BAvatarGroup,
    BImg
  },
  directives: {
    'b-tooltip': VBTooltip,
  },
  props: {
    networks: {
      type: Array,
      default: () => new Array()
    }
  }
}
</script>
