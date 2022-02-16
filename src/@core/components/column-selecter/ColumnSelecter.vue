<template>
  <v-select
    v-model="items"
    :dir="$store.state.appConfig.isRTL ? 'rtl' : 'ltr'"
    multiple
    label="label"
    :options="options"
    :clearable="false"
    @change="(value)=>changeSelectFunction(value)"
  />
</template>

<script>
import vSelect from 'vue-select'

export default {
  components: {
    vSelect,
  },
  props: {
    selectedItem: {
      type: Array,
      required: true,
    },
    options: {
      type: Array,
      required: true,
    },
  },
  data() {
    return {
      items: this.selectedItem,
    }
  },
  watch: {
    items(val, oldVal) {
      this.$emit('changeSelectedItems', val)
    },
  },
}
</script>

<style>

</style>
