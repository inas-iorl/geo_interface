<script setup>

import {onMounted, ref} from "vue";
import { useRouter } from "vue-router"
import {useElementsStore} from "@/store/elements";

const elementsStore = useElementsStore()
const router = useRouter();
// const itemsPerPage = ref(5)
const headers = ref([
  {title: 'id', align: 'start', sortable: false, key: 'id'},
  // {title: 'parent_id', align: 'start', sortable: false, key: 'parent_id'},
  {title: 'element_type', align: 'start', sortable: false, key: 'element_type'},
  {title: 'code', align: 'start', sortable: false, key: 'code'},
  {title: 'name', align: 'start', sortable: false, key: 'name'},
  {title: 'culture', align: 'start', sortable: false, key: 'culture'},
  {title: 'descr', align: 'start', sortable: false, key: 'descr'},
  {title: 'image', align: 'start', sortable: false, key: 'image'},
  {title: 'user', align: 'start', sortable: false, key: 'user'},
  {title: 'Data', key: 'action_data', sortable: false },
  {title: 'Recomend', key: 'action_recomend', sortable: false },
  {title: 'Edit', key: 'action_edit', sortable: false },
  {title: 'Delete', key: 'action_delete', sortable: false },
])

const defaultEdit = { code: '', measure: ''}

const dialog = ref(false)
const dialogDelete = ref(false)

const editedItem = ref(defaultEdit);
const editedIndex = ref(-1);

// const search = ref('')
const loading = ref(true)

const totalItems = ref(0)

function goRoute(param){
  elementsStore.selectedElement = param;
  router.push({name: 'ElementData', params: { element_id: param.id}})
}

async function load() {
  loading.value = true
  await elementsStore.getElements()
  totalItems.value = elementsStore.cultures.length
  loading.value = false
}

function editItem (item) {
  editedIndex.value = elementsStore.cultures.indexOf(item)
  editedItem.value = Object.assign({}, item)
  this.dialog = true
}

function deleteItem (item) {
  editedIndex.value = elementsStore.cultures.indexOf(item)
  editedItem.value = Object.assign({}, item)
  dialogDelete.value = true
}

function deleteItemConfirm () {
  elementsStore.cultures.splice(this.editedIndex, 1)
  closeDelete()
}

function close () {
  dialog.value = false
  // this.$nextTick(() => {
  editedItem.value = Object.assign({}, defaultEdit)
  editedIndex.value = -1
  // })
}

function closeDelete () {
  dialogDelete.value = false
  // this.$nextTick(() => {
  editedItem.value = Object.assign({}, defaultEdit)
  editedIndex.value = -1
  // })
}

function save () {
  if (editedIndex.value > -1) {
    console.log('store create')
    console.log(editedItem.value);
  } else {
    console.log('store update')
  }
  close()
}

onMounted(async () => {
  await load()
})

</script>

<template>
  <div class="bg-red">
<!--    <v-data-table-server-->
<!--    v-model:items-per-page="itemsPerPage"-->
<!--    :headers="headers"-->
<!--    :items="elementsStore.data_types"-->
<!--    :items-length="totalItems"-->
<!--    :loading="loading"-->
<!--    :search="search"-->
<!--    item-value="name"-->
<!--   ></v-data-table-server>-->

  <v-data-table
    :headers="headers"
    :items="elementsStore.elements"
  >
    <template v-slot:top>
      <v-toolbar flat>
        <v-toolbar-title>Типы данных</v-toolbar-title>
        <v-divider class="mx-4" inset vertical></v-divider>
        <v-spacer></v-spacer>
        <v-dialog v-model="dialog" max-width="500px">
          <template v-slot:activator="{ props }">
            <v-btn class="mb-2" color="primary" dark v-bind="props">Новый элемент</v-btn>
          </template>
          <v-card>
            <v-card-title>
              <span class="text-h5">#Placeholder</span>
            </v-card-title>

            <v-card-text>
              <v-container>
                <v-row>
                  <v-col cols="12" md="4" sm="6">
                    <v-text-field v-model="editedItem.code" label="Dessert name"></v-text-field>
                  </v-col>
                </v-row>
              </v-container>
            </v-card-text>

            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="blue-darken-1" variant="text" @click="close">Удалить</v-btn>
              <v-btn color="blue-darken-1" variant="text" @click="save">Save</v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
        <v-dialog v-model="dialogDelete" max-width="500px">
          <v-card>
            <v-card-title class="text-h5">Удалить?</v-card-title>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="blue-darken-1" variant="text" @click="closeDelete">Отмена</v-btn>
              <v-btn color="blue-darken-1" variant="text" @click="deleteItemConfirm">OK</v-btn>
              <v-spacer></v-spacer>
            </v-card-actions>
          </v-card>
        </v-dialog>
      </v-toolbar>
    </template>
    <template v-slot:item.action_data="{item}">
      <v-icon size="large" @click="goRoute(item)">mdi-database-marker</v-icon>
    </template>
    <template v-slot:item.action_recomend="{ item }">
      <v-icon size="large" @click="editItem(item)">mdi-account</v-icon>
    </template>
    <template v-slot:item.action_edit="{ item }">
      <v-icon size="large" @click="editItem(item)">mdi-pencil</v-icon>
    </template>
    <template v-slot:item.action_delete="{ item }">
      <v-icon size="large" @click="deleteItem(item)">mdi-delete</v-icon>
    </template>
    <template v-slot:no-data>
      <v-btn color="primary" @click="load">Обновить</v-btn>
    </template>
    <template v-slot:footer.prepend>
      <v-btn color="primary" dark class="ma-2" @click="load"><v-icon size="large">mdi-refresh</v-icon></v-btn>
    </template>
  </v-data-table>
  </div>
</template>

<style scoped>

</style>