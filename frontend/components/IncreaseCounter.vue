<template>
  <div>
        <v-btn rounded color="primary" dark v-on:click="increaseCounter()">Like</v-btn>
  </div>
</template>

<script>
import {store} from '../store';
import * as type from '../mutationTypes/types';

  export default {
    methods: {
        increaseCounter(){
          this.$store.dispatch({
            type: type.Increment,
            amount: 5
          })
        }
    }
  }
</script>
