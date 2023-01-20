<template>
  <div>
    {{ items }}
    <v-table v-if="items" :theme="vuetifyTheme.global.name.value">
      <thead>
        <tr>
          <th
            v-for="header in headers"
            :key="header.value"
            :class="header.align === 'center' ? 'text-center' + ' ' + header.class : header.class === 'right' ? 'text-right' + ' ' + header.class : 'text-left' + ' ' + header.class"
          >
            {{ header.text }}
          </th>
        </tr>
      </thead>
      <tbody>
        <tr
          v-for="item in items"
          :key="_.get(item, 'id') ?? _.uniqueId()"
        >
          <td
            v-for="header in headers"
            :key="header.value"
          >
            <slot :name="header.value" :item="item">
              {{ item[header.value] }}
            </slot>
          </td>
        </tr>
      </tbody>
    </v-table>
  </div>
</template>

<script lang="ts" setup>
import _ from 'lodash'
import { useTheme } from 'vuetify'

const vuetifyTheme = useTheme()

interface IDataTableHeader {
  text: string,
  value: string,
  align?: 'start' | 'center' | 'end',
  class?: string | string[],
}
interface IProps {
  items?: unknown[];
  headers?: IDataTableHeader[];
  itemsPerPage?: number;

}
const props = defineProps<IProps>()

</script>
