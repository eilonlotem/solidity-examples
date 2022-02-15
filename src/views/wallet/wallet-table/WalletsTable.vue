<template>
  <fragment>
    <b-card title="Wallets Table">
      <b-list-group>
        <b-list-group-item>
          <h6 class="display-6">
            Chose the columns you want to see
          </h6>
          <template>
            <v-select
              v-model="selectedItem"
              :dir="$store.state.appConfig.isRTL ? 'rtl' : 'ltr'"
              multiple
              label="label"
              :options="options"
              :clearable="false"
            />
          </template>
        </b-list-group-item>

        <b-list-group-item>

          <!-- table -->
          <vue-good-table
            style-class="vgt-table"
            :columns="columns"
            :rows="allMyAddresses"
            :rtl="direction"
            :search-options="{
              enabled: true,
              externalQuery: searchTerm }"
            :pagination-options="{
              enabled: true,
              perPage:pageLength
            }"
          >
            <div slot="table-actions">
              <b-button
                v-ripple.400="'rgba(255, 255, 255, 0.15)'"
                v-b-toggle.add-address-sidebar
                block
                variant="primary"
              >
                Add Address
              </b-button>
            </div>
            <template
              slot="table-row"
              slot-scope="props"
            >

              <!-- Column: Name -->
              <div
                v-if="props.column.field === 'fullName'"
                class="text-nowrap"
              >
                <b-avatar
                  :src="props.row.avatar"
                  class="mx-1"
                />
                <span class="text-nowrap">{{ props.row.fullName }}</span>
              </div>

              <!-- Column: Status -->
              <span v-else-if="props.column.field === 'status'">
                <b-badge :variant="statusVariant(props.row.status)">
                  {{ props.row.status }}
                </b-badge>
              </span>

              <!-- Column: Action -->
              <span v-else-if="props.column.field === 'action'">
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
                    <b-dropdown-item @click="()=>deleteAddress(props.row.id)">
                      <feather-icon
                        icon="TrashIcon"
                        class="mr-50"
                      />
                      <span>Delete</span>
                    </b-dropdown-item>
                  </b-dropdown>
                </span>
              </span>

              <!-- Column: Common -->
              <span v-else>
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
                  <span class="text-nowrap "> of {{ props.total }} entries </span>
                </div>
                <div>
                  <b-pagination
                    :value="1"
                    :total-rows="props.total"
                    :per-page="pageLength"
                    first-number
                    last-number
                    align="right"
                    prev-class="prev-item"
                    next-class="next-item"
                    class="mt-1 mb-0"
                    @input="(value)=>props.pageChanged({currentPage:value})"
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
  BAvatar, BBadge, BPagination, BFormSelect, BDropdown, BDropdownItem, BCard, BCardTitle, BListGroup, BListGroupItem, BButton, BRow, BCol, BSidebar, VBToggle,
} from 'bootstrap-vue'
import { VueGoodTable } from 'vue-good-table'
import AddAdressForm from '@/views/forms/form-addAddress/AddAdressForm.vue'
import Ripple from 'vue-ripple-directive'
import vSelect from 'vue-select'
import { GET_ALL_ADDRESSES, DELETE_ADDRESS } from '@/graphql/Address/queries'
import { tableColumns, selectOptions } from '@/views/wallet/wallet-table/utils'
import ToastificationContent from '@core/components/toastification/ToastificationContent.vue'
import store from '@/store/index'

export default {
  components: {
    VueGoodTable,
    BAvatar,
    BBadge,
    BPagination,
    BFormSelect,
    BDropdown,
    BDropdownItem,
    BCard,
    BCardTitle,
    BListGroup,
    BListGroupItem,
    BButton,
    BRow,
    BCol,
    BSidebar,
    vSelect,
    AddAdressForm,
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
      pageLength: 3,
      dir: false,
      columns: tableColumns,
      rows: [],
      searchTerm: '',
    }
  },
  apollo: {
    allMyAddresses: {
      query: GET_ALL_ADDRESSES,
      update: data => data.allMyAddresses.results,
    },
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
  methods: {
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
</style>
