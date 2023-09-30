<template>
  <ui-account>
    <base-card class="pa-0" :card-title="$t('profile.household.title')">
      <form class="p-card">
        <v-row>
          <v-col v-for="household in getHouseholds" :key="household.id" cols="12" lg="6">
            <div
              class="border-secondary rounded pa-3 d-flex justify-space-between align-center flex-wrap"
            >
              <div>
                <div class="d-flex align-center mb-3">
                  <i class="me-2 text-20 text-secondary tio-">home_outlined</i>
                  <div class="body-text-2 f-600">
                    {{ household.name }}
                  </div>
                </div>
                <p class="text-caption mb-0">
                  Ap #285-7193 Ullamcorper Avenue Amesbury HI 93373 US
                </p>
              </div>
              <div class="d-flex">
                <v-btn class="text-capitalize" flat icon size="small">
                  <i class="text-18 text-secondary tio-">edit</i>
                </v-btn>
                <v-btn class="text-capitalize" flat icon size="small">
                  <i class="text-18 text-secondary tio-">delete</i>
                </v-btn>
              </div>
            </div>
          </v-col>
          <v-col cols="12" lg="6">
            <div
              class="border-secondary rounded pa-3 d-flex justify-space-between align-center flex-wrap"
            >
              <div>
                <div class="d-flex align-center mb-3">
                  <i class="me-2 text-20 text-secondary tio-">city</i>
                  <div class="body-text-2 f-600">
                    Office
                  </div>
                </div>
                <p class="text-caption mb-0">
                  Ap #285-7193 Ullamcorper Avenue Amesbury HI 93373 US
                </p>
              </div>
              <div class="d-flex">
                <v-btn class="text-capitalize" flat icon size="small">
                  <i class="text-18 text-secondary tio-">edit</i>
                </v-btn>
                <v-btn class="text-capitalize" flat icon size="small">
                  <i class="text-18 text-secondary tio-">delete</i>
                </v-btn>
              </div>
            </div>
          </v-col>
          <v-col cols="12" lg="6">
            <div
              class="border-secondary rounded pa-3 d-flex justify-space-between align-center flex-wrap"
            >
              <div>
                <div class="d-flex align-center mb-3">
                  <i class="me-2 text-20 text-secondary tio-">home_outlined</i>
                  <div class="body-text-2 f-600">
                    Home 2
                  </div>
                </div>
                <p class="text-caption mb-0">
                  Ap #285-7193 Ullamcorper Avenue Amesbury HI 93373 US
                </p>
              </div>
              <div class="d-flex">
                <v-btn class="text-capitalize" flat icon size="small">
                  <i class="text-18 text-secondary tio-">edit</i>
                </v-btn>
                <v-btn class="text-capitalize" flat icon size="small">
                  <i class="text-18 text-secondary tio-">delete</i>
                </v-btn>
              </div>
            </div>
          </v-col>
          <v-col cols="12" lg="6">
            <div
              class="border-secondary bg-secondary-lighten-5 rounded pa-3 d-flex justify-space-between align-center flex-wrap"
            >
              <div>
                <div class="text-caption mb-3 f-600">
                  {{ $t('profile.household.create') }}
                </div>
                <div class="text-caption">
                  {{ $t('profile.household.createDesc') }}
                </div>
              </div>

              <v-btn class="text-capitalize" flat color="primary">
                {{ $t('buttons.add') }}
              </v-btn>
            </div>
          </v-col>
          <v-dialog
            v-model="openNewHouseholdModal"
            persistent
            width="1024"
          >
            <template #activator="{ props }">
              <v-btn
                color="primary"
                v-bind="props"
              >
                Open Dialog
              </v-btn>
            </template>
            <v-card>
              <v-card-title>
                <span class="text-h5">User Profile</span>
              </v-card-title>
              <v-card-text>
                <v-container>
                  <v-row>
                    <v-col cols="12">
                      <ui-input
                        v-model="emptyHousehold.name"
                        :label="$t('profile.household.labels.name')"
                        required
                      />
                    </v-col>
                    <v-col v-if="emptyHousehold.address?.country" cols="12" sm="6">
                      <ui-input
                        v-model="emptyHousehold.address.country"
                        :label="$t('forms.labels.country')"
                        required
                      />
                    </v-col>
                    <v-col v-if="emptyHousehold.address?.postcode" cols="12" sm="6">
                      <ui-input
                        v-model="emptyHousehold.address.postcode"
                        :label="$t('forms.labels.postcode')"
                        required
                      />
                    </v-col>
                    <v-col v-if="emptyHousehold.address?.division" cols="12" sm="6">
                      <ui-input
                        v-model="emptyHousehold.address.division"
                        :label="$t('forms.labels.division')"
                        required
                      />
                    </v-col>
                    <v-col v-if="emptyHousehold.address?.city" cols="12" sm="6">
                      <ui-input
                        v-model="emptyHousehold.address.city"
                        :label="$t('forms.labels.postcode')"
                        required
                      />
                    </v-col>
                    <v-col v-if="emptyHousehold.address?.street" cols="12" sm="6">
                      <ui-input
                        v-model="emptyHousehold.address.street"
                        :label="$t('forms.labels.street')"
                        required
                      />
                    </v-col>
                    <v-col cols="12">
                      <v-text-field
                        label="Password*"
                        type="password"
                        primary
                        required
                      />
                    </v-col>
                    <v-col
                      cols="12"
                      sm="6"
                    >
                      <ui-input
                        :label="$t('forms.labels.street')"
                        required
                      />
                      <GMapMap
                        :center="{lat: 51.093048, lng: 6.842120}"
                        :zoom="7"
                        map-type-id="terrain"
                        style="width: 500px; height: 300px"
                      />
                      <GMapAutocomplete
                        placeholder="placeholder if you wish"
                        @place_changed="callbackFunction"
                      />
                      text-secondary
                      {{ address }}
                    </v-col>
                    <v-col
                      cols="12"
                      sm="6"
                    >
                      <v-autocomplete
                        :items="['Skiing', 'Ice hockey', 'Soccer', 'Basketball', 'Hockey', 'Reading', 'Writing', 'Coding', 'Basejump']"
                        label="Interests"
                        multiple
                      />
                    </v-col>
                  </v-row>
                </v-container>
                <small>*indicates required field</small>
              </v-card-text>
              <v-card-actions>
                <v-spacer />
                <v-btn
                  color="blue-darken-1"
                  variant="text"
                  @click="openNewHouseholdModal = false"
                >
                  Close
                </v-btn>
                <v-btn
                  color="blue-darken-1"
                  variant="text"
                  @click="openNewHouseholdModal = false"
                >
                  Save
                </v-btn>
              </v-card-actions>
            </v-card>
          </v-dialog>
        </v-row>
      </form>
      {{ getHouseholds }}
      {{ emptyHousehold }}
    </base-card>
  </ui-account>
</template>

<script lang="tsx" setup>
import { storeToRefs } from 'pinia'
import { useUserStore } from '~/stores/users'
definePageMeta({
  middleware: 'auth'
})
const address = ref('')
const userStore = useUserStore()
const { getHouseholds, emptyHousehold } = storeToRefs(userStore)
const openNewHouseholdModal = ref(false)

const callbackFunction = (place) => {
  console.log(place)
  console.log(typeof place)
  address.value = place
}

</script>
