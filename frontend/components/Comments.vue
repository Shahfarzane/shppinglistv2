<template>
  <v-layout wrap >
  <v-container >
  <page-header/>
    <v-spacer></v-spacer>
  <v-flex pa-1>
<Form/>
</v-flex>
  <v-flex pa-1>
  <Display/>
</v-flex>
</v-container>
  </v-layout>
</template>



<script>
import Form from '../components/Form.vue'
import Display from '../components/Display.vue'
import PageHeader from '../components/Header.vue'

export default {
  name: 'App',
  components: {
    Form,
    Display,
    PageHeader
  }
}
</script>

<style>

</style>
