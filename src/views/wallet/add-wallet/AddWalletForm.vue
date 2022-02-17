<template>
  <div>
    <form-wizard
      color="#7367F0"
      :title="null"
      :subtitle="null"
      finish-button-text="Submit"
      back-button-text="Previous"
      class="steps-transparent mb-3"
      @on-complete="formSubmitted"
    >      <tab-content
      v-for="(tab, index) in wizardTabsList"
      :key="index"
      :title="tab.title"
      :icon="tab.icon"
    >
      <b-row>
        <b-col
          cols="12"
          class="mb-2"
        >
          <h5 class="mb-0">
            {{ tab.title }}
          </h5>
          <small class="text-muted">
            {{ tab.title }}
          </small>
        </b-col>

        <b-col
          v-for="(input, indexForm) in tab.form"
          :key="indexForm"
          md="6"
        >
          <b-form-group
            :label="input.label"
            :label-for="input.labelFor"
          >

            <template v-if="input.type == 'input'">
              <b-form-input
                :id="input.labelFor"
                placeholder=""
              />
            </template>

            <template v-if="input.type == 'select'">
              <v-select
                :id="input.labelFor"
                v-model="selectState[input.model]"
                :dir="$store.state.appConfig.isRTL ? 'rtl' : 'ltr'"
                :options="selectState[input.options]"
                :selectable="option => ! option.value.includes('select_value')"
                label="text"
              />
            </template>

          </b-form-group>
        </b-col>
      </b-row>
    </tab-content>
    </form-wizard>
  </div>
</template>

<script>
import { FormWizard, TabContent } from 'vue-form-wizard'
import vSelect from 'vue-select'
import ToastificationContent from '@core/components/toastification/ToastificationContent.vue'
import 'vue-form-wizard/dist/vue-form-wizard.min.css'
import {
  BRow,
  BCol,
  BFormGroup,
  BFormInput,
} from 'bootstrap-vue'
import tabsList from './utils'

export default {
  components: {
    FormWizard,
    TabContent,
    BRow,
    BCol,
    BFormGroup,
    BFormInput,
    vSelect,
    // eslint-disable-next-line vue/no-unused-components
    ToastificationContent,
  },
  data() {
    return {
      selectedContry: 'select_value',
      selectedLanguage: 'nothing_selected',
      wizardTabsList: tabsList,
      selectState: {
        countryName: [
          { value: 'select_value', text: 'Select Value' },
          { value: 'Russia', text: 'Russia' },
          { value: 'Canada', text: 'Canada' },
          { value: 'China', text: 'China' },
          { value: 'United States', text: 'United States' },
          { value: 'Brazil', text: 'Brazil' },
          { value: 'Australia', text: 'Australia' },
          { value: 'India', text: 'India' },
        ],
        languageName: [
          { value: 'nothing_selected', text: 'Nothing Selected' },
          { value: 'English', text: 'English' },
          { value: 'Chinese', text: 'Mandarin Chinese' },
          { value: 'Hindi', text: 'Hindi' },
          { value: 'Spanish', text: 'Spanish' },
          { value: 'Arabic', text: 'Arabic' },
          { value: 'Malay', text: 'Malay' },
          { value: 'Russian', text: 'Russian' },
        ],
      },
    }
  },
  methods: {
    formSubmitted() {
      this.$toast({
        component: ToastificationContent,
        props: {
          title: 'Form Submitted',
          icon: 'EditIcon',
          variant: 'success',
        },
      })
    },
  },
}
</script>

<style lang="scss">
  @import '@core/scss/vue/libs/vue-wizard.scss';
  @import '@core/scss/vue/libs/vue-select.scss';
</style>
