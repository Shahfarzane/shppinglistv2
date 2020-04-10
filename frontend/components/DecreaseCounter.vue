<template>
  <div>
        <v-btn rounded color="error" dark v-on:click="decreaseCounter()">Dislike</v-btn>
  </div>
</template>

<script>
import {store} from '../store';
import * as type from '../mutationTypes/types';

  export default {
    methods: {
        decreaseCounter(){
          this.$store.dispatch({
            type: type.Decrement,
            amount: 5
          })
        }
    }
  }
</script>
