<template>
<v-container fluid>
  <page-header/>
  <v-layout  >
  <v-flex>
      <v-card
    class="mx-auto"
    max-width="500"
      dark
    color="white darken-3"
  >
        <!-- <v-card
          dark
          color="white darken-3"> -->

           <AddItem/>
        </v-card>
      </v-flex>
        <v-flex>
        <v-card
            class="mx-auto"
    max-width="500"
          dark
          color="white darken-3">
        <v-card-text>Added Items:</v-card-text>
          <list/>

        </v-card>


      </v-flex>
  </v-layout>
</v-container>
</template>



<script>
import PageHeader from '../components/Header.vue'
import Panel from '../components/Panel.vue'
import List from '../components/List.vue'
import AddItem from '../components/AddItem.vue'




export default  {
  data() {
    return {
    }
  },
  components: {
    List,
    AddItem,
    PageHeader,
    Panel
  }
}
</script>

