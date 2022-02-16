<template>
  <b-card title="Transaction">
    <our-table
      :columns="columns"
      :data="allTransactions"
      :is-loading="apolloLoading ? true: false"
      :add-button-text="'Add Address'"
      :total-rows="totalRows"
      :next-page="nextPage"
      :delete-call-back="()=>{}"
    />
  </b-card>
</template>

<script>
import {
  BCard,
} from 'bootstrap-vue'
import OurTable from '@core/components/table/OurTable.vue'
import { GET_ALL_TRANSACTIONS } from '@/graphql/Transaction'
import { tableColumns } from '@/views/transactions/transaction-table/utils'

export default {
  components: {
    BCard,
    OurTable,
  },
  directives: {

  },
  data() {
    return {
      allTransactions: [],
      totalRows: 0,
      apolloLoading: 0,
      columns: tableColumns,
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
    },
  },
  methods: {
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

</style>
