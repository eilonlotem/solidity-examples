<template>
  <vue-good-table
    :bordered="false"
    :is-loading="isLoading"
    style-class="vgt-table"
    :columns="columns"
    :rows="data"
    :rtl="direction"
    :search-options="{
      enabled: true,
      externalQuery: searchTerm }"
    :pagination-options="{
      enabled: true,
      perPage:pageLength
    }"
  >
    <template
      slot="table-row"
      slot-scope="props"
    >
      <!-- Column: Action -->
      <span v-if="props.column.field === 'action'">
        <span>
          <b-dropdown
            variant="link"
            toggle-class="text-decoration-none"
            no-caret
          >
            <template v-slot:button-content>
              <feather-icon
                icon="MoreVerticalIcon"
                size="16"
                class="text-body align-middle mr-25"
              />
            </template>
            <b-dropdown-item @click="()=>deleteCallBack(props.row.id)">
              <feather-icon
                icon="TrashIcon"
                class="mr-50"
              />
              <span>Delete</span>
            </b-dropdown-item>
          </b-dropdown>
        </span>
      </span>

      <!-- Column: Networks -->
      <span v-else-if="props.column.field === 'networks'">
        <networks-avatars :networks="props.row.networks" />
      </span>

      <!-- Column: Tx 24 -->
      <span v-else-if="['24h', '7d', '30d', 'total'].includes(props.column.field)">
        <transactions-amount
          :incoming="props.row.totalTransactions.incoming_transactions[props.column.field]"
          :outgoing="props.row.totalTransactions.outgoing_transactions[props.column.field]"
        />
      </span>

      <!-- Column: Account / Contact (Address) Details -->
      <span v-else-if="props.column.field === 'address_details'">
        <p class="mb-0 font-weight-bolder">
          {{ props.row.name }}
        </p>
        <p class="text-muted">{{ props.row.description }}</p>
      </span>

      <!-- Column: Address Scanner Link -->
      <span v-else-if="props.column.field === 'address_scanner_link'">
        <scanner-link :networks="props.row.networks" type="address" :address="props.row.address" />
      </span>

      <span class="text-capitalize" v-else>
        {{ props.formattedRow[props.column.field] }}
      </span>
    </template>
    <!-- pagination -->
    <template
      slot="pagination-bottom"
      slot-scope="props"
    >
      <div class="d-flex justify-content-between flex-wrap">
        <div class="d-flex align-items-center mb-0 mt-1">
          <span class="text-nowrap">
            Showing 1 to
          </span>
          <b-form-select
            v-model="pageLength"
            :options="['3','5','10']"
            class="mx-1"
            @input="(value)=>props.perPageChanged({currentPerPage:value})"
          />
          <span class="text-nowrap "> of {{ totalRows }} entries </span>
        </div>
        <div>
          <b-pagination
            :value="1"
            :total-rows="totalRows"
            :per-page="pageLength"
            first-number
            last-number
            align="right"
            prev-class="prev-item"
            next-class="next-item"
            class="mt-1 mb-0"
            @input="(value)=>nextPage({currentPage:value})"
          >
            <template #prev-text>
              <feather-icon
                icon="ChevronLeftIcon"
                size="18"
              />
            </template>
            <template #next-text>
              <feather-icon
                icon="ChevronRightIcon"
                size="18"
              />
            </template>
          </b-pagination>
        </div>
      </div>
    </template>
  </vue-good-table>
</template>
<script>
import store from '@/store'
import { VueGoodTable } from 'vue-good-table'
import NetworksAvatars from '@/views/components/networks/NetworksAvatars.vue'
import TransactionsAmount from '@/views/components/transactions/TransactionsAmount.vue'
import ScannerLink from '@/views/components/scanner/ScannerLink.vue'
import {
  BDropdown, BDropdownItem, VBToggle, BPagination, BFormSelect,
} from 'bootstrap-vue'
import Ripple from 'vue-ripple-directive'

export default {
  components: {
    VueGoodTable,
    BDropdown,
    BDropdownItem,
    BPagination,
    BFormSelect,
    NetworksAvatars,
    TransactionsAmount,
    ScannerLink
  },
  directives: {
    Ripple,
    'b-toggle': VBToggle,
  },
  props: {
    isLoading: {
      type: Boolean,
      required: true,
    },
    columns: {
      type: Array,
      required: true,
    },
    data: {
      type: Array,
      required: true,
    },
    deleteCallBack: {
      type: Function,
      required: true,
    },
    totalRows: {
      type: Number,
      required: true,
    },
    nextPage: {
      type: Function,
      required: true,
    },
  },
  data() {
    return {
      searchTerm: '',
      pageLength: 10,
    }
  },
  computed: {
    direction() {
      if (store.state.appConfig.isRTL) {
        // eslint-disable-next-line vue/no-side-effects-in-computed-properties
        this.dir = true
        return this.dir
      }
      // eslint-disable-next-line vue/no-side-effects-in-computed-properties
      this.dir = false
      return this.dir
    },
  },
}
</script>

<style lang="scss" >
  @import '@core/scss/vue/libs/vue-good-table.scss';
  .vgt-table{
    border: 0px !important;
    font-size: 1rem !important;
  }
</style>
