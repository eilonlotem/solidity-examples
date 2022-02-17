<template>
  <b-card title="Wallets Table">
    <b-list-group class="wallets-group">
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
              v-b-modal.import-modal
              style="{height: '50%'}"
              block
              variant="primary"
            >
              Add Address
            </b-button>
          </div>
        </div>
      </b-list-group-item>
      <b-list-group-item>
        <our-table
          :columns="columns"
          :data="allMyAddresses"
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
      ok-only
    >
      <add-wallet-form />
    </b-modal>
  </b-card>

</template>

<script>
import {
  BCard, BListGroup, BListGroupItem, BSidebar, VBToggle, BButton, BModal,
} from 'bootstrap-vue'
import AddAdressForm from '@/views/forms/form-addAddress/AddAdressForm.vue'
import Ripple from 'vue-ripple-directive'
import { GET_ALL_ADDRESSES, DELETE_ADDRESS } from '@/graphql/Address/queries'
import { tableColumns, selectOptions } from '@/views/wallet/wallet-table/utils'
import ToastificationContent from '@core/components/toastification/ToastificationContent.vue'
import OurTable from '@core/components/table/OurTable.vue'
import ColumnSelecter from '@core/components/column-selecter/ColumnSelecter.vue'
import AddWalletForm from '@/views/wallet/add-wallet/AddWalletForm.vue'

export default {
  components: {
    BCard,
    BListGroup,
    BListGroupItem,
    BSidebar,
    AddWalletForm,
    OurTable,
    ColumnSelecter,
    BButton,
    BModal,
  },
  directives: {
    Ripple,
    'b-toggle': VBToggle,
  },
  data() {
    return {
      allMyAddresses: [],
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
    allMyAddresses: {
      query: GET_ALL_ADDRESSES,
      update: data => data.allMyAddresses.results,
      result({ data, loading }) {
        if (!loading) {
          this.totalRows = data.allMyAddresses.totalCount
        }
      },
      variables: {
        limit: 10,
        offset: 0,
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
      this.$apollo.queries.allMyAddresses.fetchMore({
        variables: {
          limit: 10,
          offset,
        },
        updateQuery(previousResult, { fetchMoreResult }) {
        // this.totalRows = fetchMoreResult.allMyAddresses.totalCount
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
        this.$apollo.queries.allMyAddresses.refetch()
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
  .wallets-group .list-group-item {
    border: 0px !important;
  }
  .wallets-group .list-group-item:hover {
    background-color:transparent !important;
  }
  .wallets-group .vgt-global-search {
    border: 0px !important;
  }
  .select-column-section {
    width: 70% !important;
  }
  .button-section {
   height: 50%;
  }
</style>
