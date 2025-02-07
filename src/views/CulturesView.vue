<script setup>

import {onMounted, ref} from "vue";
import {useElementsStore} from "@/store/elements";
import NamesEdit from "@/components/NamesEdit.vue";

const elementsStore = useElementsStore()
// const itemsPerPage = ref(5)
const headers = ref([
  {title: 'id', align: 'start', sortable: false, key: 'id'},
  {title: 'code', align: 'start', sortable: false, key: 'code'},
  {title: 'names', align: 'start', sortable: false, key: 'names'},
  {title: 'Actions', key: 'actions', sortable: false }
])

const defaultEdit = { code: '', measure: ''}

const dialog = ref(false)
const dialogDelete = ref(false)

const editedItem = ref(defaultEdit);
const editedIndex = ref(-1);

// const search = ref('')
const loading = ref(true)

const totalItems = ref(0)

async function load() {
  loading.value = true
  await elementsStore.getCultures()
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
  <div>
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
    :items="elementsStore.cultures"
  >
    <template v-slot:top>
      <v-toolbar flat>
        <v-toolbar-title>Типы данных</v-toolbar-title>
        <v-divider class="mx-4" inset vertical></v-divider>
        <v-spacer></v-spacer>
        <v-dialog v-model="dialog" max-width="500px">
          <template v-slot:activator="{ props }">
            <v-btn class="mb-2" color="primary" dark v-bind="props">Новый параметр</v-btn>
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
                  <v-col cols="12" md="4" sm="6">
                    <names-edit :names="editedItem.names"></names-edit>
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
    <template v-slot:item.actions="{ item }">
      <v-icon class="me-2" size="small" @click="editItem(item)">mdi-pencil</v-icon>
      <v-icon size="small" @click="deleteItem(item)">mdi-delete</v-icon>
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