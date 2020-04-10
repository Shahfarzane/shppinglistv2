<template>

<div>
      <page-header/>

           <v-parallax
    dark
    src="https://cdn.vuetifyjs.com/images/backgrounds/vbanner.jpg"
  >
    <v-row
      align="center"
      justify="center"
    >
      <v-col class="text-center" cols="20">
        <h1 class="display-1 font-weight-thin mb-4">Rate the app</h1>
                    <IncreaseCounter></IncreaseCounter>
            <h4 class="subheading"><Counter></Counter></h4>
            <DecreaseCounter></DecreaseCounter>
        
      </v-col>
    </v-row>
  </v-parallax>
</div>
</template>
<script>

import Counter from '../components/Counter.vue';
import IncreaseCounter from '../components/IncreaseCounter.vue';
import DecreaseCounter from '../components/DecreaseCounter.vue';
import PageHeader from '../components/Header.vue'


  export default {
    components : {
      Counter,
      IncreaseCounter,
      DecreaseCounter,
      PageHeader
    }
  }
</script>
