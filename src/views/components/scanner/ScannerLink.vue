<template>
  <div>
    <div v-for="network in networks"
      :key="network">
      <b-link
        :href="get_link(network).link"
        target="_blank"
        class="text-dark"
      >
        {{ get_link(network).name }}
        <feather-icon
          size="12"
          icon="ArrowUpRightIcon"
        />
      </b-link>
    </div>
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
  methods: {
    get_link(network) {
      let link, name = ""

      if (network == "binance") {
        link = `https://bscscan.com/${this.type}/${this.address}`
        name = "bscscan"
      } else if (network == "ethereum") {
        link = `https://etherscan.io/${this.type}/${this.address}`
        name = "etherscan"
      } else if (network == "polygon") {
        link = `https://polygonscan.com/${this.type}/${this.address}`
        name = "polygonscan"
      } return {
        link,
        name
      }
    }
  },
  directives: {
    'b-tooltip': VBTooltip,
  },
  props: {
    address: {
      type: String,
      required: true    
    },
    type: {
      type: String,
      required: true    
    },
    networks: {
      type: Array,
      default: () => new Array()
    }
  },
}
</script>
