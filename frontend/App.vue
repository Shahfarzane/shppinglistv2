<template>
  <div id="app">
    <v-app>
      <main>
        <router-view></router-view>
      </main>
    </v-app>
  </div>
</template>


<script>
import PageHeader from './components/Header.vue'
import List from './components/List.vue'
import AddItem from './components/AddItem.vue'

export default  {
  name: 'App',
  data() {
    return {
    }
  },
  components: {
    List,
    AddItem,
    PageHeader
  },watch: {
      '$route':{
        handler: (to, from) => {
          document.title = to.meta.title || 'Shahin'
        },
         immediate: true
      }
    },
}
</script>

<style scoped>

html {
	 font-size: 10px;
	 font-family: sans-serif;
	 background-color:#FCFCFC ;
}
 html body {
	 margin: 0;
}
 html body #app {
	 min-width: 220px;
	 max-width: 130em;
	 margin: 0 auto;
}
 
</style>
