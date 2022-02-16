<template>
  <fragment>
    <b-card title="Wallets Table">
      <b-list-group class="wallets-group">
        <b-list-group-item v-if="!apolloLoading ? true: false">
          <h6 class="display-6">
            Chose the columns you want to see
          </h6>
          <template>
            <column-selecter
              :options="options"
              :selected-item="selectedItem"
              @changeSelectedItems="changeSelectedItems($event)"
            />
          </template>
        </b-list-group-item>

        <b-list-group-item>

          <our-table
            :columns="columns"
            :data="allMyAddresses"
            :page-length="pageLength"
            :is-loading="apolloLoading ? true: false"
            :add-button-text="'Add Address'"
            :delete-call-back="deleteAddress"
            :total-rows="totalRows"
            :next-page="nextPage"
          />

        </b-list-group-item>

      </b-list-group>
    </b-card>
    <b-sidebar
      id="add-address-sidebar"
      shadow
      right
      backdrop
      bg-variant="white"
      no-header
    >
      <add-adress-form />
    </b-sidebar>
  </fragment>
</template>

<script>
import {
   BCard, BListGroup, BListGroupItem, BSidebar, VBToggle,
} from 'bootstrap-vue'
import AddAdressForm from '@/views/forms/form-addAddress/AddAdressForm.vue'
import Ripple from 'vue-ripple-directive'
import { GET_ALL_ADDRESSES, DELETE_ADDRESS } from '@/graphql/Address/queries'
import { tableColumns, selectOptions } from '@/views/wallet/wallet-table/utils'
import ToastificationContent from '@core/components/toastification/ToastificationContent.vue'
import OurTable from '@core/components/table/OurTable.vue'
import ColumnSelecter from '@core/components/column-selecter/ColumnSelecter.vue'
import store from '@/store/index'

export default {
  components: {
    BCard,
    BListGroup,
    BListGroupItem,
    BSidebar,
    AddAdressForm,
    OurTable,
    ColumnSelecter,
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
      pageLength: 10,
      dir: false,
      columns: tableColumns,
      rows: [],
      totalRows: 0,
      searchTerm: '',
      apolloLoading: 0,
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
        console.log('data', data)
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
  @import '@core/scss/vue/libs/vue-good-table.scss';
  .b-sidebar {
    width: 400px !important;
  }
  .wallets-group .list-group-item {
    border: 0px !important;
  }
  .wallets-group .list-group-item:hover {
    background-color: white !important;
  }
  .wallets-group table {
    border: 0px !important;
  }
  .wallets-group .vgt-global-search {
    border: 0px !important;
  }
</style>
