<template>
  <div>
    <b-sidebar
      id="filter-input-sidebar"
      sidebar-class="sidebar-lg"
      bg-variant="white"
      shadow
      backdrop
      no-header
      right
    >
      <template>
        <!-- Header -->
        <div class="d-flex justify-content-between align-items-center content-sidebar-header px-2 py-1">
          <h5 class="mb-0">
            Filter
          </h5>
          <div>
            <feather-icon
              icon="TrashIcon"
              class="cursor-pointer"
            />
            <feather-icon
              class="ml-1 cursor-pointer"
              icon="XIcon"
              size="16"
            />
          </div>
        </div>

        <!-- Form -->
        <b-form
          class="p-2 filter-group-form"
          @submit.prevent="handleSave"
          @reset.prevent="resetForm"
        >
          <b-form-group
            label="Accounts"
            label-for="accounts"
          >
            <v-select
              :options="form.accounts"
              :dir="$store.state.appConfig.isRTL ? 'rtl' : 'ltr'"
              label="label"
              :reduce="calendar => calendar.label"
              input-id="accounts"
            />
          </b-form-group>
          <b-form-group>
            <b-form-checkbox
              v-model="showFullDate"
              checked="true"
              name="select-full-history"
              switch
              inline
            >
              Select full history
            </b-form-checkbox>
          </b-form-group>

          <b-form-group v-if="showFullDate">
            <b-form-datepicker
              local="en"
              placeholder="Start date"
              class="mb-1"
              selected-variant="danger"
            />
            <b-form-datepicker
              local="en"
              placeholder="End date"
              class="mb-1"
              selected-variant="danger"
            />
          </b-form-group>

          <b-form-group
            label="Contacts"
            label-for="contacts"
          >
            <v-select
              :dir="$store.state.appConfig.isRTL ? 'rtl' : 'ltr'"
              label="label"
              :reduce="calendar => calendar.label"
              input-id="contacts"
              :options="form.contacts"
            />
          </b-form-group>
          <b-form-group
            label="Addresses"
            label-for="addresses"
          >
            <v-select
              :dir="$store.state.appConfig.isRTL ? 'rtl' : 'ltr'"
              label="label"
              :reduce="calendar => calendar.label"
              input-id="addresses"
              :options="form.addresses"
            />
          </b-form-group>
          <b-form-group
            label="Labels"
            label-for="labels"
          >
            <v-select
              :dir="$store.state.appConfig.isRTL ? 'rtl' : 'ltr'"
              label="label"
              :reduce="calendar => calendar.label"
              input-id="labels"
              :options="form.labels"
            />
          </b-form-group>
          <!-- checkbox here -->
          <b-form-group
            label="Order type"
            label-for="order-type"
          >
            <v-select
              :dir="$store.state.appConfig.isRTL ? 'rtl' : 'ltr'"
              label="label"
              :reduce="calendar => calendar.label"
              input-id="order-type"
              :options="form.orderType"
            />
          </b-form-group>
          <b-form-group
            label="Asset"
            label-for="asset"
          >
            <v-select
              :dir="$store.state.appConfig.isRTL ? 'rtl' : 'ltr'"
              label="label"
              :reduce="calendar => calendar.label"
              input-id="asset"
              :options="form.asset"
            />
          </b-form-group>
          <b-form-group
            label="Transaction hash"
            label-for="transaction-hash"
          >
            <v-select
              :dir="$store.state.appConfig.isRTL ? 'rtl' : 'ltr'"
              label="label"
              :reduce="calendar => calendar.label"
              input-id="transaction-hash"
              :options="form.transactionHash"
            />
          </b-form-group>
          <b-form-group
            label="Transaction note"
            label-for="transaction-note"
          >
            <v-select
              :dir="$store.state.appConfig.isRTL ? 'rtl' : 'ltr'"
              label="label"
              :reduce="calendar => calendar.label"
              input-id="transaction-note"
              :options="form.transactionNote"
            />
          </b-form-group>
          <b-form-group
            label="Valuation"
            label-for="valuation"
          >
            <v-select
              :dir="$store.state.appConfig.isRTL ? 'rtl' : 'ltr'"
              label="label"
              :reduce="calendar => calendar.label"
              input-id="valuation"
              :options="form.valuation"
            />
          </b-form-group>
          <b-form-group
            label="Transaction status"
            label-for="transaction-status"
          >
            <v-select
              :dir="$store.state.appConfig.isRTL ? 'rtl' : 'ltr'"
              label="label"
              :reduce="calendar => calendar.label"
              input-id="transaction-status"
              :options="form.transactionStatus"
            />
          </b-form-group>
          <b-form-group
            label="Cost basis error"
            label-for="cost-basis-error"
          >
            <v-select
              :dir="$store.state.appConfig.isRTL ? 'rtl' : 'ltr'"
              label="label"
              :reduce="calendar => calendar.label"
              input-id="cost-basis-error"
              :options="form.CostBasisError"
            />
          </b-form-group>
          <!-- submit and reset -->
          <b-col>
            <b-button
              v-ripple.400="'rgba(186, 191, 199, 0.15)'"
              type="reset"
              variant="outline-secondary"
              class="mr-1"
            >
              Clear
            </b-button>
            <b-button
              v-ripple.400="'rgba(255, 255, 255, 0.15)'"
              type="submit"
              variant="primary"
            >
              Save
            </b-button>
          </b-col>
        </b-form>
      </template>
    </b-sidebar>
  </div>
</template>

<script>
import {
  BSidebar, BForm, BFormGroup, BFormCheckbox, BFormDatepicker, BButton, BCol,
} from 'bootstrap-vue'
import vSelect from 'vue-select'
import Ripple from 'vue-ripple-directive'

export default {
  components: {
    BSidebar,
    BForm,
    BFormGroup,
    BFormCheckbox,
    vSelect,
    BFormDatepicker,
    BButton,
    BCol,
  },
  directives: {
    Ripple,
  },
  props: {
  },
  data() {
    return {
      showFullDate: false,
      form: {
        accounts: [],
        contacts: [],
        addresses: [],
        labels: [],
        orderType: [],
        asset: [],
        transactionHash: [],
        transactionNote: [],
        valuation: [],
        transactionStatus: [],
        CostBasisError: [],
      },
    }
  },
  methods: {
    handleSave() {
    },
    resetForm() {
      this.form = {
        accounts: [],
        contacts: [],
        addresses: [],
        labels: [],
        orderType: [],
        asset: [],
        transactionHash: [],
        transactionNote: [],
        valuation: [],
        transactionStatus: [],
        CostBasisError: [],
      }
    },
  },
}
</script>

<style lang="scss">
@import '@core/scss/vue/libs/vue-select.scss';
.filter-group-form .v-select {
  border: 0px !important;
}
</style>
