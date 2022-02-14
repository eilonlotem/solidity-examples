<template>
  <validation-observer ref="simpleRules">
    <b-form>
      <b-row>
        <b-col md="12">
          <b-form-group>
            <label>Name</label>
            <validation-provider
              #default="{ errors }"
              name="Name"
            >
              <b-form-input
                v-model="name"
                :state="errors.length > 0 ? false:null"
                placeholder="Name"
              />
              <small class="text-danger">{{ errors[0] }}</small>
            </validation-provider>
          </b-form-group>
        </b-col>

        <b-col md="12">
          <b-form-group>
            <label>Address</label>
            <validation-provider
              #default="{ errors }"
              name="Address"
            >
              <b-form-input
                v-model="address"
                :state="errors.length > 0 ? false:null"
                placeholder="Address"
              />
              <small class="text-danger">{{ errors[0] }}</small>
            </validation-provider>
          </b-form-group>
        </b-col>

        <b-col md="12">
          <b-form-group>
            <label>Blockchain</label>
            <validation-provider
              #default="{ errors }"
              name="Blockchain"
            >
              <b-form-input
                v-model="blockchain"
                :state="errors.length > 0 ? false:null"
                placeholder="Blockchain"
              />
              <small class="text-danger">{{ errors[0] }}</small>
            </validation-provider>
          </b-form-group>
        </b-col>

        <b-col md="12">
          <b-form-group>
            <label>Description</label>
            <validation-provider
              #default="{ errors }"
              name="Description"
            >
              <b-form-input
                v-model="description"
                :state="errors.length > 0 ? false:null"
                placeholder="Description"
              />
              <small class="text-danger">{{ errors[0] }}</small>
            </validation-provider>
          </b-form-group>
        </b-col>

        <b-col md="12">
          <b-form-group>
            <validation-provider
              #default="{ errors }"
              rules="required"
              name="Internal"
            >
              <b-form-checkbox
                v-model="internal"
                checked="true"
                name="internal"
                switch
                inline
              >
                Internal
              </b-form-checkbox>
              <small class="text-danger">{{ errors[0] }}</small>
            </validation-provider>
          </b-form-group>
        </b-col>

        <!-- submit button -->
        <b-col cols="12">
          <b-button
            variant="primary"
            type="submit"
            @click.prevent="validationForm"
          >
            Submit
          </b-button>
        </b-col>
      </b-row>
    </b-form>
  </validation-observer>
</template>

<script>
import { ValidationProvider, ValidationObserver } from 'vee-validate'
import {
  BFormInput, BFormGroup, BForm, BRow, BCol, BButton, BFormCheckbox,
} from 'bootstrap-vue'
import {
  required,
} from '@validations'
import ToastificationContent from '@core/components/toastification/ToastificationContent.vue'

import { ADD_ADDRESS } from '@/graphql/Address/queries'

export default {
  components: {
    ValidationProvider,
    ValidationObserver,
    BFormInput,
    BFormGroup,
    BForm,
    BRow,
    BCol,
    BButton,
    BFormCheckbox,
  },
  data() {
    return {
      address: '0x45ee97c573bca537de90b1c780f41adc134dfad7',
      blockchain: '',
      description: '',
      name: '',
      internal: false,
      required,
    }
  },
  methods: {
    async validationForm() {
      try {
        const success = await this.$refs.simpleRules.validate()
        if (success) {
          await this.$apollo.mutate({ mutation: ADD_ADDRESS(this.name, this.address, this.blockchain, this.description, this.internal) })
          this.$toast({
            component: ToastificationContent,
            position: 'top-right',
            props: {
              title: 'Information',
              icon: 'ThumbsUpIcon',
              variant: 'success',
              text: 'You have successfully Added the address',
            },
          })
        }
      } catch (error) {
        console.log('ERROR', error)
      }
    },
  },
}
</script>
