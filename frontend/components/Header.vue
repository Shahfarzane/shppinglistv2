<template>
  <v-toolbar fixed class="cyan" dark>
    <v-toolbar-title class="mr-4">
  <router-link
        class="home"
        tag="span"
        :to="{
          name: 'home'
        }">
        Shopping list creator
      </router-link>
    </v-toolbar-title>
       <v-spacer></v-spacer>
       <v-toolbar-items>
      <v-btn rounded color="error" dark
     
        :to="{
          name: 'about'
        }">
        About
      </v-btn>

       <v-btn rounded color="primary" dark
     
        :to="{
          name: 'comments'
        }">
        Notes
      </v-btn>
             <v-btn rounded color="warning" dark
     
        :to="{
          name: 'rate'
        }">
        Rate the app
      </v-btn>
       <v-spacer></v-spacer>

    </v-toolbar-items>

    <!-- <v-spacer></v-spacer>

    <v-toolbar-items>
      <v-btn
        flat
        dark
        :to="{
          name: 'login'
        }">
        Login
      </v-btn>

    </v-toolbar-items> -->
  </v-toolbar>
</template>
<script>

</script>

<style scoped>
.home {
  cursor: pointer;
}
.home:hover {
  color: #E9E;
}
</style>
