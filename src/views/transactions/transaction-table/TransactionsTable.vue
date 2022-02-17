<template>
  <b-card title="Transaction">
    <b-list-group>
      <b-list-group-item>
        <div
          v-if="!apolloLoading ? true: false"
          class="d-flex justify-content-between align-items-end"
        >
          <div class="select-column-section">
            <h6 class="display-6">
              Chose the columns you want to see
            </h6>
            <column-selecter
              :options="options"
              :selected-item="selectedItem"
              @changeSelectedItems="changeSelectedItems($event)"
            />
          </div>
          <div class="button-section d-flex align-item-end">
            <b-button
              v-ripple.400="'rgba(255, 255, 255, 0.15)'"
              v-b-toggle.add-address-sidebar
              style="{height: '50%'}"
              block
              variant="primary"
            >
              Add Transaction
            </b-button>
          </div>
        </div>
      </b-list-group-item>
      <b-list-group-item>
        <our-table
          :columns="columns"
          :data="allTransactions"
          :is-loading="apolloLoading ? true: false"
          :add-button-text="'Add Address'"
          :total-rows="totalRows"
          :next-page="nextPage"
          :delete-call-back="()=>{}"
        />
      </b-list-group-item>
    </b-list-group>
  </b-card>
</template>
<script>
import {
  BCard, BListGroup, BListGroupItem, BButton, VBToggle,
} from 'bootstrap-vue'
import OurTable from '@core/components/table/OurTable.vue'
import ColumnSelecter from '@core/components/column-selecter/ColumnSelecter.vue'
import { GET_ALL_TRANSACTIONS } from '@/graphql/Transaction'
import { tableColumns } from '@/views/transactions/transaction-table/utils'
import Ripple from 'vue-ripple-directive'

export default {
  components: {
    BCard,
    OurTable,
    BListGroup,
    BListGroupItem,
    BButton,
    ColumnSelecter,
  },
  directives: {
    'b-toggle': VBToggle,
    Ripple,
  },
  data() {
    return {
      allTransactions: [],
      totalRows: 0,
      apolloLoading: 0,
      selectedItem: tableColumns,
      columns: tableColumns,
      options: tableColumns,
    }
  },
  apollo: {
    allTransactions: {
      query: GET_ALL_TRANSACTIONS,
      update: data => data.allMyTxs.results,
      result({ data, loading }) {
        if (!loading) {
          this.totalRows = data.allMyTxs.totalCount
        }
      },
      variables: {
        limit: 10,
        offset: 0,
      },
    },
  },
  watch: {
    selectedItem(val, oldVal) {
      const actionItem = val.find(item => item.field === 'action')
      if (actionItem) {
        const columnWithOutAction = val.filter(item => item.field !== 'action')
        this.columns = [...columnWithOutAction].concat(actionItem)
        return
      }
      this.columns = [...val]
    },
  },
  methods: {
    changeSelectedItems(items) {
      this.selectedItem = items
    },
    nextPage(value) {
      // this.offset = this.limit
      const offset = (value.currentPage - 1) * 10
      this.$apollo.queries.allTransactions.fetchMore({
        variables: {
          limit: 10,
          offset,
        },
        updateQuery(previousResult, { fetchMoreResult }) {
          this.totalRows = fetchMoreResult.allMyTxs.totalCount
          return fetchMoreResult
        },
      })
    },
  },
}
</script>

<style>
select-column-section {
    width: 70% !important;
  }

  .list-group-item{
    border: 0px !important;
  }
  .list-group-item:hover {
    background-color: transparent !important;
  }
</style>
