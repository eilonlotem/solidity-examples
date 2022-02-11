<template>
  <fragment>
    <b-card>
      <b-card-title>
        Wallets Table
      </b-card-title>
      <b-list-group>
        <b-list-group-item>
          <h6 class="display-6">
            Chose the columns you want to see
          </h6>
          <template>
            <v-select
              v-model="item"
              :dir="$store.state.appConfig.isRTL ? 'rtl' : 'ltr'"
              multiple
              label="label"
              :options="options"
              :clearable="false"
            />
          </template>
        </b-list-group-item>
        <b-list-group-item>
          <h5 class="display-5">
            Wallets Table
          </h5>
          <!-- table -->
          <vue-good-table
            :columns="columns"
            :rows="rows"
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
                    <b-dropdown-item>
                      <feather-icon
                        icon="Edit2Icon"
                        class="mr-50"
                      />
                      <span>Edit</span>
                    </b-dropdown-item>
                    <b-dropdown-item>
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
  </fragment>
</template>

<script>
import {
  BAvatar, BBadge, BPagination, BFormSelect, BDropdown, BDropdownItem, BCard, BCardText, BCardTitle, BListGroup, BListGroupItem,
} from 'bootstrap-vue'
import { VueGoodTable } from 'vue-good-table'
import vSelect from 'vue-select'
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
    BCardText,
    BCardTitle,
    BListGroup,
    BListGroupItem,
    vSelect,
  },
  data() {
    return {
      item: null,
      options: [

        {
          label: 'Date',
          field: 'startDate',
          filterOptions: {
            enabled: true,
            placeholder: 'Search Date',
          },
        },
        {
          label: 'Salary',
          field: 'salary',
          filterOptions: {
            enabled: true,
            placeholder: 'Search Salary',
          },
        },
      ],
      pageLength: 3,
      dir: false,
      defaultColumns: [

      ],
      columns: [
        {
          label: 'Name',
          field: 'fullName',
          filterOptions: {
            enabled: true,
            placeholder: 'Search Name',
          },
        },
        {
          label: 'Email',
          field: 'email',
          filterOptions: {
            enabled: true,
            placeholder: 'Search Email',
          },
        },
        {
          label: 'Action',
          field: 'action',
        }],
      rows: [],
      searchTerm: '',
    }
  },
  computed: {
    statusVariant() {
      const statusColor = {
        /* eslint-disable key-spacing */
        Current      : 'light-primary',
        Professional : 'light-success',
        Rejected     : 'light-danger',
        Resigned     : 'light-warning',
        Applied      : 'light-info',
        /* eslint-enable key-spacing */
      }

      return status => statusColor[status]
    },
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
    item(val, oldVal) {
      const itemsToAdd = []
      const firstsValue = this.columns.slice(0, 2)
      const lastValue = this.columns.slice(-1)
      val.forEach(element => {
        const existValue = this.columns.indexOf(element)
        if (existValue) {
          itemsToAdd.push(element)
        }
      })
      this.columns = [...firstsValue, ...itemsToAdd, ...lastValue]
    },
  },
  created() {
    this.$http.get('/good-table/basic')
      .then(res => { this.rows = res.data })
  },
  methods: {
    addColumnToTable(newValue) {
      this.columns = [...newValue, ...this.columns]
    },
    removeColumnToTable() {
      console.log(this.item)
    },
  },
}
</script>

<style lang="scss" >
  @import '@core/scss/vue/libs/vue-good-table.scss';
</style>
