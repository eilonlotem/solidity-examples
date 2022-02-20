<template>
  <b-card title="Contracts">
    <b-list-group class="contracts-group">
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
          <div class="button-section d-flex">
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
          :data="allContracts"
          :is-loading="apolloLoading ? true: false"
          :delete-call-back="deleteAddress"
          :total-rows="totalRows"
          :next-page="nextPage"
        />
      </b-list-group-item>
    </b-list-group>
    <b-modal
      id="import-modal"
      size="lg"
      title="Import"
      hide-footer
    >
      <add-contract-form />
    </b-modal>

    <filter-inputs-sidebar />

  </b-card>

</template>

<script>
import {
  BCard, BListGroup, BListGroupItem, VBToggle, BButton, BModal,
} from 'bootstrap-vue'
import Ripple from 'vue-ripple-directive'
import { GET_ALL_SMART_CONTRACTS } from '@/graphql/SmartContracts'
import { tableColumns, selectOptions } from './utils'
import ToastificationContent from '@core/components/toastification/ToastificationContent.vue'
import OurTable from '@core/components/table/OurTable.vue'
import ColumnSelecter from '@core/components/column-selecter/ColumnSelecter.vue'
import FilterInputsSidebar from '@/views/components/filter-inputs-sidebar/FilterInputsSidebar.vue'

export default {
  components: {
    BCard,
    BListGroup,
    BListGroupItem,
    OurTable,
    ColumnSelecter,
    BButton,
    BModal,
    FilterInputsSidebar,

  },
  directives: {
    Ripple,
    'b-toggle': VBToggle,
  },
  data() {
    return {
      isEventHandlerSidebarActive: false,
      allContracts: [],
      selectedItem: tableColumns,
      options: tableColumns.concat(selectOptions),
      columns: tableColumns,
      totalRows: 0,
      apolloLoading: 0,
    }
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
  apollo: {
    allContracts: {
      query: GET_ALL_SMART_CONTRACTS,
      update: data => data.contract.results,
      result({ data, loading }) {
        if (!loading) {
          this.totalRows = data.contract.totalCount
        }
      },
      variables: {
        limit: 10,
        offset: 0,
        internal: false

      },
    },
  },
  methods: {
    changeSelectedItems(items) {
      this.selectedItem = items
    },
    nextPage(value) {
      // this.offset = this.limit
      const offset = (value.currentPage - 1) * 10
      this.$apollo.queries.allContracts.fetchMore({
        variables: {
          limit: 10,
          offset,
        },
        updateQuery(previousResult, { fetchMoreResult }) {
        // this.totalRows = fetchMoreResult.allContracts.totalCount
          return fetchMoreResult
        },
      })
    },
    async deleteAddress(id) {
      try {
        await this.$apollo.mutate({ mutation: DELETE_ADDRESS(id) })
        this.$toast({
          component: ToastificationContent,
          position: 'top-right',
          props: {
            title: 'Information',
            icon: 'ThumbsUpIcon',
            variant: 'success',
            text: 'You have successfully delete the address',
          },
        })
        this.$apollo.queries.allContracts.refetch()
      } catch (error) {
        console.log(error)
      }
    },
  },
}
</script>

<style lang="scss" >
  .b-sidebar {
    width: 400px !important;
  }
  .contracts-group .list-group-item {
    border: 0px !important;
  }
  .contracts-group .list-group-item:hover {
    background-color:transparent !important;
  }
  .contracts-group .vgt-global-search {
    border: 0px !important;
  }
  .select-column-section {
    width: 70% !important;
  }
  .button-section {
   height: 50%;
   width: 30%;
  }
</style>
