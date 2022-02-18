<template>
  <div>
    <b-sidebar
      id="sidebar-add-new-event"
      sidebar-class="sidebar-lg"
      :visible="isEventHandlerSidebarActive"
      bg-variant="white"
      shadow
      backdrop
      no-header
      right
      @change="(val) => $emit('update:is-event-handler-sidebar-active', val)"
    >

    <b-form @submit.prevent>
    <b-row>

      <!-- username -->
      <b-col cols="12">
        <b-form-group
          label="Username"
          label-for="h-username"
        >
          <b-form-input
            id="h-username"
            placeholder="Username"
          />
        </b-form-group>
      </b-col>

      <!-- email -->
      <b-col cols="12">
        <b-form-group
          label="Email"
          label-for="d-email"
        >
          <b-form-input
            id="d-email"
            type="email"
            placeholder="Email"
          />
          <b-form-text>Enter a Valid Email</b-form-text>
        </b-form-group>
      </b-col>

      <!-- password -->
      <b-col cols="12">
        <b-form-group
          label="Password"
          label-for="d-password"
        >
          <b-form-input
            id="d-password"
            type="password"
            placeholder="Password"
          />
          <b-form-text>Your password must be 8-20 characters long.</b-form-text>
        </b-form-group>
      </b-col>

      <!-- occupation -->
      <b-col cols="12">
        <b-form-group
          label="Occupation"
          label-for="h-occupation"
        >
          <b-form-input
            id="h-occupation"
            list="input-list"
            placeholder="Occupation"
          />
          <b-form-datalist
            id="input-list"
            :options="options"
          />
        </b-form-group>
      </b-col>

      <!-- checkbox -->
      <b-col cols="12">
        <b-form-group>
          <b-form-checkbox
            id="checkbox-9"
            name="checkbox-9"
            value="Remember_me"
          >
            Remember me
          </b-form-checkbox>
        </b-form-group>
      </b-col>

      <!-- submit and reset -->
      <b-col>
        <b-button
          v-ripple.400="'rgba(255, 255, 255, 0.15)'"
          type="submit"
          variant="primary"
          class="mr-1"
        >
          Submit
        </b-button>
        <b-button
          v-ripple.400="'rgba(186, 191, 199, 0.15)'"
          type="reset"
          variant="outline-secondary"
        >
          Reset
        </b-button>
      </b-col>
    </b-row>
  </b-form>
    </b-sidebar>
  </div>
</template>

<script>
import {
  BSidebar, BForm, BFormGroup, BFormInput, BFormCheckbox, BAvatar, BFormTextarea, BButton, BFormInvalidFeedback,
} from 'bootstrap-vue'
import vSelect from 'vue-select'
import flatPickr from 'vue-flatpickr-component'
import Ripple from 'vue-ripple-directive'
import { ValidationProvider, ValidationObserver } from 'vee-validate'
import { required, email, url } from '@validations'
import formValidation from '@core/comp-functions/forms/form-validation'
import { ref, toRefs } from '@vue/composition-api'
import useCalendarEventHandler from './useCalendarEventHandler'

export default {
  components: {
    BButton,
    BSidebar,
    BForm,
    BFormGroup,
    BFormInput,
    BFormCheckbox,
    BFormTextarea,
    BAvatar,
    vSelect,
    flatPickr,
    ValidationProvider,
    BFormInvalidFeedback,
    ValidationObserver,
  },
  directives: {
    Ripple,
  },
  props: {
    isEventHandlerSidebarActive: {
      type: Boolean,
      required: true,
    }
  },
  data() {
    return {
    }
  },
}
</script>

<style lang="scss">
@import '@core/scss/vue/libs/vue-select.scss';
@import '@core/scss/vue/libs/vue-flatpicker.scss';
</style>
