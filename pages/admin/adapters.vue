<template>
  <div>
    <VRow class="match-height">
      <VCol
        cols="12"
        md="12"
      >
        <ui-card title="Adapter Management" subtitle="Edit adapters from the whole cloud">
          <ui-table :items="tableData" :headers="headers">
            <template #actions="{item}">
              <ui-button size="x-small" icon color="default" @click="onEditClick(item)">
                <v-icon color="success">
                  mdi-pencil
                </v-icon>
              </ui-button>
            </template>
            <template #name="{item}">
              <v-tooltip :text="item.description" location="end">
                <template #activator="{ props }">
                  <v-chip v-bind="props">
                    {{ item.name }}
                  </v-chip>
                </template>
              </v-tooltip>
            </template>
            <template #createdAt="{item}">
              {{ $moment(item.createdAt).format('DD.MM.YYYY - HH:mm') }}
            </template>
            <template #instances="{item}">
              <v-chip>
                {{ item.instances?.length ?? 0 }}
              </v-chip>
            </template>
          </ui-table>
        </ui-card>
      </VCol>
    </VRow>
    <v-dialog
      v-model="editModal"
      width="50%"
    >
      <v-card>
        <v-card-text>
          <ui-input v-model="itemToEdit.name" label="Name" label-in-input />
          <v-textarea v-model="itemToEdit.description" class="mt-5" label="Description" persistent-placeholder />
        </v-card-text>
        <v-card-actions>
          <v-spacer />
          <ui-button color="error" @click="editModal = false">
            Cancel
          </ui-button>
          <ui-button color="success" @click="onSaveChanges">
            Save changes
          </ui-button>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script setup lang="tsx">
import { Ref } from 'vue'
import { IAdapter } from './types/adapters'
import { API } from '~~/helpers/api'
import RestApi from '~~/services/RestApi'

definePageMeta({
  layout: 'admin',
  middleware: 'auth'
})

const headers = [
  {
    value: 'name',
    text: 'Name'
  },
  {
    value: 'instances',
    text: 'Instanzen'
  },
  {
    value: 'createdAt',
    text: 'Erstellt'
  },
  {
    value: 'actions',
    text: 'Aktionen'
  }
]
const { pending: loadingTableData, data: tableData, refresh } = await RestApi.get<IAdapter[]>(API.adapter.all)

const editModal = ref(false)
const itemToEdit: Ref<IAdapter | null> = ref(null)

const onEditClick = (item) => {
  editModal.value = true
  itemToEdit.value = item
}

const onSaveChanges = async () => {
  editModal.value = false
  const { pending: loadingUpdateData, data, refresh } = await RestApi.patch<IAdapter[]>(API.adapter.update + '/' + itemToEdit.value.id, {
    name: itemToEdit.value.name,
    description: itemToEdit.value.description
  })
}
</script>

<script lang="tsx">

export default {
  mounted () {
    console.log('test') // 0
  }
}
</script>
