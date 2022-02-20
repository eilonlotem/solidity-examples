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

      <!-- Column: Networks -->
      <span v-else-if="props.column.field === 'network'">
        <networks-avatars :networks="[props.row.network]" />
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
        <address-item :address="props.row" /> 
      </span>

      <!-- Column: Meta -->
      <span v-else-if="props.column.field === 'meta'">
        <meta-item :contracts="props.row.contracts" />
      </span>

      <!-- Column: ABI -->
      <span v-else-if="props.column.field === 'abi'">
        <ABI-item :contracts="props.row.contracts" />
      </span>

      <!-- Column: Contract Meta -->
      <span v-else-if="props.column.field === 'contract_meta'">
        <meta-item :contracts="[props.row]" />
      </span>

      <!-- Column: Contract ABI -->
      <span v-else-if="props.column.field === 'contract_abi'">
        <ABI-item :contracts="[props.row]" />
      </span>

      <!-- Column: from address -->
      <span v-else-if="props.column.field === 'from_address'">
        <address-item :address="props.row.fromAddress" /> 
      </span>

      <!-- Column: to address -->
      <span v-else-if="props.column.field === 'to_address'">
        <address-item :address="props.row.toAddress" /> 
      </span>

      <!-- Column: function -->
      <span v-else-if="props.column.field === 'function'">
        <span
          v-if="props.row.enrichment"
        >
          {{ props.row.enrichment.functionName }}
        </span>
      </span>

      <!-- Column: value -->
      <span v-else-if="props.column.field === 'value'">
        <span
        >
          {{ props.row.value }}
        </span>
      </span>

      <!-- Column: Address Scanner Link -->
      <span v-else-if="props.column.field === 'address_scanner_link'">
        <scanner-link :networks="props.row.networks" type="address" :address="props.row.address" />
      </span>

      <!-- Column: Transaction Scanner Link -->
      <span v-else-if="props.column.field === 'transaction_scanner_link'">
        <scanner-link :networks="[props.row.network]" type="tx" :address="props.row.hash" />
      </span>

      <!-- Column: Transaction hash -->
      <span v-else-if="props.column.field === 'hash'">
        <transaction-hash :hash="props.row.hash" />
      </span>

       <!-- Column: Raw -->
      <span v-else-if="props.column.field === 'raw'">
        <raw-item :item="props.row" />
      </span>

      <!-- Column: Contract -->
      <span v-else-if="props.column.field === 'contract'">
        <meta-item :contracts="[props.row.contract]" />
      </span>

      <!-- Column: Contract Scanner Link -->
      <span v-else-if="props.column.field === 'contract_scanner_link'">
        <scanner-link :networks="[props.row.network]" type="address" :address="props.row.address" />
      </span>
      
      <!-- Column: Tags -->
      <span v-else-if="props.column.field === 'tags'">
        <tag-badges :tags="props.row.allTags" />
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
            :options="['10','20','40', '100']"
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
import TransactionHash from '@/views/components/transactions/TransactionHash.vue'
import ScannerLink from '@/views/components/scanner/ScannerLink.vue'
import AddressItem from '@/views/components/address/AddressItem.vue'
import ABIItem from '@/views/components/address/ABIItem.vue'
import TagBadges from '@/views/components/tags/TagBadges.vue'
import MetaItem from '@/views/components/address/MetaItem.vue'
import RawItem from '@/views/components/raw/RawItem.vue'
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
    AddressItem,
    ScannerLink,
    ABIItem,
    MetaItem,
    TagBadges,
    TransactionHash,
    RawItem
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
  .vgt-table td {
    padding: 0.75em 0.0em 0.0em 0.75em !important;
  }
</style>
