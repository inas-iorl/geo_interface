<script setup>
import {useElementsStore} from "@/store/elements";
// import {onMounted} from "vue";
import {onMounted, ref, defineProps} from "vue";
// import {useRouter} from "vue-router";

// const router = useRouter();
const elementsStore = useElementsStore()
const showRecomendEdit = ref(false)
const recommendText = ref('')
const tab = ref('one')
const el_data = ref([])

const props =  defineProps({
      element_id: null,
   })

const headers_data = ref([
  {title: 'Группа', align: 'start', sortable: false, key: 'root_name'},
  {title: 'Подгруппа', align: 'start', sortable: false, key: 'name'},
  {title: 'Значение', align: 'start', sortable: false, key: 'value'},
  {title: 'Ед. изм', align: 'start', sortable: false, key: 'measure'},
  {title: 'Измеренно', align: 'start', sortable: false, key: 'moment'},
])

const headers_cultures = ref([
  {title: '#', align: 'start', sortable: false, key: 'id'},
  {title: 'Культура', align: 'start', sortable: false, key: 'name'},
  {title: 'Начало', align: 'start', sortable: false, key: 'since'},
  {title: 'Завершение', align: 'start', sortable: false, key: 'until'},
])


function cardColor(category_code){
  switch (category_code){
    case 'none': return 'white';
    case 'physical': return 'brown-darken-1';
    case 'biological': return 'lime-darken-2';
    case 'chemical': return 'cyan-darken-3';
    case 'climate': return 'blue-lighten-1';
    default: return 'white';
  }
}

async function openRecomendEdit(item) {
  el_data.value = await elementsStore.getElementDataCode(elementsStore.selectedElement.id, item.code)
  elementsStore.selectedElementRecomend = item
  showRecomendEdit.value = true
  recommendText.value = elementsStore.selectedElementRecomend.recomend
}

function saveRecomendEdit() {
  elementsStore.selectedElementRecomend.recomend = recommendText.value
  elementsStore.saveElementRecomend()
  closeRecomendEdit();
}

function closeRecomendEdit(){
  showRecomendEdit.value = false
}

async function load(element_id) {
  // loading.value = true
  await elementsStore.getElement(element_id)
  await elementsStore.getElementData(element_id)
  await elementsStore.getElementRecomends(element_id)
  await elementsStore.getElementCultures(element_id)
  // totalItems.value = elementsStore.cultures.length
  // loading.value = false
}

onMounted(async () => {
  await load(props.element_id)
})

</script>

<template>
<div>



  <v-card>
    <v-tabs v-model="tab" bg-color="primary">
      <v-tab value="one">Рекомендации</v-tab>
      <v-tab value="two">Данные</v-tab>
      <v-tab value="three">Поле</v-tab>
    </v-tabs>

    <v-card-text class="tab-content">
      <v-tabs-window v-model="tab">
        <v-tabs-window-item value="one">
          <v-container>
            <v-row>
              <v-col>
                <v-dialog max-width="600" v-model="showRecomendEdit">
                  <v-card title="Редактировать">
                    <v-card-text>
                      <v-row>
                        <v-col><v-textarea v-model="recommendText"></v-textarea></v-col>
                        <v-col>
                          <v-table>
                            <thead>
                              <tr>
                                <th>Параметр</th>
                                <th>Значение</th>
                              </tr>
                            </thead>
                            <tbody>
                              <tr v-for="(item, key) in el_data" :key="key">
                                <td>{{ item.code }}</td>
                                <td>{{ item.value }} {{ item.measure }}</td>
                              </tr>
                            </tbody>
                          </v-table>
                        </v-col>
                      </v-row>
                    </v-card-text>
                    <v-card-actions>
                      <v-spacer></v-spacer>
                      <v-btn text="Save" @click="saveRecomendEdit()"></v-btn>
                    </v-card-actions>
                  </v-card>
                </v-dialog>
                <v-container>
                  <v-row>
<!--                    <v-col cols="2"><v-card :color="cardColor('none')">None</v-card></v-col>-->
                    <v-col cols="2"><v-card :color="cardColor('physical')">Physical</v-card></v-col>
                    <v-col cols="2"><v-card :color="cardColor('biological')">Biological</v-card></v-col>
                    <v-col cols="2"><v-card :color="cardColor('chemical')">Chemical</v-card></v-col>
                    <v-col cols="2"><v-card :color="cardColor('climate')">Climate</v-card></v-col>
                  </v-row>
                </v-container>
                <v-container class="overflow-y-scroll">
                  <v-row>
                    <v-col cols="3" v-for="(item, idx) in elementsStore.elementRecomends" :key="idx">
                      <v-card  class="mx-auto" :color="cardColor(item.category_code)" max-width="344" prepend-icon="$edit" @click="openRecomendEdit(item)">
                        <template v-slot:title>
                          <span class="font-weight-black">{{ item.name }}</span>
                        </template>
                      </v-card>
                    </v-col>
                  </v-row>
                </v-container>
              </v-col>
            </v-row>
          </v-container>
        </v-tabs-window-item>
        <v-tabs-window-item value="two">
          <v-container class="overflow-y-scroll">
            <v-data-table :headers="headers_data" :items="elementsStore.elementData"></v-data-table>
          </v-container>
        </v-tabs-window-item>
        <v-tabs-window-item value="three">
          <v-container>
            <v-row>
              <v-col>
                <v-container>
                  <v-row><v-text-field v-model="elementsStore.selectedElement.name" label="Название"></v-text-field></v-row>
                  <v-row><v-text-field v-model="elementsStore.selectedElement.code" label="К. код"></v-text-field></v-row>
                  <v-row><v-text-field v-model="elementsStore.selectedElement.descr" label="Описание"></v-text-field></v-row>
                  <v-row><v-text-field v-model="elementsStore.selectedElement.element_type" label="Тип"></v-text-field></v-row>
                  <v-row><v-text-field v-model="elementsStore.selectedElement.culture" label="Культура"></v-text-field></v-row>
                  <v-row>
                    <v-col><v-btn class="ma-1" icon="mdi-content-save" color="green"></v-btn><v-btn icon="mdi-close" color="green"></v-btn></v-col>
                    <v-col></v-col>
                  </v-row>
                </v-container>
              </v-col>
              <v-col>
                <v-data-table :headers="headers_cultures" :items="elementsStore.elementCultures"></v-data-table>
              </v-col>
            </v-row>
          </v-container>
        </v-tabs-window-item>
      </v-tabs-window>
    </v-card-text>
  </v-card>

  <v-divider></v-divider>

</div>
</template>

<style scoped>
  .tab-content {
    height: calc(100vh - 50px);
    overflow-y: auto;
  }
</style>