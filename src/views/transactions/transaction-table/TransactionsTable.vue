<template>
  <b-card title="Transactions">
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
          <div class="button-section d-flex ">
            <b-button
              v-b-toggle.filter-input-sidebar
              variant="primary"
              class="mx-1"
            >
              <feather-icon
                icon="FilterIcon"
                class="mr-50"
              />
              <span class="align-middle">Filter</span>
            </b-button>
          </div>
        </div>
      </b-list-group-item>
      <b-list-group-item>
        <our-table
          :columns="columns"
          :data="allTransactions"
          :is-loading="apolloLoading ? true: false"
          :total-rows="totalRows"
          :next-page="nextPage"
          :delete-call-back="()=>{}"
        />
      </b-list-group-item>
    </b-list-group>
    <filter-inputs-sidebar />

  </b-card>
</template>
<script>
import {
  BCard, BListGroup, BListGroupItem, VBToggle, BButton,
} from 'bootstrap-vue'
import OurTable from '@core/components/table/OurTable.vue'
import ColumnSelecter from '@core/components/column-selecter/ColumnSelecter.vue'
import { GET_ALL_TRANSACTIONS } from '@/graphql/Transaction'
import { tableColumns, selectOptions } from '@/views/transactions/transaction-table/utils'
import Ripple from 'vue-ripple-directive'
import FilterInputsSidebar from '@/views/components/filter-inputs-sidebar/FilterInputsSidebar.vue'

export default {
  components: {
    BCard,
    OurTable,
    BListGroup,
    BListGroupItem,
    ColumnSelecter,
    BButton,
    FilterInputsSidebar,
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
      options: tableColumns.concat(selectOptions),
    }
  },
  apollo: {
    allTransactions: {
      query: GET_ALL_TRANSACTIONS,
      update: data => data.parsedTx.results,
      result({ data, loading }) {
        if (!loading) {
          this.totalRows = data.parsedTx.totalCount
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
      this.columns = [...val]
    },
  },
  methods: {
    changeSelectedItems(items) {
      this.selectedItem = items
    },
    nextPage(value) {
      const offset = (value.currentPage - 1) * 10
      this.$apollo.queries.allTransactions.fetchMore({
        variables: {
          limit: 10,
          offset,
        },
        updateQuery(previousResult, { fetchMoreResult }) {
          return fetchMoreResult
        },
      })
    },
  },
}
</script>

<style>
.select-column-section {
    width: 50% !important;
  }

  .list-group-item{
    border: 0px !important;
  }
  .list-group-item:hover {
    background-color: transparent !important;
  }
</style>
