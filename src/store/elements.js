// import { ref, computed } from 'vue'
import axios from 'axios'
import { defineStore } from 'pinia'


export const useElementsStore = defineStore('elements', {
  state: () => ({
    elements: [],
    data_types: [],
    data_type_category: [],
    selectedElement: null,
    selectedElementRecomend: {},
    elementData: [],
    elementRecomends: [],
    cultures: [],
    elementCultures: [],
    loaders: {
      elements: false,
      data_types: false,
      data_type_category: false,
      elementData: false,
      cultures: false,
      elementRecomends: false,
      elementCultures: false,
    }
  }),
  getters: {
    currentAccount: (state) => state.elements[state.selectedElement],
    isOneElement: (state) => Object.keys(state.elements).length === 1,
    hasElements: (state) => Object.keys(state.elements).length >= 1,
  },
  actions: {
    async getElements(){
      this.loaders.elements = true
      await axios.get('/elements/').then((response) => {
      if (response.data){
          this.elements = response.data.data;
      }
      })
      this.loaders.elements = false
    },
    async getElement(element_id){
      // this.loaders.elements = true
      await axios.get(`/elements/${element_id}/`).then((response) => {
      if (response.data){
          this.selectedElement = response.data.data;
      }
      })
      // this.loaders.elements = false
    },
    async getDataTypes(){
      this.loaders.data_types = true
      await axios.get('/data_types/').then((response) => {
      if (response.data){
          this.data_types = response.data.data;
      }
      })
      this.loaders.data_types = false
    },
    async getDataTypeCategory(){
      this.loaders.data_type_category = true
      await axios.get('/data_type_category/').then((response) => {
      if (response.data){
          this.data_type_category = response.data.data;
      }
      })
      this.loaders.data_type_category = false
    },
    async getCultures(){
      this.loaders.cultures = true
      await axios.get('/cultures/').then((response) => {
      if (response.data){
          this.cultures = response.data.data;
      }
      })
      this.loaders.cultures = false
    },
    async getElementData(element_id){
      this.loaders.elementData = true
      await axios.get(`/elements/${element_id}/data/latest/`).then((response) => {
      if (response.data){
          this.elementData = response.data.data;
      }
      })
      this.loaders.elementData = false
    },
    async getElementRecomends(element_id){
      this.loaders.elementRecomends = true
      await axios.get(`/elements/${element_id}/recomends/latest/`).then((response) => {
      if (response.data){
          this.elementRecomends = response.data.data;
      }
      })
      this.loaders.elementRecomends = false
    },
    async saveElementRecomend(){
      const formData = new FormData()
      formData.append('element_id', this.selectedElement.id)
      formData.append('current_culture_id', this.selectedElementRecomend.current_culture_id)
      formData.append('path', this.selectedElementRecomend.path)
      formData.append('recomend', this.selectedElementRecomend.recomend)
      await axios.post('/recomends/', formData).then((response) => {
      if (response.data){
          this.elementRecomends = response.data.data;
      }
      })
    },
    async getElementCultures(element_id){
      this.loaders.elementCultures = true
      await axios.get(`/elements/${element_id}/cultures/`).then((response) => {
      if (response.data){
          this.elementCultures = response.data.data;
      }
      })
      this.loaders.elementCultures = false
    },
    async getElementDataCode(element_id, code){
      let data = [];
      await axios.get(`elements/${element_id}/data/${code}/latest/`).then((response) => {
      if (response.data){
          data = response.data.data;
      }
      else {
        data = [];
      }
      })
      return data
    },
    async getAppDetail(account_id, app_id){
      await axios.get('/accounts/' + account_id + '/apps/' + app_id + '/detail/').then((response) => {
        if (response.status === 200){
            let account = this.accounts[account_id]
            let app = account.apps[app_id]
            app.services = response.data.app_com_params
        }
      })
    }
  },
  mutations: () => {},
})
