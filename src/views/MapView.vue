<script setup>
// import { GoogleMap, Marker } from 'vue3-google-map'
import { VMap, VMapOsmTileLayer, VMapZoomControl, VMapIconMarker } from 'vue-map-ui';
import {useElementsStore} from "@/store/elements";
// import {onMounted} from "vue";
import {onMounted} from "vue";
// import {onMounted, ref} from "vue";

// const runtimeConfig = useRuntimeConfig();
// const baseUrl = runtimeConfig.public.baseURL;

const elementsStore = useElementsStore()
// const elementDialog = ref(false)
// const infowindow = ref(false);

async function load() {
  await elementsStore.getElements()
}

// function firstElementCoords(){
//   let el = elementsStore.elements[0];
//   if (el){return coordToOption(el.point)}
//   else {return {}}
//
// }

function coordToOption(point){
  return { lat: point[0], lng: point[1] }
}

onMounted(async () => {
  await load()
})

// function showElement(item){
//   elementsStore.selectedElement = item;
//   elementDialog.value = true;
//   infowindow.value = true
// }

</script>

<template>
  <VMap style="height: 97%;">
    <VMapOsmTileLayer />
    <VMapZoomControl />
    <VMapMarker v-for="(element, idx) in elementsStore.elements" :latlng="coordToOption(element.point)" :key="idx" :icon-url="`custom/marker-icon.png`" :icon-size="[32, 42]" :icon-anchor="[16, 42]"></VMapMarker>
<!--    <VMapIconMarker v-for="(element, idx) in elementsStore.elements" :latlng="coordToOption(element.point)" :key="idx" :icon-url="`custom/marker-icon.png`" :icon-size="[32, 42]" :icon-anchor="[16, 42]"></VMapIconMarker>-->
  </VMap>

<!--    <GoogleMap api-key="AIzaSyA3mnLTIZMFlCuPuqc3nR8&#45;&#45;226aaHzOF4" style="width: 100%; height: 95%"-->
<!--             :center="firstElementCoords()" :zoom="10" mapTypeControl="false" scaleControl="false" scrollwheel="false"-->
<!--             streetView="false" streetViewControl="false" mapId="bdf9075975bb3bda"-->
<!--    >-->
<!--      <Marker v-for="(element, idx) in elementsStore.elements"-->
<!--              :options="{ position: coordToOption(element.point) }" :key="idx"-->
<!--              @click="showElement(element)">-->
<!--        <InfoWindow v-model="infowindow">-->
<!--        <span id="content">This is the infowindow content</span>-->
<!--        </InfoWindow>-->
<!--      </Marker>-->
<!--&lt;!&ndash;      <v-dialog v-model="elementDialog" width="auto" class="my-custom-dialog">&ndash;&gt;-->
<!--&lt;!&ndash;        <v-card max-width="400" prepend-icon="mdi-pause" title="Элемент">&ndash;&gt;-->
<!--&lt;!&ndash;          <template v-slot:actions>&ndash;&gt;-->
<!--&lt;!&ndash;            <v-btn class="ms-auto" text="Закрыть" @click="elementDialog = false"></v-btn>&ndash;&gt;-->
<!--&lt;!&ndash;          </template>&ndash;&gt;-->
<!--&lt;!&ndash;        </v-card>&ndash;&gt;-->
<!--&lt;!&ndash;      </v-dialog>&ndash;&gt;-->

<!--  </GoogleMap>-->

</template>

<style scoped>
.my-custom-dialog > .v-overlay__content {
   position: absolute;
   left: 0px;
 }
</style>