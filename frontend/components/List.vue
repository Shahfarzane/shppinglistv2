<template>

    <v-card   
     
     color= "#ffffff"
    class="mx-auto">
  <v-container>
  <v-card >
   <Search 
     @input="onSearchInput"/>
  </v-card>
  </v-container>
  <!-- <div class="d-flex flex-no-wrap justify-space-between"> -->
  <v-container grid-list-md>
    <v-list-item>
      <v-list-item-content >
      <v-list-item-title> 
      <Item
      v-for="item in displayItems"
      :id="item.id"
      :name="item.name"
      :amount="item.amount"
      :path="item.path"
      :found="item.found"
      :key="item.id"/></v-list-item-title>
      </v-list-item-content>
    </v-list-item>
  
  </v-container>
  <!-- </div> -->
 </v-card >
</template>



<script>
import Search from '../components/Search.vue'
import Item from '../components/Item.vue'
import { API, AppActions } from '../Api.js'
import Fuse from 'fuse.js'

var fuse = new Fuse([], {
  shouldSort: true,
  threshold: 0.6,
  keys: ["name"]
});

export default {
  name: 'List',
  data() {
    return {
      allItem: [],
      searchInput: ""
    }
  },
  computed: {

    displayItems: function() {
      fuse.setCollection(this.allItem);
      let results = fuse.search(this.searchInput);
      let itemsNotFound = [];
      for (let item of this.allItem) {
          const itemFound= !!results.find(x => item.id == x.id);
          item.found = itemFound|| this.searchInput === ""; 
          if (itemFound=== false) {
            itemsNotFound.push(item);
          }
      }
      results = results.concat(itemsNotFound);
      return results;

    }
  },
  mounted() {
    this.getItems();
    
    this.$root.$on(AppActions.Item.Add, item => {
      this.allItem.push(item)
    });
    this.$root.$on(AppActions.Item.Remove, id => {
      this.allItem.splice(this.allItem.findIndex(item => item.id === id), 1);
    });
    this.$root.$on(AppActions.Item.Increase, id => {
      this.allItem.find(item => item.id === id).amount++
    });
    this.$root.$on(AppActions.Item.Decrease, id => {
      this.allItem.find(item => item.id === id).amount--
    });
  },
  methods: {
    onSearchInput(value) {
      this.searchInput = value;
    },
    getItems() {
      fetch(API.Item.GetAll)
        .then(res => res.json())
        .then(data => {
          this.allItem = data;
        });
    }
  },
  components: {
    Search,
    Item
  }
}
</script>

<style>

.list {
	 background: #36384D;
	 margin: 1em;
	 padding: 1em 0;
}
 .list .list-grid {
	 padding: 1;
	 margin: 1 2em;
	 list-style: none;
	 display: grid;
	 grid-template-columns: repeat(auto-fit,minmax(100px,1fr));
	 grid-gap: 1em;
	 overflow-x: hidden;
}
 
</style>
